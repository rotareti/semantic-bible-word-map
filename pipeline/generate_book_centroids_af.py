"""
Generate Book Centroids & Graph for Apostolic Fathers (AF)
Outputs: data/output/bookmap_2d_af.json
"""

import json
import math
import os
from collections import Counter, defaultdict

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
    print("Loading verse index and word map for Apostolic Fathers...")
    verse_index_path = 'data/output/verse_index_af.json'
    wordmap_path = 'data/output/wordmap_2d_af.json'
    output_path = 'data/output/bookmap_2d_af.json'

    if not os.path.exists(verse_index_path):
        raise FileNotFoundError(f"Missing {verse_index_path}")
    if not os.path.exists(wordmap_path):
        raise FileNotFoundError(f"Missing {wordmap_path}")

    with open(verse_index_path, 'r', encoding='utf-8') as f:
        v_data = json.load(f)
    with open(wordmap_path, 'r', encoding='utf-8') as f:
        w_data = json.load(f)

    word_dict = {d['id']: d for d in w_data}
    raw_verses = v_data['verses']
    verse_books = [v.split()[0] for v in raw_verses]
    word_to_verses = v_data['words']

    # 1. Count occurrences per book
    book_word_counts = defaultdict(Counter)
    book_verse_counts = Counter()
    doc_freq = defaultdict(int)

    for idx, b_code in enumerate(verse_books):
        book_verse_counts[b_code] += 1

    for word_id, v_indices in word_to_verses.items():
        if word_id not in word_dict:
            continue
        seen_books = set()
        for vi in v_indices:
            b = verse_books[vi]
            book_word_counts[b][word_id] += 1
            seen_books.add(b)
        for b in seen_books:
            doc_freq[word_id] += 1

    total_books = len(AF_BOOKS)
    idf = {w: math.log((1.0 + total_books) / (1.0 + df)) + 1.0 for w, df in doc_freq.items()}

    # 2. Compute TF-IDF weighted centroids
    book_centroids = {}
    book_distinctive_words = {}

    for b_info in AF_BOOKS:
        b_code = b_info["code"]
        counts = book_word_counts[b_code]
        vec = [0.0] * 100
        scores = []

        for w, cnt in counts.items():
            if w not in word_dict:
                continue
            tf = 1.0 + math.log(cnt)
            weight = tf * idf[w]
            scores.append((w, weight))
            w_vec = word_dict[w]['v']
            for i in range(100):
                vec[i] += weight * w_vec[i]

        norm = math.sqrt(sum(x * x for x in vec))
        if norm > 0:
            book_centroids[b_code] = [round(x / norm, 5) for x in vec]
        else:
            book_centroids[b_code] = [0.0] * 100

        CONTENT_POS = {'NOUN', 'VERB', 'PROPN', 'ADJ', 'ADV'}
        scores.sort(key=lambda item: item[1], reverse=True)
        content_scores = [item for item in scores if word_dict[item[0]]['pos'] in CONTENT_POS]

        distinctive = []
        for w, sc in content_scores[:15]:
            d = word_dict[w]
            distinctive.append({
                "id": w,
                "w": d["w"],
                "pos": d["pos"],
                "score": round(sc, 2)
            })
        book_distinctive_words[b_code] = distinctive

    # 3. Book-to-Book Cosine Similarities
    book_nearest = {}
    book_codes = [b["code"] for b in AF_BOOKS]
    n = len(book_codes)

    for i, b1 in enumerate(book_codes):
        v1 = book_centroids[b1]
        sims = []
        for j, b2 in enumerate(book_codes):
            if b1 == b2:
                continue
            v2 = book_centroids[b2]
            cos_sim = sum(a * b for a, b in zip(v1, v2))
            sims.append((b2, cos_sim))
        sims.sort(key=lambda item: item[1], reverse=True)
        book_nearest[b1] = [
            {"code": b_code, "name": BOOK_MAP[b_code]["name"], "sim": round(sim, 4)}
            for b_code, sim in sims[:6]
        ]

    # 4. 2D Dimensionality Reduction via Classical MDS
    print("Computing 2D coordinates for book map via Multidimensional Scaling...")
    D2 = [[0.0] * n for _ in range(n)]
    for i in range(n):
        for j in range(n):
            cos_sim = sum(a * b for a, b in zip(book_centroids[book_codes[i]], book_centroids[book_codes[j]]))
            d = max(0.0, 1.0 - cos_sim)
            D2[i][j] = d * d

    row_means = [sum(row) / n for row in D2]
    col_means = [sum(D2[i][j] for i in range(n)) / n for j in range(n)]
    total_mean = sum(row_means) / n

    B = [[-0.5 * (D2[i][j] - row_means[i] - col_means[j] + total_mean) for j in range(n)] for i in range(n)]

    def power_eigen(mat, iters=200):
        v = [1.0 / math.sqrt(n)] * n
        for _ in range(iters):
            v_next = [sum(mat[i][j] * v[j] for j in range(n)) for i in range(n)]
            norm = math.sqrt(sum(x * x for x in v_next))
            if norm == 0:
                break
            v = [x / norm for x in v_next]
        lam = sum(v[i] * sum(mat[i][j] * v[j] for j in range(n)) for i in range(n))
        return lam, v

    lam1, v1 = power_eigen(B)
    B_deflated = [[B[i][j] - lam1 * v1[i] * v1[j] for j in range(n)] for i in range(n)]
    lam2, v2 = power_eigen(B_deflated)

    s1 = math.sqrt(max(0.0001, lam1))
    s2 = math.sqrt(max(0.0001, lam2))

    raw_x = [v1[i] * s1 for i in range(n)]
    raw_y = [v2[i] * s2 for i in range(n)]

    max_range = max(max(abs(x) for x in raw_x), max(abs(y) for y in raw_y)) or 1.0
    target_scale = 8.0 / max_range

    # Center on Apostolic core (1CLE + IEPH + IROM + POLY)
    core_codes = {'1CLE', 'IEPH', 'IROM', 'POLY'}
    core_xs = [raw_x[i] * target_scale for i, b in enumerate(AF_BOOKS) if b["code"] in core_codes]
    core_ys = [raw_y[i] * target_scale for i, b in enumerate(AF_BOOKS) if b["code"] in core_codes]
    core_cx = sum(core_xs) / len(core_xs) if core_xs else 0.0
    core_cy = sum(core_ys) / len(core_ys) if core_ys else 0.0

    # Load Christ anchor vector if available
    christ_vec = None
    anchor_path = 'data/output/christ_anchor_af.json'
    if os.path.exists(anchor_path):
        try:
            with open(anchor_path, 'r', encoding='utf-8') as f:
                christ_vec = json.load(f).get('v')
        except Exception:
            pass

    # 5. Generate links between books (connect each book to its top 2 closest neighbors)
    links_set = set()
    book_links = []
    for b_code in book_codes:
        for nb in book_nearest[b_code][:2]:
            t_code = nb["code"]
            edge_key = tuple(sorted([b_code, t_code]))
            if edge_key not in links_set:
                links_set.add(edge_key)
                book_links.append({
                    "source": edge_key[0],
                    "target": edge_key[1],
                    "sim": nb["sim"]
                })

    # 6. Assemble final book nodes
    output_books = []
    for i, b_info in enumerate(AF_BOOKS):
        b_code = b_info["code"]
        total_words = sum(book_word_counts[b_code].values())
        bx = round((raw_x[i] * target_scale) - core_cx, 3)
        by = round((raw_y[i] * target_scale) - core_cy, 3)
        r = round(math.sqrt(bx * bx + by * by), 3)
        sim_c = round(sum(a * b for a, b in zip(book_centroids[b_code], christ_vec)), 4) if christ_vec else None
        node = {
            "id": b_code,
            "code": b_code,
            "name": b_info["name"],
            "testament": b_info["testament"],
            "genre": b_info["genre"],
            "order": b_info["order"],
            "verses": book_verse_counts[b_code],
            "total_words": total_words,
            "x": bx,
            "y": by,
            "r": r,
            "sim_christ": sim_c,
            "v": book_centroids[b_code],
            "top_words": book_distinctive_words[b_code],
            "closest_words": [],
            "nearest_books": book_nearest[b_code]
        }
        output_books.append(node)

    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump({"books": output_books, "links": book_links}, f, separators=(',', ':'), ensure_ascii=False)

    mb = os.path.getsize(output_path) / (1024 * 1024)
    print(f"[DONE] Successfully generated {output_path} ({mb:.2f} MB, {len(output_books)} works, {len(book_links)} links)")


if __name__ == '__main__':
    main()
