import json
import math
import os
import time
from collections import Counter, defaultdict
import numpy as np

BIBLE_BOOKS = [
    # Pentateuch / Law (5)
    {"code": "GEN", "name": "Genesis", "testament": "OT", "genre": "Law", "order": 1},
    {"code": "EXO", "name": "Exodus", "testament": "OT", "genre": "Law", "order": 2},
    {"code": "LEV", "name": "Leviticus", "testament": "OT", "genre": "Law", "order": 3},
    {"code": "NUM", "name": "Numbers", "testament": "OT", "genre": "Law", "order": 4},
    {"code": "DEU", "name": "Deuteronomy", "testament": "OT", "genre": "Law", "order": 5},
    # Historical Books (16)
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
    {"code": "TOB", "name": "Tobit", "testament": "OT", "genre": "Deuterocanon", "order": 17},
    {"code": "JDT", "name": "Judith", "testament": "OT", "genre": "Deuterocanon", "order": 18},
    {"code": "EST", "name": "Esther", "testament": "OT", "genre": "History", "order": 19},
    {"code": "1MA", "name": "1 Maccabees", "testament": "OT", "genre": "Deuterocanon", "order": 20},
    {"code": "2MA", "name": "2 Maccabees", "testament": "OT", "genre": "Deuterocanon", "order": 21},
    # Poetic & Wisdom Books (7)
    {"code": "JOB", "name": "Job", "testament": "OT", "genre": "Wisdom", "order": 22},
    {"code": "PSA", "name": "Psalms", "testament": "OT", "genre": "Wisdom", "order": 23},
    {"code": "PRO", "name": "Proverbs", "testament": "OT", "genre": "Wisdom", "order": 24},
    {"code": "ECC", "name": "Ecclesiastes", "testament": "OT", "genre": "Wisdom", "order": 25},
    {"code": "SNG", "name": "Song of Solomon", "testament": "OT", "genre": "Wisdom", "order": 26},
    {"code": "WIS", "name": "Wisdom of Solomon", "testament": "OT", "genre": "Deuterocanon", "order": 27},
    {"code": "SIR", "name": "Sirach", "testament": "OT", "genre": "Deuterocanon", "order": 28},
    # Major Prophets (6)
    {"code": "ISA", "name": "Isaiah", "testament": "OT", "genre": "Major Prophets", "order": 29},
    {"code": "JER", "name": "Jeremiah", "testament": "OT", "genre": "Major Prophets", "order": 30},
    {"code": "LAM", "name": "Lamentations", "testament": "OT", "genre": "Major Prophets", "order": 31},
    {"code": "BAR", "name": "Baruch", "testament": "OT", "genre": "Deuterocanon", "order": 32},
    {"code": "EZK", "name": "Ezekiel", "testament": "OT", "genre": "Major Prophets", "order": 33},
    {"code": "DAN", "name": "Daniel", "testament": "OT", "genre": "Major Prophets", "order": 34},
    # Minor Prophets (12)
    {"code": "HOS", "name": "Hosea", "testament": "OT", "genre": "Minor Prophets", "order": 35},
    {"code": "JOL", "name": "Joel", "testament": "OT", "genre": "Minor Prophets", "order": 36},
    {"code": "AMO", "name": "Amos", "testament": "OT", "genre": "Minor Prophets", "order": 37},
    {"code": "OBA", "name": "Obadiah", "testament": "OT", "genre": "Minor Prophets", "order": 38},
    {"code": "JON", "name": "Jonah", "testament": "OT", "genre": "Minor Prophets", "order": 39},
    {"code": "MIC", "name": "Micah", "testament": "OT", "genre": "Minor Prophets", "order": 40},
    {"code": "NAM", "name": "Nahum", "testament": "OT", "genre": "Minor Prophets", "order": 41},
    {"code": "HAB", "name": "Habakkuk", "testament": "OT", "genre": "Minor Prophets", "order": 42},
    {"code": "ZEP", "name": "Zephaniah", "testament": "OT", "genre": "Minor Prophets", "order": 43},
    {"code": "HAG", "name": "Haggai", "testament": "OT", "genre": "Minor Prophets", "order": 44},
    {"code": "ZEC", "name": "Zechariah", "testament": "OT", "genre": "Minor Prophets", "order": 45},
    {"code": "MAL", "name": "Malachi", "testament": "OT", "genre": "Minor Prophets", "order": 46},
    # Gospels & Acts (5)
    {"code": "MAT", "name": "Matthew", "testament": "NT", "genre": "Gospels", "order": 47},
    {"code": "MRK", "name": "Mark", "testament": "NT", "genre": "Gospels", "order": 48},
    {"code": "LUK", "name": "Luke", "testament": "NT", "genre": "Gospels", "order": 49},
    {"code": "JHN", "name": "John", "testament": "NT", "genre": "Gospels", "order": 50},
    {"code": "ACT", "name": "Acts", "testament": "NT", "genre": "History", "order": 51},
    # Pauline Epistles & Hebrews (14)
    {"code": "ROM", "name": "Romans", "testament": "NT", "genre": "Pauline Epistles", "order": 52},
    {"code": "1CO", "name": "1 Corinthians", "testament": "NT", "genre": "Pauline Epistles", "order": 53},
    {"code": "2CO", "name": "2 Corinthians", "testament": "NT", "genre": "Pauline Epistles", "order": 54},
    {"code": "GAL", "name": "Galatians", "testament": "NT", "genre": "Pauline Epistles", "order": 55},
    {"code": "EPH", "name": "Ephesians", "testament": "NT", "genre": "Pauline Epistles", "order": 56},
    {"code": "PHP", "name": "Philippians", "testament": "NT", "genre": "Pauline Epistles", "order": 57},
    {"code": "COL", "name": "Colossians", "testament": "NT", "genre": "Pauline Epistles", "order": 58},
    {"code": "1TH", "name": "1 Thessalonians", "testament": "NT", "genre": "Pauline Epistles", "order": 59},
    {"code": "2TH", "name": "2 Thessalonians", "testament": "NT", "genre": "Pauline Epistles", "order": 60},
    {"code": "1TI", "name": "1 Timothy", "testament": "NT", "genre": "Pauline Epistles", "order": 61},
    {"code": "2TI", "name": "2 Timothy", "testament": "NT", "genre": "Pauline Epistles", "order": 62},
    {"code": "TIT", "name": "Titus", "testament": "NT", "genre": "Pauline Epistles", "order": 63},
    {"code": "PHM", "name": "Philemon", "testament": "NT", "genre": "Pauline Epistles", "order": 64},
    {"code": "HEB", "name": "Hebrews", "testament": "NT", "genre": "General Epistles", "order": 65},
    # Catholic / General Epistles (7)
    {"code": "JAS", "name": "James", "testament": "NT", "genre": "General Epistles", "order": 66},
    {"code": "1PE", "name": "1 Peter", "testament": "NT", "genre": "General Epistles", "order": 67},
    {"code": "2PE", "name": "2 Peter", "testament": "NT", "genre": "General Epistles", "order": 68},
    {"code": "1JN", "name": "1 John", "testament": "NT", "genre": "General Epistles", "order": 69},
    {"code": "2JN", "name": "2 John", "testament": "NT", "genre": "General Epistles", "order": 70},
    {"code": "3JN", "name": "3 John", "testament": "NT", "genre": "General Epistles", "order": 71},
    {"code": "JUD", "name": "Jude", "testament": "NT", "genre": "General Epistles", "order": 72},
    # Apocalypse (1)
    {"code": "REV", "name": "Revelation", "testament": "NT", "genre": "Apocalypse", "order": 73}
]

def main():
    start_time = time.time()
    print("Step 5: Generating Book Centroids for Latin Vulgate (73 Books)...")

    wordmap_path = 'data/output/wordmap_2d_vul.json'
    verse_index_path = 'data/output/verse_index_vul.json'
    output_path = 'data/output/bookmap_2d_vul.json'

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
    STOPWORDS = {
        'if', 'and', 'but', 'for', 'or', 'nor', 'lest', 'so', 'then', 'yet', 'also',
        'not', 'no', 'as', 'than', 'when', 'where', 'how', 'why', 'what', 'who', 'whom',
        'which', 'that', 'this', 'these', 'those', 'you', 'i', 'me', 'my', 'we', 'us',
        'our', 'he', 'him', 'his', 'she', 'her', 'it', 'its', 'they', 'them', 'their',
        'be', 'is', 'are', 'was', 'were', 'been', 'being', 'have', 'has', 'had', 'do',
        'does', 'did', 'will', 'would', 'shall', 'should', 'may', 'might', 'must', 'can',
        'could', 'to', 'of', 'in', 'for', 'on', 'with', 'at', 'by', 'from', 'up', 'about',
        'into', 'over', 'after', 'upon', 'himself', 'themself', 'themselves', 'myself',
        'yourself', 'yourselves', 'itself', 'all', 'every', 'each', 'both', 'few', 'more',
        'most', 'other', 'some', 'such', 'only', 'own', 'same', 'so', 'than', 'too', 'very',
        'say', 'said', 'go', 'come', 'make', 'give', 'take', 'see', 'know', 'get', 'let'
    }

    book_vectors = {}
    for b in BIBLE_BOOKS:
        b_code = b['code']
        counts = book_word_counts[b_code]
        vec = np.zeros(100, dtype=float)
        weight_sum = 0.0

        for wid, count in counts.items():
            if wid in word_dict:
                parts = wid.split('_')
                pos = parts[-1] if len(parts) >= 2 else ""
                gloss_clean = " ".join(parts[:-2]).lower() if len(parts) >= 3 else wid.lower()

                if pos in ('DET', 'CCONJ', 'SCONJ', 'ADP', 'PRON', 'PART', 'NUM') or gloss_clean in STOPWORDS:
                    continue

                w_vec = np.array(word_dict[wid]['v'], dtype=float)
                tf = 1.0 + math.log(count)
                weight = tf * book_idf.get(wid, 1.0)
                vec += w_vec * weight
                weight_sum += weight

        if weight_sum > 0:
            vec /= weight_sum
            norm = np.linalg.norm(vec)
            if norm > 0:
                vec /= norm
        book_vectors[b_code] = vec

    # MDS Projection on Cosine Distance Matrix
    print("Projecting 73 books to 2D via Classical MDS...")
    codes = [b['code'] for b in BIBLE_BOOKS]
    n_books = len(codes)
    D = np.zeros((n_books, n_books))
    for i in range(n_books):
        for j in range(i, n_books):
            c_sim = np.dot(book_vectors[codes[i]], book_vectors[codes[j]])
            c_dist = math.sqrt(max(0.0, 2.0 * (1.0 - c_sim)))
            D[i, j] = c_dist
            D[j, i] = c_dist

    H = np.eye(n_books) - np.ones((n_books, n_books)) / n_books
    B = -0.5 * H.dot(D**2).dot(H)
    eigvals, eigvecs = np.linalg.eigh(B)
    idx = np.argsort(eigvals)[::-1]
    eigvals = eigvals[idx]
    eigvecs = eigvecs[:, idx]

    coords_2d = eigvecs[:, :2] * np.sqrt(np.maximum(eigvals[:2], 0))
    coords_2d = (coords_2d - coords_2d.mean(axis=0)) / (coords_2d.std(axis=0) + 1e-6) * 2.0

    # Build Nearest Neighbors & Graph Links
    links = []
    books_out = []
    link_pairs = set()

    for i, b in enumerate(BIBLE_BOOKS):
        b_code = b['code']
        sims = []
        for j, other in enumerate(BIBLE_BOOKS):
            if i != j:
                o_code = other['code']
                sim = float(np.dot(book_vectors[b_code], book_vectors[o_code]))
                sims.append({"code": o_code, "name": other['name'], "sim": round(sim, 3)})

        sims.sort(key=lambda x: x['sim'], reverse=True)

        # Connect top 2 neighbors
        for nb in sims[:2]:
            pair = tuple(sorted([b_code, nb['code']]))
            if pair not in link_pairs:
                link_pairs.add(pair)
                links.append({"source": pair[0], "target": pair[1], "sim": nb['sim']})

        # Top words in book
        counts = book_word_counts[b_code]
        top_w = []
        for wid, cnt in counts.most_common(50):
            parts = wid.split('_')
            pos = parts[-1] if len(parts) >= 2 else ""
            gloss_clean = " ".join(parts[:-2]).lower() if len(parts) >= 3 else wid.lower()
            if pos in ('DET', 'CCONJ', 'SCONJ', 'ADP', 'PRON', 'PART', 'NUM') or gloss_clean in STOPWORDS:
                continue
            lemma = word_dict[wid].get('original', [{}])[0].get('lemma', '') if wid in word_dict else ''
            top_w.append({"id": wid, "w": word_dict[wid]['w'], "pos": pos, "lemma": lemma, "score": cnt, "count": cnt})
            if len(top_w) >= 10:
                break

        books_out.append({
            "id": b_code,
            "code": b_code,
            "name": b['name'],
            "testament": b['testament'],
            "genre": b['genre'],
            "order": b['order'],
            "verses": book_verse_counts[b_code],
            "total_words": book_total_words[b_code],
            "top_words": top_w,
            "closest_words": [],
            "v": [round(float(val), 3) for val in book_vectors[b_code]],
            "x": round(float(coords_2d[i, 0]), 2),
            "y": round(float(coords_2d[i, 1]), 2),
            "nearest_books": sims[:10]
        })

    # Cross-testament semantic bridges
    ot_codes = [b['code'] for b in BIBLE_BOOKS if b['testament'] == 'OT']
    nt_codes = [b['code'] for b in BIBLE_BOOKS if b['testament'] == 'NT']
    cross_sims = []
    for ot_c in ot_codes:
        for nt_c in nt_codes:
            sim = float(np.dot(book_vectors[ot_c], book_vectors[nt_c]))
            cross_sims.append((sim, ot_c, nt_c))
    cross_sims.sort(key=lambda x: x[0], reverse=True)

    for sim, ot_c, nt_c in cross_sims[:12]:
        pair = tuple(sorted([ot_c, nt_c]))
        if pair not in link_pairs:
            link_pairs.add(pair)
            links.append({"source": pair[0], "target": pair[1], "sim": round(sim, 3)})

    out_data = {
        "books": books_out,
        "links": links
    }

    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(out_data, f, separators=(',', ':'), ensure_ascii=False)

    print(f"Step 5 complete: Saved {len(books_out)} books and {len(links)} links to {output_path} in {time.time() - start_time:.2f}s.")

if __name__ == '__main__':
    main()
