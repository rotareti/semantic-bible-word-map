"""
Proof of Concept: Contextual Word Embeddings for Biblical Polysemy Resolution
Extracts token-level contextual representations for 'temple' using a Transformer (MiniLM)
on the NVIDIA RTX 2070 GPU, then performs unsupervised clustering.
"""

import json
import re
import torch
import numpy as np
from transformers import AutoTokenizer, AutoModel
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score

device = 'cuda' if torch.cuda.is_available() else 'cpu'
print(f"Using device: {device}")

# Load tokenizer and model
model_name = 'sentence-transformers/all-MiniLM-L6-v2'
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModel.from_pretrained(model_name).to(device)
model.eval()

# Load verse index
with open('data/output/verse_index.json') as f:
    vdata = json.load(f)

# Find all verses containing the word 'temple' (case-insensitive word boundary)
temple_pattern = re.compile(r'\btemples?\b', re.IGNORECASE)

occurrences = []
for idx, entry in enumerate(vdata['verses']):
    ref, text = entry.split('|', 1)
    # Check match
    matches = list(temple_pattern.finditer(text))
    if matches:
        occurrences.append({
            'verse_id': idx,
            'reference': ref,
            'text': text,
            'matches': matches
        })

print(f"Found {len(occurrences)} verses containing 'temple' / 'temples'.")

# Extract token-level contextual embedding for each occurrence of 'temple'
vectors = []
valid_occurrences = []

for item in occurrences:
    text = item['text']
    inputs = tokenizer(text, return_tensors='pt', return_offsets_mapping=True)
    offset_mapping = inputs.pop('offset_mapping')[0]
    inputs = {k: v.to(device) for k, v in inputs.items()}
    
    with torch.no_grad():
        outputs = model(**inputs)
        # last_hidden_state: [1, seq_len, hidden_dim]
        hidden = outputs.last_hidden_state[0] # [seq_len, 384]
    
    # Locate token corresponding to the match span
    for match in item['matches']:
        m_start, m_end = match.span()
        token_indices = []
        for t_idx, (start, end) in enumerate(offset_mapping):
            if start is None or end is None:
                continue
            if max(start, m_start) < min(end, m_end): # overlap
                token_indices.append(t_idx)
        
        if token_indices:
            # Mean pool the subword tokens for 'temple'
            token_vec = hidden[token_indices].mean(dim=0).cpu().numpy()
            # Normalize vector
            token_vec = token_vec / (np.linalg.norm(token_vec) + 1e-10)
            vectors.append(token_vec)
            valid_occurrences.append({
                'reference': item['reference'],
                'text': text,
                'matched_text': match.group(0),
                'span': (m_start, m_end)
            })

X = np.array(vectors)
print(f"Extracted {len(X)} contextual token embeddings in R^{X.shape[1]}.")

# Evaluate KMeans for k=2 and k=3
for k in [2, 3]:
    kmeans = KMeans(n_clusters=k, random_state=42, n_init=10)
    labels = kmeans.fit_predict(X)
    sil = silhouette_score(X, labels)
    print(f"K={k}: Silhouette Score = {sil:.4f}")

# Cluster into k=2 senses
kmeans = KMeans(n_clusters=2, random_state=42, n_init=10)
labels = kmeans.fit_predict(X)

cluster_0 = []
cluster_1 = []

for idx, label in enumerate(labels):
    item = valid_occurrences[idx]
    if label == 0:
        cluster_0.append(item)
    else:
        cluster_1.append(item)

print(f"\nCluster 0: {len(cluster_0)} occurrences")
print(f"Cluster 1: {len(cluster_1)} occurrences")

# Function to inspect testaments
def get_testament_split(items):
    ot_books = ['GEN', 'EXO', 'LEV', 'NUM', 'DEU', 'JOS', 'JDG', 'RUT', '1SA', '2SA', '1KI', '2KI', '1CH', '2CH', 'EZR', 'NEH', 'EST', 'JOB', 'PSA', 'PRO', 'ECC', 'SNG', 'ISA', 'JER', 'LAM', 'EZK', 'DAN', 'HOS', 'JOL', 'AMO', 'OBA', 'JON', 'MIC', 'NAM', 'HAB', 'ZEP', 'HAG', 'ZEC', 'MAL']
    ot_cnt = sum(1 for x in items if x['reference'].split()[0] in ot_books)
    nt_cnt = len(items) - ot_cnt
    return ot_cnt, nt_cnt

ot0, nt0 = get_testament_split(cluster_0)
ot1, nt1 = get_testament_split(cluster_1)

print(f"\nCluster 0 Testament Split: OT={ot0} ({ot0/len(cluster_0)*100:.1f}%), NT={nt0} ({nt0/len(cluster_0)*100:.1f}%)")
print(f"Cluster 1 Testament Split: OT={ot1} ({ot1/len(cluster_1)*100:.1f}%), NT={nt1} ({nt1/len(cluster_1)*100:.1f}%)")

print("\n--- Cluster 0 Samples (Top 8) ---")
for x in cluster_0[:8]:
    print(f"[{x['reference']}] {x['text']}")

print("\n--- Cluster 1 Samples (Top 8) ---")
for x in cluster_1[:8]:
    print(f"[{x['reference']}] {x['text']}")

# Specifically check famous polysemy verses
key_refs = ['1CO 3:16', '1CO 6:19', '2CO 6:16', 'EPH 2:21', 'JHN 2:19', 'JHN 2:21', 'REV 21:22', '1KI 6:1', '2CH 3:1']
print("\n--- Polysemy Benchmark Reference Inspection ---")
for idx, item in enumerate(valid_occurrences):
    ref_base = item['reference']
    for kr in key_refs:
        if kr in ref_base:
            c = labels[idx]
            print(f"[{ref_base}] -> Cluster {c}: {item['text']}")
