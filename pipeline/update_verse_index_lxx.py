import os
import re
import json

RAW_DIR = 'data/raw'
OUTPUT_DIR = 'data/output'
USFM_DIR = os.path.join(RAW_DIR, 'brenton_usfm')

BRENTON_MAP = {
    'GEN': 'GEN', 'EXO': 'EXO', 'LEV': 'LEV', 'NUM': 'NUM', 'DEU': 'DEU',
    'JOS': 'JOS', 'JDG': 'JDG', 'RUT': 'RUT', '1SA': '1SA', '2SA': '2SA',
    '1KI': '1KI', '2KI': '2KI', '1CH': '1CH', '2CH': '2CH', 'EZR': 'EZR',
    'NEH': 'NEH', 'EST': 'EST', 'JOB': 'JOB', 'PSA': 'PSA', 'PRO': 'PRO',
    'ECC': 'ECC', 'SNG': 'SNG', 'ISA': 'ISA', 'JER': 'JER', 'LAM': 'LAM',
    'EZK': 'EZK', 'DAN': 'DAN', 'DAG': 'DAN', 'HOS': 'HOS', 'JOL': 'JOL',
    'AMO': 'AMO', 'OBA': 'OBA', 'JON': 'JON', 'MIC': 'MIC', 'NAM': 'NAM',
    'HAB': 'HAB', 'ZEP': 'ZEP', 'HAG': 'HAG', 'ZEC': 'ZEC', 'MAL': 'MAL',
    '1ES': '1ES', 'TOB': 'TOB', 'JDT': 'JDT', 'WIS': 'WIS', 'SIR': 'SIR',
    'BAR': 'BAR', 'LJE': 'LJE', 'SUS': 'SUS', 'BEL': 'BEL',
    '1MA': '1MA', '2MA': '2MA', '3MA': '3MA', '4MA': '4MA', 'MAN': 'MAN'
}

def load_brenton_verses():
    print("Loading Brenton Septuagint English translation...")
    brenton_verses = {}
    if not os.path.exists(USFM_DIR):
        print(f"Warning: {USFM_DIR} does not exist.")
        return brenton_verses

    for fname in os.listdir(USFM_DIR):
        if not fname.endswith('.usfm'):
            continue
        m = re.search(r'([0-9]{2})-([0-9A-Z]{3})', fname)
        if not m:
            continue
        code_raw = m.group(2)
        b_code = BRENTON_MAP.get(code_raw)
        if not b_code:
            continue

        with open(os.path.join(USFM_DIR, fname), 'r', encoding='utf-8') as f:
            curr_c = None
            curr_v = None
            curr_text = []

            def flush(c, v, words):
                if c and v and words:
                    raw = ' '.join(words).strip()
                    cleaned = re.sub(r'\\f\s+.*?(?:\\f\*|$)', '', raw)
                    cleaned = re.sub(r'\\x\s+.*?(?:\\x\*|$)', '', cleaned)
                    cleaned = re.sub(r'\\[a-z0-9\+\*]+', '', cleaned)
                    cleaned = ' '.join(cleaned.split()).strip().replace('\u2014', '--')
                    brenton_verses[f'{b_code} {c}:{v}'] = cleaned

            for line in f:
                line = line.strip()
                if not line:
                    continue
                if line.startswith('\\c '):
                    flush(curr_c, curr_v, curr_text)
                    curr_c = line.split()[1]
                    curr_v = None
                    curr_text = []
                elif line.startswith('\\v '):
                    flush(curr_c, curr_v, curr_text)
                    parts = line.split(maxsplit=2)
                    curr_v = parts[1]
                    rest = parts[2] if len(parts) > 2 else ''
                    curr_text = [rest] if rest else []
                elif curr_v is not None and not line.startswith('\\'):
                    curr_text.append(line)
            flush(curr_c, curr_v, curr_text)

    for v in range(1, 16):
        if f'MAN 1:{v}' in brenton_verses:
            brenton_verses[f'ODA 12:{v}'] = brenton_verses[f'MAN 1:{v}']

    print(f"Loaded {len(brenton_verses)} Brenton verses.")
    return brenton_verses

def load_bsb_usj_verses():
    print("Loading BSB English translation from USJ files...")
    bsb_verses = {}

    def parse_usj(filepath, b_code):
        with open(filepath, 'r', encoding='utf-8') as jf:
            data = json.load(jf)
        curr_c = '1'
        curr_v = None
        accum = []

        def flush_u():
            nonlocal curr_c, curr_v, accum
            if curr_v and accum:
                text = ' '.join(accum).strip()
                text = re.sub(r'\s+([,.:;?!])', r'\1', text)
                text = re.sub(r'\s+', ' ', text).strip().replace('\u2014', '--')
                bsb_verses[f'{b_code} {curr_c}:{curr_v}'] = text
                accum = []

        def walk(node):
            nonlocal curr_c, curr_v, accum
            if isinstance(node, str):
                if curr_v is not None:
                    accum.append(node)
            elif isinstance(node, list):
                for item in node:
                    walk(item)
            elif isinstance(node, dict):
                if node.get('type') == 'note':
                    return
                marker = node.get('marker')
                if marker in ['h', 'toc1', 'toc2', 'toc3', 'mt1', 'mt2', 'mt3', 's', 's1', 's2', 's3', 'r', 'd', 'id']:
                    return
                if node.get('type') == 'chapter':
                    flush_u()
                    curr_c = str(node.get('number', curr_c))
                    curr_v = None
                elif node.get('type') == 'verse':
                    flush_u()
                    curr_v = str(node.get('number'))
                if 'content' in node:
                    walk(node['content'])

        walk(data)
        flush_u()

    for f in os.listdir(RAW_DIR):
        if not f.endswith('.usj'):
            continue
        b_code = f.split('.')[0]
        parse_usj(os.path.join(RAW_DIR, f), b_code)

    print(f"Loaded {len(bsb_verses)} BSB verses from USJ.")
    return bsb_verses

def main():
    brenton = load_brenton_verses()
    bsb = load_bsb_usj_verses()

    OFFSETS = {
        'DEU 28:69': 'DEU 29:1',
        'NEH 3:33': 'NEH 4:1', 'NEH 3:34': 'NEH 4:2', 'NEH 3:35': 'NEH 4:3',
        'NEH 3:36': 'NEH 4:4', 'NEH 3:37': 'NEH 4:5', 'NEH 10:40': 'NEH 10:39',
    }

    index_files = ['verse_index_raw_lxx.json', 'verse_index_lxx.json']
    for ifname in index_files:
        ipath = os.path.join(OUTPUT_DIR, ifname)
        if not os.path.exists(ipath):
            print(f"Skipping {ipath} (not found).")
            continue

        print(f"Updating {ipath} with interlinear English text...")
        with open(ipath, 'r', encoding='utf-8') as f:
            data = json.load(f)

        updated_verses = []
        matched_en_count = 0
        for entry in data['verses']:
            parts = entry.split('|')
            ref = parts[0]
            if len(parts) >= 3:
                existing_en = parts[1]
                greek = parts[2]
            else:
                existing_en = ''
                greek = parts[1] if len(parts) > 1 else ''

            b_code = ref.split()[0]
            en = None
            if b_code in BRENTON_MAP and ref in brenton:
                en = brenton[ref]
            elif ref in bsb:
                en = bsb[ref]
            elif ref in OFFSETS and OFFSETS[ref] in bsb:
                en = bsb[OFFSETS[ref]]
            elif b_code not in BRENTON_MAP and ref in bsb:
                en = bsb[ref]

            if en:
                matched_en_count += 1
            elif existing_en and existing_en != greek:
                en = existing_en
                matched_en_count += 1
            else:
                en = greek

            updated_verses.append(f"{ref}|{en}|{greek}")

        data['verses'] = updated_verses
        with open(ipath, 'w', encoding='utf-8') as f:
            json.dump(data, f, separators=(',', ':'), ensure_ascii=False)

        total = len(updated_verses)
        pct = (matched_en_count / total * 100) if total else 0
        print(f"Saved {ipath}: {total} verses ({matched_en_count} matched English, {pct:.2f}%).")

if __name__ == '__main__':
    main()
