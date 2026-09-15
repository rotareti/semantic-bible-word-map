import json
import os
import sys
import re
import unicodedata
from collections import Counter, defaultdict
from latin_lemmatizer.lemmata import LEMMATA

sys.path.append(os.path.dirname(__file__))
from biblical_entities import load_biblical_proper_names, COMMON_NOUNS

RAW_DIR = 'data/raw_vul'
PROCESSED_DIR = 'data/processed'
OUTPUT_DIR = 'data/output'

os.makedirs(PROCESSED_DIR, exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)

TITLE_TO_CODE = {
    # Old Testament (46 books)
    'Genesis': 'GEN', 'Exodus': 'EXO', 'Leviticus': 'LEV', 'Numbers': 'NUM', 'Deuteronomy': 'DEU',
    'Joshua': 'JOS', 'Judges': 'JDG', 'Ruth': 'RUT', '1 Kings': '1SA', '2 Kings': '2SA',
    '3 Kings': '1KI', '4 Kings': '2KI', '1 Paralipomenon': '1CH', '2 Paralipomenon': '2CH',
    '1 Esdras': 'EZR', '2 Esdras (Nehemiah)': 'NEH', 'Tobias': 'TOB', 'Judith': 'JDT',
    'Esther': 'EST', 'Job': 'JOB', 'Psalms': 'PSA', 'Proverbs': 'PRO', 'Ecclesiastes': 'ECC',
    'Canticle of Canticles': 'SNG', 'Wisdom': 'WIS', 'Sirach (Ecclesiasticus)': 'SIR',
    'Isaias': 'ISA', 'Jeremias': 'JER', 'Lamentations': 'LAM', 'Baruch': 'BAR',
    'Ezechiel': 'EZK', 'Daniel': 'DAN', 'Osee': 'HOS', 'Joel': 'JOL', 'Amos': 'AMO',
    'Abdias': 'OBA', 'Jonas': 'JON', 'Micheas': 'MIC', 'Nahum': 'NAM', 'Habacuc': 'HAB',
    'Sophonias': 'ZEP', 'Aggeus': 'HAG', 'Zacharias': 'ZEC', 'Malachias': 'MAL',
    '1 Machabees': '1MA', '2 Machabees': '2MA',
    # New Testament (27 books)
    'Matthew': 'MAT', 'Mark': 'MRK', 'Luke': 'LUK', 'John': 'JHN', 'Acts of Apostles': 'ACT',
    'Romans': 'ROM', '1 Corinthians': '1CO', '2 Corinthians': '2CO', 'Galatians': 'GAL',
    'Ephesians': 'EPH', 'Philippians': 'PHP', 'Colossians': 'COL', '1 Thessalonians': '1TH',
    '2 Thessalonians': '2TH', '1 Timothy': '1TI', '2 Timothy': '2TI', 'Titus': 'TIT',
    'Philemon': 'PHM', 'Hebrews': 'HEB', 'James': 'JAS', '1 Peter': '1PE', '2 Peter': '2PE',
    '1 John': '1JN', '2 John': '2JN', '3 John': '3JN', 'Jude': 'JUD', 'Apocalypse': 'REV'
}

WHITAKER_POS_MAP = {
    'N': 'NOUN', 'V': 'VERB', 'ADJ': 'ADJ', 'ADV': 'ADV',
    'PREP': 'ADP', 'CONJ': 'CCONJ', 'PRON': 'PRON', 'INTERJ': 'INTJ', 'NUM': 'NUM'
}

ECCLESIASTICAL_OVERRIDES = {
    'fides': ('faith', 'NOUN', 'faith, trust, fidelity, credit, belief'),
    'fido': ('trust', 'VERB', 'to trust, have confidence, rely upon'),
    'credo': ('believe', 'VERB', 'to believe, trust, commit, confide'),
    'deus': ('god', 'NOUN', 'God, deity, divine being'),
    'dominus': ('lord', 'NOUN', 'Lord, master, owner, ruler'),
    'spiritus': ('spirit', 'NOUN', 'spirit, breath, divine breath, soul, life'),
    'gratia': ('grace', 'NOUN', 'grace, favor, goodwill, thanks'),
    'iustifico': ('justify', 'VERB', 'to justify, make just, declare righteous, vindicate'),
    'justifico': ('justify', 'VERB', 'to justify, make just, declare righteous, vindicate'),
    'iustitia': ('righteousness', 'NOUN', 'righteousness, justice, equity, fairness'),
    'justitia': ('righteousness', 'NOUN', 'righteousness, justice, equity, fairness'),
    'iustus': ('righteous', 'ADJ', 'righteous, just, upright, fair, proper'),
    'justus': ('righteous', 'ADJ', 'righteous, just, upright, fair, proper'),
    'opus': ('work', 'NOUN', 'work, deed, labor, accomplishment'),
    'operor': ('work', 'VERB', 'to work, labor, be active, operate'),
    'cooperor': ('work with', 'VERB', 'to work with, cooperate with, assist'),
    'caritas': ('charity', 'NOUN', 'charity, divine love, affection, esteem, high value'),
    'amor': ('love', 'NOUN', 'love, affection, passion, devotion'),
    'diligo': ('love', 'VERB', 'to love, hold dear, esteem, cherish'),
    'amo': ('love', 'VERB', 'to love, be fond of, like'),
    'misericordia': ('mercy', 'NOUN', 'mercy, compassion, pity, lovingkindness'),
    'peccatum': ('sin', 'NOUN', 'sin, offense, fault, transgression'),
    'peccator': ('sinner', 'NOUN', 'sinner, transgressor'),
    'pecco': ('sin', 'VERB', 'to sin, do wrong, offend, err'),
    'salus': ('salvation', 'NOUN', 'salvation, safety, health, deliverance'),
    'salvator': ('savior', 'NOUN', 'savior, deliverer, preserver'),
    'salvo': ('save', 'VERB', 'to save, deliver, preserve, heal'),
    'vita': ('life', 'NOUN', 'life, way of life, living'),
    'vivo': ('live', 'VERB', 'to live, be alive'),
    'mors': ('death', 'NOUN', 'death, corpse, annihilation'),
    'morior': ('die', 'VERB', 'to die, expire, perish'),
    'lex': ('law', 'NOUN', 'law, statute, ordinance, legal code'),
    'testamentum': ('covenant', 'NOUN', 'covenant, testament, will, compact'),
    'foedus': ('covenant', 'NOUN', 'covenant, treaty, pact, alliance'),
    'angelus': ('angel', 'NOUN', 'angel, messenger'),
    'propheta': ('prophet', 'NOUN', 'prophet, seer, divine spokesperson'),
    'apostolus': ('apostle', 'NOUN', 'apostle, envoy, missionary'),
    'evangelium': ('gospel', 'NOUN', 'gospel, good news'),
    'regnum': ('kingdom', 'NOUN', 'kingdom, realm, dominion, royal power'),
    'sacerdos': ('priest', 'NOUN', 'priest, minister of sacred rites'),
    'templum': ('temple', 'NOUN', 'temple, sacred precinct, sanctuary'),
    'altare': ('altar', 'NOUN', 'altar, place of sacrifice'),
    'sacrificium': ('sacrifice', 'NOUN', 'sacrifice, sacred offering'),
    'oratio': ('prayer', 'NOUN', 'prayer, speech, supplication'),
    'oro': ('pray', 'VERB', 'to pray, beg, entreat, plead'),
    'verbum': ('word', 'NOUN', 'word, declaration, saying'),
    'vox': ('voice', 'NOUN', 'voice, sound, utterance, cry'),
    'sanctus': ('holy', 'ADJ', 'holy, sacred, saint, consecrated'),
    'sanctifico': ('sanctify', 'VERB', 'to sanctify, make holy, consecrate'),
    'pius': ('godly', 'ADJ', 'godly, devout, pious, dutiful, conscientious'),
    'impius': ('ungodly', 'ADJ', 'ungodly, wicked, profane, unholy'),
    'aeternus': ('eternal', 'ADJ', 'eternal, everlasting, perpetual'),
    'crux': ('cross', 'NOUN', 'cross, execution stake'),
    'resurrectio': ('resurrection', 'NOUN', 'resurrection, rising from the dead'),
    'resurgo': ('rise', 'VERB', 'to rise again, appear again'),
    'baptisma': ('baptism', 'NOUN', 'baptism, washing, ablution'),
    'baptizo': ('baptize', 'VERB', 'to baptize, immerse, wash'),
    'panis': ('bread', 'NOUN', 'bread, loaf, food'),
    'vinum': ('wine', 'NOUN', 'wine, grape juice'),
    'sanguis': ('blood', 'NOUN', 'blood, lineage, bloodshed'),
    'corpus': ('body', 'NOUN', 'body, substance, flesh'),
    'caro': ('flesh', 'NOUN', 'flesh, human nature, body'),
    'anima': ('soul', 'NOUN', 'soul, spirit, life, breath'),
    'cor': ('heart', 'NOUN', 'heart, mind, soul, seat of affection'),
    'mens': ('mind', 'NOUN', 'mind, intellect, thought, purpose'),
    'pax': ('peace', 'NOUN', 'peace, tranquility, harmony'),
    'lux': ('light', 'NOUN', 'light, daylight, life'),
    'lumen': ('light', 'NOUN', 'light, lamp, daylight, glory'),
    'tenebrae': ('darkness', 'NOUN', 'darkness, gloom, shadow'),
    'veritas': ('truth', 'NOUN', 'truth, reality, fact, uprightness'),
    'verus': ('true', 'ADJ', 'true, real, genuine, truthful'),
    'gloria': ('glory', 'NOUN', 'glory, fame, renown, honor'),
    'claritas': ('glory', 'NOUN', 'glory, splendor, clarity, brightness'),
    'laudo': ('praise', 'VERB', 'to praise, commend, extol'),
    'laudatio': ('praise', 'NOUN', 'praise, commendation, eulogy'),
    'benedico': ('bless', 'VERB', 'to bless, praise, speak well of'),
    'benedictio': ('blessing', 'NOUN', 'blessing, praise, benediction'),
    'maledico': ('curse', 'VERB', 'to curse, revile, slander'),
    'maledictio': ('curse', 'NOUN', 'curse, condemnation, malediction'),
    'patientia': ('patience', 'NOUN', 'patience, endurance, forbearance'),
    'perseverantia': ('perseverance', 'NOUN', 'perseverance, constancy, steadfastness'),
    'spes': ('hope', 'NOUN', 'hope, expectation, trust'),
    'spero': ('hope', 'VERB', 'to hope, trust, expect'),
    'gaudium': ('joy', 'NOUN', 'joy, gladness, delight'),
    'gaudeo': ('rejoice', 'VERB', 'to rejoice, be glad, delight in'),
    'laetitia': ('gladness', 'NOUN', 'gladness, joy, delight'),
    'eleemosyna': ('almsgiving', 'NOUN', 'alms, almsgiving, charitable donation'),
    'poenitentia': ('repentance', 'NOUN', 'repentance, penitence, change of heart'),
    'oboedientia': ('obedience', 'NOUN', 'obedience, compliance'),
    'oboedio': ('obey', 'VERB', 'to obey, give ear to, yield to'),
    'creo': ('create', 'VERB', 'to create, make, bring into being, beget'),
    'creator': ('creator', 'NOUN', 'creator, maker, author'),
    'creatura': ('creation', 'NOUN', 'creature, creation, created thing'),
    'homo': ('man', 'NOUN', 'man, human being, person, mortal'),
    'vir': ('man', 'NOUN', 'man, husband, hero, male'),
    'mulier': ('woman', 'NOUN', 'woman, wife'),
    'filius': ('son', 'NOUN', 'son, child, descendant'),
    'filia': ('daughter', 'NOUN', 'daughter, child'),
    'pater': ('father', 'NOUN', 'father, ancestor, elder'),
    'mater': ('mother', 'NOUN', 'mother, parent'),
    'frater': ('brother', 'NOUN', 'brother, fellow believer'),
    'soror': ('sister', 'NOUN', 'sister, female companion'),
    'caelum': ('heaven', 'NOUN', 'heaven, sky, celestial realm'),
    'terra': ('earth', 'NOUN', 'earth, land, ground, country'),
    'mare': ('sea', 'NOUN', 'sea, ocean, deep water'),
    'mons': ('mountain', 'NOUN', 'mountain, mount, hill'),
    'civitas': ('city', 'NOUN', 'city, citizenship, community, state'),
    'urbs': ('city', 'NOUN', 'city, walled town'),
    'populus': ('people', 'NOUN', 'people, nation, multitude, public'),
    'gens': ('nation', 'NOUN', 'nation, people, tribe, gentile'),
    'rex': ('king', 'NOUN', 'king, monarch, ruler'),
    'regina': ('queen', 'NOUN', 'queen, royal consort'),
    'judex': ('judge', 'NOUN', 'judge, magistrate, arbiter'),
    'iudex': ('judge', 'NOUN', 'judge, magistrate, arbiter'),
    'judico': ('judge', 'VERB', 'to judge, decide, sentence, pass verdict'),
    'iudico': ('judge', 'VERB', 'to judge, decide, sentence, pass verdict'),
    'iudicium': ('judgment', 'NOUN', 'judgment, verdict, court of justice'),
    'judicium': ('judgment', 'NOUN', 'judgment, verdict, court of justice'),
    'servus': ('servant', 'NOUN', 'servant, slave, bondservant'),
    'ancilla': ('handmaid', 'NOUN', 'handmaid, female servant, slave girl'),
    'dico': ('say', 'VERB', 'to say, tell, speak, declare'),
    'audio': ('hear', 'VERB', 'to hear, listen to, attend to'),
    'video': ('see', 'VERB', 'to see, perceive, behold, observe'),
    'scio': ('know', 'VERB', 'to know, understand, perceive'),
    'cognosco': ('know', 'VERB', 'to know, recognize, perceive, learn'),
    'venio': ('come', 'VERB', 'to come, arrive, approach'),
    'eo': ('go', 'VERB', 'to go, walk, proceed'),
    'facio': ('do', 'VERB', 'to do, make, perform, accomplish'),
    'do': ('give', 'VERB', 'to give, grant, bestow, offer'),
    'accipio': ('receive', 'VERB', 'to receive, accept, take, obtain'),
    'sum': ('be', 'VERB', 'to be, exist, occur'),
    'habeo': ('have', 'VERB', 'to have, hold, possess, consider'),
    'possideo': ('possess', 'VERB', 'to possess, own, hold, inherit'),
    'haereditas': ('inheritance', 'NOUN', 'inheritance, heritage, heirloom'),
    'hereditas': ('inheritance', 'NOUN', 'inheritance, heritage, heirloom'),
    'israel': ('israel', 'PROPN', 'Israel, the people of God', 'israel'),
    'israhel': ('israel', 'PROPN', 'Israel, the people of God', 'israel'),
    'israeli': ('israel', 'PROPN', 'Israel, the people of God', 'israel'),
    'israelem': ('israel', 'PROPN', 'Israel, the people of God', 'israel'),
    'israelis': ('israel', 'PROPN', 'Israel, the people of God', 'israel'),
    'israelita': ('israelite', 'PROPN', 'Israelite, descendant of Israel', 'israelite'),
    'israelitae': ('israelite', 'PROPN', 'Israelite, descendant of Israel', 'israelite'),
    'israelitas': ('israelite', 'PROPN', 'Israelite, descendant of Israel', 'israelite'),
    'israelitis': ('israelite', 'PROPN', 'Israelite, descendant of Israel', 'israelite'),
    'ierusalem': ('jerusalem', 'PROPN', 'Jerusalem, the holy city', 'ierusalem'),
    'hierusalem': ('jerusalem', 'PROPN', 'Jerusalem, the holy city', 'ierusalem'),
    'jerusalem': ('jerusalem', 'PROPN', 'Jerusalem, the holy city', 'ierusalem'),
    'david': ('david', 'PROPN', 'David, king of Israel', 'david'),
    'davidi': ('david', 'PROPN', 'David, king of Israel', 'david'),
    'davidem': ('david', 'PROPN', 'David, king of Israel', 'david'),
    'dauid': ('david', 'PROPN', 'David, king of Israel', 'david'),
    'dauidi': ('david', 'PROPN', 'David, king of Israel', 'david'),
    'dauidem': ('david', 'PROPN', 'David, king of Israel', 'david'),
    'salomon': ('solomon', 'PROPN', 'Solomon, king of Israel, son of David', 'salomon'),
    'salomonis': ('solomon', 'PROPN', 'Solomon, king of Israel, son of David', 'salomon'),
    'salomonem': ('solomon', 'PROPN', 'Solomon, king of Israel, son of David', 'salomon'),
    'salomone': ('solomon', 'PROPN', 'Solomon, king of Israel, son of David', 'salomon'),
    'moyses': ('moses', 'PROPN', 'Moses, lawgiver and prophet of Israel', 'moyses'),
    'moysen': ('moses', 'PROPN', 'Moses, lawgiver and prophet of Israel', 'moyses'),
    'moysi': ('moses', 'PROPN', 'Moses, lawgiver and prophet of Israel', 'moyses'),
    'moyse': ('moses', 'PROPN', 'Moses, lawgiver and prophet of Israel', 'moyses'),
    'moses': ('moses', 'PROPN', 'Moses, lawgiver and prophet of Israel', 'moyses'),
    'mosen': ('moses', 'PROPN', 'Moses, lawgiver and prophet of Israel', 'moyses'),
    'mosi': ('moses', 'PROPN', 'Moses, lawgiver and prophet of Israel', 'moyses'),
    'mose': ('moses', 'PROPN', 'Moses, lawgiver and prophet of Israel', 'moyses'),
    'aaron': ('aaron', 'PROPN', 'Aaron, high priest of Israel', 'aaron'),
    'aaronis': ('aaron', 'PROPN', 'Aaron, high priest of Israel', 'aaron'),
    'aaronem': ('aaron', 'PROPN', 'Aaron, high priest of Israel', 'aaron'),
    'aarone': ('aaron', 'PROPN', 'Aaron, high priest of Israel', 'aaron'),
    'abraham': ('abraham', 'PROPN', 'Abraham, father of faith', 'abraham'),
    'abrahae': ('abraham', 'PROPN', 'Abraham, father of faith', 'abraham'),
    'abrahami': ('abraham', 'PROPN', 'Abraham, father of faith', 'abraham'),
    'isaac': ('isaac', 'PROPN', 'Isaac, patriarch of Israel', 'isaac'),
    'iacob': ('jacob', 'PROPN', 'Jacob, patriarch of Israel', 'iacob'),
    'jacob': ('jacob', 'PROPN', 'Jacob, patriarch of Israel', 'iacob'),
    'iacobi': ('jacob', 'PROPN', 'Jacob, patriarch of Israel', 'iacob'),
    'iacobo': ('jacob', 'PROPN', 'Jacob, patriarch of Israel', 'iacob'),
    'iacobum': ('jacob', 'PROPN', 'Jacob, patriarch of Israel', 'iacob'),
    'ioseph': ('joseph', 'PROPN', 'Joseph, son of Jacob', 'ioseph'),
    'joseph': ('joseph', 'PROPN', 'Joseph, son of Jacob', 'ioseph'),
    'petrus': ('peter', 'PROPN', 'Peter, apostle of Christ', 'petrus'),
    'petri': ('peter', 'PROPN', 'Peter, apostle of Christ', 'petrus'),
    'petro': ('peter', 'PROPN', 'Peter, apostle of Christ', 'petrus'),
    'petrum': ('peter', 'PROPN', 'Peter, apostle of Christ', 'petrus'),
    'paulus': ('paul', 'PROPN', 'Paul, apostle to the Gentiles', 'paulus'),
    'pauli': ('paul', 'PROPN', 'Paul, apostle to the Gentiles', 'paulus'),
    'paulo': ('paul', 'PROPN', 'Paul, apostle to the Gentiles', 'paulus'),
    'paulum': ('paul', 'PROPN', 'Paul, apostle to the Gentiles', 'paulus'),
    'ioannes': ('john', 'PROPN', 'John, apostle and evangelist', 'ioannes'),
    'joannes': ('john', 'PROPN', 'John, apostle and evangelist', 'ioannes'),
    'ioannis': ('john', 'PROPN', 'John, apostle and evangelist', 'ioannes'),
    'ioanni': ('john', 'PROPN', 'John, apostle and evangelist', 'ioannes'),
    'ioannem': ('john', 'PROPN', 'John, apostle and evangelist', 'ioannes'),
    'ioanne': ('john', 'PROPN', 'John, apostle and evangelist', 'ioannes'),
    'iesus': ('jesus', 'PROPN', 'Jesus, the Christ and Savior', 'iesus'),
    'jesus': ('jesus', 'PROPN', 'Jesus, the Christ and Savior', 'iesus'),
    'iesu': ('jesus', 'PROPN', 'Jesus, the Christ and Savior', 'iesus'),
    'iesum': ('jesus', 'PROPN', 'Jesus, the Christ and Savior', 'iesus'),
    'christus': ('christ', 'PROPN', 'Christ, the Anointed One, Messiah', 'christus'),
    'christi': ('christ', 'PROPN', 'Christ, the Anointed One, Messiah', 'christus'),
    'christo': ('christ', 'PROPN', 'Christ, the Anointed One, Messiah', 'christus'),
    'christum': ('christ', 'PROPN', 'Christ, the Anointed One, Messiah', 'christus'),
    'iudas': ('judas', 'PROPN', 'Judah / Judas', 'iudas'),
    'judas': ('judas', 'PROPN', 'Judah / Judas', 'iudas'),
    'iudae': ('judas', 'PROPN', 'Judah / Judas', 'iudas'),
    'iudam': ('judas', 'PROPN', 'Judah / Judas', 'iudas'),
    'maria': ('mary', 'PROPN', 'Mary, mother of Jesus', 'maria'),
    'mariae': ('mary', 'PROPN', 'Mary, mother of Jesus', 'maria'),
    'mariam': ('mary', 'PROPN', 'Mary, mother of Jesus', 'maria'),
    'saul': ('saul', 'PROPN', 'Saul, king of Israel', 'saul'),
    'saulis': ('saul', 'PROPN', 'Saul, king of Israel', 'saul'),
    'saulem': ('saul', 'PROPN', 'Saul, king of Israel', 'saul'),
    'saule': ('saul', 'PROPN', 'Saul, king of Israel', 'saul'),
    'pharao': ('pharaoh', 'PROPN', 'Pharaoh, ruler of Egypt', 'pharao'),
    'pharaonis': ('pharaoh', 'PROPN', 'Pharaoh, ruler of Egypt', 'pharao'),
    'pharaonem': ('pharaoh', 'PROPN', 'Pharaoh, ruler of Egypt', 'pharao'),
    'pharaone': ('pharaoh', 'PROPN', 'Pharaoh, ruler of Egypt', 'pharao'),
    'aegyptus': ('egypt', 'PROPN', 'Egypt, land of Egypt', 'aegyptus'),
    'aegypti': ('egypt', 'PROPN', 'Egypt, land of Egypt', 'aegyptus'),
    'aegyptum': ('egypt', 'PROPN', 'Egypt, land of Egypt', 'aegyptus'),
    'aegypto': ('egypt', 'PROPN', 'Egypt, land of Egypt', 'aegyptus'),
    'aegyptius': ('egyptian', 'PROPN', 'Egyptian, person from Egypt', 'aegyptius'),
    'aegyptii': ('egyptian', 'PROPN', 'Egyptian, person from Egypt', 'aegyptius'),
    'aegyptios': ('egyptian', 'PROPN', 'Egyptian, person from Egypt', 'aegyptius'),
    'babylon': ('babylon', 'PROPN', 'Babylon, ancient empire and city', 'babylon'),
    'babylonis': ('babylon', 'PROPN', 'Babylon, ancient empire and city', 'babylon'),
    'babylonem': ('babylon', 'PROPN', 'Babylon, ancient empire and city', 'babylon'),
    'sion': ('zion', 'PROPN', 'Zion, Mount Zion, the city of David', 'sion'),
    'iordanis': ('jordan', 'PROPN', 'Jordan, the river of Israel', 'iordanis'),
    'iordanem': ('jordan', 'PROPN', 'Jordan, the river of Israel', 'iordanis'),
    'iordane': ('jordan', 'PROPN', 'Jordan, the river of Israel', 'iordanis'),
    'galilaea': ('galilee', 'PROPN', 'Galilee, region in Israel', 'galilaea'),
    'galilaeae': ('galilee', 'PROPN', 'Galilee, region in Israel', 'galilaea'),
    'galilaeam': ('galilee', 'PROPN', 'Galilee, region in Israel', 'galilaea'),
    'samaria': ('samaria', 'PROPN', 'Samaria, city and region in Israel', 'samaria'),
    'samariae': ('samaria', 'PROPN', 'Samaria, city and region in Israel', 'samaria'),
    'samariam': ('samaria', 'PROPN', 'Samaria, city and region in Israel', 'samaria'),
    'iudaea': ('judea', 'PROPN', 'Judea, province in Israel', 'iudaea'),
    'iudaeae': ('judea', 'PROPN', 'Judea, province in Israel', 'iudaea'),
    'iudaeam': ('judea', 'PROPN', 'Judea, province in Israel', 'iudaea'),
    'iudaeus': ('jew', 'PROPN', 'Jew, Judean', 'iudaeus'),
    'iudaei': ('jew', 'PROPN', 'Jew, Judean', 'iudaeus'),
    'iudaeis': ('jew', 'PROPN', 'Jew, Judean', 'iudaeus'),
    'iudaeos': ('jew', 'PROPN', 'Jew, Judean', 'iudaeus'),
    'philistinus': ('philistine', 'PROPN', 'Philistine', 'philistinus'),
    'philistini': ('philistine', 'PROPN', 'Philistine', 'philistinus'),
    'philistinos': ('philistine', 'PROPN', 'Philistine', 'philistinus'),
    'levita': ('levite', 'PROPN', 'Levite, member of tribe of Levi', 'levita'),
    'levitae': ('levite', 'PROPN', 'Levite, member of tribe of Levi', 'levita'),
    'levitas': ('levite', 'PROPN', 'Levite, member of tribe of Levi', 'levita'),
    'pilatus': ('pilate', 'PROPN', 'Pontius Pilate, Roman governor', 'pilatus'),
    'pilati': ('pilate', 'PROPN', 'Pontius Pilate, Roman governor', 'pilatus'),
    'pilato': ('pilate', 'PROPN', 'Pontius Pilate, Roman governor', 'pilatus'),
    'pilatum': ('pilate', 'PROPN', 'Pontius Pilate, Roman governor', 'pilatus'),
    'herodes': ('herod', 'PROPN', 'Herod, king or tetrarch', 'herodes'),
    'herodis': ('herod', 'PROPN', 'Herod, king or tetrarch', 'herodes'),
    'herodem': ('herod', 'PROPN', 'Herod, king or tetrarch', 'herodes'),
    'nazarenus': ('nazarene', 'PROPN', 'Nazarene, of or from Nazareth', 'nazarenus'),
    'nazarene': ('nazarene', 'PROPN', 'Nazarene, of or from Nazareth', 'nazarenus'),
    'nazareno': ('nazarene', 'PROPN', 'Nazarene, of or from Nazareth', 'nazarenus'),
    'nazarenum': ('nazarene', 'PROPN', 'Nazarene, of or from Nazareth', 'nazarenus'),
    'nazareni': ('nazarene', 'PROPN', 'Nazarene, of or from Nazareth', 'nazarenus'),
    'nazarenos': ('nazarene', 'PROPN', 'Nazarene, of or from Nazareth', 'nazarenus'),
    'nazarenorum': ('nazarene', 'PROPN', 'Nazarene, of or from Nazareth', 'nazarenus'),
    'nazaraeus': ('nazarene', 'PROPN', 'Nazarene, Nazarite', 'nazaraeus'),
    'nazaraei': ('nazarene', 'PROPN', 'Nazarene, Nazarite', 'nazaraeus'),
    'nazaraeo': ('nazarene', 'PROPN', 'Nazarene, Nazarite', 'nazaraeus'),
    'nazaraeum': ('nazarene', 'PROPN', 'Nazarene, Nazarite', 'nazaraeus'),
    'nazaraeos': ('nazarene', 'PROPN', 'Nazarene, Nazarite', 'nazaraeus'),
    'nazaraeorum': ('nazarene', 'PROPN', 'Nazarene, Nazarite', 'nazaraeus'),
    'nazaraeis': ('nazarene', 'PROPN', 'Nazarene, Nazarite', 'nazaraeus'),
    'nazareth': ('nazareth', 'PROPN', 'Nazareth, city in Galilee', 'nazareth'),
    'iesse': ('jesse', 'PROPN', 'Jesse, father of King David', 'iesse'),
    'isai': ('jesse', 'PROPN', 'Jesse, father of King David', 'iesse'),
    'iesua': ('jeshua', 'PROPN', 'Jeshua / Joshua', 'iesua'),
    'panis': ('bread', 'NOUN', 'bread, loaf, food', 'panis'),
    'panem': ('bread', 'NOUN', 'bread, loaf, food', 'panis'),
    'pane': ('bread', 'NOUN', 'bread, loaf, food', 'panis'),
    'panes': ('bread', 'NOUN', 'bread, loaf, food', 'panis'),
    'panum': ('bread', 'NOUN', 'bread, loaf, food', 'panis'),
    'panibus': ('bread', 'NOUN', 'bread, loaf, food', 'panis'),
    'fides': ('faith', 'NOUN', 'faith, trust, fidelity, credit, belief', 'fides'),
    'fidem': ('faith', 'NOUN', 'faith, trust, fidelity, credit, belief', 'fides'),
    'fidei': ('faith', 'NOUN', 'faith, trust, fidelity, credit, belief', 'fides'),
    'fide': ('faith', 'NOUN', 'faith, trust, fidelity, credit, belief', 'fides'),
    'deus': ('god', 'NOUN', 'God, divinity, the Lord God', 'deus'),
    'dei': ('god', 'NOUN', 'God, divinity, the Lord God', 'deus'),
    'deo': ('god', 'NOUN', 'God, divinity, the Lord God', 'deus'),
    'deum': ('god', 'NOUN', 'God, divinity, the Lord God', 'deus'),
    'dii': ('god', 'NOUN', 'gods, idols, divinities', 'deus'),
    'deos': ('god', 'NOUN', 'gods, idols, divinities', 'deus'),
    'dominus': ('lord', 'NOUN', 'lord, master, the Lord', 'dominus'),
    'domini': ('lord', 'NOUN', 'lord, master, the Lord', 'dominus'),
    'domino': ('lord', 'NOUN', 'lord, master, the Lord', 'dominus'),
    'dominum': ('lord', 'NOUN', 'lord, master, the Lord', 'dominus'),
    'domine': ('lord', 'NOUN', 'lord, master, the Lord', 'dominus'),
    'spiritus': ('spirit', 'NOUN', 'spirit, breath, the Holy Spirit', 'spiritus'),
    'spiritui': ('spirit', 'NOUN', 'spirit, breath, the Holy Spirit', 'spiritus'),
    'spiritum': ('spirit', 'NOUN', 'spirit, breath, the Holy Spirit', 'spiritus'),
    'spiritu': ('spirit', 'NOUN', 'spirit, breath, the Holy Spirit', 'spiritus'),
    'pater': ('father', 'NOUN', 'father, forefather', 'pater'),
    'patris': ('father', 'NOUN', 'father, forefather', 'pater'),
    'patri': ('father', 'NOUN', 'father, forefather', 'pater'),
    'patrem': ('father', 'NOUN', 'father, forefather', 'pater'),
    'patre': ('father', 'NOUN', 'father, forefather', 'pater'),
    'patres': ('father', 'NOUN', 'fathers, forefathers', 'pater'),
    'patrum': ('father', 'NOUN', 'fathers, forefathers', 'pater'),
    'patribus': ('father', 'NOUN', 'fathers, forefathers', 'pater'),
    'filius': ('son', 'NOUN', 'son, child, descendant', 'filius'),
    'filii': ('son', 'NOUN', 'son, child, descendant', 'filius'),
    'filio': ('son', 'NOUN', 'son, child, descendant', 'filius'),
    'filium': ('son', 'NOUN', 'son, child, descendant', 'filius'),
    'filie': ('son', 'NOUN', 'son, child, descendant', 'filius'),
    'fili': ('son', 'NOUN', 'son, child, descendant', 'filius'),
    'filios': ('son', 'NOUN', 'sons, children', 'filius'),
    'filiorum': ('son', 'NOUN', 'sons, children', 'filius'),
    'filia': ('daughter', 'NOUN', 'daughter, girl', 'filia'),
    'filiae': ('daughter', 'NOUN', 'daughter, girl', 'filia'),
    'filiam': ('daughter', 'NOUN', 'daughter, girl', 'filia'),
    'filias': ('daughter', 'NOUN', 'daughters', 'filia'),
    'rex': ('king', 'NOUN', 'king, monarch, ruler', 'rex'),
    'regis': ('king', 'NOUN', 'king, monarch, ruler', 'rex'),
    'regi': ('king', 'NOUN', 'king, monarch, ruler', 'rex'),
    'regem': ('king', 'NOUN', 'king, monarch, ruler', 'rex'),
    'rege': ('king', 'NOUN', 'king, monarch, ruler', 'rex'),
    'reges': ('king', 'NOUN', 'kings, rulers', 'rex'),
    'regum': ('king', 'NOUN', 'kings, rulers', 'rex'),
    'regibus': ('king', 'NOUN', 'kings, rulers', 'rex'),
    'homo': ('man', 'NOUN', 'human, man, person', 'homo'),
    'hominis': ('man', 'NOUN', 'human, man, person', 'homo'),
    'homini': ('man', 'NOUN', 'human, man, person', 'homo'),
    'hominem': ('man', 'NOUN', 'human, man, person', 'homo'),
    'homine': ('man', 'NOUN', 'human, man, person', 'homo'),
    'homines': ('man', 'NOUN', 'men, people', 'homo'),
    'hominum': ('man', 'NOUN', 'men, people', 'homo'),
    'hominibus': ('man', 'NOUN', 'men, people', 'homo'),
    'vir': ('man', 'NOUN', 'man, husband, male', 'vir'),
    'viri': ('man', 'NOUN', 'man, husband, male', 'vir'),
    'viro': ('man', 'NOUN', 'man, husband, male', 'vir'),
    'virum': ('man', 'NOUN', 'man, husband, male', 'vir'),
    'vires': ('strength', 'NOUN', 'strength, force', 'vires'),
    'viris': ('man', 'NOUN', 'men, husbands', 'vir'),
    'virorum': ('man', 'NOUN', 'men, husbands', 'vir'),
    'testamentum': ('covenant', 'NOUN', 'covenant, testament, will', 'testamentum'),
    'testamenti': ('covenant', 'NOUN', 'covenant, testament, will', 'testamentum'),
    'testamento': ('covenant', 'NOUN', 'covenant, testament, will', 'testamentum'),
    'arca': ('ark', 'NOUN', 'ark, chest, box', 'arca'),
    'arcae': ('ark', 'NOUN', 'ark, chest, box', 'arca'),
    'arcam': ('ark', 'NOUN', 'ark, chest, box', 'arca'),
    'super': ('upon', 'ADP', 'over, above, upon, concerning'),
    'in': ('in', 'ADP', 'in, into, on, among, by'),
    'ad': ('to', 'ADP', 'to, toward, near, at'),
    'de': ('from', 'ADP', 'from, down from, concerning, of'),
    'per': ('through', 'ADP', 'through, throughout, by means of'),
    'ab': ('from', 'ADP', 'from, by, away from'),
    'ex': ('out of', 'ADP', 'out of, from, away from'),
    'cum': ('with', 'ADP', 'with, together with, along with'),
    'sine': ('without', 'ADP', 'without, lacking'),
    'sub': ('under', 'ADP', 'under, beneath, at the foot of'),
    'pro': ('for', 'ADP', 'for, on behalf of, in place of'),
    'post': ('after', 'ADP', 'after, behind, following'),
    'ante': ('before', 'ADP', 'before, in front of'),
    'inter': ('between', 'ADP', 'between, among, during'),
    'contra': ('against', 'ADP', 'against, opposite, facing'),
    'et': ('and', 'CCONJ', 'and, also, even'),
    'sed': ('but', 'CCONJ', 'but, yet, on the contrary'),
    'aut': ('or', 'CCONJ', 'or, either'),
    'autem': ('however', 'CCONJ', 'however, moreover, but, now'),
    'enim': ('for', 'CCONJ', 'for, truly, indeed, namely'),
    'ergo': ('therefore', 'CCONJ', 'therefore, then, accordingly'),
    'quia': ('because', 'SCONJ', 'because, that, since'),
    'quoniam': ('since', 'SCONJ', 'since, because, seeing that'),
    'ut': ('that', 'SCONJ', 'that, in order that, so that, as'),
    'si': ('if', 'SCONJ', 'if, whether'),
    'nisi': ('unless', 'SCONJ', 'unless, except, if not'),
    'non': ('not', 'ADV', 'not, no, by no means'),
    'ne': ('lest', 'ADV', 'lest, that not, not'),
    'ecce': ('behold', 'INTJ', 'behold, lo, see here'),
    'amen': ('amen', 'INTJ', 'amen, truly, so be it'),
    'qui': ('who', 'PRON', 'who, which, that, what'),
    'is': ('he', 'PRON', 'he, she, it, that one'),
    'hic': ('this', 'PRON', 'this, the latter'),
    'ille': ('that', 'PRON', 'that, the former, he'),
    'ipse': ('self', 'PRON', 'himself, herself, itself, very'),
    'ego': ('i', 'PRON', 'I, me'),
    'tu': ('you', 'PRON', 'you (singular)'),
    'nos': ('we', 'PRON', 'we, us'),
    'vos': ('you', 'PRON', 'you (plural)'),
    'suus': ('his own', 'PRON', 'his own, her own, its own, their own'),
    'meus': ('my', 'PRON', 'my, mine'),
    'tuus': ('your', 'PRON', 'your, yours (singular)'),
    'noster': ('our', 'PRON', 'our, ours'),
    'vester': ('your', 'PRON', 'your, yours (plural)'),
    'omnis': ('all', 'ADJ', 'all, every, whole'),
    'unus': ('one', 'NUM', 'one, single, alone'),
    'duo': ('two', 'NUM', 'two'),
    'tres': ('three', 'NUM', 'three'),
    'quattuor': ('four', 'NUM', 'four'),
    'quinque': ('five', 'NUM', 'five'),
    'sex': ('six', 'NUM', 'six'),
    'septem': ('seven', 'NUM', 'seven'),
    'octo': ('eight', 'NUM', 'eight'),
    'novem': ('nine', 'NUM', 'nine'),
    'decem': ('ten', 'NUM', 'ten'),
    'duodecim': ('twelve', 'NUM', 'twelve'),
    'centum': ('hundred', 'NUM', 'hundred'),
    'mille': ('thousand', 'NUM', 'thousand'),
}

def clean_latin(s):
    if not s:
        return ""
    nfkd = unicodedata.normalize('NFKD', s)
    no_accent = ''.join(c for c in nfkd if not unicodedata.combining(c))
    return no_accent.replace('æ', 'ae').replace('œ', 'oe').replace('Æ', 'Ae').replace('Œ', 'Oe')

def clean_whitaker_senses(senses):
    if not senses:
        return 'word'
    s = re.sub(r'\[.*?\]', '', senses)
    s = re.sub(r'\(.*?\)', '', s)
    s = re.sub(r'\|.*', '', s)
    if 'christ, the nazarene' in s.lower():
        return 'nazarene'
    clauses = [c.strip() for c in re.split(r'[;]', s) if c.strip()]
    if not clauses:
        return 'word'
    first = clauses[0].strip()
    comma_parts = [p.strip() for p in first.split(',') if p.strip()]
    cand = comma_parts[0] if comma_parts else first
    if '/' in cand:
        cand = cand.split('/')[0].strip()
    if cand.lower().startswith('to ') and len(cand) > 3:
        cand = cand[3:].strip()
    cand = re.sub(r'[^a-zA-Z0-9\s-]', '', cand).strip().lower()
    return ' '.join(cand.split()[:3]) or 'word'

def main():
    proper_names = load_biblical_proper_names(raw_dir='data/raw')
    print("Step 1: Loading PROIEL Vulgate Treebank...")
    proiel_map = {}
    proiel_proper_lemmata = set()
    for split in ['train', 'dev', 'test']:
        p_path = os.path.join(RAW_DIR, f'la_proiel-ud-{split}.conllu')
        if os.path.exists(p_path):
            with open(p_path, 'r', encoding='utf-8') as f:
                for line in f:
                    line = line.strip()
                    if not line or line.startswith('#'):
                        continue
                    parts = line.split('\t')
                    if len(parts) >= 5:
                        form = clean_latin(parts[1]).lower().replace('j', 'i').replace('v', 'u')
                        lemma = clean_latin(parts[2]).lower().replace('j', 'i').replace('v', 'u')
                        upos = parts[3]
                        if upos == 'PROPN':
                            proiel_proper_lemmata.add(lemma)
                        if form not in proiel_map:
                            proiel_map[form] = (lemma, upos)
    print(f"Loaded {len(proiel_map)} PROIEL wordform mappings ({len(proiel_proper_lemmata)} proper lemmata).")

    print("Step 2: Loading Whitaker's Words DICTLINE.json...")
    with open(os.path.join(RAW_DIR, 'DICTLINE.json'), 'r', encoding='utf-8') as f:
        dictline = json.load(f)

    whitaker_dict = {}
    for entry in dictline:
        pos = WHITAKER_POS_MAP.get(entry.get('pos', ''), entry.get('pos', ''))
        senses = entry.get('senses', '')
        gloss = clean_whitaker_senses(senses)
        for stem in entry.get('stems', []):
            if not stem or stem == 'NO_STEM':
                continue
            s_norm = stem.lower().replace('j', 'i').replace('v', 'u')
            key = (s_norm, pos)
            if key not in whitaker_dict:
                whitaker_dict[key] = (gloss, senses)
            if s_norm not in whitaker_dict:
                whitaker_dict[s_norm] = (gloss, senses, pos)
    print(f"Loaded Whitaker's Words stems: {len(whitaker_dict)}")

    print("Step 3: Preparing Lemma Lookup...")
    norm_cltk_lemmata = {}
    for k, v in LEMMATA.items():
        k_norm = clean_latin(k).lower().replace('j', 'i').replace('v', 'u')
        if k_norm not in norm_cltk_lemmata:
            norm_cltk_lemmata[k_norm] = v

    def resolve_token(raw_word):
        w_clean = clean_latin(raw_word).strip()
        if not w_clean:
            return None
        w_norm = w_clean.lower().replace('j', 'i').replace('v', 'u')

        lemma = None
        pos = None

        # Priority 1: Ecclesiastical override by exact wordform
        if w_norm in ECCLESIASTICAL_OVERRIDES:
            ov = ECCLESIASTICAL_OVERRIDES[w_norm]
            gloss, pos, def_text = ov[0], ov[1], ov[2]
            lemma = ov[3] if len(ov) > 3 else w_norm
            return lemma, pos, gloss, def_text

        # Priority 2: PROIEL gold-standard Vulgate
        if w_norm in proiel_map:
            p_lem, p_pos = proiel_map[w_norm]
            lemma = p_lem
            pos = p_pos

        # Priority 3: CLTK lemmata
        if not lemma and w_norm in norm_cltk_lemmata:
            c_lem = norm_cltk_lemmata[w_norm]
            c_lem_clean = re.sub(r'\d+$', '', c_lem).lower()
            lemma = c_lem_clean
            pos = "NOUN" # provisional

        # Priority 4: Fallback to normalized word
        if not lemma:
            lemma = w_norm
            pos = "NOUN"

        # Check Ecclesiastical overrides for the resolved lemma
        lem_norm = lemma.lower().replace('j', 'i').replace('v', 'u')
        if lem_norm in ECCLESIASTICAL_OVERRIDES:
            ov = ECCLESIASTICAL_OVERRIDES[lem_norm]
            gloss, override_pos, def_text = ov[0], ov[1], ov[2]
            canonical_lemma = ov[3] if len(ov) > 3 else lem_norm
            return canonical_lemma, (override_pos or pos), gloss, def_text

        # Lookup in Whitaker's Words
        gloss = None
        def_text = None

        # Exact lemma + pos
        if (lem_norm, pos) in whitaker_dict:
            gloss, def_text = whitaker_dict[(lem_norm, pos)]
        elif lem_norm in whitaker_dict:
            val = whitaker_dict[lem_norm]
            gloss, def_text = val[0], val[1]
            if len(val) > 2 and not pos:
                pos = val[2]
        else:
            # Prefix search in Whitaker stems
            for length in range(len(lem_norm), 2, -1):
                pref = lem_norm[:length]
                # Guard against false short prefix matches (e.g. 'ies' matching 'iesse' or other Hebrew names)
                if pref == 'ies' and not lem_norm.startswith(('iesu', 'jesu')):
                    continue
                if (pref, pos) in whitaker_dict:
                    gloss, def_text = whitaker_dict[(pref, pos)]
                    break
                elif pref in whitaker_dict:
                    val = whitaker_dict[pref]
                    gloss, def_text = val[0], val[1]
                    if len(val) > 2 and not pos:
                        pos = val[2]
                    break

        if not gloss:
            gloss = w_clean.lower()
            def_text = f"Latin: {lemma}"

        pos = pos or "NOUN"

        # Enforce canonical cross-canon POS rules:
        # Common concepts/nouns must NEVER be PROPN.
        # Genuine biblical proper entities must be PROPN.
        if gloss in COMMON_NOUNS:
            if gloss == "holy":
                pos = "ADJ"
            elif gloss == "behold":
                pos = "INTJ"
            else:
                pos = "NOUN"
        elif pos == "PROPN" or gloss in proper_names or lemma in proiel_proper_lemmata:
            pos = "PROPN"

        return lemma, pos, gloss, def_text

    print("Step 4: Processing Old Testament and New Testament...")
    with open(os.path.join(RAW_DIR, 'old_testament.json'), 'r', encoding='utf-8') as f:
        ot_data = json.load(f)
    with open(os.path.join(RAW_DIR, 'new_testament.json'), 'r', encoding='utf-8') as f:
        nt_data = json.load(f)

    ot_file = open(os.path.join(PROCESSED_DIR, 'ot_text_vul.txt'), 'w', encoding='utf-8')
    nt_file = open(os.path.join(PROCESSED_DIR, 'nt_text_vul.txt'), 'w', encoding='utf-8')

    word_meta = {}
    verses = []
    word_to_verse = defaultdict(list)
    word_counts = Counter()

    total_ot_verses = 0
    total_nt_verses = 0

    for corpus, target_file, is_nt in [(ot_data, ot_file, False), (nt_data, nt_file, True)]:
        for book in corpus:
            b_title = book.get('title', '').strip()
            b_code = TITLE_TO_CODE.get(b_title)
            if not b_code:
                print(f"Warning: Unknown book title '{b_title}'")
                continue

            for ch in book.get('chapters', []):
                c_num = ch.get('chapterNumber', 1)
                for v in ch.get('verses', []):
                    v_num = v.get('verseNumber', 1)
                    v_ref = f"{b_code} {c_num}:{v_num}"
                    text_latin = clean_latin(v.get('textLatin', '')).replace('\u2014', '--').strip()
                    text_eng = v.get('text', '').replace('\u2014', '--').strip()

                    tokens = re.findall(r'[a-zA-Z]+', text_latin)
                    verse_tokens = []
                    words_in_verse = set()

                    for raw_t in tokens:
                        res = resolve_token(raw_t)
                        if not res:
                            continue
                        lemma, pos, gloss, def_text = res
                        
                        gloss_slug = re.sub(r'[^a-zA-Z0-9_]', '', re.sub(r'[\s-]+', '_', gloss)).lower() or "word"
                        lemma_slug = re.sub(r'[^a-zA-Z0-9_]', '', re.sub(r'[\s-]+', '_', lemma)).lower() or "lemma"
                        token_id = f"{gloss_slug}_{lemma_slug}_{pos}"

                        verse_tokens.append(token_id)
                        words_in_verse.add(token_id)
                        word_counts[token_id] += 1

                        if token_id not in word_meta:
                            word_meta[token_id] = {
                                "id": token_id,
                                "w": gloss,
                                "pos": pos,
                                "lemma": lemma,
                                "def": def_text
                            }

                    if not verse_tokens:
                        continue

                    verse_idx = len(verses)
                    verses.append(f"{v_ref}|{text_eng}|{text_latin}")
                    for wid in words_in_verse:
                        word_to_verse[wid].append(verse_idx)

                    target_file.write(" ".join(verse_tokens) + "\n")
                    if is_nt:
                        total_nt_verses += 1
                    else:
                        total_ot_verses += 1

    ot_file.close()
    nt_file.close()

    print(f"Processed {total_ot_verses} OT verses and {total_nt_verses} NT verses (Total: {len(verses)}).")
    print(f"Total vocabulary items: {len(word_meta)}")

    print("Step 5: Writing metadata and verse index...")
    with open(os.path.join(PROCESSED_DIR, 'vul_word_meta.json'), 'w', encoding='utf-8') as f:
        json.dump(word_meta, f, ensure_ascii=False)

    verse_index = {
        "verses": verses,
        "words": word_to_verse
    }
    with open(os.path.join(OUTPUT_DIR, 'verse_index_vul.json'), 'w', encoding='utf-8') as f:
        json.dump(verse_index, f, ensure_ascii=False)

    print("Step 6: Latin Vulgate preprocessing complete!")

if __name__ == '__main__':
    main()
