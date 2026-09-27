"""
Generate Verse/Section Centroids & Cross-Reference Map for Apostolic Fathers (AF)
Outputs: data/output/versemap_2d_af.json
"""

import json
import math
import os
import time
from collections import defaultdict
import numpy as np


def main():
    start_time = time.time()
    print("Generating Verse Centroids and Cross-Reference Map for Apostolic Fathers...")

    verse_index_path = 'data/output/verse_index_af.json'
    wordmap_path = 'data/output/wordmap_2d_af.json'
    output_path = 'data/output/versemap_2d_af.json'

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

    print(f"Loaded {total_verses} sections and {len(word_dict)} vocabulary words.")

    # 1. Invert word_to_verses to get words per verse
    print("Indexing words per verse...")
    verse_to_words = defaultdict(list)
    for wid, v_indices in word_to_verses.items():
        if wid in word_dict:
            for vi in v_indices:
                verse_to_words[vi].append(wid)

    # 2. Compute Inverse Verse Frequency (IVF) weights
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
    book_sum_x = defaultdict(float)
    book_sum_y = defaultdict(float)
    book_cnt = defaultdict(int)

    CONTENT_POS = {'NOUN', 'VERB', 'PROPN', 'ADJ', 'ADV'}

    for vi, raw_v in enumerate(raw_verses):
        parts = raw_v.split('|', 2)
        ref = parts[0]
        ref_parts = ref.split()
        b_code = ref_parts[0]
        cv_parts = ref_parts[1].split(':')
        c_num = int(cv_parts[0]) if len(cv_parts) > 0 else 1
        v_num = int(cv_parts[1]) if len(cv_parts) > 1 else 1
        verse_meta.append((ref, b_code, c_num, v_num))

        w_ids = verse_to_words[vi]
        if not w_ids:
            coords_2d.append(None)
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
            vx = round(weighted_x / total_weight, 3)
            vy = round(weighted_y / total_weight, 3)
            coords_2d.append((vx, vy))
            book_sum_x[b_code] += vx
            book_sum_y[b_code] += vy
            book_cnt[b_code] += 1
        else:
            coords_2d.append(None)

        content_candidates.sort(key=lambda item: item[1], reverse=True)
        top_content_words.append([item[0] for item in content_candidates[:12]])

    # Assign book centroid to verses with no vocabulary content
    for vi in range(total_verses):
        if coords_2d[vi] is None:
            b_code = verse_meta[vi][1]
            cnt = book_cnt.get(b_code, 0)
            if cnt > 0:
                coords_2d[vi] = (round(book_sum_x[b_code] / cnt, 3), round(book_sum_y[b_code] / cnt, 3))
            else:
                coords_2d[vi] = (0.0, 0.0)

    # 4. Batch compute top cross-references using matrix multiplication
    print("Computing top-16 semantic cross-references for all sections...")
    cross_references = [[] for _ in range(total_verses)]
    batch_size = 1000
    num_batches = (total_verses + batch_size - 1) // batch_size

    K = min(16, total_verses - 1)

    for b_idx in range(num_batches):
        start_i = b_idx * batch_size
        end_i = min(start_i + batch_size, total_verses)
        batch_mat = centroid_matrix[start_i:end_i]

        sim_scores = np.dot(batch_mat, centroid_matrix.T)

        for row_idx, vi in enumerate(range(start_i, end_i)):
            sim_scores[row_idx, vi] = -1.0
            top_k_indices = np.argpartition(sim_scores[row_idx], -K)[-K:]
            top_k_sorted = top_k_indices[np.argsort(-sim_scores[row_idx][top_k_indices])]

            refs_for_v = []
            for target_vi in top_k_sorted:
                sim = round(float(sim_scores[row_idx, target_vi]), 3)
                if sim > 0:
                    refs_for_v.append([verse_meta[target_vi][0], sim])
            cross_references[vi] = refs_for_v

    # 5. Assemble and save optimized versemap output
    print("Serializing versemap output...")
    output_records = []
    for vi in range(total_verses):
        output_records.append({
            "id": verse_meta[vi][0],
            "x": coords_2d[vi][0],
            "y": coords_2d[vi][1],
            "w": top_content_words[vi],
            "r": cross_references[vi]
        })

    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump({"count": total_verses, "verses": output_records}, f, separators=(',', ':'), ensure_ascii=False)

    elapsed = time.time() - start_time
    mb = os.path.getsize(output_path) / (1024 * 1024)
    print(f"[DONE] Successfully generated {output_path} in {elapsed:.2f}s ({mb:.2f} MB, {len(output_records)} records)")


if __name__ == '__main__':
    main()
