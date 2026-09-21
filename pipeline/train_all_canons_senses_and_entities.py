"""
Full GPU Contextual Embeddings Pipeline for Biblical Disambiguation and Entity Unification
Supports all three canonical foundations:
- Berean Standard Bible (BSB English) via all-MiniLM-L6-v2
- Septuagint and Greek NT (LXX Greek) via paraphrase-multilingual-MiniLM-L12-v2
- Clementine Vulgate (VUL Latin) via paraphrase-multilingual-MiniLM-L12-v2

Generates:
1. Context Disambiguation (Polysemy): Partitions polysemous lemmas into distinct contextual senses.
2. Entity Unification (Coreference & Thematic Union): Unifies cross-lexeme referents (e.g. Jesus, Christ, Messiah)
   into a single contextual entity node.

Outputs:
- data/output/senses_data.json (BSB)
- data/output/senses_data_lxx.json (LXX)
- data/output/senses_data_vul.json (VUL)
"""

import os
import re
import json
import time
import torch
import numpy as np
from transformers import AutoTokenizer, AutoModel
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score


# Canon Configurations
CANON_CONFIGS = {
    'bsb': {
        'name': 'Berean Standard Bible (BSB)',
        'model_name': 'sentence-transformers/all-MiniLM-L6-v2',
        'verse_index': 'data/output/verse_index.json',
        'wordmap': 'data/output/wordmap_2d.json',
        'bookmap': 'data/output/bookmap_2d.json',
        'output_file': 'data/output/senses_data.json',
        'polysemous_lemmas': [
            {
                'lemma_id': 'temple_NOUN',
                'lemma': 'temple',
                'pattern': r'\btemples?\b',
                'pos': 'NOUN',
                'senses': [
                    {'index': 0, 'default_label': 'Physical Sanctuary', 'keywords': ['stone', 'cedar', 'solomon', 'altar', 'portico', 'chambers', 'building', 'gold']},
                    {'index': 1, 'default_label': 'Spiritual Body', 'keywords': ['body', 'spirit', 'dwell', 'living', 'holy', 'christ', 'believers']}
                ]
            },
            {
                'lemma_id': 'spirit_NOUN',
                'lemma': 'spirit',
                'pattern': r'\bspirits?\b',
                'pos': 'NOUN',
                'senses': [
                    {'index': 0, 'default_label': 'Holy Spirit / Divine Spirit', 'keywords': ['holy', 'god', 'father', 'truth', 'grace', 'dwell', 'anoint', 'gifts']},
                    {'index': 1, 'default_label': 'Natural Wind / Human Spirit', 'keywords': ['wind', 'breath', 'storm', 'troubled', 'faint', 'broken', 'soul', 'disposition']}
                ]
            },
            {
                'lemma_id': 'flesh_NOUN',
                'lemma': 'flesh',
                'pattern': r'\bflesh\b',
                'pos': 'NOUN',
                'senses': [
                    {'index': 0, 'default_label': 'Physical Body / Meat', 'keywords': ['meat', 'skin', 'bones', 'eat', 'sacrifice', 'blood', 'body', 'animal']},
                    {'index': 1, 'default_label': 'Sinful Nature / Fallen Humanity', 'keywords': ['sin', 'spirit', 'desires', 'walk', 'lust', 'corrupt', 'weakness']}
                ]
            },
            {
                'lemma_id': 'world_NOUN',
                'lemma': 'world',
                'pattern': r'\bworlds?\b',
                'pos': 'NOUN',
                'senses': [
                    {'index': 0, 'default_label': 'Physical Creation / Earth', 'keywords': ['foundation', 'earth', 'made', 'heavens', 'created', 'beginning', 'land']},
                    {'index': 1, 'default_label': 'Fallen Human System', 'keywords': ['evil', 'love', 'darkness', 'hated', 'rulers', 'lust', 'overcome', 'corrupt']}
                ]
            },
            {
                'lemma_id': 'law_NOUN',
                'lemma': 'law',
                'pattern': r'\blaws?\b',
                'pos': 'NOUN',
                'senses': [
                    {'index': 0, 'default_label': 'Mosaic Legislation & Commandments', 'keywords': ['moses', 'commandments', 'statutes', 'ordinances', 'book', 'tablets', 'sinai']},
                    {'index': 1, 'default_label': 'Principle & Spiritual Rule', 'keywords': ['faith', 'sin', 'members', 'mind', 'christ', 'spirit', 'grace', 'inward']}
                ]
            },
            {
                'lemma_id': 'covenant_NOUN',
                'lemma': 'covenant',
                'pattern': r'\bcovenants?\b',
                'pos': 'NOUN',
                'senses': [
                    {'index': 0, 'default_label': 'Sinaitic / Mosaic Covenant', 'keywords': ['tablets', 'ark', 'blood', 'sacrifice', 'moses', 'command', 'ordinance']},
                    {'index': 1, 'default_label': 'Everlasting / New Covenant', 'keywords': ['heart', 'eternal', 'christ', 'promise', 'peace', 'forgiveness', 'grace']}
                ]
            },
            {
                'lemma_id': 'house_NOUN',
                'lemma': 'house',
                'pattern': r'\bhouses?\b',
                'pos': 'NOUN',
                'senses': [
                    {'index': 0, 'default_label': 'Physical Dwelling & Palace', 'keywords': ['cedar', 'stone', 'build', 'wall', 'gate', 'palace', 'gold', 'rooms']},
                    {'index': 1, 'default_label': 'Household of Faith & Dynasty', 'keywords': ['lineage', 'israel', 'jacob', 'david', 'father', 'blessing', 'children', 'household']}
                ]
            },
            {
                'lemma_id': 'servant_NOUN',
                'lemma': 'servant',
                'pattern': r'\bservants?\b',
                'pos': 'NOUN',
                'senses': [
                    {'index': 0, 'default_label': 'Bondslave & Human Servitude', 'keywords': ['master', 'buy', 'sold', 'work', 'field', 'money', 'year', 'ox']},
                    {'index': 1, 'default_label': 'Servant of the LORD & Prophet', 'keywords': ['prophets', 'moses', 'david', 'hear', 'righteous', 'send', 'prayer', 'anoint']}
                ]
            },
            {
                'lemma_id': 'heart_NOUN',
                'lemma': 'heart',
                'pattern': r'\bhearts?\b',
                'pos': 'NOUN',
                'senses': [
                    {'index': 0, 'default_label': 'Inner Consciousness & Conscience', 'keywords': ['troubled', 'fear', 'sorrow', 'thought', 'understanding', 'discern', 'grief']},
                    {'index': 1, 'default_label': 'Seat of Devotion & Moral Will', 'keywords': ['love', 'obey', 'clean', 'pure', 'upright', 'wicked', 'steadfast', 'devoted']}
                ]
            },
            {
                'lemma_id': 'judge_NOUN',
                'lemma': 'judge',
                'pattern': r'\bjudges?\b',
                'pos': 'NOUN',
                'senses': [
                    {'index': 0, 'default_label': 'Human Magistrate & Legal Ruler', 'keywords': ['elders', 'city', 'court', 'decide', 'bribe', 'rulers', 'people']},
                    {'index': 1, 'default_label': 'Divine Judge & Deliverer', 'keywords': ['earth', 'god', 'righteousness', 'nations', 'salvation', 'vindicate', 'throne']}
                ]
            }
        ],
        'entities': [
            {
                'id': 'entity__jesus_christ',
                'slug': 'jesus_christ',
                'title': 'Jesus Christ the Messiah',
                'description': 'Unified messianic and divine personage across Gospels, Epistles, and Revelation.',
                'member_lemmas': ['jesus_PROPN', 'christ_PROPN', 'messiah_PROPN']
            },
            {
                'id': 'entity__lord_god',
                'slug': 'lord_god',
                'title': 'The LORD God Almighty',
                'description': 'The supreme covenant God of Abraham, Isaac, and Jacob (Yahweh Elohim).',
                'member_lemmas': ['lord_NOUN', 'god_NOUN']
            },
            {
                'id': 'entity__jerusalem_zion',
                'slug': 'jerusalem_zion',
                'title': 'Jerusalem & Mount Zion',
                'description': 'The holy city of the Great King and spiritual mountain of God.',
                'member_lemmas': ['jerusalem_PROPN', 'zion_PROPN']
            },
            {
                'id': 'entity__covenant_promise',
                'slug': 'covenant_promise',
                'title': 'Divine Covenant & Promise',
                'description': 'God\'s steadfast pledge, oath, and relational bond with humanity.',
                'member_lemmas': ['covenant_NOUN', 'promise_NOUN']
            },
            {
                'id': 'entity__faith_belief',
                'slug': 'faith_belief',
                'title': 'Faith & Belief',
                'description': 'Covenantal trust, steadfast fidelity, and belief in God.',
                'member_lemmas': ['faith_NOUN', 'believe_VERB', 'faithful_ADJ']
            },
            {
                'id': 'entity__righteousness_justification',
                'slug': 'righteousness_justification',
                'title': 'Righteousness & Justification',
                'description': 'Moral rectitude, covenant justice, and acquittal before God.',
                'member_lemmas': ['righteousness_NOUN', 'justify_VERB', 'righteous_ADJ']
            }
        ]
    },
    'lxx': {
        'name': 'Septuagint & Greek NT (LXX)',
        'model_name': 'sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2',
        'verse_index': 'data/output/verse_index_lxx.json',
        'wordmap': 'data/output/wordmap_2d_lxx.json',
        'bookmap': 'data/output/bookmap_2d_lxx.json',
        'output_file': 'data/output/senses_data_lxx.json',
        'polysemous_lemmas': [
            {
                'lemma_id': 'spirit_G4151_NOUN',
                'lemma': 'spirit',
                'pos': 'NOUN',
                'senses': [
                    {'index': 0, 'default_label': 'Holy Spirit / Divine Breath', 'keywords': ['holy', 'god', 'father', 'wisdom', 'grace', 'ἅγιος', 'θεός', 'πατήρ', 'σοφία']},
                    {'index': 1, 'default_label': 'Natural Wind / Human Spirit', 'keywords': ['wind', 'breath', 'soul', 'affliction', 'weakness', 'ἄνεμος', 'πνοή', 'ψυχή', 'ἀσθένεια']}
                ]
            },
            {
                'lemma_id': 'flesh_G4561_NOUN',
                'lemma': 'flesh',
                'pos': 'NOUN',
                'senses': [
                    {'index': 0, 'default_label': 'Physical Body / Mortal Substance', 'keywords': ['body', 'bone', 'blood', 'meat', 'sacrifice', 'σῶμα', 'ὀστέον', 'αἷμα', 'κρέας']},
                    {'index': 1, 'default_label': 'Carnal Nature / Human Frailty', 'keywords': ['sin', 'lust', 'desire', 'weakness', 'corrupt', 'ἁμαρτία', 'ἐπιθυμία', 'φθαρτός']}
                ]
            },
            {
                'lemma_id': 'world_G2889_NOUN',
                'lemma': 'world',
                'pos': 'NOUN',
                'senses': [
                    {'index': 0, 'default_label': 'Created Cosmos / Earth', 'keywords': ['creation', 'heaven', 'earth', 'beginning', 'make', 'κτίσις', 'οὐρανός', 'γῆ', 'ἀρχή']},
                    {'index': 1, 'default_label': 'Secular World / Earthly Order', 'keywords': ['darkness', 'evil', 'hate', 'ruler', 'lust', 'σκοτία', 'πονηρός', 'μισέω', 'ἄρχων']}
                ]
            },
            {
                'lemma_id': 'temple_G3485_NOUN',
                'lemma': 'temple (naos)',
                'pos': 'NOUN',
                'senses': [
                    {'index': 0, 'default_label': 'Holy Sanctuary / Altar Room', 'keywords': ['holy', 'altar', 'priest', 'stone', 'ark', 'ἅγιος', 'θυσιαστήριον', 'ἱερεύς', 'λίθος']},
                    {'index': 1, 'default_label': 'Spiritual Temple of God', 'keywords': ['body', 'spirit', 'dwell', 'god', 'believers', 'σῶμα', 'πνεῦμα', 'οἰκέω', 'θεός']}
                ]
            },
            {
                'lemma_id': 'temple_G2411_NOUN',
                'lemma': 'temple (hieron)',
                'pos': 'NOUN',
                'senses': [
                    {'index': 0, 'default_label': 'Sacred Precinct / Public Courts', 'keywords': ['court', 'teach', 'people', 'portico', 'enter', 'αὐλή', 'διδάσκω', 'λαός', 'στοά']},
                    {'index': 1, 'default_label': 'Ceremonial Complex & Offerings', 'keywords': ['sacrifice', 'gift', 'offer', 'priest', 'service', 'θυσία', 'δῶρον', 'προσφέρω', 'ἱερεύς']}
                ]
            },
            {
                'lemma_id': 'law_G3551_NOUN',
                'lemma': 'law',
                'pos': 'NOUN',
                'senses': [
                    {'index': 0, 'default_label': 'Mosaic Law & Ordinances', 'keywords': ['moses', 'commandment', 'statutes', 'book', 'keep', 'Μωυσῆς', 'ἐντολή', 'προστάγματα', 'βιβλίον']},
                    {'index': 1, 'default_label': 'Spiritual Principle / Inner Law', 'keywords': ['faith', 'grace', 'heart', 'spirit', 'righteousness', 'πίστις', 'χάρις', 'καρδία', 'πνεῦμα']}
                ]
            },
            {
                'lemma_id': 'covenant_G1242_NOUN',
                'lemma': 'covenant',
                'pos': 'NOUN',
                'senses': [
                    {'index': 0, 'default_label': 'Ancestral / Sinai Covenant', 'keywords': ['covenant', 'blood', 'sacrifice', 'tablets', 'ark', 'διαθήκη', 'αἷμα', 'θυσία', 'πλάκες']},
                    {'index': 1, 'default_label': 'New & Everlasting Covenant', 'keywords': ['new', 'eternal', 'promise', 'heart', 'grace', 'καινή', 'αἰώνιος', 'ἐπαγγελία', 'καρδία']}
                ]
            },
            {
                'lemma_id': 'house_G3624_NOUN',
                'lemma': 'house',
                'pos': 'NOUN',
                'senses': [
                    {'index': 0, 'default_label': 'Physical Residence & Temple', 'keywords': ['build', 'wall', 'gate', 'stone', 'gold', 'οἰκοδομέω', 'τοῖχος', 'πύλη', 'λίθος', 'χρυσός']},
                    {'index': 1, 'default_label': 'Dynasty / House of Israel', 'keywords': ['israel', 'david', 'tribe', 'seed', 'father', 'Ἰσραήλ', 'Δαυίδ', 'φυλή', 'σπέρμα', 'πατήρ']}
                ]
            },
            {
                'lemma_id': 'slave_G1401_NOUN',
                'lemma': 'servant / slave',
                'pos': 'NOUN',
                'senses': [
                    {'index': 0, 'default_label': 'Domestic Slave & Bondservant', 'keywords': ['master', 'price', 'freedom', 'household', 'work', 'κύριος', 'τιμή', 'ἐλευθερία', 'οἰκέτης']},
                    {'index': 1, 'default_label': 'Servant of God & Apostle', 'keywords': ['god', 'jesus', 'christ', 'prophet', 'ministry', 'θεός', 'Ἰησοῦς', 'Χριστός', 'προφήτης']}
                ]
            }
        ],
        'entities': [
            {
                'id': 'entity__jesus_christ_lxx',
                'slug': 'jesus_christ',
                'title': 'Jesus Christ the Messiah',
                'description': 'The Son of God and Anointed Messiah across Septuagint messianic prophecy and Greek NT.',
                'member_lemmas': ['jesus_G2424_PROPN', 'christ_G5547_PROPN']
            },
            {
                'id': 'entity__lord_god_lxx',
                'slug': 'lord_god',
                'title': 'The LORD God Almighty',
                'description': 'The divine names and sovereign titles of Yahweh Elohim (Kyrios Theos).',
                'member_lemmas': ['lord_G2962_NOUN', 'god_G2316_NOUN']
            },
            {
                'id': 'entity__jerusalem_zion_lxx',
                'slug': 'jerusalem_zion',
                'title': 'Jerusalem & Mount Zion',
                'description': 'The holy sanctuary city and hill of the divine presence.',
                'member_lemmas': ['jerusalem_G2419_PROPN', 'zion_G4622_PROPN']
            },
            {
                'id': 'entity__covenant_promise_lxx',
                'slug': 'covenant_promise',
                'title': 'Divine Covenant & Promise',
                'description': 'The sworn treaty and covenantal promise of God to His people.',
                'member_lemmas': ['covenant_G1242_NOUN', 'promise_G1860_NOUN']
            },
            {
                'id': 'entity__faith_belief_lxx',
                'slug': 'faith_belief',
                'title': 'Faith & Belief',
                'description': 'The theological reality of faith, active trust, and fidelity (pistis & pisteuo).',
                'member_lemmas': ['faith_G4102_NOUN', 'trust_G4100_VERB']
            },
            {
                'id': 'entity__righteousness_justification_lxx',
                'slug': 'righteousness_justification',
                'title': 'Righteousness & Justification',
                'description': 'Covenant justice, forensic acquittal, and divine righteousness.',
                'member_lemmas': ['righteousness_G1343_NOUN', 'justify_G1344_VERB']
            }
        ]
    },
    'vul': {
        'name': 'Clementine Vulgate (VUL)',
        'model_name': 'sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2',
        'verse_index': 'data/output/verse_index_vul.json',
        'wordmap': 'data/output/wordmap_2d_vul.json',
        'bookmap': 'data/output/bookmap_2d_vul.json',
        'output_file': 'data/output/senses_data_vul.json',
        'polysemous_lemmas': [
            {
                'lemma_id': 'spirit_spiritus_NOUN',
                'lemma': 'spiritus',
                'pos': 'NOUN',
                'senses': [
                    {'index': 0, 'default_label': 'Spiritus Sanctus / Divinus', 'keywords': ['sanctus', 'deus', 'pater', 'virtus', 'gratia', 'sapientia', 'holy', 'spirit', 'god']},
                    {'index': 1, 'default_label': 'Ventus / Flatus Humanus', 'keywords': ['ventus', 'flatus', 'tempestas', 'anima', 'angustia', 'tristitia', 'wind', 'breath', 'storm']}
                ]
            },
            {
                'lemma_id': 'flesh_caro_NOUN',
                'lemma': 'caro',
                'pos': 'NOUN',
                'senses': [
                    {'index': 0, 'default_label': 'Corpus Carnale / Materia', 'keywords': ['corpus', 'sanguis', 'ossa', 'cibus', 'sacrificium', 'cutis', 'flesh', 'meat', 'blood']},
                    {'index': 1, 'default_label': 'Carnalitas / Infirmitas', 'keywords': ['peccatum', 'concupiscentia', 'carnalis', 'corruptio', 'infirmitas', 'sin', 'lust', 'weakness']}
                ]
            },
            {
                'lemma_id': 'universe_mundus_NOUN',
                'lemma': 'mundus',
                'pos': 'NOUN',
                'senses': [
                    {'index': 0, 'default_label': 'Creatio / Universum', 'keywords': ['creatio', 'terra', 'caelum', 'principium', 'fundamentum', 'opus', 'world', 'earth', 'creation']},
                    {'index': 1, 'default_label': 'Saeculum / Mundus Carnalis', 'keywords': ['malus', 'tenebrae', 'odium', 'princeps', 'saecularis', 'lux', 'evil', 'darkness', 'prince']}
                ]
            },
            {
                'lemma_id': 'temple_templum_NOUN',
                'lemma': 'templum',
                'pos': 'NOUN',
                'senses': [
                    {'index': 0, 'default_label': 'Sanctuarium / Aedes Sacra', 'keywords': ['sanctuarium', 'altare', 'lapis', 'aedificium', 'sacerdos', 'salomon', 'temple', 'sanctuary', 'altar']},
                    {'index': 1, 'default_label': 'Templum Spirituale', 'keywords': ['corpus', 'habitare', 'spiritus', 'vivus', 'sanctus', 'fides', 'body', 'dwell', 'living']}
                ]
            },
            {
                'lemma_id': 'law_lex_NOUN',
                'lemma': 'lex',
                'pos': 'NOUN',
                'senses': [
                    {'index': 0, 'default_label': 'Lex Mosaica / Decalogus', 'keywords': ['moyses', 'praecepta', 'tabulae', 'mandata', 'iudicia', 'sinai', 'law', 'commandment', 'statute']},
                    {'index': 1, 'default_label': 'Lex Nova / Lex Gratiae', 'keywords': ['gratia', 'fides', 'spiritus', 'iustitia', 'cor', 'christus', 'grace', 'faith', 'spirit']}
                ]
            },
            {
                'lemma_id': 'covenant_testamentum_NOUN',
                'lemma': 'testamentum',
                'pos': 'NOUN',
                'senses': [
                    {'index': 0, 'default_label': 'Vetus Testamentum / Foedus', 'keywords': ['arca', 'tabulae', 'sanguis', 'holocaustum', 'lex', 'covenant', 'ark', 'sacrifice']},
                    {'index': 1, 'default_label': 'Novum Testamentum / Gratia', 'keywords': ['novum', 'aeternum', 'calix', 'sanguis', 'remissio', 'promissio', 'new', 'cup', 'eternal']}
                ]
            },
            {
                'lemma_id': 'subdue_domus_NOUN',
                'lemma': 'domus',
                'pos': 'NOUN',
                'senses': [
                    {'index': 0, 'default_label': 'Aedificium / Domicilium', 'keywords': ['aedificare', 'paries', 'porta', 'lapis', 'aurum', 'domus', 'house', 'build', 'wall']},
                    {'index': 1, 'default_label': 'Domus Dei / Familia Fidelium', 'keywords': ['israel', 'david', 'gens', 'filii', 'semen', 'dominus', 'children', 'household', 'seed']}
                ]
            },
            {
                'lemma_id': 'slave_seruus_NOUN',
                'lemma': 'servus',
                'pos': 'NOUN',
                'senses': [
                    {'index': 0, 'default_label': 'Servus Domesticus', 'keywords': ['dominus', 'pretium', 'emptus', 'ministerium', 'servitium', 'servant', 'master', 'slave']},
                    {'index': 1, 'default_label': 'Servus Domini / Propheta', 'keywords': ['deus', 'moyses', 'david', 'propheta', 'oratio', 'iustus', 'lord', 'prophet', 'prayer']}
                ]
            }
        ],
        'entities': [
            {
                'id': 'entity__jesus_christ_vul',
                'slug': 'jesus_christ',
                'title': 'Jesus Christ the Messiah',
                'description': 'The Savior Jesus Christ (Iesus Christus) throughout Gospels and Latin New Testament.',
                'member_lemmas': ['jesus_iesus_PROPN', 'christ_christus_PROPN']
            },
            {
                'id': 'entity__lord_god_vul',
                'slug': 'lord_god',
                'title': 'The LORD God Almighty',
                'description': 'Dominus Deus, the Lord God of heaven and earth.',
                'member_lemmas': ['lord_dominus_NOUN', 'god_deus_NOUN']
            },
            {
                'id': 'entity__jerusalem_zion_vul',
                'slug': 'jerusalem_zion',
                'title': 'Jerusalem & Mount Zion',
                'description': 'Ierusalem and Sion, the holy city and mountain of the Lord.',
                'member_lemmas': ['jerusalem_ierusalem_PROPN', 'zion_sion_PROPN']
            },
            {
                'id': 'entity__covenant_promise_vul',
                'slug': 'covenant_promise',
                'title': 'Divine Covenant & Promise',
                'description': 'The testament and solemn pact of God (Testamentum and Foedus).',
                'member_lemmas': ['covenant_testamentum_NOUN', 'covenant_foedus_NOUN']
            },
            {
                'id': 'entity__faith_belief_vul',
                'slug': 'faith_belief',
                'title': 'Faith & Belief',
                'description': 'The grace of faith and theological belief (Fides and Credo).',
                'member_lemmas': ['faith_fides_NOUN', 'believe_credo_VERB']
            },
            {
                'id': 'entity__righteousness_justification_vul',
                'slug': 'righteousness_justification',
                'title': 'Righteousness & Justification',
                'description': 'Justice, moral righteousness, and justification before God (Iustitia and Iustifico).',
                'member_lemmas': ['righteousness_iustitia_NOUN', 'justify_iustifico_VERB']
            }
        ]
    }
}


def clean_str(s):
    if not s:
        return ''
    # Replace em-dashes and en-dashes with hyphens
    return s.replace('\u2014', ' - ').replace('\u2013', ' - ')


def run_training_for_canon(canon_key):
    cfg = CANON_CONFIGS[canon_key]
    print(f"\n=======================================================")
    print(f"Starting Training for: {cfg['name']}")
    print(f"=======================================================")

    device = 'cuda' if torch.cuda.is_available() else 'cpu'
    print(f"Loading transformer model '{cfg['model_name']}' on {device}...")
    tokenizer = AutoTokenizer.from_pretrained(cfg['model_name'])
    model = AutoModel.from_pretrained(cfg['model_name']).to(device)
    model.eval()

    print(f"Loading datasets: {cfg['verse_index']}, {cfg['wordmap']}, {cfg['bookmap']}...")
    with open(cfg['verse_index'], 'r', encoding='utf-8') as f:
        vdata = json.load(f)
    with open(cfg['wordmap'], 'r', encoding='utf-8') as f:
        wordmap_nodes = json.load(f)
    with open(cfg['bookmap'], 'r', encoding='utf-8') as f:
        bookmap_data = json.load(f)

    # Lookup tables
    node_lookup = {node['id']: node for node in wordmap_nodes}
    word_to_verses = vdata.get('words', {})
    verses_list = vdata.get('verses', [])

    ot_books = set(b['code'] for b in bookmap_data.get('books', []) if b.get('testament') == 'OT')

    def parse_verse_entry(v_entry):
        parts = v_entry.split('|')
        ref = parts[0]
        book = ref.split()[0]
        testament = 'OT' if book in ot_books else 'NT'
        if len(parts) == 1:
            return ref, book, testament, parts[0], parts[0]
        if len(parts) == 2:
            return ref, book, testament, parts[1], parts[1]
        # len >= 3: ref, en_text, orig_text
        return ref, book, testament, parts[1], parts[2]

    # Pre-parse verse index metadata
    parsed_verses = []
    for idx, ventry in enumerate(verses_list):
        ref, book, testament, en_text, orig_text = parse_verse_entry(ventry)
        parsed_verses.append({
            'verse_id': idx,
            'ref': ref,
            'book': book,
            'testament': testament,
            'en_text': clean_str(en_text),
            'orig_text': clean_str(orig_text)
        })

    print(f"Loaded {len(parsed_verses)} verses, {len(node_lookup)} 2D words, {len(ot_books)} OT books.")

    def encode_sentences(text_list, batch_size=64):
        vectors = []
        for start_idx in range(0, len(text_list), batch_size):
            batch_texts = text_list[start_idx:start_idx + batch_size]
            inputs = tokenizer(batch_texts, padding=True, truncation=True, max_length=128, return_tensors='pt').to(device)
            with torch.no_grad():
                outputs = model(**inputs)
                # Mean pooling with attention mask
                mask = inputs['attention_mask'].unsqueeze(-1).expand(outputs.last_hidden_state.size()).float()
                sum_embeddings = torch.sum(outputs.last_hidden_state * mask, 1)
                sum_mask = torch.clamp(mask.sum(1), min=1e-9)
                mean_pooled = (sum_embeddings / sum_mask).cpu().numpy()
                # Normalize
                norms = np.linalg.norm(mean_pooled, axis=1, keepdims=True)
                norms[norms == 0] = 1e-9
                normalized = mean_pooled / norms
                vectors.append(normalized)
        if vectors:
            return np.vstack(vectors)
        return np.zeros((0, 384), dtype=np.float32)

    output_data = {}

    # -------------------------------------------------------------
    # 1. Polysemous Context Disambiguation
    # -------------------------------------------------------------
    print(f"\n--- Processing {len(cfg['polysemous_lemmas'])} Polysemous Lemmas ---")

    for target in cfg['polysemous_lemmas']:
        lemma_id = target['lemma_id']
        lemma = target['lemma']
        print(f"\nDisambiguating polysemous lemma: {lemma_id} ('{lemma}')...")

        v_indices = word_to_verses.get(lemma_id, [])
        if not v_indices:
            print(f"  Warning: No verse occurrences found for {lemma_id} in word index.")
            continue

        occurrences = [parsed_verses[v_idx] for v_idx in v_indices if v_idx < len(parsed_verses)]
        print(f"  Found {len(occurrences)} verse occurrences in canon.")

        # Prepare texts for transformer embedding
        # For Greek/Latin, concatenate English gloss with original text for rich cross-lingual contextual semantics
        texts_to_encode = []
        for occ in occurrences:
            if canon_key == 'bsb':
                texts_to_encode.append(occ['en_text'])
            else:
                combined_txt = f"{occ['en_text']} {occ['orig_text']}".strip()
                texts_to_encode.append(combined_txt)

        X = encode_sentences(texts_to_encode, batch_size=64)
        print(f"  Extracted contextual matrix of shape {X.shape}.")

        if len(occurrences) < 4:
            print(f"  Skipping clustering (fewer than 4 occurrences).")
            continue

        # Cluster into K=2 senses
        kmeans = KMeans(n_clusters=2, random_state=42, n_init=10)
        cluster_labels = kmeans.fit_predict(X)
        try:
            sil = silhouette_score(X, cluster_labels)
        except Exception:
            sil = 0.0
        print(f"  K-Means silhouette score: {sil:.4f}")

        c0_items = [occurrences[i] for i, l in enumerate(cluster_labels) if l == 0]
        c1_items = [occurrences[i] for i, l in enumerate(cluster_labels) if l == 1]

        # Score sense keywords against occurrences to map clusters accurately
        def score_sense_keywords(items, keywords):
            score = 0
            for item in items:
                searchable = f"{item['en_text']} {item['orig_text']}".lower()
                for kw in keywords:
                    if kw.lower() in searchable:
                        score += 1
            return score

        s0_kws = target['senses'][0]['keywords']
        s1_kws = target['senses'][1]['keywords']

        c0_score_s0 = score_sense_keywords(c0_items, s0_kws)
        c0_score_s1 = score_sense_keywords(c0_items, s1_kws)

        if c0_score_s0 >= c0_score_s1:
            sense_0_cluster = 0
            sense_1_cluster = 1
        else:
            sense_0_cluster = 1
            sense_1_cluster = 0

        cluster_map = {
            sense_0_cluster: target['senses'][0],
            sense_1_cluster: target['senses'][1]
        }

        parent_node = node_lookup.get(lemma_id)
        parent_x = parent_node['x'] if parent_node else 0.0
        parent_y = parent_node['y'] if parent_node else 0.0
        parent_v = np.array(parent_node['v']) if parent_node else np.zeros(100)

        senses_output = []

        for cluster_id, sense_meta in cluster_map.items():
            items = c0_items if cluster_id == 0 else c1_items
            c_indices = [idx for idx, l in enumerate(cluster_labels) if l == cluster_id]
            c_center = kmeans.cluster_centers_[cluster_id]
            c_center_norm = c_center / (np.linalg.norm(c_center) + 1e-9)

            # Rank items by cosine similarity to cluster center
            item_sims = []
            for item_idx, orig_idx in enumerate(c_indices):
                vec = X[orig_idx]
                sim = float(np.dot(vec, c_center_norm))
                item_sims.append((items[item_idx], sim))

            item_sims.sort(key=lambda x: x[1], reverse=True)

            seen_refs = set()
            ranked_top_verses = []
            for itm, sim in item_sims:
                ref = itm['ref']
                if ref not in seen_refs:
                    seen_refs.add(ref)
                    ranked_top_verses.append({
                        'reference': ref,
                        'text': itm['en_text'],
                        'original_text': itm['orig_text'] if canon_key != 'bsb' else '',
                        'prototype_sim': round(sim, 3)
                    })
                if len(ranked_top_verses) >= 8:
                    break

            ot_cnt = sum(1 for x in items if x['testament'] == 'OT')
            nt_cnt = len(items) - ot_cnt
            testament_str = 'Both' if (ot_cnt > 0 and nt_cnt > 0) else ('OT' if ot_cnt > 0 else 'NT')

            # Offset 2D position from parent node for distinct visual cluster separation
            offset_dist = 2.8
            angle = (sense_meta['index'] * np.pi) + (np.pi / 4.0)
            sense_x = round(parent_x + (np.cos(angle) * offset_dist), 3)
            sense_y = round(parent_y + (np.sin(angle) * offset_dist), 3)

            sense_node_id = f"{lemma_id}__sense_{sense_meta['index']}"
            other_sense_id = f"{lemma_id}__sense_{1 - sense_meta['index']}"

            # Calculate specialized 100D vector tilted toward sense keywords
            kw_vecs = []
            for kw in sense_meta['keywords']:
                for pot_id in [kw, f"{kw}_NOUN", f"{kw}_ADJ", f"{kw}_VERB"]:
                    if pot_id in node_lookup:
                        kw_vecs.append(np.array(node_lookup[pot_id]['v']))
                        break

            if kw_vecs and np.linalg.norm(parent_v) > 0:
                kw_mean = np.mean(kw_vecs, axis=0)
                specialized_v = parent_v + (0.30 * kw_mean)
                specialized_v = specialized_v / np.linalg.norm(specialized_v)
                v_out = [round(float(val), 4) for val in specialized_v]
            else:
                v_out = [round(float(val), 4) for val in parent_v]

            unique_verse_indices = sorted(list(set(x['verse_id'] for x in items)))

            sense_entry = {
                'id': sense_node_id,
                'parent_id': lemma_id,
                'lemma': lemma,
                'pos': target.get('pos', 'NOUN'),
                'sense_index': sense_meta['index'],
                'sense_label': sense_meta['default_label'],
                'w': f"{lemma} ({sense_meta['default_label']})",
                'short_label': f"{lemma} [{sense_meta['default_label']}]",
                'f': len(items),
                'ot_count': ot_cnt,
                'nt_count': nt_cnt,
                't': testament_str,
                'x': sense_x,
                'y': sense_y,
                'v': v_out,
                'sister_senses': [other_sense_id],
                'verse_indices': unique_verse_indices,
                'top_verses': ranked_top_verses
            }
            senses_output.append(sense_entry)

            print(f"  Context {sense_meta['index']} ({sense_meta['default_label']}): {len(items)} verses | OT={ot_cnt}, NT={nt_cnt}")

        output_data[lemma_id] = {
            'type': 'disambiguation',
            'lemma': lemma,
            'lemma_id': lemma_id,
            'senses': senses_output
        }

    # -------------------------------------------------------------
    # 2. Contextual Entity Unification
    # -------------------------------------------------------------
    print(f"\n--- Processing {len(cfg['entities'])} Core Theological Entities ---")

    for entity in cfg['entities']:
        entity_id = entity['id']
        title = entity['title']
        print(f"\nUnifying entity: {entity_id} ('{title}')...")

        member_nodes = []
        all_entity_verse_indices = set()
        member_summaries = []

        for m_id in entity['member_lemmas']:
            m_node = node_lookup.get(m_id)
            m_verses = word_to_verses.get(m_id, [])
            if m_node:
                member_nodes.append(m_node)
                all_entity_verse_indices.update(m_verses)
                member_summaries.append({
                    'id': m_id,
                    'label': m_node['w'],
                    'pos': m_node.get('pos', ''),
                    'count': len(m_verses)
                })
            else:
                print(f"  Notice: Member {m_id} not found in word map for {canon_key}.")

        if not member_nodes:
            print(f"  Warning: No active member nodes found for {entity_id}.")
            continue

        unique_verse_indices = sorted(list(all_entity_verse_indices))
        occurrences = [parsed_verses[v_idx] for v_idx in unique_verse_indices if v_idx < len(parsed_verses)]
        print(f"  Unified {len(member_nodes)} member lemmas across {len(occurrences)} verses.")

        # Compute occurrence-weighted 2D coordinates (barycenter)
        total_weight = sum(m['count'] for m in member_summaries)
        if total_weight == 0:
            total_weight = len(member_nodes)
            weights = [1.0] * len(member_nodes)
        else:
            weights = [m['count'] / total_weight for m in member_summaries]

        entity_x = round(sum(m_node['x'] * w for m_node, w in zip(member_nodes, weights)), 3)
        entity_y = round(sum(m_node['y'] * w for m_node, w in zip(member_nodes, weights)), 3)

        # Compute occurrence-weighted 100D Word2Vec vector
        weighted_100d = sum(np.array(m_node['v']) * w for m_node, w in zip(member_nodes, weights))
        norm_100d = np.linalg.norm(weighted_100d)
        if norm_100d > 0:
            unified_v = (weighted_100d / norm_100d).tolist()
            unified_v = [round(float(val), 4) for val in unified_v]
        else:
            unified_v = member_nodes[0]['v']

        # Extract transformer representations for sample occurrences to find top prototype coreference verses
        sample_size = min(len(occurrences), 250)
        # Sample evenly across occurrences
        step = max(1, len(occurrences) // sample_size)
        sampled_occurrences = occurrences[::step][:sample_size]

        sample_texts = []
        for occ in sampled_occurrences:
            if canon_key == 'bsb':
                sample_texts.append(occ['en_text'])
            else:
                combined_txt = f"{occ['en_text']} {occ['orig_text']}".strip()
                sample_texts.append(combined_txt)

        sample_X = encode_sentences(sample_texts, batch_size=64)
        if len(sample_X) > 0:
            entity_centroid = np.mean(sample_X, axis=0)
            entity_centroid = entity_centroid / (np.linalg.norm(entity_centroid) + 1e-9)

            sims = np.dot(sample_X, entity_centroid)
            sorted_indices = np.argsort(-sims)

            seen_refs = set()
            ranked_top_verses = []
            for s_idx in sorted_indices:
                itm = sampled_occurrences[s_idx]
                ref = itm['ref']
                if ref not in seen_refs:
                    seen_refs.add(ref)
                    ranked_top_verses.append({
                        'reference': ref,
                        'text': itm['en_text'],
                        'original_text': itm['orig_text'] if canon_key != 'bsb' else '',
                        'prototype_sim': round(float(sims[s_idx]), 3)
                    })
                if len(ranked_top_verses) >= 8:
                    break
        else:
            ranked_top_verses = []

        ot_cnt = sum(1 for x in occurrences if x['testament'] == 'OT')
        nt_cnt = len(occurrences) - ot_cnt
        testament_str = 'Both' if (ot_cnt > 0 and nt_cnt > 0) else ('OT' if ot_cnt > 0 else 'NT')

        entity_entry = {
            'id': entity_id,
            'is_entity': True,
            'type': 'entity',
            'entity_name': title,
            'canonical_title': title,
            'title': title,
            'short_label': title,
            'w': title,
            'lemma': title,
            'description': entity['description'],
            'member_lemmas': member_summaries,
            'member_ids': [m['id'] for m in member_summaries],
            'f': len(occurrences),
            'ot_count': ot_cnt,
            'nt_count': nt_cnt,
            't': testament_str,
            'x': entity_x,
            'y': entity_y,
            'v': unified_v,
            'verse_indices': unique_verse_indices,
            'top_verses': ranked_top_verses
        }

        output_data[entity_id] = entity_entry
        print(f"  Entity {title}: {len(occurrences)} verses | OT={ot_cnt}, NT={nt_cnt} | barycenter=({entity_x}, {entity_y})")

    # Write output JSON
    os.makedirs(os.path.dirname(cfg['output_file']), exist_ok=True)
    with open(cfg['output_file'], 'w', encoding='utf-8') as f:
        json.dump(output_data, f, indent=2, ensure_ascii=False)

    print(f"\nSuccessfully generated {cfg['output_file']} with {len(output_data)} total nodes (polysemy + entities)!")


def main():
    t_start = time.time()
    for canon in ['bsb', 'lxx', 'vul']:
        run_training_for_canon(canon)
    print(f"\n=======================================================")
    print(f"All canons successfully trained in {time.time() - t_start:.2f}s!")
    print(f"=======================================================")


if __name__ == '__main__':
    main()
