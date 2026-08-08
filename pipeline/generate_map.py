import json
from gensim.models import Word2Vec
import umap
import numpy as np
import os

if __name__ == '__main__':
    print("Loading Word2Vec model...")
    model_path = '../data/processed/word2vec.model'
    if not os.path.exists(model_path):
        print("Model not found. Run train_embeddings.py first.")
        exit(1)
        
    model = Word2Vec.load(model_path)
    
    # Extract words, their frequencies, and their vectors
    words = []
    vectors = []
    freqs = []
    
    # We only include words that appear at least min_count times (handled by Word2Vec naturally, but we can filter more if we want)
    for word, vocab_obj in model.wv.key_to_index.items():
        count = model.wv.get_vecattr(word, "count")
        if count >= 10: # Only include words that appear at least 10 times to keep map clean
            words.append(word)
            vectors.append(model.wv[word])
            freqs.append(int(count))
            
    vectors = np.array(vectors)
    print(f"Generating map for {len(words)} words...")
    
    # Generate 2D map
    print("Running UMAP (2D)...")
    reducer_2d = umap.UMAP(n_components=2, random_state=42, n_neighbors=15, min_dist=0.1)
    coords_2d = reducer_2d.fit_transform(vectors)
    
    # Generate 3D map
    print("Running UMAP (3D)...")
    reducer_3d = umap.UMAP(n_components=3, random_state=42, n_neighbors=15, min_dist=0.1)
    coords_3d = reducer_3d.fit_transform(vectors)
    
    out_2d = []
    out_3d = []
    for i in range(len(words)):
        out_2d.append({
            "w": words[i],
            "f": freqs[i],
            "x": round(float(coords_2d[i][0]), 3),
            "y": round(float(coords_2d[i][1]), 3)
        })
        out_3d.append({
            "w": words[i],
            "f": freqs[i],
            "x": round(float(coords_3d[i][0]), 3),
            "y": round(float(coords_3d[i][1]), 3),
            "z": round(float(coords_3d[i][2]), 3)
        })
        
    print("Saving maps to data/output/...")
    with open('../data/output/wordmap_2d.json', 'w') as f:
        json.dump(out_2d, f, separators=(',', ':')) # Minified JSON
        
    with open('../data/output/wordmap_3d.json', 'w') as f:
        json.dump(out_3d, f, separators=(',', ':'))
        
    print("Maps saved successfully.")
