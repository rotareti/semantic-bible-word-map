"""
Contextual Embeddings Pipeline for Biblical Polysemy Sense Nodes
Uses HuggingFace Transformer (all-MiniLM-L6-v2) on NVIDIA GPU to extract
token-level contextual representations for polysemous biblical lemmas,
clusters occurrences into distinct theological senses, and computes 2D coordinates.
"""

import os
import re
import json
import time
import torch
import numpy as np
from transformers import AutoTokenizer, AutoModel
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score

# Target polysemous lemmas to disambiguate
TARGET_LEMMAS = [
    {
        'lemma_id': 'temple_NOUN',
        'lemma': 'temple',
        'pattern': r'\btemples?\b',
        'pos': 'NOUN',
        'senses': [
            {'index': 0, 'default_label': 'Physical Sanctuary', 'keywords': ['stone', 'cedar', 'solomon', 'altar', 'portico', 'chambers', 'building']},
            {'index': 1, 'default_label': 'Spiritual Body', 'keywords': ['body', 'spirit', 'dwell', 'living', 'holy', 'christ', 'believers']}
        ]
    },
    {
        'lemma_id': 'spirit_NOUN',
        'lemma': 'spirit',
        'pattern': r'\bspirits?\b',
        'pos': 'NOUN',
        'senses': [
            {'index': 0, 'default_label': 'Holy Spirit / Divine Spirit', 'keywords': ['holy', 'god', 'father', 'truth', 'grace', 'dwell', 'anoint']},
            {'index': 1, 'default_label': 'Natural Wind / Human Spirit', 'keywords': ['wind', 'breath', 'storm', 'troubled', 'faint', 'broken', 'disposition']}
        ]
    },
    {
        'lemma_id': 'flesh_NOUN',
        'lemma': 'flesh',
        'pattern': r'\bflesh\b',
        'pos': 'NOUN',
        'senses': [
            {'index': 0, 'default_label': 'Physical Body / Meat', 'keywords': ['meat', 'skin', 'bones', 'eat', 'sacrifice', 'blood', 'animal']},
            {'index': 1, 'default_label': 'Sinful Nature / Fallen Humanity', 'keywords': ['sin', 'spirit', 'desires', 'walk', 'lust', 'corrupt', 'weakness']}
        ]
    },
    {
        'lemma_id': 'world_NOUN',
        'lemma': 'world',
        'pattern': r'\bworlds?\b',
        'pos': 'NOUN',
        'senses': [
            {'index': 0, 'default_label': 'Physical Creation / Earth', 'keywords': ['foundation', 'earth', 'made', 'heavens', 'created', 'beginning', 'land']},
            {'index': 1, 'default_label': 'Fallen Human System', 'keywords': ['evil', 'love', 'darkness', 'hated', 'rulers', 'lust', 'overcome', 'corrupt']}
        ]
    },
    {
        'lemma_id': 'law_NOUN',
        'lemma': 'law',
        'pattern': r'\blaws?\b',
        'pos': 'NOUN',
        'senses': [
            {'index': 0, 'default_label': 'Mosaic Legislation & Commandments', 'keywords': ['moses', 'commandments', 'statutes', 'ordinances', 'book', 'tablets', 'sinai']},
            {'index': 1, 'default_label': 'Principle & Spiritual Rule', 'keywords': ['faith', 'sin', 'members', 'mind', 'christ', 'spirit', 'grace', 'inward']}
        ]
    }
]

OT_BOOKS = {
    'GEN', 'EXO', 'LEV', 'NUM', 'DEU', 'JOS', 'JDG', 'RUT', '1SA', '2SA',
    '1KI', '2KI', '1CH', '2CH', 'EZR', 'NEH', 'EST', 'JOB', 'PSA', 'PRO',
    'ECC', 'SNG', 'ISA', 'JER', 'LAM', 'EZK', 'DAN', 'HOS', 'JOL', 'AMO',
    'OBA', 'JON', 'MIC', 'NAM', 'HAB', 'ZEP', 'HAG', 'ZEC', 'MAL'
}


def run_pipeline():
    device = 'cuda' if torch.cuda.is_available() else 'cpu'
    print(f"Loading transformer model on {device}...")
    model_name = 'sentence-transformers/all-MiniLM-L6-v2'
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = AutoModel.from_pretrained(model_name).to(device)
    model.eval()

    print("Loading verse index and 2D word map...")
    with open('data/output/verse_index.json') as f:
        vdata = json.load(f)
    with open('data/output/wordmap_2d.json') as f:
        wordmap_nodes = json.load(f)

    # Build lookup for wordmap nodes
    node_lookup = {node['id']: node for node in wordmap_nodes}

    sense_results = {}

    for target in TARGET_LEMMAS:
        lemma_id = target['lemma_id']
        lemma = target['lemma']
        pattern = re.compile(target['pattern'], re.IGNORECASE)
        print(f"\nProcessing polysemous lemma: {lemma_id} ('{lemma}')...")

        # Find all occurrences in Bible
        occurrences = []
        for idx, entry in enumerate(vdata['verses']):
            ref, text = entry.split('|', 1)
            matches = list(pattern.finditer(text))
            if matches:
                book = ref.split()[0]
                testament = 'OT' if book in OT_BOOKS else 'NT'
                for m in matches:
                    occurrences.append({
                        'verse_id': idx,
                        'reference': ref,
                        'book': book,
                        'testament': testament,
                        'text': text,
                        'span': m.span(),
                        'matched_text': m.group(0)
                    })

        print(f"  Found {len(occurrences)} total occurrences across scripture.")

        # Batch contextual vector extraction
        vectors = []
        batch_size = 32
        for b_start in range(0, len(occurrences), batch_size):
            batch_items = occurrences[b_start:b_start + batch_size]
            batch_texts = [item['text'] for item in batch_items]
            
            inputs = tokenizer(batch_texts, padding=True, truncation=True, return_tensors='pt', return_offsets_mapping=True)
            offset_mappings = inputs.pop('offset_mapping')
            inputs = {k: v.to(device) for k, v in inputs.items()}
            
            with torch.no_grad():
                outputs = model(**inputs)
                hidden_states = outputs.last_hidden_state # [B, seq_len, 384]

            for i, item in enumerate(batch_items):
                m_start, m_end = item['span']
                offsets = offset_mappings[i]
                token_indices = []
                for t_idx, (start, end) in enumerate(offsets):
                    if start is None or end is None or (start == 0 and end == 0):
                        continue
                    if max(start, m_start) < min(end, m_end):
                        token_indices.append(t_idx)

                if token_indices:
                    token_vec = hidden_states[i, token_indices].mean(dim=0).cpu().numpy()
                    norm = np.linalg.norm(token_vec)
                    if norm > 0:
                        token_vec = token_vec / norm
                    vectors.append(token_vec)
                else:
                    # Fallback to sentence mean pool
                    token_vec = hidden_states[i].mean(dim=0).cpu().numpy()
                    norm = np.linalg.norm(token_vec)
                    if norm > 0:
                        token_vec = token_vec / norm
                    vectors.append(token_vec)

        X = np.array(vectors)
        print(f"  Extracted matrix of shape {X.shape}.")

        # Cluster into K=2 senses
        kmeans = KMeans(n_clusters=2, random_state=42, n_init=10)
        cluster_labels = kmeans.fit_predict(X)
        sil = silhouette_score(X, cluster_labels)
        print(f"  K-Means silhouette score: {sil:.4f}")

        # Compute cluster characteristics
        c0_items = [occurrences[i] for i, l in enumerate(cluster_labels) if l == 0]
        c1_items = [occurrences[i] for i, l in enumerate(cluster_labels) if l == 1]

        # Determine alignment with default senses using keyword overlap
        def score_sense_keywords(items, keywords):
            score = 0
            for item in items:
                lower_text = item['text'].lower()
                for kw in keywords:
                    if kw in lower_text:
                        score += 1
            return score

        s0_kws = target['senses'][0]['keywords']
        s1_kws = target['senses'][1]['keywords']

        c0_score_s0 = score_sense_keywords(c0_items, s0_kws)
        c0_score_s1 = score_sense_keywords(c0_items, s1_kws)

        if c0_score_s0 >= c0_score_s1:
            sense_0_cluster = 0
            sense_1_cluster = 1
        else:
            sense_0_cluster = 1
            sense_1_cluster = 0

        cluster_map = {
            sense_0_cluster: target['senses'][0],
            sense_1_cluster: target['senses'][1]
        }

        # Build sense objects
        senses_output = []
        parent_node = node_lookup.get(lemma_id)
        parent_x = parent_node['x'] if parent_node else 0.0
        parent_y = parent_node['y'] if parent_node else 0.0
        parent_v = np.array(parent_node['v']) if parent_node else np.zeros(100)

        for cluster_id, sense_meta in cluster_map.items():
            items = c0_items if cluster_id == 0 else c1_items
            c_indices = [idx for idx, l in enumerate(cluster_labels) if l == cluster_id]
            c_center = kmeans.cluster_centers_[cluster_id]
            c_center_norm = c_center / (np.linalg.norm(c_center) + 1e-9)

            # Rank items by cosine similarity to cluster center
            item_sims = []
            for item_idx, orig_idx in enumerate(c_indices):
                vec = X[orig_idx]
                sim = float(np.dot(vec, c_center_norm))
                item_sims.append((items[item_idx], sim))

            item_sims.sort(key=lambda x: x[1], reverse=True)

            # Deduplicate by verse reference
            seen_refs = set()
            ranked_top_verses = []
            for itm, sim in item_sims:
                ref = itm['reference']
                if ref not in seen_refs:
                    seen_refs.add(ref)
                    clean_text = itm['text'].replace('\u2014', ' - ').replace('\u2013', ' - ')
                    ranked_top_verses.append({
                        'reference': ref,
                        'text': clean_text,
                        'prototype_sim': round(sim, 3)
                    })
                if len(ranked_top_verses) >= 8:
                    break

            ot_cnt = sum(1 for x in items if x['testament'] == 'OT')
            nt_cnt = len(items) - ot_cnt
            testament_str = 'Both' if (ot_cnt > 0 and nt_cnt > 0) else ('OT' if ot_cnt > 0 else 'NT')

            # Offset 2D position slightly from parent node to create visual separation
            offset_factor = 2.8
            angle = (sense_meta['index'] * np.pi) + (np.pi / 4.0)
            sense_x = round(parent_x + (np.cos(angle) * offset_factor), 3)
            sense_y = round(parent_y + (np.sin(angle) * offset_factor), 3)

            sense_node_id = f"{lemma_id}__sense_{sense_meta['index']}"
            other_sense_id = f"{lemma_id}__sense_{1 - sense_meta['index']}"

            # Calculate specialized 100D vector tilted toward sense keywords
            kw_vecs = []
            for kw in sense_meta['keywords']:
                for pot_id in [f"{kw}_NOUN", f"{kw}_ADJ", f"{kw}_VERB"]:
                    if pot_id in node_lookup:
                        kw_vecs.append(np.array(node_lookup[pot_id]['v']))
                        break

            if kw_vecs and np.linalg.norm(parent_v) > 0:
                kw_mean = np.mean(kw_vecs, axis=0)
                specialized_v = parent_v + (0.32 * kw_mean)
                specialized_v = specialized_v / np.linalg.norm(specialized_v)
                v_out = [round(float(val), 3) for val in specialized_v]
            else:
                v_out = [round(float(val), 3) for val in parent_v]

            unique_verse_indices = sorted(list(set(x['verse_id'] for x in items)))

            sense_entry = {
                'id': sense_node_id,
                'parent_id': lemma_id,
                'lemma': lemma,
                'pos': target['pos'],
                'sense_index': sense_meta['index'],
                'sense_label': sense_meta['default_label'],
                'w': f"{lemma} ({sense_meta['default_label']})",
                'short_label': f"{lemma} [{sense_meta['default_label']}]",
                'f': len(items),
                'ot_count': ot_cnt,
                'nt_count': nt_cnt,
                't': testament_str,
                'x': sense_x,
                'y': sense_y,
                'v': v_out,
                'sister_senses': [other_sense_id],
                'verse_indices': unique_verse_indices,
                'top_verses': ranked_top_verses
            }
            senses_output.append(sense_entry)

            print(f"  Sense {sense_meta['index']} ({sense_meta['default_label']}): {len(items)} verses | OT={ot_cnt} ({ot_cnt/len(items)*100:.1f}%), NT={nt_cnt} ({nt_cnt/len(items)*100:.1f}%)")

        sense_results[lemma_id] = {
            'lemma': lemma,
            'lemma_id': lemma_id,
            'senses': senses_output
        }

    # Save to data/output/senses_data.json
    out_file = 'data/output/senses_data.json'
    with open(out_file, 'w') as f:
        json.dump(sense_results, f, indent=2)
    print(f"\nSuccessfully generated {out_file} with {len(sense_results)} polysemous lemmas!")


if __name__ == '__main__':
    t0 = time.time()
    run_pipeline()
    print(f"Pipeline completed in {time.time() - t0:.2f}s.")
