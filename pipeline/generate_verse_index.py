import json
import os
import re

raw_dir = '../data/raw'
output_path = '../data/output/verse_index.json'

if not os.path.exists(raw_dir):
    print(f"Raw dir not found: {raw_dir}")
    exit(1)

# To keep the index small, we'll store verses as strings in a list, 
# and the word map will store integer indices into that list.
verses = []
word_to_verse = {}

# Regex to keep only alphabetic characters and spaces
clean_re = re.compile(r'[^a-zA-Z\s]')

def extract_strings_and_verses(val, current_ref, words_in_verse):
    if isinstance(val, str):
        cleaned = clean_re.sub(' ', val).lower()
        for w in cleaned.split():
            if w:
                words_in_verse.add(w)
    elif isinstance(val, list):
        for item in val:
            extract_strings_and_verses(item, current_ref, words_in_verse)
    elif isinstance(val, dict):
        # Check if this object is a chapter or verse marker
        if val.get('type') == 'chapter':
            current_ref['c'] = val.get('number', current_ref['c'])
        elif val.get('type') == 'verse':
            # Starting a new verse
            v_num = val.get('number')
            if v_num:
                # Flush the old verse
                flush_verse(current_ref, words_in_verse)
                current_ref['v'] = v_num
                words_in_verse.clear()
        
        # Recurse into content if present
        if 'content' in val:
            extract_strings_and_verses(val['content'], current_ref, words_in_verse)

def flush_verse(current_ref, words_in_verse):
    if not words_in_verse or not current_ref['b'] or not current_ref['c'] or not current_ref['v']:
        return
        
    verse_str = f"{current_ref['b']} {current_ref['c']}:{current_ref['v']}"
    verse_id = len(verses)
    verses.append(verse_str)
    
    for w in words_in_verse:
        if w not in word_to_verse:
            word_to_verse[w] = []
        word_to_verse[w].append(verse_id)

files = [f for f in os.listdir(raw_dir) if f.endswith('.usj')]
files.sort()

for f in files:
    book_code = f.split('.')[0]
    path = os.path.join(raw_dir, f)
    with open(path, 'r') as file:
        data = json.load(file)
        current_ref = {'b': book_code, 'c': None, 'v': None}
        words_in_verse = set()
        extract_strings_and_verses(data, current_ref, words_in_verse)
        flush_verse(current_ref, words_in_verse)

# Now we filter the word_to_verse map to only include words that appear 
# in our word2vec model (count >= 3). We'll load wordmap_2d.json for that.
wordmap_path = '../data/output/wordmap_2d.json'
with open(wordmap_path, 'r') as file:
    wordmap = json.load(file)
    
valid_words = set(d['w'] for d in wordmap)

filtered_word_to_verse = {}
for w in valid_words:
    if w in word_to_verse:
        filtered_word_to_verse[w] = word_to_verse[w]

print(f"Generated index for {len(verses)} verses and {len(filtered_word_to_verse)} words.")

with open(output_path, 'w') as file:
    json.dump({'verses': verses, 'words': filtered_word_to_verse}, file, separators=(',', ':'))

print(f"Saved to {output_path}")
