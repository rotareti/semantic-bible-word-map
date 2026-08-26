import json
from gensim.models import Word2Vec
import umap
import numpy as np
import os

if __name__ == '__main__':
    print("Loading Word2Vec model...")
    model_path = 'data/processed/word2vec.model'
    if not os.path.exists(model_path):
        print("Model not found. Run train_embeddings.py first.")
        exit(1)
        
    model = Word2Vec.load(model_path)
    
    # Extract words, their frequencies, and their vectors
    # Load OT and NT words to tag testaments
    ot_words = set()
    with open('data/processed/ot_text.txt', 'r') as f:
        for line in f:
            ot_words.update(line.split())
            
    nt_words = set()
    with open('data/processed/nt_text.txt', 'r') as f:
        for line in f:
            nt_words.update(line.split())

    words = []
    vectors = []
    freqs = []
    testaments = []

    # We only include words that appear at least min_count times
    for word, vocab_obj in model.wv.key_to_index.items():
        count = model.wv.get_vecattr(word, "count")
        if count >= 3:
            words.append(word)
            vectors.append(model.wv[word])
            freqs.append(int(count))
            
            # Determine testament presence
            in_ot = word in ot_words
            in_nt = word in nt_words
            if in_ot and in_nt:
                testaments.append("Both")
            elif in_ot:
                testaments.append("OT")
            else:
                testaments.append("NT")
            
    vectors = np.array(vectors)
    print(f"Generating map for {len(words)} words...")
    
    # Generate 2D map
    print("Running UMAP (2D)...")
    reducer_2d = umap.UMAP(n_components=2, random_state=42, n_neighbors=15, min_dist=0.1)
    coords_2d = reducer_2d.fit_transform(vectors)
    
    out_2d = []
    for i in range(len(words)):
        v_rounded = [round(float(val), 3) for val in vectors[i]]
        
        # Parse mark_PROPN into w="mark", pos="PROPN", id="mark_PROPN"
        parts = words[i].split('_')
        display_word = parts[0]
        pos_tag = parts[1] if len(parts) > 1 else ""
        
        out_2d.append({
            "id": words[i],
            "w": display_word,
            "pos": pos_tag,
            "f": freqs[i],
            "t": testaments[i],
            "x": round(float(coords_2d[i][0]), 3),
            "y": round(float(coords_2d[i][1]), 3),
            "v": v_rounded
        })
    print("Loading Interlinear and Strongs data...")
    import csv, spacy, re
    
    nlp_local = spacy.load("en_core_web_sm", disable=["parser", "ner"])
    clean_re_local = re.compile(r'[^a-zA-Z]')
    
    strongs_dict = {}
    try:
        with open('data/raw/strongs.json', 'r', encoding='utf-8') as sf:
            strongs_raw = json.load(sf)
            for item in strongs_raw:
                number = item.get('number', '')
                if number:
                    strongs_dict[number] = {
                        'lemma': item.get('lemma', ''),
                        'xlit': item.get('xlit', ''),
                        'def': item.get('description', '')
                    }
    except Exception as e:
        print("Warning: strongs.json not loaded properly:", e)

    english_to_strongs = {}
    try:
        with open('data/raw/bsb_tables.tsv', 'r', encoding='utf-8') as tf:
            reader = csv.DictReader(tf, delimiter='\t')
            rows = [r for r in reader if r.get(' BSB version ', '').strip() and r.get(' BSB version ', '').strip() != '-']
            
            phrases = [r.get(' BSB version ', '').strip() for r in rows]
            docs = nlp_local.pipe(phrases, batch_size=2000)
            
            for row, doc in zip(rows, docs):
                str_heb = row.get('Str Heb', '').strip()
                str_grk = row.get('Str Grk', '').strip()
                strongs = str_heb if str_heb else str_grk
                if not strongs:
                    continue
                    
                lang = row.get('Language', '')
                if strongs.isdigit():
                    strongs = ('H' if lang == 'Hebrew' else 'G') + strongs
                
                # Use the clean Strong's dictionary for lemma and transliteration
                strongs_entry = strongs_dict.get(strongs, {})
                lemma_clean = strongs_entry.get('lemma', strongs)
                translit_clean = strongs_entry.get('xlit', '')
                def_clean = strongs_entry.get('def', '')
                
                for token in doc:
                    if token.pos_ in ["SPACE", "PUNCT"]:
                        continue
                    word_clean = clean_re_local.sub('', token.lemma_).lower()
                    if not word_clean or word_clean in ['nt', 'wo', 'ca', 's', 'm', 'll', 've', 'd', 're', 'ii', 'the', 'a', 'an', 'in', 'on', 'at', 'of', 'and', 'or', 'to', 'is', 'are', 'was', 'were']:
                        continue
                        
                    tagged_word = f"{word_clean}_{token.pos_}"
                    
                    if tagged_word not in english_to_strongs:
                        english_to_strongs[tagged_word] = {}
                        
                    if strongs not in english_to_strongs[tagged_word]:
                        english_to_strongs[tagged_word][strongs] = {
                            'lemma': lemma_clean,
                            'translit': translit_clean,
                            'strongs': strongs,
                            'def': def_clean,
                            'count': 0
                        }
                    
                    english_to_strongs[tagged_word][strongs]['count'] += 1
    except Exception as e:
        print("Warning: bsb_tables.tsv failed to process:", e)
        
    print(f"Mapped {len(english_to_strongs)} English words to original languages.")
    
    for node in out_2d:
        if node['id'] in english_to_strongs:
            originals = list(english_to_strongs[node['id']].values())
            originals.sort(key=lambda x: x['count'], reverse=True)
            node['original'] = originals
            
    print("Saving map to data/output/...")
    with open('data/output/wordmap_2d.json', 'w', encoding='utf-8') as f:
        json.dump(out_2d, f, separators=(',', ':'), ensure_ascii=False)
        
    print("Filtering verse index...")
    with open('data/output/verse_index_raw.json', 'r') as f:
        v_idx = json.load(f)
    
    valid_words = set(words)
    filtered_word_to_verse = {}
    for w in valid_words:
        if w in v_idx['words']:
            filtered_word_to_verse[w] = v_idx['words'][w]
            
    with open('data/output/verse_index.json', 'w') as f:
        json.dump({'verses': v_idx['verses'], 'words': filtered_word_to_verse}, f, separators=(',', ':'))
        
    print("Map and Index saved successfully.")
