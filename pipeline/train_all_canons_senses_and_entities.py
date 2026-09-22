"""
Full GPU Contextual Embeddings Pipeline for Biblical Disambiguation and Entity Unification
Fully Unsupervised Discovery Pipeline:
1. Dynamic Entity Discovery: Scans the 100D wordmap to discover tightly bound cliques (NOUN & PROPN)
   and unifies cross-lexeme referents into thematic/coreferent entity nodes.
2. Unsupervised Polysemy Discovery: Tests contextual transformer embeddings for every lemma (count >= 20)
   using KMeans (K=2, K=3) and silhouette analysis. Discovered polysemous senses are automatically labeled
   via differential TF-IDF keyword extraction.

Outputs:
- data/output/senses_data.json (BSB)
- data/output/senses_data_lxx.json (LXX)
- data/output/senses_data_vul.json (VUL)
"""

import os
import re
import sys
import json
import time
import torch
import numpy as np
import networkx as nx
from transformers import AutoTokenizer, AutoModel
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
from sklearn.feature_extraction.text import TfidfVectorizer


# Canon Configurations (Hardcoded polysemous_lemmas and entities removed for unsupervised discovery)
CANON_CONFIGS = {
    'bsb': {
        'name': 'Berean Standard Bible (BSB)',
        'model_name': 'sentence-transformers/all-MiniLM-L6-v2',
        'verse_index': 'data/output/verse_index.json',
        'wordmap': 'data/output/wordmap_2d.json',
        'bookmap': 'data/output/bookmap_2d.json',
        'output_file': 'data/output/senses_data.json'
    },
    'lxx': {
        'name': 'Septuagint & Greek NT (LXX)',
        'model_name': 'sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2',
        'verse_index': 'data/output/verse_index_lxx.json',
        'wordmap': 'data/output/wordmap_2d_lxx.json',
        'bookmap': 'data/output/bookmap_2d_lxx.json',
        'output_file': 'data/output/senses_data_lxx.json'
    },
    'vul': {
        'name': 'Clementine Vulgate (VUL)',
        'model_name': 'sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2',
        'verse_index': 'data/output/verse_index_vul.json',
        'wordmap': 'data/output/wordmap_2d_vul.json',
        'bookmap': 'data/output/bookmap_2d_vul.json',
        'output_file': 'data/output/senses_data_vul.json'
    }
}


def clean_str(s):
    if not s:
        return ''
    # Replace em-dashes and en-dashes with hyphens
    return s.replace('\u2014', ' - ').replace('\u2013', ' - ')


def discover_polysemy(X, min_occurrences=20, silhouette_threshold=0.15):
    """
    Evaluates contextual embedding distribution for polysemy.
    Tests K=2 and K=3 clusters using KMeans and silhouette_score.
    Returns (best_k, cluster_labels).
    Falls back to K=1 if the best silhouette score is below silhouette_threshold
    or if len(X) < min_occurrences.
    """
    if X is None or len(X) < min_occurrences:
        return 1, np.zeros(len(X) if X is not None else 0, dtype=int)

    best_k = 1
    best_score = -1.0
    best_labels = np.zeros(len(X), dtype=int)

    for k in (2, 3):
        if len(X) <= k:
            continue
        try:
            kmeans = KMeans(n_clusters=k, random_state=42, n_init='auto')
            labels = kmeans.fit_predict(X)
            if len(set(labels)) < 2:
                continue
            sample_size = 1000 if len(X) > 1000 else None
            score = silhouette_score(X, labels, sample_size=sample_size, random_state=42)
            if score > best_score:
                best_score = score
                best_k = k
                best_labels = labels
        except Exception:
            continue

    if best_score < silhouette_threshold:
        return 1, np.zeros(len(X), dtype=int)

    return best_k, best_labels


def extract_cluster_keywords(cluster_texts, background_texts, top_n=6):
    """
    Extracts the most defining keywords for a cluster compared to background texts
    using TfidfVectorizer, and generates a default_label (e.g. 'Sense: word1, word2, word3').
    """
    if not cluster_texts:
        return [], "Sense: generic"

    cluster_doc = " ".join(cluster_texts).strip()
    bg_doc = " ".join(background_texts).strip() if background_texts else ""

    if not cluster_doc:
        return [], "Sense: generic"

    docs = [cluster_doc, bg_doc] if bg_doc else [cluster_doc]

    try:
        vec = TfidfVectorizer(
            token_pattern=r'(?u)\b[^\W\d_]{3,}\b',
            stop_words='english',
            max_features=1000
        )
        X = vec.fit_transform(docs)
        feature_names = np.array(vec.get_feature_names_out())

        if len(docs) > 1:
            c_scores = X[0].toarray()[0]
            bg_scores = X[1].toarray()[0]
            diff_scores = c_scores - bg_scores
            ranked_indices = np.argsort(-diff_scores)
            keywords = [feature_names[i] for i in ranked_indices if c_scores[i] > 0][:top_n]
        else:
            c_scores = X[0].toarray()[0]
            ranked_indices = np.argsort(-c_scores)
            keywords = [feature_names[i] for i in ranked_indices if c_scores[i] > 0][:top_n]
    except Exception:
        keywords = []

    if not keywords:
        default_label = "Sense: generic"
    else:
        label_words = keywords[:3]
        default_label = f"Sense: {', '.join(label_words)}"

    return keywords, default_label


def discover_entities(wordmap_nodes, similarity_threshold=0.85):
    """
    Scans the 100D wordmap nodes, filters for NOUN and PROPN with count >= 10,
    computes a pairwise cosine similarity matrix, and extracts tightly bound
    cliques (2+ words) into the dynamic entities list.
    """
    if isinstance(wordmap_nodes, str):
        with open(wordmap_nodes, 'r', encoding='utf-8') as f:
            wordmap_nodes = json.load(f)

    filtered_nodes = [
        n for n in wordmap_nodes
        if n.get('pos') in ('NOUN', 'PROPN')
        and n.get('count', n.get('f', 0)) >= 10
        and 'v' in n and len(n['v']) > 0
    ]

    if len(filtered_nodes) < 2:
        return []

    vecs = np.array([n['v'] for n in filtered_nodes], dtype=np.float32)
    norms = np.linalg.norm(vecs, axis=1, keepdims=True)
    norms[norms == 0] = 1e-9
    normalized_vecs = vecs / norms
    sim_matrix = np.dot(normalized_vecs, normalized_vecs.T)

    G = nx.Graph()
    for i in range(len(filtered_nodes)):
        G.add_node(i)

    N = len(filtered_nodes)
    for i in range(N):
        for j in range(i + 1, N):
            if sim_matrix[i, j] >= similarity_threshold:
                G.add_edge(i, j)

    raw_cliques = [c for c in nx.find_cliques(G) if len(c) >= 2]

    def clique_score(c):
        num_pairs = len(c) * (len(c) - 1) / 2
        total_sim = sum(sim_matrix[u, v] for u in c for v in c if u < v)
        return (len(c), total_sim / num_pairs)

    raw_cliques.sort(key=clique_score, reverse=True)

    # Deduplicate near-identical cliques with high Jaccard overlap
    deduped_cliques = []
    for c in raw_cliques:
        c_set = set(c)
        is_redundant = False
        for existing_set in deduped_cliques:
            jaccard = len(c_set & existing_set) / len(c_set | existing_set)
            if jaccard >= 0.7:
                is_redundant = True
                break
        if not is_redundant:
            deduped_cliques.append(c_set)

    dynamic_entities = []
    seen_ids = set()

    for c in deduped_cliques:
        clique_nodes = [filtered_nodes[idx] for idx in c]
        # Order member words by frequency/count descending
        clique_nodes.sort(key=lambda n: n.get('count', n.get('f', 0)), reverse=True)
        member_ids = [n['id'] for n in clique_nodes]
        member_words = [n['w'] for n in clique_nodes]

        slug_words = [re.sub(r'[^\w]', '', w.lower()) for w in member_words[:4]]
        slug = "_".join(w for w in slug_words if w)
        if not slug:
            slug = f"entity_{len(dynamic_entities)}"

        base_id = f"entity__{slug}"
        entity_id = base_id
        counter = 2
        while entity_id in seen_ids:
            entity_id = f"{base_id}_{counter}"
            counter += 1
        seen_ids.add(entity_id)

        title = " / ".join(w.title() for w in member_words)
        if len(member_words) > 3:
            short_label = " / ".join(w.title() for w in member_words[:3]) + f" (+{len(member_words) - 3})"
        else:
            short_label = title

        description = f"Discovered thematic entity uniting: {', '.join(member_words)}."

        dynamic_entities.append({
            'id': entity_id,
            'slug': slug,
            'title': title,
            'short_label': short_label,
            'description': description,
            'member_lemmas': member_ids
        })

    return dynamic_entities


def run_training_for_canon(canon_key):
    cfg = CANON_CONFIGS[canon_key]
    print(f"\n=======================================================")
    print(f"Starting Training for: {cfg['name']}")
    print(f"=======================================================")

    device = 'cuda' if torch.cuda.is_available() else 'cpu'
    print(f"Loading transformer model '{cfg['model_name']}' on {device}...")
    tokenizer = AutoTokenizer.from_pretrained(cfg['model_name'])
    model = AutoModel.from_pretrained(cfg['model_name']).to(device)
    model.eval()

    print(f"Loading datasets: {cfg['verse_index']}, {cfg['wordmap']}, {cfg['bookmap']}...")
    with open(cfg['verse_index'], 'r', encoding='utf-8') as f:
        vdata = json.load(f)
    with open(cfg['wordmap'], 'r', encoding='utf-8') as f:
        wordmap_nodes = json.load(f)
    with open(cfg['bookmap'], 'r', encoding='utf-8') as f:
        bookmap_data = json.load(f)

    # Lookup tables
    node_lookup = {node['id']: node for node in wordmap_nodes}
    word_to_verses = vdata.get('words', {})
    verses_list = vdata.get('verses', [])

    ot_books = set(b['code'] for b in bookmap_data.get('books', []) if b.get('testament') == 'OT')

    def parse_verse_entry(v_entry):
        parts = v_entry.split('|')
        ref = parts[0]
        book = ref.split()[0]
        testament = 'OT' if book in ot_books else 'NT'
        if len(parts) == 1:
            return ref, book, testament, parts[0], parts[0]
        if len(parts) == 2:
            return ref, book, testament, parts[1], parts[1]
        # len >= 3: ref, en_text, orig_text
        return ref, book, testament, parts[1], parts[2]

    # Pre-parse verse index metadata
    parsed_verses = []
    for idx, ventry in enumerate(verses_list):
        ref, book, testament, en_text, orig_text = parse_verse_entry(ventry)
        parsed_verses.append({
            'verse_id': idx,
            'ref': ref,
            'book': book,
            'testament': testament,
            'en_text': clean_str(en_text),
            'orig_text': clean_str(orig_text)
        })

    print(f"Loaded {len(parsed_verses)} verses, {len(node_lookup)} 2D words, {len(ot_books)} OT books.")

    def encode_sentences(text_list, batch_size=128):
        vectors = []
        for start_idx in range(0, len(text_list), batch_size):
            batch_texts = text_list[start_idx:start_idx + batch_size]
            inputs = tokenizer(batch_texts, padding=True, truncation=True, max_length=128, return_tensors='pt').to(device)
            with torch.no_grad():
                outputs = model(**inputs)
                mask = inputs['attention_mask'].unsqueeze(-1).expand(outputs.last_hidden_state.size()).float()
                sum_embeddings = torch.sum(outputs.last_hidden_state * mask, 1)
                sum_mask = torch.clamp(mask.sum(1), min=1e-9)
                mean_pooled = (sum_embeddings / sum_mask).cpu().numpy()
                norms = np.linalg.norm(mean_pooled, axis=1, keepdims=True)
                norms[norms == 0] = 1e-9
                normalized = mean_pooled / norms
                vectors.append(normalized)
        if vectors:
            return np.vstack(vectors)
        return np.zeros((0, 384), dtype=np.float32)

    # Pre-encode all verses once to provide fast contextual lookups
    print(f"Pre-encoding {len(parsed_verses)} verses with transformer on {device}...")
    t_enc_start = time.time()
    all_verse_texts = []
    for occ in parsed_verses:
        if canon_key == 'bsb':
            all_verse_texts.append(occ['en_text'])
        else:
            combined_txt = f"{occ['en_text']} {occ['orig_text']}".strip()
            all_verse_texts.append(combined_txt)

    all_verse_embeddings = encode_sentences(all_verse_texts, batch_size=128)
    print(f"Verse contextual embeddings encoded in {time.time() - t_enc_start:.2f}s (matrix shape {all_verse_embeddings.shape}).")

    output_data = {}

    # -------------------------------------------------------------
    # Pre-flight: Dynamic Entity Discovery
    # -------------------------------------------------------------
    print(f"\n--- Pre-flight: Discovering Dynamic Entities from 100D Word Map ---")
    t_ent_start = time.time()
    dynamic_entities = discover_entities(wordmap_nodes, similarity_threshold=0.85)
    print(f"Discovered {len(dynamic_entities)} tightly bound entity cliques in {time.time() - t_ent_start:.2f}s.")

    # -------------------------------------------------------------
    # Polysemy Sense Discovery Loop
    # -------------------------------------------------------------
    candidate_lemmas = [
        (lemma_id, v_indices)
        for lemma_id, v_indices in word_to_verses.items()
        if len(v_indices) >= 20 and lemma_id in node_lookup
    ]
    candidate_lemmas.sort(key=lambda item: len(item[1]), reverse=True)
    print(f"\n--- Polysemy Discovery: Scanning {len(candidate_lemmas)} lemmas with count >= 20 ---")

    t_poly_start = time.time()
    polysemous_count = 0

    for idx, (lemma_id, v_indices) in enumerate(candidate_lemmas):
        valid_indices = [v_idx for v_idx in v_indices if v_idx < len(parsed_verses)]
        if len(valid_indices) < 20:
            continue

        occurrences = [parsed_verses[v_idx] for v_idx in valid_indices]
        X = all_verse_embeddings[valid_indices]

        best_k, cluster_labels = discover_polysemy(X, min_occurrences=20, silhouette_threshold=0.15)

        # Filter: If K=1, skip the word
        if best_k <= 1:
            continue

        polysemous_count += 1
        parent_node = node_lookup[lemma_id]
        lemma = parent_node.get('w', lemma_id.split('_')[0])
        pos = parent_node.get('pos', 'NOUN')
        parent_x = parent_node.get('x', 0.0)
        parent_y = parent_node.get('y', 0.0)
        parent_v = np.array(parent_node['v']) if 'v' in parent_node else np.zeros(100)

        senses_output = []

        for k_idx in range(best_k):
            c_indices = [i for i, l in enumerate(cluster_labels) if l == k_idx]
            cluster_occurrences = [occurrences[i] for i in c_indices]
            bg_occurrences = [occurrences[i] for i, l in enumerate(cluster_labels) if l != k_idx]

            if not cluster_occurrences:
                continue

            if canon_key == 'bsb':
                cluster_texts = [occ['en_text'] for occ in cluster_occurrences]
                bg_texts = [occ['en_text'] for occ in bg_occurrences]
            else:
                cluster_texts = [f"{occ['en_text']} {occ['orig_text']}".strip() for occ in cluster_occurrences]
                bg_texts = [f"{occ['en_text']} {occ['orig_text']}".strip() for occ in bg_occurrences]

            keywords, default_label = extract_cluster_keywords(cluster_texts, bg_texts, top_n=6)

            # Cluster centroid & prototype verse ranking
            c_vecs = X[c_indices]
            c_center = np.mean(c_vecs, axis=0)
            c_center_norm = c_center / (np.linalg.norm(c_center) + 1e-9)

            sims = np.dot(c_vecs, c_center_norm)
            ranked_order = np.argsort(-sims)

            seen_refs = set()
            ranked_top_verses = []
            for r_idx in ranked_order:
                itm = cluster_occurrences[r_idx]
                ref = itm['ref']
                if ref not in seen_refs:
                    seen_refs.add(ref)
                    ranked_top_verses.append({
                        'reference': ref,
                        'text': itm['en_text'],
                        'original_text': itm['orig_text'] if canon_key != 'bsb' else '',
                        'prototype_sim': round(float(sims[r_idx]), 3)
                    })
                if len(ranked_top_verses) >= 8:
                    break

            ot_cnt = sum(1 for x in cluster_occurrences if x['testament'] == 'OT')
            nt_cnt = len(cluster_occurrences) - ot_cnt
            testament_str = 'Both' if (ot_cnt > 0 and nt_cnt > 0) else ('OT' if ot_cnt > 0 else 'NT')

            # Coordinate offset
            offset_dist = 2.8
            angle = (2.0 * np.pi * k_idx / best_k) + (np.pi / 4.0)
            sense_x = round(parent_x + (np.cos(angle) * offset_dist), 3)
            sense_y = round(parent_y + (np.sin(angle) * offset_dist), 3)

            sense_node_id = f"{lemma_id}__sense_{k_idx}"
            sister_senses = [f"{lemma_id}__sense_{other_k}" for other_k in range(best_k) if other_k != k_idx]

            # Specialized 100D vector tilted toward sense keywords
            kw_vecs = []
            for kw in keywords:
                for pot_id in [kw, f"{kw}_NOUN", f"{kw}_ADJ", f"{kw}_VERB"]:
                    if pot_id in node_lookup:
                        kw_vecs.append(np.array(node_lookup[pot_id]['v']))
                        break

            if kw_vecs and np.linalg.norm(parent_v) > 0:
                kw_mean = np.mean(kw_vecs, axis=0)
                specialized_v = parent_v + (0.30 * kw_mean)
                specialized_v = specialized_v / np.linalg.norm(specialized_v)
                v_out = [round(float(val), 4) for val in specialized_v]
            else:
                v_out = [round(float(val), 4) for val in parent_v]

            unique_verse_indices = sorted(list(set(x['verse_id'] for x in cluster_occurrences)))

            sense_entry = {
                'id': sense_node_id,
                'parent_id': lemma_id,
                'lemma': lemma,
                'pos': pos,
                'sense_index': k_idx,
                'sense_label': default_label,
                'w': f"{lemma} ({default_label})",
                'short_label': f"{lemma} [{default_label}]",
                'f': len(cluster_occurrences),
                'ot_count': ot_cnt,
                'nt_count': nt_cnt,
                't': testament_str,
                'x': sense_x,
                'y': sense_y,
                'v': v_out,
                'keywords': keywords,
                'sister_senses': sister_senses,
                'verse_indices': unique_verse_indices,
                'top_verses': ranked_top_verses
            }
            senses_output.append(sense_entry)

        output_data[lemma_id] = {
            'type': 'disambiguation',
            'lemma': lemma,
            'lemma_id': lemma_id,
            'senses': senses_output
        }

        print(f"  [Polysemy K={best_k}] {lemma_id} ('{lemma}') -> {[s['sense_label'] for s in senses_output]}")

    print(f"Polysemy loop complete: analyzed {len(candidate_lemmas)} lemmas, identified {polysemous_count} polysemous lemmas in {time.time() - t_poly_start:.2f}s.")

    # -------------------------------------------------------------
    # Contextual Entity Unification
    # -------------------------------------------------------------
    print(f"\n--- Unifying {len(dynamic_entities)} Discovered Entities ---")
    t_unify_start = time.time()

    for entity in dynamic_entities:
        entity_id = entity['id']
        title = entity['title']

        member_nodes = []
        all_entity_verse_indices = set()
        member_summaries = []

        for m_id in entity['member_lemmas']:
            m_node = node_lookup.get(m_id)
            m_verses = word_to_verses.get(m_id, [])
            if m_node:
                member_nodes.append(m_node)
                all_entity_verse_indices.update(m_verses)
                member_summaries.append({
                    'id': m_id,
                    'label': m_node['w'],
                    'pos': m_node.get('pos', ''),
                    'count': len(m_verses)
                })

        if not member_nodes:
            continue

        unique_verse_indices = sorted(list(all_entity_verse_indices))
        occurrences = [parsed_verses[v_idx] for v_idx in unique_verse_indices if v_idx < len(parsed_verses)]

        # Occurrence-weighted 2D coordinates (barycenter)
        total_weight = sum(m['count'] for m in member_summaries)
        if total_weight == 0:
            weights = [1.0 / len(member_nodes)] * len(member_nodes)
        else:
            weights = [m['count'] / total_weight for m in member_summaries]

        entity_x = round(sum(m_node['x'] * w for m_node, w in zip(member_nodes, weights)), 3)
        entity_y = round(sum(m_node['y'] * w for m_node, w in zip(member_nodes, weights)), 3)

        # Occurrence-weighted 100D vector
        weighted_100d = sum(np.array(m_node['v']) * w for m_node, w in zip(member_nodes, weights))
        norm_100d = np.linalg.norm(weighted_100d)
        if norm_100d > 0:
            unified_v = (weighted_100d / norm_100d).tolist()
            unified_v = [round(float(val), 4) for val in unified_v]
        else:
            unified_v = member_nodes[0]['v']

        # Sample occurrences for prototype coreference verses
        sample_size = min(len(occurrences), 250)
        step = max(1, len(occurrences) // sample_size)
        sampled_occurrences = occurrences[::step][:sample_size]

        sample_v_indices = [occ['verse_id'] for occ in sampled_occurrences if occ['verse_id'] < len(all_verse_embeddings)]
        if sample_v_indices:
            sample_X = all_verse_embeddings[sample_v_indices]
            entity_centroid = np.mean(sample_X, axis=0)
            entity_centroid = entity_centroid / (np.linalg.norm(entity_centroid) + 1e-9)

            sims = np.dot(sample_X, entity_centroid)
            sorted_indices = np.argsort(-sims)

            seen_refs = set()
            ranked_top_verses = []
            for s_idx in sorted_indices:
                itm = sampled_occurrences[s_idx]
                ref = itm['ref']
                if ref not in seen_refs:
                    seen_refs.add(ref)
                    ranked_top_verses.append({
                        'reference': ref,
                        'text': itm['en_text'],
                        'original_text': itm['orig_text'] if canon_key != 'bsb' else '',
                        'prototype_sim': round(float(sims[s_idx]), 3)
                    })
                if len(ranked_top_verses) >= 8:
                    break
        else:
            ranked_top_verses = []

        ot_cnt = sum(1 for x in occurrences if x['testament'] == 'OT')
        nt_cnt = len(occurrences) - ot_cnt
        testament_str = 'Both' if (ot_cnt > 0 and nt_cnt > 0) else ('OT' if ot_cnt > 0 else 'NT')

        entity_entry = {
            'id': entity_id,
            'is_entity': True,
            'type': 'entity',
            'entity_name': title,
            'canonical_title': title,
            'title': title,
            'short_label': entity.get('short_label', title),
            'w': title,
            'lemma': title,
            'description': entity['description'],
            'member_lemmas': member_summaries,
            'member_ids': [m['id'] for m in member_summaries],
            'f': len(occurrences),
            'ot_count': ot_cnt,
            'nt_count': nt_cnt,
            't': testament_str,
            'x': entity_x,
            'y': entity_y,
            'v': unified_v,
            'verse_indices': unique_verse_indices,
            'top_verses': ranked_top_verses
        }

        output_data[entity_id] = entity_entry

    print(f"Entities unified in {time.time() - t_unify_start:.2f}s.")

    # Write output JSON
    os.makedirs(os.path.dirname(cfg['output_file']), exist_ok=True)
    with open(cfg['output_file'], 'w', encoding='utf-8') as f:
        json.dump(output_data, f, indent=2, ensure_ascii=False)

    print(f"\nSuccessfully generated {cfg['output_file']} with {len(output_data)} total nodes (polysemy + entities)!")


def main():
    t_start = time.time()
    canons = sys.argv[1:] if len(sys.argv) > 1 else ['bsb', 'lxx', 'vul']
    for canon in canons:
        if canon in CANON_CONFIGS:
            run_training_for_canon(canon)
        else:
            print(f"Warning: Unknown canon '{canon}', skipping.")
    print(f"\n=======================================================")
    print(f"Training completed in {time.time() - t_start:.2f}s!")
    print(f"=======================================================")


if __name__ == '__main__':
    main()
