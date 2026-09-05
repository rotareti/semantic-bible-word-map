import json
import math
import os
import time
from collections import defaultdict
import numpy as np

def main():
    start_time = time.time()
    print("Generating Verse Centroids and Cross-Reference Map...")

    verse_index_path = 'data/output/verse_index.json'
    wordmap_path = 'data/output/wordmap_2d.json'
    output_path = 'data/output/versemap_2d.json'

    if not os.path.exists(verse_index_path):
        raise FileNotFoundError(f"Missing {verse_index_path}")
    if not os.path.exists(wordmap_path):
        raise FileNotFoundError(f"Missing {wordmap_path}")

    print("Loading datasets...")
    with open(verse_index_path, 'r', encoding='utf-8') as f:
        v_data = json.load(f)
    with open(wordmap_path, 'r', encoding='utf-8') as f:
        w_data = json.load(f)

    word_dict = {w['id']: w for w in w_data}
    raw_verses = v_data['verses']
    word_to_verses = v_data['words']
    total_verses = len(raw_verses)

    print(f"Loaded {total_verses} verses and {len(word_dict)} vocabulary words.")

    # 1. Invert word_to_verses to get words per verse
    print("Indexing words per verse...")
    verse_to_words = defaultdict(list)
    for wid, v_indices in word_to_verses.items():
        if wid in word_dict:
            for vi in v_indices:
                verse_to_words[vi].append(wid)

    # 2. Compute Inverse Verse Frequency (IVF) weights
    # Words appearing in fewer verses carry higher thematic specificity
    idf = {}
    for wid, v_indices in word_to_verses.items():
        df = len(v_indices)
        idf[wid] = math.log((total_verses + 1.0) / (df + 1.0)) + 1.0

    # 3. Compute 100D Centroid Matrix and 2D Coordinates
    print("Calculating 100D embeddings and 2D weighted coordinates...")
    centroid_matrix = np.zeros((total_verses, 100), dtype=np.float32)
    coords_2d = []
    top_content_words = []
    verse_meta = []

    CONTENT_POS = {'NOUN', 'VERB', 'PROPN', 'ADJ', 'ADV'}

    for vi, raw_v in enumerate(raw_verses):
        ref, _ = raw_v.split('|', 1)
        parts = ref.split()
        b_code = parts[0]
        c_num, v_num = parts[1].split(':')
        verse_meta.append((ref, b_code, int(c_num), int(v_num)))

        w_ids = verse_to_words[vi]
        if not w_ids:
            coords_2d.append((0.0, 0.0))
            top_content_words.append([])
            continue

        vec = np.zeros(100, dtype=np.float32)
        weighted_x = 0.0
        weighted_y = 0.0
        total_weight = 0.0

        content_candidates = []
        for wid in w_ids:
            wd = word_dict[wid]
            wt = idf[wid]
            vec += wt * np.array(wd['v'], dtype=np.float32)
            weighted_x += wt * wd['x']
            weighted_y += wt * wd['y']
            total_weight += wt
            if wd['pos'] in CONTENT_POS:
                content_candidates.append((wid, wt))

        norm = np.linalg.norm(vec)
        if norm > 1e-6:
            centroid_matrix[vi] = vec / norm

        if total_weight > 0:
            coords_2d.append((round(weighted_x / total_weight, 3), round(weighted_y / total_weight, 3)))
        else:
            coords_2d.append((0.0, 0.0))

        content_candidates.sort(key=lambda item: item[1], reverse=True)
        top_content_words.append([item[0] for item in content_candidates[:12]])

    # 4. Batch compute top cross-references using matrix multiplication
    print("Computing top-32 semantic cross-references for all verses...")
    cross_references = [[] for _ in range(total_verses)]
    batch_size = 2000
    num_batches = (total_verses + batch_size - 1) // batch_size

    K = 32 # Number of cross-references per verse

    for b_idx in range(num_batches):
        start_i = b_idx * batch_size
        end_i = min(start_i + batch_size, total_verses)
        batch_mat = centroid_matrix[start_i:end_i] # (B, 100)

        # Dot product with all verses: (B, total_verses)
        sim_scores = np.dot(batch_mat, centroid_matrix.T)

        for row_idx, vi in enumerate(range(start_i, end_i)):
            # Ignore self
            sim_scores[row_idx, vi] = -1.0
            
            # Find top K indices
            # argpartition puts top K at the end
            top_k_indices = np.argpartition(sim_scores[row_idx], -K)[-K:]
            # Sort these top K descending
            sorted_top_k = top_k_indices[np.argsort(-sim_scores[row_idx, top_k_indices])]

            refs = []
            for target_idx in sorted_top_k:
                score = float(sim_scores[row_idx, target_idx])
                if score > 0.35: # Meaningful semantic correlation threshold
                    refs.append({
                        "id": verse_meta[target_idx][0],
                        "sim": round(score, 3)
                    })
            cross_references[vi] = refs

        if (b_idx + 1) % 4 == 0 or (b_idx + 1) == num_batches:
            print(f"  Processed {end_i}/{total_verses} verses...")

    # 5. Assemble and export versemap_2d.json
    print("Assembling final verse dataset...")
    verse_records = []
    for vi in range(total_verses):
        ref, b_code, c_num, v_num = verse_meta[vi]
        vx, vy = coords_2d[vi]
        verse_records.append({
            "id": ref,
            "b": b_code,
            "c": c_num,
            "v": v_num,
            "x": vx,
            "y": vy,
            "w": top_content_words[vi],
            "r": cross_references[vi]
        })

    output_data = {
        "count": total_verses,
        "verses": verse_records
    }

    print(f"Writing to {output_path}...")
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(output_data, f, separators=(',', ':'))

    file_size_mb = os.path.getsize(output_path) / (1024 * 1024)
    elapsed = time.time() - start_time
    print(f"Successfully generated {output_path} ({file_size_mb:.2f} MB) in {elapsed:.1f}s.")

if __name__ == '__main__':
    main()
