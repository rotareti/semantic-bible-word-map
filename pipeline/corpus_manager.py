"""
Modular Corpus Management & Extensibility Driver
Provides a unified interface for managing biblical canons (BSB, LXX, VUL)
and extending the pipeline to external corpora such as Early Church Fathers (Patristics).
"""

import os
import sys
import json
import argparse
import subprocess
from christ_anchor import CANON_CHRIST_CONFIGS, compute_christ_anchor, center_nodes_2d


class CorpusDefinition:
    """Encapsulates file paths, metadata, and execution parameters for a corpus."""
    def __init__(self, key, name, language, text_files, word2vec_model, wordmap_file, verse_index_file, bookmap_file, chaptermap_file, versemap_file, anchor_key=None):
        self.key = key
        self.name = name
        self.language = language
        self.text_files = text_files
        self.word2vec_model = word2vec_model
        self.wordmap_file = wordmap_file
        self.verse_index_file = verse_index_file
        self.bookmap_file = bookmap_file
        self.chaptermap_file = chaptermap_file
        self.versemap_file = versemap_file
        self.anchor_key = anchor_key or key


CORPUS_REGISTRY = {
    'bsb': CorpusDefinition(
        key='bsb',
        name='Berean Standard Bible',
        language='en',
        text_files=['data/processed/ot_text.txt', 'data/processed/nt_text.txt'],
        word2vec_model='data/processed/word2vec.model',
        wordmap_file='data/output/wordmap_2d.json',
        verse_index_file='data/output/verse_index.json',
        bookmap_file='data/output/bookmap_2d.json',
        chaptermap_file='data/output/chaptermap_2d.json',
        versemap_file='data/output/versemap_2d.json',
        anchor_key='bsb'
    ),
    'lxx': CorpusDefinition(
        key='lxx',
        name='Septuagint & Greek NT',
        language='grc',
        text_files=['data/processed/ot_text_lxx.txt', 'data/processed/nt_text_lxx.txt'],
        word2vec_model='data/processed/word2vec_lxx.model',
        wordmap_file='data/output/wordmap_2d_lxx.json',
        verse_index_file='data/output/verse_index_lxx.json',
        bookmap_file='data/output/bookmap_2d_lxx.json',
        chaptermap_file='data/output/chaptermap_2d_lxx.json',
        versemap_file='data/output/versemap_2d_lxx.json',
        anchor_key='lxx'
    ),
    'vul': CorpusDefinition(
        key='vul',
        name='Clementine Vulgate',
        language='la',
        text_files=['data/processed/ot_text_vul.txt', 'data/processed/nt_text_vul.txt'],
        word2vec_model='data/processed/word2vec_vul.model',
        wordmap_file='data/output/wordmap_2d_vul.json',
        verse_index_file='data/output/verse_index_vul.json',
        bookmap_file='data/output/bookmap_2d_vul.json',
        chaptermap_file='data/output/chaptermap_2d_vul.json',
        versemap_file='data/output/versemap_2d_vul.json',
        anchor_key='vul'
    ),
    # Extensible template for Patristics / Early Church Fathers
    'patristics': CorpusDefinition(
        key='patristics',
        name='Early Church Fathers (Apostolic & Ante-Nicene)',
        language='grc/la/en',
        text_files=['data/processed/patristics_text.txt'],
        word2vec_model='data/processed/word2vec_patristics.model',
        wordmap_file='data/output/wordmap_2d_patristics.json',
        verse_index_file='data/output/verse_index_patristics.json',
        bookmap_file='data/output/bookmap_2d_patristics.json',
        chaptermap_file='data/output/chaptermap_2d_patristics.json',
        versemap_file='data/output/versemap_2d_patristics.json',
        anchor_key='bsb'
    )
}


def run_script(script_name):
    """Executes a pipeline python script using current python interpreter."""
    script_path = os.path.join(os.path.dirname(__file__), script_name)
    if not os.path.exists(script_path):
        raise FileNotFoundError(f"Script not found: {script_path}")
    print(f"\n>>> Executing {script_name}...")
    res = subprocess.run([sys.executable, script_path], check=True)
    return res.returncode


def generate_christocentric_pipeline(corpus_key='all'):
    """Executes map generation and centroid pipeline to produce centered Christocentric maps."""
    targets = [corpus_key] if corpus_key != 'all' else ['bsb', 'lxx', 'vul']
    
    for c in targets:
        if c not in CORPUS_REGISTRY:
            print(f"Unknown corpus: {c}")
            continue
        print(f"\n=======================================================")
        print(f"Generating Christocentric Map for: {CORPUS_REGISTRY[c].name}")
        print(f"=======================================================")

        if c == 'bsb':
            run_script('generate_map.py')
            run_script('generate_verse_centroids.py')
            run_script('generate_chapter_centroids.py')
            run_script('generate_book_centroids.py')
        elif c == 'lxx':
            run_script('generate_map_lxx.py')
            run_script('generate_verse_centroids_lxx.py')
            run_script('generate_chapter_centroids_lxx.py')
            run_script('generate_book_centroids_lxx.py')
        elif c == 'vul':
            run_script('generate_map_vul.py')
            run_script('generate_verse_centroids_vul.py')
            run_script('generate_chapter_centroids_vul.py')
            run_script('generate_book_centroids_vul.py')


def main():
    parser = argparse.ArgumentParser(description="SymBible Corpus Manager & Pipeline Runner")
    parser.add_argument('--action', choices=['map', 'centroids', 'all'], default='all', help="Pipeline stage to execute")
    parser.add_argument('--corpus', choices=['bsb', 'lxx', 'vul', 'all', 'patristics'], default='all', help="Target corpus")
    args = parser.parse_args()

    generate_christocentric_pipeline(args.corpus)


if __name__ == '__main__':
    main()
