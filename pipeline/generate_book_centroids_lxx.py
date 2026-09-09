import json
import math
import os
import time
from collections import Counter, defaultdict
import numpy as np
import umap

BIBLE_BOOKS = [
    # Old Testament (39)
    {"code": "GEN", "name": "Genesis", "testament": "OT", "genre": "Law", "order": 1},
    {"code": "EXO", "name": "Exodus", "testament": "OT", "genre": "Law", "order": 2},
    {"code": "LEV", "name": "Leviticus", "testament": "OT", "genre": "Law", "order": 3},
    {"code": "NUM", "name": "Numbers", "testament": "OT", "genre": "Law", "order": 4},
    {"code": "DEU", "name": "Deuteronomy", "testament": "OT", "genre": "Law", "order": 5},
    {"code": "JOS", "name": "Joshua", "testament": "OT", "genre": "History", "order": 6},
    {"code": "JDG", "name": "Judges", "testament": "OT", "genre": "History", "order": 7},
    {"code": "RUT", "name": "Ruth", "testament": "OT", "genre": "History", "order": 8},
    {"code": "1SA", "name": "1 Samuel", "testament": "OT", "genre": "History", "order": 9},
    {"code": "2SA", "name": "2 Samuel", "testament": "OT", "genre": "History", "order": 10},
    {"code": "1KI", "name": "1 Kings", "testament": "OT", "genre": "History", "order": 11},
    {"code": "2KI", "name": "2 Kings", "testament": "OT", "genre": "History", "order": 12},
    {"code": "1CH", "name": "1 Chronicles", "testament": "OT", "genre": "History", "order": 13},
    {"code": "2CH", "name": "2 Chronicles", "testament": "OT", "genre": "History", "order": 14},
    {"code": "EZR", "name": "Ezra", "testament": "OT", "genre": "History", "order": 15},
    {"code": "NEH", "name": "Nehemiah", "testament": "OT", "genre": "History", "order": 16},
    {"code": "EST", "name": "Esther", "testament": "OT", "genre": "History", "order": 17},
    {"code": "JOB", "name": "Job", "testament": "OT", "genre": "Wisdom", "order": 18},
    {"code": "PSA", "name": "Psalms", "testament": "OT", "genre": "Wisdom", "order": 19},
    {"code": "PRO", "name": "Proverbs", "testament": "OT", "genre": "Wisdom", "order": 20},
    {"code": "ECC", "name": "Ecclesiastes", "testament": "OT", "genre": "Wisdom", "order": 21},
    {"code": "SNG", "name": "Song of Solomon", "testament": "OT", "genre": "Wisdom", "order": 22},
    {"code": "ISA", "name": "Isaiah", "testament": "OT", "genre": "Major Prophets", "order": 23},
    {"code": "JER", "name": "Jeremiah", "testament": "OT", "genre": "Major Prophets", "order": 24},
    {"code": "LAM", "name": "Lamentations", "testament": "OT", "genre": "Major Prophets", "order": 25},
    {"code": "EZK", "name": "Ezekiel", "testament": "OT", "genre": "Major Prophets", "order": 26},
    {"code": "DAN", "name": "Daniel", "testament": "OT", "genre": "Major Prophets", "order": 27},
    {"code": "HOS", "name": "Hosea", "testament": "OT", "genre": "Minor Prophets", "order": 28},
    {"code": "JOL", "name": "Joel", "testament": "OT", "genre": "Minor Prophets", "order": 29},
    {"code": "AMO", "name": "Amos", "testament": "OT", "genre": "Minor Prophets", "order": 30},
    {"code": "OBA", "name": "Obadiah", "testament": "OT", "genre": "Minor Prophets", "order": 31},
    {"code": "JON", "name": "Jonah", "testament": "OT", "genre": "Minor Prophets", "order": 32},
    {"code": "MIC", "name": "Micah", "testament": "OT", "genre": "Minor Prophets", "order": 33},
    {"code": "NAM", "name": "Nahum", "testament": "OT", "genre": "Minor Prophets", "order": 34},
    {"code": "HAB", "name": "Habakkuk", "testament": "OT", "genre": "Minor Prophets", "order": 35},
    {"code": "ZEP", "name": "Zephaniah", "testament": "OT", "genre": "Minor Prophets", "order": 36},
    {"code": "HAG", "name": "Haggai", "testament": "OT", "genre": "Minor Prophets", "order": 37},
    {"code": "ZEC", "name": "Zechariah", "testament": "OT", "genre": "Minor Prophets", "order": 38},
    {"code": "MAL", "name": "Malachi", "testament": "OT", "genre": "Minor Prophets", "order": 39},
    # New Testament (27)
    {"code": "MAT", "name": "Matthew", "testament": "NT", "genre": "Gospels", "order": 40},
    {"code": "MRK", "name": "Mark", "testament": "NT", "genre": "Gospels", "order": 41},
    {"code": "LUK", "name": "Luke", "testament": "NT", "genre": "Gospels", "order": 42},
    {"code": "JHN", "name": "John", "testament": "NT", "genre": "Gospels", "order": 43},
    {"code": "ACT", "name": "Acts", "testament": "NT", "genre": "History", "order": 44},
    {"code": "ROM", "name": "Romans", "testament": "NT", "genre": "Pauline Epistles", "order": 45},
    {"code": "1CO", "name": "1 Corinthians", "testament": "NT", "genre": "Pauline Epistles", "order": 46},
    {"code": "2CO", "name": "2 Corinthians", "testament": "NT", "genre": "Pauline Epistles", "order": 47},
    {"code": "GAL", "name": "Galatians", "testament": "NT", "genre": "Pauline Epistles", "order": 48},
    {"code": "EPH", "name": "Ephesians", "testament": "NT", "genre": "Pauline Epistles", "order": 49},
    {"code": "PHP", "name": "Philippians", "testament": "NT", "genre": "Pauline Epistles", "order": 50},
    {"code": "COL", "name": "Colossians", "testament": "NT", "genre": "Pauline Epistles", "order": 51},
    {"code": "1TH", "name": "1 Thessalonians", "testament": "NT", "genre": "Pauline Epistles", "order": 52},
    {"code": "2TH", "name": "2 Thessalonians", "testament": "NT", "genre": "Pauline Epistles", "order": 53},
    {"code": "1TI", "name": "1 Timothy", "testament": "NT", "genre": "Pauline Epistles", "order": 54},
    {"code": "2TI", "name": "2 Timothy", "testament": "NT", "genre": "Pauline Epistles", "order": 55},
    {"code": "TIT", "name": "Titus", "testament": "NT", "genre": "Pauline Epistles", "order": 56},
    {"code": "PHM", "name": "Philemon", "testament": "NT", "genre": "Pauline Epistles", "order": 57},
    {"code": "HEB", "name": "Hebrews", "testament": "NT", "genre": "General Epistles", "order": 58},
    {"code": "JAS", "name": "James", "testament": "NT", "genre": "General Epistles", "order": 59},
    {"code": "1PE", "name": "1 Peter", "testament": "NT", "genre": "General Epistles", "order": 60},
    {"code": "2PE", "name": "2 Peter", "testament": "NT", "genre": "General Epistles", "order": 61},
    {"code": "1JN", "name": "1 John", "testament": "NT", "genre": "General Epistles", "order": 62},
    {"code": "2JN", "name": "2 John", "testament": "NT", "genre": "General Epistles", "order": 63},
    {"code": "3JN", "name": "3 John", "testament": "NT", "genre": "General Epistles", "order": 64},
    {"code": "JUD", "name": "Jude", "testament": "NT", "genre": "General Epistles", "order": 65},
    {"code": "REV", "name": "Revelation", "testament": "NT", "genre": "Apocalyptic", "order": 66},
]

def main():
    start_time = time.time()
    print("Step 5: Generating Book Centroids for Greek Septuagint & NT...")

    wordmap_path = 'data/output/wordmap_2d_lxx.json'
    verse_index_path = 'data/output/verse_index_lxx.json'
    output_path = 'data/output/bookmap_2d_lxx.json'

    with open(wordmap_path, 'r', encoding='utf-8') as f:
        words_data = json.load(f)
    with open(verse_index_path, 'r', encoding='utf-8') as f:
        verses_data = json.load(f)

    word_dict = {w['id']: w for w in words_data}
    raw_verses = verses_data['verses']
    word_to_verses = verses_data['words']

    # Map verse index to book code
    verse_to_book = []
    book_verse_counts = Counter()
    for v_str in raw_verses:
        ref = v_str.split('|')[0]
        b_code = ref.split()[0]
        verse_to_book.append(b_code)
        book_verse_counts[b_code] += 1

    # Book word frequencies
    book_word_counts = defaultdict(Counter)
    book_total_words = Counter()
    word_book_presence = defaultdict(set)

    for wid, v_indices in word_to_verses.items():
        if wid not in word_dict:
            continue
        for vi in v_indices:
            if vi < len(verse_to_book):
                b_code = verse_to_book[vi]
                book_word_counts[b_code][wid] += 1
                book_total_words[b_code] += 1
                word_book_presence[wid].add(b_code)

    total_books = len(BIBLE_BOOKS)
    book_idf = {}
    for wid, books_set in word_book_presence.items():
        df = len(books_set)
        book_idf[wid] = math.log((1.0 + total_books) / (1.0 + df)) + 1.0

    CONTENT_POS = {'NOUN', 'VERB', 'PROPN', 'ADJ', 'ADV'}

    book_vectors = []
    book_records = []

    for b in BIBLE_BOOKS:
        b_code = b['code']
        counts = book_word_counts[b_code]

        centroid = np.zeros(100, dtype=np.float32)
        total_weight = 0.0

        scored_words = []
        for wid, cnt in counts.items():
            wd = word_dict[wid]
            idf = book_idf.get(wid, 1.0)
            tf = 1.0 + math.log(cnt)
            weight = tf * idf

            vec = np.array(wd['v'], dtype=np.float32)
            centroid += weight * vec
            total_weight += weight

            if wd['pos'] in CONTENT_POS:
                scored_words.append({
                    "id": wid,
                    "w": wd['w'],
                    "pos": wd['pos'],
                    "score": round(weight, 2),
                    "count": cnt,
                    "lemma": wd['original'][0]['lemma'] if wd.get('original') else "",
                    "translit": wd['original'][0]['translit'] if wd.get('original') else ""
                })

        norm = np.linalg.norm(centroid)
        if norm > 1e-6:
            norm_centroid = centroid / norm
        else:
            norm_centroid = centroid

        book_vectors.append(norm_centroid)

        scored_words.sort(key=lambda item: item['score'], reverse=True)
        top_words = scored_words[:20]

        # Calculate closest_words (up to 250 in-book content words ranked by score, then filled by similarity)
        in_book_items = []
        for wid, cnt in counts.items():
            wd = word_dict[wid]
            if wd['pos'] not in CONTENT_POS:
                continue
            tf = 1.0 + math.log(cnt)
            sc = tf * book_idf.get(wid, 1.0)
            sim = float(np.dot(norm_centroid, wd['v']))
            in_book_items.append({
                "id": wid,
                "w": wd["w"],
                "pos": wd["pos"],
                "sim": round(sim, 4),
                "score": round(sc, 2),
                "f": cnt,
                "in_book": True,
                "x": wd["x"],
                "y": wd["y"]
            })
        in_book_items.sort(key=lambda x: x["score"], reverse=True)
        closest_words = in_book_items[:250]

        if len(closest_words) < 250:
            existing_ids = {item["id"] for item in closest_words}
            semantic_candidates = []
            for wid, wd in word_dict.items():
                if wid in existing_ids or wd['pos'] not in CONTENT_POS:
                    continue
                sim = float(np.dot(norm_centroid, wd['v']))
                semantic_candidates.append({
                    "id": wid,
                    "w": wd["w"],
                    "pos": wd["pos"],
                    "sim": round(sim, 4),
                    "score": 0.0,
                    "f": wd["f"],
                    "in_book": False,
                    "x": wd["x"],
                    "y": wd["y"]
                })
            semantic_candidates.sort(key=lambda x: x["sim"], reverse=True)
            needed = 250 - len(closest_words)
            closest_words.extend(semantic_candidates[:needed])

        book_records.append({
            "id": b['code'],
            "code": b['code'],
            "name": b['name'],
            "testament": b['testament'],
            "genre": b['genre'],
            "order": b['order'],
            "verses": book_verse_counts[b_code],
            "total_words": book_total_words[b_code],
            "top_words": top_words,
            "closest_words": closest_words,
            "v": [round(float(val), 3) for val in norm_centroid]
        })

    book_vectors = np.array(book_vectors)

    # 5. 2D Dimensionality Reduction via Classical MDS on Cosine Distance Matrix
    print("Computing 2D coordinates for Greek book map via Multidimensional Scaling...")
    n = len(book_records)
    sim_matrix = np.dot(book_vectors, book_vectors.T)
    # Cosine distance d = max(0.0, 1.0 - sim)
    D2 = np.maximum(0.0, 1.0 - sim_matrix) ** 2

    row_means = D2.mean(axis=1, keepdims=True)
    col_means = D2.mean(axis=0, keepdims=True)
    total_mean = float(D2.mean())

    B = -0.5 * (D2 - row_means - col_means + total_mean)

    def power_eigen(mat, iters=200):
        v = np.ones(n) / math.sqrt(n)
        for _ in range(iters):
            v_next = mat.dot(v)
            norm = np.linalg.norm(v_next)
            if norm == 0:
                break
            v = v_next / norm
        lam = float(v.dot(mat.dot(v)))
        return lam, v

    lam1, v1 = power_eigen(B)
    B_deflated = B - lam1 * np.outer(v1, v1)
    lam2, v2 = power_eigen(B_deflated)

    s1 = math.sqrt(max(0.0001, lam1))
    s2 = math.sqrt(max(0.0001, lam2))

    raw_x = v1 * s1
    raw_y = v2 * s2

    max_range = max(float(np.max(np.abs(raw_x))), float(np.max(np.abs(raw_y)))) or 1.0
    target_scale = 8.0 / max_range

    for i, b in enumerate(book_records):
        b['x'] = round(float(raw_x[i] * target_scale), 3)
        b['y'] = round(float(raw_y[i] * target_scale), 3)

        sim_scores = []
        for j, other in enumerate(book_records):
            if i != j:
                score = float(sim_matrix[i, j])
                sim_scores.append((other['code'], other['name'], score))

        sim_scores.sort(key=lambda item: item[2], reverse=True)
        b['nearest_books'] = [
            {"code": item[0], "name": item[1], "sim": round(item[2], 3)}
            for item in sim_scores[:6]
        ]

    # 6. Generate links between books (connect each book to its top 2 closest neighbors)
    links_set = set()
    links = []
    for b in book_records:
        for nb in b['nearest_books'][:2]:
            t_code = nb["code"]
            edge_key = tuple(sorted([b['code'], t_code]))
            if edge_key not in links_set:
                links_set.add(edge_key)
                links.append({
                    "source": edge_key[0],
                    "target": edge_key[1],
                    "sim": nb["sim"]
                })

    # Ensure top cross-testament bridge links connect OT and NT
    ot_nt_pairs = []
    for i, b in enumerate(book_records):
        for j, other in enumerate(book_records):
            if i < j and b['testament'] != other['testament']:
                ot_nt_pairs.append((b['code'], other['code'], float(sim_matrix[i, j])))
    ot_nt_pairs.sort(key=lambda x: x[2], reverse=True)

    for b1, b2, sim in ot_nt_pairs[:5]:
        edge_key = tuple(sorted([b1, b2]))
        if edge_key not in links_set:
            links_set.add(edge_key)
            links.append({
                "source": edge_key[0],
                "target": edge_key[1],
                "sim": round(sim, 3)
            })

    output_data = {
        "books": book_records,
        "links": links
    }

    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(output_data, f, separators=(',', ':'), ensure_ascii=False)

    elapsed = round(time.time() - start_time, 2)
    print(f"Successfully generated {output_path} ({len(book_records)} books, {len(links)} links) in {elapsed}s.")

if __name__ == '__main__':
    main()
