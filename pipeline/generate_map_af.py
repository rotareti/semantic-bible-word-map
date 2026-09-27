"""
Generate 2D Word Map for Apostolic Fathers (AF)
Projects 100D Word2Vec embeddings to 2D via UMAP,
applies Christocentric origin centering, synthesizes anchor node,
and outputs data/output/wordmap_2d_af.json and data/output/christ_anchor_af.json.
"""

import json
import os
import sys
import numpy as np
import umap
from gensim.models import Word2Vec

sys.path.append(os.path.dirname(__file__))
from christ_anchor import compute_christ_anchor, center_nodes_2d, synthesize_christ_anchor_node


def main():
    print("Loading Apostolic Fathers Word2Vec model...")
    model_path = 'data/processed/word2vec_af.model'
    if not os.path.exists(model_path):
        raise FileNotFoundError(f"Missing {model_path}. Run train_embeddings_af.py first.")

    model = Word2Vec.load(model_path)

    verse_index_path = 'data/output/verse_index_af.json'
    if not os.path.exists(verse_index_path):
        raise FileNotFoundError(f"Missing {verse_index_path}. Run build_af.py first.")

    with open(verse_index_path, 'r', encoding='utf-8') as f:
        v_idx = json.load(f)

    words_with_verses = set(w for w, v_list in v_idx.get('words', {}).items() if len(v_list) > 0)

    words = []
    vectors = []
    freqs = []

    for word, vocab_obj in model.wv.key_to_index.items():
        count = model.wv.get_vecattr(word, "count")
        if count >= 2 and word in words_with_verses:
            words.append(word)
            vectors.append(model.wv[word])
            freqs.append(int(count))

    vectors = np.array(vectors)
    print(f"Generating map for {len(words)} Apostolic Fathers vocabulary words...")

    print("Running UMAP (2D)...")
    reducer_2d = umap.UMAP(n_components=2, random_state=42, n_neighbors=15, min_dist=0.1)
    coords_2d = reducer_2d.fit_transform(vectors)

    out_2d = []
    for i in range(len(words)):
        v_rounded = [round(float(val), 3) for val in vectors[i]]
        parts = words[i].split('_')
        display_word = parts[0]
        pos_tag = parts[1] if len(parts) > 1 else ""

        out_2d.append({
            "id": words[i],
            "w": display_word,
            "pos": pos_tag,
            "f": freqs[i],
            "t": "AF",
            "x": round(float(coords_2d[i][0]), 3),
            "y": round(float(coords_2d[i][1]), 3),
            "v": v_rounded
        })

    print("Centering map around Christ anchor (0, 0)...")
    anchor = compute_christ_anchor('af', out_2d, v_idx)
    out_2d = center_nodes_2d(out_2d, anchor['center_2d'], anchor['v'])
    anchor_node = synthesize_christ_anchor_node(anchor, 'af')
    out_2d.insert(0, anchor_node)

    anchor_path = 'data/output/christ_anchor_af.json'
    with open(anchor_path, 'w', encoding='utf-8') as f:
        json.dump(anchor, f, indent=2, ensure_ascii=False)
    print(f"Saved {anchor_path}")

    wordmap_path = 'data/output/wordmap_2d_af.json'
    with open(wordmap_path, 'w', encoding='utf-8') as f:
        json.dump(out_2d, f, separators=(',', ':'), ensure_ascii=False)
    
    mb = os.path.getsize(wordmap_path) / (1024 * 1024)
    print(f"[DONE] Saved {wordmap_path} ({mb:.2f} MB, {len(out_2d)} nodes).")

    print("Updating verse index with valid words and anchor mapping...")
    valid_words = set(words)
    filtered_word_to_verse = {w: v_idx['words'][w] for w in valid_words if w in v_idx['words']}

    # Map anchor node to landmark verses
    landmark_indices = []
    for r in anchor['verses_used']:
        for vi, line in enumerate(v_idx['verses']):
            if line.startswith(r + '|'):
                landmark_indices.append(vi)
                break
    filtered_word_to_verse[anchor_node['id']] = landmark_indices

    with open(verse_index_path, 'w', encoding='utf-8') as f:
        json.dump({'verses': v_idx['verses'], 'words': filtered_word_to_verse}, f, separators=(',', ':'))
    print("Verse index updated.")


if __name__ == '__main__':
    main()
