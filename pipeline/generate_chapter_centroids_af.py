"""
Generate Chapter Centroids & Cross-Reference Map for Apostolic Fathers (AF)
Outputs: data/output/chaptermap_2d_af.json
"""

import json
import math
import os
import time
from collections import Counter, defaultdict
import numpy as np

AF_BOOKS = [
    {"code": "1CLE", "name": "1 Clement", "testament": "AF", "genre": "Apostolic Epistles", "order": 1},
    {"code": "2CLE", "name": "2 Clement", "testament": "AF", "genre": "Early Homilies", "order": 2},
    {"code": "IEPH", "name": "Ignatius to the Ephesians", "testament": "AF", "genre": "Ignatian Epistles", "order": 3},
    {"code": "IMAG", "name": "Ignatius to the Magnesians", "testament": "AF", "genre": "Ignatian Epistles", "order": 4},
    {"code": "ITRA", "name": "Ignatius to the Trallians", "testament": "AF", "genre": "Ignatian Epistles", "order": 5},
    {"code": "IROM", "name": "Ignatius to the Romans", "testament": "AF", "genre": "Ignatian Epistles", "order": 6},
    {"code": "IPHL", "name": "Ignatius to the Philadelphians", "testament": "AF", "genre": "Ignatian Epistles", "order": 7},
    {"code": "ISMY", "name": "Ignatius to the Smyrnaeans", "testament": "AF", "genre": "Ignatian Epistles", "order": 8},
    {"code": "IPOL", "name": "Ignatius to Polycarp", "testament": "AF", "genre": "Ignatian Epistles", "order": 9},
    {"code": "POLY", "name": "Polycarp to the Philippians", "testament": "AF", "genre": "Apostolic Epistles", "order": 10},
    {"code": "DID",  "name": "Didache", "testament": "AF", "genre": "Church Orders", "order": 11},
    {"code": "BAR",  "name": "Epistle of Barnabas", "testament": "AF", "genre": "Theological Treatises", "order": 12},
    {"code": "HERM", "name": "Shepherd of Hermas", "testament": "AF", "genre": "Early Apocalypses", "order": 13},
    {"code": "MPOL", "name": "Martyrdom of Polycarp", "testament": "AF", "genre": "Early Acts & Martyrdoms", "order": 14},
    {"code": "DIOG", "name": "Epistle to Diognetus", "testament": "AF", "genre": "Early Apologetics", "order": 15}
]

BOOK_MAP = {b["code"]: b for b in AF_BOOKS}


def main():
    start_time = time.time()
    print("Generating Chapter Centroids for Apostolic Fathers...")

    verse_index_path = 'data/output/verse_index_af.json'
    wordmap_path = 'data/output/wordmap_2d_af.json'
    output_path = 'data/output/chaptermap_2d_af.json'

    if not os.path.exists(verse_index_path):
        raise FileNotFoundError(f"Missing {verse_index_path}")
    if not os.path.exists(wordmap_path):
        raise FileNotFoundError(f"Missing {wordmap_path}")

    with open(verse_index_path, 'r', encoding='utf-8') as f:
        v_data = json.load(f)
    with open(wordmap_path, 'r', encoding='utf-8') as f:
        w_data = json.load(f)

    word_dict = {w['id']: w for w in w_data}
    raw_verses = v_data['verses']
    word_to_verses = v_data['words']

    # 1. Map verse index to chapter key: e.g. "1CLE 1"
    verse_chapters = []
    chapter_to_verses = defaultdict(list)
    chapter_keys_ordered = []

    for vi, raw_v in enumerate(raw_verses):
        ref, _, _ = raw_v.split('|', 2)
        parts = ref.split()
        b_code = parts[0]
        c_num = parts[1].split(':')[0]
        chap_id = f"{b_code}.{c_num}"
        verse_chapters.append(chap_id)
        if chap_id not in chapter_to_verses:
            chapter_keys_ordered.append(chap_id)
        chapter_to_verses[chap_id].append(vi)

    total_chapters = len(chapter_keys_ordered)
    print(f"Aggregating {len(raw_verses)} sections into {total_chapters} chapters across 15 works.")

    # 2. Compute chapter word frequencies
    chapter_words = defaultdict(Counter)
    for wid, v_indices in word_to_verses.items():
        if wid not in word_dict:
            continue
        for vi in v_indices:
            chap_id = verse_chapters[vi]
            chapter_words[chap_id][wid] += 1

    # 3. Compute Inverse Chapter Frequency (ICF)
    icf = {}
    doc_freq = defaultdict(int)
    for chap_id in chapter_keys_ordered:
        for wid in chapter_words[chap_id].keys():
            doc_freq[wid] += 1

    for wid, df in doc_freq.items():
        icf[wid] = math.log((total_chapters + 1.0) / (df + 1.0)) + 1.0

    # 4. Compute 100D Centroids and 2D Coordinates for each chapter
    CONTENT_POS = {'NOUN', 'VERB', 'PROPN', 'ADJ', 'ADV'}
    centroid_matrix = np.zeros((total_chapters, 100), dtype=np.float32)
    chapter_records = []

    for ci, chap_id in enumerate(chapter_keys_ordered):
        b_code, c_str = chap_id.split('.')
        c_num = int(c_str)
        b_info = BOOK_MAP.get(b_code, {"name": b_code, "testament": "AF", "genre": "Patristics"})

        w_counts = chapter_words[chap_id]
        vec = np.zeros(100, dtype=np.float32)
        weighted_x = 0.0
        weighted_y = 0.0
        total_weight = 0.0

        content_candidates = []
        for wid, count in w_counts.items():
            wd = word_dict[wid]
            sublinear_tf = 1.0 + math.log(count)
            wt = sublinear_tf * icf[wid]

            vec += wt * np.array(wd['v'], dtype=np.float32)
            weighted_x += wt * wd['x']
            weighted_y += wt * wd['y']
            total_weight += wt

            if wd['pos'] in CONTENT_POS:
                content_candidates.append((wid, wt))

        norm = np.linalg.norm(vec)
        if norm > 1e-6:
            centroid_matrix[ci] = vec / norm

        cx = round(weighted_x / total_weight, 3) if total_weight > 0 else 0.0
        cy = round(weighted_y / total_weight, 3) if total_weight > 0 else 0.0

        content_candidates.sort(key=lambda x: x[1], reverse=True)
        top_words = [item[0] for item in content_candidates[:12]]

        chapter_records.append({
            "id": chap_id,
            "b": b_code,
            "c": c_num,
            "book_name": b_info["name"],
            "genre": b_info.get("genre", "Patristics"),
            "testament": "AF",
            "verse_count": len(chapter_to_verses[chap_id]),
            "x": cx,
            "y": cy,
            "w": top_words,
            "r": []
        })

    # 5. Compute top nearest chapters via cosine similarity
    print("Computing top-16 semantic cross-references for chapters...")
    K = min(16, total_chapters - 1)
    sim_mat = np.dot(centroid_matrix, centroid_matrix.T)

    for ci in range(total_chapters):
        sim_mat[ci, ci] = -1.0
        top_k = np.argpartition(sim_mat[ci], -K)[-K:]
        top_k_sorted = top_k[np.argsort(-sim_mat[ci][top_k])]

        refs = []
        for t_ci in top_k_sorted:
            sim = round(float(sim_mat[ci, t_ci]), 3)
            if sim > 0:
                refs.append([chapter_records[t_ci]["id"], sim])
        chapter_records[ci]["r"] = refs

    # 6. Save chaptermap
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump({"count": total_chapters, "chapters": chapter_records}, f, separators=(',', ':'), ensure_ascii=False)

    elapsed = time.time() - start_time
    mb = os.path.getsize(output_path) / (1024 * 1024)
    print(f"[DONE] Successfully generated {output_path} in {elapsed:.2f}s ({mb:.2f} MB, {total_chapters} chapters)")


if __name__ == '__main__':
    main()
