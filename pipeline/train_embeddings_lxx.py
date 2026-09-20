import logging
import os
from gensim.models import Word2Vec

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
    data_paths = ['data/processed/ot_text_lxx.txt', 'data/processed/nt_text_lxx.txt']
    for data_path in data_paths:
        if not os.path.exists(data_path):
            print(f"Error: {data_path} not found.")
            exit(1)

    print("Training Word2Vec model for Greek Septuagint & Greek NT...")
    sentences = MySentences(data_paths)

    # Train Skip-gram model with 100 dimensions, window=15, min_count=2, epochs=15, sample=1e-3, negative=5
    model = Word2Vec(sentences=sentences, vector_size=100, window=15, min_count=2, workers=8, sg=1, epochs=15, seed=42, sample=1e-3, negative=5)

    output_model = 'data/processed/word2vec_lxx.model'
    model.save(output_model)
    print(f"Model saved to {output_model} with {len(model.wv)} words in vocabulary.")
