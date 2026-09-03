import json
import math
from collections import Counter, defaultdict

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
    {"code": "REV", "name": "Revelation", "testament": "NT", "genre": "Apocalypse", "order": 66}
]

BOOK_MAP = {b["code"]: b for b in BIBLE_BOOKS}

def main():
    print("Loading verse index and word map...")
    with open('data/output/verse_index.json', 'r', encoding='utf-8') as f:
        v_data = json.load(f)
    with open('data/output/wordmap_2d.json', 'r', encoding='utf-8') as f:
        w_data = json.load(f)

    word_dict = {d['id']: d for d in w_data}
    verse_books = [v.split()[0] for v in v_data['verses']]
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

    total_books = len(BIBLE_BOOKS)
    # Smooth IDF
    idf = {w: math.log((1.0 + total_books) / (1.0 + df)) + 1.0 for w, df in doc_freq.items()}

    # 2. Compute TF-IDF weighted centroids
    book_centroids = {}
    book_distinctive_words = {}

    for b_info in BIBLE_BOOKS:
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

        # Sort distinctive words by TF-IDF score (content words only)
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
    book_codes = [b["code"] for b in BIBLE_BOOKS]
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

    # 4. Characteristic vocabulary words for each book (prioritizing in-book words, up to 250)
    print("Computing characteristic vocabulary words for each book...")
    book_closest_words = {}
    CONTENT_POS = {'NOUN', 'VERB', 'PROPN', 'ADJ', 'ADV'}
    for b_code in book_codes:
        c_vec = book_centroids[b_code]
        counts = book_word_counts[b_code]
        
        # In-book content words ranked by TF-IDF score
        in_book_items = []
        for w, cnt in counts.items():
            if w not in word_dict:
                continue
            d = word_dict[w]
            if d['pos'] not in CONTENT_POS:
                continue
            tf = 1.0 + math.log(cnt)
            sc = tf * idf[w]
            sim = sum(a * b for a, b in zip(c_vec, d['v']))
            in_book_items.append({
                "id": w,
                "w": d["w"],
                "pos": d["pos"],
                "sim": round(sim, 4),
                "score": round(sc, 2),
                "f": cnt,
                "in_book": True,
                "x": d["x"],
                "y": d["y"]
            })
        
        # Sort in-book words by TF-IDF score
        in_book_items.sort(key=lambda x: x["score"], reverse=True)
        selected_words = in_book_items[:250]
        
        # If the book has fewer than 250 content words (e.g. short epistles), fill remaining with closest semantic neighbors
        if len(selected_words) < 250:
            existing_ids = {item["id"] for item in selected_words}
            semantic_candidates = []
            for w_id, d in word_dict.items():
                if w_id in existing_ids or d['pos'] not in CONTENT_POS:
                    continue
                sim = sum(a * b for a, b in zip(c_vec, d['v']))
                semantic_candidates.append({
                    "id": w_id,
                    "w": d["w"],
                    "pos": d["pos"],
                    "sim": round(sim, 4),
                    "score": 0.0,
                    "f": d["f"],
                    "in_book": False,
                    "x": d["x"],
                    "y": d["y"]
                })
            semantic_candidates.sort(key=lambda x: x["sim"], reverse=True)
            needed = 250 - len(selected_words)
            selected_words.extend(semantic_candidates[:needed])
            
        book_closest_words[b_code] = selected_words

    # 5. 2D Dimensionality Reduction via Classical MDS on Cosine Distance Matrix
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

    # 6. Generate links between books (connect each book to its top 2 closest neighbors)
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

    # 7. Assemble final book nodes
    output_books = []
    for i, b_info in enumerate(BIBLE_BOOKS):
        b_code = b_info["code"]
        total_words = sum(book_word_counts[b_code].values())
        node = {
            "id": b_code,
            "code": b_code,
            "name": b_info["name"],
            "testament": b_info["testament"],
            "genre": b_info["genre"],
            "order": b_info["order"],
            "verses": book_verse_counts[b_code],
            "total_words": total_words,
            "x": round(raw_x[i] * target_scale, 3),
            "y": round(raw_y[i] * target_scale, 3),
            "v": book_centroids[b_code],
            "top_words": book_distinctive_words[b_code],
            "closest_words": book_closest_words[b_code],
            "nearest_books": book_nearest[b_code]
        }
        output_books.append(node)

    out_file = 'data/output/bookmap_2d.json'
    with open(out_file, 'w', encoding='utf-8') as f:
        json.dump({"books": output_books, "links": book_links}, f, separators=(',', ':'))

    print(f"Successfully generated book map data with {len(output_books)} books and {len(book_links)} links!")
    print(f"Saved to {out_file}")

if __name__ == '__main__':
    main()
