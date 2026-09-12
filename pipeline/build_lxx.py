import csv
import json
import os
import re
from collections import Counter, defaultdict

RAW_DIR = 'data/raw'
PROCESSED_DIR = 'data/processed'
OUTPUT_DIR = 'data/output'

os.makedirs(PROCESSED_DIR, exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)

OT_BOOK_CODES = {
    10: "GEN", 20: "EXO", 30: "LEV", 40: "NUM", 50: "DEU", 60: "JOS", 70: "JDG", 80: "RUT",
    90: "1SA", 100: "2SA", 110: "1KI", 120: "2KI", 130: "1CH", 140: "2CH", 150: "EZR", 160: "NEH",
    190: "EST", 220: "JOB", 230: "PSA", 240: "PRO", 250: "ECC", 260: "SNG", 290: "ISA", 300: "JER",
    310: "LAM", 330: "EZK", 340: "DAN", 350: "HOS", 360: "JOL", 370: "AMO", 380: "OBA", 390: "JON",
    400: "MIC", 410: "NAM", 420: "HAB", 430: "ZEP", 440: "HAG", 450: "ZEC", 460: "MAL"
}

NT_BOOK_NAMES = {
    "Matthew": "MAT", "Mark": "MRK", "Luke": "LUK", "John": "JHN", "Acts": "ACT",
    "Romans": "ROM", "1 Corinthians": "1CO", "2 Corinthians": "2CO", "Galatians": "GAL",
    "Ephesians": "EPH", "Philippians": "PHP", "Colossians": "COL", "1 Thessalonians": "1TH",
    "2 Thessalonians": "2TH", "1 Timothy": "1TI", "2 Timothy": "2TI", "Titus": "TIT",
    "Philemon": "PHM", "Hebrews": "HEB", "James": "JAS", "1 Peter": "1PE", "2 Peter": "2PE",
    "1 John": "1JN", "2 John": "2JN", "3 John": "3JN", "Jude": "JUD", "Revelation": "REV"
}

PHRASE_GLOSS_MAP = {
    'one who baptizes': 'baptist',
    'one who bleaches': 'launderer',
    'one who goes before to show the way': 'guide',
    'one who exacts interest': 'moneylender',
    'one who delivers oracles': 'medium',
    'one that takes bribes': 'bribe-taker',
    'one that receives bribes': 'bribe-receiver',
}

def clean_gloss(raw_gloss):
    if not raw_gloss:
        return ""
    g = re.sub(r'\(.*?\)', '', raw_gloss).strip()
    if g.startswith('[') and g.endswith(']'):
        g = g[1:-1].strip()
    parts = [p.strip() for p in re.split(r'[:;,]', g) if p.strip()]
    if not parts:
        return raw_gloss.strip()
    first_choice = parts[0]
    if '/' in first_choice:
        slash_parts = [sp.strip() for sp in first_choice.split('/') if sp.strip()]
        if slash_parts:
            first_choice = slash_parts[0]
    if first_choice.lower().startswith('to ') and len(first_choice) > 3:
        first_choice = first_choice[3:].strip()
    
    clean_lower = first_choice.lower().strip()
    if clean_lower in PHRASE_GLOSS_MAP:
        return PHRASE_GLOSS_MAP[clean_lower]
    if clean_lower.startswith('one who baptiz'):
        return 'baptist'

    words = first_choice.split()
    if len(words) > 3:
        first_choice = " ".join(words[:3])
    return first_choice.strip().lower()

def map_morph_to_pos(morph_tag):
    if not morph_tag:
        return "NOUN"
    m = morph_tag.upper()
    if m.startswith("LXX.N.P") or "PRI" in m:
        return "PROPN"
    if m.startswith("LXX.N"):
        return "NOUN"
    if m.startswith("LXX.V"):
        return "VERB"
    if m.startswith("LXX.A"):
        return "ADJ"
    if m.startswith("LXX.D"):
        return "ADV"
    if m.startswith("LXX.P"):
        return "ADP"
    if m.startswith("LXX.C"):
        return "CCONJ"
    if m.startswith("LXX.RA"):
        return "DET"
    if m.startswith("LXX.R"):
        return "PRON"
    if m.startswith("LXX.I"):
        return "INTJ"
    if m.startswith("LXX.X"):
        return "PART"
    if m.startswith("LXX.M"):
        return "NUM"
    return "NOUN"

def map_parsing_to_pos(parsing_str):
    if not parsing_str:
        return "NOUN"
    p = parsing_str.upper()
    if "PROPER" in p:
        return "PROPN"
    if "PRONOUN" in p:
        return "PRON"
    if "NOUN" in p:
        return "NOUN"
    if "ADVERB" in p:
        return "ADV"
    if "VERB" in p:
        return "VERB"
    if "ADJECTIVE" in p:
        return "ADJ"
    if "PREPOSITION" in p:
        return "ADP"
    if "CONJUNCTION" in p:
        return "CCONJ"
    if "PARTICLE" in p or "INTPRTCL" in p:
        return "PART"
    if "ARTICLE" in p:
        return "DET"
    if "INTERJECTION" in p:
        return "INTJ"
    return "NOUN"

def main():
    print("Step 1: Loading TBESG and LXX Lexicons...")
    tbesg = {}
    with open(os.path.join(RAW_DIR, 'tbesg.txt'), 'r', encoding='utf-8') as f:
        for line in f:
            if line.startswith('G'):
                parts = line.strip().split('\t')
                if len(parts) >= 7:
                    s_id = parts[0].strip()
                    lemma_raw = parts[3].strip()
                    gloss_raw = parts[6].strip()
                    # Skip bracketed unnamed sub-entries like [unnamed], [mother-in-law of Peter]
                    if lemma_raw == '[unnamed]' or (gloss_raw.startswith('[') and gloss_raw.endswith(']')):
                        continue
                    if s_id not in tbesg:
                        tbesg[s_id] = {
                            "strongs": s_id,
                            "lemma": lemma_raw,
                            "translit": parts[4].strip(),
                            "gloss": clean_gloss(gloss_raw),
                            "def": (parts[7].strip() if len(parts) > 7 else gloss_raw).replace('\u2014', '--')
                        }

    lxx_to_g = {}
    lxx_lex = {}
    with open(os.path.join(RAW_DIR, 'lxx_lexicon.csv'), 'r', encoding='utf-8') as f:
        r = csv.reader(f, delimiter='\t')
        for row in r:
            if len(row) >= 5:
                lid = row[0].strip()
                lxx_lex[lid] = {
                    "lemma": row[1].strip(),
                    "translit": row[2].strip(),
                    "gloss": clean_gloss(row[4].strip())
                }
                if len(row) >= 6:
                    m = re.search(r'S:G(\d+)', row[5])
                    if m:
                        lxx_to_g[lid] = f"G{int(m.group(1)):04d}"

    print(f"Loaded {len(tbesg)} TBESG entries and {len(lxx_lex)} LXX lexicon entries ({len(lxx_to_g)} linked to G-Strongs).")

    word_meta = {}
    verses = []
    word_to_verse = defaultdict(list)
    word_counts = Counter()

    def get_token_info(strongs_list, surface_word, pos):
        match = None
        # Priority 1: Direct standard/extended G-Strongs (< 10000)
        for s in strongs_list:
            try:
                num = int(s)
                if num < 10000:
                    key_g = f"G{num:04d}"
                    if key_g in tbesg:
                        match = tbesg[key_g]
                        break
            except ValueError:
                pass

        # Priority 2: LXX lexeme linked to G-Strongs
        if not match:
            for s in strongs_list:
                key_l = f"L{s}"
                if key_l in lxx_to_g:
                    target_g = lxx_to_g[key_l]
                    if target_g in tbesg:
                        match = tbesg[target_g]
                        break

        # Priority 3: LXX lexicon standalone
        if not match:
            for s in strongs_list:
                key_l = f"L{s}"
                if key_l in lxx_lex:
                    item = lxx_lex[key_l]
                    match = {
                        "strongs": key_l,
                        "lemma": item["lemma"],
                        "translit": item["translit"],
                        "gloss": item["gloss"],
                        "def": item["gloss"]
                    }
                    break

        if match:
            strongs = match.get("strongs", "G0000")
            lemma = match.get("lemma", surface_word)
            translit = match.get("translit", "")
            gloss = match.get("gloss", "") or surface_word.lower()
            def_text = match.get("def", gloss)
        else:
            strongs = "G0000"
            lemma = surface_word
            translit = ""
            gloss = surface_word.lower()
            def_text = surface_word

        # Clean display word preserving spaces (e.g. "settle accounts", "burnt offering")
        display_w = re.sub(r'\s+', ' ', re.sub(r'[^a-zA-Z0-9\s-]', '', gloss)).strip().lower() or "word"
        # Whitespace-safe token slug for Word2Vec training files (spaces become underscores)
        token_slug = re.sub(r'[^a-zA-Z0-9_]', '', re.sub(r'[\s-]+', '_', display_w)) or "word"
        token_id = f"{token_slug}_{strongs}_{pos}"

        if token_id not in word_meta:
            word_meta[token_id] = {
                "id": token_id,
                "w": display_w,
                "pos": pos,
                "strongs": strongs,
                "lemma": lemma,
                "translit": translit,
                "def": def_text
            }
        return token_id

    print("Step 2: Processing Old Testament (Septuagint Rahlfs 1935)...")
    ot_file = open(os.path.join(PROCESSED_DIR, 'ot_text_lxx.txt'), 'w', encoding='utf-8')
    ot_verse_count = 0

    with open(os.path.join(RAW_DIR, 'lxx_final_main.csv'), 'r', encoding='utf-8') as f:
        r = csv.reader(f, delimiter='\t')
        for row in r:
            if len(row) < 4:
                continue
            try:
                b_num = int(row[0])
            except ValueError:
                continue
            if b_num not in OT_BOOK_CODES:
                continue

            b_code = OT_BOOK_CODES[b_num]
            c_num = row[1].strip()
            v_num = row[2].strip()
            raw_text = row[3]

            # Tokens in LXX row: surface_word<S>...<m>...
            tokens = raw_text.split()
            verse_surface_words = []
            verse_tagged_tokens = []
            words_in_verse = set()

            for t in tokens:
                m_word = re.match(r"^([^<]+)", t)
                if not m_word:
                    continue
                surface = m_word.group(1).strip()
                if not surface:
                    continue

                strongs_matches = re.findall(r"<S>(\d+)</S>", t)
                morph_matches = re.findall(r"<m>([^<]+)</m>", t)
                pos = map_morph_to_pos(morph_matches[0] if morph_matches else "")

                token_id = get_token_info(strongs_matches, surface, pos)
                verse_surface_words.append(surface)
                verse_tagged_tokens.append(token_id)
                words_in_verse.add(token_id)
                word_counts[token_id] += 1

            if not verse_tagged_tokens:
                continue

            verse_text = " ".join(verse_surface_words).replace('\u2014', '--')
            verse_ref = f"{b_code} {c_num}:{v_num}"
            verse_idx = len(verses)
            verses.append(f"{verse_ref}|{verse_text}")

            for wid in words_in_verse:
                word_to_verse[wid].append(verse_idx)

            ot_file.write(" ".join(verse_tagged_tokens) + "\n")
            ot_verse_count += 1

    ot_file.close()
    print(f"Processed {ot_verse_count} OT verses from Septuagint.")

    print("Step 3: Processing New Testament (Greek NT)...")
    nt_file = open(os.path.join(PROCESSED_DIR, 'nt_text_lxx.txt'), 'w', encoding='utf-8')
    nt_verse_count = 0

    # Group BSB table rows by verse
    current_verse_ref = None
    current_surface_words = []
    current_tagged_tokens = []
    current_words_in_verse = set()

    def flush_nt_verse():
        nonlocal nt_verse_count, current_verse_ref, current_surface_words, current_tagged_tokens, current_words_in_verse
        if not current_verse_ref or not current_tagged_tokens:
            return
        verse_text = " ".join(current_surface_words).replace('\u2014', '--')
        verse_idx = len(verses)
        verses.append(f"{current_verse_ref}|{verse_text}")
        for wid in current_words_in_verse:
            word_to_verse[wid].append(verse_idx)
        nt_file.write(" ".join(current_tagged_tokens) + "\n")
        nt_verse_count += 1

    with open(os.path.join(RAW_DIR, 'bsb_tables.tsv'), 'r', encoding='utf-8') as f:
        r = csv.DictReader(f, delimiter='\t')
        for row in r:
            if row.get('Language') != 'Greek':
                continue

            v_ref_raw = row.get('VerseId', '').strip()
            if v_ref_raw:
                flush_nt_verse()
                # Parse "Matthew 1:1" -> "MAT 1:1"
                parts = v_ref_raw.rsplit(' ', 1)
                b_name = parts[0]
                cv_num = parts[1] if len(parts) > 1 else "1:1"
                b_code = NT_BOOK_NAMES.get(b_name, b_name[:3].upper())
                current_verse_ref = f"{b_code} {cv_num}"
                current_surface_words = []
                current_tagged_tokens = []
                current_words_in_verse = set()

            raw_orig = row.get('WLC / Nestle Base TR RP WH NE NA SBL', '')
            try:
                surface = raw_orig.encode('latin1').decode('utf-8').strip()
            except Exception:
                surface = raw_orig.strip()

            if not surface or surface == '-':
                continue

            str_grk = row.get('Str Grk', '').strip()
            strongs_list = [str_grk] if str_grk else []
            pos = map_parsing_to_pos(row.get('Parsing', ''))

            token_id = get_token_info(strongs_list, surface, pos)
            current_surface_words.append(surface)
            current_tagged_tokens.append(token_id)
            current_words_in_verse.add(token_id)
            word_counts[token_id] += 1

        flush_nt_verse()

    nt_file.close()
    print(f"Processed {nt_verse_count} NT verses from Greek NT.")
    print(f"Total biblical verses indexed: {len(verses)}")
    print(f"Total unique Greek tokens: {len(word_meta)}")

    # Add frequency count to word_meta
    for wid, meta in word_meta.items():
        meta["f"] = word_counts[wid]

    print("Saving processed metadata and raw verse index...")
    with open(os.path.join(PROCESSED_DIR, 'lxx_word_meta.json'), 'w', encoding='utf-8') as f:
        json.dump(word_meta, f, ensure_ascii=False)

    with open(os.path.join(OUTPUT_DIR, 'verse_index_raw_lxx.json'), 'w', encoding='utf-8') as f:
        json.dump({'verses': verses, 'words': word_to_verse}, f, separators=(',', ':'), ensure_ascii=False)

    print("Step 1 complete: build_lxx.py successfully generated text files and index.")

if __name__ == '__main__':
    main()
