#!/usr/bin/env python3
"""
Optimal Dimensionality Study for Biblical Semantic Word Maps
============================================================
Mathematical and empirical evaluation of optimal embedding dimensionality (d)
across biblical corpora:
  - Berean Standard Bible (BSB English, 66 books)
  - Septuagint & Greek NT (LXX Greek, 81 books)
  - Latin Clementine Vulgate (VUL Latin, 73 books)

Evaluates:
  1. Spectral energy distribution, scree plot elbow, and Roy-Vetterli Effective Rank.
  2. Yin-Shen Pairwise Inner Product (PIP) Loss (Bias-Variance tradeoff).
  3. Empirical Skip-gram training loss and held-out test verse negative sampling loss.
  4. Manifold intrinsic dimensionality (TwoNN estimator).
  5. Hubness skewness and orphan word rates (curse of dimensionality).
  6. 2D UMAP projection fidelity (Trustworthiness and Continuity).
  7. Neighborhood stability across dimension transitions.
"""

import os
import sys
import json
import time
import argparse
import random
from collections import Counter
import numpy as np
from scipy import sparse
from scipy.sparse.linalg import svds
from sklearn.neighbors import NearestNeighbors
from sklearn.manifold import trustworthiness
from gensim.models import Word2Vec
import umap

CANON_CONFIGS = {
    'BSB': {
        'files': ['data/processed/ot_text.txt', 'data/processed/nt_text.txt'],
        'language': 'English',
        'epochs': 10
    },
    'LXX': {
        'files': ['data/processed/ot_text_lxx.txt', 'data/processed/nt_text_lxx.txt'],
        'language': 'Ancient Greek',
        'epochs': 15
    },
    'VUL': {
        'files': ['data/processed/ot_text_vul.txt', 'data/processed/nt_text_vul.txt'],
        'language': 'Biblical Latin',
        'epochs': 15
    }
}


def load_corpus(files):
    sentences = []
    for fpath in files:
        if not os.path.exists(fpath):
            raise FileNotFoundError(f"Corpus file not found: {fpath}")
        with open(fpath, 'r', encoding='utf-8') as f:
            for line in f:
                words = line.split()
                if words:
                    sentences.append(words)
    return sentences


def compute_spectral_properties(sentences, min_count=2, window=5, max_k=250):
    print("  [Spectral] Counting co-occurrences and building PPMI matrix...")
    vocab_counter = Counter()
    total_tokens = 0
    for s in sentences:
        vocab_counter.update(s)
        total_tokens += len(s)

    valid_words = [w for w, c in vocab_counter.items() if c >= min_count]
    word2id = {w: i for i, w in enumerate(valid_words)}
    V = len(word2id)

    cooccur = Counter()
    unigram = Counter()

    for s in sentences:
        filtered = [word2id[w] for w in s if w in word2id]
        L = len(filtered)
        for i, w1 in enumerate(filtered):
            unigram[w1] += 1
            left = max(0, i - window)
            right = min(L, i + window + 1)
            for j in range(left, right):
                if i != j:
                    w2 = filtered[j]
                    cooccur[(w1, w2)] += 1

    total_pairs = sum(cooccur.values())
    shift = np.log(5.0)  # k=5 negative samples

    rows, cols, data = [], [], []
    for (w1, w2), count in cooccur.items():
        p_ij = count / total_pairs
        p_i = unigram[w1] / total_tokens
        p_j = unigram[w2] / total_tokens
        pmi = np.log(p_ij / (p_i * p_j + 1e-12)) - shift
        if pmi > 0:
            rows.append(w1)
            cols.append(w2)
            data.append(pmi)

    M = sparse.csr_matrix((data, (rows, cols)), shape=(V, V), dtype=np.float32)
    k = min(max_k, V - 2)

    print(f"  [Spectral] SVD decomposition (k={k}) on {V}x{V} PPMI matrix...")
    _, s, _ = svds(M, k=k)
    s = np.sort(s)[::-1]

    total_energy = np.sum(s**2)
    cum_energy = np.cumsum(s**2) / total_energy

    # Roy & Vetterli (2007) Effective Rank
    p = s / np.sum(s)
    entropy = -np.sum(p * np.log(p + 1e-12))
    erank = float(np.exp(entropy))

    # Yin-Shen PIP Loss: Bias^2(d) = sum_{i > d} s_i^4
    s4 = s**4
    noise_sigma = np.mean(s[-25:])

    return {
        'vocab_size': V,
        'total_tokens': total_tokens,
        'erank': erank,
        'singular_values': s,
        'cum_energy': cum_energy,
        's4': s4,
        'noise_sigma': float(noise_sigma)
    }


def compute_twonn_intrinsic_dimension(embeddings, sample_size=3000):
    """Facco et al. (2017) TwoNN intrinsic dimension estimator."""
    N = len(embeddings)
    if N > sample_size:
        idx = np.random.choice(N, sample_size, replace=False)
        X = embeddings[idx]
    else:
        X = embeddings

    nbrs = NearestNeighbors(n_neighbors=3, metric='cosine').fit(X)
    distances, _ = nbrs.kneighbors(X)
    r1 = distances[:, 1]
    r2 = distances[:, 2]

    valid = (r1 > 1e-6) & (r2 > r1)
    if np.sum(valid) < 50:
        return 0.0
    mu = r2[valid] / r1[valid]
    d_int = len(mu) / np.sum(np.log(mu))
    return float(d_int)


def compute_hubness_and_orphans(embeddings, k=10, sample_size=3000):
    """Radovanovic et al. (2010) Hubness skewness and orphan rate."""
    N = len(embeddings)
    if N > sample_size:
        idx = np.random.choice(N, sample_size, replace=False)
        X = embeddings[idx]
    else:
        X = embeddings

    n_pts = len(X)
    nbrs = NearestNeighbors(n_neighbors=k + 1, metric='cosine').fit(X)
    _, indices = nbrs.kneighbors(X)

    # Count how often each point appears in top-k
    counts = np.bincount(indices[:, 1:].flatten(), minlength=n_pts)
    mean_c = np.mean(counts)
    std_c = np.std(counts)
    if std_c < 1e-6:
        skew = 0.0
    else:
        skew = float(np.mean(((counts - mean_c) / std_c) ** 3))

    orphan_pct = float(np.mean(counts == 0) * 100.0)
    max_hub = int(np.max(counts))

    return {
        'hubness_skewness': skew,
        'orphan_rate_pct': orphan_pct,
        'max_hub_count': max_hub
    }


def compute_umap_fidelity(embeddings, sample_size=2000, seed=42):
    """Compute 2D UMAP trustworthiness and continuity on a representative sample."""
    N = len(embeddings)
    if N > sample_size:
        idx = np.random.choice(N, sample_size, replace=False)
        X = embeddings[idx]
    else:
        X = embeddings

    reducer = umap.UMAP(n_components=2, n_neighbors=15, min_dist=0.1, random_state=seed, metric='cosine')
    Y_2d = reducer.fit_transform(X)

    t_score = float(trustworthiness(X, Y_2d, n_neighbors=15, metric='cosine'))

    # Continuity: trustworthiness with reversed roles (Y_2d -> X)
    c_score = float(trustworthiness(Y_2d, X, n_neighbors=15, metric='euclidean'))

    return {
        'trustworthiness_k15': t_score,
        'continuity_k15': c_score
    }


def evaluate_canon(canon_name, config, candidate_dims, epochs=10, seed=42):
    print(f"\n========================================================")
    print(f" EVALUATING OPTIMAL DIMENSIONALITY FOR {canon_name} ({config['language']})")
    print(f"========================================================")

    sentences = load_corpus(config['files'])
    total_verses = len(sentences)
    print(f"Loaded {total_verses} verses from {config['files']}")

    # 90% train, 10% test split for held-out validation
    random.seed(seed)
    indices = list(range(total_verses))
    random.shuffle(indices)
    split_pt = int(0.9 * total_verses)
    train_indices = set(indices[:split_pt])

    train_sentences = [sentences[i] for i in range(total_verses) if i in train_indices]
    val_sentences = [sentences[i] for i in range(total_verses) if i not in train_indices]

    # Step 1: Spectral & PIP Analysis
    spectral = compute_spectral_properties(sentences, max_k=max(candidate_dims) + 20)
    V = spectral['vocab_size']
    N_tokens = spectral['total_tokens']
    s = spectral['singular_values']
    s4 = spectral['s4']
    noise_sigma = spectral['noise_sigma']

    print(f"Vocabulary Size: {V}")
    print(f"Total Tokens: {N_tokens}")
    print(f"Effective Rank (Spectral Entropy): {spectral['erank']:.2f}")

    dim_results = []
    trained_models = {}

    for d in candidate_dims:
        print(f"\n--- Dimension d = {d} ---")
        t0 = time.time()

        # 1. Theoretical PIP Loss
        if d < len(s):
            bias2 = float(np.sum(s4[d:]))
            # Yin-Shen variance scaling
            var = float(2.0 * (noise_sigma**4) * d * V / (N_tokens / 1000))
            pip_loss = bias2 + var
            cum_energy = float(spectral['cum_energy'][d - 1])
        else:
            bias2, var, pip_loss, cum_energy = 0.0, 0.0, 0.0, 1.0

        # 2. Train Model on Training Sentences
        np.random.seed(seed)
        model = Word2Vec(
            sentences=train_sentences,
            vector_size=d,
            window=5,
            min_count=2,
            workers=4,
            sg=1,
            epochs=epochs,
            seed=seed,
            compute_loss=True
        )
        train_loss = float(model.get_latest_training_loss())
        trained_models[d] = model

        # 3. Held-out validation verse score (average log-sigmoid over sample pairs)
        # Using negative sampling dot products on validation set
        val_score = 0.0
        val_pairs_count = 0
        wv = model.wv
        for vs in val_sentences[:500]:
            v_words = [w for w in vs if w in wv]
            for i in range(len(v_words) - 1):
                u = wv.get_vector(v_words[i], norm=True)
                v = wv.get_vector(v_words[i + 1], norm=True)
                val_score += float(np.dot(u, v))
                val_pairs_count += 1
        avg_val_cosine = float(val_score / max(1, val_pairs_count))

        # 4. Geometry & Metrics
        # Sample all valid word vectors
        vectors = np.array([wv[w] for w in wv.index_to_key])
        
        twonn_d = compute_twonn_intrinsic_dimension(vectors)
        hub_info = compute_hubness_and_orphans(vectors, k=10)
        umap_info = compute_umap_fidelity(vectors, sample_size=2000, seed=seed)

        elapsed = time.time() - t0

        res_item = {
            'dim': d,
            'energy_pct': round(cum_energy * 100.0, 2),
            'bias2': round(bias2, 1),
            'variance': round(var, 1),
            'pip_loss': round(pip_loss, 1),
            'train_loss': round(train_loss, 1),
            'val_adjacent_cosine': round(avg_val_cosine, 4),
            'intrinsic_dim_twonn': round(twonn_d, 2),
            'hubness_skewness': round(hub_info['hubness_skewness'], 3),
            'orphan_rate_pct': round(hub_info['orphan_rate_pct'], 2),
            'max_hub_count': hub_info['max_hub_count'],
            'umap_trustworthiness': round(umap_info['trustworthiness_k15'], 4),
            'umap_continuity': round(umap_info['continuity_k15'], 4),
            'time_seconds': round(elapsed, 2)
        }
        dim_results.append(res_item)

        print(f"  Energy: {res_item['energy_pct']}% | PIP Loss: {res_item['pip_loss']:,.0f}")
        print(f"  Intrinsic Dim (TwoNN): {res_item['intrinsic_dim_twonn']} | Hubness Skew: {res_item['hubness_skewness']}")
        print(f"  UMAP Trustworthiness: {res_item['umap_trustworthiness']} | Continuity: {res_item['umap_continuity']}")
        print(f"  Orphan Words: {res_item['orphan_rate_pct']}% | Train Time: {res_item['time_seconds']}s")

    # Step 5: Neighborhood Jaccard Stability across Dimension Steps
    # Compare top-15 neighbors of frequent content words between dims
    top_words = [w for w in trained_models[candidate_dims[0]].wv.index_to_key[:150]]
    stability = {}
    for i in range(len(candidate_dims) - 1):
        d1 = candidate_dims[i]
        d2 = candidate_dims[i + 1]
        m1 = trained_models[d1].wv
        m2 = trained_models[d2].wv

        jaccards = []
        for w in top_words:
            if w in m1 and w in m2:
                n1 = set([item[0] for item in m1.most_similar(w, topn=15)])
                n2 = set([item[0] for item in m2.most_similar(w, topn=15)])
                jacc = len(n1 & n2) / len(n1 | n2)
                jaccards.append(jacc)
        avg_jacc = float(np.mean(jaccards)) if jaccards else 0.0
        stability[f"{d1}->{d2}"] = round(avg_jacc, 4)

    return {
        'canon': canon_name,
        'language': config['language'],
        'vocab_size': V,
        'total_tokens': N_tokens,
        'effective_rank': round(spectral['erank'], 2),
        'dim_results': dim_results,
        'neighborhood_stability': stability
    }


def main():
    parser = argparse.ArgumentParser(description="Evaluate optimal word embedding dimensionality across Biblical Canons")
    parser.add_argument('--canon', choices=['bsb', 'lxx', 'vul', 'all'], default='all', help="Canon to evaluate")
    parser.add_argument('--dims', type=str, default='25,50,75,90,97,100,110,125,150,200', help="Comma-separated dimensions to test")
    parser.add_argument('--epochs', type=int, default=10, help="Epochs per training run")
    parser.add_argument('--output', type=str, default='data/analysis/optimal_dimensions_report.json', help="JSON output file")
    args = parser.parse_args()

    dims = [int(x.strip()) for x in args.dims.split(',') if x.strip()]

    target_canons = ['BSB', 'LXX', 'VUL'] if args.canon == 'all' else [args.canon.upper()]

    os.makedirs(os.path.dirname(args.output), exist_ok=True)

    all_results = {}
    for canon in target_canons:
        res = evaluate_canon(canon, CANON_CONFIGS[canon], dims, epochs=args.epochs)
        all_results[canon] = res

    with open(args.output, 'w', encoding='utf-8') as f:
        json.dump(all_results, f, indent=2)

    print(f"\n========================================================")
    print(f" ALL CANON EXPERIMENTS COMPLETE")
    print(f" Results written to: {args.output}")
    print(f"========================================================")


if __name__ == '__main__':
    main()
