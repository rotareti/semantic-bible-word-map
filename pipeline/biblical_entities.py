import csv
import json
import os
import re

COMMON_NOUNS = {
    # Core theological and common nouns often capitalized in English Bible translations
    'god', 'gods', 'lord', 'lords', 'father', 'fathers', 'spirit', 'spirits', 
    'holy', 'heaven', 'heavens', 'king', 'kings', 'son', 'sons', 'daughter', 'daughters', 
    'man', 'men', 'woman', 'women', 'bread', 'faith', 'hope', 'love', 'charity',
    'covenant', 'covenants', 'ark', 'atonement', 'creator', 'creature', 'creation',
    'church', 'churches', 'prayer', 'prayers', 'kingdom', 'kingdoms', 'confession',
    'tent', 'tents', 'meeting', 'meetings', 'mount', 'mounts', 'mountain', 'mountains', 
    'sea', 'seas', 'river', 'rivers', 'city', 'cities', 'house', 'houses', 'temple', 'temples', 
    'sabbath', 'sabbaths', 'feast', 'feasts', 'festival', 'festivals', 'hosts', 'host',
    'word', 'words', 'law', 'laws', 'truth', 'light', 'lights', 'life', 'lives', 
    'grace', 'peace', 'mercy', 'mercies', 'glory', 'glories', 'righteousness', 
    'righteous', 'altar', 'altars', 'offering', 'offerings', 'sacrifice', 'sacrifices', 
    'priest', 'priests', 'priesthood', 'prophet', 'prophets', 'disciple', 'disciples', 
    'apostle', 'apostles', 'gospel', 'gospels', 'salvation', 'cross', 'tomb', 'tombs', 
    'blood', 'body', 'bodies', 'flesh', 'soul', 'souls', 'heart', 'hearts', 'mind', 'minds', 
    'strength', 'power', 'powers', 'wisdom', 'evil', 'sin', 'sins', 'sinner', 'sinners', 
    'death', 'deaths', 'resurrection', 'angel', 'angels', 'demon', 'demons', 'devil', 
    'elder', 'elders', 'shepherd', 'shepherds', 'flock', 'flocks', 'sheep', 'lamb', 'lambs', 
    'branch', 'branches', 'vine', 'vines', 'tree', 'trees', 'fruit', 'fruits', 'seed', 'seeds', 
    'earth', 'world', 'sun', 'moon', 'star', 'stars', 'fire', 'water', 'waters', 
    'stone', 'stones', 'gold', 'silver', 'bronze', 'iron', 'crown', 'crowns', 
    'throne', 'thrones', 'gate', 'gates', 'door', 'doors', 'way', 'ways', 'path', 'paths', 
    'rock', 'rocks', 'shield', 'shields', 'sword', 'swords', 'cup', 'cups', 'table', 'tables', 
    'voice', 'voices', 'eye', 'eyes', 'hand', 'hands', 'face', 'faces', 'name', 'names', 
    'majesty', 'honor', 'praise', 'blessing', 'blessings', 'curse', 'curses', 'wrath', 
    'judgment', 'judgments', 'day', 'days', 'night', 'nights', 'morning', 'mornings', 
    'evening', 'evenings', 'year', 'years', 'month', 'months', 'time', 'times', 'hour', 'hours', 
    'end', 'beginning', 'joy', 'fear', 'behold', 'ancient', 'book', 'books', 'brook', 'brooks', 
    'canal', 'canals', 'corner', 'corners', 'council', 'councils', 'desert', 'deserts', 
    'district', 'districts', 'dung', 'east', 'west', 'north', 'south', 'edict', 'edicts', 
    'field', 'fields', 'fish', 'forest', 'forests', 'fountain', 'fountains', 'garden', 'gardens', 
    'goat', 'goats', 'guard', 'guards', 'hail', 'harem', 'hell', 'horse', 'horses', 
    'judge', 'judges', 'justice', 'land', 'lands', 'lyre', 'lyres', 'maker', 'master', 'masters', 
    'minister', 'ministers', 'ministry', 'ministries', 'news', 'oak', 'oaks', 'oxen', 'ox', 
    'pit', 'pits', 'place', 'places', 'presence', 'prey', 'prince', 'princes', 'queen', 'queens', 
    'ram', 'rams', 'redeemer', 'salt', 'scripture', 'scriptures', 'seer', 'seers', 
    'skull', 'slaughter', 'slavery', 'splendor', 'testimony', 'testimonies', 'thanksgiving', 
    'tower', 'towers', 'treasury', 'valley', 'valleys', 'vengeance', 'virgin', 'virgins', 
    'wilderness', 'woe', 'woes', 'almond', 'almonds', 'ascent', 'awe', 'bear', 'bears', 
    'beloved', 'deceit', 'disgrace', 'ephah', 'ewe', 'ewes', 'good', 'mark', 'marks', 
    'one', 'praetorium', 'preparation', 'rear', 'repent', 'return', 'root', 'roots', 
    'royal', 'ruby', 'rubies', 'second', 'sir', 'sirs', 'ten', 'wail', 'wait',
    'cherub', 'cherubim', 'seraph', 'seraphim', 'selah', 'sheol', 'abyss',
    'tabernacle', 'tabernacles', 'sanctuary', 'sanctuaries'
}

def load_biblical_proper_names(raw_dir='data/raw', cache_file='data/processed/biblical_proper_names.json'):
    if os.path.exists(cache_file):
        try:
            with open(cache_file, 'r', encoding='utf-8') as f:
                data = json.load(f)
                return set(data)
        except Exception:
            pass

    proper_names = set()

    # 1. TBESG Greek proper entities
    tbesg_path = os.path.join(raw_dir, 'tbesg.txt')
    if os.path.exists(tbesg_path):
        with open(tbesg_path, 'r', encoding='utf-8') as f:
            for line in f:
                if line.startswith('G'):
                    parts = line.strip().split('\t')
                    if len(parts) >= 7:
                        tag = parts[5].strip()
                        if tag.startswith('N:N') or 'PRI' in tag or tag.endswith(('-P', '-L', '-T', '-LG')):
                            for w in re.findall(r'[a-zA-Z]+', parts[6]):
                                w_l = w.lower()
                                if len(w_l) > 1 and w_l not in COMMON_NOUNS:
                                    proper_names.add(w_l)

    # 2. LXX Lexicon proper entities
    lxx_lex_path = os.path.join(raw_dir, 'lxx_lexicon.csv')
    if os.path.exists(lxx_lex_path):
        with open(lxx_lex_path, 'r', encoding='utf-8') as f:
            r = csv.reader(f, delimiter='\t')
            for row in r:
                if len(row) >= 5 and 'Proper Noun' in row[3]:
                    for w in re.findall(r'[a-zA-Z]+', row[4]):
                        w_l = w.lower()
                        if len(w_l) > 1 and w_l not in COMMON_NOUNS:
                            proper_names.add(w_l)

    # 3. BSB tables: Hebrew Proper Nouns
    bsb_tables_path = os.path.join(raw_dir, 'bsb_tables.tsv')
    if os.path.exists(bsb_tables_path):
        with open(bsb_tables_path, 'r', encoding='utf-8') as f:
            r = csv.DictReader(f, delimiter='\t')
            for row in r:
                lang = row.get('Language')
                p = row.get('Parsing', '')
                if lang == 'Hebrew' and 'proper' in p.lower():
                    for w in re.findall(r'[a-zA-Z]+', row.get(' BSB version ', '')):
                        w_l = w.lower()
                        if len(w_l) > 1 and w_l not in COMMON_NOUNS:
                            proper_names.add(w_l)

    # 4. Canonical proper entities (titles, demonyms, and key biblical figures)
    canonical_proper_entities = {
        'nazarene', 'nazarenes', 'nazarite', 'nazarites',
        'jesse', 'jeshua', 'nazareth', 'christ', 'jesus'
    }
    proper_names.update(canonical_proper_entities)

    # Ensure cache directory exists and write cache
    os.makedirs(os.path.dirname(cache_file), exist_ok=True)
    with open(cache_file, 'w', encoding='utf-8') as f:
        json.dump(sorted(list(proper_names)), f, ensure_ascii=False)

    return proper_names
