import json

raw_path = 'data/output/verse_index_raw.json'
wordmap_path = 'data/output/wordmap_2d.json'
output_path = 'data/output/verse_index.json'

with open(raw_path, 'r') as file:
    raw_data = json.load(file)

with open(wordmap_path, 'r') as file:
    wordmap = json.load(file)

valid_words = set(d['id'] for d in wordmap)
filtered_word_to_verse = {}

for w, verses in raw_data['words'].items():
    if w in valid_words:
        filtered_word_to_verse[w] = verses

print(f"Generated index for {len(raw_data['verses'])} verses and {len(filtered_word_to_verse)} words.")

with open(output_path, 'w') as file:
    json.dump({'verses': raw_data['verses'], 'words': filtered_word_to_verse}, file, separators=(',', ':'))

print(f"Saved to {output_path}")
