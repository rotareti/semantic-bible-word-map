"""
Build Apostolic Fathers (AF) Text & Verse Index
Parses Lightfoot English translation (XML) and Tauber/Lake Greek texts,
aligns them into parallel sections, runs spaCy POS tagging and lemmatization,
and outputs data/processed/af_text.txt and data/output/verse_index_af.json.
"""

import os
import re
import sys
import json
import xml.etree.ElementTree as ET
from collections import defaultdict
import spacy

import html

sys.path.append(os.path.dirname(__file__))
from biblical_entities import load_biblical_proper_names, COMMON_NOUNS

# Extra patristic terms to treat as common nouns even when capitalized
PATRISTIC_COMMON_NOUNS = COMMON_NOUNS | {
    'bishop', 'bishops', 'presbyter', 'presbyters', 'deacon', 'deacons',
    'eucharist', 'baptism', 'martyr', 'martyrs', 'martyrdom', 'heresy',
    'heresies', 'heretic', 'heretics', 'overseer', 'overseers', 'fellowservant',
    'fellowservants', 'docetism', 'epistle', 'epistles', 'homily', 'homilies',
    'vision', 'visions', 'mandate', 'mandates', 'similitude', 'similitudes',
    'parable', 'parables', 'statute', 'statutes', 'ordinance', 'ordinances'
}

PATRISTIC_PROPER_NAMES = {
    'clement', 'ignatius', 'polycarp', 'hermas', 'barnabas', 'diognetus',
    'papias', 'linus', 'anencletus', 'corinth', 'ephesus', 'magnesia',
    'tralles', 'rome', 'philadelphia', 'smyrna', 'philippi', 'syria',
    'troas', 'crocus', 'burrhus', 'euplus', 'fronto', 'onesimus', 'alce',
    'rhoda', 'daphnus', 'attalus', 'gaius', 'irenaeus', 'socrates', 'heraclitus'
}

RAW_AF_DIR = os.path.join(os.path.dirname(__file__), '..', 'data', 'raw_af')
PROCESSED_DIR = os.path.join(os.path.dirname(__file__), '..', 'data', 'processed')
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'data', 'output')

os.makedirs(PROCESSED_DIR, exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)

WORKS = [
    ('1CLE', 'First Clement', '001-i_clement.txt', '1 Clement'),
    ('2CLE', 'Second Clement', '002-ii_clement.txt', '2 Clement'),
    ('IEPH', 'The Epistle of Ignatius to the Ephesians', '003-ignatius-ephesians.txt', 'Ignatius to the Ephesians'),
    ('IMAG', 'The Epistle of Ignatius to the Magnesians', '004-ignatius-magnesians.txt', 'Ignatius to the Magnesians'),
    ('ITRA', 'The Epistle of Ignatius to the Trallians', '005-ignatius-trallians.txt', 'Ignatius to the Trallians'),
    ('IROM', 'The Epistle of Ignatius to the Romans', '006-ignatius-romans.txt', 'Ignatius to the Romans'),
    ('IPHL', 'The Epistle of Ignatius to the Philadelphians', '007-ignatius-philadelphians.txt', 'Ignatius to the Philadelphians'),
    ('ISMY', 'The Epistle of Ignatius to the Smyrnaeans', '008-ignatius-smyrnaeans.txt', 'Ignatius to the Smyrnaeans'),
    ('IPOL', 'The Epistle fo Ignatius to Polycarp', '009-ignatius-polycarp.txt', 'Ignatius to Polycarp'),
    ('POLY', 'The Epistle of Polycarp', '010-polycarp-philippians.txt', 'Polycarp to the Philippians'),
    ('DID',  'Didache', '011-didache.txt', 'Didache'),
    ('BAR',  'The Epistle of Barnabas', '012-barnabas.txt', 'Epistle of Barnabas'),
    ('HERM', 'The Shepherd of Hermas', '013-shepherd.txt', 'Shepherd of Hermas'),
    ('MPOL', 'The Martyrdom of Polycarp', '014-martyrdom.txt', 'Martyrdom of Polycarp'),
    ('DIOG', 'The Epistle to Diognetus', '015-diognetus.txt', 'Epistle to Diognetus')
]


def load_raw_af_sections():
    xml_path = os.path.join(RAW_AF_DIR, 'lightfoot_fathers.xml')
    if not os.path.exists(xml_path):
        raise FileNotFoundError(f"Missing {xml_path}. Run pipeline/fetch_af.py first.")

    root = ET.parse(xml_path).getroot()
    div2_map = {d.attrib.get('title'): d for d in root.findall('.//div2')}

    raw_sections = []

    for code, title, gfile, disp_name in WORKS:
        gpath = os.path.join(RAW_AF_DIR, 'greek', gfile)
        if not os.path.exists(gpath):
            raise FileNotFoundError(f"Missing {gpath}. Run pipeline/fetch_af.py first.")

        greek_items = []
        with open(gpath, encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if not line:
                    continue
                parts = line.split(' ', 1)
                ref_str = parts[0]
                el_text = parts[1] if len(parts) > 1 else ''

                # Parse chapter and section numbers
                m3 = re.match(r'^(\d+)\.(\d+)\.(\d+)$', ref_str)
                m2 = re.match(r'^(\d+)\.(\d+)$', ref_str)
                if m3:
                    vis = int(m3.group(1))
                    c = int(m3.group(2))
                    v = int(m3.group(3))
                    c_full = vis * 10 + c
                elif m2:
                    c_full = int(m2.group(1))
                    v = int(m2.group(2))
                else:
                    c_full = 99
                    v = 1
                greek_items.append((c_full, v, ref_str, el_text))

        d2 = div2_map.get(title)
        eng_paras = []
        if d2 is not None:
            for p in d2.findall('.//p'):
                t = ' '.join(''.join(p.itertext()).split()).strip()
                if t:
                    eng_paras.append(t)

        for idx, (c, v, ref_str, el) in enumerate(greek_items):
            en = eng_paras[idx] if idx < len(eng_paras) else ''
            en = html.unescape(en).replace('\u2014', '--').replace('&gt;', '>').replace('&lt;', '<')
            ref_id = f"{code} {c}:{v}"
            raw_sections.append({
                'id': ref_id,
                'b': code,
                'c': c,
                'v': v,
                'en': en,
                'el': el
            })

    return raw_sections


def main():
    print("Step 1: Extracting parallel sections for Apostolic Fathers...")
    raw_sections = load_raw_af_sections()
    print(f"Loaded {len(raw_sections)} parallel sections across 15 works.")

    print("Step 2: Processing English text with spaCy NLP...")
    nlp = spacy.load("en_core_web_sm", disable=["parser", "ner"])

    biblical_proper = load_biblical_proper_names(raw_dir='data/raw')
    proper_names = biblical_proper | PATRISTIC_PROPER_NAMES
    common_nouns = PATRISTIC_COMMON_NOUNS

    clean_re = re.compile(r'[^a-zA-Z]')
    verses = []
    word_to_verse = defaultdict(list)

    af_text_path = os.path.join(PROCESSED_DIR, 'af_text.txt')
    with open(af_text_path, 'w', encoding='utf-8') as text_out:
        batch_size = 500
        for i in range(0, len(raw_sections), batch_size):
            batch = raw_sections[i:i + batch_size]
            docs = nlp.pipe([s['en'] for s in batch])

            for s, doc in zip(batch, docs):
                tagged_words = []
                words_in_sec = set()

                for token in doc:
                    w_clean = clean_re.sub('', token.lemma_).lower()
                    if not w_clean:
                        continue
                    if w_clean in ['nt', 'wo', 'ca', 's', 'm', 'll', 've', 'd', 're', 'ii']:
                        continue
                    if token.pos_ in ["SPACE", "PUNCT"]:
                        continue

                    pos = token.pos_
                    if pos == "PROPN":
                        if w_clean in common_nouns or (w_clean not in proper_names and (not w_clean.endswith('s') or w_clean[:-1] not in proper_names)):
                            if w_clean in ["holy", "godly", "blessed"]:
                                pos = "ADJ"
                            elif w_clean == "behold":
                                pos = "INTJ"
                            else:
                                pos = "NOUN"
                    elif pos == "NOUN":
                        if w_clean in proper_names and w_clean not in common_nouns:
                            pos = "PROPN"

                    tagged = f"{w_clean}_{pos}"
                    tagged_words.append(tagged)
                    words_in_sec.add(tagged)

                # Format verse entry: REF|English|Greek
                verse_str = f"{s['id']}|{s['en']}|{s['el']}"
                verse_idx = len(verses)
                verses.append(verse_str)

                for w in words_in_sec:
                    word_to_verse[w].append(verse_idx)

                if tagged_words:
                    text_out.write(" ".join(tagged_words) + "\n")

    print(f"Generated text corpus at {af_text_path}.")
    print(f"Indexed {len(verses)} sections with {len(word_to_verse)} unique vocabulary lemmas.")

    verse_index_path = os.path.join(OUTPUT_DIR, 'verse_index_af.json')
    with open(verse_index_path, 'w', encoding='utf-8') as out_f:
        json.dump({'verses': verses, 'words': dict(word_to_verse)}, out_f, separators=(',', ':'))
    
    mb = os.path.getsize(verse_index_path) / (1024 * 1024)
    print(f"[DONE] Saved {verse_index_path} ({mb:.2f} MB).")


if __name__ == '__main__':
    main()
