"""
Biblical Semantic Evaluation Benchmark (BSEB)
Quantitatively evaluates Word2Vec embedding models across theological coherence,
retrieval precision (MAP@10), and noise intrusion rates (NIR@10).
"""

import os
import numpy as np
from gensim.models import Word2Vec

# Benchmark Probes across 5 biblical domains
# Format: probe_key -> {'signal': [...], 'domain': '...'}
BENCHMARK_PROBES = {
    # 1. Doctrinal & Soteriological
    'grace_NOUN': {
        'domain': 'Doctrinal',
        'signal': ['mercy_NOUN', 'peace_NOUN', 'truth_NOUN', 'favor_NOUN', 'faith_NOUN', 'gift_NOUN', 'glory_NOUN', 'love_NOUN', 'salvation_NOUN', 'righteousness_NOUN'],
    },
    'faith_NOUN': {
        'domain': 'Doctrinal',
        'signal': ['believe_VERB', 'grace_NOUN', 'righteousness_NOUN', 'hope_NOUN', 'promise_NOUN', 'love_NOUN', 'obedient_ADJ', 'steadfast_ADJ', 'trust_VERB', 'justify_VERB'],
    },
    'justify_VERB': {
        'domain': 'Doctrinal',
        'signal': ['faith_NOUN', 'righteousness_NOUN', 'reckon_VERB', 'credit_VERB', 'grace_NOUN', 'law_NOUN', 'redeem_VERB', 'reconciliation_NOUN', 'predestine_VERB', 'guarantee_VERB'],
    },
    'righteousness_NOUN': {
        'domain': 'Doctrinal',
        'signal': ['justice_NOUN', 'peace_NOUN', 'truth_NOUN', 'faith_NOUN', 'righteous_ADJ', 'uprightness_NOUN', 'equity_NOUN', 'statute_NOUN', 'law_NOUN', 'holiness_NOUN'],
    },
    'sin_NOUN': {
        'domain': 'Doctrinal',
        'signal': ['iniquity_NOUN', 'transgression_NOUN', 'guilt_NOUN', 'wickedness_NOUN', 'trespass_NOUN', 'evil_NOUN', 'forgive_VERB', 'repent_VERB', 'unrighteousness_NOUN', 'condemn_VERB'],
    },
    'redemption_NOUN': {
        'domain': 'Doctrinal',
        'signal': ['redeem_VERB', 'ransom_NOUN', 'salvation_NOUN', 'deliverance_NOUN', 'forgiveness_NOUN', 'blood_NOUN', 'grace_NOUN', 'covenant_NOUN', 'inheritance_NOUN', 'savior_NOUN'],
    },

    # 2. Cultic & Institutional
    'priest_NOUN': {
        'domain': 'Cultic',
        'signal': ['priesthood_NOUN', 'levite_PROPN', 'altar_NOUN', 'sanctuary_NOUN', 'consecrate_VERB', 'atonement_NOUN', 'sacrifice_NOUN', 'offering_NOUN', 'holy_ADJ', 'anoint_VERB'],
    },
    'altar_NOUN': {
        'domain': 'Cultic',
        'signal': ['sacrifice_NOUN', 'offering_NOUN', 'priest_NOUN', 'burn_VERB', 'incense_NOUN', 'sanctuary_NOUN', 'tabernacle_NOUN', 'temple_NOUN', 'bronze_NOUN', 'holy_ADJ'],
    },
    'temple_NOUN': {
        'domain': 'Cultic',
        'signal': ['house_NOUN', 'sanctuary_NOUN', 'court_NOUN', 'altar_NOUN', 'palace_NOUN', 'holy_ADJ', 'glory_NOUN', 'solomon_PROPN', 'worship_VERB', 'dwell_VERB'],
    },
    'sacrifice_NOUN': {
        'domain': 'Cultic',
        'signal': ['offering_NOUN', 'altar_NOUN', 'priest_NOUN', 'slaughter_VERB', 'blood_NOUN', 'atonement_NOUN', 'burn_VERB', 'ram_NOUN', 'bull_NOUN', 'holy_ADJ'],
    },
    'tabernacle_NOUN': {
        'domain': 'Cultic',
        'signal': ['tent_NOUN', 'sanctuary_NOUN', 'curtain_NOUN', 'ark_NOUN', 'veil_NOUN', 'court_NOUN', 'camp_NOUN', 'congregation_NOUN', 'dwell_VERB', 'holy_ADJ'],
    },

    # 3. Covenantal & Legal
    'covenant_NOUN': {
        'domain': 'Covenantal',
        'signal': ['ark_NOUN', 'commandment_NOUN', 'promise_NOUN', 'oath_NOUN', 'statute_NOUN', 'sworn_ADJ', 'transgress_VERB', 'everlasting_ADJ', 'treaty_NOUN', 'tablet_NOUN', 'mediator_NOUN'],
    },
    'law_NOUN': {
        'domain': 'Covenantal',
        'signal': ['commandment_NOUN', 'statute_NOUN', 'ordinance_NOUN', 'testimony_NOUN', 'decree_NOUN', 'precept_NOUN', 'moses_PROPN', 'transgress_VERB', 'righteousness_NOUN', 'keep_VERB'],
    },
    'commandment_NOUN': {
        'domain': 'Covenantal',
        'signal': ['statute_NOUN', 'ordinance_NOUN', 'precept_NOUN', 'law_NOUN', 'keep_VERB', 'testimony_NOUN', 'decree_NOUN', 'covenant_NOUN', 'obey_VERB', 'word_NOUN'],
    },
    'oath_NOUN': {
        'domain': 'Covenantal',
        'signal': ['swear_VERB', 'covenant_NOUN', 'promise_NOUN', 'curse_NOUN', 'vow_NOUN', 'confirm_VERB', 'pledge_NOUN', 'truth_NOUN', 'testimony_NOUN', 'solemn_ADJ'],
    },

    # 4. Relational & Ethical
    'love_NOUN': {
        'domain': 'Relational',
        'signal': ['lovingkindness_NOUN', 'faithfulness_NOUN', 'mercy_NOUN', 'compassion_NOUN', 'peace_NOUN', 'beloved_ADJ', 'brotherly_ADJ', 'affection_NOUN', 'joy_NOUN', 'heart_NOUN'],
    },
    'peace_NOUN': {
        'domain': 'Relational',
        'signal': ['righteousness_NOUN', 'grace_NOUN', 'truth_NOUN', 'joy_NOUN', 'quietness_NOUN', 'rest_NOUN', 'security_NOUN', 'covenant_NOUN', 'comfort_NOUN', 'prosperity_NOUN'],
    },
    'wisdom_NOUN': {
        'domain': 'Relational',
        'signal': ['understanding_NOUN', 'knowledge_NOUN', 'insight_NOUN', 'discretion_NOUN', 'prudence_NOUN', 'instruction_NOUN', 'fear_NOUN', 'wise_ADJ', 'counsel_NOUN', 'truth_NOUN'],
    },

    # 5. Monarchical & Geographical
    'king_NOUN': {
        'domain': 'Monarchical',
        'signal': ['kingdom_NOUN', 'throne_NOUN', 'reign_VERB', 'prince_NOUN', 'ruler_NOUN', 'crown_NOUN', 'palace_NOUN', 'queen_NOUN', 'lord_NOUN', 'david_PROPN'],
    },
    'kingdom_NOUN': {
        'domain': 'Monarchical',
        'signal': ['king_NOUN', 'throne_NOUN', 'reign_NOUN', 'dominion_NOUN', 'rule_NOUN', 'glory_NOUN', 'realm_NOUN', 'power_NOUN', 'sovereignty_NOUN', 'eternal_ADJ'],
    },
    'jerusalem_PROPN': {
        'domain': 'Geographical',
        'signal': ['zion_PROPN', 'judah_PROPN', 'city_NOUN', 'israel_PROPN', 'temple_NOUN', 'wall_NOUN', 'gate_NOUN', 'holy_ADJ', 'david_PROPN', 'mountain_NOUN'],
    }
}

# Word Intrusion Test Battery (4 thematic words + 1 domain intruder)
INTRUSION_BATTERY = [
    # Cultic group + monarchical intruder
    {
        'words': ['priest_NOUN', 'altar_NOUN', 'sanctuary_NOUN', 'sacrifice_NOUN', 'throne_NOUN'],
        'intruder': 'throne_NOUN'
    },
    # Covenant group + agricultural intruder
    {
        'words': ['covenant_NOUN', 'commandment_NOUN', 'statute_NOUN', 'ordinance_NOUN', 'harvest_NOUN'],
        'intruder': 'harvest_NOUN'
    },
    # Doctrinal group + architectural intruder
    {
        'words': ['faith_NOUN', 'grace_NOUN', 'righteousness_NOUN', 'mercy_NOUN', 'timber_NOUN'],
        'intruder': 'timber_NOUN'
    },
    # Relational group + warfare intruder
    {
        'words': ['love_NOUN', 'peace_NOUN', 'gentleness_NOUN', 'patience_NOUN', 'spear_NOUN'],
        'intruder': 'spear_NOUN'
    },
    # Monarchical group + ritual offering intruder
    {
        'words': ['king_NOUN', 'kingdom_NOUN', 'throne_NOUN', 'crown_NOUN', 'incense_NOUN'],
        'intruder': 'incense_NOUN'
    }
]


def evaluate_model(model, probes=BENCHMARK_PROBES, intrusion_battery=INTRUSION_BATTERY, top_k=10, rare_threshold=10, min_neighbor_count=0):
    """
    Evaluates a Word2Vec model on:
    1. MAP@top_k: Mean Average Precision of retrieving true signal words in top-k
    2. Recall@top_k: Fraction of signal words retrieved in top-k
    3. NIR@top_k: Noise Intrusion Rate (fraction of top-k neighbors with count < rare_threshold)
    4. Average top-k similarity: Mean cosine similarity of top-k neighbors
    5. Word Intrusion Test Accuracy (WITA): Outlier detection accuracy
    """
    wv = model.wv
    ap_scores = []
    recall_scores = []
    noise_intrusion_counts = []
    avg_similarities = []

    for probe, data in probes.items():
        if probe not in wv:
            continue

        signals = set(data['signal'])
        # Retrieve candidate neighbors
        # If min_neighbor_count > 0, filter candidates by count
        raw_neighbors = wv.most_similar(probe, topn=100)
        
        filtered_neighbors = []
        for word, sim in raw_neighbors:
            if min_neighbor_count > 0:
                count = wv.get_vecattr(word, 'count')
                if count < min_neighbor_count:
                    continue
            filtered_neighbors.append((word, sim))
            if len(filtered_neighbors) == top_k:
                break

        if not filtered_neighbors:
            continue

        # Compute AP and Recall
        hits = 0
        precisions = []
        noise_hits = 0
        sims = []

        for rank, (neighbor, sim) in enumerate(filtered_neighbors, 1):
            sims.append(sim)
            neighbor_count = wv.get_vecattr(neighbor, 'count')
            if neighbor_count < rare_threshold:
                noise_hits += 1

            if neighbor in signals:
                hits += 1
                precisions.append(hits / rank)

        ap = (sum(precisions) / min(top_k, len(signals))) if precisions else 0.0
        recall = hits / min(top_k, len(signals))

        ap_scores.append(ap)
        recall_scores.append(recall)
        noise_intrusion_counts.append(noise_hits / len(filtered_neighbors))
        avg_similarities.append(np.mean(sims))

    # Evaluate Word Intrusion Test Accuracy
    wita_correct = 0
    wita_total = 0
    for case in intrusion_battery:
        words = case['words']
        expected_intruder = case['intruder']
        
        # Check all in vocab
        if not all(w in wv for w in words):
            continue
        
        # Compute pairwise distance matrix
        vectors = np.array([wv[w] for w in words])
        norms = np.linalg.norm(vectors, axis=1, keepdims=True)
        norm_vectors = vectors / (norms + 1e-10)
        cos_matrix = np.dot(norm_vectors, norm_vectors.T)
        
        # Outlier is word with lowest average similarity to others
        avg_sim_to_others = (np.sum(cos_matrix, axis=1) - 1.0) / (len(words) - 1)
        predicted_idx = np.argmin(avg_sim_to_others)
        predicted_intruder = words[predicted_idx]
        
        if predicted_intruder == expected_intruder:
            wita_correct += 1
        wita_total += 1

    wita_score = (wita_correct / wita_total) if wita_total > 0 else 0.0

    mean_map = float(np.mean(ap_scores)) if ap_scores else 0.0
    mean_recall = float(np.mean(recall_scores)) if recall_scores else 0.0
    mean_nir = float(np.mean(noise_intrusion_counts)) if noise_intrusion_counts else 0.0
    mean_sim = float(np.mean(avg_similarities)) if avg_similarities else 0.0

    # Composite Score balances precision against noise: MAP * (1 - NIR)
    composite_score = mean_map * (1.0 - mean_nir)

    return {
        'map_at_10': mean_map,
        'recall_at_10': mean_recall,
        'nir_at_10': mean_nir,
        'avg_sim_at_10': mean_sim,
        'wita_accuracy': wita_score,
        'composite_score': composite_score,
        'probe_count': len(ap_scores),
    }


def inspect_key_probes(model, probes=['priest_NOUN', 'covenant_NOUN', 'justify_VERB', 'grace_NOUN', 'temple_NOUN'], top_k=10, min_neighbor_count=0):
    """
    Prints top-k neighbors for key probe terms with count, pos, and similarity.
    """
    wv = model.wv
    results = {}
    for p in probes:
        if p not in wv:
            continue
        raw = wv.most_similar(p, topn=100)
        items = []
        for word, sim in raw:
            cnt = wv.get_vecattr(word, 'count')
            if min_neighbor_count > 0 and cnt < min_neighbor_count:
                continue
            items.append({
                'word': word,
                'count': cnt,
                'sim': f"{sim * 100:.2f}%"
            })
            if len(items) == top_k:
                break
        results[p] = items
    return results
