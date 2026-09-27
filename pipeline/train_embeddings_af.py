"""
Train 100-dimensional Word2Vec embeddings for Apostolic Fathers corpus.
Outputs: data/processed/word2vec_af.model
"""

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


def main():
    data_path = 'data/processed/af_text.txt'
    if not os.path.exists(data_path):
        raise FileNotFoundError(f"Missing {data_path}. Run pipeline/build_af.py first.")

    print("Training Word2Vec model for Apostolic Fathers...")
    sentences = MySentences([data_path])

    # Word2Vec continuous skip-gram (sg=1), dimension=100, window=15
    # For a 125,000-word corpus, 30 epochs ensures dense clustering
    model = Word2Vec(
        sentences=sentences,
        vector_size=100,
        window=15,
        min_count=2,
        workers=8,
        sg=1,
        epochs=30,
        seed=42,
        sample=1e-3,
        negative=5
    )

    out_path = 'data/processed/word2vec_af.model'
    model.save(out_path)
    print(f"[DONE] Model saved to {out_path} with {len(model.wv)} vocabulary terms.")


if __name__ == '__main__':
    main()
