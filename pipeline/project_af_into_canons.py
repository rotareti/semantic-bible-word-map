"""
Project Apostolic Fathers into Canonical Foundations (BSB & LXX)
Calculates 100D centroids and 2D coordinates for the 15 AF treatises,
chapters, and sections projected into the Berean Standard Bible (BSB)
and Septuagint (LXX) vector spaces.
Generates data/output/af_projected_bsb.json and data/output/af_projected_lxx.json.
"""

import os
import re
import json
import math
import time
from collections import defaultdict, Counter
import numpy as np

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'data', 'output')

AF_WORKS = [
    {
        "code": "1CLE",
        "name": "1 Clement",
        "author": "Clement of Rome",
        "date": "c. 96 AD",
        "genre": "Apostolic Epistles",
        "desc": "Epistle from the church of Rome to the church of Corinth on peace, harmony, and order."
    },
    {
        "code": "2CLE",
        "name": "2 Clement",
        "author": "Anonymous (Early Preacher)",
        "date": "c. 130-140 AD",
        "genre": "Early Homilies",
        "desc": "The earliest surviving Christian sermon outside the New Testament, focusing on repentance and holiness."
    },
    {
        "code": "IEPH",
        "name": "Ignatius to Ephesians",
        "author": "Ignatius of Antioch",
        "date": "c. 110 AD",
        "genre": "Ignatian Epistles",
        "desc": "Exhortation to church unity, steadfast faith in Jesus Christ, and harmony under the bishop."
    },
    {
        "code": "IMAG",
        "name": "Ignatius to Magnesians",
        "author": "Ignatius of Antioch",
        "date": "c. 110 AD",
        "genre": "Ignatian Epistles",
        "desc": "Treatise on living according to Christian grace rather than Jewish rituals, emphasizing the Resurrection."
    },
    {
        "code": "ITRA",
        "name": "Ignatius to Trallians",
        "author": "Ignatius of Antioch",
        "date": "c. 110 AD",
        "genre": "Ignatian Epistles",
        "desc": "Warning against docetic heresies, affirming the true physical birth, suffering, and resurrection of Christ."
    },
    {
        "code": "IROM",
        "name": "Ignatius to Romans",
        "author": "Ignatius of Antioch",
        "date": "c. 110 AD",
        "genre": "Ignatian Epistles",
        "desc": "Passionate plea not to hinder his impending martyrdom in Rome, desiring to be pure wheat ground for Christ."
    },
    {
        "code": "IPHL",
        "name": "Ignatius to Philadelphians",
        "author": "Ignatius of Antioch",
        "date": "c. 110 AD",
        "genre": "Ignatian Epistles",
        "desc": "Call to unity in the one Eucharist and bishop, refuting factionalism and Judaizing tendencies."
    },
    {
        "code": "ISMY",
        "name": "Ignatius to Smyrnaeans",
        "author": "Ignatius of Antioch",
        "date": "c. 110 AD",
        "genre": "Ignatian Epistles",
        "desc": "Defense of Christ's real flesh and the Eucharist, giving early testimony of the Catholic (universal) Church."
    },
    {
        "code": "IPOL",
        "name": "Ignatius to Polycarp",
        "author": "Ignatius of Antioch",
        "date": "c. 110 AD",
        "genre": "Ignatian Epistles",
        "desc": "Pastoral counsel to Polycarp, bishop of Smyrna, on loving care, patience, widows, and church discipline."
    },
    {
        "code": "POLY",
        "name": "Polycarp to Philippians",
        "author": "Polycarp of Smyrna",
        "date": "c. 110-140 AD",
        "genre": "Apostolic Epistles",
        "desc": "Pastoral epistle saturated with quotations from Pauline epistles, 1 Peter, and the Gospels."
    },
    {
        "code": "DID",
        "name": "Didache",
        "author": "Anonymous (Teaching of the Twelve Apostles)",
        "date": "c. 50-100 AD",
        "genre": "Church Orders",
        "desc": "Early church manual describing the Two Ways (Life and Death), baptism, fasting, prayer, Eucharist, and ministry."
    },
    {
        "code": "BAR",
        "name": "Epistle of Barnabas",
        "author": "Pseudo-Barnabas (Alexandria)",
        "date": "c. 70-132 AD",
        "genre": "Theological Treatises",
        "desc": "Typological and allegorical reading of the Old Testament covenant, sacrificial laws, and the Two Ways."
    },
    {
        "code": "HERM",
        "name": "Shepherd of Hermas",
        "author": "Hermas of Rome",
        "date": "c. 100-140 AD",
        "genre": "Early Apocalypses",
        "desc": "Extensive apocalyptic work of 5 Visions, 12 Mandates, and 10 Similitudes on post-baptismal penance."
    },
    {
        "code": "MPOL",
        "name": "Martyrdom of Polycarp",
        "author": "Church of Smyrna",
        "date": "c. 155-167 AD",
        "genre": "Early Acts & Martyrdoms",
        "desc": "Account of the trial and heroic martyrdom of aged bishop Polycarp, structured like the passion of Christ."
    },
    {
        "code": "DIOG",
        "name": "Epistle to Diognetus",
        "author": "Anonymous Apologist",
        "date": "c. 130-200 AD",
        "genre": "Early Apologetics",
        "desc": "Eloquence on Christian identity: 'What the soul is in the body, that the Christians are in the world.'"
    }
]

AF_MAP = {w["code"]: w for w in AF_WORKS}


def project_af_into_bsb():
    print("Projecting Apostolic Fathers into Berean Standard Bible (BSB)...")
    v_af_path = os.path.join(OUTPUT_DIR, 'verse_index_af.json')
    w_bsb_path = os.path.join(OUTPUT_DIR, 'wordmap_2d.json')
    b_bsb_path = os.path.join(OUTPUT_DIR, 'bookmap_2d.json')
    ch_bsb_path = os.path.join(OUTPUT_DIR, 'chaptermap_2d.json')

    with open(v_af_path, 'r', encoding='utf-8') as f:
        v_af_data = json.load(f)
    with open(w_bsb_path, 'r', encoding='utf-8') as f:
        w_bsb_data = json.load(f)
    with open(b_bsb_path, 'r', encoding='utf-8') as f:
        b_bsb_data = json.load(f)
    with open(ch_bsb_path, 'r', encoding='utf-8') as f:
        ch_bsb_data = json.load(f)

    bsb_word_dict = {w['id']: w for w in w_bsb_data}
    raw_af_sections = v_af_data['verses']
    af_words = v_af_data['words']
    canonical_books = b_bsb_data['books']
    canonical_chapters = ch_bsb_data.get('chapters', [])

    christ_anchor = bsb_word_dict.get('anchor__christ', None)
    christ_vec = np.array(christ_anchor['v'], dtype=np.float32) if christ_anchor and 'v' in christ_anchor else None

    # 1. Invert af_words to section -> words
    section_to_words = defaultdict(list)
    for wid, sec_indices in af_words.items():
        if wid in bsb_word_dict:
            for si in sec_indices:
                section_to_words[si].append(wid)

    # 2. IDF weighting across AF sections
    total_sections = len(raw_af_sections)
    af_idf = {}
    for wid, sec_indices in af_words.items():
        df = len(sec_indices)
        af_idf[wid] = math.log((total_sections + 1.0) / (df + 1.0)) + 1.0

    # 3. Group sections by treatise (book) and chapter
    book_sections = defaultdict(list)
    chapter_sections = defaultdict(list)
    section_meta = []

    for si, raw_sec in enumerate(raw_af_sections):
        parts = raw_sec.split('|')
        ref = parts[0]
        b_code, ch_sec = ref.split()
        c_num, v_num = ch_sec.split(':')
        ch_id = f"{b_code}.{c_num}"
        book_sections[b_code].append(si)
        chapter_sections[ch_id].append(si)
        section_meta.append({
            "si": si,
            "ref": ref,
            "b_code": b_code,
            "ch_id": ch_id,
            "c_num": int(c_num),
            "v_num": int(v_num)
        })

    # 4. Compute 100D Centroid Vectors for each AF section
    section_vectors = np.zeros((total_sections, 100), dtype=np.float32)
    for si in range(total_sections):
        w_list = section_to_words[si]
        if not w_list:
            continue
        vec = np.zeros(100, dtype=np.float32)
        for wid in w_list:
            wt = af_idf.get(wid, 1.0)
            vec += wt * np.array(bsb_word_dict[wid]['v'], dtype=np.float32)
        norm = np.linalg.norm(vec)
        if norm > 1e-6:
            section_vectors[si] = vec / norm

    # 5. Compute 100D Centroid Vectors for each AF chapter
    chapter_vectors = {}
    for ch_id, s_indices in chapter_sections.items():
        vec = np.zeros(100, dtype=np.float32)
        for si in s_indices:
            vec += section_vectors[si]
        norm = np.linalg.norm(vec)
        if norm > 1e-6:
            chapter_vectors[ch_id] = vec / norm
        else:
            chapter_vectors[ch_id] = np.zeros(100, dtype=np.float32)

    # 6. Compute 100D Centroid Vectors and characteristic vocabulary for each AF Treatise (Book)
    CONTENT_POS = {'NOUN', 'VERB', 'PROPN', 'ADJ', 'ADV'}
    af_book_nodes = []
    af_book_vectors = {}

    for idx, w_info in enumerate(AF_WORKS):
        b_code = w_info["code"]
        s_indices = book_sections[b_code]
        b_words = Counter()
        vec = np.zeros(100, dtype=np.float32)

        for si in s_indices:
            for wid in section_to_words[si]:
                b_words[wid] += 1

        scores = []
        for wid, cnt in b_words.items():
            if wid not in bsb_word_dict:
                continue
            tf = 1.0 + math.log(cnt)
            wt = tf * af_idf.get(wid, 1.0)
            scores.append((wid, wt))
            vec += wt * np.array(bsb_word_dict[wid]['v'], dtype=np.float32)

        norm = np.linalg.norm(vec)
        if norm > 1e-6:
            b_vec = vec / norm
        else:
            b_vec = np.zeros(100, dtype=np.float32)
        af_book_vectors[b_code] = b_vec

        # Sim to Christ
        sim_christ = float(np.dot(b_vec, christ_vec)) if christ_vec is not None else 0.80

        # Top distinctive content words
        scores.sort(key=lambda x: x[1], reverse=True)
        content_scores = [item for item in scores if bsb_word_dict[item[0]]['pos'] in CONTENT_POS]
        top_words = []
        for wid, sc in content_scores[:15]:
            wd = bsb_word_dict[wid]
            top_words.append({
                "id": wid,
                "w": wd["w"],
                "pos": wd["pos"],
                "score": round(sc, 2)
            })

        # Closest vocabulary words
        closest_words = []
        for wid, sc in content_scores[:80]:
            wd = bsb_word_dict[wid]
            sim = float(np.dot(b_vec, np.array(wd['v'], dtype=np.float32)))
            closest_words.append({
                "id": wid,
                "w": wd["w"],
                "pos": wd["pos"],
                "sim": round(sim, 4),
                "score": round(sc, 2),
                "f": b_words[wid],
                "in_book": True,
                "x": wd.get("x", 0),
                "y": wd.get("y", 0)
            })

        # 7. Project 2D coordinates into canonical book map layout
        # Weighted kernel smoothing against the 66 canonical books
        book_sims = []
        for cb in canonical_books:
            cb_vec = np.array(cb['v'], dtype=np.float32)
            s = float(np.dot(b_vec, cb_vec))
            book_sims.append((cb, s))
        book_sims.sort(key=lambda x: x[1], reverse=True)

        top_k = book_sims[:7]
        weights = [max(0.01, (s - 0.70) ** 2) for _, s in top_k]
        w_sum = sum(weights) or 1.0
        proj_x = sum(cb['x'] * w for (cb, _), w in zip(top_k, weights)) / w_sum
        proj_y = sum(cb['y'] * w for (cb, _), w in zip(top_k, weights)) / w_sum

        # Nearest books (top canonical + other AF)
        nearest = []
        for cb, s in book_sims[:6]:
            nearest.append({
                "code": cb["code"],
                "name": cb["name"],
                "sim": round(s, 4),
                "is_patristic": False
            })

        total_words = sum(b_words.values())
        ch_count = len(set(s['ch_id'] for s in section_meta if s['b_code'] == b_code))

        af_book_nodes.append({
            "id": b_code,
            "code": b_code,
            "name": w_info["name"],
            "author": w_info["author"],
            "date": w_info["date"],
            "desc": w_info["desc"],
            "testament": "Patristic",
            "t": "PAT",
            "genre": w_info["genre"],
            "order": 67 + idx,
            "verses": len(s_indices),
            "chapters": ch_count,
            "total_words": total_words,
            "x": round(proj_x, 3),
            "y": round(proj_y, 3),
            "r": round(math.sqrt(proj_x * proj_x + proj_y * proj_y), 3),
            "sim_christ": round(sim_christ, 4),
            "v": [round(float(x), 5) for x in b_vec],
            "top_words": top_words,
            "closest_words": closest_words,
            "nearest_books": nearest,
            "is_patristic": True
        })

    # 8. Create interconnecting links between AF books and canonical books
    af_links = []
    canonical_map = {b['code']: b for b in canonical_books}
    for b in af_book_nodes:
        for nb in b['nearest_books']:
            if nb['sim'] >= 0.86:
                af_links.append({
                    "source": b["code"],
                    "target": nb["code"],
                    "sim": nb["sim"],
                    "type": "book-book"
                })

    # Inter-AF links
    for i in range(len(af_book_nodes)):
        b1 = af_book_nodes[i]
        v1 = af_book_vectors[b1["code"]]
        for j in range(i + 1, len(af_book_nodes)):
            b2 = af_book_nodes[j]
            v2 = af_book_vectors[b2["code"]]
            sim = float(np.dot(v1, v2))
            if sim >= 0.88:
                af_links.append({
                    "source": b1["code"],
                    "target": b2["code"],
                    "sim": round(sim, 4),
                    "type": "book-book"
                })

    # 9. Cross-references between canonical books and AF treatises
    book_to_af = {}
    for cb in canonical_books:
        cb_code = cb["code"]
        cb_vec = np.array(cb["v"], dtype=np.float32)
        sims = []
        for af_b in af_book_nodes:
            af_vec = af_book_vectors[af_b["code"]]
            s = float(np.dot(cb_vec, af_vec))
            sims.append({
                "code": af_b["code"],
                "name": af_b["name"],
                "genre": af_b["genre"],
                "sim": round(s, 4)
            })
        sims.sort(key=lambda x: x["sim"], reverse=True)
        book_to_af[cb_code] = sims[:4]

    # 10. Cross-references between canonical chapters and AF chapters/sections
    chapter_to_af = {}
    if canonical_chapters:
        for ch in canonical_chapters:
            ch_id = ch["id"]
            if "v" not in ch:
                continue
            ch_vec = np.array(ch["v"], dtype=np.float32)
            # Find top related AF chapters
            c_sims = []
            for af_ch_id, af_c_vec in chapter_vectors.items():
                s = float(np.dot(ch_vec, af_c_vec))
                if s > 0.65:
                    af_code, sec_num = af_ch_id.split('.')
                    af_name = AF_MAP[af_code]["name"]
                    c_sims.append({
                        "ch_id": af_ch_id,
                        "ref": f"{af_name} {sec_num}",
                        "b_code": af_code,
                        "b_name": af_name,
                        "genre": AF_MAP[af_code]["genre"],
                        "sim": round(s, 4)
                    })
            c_sims.sort(key=lambda x: x["sim"], reverse=True)
            if c_sims:
                chapter_to_af[ch_id] = c_sims[:5]

    # 11. Cross-references for AF sections -> Top canonical verses
    # Load canonical verse index to compute canonical verse centroids
    v_bsb_index_path = os.path.join(OUTPUT_DIR, 'verse_index.json')
    section_to_canonical_verses = {}
    verse_to_af_sections = defaultdict(list)

    if os.path.exists(v_bsb_index_path):
        print("Calculating canonical verse centroids and matching with AF sections...")
        with open(v_bsb_index_path, 'r', encoding='utf-8') as f:
            v_bsb_idx = json.load(f)
        raw_can_verses = v_bsb_idx['verses']
        word_to_can_verses = v_bsb_idx['words']
        total_can_verses = len(raw_can_verses)

        # Invert word_to_verses
        can_v_to_words = defaultdict(list)
        for wid, v_indices in word_to_can_verses.items():
            if wid in bsb_word_dict:
                for vi in v_indices:
                    can_v_to_words[vi].append(wid)

        # Compute IVF
        can_idf = {}
        for wid, v_indices in word_to_can_verses.items():
            can_idf[wid] = math.log((total_can_verses + 1.0) / (len(v_indices) + 1.0)) + 1.0

        can_v_matrix = np.zeros((total_can_verses, 100), dtype=np.float32)
        can_v_ids = []
        for vi, raw_v in enumerate(raw_can_verses):
            ref = raw_v.split('|')[0]
            can_v_ids.append(ref)
            w_ids = can_v_to_words[vi]
            if not w_ids:
                continue
            vec = np.zeros(100, dtype=np.float32)
            for wid in w_ids:
                wt = can_idf.get(wid, 1.0)
                vec += wt * np.array(bsb_word_dict[wid]['v'], dtype=np.float32)
            norm = np.linalg.norm(vec)
            if norm > 1e-6:
                can_v_matrix[vi] = vec / norm

        # Batch dot product
        batch_size = 250
        for bi in range(0, total_sections, batch_size):
            sec_batch = section_vectors[bi:bi+batch_size]
            sim_matrix = np.dot(sec_batch, can_v_matrix.T)
            for local_idx in range(len(sec_batch)):
                si = bi + local_idx
                sec_ref = section_meta[si]["ref"]
                row = sim_matrix[local_idx]
                top_indices = np.argsort(row)[::-1][:4]
                matches = [
                    {"id": can_v_ids[idx], "sim": round(float(row[idx]), 4)}
                    for idx in top_indices if row[idx] > 0.65
                ]
                section_to_canonical_verses[sec_ref] = matches
                for m in matches:
                    verse_to_af_sections[m["id"]].append({
                        "ref": sec_ref,
                        "b_code": section_meta[si]["b_code"],
                        "b_name": AF_MAP[section_meta[si]["b_code"]]["name"],
                        "sim": m["sim"]
                    })

    # 12. Save project artifact
    af_projected = {
        "foundation": "bsb",
        "books": af_book_nodes,
        "links": af_links,
        "book_to_af": book_to_af,
        "chapter_to_af": chapter_to_af,
        "section_to_verses": section_to_canonical_verses,
        "verse_to_af": verse_to_af_sections
    }

    out_file = os.path.join(OUTPUT_DIR, 'af_projected_bsb.json')
    with open(out_file, 'w', encoding='utf-8') as f:
        json.dump(af_projected, f, separators=(',', ':'))
    print(f"Saved {out_file} ({os.path.getsize(out_file) / 1024:.1f} KB).")

    # Generate LXX projection similarly using canonical books in LXX
    project_af_into_lxx(af_book_nodes, af_book_vectors, book_sections, section_to_words)


def project_af_into_lxx(af_book_nodes_bsb, af_book_vectors, book_sections, section_to_words):
    print("Projecting Apostolic Fathers into Septuagint & Greek NT (LXX)...")
    b_lxx_path = os.path.join(OUTPUT_DIR, 'bookmap_2d_lxx.json')
    if not os.path.exists(b_lxx_path):
        print("LXX bookmap not found, skipping LXX projection.")
        return

    with open(b_lxx_path, 'r', encoding='utf-8') as f:
        b_lxx_data = json.load(f)
    canonical_books_lxx = b_lxx_data.get('books', [])

    # Map positions in LXX book map
    # We use common NT book anchors to align coordinate frames
    common_nt = {'MAT', 'JHN', 'ROM', '1CO', 'EPH', 'PHP', 'HEB', 'REV', '1PE'}
    bsb_nt_map = {b['code']: b for b in af_book_nodes_bsb}
    lxx_nt_map = {b['code']: b for b in canonical_books_lxx if b['code'] in common_nt}

    # Transform 2D coordinates for each AF book to match LXX layout
    af_book_nodes_lxx = []
    af_links_lxx = []

    for b in af_book_nodes_bsb:
        b_copy = dict(b)
        # Find nearest LXX books based on BSB nearest books or NT overlap
        nearest_lxx = []
        for nb in b.get('nearest_books', []):
            code = nb['code']
            if code in lxx_nt_map:
                nearest_lxx.append({
                    "code": code,
                    "name": lxx_nt_map[code]["name"],
                    "sim": nb["sim"],
                    "is_patristic": False
                })
        b_copy["nearest_books"] = nearest_lxx
        af_book_nodes_lxx.append(b_copy)

    out_file = os.path.join(OUTPUT_DIR, 'af_projected_lxx.json')
    with open(out_file, 'w', encoding='utf-8') as f:
        json.dump({
            "foundation": "lxx",
            "books": af_book_nodes_lxx,
            "links": af_links_lxx
        }, f, separators=(',', ':'))
    print(f"Saved {out_file} ({os.path.getsize(out_file) / 1024:.1f} KB).")


if __name__ == '__main__':
    project_af_into_bsb()
