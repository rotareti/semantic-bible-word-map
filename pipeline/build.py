import json
import os
import re
import spacy
from spacy.lang.en import English

nlp = spacy.load("en_core_web_sm", disable=["parser", "ner"])

raw_dir = 'data/raw'
verses = []
word_to_verse = {}

ot_books = {
    "GEN", "EXO", "LEV", "NUM", "DEU", "JOS", "JDG", "RUT", "1SA", "2SA", "1KI", "2KI",
    "1CH", "2CH", "EZR", "NEH", "EST", "JOB", "PSA", "PRO", "ECC", "SNG", "ISA", "JER",
    "LAM", "EZK", "DAN", "HOS", "JOL", "AMO", "OBA", "JON", "MIC", "NAM", "HAB", "ZEP",
    "HAG", "ZEC", "MAL"
}

def extract_text(val, current_ref, current_verse_text):
    if isinstance(val, str):
        current_verse_text.append(val)
    elif isinstance(val, list):
        for item in val:
            extract_text(item, current_ref, current_verse_text)
    elif isinstance(val, dict):
        if val.get('type') == 'note':
            return
        if val.get('type') == 'chapter':
            current_ref['c'] = val.get('number', current_ref['c'])
        elif val.get('type') == 'verse':
            v_num = val.get('number')
            if v_num:
                flush_verse(current_ref, current_verse_text)
                current_ref['v'] = v_num
                current_verse_text.clear()
        if 'content' in val:
            extract_text(val['content'], current_ref, current_verse_text)

raw_verses = []

files = [f for f in os.listdir(raw_dir) if f.endswith('.usj')]
files.sort()

def flush_verse(ref, text_list):
    if not text_list or not ref['b'] or not ref['c'] or not ref['v']:
        return
    full_text = " ".join(text_list).strip()
    if full_text:
        raw_verses.append({'b': ref['b'], 'c': ref['c'], 'v': ref['v'], 'text': full_text})

for f in files:
    book_code = f.split('.')[0]
    path = os.path.join(raw_dir, f)
    with open(path, 'r') as file:
        data = json.load(file)
        current_ref = {'b': book_code, 'c': None, 'v': None}
        current_verse_text = []
        extract_text(data, current_ref, current_verse_text)
        flush_verse(current_ref, current_verse_text)

print(f"Loaded {len(raw_verses)} raw verses. Processing with spaCy...")

ot_file = open('data/processed/ot_text.txt', 'w')
nt_file = open('data/processed/nt_text.txt', 'w')

clean_re = re.compile(r'[^a-zA-Z]')

batch_size = 1000
for i in range(0, len(raw_verses), batch_size):
    batch = raw_verses[i:i+batch_size]
    # Process texts via nlp.pipe for performance
    docs = nlp.pipe([v['text'] for v in batch])
    
    for v, doc in zip(batch, docs):
        tagged_words = []
        words_in_verse = set()
        
        for token in doc:
            word_clean = clean_re.sub('', token.text).lower()
            if not word_clean:
                continue
            
            # Using POS tag to differentiate homophones (e.g. mark_PROPN vs mark_VERB)
            # If POS is SPACE or PUNCT, skip
            if token.pos_ in ["SPACE", "PUNCT"]:
                continue
                
            tagged_word = f"{word_clean}_{token.pos_}"
            tagged_words.append(tagged_word)
            words_in_verse.add(tagged_word)
            
        if not tagged_words:
            continue
            
        verse_str = f"{v['b']} {v['c']}:{v['v']}|{v['text']}"
        verse_id = len(verses)
        verses.append(verse_str)
        
        for w in words_in_verse:
            if w not in word_to_verse:
                word_to_verse[w] = []
            word_to_verse[w].append(verse_id)
            
        tagged_text = " ".join(tagged_words)
        if v['b'] in ot_books:
            ot_file.write(tagged_text + "\n")
        else:
            nt_file.write(tagged_text + "\n")
            
ot_file.close()
nt_file.close()

print(f"Generated index for {len(verses)} verses.")
with open('data/output/verse_index_raw.json', 'w') as file:
    json.dump({'verses': verses, 'words': word_to_verse}, file, separators=(',', ':'))
print("Saved verse_index_raw.json")
