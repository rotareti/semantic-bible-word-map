import json
import os
import numpy as np
import umap
from gensim.models import Word2Vec

PROCESSED_DIR = 'data/processed'
OUTPUT_DIR = 'data/output'

def main():
    print("Step 3: Loading Word2Vec model and metadata...")
    model_path = os.path.join(PROCESSED_DIR, 'word2vec_lxx.model')
    meta_path = os.path.join(PROCESSED_DIR, 'lxx_word_meta.json')

    if not os.path.exists(model_path):
        raise FileNotFoundError(f"Missing {model_path}. Run train_embeddings_lxx.py first.")

    model = Word2Vec.load(model_path)
    with open(meta_path, 'r', encoding='utf-8') as f:
        meta = json.load(f)

    # Determine testament presence for each word
    ot_words = set()
    with open(os.path.join(PROCESSED_DIR, 'ot_text_lxx.txt'), 'r', encoding='utf-8') as f:
        for line in f:
            ot_words.update(line.split())

    nt_words = set()
    with open(os.path.join(PROCESSED_DIR, 'nt_text_lxx.txt'), 'r', encoding='utf-8') as f:
        for line in f:
            nt_words.update(line.split())

    words = []
    vectors = []
    freqs = []
    testaments = []

    # Include words that appear at least 3 times
    for word in model.wv.key_to_index:
        count = model.wv.get_vecattr(word, "count")
        if count >= 3:
            words.append(word)
            vectors.append(model.wv[word])
            freqs.append(int(count))

            in_ot = word in ot_words
            in_nt = word in nt_words
            if in_ot and in_nt:
                testaments.append("Both")
            elif in_ot:
                testaments.append("OT")
            else:
                testaments.append("NT")

    vectors = np.array(vectors)
    print(f"Generating 2D UMAP projection for {len(words)} Greek words...")

    reducer = umap.UMAP(n_components=2, random_state=42, n_neighbors=15, min_dist=0.1)
    coords_2d = reducer.fit_transform(vectors)

    out_2d = []
    for i in range(len(words)):
        w_id = words[i]
        m = meta.get(w_id, {})
        v_rounded = [round(float(val), 3) for val in vectors[i]]

        parts = w_id.split('_')
        if len(parts) >= 3 and (parts[-2].startswith('G') or parts[-2].startswith('L')):
            fallback_w = " ".join(parts[:-2])
        elif len(parts) >= 2:
            fallback_w = " ".join(parts[:-1])
        else:
            fallback_w = w_id
        clean_w = m.get("w", fallback_w)
        pos_tag = m.get("pos", parts[-1])

        orig_entry = {
            "lemma": m.get("lemma", ""),
            "translit": m.get("translit", ""),
            "strongs": m.get("strongs", ""),
            "def": m.get("def", ""),
            "count": freqs[i]
        }

        out_2d.append({
            "id": w_id,
            "w": clean_w,
            "pos": pos_tag,
            "f": freqs[i],
            "t": testaments[i],
            "x": round(float(coords_2d[i][0]), 3),
            "y": round(float(coords_2d[i][1]), 3),
            "v": v_rounded,
            "original": [orig_entry]
        })

    print("Filtering verse_index_lxx.json...")
    raw_index_path = os.path.join(OUTPUT_DIR, 'verse_index_raw_lxx.json')
    with open(raw_index_path, 'r', encoding='utf-8') as f:
        v_idx = json.load(f)

    print("Centering map around Christ anchor (0, 0)...")
    from christ_anchor import compute_christ_anchor, center_nodes_2d, synthesize_christ_anchor_node
    anchor = compute_christ_anchor('lxx', out_2d, v_idx)
    out_2d = center_nodes_2d(out_2d, anchor['center_2d'], anchor['v'])
    anchor_node = synthesize_christ_anchor_node(anchor, 'lxx')
    out_2d.insert(0, anchor_node)

    with open(os.path.join(OUTPUT_DIR, 'christ_anchor_lxx.json'), 'w', encoding='utf-8') as f:
        json.dump(anchor, f, indent=2, ensure_ascii=False)

    print(f"Saving wordmap_2d_lxx.json ({len(out_2d)} nodes)...")
    output_wordmap = os.path.join(OUTPUT_DIR, 'wordmap_2d_lxx.json')
    with open(output_wordmap, 'w', encoding='utf-8') as f:
        json.dump(out_2d, f, separators=(',', ':'), ensure_ascii=False)

    valid_words = set(words)
    filtered_word_to_verse = {}
    for w in valid_words:
        if w in v_idx['words']:
            filtered_word_to_verse[w] = v_idx['words'][w]

    # Map anchor node to landmark verses
    landmark_indices = []
    for r in anchor['verses_used']:
        for vi, line in enumerate(v_idx['verses']):
            if line.startswith(r + '|'):
                landmark_indices.append(vi)
                break
    filtered_word_to_verse[anchor_node['id']] = landmark_indices

    filtered_index_path = os.path.join(OUTPUT_DIR, 'verse_index_lxx.json')
    with open(filtered_index_path, 'w', encoding='utf-8') as f:
        json.dump({'verses': v_idx['verses'], 'words': filtered_word_to_verse}, f, separators=(',', ':'), ensure_ascii=False)

    print("Step 3 complete: wordmap_2d_lxx.json and verse_index_lxx.json saved successfully.")


if __name__ == '__main__':
    main()
