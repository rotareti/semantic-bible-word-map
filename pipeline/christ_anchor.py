"""
Christocentric Anchor & Coordinate Transformation Engine
Defines the canonical Christ anchor across biblical canons (BSB, LXX, VUL)
and provides 100D vector synthesis and 2D coordinate origin centering.
"""

import json
import math
import os
import numpy as np

# Canonical configuration for each canon
CANON_CHRIST_CONFIGS = {
    'bsb': {
        'canon_name': 'Berean Standard Bible (BSB)',
        'tokens': {
            'jesus_PROPN': 0.35,
            'christ_PROPN': 0.35,
            'messiah_PROPN': 0.15,
            'savior_NOUN': 0.10,
            'lord_NOUN': 0.05
        },
        'token_fallbacks': ['jesus', 'christ', 'messiah', 'savior'],
        'landmark_verses': [
            'JHN 1:1', 'JHN 1:14', 'MAT 16:16', 'PHP 2:6', 'PHP 2:11',
            'COL 1:15', 'COL 1:20', 'HEB 1:3', 'ISA 53:5'
        ],
        'display_label': 'Jesus Christ (The Messiah, Son of God)'
    },
    'lxx': {
        'canon_name': 'Septuagint & Greek NT (LXX)',
        'tokens': {
            'jesus_G2424_PROPN': 0.35,
            'christ_G5547_PROPN': 0.35,
            'amessias_L700814_PROPN': 0.15,
            'savior_G4990_NOUN': 0.10,
            'lord_G2962_NOUN': 0.05
        },
        'token_fallbacks': ['jesus', 'christ', 'soter', 'kyrios'],
        'landmark_verses': [
            'JHN 1:1', 'JHN 1:14', 'MAT 16:16', 'PHP 2:6',
            'COL 1:15', 'HEB 1:3', 'ISA 53:5'
        ],
        'display_label': 'Ἰησοῦς Χριστός (The Messiah, Son of God)'
    },
    'vul': {
        'canon_name': 'Clementine Vulgate (VUL)',
        'tokens': {
            'jesus_iesus_PROPN': 0.35,
            'christ_christus_PROPN': 0.35,
            'savior_salvator_NOUN': 0.15,
            'savior_saluator_NOUN': 0.05,
            'lord_dominus_NOUN': 0.05
        },
        'token_fallbacks': ['iesus', 'christus', 'salvator', 'dominus'],
        'landmark_verses': [
            'JHN 1:1', 'JHN 1:14', 'MAT 16:16', 'PHP 2:6',
            'COL 1:15', 'HEB 1:3', 'ISA 53:5'
        ],
        'display_label': 'Iesus Christus (The Messiah, Son of God)'
    }
}


def compute_christ_anchor(canon_key, words_data, verse_index_data=None):
    """
    Computes the 100D Christ anchor vector and the 2D center coordinate in uncentered space.
    Uses Option C: Hybrid synthesis blending lexical synset tokens (50%) and
    landmark Christological confession verses (50%).
    """
    canon_key = canon_key.lower().replace('wordmap_2d_', '').replace('.json', '')
    if canon_key not in CANON_CHRIST_CONFIGS:
        canon_key = 'bsb'

    cfg = CANON_CHRIST_CONFIGS[canon_key]
    word_dict = {w['id']: w for w in words_data}

    # 1. Lexical Token Anchor
    v_tok = np.zeros(100, dtype=np.float32)
    x_tok = 0.0
    y_tok = 0.0
    w_sum = 0.0
    matched_tokens = []

    for tid, wt in cfg['tokens'].items():
        if tid in word_dict:
            w_node = word_dict[tid]
            v = np.array(w_node['v'], dtype=np.float32)
            v_tok += wt * v
            x_tok += wt * w_node['x']
            y_tok += wt * w_node['y']
            w_sum += wt
            matched_tokens.append({'id': tid, 'weight': wt, 'w': w_node.get('w', tid)})

    if w_sum > 0:
        norm_tok = np.linalg.norm(v_tok)
        if norm_tok > 1e-6:
            v_tok /= norm_tok
        x_tok /= w_sum
        y_tok /= w_sum

    # 2. Landmark Kerygmatic Verse Anchor
    v_ver = np.zeros(100, dtype=np.float32)
    x_ver = 0.0
    y_ver = 0.0
    cnt_ver = 0
    matched_verses = []

    if verse_index_data and 'verses' in verse_index_data and 'words' in verse_index_data:
        v_raw = verse_index_data['verses']
        w_to_v = verse_index_data['words']
        total_verses = len(v_raw)

        v_to_w = {}
        for wid, v_list in w_to_v.items():
            if wid in word_dict:
                for vi in v_list:
                    v_to_w.setdefault(vi, []).append(wid)

        idf = {wid: math.log((total_verses + 1.0) / (len(v_list) + 1.0)) + 1.0 for wid, v_list in w_to_v.items()}
        ref_to_vi = {line.split('|')[0]: vi for vi, line in enumerate(v_raw)}

        for r in cfg['landmark_verses']:
            if r in ref_to_vi:
                vi = ref_to_vi[r]
                wids = v_to_w.get(vi, [])
                if wids:
                    vec = np.zeros(100, dtype=np.float32)
                    wx = 0.0
                    wy = 0.0
                    wt_sum = 0.0
                    for wid in wids:
                        wt = idf[wid]
                        vec += wt * np.array(word_dict[wid]['v'], dtype=np.float32)
                        wx += wt * word_dict[wid]['x']
                        wy += wt * word_dict[wid]['y']
                        wt_sum += wt
                    norm = np.linalg.norm(vec)
                    if norm > 1e-6 and wt_sum > 0:
                        v_ver += vec / norm
                        x_ver += wx / wt_sum
                        y_ver += wy / wt_sum
                        cnt_ver += 1
                        matched_verses.append(r)

    if cnt_ver > 0:
        norm_ver = np.linalg.norm(v_ver)
        if norm_ver > 1e-6:
            v_ver /= norm_ver
        x_ver /= cnt_ver
        y_ver /= cnt_ver

    # 3. Hybrid Blend (50% Lexical, 50% Creedal Landmark Verses)
    if cnt_ver > 0 and w_sum > 0:
        v_blend = 0.5 * v_tok + 0.5 * v_ver
        x_center = 0.5 * x_tok + 0.5 * x_ver
        y_center = 0.5 * y_tok + 0.5 * y_ver
    elif w_sum > 0:
        v_blend = v_tok
        x_center = x_tok
        y_center = y_tok
    elif cnt_ver > 0:
        v_blend = v_ver
        x_center = x_ver
        y_center = y_ver
    else:
        v_blend = np.zeros(100, dtype=np.float32)
        x_center = 0.0
        y_center = 0.0

    norm_blend = np.linalg.norm(v_blend)
    if norm_blend > 1e-6:
        v_blend /= norm_blend

    anchor_info = {
        'canon': canon_key,
        'canon_name': cfg['canon_name'],
        'display_label': cfg['display_label'],
        'v': [round(float(val), 4) for val in v_blend],
        'center_2d': [round(float(x_center), 3), round(float(y_center), 3)],
        'lexical_center_2d': [round(float(x_tok), 3), round(float(y_tok), 3)],
        'verse_center_2d': [round(float(x_ver), 3), round(float(y_ver), 3)] if cnt_ver > 0 else None,
        'tokens_used': matched_tokens,
        'verses_used': matched_verses
    }

    return anchor_info


def center_nodes_2d(nodes, center_xy, christ_vec=None):
    """
    Translates node 2D coordinates so that center_xy maps to (0.0, 0.0).
    Calculates radial distance r and optional cosine similarity sim_christ.
    """
    x0, y0 = center_xy
    c_vec = np.array(christ_vec, dtype=np.float32) if christ_vec is not None else None
    c_norm = np.linalg.norm(c_vec) if c_vec is not None else 0.0

    for node in nodes:
        raw_x = node.get('x', 0.0)
        raw_y = node.get('y', 0.0)
        new_x = round(float(raw_x - x0), 3)
        new_y = round(float(raw_y - y0), 3)
        node['x'] = new_x
        node['y'] = new_y
        node['r'] = round(math.sqrt(new_x * new_x + new_y * new_y), 3)

        if c_vec is not None and c_norm > 1e-6 and 'v' in node and len(node['v']) > 0:
            nv = np.array(node['v'], dtype=np.float32)
            n_norm = np.linalg.norm(nv)
            if n_norm > 1e-6:
                node['sim_christ'] = round(float(np.dot(nv, c_vec) / (n_norm * c_norm)), 4)

    return nodes


def synthesize_christ_anchor_node(anchor_info, canon_key):
    """
    Synthesizes the central pseudo-node representing Christ at (0, 0).
    """
    cfg = CANON_CHRIST_CONFIGS.get(canon_key, CANON_CHRIST_CONFIGS['bsb'])
    return {
        'id': f'anchor__christ_{canon_key}',
        'w': cfg['display_label'],
        'pos': 'PROPN',
        'f': 10000,
        't': 'Both',
        'x': 0.0,
        'y': 0.0,
        'r': 0.0,
        'sim_christ': 1.0,
        'v': anchor_info['v'],
        'is_anchor': True,
        'original': [{
            'lemma': 'Christ / Messiah',
            'translit': 'Christos / Mashiach',
            'strongs': 'G5547 / H4899',
            'def': 'The Anointed One, Messiah, Son of God, God Incarnate',
            'count': 10000
        }]
    }
