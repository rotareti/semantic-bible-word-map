import json
import math
import os
import time
from collections import defaultdict
import numpy as np

def main():
    start_time = time.time()
    print("Step 4: Generating Verse Centroids and Cross-Reference Map for Greek Septuagint & NT...")

    verse_index_path = 'data/output/verse_index_lxx.json'
    wordmap_path = 'data/output/wordmap_2d_lxx.json'
    output_path = 'data/output/versemap_2d_lxx.json'

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

    print(f"Loaded {total_verses} verses and {len(word_dict)} Greek vocabulary words.")

    # Invert word_to_verses to get words per verse
    print("Indexing words per verse...")
    verse_to_words = defaultdict(list)
    for wid, v_indices in word_to_verses.items():
        if wid in word_dict:
            for vi in v_indices:
                verse_to_words[vi].append(wid)

    # Compute Inverse Verse Frequency (IVF) weights
    idf = {}
    for wid, v_indices in word_to_verses.items():
        df = len(v_indices)
        idf[wid] = math.log((total_verses + 1.0) / (df + 1.0)) + 1.0

    # Compute 100D Centroid Matrix and 2D Coordinates
    print("Calculating 100D embeddings and 2D weighted coordinates...")
    centroid_matrix = np.zeros((total_verses, 100), dtype=np.float32)
    coords_2d = []
    top_content_words = []
    verse_meta = []
    book_sum_x = defaultdict(float)
    book_sum_y = defaultdict(float)
    book_cnt = defaultdict(int)

    CONTENT_POS = {'NOUN', 'VERB', 'PROPN', 'ADJ', 'ADV'}
    STOPWORDS = {
        'if', 'and', 'but', 'for', 'or', 'nor', 'lest', 'so', 'then', 'yet', 'also',
        'not', 'no', 'as', 'than', 'when', 'where', 'how', 'why', 'what', 'who', 'whom',
        'which', 'that', 'this', 'these', 'those', 'you', 'i', 'me', 'my', 'we', 'us',
        'our', 'he', 'him', 'his', 'she', 'her', 'it', 'its', 'they', 'them', 'their',
        'themself', 'themselves', 'myself', 'yourself', 'himself', 'herself', 'justas',
        'notanymore', 'whither', 'fromthere'
    }

    for vi, raw_v in enumerate(raw_verses):
        ref, _ = raw_v.split('|', 1)
        parts = ref.split()
        b_code = parts[0]
        c_num, v_num = parts[1].split(':')
        verse_meta.append((ref, b_code, int(c_num), int(v_num)))

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
            if wd['pos'] in CONTENT_POS and wd['w'].lower() not in STOPWORDS:
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
                coords_2d[vi] = (5.0, 5.0)


    # Batch compute top-16 cross-references using matrix multiplication
    print("Computing top-16 semantic cross-references for all verses...")
    TOP_K = 16
    BATCH_SIZE = 1000
    all_refs = [None] * total_verses

    for start_idx in range(0, total_verses, BATCH_SIZE):
        end_idx = min(start_idx + BATCH_SIZE, total_verses)
        batch_matrix = centroid_matrix[start_idx:end_idx]

        sim_matrix = np.dot(batch_matrix, centroid_matrix.T)

        for i in range(end_idx - start_idx):
            global_idx = start_idx + i
            sim_matrix[i, global_idx] = -1.0

            cand_indices = np.argpartition(sim_matrix[i], -TOP_K)[-TOP_K:]
            cand_indices = cand_indices[np.argsort(-sim_matrix[i][cand_indices])]

            refs_for_verse = []
            for target_idx in cand_indices:
                score = float(sim_matrix[i, target_idx])
                if score > 0.15:
                    target_ref = verse_meta[target_idx][0]
                    refs_for_verse.append([
                        target_ref,
                        round(score, 3)
                    ])
            all_refs[global_idx] = refs_for_verse

    print("Assembling final verse dataset...")
    christ_vec = None
    anchor_path = 'data/output/christ_anchor_lxx.json'
    if os.path.exists(anchor_path):
        try:
            with open(anchor_path, 'r', encoding='utf-8') as f:
                christ_vec = np.array(json.load(f).get('v'), dtype=np.float32)
        except Exception:
            pass

    output_records = []
    for vi in range(total_verses):
        ref, b_code, c_num, v_num = verse_meta[vi]
        cx, cy = coords_2d[vi]
        c_words = top_content_words[vi]
        c_refs = all_refs[vi]

        rec = {
            "id": ref,
            "x": cx,
            "y": cy,
            "w": c_words,
            "r": c_refs
        }
        if christ_vec is not None:
            c_norm = np.linalg.norm(centroid_matrix[vi])
            if c_norm > 1e-6:
                rec["sc"] = round(float(np.dot(centroid_matrix[vi], christ_vec)), 3)
        output_records.append(rec)

    output_data = {
        "count": total_verses,
        "verses": output_records
    }

    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(output_data, f, separators=(',', ':'), ensure_ascii=False)

    elapsed = round(time.time() - start_time, 2)
    file_size_mb = round(os.path.getsize(output_path) / (1024 * 1024), 2)
    print(f"Successfully generated {output_path} ({file_size_mb} MB) for {total_verses} verses in {elapsed}s.")

if __name__ == '__main__':
    main()
