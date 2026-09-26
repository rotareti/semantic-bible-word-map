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

BOOK_MAP = {b["code"]: b for b in BIBLE_BOOKS}

def main():
    start_time = time.time()
    print("Generating Chapter Centroids and Cross-Reference Map for Latin Vulgate (VUL)...")

    verse_index_path = 'data/output/verse_index_vul.json'
    wordmap_path = 'data/output/wordmap_2d_vul.json'
    output_path = 'data/output/chaptermap_2d_vul.json'

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
    total_verses = len(raw_verses)

    print(f"Loaded {total_verses} verses and {len(word_dict)} Latin vocabulary words.")

    # 1. Invert word_to_verses to get words per verse
    verse_to_words = defaultdict(list)
    for wid, v_indices in word_to_verses.items():
        if wid in word_dict:
            for vi in v_indices:
                verse_to_words[vi].append(wid)

    # 2. Group verses into canonical chapters
    chapter_verses = defaultdict(list)
    verse_meta = []

    for vi, raw_v in enumerate(raw_verses):
        ref = raw_v.split('|', 1)[0]
        parts = ref.split()
        if len(parts) >= 2 and ':' in parts[1]:
            b_code = parts[0]
            c_num, v_num = parts[1].split(':')
            c_int = int(c_num)
            v_int = int(v_num)
        else:
            b_code = parts[0] if parts else 'UNK'
            c_int = 1
            v_int = 1
        ch_id = f"{b_code}.{c_int}"
        verse_meta.append((ref, b_code, c_int, v_int, ch_id))
        chapter_verses[ch_id].append(vi)

    canonical_ch_order = []
    seen_chapters = set()
    for _, b_code, c_int, _, ch_id in verse_meta:
        if ch_id not in seen_chapters:
            seen_chapters.add(ch_id)
            canonical_ch_order.append(ch_id)

    total_chapters = len(canonical_ch_order)
    print(f"Discovered {total_chapters} chapters across {len(BIBLE_BOOKS)} Vulgate books.")

    # 3. Chapter word counts and Document Frequency (df) across chapters
    chapter_word_counts = defaultdict(Counter)
    doc_freq = defaultdict(int)

    for ch_id in canonical_ch_order:
        vi_list = chapter_verses[ch_id]
        words_in_ch = set()
        for vi in vi_list:
            for wid in verse_to_words[vi]:
                chapter_word_counts[ch_id][wid] += 1
                words_in_ch.add(wid)
        for wid in words_in_ch:
            doc_freq[wid] += 1

    idf = {}
    for wid, df in doc_freq.items():
        idf[wid] = math.log((total_chapters + 1.0) / (df + 1.0)) + 1.0

    # 4. Compute 100D Chapter Centroids and 2D Coordinates
    CONTENT_POS = {'NOUN', 'VERB', 'PROPN', 'ADJ', 'ADV'}
    chapter_matrix = np.zeros((total_chapters, 100), dtype=np.float32)
    chapter_coords_2d = []
    chapter_top_words = []

    for ch_idx, ch_id in enumerate(canonical_ch_order):
        counts = chapter_word_counts[ch_id]
        vec = np.zeros(100, dtype=np.float32)
        weighted_x = 0.0
        weighted_y = 0.0
        total_weight = 0.0
        content_candidates = []

        for wid, cnt in counts.items():
            wd = word_dict[wid]
            tf = 1.0 + math.log(cnt)
            wt = tf * idf[wid]
            vec += wt * np.array(wd['v'], dtype=np.float32)
            weighted_x += wt * wd['x']
            weighted_y += wt * wd['y']
            total_weight += wt
            if wd['pos'] in CONTENT_POS:
                content_candidates.append((wid, wt))

        norm = np.linalg.norm(vec)
        if norm > 1e-6:
            chapter_matrix[ch_idx] = vec / norm

        if total_weight > 0:
            chapter_coords_2d.append((round(weighted_x / total_weight, 2), round(weighted_y / total_weight, 2)))
        else:
            chapter_coords_2d.append((0.0, 0.0))

        content_candidates.sort(key=lambda x: x[1], reverse=True)
        chapter_top_words.append([item[0] for item in content_candidates[:60]])

    # 5. Compute Verse Centroid Matrix for cross-reference verses
    print("Computing verse centroid embeddings for canon-wide verse cross-references...")
    verse_matrix = np.zeros((total_verses, 100), dtype=np.float32)
    verse_idf = {}
    for wid, v_indices in word_to_verses.items():
        verse_idf[wid] = math.log((total_verses + 1.0) / (len(v_indices) + 1.0)) + 1.0

    for vi in range(total_verses):
        w_ids = verse_to_words[vi]
        if not w_ids:
            continue
        v_vec = np.zeros(100, dtype=np.float32)
        for wid in w_ids:
            wt = verse_idf.get(wid, 1.0)
            v_vec += wt * np.array(word_dict[wid]['v'], dtype=np.float32)
        v_norm = np.linalg.norm(v_vec)
        if v_norm > 1e-6:
            verse_matrix[vi] = v_vec / v_norm

    # 6. Chapter-to-Chapter Cross-References (r)
    print("Calculating Chapter-to-Chapter semantic cross-references...")
    ch_sim_matrix = np.dot(chapter_matrix, chapter_matrix.T)
    top_chapter_refs = []

    for i in range(total_chapters):
        sims = ch_sim_matrix[i].copy()
        sims[i] = -1.0
        top_indices = np.argpartition(sims, -32)[-32:]
        sorted_indices = top_indices[np.argsort(-sims[top_indices])]
        refs = [[canonical_ch_order[j], round(float(sims[j]), 3)] for j in sorted_indices]
        top_chapter_refs.append(refs)

    # 7. Chapter-to-Verse Canon-Wide Cross-References (rv)
    print("Calculating Chapter-to-Verse canon-wide cross-references (top 32)...")
    ch_verse_sim_matrix = np.dot(chapter_matrix, verse_matrix.T)
    top_verse_refs = []

    for i, ch_id in enumerate(canonical_ch_order):
        v_sims = ch_verse_sim_matrix[i].copy()
        for vi in chapter_verses[ch_id]:
            v_sims[vi] = -1.0

        top_v_indices = np.argpartition(v_sims, -32)[-32:]
        sorted_v_indices = top_v_indices[np.argsort(-v_sims[top_v_indices])]
        v_refs = [[verse_meta[j][0], round(float(v_sims[j]), 3)] for j in sorted_v_indices]
        top_verse_refs.append(v_refs)

    # 8. Assemble final Chapter records
    print("Packaging compact chaptermap_2d_vul.json...")
    christ_vec = None
    anchor_path = 'data/output/christ_anchor_vul.json'
    if os.path.exists(anchor_path):
        try:
            with open(anchor_path, 'r', encoding='utf-8') as f:
                christ_vec = np.array(json.load(f).get('v'), dtype=np.float32)
        except Exception:
            pass

    chapters_output = []

    for i, ch_id in enumerate(canonical_ch_order):
        b_code, c_str = ch_id.split('.')
        c_num = int(c_str)
        b_info = BOOK_MAP.get(b_code, {
            "name": b_code,
            "genre": "General",
            "testament": "OT",
            "order": 99
        })
        ch_name = f"{b_info['name']} {c_num}"
        ch_verses_cnt = len(chapter_verses[ch_id])
        x, y = chapter_coords_2d[i]
        centroid_vec = [round(float(val), 3) for val in chapter_matrix[i]]
        rad = round(math.sqrt(x * x + y * y), 3)
        sim_c = None
        if christ_vec is not None:
            c_norm = np.linalg.norm(chapter_matrix[i])
            if c_norm > 1e-6:
                sim_c = round(float(np.dot(chapter_matrix[i], christ_vec)), 4)

        chapter_record = {
            "id": ch_id,
            "b": b_code,
            "c": c_num,
            "name": ch_name,
            "genre": b_info["genre"],
            "testament": b_info["testament"],
            "order": b_info["order"],
            "verses": ch_verses_cnt,
            "x": x,
            "y": y,
            "rad": rad,
            "sim_christ": sim_c,
            "v": centroid_vec,
            "w": chapter_top_words[i],
            "r": top_chapter_refs[i],
            "rv": top_verse_refs[i]
        }
        chapters_output.append(chapter_record)

    output_payload = {
        "count": len(chapters_output),
        "chapters": chapters_output
    }

    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(output_payload, f, separators=(',', ':'))

    elapsed = time.time() - start_time
    file_size_kb = os.path.getsize(output_path) / 1024
    print(f"Successfully generated {len(chapters_output)} Vulgate chapters in {elapsed:.2f}s!")
    print(f"Output saved to {output_path} ({file_size_kb:.1f} KB uncompressed)")

if __name__ == '__main__':
    main()
