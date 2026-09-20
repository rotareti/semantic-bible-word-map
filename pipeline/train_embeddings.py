import os
from gensim.models import Word2Vec
import logging

logging.basicConfig(format='%(asctime)s : %(levelname)s : %(message)s', level=logging.INFO)

class MySentences:
    def __init__(self, filenames):
        self.filenames = filenames

    def __iter__(self):
        for filename in self.filenames:
            with open(filename, 'r', encoding='utf-8') as f:
                for line in f:
                    words = line.split()
                    if words:
                        yield words

if __name__ == '__main__':
    data_paths = ['data/processed/ot_text.txt', 'data/processed/nt_text.txt']
    for data_path in data_paths:
        if not os.path.exists(data_path):
            print(f"Error: {data_path} not found.")
            exit(1)
        
    print("Training Word2Vec model...")
    sentences = MySentences(data_paths)
    
    # Train a Skip-gram model with window=50 (paradigmatic semantics with tuned subsampling and negative sampling)
    model = Word2Vec(sentences=sentences, vector_size=100, window=50, min_count=2, workers=8, sg=1, epochs=10, seed=42, sample=1e-4, negative=10)
    
    model.save('data/processed/word2vec.model')
    print("Model saved to data/processed/word2vec.model")
