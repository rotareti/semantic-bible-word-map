import json
from gensim.models import Word2Vec
import umap
import numpy as np
import os

if __name__ == '__main__':
    print("Loading Word2Vec model...")
    model_path = 'data/processed/word2vec.model'
    if not os.path.exists(model_path):
        print("Model not found. Run train_embeddings.py first.")
        exit(1)
        
    model = Word2Vec.load(model_path)
    
    # Extract words, their frequencies, and their vectors
    # Load OT and NT words to tag testaments
    ot_words = set()
    with open('data/processed/ot_text.txt', 'r') as f:
        for line in f:
            ot_words.update(line.split())
            
    nt_words = set()
    with open('data/processed/nt_text.txt', 'r') as f:
        for line in f:
            nt_words.update(line.split())

    words = []
    vectors = []
    freqs = []
    testaments = []

    # We only include words that appear at least min_count times
    for word, vocab_obj in model.wv.key_to_index.items():
        count = model.wv.get_vecattr(word, "count")
        if count >= 3:
            words.append(word)
            vectors.append(model.wv[word])
            freqs.append(int(count))
            
            # Determine testament presence
            in_ot = word in ot_words
            in_nt = word in nt_words
            if in_ot and in_nt:
                testaments.append("Both")
            elif in_ot:
                testaments.append("OT")
            else:
                testaments.append("NT")
            
    vectors = np.array(vectors)
    print(f"Generating map for {len(words)} words...")
    
    # Generate 2D map
    print("Running UMAP (2D)...")
    reducer_2d = umap.UMAP(n_components=2, random_state=42, n_neighbors=15, min_dist=0.1)
    coords_2d = reducer_2d.fit_transform(vectors)
    
    out_2d = []
    for i in range(len(words)):
        v_rounded = [round(float(val), 3) for val in vectors[i]]
        
        # Parse mark_PROPN into w="mark", pos="PROPN", id="mark_PROPN"
        parts = words[i].split('_')
        display_word = parts[0]
        pos_tag = parts[1] if len(parts) > 1 else ""
        
        out_2d.append({
            "id": words[i],
            "w": display_word,
            "pos": pos_tag,
            "f": freqs[i],
            "t": testaments[i],
            "x": round(float(coords_2d[i][0]), 3),
            "y": round(float(coords_2d[i][1]), 3),
            "v": v_rounded
        })
    print("Saving map to data/output/...")
    with open('data/output/wordmap_2d.json', 'w') as f:
        json.dump(out_2d, f, separators=(',', ':')) # Minified JSON
        
    print("Filtering verse index...")
    with open('data/output/verse_index_raw.json', 'r') as f:
        v_idx = json.load(f)
    
    valid_words = set(words)
    filtered_word_to_verse = {}
    for w in valid_words:
        if w in v_idx['words']:
            filtered_word_to_verse[w] = v_idx['words'][w]
            
    with open('data/output/verse_index.json', 'w') as f:
        json.dump({'verses': v_idx['verses'], 'words': filtered_word_to_verse}, f, separators=(',', ':'))
        
    print("Map and Index saved successfully.")
