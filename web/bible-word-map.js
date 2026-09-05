const GENRE_COLORS = {
    'Law': '#3b82f6',
    'History': '#10b981',
    'Wisdom': '#f59e0b',
    'Wisdom & Poetry': '#f59e0b',
    'Major Prophets': '#8b5cf6',
    'Minor Prophets': '#ec4899',
    'Gospels': '#ef4444',
    'Pauline Epistles': '#06b6d4',
    'General Epistles': '#14b8a6',
    'Apocalypse': '#e11d48'
};

const BIBLE_BOOKS = [
    { order: 1, code: 'GEN', name: 'Genesis', testament: 'OT', genre: 'Law', words: 28527 },
    { order: 2, code: 'EXO', name: 'Exodus', testament: 'OT', genre: 'Law', words: 23193 },
    { order: 3, code: 'LEV', name: 'Leviticus', testament: 'OT', genre: 'Law', words: 17182 },
    { order: 4, code: 'NUM', name: 'Numbers', testament: 'OT', genre: 'Law', words: 22837 },
    { order: 5, code: 'DEU', name: 'Deuteronomy', testament: 'OT', genre: 'Law', words: 20274 },
    { order: 6, code: 'JOS', name: 'Joshua', testament: 'OT', genre: 'History', words: 12693 },
    { order: 7, code: 'JDG', name: 'Judges', testament: 'OT', genre: 'History', words: 13396 },
    { order: 8, code: 'RUT', name: 'Ruth', testament: 'OT', genre: 'History', words: 1951 },
    { order: 9, code: '1SA', name: '1 Samuel', testament: 'OT', genre: 'History', words: 18159 },
    { order: 10, code: '2SA', name: '2 Samuel', testament: 'OT', genre: 'History', words: 14900 },
    { order: 11, code: '1KI', name: '1 Kings', testament: 'OT', genre: 'History', words: 17647 },
    { order: 12, code: '2KI', name: '2 Kings', testament: 'OT', genre: 'History', words: 16779 },
    { order: 13, code: '1CH', name: '1 Chronicles', testament: 'OT', genre: 'History', words: 13875 },
    { order: 14, code: '2CH', name: '2 Chronicles', testament: 'OT', genre: 'History', words: 18348 },
    { order: 15, code: 'EZR', name: 'Ezra', testament: 'OT', genre: 'History', words: 4842 },
    { order: 16, code: 'NEH', name: 'Nehemiah', testament: 'OT', genre: 'History', words: 7103 },
    { order: 17, code: 'EST', name: 'Esther', testament: 'OT', genre: 'History', words: 3895 },
    { order: 18, code: 'JOB', name: 'Job', testament: 'OT', genre: 'Wisdom', words: 14176 },
    { order: 19, code: 'PSA', name: 'Psalms', testament: 'OT', genre: 'Wisdom', words: 33049 },
    { order: 20, code: 'PRO', name: 'Proverbs', testament: 'OT', genre: 'Wisdom', words: 12029 },
    { order: 21, code: 'ECC', name: 'Ecclesiastes', testament: 'OT', genre: 'Wisdom', words: 4131 },
    { order: 22, code: 'SNG', name: 'Song of Solomon', testament: 'OT', genre: 'Wisdom', words: 1982 },
    { order: 23, code: 'ISA', name: 'Isaiah', testament: 'OT', genre: 'Major Prophets', words: 26055 },
    { order: 24, code: 'JER', name: 'Jeremiah', testament: 'OT', genre: 'Major Prophets', words: 30695 },
    { order: 25, code: 'LAM', name: 'Lamentations', testament: 'OT', genre: 'Major Prophets', words: 2635 },
    { order: 26, code: 'EZK', name: 'Ezekiel', testament: 'OT', genre: 'Major Prophets', words: 27358 },
    { order: 27, code: 'DAN', name: 'Daniel', testament: 'OT', genre: 'Major Prophets', words: 8297 },
    { order: 28, code: 'HOS', name: 'Hosea', testament: 'OT', genre: 'Minor Prophets', words: 3855 },
    { order: 29, code: 'JOL', name: 'Joel', testament: 'OT', genre: 'Minor Prophets', words: 1421 },
    { order: 30, code: 'AMO', name: 'Amos', testament: 'OT', genre: 'Minor Prophets', words: 3089 },
    { order: 31, code: 'OBA', name: 'Obadiah', testament: 'OT', genre: 'Minor Prophets', words: 446 },
    { order: 32, code: 'JON', name: 'Jonah', testament: 'OT', genre: 'Minor Prophets', words: 1015 },
    { order: 33, code: 'MIC', name: 'Micah', testament: 'OT', genre: 'Minor Prophets', words: 2246 },
    { order: 34, code: 'NAM', name: 'Nahum', testament: 'OT', genre: 'Minor Prophets', words: 888 },
    { order: 35, code: 'HAB', name: 'Habakkuk', testament: 'OT', genre: 'Minor Prophets', words: 1085 },
    { order: 36, code: 'ZEP', name: 'Zephaniah', testament: 'OT', genre: 'Minor Prophets', words: 1144 },
    { order: 37, code: 'HAG', name: 'Haggai', testament: 'OT', genre: 'Minor Prophets', words: 789 },
    { order: 38, code: 'ZEC', name: 'Zechariah', testament: 'OT', genre: 'Minor Prophets', words: 4399 },
    { order: 39, code: 'MAL', name: 'Malachi', testament: 'OT', genre: 'Minor Prophets', words: 1331 },
    { order: 40, code: 'MAT', name: 'Matthew', testament: 'NT', genre: 'Gospels', words: 18572 },
    { order: 41, code: 'MRK', name: 'Mark', testament: 'NT', genre: 'Gospels', words: 11836 },
    { order: 42, code: 'LUK', name: 'Luke', testament: 'NT', genre: 'Gospels', words: 20048 },
    { order: 43, code: 'JHN', name: 'John', testament: 'NT', genre: 'Gospels', words: 15288 },
    { order: 44, code: 'ACT', name: 'Acts', testament: 'NT', genre: 'History', words: 19137 },
    { order: 45, code: 'ROM', name: 'Romans', testament: 'NT', genre: 'Pauline Epistles', words: 7528 },
    { order: 46, code: '1CO', name: '1 Corinthians', testament: 'NT', genre: 'Pauline Epistles', words: 7299 },
    { order: 47, code: '2CO', name: '2 Corinthians', testament: 'NT', genre: 'Pauline Epistles', words: 4751 },
    { order: 48, code: 'GAL', name: 'Galatians', testament: 'NT', genre: 'Pauline Epistles', words: 2558 },
    { order: 49, code: 'EPH', name: 'Ephesians', testament: 'NT', genre: 'Pauline Epistles', words: 2561 },
    { order: 50, code: 'PHP', name: 'Philippians', testament: 'NT', genre: 'Pauline Epistles', words: 1836 },
    { order: 51, code: 'COL', name: 'Colossians', testament: 'NT', genre: 'Pauline Epistles', words: 1680 },
    { order: 52, code: '1TH', name: '1 Thessalonians', testament: 'NT', genre: 'Pauline Epistles', words: 1574 },
    { order: 53, code: '2TH', name: '2 Thessalonians', testament: 'NT', genre: 'Pauline Epistles', words: 890 },
    { order: 54, code: '1TI', name: '1 Timothy', testament: 'NT', genre: 'Pauline Epistles', words: 1984 },
    { order: 55, code: '2TI', name: '2 Timothy', testament: 'NT', genre: 'Pauline Epistles', words: 1386 },
    { order: 56, code: 'TIT', name: 'Titus', testament: 'NT', genre: 'Pauline Epistles', words: 806 },
    { order: 57, code: 'PHM', name: 'Philemon', testament: 'NT', genre: 'Pauline Epistles', words: 393 },
    { order: 58, code: 'HEB', name: 'Hebrews', testament: 'NT', genre: 'General Epistles', words: 5737 },
    { order: 59, code: 'JAS', name: 'James', testament: 'NT', genre: 'General Epistles', words: 1895 },
    { order: 60, code: '1PE', name: '1 Peter', testament: 'NT', genre: 'General Epistles', words: 1969 },
    { order: 61, code: '2PE', name: '2 Peter', testament: 'NT', genre: 'General Epistles', words: 1292 },
    { order: 62, code: '1JN', name: '1 John', testament: 'NT', genre: 'General Epistles', words: 1874 },
    { order: 63, code: '2JN', name: '2 John', testament: 'NT', genre: 'General Epistles', words: 245 },
    { order: 64, code: '3JN', name: '3 John', testament: 'NT', genre: 'General Epistles', words: 271 },
    { order: 65, code: 'JUD', name: 'Jude', testament: 'NT', genre: 'General Epistles', words: 518 },
    { order: 66, code: 'REV', name: 'Revelation', testament: 'NT', genre: 'Apocalypse', words: 8719 }
];

const BOOK_CODE_MAP = Object.fromEntries(BIBLE_BOOKS.map(b => [b.code, b]));

const BOOK_ALIASES = {
    'gen': 'GEN', 'genesis': 'GEN', 'ge': 'GEN', 'gn': 'GEN',
    'exo': 'EXO', 'exodus': 'EXO', 'ex': 'EXO',
    'lev': 'LEV', 'leviticus': 'LEV', 'lv': 'LEV',
    'num': 'NUM', 'numbers': 'NUM', 'nm': 'NUM',
    'deu': 'DEU', 'deuteronomy': 'DEU', 'dt': 'DEU',
    'jos': 'JOS', 'joshua': 'JOS', 'josh': 'JOS',
    'jdg': 'JDG', 'judges': 'JDG', 'judg': 'JDG',
    'rut': 'RUT', 'ruth': 'RUT', 'rth': 'RUT',
    '1sa': '1SA', '1samuel': '1SA', '1sam': '1SA', '1s': '1SA',
    '2sa': '2SA', '2samuel': '2SA', '2sam': '2SA', '2s': '2SA',
    '1ki': '1KI', '1kings': '1KI', '1kgs': '1KI', '1k': '1KI',
    '2ki': '2KI', '2kings': '2KI', '2kgs': '2KI', '2k': '2KI',
    '1ch': '1CH', '1chronicles': '1CH', '1chron': '1CH',
    '2ch': '2CH', '2chronicles': '2CH', '2chron': '2CH',
    'ezr': 'EZR', 'ezra': 'EZR',
    'neh': 'NEH', 'nehemiah': 'NEH',
    'est': 'EST', 'esther': 'EST',
    'job': 'JOB',
    'psa': 'PSA', 'psalms': 'PSA', 'psalm': 'PSA', 'ps': 'PSA', 'pss': 'PSA',
    'pro': 'PRO', 'proverbs': 'PRO', 'prv': 'PRO', 'pr': 'PRO',
    'ecc': 'ECC', 'ecclesiastes': 'ECC', 'eccl': 'ECC',
    'sng': 'SNG', 'songofsolomon': 'SNG', 'songofsongs': 'SNG', 'song': 'SNG', 'sos': 'SNG', 'canticles': 'SNG',
    'isa': 'ISA', 'isaiah': 'ISA', 'is': 'ISA',
    'jer': 'JER', 'jeremiah': 'JER', 'jr': 'JER',
    'lam': 'LAM', 'lamentations': 'LAM',
    'ezk': 'EZK', 'ezekiel': 'EZK', 'ezek': 'EZK',
    'dan': 'DAN', 'daniel': 'DAN', 'dn': 'DAN',
    'hos': 'HOS', 'hosea': 'HOS',
    'jol': 'JOL', 'joel': 'JOL',
    'amo': 'AMO', 'amos': 'AMO',
    'oba': 'OBA', 'obadiah': 'OBA',
    'jon': 'JON', 'jonah': 'JON',
    'mic': 'MIC', 'micah': 'MIC',
    'nam': 'NAM', 'nahum': 'NAM', 'nah': 'NAM',
    'hab': 'HAB', 'habakkuk': 'HAB',
    'zep': 'ZEP', 'zephaniah': 'ZEP',
    'hag': 'HAG', 'haggai': 'HAG',
    'zec': 'ZEC', 'zechariah': 'ZEC',
    'mal': 'MAL', 'malachi': 'MAL',
    'mat': 'MAT', 'matthew': 'MAT', 'matt': 'MAT', 'mt': 'MAT',
    'mrk': 'MRK', 'mark': 'MRK', 'mk': 'MRK',
    'luk': 'LUK', 'luke': 'LUK', 'lk': 'LUK',
    'jhn': 'JHN', 'john': 'JHN', 'jn': 'JHN',
    'act': 'ACT', 'acts': 'ACT', 'ac': 'ACT',
    'rom': 'ROM', 'romans': 'ROM', 'rm': 'ROM',
    '1co': '1CO', '1corinthians': '1CO', '1cor': '1CO',
    '2co': '2CO', '2corinthians': '2CO', '2cor': '2CO',
    'gal': 'GAL', 'galatians': 'GAL', 'gl': 'GAL',
    'eph': 'EPH', 'ephesians': 'EPH',
    'php': 'PHP', 'philippians': 'PHP', 'phil': 'PHP',
    'col': 'COL', 'colossians': 'COL',
    '1th': '1TH', '1thessalonians': '1TH', '1thess': '1TH',
    '2th': '2TH', '2thessalonians': '2TH', '2thess': '2TH',
    '1ti': '1TI', '1timothy': '1TI', '1tim': '1TI',
    '2ti': '2TI', '2timothy': '2TI', '2tim': '2TI',
    'tit': 'TIT', 'titus': 'TIT', 'ti': 'TIT',
    'phm': 'PHM', 'philemon': 'PHM', 'phlm': 'PHM',
    'heb': 'HEB', 'hebrews': 'HEB',
    'jas': 'JAS', 'james': 'JAS', 'jm': 'JAS',
    '1pe': '1PE', '1peter': '1PE', '1pet': '1PE', '1pt': '1PE',
    '2pe': '2PE', '2peter': '2PE', '2pet': '2PE', '2pt': '2PE',
    '1jn': '1JN', '1john': '1JN', '1j': '1JN',
    '2jn': '2JN', '2john': '2JN', '2j': '2JN',
    '3jn': '3JN', '3john': '3JN', '3j': '3JN',
    'jud': 'JUD', 'jude': 'JUD', 'jd': 'JUD',
    'rev': 'REV', 'revelation': 'REV', 'apocalypse': 'REV', 'rv': 'REV'
};

const LANDMARK_VERSES = [
    'GEN 1:1', 'EXO 3:14', 'DEU 6:4', 'JOS 1:9', 'PSA 1:1', 'PSA 119:105',
    'PRO 3:5', 'ECC 3:1', 'ISA 9:6', 'ISA 40:29', 'ISA 53:5', 'JER 29:11',
    'MIC 6:8', 'HAB 2:4', 'MAT 5:3', 'MAT 28:19', 'MRK 10:45', 'LUK 2:14',
    'JHN 1:1', 'JHN 3:16', 'ACT 1:8', 'ROM 8:28', 'ROM 12:2', '1CO 13:4',
    '2CO 5:17', 'GAL 5:22', 'EPH 2:8', 'PHP 4:13', 'COL 1:16', 'HEB 11:1',
    'HEB 12:2', 'JAS 1:22', '1PE 5:7', '1JN 4:8', 'REV 21:4', 'REV 22:13'
];

function formatVerseRef(ref) {
    if (!ref) return '';
    let [code, cv] = ref.split(' ');
    let b = BOOK_CODE_MAP[code];
    return b ? `${b.name} ${cv}` : ref;
}

function getVerseGenre(ref) {
    if (!ref) return 'General';
    let [code] = ref.split(' ');
    let b = BOOK_CODE_MAP[code];
    return b ? b.genre : 'General';
}

function getVerseTestament(ref) {
    if (!ref) return 'NT';
    let [code] = ref.split(' ');
    let b = BOOK_CODE_MAP[code];
    return b ? b.testament : 'NT';
}

class BibleWordMap extends HTMLElement {
    constructor() {
        super();
        this.data2d = null;
        this.verses = null;
        this.wordToVerses = null;
        this.booksData = null;
        this.selectedBook = null;
        this.searchedBooks = [];
        this.drawerBooks = [];
        this.versemapData = null;
        this.versemapLookup = new Map();
        this.verseTextMap = new Map();
        this.verseViewMode = 'refs';
        this.searchedVerses = [];
        this.selectedVerse = null;
        this.drawerVerses = [];
        this.viewMode = 'words';
        this.testamentFilter = 'all';
        this.isSearchMode = false;
        this.searchedWords = [];
        this.nodes = [];
        this.links = [];
        this.transform = d3.zoomIdentity;
        this.hoveredNode = null;
        this.tooltipTimeout = null;
        this.simulation = null;
        this.neighborsPerKeyword = 100;
        
        this.innerHTML = `
            <style>
                bible-word-map {
                    display: block;
                    width: 100%;
                    height: 100%;
                    --bwm-bg: #ffffff;
                    --bwm-input-bg: #f9fafb;
                    --bwm-input-focus-bg: #ffffff;
                    --bwm-btn-bg: #f9fafb;
                    --bwm-btn-hover: #e5e7eb;
                    --bwm-text: #333333;
                    --bwm-text-muted: #666666;
                    --bwm-border: #e5e7eb;
                    --bwm-badge-bg: rgba(0, 0, 0, 0.05);
                    --bwm-node-default: #888888;
                    --bwm-node-kw: #d32f2f;
                    --bwm-node-hover: #2563eb;
                    --bwm-link-direct: rgba(40, 167, 69, 0.6);
                    --bwm-link-indirect: rgba(150, 150, 150, 0.2);
                    --bwm-tooltip-link: #2563eb;
                    --bwm-font: system-ui, -apple-system, sans-serif;
                }
                @media (prefers-color-scheme: dark) {
                    bible-word-map {
                        --bwm-bg: #121212;
                        --bwm-input-bg: #1e1e1e;
                        --bwm-input-focus-bg: #161b22;
                        --bwm-btn-bg: #21262d;
                        --bwm-btn-hover: #30363d;
                        --bwm-text: #e0e0e0;
                        --bwm-text-muted: #8b949e;
                        --bwm-border: #333333;
                        --bwm-badge-bg: rgba(255, 255, 255, 0.08);
                        --bwm-node-default: #999999;
                        --bwm-tooltip-link: #60a5fa;
                    }
                }
                .bwm-container {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    height: 100%;
                    position: relative;
                    overflow: hidden;
                    flex: 1;
                    min-height: 0;
                    min-width: 0;
                    font-family: var(--bwm-font);
                    color: var(--bwm-text);
                }
                .bwm-top-bar {
                    display: flex;
                    justify-content: space-between;
                    gap: 10px;
                    padding-bottom: 12px;
                    flex-wrap: nowrap;
                }
                .bwm-search-controls {
                    display: flex;
                    gap: 8px;
                    flex-wrap: nowrap;
                    flex: 1;
                }
                .bwm-search-input-wrapper {
                    position: relative;
                    display: flex;
                    flex: 1;
                    align-items: center;
                }
                .bwm-search-controls input {
                    width: 100%;
                    box-sizing: border-box;
                    padding: 8px 36px 8px 16px;
                    border: 1px solid var(--bwm-border);
                    border-radius: 20px;
                    background: var(--bwm-input-bg);
                    color: var(--bwm-text);
                    outline: none;
                    font-family: var(--bwm-font);
                    font-size: 16px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.02) inset;
                }
                .bwm-search-clear {
                    position: absolute;
                    right: 10px;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    border: none;
                    background: var(--bwm-border);
                    color: var(--bwm-text-muted);
                    font-size: 14px;
                    line-height: 1;
                    display: none;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    padding: 0;
                    transition: background 0.15s, color 0.15s;
                    user-select: none;
                }
                .bwm-search-clear:hover {
                    background: var(--bwm-node-kw);
                    color: #ffffff;
                }
                .bwm-search-clear.visible {
                    display: flex;
                }
                .bwm-search-controls input::placeholder {
                    color: var(--bwm-text-muted);
                    opacity: 0.8;
                }
                .bwm-search-controls input:focus {
                    border-color: var(--bwm-node-hover);
                    background: var(--bwm-input-focus-bg);
                    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
                }
                .bwm-btn {
                    padding: 8px 20px;
                    border: 1px solid var(--bwm-border);
                    border-radius: 20px;
                    background: var(--bwm-btn-bg);
                    color: var(--bwm-text);
                    cursor: pointer;
                    font-weight: 600;
                    transition: all 0.2s;
                    font-family: var(--bwm-font);
                    box-shadow: 0 2px 5px rgba(0,0,0,0.04);
                }
                .bwm-btn:hover {
                    background: var(--bwm-btn-hover);
                }
                .bwm-btn.active {
                    background: var(--bwm-node-hover);
                    color: white;
                    border-color: var(--bwm-node-hover);
                }
                .bwm-error {
                    color: #d32f2f;
                    font-size: 0.9rem;
                    display: none;
                    align-items: center;
                }
                .bwm-canvas-container {
                    flex: 1;
                    position: relative;
                    border: 1px solid var(--bwm-border);
                    border-radius: 8px;
                    overflow: hidden;
                    background: var(--bwm-bg);
                    min-height: 0;
                    min-width: 0;
                }
                canvas {
                    width: 100%;
                    height: 100%;
                    display: block;
                    cursor: grab;
                }
                canvas:active {
                    cursor: grabbing;
                }
                .bwm-tooltip {
                    position: absolute;
                    background-color: rgba(255, 255, 255, 0.85); /* fallback */
                    background-color: color-mix(in srgb, var(--bwm-bg) 85%, transparent);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    color: var(--bwm-text);
                    padding: 10px 14px;
                    border-radius: 8px;
                    border: 1px solid var(--bwm-border);
                    pointer-events: none;
                    opacity: 0;
                    transition: opacity 0.1s;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    font-size: 0.9em;
                    line-height: 1.4;
                    max-width: 300px;
                    z-index: 9999;
                }
                .bwm-radial-menu {
                    position: absolute;
                    pointer-events: none;
                    z-index: 10000;
                }
                .bwm-radial-item {
                    position: absolute;
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    background: rgba(26, 26, 26, 0.85);
                    color: #ffffff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    pointer-events: auto;
                    font-size: 18px;
                    font-weight: bold;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                    transition: transform 0.15s ease-out, opacity 0.15s ease-out;
                    transform: scale(0);
                    opacity: 0;
                    user-select: none;
                    -webkit-user-select: none;
                }
                .bwm-radial-item.visible {
                    transform: scale(1);
                    opacity: 1;
                }
                .bwm-radial-item:hover {
                    background: rgba(51, 51, 51, 0.9);
                    transform: scale(1.15);
                }
                .bwm-radial-item:active {
                    transform: scale(0.95);
                }
                .bwm-radial-label {
                    position: absolute;
                    top: -22px;
                    left: 50%;
                    transform: translateX(-50%);
                    white-space: nowrap;
                    font-size: 11px;
                    font-weight: 600;
                    color: #ffffff;
                    background: rgba(0, 0, 0, 0.75);
                    padding: 2px 6px;
                    border-radius: 4px;
                    pointer-events: none;
                    opacity: 0;
                    transition: opacity 0.15s;
                }
                .bwm-radial-item:hover .bwm-radial-label {
                    opacity: 1;
                }
                .bwm-verses-pane {
                    display: none;
                }
                .bwm-verses-pane.active {
                    display: block;
                }
                .bwm-drawer-toggle {
                    width: 36px;
                    height: 36px;
                    border-radius: 8px;
                    background: var(--bwm-btn-bg);
                    color: var(--bwm-text);
                    border: 1px solid var(--bwm-border);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
                    flex-shrink: 0;
                    margin-right: 2px;
                }
                .bwm-drawer-toggle:hover {
                    background: var(--bwm-btn-hover);
                }
                .bwm-drawer-toggle.active {
                    background: var(--bwm-node-hover);
                    color: #ffffff;
                    border-color: var(--bwm-node-hover);
                }
                .bwm-drawer {
                    position: absolute;
                    top: 48px;
                    bottom: 0;
                    left: -320px;
                    width: 300px;
                    height: auto;
                    background-color: rgba(255, 255, 255, 0.85); /* fallback for older browsers */
                    background-color: color-mix(in srgb, var(--bwm-bg) 85%, transparent);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border: 1px solid var(--bwm-border);
                    border-left: none;
                    border-radius: 0 10px 10px 0;
                    box-shadow: 4px 4px 15px rgba(0,0,0,0.1);
                    z-index: 1000;
                    transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    display: flex;
                    flex-direction: column;
                }
                .bwm-drawer.open {
                    left: 0;
                }
                .bwm-drawer-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 15px 20px;
                    border-bottom: 1px solid var(--bwm-border);
                }
                .bwm-drawer-header h3 {
                    margin: 0;
                    font-size: 1.1em;
                }
                .bwm-drawer-close {
                    cursor: pointer;
                    font-size: 1.5em;
                    line-height: 1;
                    opacity: 0.6;
                }
                .bwm-drawer-close:hover {
                    opacity: 1;
                }
                .bwm-drawer-content {
                    padding: 20px;
                    overflow-y: auto;
                    flex: 1;
                }
                .bwm-drawer-section {
                    margin-bottom: 24px;
                }
                .bwm-drawer-section-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 10px;
                }
                .bwm-drawer-section-header h4, .bwm-drawer-section h4 {
                    margin: 0;
                    font-size: 0.85em;
                    text-transform: uppercase;
                    color: var(--bwm-text-muted);
                    letter-spacing: 0.5px;
                }
                .bwm-btn-clear-all {
                    background: transparent;
                    border: 1px solid var(--bwm-border);
                    color: var(--bwm-text-muted);
                    border-radius: 12px;
                    font-size: 0.75em;
                    font-weight: 600;
                    padding: 3px 8px;
                    cursor: pointer;
                    transition: all 0.15s;
                    font-family: var(--bwm-font);
                    display: none;
                }
                .bwm-btn-clear-all:hover {
                    background: var(--bwm-node-kw);
                    border-color: var(--bwm-node-kw);
                    color: #ffffff;
                }
                .bwm-btn-clear-all.visible {
                    display: block;
                }
                .bwm-slider-container {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-top: 10px;
                }
                .bwm-slider-container input[type="range"] {
                    flex: 1;
                    cursor: pointer;
                    accent-color: var(--bwm-node-hover);
                }
                .bwm-slider-value {
                    min-width: 32px;
                    text-align: center;
                    font-weight: 600;
                    font-size: 0.9em;
                    padding: 2px 6px;
                    background: var(--bwm-btn-bg);
                    border: 1px solid var(--bwm-border);
                    border-radius: 6px;
                    color: var(--bwm-text);
                }
                .bwm-drawer-hint {
                    font-size: 0.8em;
                    color: var(--bwm-text-muted);
                    margin-top: 6px;
                    line-height: 1.35;
                }
                .bwm-pill-group {
                    display: flex;
                    gap: 6px;
                    margin-top: 10px;
                    flex-wrap: wrap;
                }
                .bwm-pill-btn {
                    flex: 1 1 calc(50% - 6px);
                    padding: 7px 8px;
                    font-size: 0.8em;
                    font-weight: 500;
                    border-radius: 8px;
                    border: 1px solid var(--bwm-border);
                    background: var(--bwm-btn-bg);
                    color: var(--bwm-text);
                    cursor: pointer;
                    transition: all 0.15s ease;
                    font-family: var(--bwm-font);
                    text-align: center;
                }
                .bwm-pill-btn:hover {
                    background: var(--bwm-btn-hover);
                }
                .bwm-pill-btn.active {
                    background: var(--bwm-node-hover);
                    color: #ffffff;
                    border-color: var(--bwm-node-hover);
                    font-weight: 600;
                }
                .bwm-active-word-item {
                    display: flex;
                    align-items: center;
                    margin-bottom: 8px;
                    font-size: 0.95em;
                }
                .bwm-active-word-item input {
                    margin-right: 8px;
                    cursor: pointer;
                    accent-color: var(--bwm-node-hover);
                }
                .bwm-empty-state {
                    color: var(--bwm-text-muted);
                    font-size: 0.9em;
                    font-style: italic;
                }
                .bwm-loading {
                    position: absolute;
                    top: 50%; left: 50%;
                    transform: translate(-50%, -50%);
                    background-color: rgba(255, 255, 255, 0.92);
                    background-color: color-mix(in srgb, var(--bwm-bg) 92%, transparent);
                    backdrop-filter: blur(16px);
                    -webkit-backdrop-filter: blur(16px);
                    color: var(--bwm-text);
                    border: 1px solid var(--bwm-border);
                    padding: 14px 18px 12px 18px;
                    border-radius: 16px;
                    box-shadow: 0 12px 36px rgba(0,0,0,0.18);
                    z-index: 100;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    width: 320px;
                    max-width: calc(100% - 30px);
                    box-sizing: border-box;
                    user-select: none;
                    pointer-events: none;
                }
                .bwm-loading-visual {
                    position: relative;
                    width: 280px;
                    height: 160px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .bwm-loading-canvas {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 280px;
                    height: 160px;
                    border-radius: 10px;
                }
                .bwm-loading-tip-container {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    pointer-events: none;
                    padding: 0 15px;
                    box-sizing: border-box;
                    z-index: 2;
                }
                .bwm-loading-tip {
                    font-size: 0.92em;
                    font-weight: 600;
                    text-align: center;
                    line-height: 1.35;
                    color: var(--bwm-text);
                    background-color: rgba(255, 255, 255, 0.9);
                    background-color: color-mix(in srgb, var(--bwm-bg) 90%, transparent);
                    padding: 8px 14px;
                    border-radius: 12px;
                    border: 1px solid var(--bwm-border);
                    box-shadow: 0 4px 16px rgba(0,0,0,0.12);
                    opacity: 0;
                    transform: scale(0.85);
                    transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                .bwm-loading-tip.visible {
                    opacity: 1;
                    transform: scale(1);
                }
                .bwm-loading-status {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    margin-top: 8px;
                    font-size: 0.85em;
                    color: var(--bwm-text-muted);
                    font-weight: 500;
                }
                .bwm-loading-spinner {
                    width: 13px;
                    height: 13px;
                    border: 2px solid var(--bwm-border);
                    border-top-color: var(--bwm-node-hover);
                    border-radius: 50%;
                    animation: bwm-spin 0.8s linear infinite;
                }
                @keyframes bwm-spin {
                    to { transform: rotate(360deg); }
                }
                /* ==========================================================================
                   Foundational Info Window Design System (Shared Across All Info Windows)
                   ========================================================================== */

                /* 1. Base Info Window Card (Right Drawer on Desktop) */
                .bwm-window-card {
                    position: absolute;
                    top: 48px;
                    bottom: 0;
                    right: 0;
                    width: 440px;
                    max-width: calc(100% - 40px);
                    height: auto;
                    max-height: none;
                    background-color: rgba(255, 255, 255, 0.95);
                    background-color: color-mix(in srgb, var(--bwm-bg) 95%, transparent);
                    backdrop-filter: blur(16px);
                    -webkit-backdrop-filter: blur(16px);
                    border-top: 1px solid var(--bwm-border);
                    border-left: 1px solid var(--bwm-border);
                    border-right: none;
                    border-bottom: none;
                    border-radius: 12px 0 0 0;
                    box-shadow: -6px 0 24px rgba(0, 0, 0, 0.16);
                    color: var(--bwm-text);
                    font-family: var(--bwm-font);
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    box-sizing: border-box;
                    z-index: 10020;
                    transform: translateX(105%);
                    opacity: 0;
                    pointer-events: none;
                    transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease;
                }
                .bwm-window-card.visible {
                    transform: translateX(0);
                    opacity: 1;
                    pointer-events: auto;
                }

                .bwm-word-pane {
                    display: flex;
                    flex-direction: column;
                    flex: 1;
                    min-height: 0;
                    overflow: hidden;
                }
                .bwm-canon-subtabs {
                    display: flex;
                    gap: 6px;
                    padding: 10px 16px 6px 16px;
                    border-bottom: 1px solid var(--bwm-border);
                    background: color-mix(in srgb, var(--bwm-bg) 96%, transparent);
                    flex-shrink: 0;
                    overflow-x: auto;
                    scrollbar-width: none;
                }
                .bwm-canon-subtabs::-webkit-scrollbar {
                    display: none;
                }

                /* 3. Mobile Bottom Sheet Handle */
                .bwm-sheet-handle {
                    display: none;
                }

                /* 4. Shared Header */
                .bwm-window-header {
                    padding: 12px 16px;
                    border-bottom: 1px solid var(--bwm-border);
                    background: color-mix(in srgb, var(--bwm-bg) 98%, transparent);
                    flex-shrink: 0;
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    box-sizing: border-box;
                }
                .bwm-window-header-top {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    gap: 12px;
                }
                .bwm-window-title-group {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    flex-wrap: wrap;
                    min-width: 0;
                }
                .bwm-window-title {
                    margin: 0;
                    font-size: 1.2em;
                    font-weight: 700;
                    color: var(--bwm-text);
                    line-height: 1.25;
                }
                .bwm-window-subtitle {
                    font-size: 0.82em;
                    color: var(--bwm-text-muted);
                    margin-top: 2px;
                    line-height: 1.35;
                }
                .bwm-window-subtitle-inline {
                    font-size: 0.84em;
                    color: var(--bwm-text-muted);
                }

                /* 5. Shared Badges */
                .bwm-window-badge {
                    display: inline-flex;
                    align-items: center;
                    font-size: 0.74em;
                    font-weight: 700;
                    letter-spacing: 0.3px;
                    padding: 2px 8px;
                    border-radius: 12px;
                    color: #ffffff;
                    background: var(--bwm-node-hover);
                }
                .bwm-window-badge-muted {
                    display: inline-flex;
                    align-items: center;
                    font-size: 0.74em;
                    font-weight: 500;
                    background: var(--bwm-badge-bg);
                    color: var(--bwm-text);
                    border: 1px solid var(--bwm-border);
                    padding: 2px 7px;
                    border-radius: 10px;
                }

                /* 6. Shared Close Button */
                .bwm-window-close {
                    background: transparent;
                    border: none;
                    font-size: 1.4em;
                    line-height: 1;
                    cursor: pointer;
                    opacity: 0.55;
                    color: var(--bwm-text);
                    padding: 3px 6px;
                    border-radius: 6px;
                    flex-shrink: 0;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    transition: opacity 0.15s, background-color 0.15s;
                }
                .bwm-window-close:hover {
                    opacity: 1;
                    background: var(--bwm-badge-bg);
                }

                /* 7. Shared Tabs Bar */
                .bwm-window-tabs {
                    display: flex;
                    gap: 6px;
                    padding: 0 16px;
                    border-bottom: 1px solid var(--bwm-border);
                    background: color-mix(in srgb, var(--bwm-bg) 95%, transparent);
                    overflow-x: auto;
                    scrollbar-width: none;
                    flex-shrink: 0;
                }
                .bwm-window-tabs::-webkit-scrollbar {
                    display: none;
                }
                .bwm-window-tab {
                    background: transparent;
                    border: none;
                    border-bottom: 2px solid transparent;
                    padding: 9px 12px;
                    font-size: 0.86em;
                    font-weight: 600;
                    color: var(--bwm-text-muted);
                    cursor: pointer;
                    white-space: nowrap;
                    font-family: var(--bwm-font);
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    transition: color 0.15s, border-color 0.15s;
                }
                .bwm-window-tab:hover {
                    color: var(--bwm-text);
                }
                .bwm-window-tab.active {
                    color: var(--bwm-node-hover);
                    border-bottom-color: var(--bwm-node-hover);
                }

                /* 8. Shared Body Area */
                .bwm-window-body {
                    padding: 14px 16px;
                    overflow-y: auto;
                    flex: 1;
                    min-height: 0;
                    scrollbar-width: thin;
                    scrollbar-color: var(--bwm-border) transparent;
                    -webkit-overflow-scrolling: touch;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }

                /* 9. Shared Pill Filters and Action Buttons */
                .bwm-window-pill {
                    background: var(--bwm-btn-bg);
                    border: 1px solid var(--bwm-border);
                    color: var(--bwm-text-muted);
                    padding: 5px 12px;
                    border-radius: 12px;
                    cursor: pointer;
                    font-size: 0.85em;
                    font-family: var(--bwm-font);
                    font-weight: 500;
                    transition: all 0.15s ease;
                }
                .bwm-window-pill:hover {
                    background: var(--bwm-btn-hover);
                    color: var(--bwm-text);
                }
                .bwm-window-pill.active {
                    background: var(--bwm-node-hover);
                    color: #ffffff;
                    border-color: var(--bwm-node-hover);
                    font-weight: 600;
                }



                /* Book Card Internal Elements */
                .bwm-book-chip-list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 6px;
                    margin-top: 4px;
                }
                .bwm-book-chip {
                    display: inline-flex;
                    align-items: center;
                    gap: 4px;
                    background: color-mix(in srgb, var(--bwm-btn-bg) 90%, var(--bwm-text) 10%);
                    border: 1px solid var(--bwm-border);
                    border-radius: 6px;
                    padding: 3px 8px;
                    font-size: 0.82em;
                    cursor: pointer;
                    color: var(--bwm-text);
                    transition: background 0.15s, border-color 0.15s;
                }
                .bwm-book-chip:hover {
                    border-color: var(--bwm-node-hover);
                    background: color-mix(in srgb, var(--bwm-node-hover) 15%, var(--bwm-bg) 85%);
                }
                .bwm-book-chip-group {
                    display: inline-flex;
                    align-items: stretch;
                    border: 1px solid var(--bwm-border);
                    border-radius: 6px;
                    overflow: hidden;
                    background: color-mix(in srgb, var(--bwm-btn-bg) 90%, var(--bwm-text) 10%);
                }
                .bwm-book-chip-group:hover {
                    border-color: var(--bwm-node-hover);
                }
                .bwm-chip-add {
                    background: color-mix(in srgb, var(--bwm-btn-bg) 75%, var(--bwm-text) 25%);
                    border: none;
                    border-left: 1px solid var(--bwm-border);
                    padding: 0 7px;
                    cursor: pointer;
                    color: var(--bwm-text);
                    font-size: 0.9em;
                    display: flex;
                    align-items: center;
                    transition: background 0.15s;
                }
                .bwm-chip-add:hover {
                    background: var(--bwm-node-hover);
                    color: #ffffff;
                }
                .bwm-book-card-actions {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 10px;
                    margin-top: 4px;
                    padding-top: 10px;
                    border-top: 1px solid var(--bwm-border);
                    flex-shrink: 0;
                }
                .bwm-book-card-reopen {
                    position: absolute;
                    top: 14px;
                    right: 14px;
                    z-index: 990;
                    display: none;
                    align-items: center;
                    gap: 6px;
                    padding: 6px 13px;
                    background-color: rgba(255, 255, 255, 0.92);
                    background-color: color-mix(in srgb, var(--bwm-bg) 92%, transparent);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border: 1px solid var(--bwm-border);
                    border-radius: 20px;
                    color: var(--bwm-text);
                    font-size: 0.85em;
                    font-weight: 600;
                    cursor: pointer;
                    box-shadow: 0 4px 14px rgba(0,0,0,0.15);
                    transition: all 0.2s ease;
                }
                .bwm-book-card-reopen:hover {
                    background-color: var(--bwm-btn-bg);
                    transform: translateY(-1px);
                    box-shadow: 0 6px 18px rgba(0,0,0,0.2);
                }
                .bwm-book-card-reopen-icon {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 17px;
                    height: 17px;
                    border-radius: 50%;
                    background: var(--bwm-node-hover);
                    color: #ffffff;
                    font-size: 0.75em;
                    font-weight: bold;
                    font-family: serif;
                    font-style: italic;
                }

                /* Verses Internal Elements */
                .bwm-verses-content {
                    line-height: 1.5;
                    display: block;
                }

                /* Canon Usage Internal Elements */
                .bwm-canon-controls {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 8px 10px;
                    margin-bottom: 12px;
                    flex-wrap: wrap;
                    font-size: 0.82em;
                }
                .bwm-canon-filter-group {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                }
                .bwm-canon-pill-btn {
                    padding: 3px 9px;
                    font-size: 0.88em;
                    border-radius: 10px;
                }
                .bwm-canon-list {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                }
                .bwm-canon-row {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 5px 8px;
                    border-radius: 6px;
                    transition: background-color 0.12s ease;
                }
                .bwm-canon-row:hover {
                    background: var(--bwm-badge-bg);
                }
                .bwm-canon-row-book {
                    width: 130px;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 0.86em;
                    flex-shrink: 0;
                }
                .bwm-canon-row-order {
                    font-family: monospace;
                    font-size: 0.8em;
                    color: var(--bwm-text-muted);
                    width: 18px;
                    text-align: right;
                }
                .bwm-canon-row-name {
                    font-weight: 600;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .bwm-canon-row-genre-dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    flex-shrink: 0;
                }
                .bwm-canon-row-track {
                    flex: 1;
                    height: 14px;
                    background: var(--bwm-badge-bg);
                    border-radius: 7px;
                    overflow: hidden;
                    position: relative;
                }
                .bwm-canon-row-fill {
                    height: 100%;
                    border-radius: 7px;
                    transition: width 0.35s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .bwm-canon-row-stats {
                    min-width: 90px;
                    width: auto;
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    gap: 4px;
                    font-size: 0.82em;
                    flex-shrink: 0;
                    font-variant-numeric: tabular-nums;
                    white-space: nowrap;
                }
                .bwm-canon-row-count {
                    font-weight: 700;
                    color: var(--bwm-text);
                }
                .bwm-canon-row-pct {
                    color: var(--bwm-text-muted);
                    font-size: 0.9em;
                }
                .bwm-canon-genre-card {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                    padding: 8px 10px;
                    background: var(--bwm-badge-bg);
                    border: 1px solid var(--bwm-border);
                    border-radius: 8px;
                    margin-bottom: 8px;
                }
                .bwm-canon-genre-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 0.86em;
                }
                .bwm-canon-genre-title {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-weight: 600;
                }
                .bwm-canon-genre-pill {
                    padding: 2px 7px;
                    border-radius: 10px;
                    font-size: 0.75em;
                    font-weight: 700;
                    color: #ffffff;
                }
                .bwm-canon-genre-meta {
                    font-size: 0.82em;
                    color: var(--bwm-text-muted);
                }
                .bwm-canon-genre-bar-wrap {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                .bwm-canon-genre-track {
                    flex: 1;
                    height: 16px;
                    background: rgba(0, 0, 0, 0.08);
                    border-radius: 8px;
                    overflow: hidden;
                }
                .bwm-canon-genre-fill {
                    height: 100%;
                    border-radius: 8px;
                    transition: width 0.35s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .bwm-canon-genre-stat {
                    font-size: 0.86em;
                    font-weight: 700;
                    min-width: 90px;
                    text-align: right;
                    font-variant-numeric: tabular-nums;
                }
                .bwm-canon-testament-layout {
                    display: flex;
                    gap: 20px;
                    align-items: center;
                    justify-content: center;
                    padding: 10px 0;
                    flex-wrap: wrap;
                }
                .bwm-canon-donut-wrap {
                    position: relative;
                    width: 160px;
                    height: 160px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }
                .bwm-canon-cards-col {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    flex: 1;
                    min-width: 240px;
                }
                .bwm-canon-testament-card {
                    padding: 12px 14px;
                    border-radius: 10px;
                    border: 1px solid var(--bwm-border);
                    background: var(--bwm-badge-bg);
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                }
                .bwm-canon-testament-head {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .bwm-canon-testament-tag {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-weight: 700;
                    font-size: 0.9em;
                }
                .bwm-canon-testament-dot {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                }
                .bwm-canon-testament-val {
                    font-weight: 700;
                    font-size: 1.05em;
                    font-variant-numeric: tabular-nums;
                }
                .bwm-canon-testament-desc {
                    font-size: 0.82em;
                    color: var(--bwm-text-muted);
                    line-height: 1.4;
                }

                /* Verse Mode Controls and Inspector */
                .bwm-verse-mode-floater {
                    position: absolute;
                    top: 14px;
                    right: 14px;
                    z-index: 15;
                    display: flex;
                    gap: 6px;
                    background: var(--bwm-bg);
                    padding: 4px;
                    border-radius: 16px;
                    border: 1px solid var(--bwm-border);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
                }
                .bwm-verse-text-box {
                    font-size: 0.95em;
                    line-height: 1.55;
                    color: var(--bwm-text);
                    background: var(--bwm-badge-bg);
                    border-left: 3px solid var(--bwm-node-hover);
                    padding: 10px 14px;
                    border-radius: 6px;
                    margin-bottom: 14px;
                }
                .bwm-crossref-list {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
                .bwm-crossref-card {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                    padding: 9px 12px;
                    border-radius: 8px;
                    background: var(--bwm-input-bg);
                    border: 1px solid var(--bwm-border);
                    transition: background 0.15s ease, border-color 0.15s ease;
                }
                .bwm-crossref-card:hover {
                    background: var(--bwm-badge-bg);
                    border-color: var(--bwm-node-hover);
                }
                .bwm-crossref-head {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 8px;
                }
                .bwm-crossref-title-wrap {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }
                .bwm-crossref-ref {
                    font-weight: 700;
                    font-size: 0.9em;
                    color: var(--bwm-text);
                    cursor: pointer;
                }
                .bwm-crossref-ref:hover {
                    color: var(--bwm-node-hover);
                }
                .bwm-crossref-badge {
                    font-size: 0.76em;
                    font-weight: 600;
                    padding: 2px 7px;
                    border-radius: 10px;
                    background: rgba(16, 185, 129, 0.15);
                    color: #10b981;
                    font-variant-numeric: tabular-nums;
                }
                .bwm-crossref-snippet {
                    font-size: 0.82em;
                    color: var(--bwm-text-muted);
                    line-height: 1.42;
                }

                /* Mobile Bottom Sheet Unification Across ALL Windows */
                @media (max-width: 768px) {
                    .bwm-sheet-handle {
                        display: block;
                        width: 44px;
                        height: 5px;
                        border-radius: 3px;
                        background: var(--bwm-border);
                        margin: 10px auto 4px auto;
                        opacity: 0.85;
                        flex-shrink: 0;
                        cursor: grab;
                        position: relative;
                        touch-action: none;
                        transition: background-color 0.15s, opacity 0.15s;
                    }
                    .bwm-sheet-handle::before {
                        content: '';
                        position: absolute;
                        top: -12px;
                        bottom: -12px;
                        left: -24px;
                        right: -24px;
                    }
                    .bwm-sheet-handle:active {
                        cursor: grabbing;
                        opacity: 1;
                        background: var(--bwm-node-hover);
                    }

                    .bwm-window-card {
                        top: auto !important;
                        bottom: 0 !important;
                        left: 0 !important;
                        right: 0 !important;
                        width: 100% !important;
                        max-width: 100% !important;
                        max-height: min(78vh, calc(100% - 16px)) !important;
                        height: auto !important;
                        border-radius: 16px 16px 0 0 !important;
                        border-top: 1px solid var(--bwm-border) !important;
                        border-bottom: none !important;
                        border-left: none !important;
                        border-right: none !important;
                        box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.35) !important;
                        transform: translateY(105%);
                        opacity: 0;
                        pointer-events: none;
                        transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease;
                    }

                    .bwm-window-card.visible {
                        transform: translateY(0);
                        opacity: 1;
                        pointer-events: auto;
                    }

                    .bwm-book-card-reopen {
                        top: 12px;
                        right: 12px;
                        padding: 6px 11px;
                        font-size: 0.8em;
                    }

                    .bwm-canon-row-book {
                        width: 105px;
                    }

                    .bwm-canon-testament-layout {
                        flex-direction: column;
                    }
                }
            </style>
            <div class="bwm-container">
                <div class="bwm-top-bar">
                    <div class="bwm-drawer-toggle" id="bwm-drawer-toggle">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                    </div>
                    <div class="bwm-search-controls">
                        <div class="bwm-search-input-wrapper">
                            <input type="text" id="bwm-search" placeholder="Search for words (e.g. Father Son Spirit)">
                            <button class="bwm-search-clear" id="bwm-search-clear" title="Clear all keywords" type="button">&times;</button>
                        </div>
                        <button class="bwm-btn" id="bwm-btn-search">Search</button>
                    </div>
                </div>
                <div style="position: relative; height: 0;"><span id="bwm-error" class="bwm-error" style="position: absolute; top: -10px; left: 50px;">Word not found</span></div>
                <div class="bwm-drawer" id="bwm-drawer">
                    <div class="bwm-drawer-header">
                        <h3>Options</h3>
                        <div class="bwm-drawer-close" id="bwm-drawer-close">&times;</div>
                    </div>
                    <div class="bwm-drawer-content">
                        <div class="bwm-drawer-section">
                            <div class="bwm-drawer-section-header">
                                <h4 id="bwm-active-heading">Active Words</h4>
                                <button class="bwm-btn-clear-all" id="bwm-btn-clear-all" type="button" title="Clear all active keywords">Clear All</button>
                            </div>
                            <div id="bwm-active-words">
                                <div class="bwm-empty-state">No words selected.</div>
                            </div>
                        </div>
                        <div class="bwm-drawer-section">
                            <div class="bwm-drawer-section-header">
                                <h4 id="bwm-neighbor-heading">Relationships per Word</h4>
                                <span id="bwm-neighbor-value">100</span>
                            </div>
                            <div class="bwm-slider-container">
                                <input type="range" id="bwm-neighbor-slider" min="10" max="250" step="5" value="100">
                            </div>
                            <div class="bwm-drawer-hint" id="bwm-neighbor-hint">Controls how many related words appear around each keyword.</div>
                        </div>
                        <div class="bwm-drawer-section">
                            <div class="bwm-drawer-section-header">
                                <h4>Testament Filter</h4>
                            </div>
                            <div class="bwm-pill-group" id="bwm-testament-filter">
                                <button type="button" class="bwm-pill-btn active" data-testament="all">All</button>
                                <button type="button" class="bwm-pill-btn" data-testament="ot">Old Testament</button>
                                <button type="button" class="bwm-pill-btn" data-testament="nt">New Testament</button>
                                <button type="button" class="bwm-pill-btn" data-testament="both">Both Only</button>
                            </div>
                            <div class="bwm-drawer-hint">Highlight words by presence in Old or New Testament.</div>
                        </div>
                    </div>
                </div>
                <div class="bwm-canvas-container">
                    <canvas></canvas>
                    <div class="bwm-tooltip"></div>
                    <div class="bwm-loading">
                        <div class="bwm-loading-visual">
                            <canvas class="bwm-loading-canvas"></canvas>
                            <div class="bwm-loading-tip-container">
                                <div class="bwm-loading-tip"></div>
                            </div>
                        </div>
                        <div class="bwm-loading-status">
                            <span class="bwm-loading-spinner"></span>
                            <span id="bwm-loading-text">Loading Bible Word Map...</span>
                        </div>
                    </div>
                    <button type="button" class="bwm-book-card-reopen" id="bwm-book-card-reopen" style="display: none;" title="View book details">
                        <span class="bwm-book-card-reopen-icon">i</span>
                        <span class="bwm-book-card-reopen-text">Book Info</span>
                    </button>
                    <button type="button" class="bwm-book-card-reopen" id="bwm-verse-card-reopen" style="display: none;" title="View verse details">
                        <span class="bwm-book-card-reopen-icon">📖</span>
                        <span class="bwm-book-card-reopen-text">Verse Info</span>
                    </button>
                    <div class="bwm-verse-mode-floater" id="bwm-verse-mode-floater" style="display: none;">
                        <button type="button" class="bwm-window-pill active" id="bwm-btn-mode-refs" title="View semantic cross-reference network">🔗 Cross-References</button>
                        <button type="button" class="bwm-window-pill" id="bwm-btn-mode-words" title="View constituent word constellation">✦ Words</button>
                    </div>
                </div>
                <div class="bwm-radial-menu" id="bwm-radial-menu"></div>
                <div class="bwm-window-card bwm-word-card" id="bwm-word-card"></div>
                <div class="bwm-window-card bwm-book-card" id="bwm-book-card"></div>
                <div class="bwm-window-card bwm-verse-card" id="bwm-verse-card"></div>
            </div>
        `;
    }

    connectedCallback() {
        this.src2d = this.getAttribute('src-2d');
        this.srcVerses = this.getAttribute('src-verses');
        this.srcBooks = this.getAttribute('src-books') || 'data/output/bookmap_2d.json';
        this.srcVersemap = this.getAttribute('src-versemap') || 'data/output/versemap_2d.json';
        
        this.canvas = this.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.tooltip = this.querySelector('.bwm-tooltip');
        this.loading = this.querySelector('.bwm-loading');
        this.loadingText = this.querySelector('#bwm-loading-text');
        this.loadingCanvas = this.querySelector('.bwm-loading-canvas');
        this.loadingTip = this.querySelector('.bwm-loading-tip');
        this.bookCard = this.querySelector('#bwm-book-card');
        this.wordCard = this.querySelector('#bwm-word-card');
        this.verseCard = this.querySelector('#bwm-verse-card');
        if (this.wordCard) {
            this.wordCard.addEventListener('click', (e) => e.stopPropagation());
            this.wordCard.addEventListener('pointerdown', (e) => e.stopPropagation());
            this.wordCard.addEventListener('mousedown', (e) => e.stopPropagation());
            this.setupMobileSwipeToDismiss(this.wordCard, () => this.hideWordInspector());
        }
        if (this.bookCard) {
            this.bookCard.addEventListener('click', (e) => e.stopPropagation());
            this.bookCard.addEventListener('pointerdown', (e) => e.stopPropagation());
            this.bookCard.addEventListener('mousedown', (e) => e.stopPropagation());
            this.setupMobileSwipeToDismiss(this.bookCard, () => this.hideBookCard());
        }
        if (this.verseCard) {
            this.verseCard.addEventListener('click', (e) => e.stopPropagation());
            this.verseCard.addEventListener('pointerdown', (e) => e.stopPropagation());
            this.verseCard.addEventListener('mousedown', (e) => e.stopPropagation());
            this.setupMobileSwipeToDismiss(this.verseCard, () => this.hideVerseCard());
        }
        this.reopenBtn = this.querySelector('#bwm-book-card-reopen');
        if (this.reopenBtn) {
            this.reopenBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                let target = this.selectedBook;
                if (!target && this.searchedBooks && this.searchedBooks.length > 0 && this.booksData) {
                    target = this.booksData.books.find(b => b.code === this.searchedBooks[0]);
                }
                if (target) {
                    let activeBooks = (this.searchedBooks && this.searchedBooks.length > 0)
                        ? this.searchedBooks.map(c => this.booksData ? this.booksData.books.find(b => b.code === c) : null).filter(Boolean)
                        : [target];
                    this.showBookCard(target, activeBooks);
                }
            });
            this.reopenBtn.addEventListener('pointerdown', (e) => e.stopPropagation());
            this.reopenBtn.addEventListener('mousedown', (e) => e.stopPropagation());
            this.reopenBtn.addEventListener('touchstart', (e) => e.stopPropagation(), { passive: true });
        }
        this.verseReopenBtn = this.querySelector('#bwm-verse-card-reopen');
        if (this.verseReopenBtn) {
            this.verseReopenBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                let target = this.selectedVerse;
                if (!target && this.searchedVerses && this.searchedVerses.length > 0 && this.versemapLookup) {
                    target = this.versemapLookup.get(this.searchedVerses[0]);
                }
                if (target) {
                    let activeVerses = (this.searchedVerses && this.searchedVerses.length > 0)
                        ? this.searchedVerses.map(vId => this.versemapLookup ? this.versemapLookup.get(vId) : null).filter(Boolean)
                        : [target];
                    this.showVerseCard(target, activeVerses);
                }
            });
            this.verseReopenBtn.addEventListener('pointerdown', (e) => e.stopPropagation());
            this.verseReopenBtn.addEventListener('mousedown', (e) => e.stopPropagation());
            this.verseReopenBtn.addEventListener('touchstart', (e) => e.stopPropagation(), { passive: true });
        }
        this.verseModeFloater = this.querySelector('#bwm-verse-mode-floater');
        const btnModeRefs = this.querySelector('#bwm-btn-mode-refs');
        const btnModeWords = this.querySelector('#bwm-btn-mode-words');
        if (btnModeRefs) {
            btnModeRefs.addEventListener('click', (e) => {
                e.stopPropagation();
                this.setVerseViewMode('refs');
            });
        }
        if (btnModeWords) {
            btnModeWords.addEventListener('click', (e) => {
                e.stopPropagation();
                this.setVerseViewMode('words');
            });
        }
        
        this.searchInput = this.querySelector('#bwm-search');
        this.searchClearBtn = this.querySelector('#bwm-search-clear');
        this.searchBtn = this.querySelector('#bwm-btn-search');
        this.errorSpan = this.querySelector('#bwm-error');
        
        this.drawerClearAllBtn = this.querySelector('#bwm-btn-clear-all');
        this.neighborSlider = this.querySelector('#bwm-neighbor-slider');
        this.neighborValue = this.querySelector('#bwm-neighbor-value');
        
        this.setupEvents();
        this.loadData();
    }
    
    updateColors() {
        const styles = getComputedStyle(this);
        this.colors = {
            bg: styles.getPropertyValue('--bwm-bg').trim() || '#ffffff',
            text: styles.getPropertyValue('--bwm-text').trim() || '#333333',
            nodeDef: styles.getPropertyValue('--bwm-node-default').trim() || '#888888',
            nodeKw: styles.getPropertyValue('--bwm-node-kw').trim() || '#d32f2f',
            nodeHover: styles.getPropertyValue('--bwm-node-hover').trim() || '#2563eb',
            linkDir: styles.getPropertyValue('--bwm-link-direct').trim() || 'rgba(40, 167, 69, 0.6)',
            linkIndir: styles.getPropertyValue('--bwm-link-indirect').trim() || 'rgba(150, 150, 150, 0.2)',
            font: styles.getPropertyValue('--bwm-font').trim() || 'sans-serif'
        };
    }

    setupEvents() {
        // Search
        this.searchBtn.addEventListener('click', () => this.searchWord());
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.searchWord();
        });
        this.searchInput.addEventListener('input', () => {
            this.updateClearBtnVisibility();
        });
        
        if (this.searchClearBtn) {
            this.searchClearBtn.addEventListener('click', () => {
                this.clearAllKeywords();
            });
        }
        
        if (this.drawerClearAllBtn) {
            this.drawerClearAllBtn.addEventListener('click', () => {
                this.clearAllKeywords();
            });
        }
        
        if (this.neighborSlider) {
            this.neighborSlider.addEventListener('input', (e) => {
                const val = parseInt(e.target.value, 10);
                this.neighborsPerKeyword = val;
                if (this.neighborValue) this.neighborValue.textContent = val;
            });
            this.neighborSlider.addEventListener('change', () => {
                // Dynamically re-compute and update if search mode is active
                if (this.viewMode === 'books') {
                    if (this.isSearchMode && this.searchedBooks && this.searchedBooks.length > 0) {
                        this.searchBooks(true);
                    }
                } else if (this.viewMode === 'verses') {
                    if (this.isSearchMode && this.searchedVerses && this.searchedVerses.length > 0) {
                        this.searchVerses(true);
                    }
                } else {
                    if (this.isSearchMode && this.searchedWords && this.searchedWords.length > 0) {
                        this.searchWord(true);
                    }
                }
            });
        }

        const testamentPills = this.querySelectorAll('#bwm-testament-filter .bwm-pill-btn');
        testamentPills.forEach(btn => {
            btn.addEventListener('click', () => {
                testamentPills.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.testamentFilter = btn.getAttribute('data-testament') || 'all';
                this.draw();
            });
        });

        // Canvas interactivity
        new ResizeObserver(() => this.resize()).observe(this.canvas.parentElement);
        
        this.zoom = d3.zoom()
            .scaleExtent([0.05, 100000])
            .on("zoom", (e) => {
                if (e.sourceEvent) {
                    this.userInteracted = true;
                    if (this.radialMenuNode) this.hideRadialMenu();
                    if (this.versesPanel && this.versesPanel.classList.contains('visible')) this.hideVersesPanel();
                }
                this.transform = e.transform;
                this.draw();
            });
            
        // Radial menu handlers
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e), {capture: true});
        this.canvas.addEventListener('click', (e) => this.handleClick(e), {capture: true});
        this.canvas.addEventListener('mouseleave', () => {
            if (!this.radialMenuNode) {
                this.hoveredNode = null;
                this.canvas.style.cursor = 'grab';
                this.draw();
            }
        }, {capture: true});
        
        this.radialMenu = this.querySelector('#bwm-radial-menu');
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (this.closeActiveInfoWindows()) {
                    e.stopPropagation();
                }
            }
        });
        this.radialMenuNode = null;
        this.canvas.addEventListener('touchstart', (e) => {
            this.isTouch = true;
            this.ignoreNextClick = false;
            this.lastTouchStartTime = Date.now();
            let menuWasVisible = this.radialMenuNode !== null;
            let wordWasVisible = this.wordCard && this.wordCard.classList.contains('visible');
            if (menuWasVisible) {
                this.touchCloseTooltip = true;
                this.hideRadialMenu();
            }
            if (wordWasVisible && window.innerWidth <= 768) {
                this.touchCloseTooltip = true;
                this.hideWordInspector();
            }
            
            if (e.touches && e.touches.length > 1) {
                if (this.touchTimer) {
                    clearTimeout(this.touchTimer);
                    this.touchTimer = null;
                    this.touchTargetNode = null;
                }
                return;
            }
            
            if (e.touches && e.touches.length > 0) {
                let touch = e.touches[0];
                let rect = this.canvas.getBoundingClientRect();
                let mouseX = touch.clientX - rect.left;
                let mouseY = touch.clientY - rect.top;
                
                this.lastTouchX = touch.clientX;
                this.lastTouchY = touch.clientY;
                
                let [logicalX, logicalY] = this.transform.invert([mouseX, mouseY]);
                let searchRadius = 30 / this.transform.k; // slightly larger radius for fat fingers
                let minDist = Infinity;
                let closestNode = null;
                
                if (this.nodes) {
                    for (let n of this.nodes) {
                        let dx = n.x - logicalX;
                        let dy = n.y - logicalY;
                        let dist = Math.sqrt(dx*dx + dy*dy);
                        if (dist < searchRadius && dist < minDist) {
                            minDist = dist;
                            closestNode = n;
                        }
                    }
                }
                
                this.touchTargetNode = closestNode;
                
                if (closestNode) {
                    this.touchTimer = setTimeout(() => {
                        this.touchTimer = null;
                        this.hoveredNode = closestNode;
                        this.showRadialMenu(closestNode, mouseX, mouseY);
                        this.draw();
                        this.ignoreNextClick = true;
                    }, 500);
                }
            }
        }, {passive: true, capture: true});
        
        this.canvas.addEventListener('touchmove', (e) => {
            if (this.touchTimer && e.touches && e.touches.length > 0) {
                let dx = e.touches[0].clientX - this.lastTouchX;
                let dy = e.touches[0].clientY - this.lastTouchY;
                // Allow a small fat-finger wobble without cancelling the tap
                if (Math.abs(dx) > 10 || Math.abs(dy) > 10 || e.touches.length > 1) {
                    clearTimeout(this.touchTimer);
                    this.touchTimer = null;
                    this.touchTargetNode = null;
                }
            }
        }, {passive: true, capture: true});
        
        this.canvas.addEventListener('touchend', () => {
            this.lastTouchEndTime = Date.now();
            if (this.touchTimer) {
                clearTimeout(this.touchTimer);
                this.touchTimer = null;
                // If it was a short tap, the simulated click event will fire.
                // We set the hoveredNode so handleClick can process the additive search!
                if (this.touchTargetNode) {
                    this.hoveredNode = this.touchTargetNode;
                } else {
                    this.hoveredNode = null;
                }
            }
        }, {passive: true, capture: true});
        
        // Bind D3 zoom LAST so our capture events fire first
        d3.select(this.canvas).call(this.zoom);
        
        this.drawerToggle = this.querySelector('#bwm-drawer-toggle');
        this.drawer = this.querySelector('#bwm-drawer');
        this.drawerClose = this.querySelector('#bwm-drawer-close');
        
        this.drawerToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = this.drawer.classList.toggle('open');
            this.drawerToggle.classList.toggle('active', isOpen);
        });
        
        this.drawerClose.addEventListener('click', () => {
            this.drawer.classList.remove('open');
            this.drawerToggle.classList.remove('active');
        });
        
        // Close radial menu, word card, book card, and drawer when clicking outside
        document.addEventListener('click', (e) => {
            let isMenuVisible = this.radialMenuNode !== null;
            let isWordVisible = this.wordCard && this.wordCard.classList.contains('visible');
            let isBookVisible = this.bookCard && this.bookCard.classList.contains('visible');
            let isVerseVisible = this.verseCard && this.verseCard.classList.contains('visible');
            
            if (isMenuVisible || isWordVisible || isBookVisible || isVerseVisible) {
                let insideWord = this.wordCard && this.wordCard.contains(e.target);
                let insideBook = this.bookCard && this.bookCard.contains(e.target);
                let insideVerse = this.verseCard && this.verseCard.contains(e.target);
                let insideMenu = this.radialMenu && this.radialMenu.contains(e.target);
                let insideCanvas = this.canvas && this.canvas.contains(e.target);
                let insideReopen = this.reopenBtn && this.reopenBtn.contains(e.target);
                let insideVerseReopen = this.verseReopenBtn && this.verseReopenBtn.contains(e.target);
                let insideFloater = this.verseModeFloater && this.verseModeFloater.contains(e.target);
                
                if (!insideWord && !insideBook && !insideVerse && !insideMenu && !insideCanvas && !insideReopen && !insideVerseReopen && !insideFloater) {
                    this.hideRadialMenu();
                    this.closeActiveInfoWindows();
                }
            }
            
            if (this.drawer && this.drawer.classList.contains('open')) {
                if (!this.drawer.contains(e.target) && !this.drawerToggle.contains(e.target)) {
                    this.drawer.classList.remove('open');
                    this.drawerToggle.classList.remove('active');
                }
            }
        });
    }

    resize() {
        let rect = this.canvas.parentElement.getBoundingClientRect();
        let dpr = window.devicePixelRatio || 1;
        
        let oldW = this.logicalWidth || rect.width;
        let oldH = this.logicalHeight || rect.height;
        
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        this.ctx.scale(dpr, dpr);
        
        this.logicalWidth = rect.width;
        this.logicalHeight = rect.height;
        
        // Re-center the transform by the delta change in the canvas size
        if (this.transform && (oldW !== rect.width || oldH !== rect.height)) {
            let dx = (rect.width - oldW) / 2;
            let dy = (rect.height - oldH) / 2;
            
            // translate() operates in scaled coordinates, so we divide by k
            this.transform = this.transform.translate(dx / this.transform.k, dy / this.transform.k);
            d3.select(this.canvas).call(this.zoom.transform, this.transform);
        }
        
        this.draw();
    }

    async loadData() {
        let params = new URLSearchParams(window.location.search);
        let view = params.get('view');
        let books = params.get('books');
        let verses = params.get('verses');
        let keywords = params.get('keywords');
        let isVersesInit = (view === 'verses' || Boolean(verses));
        let isBooksInit = !isVersesInit && (view === 'books' || Boolean(books));

        const wordsBtn = document.getElementById('view-mode-words');
        const booksBtn = document.getElementById('view-mode-books');
        const versesBtn = document.getElementById('view-mode-verses');

        if (isVersesInit) {
            if (wordsBtn && booksBtn && versesBtn) {
                wordsBtn.classList.remove('active');
                booksBtn.classList.remove('active');
                versesBtn.classList.add('active');
            }
            this.viewMode = 'verses';
            this.showLoading('Loading Biblical Verses & Cross-References...', 'verses');
        } else if (isBooksInit) {
            if (wordsBtn && booksBtn && versesBtn) {
                wordsBtn.classList.remove('active');
                booksBtn.classList.add('active');
                versesBtn.classList.remove('active');
            }
            this.viewMode = 'books';
            this.showLoading('Loading Biblical Books & Themes...', 'books');
        } else {
            if (wordsBtn && booksBtn && versesBtn) {
                wordsBtn.classList.add('active');
                booksBtn.classList.remove('active');
                versesBtn.classList.remove('active');
            }
            this.showLoading('Loading Bible Word Map...', 'words');
        }

        // Fetch datasets concurrently
        this.booksPromise = this.srcBooks ? fetch(this.srcBooks).then(r => {
            if (!r.ok) throw new Error(`HTTP ${r.status}`);
            return r.json();
        }).catch(err => {
            console.warn("Could not load bookmap data", err);
            return null;
        }) : Promise.resolve(null);

        this.versesPromise = this.srcVerses ? fetch(this.srcVerses).then(r => {
            if (!r.ok) throw new Error(`HTTP ${r.status}`);
            return r.json();
        }).catch(err => {
            console.warn("Could not load verses data", err);
            return null;
        }) : Promise.resolve(null);

        this.data2dPromise = this.src2d ? fetch(this.src2d).then(r => {
            if (!r.ok) throw new Error(`HTTP ${r.status}`);
            return r.json();
        }).catch(err => {
            console.error("Could not load wordmap data", err);
            return null;
        }) : Promise.resolve(null);

        this.versemapPromise = this.srcVersemap ? fetch(this.srcVersemap).then(r => {
            if (!r.ok) throw new Error(`HTTP ${r.status}`);
            return r.json();
        }).catch(err => {
            console.warn("Could not load versemap data", err);
            return null;
        }) : Promise.resolve(null);

        this.booksPromise.then(data => {
            if (data) this.booksData = data;
        });

        this.versesPromise.then(vData => {
            if (vData) {
                this.verses = vData.verses;
                this.wordToVerses = vData.words;
                if (vData.verses && !this.verseTextMap.size) {
                    for (let i = 0; i < vData.verses.length; i++) {
                        let str = vData.verses[i];
                        let pipeIdx = str.indexOf('|');
                        if (pipeIdx !== -1) {
                            this.verseTextMap.set(str.slice(0, pipeIdx), str.slice(pipeIdx + 1));
                        }
                    }
                }
            }
        });

        this.versemapPromise.then(data => {
            if (data && data.verses) {
                this.versemapData = data;
                this.versemapLookup = new Map(data.verses.map(v => [v.id, v]));
            }
        });

        this.data2dPromise.then(d2d => {
            if (d2d) this.data2d = d2d;
        });

        try {
            if (isVersesInit) {
                this.versemapData = await this.versemapPromise;
                if (this.versemapData && this.versemapData.verses) {
                    this.versemapLookup = new Map(this.versemapData.verses.map(v => [v.id, v]));
                }
                const vData = await this.versesPromise;
                if (vData && vData.verses) {
                    this.verses = vData.verses;
                    this.wordToVerses = vData.words;
                    for (let i = 0; i < vData.verses.length; i++) {
                        let str = vData.verses[i];
                        let pipeIdx = str.indexOf('|');
                        if (pipeIdx !== -1) {
                            this.verseTextMap.set(str.slice(0, pipeIdx), str.slice(pipeIdx + 1));
                        }
                    }
                }
                if (this.viewMode !== 'verses') {
                    return;
                }
                this.hideLoading();

                this.setViewMode('verses', true);
                if (verses) {
                    let parsed = this.parseVerseQuery(verses);
                    if (parsed.length > 0) {
                        this.searchedVerses = parsed;
                        this.drawerVerses = [...this.searchedVerses];
                        this.searchVerses(true);
                    } else {
                        this.buildVersesGraph();
                    }
                } else {
                    this.buildVersesGraph();
                }
            } else if (isBooksInit) {
                this.booksData = await this.booksPromise;
                if (this.viewMode !== 'books') {
                    return;
                }
                this.hideLoading();

                this.setViewMode('books', true);
                if (books) {
                    this.searchedBooks = books.split(',').map(b => b.trim().toUpperCase()).filter(b => b);
                    this.drawerBooks = [...this.searchedBooks];
                    this.searchBooks(true);
                }
            } else {
                this.data2d = await this.data2dPromise;
                const vData = await this.versesPromise;
                if (vData) {
                    this.verses = vData.verses;
                    this.wordToVerses = vData.words;
                }

                if (this.viewMode !== 'words') {
                    if (this.booksData || this.versemapData) {
                        this.hideLoading();
                    }
                    return;
                }
                this.hideLoading();

                if (keywords) {
                    this.searchedWords = keywords.split(',').map(k => k.trim()).filter(k => k);
                    this.drawerWords = [...this.searchedWords];
                    if (this.searchedWords.length > 0) {
                        let baseWords = [...new Set(this.searchedWords.map(id => {
                            let parts = id.split('_');
                            return this.formatWord(parts[0], parts[1]);
                        }))];
                        this.searchInput.value = baseWords.join(" ");
                        this.searchWord(true);
                    } else {
                        this.buildAllWordsGraph();
                    }
                } else {
                    this.buildAllWordsGraph();
                }
            }
        } catch (e) {
            console.error("Error loading Bible Word Map data", e);
            this.hideLoading();
        }
    }

    cosineSimilarity(a, b) {
        let dot = 0, normA = 0, normB = 0;
        for (let i = 0; i < a.length; i++) {
            dot += a[i] * b[i];
            normA += a[i] * a[i];
            normB += b[i] * b[i];
        }
        if (normA === 0 || normB === 0) return 0;
        return dot / (Math.sqrt(normA) * Math.sqrt(normB));
    }

    getBookVerses(wordId, bookCode) {
        if (!this.wordToVerses || !this.verses || !wordId || !bookCode) return [];
        let vIds = this.wordToVerses[wordId] || [];
        let prefix = bookCode.toUpperCase() + ' ';
        return vIds.filter(vid => (this.verses[vid] || '').startsWith(prefix));
    }

    wordAppearsInBook(wordId, bookCode) {
        return this.getBookVerses(wordId, bookCode).length > 0;
    }

    async searchWord(useExplicitIds = false) {
        this.hoveredNode = null;
        let foundPoints = [];
        
        if (this.viewMode === 'books') {
            this.searchBooks(useExplicitIds);
            return;
        }
        if (this.viewMode === 'verses') {
            this.searchVerses(useExplicitIds);
            return;
        }
        
        if (!useExplicitIds) {
            let originalQuery = this.searchInput.value.trim();
            let query = originalQuery.toLowerCase();
            if (!query) {
                this.clearAllKeywords();
                return;
            }

            let words = query.toLowerCase().split(/[\s,]+/).filter(w => w);
            this.searchedWords = [];
            
            for (let w of words) {
                let exactMatch = this.data2d.filter(d => d.id.toLowerCase() === w);
                if (exactMatch.length > 0) {
                    foundPoints.push(...exactMatch);
                    this.searchedWords.push(...exactMatch.map(p => p.id));
                    continue;
                }
                
                let matchingPoints = this.data2d.filter(d => d.w.toLowerCase() === w);
                if (matchingPoints.length > 0) {
                    foundPoints.push(...matchingPoints);
                    this.searchedWords.push(...matchingPoints.map(p => p.id));
                }
            }
            this.drawerWords = [...this.searchedWords];
        } else {
            // Use explicit IDs already set in this.searchedWords
            if (this.searchedWords.length === 0) {
                this.clearAllKeywords();
                return;
            }
            this.searchedWords.forEach(id => {
                let p = this.data2d.find(d => d.id === id);
                if (p) foundPoints.push(p);
            });
        }
        
        this.updateClearBtnVisibility();
        
        if (foundPoints.length === 0) {
            this.errorSpan.style.display = 'flex';
            this.errorSpan.textContent = 'None of the words were found.';
            setTimeout(() => this.errorSpan.style.display = 'none', 3000);
            return;
        }

        let topWordsSet = new Map();

        foundPoints.forEach((p) => {
            if (!topWordsSet.has(p.id)) {
                topWordsSet.set(p.id, { point: p, maxSim: 1, sourceKw: p.id });
            }
        });

        const limit = this.neighborsPerKeyword || 100;
        foundPoints.forEach(primaryPoint => {
            let similarities = this.data2d.map(d => ({
                point: d,
                sim: this.cosineSimilarity(primaryPoint.v, d.v)
            }));
            
            similarities.sort((a, b) => b.sim - a.sim);
            
            const topWords = similarities.slice(0, limit);
            topWords.forEach(s => {
                if (!topWordsSet.has(s.point.id)) {
                    topWordsSet.set(s.point.id, { point: s.point, maxSim: s.sim, sourceKw: primaryPoint.id });
                } else {
                    let existing = topWordsSet.get(s.point.id);
                    if (s.sim > existing.maxSim) {
                        existing.maxSim = s.sim;
                        existing.sourceKw = primaryPoint.id;
                    }
                }
            });
        });

        let finalTopWords = Array.from(topWordsSet.values());
        
        this.allSearchNodes = finalTopWords.map(s => ({
            id: s.point.id,
            w: s.point.w,
            pos: s.point.pos,
            t: s.point.t,
            f: s.point.f,
            sim: s.maxSim,
            sourceKw: s.sourceKw,
            isKw: this.searchedWords.includes(s.point.id),
            x: 0,
            y: 0,
            original: s.point.original,
            v: s.point.v
        }));

        this.allSearchLinks = [];
        this.allSearchNodes.forEach(n => {
            if (n.isKw || !n.sourceKw) return;
            
            let myVerses = this.wordToVerses ? (this.wordToVerses[n.id] || []) : [];
            let linkedToSourceKw = false;
            
            this.searchedWords.forEach(sw => {
                let swVerses = this.wordToVerses ? (this.wordToVerses[sw] || []) : [];
                let intersection = myVerses.filter(vId => swVerses.includes(vId));
                if (intersection.length > 0) {
                    this.allSearchLinks.push({
                        source: n.id,
                        target: sw,
                        type: 'direct',
                        intersection: intersection,
                        sim: n.sim
                    });
                    if (sw === n.sourceKw) linkedToSourceKw = true;
                }
            });
            
            if (!linkedToSourceKw) {
                this.allSearchLinks.push({
                    source: n.id,
                    target: n.sourceKw,
                    type: 'indirect',
                    sim: n.sim
                });
            }
        });

        // Normalize similarity to [0, 1] to maximize color and size contrast like Plotly did
        let minSim = d3.min(this.allSearchNodes.filter(n => !n.isKw), n => n.sim) || 0;
        let maxSim = d3.max(this.allSearchNodes.filter(n => !n.isKw), n => n.sim) || 1;
        this.allSearchNodes.forEach(n => {
            if (n.isKw) n.normSim = 1;
            else n.normSim = (n.sim - minSim) / (maxSim - minSim || 1);
        });

        this.isSearchMode = true;
        this.userInteracted = false;
        
        let baseWords = [...new Set(this.searchedWords.map(id => {
            let parts = id.split('_');
            return this.formatWord(parts[0], parts[1]);
        }))];
        this.searchInput.value = baseWords.join(" ");
        
        if (this.searchedWords && this.searchedWords.length > 0) {
            window.history.replaceState(null, '', '?keywords=' + this.searchedWords.join(','));
        }
        
        this.renderActiveWords();
        this.runSimulation();
    }
    updateClearBtnVisibility() {
        if (!this.searchClearBtn) return;
        const hasText = this.searchInput && this.searchInput.value.trim().length > 0;
        const hasKeywords = (this.viewMode === 'books')
            ? (this.searchedBooks && this.searchedBooks.length > 0)
            : (this.searchedWords && this.searchedWords.length > 0);
        if (hasText || hasKeywords) {
            this.searchClearBtn.classList.add('visible');
        } else {
            this.searchClearBtn.classList.remove('visible');
        }
    }

    clearAllKeywords() {
        if (this.viewMode === 'books') {
            this.resetBooksView();
            return;
        }
        if (this.viewMode === 'verses') {
            this.resetVersesView();
            return;
        }
        this.isSearchMode = false;
        this.searchedWords = [];
        this.drawerWords = [];
        this.searchedBooks = [];
        this.drawerBooks = [];
        this.searchedVerses = [];
        this.drawerVerses = [];
        this.selectedVerse = null;
        if (this.searchInput) this.searchInput.value = '';
        this.updateClearBtnVisibility();
        this.renderActiveWords();
        if (this.reopenBtn) this.reopenBtn.style.display = 'none';
        if (this.verseReopenBtn) this.verseReopenBtn.style.display = 'none';
        window.history.replaceState(null, '', window.location.pathname);
        this.hideRadialMenu();
        this.hideVersesPanel();
        this.hideCanonUsageModal();
        this.hideVerseCard();
        this.buildAllWordsGraph();
    }

    showLoading(text = 'Loading Bible Word Map...', type = 'words') {
        if (!this.loading) return;
        if (this.loadingText) {
            this.loadingText.textContent = text;
        } else {
            let el = this.querySelector('#bwm-loading-text') || this.querySelector('.bwm-loading-status span:last-child');
            if (el) el.textContent = text;
        }
        this.loading.style.display = 'flex';
        this.startLoadingAnimation(type);
    }

    hideLoading() {
        if (!this.loading) return;
        this.stopLoadingAnimation();
        this.loading.style.display = 'none';
    }

    formatWord(word, pos) {
        if (pos === 'PROPN' && word.length > 0) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }
        return word;
    }
    
    renderActiveWords() {
        const container = this.querySelector('#bwm-active-words');
        if (!container) return;

        if (this.viewMode === 'verses') {
            if (this.drawerClearAllBtn) {
                if (this.drawerVerses && this.drawerVerses.length > 0) {
                    this.drawerClearAllBtn.classList.add('visible');
                } else {
                    this.drawerClearAllBtn.classList.remove('visible');
                }
            }
            this.updateClearBtnVisibility();

            if (!this.drawerVerses || this.drawerVerses.length === 0) {
                container.innerHTML = '<div class="bwm-empty-state">No verses selected.</div>';
                return;
            }

            container.innerHTML = '';
            this.drawerVerses.forEach(ref => {
                let item = document.createElement('div');
                item.className = 'bwm-active-word-item';

                let cb = document.createElement('input');
                cb.type = 'checkbox';
                cb.checked = this.searchedVerses.includes(ref);
                cb.addEventListener('change', () => {
                    if (cb.checked) {
                        if (!this.searchedVerses.includes(ref)) this.searchedVerses.push(ref);
                    } else {
                        this.searchedVerses = this.searchedVerses.filter(x => x !== ref);
                    }
                    if (this.searchedVerses.length === 0) {
                        this.clearAllKeywords();
                    } else {
                        this.searchVerses(true);
                    }
                });

                let genre = getVerseGenre(ref);
                let genreColor = GENRE_COLORS[genre] || '#3b82f6';
                let formatted = formatVerseRef(ref);
                let label = document.createElement('label');
                label.style.cursor = 'pointer';
                label.innerHTML = `<strong>${formatted}</strong> <span class="bwm-book-badge" style="background:${genreColor};font-size:0.65em;padding:1px 5px;margin-left:4px;">${genre}</span>`;

                label.addEventListener('click', () => { cb.click(); });

                item.appendChild(cb);
                item.appendChild(label);
                container.appendChild(item);
            });
            return;
        }
        
        if (this.viewMode === 'books') {
            if (this.drawerClearAllBtn) {
                if (this.drawerBooks && this.drawerBooks.length > 0) {
                    this.drawerClearAllBtn.classList.add('visible');
                } else {
                    this.drawerClearAllBtn.classList.remove('visible');
                }
            }
            this.updateClearBtnVisibility();

            if (!this.drawerBooks || this.drawerBooks.length === 0) {
                container.innerHTML = '<div class="bwm-empty-state">No books selected.</div>';
                return;
            }

            container.innerHTML = '';
            this.drawerBooks.forEach(code => {
                let book = this.booksData ? this.booksData.books.find(b => b.code === code) : null;
                if (!book) return;

                let item = document.createElement('div');
                item.className = 'bwm-active-word-item';

                let cb = document.createElement('input');
                cb.type = 'checkbox';
                cb.checked = this.searchedBooks.includes(code);
                cb.addEventListener('change', () => {
                    if (cb.checked) {
                        if (!this.searchedBooks.includes(code)) this.searchedBooks.push(code);
                    } else {
                        this.searchedBooks = this.searchedBooks.filter(x => x !== code);
                    }
                    if (this.searchedBooks.length === 0) {
                        this.clearAllKeywords();
                    } else {
                        this.searchBooks(true);
                    }
                });

                let genreColor = GENRE_COLORS[book.genre] || '#3b82f6';
                let label = document.createElement('label');
                label.style.cursor = 'pointer';
                label.innerHTML = `<strong>${book.name}</strong> <span class="bwm-book-badge" style="background:${genreColor};font-size:0.65em;padding:1px 5px;margin-left:4px;">${book.genre}</span>`;

                label.addEventListener('click', () => { cb.click(); });

                item.appendChild(cb);
                item.appendChild(label);
                container.appendChild(item);
            });
            return;
        }

        if (this.drawerClearAllBtn) {
            if (this.drawerWords && this.drawerWords.length > 0) {
                this.drawerClearAllBtn.classList.add('visible');
            } else {
                this.drawerClearAllBtn.classList.remove('visible');
            }
        }
        
        this.updateClearBtnVisibility();
        
        if (!this.drawerWords || this.drawerWords.length === 0) {
            container.innerHTML = '<div class="bwm-empty-state">No words selected.</div>';
            return;
        }
        
        container.innerHTML = '';
        this.drawerWords.forEach(id => {
            let [w, pos] = id.split('_');
            let item = document.createElement('div');
            item.className = 'bwm-active-word-item';
            
            let cb = document.createElement('input');
            cb.type = 'checkbox';
            cb.checked = this.searchedWords.includes(id);
            cb.addEventListener('change', () => {
                if (cb.checked) {
                    if (!this.searchedWords.includes(id)) this.searchedWords.push(id);
                } else {
                    this.searchedWords = this.searchedWords.filter(x => x !== id);
                }
                // Trigger a re-search with the remaining explicit IDs
                let baseWords = [...new Set(this.searchedWords.map(id => {
                    let parts = id.split('_');
                    return this.formatWord(parts[0], parts[1]);
                }))];
                this.searchInput.value = baseWords.join(" ");
                this.searchWord(true); // pass flag to indicate explicit IDs
            });
            
            let label = document.createElement('label');
            label.style.cursor = 'pointer';
            let displayW = this.formatWord(w, pos);
            label.innerHTML = `<strong>${displayW}</strong> <span style="color:#888;font-size:0.85em;">(${pos})</span>`;
            
            // Allow clicking label to toggle checkbox
            label.addEventListener('click', () => { cb.click(); });
            
            item.appendChild(cb);
            item.appendChild(label);
            container.appendChild(item);
        });
    }

    runSimulation() {
        if (this.simulation) this.simulation.stop();
        if (this.spawnInterval) {
            clearInterval(this.spawnInterval);
            this.spawnInterval = null;
        }
        
        let kwNodes = this.allSearchNodes.filter(n => n.isKw);
        let otherNodes = this.allSearchNodes.filter(n => !n.isKw);
        
        // Sort other nodes by similarity descending
        otherNodes.sort((a, b) => b.sim - a.sim);
        
        // Let keywords freely float but gently pull them together and center them
        kwNodes.forEach(n => {
            n.x = (Math.random() - 0.5) * 20;
            n.y = (Math.random() - 0.5) * 20;
            delete n.fx;
            delete n.fy;
        });
        
        // Add kw-kw links based on true similarity
        for (let i = 0; i < kwNodes.length; i++) {
            for (let j = i + 1; j < kwNodes.length; j++) {
                let sim = this.cosineSimilarity(kwNodes[i].v, kwNodes[j].v);
                this.allSearchLinks.push({
                    source: kwNodes[i].id,
                    target: kwNodes[j].id,
                    type: 'kw-kw',
                    sim: sim
                });
            }
        }
        
        // We start simulation with ONLY keywords
        this.nodes = [...kwNodes];
        this.links = this.allSearchLinks.filter(l => l.type === 'kw-kw');
        
        let cw = this.logicalWidth || 800;
        let ch = this.logicalHeight || 600;
        
        this.transform = d3.zoomIdentity.translate(cw/2, ch/2).scale(1);
        d3.select(this.canvas).call(this.zoom.transform, this.transform);

        const LCG = d3.randomLcg(42); 
        
        this.simulation = d3.forceSimulation(this.nodes)
            .randomSource(LCG)
            .force("link", d3.forceLink(this.links).id(d => d.id).distance(d => {
                if (d.type === 'kw-kw') return Math.max(80, (1 - d.sim) * 400);
                return d.type === 'direct' ? Math.max(30, (1 - d.sim) * 150) : Math.max(60, (1 - d.sim) * 250);
            }).strength(d => d.type === 'kw-kw' ? 1.5 : 0.6))
            .force("charge", d3.forceManyBody().strength(-200))
            .force("collide", d3.forceCollide().radius(d => d.isKw ? 25 : 12))
            .force("center", d3.forceCenter(0, 0).strength(0.05))
            .on("tick", () => {
                this.updateDynamicZoom();
                this.draw();
            });
            
        this.pendingNodes = [];
        this.enqueueNodes(otherNodes);
    }
    
    enqueueNodes(nodesToSpawn) {
        if (!this.pendingNodes) this.pendingNodes = [];
        this.pendingNodes.push(...nodesToSpawn);
        this.pendingNodes.sort((a, b) => b.sim - a.sim);
        
        if (this.spawnInterval) return; // already running
        
        let batchSize = 3;
        this.spawnInterval = setInterval(() => {
            if (this.pendingNodes.length === 0) {
                clearInterval(this.spawnInterval);
                this.spawnInterval = null;
                return;
            }
            
            let batch = this.pendingNodes.splice(0, batchSize);
            
            batch.forEach(n => {
                let cw = this.logicalWidth || 800;
                let ch = this.logicalHeight || 600;
                let sourceNode = this.nodes.find(node => node.id === n.sourceKw);
                let startX = sourceNode ? sourceNode.x : this.transform.invertX(cw/2);
                let startY = sourceNode ? sourceNode.y : this.transform.invertY(ch/2);
                n.x = startX + (Math.random() - 0.5) * 12;
                n.y = startY + (Math.random() - 0.5) * 12;
                this.nodes.push(n);
                
                let nodeLinks = this.allSearchLinks.filter(l => l.source === n.id);
                this.links.push(...nodeLinks);
            });
            
            this.simulation.nodes(this.nodes);
            this.simulation.force("link").links(this.links);
            this.simulation.alpha(0.3).restart();
            
        }, 50); 
    }

    removeKeyword(oldWord) {
        if (!this.isSearchMode || !this.searchedWords.includes(oldWord)) return;
        
        this.searchedWords = this.searchedWords.filter(x => x !== oldWord);
        let baseWords = [...new Set(this.searchedWords.map(id => {
            let parts = id.split('_');
            return this.formatWord(parts[0], parts[1]);
        }))];
        this.searchInput.value = baseWords.join(" ");
        this.searchWord(true);
    }

    async addKeyword(newWord) {
        if (!this.isSearchMode) {
            let parts = newWord.split('_');
            this.searchInput.value = this.formatWord(parts[0], parts[1]);
            this.searchWord();
            return;
        }
        
        if (this.searchedWords.includes(newWord)) return; // already added
        
        let p = this.data2d.find(d => d.id === newWord);
        if (!p) return;
        
        this.searchedWords.push(newWord);
        if (!this.drawerWords) this.drawerWords = [];
        if (!this.drawerWords.includes(newWord)) this.drawerWords.push(newWord);
        
        let baseWords = [...new Set(this.searchedWords.map(id => {
            let parts = id.split('_');
            return this.formatWord(parts[0], parts[1]);
        }))];
        this.searchInput.value = baseWords.join(" ");
        
        if (this.searchedWords && this.searchedWords.length > 0) {
            window.history.replaceState(null, '', '?keywords=' + this.searchedWords.join(','));
        }
        
        this.renderActiveWords();
        
        // Find similarities for this new keyword
        let similarities = this.data2d.map(d => ({
            point: d,
            sim: this.cosineSimilarity(p.v, d.v)
        }));
        similarities.sort((a, b) => b.sim - a.sim);
        const limit = this.neighborsPerKeyword || 100;
        const topWords = similarities.slice(0, limit);
        
        let queuedNeighbors = [];
        
        // 1. Convert new keyword to a node and add directly to this.nodes
        let kwNode = this.nodes.find(n => n.id === newWord);
        if (!kwNode) {
            let cw = this.logicalWidth || 800;
            let ch = this.logicalHeight || 600;
            kwNode = {
                id: p.id, w: p.w, f: p.f, sim: 1, sourceKw: p.id, isKw: true,
                x: (Math.random()-0.5)*10, 
                y: (Math.random()-0.5)*10,
                v: p.v, normSim: 1, pos: p.pos, t: p.t
            };
            this.nodes.push(kwNode);
            this.allSearchNodes.push(kwNode);
        } else {
            kwNode.isKw = true;
            kwNode.sim = 1;
            kwNode.normSim = 1;
            
            // If it was in pendingNodes, remove it so it's not spawned twice
            this.pendingNodes = this.pendingNodes.filter(n => n.id !== newWord);
        }
        
        // 2. Link this new KW to all existing KWs
        let existingKws = this.nodes.filter(n => n.isKw && n.id !== newWord);
        existingKws.forEach(ek => {
            let sim = this.cosineSimilarity(kwNode.v, ek.v);
            let link = { source: kwNode.id, target: ek.id, type: 'kw-kw', sim: sim };
            this.allSearchLinks.push(link);
            this.links.push(link);
        });
        
        // 3. Process new neighbors
        topWords.forEach(s => {
            let existingAllNode = this.allSearchNodes.find(n => n.id === s.point.id);
            if (!existingAllNode) {
                let neighborNode = {
                    id: s.point.id, w: s.point.w, f: s.point.f, sim: s.sim, 
                    sourceKw: p.id, isKw: false, x: 0, y: 0, v: s.point.v,
                    normSim: s.sim, pos: s.point.pos, t: s.point.t
                };
                this.allSearchNodes.push(neighborNode);
                queuedNeighbors.push(neighborNode);
            } else {
                if (s.sim > existingAllNode.sim) {
                    existingAllNode.sim = s.sim;
                    existingAllNode.sourceKw = p.id;
                }
            }
            
            let myVerses = this.wordToVerses ? (this.wordToVerses[s.point.id] || []) : [];
            let linkedToSourceKw = false;
            
            this.searchedWords.forEach(sw => {
                let swVerses = this.wordToVerses ? (this.wordToVerses[sw] || []) : [];
                let intersection = myVerses.filter(vId => swVerses.includes(vId));
                if (intersection.length > 0) {
                    let link = {
                        source: s.point.id, target: sw, type: 'direct', intersection: intersection, sim: s.sim
                    };
                    this.allSearchLinks.push(link);
                    if (sw === p.id) linkedToSourceKw = true;
                    
                    let activeNode = this.nodes.find(n => n.id === s.point.id);
                    if (activeNode) this.links.push(link);
                }
            });
            
            if (!linkedToSourceKw) {
                let link = {
                    source: s.point.id, target: p.id, type: 'indirect', sim: s.sim
                };
                this.allSearchLinks.push(link);
                
                let activeNode = this.nodes.find(n => n.id === s.point.id);
                if (activeNode) this.links.push(link);
            }
        });
        
        // 3.5 Ensure any already-spawned nodes that intersect with the new keyword get a direct link
        let newKwVerses = this.wordToVerses ? (this.wordToVerses[p.id] || []) : [];
        this.nodes.forEach(n => {
            if (n.isKw) return;
            
            let hasLinkToNewKw = this.allSearchLinks.some(l => l.source === n.id && (l.target === p.id || l.target.id === p.id));
            if (hasLinkToNewKw) return;
            
            let myVerses = this.wordToVerses ? (this.wordToVerses[n.id] || []) : [];
            let intersection = myVerses.filter(vId => newKwVerses.includes(vId));
            
            if (intersection.length > 0) {
                let link = {
                    source: n.id, target: p.id, type: 'direct', intersection: intersection, sim: n.sim || 0
                };
                this.allSearchLinks.push(link);
                this.links.push(link);
            }
        });
        
        // Re-normalize all similarities
        let minSim = d3.min(this.allSearchNodes.filter(n => !n.isKw), n => n.sim) || 0;
        let maxSim = d3.max(this.allSearchNodes.filter(n => !n.isKw), n => n.sim) || 1;
        this.allSearchNodes.forEach(n => {
            if (!n.isKw) n.normSim = (n.sim - minSim) / (maxSim - minSim || 1);
        });
        
        // 4. Restart simulation to accept the new links and KW node
        this.simulation.nodes(this.nodes);
        this.simulation.force("link").links(this.links);
        this.simulation.alpha(0.5).restart();
        
        this.enqueueNodes(queuedNeighbors);
    }

    updateDynamicZoom() {
        if (!this.isSearchMode || this.nodes.length === 0 || this.userInteracted) return;
        
        let minX = d3.min(this.nodes, d => d.x);
        let maxX = d3.max(this.nodes, d => d.x);
        let minY = d3.min(this.nodes, d => d.y);
        let maxY = d3.max(this.nodes, d => d.y);
        
        let dx = maxX - minX || 1;
        let dy = maxY - minY || 1;
        let cx = (minX + maxX) / 2;
        let cy = (minY + maxY) / 2;
        
        let cw = this.logicalWidth || 800;
        let ch = this.logicalHeight || 600;
        
        // Target scale to fit the bounds with some padding
        let targetScale = 0.8 / Math.max(dx / cw, dy / ch);
        targetScale = Math.min(targetScale, 3); // don't zoom in too crazy close
        
        // Smoothly interpolate current transform towards target transform
        let k = this.transform.k + (targetScale - this.transform.k) * 0.05;
        
        let targetX = cw / 2 - k * cx;
        let targetY = ch / 2 - k * cy;
        
        let tx = this.transform.x + (targetX - this.transform.x) * 0.05;
        let ty = this.transform.y + (targetY - this.transform.y) * 0.05;
        
        let newTransform = d3.zoomIdentity.translate(tx, ty).scale(k);
        this.transform = newTransform;
        
        // Silently update d3 zoom state to match our programmatic panning
        this.canvas.__zoom = newTransform;
    }

    buildAllWordsGraph() {
        if (this.simulation) this.simulation.stop();
        
        let filteredData = this.data2d;
        
        let minX = d3.min(filteredData, d => d.x);
        let maxX = d3.max(filteredData, d => d.x);
        let minY = d3.min(filteredData, d => d.y);
        let maxY = d3.max(filteredData, d => d.y);
        
        let cw = this.logicalWidth || 800;
        let ch = this.logicalHeight || 600;
        
        let dx = maxX - minX || 1;
        let dy = maxY - minY || 1;
        let x = (minX + maxX) / 2;
        let y = (minY + maxY) / 2;
        let scale = 0.85 / Math.max(dx / cw, dy / ch);
        
        this.transform = d3.zoomIdentity.translate(cw / 2 - scale * x, ch / 2 - scale * y).scale(scale);
        d3.select(this.canvas).call(this.zoom.transform, this.transform);
        
        this.nodes = filteredData.map(d => ({
            id: d.id,
            w: d.w,
            f: d.f,
            pos: d.pos,
            t: d.t,
            x: d.x,
            y: d.y,
            original: d.original,
            isKw: false
        }));
        this.links = [];
        this.draw();
    }

    setViewMode(mode, forceReset = false) {
        if (this.viewMode === mode && !forceReset) {
            if (mode === 'books') {
                if (this.isSearchMode || (this.searchedBooks && this.searchedBooks.length > 0) || this.selectedBook) {
                    this.resetBooksView();
                }
            } else if (mode === 'verses') {
                if (this.isSearchMode || (this.searchedVerses && this.searchedVerses.length > 0) || this.selectedVerse) {
                    this.resetVersesView();
                }
            } else {
                if (this.isSearchMode || (this.searchedWords && this.searchedWords.length > 0)) {
                    this.clearAllKeywords();
                }
            }
            return;
        }

        this.viewMode = mode;

        // Keep header pills in sync with viewMode
        const wordsBtn = document.getElementById('view-mode-words');
        const booksBtn = document.getElementById('view-mode-books');
        const versesBtn = document.getElementById('view-mode-verses');
        if (wordsBtn && booksBtn && versesBtn) {
            wordsBtn.classList.toggle('active', mode === 'words');
            booksBtn.classList.toggle('active', mode === 'books');
            versesBtn.classList.toggle('active', mode === 'verses');
        }

        this.hideRadialMenu();
        this.hideVersesPanel();
        this.hideCanonUsageModal();
        this.hoveredNode = null;
        this.selectedBook = null;
        this.selectedVerse = null;
        this.hideBookCard();
        this.hideVerseCard();
        if (this.reopenBtn) this.reopenBtn.style.display = 'none';
        if (this.verseReopenBtn) this.verseReopenBtn.style.display = 'none';
        if (this.verseModeFloater) this.verseModeFloater.style.display = (mode === 'verses') ? 'flex' : 'none';
        
        let activeHeading = this.querySelector('#bwm-active-heading');
        let neighborHeading = this.querySelector('#bwm-neighbor-heading');
        let neighborHint = this.querySelector('#bwm-neighbor-hint');
        
        if (activeHeading) activeHeading.textContent = (mode === 'verses') ? 'Active Verses' : ((mode === 'books') ? 'Active Books' : 'Active Words');
        if (neighborHeading) neighborHeading.textContent = (mode === 'verses') ? 'Connections per Verse' : ((mode === 'books') ? 'Relationships per Book' : 'Relationships per Word');
        if (neighborHint) neighborHint.textContent = (mode === 'verses')
            ? 'Controls how many cross-references or words appear around each verse.'
            : ((mode === 'books') 
                ? 'Controls how many related words appear around each book.' 
                : 'Controls how many related words appear around each keyword.');

        if (this.searchInput) {
            this.searchInput.value = '';
            this.searchInput.placeholder = (mode === 'verses')
                ? 'Search verses (e.g. John 1:1, Gen 1:1, Rom 8:28)...'
                : ((mode === 'books') 
                    ? 'Search for books (e.g. James Proverbs, Genesis Exodus)...' 
                    : 'Search for words (e.g. Father Son Spirit)');
        }
        this.updateClearBtnVisibility();

        if (mode === 'verses') {
            this.searchedWords = [];
            this.drawerWords = [];
            this.searchedBooks = [];
            this.drawerBooks = [];
            this.searchedVerses = [];
            this.drawerVerses = [];
            this.isSearchMode = false;
            window.history.replaceState(null, '', '?view=verses');
            this.renderActiveWords();

            if (!this.versemapLookup) {
                this.showLoading('Loading Biblical Verses & Cross-References...', 'verses');
                if (this.versemapPromise) {
                    this.versemapPromise.then(data => {
                        if (data && data.verses) {
                            this.versemapData = data;
                            this.versemapLookup = new Map(data.verses.map(v => [v.id, v]));
                        }
                        if (this.viewMode === 'verses') {
                            this.hideLoading();
                            this.buildVersesGraph();
                        }
                    }).catch(() => {
                        if (this.viewMode === 'verses') this.hideLoading();
                    });
                }
            } else {
                this.hideLoading();
                this.buildVersesGraph();
            }
        } else if (mode === 'books') {
            this.searchedWords = [];
            this.drawerWords = [];
            this.searchedBooks = [];
            this.drawerBooks = [];
            this.searchedVerses = [];
            this.drawerVerses = [];
            this.isSearchMode = false;
            window.history.replaceState(null, '', '?view=books');
            this.renderActiveWords();

            if (!this.booksData) {
                this.showLoading('Loading Biblical Books & Themes...', 'books');
                if (this.booksPromise) {
                    this.booksPromise.then(data => {
                        if (data) this.booksData = data;
                        if (this.viewMode === 'books') {
                            this.hideLoading();
                            this.buildBooksGraph();
                        }
                    }).catch(() => {
                        if (this.viewMode === 'books') this.hideLoading();
                    });
                }
            } else {
                this.hideLoading();
                this.buildBooksGraph();
            }
        } else {
            this.searchedWords = [];
            this.drawerWords = [];
            this.searchedBooks = [];
            this.drawerBooks = [];
            this.searchedVerses = [];
            this.drawerVerses = [];
            this.isSearchMode = false;
            window.history.replaceState(null, '', window.location.pathname);
            this.renderActiveWords();

            if (!this.data2d) {
                this.showLoading('Loading Bible Word Map...', 'words');
                if (this.data2dPromise) {
                    this.data2dPromise.then(data => {
                        if (data) this.data2d = data;
                        if (this.viewMode === 'words') {
                            this.hideLoading();
                            this.buildAllWordsGraph();
                        }
                    }).catch(() => {
                        if (this.viewMode === 'words') this.hideLoading();
                    });
                }
            } else {
                this.hideLoading();
                this.buildAllWordsGraph();
            }
        }
    }

    buildBooksGraph() {
        if (this.simulation) this.simulation.stop();
        if (this.spawnInterval) {
            clearInterval(this.spawnInterval);
            this.spawnInterval = null;
        }
        if (!this.booksData || !this.booksData.books) return;
        
        this.isSearchMode = false;
        this.selectedBook = null;
        this.hideBookCard();

        let cw = this.logicalWidth || 800;
        let ch = this.logicalHeight || 600;

        this.nodes = this.booksData.books.map(b => ({
            id: b.code,
            code: b.code,
            name: b.name,
            w: b.name,
            testament: b.testament,
            t: b.testament,
            genre: b.genre,
            order: b.order,
            verses: b.verses,
            total_words: b.total_words,
            x: b.x * 120,
            y: b.y * 120,
            v: b.v,
            top_words: b.top_words,
            closest_words: b.closest_words,
            nearest_books: b.nearest_books,
            isBook: true,
            isFocusedBook: false,
            isPrimaryBook: false
        }));

        let nodeMap = new Map(this.nodes.map(n => [n.id, n]));
        this.links = (this.booksData.links || [])
            .filter(l => nodeMap.has(l.source) && nodeMap.has(l.target))
            .map(l => ({
                source: nodeMap.get(l.source),
                target: nodeMap.get(l.target),
                sim: l.sim,
                type: 'book-book'
            }));

        let minX = d3.min(this.nodes, d => d.x);
        let maxX = d3.max(this.nodes, d => d.x);
        let minY = d3.min(this.nodes, d => d.y);
        let maxY = d3.max(this.nodes, d => d.y);

        let dx = maxX - minX || 1;
        let dy = maxY - minY || 1;
        let cx = (minX + maxX) / 2;
        let cy = (minY + maxY) / 2;
        let scale = 0.82 / Math.max(dx / cw, dy / ch);

        this.transform = d3.zoomIdentity.translate(cw / 2 - scale * cx, ch / 2 - scale * cy).scale(scale);
        d3.select(this.canvas).call(this.zoom.transform, this.transform);

        this.draw();
    }

    parseBookQuery(query) {
        if (!this.booksData || !this.booksData.books) return [];
        let originalLower = query.trim().toLowerCase();
        let remaining = originalLower;
        remaining = remaining.replace(/[,;+&]+/g, ' ');
        remaining = remaining.replace(/\b1st\b/g, '1').replace(/\bfirst\b/g, '1');
        remaining = remaining.replace(/\b2nd\b/g, '2').replace(/\bsecond\b/g, '2');
        remaining = remaining.replace(/\b3rd\b/g, '3').replace(/\bthird\b/g, '3');
        remaining = remaining.replace(/\bsong of songs\b/g, 'song of solomon');

        let found = [];
        let booksByLength = [...this.booksData.books].sort((a, b) => b.name.length - a.name.length);

        for (let b of booksByLength) {
            let escaped = b.name.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            let namePattern = new RegExp('\\b' + escaped + '\\b', 'g');
            if (namePattern.test(remaining)) {
                if (!found.some(fb => fb.code === b.code)) {
                    found.push(b);
                }
                remaining = remaining.replace(namePattern, ' ');
            }
        }

        let tokens = remaining.split(/\s+/).filter(t => t.length >= 2);
        for (let token of tokens) {
            let matched = this.booksData.books.find(b => 
                b.code.toLowerCase() === token ||
                (token.length >= 3 && b.name.toLowerCase().startsWith(token))
            );
            if (matched && !found.some(fb => fb.code === matched.code)) {
                found.push(matched);
            }
        }

        found.sort((a, b) => {
            let posA = originalLower.indexOf(a.name.toLowerCase());
            if (posA === -1) posA = originalLower.indexOf(a.code.toLowerCase());
            let posB = originalLower.indexOf(b.name.toLowerCase());
            if (posB === -1) posB = originalLower.indexOf(b.code.toLowerCase());
            return (posA !== -1 && posB !== -1) ? (posA - posB) : 0;
        });

        return found;
    }

    searchBooks(useExplicitCodes = false) {
        this.hoveredNode = null;
        let foundBooks = [];

        if (!useExplicitCodes) {
            let query = this.searchInput.value.trim();
            if (!query) {
                this.clearAllKeywords();
                return;
            }
            foundBooks = this.parseBookQuery(query);
            if (foundBooks.length === 0) {
                if (this.errorSpan) {
                    this.errorSpan.textContent = 'Book not found';
                    this.errorSpan.style.display = 'inline';
                    setTimeout(() => { if (this.errorSpan) this.errorSpan.style.display = 'none'; }, 2500);
                }
                return;
            }
            this.searchedBooks = foundBooks.map(b => b.code);
            this.drawerBooks = [...this.searchedBooks];
        } else {
            if (!this.searchedBooks || this.searchedBooks.length === 0) {
                this.clearAllKeywords();
                return;
            }
            foundBooks = this.searchedBooks.map(c => this.booksData.books.find(b => b.code === c)).filter(Boolean);
        }

        if (this.errorSpan) this.errorSpan.style.display = 'none';
        this.selectedBook = foundBooks[0];
        this.isSearchMode = true;
        this.userInteracted = false;

        this.searchInput.value = foundBooks.map(b => b.name).join(", ");
        this.updateClearBtnVisibility();

        if (this.searchedBooks && this.searchedBooks.length > 0) {
            window.history.replaceState(null, '', '?view=books&books=' + this.searchedBooks.join(','));
        }

        this.buildMultiBookConstellation(foundBooks);
    }

    buildMultiBookConstellation(foundBooks) {
        if (this.simulation) this.simulation.stop();
        if (this.spawnInterval) {
            clearInterval(this.spawnInterval);
            this.spawnInterval = null;
        }

        let bookNodes = foundBooks.map(b => ({
            id: b.code,
            code: b.code,
            name: b.name,
            w: b.name,
            testament: b.testament,
            t: b.testament,
            genre: b.genre,
            order: b.order,
            verses: b.verses,
            total_words: b.total_words,
            v: b.v,
            isBook: true,
            isPrimaryBook: true,
            isKw: true,
            top_words: b.top_words,
            closest_words: b.closest_words,
            nearest_books: b.nearest_books,
            x: (Math.random() - 0.5) * 40,
            y: (Math.random() - 0.5) * 40
        }));

        let bookLinks = [];
        for (let i = 0; i < bookNodes.length; i++) {
            for (let j = i + 1; j < bookNodes.length; j++) {
                let sim = this.cosineSimilarity(bookNodes[i].v, bookNodes[j].v);
                bookLinks.push({
                    source: bookNodes[i].id,
                    target: bookNodes[j].id,
                    type: 'book-book',
                    sim: sim
                });
            }
        }

        let limit = this.neighborsPerKeyword || 100;
        let topWordsMap = new Map();

        foundBooks.forEach(b => {
            let topWords = [];
            if (b.closest_words && b.closest_words.length > 0) {
                topWords = b.closest_words.slice(0, limit);
            } else if (this.data2d && this.data2d.length > 0) {
                let similarities = this.data2d.map(d => ({
                    ...d,
                    sim: this.cosineSimilarity(b.v, d.v),
                    in_book: this.wordAppearsInBook(d.id, b.code)
                }));
                similarities.sort((a, b) => {
                    if (a.in_book !== b.in_book) return a.in_book ? -1 : 1;
                    return b.sim - a.sim;
                });
                topWords = similarities.slice(0, limit);
            }

            topWords.forEach(w => {
                let pid = w.id;
                let sim = (w.sim !== undefined) ? w.sim : 0.8;
                let inBook = (w.in_book !== undefined) ? Boolean(w.in_book) : this.wordAppearsInBook(pid, b.code);
                if (!topWordsMap.has(pid)) {
                    topWordsMap.set(pid, {
                        point: w,
                        maxSim: sim,
                        sourceKw: b.code,
                        linkedBooks: [{ code: b.code, inBook: inBook }]
                    });
                } else {
                    let existing = topWordsMap.get(pid);
                    if (!existing.linkedBooks.some(lb => lb.code === b.code)) {
                        existing.linkedBooks.push({ code: b.code, inBook: inBook });
                    }
                    if (sim > existing.maxSim) {
                        existing.maxSim = sim;
                        existing.sourceKw = b.code;
                    }
                }
            });
        });

        let wordNodes = Array.from(topWordsMap.values()).map(s => {
            let fullPoint = this.data2d ? (this.data2d.find(d => d.id === s.point.id) || s.point) : s.point;
            let isDirectInAny = s.linkedBooks.some(lb => lb.inBook);
            return {
                id: s.point.id,
                w: s.point.w,
                pos: s.point.pos,
                f: s.point.f,
                t: fullPoint.t || s.point.t,
                sim: s.maxSim,
                sourceKw: s.sourceKw,
                linkedBooks: s.linkedBooks,
                isBookWord: true,
                isDirect: isDirectInAny,
                isKw: false,
                v: fullPoint.v,
                original: fullPoint.original
            };
        });

        let minSim = d3.min(wordNodes, n => n.sim) || 0;
        let maxSim = d3.max(wordNodes, n => n.sim) || 1;
        wordNodes.forEach(n => {
            n.normSim = (n.sim - minSim) / (maxSim - minSim || 1);
        });

        let wordLinks = [];
        wordNodes.forEach(n => {
            n.linkedBooks.forEach(lb => {
                wordLinks.push({
                    source: n.id,
                    target: lb.code,
                    type: lb.inBook ? 'direct' : 'indirect',
                    isDirect: lb.inBook,
                    sim: n.sim
                });
            });
        });

        this.allSearchNodes = [...bookNodes, ...wordNodes];
        this.allSearchLinks = [...bookLinks, ...wordLinks];

        this.renderActiveWords();

        // Start simulation with ONLY books, then spawn words in waves
        this.nodes = [...bookNodes];
        this.links = [...bookLinks];

        let cw = this.logicalWidth || 800;
        let ch = this.logicalHeight || 600;

        this.transform = d3.zoomIdentity.translate(cw / 2, ch / 2).scale(1);
        d3.select(this.canvas).call(this.zoom.transform, this.transform);

        const LCG = d3.randomLcg(42);
        this.simulation = d3.forceSimulation(this.nodes)
            .randomSource(LCG)
            .force("link", d3.forceLink(this.links).id(d => d.id).distance(d => {
                if (d.type === 'book-book') return Math.max(120, (1 - d.sim) * 500);
                if (d.isDirect === false || d.type === 'indirect') return 80 + (1 - (d.sim || 0.8)) * 200;
                return Math.max(35, (1 - (d.sim || 0.8)) * 180);
            }).strength(d => d.type === 'book-book' ? 1.5 : (d.isDirect ? 0.8 : 0.4)))
            .force("charge", d3.forceManyBody().strength(d => d.isBook ? -400 : -65))
            .force("collide", d3.forceCollide().radius(d => d.isBook ? 36 : 14))
            .force("center", d3.forceCenter(0, 0).strength(0.05))
            .on("tick", () => {
                this.updateDynamicZoom();
                this.draw();
            });

        this.pendingNodes = [];
        this.enqueueNodes(wordNodes);

        this.showBookCard(this.selectedBook || foundBooks[0], foundBooks);
    }

    selectBook(bookNode) {
        if (!bookNode) return;
        this.searchedBooks = [bookNode.code];
        this.drawerBooks = [bookNode.code];
        this.searchBooks(true);
    }

    addBook(bookCode) {
        if (!this.searchedBooks) this.searchedBooks = [];
        if (!this.drawerBooks) this.drawerBooks = [];
        if (!this.searchedBooks.includes(bookCode)) {
            this.searchedBooks.push(bookCode);
        }
        if (!this.drawerBooks.includes(bookCode)) {
            this.drawerBooks.push(bookCode);
        }
        this.searchBooks(true);
    }

    removeBook(bookCode) {
        if (!this.searchedBooks) return;
        this.searchedBooks = this.searchedBooks.filter(c => c !== bookCode);
        if (this.searchedBooks.length === 0) {
            this.clearAllKeywords();
        } else {
            this.searchBooks(true);
        }
    }

    resetBooksView() {
        if (this.simulation) this.simulation.stop();
        if (this.spawnInterval) {
            clearInterval(this.spawnInterval);
            this.spawnInterval = null;
        }
        this.searchedBooks = [];
        this.drawerBooks = [];
        this.searchedWords = [];
        this.drawerWords = [];
        this.selectedBook = null;
        this.isSearchMode = false;
        if (this.searchInput) this.searchInput.value = '';
        this.updateClearBtnVisibility();
        this.renderActiveWords();
        this.hideRadialMenu();
        this.hideVersesPanel();
        this.hideCanonUsageModal();
        this.hideBookCard();
        if (this.reopenBtn) {
            this.reopenBtn.style.display = 'none';
        }
        window.history.replaceState(null, '', '?view=books');
        this.buildBooksGraph();
    }

    closeActiveInfoWindows() {
        let closedAny = false;
        if (this.wordCard && this.wordCard.classList.contains('visible')) {
            this.hideWordInspector();
            closedAny = true;
        }
        if (this.bookCard && this.bookCard.classList.contains('visible')) {
            this.hideBookCard();
            closedAny = true;
        }
        if (this.verseCard && this.verseCard.classList.contains('visible')) {
            this.hideVerseCard();
            closedAny = true;
        }
        return closedAny;
    }

    updateBackdrop() {
        // No-op: map blur and fading removed on both desktop and mobile
    }

    showBookCard(book, allActiveBooks = null) {
        if (!this.bookCard || !book) return;
        this.hideWordInspector();
        this.hideRadialMenu();
        this.selectedBook = book;
        let genreColor = GENRE_COLORS[book.genre] || '#3b82f6';

        if (!allActiveBooks && this.searchedBooks && this.searchedBooks.length > 0) {
            allActiveBooks = this.searchedBooks.map(c => this.booksData ? this.booksData.books.find(b => b.code === c) : null).filter(Boolean);
        }

        let tabsHtml = '';
        if (allActiveBooks && allActiveBooks.length > 1) {
            tabsHtml = `
                <div class="bwm-window-tabs bwm-book-tabs">
                    ${allActiveBooks.map(b => {
                        let activeCls = b.code === book.code ? 'active' : '';
                        let tabColor = GENRE_COLORS[b.genre] || '#3b82f6';
                        let style = (b.code === book.code) ? `border-bottom-color: ${tabColor}; color: ${tabColor};` : '';
                        return `<button type="button" class="bwm-window-tab bwm-book-tab ${activeCls}" data-tab-code="${b.code}" style="${style}"><b>${b.name}</b></button>`;
                    }).join('')}
                </div>
            `;
        }

        let siblingsHtml = (book.nearest_books || []).map(nb => {
            let isAlreadyActive = this.searchedBooks && this.searchedBooks.includes(nb.code);
            return `
                <div class="bwm-book-chip-group">
                    <button type="button" class="bwm-book-chip" data-book-code="${nb.code}" title="View ${nb.name} details">
                        <b>${nb.name}</b> <span style="opacity:0.65;font-size:0.85em;">${Math.round(nb.sim * 100)}%</span>
                    </button>
                    <button type="button" class="bwm-chip-add" data-toggle-book-code="${nb.code}" title="${isAlreadyActive ? 'Remove from map' : 'Add to map'}">
                        ${isAlreadyActive ? '&minus;' : '+'}
                    </button>
                </div>
            `;
        }).join('');

        let topWordsHtml = (book.top_words || []).slice(0, 12).map(tw => {
            let posColor = '#94a3b8';
            if (tw.pos === 'PROPN') posColor = '#4ade80';
            else if (tw.pos === 'NOUN') posColor = '#60a5fa';
            else if (tw.pos === 'VERB') posColor = '#f472b6';
            else if (tw.pos === 'ADJ' || tw.pos === 'ADV') posColor = '#fbbf24';
            return `<span class="bwm-book-chip" style="border-left: 3px solid ${posColor};" title="TF-IDF Score: ${tw.score}"><b>${this.formatWord(tw.w, tw.pos)}</b> <span style="opacity:0.5;font-size:0.8em;">(${tw.pos.toLowerCase()})</span></span>`;
        }).join('');

        this.bookCard.innerHTML = `
            <div class="bwm-sheet-handle"></div>
            ${tabsHtml}
            <div class="bwm-window-header">
                <div class="bwm-window-header-top">
                    <div>
                        <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
                            <span class="bwm-window-badge" style="background: ${genreColor};">${book.genre}</span>
                            <span class="bwm-window-subtitle-inline">${book.testament === 'OT' ? 'Old Testament' : 'New Testament'}</span>
                        </div>
                        <h3 class="bwm-window-title">${book.name}</h3>
                        <div class="bwm-window-subtitle">${book.verses.toLocaleString()} verses &bull; ${book.total_words.toLocaleString()} words</div>
                    </div>
                    <button type="button" class="bwm-window-close" id="bwm-book-card-close" title="Dismiss">&times;</button>
                </div>
            </div>
            <div class="bwm-window-body">
                <div>
                    <div style="font-size: 0.85em; font-weight: 600; opacity: 0.85; margin-bottom: 4px;">Closest Theological Siblings:</div>
                    <div class="bwm-book-chip-list">
                        ${siblingsHtml}
                    </div>
                </div>
                <div>
                    <div style="font-size: 0.85em; font-weight: 600; opacity: 0.85; margin-bottom: 4px;">Top Distinctive Themes:</div>
                    <div class="bwm-book-chip-list">
                        ${topWordsHtml}
                    </div>
                </div>
                <div class="bwm-book-card-actions">
                    <button type="button" class="bwm-window-pill" id="bwm-btn-reset-books" title="Return to full 66-book overview">
                        &larr; Show All Books
                    </button>
                    <button type="button" class="bwm-window-pill active" id="bwm-btn-dismiss-card" title="Explore constellation on map">
                        Explore Map
                    </button>
                </div>
            </div>
        `;

        if (this.reopenBtn) {
            this.reopenBtn.style.display = 'none';
        }
        this.bookCard.style.transform = '';
        this.bookCard.style.transition = '';
        this.bookCard.style.opacity = '';
        this.bookCard.classList.add('visible');
        this.updateBackdrop();

        let closeBtn = this.bookCard.querySelector('#bwm-book-card-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.hideBookCard();
            });
        }

        let dismissBtn = this.bookCard.querySelector('#bwm-btn-dismiss-card');
        if (dismissBtn) {
            dismissBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.hideBookCard();
            });
        }

        let resetBtn = this.bookCard.querySelector('#bwm-btn-reset-books');
        if (resetBtn) {
            resetBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.resetBooksView();
            });
        }

        // Tab click listeners
        let tabBtns = this.bookCard.querySelectorAll('button[data-tab-code]');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                let code = btn.getAttribute('data-tab-code');
                let target = this.booksData.books.find(b => b.code === code);
                if (target) {
                    this.showBookCard(target, allActiveBooks);
                }
            });
        });

        // Sibling name click listener -> switch / focus that book
        let chipBtns = this.bookCard.querySelectorAll('button[data-book-code]');
        chipBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                let targetCode = btn.getAttribute('data-book-code');
                let targetBook = this.booksData.books.find(b => b.code === targetCode);
                if (targetBook) {
                    this.selectBook(targetBook);
                }
            });
        });

        // Add/remove sibling toggle click listener -> adds/removes book to/from map
        let toggleBtns = this.bookCard.querySelectorAll('button[data-toggle-book-code]');
        toggleBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                let code = btn.getAttribute('data-toggle-book-code');
                if (this.searchedBooks && this.searchedBooks.includes(code)) {
                    this.removeBook(code);
                } else {
                    this.addBook(code);
                }
            });
        });
    }

    hideBookCard() {
        if (this.bookCard) {
            this.bookCard.classList.remove('visible');
            this.bookCard.style.transform = '';
            this.bookCard.style.transition = '';
            this.bookCard.style.opacity = '';
        }
        if (this.reopenBtn) {
            if (this.isSearchMode && this.searchedBooks && this.searchedBooks.length > 0) {
                let name = this.selectedBook ? this.selectedBook.name : 'Book';
                if (this.searchedBooks.length > 1) {
                    name = `${this.searchedBooks.length} Books`;
                }
                let textEl = this.reopenBtn.querySelector('.bwm-book-card-reopen-text');
                if (textEl) textEl.textContent = `${name} Info`;
                this.reopenBtn.style.display = 'flex';
            } else {
                this.reopenBtn.style.display = 'none';
            }
        }
        this.updateBackdrop();
    }

    setVerseViewMode(submode) {
        if (this.verseViewMode === submode) return;
        this.verseViewMode = submode;
        const btnRefs = this.querySelector('#bwm-btn-mode-refs');
        const btnWords = this.querySelector('#bwm-btn-mode-words');
        if (btnRefs && btnWords) {
            btnRefs.classList.toggle('active', submode === 'refs');
            btnWords.classList.toggle('active', submode === 'words');
        }
        if (this.isSearchMode && this.searchedVerses && this.searchedVerses.length > 0) {
            let records = this.searchedVerses.map(ref => this.versemapLookup ? this.versemapLookup.get(ref) : null).filter(Boolean);
            this.buildVersesConstellation(records);
        } else {
            this.buildVersesGraph();
        }
    }

    parseVerseQuery(query) {
        if (!query) return [];
        let parts = query.trim().split(/[,;]+|\s+and\s+/i);
        let results = [];
        let lastBook = null;

        for (let raw of parts) {
            let trimmed = raw.trim();
            if (!trimmed) continue;
            let norm = trimmed.toLowerCase();
            norm = norm.replace(/\b1st\b/g, '1').replace(/\bfirst\b/g, '1');
            norm = norm.replace(/\b2nd\b/g, '2').replace(/\bsecond\b/g, '2');
            norm = norm.replace(/\b3rd\b/g, '3').replace(/\bthird\b/g, '3');
            norm = norm.replace(/\bsong of songs\b/g, 'songofsolomon');

            let m = norm.match(/^(?:((?:[123]\s*)?[a-z]+(?:\s+of\s+[a-z]+)?)\s+)?(\d+)(?:[:\s.](\d+)(?:-(\d+))?)?$/i);
            if (m) {
                let bStr = m[1];
                let chap = parseInt(m[2], 10);
                let vstart = m[3] ? parseInt(m[3], 10) : 1;
                let vend = m[4] ? parseInt(m[4], 10) : vstart;
                let bookCode = null;

                if (bStr) {
                    let cleanB = bStr.replace(/\s+/g, '');
                    bookCode = BOOK_ALIASES[cleanB];
                    if (!bookCode) {
                        for (let [alias, code] of Object.entries(BOOK_ALIASES)) {
                            if (cleanB.startsWith(alias)) {
                                bookCode = code;
                                break;
                            }
                        }
                    }
                    if (bookCode) lastBook = bookCode;
                } else if (lastBook) {
                    bookCode = lastBook;
                }

                if (bookCode) {
                    for (let v = vstart; v <= vend; v++) {
                        let ref = `${bookCode} ${chap}:${v}`;
                        if (this.versemapLookup && this.versemapLookup.has(ref)) {
                            if (!results.includes(ref)) results.push(ref);
                        } else if (!this.versemapLookup) {
                            if (!results.includes(ref)) results.push(ref);
                        }
                    }
                }
            } else {
                let clean = norm.replace(/\s+/g, '');
                let bookCode = BOOK_ALIASES[clean];
                if (bookCode) {
                    let ref = `${bookCode} 1:1`;
                    if (!results.includes(ref)) results.push(ref);
                    lastBook = bookCode;
                }
            }
        }
        return results;
    }

    searchVerses(useExplicitCodes = false) {
        this.hoveredNode = null;
        let foundVerses = [];

        if (!useExplicitCodes) {
            let query = this.searchInput.value.trim();
            if (!query) {
                this.clearAllKeywords();
                return;
            }
            foundVerses = this.parseVerseQuery(query);
            if (foundVerses.length === 0) {
                if (this.errorSpan) {
                    this.errorSpan.textContent = 'Verse not found';
                    this.errorSpan.style.display = 'inline';
                    setTimeout(() => { if (this.errorSpan) this.errorSpan.style.display = 'none'; }, 2500);
                }
                return;
            }
            this.searchedVerses = foundVerses;
            this.drawerVerses = [...this.searchedVerses];
        } else {
            if (!this.searchedVerses || this.searchedVerses.length === 0) {
                this.clearAllKeywords();
                return;
            }
            foundVerses = [...this.searchedVerses];
        }

        if (this.errorSpan) this.errorSpan.style.display = 'none';
        let records = foundVerses.map(ref => this.versemapLookup ? this.versemapLookup.get(ref) : null).filter(Boolean);
        if (records.length === 0) return;

        this.selectedVerse = records[0];
        this.isSearchMode = true;
        this.userInteracted = false;

        this.searchInput.value = foundVerses.map(r => formatVerseRef(r)).join(", ");
        this.updateClearBtnVisibility();

        if (this.searchedVerses && this.searchedVerses.length > 0) {
            window.history.replaceState(null, '', '?view=verses&verses=' + this.searchedVerses.join(','));
        }

        this.buildVersesConstellation(records);
    }

    buildVersesGraph() {
        if (this.simulation) this.simulation.stop();
        if (this.spawnInterval) {
            clearInterval(this.spawnInterval);
            this.spawnInterval = null;
        }
        if (!this.versemapLookup || this.versemapLookup.size === 0) return;

        this.isSearchMode = false;
        this.selectedVerse = null;
        this.hideVerseCard();

        let cw = this.logicalWidth || 800;
        let ch = this.logicalHeight || 600;

        const landmarkIds = LANDMARK_VERSES.filter(id => this.versemapLookup.has(id));
        const landmarkSet = new Set(landmarkIds);

        this.nodes = landmarkIds.map(id => {
            let v = this.versemapLookup.get(id);
            let genre = getVerseGenre(id);
            let testament = getVerseTestament(id);
            return {
                id: v.id,
                ref: v.id,
                formattedRef: formatVerseRef(v.id),
                w: formatVerseRef(v.id),
                b: v.b,
                c: v.c,
                v: v.v,
                genre: genre,
                testament: testament,
                t: testament,
                x: v.x * 120,
                y: v.y * 120,
                rawX: v.x,
                rawY: v.y,
                r: v.r,
                words: v.w,
                isVerse: true,
                isFocusedVerse: false,
                isKw: false
            };
        });

        let nodeMap = new Map(this.nodes.map(n => [n.id, n]));
        this.links = [];

        this.nodes.forEach(n => {
            (n.r || []).forEach(cr => {
                if (landmarkSet.has(cr.id) && n.id < cr.id && nodeMap.has(cr.id)) {
                    this.links.push({
                        source: n,
                        target: nodeMap.get(cr.id),
                        type: 'verse-crossref',
                        sim: cr.sim
                    });
                }
            });
        });

        let minX = d3.min(this.nodes, d => d.x);
        let maxX = d3.max(this.nodes, d => d.x);
        let minY = d3.min(this.nodes, d => d.y);
        let maxY = d3.max(this.nodes, d => d.y);

        let dx = maxX - minX || 1;
        let dy = maxY - minY || 1;
        let cx = (minX + maxX) / 2;
        let cy = (minY + maxY) / 2;
        let scale = 0.82 / Math.max(dx / cw, dy / ch);

        this.transform = d3.zoomIdentity.translate(cw / 2 - scale * cx, ch / 2 - scale * cy).scale(scale);
        d3.select(this.canvas).call(this.zoom.transform, this.transform);

        this.draw();
    }

    buildVersesConstellation(foundVerses) {
        if (this.simulation) this.simulation.stop();
        if (this.spawnInterval) {
            clearInterval(this.spawnInterval);
            this.spawnInterval = null;
        }
        if (!foundVerses || foundVerses.length === 0) return;

        let primaryNodes = foundVerses.map(v => ({
            id: v.id,
            ref: v.id,
            formattedRef: formatVerseRef(v.id),
            w: formatVerseRef(v.id),
            b: v.b,
            c: v.c,
            v: v.v,
            genre: getVerseGenre(v.id),
            testament: getVerseTestament(v.id),
            t: getVerseTestament(v.id),
            x: (Math.random() - 0.5) * 40,
            y: (Math.random() - 0.5) * 40,
            isVerse: true,
            isFocusedVerse: true,
            isKw: true,
            sim: 1.0,
            normSim: 1.0,
            r: v.r,
            words: v.w
        }));

        let primaryIds = new Set(primaryNodes.map(n => n.id));

        if (this.verseViewMode === 'refs') {
            let limit = this.neighborsPerKeyword || 8;
            let crossrefMap = new Map();
            let crossrefLinks = [];

            // Cross links among primary verses
            for (let i = 0; i < primaryNodes.length; i++) {
                for (let j = i + 1; j < primaryNodes.length; j++) {
                    let n1 = primaryNodes[i];
                    let n2 = primaryNodes[j];
                    let cr = (n1.r || []).find(r => r.id === n2.id);
                    let sim = cr ? cr.sim : 0.7;
                    crossrefLinks.push({
                        source: n1.id,
                        target: n2.id,
                        type: 'verse-crossref',
                        sim: sim,
                        isPrimary: true
                    });
                }
            }

            foundVerses.forEach(v => {
                let topRefs = (v.r || []).slice(0, limit);
                topRefs.forEach(cr => {
                    if (primaryIds.has(cr.id)) return;
                    let crRecord = this.versemapLookup ? this.versemapLookup.get(cr.id) : null;
                    if (!crRecord) return;

                    if (!crossrefMap.has(cr.id)) {
                        crossrefMap.set(cr.id, {
                            record: crRecord,
                            maxSim: cr.sim,
                            sourceVerse: v.id,
                            linkedVerses: [v.id]
                        });
                    } else {
                        let item = crossrefMap.get(cr.id);
                        if (!item.linkedVerses.includes(v.id)) item.linkedVerses.push(v.id);
                        if (cr.sim > item.maxSim) {
                            item.maxSim = cr.sim;
                            item.sourceVerse = v.id;
                        }
                    }

                    crossrefLinks.push({
                        source: cr.id,
                        target: v.id,
                        type: 'verse-crossref',
                        sim: cr.sim
                    });
                });
            });

            let crossrefNodes = Array.from(crossrefMap.values()).map(item => {
                let v = item.record;
                let genre = getVerseGenre(v.id);
                let testament = getVerseTestament(v.id);
                return {
                    id: v.id,
                    ref: v.id,
                    formattedRef: formatVerseRef(v.id),
                    w: formatVerseRef(v.id),
                    b: v.b,
                    c: v.c,
                    v: v.v,
                    genre: genre,
                    testament: testament,
                    t: testament,
                    x: (Math.random() - 0.5) * 60,
                    y: (Math.random() - 0.5) * 60,
                    isVerse: true,
                    isFocusedVerse: false,
                    isKw: false,
                    sim: item.maxSim,
                    normSim: item.maxSim,
                    sourceVerse: item.sourceVerse,
                    linkedVerses: item.linkedVerses,
                    r: v.r,
                    words: v.w
                };
            });

            this.nodes = [...primaryNodes, ...crossrefNodes];
            this.links = crossrefLinks;
            this.allSearchNodes = this.nodes;
            this.allSearchLinks = this.links;

            this.renderActiveWords();

            let cw = this.logicalWidth || 800;
            let ch = this.logicalHeight || 600;
            this.transform = d3.zoomIdentity.translate(cw / 2, ch / 2).scale(1);
            d3.select(this.canvas).call(this.zoom.transform, this.transform);

            const LCG = d3.randomLcg(42);
            this.simulation = d3.forceSimulation(this.nodes)
                .randomSource(LCG)
                .force("link", d3.forceLink(this.links).id(d => d.id).distance(d => {
                    return Math.max(65, (1 - (d.sim || 0.8)) * 320);
                }).strength(0.85))
                .force("charge", d3.forceManyBody().strength(d => d.isFocusedVerse ? -360 : -90))
                .force("collide", d3.forceCollide().radius(d => d.isFocusedVerse ? 30 : 18))
                .force("center", d3.forceCenter(0, 0).strength(0.06))
                .on("tick", () => {
                    this.updateDynamicZoom();
                    this.draw();
                });
        } else {
            // Words constellation view
            let wordMap = new Map();
            let wordLinks = [];

            foundVerses.forEach(v => {
                let topWords = (v.w || []).slice(0, 15);
                topWords.forEach(wId => {
                    let [w, pos] = wId.split('_');
                    let fullPoint = this.data2d ? this.data2d.find(d => d.id === wId) : null;
                    if (!wordMap.has(wId)) {
                        wordMap.set(wId, {
                            id: wId,
                            w: w,
                            pos: pos,
                            t: fullPoint ? fullPoint.t : getVerseTestament(v.id),
                            f: fullPoint ? fullPoint.f : 1,
                            original: fullPoint ? fullPoint.original : null,
                            v: fullPoint ? fullPoint.v : null,
                            isVerseWord: true,
                            isKw: false,
                            sim: 0.85,
                            sourceVerse: v.id,
                            linkedVerses: [v.id]
                        });
                    } else {
                        let item = wordMap.get(wId);
                        if (!item.linkedVerses.includes(v.id)) item.linkedVerses.push(v.id);
                    }

                    wordLinks.push({
                        source: wId,
                        target: v.id,
                        type: 'verse-word',
                        sim: 0.85
                    });
                });
            });

            let wordNodes = Array.from(wordMap.values()).map(w => ({
                ...w,
                x: (Math.random() - 0.5) * 50,
                y: (Math.random() - 0.5) * 50
            }));

            this.nodes = [...primaryNodes, ...wordNodes];
            this.links = wordLinks;
            this.allSearchNodes = this.nodes;
            this.allSearchLinks = this.links;

            this.renderActiveWords();

            let cw = this.logicalWidth || 800;
            let ch = this.logicalHeight || 600;
            this.transform = d3.zoomIdentity.translate(cw / 2, ch / 2).scale(1);
            d3.select(this.canvas).call(this.zoom.transform, this.transform);

            const LCG = d3.randomLcg(42);
            this.simulation = d3.forceSimulation(this.nodes)
                .randomSource(LCG)
                .force("link", d3.forceLink(this.links).id(d => d.id).distance(55).strength(0.8))
                .force("charge", d3.forceManyBody().strength(d => d.isFocusedVerse ? -380 : -50))
                .force("collide", d3.forceCollide().radius(d => d.isFocusedVerse ? 30 : 14))
                .force("center", d3.forceCenter(0, 0).strength(0.06))
                .on("tick", () => {
                    this.updateDynamicZoom();
                    this.draw();
                });
        }

        this.showVerseCard(this.selectedVerse || foundVerses[0], foundVerses);
    }

    showVerseCard(verse, allActiveVerses = null) {
        if (!this.verseCard || !verse) return;
        this.hideWordInspector();
        this.hideBookCard();
        this.hideRadialMenu();
        this.selectedVerse = verse;

        let genre = getVerseGenre(verse.id);
        let testament = getVerseTestament(verse.id);
        let genreColor = GENRE_COLORS[genre] || '#3b82f6';
        let formattedRef = formatVerseRef(verse.id);

        if (!allActiveVerses && this.searchedVerses && this.searchedVerses.length > 0) {
            allActiveVerses = this.searchedVerses.map(id => this.versemapLookup ? this.versemapLookup.get(id) : null).filter(Boolean);
        }

        let tabsHtml = '';
        if (allActiveVerses && allActiveVerses.length > 1) {
            tabsHtml = `
                <div class="bwm-window-tabs bwm-verse-tabs">
                    ${allActiveVerses.map(v => {
                        let activeCls = v.id === verse.id ? 'active' : '';
                        let vGenre = getVerseGenre(v.id);
                        let tabColor = GENRE_COLORS[vGenre] || '#3b82f6';
                        let style = (v.id === verse.id) ? `border-bottom-color: ${tabColor}; color: ${tabColor};` : '';
                        let fRef = formatVerseRef(v.id);
                        return `<button type="button" class="bwm-window-tab bwm-verse-tab ${activeCls}" data-verse-tab="${v.id}" style="${style}"><b>${fRef}</b></button>`;
                    }).join('')}
                </div>
            `;
        }

        let verseText = this.verseTextMap ? (this.verseTextMap.get(verse.id) || '') : '';

        let crossrefsHtml = (verse.r || []).slice(0, 10).map(cr => {
            let crFormatted = formatVerseRef(cr.id);
            let crGenre = getVerseGenre(cr.id);
            let crGenreColor = GENRE_COLORS[crGenre] || '#3b82f6';
            let crText = this.verseTextMap ? (this.verseTextMap.get(cr.id) || '') : '';
            let snippet = crText.length > 110 ? crText.slice(0, 107) + '...' : crText;
            let pct = Math.round((cr.sim || 0.8) * 100);
            let isAlreadyActive = this.searchedVerses && this.searchedVerses.includes(cr.id);
            return `
                <div class="bwm-crossref-card">
                    <div class="bwm-crossref-head">
                        <div class="bwm-crossref-title-wrap">
                            <span class="bwm-crossref-ref" data-focus-verse="${cr.id}" title="Focus this verse">${crFormatted}</span>
                            <span class="bwm-book-badge" style="background:${crGenreColor};font-size:0.65em;padding:1px 5px;">${crGenre}</span>
                        </div>
                        <div style="display:flex;align-items:center;gap:6px;">
                            <span class="bwm-crossref-badge" title="100D Vector Cosine Similarity">${pct}% match</span>
                            <button type="button" class="bwm-chip-add" data-toggle-verse="${cr.id}" title="${isAlreadyActive ? 'Remove from map' : 'Add to map'}">
                                ${isAlreadyActive ? '&minus;' : '+'}
                            </button>
                        </div>
                    </div>
                    ${snippet ? `<div class="bwm-crossref-snippet">${snippet}</div>` : ''}
                </div>
            `;
        }).join('');

        let wordsHtml = (verse.w || []).map(wId => {
            let [w, pos] = wId.split('_');
            let posColor = '#94a3b8';
            if (pos === 'PROPN') posColor = '#4ade80';
            else if (pos === 'NOUN') posColor = '#60a5fa';
            else if (pos === 'VERB') posColor = '#f472b6';
            else if (pos === 'ADJ' || pos === 'ADV') posColor = '#fbbf24';
            let displayW = this.formatWord(w, pos);
            return `<span class="bwm-book-chip" style="border-left: 3px solid ${posColor};" title="Constituent content word"><b>${displayW}</b> <span style="opacity:0.5;font-size:0.8em;">(${pos ? pos.toLowerCase() : ''})</span></span>`;
        }).join('');

        this.verseCard.innerHTML = `
            <div class="bwm-sheet-handle"></div>
            ${tabsHtml}
            <div class="bwm-window-header">
                <div class="bwm-window-header-top">
                    <div>
                        <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
                            <span class="bwm-window-badge" style="background: ${genreColor};">${genre}</span>
                            <span class="bwm-window-subtitle-inline">${testament === 'OT' ? 'Old Testament' : 'New Testament'}</span>
                        </div>
                        <h3 class="bwm-window-title">${formattedRef}</h3>
                    </div>
                    <button type="button" class="bwm-window-close" id="bwm-verse-card-close" title="Dismiss">&times;</button>
                </div>
            </div>
            <div class="bwm-window-body">
                ${verseText ? `<div class="bwm-verse-text-box">${verseText}</div>` : ''}
                <div>
                    <div style="font-size: 0.85em; font-weight: 600; opacity: 0.85; margin-bottom: 6px;">Top Semantic Cross-References:</div>
                    <div class="bwm-crossref-list">
                        ${crossrefsHtml}
                    </div>
                </div>
                ${wordsHtml ? `
                <div style="margin-top: 14px;">
                    <div style="font-size: 0.85em; font-weight: 600; opacity: 0.85; margin-bottom: 6px;">Constituent Words:</div>
                    <div class="bwm-book-chip-list">
                        ${wordsHtml}
                    </div>
                </div>` : ''}
                <div class="bwm-book-card-actions" style="margin-top: 16px;">
                    <button type="button" class="bwm-window-pill" id="bwm-btn-reset-verses" title="Return to landmark overview">
                        &larr; Landmark Overview
                    </button>
                    <button type="button" class="bwm-window-pill active" id="bwm-btn-dismiss-verse-card" title="Explore constellation on map">
                        Explore Map
                    </button>
                </div>
            </div>
        `;

        if (this.verseReopenBtn) {
            this.verseReopenBtn.style.display = 'none';
        }
        this.verseCard.style.transform = '';
        this.verseCard.style.transition = '';
        this.verseCard.style.opacity = '';
        this.verseCard.classList.add('visible');

        let closeBtn = this.verseCard.querySelector('#bwm-verse-card-close');
        if (closeBtn) closeBtn.addEventListener('click', (e) => { e.stopPropagation(); this.hideVerseCard(); });

        let dismissBtn = this.verseCard.querySelector('#bwm-btn-dismiss-verse-card');
        if (dismissBtn) dismissBtn.addEventListener('click', (e) => { e.stopPropagation(); this.hideVerseCard(); });

        let resetBtn = this.verseCard.querySelector('#bwm-btn-reset-verses');
        if (resetBtn) resetBtn.addEventListener('click', (e) => { e.stopPropagation(); this.resetVersesView(); });

        let tabBtns = this.verseCard.querySelectorAll('button[data-verse-tab]');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                let ref = btn.getAttribute('data-verse-tab');
                let target = this.versemapLookup ? this.versemapLookup.get(ref) : null;
                if (target) this.showVerseCard(target, allActiveVerses);
            });
        });

        let focusBtns = this.verseCard.querySelectorAll('[data-focus-verse]');
        focusBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                let ref = btn.getAttribute('data-focus-verse');
                this.selectVerse(ref);
            });
        });

        let toggleBtns = this.verseCard.querySelectorAll('button[data-toggle-verse]');
        toggleBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                let ref = btn.getAttribute('data-toggle-verse');
                if (this.searchedVerses && this.searchedVerses.includes(ref)) {
                    this.removeVerse(ref);
                } else {
                    this.addVerse(ref);
                }
            });
        });
    }

    hideVerseCard() {
        if (this.verseCard) {
            this.verseCard.classList.remove('visible');
            this.verseCard.style.transform = '';
            this.verseCard.style.transition = '';
            this.verseCard.style.opacity = '';
        }
        if (this.verseReopenBtn) {
            if (this.isSearchMode && this.searchedVerses && this.searchedVerses.length > 0) {
                let name = this.selectedVerse ? formatVerseRef(this.selectedVerse.id) : 'Verse';
                if (this.searchedVerses.length > 1) {
                    name = `${this.searchedVerses.length} Verses`;
                }
                let textEl = this.verseReopenBtn.querySelector('.bwm-book-card-reopen-text');
                if (textEl) textEl.textContent = `${name} Info`;
                this.verseReopenBtn.style.display = 'flex';
            } else {
                this.verseReopenBtn.style.display = 'none';
            }
        }
    }

    selectVerse(ref) {
        if (!ref) return;
        this.searchedVerses = [ref];
        this.drawerVerses = [ref];
        this.searchVerses(true);
    }

    addVerse(ref) {
        if (!this.searchedVerses) this.searchedVerses = [];
        if (!this.drawerVerses) this.drawerVerses = [];
        if (!this.searchedVerses.includes(ref)) {
            this.searchedVerses.push(ref);
        }
        if (!this.drawerVerses.includes(ref)) {
            this.drawerVerses.push(ref);
        }
        this.searchVerses(true);
    }

    removeVerse(ref) {
        if (!this.searchedVerses) return;
        this.searchedVerses = this.searchedVerses.filter(r => r !== ref);
        if (this.searchedVerses.length === 0) {
            this.clearAllKeywords();
        } else {
            this.searchVerses(true);
        }
    }

    resetVersesView() {
        if (this.simulation) this.simulation.stop();
        if (this.spawnInterval) {
            clearInterval(this.spawnInterval);
            this.spawnInterval = null;
        }
        this.searchedVerses = [];
        this.drawerVerses = [];
        this.searchedWords = [];
        this.drawerWords = [];
        this.searchedBooks = [];
        this.drawerBooks = [];
        this.selectedVerse = null;
        this.isSearchMode = false;
        if (this.searchInput) this.searchInput.value = '';
        this.updateClearBtnVisibility();
        this.renderActiveWords();
        this.hideRadialMenu();
        this.hideVersesPanel();
        this.hideCanonUsageModal();
        this.hideVerseCard();
        if (this.verseReopenBtn) this.verseReopenBtn.style.display = 'none';
        window.history.replaceState(null, '', '?view=verses');
        this.buildVersesGraph();
    }

    matchesTestament(t) {
        if (!this.testamentFilter || this.testamentFilter === 'all') return true;
        if (this.testamentFilter === 'ot') return t === 'OT' || t === 'Both';
        if (this.testamentFilter === 'nt') return t === 'NT' || t === 'Both';
        if (this.testamentFilter === 'both') return t === 'Both';
        return true;
    }

    draw() {
        if (!this.ctx || (!this.data2d && !this.booksData && !this.versemapData)) return;
        this.updateColors();
        
        let cw = this.logicalWidth;
        let ch = this.logicalHeight;
        
        this.ctx.clearRect(0, 0, cw, ch);
        this.ctx.fillStyle = this.colors.bg;
        this.ctx.fillRect(0, 0, cw, ch);
        
        let minX = this.transform.invertX(0);
        let maxX = this.transform.invertX(cw);
        let minY = this.transform.invertY(0);
        let maxY = this.transform.invertY(ch);
        
        let visibleNodesCount = 0;
        this.nodes.forEach(n => {
            if (n.x >= minX && n.x <= maxX && n.y >= minY && n.y <= maxY) {
                if (this.matchesTestament(n.t || n.testament)) {
                    visibleNodesCount++;
                }
            }
        });
        let autoShowLabels = visibleNodesCount < 250;
        
        this.ctx.save();
        this.ctx.translate(this.transform.x, this.transform.y);
        this.ctx.scale(this.transform.k, this.transform.k);
        
        // Pre-calculate radii for all nodes so we can clip lines to their edges
        this.nodes.forEach(n => {
            let pixelR = 3;
            if (n.isVerse) {
                pixelR = n.isFocusedVerse ? 20 : 13;
            } else if (n.isVerseWord) {
                pixelR = Math.max(4, Math.min(10, Math.sqrt(n.f || 1) * 0.8));
            } else if (n.isBook) {
                pixelR = n.isFocusedBook ? 32 : Math.max(14, Math.min(26, Math.sqrt(n.verses) * 0.75));
            } else if (n.isKw) {
                pixelR = 12;
            } else if (n.isBookWord) {
                pixelR = Math.max(4, Math.min(10, Math.sqrt(n.f || 1) * 0.8));
            } else if (this.isSearchMode) {
                let alpha = (n.normSim !== undefined && !isNaN(n.normSim)) ? n.normSim : 0.2;
                pixelR = 3 + (alpha * 7);
            } else {
                pixelR = Math.max(1.5, Math.min(8, Math.log(n.f || 3) * 1.2));
            }
            
            n.canvasR = pixelR / this.transform.k;
        });
        
        this.links.forEach(l => {
            if (l.source.x === undefined || l.target.x === undefined) return;
            
            let matchSource = this.matchesTestament(l.source.t || l.source.testament);
            let matchTarget = this.matchesTestament(l.target.t || l.target.testament);
            
            let isDirect = l.type === 'direct' || l.isDirect === true;
            let isDashed = false;
            
            if (l.type === 'verse-crossref') {
                let sim = (l.sim !== undefined) ? l.sim : 0.8;
                this.ctx.strokeStyle = this.colors.nodeHover || '#2563eb';
                this.ctx.lineWidth = Math.max(1.2, sim * 2.8) / this.transform.k;
                this.ctx.globalAlpha = Math.max(0.35, sim * 0.85);
            } else if (l.type === 'verse-word') {
                this.ctx.strokeStyle = this.colors.linkDir;
                this.ctx.lineWidth = 1.3 / this.transform.k;
                this.ctx.globalAlpha = 0.55;
            } else if (l.type === 'book-book') {
                this.ctx.strokeStyle = this.colors.linkIndir;
                this.ctx.lineWidth = 1.2 / this.transform.k;
                this.ctx.globalAlpha = 0.25;
            } else if (this.viewMode === 'books') {
                if (isDirect) {
                    this.ctx.strokeStyle = this.colors.linkDir;
                    this.ctx.lineWidth = 1.4 / this.transform.k;
                    this.ctx.globalAlpha = 0.55;
                } else {
                    this.ctx.strokeStyle = this.colors.linkIndir;
                    this.ctx.lineWidth = 1.0 / this.transform.k;
                    this.ctx.globalAlpha = 0.28;
                    isDashed = true;
                }
            } else if (this.isSearchMode && !l.source.isKw) {
                let alpha = (l.source.normSim !== undefined && !isNaN(l.source.normSim)) ? l.source.normSim : 0.2;
                this.ctx.globalAlpha = Math.max(0.25, alpha * 0.8 + 0.2); // Range from 0.25 to 1.0
                this.ctx.strokeStyle = l.type === 'direct' ? this.colors.linkDir : this.colors.linkIndir;
                this.ctx.lineWidth = l.type === 'direct' ? 1.5 / this.transform.k : 1 / this.transform.k;
            } else {
                this.ctx.globalAlpha = 1.0;
                this.ctx.strokeStyle = l.type === 'direct' ? this.colors.linkDir : this.colors.linkIndir;
                this.ctx.lineWidth = l.type === 'direct' ? 1.5 / this.transform.k : 1 / this.transform.k;
            }
            
            if (!matchSource || !matchTarget) {
                this.ctx.globalAlpha = Math.min(this.ctx.globalAlpha, 0.05);
            }
            
            let dx = l.target.x - l.source.x;
            let dy = l.target.y - l.source.y;
            let dist = Math.sqrt(dx*dx + dy*dy);
            
            this.ctx.beginPath();
            
            if (dist > (l.source.canvasR + l.target.canvasR)) {
                let startX = l.source.x + (dx / dist) * l.source.canvasR;
                let startY = l.source.y + (dy / dist) * l.source.canvasR;
                let endX = l.target.x - (dx / dist) * l.target.canvasR;
                let endY = l.target.y - (dy / dist) * l.target.canvasR;
                this.ctx.moveTo(startX, startY);
                this.ctx.lineTo(endX, endY);
            } else {
                this.ctx.moveTo(l.source.x, l.source.y);
                this.ctx.lineTo(l.target.x, l.target.y);
            }
            
            if (isDashed) {
                this.ctx.setLineDash([4 / this.transform.k, 4 / this.transform.k]);
            } else {
                this.ctx.setLineDash([]);
            }
            this.ctx.stroke();
            this.ctx.setLineDash([]);
        });
        this.ctx.globalAlpha = 1.0;
        
        let kwWordCounts = {};
        let nodeWordCounts = {};
        this.nodes.forEach(n => {
            let baseW = (n.w || '').toLowerCase();
            if (n.isKw) {
                kwWordCounts[baseW] = (kwWordCounts[baseW] || 0) + 1;
            }
            nodeWordCounts[baseW] = (nodeWordCounts[baseW] || 0) + 1;
        });

        this.nodes.forEach(n => {
            let isHighlighted = (this.hoveredNode === n || this.inspectorNode === n);
            let matchesT = this.matchesTestament(n.t || n.testament) || isHighlighted || n.isFocusedBook || n.isFocusedVerse;
            
            this.ctx.beginPath();
            
            let posColor = '#94a3b8'; // default slate-400
            if (n.isVerse) {
                posColor = GENRE_COLORS[n.genre] || '#3b82f6';
            } else if (n.isBook) {
                posColor = GENRE_COLORS[n.genre] || '#3b82f6';
            } else if (n.pos === 'NOUN') posColor = '#3b82f6'; // blue-500
            else if (n.pos === 'VERB') posColor = '#ef4444'; // red-500
            else if (n.pos === 'PROPN') posColor = '#10b981'; // emerald-500
            else if (n.pos === 'ADJ') posColor = '#8b5cf6'; // violet-500
            else if (n.pos === 'ADV') posColor = '#ec4899'; // pink-500
            else if (n.pos === 'PRON') posColor = '#14b8a6'; // teal-500
            else if (n.pos === 'NUM') posColor = '#f59e0b'; // amber-500

            this.ctx.fillStyle = posColor;
            
            if (n.isVerse) {
                this.ctx.globalAlpha = matchesT ? 1.0 : 0.1;
            } else if (n.isBook) {
                this.ctx.globalAlpha = matchesT ? 1.0 : 0.08;
            } else if (this.isSearchMode && !n.isKw) {
                let alpha = (n.normSim !== undefined && !isNaN(n.normSim)) ? n.normSim : 0.2;
                this.ctx.globalAlpha = Math.max(0.4, alpha);
            } else {
                this.ctx.globalAlpha = 1.0;
            }
            
            if (!matchesT) {
                this.ctx.globalAlpha = Math.min(this.ctx.globalAlpha, 0.06);
            }
            
            let drawR = n.canvasR;
            if (isHighlighted) {
                drawR = n.canvasR * (n.isBook ? 1.2 : (n.isVerse ? 1.25 : 1.4));
                this.ctx.shadowBlur = (n.isBook ? 16 : (n.isVerse ? 18 : 12)) / this.transform.k;
                this.ctx.shadowColor = posColor;
            } else if (n.isVerse && n.isFocusedVerse) {
                this.ctx.shadowBlur = 16 / this.transform.k;
                this.ctx.shadowColor = posColor;
            } else {
                this.ctx.shadowBlur = 0;
            }
            
            if (!matchesT) {
                drawR = drawR * 0.75;
            }
            
            this.ctx.arc(n.x, n.y, drawR, 0, 2 * Math.PI);
            this.ctx.fill();
            
            if (n.isVerse) {
                this.ctx.lineWidth = (n.isFocusedVerse ? 3 : 1.8) / this.transform.k;
                this.ctx.strokeStyle = n.isFocusedVerse ? '#ffffff' : (isHighlighted ? this.colors.text : 'rgba(255,255,255,0.7)');
                this.ctx.stroke();
            } else if (n.isBook) {
                this.ctx.lineWidth = (n.isFocusedBook ? 3.5 : 2) / this.transform.k;
                this.ctx.strokeStyle = n.isFocusedBook ? '#ffffff' : (isHighlighted ? this.colors.text : 'rgba(255,255,255,0.6)');
                this.ctx.stroke();
            } else if (n.isKw) {
                this.ctx.lineWidth = 3 / this.transform.k;
                this.ctx.strokeStyle = this.colors.text;
                this.ctx.stroke();
            }
            
            this.ctx.globalAlpha = 1.0;
            
            let showLabel = n.isVerse || n.isBook || (matchesT && (this.isSearchMode || n.isKw || autoShowLabels || n.isBookWord || n.isVerseWord || isHighlighted));
            if (showLabel) {
                this.ctx.shadowBlur = 0;
                
                this.ctx.save();
                this.ctx.translate(n.x, n.y);
                this.ctx.scale(1 / this.transform.k, 1 / this.transform.k);
                
                if (n.isVerse) {
                    let fontSize = n.isFocusedVerse ? 13 : 11;
                    this.ctx.font = `bold ${fontSize}px ${this.colors.font}`;
                    this.ctx.textAlign = "center";
                    this.ctx.textBaseline = "top";
                    let currentR = (isHighlighted) ? n.canvasR * 1.25 : n.canvasR;
                    let yOffset = (currentR * this.transform.k) + 3;
                    let displayTitle = n.formattedRef || formatVerseRef(n.id);
                    
                    this.ctx.lineWidth = 3.5;
                    this.ctx.strokeStyle = this.colors.bg;
                    this.ctx.strokeText(displayTitle, 0, yOffset);
                    
                    this.ctx.fillStyle = this.colors.text;
                    this.ctx.fillText(displayTitle, 0, yOffset);
                    
                    let subFontSize = 9;
                    this.ctx.font = `${subFontSize}px ${this.colors.font}`;
                    let subOffset = yOffset + fontSize + 2;
                    this.ctx.lineWidth = 2.5;
                    this.ctx.strokeStyle = this.colors.bg;
                    this.ctx.strokeText(n.genre, 0, subOffset);
                    this.ctx.fillStyle = this.colors.textMuted || '#888888';
                    this.ctx.fillText(n.genre, 0, subOffset);
                } else if (n.isBook) {
                    let fontSize = n.isFocusedBook ? 15 : 12;
                    this.ctx.font = `bold ${fontSize}px ${this.colors.font}`;
                    this.ctx.textAlign = "center";
                    this.ctx.textBaseline = "top";
                    let currentR = (isHighlighted) ? n.canvasR * 1.2 : n.canvasR;
                    let yOffset = (currentR * this.transform.k) + 3;
                    
                    this.ctx.lineWidth = 3.5;
                    this.ctx.strokeStyle = this.colors.bg;
                    this.ctx.strokeText(n.name, 0, yOffset);
                    
                    this.ctx.fillStyle = this.colors.text;
                    this.ctx.fillText(n.name, 0, yOffset);
                    
                    let subFontSize = 9;
                    this.ctx.font = `${subFontSize}px ${this.colors.font}`;
                    let subOffset = yOffset + fontSize + 2;
                    this.ctx.lineWidth = 2.5;
                    this.ctx.strokeStyle = this.colors.bg;
                    this.ctx.strokeText(n.genre, 0, subOffset);
                    this.ctx.fillStyle = this.colors.textMuted || '#888888';
                    this.ctx.fillText(n.genre, 0, subOffset);
                } else {
                    let fontSize = n.isKw ? 14 : 11;
                    this.ctx.font = `${fontSize}px ${this.colors.font}`;
                    this.ctx.textAlign = "center";
                    this.ctx.textBaseline = "top";
                    let currentR = (isHighlighted) ? n.canvasR * 1.4 : n.canvasR;
                    let yOffset = (currentR * this.transform.k) + 2;
                    
                    // Draw a solid halo background for the text to improve readability over layered lines/dots
                    this.ctx.lineWidth = 3;
                    this.ctx.strokeStyle = this.colors.bg;
                    let displayW = this.formatWord(n.w, n.pos);
                    this.ctx.strokeText(displayW, 0, yOffset);
                    
                    this.ctx.fillStyle = this.colors.text;
                    this.ctx.fillText(displayW, 0, yOffset);
                    
                    // If there are multiple keywords or active nodes with the same word, show POS underneath
                    let hasDuplicate = (n.isKw && kwWordCounts[n.w.toLowerCase()] > 1) || (this.isSearchMode && nodeWordCounts[n.w.toLowerCase()] > 1);
                    if (hasDuplicate && n.pos) {
                        let posText = `(${n.pos.toLowerCase()})`;
                        let posFontSize = n.isKw ? 11 : 9;
                        this.ctx.font = `${posFontSize}px ${this.colors.font}`;
                        let posOffset = yOffset + fontSize + 1;
                        
                        this.ctx.lineWidth = 2.5;
                        this.ctx.strokeStyle = this.colors.bg;
                        this.ctx.strokeText(posText, 0, posOffset);
                        
                        this.ctx.fillStyle = this.colors.nodeDef || '#888888';
                        this.ctx.fillText(posText, 0, posOffset);
                    }
                }
                
                this.ctx.restore();
            }
        });
        
        this.ctx.restore();
    }

    handleMouseMove(e) {
        if (!this.nodes || this.nodes.length === 0) return;
        
        // Ignore synthesized mouse events within 1000ms of a touch interaction
        if (this.lastTouchEndTime && Date.now() - this.lastTouchEndTime < 1000) return;
        if (this.lastTouchStartTime && Date.now() - this.lastTouchStartTime < 1000) return;
        
        if (this.isTouch) {
            // Ignore synthesized mouse moves. If it's a real mouse (moved >20px from last touch), revert to mouse mode.
            if (this.lastTouchX !== undefined) {
                let dx = e.clientX - this.lastTouchX;
                let dy = e.clientY - this.lastTouchY;
                if (Math.abs(dx) > 20 || Math.abs(dy) > 20) {
                    this.isTouch = false;
                } else {
                    return;
                }
            } else {
                return;
            }
        }
        
        let rect = this.canvas.getBoundingClientRect();
        let mouseX = e.clientX - rect.left;
        let mouseY = e.clientY - rect.top;
        
        let [logicalX, logicalY] = this.transform.invert([mouseX, mouseY]);
        
        let closestNode = null;
        let minDist = Infinity;
        let searchRadius = 20 / this.transform.k;
        
        for (let n of this.nodes) {
            let dx = n.x - logicalX;
            let dy = n.y - logicalY;
            let dist = Math.sqrt(dx*dx + dy*dy);
            let effectiveRadius = n.canvasR ? Math.max(searchRadius, n.canvasR * 1.3) : searchRadius;
            if (dist < effectiveRadius && dist < minDist) {
                minDist = dist;
                closestNode = n;
            }
        }
        
        if (closestNode) {
            if (this.hoveredNode !== closestNode) {
                this.hoveredNode = closestNode;
                this.canvas.style.cursor = "pointer";
                this.draw();
            }
        } else if (!this.radialMenuNode) {
            if (this.hoveredNode) {
                this.hoveredNode = null;
                this.canvas.style.cursor = "grab";
                this.draw();
            }
        }
    }

    handleClick(e) {
        if (this.ignoreNextClick) {
            this.ignoreNextClick = false;
            return;
        }
        if (this.isTouch && this.touchCloseTooltip) {
            this.touchCloseTooltip = false;
            return;
        }

        let rect = this.canvas.getBoundingClientRect();
        let mouseX = e.clientX - rect.left;
        let mouseY = e.clientY - rect.top;

        let isDesktop = window.innerWidth > 768;

        if (this.viewMode === 'verses') {
            if (this.hoveredNode) {
                if (this.hoveredNode.isVerse) {
                    if (e.shiftKey) {
                        this.addVerse(this.hoveredNode.id);
                    } else if (this.isSearchMode && this.searchedVerses && this.searchedVerses.length > 0) {
                        if (isDesktop) {
                            let targetVerse = this.hoveredNode;
                            let activeVerses = (this.searchedVerses && this.searchedVerses.length > 0)
                                ? this.searchedVerses.map(vId => this.versemapLookup ? this.versemapLookup.get(vId) : null).filter(Boolean)
                                : [targetVerse];
                            this.showVerseCard(targetVerse, activeVerses);
                        } else {
                            if (this.radialMenuNode === this.hoveredNode) {
                                this.hideRadialMenu();
                            } else {
                                this.showRadialMenu(this.hoveredNode, mouseX, mouseY);
                            }
                        }
                    } else {
                        this.selectVerse(this.hoveredNode.id);
                    }
                } else if (this.hoveredNode.isVerseWord) {
                    if (isDesktop) {
                        if (this.wordCard && this.wordCard.classList.contains('visible') && this.inspectorNode === this.hoveredNode) {
                            this.hideWordInspector();
                        } else {
                            this.showWordInspector(this.hoveredNode, this.lastWordInspectorTab || 'verses');
                        }
                    } else {
                        if (this.radialMenuNode === this.hoveredNode) {
                            this.hideRadialMenu();
                        } else {
                            this.showRadialMenu(this.hoveredNode, mouseX, mouseY);
                        }
                    }
                }
            } else {
                this.hideRadialMenu();
                this.hideWordInspector();
                if (this.verseCard && this.verseCard.classList.contains('visible')) {
                    this.hideVerseCard();
                }
            }
            return;
        }

        if (this.viewMode === 'books') {
            if (this.hoveredNode) {
                if (this.hoveredNode.isBook) {
                    if (e.shiftKey) {
                        this.addBook(this.hoveredNode.code);
                    } else if (this.isSearchMode && this.searchedBooks && this.searchedBooks.length > 0) {
                        if (isDesktop) {
                            let targetBook = this.hoveredNode;
                            let activeBooks = (this.searchedBooks && this.searchedBooks.length > 0)
                                ? this.searchedBooks.map(c => this.booksData ? this.booksData.books.find(b => b.code === c) : null).filter(Boolean)
                                : [targetBook];
                            this.showBookCard(targetBook, activeBooks);
                        } else {
                            if (this.radialMenuNode === this.hoveredNode) {
                                this.hideRadialMenu();
                            } else {
                                this.showRadialMenu(this.hoveredNode, mouseX, mouseY);
                            }
                        }
                    } else {
                        this.selectBook(this.hoveredNode);
                    }
                } else if (this.hoveredNode.isBookWord) {
                    if (isDesktop) {
                        if (this.wordCard && this.wordCard.classList.contains('visible') && this.inspectorNode === this.hoveredNode) {
                            this.hideWordInspector();
                        } else {
                            this.showWordInspector(this.hoveredNode, this.lastWordInspectorTab || 'verses');
                        }
                    } else {
                        if (this.radialMenuNode === this.hoveredNode) {
                            this.hideRadialMenu();
                        } else {
                            this.showRadialMenu(this.hoveredNode, mouseX, mouseY);
                        }
                    }
                }
            } else {
                this.hideRadialMenu();
                this.hideWordInspector();
                if (this.bookCard && this.bookCard.classList.contains('visible')) {
                    this.hideBookCard();
                }
            }
            return;
        }

        if (this.hoveredNode) {
            if (isDesktop) {
                if (this.wordCard && this.wordCard.classList.contains('visible') && this.inspectorNode === this.hoveredNode) {
                    this.hideWordInspector();
                } else {
                    this.showWordInspector(this.hoveredNode, this.lastWordInspectorTab || 'verses');
                }
            } else {
                if (this.radialMenuNode === this.hoveredNode) {
                    this.hideRadialMenu();
                } else {
                    this.showRadialMenu(this.hoveredNode, mouseX, mouseY);
                }
            }
        } else {
            this.hideRadialMenu();
            this.hideWordInspector();
        }
    }

    showRadialMenu(node, mouseX, mouseY) {
        this.hideRadialMenu();
        this.hideWordInspector();
        this.radialMenuNode = node;
        this.hoveredNode = node;
        this.draw();
        
        // Compute screen position of the node center, offset by canvas position within container
        let [rawX, rawY] = this.transform.apply([node.x, node.y]);
        let canvasRect = this.canvas.parentElement.getBoundingClientRect();
        let containerRect = this.querySelector('.bwm-container').getBoundingClientRect();
        let offsetX = canvasRect.left - containerRect.left;
        let offsetY = canvasRect.top - containerRect.top;
        let screenX = rawX + offsetX;
        let screenY = rawY + offsetY;
        
        let isAlreadyKw = this.isSearchMode && this.searchedWords && this.searchedWords.includes(node.id);
        let menuItems = [];
        if (this.viewMode === 'verses') {
            if (node.isVerse) {
                let isAlreadyActive = this.searchedVerses && this.searchedVerses.includes(node.id);
                if (isAlreadyActive && this.searchedVerses.length > 1) {
                    menuItems.push({
                        icon: '&minus;',
                        label: 'Remove verse from map',
                        action: () => {
                            this.hideRadialMenu();
                            this.removeVerse(node.id);
                        }
                    });
                } else if (!isAlreadyActive) {
                    menuItems.push({
                        icon: '+',
                        label: 'Add verse to map',
                        action: () => {
                            this.hideRadialMenu();
                            this.addVerse(node.id);
                        }
                    });
                }
                menuItems.push({
                    icon: '📖',
                    label: 'Verse Info & Cross-Refs',
                    action: () => {
                        this.hideRadialMenu();
                        let activeVerses = (this.searchedVerses && this.searchedVerses.length > 0)
                            ? this.searchedVerses.map(vId => this.versemapLookup ? this.versemapLookup.get(vId) : null).filter(Boolean)
                            : [node];
                        this.showVerseCard(node, activeVerses);
                    }
                });
                menuItems.push({
                    icon: '&#128269;',
                    label: 'Focus this verse only',
                    action: () => {
                        this.hideRadialMenu();
                        this.selectVerse(node.id);
                    }
                });
            } else if (node.isVerseWord) {
                menuItems.push({
                    icon: '&#128269;',
                    label: 'Explore on Word Map',
                    action: () => {
                        this.hideRadialMenu();
                        const wordsBtn = document.getElementById('view-mode-words');
                        const booksBtn = document.getElementById('view-mode-books');
                        const versesBtn = document.getElementById('view-mode-verses');
                        if (wordsBtn && booksBtn && versesBtn) {
                            wordsBtn.classList.add('active');
                            booksBtn.classList.remove('active');
                            versesBtn.classList.remove('active');
                        }
                        this.setViewMode('words');
                        if (this.searchInput) this.searchInput.value = this.formatWord(node.w, node.pos);
                        this.searchWord();
                    }
                });
                menuItems.push({ icon: '\u{1F4D6}', label: 'Verses', action: () => { this.hideRadialMenu(); this.showWordInspector(node, 'verses'); } });
                menuItems.push({
                    icon: '&#128202;',
                    label: 'Canon Usage',
                    action: () => {
                        this.hideRadialMenu();
                        this.showWordInspector(node, 'canon');
                    }
                });
                if (node.original && node.original.length > 0) {
                    menuItems.push({ icon: '<span style="font-size:0.7em;font-weight:bold;">α/א</span>', label: 'Original Language', action: () => { this.hideRadialMenu(); this.showWordInspector(node, 'original'); } });
                }
            }
        } else if (this.viewMode === 'books') {
            if (node.isBook) {
                let isAlreadyActive = this.searchedBooks && this.searchedBooks.includes(node.code);
                if (isAlreadyActive && this.searchedBooks.length > 1) {
                    menuItems.push({
                        icon: '&minus;',
                        label: 'Remove book from map',
                        action: () => {
                            this.hideRadialMenu();
                            this.removeBook(node.code);
                        }
                    });
                } else if (!isAlreadyActive) {
                    menuItems.push({
                        icon: '+',
                        label: 'Add book to map',
                        action: () => {
                            this.hideRadialMenu();
                            this.addBook(node.code);
                        }
                    });
                }
                menuItems.push({
                    icon: '<span style="font-weight:bold;font-family:serif;font-style:italic;font-size:1.1em;">i</span>',
                    label: 'Book Info & Themes',
                    action: () => {
                        this.hideRadialMenu();
                        let activeBooks = (this.searchedBooks && this.searchedBooks.length > 0)
                            ? this.searchedBooks.map(c => this.booksData ? this.booksData.books.find(b => b.code === c) : null).filter(Boolean)
                            : [node];
                        this.showBookCard(node, activeBooks);
                    }
                });
                menuItems.push({
                    icon: '&#128269;',
                    label: 'Focus this book only',
                    action: () => {
                        this.hideRadialMenu();
                        this.selectBook(node);
                    }
                });
            } else {
                menuItems.push({
                    icon: '&#128269;',
                    label: 'Explore on Word Map',
                    action: () => {
                        this.hideRadialMenu();
                        const wordsBtn = document.getElementById('view-mode-words');
                        const booksBtn = document.getElementById('view-mode-books');
                        if (wordsBtn && booksBtn) {
                            wordsBtn.classList.add('active');
                            booksBtn.classList.remove('active');
                        }
                        this.setViewMode('words');
                        if (this.searchInput) this.searchInput.value = this.formatWord(node.w, node.pos);
                        this.searchWord();
                    }
                });
                menuItems.push({ icon: '\u{1F4D6}', label: 'Verses', action: () => { this.hideRadialMenu(); this.showWordInspector(node, 'verses'); } });
                menuItems.push({
                    icon: '&#128202;',
                    label: 'Canon Usage',
                    action: () => {
                        this.hideRadialMenu();
                        this.showWordInspector(node, 'canon');
                    }
                });
                if (node.original && node.original.length > 0) {
                    menuItems.push({ icon: '<span style="font-size:0.7em;font-weight:bold;">α/א</span>', label: 'Original Language', action: () => { this.hideRadialMenu(); this.showWordInspector(node, 'original'); } });
                }
            }
        } else {
            if (isAlreadyKw) {
                menuItems.push({ icon: '-', label: 'Remove keyword', action: () => { this.hideRadialMenu(); this.removeKeyword(node.id); } });
            } else {
                menuItems.push({ icon: '+', label: 'Add keyword', action: () => { this.hideRadialMenu(); this.addKeyword(node.id); } });
            }
            menuItems.push({ icon: '\u{1F4D6}', label: 'Verses', action: () => { this.hideRadialMenu(); this.showWordInspector(node, 'verses'); } });
            menuItems.push({
                icon: '&#128202;',
                label: 'Canon Usage',
                action: () => {
                    this.hideRadialMenu();
                    this.showWordInspector(node, 'canon');
                }
            });
            if (node.original && node.original.length > 0) {
                menuItems.push({ icon: '<span style="font-size:0.7em;font-weight:bold;">α/א</span>', label: 'Original Language', action: () => { this.hideRadialMenu(); this.showWordInspector(node, 'original'); } });
            }
        }
        
        this.radialMenu.innerHTML = '';
        let radius = menuItems.length >= 5 ? 52 : (menuItems.length >= 4 ? 48 : 45);
        let startAngle = -Math.PI / 2; // start from top
        let angleStep = (2 * Math.PI) / menuItems.length;
        
        menuItems.forEach((item, i) => {
            let angle = startAngle + i * angleStep;
            let ix = screenX + radius * Math.cos(angle) - 18; // 18 = half of 36px item
            let iy = screenY + radius * Math.sin(angle) - 18;
            
            let el = document.createElement('div');
            el.className = 'bwm-radial-item';
            el.style.left = ix + 'px';
            el.style.top = iy + 'px';
            el.innerHTML = `${item.icon}<span class="bwm-radial-label">${item.label}</span>`;
            
            el.addEventListener('click', (e) => {
                e.stopPropagation();
                item.action();
            });
            el.addEventListener('touchstart', (e) => {
                e.stopPropagation();
            }, {passive: true});
            
            this.radialMenu.appendChild(el);
            
            // Trigger the scale-in animation
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    el.classList.add('visible');
                });
            });
        });
    }
    
    hideRadialMenu() {
        this.radialMenuNode = null;
        this.radialMenu.innerHTML = '';
        this.tooltip.style.opacity = '0';
        this.tooltip.style.pointerEvents = 'none';
        this.draw();
    }

    setupMobileSwipeToDismiss(card, onClose) {
        if (!card) return;

        let startY = 0;
        let startX = 0;
        let currentY = 0;
        let startTime = 0;
        let isDragging = false;
        let canDrag = false;
        let scrollEl = null;

        const onTouchMove = (e) => {
            if (!e.touches || e.touches.length === 0) return;
            const touch = e.touches[0];
            currentY = touch.clientY;
            const dy = currentY - startY;
            const dx = touch.clientX - startX;

            if (!isDragging) {
                if (scrollEl && scrollEl.scrollTop > 0) {
                    canDrag = false;
                }
                if (canDrag && dy > 8 && Math.abs(dy) > Math.abs(dx) * 1.15) {
                    isDragging = true;
                    card.style.transition = 'none';
                }
            }

            if (isDragging) {
                if (e.cancelable) e.preventDefault();
                e.stopPropagation();
                if (dy > 0) {
                    card.style.transform = `translateY(${dy}px)`;
                } else {
                    card.style.transform = `translateY(${dy * 0.2}px)`;
                }
            }
        };

        const onTouchEnd = (e) => {
            window.removeEventListener('touchmove', onTouchMove, { capture: true });
            window.removeEventListener('touchend', onTouchEnd, { capture: true });
            window.removeEventListener('touchcancel', onTouchEnd, { capture: true });

            if (!isDragging) return;
            isDragging = false;
            e.stopPropagation();

            card.style.transition = 'transform 0.24s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease';

            const dy = currentY - startY;
            const elapsed = Math.max(1, performance.now() - startTime);
            const vy = dy / elapsed;

            if (dy > 70 || (dy > 25 && vy > 0.35)) {
                card.style.transform = 'translateY(105%)';
                card.style.opacity = '0';
                setTimeout(() => {
                    card.style.transform = '';
                    card.style.transition = '';
                    card.style.opacity = '';
                    onClose();
                }, 220);
            } else {
                card.style.transform = 'translateY(0)';
                setTimeout(() => {
                    card.style.transform = '';
                    card.style.transition = '';
                }, 240);
            }
        };

        card.addEventListener('touchstart', (e) => {
            e.stopPropagation();
            if (window.innerWidth > 768) return;
            if (!e.touches || e.touches.length === 0) return;

            const touch = e.touches[0];
            startY = touch.clientY;
            startX = touch.clientX;
            currentY = startY;
            startTime = performance.now();
            isDragging = false;

            scrollEl = touch.target.closest('.bwm-window-body, .bwm-verses-body, .bwm-canon-list, .bwm-book-chip-list');
            if (scrollEl) {
                canDrag = (scrollEl.scrollTop <= 0);
            } else {
                canDrag = true;
            }

            window.addEventListener('touchmove', onTouchMove, { capture: true, passive: false });
            window.addEventListener('touchend', onTouchEnd, { capture: true });
            window.addEventListener('touchcancel', onTouchEnd, { capture: true });
        }, { passive: true });

        // Also support mouse drag on handle or header when window is mobile width
        card.addEventListener('mousedown', (e) => {
            if (window.innerWidth > 768) return;
            if (e.button !== 0) return;
            const handleOrHeader = e.target.closest('.bwm-sheet-handle, .bwm-window-header');
            if (!handleOrHeader) return;
            if (e.target.closest('button, input, a, .bwm-window-tab, .bwm-window-pill')) return;

            e.stopPropagation();
            startY = e.clientY;
            currentY = startY;
            startTime = performance.now();
            isDragging = true;
            card.style.transition = 'none';

            const onMouseMove = (me) => {
                me.stopPropagation();
                me.preventDefault();
                currentY = me.clientY;
                const dy = currentY - startY;
                if (dy > 0) {
                    card.style.transform = `translateY(${dy}px)`;
                } else {
                    card.style.transform = `translateY(${dy * 0.2}px)`;
                }
            };

            const onMouseUp = (me) => {
                window.removeEventListener('mousemove', onMouseMove, { capture: true });
                window.removeEventListener('mouseup', onMouseUp, { capture: true });
                me.stopPropagation();
                isDragging = false;

                card.style.transition = 'transform 0.24s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease';
                const dy = currentY - startY;
                const elapsed = Math.max(1, performance.now() - startTime);
                const vy = dy / elapsed;

                if (dy > 70 || (dy > 25 && vy > 0.35)) {
                    card.style.transform = 'translateY(105%)';
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.transform = '';
                        card.style.transition = '';
                        card.style.opacity = '';
                        onClose();
                    }, 220);
                } else {
                    card.style.transform = 'translateY(0)';
                    setTimeout(() => {
                        card.style.transform = '';
                        card.style.transition = '';
                    }, 240);
                }
            };

            window.addEventListener('mousemove', onMouseMove, { capture: true });
            window.addEventListener('mouseup', onMouseUp, { capture: true });
        });
    }

    hideWordInspector() {
        if (this.wordCard) {
            this.wordCard.classList.remove('visible');
            this.wordCard.style.transform = '';
            this.wordCard.style.transition = '';
            this.wordCard.style.opacity = '';
            this.wordCard.innerHTML = '';
        }
        this.inspectorNode = null;
        this.draw();
    }

    showVersesPanel(node) {
        this.showWordInspector(node, 'verses');
    }

    hideVersesPanel() {
        this.hideWordInspector();
    }

    showOriginalLangPanel(node) {
        this.showWordInspector(node, 'original');
    }

    showCanonUsageModal(node) {
        this.showWordInspector(node, 'canon');
    }

    hideCanonUsageModal() {
        this.hideWordInspector();
    }

    async showWordInspector(node, defaultTab = 'verses') {
        if (!node) return;
        this.hideBookCard();
        this.hideRadialMenu();
        this.inspectorNode = node;
        this.lastWordInspectorTab = defaultTab;
        this.draw();

        if (!this.wordCard) {
            this.wordCard = this.querySelector('#bwm-word-card');
        }
        if (!this.wordCard) return;

        let displayW = this.formatWord(node.w, node.pos);
        let vIds = (this.wordToVerses && this.wordToVerses[node.id]) ? this.wordToVerses[node.id] : [];
        let totalOccurrences = vIds.length;
        let isVersesLoaded = Boolean(this.wordToVerses && this.verses);

        const bookCounts = {};
        for (let i = 0; i < vIds.length; i++) {
            const vid = vIds[i];
            const vStr = this.verses ? this.verses[vid] : null;
            if (vStr) {
                const code = vStr.split(' ')[0];
                bookCounts[code] = (bookCounts[code] || 0) + 1;
            }
        }
        let totalBooksWithOcc = 0;
        BIBLE_BOOKS.forEach(b => {
            if ((bookCounts[b.code] || 0) > 0) totalBooksWithOcc++;
        });

        let occBadgeText = isVersesLoaded ? `${totalOccurrences} occurrence${totalOccurrences === 1 ? '' : 's'}` : 'Loading stats...';
        let booksBadgeText = isVersesLoaded ? `in ${totalBooksWithOcc} of 66 books` : '';

        let isAlreadyKw = this.isSearchMode && this.searchedWords && this.searchedWords.includes(node.id);
        let actionBtnHtml = '';
        if (this.viewMode === 'words') {
            actionBtnHtml = `
                <button type="button" class="bwm-window-pill bwm-word-action-btn" id="bwm-word-action-kw" title="${isAlreadyKw ? 'Remove keyword from map' : 'Add keyword to map'}" style="font-size:0.8em; padding:3px 8px;">
                    ${isAlreadyKw ? '&minus; Remove' : '+ Add keyword'}
                </button>
            `;
        } else {
            actionBtnHtml = `
                <button type="button" class="bwm-window-pill bwm-word-action-btn" id="bwm-word-action-explore" title="Explore on Word Map" style="font-size:0.8em; padding:3px 8px;">
                    &#128269; Explore Word
                </button>
            `;
        }

        let headerHtml = `
            <div class="bwm-sheet-handle"></div>
            <div class="bwm-window-header">
                <div class="bwm-window-header-top">
                    <div class="bwm-window-title-group">
                        <h3 class="bwm-window-title">${displayW}</h3>
                        ${node.pos ? `<span class="bwm-window-subtitle-inline">(${node.pos.toLowerCase()})</span>` : ''}
                        <span class="bwm-window-badge" id="bwm-word-occ-badge">${occBadgeText}</span>
                        ${booksBadgeText ? `<span class="bwm-window-badge-muted" id="bwm-word-books-badge">${booksBadgeText}</span>` : ''}
                    </div>
                    <div style="display:flex; align-items:center; gap:8px;">
                        ${actionBtnHtml}
                        <button type="button" class="bwm-window-close" id="bwm-word-close" title="Close inspector">&times;</button>
                    </div>
                </div>
            </div>
            <div class="bwm-window-tabs bwm-word-tabs">
                <button type="button" class="bwm-window-tab ${defaultTab === 'verses' ? 'active' : ''}" data-word-tab="verses">&#128214; Verses</button>
                <button type="button" class="bwm-window-tab ${defaultTab === 'original' ? 'active' : ''}" data-word-tab="original">&#128220; Original Language</button>
                <button type="button" class="bwm-window-tab ${defaultTab === 'canon' ? 'active' : ''}" data-word-tab="canon">&#128202; Canon Usage</button>
            </div>
        `;

        // Pane 1: Verses
        let versesPaneHtml = '';
        const BATCH_SIZE = 30;
        let tabsState = {};

        const buildVerseItemHtml = (id) => {
            let v = this.verses[id] || '';
            let [ref, text] = v.split('|');
            return `<div style="margin: 4px 0; padding: 4px 0; border-bottom: 1px solid var(--bwm-border);"><span style="color:var(--bwm-tooltip-link); font-family: monospace; font-weight:600;">${ref}</span><br><span style="font-size:0.85em; opacity:0.85;">${text || ''}</span></div>`;
        };

        const renderInitialBatch = (tabId, vList) => {
            tabsState[tabId] = {
                verses: vList,
                loaded: Math.min(BATCH_SIZE, vList.length)
            };
            let initialVerses = vList.slice(0, BATCH_SIZE);
            let html = initialVerses.map(buildVerseItemHtml).join('');
            if (vList.length > BATCH_SIZE) {
                html += `<div class="bwm-verses-status" style="text-align:center; font-size:0.8em; opacity:0.6; padding:8px 0; font-style:italic;">Showing ${BATCH_SIZE} of ${vList.length} verses (scroll for more)</div>`;
            }
            return html;
        };

        if (!isVersesLoaded) {
            versesPaneHtml = `
                <div class="bwm-word-pane" id="bwm-word-pane-verses" style="display: ${defaultTab === 'verses' ? 'flex' : 'none'};">
                    <div class="bwm-window-body" style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:40px 20px;">
                        <span class="bwm-loading-spinner" style="width:24px; height:24px; border-width:3px; margin-bottom:12px;"></span>
                        <div style="font-size:0.9em; color:var(--bwm-text-muted);">Loading verse statistics...</div>
                    </div>
                </div>
            `;
        } else {
            let tabsData = [];
            let myVerses = vIds;
            let noteHtml = '';

            if (this.viewMode === 'books') {
                let activeBooks = (this.searchedBooks && this.searchedBooks.length > 0)
                    ? this.searchedBooks.map(c => this.booksData ? this.booksData.books.find(b => b.code === c) : null).filter(Boolean)
                    : (this.selectedBook ? [this.selectedBook] : []);

                let anyBookHasDirectVerses = false;
                activeBooks.forEach(book => {
                    let bookVerses = this.getBookVerses(node.id, book.code);
                    if (bookVerses.length > 0) {
                        anyBookHasDirectVerses = true;
                        tabsData.push({
                            id: 'book_' + book.code,
                            title: book.name,
                            verses: bookVerses,
                            isBookTab: true
                        });
                    }
                });

                if (myVerses.length > 0) {
                    tabsData.push({
                        id: 'all_bible_verses',
                        title: 'All Bible Verses',
                        verses: myVerses,
                        isAllTab: true
                    });
                }

                if (!anyBookHasDirectVerses && activeBooks.length > 0) {
                    let bookNames = activeBooks.map(b => b.name).join(', ');
                    noteHtml = `<div style="padding: 10px 16px 4px 16px; font-size: 0.82em; color: var(--bwm-node-hover); font-style: italic;">Does not appear directly in ${bookNames} (semantic relationship)</div>`;
                }
            } else if (this.isSearchMode && this.wordToVerses && this.verses) {
                this.searchedWords.forEach(sw => {
                    if (sw === node.id) return;
                    let swVerses = this.wordToVerses[sw] || [];
                    let intersection = myVerses.filter(v => swVerses.includes(v));
                    if (intersection.length > 0) {
                        let kwNode = this.nodes.find(n => n.id === sw);
                        let sim = kwNode ? this.cosineSimilarity(node.v, kwNode.v) : 0;
                        
                        let parts = sw.split('_');
                        let formattedSw = parts.length > 1 ? this.formatWord(parts[0], parts[1]) : parts[0];
                        if (parts.length > 1) formattedSw += ` (${parts[1].toLowerCase()})`;
                        
                        tabsData.push({
                            id: sw,
                            title: formattedSw,
                            verses: intersection,
                            sim: sim
                        });
                    }
                });
                tabsData.sort((a, b) => b.sim - a.sim);
            }

            let versesSubtabsHtml = '';
            if (tabsData.length > 0) {
                versesSubtabsHtml = `<div class="bwm-window-tabs bwm-verses-subtabs">` + tabsData.map((t, i) => {
                    return `<button type="button" class="bwm-window-tab ${i === 0 ? 'active' : ''}" data-verses-tab-id="${t.id}">${t.title} <span style="font-size:0.8em; opacity:0.65;">(${t.verses.length})</span></button>`;
                }).join('') + `</div>`;
            }

            let versesBodyHtml = `<div class="bwm-window-body bwm-verses-body">`;
            if (tabsData.length > 0) {
                tabsData.forEach((t, i) => {
                    versesBodyHtml += `<div class="bwm-verses-tab-content" id="bwm-tab-content-${t.id}" style="display: ${i === 0 ? 'block' : 'none'};">`;
                    versesBodyHtml += renderInitialBatch(t.id, t.verses);
                    versesBodyHtml += `</div>`;
                });
            } else {
                if (myVerses.length > 0) {
                    versesBodyHtml += `<div style="margin-bottom: 8px;"><b style="font-size:0.95em;">Appears in (${myVerses.length} verses):</b></div>`;
                    versesBodyHtml += `<div class="bwm-verses-tab-content" id="bwm-tab-content-main">`;
                    versesBodyHtml += renderInitialBatch('main', myVerses);
                    versesBodyHtml += `</div>`;
                } else {
                    versesBodyHtml += `<div style="font-style: italic; opacity: 0.6;">No verse data available</div>`;
                }
            }
            versesBodyHtml += `</div>`;

            versesPaneHtml = `
                <div class="bwm-word-pane" id="bwm-word-pane-verses" style="display: ${defaultTab === 'verses' ? 'flex' : 'none'};">
                    ${noteHtml}
                    ${versesSubtabsHtml}
                    ${versesBodyHtml}
                </div>
            `;
        }

        // Pane 2: Original Language
        let origPaneHtml = '';
        let origTabsData = [];
        if (node.original && node.original.length > 0) {
            node.original.forEach((orig, i) => {
                origTabsData.push({
                    id: `orig-${i}`,
                    label: orig.lemma || orig.strongs,
                    isActive: i === 0,
                    data: orig
                });
            });
        }

        let origSubtabsHtml = '';
        if (origTabsData.length > 1) {
            origSubtabsHtml = `<div class="bwm-window-tabs bwm-orig-subtabs">` + origTabsData.map(t => {
                return `<button type="button" class="bwm-window-tab ${t.isActive ? 'active' : ''}" data-orig-target="${t.id}">${t.label}</button>`;
            }).join('') + `</div>`;
        }

        let origBodyHtml = `<div class="bwm-window-body bwm-orig-body">`;
        if (origTabsData.length === 0) {
            origBodyHtml += `<div style="font-style: italic; opacity: 0.6; padding: 15px;">No original language data available for this term.</div>`;
        } else {
            origTabsData.forEach((t, i) => {
                let orig = t.data;
                origBodyHtml += `<div class="bwm-orig-pane-item" id="${t.id}" style="display: ${i === 0 ? 'block' : 'none'};">`;
                origBodyHtml += `
                    <div style="margin-bottom: 15px;">
                        <div style="font-size: 1.5em; font-weight: bold; margin-bottom: 5px; font-family: serif;">${orig.lemma || orig.strongs}</div>
                        ${orig.translit ? `<div style="font-size: 1.1em; color: var(--bwm-text-muted); margin-bottom: 5px; font-style: italic;">${orig.translit}</div>` : ''}
                        <div style="font-size: 0.9em; margin-bottom: 15px;">
                            <span style="background: var(--bwm-badge-bg); border: 1px solid var(--bwm-border); padding: 2px 6px; border-radius: 4px; font-family: monospace;">${orig.strongs}</span>
                            <span style="opacity: 0.7; margin-left: 10px;">Translated ${orig.count} time${orig.count === 1 ? '' : 's'} as "${node.w}"</span>
                        </div>
                    </div>
                `;
                if (orig.def) {
                    origBodyHtml += `
                        <div style="border-top: 1px solid var(--bwm-border); padding-top: 12px; line-height: 1.5;">
                            <strong>Strong's Definition:</strong><br/>
                            <span style="font-size: 0.92em; line-height: 1.45;">${orig.def}</span>
                        </div>
                    `;
                }
                origBodyHtml += `</div>`;
            });
        }
        origBodyHtml += `</div>`;

        origPaneHtml = `
            <div class="bwm-word-pane" id="bwm-word-pane-original" style="display: ${defaultTab === 'original' ? 'flex' : 'none'};">
                ${origSubtabsHtml}
                ${origBodyHtml}
            </div>
        `;

        // Pane 3: Canon Usage
        let canonPaneHtml = '';
        let renderBookBars = null;
        if (!isVersesLoaded) {
            canonPaneHtml = `
                <div class="bwm-word-pane" id="bwm-word-pane-canon" style="display: ${defaultTab === 'canon' ? 'flex' : 'none'};">
                    <div class="bwm-window-body" style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:40px 20px;">
                        <span class="bwm-loading-spinner" style="width:24px; height:24px; border-width:3px; margin-bottom:12px;"></span>
                        <div style="font-size:0.9em; color:var(--bwm-text-muted);">Loading canon verse statistics...</div>
                    </div>
                </div>
            `;
        } else {
            const GENRE_LABELS = {
                'Law': 'Law (Pentateuch)',
                'History': 'History',
                'Wisdom': 'Wisdom & Poetry',
                'Major Prophets': 'Major Prophets',
                'Minor Prophets': 'Minor Prophets',
                'Gospels': 'Gospels',
                'Pauline Epistles': 'Pauline Epistles',
                'General Epistles': 'General Epistles',
                'Apocalypse': 'Apocalypse'
            };
            const GENRE_ORDER = [
                'Law', 'History', 'Wisdom', 'Major Prophets', 'Minor Prophets',
                'Gospels', 'Pauline Epistles', 'General Epistles', 'Apocalypse'
            ];

            const genreStats = {};
            GENRE_ORDER.forEach(g => {
                genreStats[g] = { count: 0, booksTotal: 0, booksWithOcc: 0, wordsTotal: 0 };
            });

            let otCount = 0;
            let ntCount = 0;
            let otWordsTotal = 0;
            let ntWordsTotal = 0;
            let otBooksWithOcc = 0;
            let ntBooksWithOcc = 0;
            let otTopBook = null;
            let ntTopBook = null;

            BIBLE_BOOKS.forEach(b => {
                const g = b.genre;
                const c = bookCounts[b.code] || 0;
                const w = b.words || 0;
                if (genreStats[g]) {
                    genreStats[g].booksTotal++;
                    genreStats[g].count += c;
                    genreStats[g].wordsTotal += w;
                    if (c > 0) genreStats[g].booksWithOcc++;
                }
                if (b.testament === 'OT') {
                    otCount += c;
                    otWordsTotal += w;
                    if (c > 0) {
                        otBooksWithOcc++;
                        if (!otTopBook || c > otTopBook.count) otTopBook = { name: b.name, code: b.code, count: c };
                    }
                } else {
                    ntCount += c;
                    ntWordsTotal += w;
                    if (c > 0) {
                        ntBooksWithOcc++;
                        if (!ntTopBook || c > ntTopBook.count) ntTopBook = { name: b.name, code: b.code, count: c };
                    }
                }
            });

            let genreHtml = GENRE_ORDER.map(g => {
                const st = genreStats[g];
                const pct = totalOccurrences > 0 ? ((st.count / totalOccurrences) * 100).toFixed(1) : '0.0';
                const barPct = totalOccurrences > 0 ? ((st.count / totalOccurrences) * 100).toFixed(1) : '0';
                const gDensity = st.wordsTotal > 0 ? ((st.count / st.wordsTotal) * 1000).toFixed(2) : '0.00';
                const color = GENRE_COLORS[g] || '#3b82f6';
                return `
                    <div class="bwm-canon-genre-card">
                        <div class="bwm-canon-genre-header">
                            <div class="bwm-canon-genre-title">
                                <span class="bwm-canon-genre-pill" style="background:${color};">${g}</span>
                                <span>${GENRE_LABELS[g] || g}</span>
                            </div>
                            <div class="bwm-canon-genre-meta">${st.booksWithOcc} of ${st.booksTotal} books &bull; ${gDensity} / 1k words</div>
                        </div>
                        <div class="bwm-canon-genre-bar-wrap">
                            <div class="bwm-canon-genre-track">
                                <div class="bwm-canon-genre-fill" style="width:${barPct}%; background:${color};"></div>
                            </div>
                            <div class="bwm-canon-genre-stat">${st.count} <span style="font-weight:400; color:var(--bwm-text-muted);">(${pct}%)</span></div>
                        </div>
                    </div>
                `;
            }).join('');

            const otPct = totalOccurrences > 0 ? (otCount / totalOccurrences) * 100 : 0;
            const ntPct = totalOccurrences > 0 ? (ntCount / totalOccurrences) * 100 : 0;
            const otDensity = otWordsTotal > 0 ? ((otCount / otWordsTotal) * 1000).toFixed(2) : '0.00';
            const ntDensity = ntWordsTotal > 0 ? ((ntCount / ntWordsTotal) * 1000).toFixed(2) : '0.00';
            const circumference = 2 * Math.PI * 40;
            const otDash = (otPct / 100) * circumference;
            const ntDash = (ntPct / 100) * circumference;

            let testamentHtml = `
                <div class="bwm-canon-testament-layout">
                    <div class="bwm-canon-donut-wrap">
                        <svg viewBox="0 0 100 100" width="160" height="160" style="transform: rotate(-90deg);">
                            <circle cx="50" cy="50" r="40" fill="none" stroke="var(--bwm-border)" stroke-width="14"></circle>
                            <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" stroke-width="14"
                                    stroke-dasharray="${otDash} ${circumference}" stroke-dashoffset="0"></circle>
                            <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" stroke-width="14"
                                    stroke-dasharray="${ntDash} ${circumference}" stroke-dashoffset="-${otDash}"></circle>
                        </svg>
                        <div style="position: absolute; display: flex; flex-direction: column; align-items: center; justify-content: center; pointer-events: none; text-align: center;">
                            <div style="font-size: 1.25em; font-weight: 700; color: var(--bwm-text);">${totalOccurrences}</div>
                            <div style="font-size: 0.75em; color: var(--bwm-text-muted);">Total Verses</div>
                        </div>
                    </div>
                    <div class="bwm-canon-cards-col">
                        <div class="bwm-canon-testament-card">
                            <div class="bwm-canon-testament-head">
                                <span class="bwm-canon-testament-tag"><span class="bwm-canon-testament-dot" style="background:#3b82f6;"></span>Old Testament</span>
                                <span class="bwm-canon-testament-val">${otCount} <span style="font-weight:normal; font-size:0.85em; color:var(--bwm-text-muted);">(${otPct.toFixed(1)}%)</span></span>
                            </div>
                            <div class="bwm-canon-testament-desc">Found in ${otBooksWithOcc} of 39 books &bull; ${otDensity} / 1k words${otTopBook ? ` &bull; Most frequent in <b>${otTopBook.name}</b> (${otTopBook.count})` : ''}</div>
                        </div>
                        <div class="bwm-canon-testament-card">
                            <div class="bwm-canon-testament-head">
                                <span class="bwm-canon-testament-tag"><span class="bwm-canon-testament-dot" style="background:#10b981;"></span>New Testament</span>
                                <span class="bwm-canon-testament-val">${ntCount} <span style="font-weight:normal; font-size:0.85em; color:var(--bwm-text-muted);">(${ntPct.toFixed(1)}%)</span></span>
                            </div>
                            <div class="bwm-canon-testament-desc">Found in ${ntBooksWithOcc} of 27 books &bull; ${ntDensity} / 1k words${ntTopBook ? ` &bull; Most frequent in <b>${ntTopBook.name}</b> (${ntTopBook.count})` : ''}</div>
                        </div>
                    </div>
                </div>
                <div style="margin-top: 14px; padding: 10px 14px; border-radius: 8px; background: var(--bwm-badge-bg); border: 1px solid var(--bwm-border); font-size: 0.84em; color: var(--bwm-text); line-height: 1.45;">
                    ${otCount > 0 && ntCount === 0 ? `<b>Testament Usage:</b> This term is found exclusively in the Old Testament in this translation index (${otDensity} occurrences per 1k words).` : ''}
                    ${ntCount > 0 && otCount === 0 ? `<b>Testament Usage:</b> This term is found exclusively in the New Testament in this translation index (${ntDensity} occurrences per 1k words).` : ''}
                    ${otCount > 0 && ntCount > 0 ? `<b>Testament Usage:</b> This term spans both testaments (${otPct.toFixed(1)}% OT vs ${ntPct.toFixed(1)}% NT). Relative to text volume, usage density is ${parseFloat(otDensity) >= parseFloat(ntDensity) ? `higher in the Old Testament (${otDensity} vs ${ntDensity} per 1k words)` : `higher in the New Testament (${ntDensity} vs ${otDensity} per 1k words)`}.` : ''}
                    ${totalOccurrences === 0 ? '<b>Testament Usage:</b> No verse occurrences recorded.' : ''}
                </div>
            `;

            renderBookBars = (filter, sort, metric) => {
                let list = BIBLE_BOOKS.map((b, idx) => {
                    const count = bookCounts[b.code] || 0;
                    const words = b.words || 1;
                    const density = (count / words) * 1000;
                    return {
                        ...b,
                        order: idx + 1,
                        count,
                        words,
                        density
                    };
                });
                if (filter === 'occ') list = list.filter(b => b.count > 0);

                if (sort === 'rank') {
                    if (metric === 'density') {
                        list.sort((a, b) => b.density - a.density || b.count - a.count || a.order - b.order);
                    } else {
                        list.sort((a, b) => b.count - a.count || b.density - a.density || a.order - b.order);
                    }
                } else {
                    list.sort((a, b) => a.order - b.order);
                }

                if (list.length === 0) {
                    return `<div style="text-align:center; padding:30px 10px; color:var(--bwm-text-muted); font-style:italic;">No book occurrences found.</div>`;
                }

                let maxVal = 1;
                if (metric === 'density') {
                    maxVal = Math.max(...list.map(b => b.density), 0);
                } else {
                    maxVal = Math.max(...list.map(b => b.count), 0);
                }

                return list.map(b => {
                    const color = GENRE_COLORS[b.genre] || '#3b82f6';
                    let barPct = '0';
                    let statHtml = '';

                    if (metric === 'density') {
                        barPct = maxVal > 0 ? ((b.density / maxVal) * 100).toFixed(1) : '0';
                        const densityStr = b.density >= 10 ? b.density.toFixed(1) : b.density.toFixed(2);
                        statHtml = `
                            <span class="bwm-canon-row-count" title="${b.density.toFixed(2)} per 1k words (${b.count} in ${b.words.toLocaleString()} words)">${densityStr}</span>
                            <span class="bwm-canon-row-pct">/1k (${b.count})</span>
                        `;
                    } else {
                        barPct = maxVal > 0 ? ((b.count / maxVal) * 100).toFixed(1) : '0';
                        const pctOfWord = totalOccurrences > 0 ? ((b.count / totalOccurrences) * 100).toFixed(1) : '0';
                        statHtml = `
                            <span class="bwm-canon-row-count" title="${b.count} occurrences">${b.count}</span>
                            <span class="bwm-canon-row-pct">(${pctOfWord}%)</span>
                        `;
                    }

                    return `
                        <div class="bwm-canon-row">
                            <div class="bwm-canon-row-book">
                                <span class="bwm-canon-row-order">${b.order}.</span>
                                <span class="bwm-canon-row-genre-dot" style="background:${color};" title="${b.genre}"></span>
                                <span class="bwm-canon-row-name" title="${b.name}">${b.name}</span>
                            </div>
                            <div class="bwm-canon-row-track">
                                <div class="bwm-canon-row-fill" style="width:${barPct}%; background:${color};"></div>
                            </div>
                            <div class="bwm-canon-row-stats">
                                ${statHtml}
                            </div>
                        </div>
                    `;
                }).join('');
            };

            canonPaneHtml = `
                <div class="bwm-word-pane" id="bwm-word-pane-canon" style="display: ${defaultTab === 'canon' ? 'flex' : 'none'};">
                    <div class="bwm-canon-subtabs">
                        <button type="button" class="bwm-window-pill active" data-canon-tab="book">&#128202; By Book</button>
                        <button type="button" class="bwm-window-pill" data-canon-tab="genre">&#128218; By Literature</button>
                        <button type="button" class="bwm-window-pill" data-canon-tab="testament">&#9878; OT vs NT</button>
                    </div>
                    <div class="bwm-window-body bwm-canon-body">
                        <div class="bwm-canon-pane-sub" id="bwm-canon-pane-book">
                            <div class="bwm-canon-controls">
                                <div class="bwm-canon-filter-group">
                                    <span style="font-weight:600; color:var(--bwm-text-muted); margin-right:2px;">Metric:</span>
                                    <button type="button" class="bwm-window-pill bwm-canon-pill-btn active" id="bwm-canon-metric-count">Count</button>
                                    <button type="button" class="bwm-window-pill bwm-canon-pill-btn" id="bwm-canon-metric-density">Density</button>
                                </div>
                                <div class="bwm-canon-filter-group">
                                    <span style="font-weight:600; color:var(--bwm-text-muted); margin-right:2px;">Show:</span>
                                    <button type="button" class="bwm-window-pill bwm-canon-pill-btn active" id="bwm-canon-filter-occ">Occurring (${totalBooksWithOcc})</button>
                                    <button type="button" class="bwm-window-pill bwm-canon-pill-btn" id="bwm-canon-filter-all">All 66</button>
                                </div>
                                <div class="bwm-canon-filter-group">
                                    <span style="font-weight:600; color:var(--bwm-text-muted); margin-right:2px;">Sort:</span>
                                    <button type="button" class="bwm-window-pill bwm-canon-pill-btn active" id="bwm-canon-sort-canon">Canonical</button>
                                    <button type="button" class="bwm-window-pill bwm-canon-pill-btn" id="bwm-canon-sort-rank">Highest</button>
                                </div>
                            </div>
                            <div id="bwm-canon-density-hint" style="display: none; font-size: 0.78em; color: var(--bwm-text-muted); margin-top: -6px; margin-bottom: 10px; font-style: italic;">
                                Density: Occurrences per 1,000 words in each book.
                            </div>
                            <div class="bwm-canon-list" id="bwm-canon-book-list"></div>
                        </div>
                        <div class="bwm-canon-pane-sub" id="bwm-canon-pane-genre" style="display: none;">
                            <div style="font-size:0.84em; color:var(--bwm-text-muted); margin-bottom:12px;">
                                Distribution across 9 standard Biblical literary genres:
                            </div>
                            <div class="bwm-canon-genre-list">${genreHtml}</div>
                        </div>
                        <div class="bwm-canon-pane-sub" id="bwm-canon-pane-testament" style="display: none;">
                            ${testamentHtml}
                        </div>
                    </div>
                </div>
            `;
        }

        this.wordCard.style.transform = '';
        this.wordCard.style.transition = '';
        this.wordCard.style.opacity = '';
        this.wordCard.innerHTML = headerHtml + versesPaneHtml + origPaneHtml + canonPaneHtml;
        this.wordCard.classList.add('visible');

        // Close button
        const closeBtn = this.wordCard.querySelector('#bwm-word-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.hideWordInspector();
            });
        }

        // Action button (keyword add/remove or explore on word map)
        const btnKw = this.wordCard.querySelector('#bwm-word-action-kw');
        if (btnKw) {
            btnKw.addEventListener('click', (e) => {
                e.stopPropagation();
                if (this.isSearchMode && this.searchedWords && this.searchedWords.includes(node.id)) {
                    this.removeKeyword(node.id);
                } else {
                    this.addKeyword(node.id);
                }
                const nowKw = this.isSearchMode && this.searchedWords && this.searchedWords.includes(node.id);
                btnKw.innerHTML = nowKw ? '&minus; Remove' : '+ Add keyword';
                btnKw.title = nowKw ? 'Remove keyword from map' : 'Add keyword to map';
            });
        }
        const btnExplore = this.wordCard.querySelector('#bwm-word-action-explore');
        if (btnExplore) {
            btnExplore.addEventListener('click', (e) => {
                e.stopPropagation();
                const wordsBtn = document.getElementById('view-mode-words');
                const booksBtn = document.getElementById('view-mode-books');
                if (wordsBtn && booksBtn) {
                    wordsBtn.classList.add('active');
                    booksBtn.classList.remove('active');
                }
                this.setViewMode('words');
                if (this.searchInput) this.searchInput.value = this.formatWord(node.w, node.pos);
                this.searchWord();
            });
        }

        // Main tabs switching
        const mainTabs = this.wordCard.querySelectorAll('.bwm-word-tabs .bwm-window-tab');
        const panes = {
            verses: this.wordCard.querySelector('#bwm-word-pane-verses'),
            original: this.wordCard.querySelector('#bwm-word-pane-original'),
            canon: this.wordCard.querySelector('#bwm-word-pane-canon')
        };
        mainTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.stopPropagation();
                const targetTab = tab.getAttribute('data-word-tab');
                this.lastWordInspectorTab = targetTab;
                mainTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                Object.keys(panes).forEach(k => {
                    if (panes[k]) panes[k].style.display = (k === targetTab) ? 'flex' : 'none';
                });
            });
        });

        // Verses tab listeners
        const loadMoreVerses = (tabId) => {
            const state = tabsState[tabId];
            if (!state || state.loaded >= state.verses.length) return;
            const container = this.wordCard.querySelector(`#bwm-tab-content-${tabId}`);
            if (!container) return;

            const nextBatch = state.verses.slice(state.loaded, state.loaded + BATCH_SIZE);
            state.loaded += nextBatch.length;

            const itemsHtml = nextBatch.map(buildVerseItemHtml).join('');
            const statusEl = container.querySelector('.bwm-verses-status');
            if (statusEl) {
                statusEl.insertAdjacentHTML('beforebegin', itemsHtml);
                if (state.loaded >= state.verses.length) {
                    statusEl.remove();
                } else {
                    statusEl.textContent = `Showing ${state.loaded} of ${state.verses.length} verses (scroll for more)`;
                }
            }
        };

        const versesBody = this.wordCard.querySelector('.bwm-verses-body');
        if (versesBody) {
            versesBody.addEventListener('scroll', () => {
                if (versesBody.scrollTop + versesBody.clientHeight >= versesBody.scrollHeight - 100) {
                    const activeSubTab = this.wordCard.querySelector('.bwm-verses-subtabs .bwm-window-tab.active');
                    const tabId = activeSubTab ? activeSubTab.getAttribute('data-verses-tab-id') : 'main';
                    loadMoreVerses(tabId);
                }
            });
        }

        const versesSubtabs = this.wordCard.querySelectorAll('.bwm-verses-subtabs .bwm-window-tab');
        versesSubtabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.stopPropagation();
                versesSubtabs.forEach(t => t.classList.remove('active'));
                this.wordCard.querySelectorAll('.bwm-verses-tab-content').forEach(c => c.style.display = 'none');
                tab.classList.add('active');
                const tid = tab.getAttribute('data-verses-tab-id');
                const targetEl = this.wordCard.querySelector(`#bwm-tab-content-${tid}`);
                if (targetEl) targetEl.style.display = 'block';
                if (versesBody) versesBody.scrollTop = 0;
            });
        });

        // Original language sub-tabs
        const origSubtabs = this.wordCard.querySelectorAll('.bwm-orig-subtabs .bwm-window-tab');
        origSubtabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.stopPropagation();
                origSubtabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const targetId = tab.getAttribute('data-orig-target');
                this.wordCard.querySelectorAll('.bwm-orig-pane-item').forEach(p => {
                    p.style.display = (p.id === targetId) ? 'block' : 'none';
                });
            });
        });

        // Canon Usage sub-tabs and controls
        if (renderBookBars) {
            let canonBookFilter = 'occ';
            let canonBookSort = 'canon';
            let canonBookMetric = 'count';
            const bookListEl = this.wordCard.querySelector('#bwm-canon-book-list');
            const densityHintEl = this.wordCard.querySelector('#bwm-canon-density-hint');
            if (bookListEl) {
                bookListEl.innerHTML = renderBookBars(canonBookFilter, canonBookSort, canonBookMetric);
            }

            const canonSubtabs = this.wordCard.querySelectorAll('.bwm-canon-subtabs .bwm-window-pill');
            const canonSubpanes = {
                book: this.wordCard.querySelector('#bwm-canon-pane-book'),
                genre: this.wordCard.querySelector('#bwm-canon-pane-genre'),
                testament: this.wordCard.querySelector('#bwm-canon-pane-testament')
            };
            canonSubtabs.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const targetTab = btn.getAttribute('data-canon-tab');
                    canonSubtabs.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    Object.keys(canonSubpanes).forEach(k => {
                        if (canonSubpanes[k]) canonSubpanes[k].style.display = (k === targetTab) ? 'block' : 'none';
                    });
                });
            });

            const btnMetricCount = this.wordCard.querySelector('#bwm-canon-metric-count');
            const btnMetricDensity = this.wordCard.querySelector('#bwm-canon-metric-density');
            const btnFilterOcc = this.wordCard.querySelector('#bwm-canon-filter-occ');
            const btnFilterAll = this.wordCard.querySelector('#bwm-canon-filter-all');
            const btnSortCanon = this.wordCard.querySelector('#bwm-canon-sort-canon');
            const btnSortRank = this.wordCard.querySelector('#bwm-canon-sort-rank');

            const refreshBookList = () => {
                if (bookListEl) {
                    bookListEl.innerHTML = renderBookBars(canonBookFilter, canonBookSort, canonBookMetric);
                }
            };

            if (btnMetricCount && btnMetricDensity) {
                btnMetricCount.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (canonBookMetric === 'count') return;
                    canonBookMetric = 'count';
                    btnMetricCount.classList.add('active');
                    btnMetricDensity.classList.remove('active');
                    if (densityHintEl) densityHintEl.style.display = 'none';
                    refreshBookList();
                });
                btnMetricDensity.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (canonBookMetric === 'density') return;
                    canonBookMetric = 'density';
                    btnMetricDensity.classList.add('active');
                    btnMetricCount.classList.remove('active');
                    if (densityHintEl) densityHintEl.style.display = 'block';
                    refreshBookList();
                });
            }

            if (btnFilterOcc && btnFilterAll) {
                btnFilterOcc.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (canonBookFilter === 'occ') return;
                    canonBookFilter = 'occ';
                    btnFilterOcc.classList.add('active');
                    btnFilterAll.classList.remove('active');
                    refreshBookList();
                });
                btnFilterAll.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (canonBookFilter === 'all') return;
                    canonBookFilter = 'all';
                    btnFilterAll.classList.add('active');
                    btnFilterOcc.classList.remove('active');
                    refreshBookList();
                });
            }

            if (btnSortCanon && btnSortRank) {
                btnSortCanon.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (canonBookSort === 'canon') return;
                    canonBookSort = 'canon';
                    btnSortCanon.classList.add('active');
                    btnSortRank.classList.remove('active');
                    refreshBookList();
                });
                btnSortRank.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (canonBookSort === 'rank') return;
                    canonBookSort = 'rank';
                    btnSortRank.classList.add('active');
                    btnSortCanon.classList.remove('active');
                    refreshBookList();
                });
            }
        }

        // Asynchronously load verses if not yet resolved
        if (!isVersesLoaded && this.versesPromise) {
            this.versesPromise.then(vData => {
                if (vData && this.inspectorNode === node && this.wordCard && this.wordCard.classList.contains('visible')) {
                    this.verses = vData.verses;
                    this.wordToVerses = vData.words;
                    this.showWordInspector(node, this.lastWordInspectorTab || defaultTab);
                }
            });
        }
    }

    startLoadingAnimation(type = 'words') {
        if (!this.loadingCanvas) return;
        this.stopLoadingAnimation();
        
        const canvas = this.loadingCanvas;
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        const width = 280;
        const height = 160;
        
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
        
        const cx = width / 2;
        const cy = height / 2;
        
        const isVerses = (type === 'verses' || this.viewMode === 'verses');
        const isBooks = !isVerses && (type === 'books' || this.viewMode === 'books');

        // Colors matching the Part-of-Speech or Book Genre palette
        const wordsColors = ['#4ade80', '#60a5fa', '#f472b6', '#fbbf24', '#94a3b8'];
        const booksColors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#ef4444', '#06b6d4', '#e11d48'];
        const colors = (isBooks || isVerses) ? booksColors : wordsColors;
        const numParticles = 36;
        const particles = [];
        
        for (let i = 0; i < numParticles; i++) {
            const angle = Math.random() * Math.PI * 2;
            const dist = Math.random() * 60 + 15;
            particles.push({
                x: cx + Math.cos(angle) * dist,
                y: cy + Math.sin(angle) * dist,
                vx: (Math.random() - 0.5) * 1.1,
                vy: (Math.random() - 0.5) * 1.1,
                radius: Math.random() * 2 + 2.2,
                color: colors[i % colors.length]
            });
        }
        
        const wordsTips = [
            "Search any word in the Bible",
            "Select a word bubble to learn more",
            "Explore original Greek & Hebrew definitions",
            "View verse links and semantic proximity",
            "Filter by Old or New Testament in Options drawer"
        ];
        const booksTips = [
            "Explore the 66 biblical books in semantic space",
            "Click any book to view its distinctive themes and vocabulary",
            "Search multiple books to compare theology (e.g. James Proverbs)",
            "Solid green links show direct occurrences in that book",
            "Dashed gray links show broader theological concepts",
            "Filter books by genre or testament in the Options drawer"
        ];
        const versesTips = [
            "Explore 30,969 biblical verses mapped by semantic centroids",
            "Discover unbiased cross-references based on 100D vector similarity",
            "Toggle between cross-reference networks and constituent word constellations",
            "Search multiple verses to find semantic bridges across the canon",
            "Compare Old and New Testament thematic parallels without theological bias"
        ];
        const tips = isVerses ? versesTips : (isBooks ? booksTips : wordsTips);
        let tipIdx = 0;
        
        const STATE_FLOAT = 0;
        const STATE_GRAVITATE = 1;
        const STATE_SHOW_TIP = 2;
        const STATE_EXPLODE = 3;
        
        let state = STATE_FLOAT;
        let stateStartTime = performance.now();
        
        const updateTipText = () => {
            if (this.loadingTip) {
                this.loadingTip.textContent = tips[tipIdx % tips.length];
                tipIdx++;
            }
        };
        updateTipText();
        
        const animate = (now) => {
            const elapsed = now - stateStartTime;
            ctx.clearRect(0, 0, width, height);
            
            if (state === STATE_FLOAT) {
                if (this.loadingTip) this.loadingTip.classList.remove('visible');
                // Floating ambient motion
                for (let p of particles) {
                    p.x += p.vx;
                    p.y += p.vy;
                    if (p.x < 10) { p.x = 10; p.vx *= -1; }
                    if (p.x > width - 10) { p.x = width - 10; p.vx *= -1; }
                    if (p.y < 10) { p.y = 10; p.vy *= -1; }
                    if (p.y > height - 10) { p.y = height - 10; p.vy *= -1; }
                }
                
                if (elapsed > 3000) {
                    state = STATE_GRAVITATE;
                    stateStartTime = now;
                }
            } else if (state === STATE_GRAVITATE) {
                // Accelerate towards center
                for (let p of particles) {
                    const dx = cx - p.x;
                    const dy = cy - p.y;
                    p.vx += dx * 0.045;
                    p.vy += dy * 0.045;
                    p.vx *= 0.86;
                    p.vy *= 0.86;
                    p.x += p.vx;
                    p.y += p.vy;
                }
                
                if (elapsed > 900) {
                    state = STATE_SHOW_TIP;
                    stateStartTime = now;
                    if (this.loadingTip) this.loadingTip.classList.add('visible');
                }
            } else if (state === STATE_SHOW_TIP) {
                // Gentle clustering & orbiting around center
                const t = (now - stateStartTime) * 0.003;
                for (let i = 0; i < particles.length; i++) {
                    const p = particles[i];
                    const targetAngle = (i / particles.length) * Math.PI * 2 + t;
                    const targetDist = 18 + Math.sin(t * 2 + i) * 10;
                    const targetX = cx + Math.cos(targetAngle) * targetDist;
                    const targetY = cy + Math.sin(targetAngle) * targetDist;
                    
                    p.x += (targetX - p.x) * 0.08;
                    p.y += (targetY - p.y) * 0.08;
                }
                
                if (elapsed > 3000) {
                    state = STATE_EXPLODE;
                    stateStartTime = now;
                    if (this.loadingTip) this.loadingTip.classList.remove('visible');
                    // Explode outwards
                    for (let p of particles) {
                        const angle = Math.atan2(p.y - cy, p.x - cx) + (Math.random() - 0.5) * 0.6;
                        const speed = Math.random() * 3.5 + 3;
                        p.vx = Math.cos(angle) * speed;
                        p.vy = Math.sin(angle) * speed;
                    }
                }
            } else if (state === STATE_EXPLODE) {
                // Bursting outwards with drag
                for (let p of particles) {
                    p.vx *= 0.93;
                    p.vy *= 0.93;
                    p.x += p.vx;
                    p.y += p.vy;
                    if (p.x < 10) { p.x = 10; p.vx *= -1; }
                    if (p.x > width - 10) { p.x = width - 10; p.vx *= -1; }
                    if (p.y < 10) { p.y = 10; p.vy *= -1; }
                    if (p.y > height - 10) { p.y = height - 10; p.vy *= -1; }
                }
                
                if (elapsed > 700) {
                    state = STATE_FLOAT;
                    stateStartTime = now;
                    updateTipText();
                    for (let p of particles) {
                        p.vx = (Math.random() - 0.5) * 1.1;
                        p.vy = (Math.random() - 0.5) * 1.1;
                    }
                }
            }
            
            // Draw connecting lines between close particles
            const maxDist = state === STATE_GRAVITATE || state === STATE_SHOW_TIP ? 40 : 55;
            ctx.lineWidth = 1;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const p1 = particles[i];
                    const p2 = particles[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < maxDist) {
                        const alpha = (1 - dist / maxDist) * 0.35;
                        ctx.strokeStyle = `rgba(150, 150, 150, ${alpha})`;
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }
            
            // Draw particles
            for (let p of particles) {
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fill();
            }
            
            this.loadingAnimId = requestAnimationFrame(animate);
        };
        
        this.loadingAnimId = requestAnimationFrame(animate);
    }

    stopLoadingAnimation() {
        if (this.loadingAnimId) {
            cancelAnimationFrame(this.loadingAnimId);
            this.loadingAnimId = null;
        }
        if (this.loadingCanvas) {
            const ctx = this.loadingCanvas.getContext('2d');
            ctx.clearRect(0, 0, this.loadingCanvas.width, this.loadingCanvas.height);
        }
        if (this.loadingTip) {
            this.loadingTip.classList.remove('visible');
        }
    }
}

customElements.define('bible-word-map', BibleWordMap);
