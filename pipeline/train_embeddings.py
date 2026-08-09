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
                    # Our Rust parser output is space separated, but very long.
                    # To prevent memory issues and allow Word2Vec to process effectively,
                    # we split into chunks of 1000 words.
                    words = line.split()
                    chunk_size = 1000
                    for i in range(0, len(words), chunk_size):
                        yield words[i:i + chunk_size]

if __name__ == '__main__':
    data_paths = ['data/processed/ot_text.txt', 'data/processed/nt_text.txt']
    for data_path in data_paths:
        if not os.path.exists(data_path):
            print(f"Error: {data_path} not found.")
            exit(1)
        
    print("Training Word2Vec model...")
    sentences = MySentences(data_paths)
    
    # Train a Skip-gram model (lower min_count to capture rare theological words)
    model = Word2Vec(sentences=sentences, vector_size=100, window=5, min_count=2, workers=4, sg=1, epochs=10)
    
    model.save('data/processed/word2vec.model')
    print("Model saved to data/processed/word2vec.model")
