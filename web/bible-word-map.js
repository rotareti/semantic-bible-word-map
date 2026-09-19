const GENRE_COLORS = {
    'Law': '#3b82f6',
    'History': '#10b981',
    'Deuterocanon': '#a855f7',
    'Wisdom': '#f59e0b',
    'Wisdom & Poetry': '#f59e0b',
    'Major Prophets': '#8b5cf6',
    'Minor Prophets': '#ec4899',
    'Gospels': '#ef4444',
    'Pauline Epistles': '#06b6d4',
    'General Epistles': '#14b8a6',
    'Apocalypse': '#e11d48'
};

const BIBLE_BOOKS_BSB = [
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

const BIBLE_BOOKS_LXX = [
    { order: 1, code: 'GEN', name: 'Genesis', testament: 'OT', genre: 'Law', words: 32568 },
    { order: 2, code: 'EXO', name: 'Exodus', testament: 'OT', genre: 'Law', words: 24816 },
    { order: 3, code: 'LEV', name: 'Leviticus', testament: 'OT', genre: 'Law', words: 19082 },
    { order: 4, code: 'NUM', name: 'Numbers', testament: 'OT', genre: 'Law', words: 25059 },
    { order: 5, code: 'DEU', name: 'Deuteronomy', testament: 'OT', genre: 'Law', words: 22990 },
    { order: 6, code: 'JOS', name: 'Joshua', testament: 'OT', genre: 'History', words: 14896 },
    { order: 7, code: 'JDG', name: 'Judges', testament: 'OT', genre: 'History', words: 15580 },
    { order: 8, code: 'RUT', name: 'Ruth', testament: 'OT', genre: 'History', words: 2072 },
    { order: 9, code: '1SA', name: '1 Samuel', testament: 'OT', genre: 'History', words: 20131 },
    { order: 10, code: '2SA', name: '2 Samuel', testament: 'OT', genre: 'History', words: 17927 },
    { order: 11, code: '1KI', name: '1 Kings', testament: 'OT', genre: 'History', words: 20803 },
    { order: 12, code: '2KI', name: '2 Kings', testament: 'OT', genre: 'History', words: 18853 },
    { order: 13, code: '1CH', name: '1 Chronicles', testament: 'OT', genre: 'History', words: 16244 },
    { order: 14, code: '2CH', name: '2 Chronicles', testament: 'OT', genre: 'History', words: 21353 },
    { order: 15, code: '1ES', name: '1 Esdras', testament: 'OT', genre: 'Deuterocanon', words: 8994 },
    { order: 16, code: 'EZR', name: 'Ezra', testament: 'OT', genre: 'History', words: 5586 },
    { order: 17, code: 'NEH', name: 'Nehemiah', testament: 'OT', genre: 'History', words: 7676 },
    { order: 18, code: 'TOB', name: 'Tobit', testament: 'OT', genre: 'Deuterocanon', words: 5503 },
    { order: 19, code: 'JDT', name: 'Judith', testament: 'OT', genre: 'Deuterocanon', words: 9174 },
    { order: 20, code: 'EST', name: 'Esther', testament: 'OT', genre: 'History', words: 5843 },
    { order: 21, code: '1MA', name: '1 Maccabees', testament: 'OT', genre: 'Deuterocanon', words: 18292 },
    { order: 22, code: '2MA', name: '2 Maccabees', testament: 'OT', genre: 'Deuterocanon', words: 11917 },
    { order: 23, code: '3MA', name: '3 Maccabees', testament: 'OT', genre: 'Deuterocanon', words: 5110 },
    { order: 24, code: '4MA', name: '4 Maccabees', testament: 'OT', genre: 'Deuterocanon', words: 7859 },
    { order: 25, code: 'JOB', name: 'Job', testament: 'OT', genre: 'Wisdom', words: 13561 },
    { order: 26, code: 'PSA', name: 'Psalms', testament: 'OT', genre: 'Wisdom', words: 34964 },
    { order: 27, code: 'ODA', name: 'Odes', testament: 'OT', genre: 'Deuterocanon', words: 4186 },
    { order: 28, code: 'PRO', name: 'Proverbs', testament: 'OT', genre: 'Wisdom', words: 11164 },
    { order: 29, code: 'ECC', name: 'Ecclesiastes', testament: 'OT', genre: 'Wisdom', words: 4546 },
    { order: 30, code: 'SNG', name: 'Song of Solomon', testament: 'OT', genre: 'Wisdom', words: 2025 },
    { order: 31, code: 'WIS', name: 'Wisdom of Solomon', testament: 'OT', genre: 'Deuterocanon', words: 6943 },
    { order: 32, code: 'SIR', name: 'Sirach', testament: 'OT', genre: 'Deuterocanon', words: 18658 },
    { order: 33, code: 'PSS', name: 'Psalms of Solomon', testament: 'OT', genre: 'Deuterocanon', words: 4926 },
    { order: 34, code: 'HOS', name: 'Hosea', testament: 'OT', genre: 'Minor Prophets', words: 3941 },
    { order: 35, code: 'AMO', name: 'Amos', testament: 'OT', genre: 'Minor Prophets', words: 3210 },
    { order: 36, code: 'MIC', name: 'Micah', testament: 'OT', genre: 'Minor Prophets', words: 2368 },
    { order: 37, code: 'JOL', name: 'Joel', testament: 'OT', genre: 'Minor Prophets', words: 1580 },
    { order: 38, code: 'OBA', name: 'Obadiah', testament: 'OT', genre: 'Minor Prophets', words: 472 },
    { order: 39, code: 'JON', name: 'Jonah', testament: 'OT', genre: 'Minor Prophets', words: 1090 },
    { order: 40, code: 'NAM', name: 'Nahum', testament: 'OT', genre: 'Minor Prophets', words: 937 },
    { order: 41, code: 'HAB', name: 'Habakkuk', testament: 'OT', genre: 'Minor Prophets', words: 1105 },
    { order: 42, code: 'ZEP', name: 'Zephaniah', testament: 'OT', genre: 'Minor Prophets', words: 1223 },
    { order: 43, code: 'HAG', name: 'Haggai', testament: 'OT', genre: 'Minor Prophets', words: 947 },
    { order: 44, code: 'ZEC', name: 'Zechariah', testament: 'OT', genre: 'Minor Prophets', words: 4963 },
    { order: 45, code: 'MAL', name: 'Malachi', testament: 'OT', genre: 'Minor Prophets', words: 1416 },
    { order: 46, code: 'ISA', name: 'Isaiah', testament: 'OT', genre: 'Major Prophets', words: 27075 },
    { order: 47, code: 'JER', name: 'Jeremiah', testament: 'OT', genre: 'Major Prophets', words: 28948 },
    { order: 48, code: 'BAR', name: 'Baruch', testament: 'OT', genre: 'Deuterocanon', words: 2608 },
    { order: 49, code: 'LAM', name: 'Lamentations', testament: 'OT', genre: 'Major Prophets', words: 2391 },
    { order: 50, code: 'LJE', name: 'Letter of Jeremiah', testament: 'OT', genre: 'Deuterocanon', words: 1285 },
    { order: 51, code: 'EZK', name: 'Ezekiel', testament: 'OT', genre: 'Major Prophets', words: 29658 },
    { order: 52, code: 'SUS', name: 'Susanna', testament: 'OT', genre: 'Deuterocanon', words: 792 },
    { order: 53, code: 'DAN', name: 'Daniel', testament: 'OT', genre: 'Major Prophets', words: 10781 },
    { order: 54, code: 'BEL', name: 'Bel and the Dragon', testament: 'OT', genre: 'Deuterocanon', words: 901 },
    { order: 55, code: 'MAT', name: 'Matthew', testament: 'NT', genre: 'Gospels', words: 18373 },
    { order: 56, code: 'MRK', name: 'Mark', testament: 'NT', genre: 'Gospels', words: 11286 },
    { order: 57, code: 'LUK', name: 'Luke', testament: 'NT', genre: 'Gospels', words: 19508 },
    { order: 58, code: 'JHN', name: 'John', testament: 'NT', genre: 'Gospels', words: 15660 },
    { order: 59, code: 'ACT', name: 'Acts', testament: 'NT', genre: 'History', words: 18459 },
    { order: 60, code: 'ROM', name: 'Romans', testament: 'NT', genre: 'Pauline Epistles', words: 7120 },
    { order: 61, code: '1CO', name: '1 Corinthians', testament: 'NT', genre: 'Pauline Epistles', words: 6838 },
    { order: 62, code: '2CO', name: '2 Corinthians', testament: 'NT', genre: 'Pauline Epistles', words: 4477 },
    { order: 63, code: 'GAL', name: 'Galatians', testament: 'NT', genre: 'Pauline Epistles', words: 2231 },
    { order: 64, code: 'EPH', name: 'Ephesians', testament: 'NT', genre: 'Pauline Epistles', words: 2423 },
    { order: 65, code: 'PHP', name: 'Philippians', testament: 'NT', genre: 'Pauline Epistles', words: 1631 },
    { order: 66, code: 'COL', name: 'Colossians', testament: 'NT', genre: 'Pauline Epistles', words: 1584 },
    { order: 67, code: '1TH', name: '1 Thessalonians', testament: 'NT', genre: 'Pauline Epistles', words: 1481 },
    { order: 68, code: '2TH', name: '2 Thessalonians', testament: 'NT', genre: 'Pauline Epistles', words: 824 },
    { order: 69, code: '1TI', name: '1 Timothy', testament: 'NT', genre: 'Pauline Epistles', words: 1592 },
    { order: 70, code: '2TI', name: '2 Timothy', testament: 'NT', genre: 'Pauline Epistles', words: 1239 },
    { order: 71, code: 'TIT', name: 'Titus', testament: 'NT', genre: 'Pauline Epistles', words: 659 },
    { order: 72, code: 'PHM', name: 'Philemon', testament: 'NT', genre: 'Pauline Epistles', words: 335 },
    { order: 73, code: 'HEB', name: 'Hebrews', testament: 'NT', genre: 'General Epistles', words: 4960 },
    { order: 74, code: 'JAS', name: 'James', testament: 'NT', genre: 'General Epistles', words: 1743 },
    { order: 75, code: '1PE', name: '1 Peter', testament: 'NT', genre: 'General Epistles', words: 1685 },
    { order: 76, code: '2PE', name: '2 Peter', testament: 'NT', genre: 'General Epistles', words: 1102 },
    { order: 77, code: '1JN', name: '1 John', testament: 'NT', genre: 'General Epistles', words: 2141 },
    { order: 78, code: '2JN', name: '2 John', testament: 'NT', genre: 'General Epistles', words: 245 },
    { order: 79, code: '3JN', name: '3 John', testament: 'NT', genre: 'General Epistles', words: 219 },
    { order: 80, code: 'JUD', name: 'Jude', testament: 'NT', genre: 'General Epistles', words: 460 },
    { order: 81, code: 'REV', name: 'Revelation', testament: 'NT', genre: 'Apocalypse', words: 9856 }
];

const BIBLE_BOOKS_VUL = [
    { order: 1, code: 'GEN', name: 'Genesis', testament: 'OT', genre: 'Law', words: 25455 },
    { order: 2, code: 'EXO', name: 'Exodus', testament: 'OT', genre: 'Law', words: 20208 },
    { order: 3, code: 'LEV', name: 'Leviticus', testament: 'OT', genre: 'Law', words: 13809 },
    { order: 4, code: 'NUM', name: 'Numbers', testament: 'OT', genre: 'Law', words: 19410 },
    { order: 5, code: 'DEU', name: 'Deuteronomy', testament: 'OT', genre: 'Law', words: 18560 },
    { order: 6, code: 'JOS', name: 'Joshua', testament: 'OT', genre: 'History', words: 12253 },
    { order: 7, code: 'JDG', name: 'Judges', testament: 'OT', genre: 'History', words: 12696 },
    { order: 8, code: 'RUT', name: 'Ruth', testament: 'OT', genre: 'History', words: 1792 },
    { order: 9, code: '1SA', name: '1 Samuel', testament: 'OT', genre: 'History', words: 18394 },
    { order: 10, code: '2SA', name: '2 Samuel', testament: 'OT', genre: 'History', words: 14722 },
    { order: 11, code: '1KI', name: '1 Kings', testament: 'OT', genre: 'History', words: 17319 },
    { order: 12, code: '2KI', name: '2 Kings', testament: 'OT', genre: 'History', words: 16061 },
    { order: 13, code: '1CH', name: '1 Chronicles', testament: 'OT', genre: 'History', words: 14400 },
    { order: 14, code: '2CH', name: '2 Chronicles', testament: 'OT', genre: 'History', words: 18019 },
    { order: 15, code: 'EZR', name: 'Ezra', testament: 'OT', genre: 'History', words: 5134 },
    { order: 16, code: 'NEH', name: 'Nehemiah', testament: 'OT', genre: 'History', words: 7379 },
    { order: 17, code: 'TOB', name: 'Tobit', testament: 'OT', genre: 'Deuterocanon', words: 5031 },
    { order: 18, code: 'JDT', name: 'Judith', testament: 'OT', genre: 'Deuterocanon', words: 6643 },
    { order: 19, code: 'EST', name: 'Esther', testament: 'OT', genre: 'History', words: 5978 },
    { order: 20, code: '1MA', name: '1 Machabees', testament: 'OT', genre: 'Deuterocanon', words: 16615 },
    { order: 21, code: '2MA', name: '2 Machabees', testament: 'OT', genre: 'Deuterocanon', words: 10498 },
    { order: 22, code: 'JOB', name: 'Job', testament: 'OT', genre: 'Wisdom', words: 12567 },
    { order: 23, code: 'PSA', name: 'Psalms', testament: 'OT', genre: 'Wisdom', words: 30268 },
    { order: 24, code: 'PRO', name: 'Proverbs', testament: 'OT', genre: 'Wisdom', words: 10197 },
    { order: 25, code: 'ECC', name: 'Ecclesiastes', testament: 'OT', genre: 'Wisdom', words: 3823 },
    { order: 26, code: 'SNG', name: 'Song of Solomon', testament: 'OT', genre: 'Wisdom', words: 1844 },
    { order: 27, code: 'WIS', name: 'Wisdom of Solomon', testament: 'OT', genre: 'Deuterocanon', words: 7285 },
    { order: 28, code: 'SIR', name: 'Sirach', testament: 'OT', genre: 'Deuterocanon', words: 20508 },
    { order: 29, code: 'ISA', name: 'Isaiah', testament: 'OT', genre: 'Major Prophets', words: 24658 },
    { order: 30, code: 'JER', name: 'Jeremiah', testament: 'OT', genre: 'Major Prophets', words: 29585 },
    { order: 31, code: 'LAM', name: 'Lamentations', testament: 'OT', genre: 'Major Prophets', words: 2399 },
    { order: 32, code: 'BAR', name: 'Baruch', testament: 'OT', genre: 'Deuterocanon', words: 3619 },
    { order: 33, code: 'EZK', name: 'Ezekiel', testament: 'OT', genre: 'Major Prophets', words: 26906 },
    { order: 34, code: 'DAN', name: 'Daniel', testament: 'OT', genre: 'Major Prophets', words: 10812 },
    { order: 35, code: 'HOS', name: 'Hosea', testament: 'OT', genre: 'Minor Prophets', words: 3511 },
    { order: 36, code: 'JOL', name: 'Joel', testament: 'OT', genre: 'Minor Prophets', words: 1358 },
    { order: 37, code: 'AMO', name: 'Amos', testament: 'OT', genre: 'Minor Prophets', words: 2801 },
    { order: 38, code: 'OBA', name: 'Obadiah', testament: 'OT', genre: 'Minor Prophets', words: 428 },
    { order: 39, code: 'JON', name: 'Jonah', testament: 'OT', genre: 'Minor Prophets', words: 967 },
    { order: 40, code: 'MIC', name: 'Micah', testament: 'OT', genre: 'Minor Prophets', words: 2076 },
    { order: 41, code: 'NAM', name: 'Nahum', testament: 'OT', genre: 'Minor Prophets', words: 853 },
    { order: 42, code: 'HAB', name: 'Habakkuk', testament: 'OT', genre: 'Minor Prophets', words: 1003 },
    { order: 43, code: 'ZEP', name: 'Zephaniah', testament: 'OT', genre: 'Minor Prophets', words: 1065 },
    { order: 44, code: 'HAG', name: 'Haggai', testament: 'OT', genre: 'Minor Prophets', words: 797 },
    { order: 45, code: 'ZEC', name: 'Zechariah', testament: 'OT', genre: 'Minor Prophets', words: 4368 },
    { order: 46, code: 'MAL', name: 'Malachi', testament: 'OT', genre: 'Minor Prophets', words: 1220 },
    { order: 47, code: 'MAT', name: 'Matthew', testament: 'NT', genre: 'Gospels', words: 16543 },
    { order: 48, code: 'MRK', name: 'Mark', testament: 'NT', genre: 'Gospels', words: 10311 },
    { order: 49, code: 'LUK', name: 'Luke', testament: 'NT', genre: 'Gospels', words: 18082 },
    { order: 50, code: 'JHN', name: 'John', testament: 'NT', genre: 'Gospels', words: 14092 },
    { order: 51, code: 'ACT', name: 'Acts', testament: 'NT', genre: 'History', words: 16779 },
    { order: 52, code: 'ROM', name: 'Romans', testament: 'NT', genre: 'Pauline Epistles', words: 6607 },
    { order: 53, code: '1CO', name: '1 Corinthians', testament: 'NT', genre: 'Pauline Epistles', words: 6445 },
    { order: 54, code: '2CO', name: '2 Corinthians', testament: 'NT', genre: 'Pauline Epistles', words: 4299 },
    { order: 55, code: 'GAL', name: 'Galatians', testament: 'NT', genre: 'Pauline Epistles', words: 2130 },
    { order: 56, code: 'EPH', name: 'Ephesians', testament: 'NT', genre: 'Pauline Epistles', words: 2150 },
    { order: 57, code: 'PHP', name: 'Philippians', testament: 'NT', genre: 'Pauline Epistles', words: 1558 },
    { order: 58, code: 'COL', name: 'Colossians', testament: 'NT', genre: 'Pauline Epistles', words: 1464 },
    { order: 59, code: '1TH', name: '1 Thessalonians', testament: 'NT', genre: 'Pauline Epistles', words: 1404 },
    { order: 60, code: '2TH', name: '2 Thessalonians', testament: 'NT', genre: 'Pauline Epistles', words: 751 },
    { order: 61, code: '1TI', name: '1 Timothy', testament: 'NT', genre: 'Pauline Epistles', words: 1591 },
    { order: 62, code: '2TI', name: '2 Timothy', testament: 'NT', genre: 'Pauline Epistles', words: 1170 },
    { order: 63, code: 'TIT', name: 'Titus', testament: 'NT', genre: 'Pauline Epistles', words: 676 },
    { order: 64, code: 'PHM', name: 'Philemon', testament: 'NT', genre: 'Pauline Epistles', words: 322 },
    { order: 65, code: 'HEB', name: 'Hebrews', testament: 'NT', genre: 'General Epistles', words: 4598 },
    { order: 66, code: 'JAS', name: 'James', testament: 'NT', genre: 'General Epistles', words: 1650 },
    { order: 67, code: '1PE', name: '1 Peter', testament: 'NT', genre: 'General Epistles', words: 1661 },
    { order: 68, code: '2PE', name: '2 Peter', testament: 'NT', genre: 'General Epistles', words: 1053 },
    { order: 69, code: '1JN', name: '1 John', testament: 'NT', genre: 'General Epistles', words: 1886 },
    { order: 70, code: '2JN', name: '2 John', testament: 'NT', genre: 'General Epistles', words: 218 },
    { order: 71, code: '3JN', name: '3 John', testament: 'NT', genre: 'General Epistles', words: 211 },
    { order: 72, code: 'JUD', name: 'Jude', testament: 'NT', genre: 'General Epistles', words: 442 },
    { order: 73, code: 'REV', name: 'Revelation', testament: 'NT', genre: 'Apocalypse', words: 8483 }
];

const BIBLE_BOOKS = BIBLE_BOOKS_LXX;
const BOOK_CODE_MAP = Object.fromEntries(BIBLE_BOOKS.map(b => [b.code, b]));
const SINGLE_CHAPTER_BOOKS = new Set(['OBA', 'PHM', '2JN', '3JN', 'JUD', 'LJE', 'SUS', 'BEL', 'MAN']);

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
    '1ch': '1CH', '1chronicles': '1CH', '1chron': '1CH', '1par': '1CH', '1paralipomenon': '1CH',
    '2ch': '2CH', '2chronicles': '2CH', '2chron': '2CH', '2par': '2CH', '2paralipomenon': '2CH',
    '1es': '1ES', '1esdras': '1ES', '1esd': '1ES', 'esdrasa': '1ES',
    'ezr': 'EZR', 'ezra': 'EZR',
    'neh': 'NEH', 'nehemiah': 'NEH',
    'tob': 'TOB', 'tobit': 'TOB', 'tb': 'TOB', 'tobias': 'TOB',
    'jdt': 'JDT', 'judith': 'JDT', 'jth': 'JDT',
    'est': 'EST', 'esther': 'EST',
    '1ma': '1MA', '1maccabees': '1MA', '1macc': '1MA', '1mac': '1MA', '1machabees': '1MA', '1mach': '1MA',
    '2ma': '2MA', '2maccabees': '2MA', '2macc': '2MA', '2mac': '2MA', '2machabees': '2MA', '2mach': '2MA',
    '3ma': '3MA', '3maccabees': '3MA', '3macc': '3MA', '3mac': '3MA',
    '4ma': '4MA', '4maccabees': '4MA', '4macc': '4MA', '4mac': '4MA',
    'job': 'JOB',
    'psa': 'PSA', 'psalms': 'PSA', 'psalm': 'PSA', 'ps': 'PSA',
    'oda': 'ODA', 'odes': 'ODA', 'ode': 'ODA', 'man': 'ODA', 'prayerofmanasseh': 'ODA',
    'pro': 'PRO', 'proverbs': 'PRO', 'prv': 'PRO', 'pr': 'PRO',
    'ecc': 'ECC', 'ecclesiastes': 'ECC', 'eccl': 'ECC',
    'sng': 'SNG', 'songofsolomon': 'SNG', 'songofsongs': 'SNG', 'song': 'SNG', 'sos': 'SNG', 'canticles': 'SNG', 'canticle': 'SNG', 'canticleofcanticles': 'SNG',
    'wis': 'WIS', 'wisdom': 'WIS', 'wisdomofsolomon': 'WIS', 'ws': 'WIS',
    'sir': 'SIR', 'sirach': 'SIR', 'ecclesiasticus': 'SIR',
    'pss': 'PSS', 'psalmsofsolomon': 'PSS', 'pssol': 'PSS',
    'isa': 'ISA', 'isaiah': 'ISA', 'is': 'ISA', 'isaias': 'ISA',
    'jer': 'JER', 'jeremiah': 'JER', 'jr': 'JER', 'jeremias': 'JER',
    'bar': 'BAR', 'baruch': 'BAR',
    'lam': 'LAM', 'lamentations': 'LAM',
    'lje': 'LJE', 'letterofjeremiah': 'LJE', 'epistleofjeremiah': 'LJE', 'epjer': 'LJE',
    'ezk': 'EZK', 'ezekiel': 'EZK', 'ezek': 'EZK', 'ezechiel': 'EZK',
    'sus': 'SUS', 'susanna': 'SUS',
    'dan': 'DAN', 'daniel': 'DAN', 'dn': 'DAN',
    'bel': 'BEL', 'belandthedragon': 'BEL',
    'hos': 'HOS', 'hosea': 'HOS', 'osee': 'HOS',
    'jol': 'JOL', 'joel': 'JOL',
    'amo': 'AMO', 'amos': 'AMO',
    'oba': 'OBA', 'obadiah': 'OBA', 'abdias': 'OBA',
    'jon': 'JON', 'jonah': 'JON', 'jonas': 'JON',
    'mic': 'MIC', 'micah': 'MIC', 'micheas': 'MIC',
    'nam': 'NAM', 'nahum': 'NAM', 'nah': 'NAM',
    'hab': 'HAB', 'habakkuk': 'HAB', 'habacuc': 'HAB',
    'zep': 'ZEP', 'zephaniah': 'ZEP', 'sophonias': 'ZEP',
    'hag': 'HAG', 'haggai': 'HAG', 'aggeus': 'HAG',
    'zec': 'ZEC', 'zechariah': 'ZEC', 'zacharias': 'ZEC',
    'mal': 'MAL', 'malachi': 'MAL', 'malachias': 'MAL',
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

function getNeighborId(cr) {
    if (!cr) return null;
    return Array.isArray(cr) ? cr[0] : cr.id;
}

function getNeighborSim(cr) {
    if (!cr) return 0;
    return Array.isArray(cr) ? (cr[1] !== undefined ? cr[1] : 0) : (cr.sim !== undefined ? cr.sim : 0);
}

const LANDMARK_CHAPTERS = [
    'GEN.1', 'GEN.3', 'GEN.12', 'EXO.3', 'EXO.20', 'DEU.6', 'JOS.1', '1SA.17', '2SA.7',
    '1KI.8', 'JOB.38', 'PSA.1', 'PSA.23', 'PSA.51', 'PSA.119', 'PRO.3', 'ECC.3', 'ISA.6',
    'ISA.53', 'JER.31', 'EZK.37', 'DAN.7', 'MIC.6', 'MAT.5', 'MRK.1', 'LUK.1', 'LUK.15',
    'JHN.1', 'JHN.3', 'ACT.2', 'ACT.9', 'ROM.8', '1CO.13', 'GAL.5', 'EPH.2', 'PHP.2',
    'HEB.11', 'JAS.1', 'REV.21', 'REV.22'
];

function formatChapterRef(ref) {
    if (!ref) return '';
    let [code, chap] = ref.split('.');
    let b = BOOK_CODE_MAP[code];
    return b ? `${b.name} ${chap}` : ref;
}

function getChapterGenre(ref) {
    if (!ref) return 'General';
    let [code] = ref.split('.');
    let b = BOOK_CODE_MAP[code];
    return b ? b.genre : 'General';
}

function getChapterTestament(ref) {
    if (!ref) return 'NT';
    let [code] = ref.split('.');
    let b = BOOK_CODE_MAP[code];
    return b ? b.testament : 'NT';
}

function parseVerseMeta(v) {
    if (!v) return { b: '', c: 0, v: 0 };
    if (v.b !== undefined && v.c !== undefined && v.v !== undefined) {
        return { b: v.b, c: v.c, v: v.v };
    }
    let parts = (v.id || '').split(' ');
    let b = parts[0] || '';
    let cv = (parts[1] || '').split(':');
    let c = parseInt(cv[0], 10) || 0;
    let verseNum = parseInt(cv[1], 10) || 0;
    return { b, c, v: verseNum };
}

function damerauLevenshtein(a, b, maxDist = 2) {
    if (a === b) return 0;
    const la = a.length;
    const lb = b.length;
    if (Math.abs(la - lb) > maxDist) return maxDist + 1;
    const d = [];
    for (let i = 0; i <= la; i++) {
        d[i] = new Uint8Array(lb + 1);
        d[i][0] = i;
    }
    for (let j = 0; j <= lb; j++) {
        d[0][j] = j;
    }
    for (let i = 1; i <= la; i++) {
        let minRow = 99;
        for (let j = 1; j <= lb; j++) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            let val = Math.min(
                d[i - 1][j] + 1,
                d[i][j - 1] + 1,
                d[i - 1][j - 1] + cost
            );
            if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
                val = Math.min(val, d[i - 2][j - 2] + 1);
            }
            d[i][j] = val;
            if (val < minRow) minRow = val;
        }
        if (minRow > maxDist) return maxDist + 1;
    }
    return d[la][lb];
}

function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function detectVerseReference(query) {
    if (!query) return null;
    let norm = query.trim().toLowerCase();
    norm = norm.replace(/\b1st\b/g, '1').replace(/\bfirst\b/g, '1');
    norm = norm.replace(/\b2nd\b/g, '2').replace(/\bsecond\b/g, '2');
    norm = norm.replace(/\b3rd\b/g, '3').replace(/\bthird\b/g, '3');
    norm = norm.replace(/\bsong of songs\b/g, 'songofsolomon');

    let m = norm.match(/^(?:((?:[123]\s*)?[a-z]+(?:\s+of\s+[a-z]+)?)\s+)?(\d+)(?:[:\s.](\d+)(?:-(\d+))?)?$/i);
    if (!m) return null;
    let bStr = m[1];
    let chap = parseInt(m[2], 10);
    let vstart = m[3] ? parseInt(m[3], 10) : null;
    let vend = m[4] ? parseInt(m[4], 10) : null;
    if (!bStr) return null;

    let cleanB = bStr.replace(/\s+/g, '');
    let bookCode = BOOK_ALIASES[cleanB];
    let isTypo = false;

    if (!bookCode) {
        for (let [alias, code] of Object.entries(BOOK_ALIASES)) {
            if (cleanB.startsWith(alias)) {
                bookCode = code;
                break;
            }
        }
    }

    if (!bookCode) {
        let candidates = [];
        for (let [alias, code] of Object.entries(BOOK_ALIASES)) {
            let dist = damerauLevenshtein(cleanB, alias, 1);
            if (dist <= 1) {
                let lenDiff = Math.abs(cleanB.length - alias.length);
                let isFullName = Boolean(BOOK_CODE_MAP[code] && BOOK_CODE_MAP[code].name.toLowerCase() === alias);
                candidates.push({ alias, code, dist, lenDiff, isFullName });
            }
        }
        if (candidates.length > 0) {
            candidates.sort((a, b) => {
                if (a.dist !== b.dist) return a.dist - b.dist;
                if (a.lenDiff !== b.lenDiff) return a.lenDiff - b.lenDiff;
                if (a.isFullName !== b.isFullName) return a.isFullName ? -1 : 1;
                return 0;
            });
            bookCode = candidates[0].code;
            isTypo = true;
        }
    }

    if (!bookCode) return null;
    if (SINGLE_CHAPTER_BOOKS.has(bookCode) && vstart === null && chap > 1) {
        vstart = chap;
        vend = vend || chap;
        chap = 1;
    }
    let bName = (BOOK_CODE_MAP[bookCode] && BOOK_CODE_MAP[bookCode].name) || bookCode;
    let displayRef = `${bName} ${chap}${vstart ? ':' + vstart : ''}${vend ? '-' + vend : ''}`;
    let searchRef = `${bookCode} ${chap}:${vstart || 1}`;
    return { bookCode, bookName: bName, chap, vstart, vend, displayRef, searchRef, isTypo };
}

function detectBookMatch(query, books) {
    if (!query) return null;
    const q = query.trim().toLowerCase();
    if (q.length < 2) return null;

    if (books && Array.isArray(books)) {
        for (const b of books) {
            if (b.name.toLowerCase() === q || b.code.toLowerCase() === q) {
                return { book: b, isTypo: false, dist: 0 };
            }
        }
        let best = null;
        let bestDist = 99;
        for (const b of books) {
            const dName = damerauLevenshtein(q, b.name.toLowerCase(), 2);
            if (dName < bestDist && dName <= 2) {
                bestDist = dName;
                best = b;
            }
        }
        if (best) {
            return { book: best, isTypo: true, dist: bestDist };
        }
    }

    // Fallback against BOOK_ALIASES
    let cleanQ = q.replace(/\s+/g, '');
    let code = BOOK_ALIASES[cleanQ];
    if (code && BOOK_CODE_MAP[code]) {
        return { book: BOOK_CODE_MAP[code], isTypo: false, dist: 0 };
    }
    return null;
}

function detectChapterMatch(query, books) {
    if (!query) return null;
    let clean = query.trim();
    clean = clean.replace(/\bchapter\b|\bchap\b|\bch\b/gi, ' ').replace(/\s+/g, ' ').trim();
    let dotM = clean.match(/^([1-3]?[a-zA-Z]+)\.(\d+)$/);
    if (dotM) {
        clean = `${dotM[1]} ${dotM[2]}`;
    }
    let vr = detectVerseReference(clean);
    if (vr && !vr.vstart) {
        let chapterId = `${vr.bookCode}.${vr.chap}`;
        let displayTitle = `${vr.bookName} Chapter ${vr.chap}`;
        return {
            ...vr,
            chapterId,
            displayTitle,
            chapNum: vr.chap,
            isSingleChapterBook: SINGLE_CHAPTER_BOOKS.has(vr.bookCode)
        };
    }
    let bm = detectBookMatch(clean, books);
    if (bm && bm.book && SINGLE_CHAPTER_BOOKS.has(bm.book.code)) {
        return {
            bookCode: bm.book.code,
            bookName: bm.book.name,
            chap: 1,
            chapNum: 1,
            vstart: null,
            vend: null,
            displayRef: `${bm.book.name} 1`,
            searchRef: `${bm.book.code} 1:1`,
            chapterId: `${bm.book.code}.1`,
            displayTitle: `${bm.book.name} Chapter 1`,
            isTypo: bm.isTypo,
            isSingleChapterBook: true
        };
    }
    return null;
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
        this.chaptersData = null;
        this.chaptermapLookup = new Map();
        this.searchedChapters = [];
        this.drawerChapters = [];
        this.selectedChapter = null;
        this.chapterConnMode = 'words'; // 'words' | 'chapters' | 'verses'
        this.chapterWordsCount = 40;
        this.chapterVersesCount = 16;
        this.chapterChaptersCount = 16;
        this.chapterVersesMap = null;
        this.versemapData = null;
        this.versemapLookup = new Map();
        this.verseTextMap = new Map();
        this.verseGreekMap = new Map();
        this.showGreekOriginal = true;
        this.verseViewMode = 'refs';
        this.searchedVerses = [];
        this.selectedVerse = null;
        this.drawerVerses = [];
        this.viewMode = 'words';
        this.testamentFilter = 'all';
        this.similarityLabelsMode = 'hover'; // 'off' | 'hover' | 'all'
        const isMobileScreen = (typeof window !== 'undefined' && window.innerWidth <= 768);
        this.mapTextSize = isMobileScreen ? 'small' : 'medium'; // 'small' | 'medium' | 'large'
        this.mapTextScale = isMobileScreen ? 1.0 : 1.3;
        this._userSelectedTextSize = false;
        this._searchRecoverySeq = 0;
        this.isSearchMode = false;
        this.searchedWords = [];
        this.nodes = [];
        this.links = [];
        this.transform = d3.zoomIdentity;
        this._isLoadingActive = true;
        this._nodesBounds = null;
        this.hoveredNode = null;
        this.tooltipTimeout = null;
        this.simulation = null;
        this.neighborsPerKeyword = 100;
        this.verseRefsPerVerse = 16;
        this.verseWordsPerVerse = 6;
        this.searchRecoveryPopover = null;
        this.isOptionsPanelPinned = false;
        this.isStudyPanelPinned = false;
        
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
                    position: relative;
                    z-index: 10030;
                    display: flex;
                    justify-content: space-between;
                    gap: 10px;
                    padding-bottom: 12px;
                    flex-wrap: nowrap;
                }
                .bwm-search-controls {
                    position: relative;
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
                    z-index: 4;
                }
                .bwm-search-clear:hover {
                    background: var(--bwm-node-kw);
                    color: #ffffff;
                }
                .bwm-search-clear.visible {
                    display: flex;
                }
                .bwm-search-spinner {
                    position: absolute;
                    right: 12px;
                    top: 50%;
                    margin-top: -9px;
                    width: 18px;
                    height: 18px;
                    box-sizing: border-box;
                    border: 2.5px solid var(--bwm-border);
                    border-top-color: var(--bwm-node-hover);
                    border-radius: 50%;
                    animation: bwm-search-spin 0.65s linear infinite;
                    display: none;
                    pointer-events: none;
                    z-index: 5;
                }
                .bwm-search-clear.visible ~ .bwm-search-spinner,
                .bwm-search-input-wrapper.has-clear-btn .bwm-search-spinner {
                    right: 36px;
                }
                .bwm-search-input-wrapper.is-loading input {
                    padding-right: 60px;
                }
                @keyframes bwm-search-spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
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
                #bwm-btn-search {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    padding: 8px 16px;
                    border: 1px solid var(--bwm-border);
                    border-radius: 20px;
                    background: var(--bwm-btn-bg);
                    color: var(--bwm-text);
                    cursor: pointer;
                    font-family: var(--bwm-font);
                    box-shadow: 0 2px 5px rgba(0,0,0,0.04);
                    transition: all 0.18s ease;
                    flex-shrink: 0;
                }
                #bwm-btn-search svg {
                    display: block;
                    width: 17px;
                    height: 17px;
                    stroke-width: 2.2;
                    transition: transform 0.15s ease;
                }
                #bwm-btn-search:hover {
                    background: var(--bwm-node-hover);
                    color: #ffffff;
                    border-color: var(--bwm-node-hover);
                }
                #bwm-btn-search:hover svg {
                    transform: scale(1.1);
                }
                #bwm-btn-search:active svg {
                    transform: scale(0.94);
                }
                /* Search Recovery Popover */
                .bwm-search-recovery-popover {
                    position: absolute;
                    top: calc(100% + 8px);
                    left: 0;
                    width: 100%;
                    max-width: 640px;
                    max-height: min(72vh, calc(100dvh - 140px));
                    overflow-y: auto;
                    -webkit-overflow-scrolling: touch;
                    overscroll-behavior: contain;
                    z-index: 10031;
                    background-color: var(--bwm-bg);
                    background-color: color-mix(in srgb, var(--bwm-bg) 96%, transparent);
                    backdrop-filter: blur(16px);
                    -webkit-backdrop-filter: blur(16px);
                    border: 1px solid var(--bwm-border);
                    border-radius: 12px;
                    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.24);
                    padding: 14px 16px;
                    box-sizing: border-box;
                    display: none;
                    flex-direction: column;
                    gap: 12px;
                    animation: bwmPopoverFadeIn 0.16s ease-out;
                }
                @keyframes bwmPopoverFadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(-4px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .bwm-recovery-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 10px;
                }
                .bwm-recovery-title-row {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-weight: 600;
                    font-size: 0.95rem;
                    color: var(--bwm-text);
                }
                .bwm-recovery-close {
                    background: transparent;
                    border: none;
                    color: var(--bwm-text-muted);
                    font-size: 1.3rem;
                    line-height: 1;
                    cursor: pointer;
                    padding: 2px 6px;
                    border-radius: 4px;
                    transition: color 0.15s, background 0.15s;
                }
                .bwm-recovery-close:hover {
                    color: var(--bwm-text);
                    background: var(--bwm-badge-bg);
                }
                .bwm-recovery-section {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                }
                .bwm-recovery-section-label {
                    font-size: 0.78rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    color: var(--bwm-text-muted);
                }
                .bwm-recovery-pills {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 6px;
                }
                .bwm-recovery-pill-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 5px 12px;
                    border-radius: 16px;
                    background: var(--bwm-btn-bg);
                    border: 1px solid var(--bwm-border);
                    color: var(--bwm-text);
                    font-size: 0.88rem;
                    font-weight: 500;
                    font-family: inherit;
                    cursor: pointer;
                    transition: all 0.15s ease;
                    user-select: none;
                }
                .bwm-recovery-pill-btn:hover {
                    background: var(--bwm-btn-hover);
                    border-color: var(--bwm-node-hover);
                    color: var(--bwm-text);
                    font-weight: 600;
                    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
                    transform: translateY(-1px);
                }
                .bwm-recovery-pill-btn:hover .bwm-recovery-pill-pos {
                    background: color-mix(in srgb, var(--bwm-node-hover) 15%, var(--bwm-badge-bg));
                    color: var(--bwm-text);
                }
                .bwm-recovery-pill-btn:hover .bwm-recovery-pill-freq {
                    color: var(--bwm-text);
                    opacity: 0.95;
                }
                .bwm-recovery-pill-pos {
                    font-size: 0.76rem;
                    padding: 1px 5px;
                    border-radius: 8px;
                    background: var(--bwm-badge-bg);
                    color: var(--bwm-text-muted);
                    transition: all 0.15s ease;
                }
                .bwm-recovery-pill-freq {
                    font-size: 0.76rem;
                    color: var(--bwm-text-muted);
                    opacity: 0.85;
                    transition: all 0.15s ease;
                }
                .bwm-recovery-action-card {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 12px;
                    padding: 10px 14px;
                    border-radius: 10px;
                    background: color-mix(in srgb, var(--bwm-node-hover) 10%, var(--bwm-btn-bg));
                    border: 1px solid color-mix(in srgb, var(--bwm-node-hover) 35%, var(--bwm-border));
                }
                .bwm-recovery-action-info {
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                }
                .bwm-recovery-action-title {
                    font-weight: 600;
                    font-size: 0.92rem;
                    color: var(--bwm-text);
                }
                .bwm-recovery-action-desc {
                    font-size: 0.82rem;
                    color: var(--bwm-text-muted);
                }
                .bwm-recovery-verse-card .bwm-recovery-action-desc {
                    font-style: italic;
                    line-height: 1.35;
                }
                .bwm-recovery-canon-tag {
                    display: inline-block;
                    font-size: 0.72rem;
                    font-weight: 700;
                    padding: 1px 6px;
                    border-radius: 4px;
                    background: color-mix(in srgb, var(--bwm-node-hover) 15%, var(--bwm-badge-bg));
                    color: var(--bwm-node-hover);
                    border: 1px solid color-mix(in srgb, var(--bwm-node-hover) 40%, var(--bwm-border));
                    margin-left: 6px;
                    vertical-align: middle;
                    letter-spacing: 0.5px;
                }
                .bwm-recovery-foundation-note {
                    font-size: 0.82rem;
                    color: var(--bwm-text-muted);
                    line-height: 1.4;
                    margin: -4px 0 8px 0;
                    padding: 6px 10px;
                    border-radius: 6px;
                    background: color-mix(in srgb, var(--bwm-node-hover) 8%, var(--bwm-badge-bg));
                    border-left: 3px solid var(--bwm-node-hover);
                }
                .bwm-recovery-action-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 7px 14px;
                    border-radius: 8px;
                    background: var(--bwm-node-hover);
                    color: #ffffff;
                    border: none;
                    font-size: 0.88rem;
                    font-weight: 600;
                    font-family: inherit;
                    cursor: pointer;
                    white-space: nowrap;
                    transition: filter 0.15s ease, transform 0.15s ease;
                    flex-shrink: 0;
                }
                .bwm-recovery-action-btn:hover {
                    filter: brightness(1.12);
                    transform: translateY(-1px);
                }
                .bwm-recovery-empty-hint {
                    font-size: 0.88rem;
                    color: var(--bwm-text-muted);
                    line-height: 1.4;
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
                    z-index: 100;
                }
                .bwm-radial-item:active {
                    transform: scale(0.95);
                    z-index: 100;
                }
                .bwm-radial-label {
                    position: absolute;
                    top: -24px;
                    left: 50%;
                    transform: translateX(-50%);
                    white-space: nowrap;
                    font-size: 11px;
                    font-weight: 600;
                    color: #ffffff;
                    background: rgba(0, 0, 0, 0.85);
                    padding: 3px 7px;
                    border-radius: 4px;
                    pointer-events: none;
                    opacity: 0;
                    transition: opacity 0.15s;
                    z-index: 101;
                    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.35);
                }
                .bwm-radial-item.pos-bottom .bwm-radial-label {
                    top: calc(100% + 6px);
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
                .bwm-drawer.pinned {
                    left: 0;
                    box-shadow: 2px 0 12px rgba(0, 0, 0, 0.08);
                    border-right: 1px solid var(--bwm-border);
                }
                .bwm-panel-pin-btn {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 26px;
                    height: 26px;
                    padding: 0;
                    border-radius: 6px;
                    border: 1px solid transparent;
                    background: transparent;
                    color: var(--bwm-text-muted);
                    cursor: pointer;
                    transition: all 0.18s ease;
                }
                .bwm-panel-pin-btn:hover {
                    color: var(--bwm-text);
                    background: var(--bwm-btn-hover);
                    border-color: var(--bwm-border);
                }
                .bwm-panel-pin-btn.pinned,
                .bwm-panel-pin-btn.is-active {
                    color: var(--bwm-node-hover, #2563eb);
                    background: rgba(37, 99, 235, 0.12);
                    border-color: rgba(37, 99, 235, 0.35);
                }
                .bwm-panel-pin-btn.pinned svg,
                .bwm-panel-pin-btn.is-active svg {
                    fill: currentColor;
                    transform: rotate(-30deg);
                }
                @media (max-width: 1023px) {
                    .bwm-panel-pin-btn {
                        display: none !important;
                    }
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
                    min-height: 0;
                    scrollbar-width: thin;
                    scrollbar-color: var(--bwm-border) transparent;
                    -webkit-overflow-scrolling: touch;
                }
                .bwm-drawer-legend-btn {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: 100%;
                    box-sizing: border-box;
                    padding: 11px 14px;
                    margin-bottom: 20px;
                    background: color-mix(in srgb, var(--bwm-btn-bg) 80%, var(--bwm-text) 5%);
                    border: 1px solid var(--bwm-border);
                    border-radius: 8px;
                    font-size: 0.93em;
                    font-weight: 600;
                    color: var(--bwm-text);
                    cursor: pointer;
                    user-select: none;
                    text-align: left;
                    font-family: inherit;
                    transition: background 0.15s, border-color 0.15s, color 0.15s, box-shadow 0.15s;
                }
                .bwm-drawer-legend-btn:hover {
                    background: var(--bwm-btn-hover);
                    border-color: var(--bwm-node-hover);
                    color: var(--bwm-node-hover);
                    box-shadow: 0 2px 8px rgba(0,0,0,0.06);
                }
                .bwm-drawer-legend-btn:focus-visible {
                    outline: 2px solid var(--bwm-node-hover);
                    outline-offset: 2px;
                }
                .bwm-drawer-legend-btn svg {
                    flex-shrink: 0;
                    transition: transform 0.15s ease;
                }
                .bwm-drawer-legend-btn:hover svg {
                    transform: translateX(2px);
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
                #bwm-view-mode-filter,
                #bwm-verse-mode-filter,
                #bwm-chapter-mode-filter,
                #bwm-foundation-filter,
                #bwm-testament-filter,
                #bwm-sim-labels-filter,
                #bwm-text-size-filter {
                    display: flex;
                    width: 100%;
                    box-sizing: border-box;
                    background: var(--bwm-btn-bg);
                    border: 1px solid var(--bwm-border);
                    border-radius: 20px;
                    padding: 3px;
                    gap: 3px;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
                    user-select: none;
                    flex-wrap: nowrap;
                    margin-top: 10px;
                }
                #bwm-view-mode-filter .bwm-pill-btn,
                #bwm-verse-mode-filter .bwm-pill-btn,
                #bwm-chapter-mode-filter .bwm-pill-btn,
                #bwm-foundation-filter .bwm-pill-btn,
                #bwm-testament-filter .bwm-pill-btn,
                #bwm-sim-labels-filter .bwm-pill-btn,
                #bwm-text-size-filter .bwm-pill-btn {
                    flex: 1 1 0;
                    background: transparent;
                    border: none;
                    padding: 5px 4px;
                    border-radius: 16px;
                    font-size: 0.82em;
                    font-weight: 600;
                    color: var(--bwm-text-muted);
                    cursor: pointer;
                    transition: background 0.15s ease, color 0.15s ease, box-shadow 0.15s ease;
                    text-align: center;
                    white-space: nowrap;
                    font-family: var(--bwm-font);
                }
                #bwm-view-mode-filter .bwm-pill-btn:hover,
                #bwm-verse-mode-filter .bwm-pill-btn:hover,
                #bwm-chapter-mode-filter .bwm-pill-btn:hover,
                #bwm-foundation-filter .bwm-pill-btn:hover,
                #bwm-testament-filter .bwm-pill-btn:hover,
                #bwm-sim-labels-filter .bwm-pill-btn:hover,
                #bwm-text-size-filter .bwm-pill-btn:hover {
                    background: transparent;
                    color: var(--bwm-text);
                }
                #bwm-view-mode-filter .bwm-pill-btn.active,
                #bwm-verse-mode-filter .bwm-pill-btn.active,
                #bwm-chapter-mode-filter .bwm-pill-btn.active,
                #bwm-foundation-filter .bwm-pill-btn.active,
                #bwm-testament-filter .bwm-pill-btn.active,
                #bwm-sim-labels-filter .bwm-pill-btn.active,
                #bwm-text-size-filter .bwm-pill-btn.active {
                    background: var(--bwm-node-hover);
                    color: #ffffff;
                    border: none;
                    box-shadow: 0 1px 3px rgba(37, 99, 235, 0.35);
                    font-weight: 600;
                }
                #bwm-foundation-filter .bwm-pill-btn {
                    letter-spacing: 0.5px;
                }
                .bwm-active-word-item {
                    display: flex;
                    align-items: center;
                    margin-bottom: 8px;
                    font-size: 0.95em;
                }
                .bwm-active-word-item label {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    cursor: pointer;
                    user-select: none;
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
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: var(--bwm-bg);
                    background-color: color-mix(in srgb, var(--bwm-bg) 95%, transparent);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    color: var(--bwm-text);
                    border-radius: inherit;
                    z-index: 500;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-sizing: border-box;
                    user-select: none;
                    pointer-events: auto;
                    overflow: hidden;
                    opacity: 1;
                    transition: opacity 0.25s ease;
                }
                .bwm-loading.bwm-loading-fadeout {
                    opacity: 0;
                    pointer-events: none;
                }
                .bwm-loading.bwm-loading-collapsing {
                    pointer-events: none !important;
                    opacity: 0 !important;
                    backdrop-filter: none !important;
                    -webkit-backdrop-filter: none !important;
                    transition: opacity var(--bwm-collapse-dur, 950ms) cubic-bezier(0.25, 0.1, 0.25, 1) !important;
                }
                .bwm-loading.bwm-loading-collapsing .bwm-loading-status,
                .bwm-loading.bwm-loading-collapsing .bwm-loading-tip {
                    opacity: 0 !important;
                    transform: scale(0.92) !important;
                    transition: opacity 0.18s ease, transform 0.18s ease !important;
                    pointer-events: none !important;
                }
                .bwm-loading-visual {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    pointer-events: none;
                }
                .bwm-loading-canvas {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    display: block;
                    border-radius: inherit;
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
                    padding: 24px;
                    box-sizing: border-box;
                    z-index: 2;
                }
                .bwm-loading-tip {
                    font-size: 1.05em;
                    font-weight: 600;
                    text-align: center;
                    line-height: 1.45;
                    color: var(--bwm-text);
                    background-color: rgba(255, 255, 255, 0.92);
                    background-color: color-mix(in srgb, var(--bwm-bg) 92%, transparent);
                    backdrop-filter: blur(16px);
                    -webkit-backdrop-filter: blur(16px);
                    padding: 14px 24px;
                    border-radius: 14px;
                    border: 1px solid var(--bwm-border);
                    box-shadow: 0 8px 32px rgba(0,0,0,0.14);
                    opacity: 0;
                    transform: scale(0.9);
                    transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    max-width: 520px;
                    box-sizing: border-box;
                }
                .bwm-loading-tip.visible {
                    opacity: 1;
                    transform: scale(1);
                }
                .bwm-loading-status {
                    position: absolute;
                    bottom: 28px;
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    font-size: 0.88em;
                    color: var(--bwm-text);
                    font-weight: 600;
                    background-color: rgba(255, 255, 255, 0.92);
                    background-color: color-mix(in srgb, var(--bwm-bg) 92%, transparent);
                    backdrop-filter: blur(16px);
                    -webkit-backdrop-filter: blur(16px);
                    border: 1px solid var(--bwm-border);
                    padding: 8px 20px;
                    border-radius: 9999px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.12);
                    z-index: 3;
                    letter-spacing: 0.01em;
                    white-space: nowrap;
                    pointer-events: none;
                }
                .bwm-loading-spinner {
                    width: 15px;
                    height: 15px;
                    border: 2px solid var(--bwm-border);
                    border-top-color: var(--bwm-node-hover);
                    border-radius: 50%;
                    animation: bwm-spin 0.8s linear infinite;
                    flex-shrink: 0;
                }
                @keyframes bwm-spin {
                    to { transform: rotate(360deg); }
                }
                @media (max-width: 768px) {
                    .bwm-loading-status {
                        bottom: 18px;
                        font-size: 0.8em;
                        padding: 6px 14px;
                    }
                    .bwm-loading-tip {
                        font-size: 0.92em;
                        padding: 10px 16px;
                        max-width: calc(100% - 32px);
                    }
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
                .bwm-window-card.pinned.visible {
                    transform: translateX(0) !important;
                    opacity: 1 !important;
                    pointer-events: auto !important;
                    box-shadow: -2px 0 12px rgba(0, 0, 0, 0.08);
                    border-left: 1px solid var(--bwm-border);
                }
                .bwm-window-card:not(.visible) {
                    transform: translateX(105%) !important;
                    opacity: 0 !important;
                    pointer-events: none !important;
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
                .bwm-verse-nav-header {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                }
                .bwm-verse-nav-chevron {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 30px;
                    height: 30px;
                    padding: 0;
                    margin: 0;
                    background: transparent;
                    border: 1px solid transparent;
                    border-radius: 6px;
                    color: var(--bwm-text-muted, #94a3b8);
                    cursor: pointer;
                    transition: all 0.15s ease;
                    flex-shrink: 0;
                }
                .bwm-verse-nav-chevron:hover:not(:disabled) {
                    background: var(--bwm-bg-hover, rgba(255, 255, 255, 0.08));
                    color: var(--bwm-text, #f1f5f9);
                    border-color: var(--bwm-border, rgba(255, 255, 255, 0.12));
                }
                .bwm-verse-nav-chevron:active:not(:disabled) {
                    transform: scale(0.92);
                }
                .bwm-verse-nav-chevron:disabled {
                    opacity: 0.18;
                    cursor: not-allowed;
                    pointer-events: none;
                }
                .bwm-verse-nav-chevron svg {
                    display: block;
                    width: 20px;
                    height: 20px;
                }
                .bwm-btn-read-chapter-top {
                    display: inline-flex;
                    align-items: center;
                    gap: 5px;
                    font-size: 0.8em;
                    padding: 3px 9px;
                    font-weight: 500;
                    cursor: pointer;
                    white-space: nowrap;
                    flex-shrink: 0;
                }
                .bwm-btn-read-chapter-top svg {
                    display: block;
                    width: 12px;
                    height: 12px;
                    transition: transform 0.15s ease;
                }
                .bwm-btn-read-chapter-top:hover svg {
                    transform: translateX(2px);
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
                    color: #ffffff !important;
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
                .bwm-window-badge-sim {
                    display: inline-flex;
                    align-items: center;
                    font-size: 0.74em;
                    font-weight: 500;
                    letter-spacing: 0.2px;
                    background: rgba(37, 99, 235, 0.12);
                    color: var(--bwm-node-hover, #2563eb) !important;
                    border: 1px solid rgba(37, 99, 235, 0.35);
                    padding: 2px 7px;
                    border-radius: 10px;
                    white-space: nowrap;
                    cursor: default;
                }
                .bwm-window-badge-sim b {
                    font-weight: 700;
                    margin-left: 3px;
                }
                @media (prefers-color-scheme: dark) {
                    bible-word-map .bwm-window-badge-sim {
                        background: rgba(96, 165, 250, 0.15);
                        color: #60a5fa !important;
                        border-color: rgba(96, 165, 250, 0.35);
                    }
                }
                .bwm-window-badge-indirect {
                    display: inline-flex;
                    align-items: center;
                    font-size: 0.74em;
                    font-weight: 600;
                    letter-spacing: 0.2px;
                    padding: 2px 8px;
                    border-radius: 12px;
                    border: 1px dashed #2563eb;
                    color: #1d4ed8 !important;
                    background: rgba(37, 99, 235, 0.12) !important;
                }
                @media (prefers-color-scheme: dark) {
                    bible-word-map .bwm-window-badge-indirect {
                        border-color: #60a5fa;
                        color: #93c5fd !important;
                        background: rgba(96, 165, 250, 0.18) !important;
                    }
                }
                .bwm-book-badge {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.68em;
                    font-weight: 700;
                    letter-spacing: 0.3px;
                    padding: 2px 8px;
                    border-radius: 12px;
                    color: #ffffff !important;
                    line-height: 1.2;
                    vertical-align: middle;
                    white-space: nowrap;
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

                /* Shared Segmented Pill Toggle (- is off, + is added to map) */
                .bwm-pill-toggle {
                    display: inline-flex;
                    align-items: center;
                    justify-content: space-between;
                    background: var(--bwm-badge-bg);
                    border: 1px solid var(--bwm-border);
                    border-radius: 12px;
                    padding: 2px;
                    gap: 2px;
                    cursor: pointer;
                    user-select: none;
                    box-sizing: border-box;
                    height: 24px;
                    width: 48px;
                    flex-shrink: 0;
                    transition: border-color 0.15s ease, background-color 0.15s ease, box-shadow 0.15s ease;
                }
                .bwm-pill-toggle:hover {
                    border-color: var(--bwm-node-hover);
                }
                .bwm-pill-toggle:focus-visible {
                    outline: 2px solid var(--bwm-node-hover);
                    outline-offset: 1px;
                }
                .bwm-pill-toggle-opt {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 20px;
                    height: 18px;
                    border-radius: 9px;
                    font-size: 0.82em;
                    font-weight: 700;
                    line-height: 1;
                    color: var(--bwm-text-muted);
                    transition: background-color 0.15s ease, color 0.15s ease, box-shadow 0.15s ease, opacity 0.15s ease;
                    pointer-events: auto;
                }
                /* Inactive State: Minus is indicated as off, Plus is dimmed */
                .bwm-pill-toggle:not(.is-active) .bwm-pill-toggle-minus {
                    background: var(--bwm-input-bg);
                    color: var(--bwm-text);
                    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12);
                    opacity: 1;
                }
                .bwm-pill-toggle:not(.is-active) .bwm-pill-toggle-plus {
                    opacity: 0.35;
                }
                .bwm-pill-toggle:not(.is-active) .bwm-pill-toggle-plus:hover {
                    opacity: 0.85;
                    color: var(--bwm-node-hover);
                }
                /* Active State: Plus is highlighted with theme color, Minus is dimmed */
                .bwm-pill-toggle.is-active {
                    border-color: color-mix(in srgb, var(--bwm-node-hover) 45%, var(--bwm-border));
                }
                .bwm-pill-toggle.is-active .bwm-pill-toggle-plus {
                    background: var(--bwm-node-hover, #3b82f6);
                    color: #ffffff;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
                    opacity: 1;
                }
                .bwm-pill-toggle.is-active .bwm-pill-toggle-minus {
                    opacity: 0.35;
                }
                .bwm-pill-toggle.is-active .bwm-pill-toggle-minus:hover {
                    opacity: 0.85;
                    color: var(--bwm-text);
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

                .bwm-zoom-extents-btn {
                    position: absolute;
                    bottom: 20px;
                    right: 20px;
                    z-index: 450;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 36px;
                    height: 36px;
                    padding: 0;
                    background-color: rgba(255, 255, 255, 0.92);
                    background-color: color-mix(in srgb, var(--bwm-bg) 92%, transparent);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border: 1px solid var(--bwm-border);
                    border-radius: 50%;
                    color: var(--bwm-text);
                    cursor: pointer;
                    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
                    transition: right 0.28s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.22s cubic-bezier(0.16, 1, 0.3, 1), transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s, color 0.2s;
                    opacity: 0;
                    pointer-events: none;
                    transform: scale(0.85);
                }
                @media (min-width: 769px) {
                    .bwm-zoom-extents-btn.study-open {
                        right: 460px;
                    }
                }
                .bwm-zoom-extents-btn.visible {
                    opacity: 0.88;
                    pointer-events: auto;
                    transform: scale(1);
                }
                .bwm-zoom-extents-btn.visible:hover {
                    opacity: 1;
                    background-color: var(--bwm-btn-bg);
                    color: var(--bwm-node-hover, #2563eb);
                    transform: scale(1.08);
                    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.18);
                }
                .bwm-zoom-extents-btn.visible:active {
                    transform: scale(0.94);
                }
                /* Never show zoom extents button while the loading screen is active */
                .bwm-loading:not([style*="display: none"]) ~ .bwm-zoom-extents-btn {
                    opacity: 0 !important;
                    pointer-events: none !important;
                }

                /* Chapter Mode & Reader Styles */
                .bwm-chapter-card {
                    display: none;
                }
                .bwm-chapter-card.visible {
                    display: flex;
                }
                .bwm-chapter-card .bwm-window-body {
                    overflow-y: hidden;
                }
                .bwm-chapter-pane {
                    display: none;
                    flex-direction: column;
                    flex: 1;
                    overflow-y: auto;
                    -webkit-overflow-scrolling: touch;
                }
                .bwm-chapter-pane.active {
                    display: flex;
                }
                .bwm-chapter-subtabs {
                    border-bottom: 1px solid var(--bwm-border);
                    background: var(--bwm-badge-bg);
                    overflow-x: auto;
                    scrollbar-width: none;
                    -webkit-overflow-scrolling: touch;
                }
                .bwm-chapter-subtabs::-webkit-scrollbar {
                    display: none;
                }
                .bwm-chapter-subtabs .bwm-window-tab {
                    padding: 8px 10px;
                    font-size: 0.83em;
                    flex-shrink: 0;
                }
                .bwm-chapter-reader {
                    width: 100%;
                    padding: 8px 14px 20px 14px;
                    box-sizing: border-box;
                }
                .bwm-chapter-verses-table {
                    display: flex;
                    flex-direction: column;
                }
                .bwm-chapter-verse-row {
                    display: flex;
                    align-items: flex-start;
                    gap: 12px;
                    padding: 8px 4px;
                    border-bottom: 1px solid var(--bwm-border);
                    transition: background-color 0.12s ease;
                }
                .bwm-chapter-verse-row:hover {
                    background-color: rgba(148, 163, 184, 0.06);
                }
                .bwm-chapter-verse-row.highlighted {
                    background-color: rgba(59, 130, 246, 0.15);
                    border-left: 3px solid #3b82f6;
                    padding-left: 6px;
                }
                .bwm-chapter-verse-num-col {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: flex-start;
                    width: 36px;
                    flex-shrink: 0;
                    padding-top: 1px;
                }
                .bwm-chapter-vnum-btn {
                    font-size: 0.95em;
                    font-weight: 700;
                    color: var(--bwm-node-hover);
                    font-family: var(--bwm-mono-font, monospace);
                    background: transparent;
                    border: 1px solid transparent;
                    border-radius: 6px;
                    cursor: pointer;
                    padding: 2px 4px;
                    line-height: 1.2;
                    transition: all 0.15s ease;
                    text-align: center;
                    width: 100%;
                }
                .bwm-chapter-vnum-btn:hover {
                    background: rgba(59, 130, 246, 0.14);
                    color: var(--bwm-node-hover);
                    border-color: rgba(59, 130, 246, 0.3);
                    transform: scale(1.08);
                }
                .bwm-chapter-verse-text-col {
                    flex: 1;
                    min-width: 0;
                }
                .bwm-chapter-verse-text-col.has-parallel {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 16px;
                }
                .bwm-chapter-verse-eng {
                    font-size: 0.88em;
                    line-height: 1.5;
                    color: var(--bwm-text);
                }
                .bwm-chapter-verse-orig {
                    font-size: 0.88em;
                    line-height: 1.5;
                    color: var(--bwm-text);
                    opacity: 0.82;
                    font-family: serif;
                }
                @media (max-width: 640px) {
                    .bwm-chapter-verse-text-col.has-parallel {
                        grid-template-columns: 1fr;
                        gap: 6px;
                    }
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

                /* Neighbors Tab & Similarity Chart */
                .bwm-neighbors-body {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    padding: 12px 16px;
                }
                .bwm-neighbors-summary {
                    background: var(--bwm-badge-bg);
                    border: 1px solid var(--bwm-border);
                    border-radius: 8px;
                    padding: 10px 14px;
                    font-size: 0.84em;
                    color: var(--bwm-text);
                    line-height: 1.45;
                }
                .bwm-neighbors-list {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                }
                .bwm-neighbor-row {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 6px 10px;
                    border-radius: 8px;
                    background: var(--bwm-input-bg);
                    border: 1px solid var(--bwm-border);
                    transition: background-color 0.12s ease, transform 0.1s ease, border-color 0.12s ease;
                    cursor: pointer;
                }
                .bwm-neighbor-row:hover {
                    background: var(--bwm-badge-bg);
                    border-color: color-mix(in srgb, var(--bwm-node-hover) 40%, var(--bwm-border));
                    transform: translateX(2px);
                }
                .bwm-neighbor-rank {
                    font-family: monospace;
                    font-weight: 700;
                    font-size: 0.82em;
                    color: var(--bwm-text-muted);
                    width: 22px;
                    text-align: right;
                    flex-shrink: 0;
                }
                .bwm-neighbor-info {
                    width: 135px;
                    min-width: 110px;
                    flex-shrink: 0;
                    display: flex;
                    flex-direction: column;
                    gap: 1px;
                }
                .bwm-neighbor-word-line {
                    display: flex;
                    align-items: baseline;
                    gap: 5px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .bwm-neighbor-name {
                    font-weight: 600;
                    font-size: 0.88em;
                    color: var(--bwm-text);
                }
                .bwm-neighbor-pos {
                    font-size: 0.74em;
                    font-weight: 500;
                }
                .bwm-neighbor-orig {
                    font-size: 0.74em;
                    color: var(--bwm-text-muted);
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    max-width: 135px;
                }
                .bwm-neighbor-track {
                    flex: 1;
                    height: 14px;
                    background: var(--bwm-badge-bg);
                    border: 1px solid var(--bwm-border);
                    border-radius: 7px;
                    overflow: hidden;
                    position: relative;
                }
                .bwm-neighbor-fill {
                    height: 100%;
                    border-radius: 6px;
                    transition: width 0.35s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .bwm-neighbor-stats {
                    min-width: 54px;
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    font-size: 0.82em;
                    font-weight: 700;
                    color: var(--bwm-text);
                    font-variant-numeric: tabular-nums;
                    flex-shrink: 0;
                }
                .bwm-neighbor-action {
                    flex-shrink: 0;
                    width: 48px;
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                }
                .bwm-neighbor-action-btn {
                    font-size: 0.75em;
                    padding: 2px 7px;
                    border-radius: 6px;
                    cursor: pointer;
                    white-space: nowrap;
                    height: 24px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                }
                @media (max-width: 768px) {
                    .bwm-verse-nav-chevron {
                        display: none !important;
                    }
                    .bwm-window-tabs {
                        padding: 0 8px;
                        gap: 2px;
                    }
                    .bwm-window-tab {
                        padding: 7px 6px;
                        font-size: 0.81em;
                        gap: 4px;
                    }
                    .bwm-neighbor-info {
                        width: auto;
                        min-width: 0;
                        flex: 1;
                    }
                    .bwm-neighbor-orig {
                        max-width: 100%;
                    }
                    .bwm-neighbor-track {
                        flex: 0 0 42px;
                        width: 42px;
                    }
                    .bwm-neighbor-rank {
                        width: 18px;
                    }
                    .bwm-neighbor-stats {
                        min-width: 46px;
                        font-size: 0.78em;
                    }
                    .bwm-neighbor-action {
                        width: 48px;
                        flex-shrink: 0;
                    }
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
                .bwm-verse-text-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 6px;
                }
                .bwm-verse-english-text {
                    line-height: 1.55;
                }
                .bwm-verse-greek-box {
                    margin-top: 10px;
                    padding-top: 10px;
                    border-top: 1px dashed var(--bwm-border);
                    font-family: 'Times New Roman', 'Gentium Plus', serif;
                    font-size: 1.05em;
                    line-height: 1.5;
                    color: var(--bwm-text-muted);
                }
                .bwm-verse-greek-label {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    font-size: 0.68em;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    margin-bottom: 4px;
                    opacity: 0.65;
                }
                .bwm-verse-greek-text {
                    font-style: normal;
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
                    word-break: break-word;
                }
                .bwm-crossref-original {
                    font-size: 0.8em;
                    opacity: 0.7;
                    font-family: 'Times New Roman', 'Gentium Plus', serif;
                    margin-top: 4px;
                    line-height: 1.35;
                    word-break: break-word;
                    color: var(--bwm-text);
                    border-left: 2px solid var(--bwm-border);
                    padding-left: 6px;
                }
                .bwm-verse-expand-btn {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 22px;
                    height: 22px;
                    padding: 0;
                    margin: 0;
                    border: none;
                    background: transparent;
                    color: var(--bwm-text-muted);
                    border-radius: 4px;
                    cursor: pointer;
                    flex-shrink: 0;
                    transition: background-color 0.15s ease, color 0.15s ease;
                }
                .bwm-verse-expand-btn:hover {
                    color: var(--bwm-text);
                    background: var(--bwm-btn-hover);
                }
                .bwm-verse-expand-btn .bwm-chevron-icon {
                    width: 14px;
                    height: 14px;
                    transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .bwm-verse-expand-btn.is-expanded .bwm-chevron-icon {
                    transform: rotate(180deg);
                }
                .bwm-verse-item-original {
                    font-size: 0.8em;
                    opacity: 0.7;
                    font-family: 'Times New Roman', 'Gentium Plus', serif;
                    margin-top: 4px;
                    line-height: 1.35;
                    word-break: break-word;
                    color: var(--bwm-text);
                    border-left: 2px solid var(--bwm-border);
                    padding-left: 6px;
                }
                .bwm-verse-kw-highlight {
                    background-color: rgba(59, 130, 246, 0.14);
                    background-color: color-mix(in srgb, var(--bwm-node-hover, #2563eb) 15%, transparent);
                    border-bottom: 1.5px solid rgba(59, 130, 246, 0.45);
                    border-bottom: 1.5px solid color-mix(in srgb, var(--bwm-node-hover, #2563eb) 45%, transparent);
                    color: inherit;
                    font-weight: 600;
                    padding: 1px 3px;
                    margin: 0 -1px;
                    border-radius: 3px;
                    text-decoration: none;
                    box-decoration-break: clone;
                    -webkit-box-decoration-break: clone;
                }
                @media (prefers-color-scheme: dark) {
                    bible-word-map .bwm-verse-kw-highlight {
                        background-color: rgba(96, 165, 250, 0.22);
                        background-color: color-mix(in srgb, var(--bwm-node-hover, #60a5fa) 22%, transparent);
                        border-bottom-color: rgba(96, 165, 250, 0.55);
                        border-bottom-color: color-mix(in srgb, var(--bwm-node-hover, #60a5fa) 55%, transparent);
                    }
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

                    .bwm-window-card,
                    .bwm-drawer {
                        top: auto !important;
                        bottom: 0 !important;
                        left: 0 !important;
                        right: 0 !important;
                        width: 100% !important;
                        max-width: 100% !important;
                        max-height: min(72vh, calc(100% - var(--bwm-top-bar-height, 52px) - 14px)) !important;
                        height: auto !important;
                        border-radius: 16px 16px 0 0 !important;
                        border-top: 1px solid var(--bwm-border) !important;
                        border-bottom: none !important;
                        border-left: none !important;
                        border-right: none !important;
                        box-shadow: 0 -6px 24px rgba(0, 0, 0, 0.25) !important;
                        background-color: rgba(255, 255, 255, 0.95) !important;
                        background-color: color-mix(in srgb, var(--bwm-bg) 95%, transparent) !important;
                        backdrop-filter: blur(16px) !important;
                        -webkit-backdrop-filter: blur(16px) !important;
                        transform: translateY(105%);
                        opacity: 0;
                        pointer-events: none;
                        transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease !important;
                        z-index: 10020 !important;
                        overflow: hidden;
                    }

                    .bwm-window-card.visible,
                    .bwm-drawer.open {
                        left: 0 !important;
                        transform: translateY(0) !important;
                        opacity: 1 !important;
                        pointer-events: auto !important;
                    }

                    .bwm-drawer-header {
                        padding: 8px 20px 12px 20px;
                    }

                    .bwm-drawer-content {
                        padding: 16px 20px 24px 20px;
                    }

                    .bwm-book-card-reopen {
                        top: 12px;
                        right: 12px;
                        padding: 6px 11px;
                        font-size: 0.8em;
                    }

                    .bwm-book-card-reopen-text {
                        max-width: 110px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }

                    .bwm-zoom-extents-btn {
                        bottom: 16px;
                        right: 16px;
                        width: 34px;
                        height: 34px;
                    }

                    .bwm-canon-row-book {
                        width: 105px;
                    }

                    .bwm-canon-testament-layout {
                        flex-direction: column;
                    }

                    #bwm-btn-search {
                        padding: 7px 13px;
                    }
                    #bwm-btn-search svg {
                        width: 16px;
                        height: 16px;
                    }
                    .bwm-search-recovery-popover {
                        top: calc(100% + 6px);
                        left: -44px;
                        right: 0;
                        width: auto;
                        max-width: none;
                        max-height: min(60vh, calc(100dvh - 140px));
                        overflow-y: auto;
                        -webkit-overflow-scrolling: touch;
                        overscroll-behavior: contain;
                        padding: 12px 14px;
                        border-radius: 10px;
                        box-sizing: border-box;
                    }
                    .bwm-recovery-action-card {
                        flex-direction: column;
                        align-items: stretch;
                        gap: 8px;
                    }
                    .bwm-recovery-action-btn {
                        justify-content: center;
                        width: 100%;
                    }
                }

                /* 7. Full Map Space Legend & Guide Window */
                .bwm-legend-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: var(--bwm-bg);
                    background-color: color-mix(in srgb, var(--bwm-bg) 98%, transparent);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    z-index: 10050;
                    display: flex;
                    flex-direction: column;
                    opacity: 0;
                    pointer-events: none;
                    transform: scale(0.985);
                    transition: opacity 0.22s ease, transform 0.22s cubic-bezier(0.16, 1, 0.3, 1);
                    color: var(--bwm-text);
                    font-family: var(--bwm-font);
                    box-sizing: border-box;
                }
                .bwm-legend-overlay.visible {
                    opacity: 1;
                    pointer-events: auto;
                    transform: scale(1);
                }
                .bwm-legend-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 12px 20px;
                    border-bottom: 1px solid var(--bwm-border);
                    background: color-mix(in srgb, var(--bwm-bg) 96%, transparent);
                    flex-shrink: 0;
                    gap: 12px;
                }
                .bwm-legend-back-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 7px 14px;
                    border-radius: 8px;
                    border: 1px solid var(--bwm-border);
                    background: var(--bwm-btn-bg);
                    color: var(--bwm-text);
                    font-size: 0.9em;
                    font-weight: 600;
                    cursor: pointer;
                    transition: background 0.15s, border-color 0.15s, color 0.15s;
                    user-select: none;
                }
                .bwm-legend-back-btn:hover {
                    background: var(--bwm-btn-hover);
                    border-color: var(--bwm-node-hover);
                    color: var(--bwm-node-hover);
                }
                .bwm-legend-back-btn:focus-visible {
                    outline: 2px solid var(--bwm-node-hover);
                    outline-offset: 2px;
                }
                .bwm-legend-title {
                    margin: 0;
                    font-size: 1.15em;
                    font-weight: 700;
                    color: var(--bwm-text);
                    text-align: center;
                    flex: 1;
                }
                .bwm-legend-close-btn {
                    background: transparent;
                    border: 1px solid transparent;
                    font-size: 1.6em;
                    line-height: 1;
                    color: var(--bwm-text-muted);
                    cursor: pointer;
                    width: 36px;
                    height: 36px;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: color 0.15s, background 0.15s, border-color 0.15s;
                }
                .bwm-legend-close-btn:hover {
                    color: var(--bwm-text);
                    background: var(--bwm-btn-hover);
                    border-color: var(--bwm-border);
                }
                .bwm-legend-close-btn:focus-visible {
                    outline: 2px solid var(--bwm-node-hover);
                    outline-offset: 2px;
                }
                .bwm-legend-body {
                    flex: 1;
                    overflow-y: auto;
                    padding: 24px 20px 40px 20px;
                    display: flex;
                    justify-content: center;
                }
                .bwm-legend-content {
                    width: 100%;
                    max-width: 860px;
                    line-height: 1.6;
                }
                .bwm-legend-intro {
                    font-size: 0.98em;
                    color: var(--bwm-text-muted);
                    margin: 0 0 20px 0;
                    line-height: 1.6;
                    background: color-mix(in srgb, var(--bwm-btn-bg) 60%, transparent);
                    padding: 14px 18px;
                    border-radius: 10px;
                    border: 1px solid var(--bwm-border);
                }
                .bwm-legend-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 20px;
                }
                @media (max-width: 720px) {
                    .bwm-legend-grid {
                        grid-template-columns: 1fr;
                    }
                }
                .bwm-legend-card {
                    background: color-mix(in srgb, var(--bwm-btn-bg) 45%, transparent);
                    border: 1px solid var(--bwm-border);
                    border-radius: 10px;
                    padding: 18px 20px;
                }
                .bwm-legend-card-title {
                    margin: 0 0 12px 0;
                    font-size: 0.92em;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    color: var(--bwm-text);
                    opacity: 0.9;
                }
                .bwm-legend-list {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }
                .bwm-legend-item {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-size: 0.92em;
                }
                .bwm-legend-color-dot {
                    width: 14px;
                    height: 14px;
                    border-radius: 4px;
                    flex-shrink: 0;
                }
                .bwm-legend-label {
                    color: var(--bwm-text);
                }
                .bwm-legend-sub {
                    color: var(--bwm-text-muted);
                    font-size: 0.88em;
                }
                .bwm-legend-line {
                    display: inline-block;
                    width: 24px;
                    height: 4px;
                    border-radius: 2px;
                    flex-shrink: 0;
                }
                .bwm-legend-line-direct {
                    background-color: #16a34a;
                }
                .bwm-legend-line-indirect {
                    background-color: #94a3b8;
                }
                .bwm-legend-genres-grid {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                }
                .bwm-legend-genres-grid .bwm-book-badge {
                    font-size: 0.78em;
                    padding: 4px 10px;
                    border-radius: 14px;
                }
                .bwm-legend-tips {
                    margin: 0;
                    padding-left: 18px;
                    font-size: 0.9em;
                    color: var(--bwm-text-muted);
                    line-height: 1.55;
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
                .bwm-legend-tips strong {
                    color: var(--bwm-text);
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
                            <div class="bwm-search-spinner" id="bwm-search-spinner" style="display: none;"></div>
                        </div>
                        <button class="bwm-btn" id="bwm-btn-search" title="Search" aria-label="Search">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                <circle cx="11" cy="11" r="7.5"></circle>
                                <line x1="21" y1="21" x2="16.5" y2="16.5"></line>
                            </svg>
                        </button>
                        <div class="bwm-search-recovery-popover" id="bwm-search-recovery-popover" style="display: none;"></div>
                    </div>
                </div>
                <div class="bwm-drawer" id="bwm-drawer">
                    <div class="bwm-sheet-handle"></div>
                    <div class="bwm-drawer-header">
                        <h3>Options</h3>
                        <div style="display: flex; align-items: center; gap: 8px;">
                            ${this.renderPinButton('options')}
                            <div class="bwm-drawer-close" id="bwm-drawer-close">&times;</div>
                        </div>
                    </div>
                    <div class="bwm-drawer-content">
                        <button type="button" class="bwm-drawer-legend-btn" id="bwm-drawer-legend-btn" title="Open Map Guide &amp; Legend">
                            <span>Show Legend</span>
                            <svg class="bwm-chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </button>
                        <div class="bwm-drawer-section">
                            <div class="bwm-drawer-section-header">
                                <h4 id="bwm-active-heading">Active Words</h4>
                                <button class="bwm-btn-clear-all" id="bwm-btn-clear-all" type="button" title="Clear all active keywords">Clear All</button>
                            </div>
                            <div id="bwm-active-words">
                                <div class="bwm-empty-state">No words selected.</div>
                            </div>
                        </div>
                        <div class="bwm-drawer-section" id="bwm-view-mode-section">
                            <div class="bwm-drawer-section-header">
                                <h4>View Mode</h4>
                            </div>
                            <div class="bwm-pill-group" id="bwm-view-mode-filter">
                                <button type="button" class="bwm-pill-btn active" id="view-mode-words" data-mode="words" title="Word semantic landscape">Words</button>
                                <button type="button" class="bwm-pill-btn" id="view-mode-verses" data-mode="verses" title="Verse cross-reference constellations">Verses</button>
                                <button type="button" class="bwm-pill-btn" id="view-mode-chapters" data-mode="chapters" title="Chapter thematic landscapes">Chapters</button>
                                <button type="button" class="bwm-pill-btn" id="view-mode-books" data-mode="books" title="Biblical canon space">Books</button>
                            </div>
                            <div class="bwm-drawer-hint" id="bwm-view-mode-hint">Switch canvas between words, verses, chapters, and books.</div>
                        </div>
                        <div class="bwm-drawer-section" id="bwm-verse-mode-section" style="display: none;">
                            <div class="bwm-drawer-section-header">
                                <h4>Verse Connections Mode</h4>
                            </div>
                            <div class="bwm-pill-group" id="bwm-verse-mode-filter">
                                <button type="button" class="bwm-pill-btn ${this.verseViewMode === 'refs' ? 'active' : ''}" id="bwm-btn-mode-refs" data-submode="refs" title="View semantic cross-reference network">References</button>
                                <button type="button" class="bwm-pill-btn ${this.verseViewMode === 'words' ? 'active' : ''}" id="bwm-btn-mode-words" data-submode="words" title="View constituent word constellation">Words</button>
                            </div>
                            <div class="bwm-drawer-hint" id="bwm-verse-mode-hint">Toggle between verse cross-references and constituent words.</div>
                        </div>
                        <div class="bwm-drawer-section" id="bwm-chapter-mode-section" style="display: none;">
                            <div class="bwm-drawer-section-header">
                                <h4>Chapters Connections Mode</h4>
                            </div>
                            <div class="bwm-pill-group" id="bwm-chapter-mode-filter">
                                <button type="button" class="bwm-pill-btn ${this.chapterConnMode === 'chapters' ? 'active' : ''}" id="bwm-btn-chapmode-chapters" data-chapmode="chapters" title="Connect to semantically related chapters">Chapters</button>
                                <button type="button" class="bwm-pill-btn ${this.chapterConnMode === 'verses' ? 'active' : ''}" id="bwm-btn-chapmode-verses" data-chapmode="verses" title="Connect to canon-wide cross-reference verses">Verses</button>
                                <button type="button" class="bwm-pill-btn ${this.chapterConnMode === 'words' ? 'active' : ''}" id="bwm-btn-chapmode-words" data-chapmode="words" title="Connect to distinctive thematic words">Words</button>
                            </div>
                            <div class="bwm-drawer-hint" id="bwm-chapter-mode-hint">Toggle chapter connections between related chapters, cross-reference verses, or distinctive words.</div>
                        </div>
                        <div class="bwm-drawer-section">
                            <div class="bwm-drawer-section-header">
                                <h4>Semantic Foundation</h4>
                            </div>
                            <div class="bwm-pill-group" id="bwm-foundation-filter">
                                <button type="button" class="bwm-pill-btn active" id="bwm-btn-foundation-bsb" data-foundation="bsb" title="Berean Standard Bible English (66 Books)">BSB</button>
                                <button type="button" class="bwm-pill-btn" id="bwm-btn-foundation-lxx" data-foundation="lxx" title="Septuagint &amp; Greek NT (81 Books)">LXX</button>
                                <button type="button" class="bwm-pill-btn" id="bwm-btn-foundation-vul" data-foundation="vul" title="Latin Clementine Vulgate (73 Books)">VUL</button>
                            </div>
                            <div class="bwm-drawer-hint" id="bwm-foundation-hint">Switch underlying semantic training between BSB English (66 books), Greek Septuagint/NT (81 books), and Latin Clementine Vulgate (73 books).</div>
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
                                <button type="button" class="bwm-pill-btn active" data-testament="all" title="Show all words across Old and New Testaments">All</button>
                                <button type="button" class="bwm-pill-btn" data-testament="ot" title="Filter words occurring in the Old Testament">Old</button>
                                <button type="button" class="bwm-pill-btn" data-testament="nt" title="Filter words occurring in the New Testament">New</button>
                                <button type="button" class="bwm-pill-btn" data-testament="both" title="Filter words occurring in both Old and New Testaments">Both</button>
                            </div>
                            <div class="bwm-drawer-hint">Highlight words by presence in Old or New Testament.</div>
                        </div>
                        <div class="bwm-drawer-section">
                            <div class="bwm-drawer-section-header">
                                <h4>Similarity Labels</h4>
                            </div>
                            <div class="bwm-pill-group" id="bwm-sim-labels-filter">
                                <button type="button" class="bwm-pill-btn" data-sim-labels="off">Off</button>
                                <button type="button" class="bwm-pill-btn active" data-sim-labels="hover">On Hover</button>
                                <button type="button" class="bwm-pill-btn" data-sim-labels="all">Show All</button>
                            </div>
                            <div class="bwm-drawer-hint">Display semantic similarity percentages along connecting lines.</div>
                        </div>
                        <div class="bwm-drawer-section">
                            <div class="bwm-drawer-section-header">
                                <h4>Map Text Size</h4>
                            </div>
                            <div class="bwm-pill-group" id="bwm-text-size-filter">
                                <button type="button" class="bwm-pill-btn ${this.mapTextSize === 'small' ? 'active' : ''}" data-text-size="small" title="Default on mobile">Small</button>
                                <button type="button" class="bwm-pill-btn ${this.mapTextSize === 'medium' ? 'active' : ''}" data-text-size="medium" title="Medium font size (default on desktop)">Medium</button>
                                <button type="button" class="bwm-pill-btn ${this.mapTextSize === 'large' ? 'active' : ''}" data-text-size="large" title="Large font size (+60%)">Large</button>
                            </div>
                            <div class="bwm-drawer-hint">Scale words, percentages, and labels on the map canvas.</div>
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
                    <button type="button" class="bwm-book-card-reopen" id="bwm-chapter-card-reopen" style="display: none;" title="View chapter details">
                        <span class="bwm-book-card-reopen-icon">📑</span>
                        <span class="bwm-book-card-reopen-text">Chapter Info</span>
                    </button>
                    <button type="button" class="bwm-book-card-reopen" id="bwm-verse-card-reopen" style="display: none;" title="View verse details">
                        <span class="bwm-book-card-reopen-icon">📖</span>
                        <span class="bwm-book-card-reopen-text">Verse Info</span>
                    </button>
                    <button type="button" class="bwm-book-card-reopen" id="bwm-word-card-reopen" style="display: none;" title="View word details">
                        <span class="bwm-book-card-reopen-icon">✦</span>
                        <span class="bwm-book-card-reopen-text">Word Info</span>
                    </button>
                    <button type="button" class="bwm-zoom-extents-btn" id="bwm-zoom-extents-btn" aria-label="Zoom to fit extents" title="Zoom extents (Recenter map)">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="17" height="17">
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <polyline points="9 21 3 21 3 15"></polyline>
                            <polyline points="21 15 21 21 15 21"></polyline>
                            <polyline points="3 9 3 3 9 3"></polyline>
                        </svg>
                    </button>
                </div>
                <div class="bwm-radial-menu" id="bwm-radial-menu"></div>
                <div class="bwm-window-card bwm-word-card" id="bwm-word-card"></div>
                <div class="bwm-window-card bwm-chapter-card" id="bwm-chapter-card"></div>
                <div class="bwm-window-card bwm-book-card" id="bwm-book-card"></div>
                <div class="bwm-window-card bwm-verse-card" id="bwm-verse-card"></div>
                <div class="bwm-legend-overlay" id="bwm-legend-overlay">
                    <div class="bwm-legend-header">
                        <button type="button" class="bwm-legend-back-btn" id="bwm-legend-back-btn" aria-label="Back to Map View" title="Back to Map View">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" width="16" height="16">
                                <polyline points="15 18 9 12 15 6"></polyline>
                            </svg>
                            <span>Map View</span>
                        </button>
                        <h3 class="bwm-legend-title">Map Guide &amp; Legend</h3>
                        <button type="button" class="bwm-legend-close-btn" id="bwm-legend-close-btn" aria-label="Close Legend" title="Close Legend">&times;</button>
                    </div>
                    <div class="bwm-legend-body">
                        <div class="bwm-legend-content">
                            <div class="bwm-legend-intro">
                                Explore the Holy Scriptures through a semantic lens. Switch between the Berean Standard Bible (BSB), Greek Septuagint / New Testament (LXX), and Latin Clementine Vulgate (VUL) in Options. Each dot represents a word, biblical book, or verse centroid, and physical distance indicates semantic proximity based on biblical usage.
                            </div>
                            <div class="bwm-legend-grid">
                                <div class="bwm-legend-card">
                                    <h4 class="bwm-legend-card-title">Word Colors (Part of Speech)</h4>
                                    <div class="bwm-legend-list">
                                        <div class="bwm-legend-item">
                                            <span class="bwm-legend-color-dot" style="background-color: #4ade80;"></span>
                                            <div>
                                                <div class="bwm-legend-label">Proper Nouns</div>
                                                <div class="bwm-legend-sub">People, Places, Divine Titles</div>
                                            </div>
                                        </div>
                                        <div class="bwm-legend-item">
                                            <span class="bwm-legend-color-dot" style="background-color: #60a5fa;"></span>
                                            <div>
                                                <div class="bwm-legend-label">Nouns</div>
                                                <div class="bwm-legend-sub">Objects, Entities, Theological Concepts</div>
                                            </div>
                                        </div>
                                        <div class="bwm-legend-item">
                                            <span class="bwm-legend-color-dot" style="background-color: #f472b6;"></span>
                                            <div>
                                                <div class="bwm-legend-label">Verbs</div>
                                                <div class="bwm-legend-sub">Actions, Commands, Events</div>
                                            </div>
                                        </div>
                                        <div class="bwm-legend-item">
                                            <span class="bwm-legend-color-dot" style="background-color: #fbbf24;"></span>
                                            <div>
                                                <div class="bwm-legend-label">Adjectives &amp; Adverbs</div>
                                                <div class="bwm-legend-sub">Qualifiers, Modifiers, Descriptions</div>
                                            </div>
                                        </div>
                                        <div class="bwm-legend-item">
                                            <span class="bwm-legend-color-dot" style="background-color: #94a3b8;"></span>
                                            <div>
                                                <div class="bwm-legend-label">Other</div>
                                                <div class="bwm-legend-sub">Conjunctions, Pronouns, Particles</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="bwm-legend-card">
                                    <h4 class="bwm-legend-card-title">Connection Lines</h4>
                                    <div class="bwm-legend-list">
                                        <div class="bwm-legend-item">
                                            <span class="bwm-legend-line bwm-legend-line-direct"></span>
                                            <div>
                                                <div class="bwm-legend-label">Direct Semantic Connections</div>
                                                <div class="bwm-legend-sub">Single verse linked words / word constellations</div>
                                            </div>
                                        </div>
                                        <div class="bwm-legend-item">
                                            <span class="bwm-legend-line bwm-legend-line-indirect"></span>
                                            <div>
                                                <div class="bwm-legend-label">Secondary / Bridge Links</div>
                                                <div class="bwm-legend-sub">Indirect semantic links and contextual proximity</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="bwm-legend-card">
                                    <h4 class="bwm-legend-card-title">Testament Highlighting</h4>
                                    <div class="bwm-legend-list">
                                        <div class="bwm-legend-item">
                                            <span class="bwm-legend-color-dot" style="background-color: #3b82f6;"></span>
                                            <div>
                                                <div class="bwm-legend-label">Old Testament Exclusive</div>
                                                <div class="bwm-legend-sub">Appears only in Old Testament books</div>
                                            </div>
                                        </div>
                                        <div class="bwm-legend-item">
                                            <span class="bwm-legend-color-dot" style="background-color: #10b981;"></span>
                                            <div>
                                                <div class="bwm-legend-label">New Testament Exclusive</div>
                                                <div class="bwm-legend-sub">Appears only in New Testament books</div>
                                            </div>
                                        </div>
                                        <div class="bwm-legend-item">
                                            <span class="bwm-legend-color-dot" style="background-color: #8b5cf6;"></span>
                                            <div>
                                                <div class="bwm-legend-label">Shared Vocabulary</div>
                                                <div class="bwm-legend-sub">Spans across both Testaments</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="bwm-legend-card">
                                    <h4 class="bwm-legend-card-title">Book &amp; Verse Genres</h4>
                                    <div class="bwm-legend-genres-grid">
                                        <span class="bwm-book-badge" style="background: #3b82f6;">Law</span>
                                        <span class="bwm-book-badge" style="background: #10b981;">History</span>
                                        <span class="bwm-book-badge" style="background: #a855f7;">Deuterocanon</span>
                                        <span class="bwm-book-badge" style="background: #f59e0b;">Wisdom &amp; Poetry</span>
                                        <span class="bwm-book-badge" style="background: #8b5cf6;">Major Prophets</span>
                                        <span class="bwm-book-badge" style="background: #ec4899;">Minor Prophets</span>
                                        <span class="bwm-book-badge" style="background: #ef4444;">Gospels</span>
                                        <span class="bwm-book-badge" style="background: #06b6d4;">Pauline Epistles</span>
                                        <span class="bwm-book-badge" style="background: #14b8a6;">General Epistles</span>
                                        <span class="bwm-book-badge" style="background: #e11d48;">Apocalypse</span>
                                    </div>
                                </div>
                                <div class="bwm-legend-card" style="grid-column: 1 / -1;">
                                    <h4 class="bwm-legend-card-title">Navigation &amp; Controls</h4>
                                    <ul class="bwm-legend-tips">
                                        <li><strong>Left Click / Tap:</strong> Select word, verse, or book to inspect details in the study drawer.</li>
                                        <li><strong>Right Click:</strong> Open quick actions radial menu on bubbles to add/remove keywords or view references.</li>
                                        <li><strong>Scroll Wheel / Pinch:</strong> Zoom smoothly into dense semantic constellations.</li>
                                        <li><strong>Click &amp; Drag:</strong> Pan freely across the semantic projection landscape.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    get showSimilarityLabels() {
        return this.similarityLabelsMode === 'all';
    }

    set showSimilarityLabels(val) {
        if (typeof val === 'string') {
            this.similarityLabelsMode = val;
        } else {
            this.similarityLabelsMode = val ? 'all' : 'off';
        }
    }

    updateTopBarHeight() {
        if (!this.topBar) {
            this.topBar = this.querySelector('.bwm-top-bar');
        }
        if (this.topBar) {
            const h = Math.ceil(this.topBar.getBoundingClientRect().height || this.topBar.offsetHeight || 52);
            this.style.setProperty('--bwm-top-bar-height', `${h}px`);
        }
    }

    setMapTextSize(size, isUserAction = true) {
        if (isUserAction) {
            this._userSelectedTextSize = true;
        }
        if (size === 'medium') {
            this.mapTextSize = 'medium';
            this.mapTextScale = 1.3;
        } else if (size === 'large') {
            this.mapTextSize = 'large';
            this.mapTextScale = 1.6;
        } else {
            this.mapTextSize = 'small';
            this.mapTextScale = 1.0;
        }
        const textSizePills = this.querySelectorAll('#bwm-text-size-filter .bwm-pill-btn');
        textSizePills.forEach(btn => {
            if (btn.getAttribute('data-text-size') === this.mapTextSize) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        this.draw();
    }

    connectedCallback() {
        let urlParams = new URLSearchParams(window.location.search);
        let baseParam = (urlParams.get('c') || urlParams.get('canon') || urlParams.get('base') || urlParams.get('foundation') || this.getAttribute('foundation') || 'bsb').toLowerCase();
        if (baseParam === 'lxx' || baseParam === 'l') {
            this.foundation = 'lxx';
        } else if (baseParam === 'vul' || baseParam === 'v' || baseParam === 'vulgata' || baseParam === 'vulgate') {
            this.foundation = 'vul';
        } else if (baseParam === 'af' || baseParam === 'pat') {
            this.foundation = baseParam;
        } else {
            this.foundation = 'bsb';
        }

        const vParam = '?v=10.2.0';
        if (this.foundation === 'lxx') {
            this.src2d = this.getAttribute('src-2d-lxx') || ('data/output/wordmap_2d_lxx.json' + vParam);
            this.srcVerses = this.getAttribute('src-verses-lxx') || ('data/output/verse_index_lxx.json' + vParam);
            this.srcBooks = this.getAttribute('src-books-lxx') || ('data/output/bookmap_2d_lxx.json' + vParam);
            this.srcVersemap = this.getAttribute('src-versemap-lxx') || ('data/output/versemap_2d_lxx.json' + vParam);
            this.srcChapters = this.getAttribute('src-chapters-lxx') || ('data/output/chaptermap_2d_lxx.json' + vParam);
        } else if (this.foundation === 'vul') {
            this.src2d = this.getAttribute('src-2d-vul') || ('data/output/wordmap_2d_vul.json' + vParam);
            this.srcVerses = this.getAttribute('src-verses-vul') || ('data/output/verse_index_vul.json' + vParam);
            this.srcBooks = this.getAttribute('src-books-vul') || ('data/output/bookmap_2d_vul.json' + vParam);
            this.srcVersemap = this.getAttribute('src-versemap-vul') || ('data/output/versemap_2d_vul.json' + vParam);
            this.srcChapters = this.getAttribute('src-chapters-vul') || ('data/output/chaptermap_2d_vul.json' + vParam);
        } else {
            this.src2d = this.getAttribute('src-2d-bsb') || this.getAttribute('src-2d') || ('data/output/wordmap_2d.json' + vParam);
            this.srcVerses = this.getAttribute('src-verses-bsb') || this.getAttribute('src-verses') || ('data/output/verse_index.json' + vParam);
            this.srcBooks = this.getAttribute('src-books-bsb') || this.getAttribute('src-books') || ('data/output/bookmap_2d.json' + vParam);
            this.srcVersemap = this.getAttribute('src-versemap-bsb') || this.getAttribute('src-versemap') || ('data/output/versemap_2d.json' + vParam);
            this.srcChapters = this.getAttribute('src-chapters-bsb') || this.getAttribute('src-chapters') || ('data/output/chaptermap_2d.json' + vParam);
        }
        
        this.canvas = this.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.topBar = this.querySelector('.bwm-top-bar');
        this.updateTopBarHeight();
        this.tooltip = this.querySelector('.bwm-tooltip');
        this.loading = this.querySelector('.bwm-loading');
        this.loadingText = this.querySelector('#bwm-loading-text');
        this.loadingCanvas = this.querySelector('.bwm-loading-canvas');
        this.loadingTip = this.querySelector('.bwm-loading-tip');
        this.bookCard = this.querySelector('#bwm-book-card');
        this.wordCard = this.querySelector('#bwm-word-card');
        this.verseCard = this.querySelector('#bwm-verse-card');
        this.chapterCard = this.querySelector('#bwm-chapter-card');
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
        if (this.chapterCard) {
            this.chapterCard.addEventListener('click', (e) => e.stopPropagation());
            this.chapterCard.addEventListener('pointerdown', (e) => e.stopPropagation());
            this.chapterCard.addEventListener('mousedown', (e) => e.stopPropagation());
            this.setupMobileSwipeToDismiss(this.chapterCard, () => this.hideChapterCard());
        }

        this.addEventListener('click', (e) => {
            const pinBtn = e.target.closest('.bwm-panel-pin-btn');
            if (pinBtn) {
                e.stopPropagation();
                e.preventDefault();
                const panelType = pinBtn.getAttribute('data-pin-panel');
                if (panelType === 'options') {
                    this.togglePinOptionsPanel();
                } else {
                    this.togglePinStudyPanel();
                }
            }
        }, true);

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
                if (target && this.versemapLookup && this.versemapLookup.has(target.id)) {
                    target = this.versemapLookup.get(target.id);
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
        this.chapterReopenBtn = this.querySelector('#bwm-chapter-card-reopen');
        if (this.chapterReopenBtn) {
            this.chapterReopenBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                let target = this.selectedChapter;
                if (!target && this.searchedChapters && this.searchedChapters.length > 0 && this.chaptermapLookup) {
                    target = this.chaptermapLookup.get(this.searchedChapters[0]);
                }
                if (target) {
                    let activeChapters = (this.searchedChapters && this.searchedChapters.length > 0)
                        ? this.searchedChapters.map(cId => this.chaptermapLookup ? this.chaptermapLookup.get(cId) : null).filter(Boolean)
                        : [target];
                    this.showChapterCard(target, activeChapters);
                }
            });
            this.chapterReopenBtn.addEventListener('pointerdown', (e) => e.stopPropagation());
            this.chapterReopenBtn.addEventListener('mousedown', (e) => e.stopPropagation());
            this.chapterReopenBtn.addEventListener('touchstart', (e) => e.stopPropagation(), { passive: true });
        }
        this.wordReopenBtn = this.querySelector('#bwm-word-card-reopen');
        if (this.wordReopenBtn) {
            this.wordReopenBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                let target = this.lastInspectedWordNode || this.inspectorNode;
                if (!target && this.searchedWords && this.searchedWords.length > 0 && this.nodes) {
                    target = this.nodes.find(n => n.id === this.searchedWords[0] || (n.w && n.w.toLowerCase() === this.searchedWords[0].toLowerCase())) || this.nodes[0];
                }
                if (!target && this.nodes && this.nodes.length > 0) {
                    target = this.nodes.find(n => n.isKw) || this.nodes[0];
                }
                if (target) {
                    this.showWordInspector(target, this.lastWordInspectorTab || 'verses');
                }
            });
            this.wordReopenBtn.addEventListener('pointerdown', (e) => e.stopPropagation());
            this.wordReopenBtn.addEventListener('mousedown', (e) => e.stopPropagation());
            this.wordReopenBtn.addEventListener('touchstart', (e) => e.stopPropagation(), { passive: true });
        }
        this.zoomExtentsBtn = this.querySelector('#bwm-zoom-extents-btn');
        if (this.zoomExtentsBtn) {
            this.zoomExtentsBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.zoomExtents();
            });
            this.zoomExtentsBtn.addEventListener('pointerdown', (e) => e.stopPropagation());
            this.zoomExtentsBtn.addEventListener('mousedown', (e) => e.stopPropagation());
            this.zoomExtentsBtn.addEventListener('touchstart', (e) => e.stopPropagation(), { passive: true });
        }
        this.verseModeSection = this.querySelector('#bwm-verse-mode-section');
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

        this.chapterModeSection = this.querySelector('#bwm-chapter-mode-section');
        const chapModeBtns = this.querySelectorAll('#bwm-chapter-mode-filter button');
        chapModeBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const mode = btn.getAttribute('data-chapmode');
                if (mode) this.setChapterConnMode(mode);
            });
        });
        
        this.searchInput = this.querySelector('#bwm-search');
        this.searchClearBtn = this.querySelector('#bwm-search-clear');
        this.searchBtn = this.querySelector('#bwm-btn-search');
        this.searchRecoveryPopover = this.querySelector('#bwm-search-recovery-popover');
        this.searchSpinner = this.querySelector('#bwm-search-spinner');
        
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
            cardBg: styles.getPropertyValue('--bwm-input-focus-bg').trim() || styles.getPropertyValue('--bwm-btn-bg').trim() || '#ffffff',
            border: styles.getPropertyValue('--bwm-border').trim() || '#e5e7eb',
            text: styles.getPropertyValue('--bwm-text').trim() || '#333333',
            nodeDef: styles.getPropertyValue('--bwm-node-default').trim() || '#888888',
            nodeKw: styles.getPropertyValue('--bwm-node-kw').trim() || '#d32f2f',
            nodeHover: styles.getPropertyValue('--bwm-node-hover').trim() || '#2563eb',
            linkDir: styles.getPropertyValue('--bwm-link-direct').trim() || 'rgba(40, 167, 69, 0.6)',
            linkIndir: styles.getPropertyValue('--bwm-link-indirect').trim() || 'rgba(150, 150, 150, 0.2)',
            textMuted: styles.getPropertyValue('--bwm-text-muted').trim() || '#666666',
            font: styles.getPropertyValue('--bwm-font').trim() || 'sans-serif'
        };
    }

    setSearchSpinner(loading) {
        if (this.searchSpinner) {
            this.searchSpinner.style.display = loading ? 'block' : 'none';
        }
        const wrapper = this.querySelector('.bwm-search-input-wrapper');
        if (wrapper) {
            wrapper.classList.toggle('is-loading', Boolean(loading));
        }
    }

    setupEvents() {
        // Search
        this.searchBtn.addEventListener('click', () => this.searchWord());
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.searchWord();
        });
        this.searchInput.addEventListener('input', () => {
            this.updateClearBtnVisibility();
            this.closeSearchRecovery();
        });

        // Global dismiss for search recovery popover
        document.addEventListener('click', (e) => {
            if (this.searchRecoveryPopover && this.searchRecoveryPopover.style.display !== 'none') {
                if (!this.searchRecoveryPopover.contains(e.target) && !this.searchInput.contains(e.target) && !this.searchBtn.contains(e.target)) {
                    this.closeSearchRecovery();
                }
            }
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.searchRecoveryPopover && this.searchRecoveryPopover.style.display !== 'none') {
                this.closeSearchRecovery();
            }
        });
        
        if (this.searchClearBtn) {
            this.searchClearBtn.addEventListener('click', () => {
                this.closeSearchRecovery();
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
                if (this.viewMode === 'verses') {
                    if (this.verseViewMode === 'words') {
                        this.verseWordsPerVerse = val;
                    } else {
                        this.verseRefsPerVerse = val;
                    }
                } else if (this.viewMode === 'chapters') {
                    if (this.chapterConnMode === 'words') {
                        this.chapterWordsCount = val;
                    } else if (this.chapterConnMode === 'verses') {
                        this.chapterVersesCount = val;
                    } else {
                        this.chapterChaptersCount = val;
                    }
                } else {
                    this.neighborsPerKeyword = val;
                }
                if (this.neighborValue) this.neighborValue.textContent = val;

                if (this.viewMode === 'verses' && this.isSearchMode && this.searchedVerses && this.searchedVerses.length > 0) {
                    clearTimeout(this._verseSliderTimeout);
                    this._verseSliderTimeout = setTimeout(() => {
                        this.searchVerses(true);
                    }, 50);
                } else if (this.viewMode === 'chapters' && this.isSearchMode && this.searchedChapters && this.searchedChapters.length > 0) {
                    clearTimeout(this._chapterSliderTimeout);
                    this._chapterSliderTimeout = setTimeout(() => {
                        this.searchChapters(true);
                    }, 50);
                }
            });
            this.neighborSlider.addEventListener('change', () => {
                // Dynamically re-compute and update if search mode is active
                if (this.viewMode === 'books') {
                    if (this.isSearchMode && this.searchedBooks && this.searchedBooks.length > 0) {
                        this.searchBooks(true);
                    }
                } else if (this.viewMode === 'chapters') {
                    if (this.isSearchMode && this.searchedChapters && this.searchedChapters.length > 0) {
                        this.searchChapters(true);
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

        const viewModePills = this.querySelectorAll('#bwm-view-mode-filter .bwm-pill-btn');
        viewModePills.forEach(btn => {
            btn.addEventListener('click', () => {
                let mode = btn.getAttribute('data-mode');
                if (mode) {
                    this.setViewMode(mode);
                }
            });
        });

        const foundationPills = this.querySelectorAll('#bwm-foundation-filter .bwm-pill-btn');
        foundationPills.forEach(btn => {
            btn.addEventListener('click', () => {
                let f = btn.getAttribute('data-foundation');
                if (f && f !== this.foundation) {
                    this.setSemanticFoundation(f, true);
                }
            });
        });
        const lxxPill = this.querySelector('#bwm-btn-foundation-lxx');
        const bsbPill = this.querySelector('#bwm-btn-foundation-bsb');
        const vulPill = this.querySelector('#bwm-btn-foundation-vul');
        if (lxxPill && bsbPill && vulPill) {
            bsbPill.classList.toggle('active', this.foundation === 'bsb');
            lxxPill.classList.toggle('active', this.foundation === 'lxx');
            vulPill.classList.toggle('active', this.foundation === 'vul');
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

        const simLabelPills = this.querySelectorAll('#bwm-sim-labels-filter .bwm-pill-btn');
        simLabelPills.forEach(btn => {
            btn.addEventListener('click', () => {
                simLabelPills.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.similarityLabelsMode = btn.getAttribute('data-sim-labels') || 'hover';
                this.draw();
            });
        });

        const textSizePills = this.querySelectorAll('#bwm-text-size-filter .bwm-pill-btn');
        textSizePills.forEach(btn => {
            btn.addEventListener('click', () => {
                const size = btn.getAttribute('data-text-size') || 'small';
                this.setMapTextSize(size, true);
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
                this.updateZoomExtentsVisibility();
            });
            
        // Radial menu handlers
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e), {capture: true});
        this.canvas.addEventListener('click', (e) => this.handleClick(e), {capture: true});
        this.canvas.addEventListener('contextmenu', (e) => this.handleContextMenu(e), {capture: true});
        this.canvas.addEventListener('mouseleave', () => {
            if (!this.radialMenuNode) {
                this.hoveredNode = null;
                this.canvas.style.cursor = 'grab';
                this.draw();
            }
        }, {capture: true});
        
        this.radialMenu = this.querySelector('#bwm-radial-menu');
        if (this.radialMenu) {
            this.radialMenu.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                e.stopPropagation();
            });
        }
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                let handled = false;
                if (this.drawer && this.drawer.classList.contains('open') && !this.isOptionsPanelPinned) {
                    this.closeDrawer();
                    handled = true;
                }
                if (this.legendOverlay && this.legendOverlay.classList.contains('visible')) {
                    this.hideLegendWindow();
                    handled = true;
                }
                if (!this.isStudyPanelPinned && this.closeActiveInfoWindows()) {
                    handled = true;
                }
                if (handled) {
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
            let bookWasVisible = this.bookCard && this.bookCard.classList.contains('visible');
            let verseWasVisible = this.verseCard && this.verseCard.classList.contains('visible');
            let drawerWasVisible = this.drawer && this.drawer.classList.contains('open');
            if (menuWasVisible) {
                this.touchCloseTooltip = true;
                this.hideRadialMenu();
            }
            if ((wordWasVisible || bookWasVisible || verseWasVisible) && window.innerWidth <= 768) {
                this.touchCloseTooltip = true;
                this.closeActiveInfoWindows();
            }
            if (drawerWasVisible && window.innerWidth <= 768) {
                this.closeDrawer();
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
                } else {
                    this.hoveredNode = null;
                    if (this.radialMenuNode) this.hideRadialMenu();
                    this.draw();
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
            }
            if (this.touchTargetNode) {
                this.hoveredNode = this.touchTargetNode;
            } else {
                this.hoveredNode = null;
                this.draw();
            }
        }, {passive: true, capture: true});
        
        // Bind D3 zoom LAST so our capture events fire first
        d3.select(this.canvas).call(this.zoom);
        
        this.drawerToggle = this.querySelector('#bwm-drawer-toggle');
        this.drawer = this.querySelector('#bwm-drawer');
        this.drawerClose = this.querySelector('#bwm-drawer-close');
        
        if (this.drawer) {
            this.drawer.addEventListener('click', (e) => {
                e.stopPropagation();
                this.closeSearchRecovery();
            });
            this.drawer.addEventListener('pointerdown', (e) => e.stopPropagation());
            this.drawer.addEventListener('mousedown', (e) => e.stopPropagation());
            this.setupMobileSwipeToDismiss(this.drawer, () => this.closeDrawer());
        }

        if (this.drawerToggle) {
            this.drawerToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                this.closeSearchRecovery();
                if (this.isOptionsPanelPinned) {
                    this.unpinOptionsPanel();
                    this.closeDrawer(true);
                } else {
                    this.toggleDrawer();
                }
            });
        }
        
        if (this.drawerClose) {
            this.drawerClose.addEventListener('click', (e) => {
                e.stopPropagation();
                this.unpinOptionsPanel();
                this.closeDrawer(true);
            });
        }

        this.legendOverlay = this.querySelector('#bwm-legend-overlay');
        this.legendBackBtn = this.querySelector('#bwm-legend-back-btn');
        this.legendCloseBtn = this.querySelector('#bwm-legend-close-btn');
        this.drawerLegendBtn = this.querySelector('#bwm-drawer-legend-btn');

        if (this.drawerLegendBtn) {
            this.drawerLegendBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.showLegendWindow();
            });
        }
        if (this.legendBackBtn) {
            this.legendBackBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.hideLegendWindow();
            });
        }
        if (this.legendCloseBtn) {
            this.legendCloseBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.hideLegendWindow();
            });
        }
        
        // Close radial menu, word card, book card, and drawer when clicking outside
        document.addEventListener('click', (e) => {
            let isMenuVisible = this.radialMenuNode !== null;
            let isWordVisible = this.wordCard && this.wordCard.classList.contains('visible');
            let isBookVisible = this.bookCard && this.bookCard.classList.contains('visible');
            let isVerseVisible = this.verseCard && this.verseCard.classList.contains('visible');
            let isChapterVisible = this.chapterCard && this.chapterCard.classList.contains('visible');
            
            if (isMenuVisible || isWordVisible || isBookVisible || isVerseVisible || isChapterVisible) {
                let insideWord = this.wordCard && this.wordCard.contains(e.target);
                let insideBook = this.bookCard && this.bookCard.contains(e.target);
                let insideVerse = this.verseCard && this.verseCard.contains(e.target);
                let insideChapter = this.chapterCard && this.chapterCard.contains(e.target);
                let insideMenu = this.radialMenu && this.radialMenu.contains(e.target);
                let insideCanvas = this.canvas && this.canvas.contains(e.target);
                let insideReopen = this.reopenBtn && this.reopenBtn.contains(e.target);
                let insideVerseReopen = this.verseReopenBtn && this.verseReopenBtn.contains(e.target);
                let insideChapterReopen = this.chapterReopenBtn && this.chapterReopenBtn.contains(e.target);
                let insideWordReopen = this.wordReopenBtn && this.wordReopenBtn.contains(e.target);
                
                if (!insideWord && !insideBook && !insideVerse && !insideChapter && !insideMenu && !insideCanvas && !insideReopen && !insideVerseReopen && !insideChapterReopen && !insideWordReopen) {
                    this.hideRadialMenu();
                    this.closeActiveInfoWindows();
                }
            }
            
            if (this.drawer && this.drawer.classList.contains('open')) {
                if (!this.drawer.contains(e.target) && (!this.drawerToggle || !this.drawerToggle.contains(e.target))) {
                    this.closeDrawer();
                }
            }
        });
    }

    resize() {
        this.updateTopBarHeight();
        if (!this._userSelectedTextSize) {
            const isMobile = window.innerWidth <= 768;
            const targetSize = isMobile ? 'small' : 'medium';
            if (this.mapTextSize !== targetSize) {
                this.setMapTextSize(targetSize, false);
            }
        }
        if (window.innerWidth <= 768) {
            let hasActiveCard = (this.wordCard && this.wordCard.classList.contains('visible')) ||
                                (this.bookCard && this.bookCard.classList.contains('visible')) ||
                                (this.verseCard && this.verseCard.classList.contains('visible'));
            if (hasActiveCard && this.drawer && this.drawer.classList.contains('open')) {
                this.closeDrawer();
            }
        }

        if (window.innerWidth < 1024) {
            if (this.isOptionsPanelPinned) {
                this.unpinOptionsPanel();
                this.closeDrawer(true);
            }
            if (this.isStudyPanelPinned) {
                this.unpinStudyPanel();
                this.closeActiveInfoWindows(true);
            }
        } else if (window.innerWidth < 1300 && this.isOptionsPanelPinned && this.isStudyPanelPinned) {
            this.unpinOptionsPanel();
            this.closeDrawer(true);
        }
        this.updatePinButtonStates();
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
        
        this._nodesBounds = null;
        this.draw();
        this.updateZoomExtentsVisibility();
    }

    async loadData() {
        let params = new URLSearchParams(window.location.search);
        let baseParam = (params.get('c') || params.get('f') || params.get('canon') || params.get('base') || params.get('foundation') || this.foundation || 'bsb').toLowerCase();
        if (baseParam === 'lxx' || baseParam === 'l') {
            this.foundation = 'lxx';
        } else if (baseParam === 'vul' || baseParam === 'v' || baseParam === 'vulgata' || baseParam === 'vulgate') {
            this.foundation = 'vul';
        } else if (baseParam === 'af' || baseParam === 'pat') {
            this.foundation = baseParam;
        } else {
            this.foundation = 'bsb';
        }

        const vParam = '?v=10.2.0';
        if (this.foundation === 'lxx') {
            this.src2d = this.getAttribute('src-2d-lxx') || ('data/output/wordmap_2d_lxx.json' + vParam);
            this.srcVerses = this.getAttribute('src-verses-lxx') || ('data/output/verse_index_lxx.json' + vParam);
            this.srcBooks = this.getAttribute('src-books-lxx') || ('data/output/bookmap_2d_lxx.json' + vParam);
            this.srcVersemap = this.getAttribute('src-versemap-lxx') || ('data/output/versemap_2d_lxx.json' + vParam);
            this.srcChapters = this.getAttribute('src-chapters-lxx') || ('data/output/chaptermap_2d_lxx.json' + vParam);
        } else if (this.foundation === 'vul') {
            this.src2d = this.getAttribute('src-2d-vul') || ('data/output/wordmap_2d_vul.json' + vParam);
            this.srcVerses = this.getAttribute('src-verses-vul') || ('data/output/verse_index_vul.json' + vParam);
            this.srcBooks = this.getAttribute('src-books-vul') || ('data/output/bookmap_2d_vul.json' + vParam);
            this.srcVersemap = this.getAttribute('src-versemap-vul') || ('data/output/versemap_2d_vul.json' + vParam);
            this.srcChapters = this.getAttribute('src-chapters-vul') || ('data/output/chaptermap_2d_vul.json' + vParam);
        } else {
            this.src2d = this.getAttribute('src-2d-bsb') || this.getAttribute('src-2d') || ('data/output/wordmap_2d.json' + vParam);
            this.srcVerses = this.getAttribute('src-verses-bsb') || this.getAttribute('src-verses') || ('data/output/verse_index.json' + vParam);
            this.srcBooks = this.getAttribute('src-books-bsb') || this.getAttribute('src-books') || ('data/output/bookmap_2d.json' + vParam);
            this.srcVersemap = this.getAttribute('src-versemap-bsb') || this.getAttribute('src-versemap') || ('data/output/versemap_2d.json' + vParam);
            this.srcChapters = this.getAttribute('src-chapters-bsb') || this.getAttribute('src-chapters') || ('data/output/chaptermap_2d.json' + vParam);
        }

        const lxxPill = this.querySelector('#bwm-btn-foundation-lxx');
        const bsbPill = this.querySelector('#bwm-btn-foundation-bsb');
        const vulPill = this.querySelector('#bwm-btn-foundation-vul');
        if (lxxPill && bsbPill && vulPill) {
            bsbPill.classList.toggle('active', this.foundation === 'bsb');
            lxxPill.classList.toggle('active', this.foundation === 'lxx');
            vulPill.classList.toggle('active', this.foundation === 'vul');
        }

        let modeParam = (params.get('m') || params.get('view') || params.get('mode') || '').toLowerCase();
        let view = (modeParam === 'v' || modeParam === 'verses' || modeParam === 'verse')
            ? 'verses'
            : (modeParam === 'ch' || modeParam === 'chapters' || modeParam === 'chapter' || modeParam === 'chap')
                ? 'chapters'
                : (modeParam === 'b' || modeParam === 'books' || modeParam === 'book')
                    ? 'books'
                    : (modeParam === 'w' || modeParam === 'words' || modeParam === 'word')
                        ? 'words'
                        : undefined;

        let books = params.get('b') || params.get('books') || params.get('book');
        let chapters = params.get('ch') || params.get('chapters') || params.get('chapter') || params.get('chap');
        let verses = params.get('v') || params.get('vs') || params.get('verses') || params.get('verse');
        let keywords = params.get('w') || params.get('k') || params.get('keywords') || params.get('keyword') || params.get('words') || params.get('word');

        // Verse connection mode option (?vc=r | w)
        let vcParam = (params.get('vc') || params.get('verse_mode') || params.get('connections') || '').toLowerCase();
        if (vcParam === 'w' || vcParam === 'words') {
            this.verseViewMode = 'words';
        } else if (vcParam === 'r' || vcParam === 'refs' || vcParam === 'crossref') {
            this.verseViewMode = 'refs';
        }
        const verseModeBtns = this.querySelectorAll('#bwm-verse-mode-filter button[data-submode]');
        verseModeBtns.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-submode') === this.verseViewMode);
        });

        // Chapters connection mode option (?ccm=chapters | verses | words)
        let ccmParam = (params.get('ccm') || params.get('chapter_mode') || params.get('chapmode') || '').toLowerCase();
        if (ccmParam === 'w' || ccmParam === 'words') {
            this.chapterConnMode = 'words';
        } else if (ccmParam === 'v' || ccmParam === 'verses') {
            this.chapterConnMode = 'verses';
        } else if (ccmParam === 'c' || ccmParam === 'ch' || ccmParam === 'chapters') {
            this.chapterConnMode = 'chapters';
        } else {
            this.chapterConnMode = 'words';
        }
        const chapModeBtns = this.querySelectorAll('#bwm-chapter-mode-filter button[data-chapmode]');
        chapModeBtns.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-chapmode') === this.chapterConnMode);
        });

        // Testament filter option (?t=all | ot | nt | both)
        let tParam = (params.get('t') || params.get('testament') || params.get('filter') || '').toLowerCase();
        if (['all', 'ot', 'nt', 'both'].includes(tParam)) {
            this.testamentFilter = tParam;
            const filterBtns = this.querySelectorAll('#bwm-testament-filter button');
            filterBtns.forEach(btn => btn.classList.toggle('active', btn.getAttribute('data-testament') === tParam));
        }

        // Similarity labels option (?s=off | h | a)
        let sParam = (params.get('s') || params.get('sim') || params.get('similarity') || '').toLowerCase();
        if (sParam === 'off') {
            this.similarityLabelsMode = 'off';
        } else if (sParam === 'a' || sParam === 'all' || sParam === 'showall') {
            this.similarityLabelsMode = 'all';
        } else if (sParam === 'h' || sParam === 'hover') {
            this.similarityLabelsMode = 'hover';
        }
        const simBtns = this.querySelectorAll('#bwm-sim-labels-filter button');
        simBtns.forEach(btn => btn.classList.toggle('active', btn.getAttribute('data-sim-labels') === this.similarityLabelsMode));

        // Map text scale option (?ts=s | m | l)
        let tsParam = (params.get('ts') || params.get('scale') || params.get('font') || '').toLowerCase();
        if (tsParam === 's' || tsParam === 'small') {
            this.mapTextSize = 'small';
        } else if (tsParam === 'm' || tsParam === 'medium') {
            this.mapTextSize = 'medium';
        } else if (tsParam === 'l' || tsParam === 'large') {
            this.mapTextSize = 'large';
        }
        const tsBtns = this.querySelectorAll('#bwm-text-size-filter button');
        tsBtns.forEach(btn => btn.classList.toggle('active', btn.getAttribute('data-text-size') === this.mapTextSize));

        if (chapters) {
            this.searchedChapters = this.parseChapterQuery(chapters);
        }

        this.updateUrl({
            m: view || undefined,
            b: books || undefined,
            ch: chapters || undefined,
            v: verses || undefined,
            w: keywords || undefined,
            ccm: (this.chapterConnMode !== 'words') ? this.chapterConnMode : undefined
        });
        let currentMode = this.viewMode || view || (verses ? 'verses' : (chapters ? 'chapters' : (books ? 'books' : 'words')));
        let isVersesInit = (currentMode === 'verses' || view === 'verses' || Boolean(verses));
        let isChaptersInit = !isVersesInit && (currentMode === 'chapters' || view === 'chapters' || Boolean(chapters));
        let isBooksInit = !isVersesInit && !isChaptersInit && (currentMode === 'books' || view === 'books' || Boolean(books));

        const wordsBtn = this.querySelector('#view-mode-words') || document.getElementById('view-mode-words');
        const booksBtn = this.querySelector('#view-mode-books') || document.getElementById('view-mode-books');
        const versesBtn = this.querySelector('#view-mode-verses') || document.getElementById('view-mode-verses');
        const chaptersBtn = this.querySelector('#view-mode-chapters') || document.getElementById('view-mode-chapters');

        if (isVersesInit) {
            if (wordsBtn) wordsBtn.classList.remove('active');
            if (booksBtn) booksBtn.classList.remove('active');
            if (versesBtn) versesBtn.classList.add('active');
            if (chaptersBtn) chaptersBtn.classList.remove('active');
            this.viewMode = 'verses';
            if (this.verseModeSection) this.verseModeSection.style.display = 'block';
            if (this.chapterModeSection) this.chapterModeSection.style.display = 'none';
            let activeHeading = this.querySelector('#bwm-active-heading');
            if (activeHeading) activeHeading.textContent = 'Active Verses';
            this.showLoading('Loading Biblical Verses & Cross-References...', 'verses');
        } else if (isChaptersInit) {
            if (wordsBtn) wordsBtn.classList.remove('active');
            if (booksBtn) booksBtn.classList.remove('active');
            if (versesBtn) versesBtn.classList.remove('active');
            if (chaptersBtn) chaptersBtn.classList.add('active');
            this.viewMode = 'chapters';
            if (this.verseModeSection) this.verseModeSection.style.display = 'none';
            if (this.chapterModeSection) this.chapterModeSection.style.display = 'block';
            let activeHeading = this.querySelector('#bwm-active-heading');
            if (activeHeading) activeHeading.textContent = 'Active Chapters';
            this.showLoading('Loading Biblical Chapters & Themes...', 'chapters');
        } else if (isBooksInit) {
            if (wordsBtn) wordsBtn.classList.remove('active');
            if (booksBtn) booksBtn.classList.remove('active');
            if (versesBtn) versesBtn.classList.remove('active');
            if (chaptersBtn) chaptersBtn.classList.remove('active');
            this.viewMode = 'books';
            if (this.verseModeSection) this.verseModeSection.style.display = 'none';
            if (this.chapterModeSection) this.chapterModeSection.style.display = 'none';
            let activeHeading = this.querySelector('#bwm-active-heading');
            if (activeHeading) activeHeading.textContent = 'Active Books';
            this.showLoading('Loading Biblical Books & Themes...', 'books');
        } else {
            if (wordsBtn) wordsBtn.classList.add('active');
            if (booksBtn) booksBtn.classList.remove('active');
            if (versesBtn) versesBtn.classList.remove('active');
            if (chaptersBtn) chaptersBtn.classList.remove('active');
            this.viewMode = 'words';
            if (this.verseModeSection) this.verseModeSection.style.display = 'none';
            if (this.chapterModeSection) this.chapterModeSection.style.display = 'none';
            let activeHeading = this.querySelector('#bwm-active-heading');
            if (activeHeading) activeHeading.textContent = 'Active Words';
            this.showLoading('Loading Bible Word Map...', 'words');
        }

        this.updateNeighborSlider();

        // Fetch datasets concurrently
        if (this.foundation === 'bsb' && this._englishSemanticData) {
            this.booksPromise = this._englishSemanticData.booksData
                ? Promise.resolve(this._englishSemanticData.booksData)
                : (this.srcBooks ? fetch(this.srcBooks).then(r => {
                    if (!r.ok) throw new Error(`HTTP ${r.status}`);
                    return r.json();
                }).catch(() => null) : Promise.resolve(null));
            this.versesPromise = Promise.resolve({ verses: this._englishSemanticData.verses, words: this._englishSemanticData.wordToVerses });
            this.data2dPromise = Promise.resolve(this._englishSemanticData.data2d);
            this.versemapPromise = Promise.resolve(this._englishSemanticData.versemapData);
        } else {
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

            this.chaptersPromise = this.srcChapters ? fetch(this.srcChapters).then(r => {
                if (!r.ok) throw new Error(`HTTP ${r.status}`);
                return r.json();
            }).catch(err => {
                console.warn("Could not load chaptermap data", err);
                return null;
            }) : Promise.resolve(null);
        }

        this.booksPromise.then(data => {
            if (data) this.booksData = data;
        });

        this.chaptersPromise.then(data => {
            if (data) {
                let chList = data.chapters || (Array.isArray(data) ? data : null);
                if (chList) {
                    this.chaptersData = data.chapters ? data : { count: chList.length, chapters: chList };
                    this.chaptermapLookup = new Map(chList.map(c => [c.id, c]));
                }
            }
        });

        this.versesPromise.then(vData => {
            if (vData) {
                this.verses = vData.verses;
                this.wordToVerses = vData.words;
                if (vData.verses && !this.verseTextMap.size) {
                    for (let i = 0; i < vData.verses.length; i++) {
                        let str = vData.verses[i];
                        let parts = str.split('|');
                        let ref = parts[0];
                        let en = parts[1] || '';
                        let el = parts[2] || '';
                        if (!el && parts.length === 2 && /[\u0370-\u03ff\u1f00-\u1fff]/.test(en) && !/[a-zA-Z]{3,}/.test(en)) {
                            el = en;
                            en = '';
                        }
                        this.verseTextMap.set(ref, en);
                        if (el) this.verseGreekMap.set(ref, el);
                    }
                }
            }
        });

        this.versemapPromise.then(data => {
            if (data) {
                let versesList = data.verses || (Array.isArray(data) ? data : null);
                if (versesList) {
                    this.versemapData = data.verses ? data : { count: versesList.length, verses: versesList };
                    this.versemapLookup = new Map(versesList.map(v => [v.id, v]));
                }
            }
        });

        this.data2dPromise.then(d2d => {
            if (d2d) this.data2d = d2d;
        });
        if (this.versesPromise) {
            this.versesPromise.then(vData => {
                if (vData && vData.verses) {
                    this.verses = vData.verses;
                    this.wordToVerses = vData.words;
                }
            }).catch(() => {});
        }

        try {
            if (isVersesInit) {
                this.versemapData = await this.versemapPromise;
                if (this.versemapData) {
                    let versesList = this.versemapData.verses || (Array.isArray(this.versemapData) ? this.versemapData : []);
                    this.versemapLookup = new Map(versesList.map(v => [v.id, v]));
                }
                const vData = await this.versesPromise;
                if (vData && vData.verses) {
                    this.verses = vData.verses;
                    this.wordToVerses = vData.words;
                    for (let i = 0; i < vData.verses.length; i++) {
                        let str = vData.verses[i];
                        let parts = str.split('|');
                        let ref = parts[0];
                        let en = parts[1] || '';
                        let el = parts[2] || '';
                        if (!el && parts.length === 2 && /[\u0370-\u03ff\u1f00-\u1fff]/.test(en) && !/[a-zA-Z]{3,}/.test(en)) {
                            el = en;
                            en = '';
                        }
                        this.verseTextMap.set(ref, en);
                        if (el) this.verseGreekMap.set(ref, el);
                    }
                }
                if (this.viewMode !== 'verses') {
                    return;
                }
                this.hideLoading();

                this.setViewMode('verses', true);
                if (this._pendingVerseSearch) {
                    let target = this._pendingVerseSearch;
                    this._pendingVerseSearch = null;
                    if (this.searchInput) this.searchInput.value = target;
                    this.searchVerses();
                } else if (this.searchedVerses && this.searchedVerses.length > 0) {
                    this.searchVerses(true);
                } else if (verses) {
                    let parsed = this.parseVerseQuery(verses, true);
                    if (parsed.length > 0) {
                        this.searchedVerses = parsed;
                        this.drawerVerses = [...this.searchedVerses];
                        this.searchVerses(true);
                    } else {
                        this.searchedVerses = [];
                        this.drawerVerses = [];
                        this.selectedVerse = null;
                        this.isSearchMode = false;
                        if (this.searchInput) this.searchInput.value = '';
                        this.updateClearBtnVisibility();
                        this.updateUrl({ view: 'verses', verses: undefined });
                        this.buildVersesGraph();
                    }
                } else {
                    this.buildVersesGraph();
                }
            } else if (isChaptersInit) {
                this.chaptersData = await this.chaptersPromise;
                if (this.chaptersData) {
                    let chList = this.chaptersData.chapters || (Array.isArray(this.chaptersData) ? this.chaptersData : []);
                    this.chaptermapLookup = new Map(chList.map(c => [c.id, c]));
                }
                const vData = await this.versesPromise;
                if (vData && vData.verses) {
                    this.verses = vData.verses;
                    this.wordToVerses = vData.words;
                    for (let i = 0; i < vData.verses.length; i++) {
                        let str = vData.verses[i];
                        let parts = str.split('|');
                        let ref = parts[0];
                        let en = parts[1] || '';
                        let el = parts[2] || '';
                        if (!el && parts.length === 2 && /[\u0370-\u03ff\u1f00-\u1fff]/.test(en) && !/[a-zA-Z]{3,}/.test(en)) {
                            el = en;
                            en = '';
                        }
                        this.verseTextMap.set(ref, en);
                        if (el) this.verseGreekMap.set(ref, el);
                    }
                }
                if (this.viewMode !== 'chapters') {
                    return;
                }
                this.hideLoading();

                this.setViewMode('chapters', true);
                if (this._pendingChapterSearch) {
                    let target = this._pendingChapterSearch;
                    this._pendingChapterSearch = null;
                    if (this.searchInput) this.searchInput.value = target;
                    this.searchChapters();
                } else if (this.searchedChapters && this.searchedChapters.length > 0) {
                    this.searchChapters(true);
                } else if (chapters) {
                    let parsed = this.parseChapterQuery(chapters);
                    if (parsed.length > 0) {
                        this.searchedChapters = parsed;
                        this.drawerChapters = [...this.searchedChapters];
                        this.searchChapters(true);
                    } else {
                        this.searchedChapters = [];
                        this.drawerChapters = [];
                        this.selectedChapter = null;
                        this.isSearchMode = false;
                        if (this.searchInput) this.searchInput.value = '';
                        this.updateClearBtnVisibility();
                        this.updateUrl({ view: 'chapters', chapters: undefined });
                        this.buildChaptersGraph();
                    }
                } else {
                    this.buildChaptersGraph();
                }
            } else if (isBooksInit) {
                this.booksData = await this.booksPromise;
                if (this.viewMode !== 'books') {
                    return;
                }

                let hasSelectedBooks = (this.searchedBooks && this.searchedBooks.length > 0) || Boolean(books);
                if (hasSelectedBooks) {
                    if (!this.data2d && this.data2dPromise) {
                        try {
                            const d2d = await this.data2dPromise;
                            if (d2d) this.data2d = d2d;
                        } catch (e) {
                            console.error('Failed loading word data for books view:', e);
                        }
                    }
                    if ((!this.verses || !this.wordToVerses) && this.versesPromise) {
                        try {
                            const vData = await this.versesPromise;
                            if (vData && vData.verses) {
                                this.verses = vData.verses;
                                this.wordToVerses = vData.words;
                            }
                        } catch (e) {
                            console.error('Failed loading verses data for books view:', e);
                        }
                    }
                }

                this.hideLoading();

                this.setViewMode('books', true);
                if (this.searchedBooks && this.searchedBooks.length > 0) {
                    await this.searchBooks(true);
                } else if (books) {
                    let parsed = this.parseBookQuery(books);
                    if (parsed.length > 0) {
                        this.searchedBooks = parsed.map(b => b.code);
                        this.drawerBooks = [...this.searchedBooks];
                        await this.searchBooks(true);
                    } else {
                        this.searchedBooks = [];
                        this.drawerBooks = [];
                        this.selectedBook = null;
                        this.isSearchMode = false;
                        if (this.searchInput) this.searchInput.value = '';
                        this.updateClearBtnVisibility();
                        this.updateUrl({ view: 'books', books: undefined });
                        this.buildBooksGraph();
                    }
                } else {
                    this.buildBooksGraph();
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

                if (!this.data2d) {
                    return;
                }

                if (this._pendingKeywordSearch) {
                    let target = this._pendingKeywordSearch;
                    this._pendingKeywordSearch = null;
                    let p = this.data2d ? (this.data2d.find(d => d.id === target) || this.findMatchesForWordToken(target)[0]) : null;
                    if (p) {
                        this.searchedWords = [p.id];
                        this.drawerWords = [p.id];
                        let { word, pos } = this.parseWordId(p.id);
                        if (this.searchInput) this.searchInput.value = this.formatWord(word, pos);
                        this.searchWord(true);
                    } else {
                        if (this.searchInput) this.searchInput.value = target.split('_')[0];
                        this.searchWord(false, true);
                    }
                } else if (this.searchedWords && this.searchedWords.length > 0) {
                    let baseWords = [...new Set(this.searchedWords.map(id => {
                        let { word, pos } = this.parseWordId(id);
                        return this.formatWord(word, pos);
                    }))];
                    this.searchInput.value = baseWords.join(" ");
                    this.searchWord(true);
                } else if (keywords) {
                    this.searchedWords = keywords.split(',').map(k => k.trim()).filter(k => k);
                    this.drawerWords = [...this.searchedWords];
                    if (this.searchedWords.length > 0) {
                        let baseWords = [...new Set(this.searchedWords.map(id => {
                            let { word, pos } = this.parseWordId(id);
                            return this.formatWord(word, pos);
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
        if (!Array.isArray(a) || !Array.isArray(b) || a.length === 0 || a.length !== b.length) return 0;
        let dot = 0, normA = 0, normB = 0;
        for (let i = 0; i < a.length; i++) {
            dot += a[i] * b[i];
            normA += a[i] * a[i];
            normB += b[i] * b[i];
        }
        if (normA === 0 || normB === 0 || isNaN(dot)) return 0;
        let res = dot / (Math.sqrt(normA) * Math.sqrt(normB));
        return (isNaN(res) || !isFinite(res)) ? 0 : res;
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

    findMatchesForWordToken(token) {
        if (!token || !this.data2d) return [];
        token = token.toLowerCase();

        let idMatch = this.data2d.filter(d => d.id.toLowerCase() === token);
        if (idMatch.length > 0) return idMatch;

        let wordMatch = this.data2d.filter(d => d.w.toLowerCase() === token);
        if (wordMatch.length > 0) return wordMatch;

        let glossPartMatch = this.data2d.filter(d => d.w.toLowerCase().split(/[\s-]+/).includes(token));
        if (glossPartMatch.length > 0) return glossPartMatch;

        let origMatch = this.data2d.filter(d => {
            if (!d.original || !Array.isArray(d.original)) return false;
            return d.original.some(o => {
                if (o.lemma && o.lemma.toLowerCase() === token) return true;
                if (o.translit && o.translit.toLowerCase() === token) return true;
                if (o.strongs) {
                    let sLow = o.strongs.toLowerCase();
                    if (sLow === token || sLow === 'g' + token || sLow === 'h' + token) return true;
                }
                return false;
            });
        });
        if (origMatch.length > 0) return origMatch;

        return [];
    }

    getUniqueWordList() {
        if (this._uniqueWordList && this._uniqueWordListSource === this.data2d) {
            return this._uniqueWordList;
        }
        if (!this.data2d) return [];
        const wordMap = new Map();
        for (let i = 0; i < this.data2d.length; i++) {
            const d = this.data2d[i];
            if (!d.w) continue;
            const low = d.w.toLowerCase();
            const f = d.f || 1;
            if (!wordMap.has(low)) {
                wordMap.set(low, { w: d.w, id: d.id, pos: d.pos, f, original: d.original });
            } else {
                const existing = wordMap.get(low);
                if (f > existing.f) {
                    wordMap.set(low, { w: d.w, id: d.id, pos: d.pos, f, original: d.original });
                }
            }
        }
        this._uniqueWordList = Array.from(wordMap.entries()).map(([low, entry]) => ({
            low,
            len: low.length,
            entry
        }));
        this._uniqueWordListSource = this.data2d;
        return this._uniqueWordList;
    }

    findTypoWordSuggestions(query, limit = 5) {
        if (!query) return [];
        const q = query.trim().toLowerCase();
        const qLen = q.length;
        if (qLen < 2) return [];

        const uniqueWords = this.getUniqueWordList();
        if (!uniqueWords || uniqueWords.length === 0) return [];

        const scored = [];
        for (let i = 0; i < uniqueWords.length; i++) {
            const item = uniqueWords[i];
            if (Math.abs(item.len - qLen) > 2) continue;
            const dist = damerauLevenshtein(q, item.low, 2);
            if (dist <= 2) {
                const firstLetterMatch = q[0] === item.low[0];
                const score = (3 - dist) * 1000 + (firstLetterMatch ? 300 : 0) + Math.min(item.entry.f, 500);
                scored.push({
                    ...item.entry,
                    dist,
                    score
                });
            }
        }
        scored.sort((a, b) => b.score - a.score);
        return scored.slice(0, limit);
    }

    async getEnglishSemanticData() {
        if (this.foundation === 'bsb') {
            if (this.versemapPromise && !this.versemapData) {
                try {
                    let data = await this.versemapPromise;
                    if (data) {
                        let list = data.verses || (Array.isArray(data) ? data : []);
                        this.versemapData = data.verses ? data : { count: list.length, verses: list };
                        this.versemapLookup = new Map(list.map(v => [v.id, v]));
                    }
                } catch (e) {}
            }
            if (this.versesPromise && !this.verses) {
                try {
                    let vData = await this.versesPromise;
                    if (vData) {
                        this.verses = vData.verses;
                        this.wordToVerses = vData.words;
                    }
                } catch (e) {}
            }
            if (this.data2dPromise && !this.data2d) {
                try {
                    this.data2d = await this.data2dPromise;
                } catch (e) {}
            }
            if (this.data2d && this.verses && this.versemapLookup) {
                return {
                    data2d: this.data2d,
                    verses: this.verses,
                    wordToVerses: this.wordToVerses,
                    versemapData: this.versemapData,
                    versemapLookup: this.versemapLookup,
                    booksData: this.booksData,
                    findMatches: (token) => this.findMatchesForWordToken(token)
                };
            }
        }
        if (this._englishSemanticData) {
            return this._englishSemanticData;
        }

        const vParam = '?v=10.2.0';
        const wordmapSrc = this.getAttribute('src-2d-bsb') || this.getAttribute('src-2d') || ('data/output/wordmap_2d.json' + vParam);
        const versesSrc = this.getAttribute('src-verses-bsb') || this.getAttribute('src-verses') || ('data/output/verse_index.json' + vParam);
        const versemapSrc = this.getAttribute('src-versemap-bsb') || this.getAttribute('src-versemap') || ('data/output/versemap_2d.json' + vParam);
        const booksSrc = this.getAttribute('src-books-bsb') || this.getAttribute('src-books') || ('data/output/bookmap_2d.json' + vParam);

        try {
            const [wData, vData, vmData, bData] = await Promise.all([
                fetch(wordmapSrc).then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); }),
                fetch(versesSrc).then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); }),
                fetch(versemapSrc).then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); }),
                fetch(booksSrc).then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); }).catch(() => null)
            ]);

            const vmList = vmData ? (vmData.verses || (Array.isArray(vmData) ? vmData : [])) : [];
            const vmLookup = new Map(vmList.map(v => [v.id, v]));

            const findMatches = (token) => {
                if (!token || !wData) return [];
                token = token.toLowerCase();
                let idMatch = wData.filter(d => d.id.toLowerCase() === token);
                if (idMatch.length > 0) return idMatch;
                let wordMatch = wData.filter(d => d.w.toLowerCase() === token);
                if (wordMatch.length > 0) return wordMatch;
                let glossPartMatch = wData.filter(d => d.w.toLowerCase().split(/[\s-]+/).includes(token));
                if (glossPartMatch.length > 0) return glossPartMatch;
                let origMatch = wData.filter(d => {
                    if (!d.original || !Array.isArray(d.original)) return false;
                    return d.original.some(o => {
                        if (o.lemma && o.lemma.toLowerCase() === token) return true;
                        if (o.translit && o.translit.toLowerCase() === token) return true;
                        if (o.strongs) {
                            let sLow = o.strongs.toLowerCase();
                            if (sLow === token || sLow === 'g' + token || sLow === 'h' + token) return true;
                        }
                        return false;
                    });
                });
                if (origMatch.length > 0) return origMatch;
                return [];
            };

            this._englishSemanticData = {
                data2d: wData,
                verses: vData ? vData.verses : [],
                wordToVerses: vData ? vData.words : {},
                versemapData: vmData ? (vmData.verses ? vmData : { count: vmList.length, verses: vmList }) : null,
                versemapLookup: vmLookup,
                booksData: bData,
                findMatches
            };
            return this._englishSemanticData;
        } catch (err) {
            console.error('Could not load English semantic data:', err);
            return null;
        }
    }

    async getWordmapForFoundation(foundation) {
        if (!this._cachedWordmaps) this._cachedWordmaps = {};
        if (this.foundation === foundation && this.data2d) {
            return this.data2d;
        }
        if (this._cachedWordmaps[foundation]) {
            return this._cachedWordmaps[foundation];
        }
        const vParam = '?v=10.2.0';
        let src = '';
        if (foundation === 'lxx') {
            src = this.getAttribute('src-2d-lxx') || ('data/output/wordmap_2d_lxx.json' + vParam);
        } else if (foundation === 'vul') {
            src = this.getAttribute('src-2d-vul') || ('data/output/wordmap_2d_vul.json' + vParam);
        } else {
            src = this.getAttribute('src-2d-bsb') || this.getAttribute('src-2d') || ('data/output/wordmap_2d.json' + vParam);
        }
        try {
            const data = await fetch(src).then(r => {
                if (!r.ok) throw new Error(`HTTP ${r.status}`);
                return r.json();
            });
            this._cachedWordmaps[foundation] = data;
            return data;
        } catch (e) {
            console.warn(`Could not load wordmap for ${foundation}:`, e);
            return null;
        }
    }

    async findMatchesInAlternateCanons(token) {
        if (!token) return [];
        const altCanons = ['bsb', 'lxx', 'vul'].filter(f => f !== this.foundation);
        const canonLabels = {
            bsb: { name: 'Berean Standard Bible', sub: 'English', tag: 'BSB', color: '#60a5fa', bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.35)' },
            lxx: { name: 'Septuagint & Greek NT', sub: 'Greek / English', tag: 'LXX', color: '#10b981', bg: 'rgba(16, 185, 129, 0.15)', border: 'rgba(16, 185, 129, 0.35)' },
            vul: { name: 'Clementine Vulgate', sub: 'Latin / English', tag: 'VUL', color: '#c084fc', bg: 'rgba(168, 85, 247, 0.15)', border: 'rgba(168, 85, 247, 0.35)' }
        };

        const results = [];
        for (const canon of altCanons) {
            const data2d = await this.getWordmapForFoundation(canon);
            if (!data2d) continue;
            const tLow = token.toLowerCase();
            let matches = data2d.filter(d => d.w && d.w.toLowerCase() === tLow);
            if (matches.length === 0) {
                matches = data2d.filter(d => d.id && d.id.toLowerCase() === tLow);
            }
            if (matches.length === 0) {
                matches = data2d.filter(d => d.w && d.w.toLowerCase().split(/[\s-]+/).includes(tLow));
            }
            if (matches.length === 0) {
                matches = data2d.filter(d => {
                    if (!d.original || !Array.isArray(d.original)) return false;
                    return d.original.some(o => {
                        if (o.lemma && o.lemma.toLowerCase() === tLow) return true;
                        if (o.translit && o.translit.toLowerCase() === tLow) return true;
                        if (o.strongs) {
                            let sLow = o.strongs.toLowerCase();
                            if (sLow === tLow || sLow === 'g' + tLow || sLow === 'h' + tLow) return true;
                        }
                        return false;
                    });
                });
            }
            if (matches.length > 0) {
                matches.sort((a, b) => (b.f || 0) - (a.f || 0));
                results.push({
                    canon,
                    meta: canonLabels[canon],
                    bestMatch: matches[0],
                    allMatches: matches
                });
            }
        }
        return results;
    }

    async findCentroidVerses(query, topN = 4) {
        const engData = await this.getEnglishSemanticData();
        if (!engData || !engData.versemapLookup || !engData.verses || !engData.data2d) {
            return { centroid: null, allMatched: false, matchedTokens: [], verses: [] };
        }

        let rawTokens = query.toLowerCase().split(/[\s,]+/).filter(Boolean);
        let cleanPhrase = query.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();

        let tokenMatches = [];
        for (let t of rawTokens) {
            let hits = engData.findMatches(t);
            if (hits.length === 0) {
                let stem = t.replace(/(ed|ing|s|es)$/i, '');
                if (stem && stem.length >= 3) {
                    hits = engData.findMatches(stem);
                }
            }
            if (hits.length > 0) {
                hits.sort((a, b) => b.f - a.f);
                tokenMatches.push({ token: t, bestPoint: hits[0], hits });
            }
        }

        if (tokenMatches.length < 2) {
            return { centroid: null, allMatched: false, matchedTokens: tokenMatches, verses: [] };
        }

        let allMatched = tokenMatches.length === rawTokens.length;

        let centroid = {
            x: tokenMatches.reduce((sum, m) => sum + m.bestPoint.x, 0) / tokenMatches.length,
            y: tokenMatches.reduce((sum, m) => sum + m.bestPoint.y, 0) / tokenMatches.length
        };

        let candidateIndices = new Set();
        if (engData.wordToVerses) {
            for (let tm of tokenMatches) {
                for (let h of tm.hits) {
                    let list = engData.wordToVerses[h.id] || [];
                    for (let vIdx of list) candidateIndices.add(vIdx);
                }
            }
        }

        let scored = [];
        for (let vIdx of candidateIndices) {
            let raw = engData.verses[vIdx];
            if (!raw) continue;
            let pipeIdx = raw.indexOf('|');
            let ref = pipeIdx !== -1 ? raw.slice(0, pipeIdx) : raw;
            let text = pipeIdx !== -1 ? raw.slice(pipeIdx + 1) : '';
            let normText = text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();

            let phraseBonus = 0;
            if (cleanPhrase.length >= 6 && normText.includes(cleanPhrase)) {
                phraseBonus = 250;
            } else {
                let pWords = cleanPhrase.split(' ');
                for (let len = pWords.length - 1; len >= 2; len--) {
                    for (let start = 0; start <= pWords.length - len; start++) {
                        let sub = pWords.slice(start, start + len).join(' ');
                        if (sub.length >= 6 && normText.includes(sub)) {
                            phraseBonus = Math.max(phraseBonus, len * 35);
                        }
                    }
                }
            }

            let matchCount = 0;
            if (engData.wordToVerses) {
                for (let tm of tokenMatches) {
                    let hasToken = tm.hits.some(h => {
                        let list = engData.wordToVerses[h.id];
                        return list && list.includes(vIdx);
                    });
                    if (hasToken) matchCount++;
                }
            }

            if (matchCount < 2 && phraseBonus === 0) continue;

            let vObj = engData.versemapLookup ? engData.versemapLookup.get(ref) : null;
            let dist2D = vObj ? Math.hypot(vObj.x - centroid.x, vObj.y - centroid.y) : 999;
            let proxScore = Math.max(0, 30 - dist2D * 12);

            let score = (matchCount * 50) + phraseBonus + proxScore;

            let bParts = ref.split(' ');
            let bCode = bParts[0];
            let chapVerse = bParts[1] || '';
            let bName = (BOOK_CODE_MAP[bCode] && BOOK_CODE_MAP[bCode].name) || bCode;
            let displayRef = `${bName} ${chapVerse}`;

            let snippet = text.length > 95 ? text.slice(0, 92).trim() + '...' : text;

            scored.push({ ref, displayRef, text, snippet, matchCount, dist2D, score });
        }

        scored.sort((a, b) => b.score - a.score);
        return {
            centroid,
            allMatched,
            matchedTokens: tokenMatches,
            verses: scored.slice(0, topN)
        };
    }

    async showSearchRecovery(query, currentMode = 'words') {
        if (!this.searchRecoveryPopover) return;
        const q = (query || '').trim();
        if (!q) {
            this.closeSearchRecovery();
            return;
        }

        const recoverySeq = ++this._searchRecoverySeq;
        this.setSearchSpinner(true);
        const startTime = Date.now();
        try {
            // Allow browser paint cycle to display the spinner before calculation
            await new Promise(resolve => setTimeout(resolve, 35));
            if (this._searchRecoverySeq !== recoverySeq) return;

            const escapeHtml = (str) => {
                if (!str) return '';
                return String(str)
                    .replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/"/g, '&quot;');
            };

            let rawTokens = q.split(/[\s,]+/).filter(Boolean);
            let detectedVerse = detectVerseReference(q);
            let isMultiWordQuery = !detectedVerse && rawTokens.length >= 3;
            let centroidResult = null;

            if (isMultiWordQuery) {
                centroidResult = await this.findCentroidVerses(q, 4);
                if (this._searchRecoverySeq !== recoverySeq) return;
            }

            // Guarantee a perceptible spinner duration (at least 300ms) for centroid calculations
            const elapsed = Date.now() - startTime;
            if (elapsed < 300) {
                await new Promise(resolve => setTimeout(resolve, 300 - elapsed));
                if (this._searchRecoverySeq !== recoverySeq) return;
            }

            let html = '';
            let hasContent = false;

            if (isMultiWordQuery && centroidResult && (centroidResult.verses.length > 0 || centroidResult.matchedTokens.length >= 2)) {
                hasContent = true;
                let titleText = `Phrase search: &ldquo;${escapeHtml(q)}&rdquo;`;
                let isNonBsb = (this.foundation !== 'bsb');
                html = `
                    <div class="bwm-recovery-header">
                        <div class="bwm-recovery-title-row">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--bwm-node-hover); flex-shrink: 0;"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                            <span>${titleText}</span>
                        </div>
                        <button type="button" class="bwm-recovery-close" id="bwm-recovery-close-btn" title="Close suggestions">&times;</button>
                    </div>
                `;

                if (isNonBsb) {
                    html += `
                        <div class="bwm-recovery-foundation-note">
                            Semantic phrase matching is calculated against the English (BSB) map. Selecting a verse will automatically switch to the BSB canon.
                        </div>
                    `;
                }

                if (rawTokens.length === 3) {
                    if (centroidResult.matchedTokens.length >= 3) {
                        html += `
                            <div class="bwm-recovery-hint" style="padding: 6px 10px; margin: 4px 0 8px 0; font-size: 0.8em; color: var(--bwm-text-muted); background: var(--bwm-input-bg); border-radius: 6px; border: 1px solid var(--bwm-border); line-height: 1.45;">
                                💡 <strong>Dynamic Search Tip:</strong> Matched all 3 keywords. You can explore them in Words Mode or browse matching verses below. Adding 4 or more words can help perform an even deeper dynamic semantic search.
                            </div>
                        `;
                    } else if (centroidResult.matchedTokens.length === 2) {
                        let matchedWordsStr = centroidResult.matchedTokens.map(m => m.token).join(', ');
                        html += `
                            <div class="bwm-recovery-hint" style="padding: 6px 10px; margin: 4px 0 8px 0; font-size: 0.8em; color: var(--bwm-text-muted); background: var(--bwm-input-bg); border-radius: 6px; border: 1px solid var(--bwm-border); line-height: 1.45;">
                                💡 <strong>Dynamic Search Tip:</strong> Matched 2 of 3 words (&ldquo;${escapeHtml(matchedWordsStr)}&rdquo;). Adding 4 or more words can help perform an even deeper dynamic search across the biblical text.
                            </div>
                        `;
                    }
                }

                const renderWordsCard = () => {
                    if (centroidResult.matchedTokens.length < 2) return '';
                    let wordSearchQuery = centroidResult.matchedTokens.map(m => m.bestPoint.w).join(' ');
                    let btnText = isNonBsb
                        ? 'Switch to BSB &amp; Graph &rarr;'
                        : (currentMode === 'words' ? 'Graph Words &rarr;' : 'Search in Words Mode &rarr;');
                    let cardTitle = isNonBsb
                        ? `✦ Explore ${centroidResult.matchedTokens.length} Keywords in BSB Words Mode`
                        : `✦ Explore ${centroidResult.matchedTokens.length} Keywords in Words Mode`;
                    let cardDesc = isNonBsb
                        ? `Switch to the English (BSB) canon to graph these keywords across their semantic constellation.`
                        : (currentMode === 'words'
                            ? `Graph all ${centroidResult.matchedTokens.length} words across their semantic constellations.`
                            : `All words match canonical vocabulary. Search the combined semantic constellation in Words Mode.`);
                    return `
                        <div class="bwm-recovery-action-card">
                            <div class="bwm-recovery-action-info">
                                <div class="bwm-recovery-action-title">${cardTitle}</div>
                                <div class="bwm-recovery-action-desc">${cardDesc}</div>
                            </div>
                            <button type="button" class="bwm-recovery-action-btn" id="bwm-recovery-btn-multiword" data-words="${escapeHtml(wordSearchQuery)}" data-switch-bsb="${isNonBsb}">${btnText}</button>
                        </div>
                    `;
                };

                const renderVersesSection = () => {
                    if (!centroidResult.verses || centroidResult.verses.length === 0) return '';
                    let sectionLabel = isNonBsb
                        ? 'Top Linked Verses (BSB English Centroid):'
                        : 'Top Linked Verses (Semantic Map Centroid):';
                    let vHtml = `
                        <div class="bwm-recovery-section">
                            <div class="bwm-recovery-section-label">${sectionLabel}</div>
                            <div style="display: flex; flex-direction: column; gap: 8px;">
                    `;
                    let verseBtnLabel = isNonBsb
                        ? (currentMode === 'verses' ? 'Switch to BSB &amp; Search &rarr;' : 'Switch to BSB &amp; View &rarr;')
                        : (currentMode === 'verses' ? 'Search Verse &rarr;' : 'View in Verses Mode &rarr;');
                    for (let v of centroidResult.verses) {
                        vHtml += `
                            <div class="bwm-recovery-action-card bwm-recovery-verse-card">
                                <div class="bwm-recovery-action-info">
                                    <div class="bwm-recovery-action-title">📖 ${escapeHtml(v.displayRef)} <span class="bwm-recovery-canon-tag">BSB</span></div>
                                    <div class="bwm-recovery-action-desc">&ldquo;${escapeHtml(v.snippet)}&rdquo;</div>
                                </div>
                                <button type="button" class="bwm-recovery-action-btn bwm-recovery-btn-suggested-verse" data-verse="${escapeHtml(v.displayRef)}" data-ref="${escapeHtml(v.ref)}" data-switch-bsb="${isNonBsb}">${verseBtnLabel}</button>
                            </div>
                        `;
                    }
                    vHtml += `</div></div>`;
                    return vHtml;
                };

                if (currentMode === 'words') {
                    html += renderWordsCard();
                    html += renderVersesSection();
                } else {
                    html += renderVersesSection();
                    html += renderWordsCard();
                }
            } else {
            let typoWordSuggestions = [];
            let detectedBook = detectBookMatch(q, this.booksData ? this.booksData.books : null);
            let exactWordMatches = (this.data2d && this.findMatchesForWordToken(q)) || [];
            let directWordMatch = exactWordMatches.length > 0 ? exactWordMatches[0] : null;
            let hasDirectWordMatch = Boolean(directWordMatch);

            let altCanonMatches = [];
            if (!hasDirectWordMatch && !detectedVerse && !detectedBook) {
                altCanonMatches = await this.findMatchesInAlternateCanons(q);
                if (this._searchRecoverySeq !== recoverySeq) return;
            }

            // Handle multi-word tokens in words mode (only if not a detected verse or book)
            let multiTokenSuggestions = null;
            if (currentMode === 'words' && !detectedVerse && !detectedBook) {
                let tokens = q.split(/[\s,]+/).filter(w => w);
                if (tokens.length > 1) {
                    let tokenDetails = tokens.map(t => {
                        let direct = this.findMatchesForWordToken(t);
                        if (direct.length > 0) return { token: t, matched: true, suggestions: [] };
                        return { token: t, matched: false, suggestions: this.findTypoWordSuggestions(t, 3) };
                    });
                    let anyUnmatched = tokenDetails.some(td => !td.matched);
                    if (anyUnmatched) {
                        multiTokenSuggestions = tokenDetails;
                    }
                }
                if (!multiTokenSuggestions) {
                    typoWordSuggestions = this.findTypoWordSuggestions(q, 6);
                }
            }

            html = `
                <div class="bwm-recovery-header">
                    <div class="bwm-recovery-title-row">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--bwm-node-hover); flex-shrink: 0;"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                        <span>`;

            if (currentMode === 'words') {
                html += `No exact match for &ldquo;${escapeHtml(q)}&rdquo; in Words view.`;
            } else if (currentMode === 'verses') {
                if (detectedBook && !detectedBook.isTypo) {
                    html += `No chapter or verse specified for &ldquo;${escapeHtml(q)}&rdquo;.`;
                } else {
                    html += `No verse found matching &ldquo;${escapeHtml(q)}&rdquo;.`;
                }
            } else if (currentMode === 'chapters') {
                html += `No chapter found matching &ldquo;${escapeHtml(q)}&rdquo;.`;
            } else {
                html += `No book found matching &ldquo;${escapeHtml(q)}&rdquo;.`;
            }

            html += `</span>
                    </div>
                    <button type="button" class="bwm-recovery-close" id="bwm-recovery-close-btn" title="Close suggestions">&times;</button>
                </div>
            `;

            let detectedChapter = detectChapterMatch(q, this.booksData ? this.booksData.books : null);

            // SECTION: Chapter Detection Action
            if (detectedChapter && (currentMode !== 'chapters' || detectedChapter.isTypo || detectedChapter.isSingleChapterBook)) {
                hasContent = true;
                let btnLabel = currentMode === 'chapters' ? `Search ${escapeHtml(detectedChapter.displayTitle)} &rarr;` : `View in Chapters Mode &rarr;`;
                let title = detectedChapter.isTypo
                    ? `📑 Did you mean Chapter: ${escapeHtml(detectedChapter.displayTitle)}?`
                    : (detectedChapter.isSingleChapterBook
                        ? `📑 Single-Chapter Book: ${escapeHtml(detectedChapter.displayTitle)}`
                        : `📑 Chapter Detected: ${escapeHtml(detectedChapter.displayTitle)}`);
                let desc = detectedChapter.isSingleChapterBook
                    ? `Explore the complete chapter and verse reader for ${escapeHtml(detectedChapter.bookName)} in Chapters Mode.`
                    : `Explore this chapter thematic network and verse-by-verse parallel reader in Chapters Mode.`;
                html += `
                    <div class="bwm-recovery-action-card">
                        <div class="bwm-recovery-action-info">
                            <div class="bwm-recovery-action-title">${title}</div>
                            <div class="bwm-recovery-action-desc">${desc}</div>
                        </div>
                        <button type="button" class="bwm-recovery-action-btn" id="bwm-recovery-btn-chapter" data-chapter="${escapeHtml(detectedChapter.chapterId)}">${btnLabel}</button>
                    </div>
                `;
            }

            // SECTION: Verse Detection Action (if in words or books view with detected verse, verse typo in verses view, or bare chapter/book in verses view)
            let verseActionData = null;
            let hasExactVerseRef = Boolean(detectedVerse && detectedVerse.vstart);
            if (hasExactVerseRef && (currentMode !== 'verses' || detectedVerse.isTypo)) {
                verseActionData = {
                    displayRef: detectedVerse.displayRef,
                    searchRef: detectedVerse.searchRef || detectedVerse.displayRef,
                    isTypo: detectedVerse.isTypo,
                    isBook11: false
                };
            } else if (detectedChapter && !hasExactVerseRef) {
                let chapNum = detectedChapter.chapNum || detectedChapter.chap || 1;
                verseActionData = {
                    displayRef: `${detectedChapter.bookName} ${chapNum}:1`,
                    searchRef: `${detectedChapter.bookCode} ${chapNum}:1`,
                    isTypo: detectedChapter.isTypo,
                    isBook11: false,
                    isChapterOpening: true
                };
            } else if (currentMode === 'verses' && !hasExactVerseRef && detectedBook) {
                verseActionData = {
                    displayRef: `${detectedBook.book.name} 1:1`,
                    searchRef: `${detectedBook.book.name} 1:1`,
                    isTypo: detectedBook.isTypo,
                    isBook11: true,
                    bookName: detectedBook.book.name
                };
            }

            if (verseActionData) {
                hasContent = true;
                let btnLabel = currentMode === 'verses' ? `Search ${escapeHtml(verseActionData.displayRef)} &rarr;` : `View in Verses Mode &rarr;`;
                let title = '';
                let desc = '';
                if (verseActionData.isChapterOpening) {
                    title = `📖 Verse Suggestion: ${escapeHtml(verseActionData.displayRef)}`;
                    let chapNum = detectedChapter.chapNum || detectedChapter.chap || 1;
                    desc = `Start at the opening verse of ${escapeHtml(detectedChapter.bookName)} ${chapNum} in Verses Mode.`;
                } else if (verseActionData.isBook11) {
                    title = verseActionData.isTypo
                        ? `📖 Did you mean Verse: ${escapeHtml(verseActionData.displayRef)}?`
                        : `📖 Verse Suggestion: ${escapeHtml(verseActionData.displayRef)}`;
                    desc = `Start at the opening verse of ${escapeHtml(verseActionData.bookName)} in Verses Mode.`;
                } else {
                    title = verseActionData.isTypo
                        ? `📖 Did you mean Scripture Verse: ${escapeHtml(verseActionData.displayRef)}?`
                        : `📖 Scripture Verse Detected: ${escapeHtml(verseActionData.displayRef)}`;
                    desc = verseActionData.isTypo
                        ? `Typo detected in book reference. Search for this passage in Verses Mode.`
                        : `This query matches a biblical passage. Explore its cross-references in Verses Mode.`;
                }

                html += `
                    <div class="bwm-recovery-action-card">
                        <div class="bwm-recovery-action-info">
                            <div class="bwm-recovery-action-title">${title}</div>
                            <div class="bwm-recovery-action-desc">${desc}</div>
                        </div>
                        <button type="button" class="bwm-recovery-action-btn" id="bwm-recovery-btn-verse" data-verse="${escapeHtml(verseActionData.searchRef)}">${btnLabel}</button>
                    </div>
                `;
            }

            // SECTION: Book Detection Action (if in words or verses view, or book typo in books view)
            if (detectedBook) {
                if (currentMode !== 'books' || detectedBook.isTypo) {
                    hasContent = true;
                    let bookName = detectedBook.book.name;
                    let btnLabel = currentMode === 'books' ? `Search ${escapeHtml(bookName)} &rarr;` : `View in Books Mode &rarr;`;
                    let title = detectedBook.isTypo ? `📚 Did you mean Bible Book: ${escapeHtml(bookName)}?` : `📚 Bible Book Detected: ${escapeHtml(bookName)}`;
                    let desc = detectedBook.isTypo ? `Typo detected in book name. Explore its chapter and thematic network in Books Mode.` : `This query matches a biblical book. Explore its structural connections in Books Mode.`;
                    html += `
                        <div class="bwm-recovery-action-card">
                            <div class="bwm-recovery-action-info">
                                <div class="bwm-recovery-action-title">${title}</div>
                                <div class="bwm-recovery-action-desc">${desc}</div>
                            </div>
                            <button type="button" class="bwm-recovery-action-btn" id="bwm-recovery-btn-book" data-book="${escapeHtml(bookName)}">${btnLabel}</button>
                        </div>
                    `;
                }
            }

            // SECTION: Word Detection Action (if in non-words view or words view when recovering, and query exists in words vocabulary)
            if (hasDirectWordMatch || (currentMode !== 'words' && !detectedBook && this.findTypoWordSuggestions(q, 1).length > 0)) {
                hasContent = true;
                let targetWord = hasDirectWordMatch ? (directWordMatch ? directWordMatch.w : q) : this.findTypoWordSuggestions(q, 1)[0].w;
                let posBadge = directWordMatch && directWordMatch.pos ? ` (${directWordMatch.pos.toLowerCase()})` : '';
                let displayWord = directWordMatch ? this.formatWord(directWordMatch.w, directWordMatch.pos) : (targetWord.charAt(0).toUpperCase() + targetWord.slice(1));
                let btnText = (currentMode === 'words') ? `Graph Word in Words Mode &rarr;` : `Search in Words Mode &rarr;`;
                html += `
                    <div class="bwm-recovery-action-card">
                        <div class="bwm-recovery-action-info">
                            <div class="bwm-recovery-action-title">✦ Biblical Keyword Detected: &ldquo;${escapeHtml(displayWord)}&rdquo;${escapeHtml(posBadge)}</div>
                            <div class="bwm-recovery-action-desc">This query is a canonical word. Explore its semantic constellation and usage in Words Mode.</div>
                        </div>
                        <button type="button" class="bwm-recovery-action-btn" id="bwm-recovery-btn-word" data-word="${escapeHtml(displayWord)}">${btnText}</button>
                    </div>
                `;
            }

            // SECTION: Alternate Canon Detection Action
            if (altCanonMatches && altCanonMatches.length > 0) {
                hasContent = true;
                html += `
                    <div class="bwm-recovery-section">
                        <div class="bwm-recovery-section-label">Found in Other Canons:</div>
                        <div style="display: flex; flex-direction: column; gap: 8px;">
                `;
                for (let am of altCanonMatches) {
                    let m = am.bestMatch;
                    let meta = am.meta;
                    let displayW = this.formatWord(m.w, m.pos);
                    let badgeParts = [];
                    if (m.original && Array.isArray(m.original) && m.original[0] && m.original[0].lemma) {
                        badgeParts.push(m.original[0].lemma);
                    }
                    if (m.pos) badgeParts.push(m.pos.toLowerCase());
                    if (m.f) badgeParts.push(`${m.f}x`);
                    let badgeText = badgeParts.length > 0 ? `(${badgeParts.join(', ')})` : '';
                    html += `
                        <div class="bwm-recovery-action-card">
                            <div class="bwm-recovery-action-info">
                                <div class="bwm-recovery-action-title">
                                    ✦ &ldquo;${escapeHtml(displayW)}&rdquo; <span style="font-size: 0.85em; opacity: 0.7;">${escapeHtml(badgeText)}</span>
                                    <span class="bwm-recovery-canon-tag" style="background:${meta.bg}; color:${meta.color}; border:1px solid ${meta.border}; font-weight:700; padding:2px 7px; border-radius:6px; font-size:0.75em; margin-left:6px;">${meta.tag}</span>
                                </div>
                                <div class="bwm-recovery-action-desc">
                                    Matches canonical vocabulary in the ${escapeHtml(meta.name)} (${escapeHtml(meta.sub)}). Switch to ${escapeHtml(meta.tag)} to explore its semantic constellation.
                                </div>
                            </div>
                            <button type="button" class="bwm-recovery-action-btn bwm-recovery-btn-switch-canon" data-switch-canon="${am.canon}" data-search-word="${escapeHtml(m.id || displayW)}">
                                Switch to ${escapeHtml(meta.tag)} &amp; Search &rarr;
                            </button>
                        </div>
                    `;
                }
                html += `</div></div>`;
            }

            if (rawTokens.length === 3 && (!centroidResult || centroidResult.matchedTokens.length < 2) && (!altCanonMatches || altCanonMatches.length === 0)) {
                html += `
                    <div class="bwm-recovery-hint" style="padding: 6px 10px; margin: 4px 0 8px 0; font-size: 0.8em; color: var(--bwm-text-muted); background: var(--bwm-input-bg); border-radius: 6px; border: 1px solid var(--bwm-border); line-height: 1.45;">
                        💡 <strong>Dynamic Search Tip:</strong> Searching with 4 or more words (or a known Scripture phrase) helps perform a dynamic semantic search, or try searching individual keywords.
                    </div>
                `;
            }

            // SECTION: Multi-token Typo Suggestions (in words mode)
            if (multiTokenSuggestions) {
                hasContent = true;
                let combinedParts = multiTokenSuggestions.map(td => {
                    if (td.matched) return td.token;
                    return (td.suggestions[0] ? td.suggestions[0].w : td.token);
                });
                let combinedQuery = combinedParts.join(' ');
                html += `
                    <div class="bwm-recovery-section">
                        <div class="bwm-recovery-section-label">Suggested Correction:</div>
                        <div class="bwm-recovery-pills">
                            <button type="button" class="bwm-recovery-pill-btn bwm-recovery-pill-word" data-word="${escapeHtml(combinedQuery)}">
                                <strong>${escapeHtml(combinedQuery)}</strong>
                            </button>
                        </div>
                    </div>
                `;
                let unmatchedTokens = multiTokenSuggestions.filter(td => !td.matched && td.suggestions.length > 0);
                if (unmatchedTokens.length > 0) {
                    html += `
                        <div class="bwm-recovery-section">
                            <div class="bwm-recovery-section-label">Token Suggestions:</div>
                            <div class="bwm-recovery-pills">`;
                    for (let ut of unmatchedTokens) {
                        for (let s of ut.suggestions) {
                            html += `
                                <button type="button" class="bwm-recovery-pill-btn bwm-recovery-pill-word" data-word="${escapeHtml(s.w)}" title="${escapeHtml(s.w)} (${s.pos || 'word'})">
                                    <span>${escapeHtml(s.w)}</span>
                                    ${s.pos ? `<span class="bwm-recovery-pill-pos">${escapeHtml(s.pos.toLowerCase())}</span>` : ''}
                                    ${s.f ? `<span class="bwm-recovery-pill-freq">${s.f}x</span>` : ''}
                                </button>
                            `;
                        }
                    }
                    html += `</div></div>`;
                }
            } else if (typoWordSuggestions.length > 0) {
                hasContent = true;
                html += `
                    <div class="bwm-recovery-section">
                        <div class="bwm-recovery-section-label">Did you mean:</div>
                        <div class="bwm-recovery-pills">`;
                for (let s of typoWordSuggestions) {
                    html += `
                        <button type="button" class="bwm-recovery-pill-btn bwm-recovery-pill-word" data-word="${escapeHtml(s.w)}" title="${escapeHtml(s.w)} (${s.pos || 'word'})">
                            <span>${escapeHtml(s.w)}</span>
                            ${s.pos ? `<span class="bwm-recovery-pill-pos">${escapeHtml(s.pos.toLowerCase())}</span>` : ''}
                            ${s.f ? `<span class="bwm-recovery-pill-freq">${s.f}x</span>` : ''}
                        </button>
                    `;
                }
                html += `</div></div>`;
            }
        }

        if (!hasContent) {
            html += `
                <div class="bwm-recovery-empty-hint">
                    Check your spelling or try searching for another biblical word, chapter, or book.
                </div>
            `;
        }

        this.searchRecoveryPopover.innerHTML = html;
        this.searchRecoveryPopover.style.display = 'flex';

        // Constrain max-height dynamically so popover never overflows the map container into the footer
        const containerEl = this.container || this.querySelector('.bwm-container');
        if (containerEl && this.searchRecoveryPopover) {
            const containerRect = containerEl.getBoundingClientRect();
            const popoverRect = this.searchRecoveryPopover.getBoundingClientRect();
            const availableHeight = containerRect.bottom - popoverRect.top - 16;
            if (availableHeight > 120) {
                this.searchRecoveryPopover.style.maxHeight = `${Math.floor(availableHeight)}px`;
            }
        }

        const closeBtn = this.searchRecoveryPopover.querySelector('#bwm-recovery-close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.closeSearchRecovery();
            });
        }

        const btnChapter = this.searchRecoveryPopover.querySelector('#bwm-recovery-btn-chapter');
        if (btnChapter) {
            btnChapter.addEventListener('click', (e) => {
                e.stopPropagation();
                const chapterTarget = btnChapter.getAttribute('data-chapter');
                this.closeSearchRecovery();
                this.setViewMode('chapters');
                if (this.searchInput) this.searchInput.value = formatChapterRef(chapterTarget);
                this.searchChapters([chapterTarget]);
            });
        }

        const btnVerse = this.searchRecoveryPopover.querySelector('#bwm-recovery-btn-verse');
        if (btnVerse) {
            btnVerse.addEventListener('click', (e) => {
                e.stopPropagation();
                const verseTarget = btnVerse.getAttribute('data-verse');
                this.closeSearchRecovery();
                this.setViewMode('verses');
                if (this.searchInput) this.searchInput.value = verseTarget;
                this.searchVerses();
            });
        }

        const btnBook = this.searchRecoveryPopover.querySelector('#bwm-recovery-btn-book');
        if (btnBook) {
            btnBook.addEventListener('click', (e) => {
                e.stopPropagation();
                const bookTarget = btnBook.getAttribute('data-book');
                this.closeSearchRecovery();
                this.setViewMode('books');
                if (this.searchInput) this.searchInput.value = bookTarget;
                this.searchBooks();
            });
        }

        const btnWord = this.searchRecoveryPopover.querySelector('#bwm-recovery-btn-word');
        if (btnWord) {
            btnWord.addEventListener('click', (e) => {
                e.stopPropagation();
                const wordTarget = btnWord.getAttribute('data-word');
                this.closeSearchRecovery();
                this.setViewMode('words');
                if (this.searchInput) this.searchInput.value = wordTarget;
                this.searchWord(false, true);
            });
        }

        const verseBtns = this.searchRecoveryPopover.querySelectorAll('.bwm-recovery-btn-suggested-verse');
        verseBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const verseTarget = btn.getAttribute('data-verse');
                const switchBsb = btn.getAttribute('data-switch-bsb') === 'true' || this.foundation !== 'bsb';
                this.closeSearchRecovery();
                if (switchBsb) {
                    this.setViewMode('verses');
                    this._pendingVerseSearch = verseTarget;
                    if (this.searchInput) this.searchInput.value = verseTarget;
                    this.setSemanticFoundation('bsb', true);
                } else {
                    this.setViewMode('verses');
                    if (this.searchInput) this.searchInput.value = verseTarget;
                    this.searchVerses();
                }
            });
        });

        const btnMultiWord = this.searchRecoveryPopover.querySelector('#bwm-recovery-btn-multiword');
        if (btnMultiWord) {
            btnMultiWord.addEventListener('click', (e) => {
                e.stopPropagation();
                const wordsTarget = btnMultiWord.getAttribute('data-words');
                const switchBsb = btnMultiWord.getAttribute('data-switch-bsb') === 'true' || this.foundation !== 'bsb';
                this.closeSearchRecovery();
                if (switchBsb) {
                    this.setViewMode('words');
                    this._pendingKeywordSearch = wordsTarget;
                    if (this.searchInput) this.searchInput.value = wordsTarget;
                    this.setSemanticFoundation('bsb', true);
                } else {
                    this.setViewMode('words');
                    if (this.searchInput) this.searchInput.value = wordsTarget;
                    this.searchWord(false, true);
                }
            });
        }

        const wordPills = this.searchRecoveryPopover.querySelectorAll('.bwm-recovery-pill-word');
        wordPills.forEach(pill => {
            pill.addEventListener('click', (e) => {
                e.stopPropagation();
                const wordTarget = pill.getAttribute('data-word');
                this.closeSearchRecovery();
                if (this.searchInput) this.searchInput.value = wordTarget;
                this.searchWord();
            });
        });

        const altCanonBtns = this.searchRecoveryPopover.querySelectorAll('.bwm-recovery-btn-switch-canon');
        altCanonBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const targetCanon = btn.getAttribute('data-switch-canon');
                const wordTarget = btn.getAttribute('data-search-word');
                this.closeSearchRecovery();
                this.setViewMode('words');
                this._pendingKeywordSearch = wordTarget;
                if (this.searchInput) this.searchInput.value = wordTarget.split('_')[0];
                this.setSemanticFoundation(targetCanon, true);
            });
        });
        } finally {
            this.setSearchSpinner(false);
        }
    }

    closeSearchRecovery() {
        this._searchRecoverySeq++;
        this.setSearchSpinner(false);
        if (this.searchRecoveryPopover) {
            this.searchRecoveryPopover.style.display = 'none';
            this.searchRecoveryPopover.style.maxHeight = '';
            this.searchRecoveryPopover.innerHTML = '';
        }
    }

    async searchWord(useExplicitIds = false, directKeywordSearch = false) {
        this.hoveredNode = null;
        let foundPoints = [];
        let originalQuery = this.searchInput ? this.searchInput.value.trim() : '';
        
        if (this.viewMode === 'books') {
            await this.searchBooks(useExplicitIds);
            return;
        }
        if (this.viewMode === 'chapters') {
            this.searchChapters(useExplicitIds);
            return;
        }
        if (this.viewMode === 'verses') {
            this.searchVerses(useExplicitIds);
            return;
        }
        
        if (!this.data2d) return;
        
        const findMatchesForToken = (token) => this.findMatchesForWordToken(token);

        if (!useExplicitIds) {
            let query = originalQuery.toLowerCase();
            if (!query) {
                this.clearAllKeywords();
                return;
            }

            // If the query is formatted as a Scripture verse citation (e.g. "John 3:16", "1 Cor 13") or chapter ("Gen 1"),
            // prioritize recovery instead of treating the book name as a word lemma
            if (!directKeywordSearch) {
                let detectedVerse = detectVerseReference(originalQuery);
                let detectedChapter = detectChapterMatch(originalQuery, this.booksData ? this.booksData.books : null);
                if (detectedVerse || detectedChapter) {
                    this.searchedWords = [];
                    this.drawerWords = [];
                    this.isSearchMode = false;
                    this.updateClearBtnVisibility();
                    this.updateUrl({ keywords: undefined });
                    this.renderActiveWords();
                    this.showSearchRecovery(originalQuery, 'words');
                    this.buildAllWordsGraph();
                    return;
                }
            }

            let queryTokens = query.split(/[\s,]+/).filter(w => w);
            let hasCommas = originalQuery.includes(',');
            if (!directKeywordSearch && queryTokens.length >= 3 && !hasCommas) {
                this.updateClearBtnVisibility();
                this.showSearchRecovery(originalQuery, 'words');
                return;
            }

            this.searchedWords = [];
            let phraseMatches = findMatchesForToken(query);
            if (phraseMatches.length > 0) {
                foundPoints.push(...phraseMatches);
                this.searchedWords.push(...phraseMatches.map(p => p.id));
            } else {
                let words = query.split(/[\s,]+/).filter(w => w);
                for (let w of words) {
                    let matches = findMatchesForToken(w);
                    if (matches.length > 0) {
                        foundPoints.push(...matches);
                        this.searchedWords.push(...matches.map(p => p.id));
                    }
                }
            }
            this.searchedWords = [...new Set(this.searchedWords)];
            this.drawerWords = [...this.searchedWords];
        } else {
            // Use explicit IDs already set in this.searchedWords
            if (this.searchedWords.length === 0) {
                this.clearAllKeywords();
                return;
            }
            let resolvedIds = [];
            this.searchedWords.forEach(id => {
                let p = this.data2d.find(d => d.id === id);
                if (!p) {
                    let parsed = this.parseWordId(id);
                    let matches = this.data2d.filter(d => d.w.toLowerCase() === parsed.word.toLowerCase());
                    if (parsed.pos) {
                        let posMatches = matches.filter(d => d.pos === parsed.pos);
                        if (posMatches.length > 0) matches = posMatches;
                    }
                    if (matches.length > 0) p = matches[0];
                }
                if (p) {
                    foundPoints.push(p);
                    resolvedIds.push(p.id);
                }
            });
            if (resolvedIds.length === 0 && originalQuery) {
                let queryTokens = originalQuery.toLowerCase().split(/[\s,]+/).filter(w => w);
                for (let qt of queryTokens) {
                    let matches = findMatchesForToken(qt);
                    if (matches.length > 0) {
                        foundPoints.push(...matches.slice(0, 3));
                        resolvedIds.push(...matches.slice(0, 3).map(m => m.id));
                    }
                }
            }
            this.searchedWords = [...new Set(resolvedIds)];
            this.drawerWords = [...this.searchedWords];
        }
        
        this.updateClearBtnVisibility();
        
        if (foundPoints.length === 0) {
            this.searchedWords = [];
            this.drawerWords = [];
            this.isSearchMode = false;
            this.updateClearBtnVisibility();
            this.updateUrl({ keywords: undefined });
            this.renderActiveWords();
            this.showSearchRecovery(originalQuery, 'words');
            this.buildAllWordsGraph();
            return;
        }

        this.closeSearchRecovery();

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
                    let swPoint = this.data2d ? this.data2d.find(d => d.id === sw) : null;
                    let linkSim = (n.v && swPoint && swPoint.v) ? this.cosineSimilarity(n.v, swPoint.v) : (sw === n.sourceKw ? n.sim : 0);
                    this.allSearchLinks.push({
                        source: n.id,
                        target: sw,
                        type: 'direct',
                        intersection: intersection,
                        sim: linkSim
                    });
                    if (sw === n.sourceKw) linkedToSourceKw = true;
                }
            });
            
            if (!linkedToSourceKw) {
                let sourceKwPoint = this.data2d ? this.data2d.find(d => d.id === n.sourceKw) : null;
                let linkSim = (n.v && sourceKwPoint && sourceKwPoint.v) ? this.cosineSimilarity(n.v, sourceKwPoint.v) : n.sim;
                this.allSearchLinks.push({
                    source: n.id,
                    target: n.sourceKw,
                    type: 'indirect',
                    sim: linkSim
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
        this._nodesBounds = null;
        
        let baseWords = [...new Set(this.searchedWords.map(id => {
            let { word, pos } = this.parseWordId(id);
            return this.formatWord(word, pos);
        }))];
        this.searchInput.value = baseWords.join(" ");
        
        if (this.searchedWords && this.searchedWords.length > 0) {
            this.updateUrl({ keywords: this.searchedWords.join(',') });
        }
        
        this.renderActiveWords();

        this.hideVerseCard();
        this.hideChapterCard();
        this.hideBookCard();

        let primaryId = this.searchedWords && this.searchedWords[0];
        let primaryNode = (this.allSearchNodes && this.allSearchNodes.find(n => n.id === primaryId))
            || (foundPoints && foundPoints[0])
            || (this.data2d && this.data2d.find(d => d.id === primaryId));

        if (window.innerWidth <= 768) {
            if (primaryNode) {
                this.lastInspectedWordNode = primaryNode;
            }
            this.hideWordInspector();
        } else {
            if (primaryNode) {
                this.showWordInspector(primaryNode, this.lastWordInspectorTab || 'verses');
            }
        }
        this.runSimulation();
    }
    updateClearBtnVisibility() {
        if (!this.searchClearBtn) return;
        const hasText = this.searchInput && this.searchInput.value.trim().length > 0;
        const hasKeywords = (this.viewMode === 'books')
            ? (this.searchedBooks && this.searchedBooks.length > 0)
            : (this.viewMode === 'chapters')
                ? (this.searchedChapters && this.searchedChapters.length > 0)
                : (this.viewMode === 'verses')
                    ? (this.searchedVerses && this.searchedVerses.length > 0)
                    : (this.searchedWords && this.searchedWords.length > 0);
        const wrapper = this.querySelector('.bwm-search-input-wrapper');
        if (hasText || hasKeywords) {
            this.searchClearBtn.classList.add('visible');
            if (wrapper) wrapper.classList.add('has-clear-btn');
        } else {
            this.searchClearBtn.classList.remove('visible');
            if (wrapper) wrapper.classList.remove('has-clear-btn');
        }
    }

    clearAllKeywords() {
        this.closeSearchRecovery();
        if (this.viewMode === 'books') {
            this.resetBooksView();
            return;
        }
        if (this.viewMode === 'chapters') {
            this.resetChaptersView();
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
        this.searchedChapters = [];
        this.drawerChapters = [];
        this.selectedVerse = null;
        this.selectedChapter = null;
        if (this.searchInput) this.searchInput.value = '';
        this.updateClearBtnVisibility();
        this.renderActiveWords();
        if (this.reopenBtn) this.reopenBtn.style.display = 'none';
        if (this.verseReopenBtn) this.verseReopenBtn.style.display = 'none';
        if (this.chapterReopenBtn) this.chapterReopenBtn.style.display = 'none';
        if (this.wordReopenBtn) this.wordReopenBtn.style.display = 'none';
        this.updateUrl({});
        this.hideRadialMenu();
        this.hideVersesPanel();
        this.hideCanonUsageModal();
        this.hideVerseCard();
        this.hideChapterCard();
        this.hideWordInspector();
        this.hideBookCard();
        if (this.isStudyPanelPinned) this.unpinStudyPanel();
        this.inspectorNode = null;
        this.hoveredNode = null;
        this.buildAllWordsGraph();
    }

    showLoading(text = 'Loading Bible Word Map...', type = 'words') {
        if (!this.loading) return;
        this._isLoadingActive = true;
        this.updateZoomExtentsVisibility();
        this._loadingStartTime = performance.now();
        if (this._loadingFadeTimeout) {
            clearTimeout(this._loadingFadeTimeout);
            this._loadingFadeTimeout = null;
        }
        this._triggerParticleCollapse = null;
        this.loading.classList.remove('bwm-loading-fadeout', 'bwm-loading-collapsing');
        this.loading.style.removeProperty('--bwm-collapse-dur');
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
        if (this._loadingFadeTimeout) {
            clearTimeout(this._loadingFadeTimeout);
            this._loadingFadeTimeout = null;
        }

        const elapsed = performance.now() - (this._loadingStartTime || 0);

        // Near-instant cache hit or synchronous switch (< 80ms): dismiss immediately with no flash
        if (elapsed < 80) {
            this.stopLoadingAnimation();
            if (this.loading) {
                this.loading.style.display = 'none';
                this.loading.classList.remove('bwm-loading-fadeout', 'bwm-loading-collapsing');
                this.loading.style.removeProperty('--bwm-collapse-dur');
            }
            this._isLoadingActive = false;
            this.updateZoomExtentsVisibility();
            return;
        }

        // Slow load (>= 2000ms): user has already waited, jump straight to content in 250ms
        if (elapsed >= 2000 || !this._triggerParticleCollapse) {
            this.loading.classList.remove('bwm-loading-collapsing');
            this.loading.classList.add('bwm-loading-fadeout');
            this._loadingFadeTimeout = setTimeout(() => {
                this.stopLoadingAnimation();
                if (this.loading) {
                    this.loading.style.display = 'none';
                    this.loading.classList.remove('bwm-loading-fadeout');
                }
                this._loadingFadeTimeout = null;
                this._isLoadingActive = false;
                this.updateZoomExtentsVisibility();
            }, 250);
            return;
        }

        // Fast load (< 2000ms): smooth collapse transition over 950ms to prevent abrasive flash
        const collapseDur = 950;
        this.loading.style.setProperty('--bwm-collapse-dur', `${collapseDur}ms`);
        this.loading.classList.remove('bwm-loading-fadeout');
        this.loading.classList.add('bwm-loading-collapsing');

        this._triggerParticleCollapse(collapseDur, () => {
            this.stopLoadingAnimation();
            if (this.loading) {
                this.loading.style.display = 'none';
                this.loading.classList.remove('bwm-loading-collapsing');
                this.loading.style.removeProperty('--bwm-collapse-dur');
            }
            this._loadingFadeTimeout = null;
            this._isLoadingActive = false;
            this.updateZoomExtentsVisibility();
        });
    }

    parseWordId(id) {
        if (!id) return { word: '', pos: '', strongs: '', lemma: '' };
        if (this.data2d) {
            let found = this.data2d.find(d => d.id === id);
            if (found) {
                let st = '';
                let lm = '';
                if (found.original && found.original.length > 0) {
                    if (found.original[0].strongs) st = found.original[0].strongs;
                    if (found.original[0].lemma) lm = found.original[0].lemma;
                }
                return {
                    word: found.w,
                    pos: found.pos,
                    strongs: st,
                    lemma: lm
                };
            }
        }
        let parts = id.split('_');
        if (parts.length >= 3) {
            let pos = parts[parts.length - 1];
            let mid = parts[parts.length - 2];
            let word = parts.slice(0, parts.length - 2).join(' ');
            let isStrongs = /^([GH]\d+|L\d+)/i.test(mid);
            return {
                word,
                pos,
                strongs: isStrongs ? mid : '',
                lemma: !isStrongs ? mid : ''
            };
        } else if (parts.length === 2) {
            let pos = parts[parts.length - 1];
            let word = parts.slice(0, parts.length - 1).join(' ');
            return { word, pos, strongs: '', lemma: '' };
        }
        return { word: id, pos: '', strongs: '', lemma: '' };
    }

    getActiveBibleBooks() {
        if (this.foundation === 'vul') return BIBLE_BOOKS_VUL;
        if (this.foundation === 'lxx') return BIBLE_BOOKS_LXX;
        return BIBLE_BOOKS_BSB;
    }

    fallbackCopyText(text, cb) {
        try {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.opacity = '0';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            if (cb) cb();
        } catch (err) {}
    }

    updateUrl(paramsObj = {}) {
        try {
            let url = new URL(window.location.href);
            url.search = '';

            // 1. Canon (c) - omit default 'bsb'
            let canon;
            if ('c' in paramsObj) canon = paramsObj.c;
            else if ('f' in paramsObj) canon = paramsObj.f;
            else if ('canon' in paramsObj) canon = paramsObj.canon;
            else if ('base' in paramsObj) canon = paramsObj.base;
            else if ('foundation' in paramsObj) canon = paramsObj.foundation;
            else canon = this.foundation;
            if (canon && canon !== 'bsb') {
                url.searchParams.set('c', canon);
            }

            // 2. View Mode (m) - omit default 'words'
            let rawMode;
            if ('m' in paramsObj) rawMode = paramsObj.m;
            else if ('view' in paramsObj) rawMode = paramsObj.view;
            else if ('mode' in paramsObj) rawMode = paramsObj.mode;
            else rawMode = this.viewMode;
            let mode = rawMode ? rawMode.toLowerCase() : 'words';
            if (mode === 'verses' || mode === 'v') {
                url.searchParams.set('m', 'v');
            } else if (mode === 'chapters' || mode === 'chapter' || mode === 'ch') {
                url.searchParams.set('m', 'ch');
            } else if (mode === 'books' || mode === 'b') {
                url.searchParams.set('m', 'b');
            }

            // 3. Words (w)
            let words;
            if ('w' in paramsObj) words = paramsObj.w;
            else if ('keywords' in paramsObj) words = paramsObj.keywords;
            else if ('keyword' in paramsObj) words = paramsObj.keyword;
            else if ('words' in paramsObj) words = paramsObj.words;
            else if ('k' in paramsObj) words = paramsObj.k;
            else if ((mode === 'words' || mode === 'w') && this.searchedWords && this.searchedWords.length > 0) words = this.searchedWords.join(',');
            if (words && (mode === 'words' || mode === 'w')) {
                url.searchParams.set('w', words);
            }

            // 4. Verses (v) - format with dot notation (GEN.1.1) to eliminate spaces
            let verses;
            if ('v' in paramsObj) verses = paramsObj.v;
            else if ('verses' in paramsObj) verses = paramsObj.verses;
            else if ('verse' in paramsObj) verses = paramsObj.verse;
            else if ('vs' in paramsObj) verses = paramsObj.vs;
            else if ((mode === 'verses' || mode === 'v') && this.searchedVerses && this.searchedVerses.length > 0) verses = this.searchedVerses.join(',');
            if (verses && (mode === 'verses' || mode === 'v')) {
                let cleanVerses = verses.split(',').map(v => v.trim().replace(/\s+/g, '.').replace(/:/g, '.')).filter(v => v).join(',');
                if (cleanVerses) url.searchParams.set('v', cleanVerses);
            }

            // 5. Chapters (ch)
            let chapters;
            if ('ch' in paramsObj) chapters = paramsObj.ch;
            else if ('chapters' in paramsObj) chapters = paramsObj.chapters;
            else if ('chapter' in paramsObj) chapters = paramsObj.chapter;
            else if ('chap' in paramsObj) chapters = paramsObj.chap;
            else if ((mode === 'chapters' || mode === 'ch') && this.searchedChapters && this.searchedChapters.length > 0) chapters = this.searchedChapters.join(',');
            if (chapters && (mode === 'chapters' || mode === 'ch')) {
                let cleanChapters = chapters.split(',').map(c => c.trim().replace(/\s+/g, '.')).filter(c => c).join(',');
                if (cleanChapters) url.searchParams.set('ch', cleanChapters);
            }

            // 6. Books (b)
            let books;
            if ('b' in paramsObj) books = paramsObj.b;
            else if ('books' in paramsObj) books = paramsObj.books;
            else if ('book' in paramsObj) books = paramsObj.book;
            else if ((mode === 'books' || mode === 'b') && this.searchedBooks && this.searchedBooks.length > 0) books = this.searchedBooks.join(',');
            if (books && (mode === 'books' || mode === 'b')) {
                url.searchParams.set('b', books);
            }

            // Optional configurations (only include if non-default)
            if (paramsObj.ccm) {
                if (paramsObj.ccm !== 'words' && paramsObj.ccm !== 'w') url.searchParams.set('ccm', paramsObj.ccm);
            } else if (this.chapterConnMode && this.chapterConnMode !== 'words' && (mode === 'chapters' || mode === 'ch')) {
                url.searchParams.set('ccm', this.chapterConnMode === 'verses' ? 'verses' : 'chapters');
            }
            if (paramsObj.vc && paramsObj.vc !== 'refs' && paramsObj.vc !== 'r') {
                url.searchParams.set('vc', paramsObj.vc);
            } else if (this.verseViewMode === 'words' && (mode === 'verses' || mode === 'v')) {
                url.searchParams.set('vc', 'w');
            }
            if (paramsObj.t && paramsObj.t !== 'all') {
                url.searchParams.set('t', paramsObj.t);
            } else if (this.testamentFilter && this.testamentFilter !== 'all') {
                url.searchParams.set('t', this.testamentFilter);
            }
            if (paramsObj.s && paramsObj.s !== 'hover' && paramsObj.s !== 'h') {
                url.searchParams.set('s', paramsObj.s);
            } else if (this.similarityLabelsMode && this.similarityLabelsMode !== 'hover') {
                url.searchParams.set('s', (this.similarityLabelsMode === 'all') ? 'a' : 'off');
            }

            let searchStr = url.search ? url.search.replace(/%2C/gi, ',') : '';
            window.history.replaceState(null, '', url.pathname + searchStr);
        } catch (e) {}
    }

    setSemanticFoundation(foundation, reload = true) {
        if (this.foundation === foundation && !reload) return;
        this.foundation = foundation;
        this._canonicalVersesByFoundation = {};
        this._canonicalVerseIndexByFoundation = {};
        this._canonicalChaptersByFoundation = {};
        this._canonicalChapterIndexByFoundation = {};

        const lxxPill = this.querySelector('#bwm-btn-foundation-lxx');
        const bsbPill = this.querySelector('#bwm-btn-foundation-bsb');
        const vulPill = this.querySelector('#bwm-btn-foundation-vul');
        if (lxxPill && bsbPill && vulPill) {
            bsbPill.classList.toggle('active', foundation === 'bsb');
            lxxPill.classList.toggle('active', foundation === 'lxx');
            vulPill.classList.toggle('active', foundation === 'vul');
        }

        const vParam = '?v=10.2.0';
        if (foundation === 'lxx') {
            this.src2d = this.getAttribute('src-2d-lxx') || ('data/output/wordmap_2d_lxx.json' + vParam);
            this.srcVerses = this.getAttribute('src-verses-lxx') || ('data/output/verse_index_lxx.json' + vParam);
            this.srcBooks = this.getAttribute('src-books-lxx') || ('data/output/bookmap_2d_lxx.json' + vParam);
            this.srcVersemap = this.getAttribute('src-versemap-lxx') || ('data/output/versemap_2d_lxx.json' + vParam);
            this.srcChapters = this.getAttribute('src-chapters-lxx') || ('data/output/chaptermap_2d_lxx.json' + vParam);
        } else if (foundation === 'vul') {
            this.src2d = this.getAttribute('src-2d-vul') || ('data/output/wordmap_2d_vul.json' + vParam);
            this.srcVerses = this.getAttribute('src-verses-vul') || ('data/output/verse_index_vul.json' + vParam);
            this.srcBooks = this.getAttribute('src-books-vul') || ('data/output/bookmap_2d_vul.json' + vParam);
            this.srcVersemap = this.getAttribute('src-versemap-vul') || ('data/output/versemap_2d_vul.json' + vParam);
            this.srcChapters = this.getAttribute('src-chapters-vul') || ('data/output/chaptermap_2d_vul.json' + vParam);
        } else {
            this.src2d = this.getAttribute('src-2d-bsb') || this.getAttribute('src-2d') || ('data/output/wordmap_2d.json' + vParam);
            this.srcVerses = this.getAttribute('src-verses-bsb') || this.getAttribute('src-verses') || ('data/output/verse_index.json' + vParam);
            this.srcBooks = this.getAttribute('src-books-bsb') || this.getAttribute('src-books') || ('data/output/bookmap_2d.json' + vParam);
            this.srcVersemap = this.getAttribute('src-versemap-bsb') || this.getAttribute('src-versemap') || ('data/output/versemap_2d.json' + vParam);
            this.srcChapters = this.getAttribute('src-chapters-bsb') || this.getAttribute('src-chapters') || ('data/output/chaptermap_2d.json' + vParam);
        }

        if (this.viewMode === 'verses') {
            this.updateUrl({ view: 'verses', verses: (this.searchedVerses && this.searchedVerses.length > 0) ? this.searchedVerses.join(',') : undefined });
        } else if (this.viewMode === 'chapters') {
            this.updateUrl({ view: 'chapters', chapters: (this.searchedChapters && this.searchedChapters.length > 0) ? this.searchedChapters.join(',') : undefined, ccm: this.chapterConnMode });
        } else if (this.viewMode === 'books') {
            this.updateUrl({ view: 'books', books: (this.searchedBooks && this.searchedBooks.length > 0) ? this.searchedBooks.join(',') : undefined });
        } else {
            this.updateUrl({ keywords: (this.searchedWords && this.searchedWords.length > 0) ? this.searchedWords.join(',') : undefined });
        }

        if (reload) {
            this.data2d = null;
            this.verses = null;
            this.wordToVerses = null;
            this.booksData = null;
            this.versemapData = null;
            this.versemapLookup = new Map();
            this.chaptersData = null;
            this.chaptermapLookup = new Map();
            this.searchedChapters = [];
            this.drawerChapters = [];
            this.selectedChapter = null;
            this.verseTextMap.clear();
            this.verseGreekMap.clear();

            if (this.closeActiveInfoWindows) {
                this.closeActiveInfoWindows();
            }

            this.loadData();
        }
    }

    formatWord(word, pos) {
        if (!word) return '';
        if (pos === 'PROPN' && word.length > 0) {
            return word.split(' ').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
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
                label.innerHTML = `<strong>${formatted}</strong> <span class="bwm-book-badge" style="background:${genreColor};">${genre}</span>`;

                label.addEventListener('click', () => { cb.click(); });

                item.appendChild(cb);
                item.appendChild(label);
                container.appendChild(item);
            });
            return;
        }

        if (this.viewMode === 'chapters') {
            if (this.drawerClearAllBtn) {
                if (this.drawerChapters && this.drawerChapters.length > 0) {
                    this.drawerClearAllBtn.classList.add('visible');
                } else {
                    this.drawerClearAllBtn.classList.remove('visible');
                }
            }
            this.updateClearBtnVisibility();

            if (!this.drawerChapters || this.drawerChapters.length === 0) {
                container.innerHTML = '<div class="bwm-empty-state">No chapters selected.</div>';
                return;
            }

            container.innerHTML = '';
            this.drawerChapters.forEach(code => {
                let item = document.createElement('div');
                item.className = 'bwm-active-word-item';

                let cb = document.createElement('input');
                cb.type = 'checkbox';
                cb.checked = this.searchedChapters.includes(code);
                cb.addEventListener('change', () => {
                    if (cb.checked) {
                        if (!this.searchedChapters.includes(code)) this.searchedChapters.push(code);
                    } else {
                        this.searchedChapters = this.searchedChapters.filter(x => x !== code);
                    }
                    if (this.searchedChapters.length === 0) {
                        this.clearAllKeywords();
                    } else {
                        this.searchChapters(true);
                    }
                });

                let genre = getChapterGenre(code);
                let genreColor = GENRE_COLORS[genre] || '#3b82f6';
                let formatted = formatChapterRef(code);
                let label = document.createElement('label');
                label.style.cursor = 'pointer';
                label.innerHTML = `<strong>${formatted}</strong> <span class="bwm-book-badge" style="background:${genreColor};">${genre}</span>`;

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
                label.innerHTML = `<strong>${book.name}</strong> <span class="bwm-book-badge" style="background:${genreColor};">${book.genre}</span>`;

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
            let { word: w, pos, strongs } = this.parseWordId(id);
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
                let baseWords = [...new Set(this.searchedWords.map(wid => {
                    let { word: bw, pos: bp } = this.parseWordId(wid);
                    return this.formatWord(bw, bp);
                }))];
                this.searchInput.value = baseWords.join(" ");
                this.searchWord(true); // pass flag to indicate explicit IDs
            });
            
            let label = document.createElement('label');
            label.style.cursor = 'pointer';
            let displayW = this.formatWord(w, pos);
            let badge = strongs && pos ? `(${strongs} ${pos})` : (strongs ? `(${strongs})` : (pos ? `(${pos})` : ''));
            label.innerHTML = `<strong>${displayW}</strong>${badge ? ` <span style="color:var(--bwm-text-muted, #888);font-size:0.85em;">${badge}</span>` : ''}`;
            
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
        
        // Freeze and stabilize keyword positions so incoming neighbors do not push them
        if (kwNodes.length === 1) {
            kwNodes[0].x = 0;
            kwNodes[0].y = 0;
            kwNodes[0].fx = 0;
            kwNodes[0].fy = 0;
        } else {
            // Distribute multiple keywords symmetrically around center
            kwNodes.forEach((n, idx) => {
                const angle = (idx / kwNodes.length) * Math.PI * 2;
                const r = 70;
                n.x = Math.cos(angle) * r;
                n.y = Math.sin(angle) * r;
                delete n.fx;
                delete n.fy;
            });
        }
        
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
        
        this.transform = d3.zoomIdentity.translate(this.getInitialCameraCenterX(), ch/2).scale(1);
        d3.select(this.canvas).call(this.zoom.transform, this.transform);

        const LCG = d3.randomLcg(42); 
        
        this.simulation = d3.forceSimulation(this.nodes)
            .randomSource(LCG)
            .velocityDecay(0.45)
            .force("link", d3.forceLink(this.links).id(d => d.id).distance(d => {
                if (d.type === 'kw-kw') return Math.max(80, (1 - d.sim) * 400);
                return d.type === 'direct' ? Math.max(35, (1 - d.sim) * 150) : Math.max(65, (1 - d.sim) * 250);
            }).strength(d => d.type === 'kw-kw' ? 1.5 : 0.6))
            .force("charge", d3.forceManyBody().strength(-180))
            .force("collide", d3.forceCollide().radius(d => d.isKw ? 26 : 13))
            .force("center", d3.forceCenter(0, 0).strength(0.04))
            .on("tick", () => {
                this.updateDynamicZoom();
                this.draw();
            });

        // For multiple keywords, let them quickly relax to their mutual distance then pin them
        if (kwNodes.length > 1) {
            for (let i = 0; i < 40; i++) {
                this.simulation.tick();
            }
            kwNodes.forEach(n => {
                n.fx = n.x;
                n.fy = n.y;
            });
        }
            
        this.pendingNodes = [];
        this.enqueueNodes(otherNodes);
    }
    
    enqueueNodes(nodesToSpawn) {
        if (!this.pendingNodes) this.pendingNodes = [];
        this.pendingNodes.push(...nodesToSpawn);
        this.pendingNodes.sort((a, b) => b.sim - a.sim);
        
        if (this.spawnInterval) return; // already running
        
        this._spawnCounter = 0;
        let batchSize = 3;
        this.spawnInterval = setInterval(() => {
            if (this.pendingNodes.length === 0) {
                clearInterval(this.spawnInterval);
                this.spawnInterval = null;
                return;
            }
            
            let batch = this.pendingNodes.splice(0, batchSize);
            const now = performance.now();
            
            batch.forEach(n => {
                let cw = this.logicalWidth || 800;
                let ch = this.logicalHeight || 600;
                let sourceNode = this.nodes.find(node => node.id === n.sourceKw);
                let startX = sourceNode ? sourceNode.x : 0;
                let startY = sourceNode ? sourceNode.y : 0;
                
                // Golden spiral distribution (phyllotaxis: angle ≈ 137.508° / 2.399963 rad)
                const angle = (this._spawnCounter || 0) * 2.399963;
                this._spawnCounter = (this._spawnCounter || 0) + 1;
                
                // Pre-position near natural resting orbit outside keyword collision radius (26 + 13 = 39px)
                const baseDist = (n.isBookWord || this.viewMode === 'books')
                    ? Math.max(45, (1 - (n.sim || 0.8)) * 180)
                    : Math.max(42, (1 - (n.sim || 0.8)) * 150);
                
                const dist = baseDist + (Math.random() - 0.5) * 8;
                n.x = startX + Math.cos(angle) * dist;
                n.y = startY + Math.sin(angle) * dist;
                n.spawnTime = now;
                this.nodes.push(n);
                
                let nodeLinks = this.allSearchLinks.filter(l => l.source === n.id || (typeof l.source === 'object' && l.source.id === n.id));
                nodeLinks.forEach(l => { l.spawnTime = now; });
                this.links.push(...nodeLinks);
            });
            
            this.simulation.nodes(this.nodes);
            this.simulation.force("link").links(this.links);
            this.simulation.alpha(0.09).restart();
            
        }, 50); 
    }

    removeKeyword(oldWord) {
        if (!this.isSearchMode || !this.searchedWords.includes(oldWord)) return;
        
        this.searchedWords = this.searchedWords.filter(x => x !== oldWord);
        this.syncKeywordToggles(oldWord, false);
        let baseWords = [...new Set(this.searchedWords.map(id => {
            let { word, pos } = this.parseWordId(id);
            return this.formatWord(word, pos);
        }))];
        this.searchInput.value = baseWords.join(" ");
        this.searchWord(true);
    }

    async addKeyword(newWord) {
        if (!this.isSearchMode) {
            let { word, pos } = this.parseWordId(newWord);
            this.searchInput.value = this.formatWord(word, pos);
            this.syncKeywordToggles(newWord, true);
            this.searchWord();
            return;
        }
        
        if (this.searchedWords.includes(newWord)) return; // already added
        
        let p = this.data2d.find(d => d.id === newWord);
        if (!p) return;
        
        this.searchedWords.push(newWord);
        this.syncKeywordToggles(newWord, true);
        if (!this.drawerWords) this.drawerWords = [];
        if (!this.drawerWords.includes(newWord)) this.drawerWords.push(newWord);
        
        let baseWords = [...new Set(this.searchedWords.map(id => {
            let { word, pos } = this.parseWordId(id);
            return this.formatWord(word, pos);
        }))];
        this.searchInput.value = baseWords.join(" ");
        
        if (this.searchedWords && this.searchedWords.length > 0) {
            this.updateUrl({ keywords: this.searchedWords.join(',') });
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
                    let alreadyHasLink = this.allSearchLinks.some(l => {
                        let src = (typeof l.source === 'object' && l.source !== null) ? l.source.id : l.source;
                        let tgt = (typeof l.target === 'object' && l.target !== null) ? l.target.id : l.target;
                        return (src === s.point.id && tgt === sw) || (src === sw && tgt === s.point.id);
                    });
                    if (!alreadyHasLink) {
                        let swPoint = this.data2d ? this.data2d.find(d => d.id === sw) : null;
                        let linkSim = (s.point.v && swPoint && swPoint.v) ? this.cosineSimilarity(s.point.v, swPoint.v) : (sw === p.id ? s.sim : 0);
                        let link = {
                            source: s.point.id, target: sw, type: 'direct', intersection: intersection, sim: linkSim
                        };
                        this.allSearchLinks.push(link);
                        
                        let activeNode = this.nodes.find(n => n.id === s.point.id);
                        if (activeNode) this.links.push(link);
                    }
                    if (sw === p.id) linkedToSourceKw = true;
                }
            });
            
            if (!linkedToSourceKw) {
                let alreadyHasLink = this.allSearchLinks.some(l => {
                    let src = (typeof l.source === 'object' && l.source !== null) ? l.source.id : l.source;
                    let tgt = (typeof l.target === 'object' && l.target !== null) ? l.target.id : l.target;
                    return (src === s.point.id && tgt === p.id) || (src === p.id && tgt === s.point.id);
                });
                if (!alreadyHasLink) {
                    let link = {
                        source: s.point.id, target: p.id, type: 'indirect', sim: s.sim
                    };
                    this.allSearchLinks.push(link);
                    
                    let activeNode = this.nodes.find(n => n.id === s.point.id);
                    if (activeNode) this.links.push(link);
                }
            }
        });
        
        // 3.5 Ensure any already-spawned nodes that intersect with the new keyword get a direct link
        let newKwVerses = this.wordToVerses ? (this.wordToVerses[p.id] || []) : [];
        this.nodes.forEach(n => {
            if (n.isKw) return;
            
            let hasLinkToNewKw = this.allSearchLinks.some(l => {
                let src = (typeof l.source === 'object' && l.source !== null) ? l.source.id : l.source;
                let tgt = (typeof l.target === 'object' && l.target !== null) ? l.target.id : l.target;
                return (src === n.id && tgt === p.id) || (src === p.id && tgt === n.id);
            });
            if (hasLinkToNewKw) return;
            
            let myVerses = this.wordToVerses ? (this.wordToVerses[n.id] || []) : [];
            let intersection = myVerses.filter(vId => newKwVerses.includes(vId));
            
            if (intersection.length > 0) {
                let linkSim = (n.v && p.v) ? this.cosineSimilarity(n.v, p.v) : 0;
                let link = {
                    source: n.id, target: p.id, type: 'direct', intersection: intersection, sim: linkSim
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
        const isMobile = (window.innerWidth <= 768 || cw <= 768);
        const pad = isMobile ? 0.88 : 0.92;
        
        let leftMargin = (this.isOptionsPanelPinned && !isMobile) ? 300 : 0;
        let rightMargin = (!isMobile && (this.isStudyPanelPinned || this.isStudyPanelVisible())) ? 440 : 0;
        let effectiveCw = Math.max(cw - leftMargin - rightMargin, 300);
        
        // Target scale to fit bounds with responsive padding
        let targetScale = pad / Math.max(dx / effectiveCw, dy / ch);
        const maxScale = isMobile ? 2.2 : 2.6;
        targetScale = Math.min(targetScale, maxScale);
        
        // Smoothly interpolate current transform towards target transform
        let k = this.transform.k + (targetScale - this.transform.k) * 0.05;
        
        let targetX = (leftMargin + effectiveCw / 2) - k * cx;
        let targetY = ch / 2 - k * cy;
        
        let tx = this.transform.x + (targetX - this.transform.x) * 0.05;
        let ty = this.transform.y + (targetY - this.transform.y) * 0.05;
        
        let newTransform = d3.zoomIdentity.translate(tx, ty).scale(k);
        this.transform = newTransform;
        
        // Silently update d3 zoom state to match our programmatic panning
        this.canvas.__zoom = newTransform;
    }

    getZoomExtentsTransform(paddingFactor) {
        if (!this.nodes || this.nodes.length === 0) return null;
        let minX, maxX, minY, maxY;
        if (this.isSearchMode) {
            minX = d3.min(this.nodes, d => d.x);
            maxX = d3.max(this.nodes, d => d.x);
            minY = d3.min(this.nodes, d => d.y);
            maxY = d3.max(this.nodes, d => d.y);
        } else if (this._nodesBounds) {
            minX = this._nodesBounds.minX;
            maxX = this._nodesBounds.maxX;
            minY = this._nodesBounds.minY;
            maxY = this._nodesBounds.maxY;
        } else {
            minX = d3.min(this.nodes, d => d.x);
            maxX = d3.max(this.nodes, d => d.x);
            minY = d3.min(this.nodes, d => d.y);
            maxY = d3.max(this.nodes, d => d.y);
            if (!this.simulation || this.simulation.alpha() < 0.05) {
                this._nodesBounds = { minX, maxX, minY, maxY };
            }
        }
        
        let dx = maxX - minX || 1;
        let dy = maxY - minY || 1;
        let cx = (minX + maxX) / 2;
        let cy = (minY + maxY) / 2;
        
        let cw = this.logicalWidth || 800;
        let ch = this.logicalHeight || 600;
        const isMobile = (window.innerWidth <= 768 || cw <= 768);
        const defaultPadding = isMobile ? 0.88 : 0.92;
        const pad = (paddingFactor !== undefined) ? paddingFactor : defaultPadding;
        
        let leftMargin = (this.isOptionsPanelPinned && !isMobile) ? 300 : 0;
        let rightMargin = (!isMobile && (this.isStudyPanelPinned || this.isStudyPanelVisible())) ? 440 : 0;
        let effectiveCw = Math.max(cw - leftMargin - rightMargin, 300);
        
        let targetScale = pad / Math.max(dx / effectiveCw, dy / ch);
        if (this.isSearchMode) {
            const maxScale = isMobile ? 2.2 : 2.6;
            targetScale = Math.min(targetScale, maxScale);
        }
        
        let tx = (leftMargin + effectiveCw / 2) - targetScale * cx;
        let ty = ch / 2 - targetScale * cy;
        return d3.zoomIdentity.translate(tx, ty).scale(targetScale);
    }

    updateZoomExtentsVisibility() {
        if (!this.zoomExtentsBtn) return;
        this.updateZoomExtentsPosition();
        
        // Never show on the loading screen or while loading data
        if (this._isLoadingActive || (this.loading && this.loading.style.display !== 'none')) {
            this.zoomExtentsBtn.classList.remove('visible');
            return;
        }

        // Must have active nodes and transform
        if (!this.nodes || this.nodes.length === 0 || !this.transform) {
            this.zoomExtentsBtn.classList.remove('visible');
            return;
        }

        // In search constellation mode, camera dynamically auto-fits unless user has interacted
        if (this.isSearchMode && !this.userInteracted) {
            this.zoomExtentsBtn.classList.remove('visible');
            return;
        }

        const target = this.getZoomExtentsTransform();
        if (!target) {
            this.zoomExtentsBtn.classList.remove('visible');
            return;
        }

        const scaleRatio = this.transform.k / target.k;
        const panDist = Math.hypot(this.transform.x - target.x, this.transform.y - target.y);
        
        // Scale difference tolerance: outside 5.5% of target scale
        const isScaleDifferent = (scaleRatio < 0.945 || scaleRatio > 1.055);
        // Pan difference tolerance: greater than 24px or 3.5% of canvas width
        const panThreshold = Math.max(24, (this.logicalWidth || 800) * 0.035);
        const isPanDifferent = panDist > panThreshold;

        const isNotProperlyZoomed = isScaleDifferent || isPanDifferent;
        this.zoomExtentsBtn.classList.toggle('visible', isNotProperlyZoomed);
    }

    zoomExtents(duration = 600) {
        if (this.radialMenuNode) this.hideRadialMenu();
        const targetTransform = this.getZoomExtentsTransform();
        if (!targetTransform || !this.zoom || !this.canvas) return;
        this.userInteracted = false;
        d3.select(this.canvas)
            .transition()
            .duration(duration)
            .ease(d3.easeCubicOut)
            .call(this.zoom.transform, targetTransform)
            .on("end", () => {
                this.updateZoomExtentsVisibility();
            });
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
        let scale = 0.90 / Math.max(dx / cw, dy / ch);
        
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
        this._nodesBounds = { minX, maxX, minY, maxY };
        this.userInteracted = false;
        this.draw();
        this.updateZoomExtentsVisibility();
    }

    resetToWordView() {
        this.closeSearchRecovery();
        this.closeActiveInfoWindows();
        this.hideLegendWindow();
        if (this.drawer && this.drawer.classList.contains('open')) {
            this.closeDrawer();
        }
        if (this.viewMode !== 'words') {
            this.setViewMode('words', true);
        } else {
            this.clearAllKeywords();
        }
    }

    resetCurrentView() {
        this.closeSearchRecovery();
        this.closeActiveInfoWindows();
        if (this.viewMode === 'books') {
            this.resetBooksView();
        } else if (this.viewMode === 'chapters') {
            this.resetChaptersView();
        } else if (this.viewMode === 'verses') {
            this.resetVersesView();
        } else {
            this.clearAllKeywords();
        }
    }

    setViewMode(mode, forceReset = false) {
        this.closeSearchRecovery();
        if (this.viewMode === mode && !forceReset) {
            if (mode === 'books') {
                if (this.isSearchMode || (this.searchedBooks && this.searchedBooks.length > 0) || this.selectedBook) {
                    this.resetBooksView();
                }
            } else if (mode === 'chapters') {
                if (this.isSearchMode || (this.searchedChapters && this.searchedChapters.length > 0) || this.selectedChapter) {
                    this.resetChaptersView();
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

        // Keep view mode pills in sync with viewMode
        const wordsBtn = this.querySelector('#view-mode-words') || document.getElementById('view-mode-words');
        const booksBtn = this.querySelector('#view-mode-books') || document.getElementById('view-mode-books');
        const chaptersBtn = this.querySelector('#view-mode-chapters') || document.getElementById('view-mode-chapters');
        const versesBtn = this.querySelector('#view-mode-verses') || document.getElementById('view-mode-verses');
        if (wordsBtn) wordsBtn.classList.toggle('active', mode === 'words');
        if (booksBtn) booksBtn.classList.toggle('active', mode === 'books');
        if (chaptersBtn) chaptersBtn.classList.toggle('active', mode === 'chapters');
        if (versesBtn) versesBtn.classList.toggle('active', mode === 'verses');

        this.hideRadialMenu();
        this.hideVersesPanel();
        this.hideCanonUsageModal();
        this.hoveredNode = null;
        this.selectedBook = null;
        this.selectedVerse = null;
        this.selectedChapter = null;
        this.hideWordInspector();
        this.hideBookCard();
        this.hideVerseCard();
        this.hideChapterCard();
        this.hideLegendWindow();
        if (this.reopenBtn) this.reopenBtn.style.display = 'none';
        if (this.verseReopenBtn) this.verseReopenBtn.style.display = 'none';
        if (this.chapterReopenBtn) this.chapterReopenBtn.style.display = 'none';
        if (this.wordReopenBtn) this.wordReopenBtn.style.display = 'none';
        if (this.verseModeSection) {
            this.verseModeSection.style.display = (mode === 'verses') ? 'block' : 'none';
            if (mode === 'verses') {
                const verseModeBtns = this.querySelectorAll('#bwm-verse-mode-filter button[data-submode]');
                verseModeBtns.forEach(btn => {
                    btn.classList.toggle('active', btn.getAttribute('data-submode') === this.verseViewMode);
                });
            }
        }
        if (this.chapterModeSection) {
            this.chapterModeSection.style.display = (mode === 'chapters') ? 'block' : 'none';
            if (mode === 'chapters') {
                const chapModeBtns = this.querySelectorAll('#bwm-chapter-mode-filter button[data-chapmode]');
                chapModeBtns.forEach(btn => {
                    btn.classList.toggle('active', btn.getAttribute('data-chapmode') === this.chapterConnMode);
                });
            }
        }
        
        let activeHeading = this.querySelector('#bwm-active-heading');
        if (activeHeading) activeHeading.textContent = (mode === 'verses') ? 'Active Verses' : ((mode === 'chapters') ? 'Active Chapters' : ((mode === 'books') ? 'Active Books' : 'Active Words'));
        this.updateNeighborSlider();

        if (this.searchInput) {
            this.searchInput.value = '';
            this.searchInput.placeholder = (mode === 'verses')
                ? 'Search verses (e.g. John 1:1, Gen 1:1, Rom 8:28)...'
                : ((mode === 'chapters')
                    ? 'Search chapters (e.g. Genesis 1, John 3, Psalm 23)...'
                    : ((mode === 'books') 
                        ? 'Search for books (e.g. James Proverbs, Genesis Exodus)...' 
                        : 'Search for words (e.g. Father Son Spirit)'));
        }
        this.updateClearBtnVisibility();

        if (mode === 'verses') {
            this.searchedWords = [];
            this.drawerWords = [];
            this.searchedBooks = [];
            this.drawerBooks = [];
            this.searchedVerses = [];
            this.drawerVerses = [];
            this.searchedChapters = [];
            this.drawerChapters = [];
            this.isSearchMode = false;
            this.updateUrl({ view: 'verses' });
            this.renderActiveWords();

            if (!this.versemapLookup) {
                this.showLoading('Loading Biblical Verses & Cross-References...', 'verses');
                if (this.versemapPromise) {
                    this.versemapPromise.then(data => {
                        if (data && (data.verses || Array.isArray(data))) {
                            let vList = data.verses || data;
                            this.versemapData = data.verses ? data : { count: vList.length, verses: vList };
                            this.versemapLookup = new Map(vList.map(v => [v.id, v]));
                        }
                        if (this.viewMode === 'verses') {
                            this.hideLoading();
                            if (this.searchedVerses && this.searchedVerses.length > 0) {
                                this.searchVerses(true);
                            } else {
                                this.buildVersesGraph();
                            }
                        }
                    }).catch(() => {
                        if (this.viewMode === 'verses') this.hideLoading();
                    });
                }
            } else {
                this.hideLoading();
                this.buildVersesGraph();
            }
        } else if (mode === 'chapters') {
            this.searchedWords = [];
            this.drawerWords = [];
            this.searchedBooks = [];
            this.drawerBooks = [];
            this.searchedVerses = [];
            this.drawerVerses = [];
            this.searchedChapters = [];
            this.drawerChapters = [];
            this.isSearchMode = false;
            this.updateUrl({ view: 'chapters', ccm: this.chapterConnMode });
            this.renderActiveWords();

            if (!this.chaptermapLookup || this.chaptermapLookup.size === 0) {
                this.showLoading('Loading Biblical Chapters & Connections...', 'chapters');
                if (this.chaptersPromise) {
                    this.chaptersPromise.then(data => {
                        if (data && (data.chapters || Array.isArray(data))) {
                            let chList = data.chapters || data;
                            this.chaptersData = data.chapters ? data : { count: chList.length, chapters: chList };
                            this.chaptermapLookup = new Map(chList.map(c => [c.id, c]));
                        }
                        if (this.viewMode === 'chapters') {
                            this.hideLoading();
                            if (this.isSearchMode && this.searchedChapters && this.searchedChapters.length > 0) {
                                let records = this.searchedChapters.map(ref => this.chaptermapLookup ? this.chaptermapLookup.get(ref) : null).filter(Boolean);
                                this.buildChaptersConstellation(records);
                            } else {
                                this.buildChaptersGraph();
                            }
                        }
                    }).catch(() => {
                        if (this.viewMode === 'chapters') this.hideLoading();
                    });
                }
            } else {
                this.hideLoading();
                this.buildChaptersGraph();
            }
        } else if (mode === 'books') {
            this.searchedWords = [];
            this.drawerWords = [];
            this.searchedBooks = [];
            this.drawerBooks = [];
            this.searchedVerses = [];
            this.drawerVerses = [];
            this.searchedChapters = [];
            this.drawerChapters = [];
            this.isSearchMode = false;
            this.updateUrl({ view: 'books' });
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
            this.searchedChapters = [];
            this.drawerChapters = [];
            this.isSearchMode = false;
            this.updateUrl({});
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
        let scale = 0.90 / Math.max(dx / cw, dy / ch);

        this.transform = d3.zoomIdentity.translate(cw / 2 - scale * cx, ch / 2 - scale * cy).scale(scale);
        d3.select(this.canvas).call(this.zoom.transform, this.transform);

        this._nodesBounds = { minX, maxX, minY, maxY };
        this.userInteracted = false;
        this.draw();
        this.updateZoomExtentsVisibility();
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

    async searchBooks(useExplicitCodes = false) {
        if (!this.booksData || !this.booksData.books) return;
        this.hoveredNode = null;
        let foundBooks = [];

        if (!useExplicitCodes) {
            let query = this.searchInput.value.trim();
            if (!query) {
                this.clearAllKeywords();
                return;
            }
            let detectedVerse = detectVerseReference(query);
            if (detectedVerse) {
                this.searchedBooks = [];
                this.drawerBooks = [];
                this.selectedBook = null;
                this.isSearchMode = false;
                this.updateClearBtnVisibility();
                this.updateUrl({ view: 'books', books: undefined });
                this.renderActiveWords();
                this.showSearchRecovery(query, 'books');
                this.buildBooksGraph();
                return;
            }
            foundBooks = this.parseBookQuery(query);
            if (foundBooks.length === 0) {
                this.updateClearBtnVisibility();
                this.showSearchRecovery(query, 'books');
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

        if (foundBooks.length === 0) {
            this.searchedBooks = [];
            this.drawerBooks = [];
            this.selectedBook = null;
            this.isSearchMode = false;
            this.updateClearBtnVisibility();
            this.updateUrl({ view: 'books', books: undefined });
            this.renderActiveWords();
            this.showSearchRecovery(this.searchInput ? this.searchInput.value : '', 'books');
            this.buildBooksGraph();
            return;
        }

        this.closeSearchRecovery();
        this.searchedBooks = foundBooks.map(b => b.code);
        this.drawerBooks = [...this.searchedBooks];
        this.selectedBook = foundBooks[0];
        this.isSearchMode = true;
        this.userInteracted = false;
        this._nodesBounds = null;

        this.searchInput.value = foundBooks.map(b => b.name).join(", ");
        this.updateClearBtnVisibility();

        if (this.searchedBooks && this.searchedBooks.length > 0) {
            this.updateUrl({ view: 'books', books: this.searchedBooks.join(',') });
        }

        if (!this.data2d && this.data2dPromise) {
            this.setSearchSpinner(true);
            try {
                const d2d = await this.data2dPromise;
                if (d2d) this.data2d = d2d;
            } catch (e) {
                console.error('Failed loading word data for books constellation:', e);
            }
            this.setSearchSpinner(false);
        }
        if ((!this.verses || !this.wordToVerses) && this.versesPromise) {
            try {
                const vData = await this.versesPromise;
                if (vData && vData.verses) {
                    this.verses = vData.verses;
                    this.wordToVerses = vData.words;
                }
            } catch (e) {
                console.error('Failed loading verses data for books constellation:', e);
            }
        }

        this.buildMultiBookConstellation(foundBooks);
    }

    buildMultiBookConstellation(foundBooks) {
        if (this.simulation) this.simulation.stop();
        if (this.spawnInterval) {
            clearInterval(this.spawnInterval);
            this.spawnInterval = null;
        }

        let bookNodes = foundBooks.map((b, idx) => {
            let node = {
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
                x: 0,
                y: 0
            };
            if (foundBooks.length === 1) {
                node.fx = 0;
                node.fy = 0;
            } else {
                const angle = (idx / foundBooks.length) * Math.PI * 2;
                const r = 90;
                node.x = Math.cos(angle) * r;
                node.y = Math.sin(angle) * r;
            }
            return node;
        });

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
                b.closest_words = similarities.slice(0, Math.max(limit, 100));
                topWords = b.closest_words.slice(0, limit);
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

        this.transform = d3.zoomIdentity.translate(this.getInitialCameraCenterX(), ch / 2).scale(1);
        d3.select(this.canvas).call(this.zoom.transform, this.transform);

        const LCG = d3.randomLcg(42);
        this.simulation = d3.forceSimulation(this.nodes)
            .randomSource(LCG)
            .velocityDecay(0.45)
            .force("link", d3.forceLink(this.links).id(d => d.id).distance(d => {
                if (d.type === 'book-book') return Math.max(120, (1 - d.sim) * 500);
                if (d.isDirect === false || d.type === 'indirect') return 80 + (1 - (d.sim || 0.8)) * 200;
                return Math.max(35, (1 - (d.sim || 0.8)) * 180);
            }).strength(d => d.type === 'book-book' ? 1.5 : (d.isDirect ? 0.8 : 0.4)))
            .force("charge", d3.forceManyBody().strength(d => d.isBook ? -380 : -60))
            .force("collide", d3.forceCollide().radius(d => d.isBook ? 36 : 14))
            .force("center", d3.forceCenter(0, 0).strength(0.04))
            .on("tick", () => {
                this.updateDynamicZoom();
                this.draw();
            });

        if (bookNodes.length > 1) {
            for (let i = 0; i < 40; i++) {
                this.simulation.tick();
            }
            bookNodes.forEach(b => {
                b.fx = b.x;
                b.fy = b.y;
            });
        }

        this.pendingNodes = [];
        this.enqueueNodes(wordNodes);

        if (window.innerWidth <= 768) {
            this.selectedBook = this.selectedBook || foundBooks[0];
            this.hideBookCard();
        } else {
            this.showBookCard(this.selectedBook || foundBooks[0], foundBooks);
        }
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
        this.syncBookToggles(bookCode, true);
        this.searchBooks(true);
    }

    removeBook(bookCode) {
        if (!this.searchedBooks) return;
        this.searchedBooks = this.searchedBooks.filter(c => c !== bookCode);
        this.syncBookToggles(bookCode, false);
        if (this.searchedBooks.length === 0) {
            this.clearAllKeywords();
        } else {
            this.searchBooks(true);
        }
    }

    resetBooksView() {
        this.closeSearchRecovery();
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
        this.querySelectorAll('.bwm-pill-toggle[data-toggle-book-code], #bwm-book-action-toggle').forEach(t => {
            t.classList.remove('is-active');
            t.setAttribute('aria-checked', 'false');
            t.title = 'Add to map';
        });
        this.updateClearBtnVisibility();
        this.renderActiveWords();
        this.hideRadialMenu();
        this.hideVersesPanel();
        this.hideCanonUsageModal();
        this.hideBookCard();
        this.hideWordInspector();
        this.hideVerseCard();
        this.hideChapterCard();
        if (this.isStudyPanelPinned) this.unpinStudyPanel();
        this.inspectorNode = null;
        this.hoveredNode = null;
        if (this.reopenBtn) {
            this.reopenBtn.style.display = 'none';
        }
        if (this.verseReopenBtn) {
            this.verseReopenBtn.style.display = 'none';
        }
        this.updateUrl({ view: 'books' });
        this.buildBooksGraph();
    }

    showLegendWindow() {
        if (!this.legendOverlay) return;
        this.closeSearchRecovery();
        this.closeActiveInfoWindows();
        this.hideRadialMenu();
        this.closeDrawer();
        this.legendOverlay.classList.add('visible');
    }

    hideLegendWindow() {
        if (!this.legendOverlay) return;
        this.legendOverlay.classList.remove('visible');
    }

    openDrawer() {
        if (!this.drawer) return;
        this.closeSearchRecovery();
        if (window.innerWidth <= 768) {
            this.closeActiveInfoWindows();
            this.hideRadialMenu();
        }
        this.drawer.style.transform = '';
        this.drawer.style.transition = '';
        this.drawer.style.opacity = '';
        this.drawer.classList.add('open');
        if (this.isOptionsPanelPinned) {
            this.drawer.classList.add('pinned');
        }
        if (this.drawerToggle) this.drawerToggle.classList.add('active');
        this.updatePinButtonStates();
    }

    closeDrawer(force = false) {
        if (!this.drawer) return;
        if (this.isOptionsPanelPinned && !force) return;
        this.drawer.classList.remove('open', 'pinned');
        this.drawer.style.transform = '';
        this.drawer.style.transition = '';
        this.drawer.style.opacity = '';
        if (this.drawerToggle) this.drawerToggle.classList.remove('active');
    }

    toggleDrawer() {
        if (!this.drawer) return;
        this.closeSearchRecovery();
        if (this.drawer.classList.contains('open')) {
            if (this.isOptionsPanelPinned) {
                this.unpinOptionsPanel();
            }
            this.closeDrawer(true);
        } else {
            this.openDrawer();
        }
    }

    closeActiveInfoWindows(force = false) {
        let closedAny = false;
        if (this.legendOverlay && this.legendOverlay.classList.contains('visible')) {
            this.hideLegendWindow();
            closedAny = true;
        }
        if (this.isStudyPanelPinned && !force) {
            return closedAny;
        }
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
        if (this.chapterCard && this.chapterCard.classList.contains('visible')) {
            this.hideChapterCard();
            closedAny = true;
        }
        return closedAny;
    }

    renderPinButton(panelType = 'study') {
        const isPinned = panelType === 'options' ? this.isOptionsPanelPinned : this.isStudyPanelPinned;
        const title = isPinned ? 'Unpin panel' : 'Pin panel (keep open)';
        const activeCls = isPinned ? 'pinned is-active' : '';
        const ariaPressed = isPinned ? 'true' : 'false';
        const idAttr = panelType === 'options' ? 'id="bwm-drawer-pin-btn"' : '';
        return `
            <button type="button" class="bwm-panel-pin-btn ${activeCls}" ${idAttr} data-pin-panel="${panelType}" title="${title}" aria-pressed="${ariaPressed}" aria-label="${title}">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="12" y1="17" x2="12" y2="22"></line>
                    <path d="M5 17h14l-2-7V4h1V2H6v2h1v6l-2 7z"></path>
                </svg>
            </button>
        `;
    }

    canPinOptions() {
        return window.innerWidth >= 1024 && (!this.isStudyPanelPinned || window.innerWidth >= 1300);
    }

    canPinStudy() {
        return window.innerWidth >= 1024 && (!this.isOptionsPanelPinned || window.innerWidth >= 1300);
    }

    togglePinOptionsPanel() {
        if (!this.canPinOptions() && !this.isOptionsPanelPinned) {
            if (this.isStudyPanelPinned && window.innerWidth >= 1024) {
                this.unpinStudyPanel();
            } else {
                return;
            }
        }
        if (this.isOptionsPanelPinned) {
            this.unpinOptionsPanel();
        } else {
            this.pinOptionsPanel();
        }
    }

    pinOptionsPanel() {
        if (window.innerWidth < 1024) return;
        if (this.isStudyPanelPinned && window.innerWidth < 1300) {
            this.unpinStudyPanel();
        }
        this.isOptionsPanelPinned = true;
        this.openDrawer();
        if (this.drawer) {
            this.drawer.classList.add('pinned');
        }
        this.updatePinButtonStates();
        this.zoomExtents(400);
    }

    unpinOptionsPanel() {
        this.isOptionsPanelPinned = false;
        if (this.drawer) {
            this.drawer.classList.remove('pinned');
        }
        this.updatePinButtonStates();
        this.zoomExtents(400);
    }

    togglePinStudyPanel() {
        if (!this.canPinStudy() && !this.isStudyPanelPinned) {
            if (this.isOptionsPanelPinned && window.innerWidth >= 1024) {
                this.unpinOptionsPanel();
            } else {
                return;
            }
        }
        if (this.isStudyPanelPinned) {
            this.unpinStudyPanel();
        } else {
            this.pinStudyPanel();
        }
    }

    pinStudyPanel() {
        if (window.innerWidth < 1024) return;
        if (this.isOptionsPanelPinned && window.innerWidth < 1300) {
            this.unpinOptionsPanel();
        }
        this.isStudyPanelPinned = true;
        const activeCard = this.getActiveStudyCard();
        if (activeCard) {
            activeCard.classList.add('pinned');
            activeCard.classList.add('visible');
        }
        this.updatePinButtonStates();
        this.updateZoomExtentsPosition();
        this.zoomExtents(400);
    }

    unpinStudyPanel() {
        this.isStudyPanelPinned = false;
        [this.wordCard, this.verseCard, this.chapterCard, this.bookCard].forEach(card => {
            if (card) card.classList.remove('pinned');
        });
        this.updatePinButtonStates();
        this.updateZoomExtentsPosition();
        this.zoomExtents(400);
    }

    updatePinButtonStates() {
        const canPinOpts = this.canPinOptions();
        const canPinStd = this.canPinStudy();

        const drawerPinBtn = this.querySelector('#bwm-drawer-pin-btn');
        if (drawerPinBtn) {
            drawerPinBtn.classList.toggle('pinned', this.isOptionsPanelPinned);
            drawerPinBtn.classList.toggle('is-active', this.isOptionsPanelPinned);
            drawerPinBtn.setAttribute('aria-pressed', this.isOptionsPanelPinned ? 'true' : 'false');
            drawerPinBtn.title = this.isOptionsPanelPinned ? 'Unpin Options panel' : 'Pin Options panel';
            drawerPinBtn.style.display = (canPinOpts || this.isOptionsPanelPinned) ? '' : 'none';
        }

        const studyPinBtns = this.querySelectorAll('.bwm-panel-pin-btn[data-pin-panel="study"]');
        studyPinBtns.forEach(btn => {
            btn.classList.toggle('pinned', this.isStudyPanelPinned);
            btn.classList.toggle('is-active', this.isStudyPanelPinned);
            btn.setAttribute('aria-pressed', this.isStudyPanelPinned ? 'true' : 'false');
            btn.title = this.isStudyPanelPinned ? 'Unpin Study panel' : 'Pin Study panel';
            btn.style.display = (canPinStd || this.isStudyPanelPinned) ? '' : 'none';
        });
    }

    getActiveStudyCard() {
        if (this.viewMode === 'verses') return this.verseCard;
        if (this.viewMode === 'chapters') return this.chapterCard;
        if (this.viewMode === 'books') return this.bookCard;
        return this.wordCard;
    }

    getInitialCameraCenterX() {
        let cw = this.logicalWidth || 800;
        const isMobile = (window.innerWidth <= 768 || cw <= 768);
        let leftMargin = (this.isOptionsPanelPinned && !isMobile) ? 300 : 0;
        let rightMargin = (!isMobile && (this.isStudyPanelPinned || this.isStudyPanelVisible())) ? 440 : 0;
        let effectiveCw = Math.max(cw - leftMargin - rightMargin, 300);
        return leftMargin + effectiveCw / 2;
    }

    isStudyPanelVisible() {
        const cards = [this.wordCard, this.verseCard, this.chapterCard, this.bookCard];
        return cards.some(c => c && c.classList.contains('visible'));
    }

    updateZoomExtentsPosition() {
        if (!this.zoomExtentsBtn) return;
        const isDesktop = window.innerWidth > 768;
        const isStudyOpen = isDesktop && (this.isStudyPanelPinned || this.isStudyPanelVisible());
        this.zoomExtentsBtn.classList.toggle('study-open', isStudyOpen);
    }

    onStudyPanelVisibilityChange(opened = true) {
        if (this.isStudyPanelVisible()) {
            this.updateZoomExtentsPosition();
        }
        if (this._studyVisibilityTimeout) {
            clearTimeout(this._studyVisibilityTimeout);
        }
        this._studyVisibilityTimeout = setTimeout(() => {
            this._studyVisibilityTimeout = null;
            this.updateZoomExtentsPosition();
            this.updateZoomExtentsVisibility();
            const isDesktop = window.innerWidth > 768;
            if (isDesktop && !this.isStudyPanelPinned) {
                if (!this.simulation || this.simulation.alpha() < 0.05) {
                    this.zoomExtents(400);
                }
            }
        }, 20);
    }

    buildWordPattern(kw) {
        kw = (kw || '').trim().toLowerCase();
        if (!kw) return null;
        kw = kw.replace(/_(?:noun|verb|adj|adv|propn|pron|num|intj)$/i, '');
        
        const irregulars = {
            'mercy': 'merc(?:y|ies|iful(?:ly)?)',
            'holy': 'hol(?:y|iness|ier|iest)',
            'glory': 'glor(?:y|ies|ious(?:ly)?|ified|ify|ifying)',
            'justify': 'justif(?:y|ies|ied|ying|ification)',
            'righteous': 'righteous(?:ness|ly)?',
            'sin': 'sin(?:s|ned|ning|ner|ners|ful(?:ly|ness)?)',
            'die': 'd(?:ie|ies|ied|ying)',
            'live': 'liv(?:e|es|ed|ing)|life|lives',
            'see': 's(?:ee|ees|aw|een|eeing)|sight',
            'know': 'kn(?:ow|ows|ew|own|owing)|knowledge',
            'speak': 'sp(?:eak|eaks|oke|oken|eaking)|speech',
            'give': 'g(?:ive|ives|ave|iven|iving)',
        };
        
        if (irregulars[kw]) {
            return irregulars[kw];
        }
        
        let root = kw;
        if (root.endsWith('e') && root.length > 3) {
            let stem = root.slice(0, -1);
            return stem + '(?:e|es|ed|ing|er|ers|est|ful|able|ous|y)?';
        } else if (root.endsWith('y') && root.length > 3) {
            let stem = root.slice(0, -1);
            return '(?:' + root + '|' + stem + '(?:ies|ied|ying|iful|iness)?)';
        } else {
            return root + '(?:s|es|ed|ing|er|ers|est|ful(?:ly)?|ness|less|ly)?';
        }
    }

    highlightKeywordsInVerse(text, keywords) {
        if (!text) return '';
        if (!keywords || keywords.length === 0) return escapeHtml(text);
        const patterns = [];
        for (const kw of keywords) {
            const pat = this.buildWordPattern(kw);
            if (pat && !patterns.includes(pat)) patterns.push(pat);
        }
        if (patterns.length === 0) return escapeHtml(text);
        
        const safeHtml = escapeHtml(text);
        const regex = new RegExp(`\\b(${patterns.join('|')})(?:['’]s)?\\b`, 'gi');
        return safeHtml.replace(regex, '<mark class="bwm-verse-kw-highlight">$1</mark>');
    }

    getSmartSnippet(text, keywords, maxLen = 110) {
        if (!text || text.length <= maxLen) return text;
        if (!keywords || keywords.length === 0) return text.slice(0, maxLen - 3) + '...';
        
        const patterns = [];
        for (const kw of keywords) {
            const pat = this.buildWordPattern(kw);
            if (pat && !patterns.includes(pat)) patterns.push(pat);
        }
        if (patterns.length === 0) return text.slice(0, maxLen - 3) + '...';
        
        const regex = new RegExp(`\\b(?:${patterns.join('|')})(?:['’]s)?\\b`, 'i');
        const match = regex.exec(text);
        if (!match || match.index < 70) {
            return text.slice(0, maxLen - 3) + '...';
        }
        
        const matchIdx = match.index;
        let start = Math.max(0, matchIdx - 35);
        const spaceBefore = text.indexOf(' ', start);
        if (spaceBefore !== -1 && spaceBefore < matchIdx) {
            start = spaceBefore + 1;
        }
        let end = Math.min(text.length, start + maxLen);
        const spaceAfter = text.lastIndexOf(' ', end);
        if (spaceAfter > matchIdx + match[0].length) {
            end = spaceAfter;
        }
        let snippet = text.slice(start, end).trim();
        if (start > 0) snippet = '...' + snippet;
        if (end < text.length) snippet = snippet + '...';
        return snippet;
    }

    stripGreekAccents(s) {
        return (s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    }

    getGreekStem(lemma) {
        let s = this.stripGreekAccents(lemma).replace(/[^α-ω]/g, '');
        if (s.length <= 3) return s;
        const endings = [
            'ματος', 'ματων', 'μασιν', 'μασι',
            'εως', 'εων', 'εσιν', 'οις', 'ους', 'αις', 'οιν', 'αιν',
            'ουσι', 'ουσιν', 'ομεν', 'ετε', 'οντα', 'οντες', 'οντων', 'ουσαι',
            'ισσα', 'ιδος', 'ιδων', 'ισιν',
            'ος', 'ον', 'ου', 'ῳ', 'οι', 'ων', 'ας', 'ης', 'ην', 'αν', 'ις', 'ιν', 'ει', 'ες',
            'υς', 'υν', 'εα', 'υι',
            'ω', 'ας', 'α'
        ];
        for (const end of endings) {
            if (s.endsWith(end) && s.length - end.length >= 2) {
                return s.slice(0, -end.length);
            }
        }
        return s.length > 4 ? s.slice(0, -1) : s;
    }

    getLatinStem(lemma) {
        let s = (lemma || '').trim().toLowerCase().replace(/[^a-z]/g, '');
        if (s.length <= 3) return s;
        const endings = [
            'orum', 'arum', 'ebam', 'ebat', 'ebant', 'erunt', 'isset', 'issent',
            'ibus', 'ium', 'iis', 'iae', 'iam', 'ias',
            'us', 'um', 'is', 'em', 'es', 'ei', 'ui', 'am', 'as', 'os', 'ae', 'unt',
            'a', 'e', 'i', 'o', 'u'
        ];
        for (const end of endings) {
            if (s.endsWith(end) && s.length - end.length >= 3) {
                return s.slice(0, -end.length);
            }
        }
        return s.length > 4 ? s.slice(0, -1) : s;
    }

    highlightOriginalKeywordsInVerse(text, origLemmas) {
        if (!text) return '';
        if (!origLemmas || origLemmas.length === 0) return escapeHtml(text);
        
        const targets = [];
        for (const raw of origLemmas) {
            if (!raw) continue;
            const isGreek = /[\u0370-\u03ff\u1f00-\u1fff]/.test(raw);
            if (isGreek) {
                const norm = this.stripGreekAccents(raw).replace(/[^α-ω]/g, '');
                const stem = this.getGreekStem(norm);
                if (norm) targets.push({ type: 'greek', norm, stem });
            } else {
                const norm = raw.toLowerCase().replace(/[^a-z]/g, '');
                const stem = this.getLatinStem(norm);
                if (norm) targets.push({ type: 'latin', norm, stem });
            }
        }
        if (targets.length === 0) return escapeHtml(text);

        const tokens = text.split(/([\s.,;:··!?'’"()«»\[\]\/\-]+)/);
        return tokens.map(token => {
            const isGreekTok = /[\u0370-\u03ff\u1f00-\u1fff]/.test(token);
            let matched = false;
            if (isGreekTok) {
                const nTok = this.stripGreekAccents(token).replace(/[^α-ω]/g, '');
                if (nTok.length >= 2) {
                    matched = targets.some(t => t.type === 'greek' && (nTok === t.norm || (t.stem.length >= 2 && nTok.startsWith(t.stem))));
                }
            } else {
                const nTok = token.toLowerCase().replace(/[^a-z]/g, '');
                if (nTok.length >= 2) {
                    matched = targets.some(t => t.type === 'latin' && (nTok === t.norm || (t.stem.length >= 3 && nTok.startsWith(t.stem))));
                }
            }
            return matched 
                ? `<mark class="bwm-verse-kw-highlight">${escapeHtml(token)}</mark>`
                : escapeHtml(token);
        }).join('');
    }

    updateBackdrop() {
        // No-op: map blur and fading removed on both desktop and mobile
    }

    showBookCard(book, allActiveBooks = null) {
        if (!this.bookCard || !book) return;
        if (window.innerWidth <= 768) {
            this.closeDrawer();
        }
        this.hideWordInspector();
        this.hideVerseCard();
        this.hideChapterCard();
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
                    ${this.renderPillToggle({
                        isActive: isAlreadyActive,
                        dataAttrs: {
                            'toggle-book-code': nb.code
                        },
                        title: isAlreadyActive ? 'Remove from map' : 'Add to map'
                    })}
                </div>
            `;
        }).join('');

        let topWordsHtml = (book.top_words || []).slice(0, 12).map(tw => {
            let pos = tw.pos || (tw.id ? this.parseWordId(tw.id).pos : '') || '';
            let posColor = '#94a3b8';
            if (pos === 'PROPN') posColor = '#4ade80';
            else if (pos === 'NOUN') posColor = '#60a5fa';
            else if (pos === 'VERB') posColor = '#f472b6';
            else if (pos === 'ADJ' || pos === 'ADV') posColor = '#fbbf24';
            let titleStr = tw.score ? `TF-IDF Score: ${tw.score}` : (tw.count ? `Occurrences: ${tw.count}` : '');
            let posLabel = pos ? ` <span style="opacity:0.5;font-size:0.8em;">(${pos.toLowerCase()})</span>` : '';
            return `<span class="bwm-book-chip" style="border-left: 3px solid ${posColor};" title="${titleStr}"><b>${this.formatWord(tw.w, pos)}</b>${posLabel}</span>`;
        }).join('');

        let isBookActive = Boolean(this.searchedBooks && this.searchedBooks.includes(book.code));
        let bookActionHtml = this.renderPillToggle({
            isActive: isBookActive,
            id: 'bwm-book-action-toggle',
            dataAttrs: {
                'toggle-book-code': book.code
            },
            title: isBookActive ? 'Remove book from map' : 'Add book to map'
        });

        this.bookCard.innerHTML = `
            <div class="bwm-sheet-handle"></div>
            ${tabsHtml}
            <div class="bwm-window-header">
                <div class="bwm-window-header-top">
                    <div>
                        <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px; flex-wrap: wrap;">
                            <span class="bwm-window-badge" style="background: ${genreColor};">${book.genre}</span>
                            <span class="bwm-window-subtitle-inline">${book.testament === 'OT' ? 'Old Testament' : 'New Testament'}</span>
                        </div>
                        <h3 class="bwm-window-title">${book.name}</h3>
                        <div class="bwm-window-subtitle">${book.verses.toLocaleString()} verses &bull; ${book.total_words.toLocaleString()} words</div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        ${bookActionHtml}
                        ${this.renderPinButton('study')}
                        <button type="button" class="bwm-window-close" id="bwm-book-card-close" title="Dismiss">&times;</button>
                    </div>
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
        if (this.isStudyPanelPinned) {
            this.bookCard.classList.add('pinned');
        }
        this.updateBackdrop();
        this.onStudyPanelVisibilityChange(true);

        let closeBtn = this.bookCard.querySelector('#bwm-book-card-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.unpinStudyPanel();
                this.hideBookCard();
            });
        }

        let dismissBtn = this.bookCard.querySelector('#bwm-btn-dismiss-card');
        if (dismissBtn) {
            dismissBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.unpinStudyPanel();
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
        let toggleBtns = this.bookCard.querySelectorAll('.bwm-pill-toggle[data-toggle-book-code]');
        toggleBtns.forEach(toggle => {
            this.setupPillToggleListener(toggle, (nextActive) => {
                let code = toggle.getAttribute('data-toggle-book-code');
                if (nextActive) {
                    this.addBook(code);
                } else {
                    this.removeBook(code);
                }
                this.syncBookToggles(code, nextActive);
            });
        });
    }

    hideBookCard() {
        if (this.bookCard) {
            this.bookCard.classList.remove('visible', 'pinned');
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
        this.onStudyPanelVisibilityChange(false);
    }

    updateNeighborSlider() {
        if (!this.neighborSlider) return;
        const heading = this.querySelector('#bwm-neighbor-heading');
        const hint = this.querySelector('#bwm-neighbor-hint');

        if (this.viewMode === 'verses') {
            if (this.verseViewMode === 'words') {
                if (heading) heading.textContent = 'Word Connections per Verse';
                if (hint) hint.textContent = 'Controls how many constituent content words appear around each verse.';
                this.neighborSlider.min = '1';
                this.neighborSlider.max = '12';
                this.neighborSlider.step = '1';
                const val = this.verseWordsPerVerse || 6;
                this.neighborSlider.value = val;
                if (this.neighborValue) this.neighborValue.textContent = val;
            } else {
                if (heading) heading.textContent = 'Verse Connections per Verse';
                if (hint) hint.textContent = 'Controls how many cross-reference verses link to each verse.';
                this.neighborSlider.min = '1';
                this.neighborSlider.max = '32';
                this.neighborSlider.step = '1';
                const val = this.verseRefsPerVerse || 16;
                this.neighborSlider.value = val;
                if (this.neighborValue) this.neighborValue.textContent = val;
            }
        } else if (this.viewMode === 'chapters') {
            if (this.chapterConnMode === 'words') {
                if (heading) heading.textContent = 'Word Connections per Chapter';
                if (hint) hint.textContent = 'Controls how many constituent content words appear around each chapter.';
                this.neighborSlider.min = '20';
                this.neighborSlider.max = '60';
                this.neighborSlider.step = '5';
                const val = this.chapterWordsCount || 40;
                this.neighborSlider.value = val;
                if (this.neighborValue) this.neighborValue.textContent = val;
            } else if (this.chapterConnMode === 'verses') {
                if (heading) heading.textContent = 'Verse Cross-References per Chapter';
                if (hint) hint.textContent = 'Controls how many canon-wide cross-reference verses appear around each chapter.';
                this.neighborSlider.min = '8';
                this.neighborSlider.max = '32';
                this.neighborSlider.step = '2';
                const val = this.chapterVersesCount || 16;
                this.neighborSlider.value = val;
                if (this.neighborValue) this.neighborValue.textContent = val;
            } else {
                if (heading) heading.textContent = 'Chapter Connections per Chapter';
                if (hint) hint.textContent = 'Controls how many related chapters link to each chapter.';
                this.neighborSlider.min = '8';
                this.neighborSlider.max = '32';
                this.neighborSlider.step = '2';
                const val = this.chapterChaptersCount || 16;
                this.neighborSlider.value = val;
                if (this.neighborValue) this.neighborValue.textContent = val;
            }
        } else if (this.viewMode === 'books') {
            if (heading) heading.textContent = 'Relationships per Book';
            if (hint) hint.textContent = 'Controls how many related words appear around each book.';
            this.neighborSlider.min = '10';
            this.neighborSlider.max = '250';
            this.neighborSlider.step = '5';
            const val = this.neighborsPerKeyword || 100;
            this.neighborSlider.value = val;
            if (this.neighborValue) this.neighborValue.textContent = val;
        } else {
            if (heading) heading.textContent = 'Relationships per Word';
            if (hint) hint.textContent = 'Controls how many related words appear around each keyword.';
            this.neighborSlider.min = '10';
            this.neighborSlider.max = '250';
            this.neighborSlider.step = '5';
            const val = this.neighborsPerKeyword || 100;
            this.neighborSlider.value = val;
            if (this.neighborValue) this.neighborValue.textContent = val;
        }
    }

    setVerseViewMode(submode) {
        if (this.verseViewMode === submode) return;
        this.verseViewMode = submode;
        const verseModeBtns = this.querySelectorAll('#bwm-verse-mode-filter button[data-submode]');
        verseModeBtns.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-submode') === submode);
        });
        this.updateNeighborSlider();
        if (this.isSearchMode && this.searchedVerses && this.searchedVerses.length > 0) {
            let records = this.searchedVerses.map(ref => this.versemapLookup ? this.versemapLookup.get(ref) : null).filter(Boolean);
            this.buildVersesConstellation(records);
        } else {
            this.buildVersesGraph();
        }
    }

    parseVerseQuery(query, fallbackTo11 = false) {
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

            let m = norm.match(/^(?:((?:[123]\s*)?[a-z]+(?:\s+of\s+[a-z]+)?)[\s.]+)?(\d+)(?:[:\s.](\d+)(?:-(\d+))?)?$/i);
            if (m) {
                let bStr = m[1];
                let chap = parseInt(m[2], 10);
                let vstart = m[3] ? parseInt(m[3], 10) : null;
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
                    if (SINGLE_CHAPTER_BOOKS.has(bookCode) && vstart === null) {
                        if (chap > 1) {
                            vstart = chap;
                            vend = chap;
                            chap = 1;
                        } else if (fallbackTo11) {
                            vstart = 1;
                            vend = 1;
                        }
                    } else if (vstart === null && fallbackTo11) {
                        vstart = 1;
                        vend = 1;
                    }

                    if (vstart !== null) {
                        for (let v = vstart; v <= vend; v++) {
                            let ref = `${bookCode} ${chap}:${v}`;
                            if (this.versemapLookup && this.versemapLookup.has(ref)) {
                                if (!results.includes(ref)) results.push(ref);
                            } else if (!this.versemapLookup) {
                                if (!results.includes(ref)) results.push(ref);
                            }
                        }
                    }
                }
            } else if (fallbackTo11) {
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

    parseChapterQuery(query) {
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
            norm = norm.replace(/\bchapter\b/g, '').replace(/\bch\b/g, '').replace(/\s+/g, ' ').trim();

            let m = norm.match(/^(?:((?:[123]\s*)?[a-z]+(?:\s+of\s+[a-z]+)?)[\s.]+)?(\d+)(?:[:\s.](\d+))?$/i);
            if (m) {
                let bStr = m[1];
                let chap = parseInt(m[2], 10);
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
                    let ref = `${bookCode}.${chap}`;
                    if (!results.includes(ref)) results.push(ref);
                }
            }
        }
        return results;
    }

    setChapterConnMode(submode) {
        if (this.chapterConnMode === submode) return;
        this.chapterConnMode = submode;
        const chapModeBtns = this.querySelectorAll('#bwm-chapter-mode-filter button[data-chapmode]');
        chapModeBtns.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-chapmode') === submode);
        });
        this.updateNeighborSlider();
        this.updateUrl({ view: 'chapters', ccm: submode });
        if (this.isSearchMode && this.searchedChapters && this.searchedChapters.length > 0) {
            let records = this.searchedChapters.map(ref => this.chaptermapLookup ? this.chaptermapLookup.get(ref) : null).filter(Boolean);
            this.buildChaptersConstellation(records);
        } else {
            this.buildChaptersGraph();
        }
    }

    searchChapters(useExplicitCodes = false) {
        this.hoveredNode = null;
        let foundChapters = [];

        if (typeof useExplicitCodes === 'string') {
            let query = useExplicitCodes.trim();
            if (this.searchInput) this.searchInput.value = query;
            useExplicitCodes = false;
        } else if (Array.isArray(useExplicitCodes)) {
            this.searchedChapters = useExplicitCodes;
            useExplicitCodes = true;
        }

        if (!this.chaptersData || !this.chaptermapLookup || this.chaptermapLookup.size === 0) {
            if (this.chaptersPromise) {
                this.chaptersPromise.then(data => {
                    if (data) {
                        let chList = data.chapters || (Array.isArray(data) ? data : null);
                        if (chList) {
                            this.chaptersData = data.chapters ? data : { count: chList.length, chapters: chList };
                            this.chaptermapLookup = new Map(chList.map(c => [c.id, c]));
                        }
                        this.searchChapters(useExplicitCodes);
                    }
                });
            }
            return;
        }

        if (!useExplicitCodes) {
            let query = (this.searchInput ? this.searchInput.value : '').trim();
            if (!query) {
                this.clearAllKeywords();
                return;
            }
            let detectedVerse = detectVerseReference(query);
            if (detectedVerse && detectedVerse.vstart) {
                this.searchedChapters = [];
                this.drawerChapters = [];
                this.selectedChapter = null;
                this.isSearchMode = false;
                this.updateClearBtnVisibility();
                this.updateUrl({ view: 'chapters', chapters: undefined });
                this.renderActiveWords();
                this.showSearchRecovery(query, 'chapters');
                this.buildChaptersGraph();
                return;
            }
            foundChapters = this.parseChapterQuery(query);
            if (foundChapters.length === 0) {
                this.updateClearBtnVisibility();
                this.showSearchRecovery(query, 'chapters');
                return;
            }
            this.searchedChapters = foundChapters;
            this.drawerChapters = [...this.searchedChapters];
        } else {
            if (!this.searchedChapters || this.searchedChapters.length === 0) {
                this.clearAllKeywords();
                return;
            }
            foundChapters = [...this.searchedChapters];
        }

        let records = foundChapters.map(ref => this.chaptermapLookup ? this.chaptermapLookup.get(ref) : null).filter(Boolean);
        if (records.length === 0) {
            this.searchedChapters = [];
            this.drawerChapters = [];
            this.selectedChapter = null;
            this.isSearchMode = false;
            this.updateClearBtnVisibility();
            this.updateUrl({ view: 'chapters', chapters: undefined });
            this.renderActiveWords();
            this.showSearchRecovery(this.searchInput ? this.searchInput.value : '', 'chapters');
            this.buildChaptersGraph();
            return;
        }

        this.closeSearchRecovery();
        this.searchedChapters = records.map(r => r.id);
        this.drawerChapters = [...this.searchedChapters];

        if (!this.selectedChapter || !records.some(r => r.id === this.selectedChapter.id)) {
            this.selectedChapter = records[0];
        } else {
            this.selectedChapter = records.find(r => r.id === this.selectedChapter.id);
        }
        this.isSearchMode = true;
        this.userInteracted = false;
        this._nodesBounds = null;

        this.searchInput.value = foundChapters.map(r => formatChapterRef(r)).join(", ");
        this.updateClearBtnVisibility();

        if (this.searchedChapters && this.searchedChapters.length > 0) {
            this.updateUrl({ view: 'chapters', chapters: this.searchedChapters.join(','), ccm: this.chapterConnMode });
        }

        this.buildChaptersConstellation(records);
    }

    buildChaptersGraph() {
        if (this.simulation) this.simulation.stop();
        if (this.spawnInterval) {
            clearInterval(this.spawnInterval);
            this.spawnInterval = null;
        }
        if (!this.chaptermapLookup || this.chaptermapLookup.size === 0) return;

        this.isSearchMode = false;
        this.selectedChapter = null;
        this.hideChapterCard();

        let cw = this.logicalWidth || 800;
        let ch = this.logicalHeight || 600;

        const landmarkIds = LANDMARK_CHAPTERS.filter(id => this.chaptermapLookup.has(id));
        const landmarkSet = new Set(landmarkIds);

        this.nodes = landmarkIds.map(id => {
            let c = this.chaptermapLookup.get(id);
            let genre = c.genre || getChapterGenre(id);
            let testament = c.testament || getChapterTestament(id);
            return {
                id: c.id,
                ref: c.id,
                formattedRef: formatChapterRef(c.id),
                w: formatChapterRef(c.id),
                b: c.b,
                c: c.c,
                genre: genre,
                testament: testament,
                t: testament,
                x: c.x * 120,
                y: c.y * 120,
                rawX: c.x,
                rawY: c.y,
                r: c.r,
                rv: c.rv,
                words: c.w,
                isChapter: true,
                isFocusedChapter: false,
                isKw: false
            };
        });

        let nodeMap = new Map(this.nodes.map(n => [n.id, n]));
        this.links = [];

        this.nodes.forEach(n => {
            (n.r || []).forEach(cr => {
                let crId = getNeighborId(cr);
                let crSim = getNeighborSim(cr);
                if (landmarkSet.has(crId) && n.id < crId && nodeMap.has(crId)) {
                    this.links.push({
                        source: n,
                        target: nodeMap.get(crId),
                        type: 'chapter-crossref',
                        sim: crSim
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
        let scale = 0.90 / Math.max(dx / cw, dy / ch);

        this.transform = d3.zoomIdentity.translate(cw / 2 - scale * cx, ch / 2 - scale * cy).scale(scale);
        d3.select(this.canvas).call(this.zoom.transform, this.transform);

        this._nodesBounds = { minX, maxX, minY, maxY };
        this.userInteracted = false;
        this.draw();
        this.updateZoomExtentsVisibility();
    }

    buildChaptersConstellation(foundChapters) {
        if (this.simulation) this.simulation.stop();
        if (this.spawnInterval) {
            clearInterval(this.spawnInterval);
            this.spawnInterval = null;
        }
        if (!foundChapters || foundChapters.length === 0) return;

        let primaryNodes = foundChapters.map((c, idx) => {
            let node = {
                id: c.id,
                ref: c.id,
                formattedRef: formatChapterRef(c.id),
                w: formatChapterRef(c.id),
                b: c.b,
                c: c.c,
                name: c.name,
                genre: c.genre || getChapterGenre(c.id),
                testament: c.testament || getChapterTestament(c.id),
                t: c.testament || getChapterTestament(c.id),
                order: c.order,
                verses: c.verses,
                x: 0,
                y: 0,
                isChapter: true,
                isFocusedChapter: true,
                isKw: true,
                sim: 1.0,
                normSim: 1.0,
                r: c.r,
                rv: c.rv,
                words: c.w
            };
            if (foundChapters.length === 1) {
                node.fx = 0;
                node.fy = 0;
            } else {
                const angle = (idx / foundChapters.length) * Math.PI * 2;
                const r = 90;
                node.x = Math.cos(angle) * r;
                node.y = Math.sin(angle) * r;
            }
            return node;
        });

        let primaryIds = new Set(primaryNodes.map(n => n.id));

        if (this.chapterConnMode === 'chapters') {
            let limit = this.chapterChaptersCount || 16;
            let crossrefMap = new Map();
            let crossrefLinks = [];

            // Cross links among primary chapters
            for (let i = 0; i < primaryNodes.length; i++) {
                for (let j = i + 1; j < primaryNodes.length; j++) {
                    let n1 = primaryNodes[i];
                    let n2 = primaryNodes[j];
                    let cr = (n1.r || []).find(r => getNeighborId(r) === n2.id);
                    let sim = cr ? getNeighborSim(cr) : 0.7;
                    crossrefLinks.push({
                        source: n1.id,
                        target: n2.id,
                        type: 'chapter-crossref',
                        sim: sim,
                        isPrimary: true
                    });
                }
            }

            foundChapters.forEach(c => {
                let topRefs = (c.r || []).slice(0, limit);
                topRefs.forEach(cr => {
                    let crId = getNeighborId(cr);
                    let crSim = getNeighborSim(cr);
                    if (!crId || primaryIds.has(crId)) return;
                    let crRecord = this.chaptermapLookup ? this.chaptermapLookup.get(crId) : null;
                    if (!crRecord) return;

                    if (!crossrefMap.has(crId)) {
                        crossrefMap.set(crId, {
                            record: crRecord,
                            maxSim: crSim,
                            sourceChapter: c.id,
                            linkedChapters: [c.id]
                        });
                    } else {
                        let item = crossrefMap.get(crId);
                        if (!item.linkedChapters.includes(c.id)) item.linkedChapters.push(c.id);
                        if (crSim > item.maxSim) {
                            item.maxSim = crSim;
                            item.sourceChapter = c.id;
                        }
                    }

                    crossrefLinks.push({
                        source: crId,
                        target: c.id,
                        type: 'chapter-crossref',
                        sim: crSim
                    });
                });
            });

            let crossrefNodes = Array.from(crossrefMap.values()).map(item => {
                let c = item.record;
                return {
                    id: c.id,
                    ref: c.id,
                    formattedRef: formatChapterRef(c.id),
                    w: formatChapterRef(c.id),
                    b: c.b,
                    c: c.c,
                    name: c.name,
                    genre: c.genre || getChapterGenre(c.id),
                    testament: c.testament || getChapterTestament(c.id),
                    t: c.testament || getChapterTestament(c.id),
                    order: c.order,
                    verses: c.verses,
                    x: (Math.random() - 0.5) * 70,
                    y: (Math.random() - 0.5) * 70,
                    isChapter: true,
                    isFocusedChapter: false,
                    isKw: false,
                    sim: item.maxSim,
                    normSim: item.maxSim,
                    sourceChapter: item.sourceChapter,
                    linkedChapters: item.linkedChapters,
                    r: c.r,
                    rv: c.rv,
                    words: c.w
                };
            });

            this.nodes = [...primaryNodes, ...crossrefNodes];
            this.links = crossrefLinks;
        } else if (this.chapterConnMode === 'verses') {
            let limit = this.chapterVersesCount || 16;
            let verseMap = new Map();
            let verseLinks = [];

            foundChapters.forEach(c => {
                let topVerses = (c.rv || []).slice(0, limit);
                topVerses.forEach(rv => {
                    let vRef = getNeighborId(rv);
                    let vSim = getNeighborSim(rv);
                    if (!vRef) return;

                    if (!verseMap.has(vRef)) {
                        verseMap.set(vRef, {
                            ref: vRef,
                            maxSim: vSim,
                            sourceChapter: c.id,
                            linkedChapters: [c.id]
                        });
                    } else {
                        let item = verseMap.get(vRef);
                        if (!item.linkedChapters.includes(c.id)) item.linkedChapters.push(c.id);
                        if (vSim > item.maxSim) {
                            item.maxSim = vSim;
                            item.sourceChapter = c.id;
                        }
                    }

                    verseLinks.push({
                        source: vRef,
                        target: c.id,
                        type: 'chapter-verse',
                        sim: vSim
                    });
                });
            });

            let verseNodes = Array.from(verseMap.values()).map(item => {
                let vRef = item.ref;
                let genre = getVerseGenre(vRef);
                let testament = getVerseTestament(vRef);
                return {
                    id: vRef,
                    ref: vRef,
                    formattedRef: formatVerseRef(vRef),
                    w: formatVerseRef(vRef),
                    genre: genre,
                    testament: testament,
                    t: testament,
                    x: (Math.random() - 0.5) * 70,
                    y: (Math.random() - 0.5) * 70,
                    isChapterVerse: true,
                    isVerse: true,
                    isFocusedVerse: false,
                    isKw: false,
                    sim: item.maxSim,
                    normSim: item.maxSim,
                    sourceChapter: item.sourceChapter,
                    linkedChapters: item.linkedChapters
                };
            });

            this.nodes = [...primaryNodes, ...verseNodes];
            this.links = verseLinks;
        } else {
            // Words mode
            let limit = this.chapterWordsCount || 40;
            let wordMap = new Map();
            let wordLinks = [];

            foundChapters.forEach(c => {
                let topWords = (c.w || []).slice(0, limit);
                topWords.forEach(wid => {
                    if (!wordMap.has(wid)) {
                        wordMap.set(wid, {
                            wid: wid,
                            sourceChapter: c.id,
                            linkedChapters: [c.id]
                        });
                    } else {
                        let item = wordMap.get(wid);
                        if (!item.linkedChapters.includes(c.id)) item.linkedChapters.push(c.id);
                    }

                    wordLinks.push({
                        source: wid,
                        target: c.id,
                        type: 'chapter-word'
                    });
                });
            });

            let wordNodes = Array.from(wordMap.values()).map(item => {
                let { word, pos } = this.parseWordId(item.wid);
                let d2 = this.data2d ? this.data2d.find(d => d.id === item.wid) : null;
                return {
                    id: item.wid,
                    w: word,
                    pos: pos,
                    f: d2 ? d2.f : 1,
                    original: d2 ? d2.original : null,
                    testament: primaryNodes[0].testament,
                    t: primaryNodes[0].testament,
                    x: (Math.random() - 0.5) * 70,
                    y: (Math.random() - 0.5) * 70,
                    isChapterWord: true,
                    isKw: false,
                    sourceChapter: item.sourceChapter,
                    linkedChapters: item.linkedChapters
                };
            });

            this.nodes = [...primaryNodes, ...wordNodes];
            this.links = wordLinks;
        }

        this.allSearchNodes = this.nodes;
        this.allSearchLinks = this.links;

        this.renderActiveWords();

        let cw = this.logicalWidth || 800;
        let ch = this.logicalHeight || 600;
        this.transform = d3.zoomIdentity.translate(this.getInitialCameraCenterX(), ch / 2).scale(1);
        d3.select(this.canvas).call(this.zoom.transform, this.transform);

        const LCG = d3.randomLcg(42);
        this.simulation = d3.forceSimulation(this.nodes)
            .randomSource(LCG)
            .velocityDecay(0.45)
            .force("link", d3.forceLink(this.links).id(d => d.id).distance(d => {
                if (d.type === 'chapter-crossref') return Math.max(70, (1 - (d.sim || 0.8)) * 340);
                if (d.type === 'chapter-verse') return Math.max(65, (1 - (d.sim || 0.8)) * 320);
                return 65;
            }).strength(0.85))
            .force("charge", d3.forceManyBody().strength(d => d.isFocusedChapter ? -380 : -85))
            .force("collide", d3.forceCollide().radius(d => d.isFocusedChapter ? 32 : 18))
            .force("center", d3.forceCenter(0, 0).strength(0.04))
            .on("tick", () => {
                this.updateDynamicZoom();
                this.draw();
            });

        if (primaryNodes.length > 1) {
            for (let i = 0; i < 40; i++) {
                this.simulation.tick();
            }
            primaryNodes.forEach(p => {
                p.fx = p.x;
                p.fy = p.y;
            });
        }

        let targetChapter = this.selectedChapter ? this.selectedChapter.id : foundChapters[0].id;
        if (window.innerWidth <= 768) {
            this.selectedChapter = this.selectedChapter || foundChapters[0];
            this.hideChapterCard();
        } else {
            this.showChapterCard(targetChapter);
        }
    }

    selectChapter(code, openCard = true) {
        if (!code) return;
        this.searchedChapters = [code];
        this.drawerChapters = [code];
        this.searchChapters(true);
        if (openCard && window.innerWidth > 768) {
            this.showChapterCard(code);
        }
    }

    addChapter(code) {
        if (!this.searchedChapters) this.searchedChapters = [];
        if (!this.drawerChapters) this.drawerChapters = [];
        if (!this.searchedChapters.includes(code)) {
            this.searchedChapters.push(code);
        }
        if (!this.drawerChapters.includes(code)) {
            this.drawerChapters.push(code);
        }
        this.syncChapterToggles(code, true);
        this.searchChapters(true);
    }

    removeChapter(code) {
        if (!this.searchedChapters) return;
        this.searchedChapters = this.searchedChapters.filter(c => c !== code);
        this.drawerChapters = this.drawerChapters.filter(c => c !== code);
        this.syncChapterToggles(code, false);
        if (this.searchedChapters.length === 0) {
            this.clearAllKeywords();
        } else {
            if (this.selectedChapter && this.selectedChapter.id === code) {
                let remaining = this.searchedChapters.map(id => this.chaptermapLookup ? this.chaptermapLookup.get(id) : null).filter(Boolean);
                this.selectedChapter = remaining.length > 0 ? remaining[0] : null;
            }
            this.searchChapters(true);
        }
    }

    syncChapterToggles(code, isActive) {
        this.querySelectorAll(`.bwm-pill-toggle[data-toggle-chapter="${code}"]`).forEach(toggle => {
            toggle.classList.toggle('is-active', isActive);
            toggle.setAttribute('aria-checked', isActive ? 'true' : 'false');
            toggle.title = isActive ? 'Remove chapter from map' : 'Add chapter to map';
        });
        if (this.selectedChapter && this.selectedChapter.id === code) {
            let activeToggle = this.querySelector('#bwm-chapter-action-toggle');
            if (activeToggle) {
                activeToggle.classList.toggle('is-active', isActive);
                activeToggle.setAttribute('aria-checked', isActive ? 'true' : 'false');
                activeToggle.title = isActive ? 'Remove chapter from map' : 'Add chapter to map';
            }
        }
    }

    resetChaptersView() {
        this.closeSearchRecovery();
        if (this.simulation) this.simulation.stop();
        if (this.spawnInterval) {
            clearInterval(this.spawnInterval);
            this.spawnInterval = null;
        }
        this.searchedChapters = [];
        this.drawerChapters = [];
        this.searchedVerses = [];
        this.drawerVerses = [];
        this.searchedWords = [];
        this.drawerWords = [];
        this.searchedBooks = [];
        this.drawerBooks = [];
        this.selectedChapter = null;
        this.isSearchMode = false;
        if (this.searchInput) this.searchInput.value = '';
        this.updateClearBtnVisibility();
        this.renderActiveWords();
        this.hideRadialMenu();
        this.hideVersesPanel();
        this.hideCanonUsageModal();
        this.hideVerseCard();
        this.hideChapterCard();
        this.hideWordInspector();
        this.hideBookCard();
        if (this.isStudyPanelPinned) this.unpinStudyPanel();
        this.inspectorNode = null;
        this.hoveredNode = null;
        if (this.chapterReopenBtn) this.chapterReopenBtn.style.display = 'none';
        if (this.verseReopenBtn) this.verseReopenBtn.style.display = 'none';
        if (this.reopenBtn) this.reopenBtn.style.display = 'none';
        this.updateUrl({ view: 'chapters', ccm: this.chapterConnMode });
        this.buildChaptersGraph();
    }

    getChapterVerses(chapterCode) {
        if (!chapterCode) return [];
        let parts = chapterCode.split('.');
        if (parts.length < 2) return [];
        let book = parts[0].toUpperCase();
        let chap = parts[1];
        let prefix = `${book} ${chap}:`;
        let results = [];

        if (this.verses && this.verses.length > 0) {
            for (let i = 0; i < this.verses.length; i++) {
                let line = this.verses[i];
                if (line.startsWith(prefix)) {
                    let vParts = line.split('|');
                    let ref = vParts[0];
                    let en = vParts[1] || '';
                    let orig = vParts[2] || '';
                    if (!orig && vParts.length === 2 && /[\u0370-\u03ff\u1f00-\u1fff]/.test(en) && !/[a-zA-Z]{3,}/.test(en)) {
                        orig = en;
                        en = '';
                    }
                    if (!en && this.verseTextMap) en = this.verseTextMap.get(ref) || '';
                    if (!orig && this.verseGreekMap) orig = this.verseGreekMap.get(ref) || '';
                    let vNum = parseInt(ref.slice(prefix.length), 10) || 0;
                    results.push({ ref, vNum, en, orig });
                }
            }
        }
        results.sort((a, b) => a.vNum - b.vNum);
        return results;
    }

    getCanonicalVerseList() {
        if (!this._canonicalVersesByFoundation) {
            this._canonicalVersesByFoundation = {};
            this._canonicalVerseIndexByFoundation = {};
        }
        let f = this.foundation || 'bsb';
        if (this._canonicalVersesByFoundation[f] && this._canonicalVersesByFoundation[f].length > 0) {
            return this._canonicalVersesByFoundation[f];
        }

        let rawList = [];
        if (this.versemapLookup && this.versemapLookup.size > 0) {
            rawList = Array.from(this.versemapLookup.keys());
        } else if (this.verseTextMap && this.verseTextMap.size > 0) {
            rawList = Array.from(this.verseTextMap.keys());
        } else if (this.verses && this.verses.length > 0) {
            rawList = this.verses.map(s => s.split('|')[0]);
        } else if (this.versemapData && Array.isArray(this.versemapData.verses) && this.versemapData.verses.length > 0) {
            rawList = this.versemapData.verses.map(v => v.id);
        }

        if (rawList.length === 0) {
            return [];
        }

        const books = this.getActiveBibleBooks();
        const bookOrderMap = new Map();
        books.forEach((b, idx) => {
            bookOrderMap.set(b.code, idx);
        });

        const parseVerseKey = (vId) => {
            const spaceIdx = vId.indexOf(' ');
            if (spaceIdx === -1) return { bOrder: 9999, c: 0, v: 0 };
            const b = vId.slice(0, spaceIdx);
            const colonIdx = vId.indexOf(':', spaceIdx + 1);
            const c = colonIdx !== -1 ? parseInt(vId.slice(spaceIdx + 1, colonIdx), 10) || 0 : 0;
            const v = colonIdx !== -1 ? parseInt(vId.slice(colonIdx + 1), 10) || 0 : 0;
            const bOrder = bookOrderMap.has(b) ? bookOrderMap.get(b) : 9999;
            return { bOrder, c, v };
        };

        const sortedList = [...rawList].sort((a, b) => {
            const pa = parseVerseKey(a);
            const pb = parseVerseKey(b);
            if (pa.bOrder !== pb.bOrder) return pa.bOrder - pb.bOrder;
            if (pa.c !== pb.c) return pa.c - pb.c;
            return pa.v - pb.v;
        });

        this._canonicalVersesByFoundation[f] = sortedList;
        const idxMap = new Map();
        sortedList.forEach((vId, idx) => idxMap.set(vId, idx));
        this._canonicalVerseIndexByFoundation[f] = idxMap;

        return sortedList;
    }

    getAdjacentVerses(verseId) {
        let f = this.foundation || 'bsb';
        let list = this.getCanonicalVerseList();
        if (!list || list.length === 0) return { prev: null, next: null };
        let idxMap = this._canonicalVerseIndexByFoundation ? this._canonicalVerseIndexByFoundation[f] : null;
        let idx = idxMap ? idxMap.get(verseId) : list.indexOf(verseId);
        if (idx === undefined || idx === -1) {
            return { prev: null, next: null };
        }
        let prev = (idx > 0) ? list[idx - 1] : null;
        let next = (idx < list.length - 1) ? list[idx + 1] : null;
        return { prev, next, index: idx, total: list.length };
    }

    getCanonicalChapterList() {
        if (!this._canonicalChaptersByFoundation) {
            this._canonicalChaptersByFoundation = {};
            this._canonicalChapterIndexByFoundation = {};
        }
        let f = this.foundation || 'bsb';
        if (this._canonicalChaptersByFoundation[f] && this._canonicalChaptersByFoundation[f].length > 0) {
            return this._canonicalChaptersByFoundation[f];
        }

        let verseList = this.getCanonicalVerseList();
        let chapterList = [];

        if (verseList && verseList.length > 0) {
            let seen = new Set();
            for (let i = 0; i < verseList.length; i++) {
                let vId = verseList[i];
                let spaceIdx = vId.indexOf(' ');
                if (spaceIdx === -1) continue;
                let b = vId.slice(0, spaceIdx);
                let colonIdx = vId.indexOf(':', spaceIdx + 1);
                let c = colonIdx !== -1 ? vId.slice(spaceIdx + 1, colonIdx) : '1';
                let chId = `${b}.${c}`;
                if (!seen.has(chId)) {
                    seen.add(chId);
                    chapterList.push(chId);
                }
            }
        } else {
            let rawList = [];
            if (this.chaptermapLookup && this.chaptermapLookup.size > 0) {
                rawList = Array.from(this.chaptermapLookup.keys());
            } else if (this.chaptersData && Array.isArray(this.chaptersData.chapters)) {
                rawList = this.chaptersData.chapters.map(c => c.id);
            }
            if (rawList.length > 0) {
                const books = this.getActiveBibleBooks();
                const bookOrderMap = new Map();
                books.forEach((b, idx) => bookOrderMap.set(b.code, idx));
                chapterList = [...rawList].sort((a, b) => {
                    let partsA = a.split('.');
                    let partsB = b.split('.');
                    let bOrderA = bookOrderMap.has(partsA[0]) ? bookOrderMap.get(partsA[0]) : 9999;
                    let bOrderB = bookOrderMap.has(partsB[0]) ? bookOrderMap.get(partsB[0]) : 9999;
                    if (bOrderA !== bOrderB) return bOrderA - bOrderB;
                    let cA = parseInt(partsA[1], 10) || 0;
                    let cB = parseInt(partsB[1], 10) || 0;
                    return cA - cB;
                });
            }
        }

        if (chapterList.length === 0) return [];

        this._canonicalChaptersByFoundation[f] = chapterList;
        let idxMap = new Map();
        chapterList.forEach((chId, idx) => idxMap.set(chId, idx));
        this._canonicalChapterIndexByFoundation[f] = idxMap;

        return chapterList;
    }

    getAdjacentChapters(chapterId) {
        let f = this.foundation || 'bsb';
        let list = this.getCanonicalChapterList();
        if (!list || list.length === 0) return { prev: null, next: null };
        let idxMap = this._canonicalChapterIndexByFoundation ? this._canonicalChapterIndexByFoundation[f] : null;
        let idx = idxMap ? idxMap.get(chapterId) : list.indexOf(chapterId);
        if (idx === undefined || idx === -1) {
            return { prev: null, next: null };
        }
        let prev = (idx > 0) ? list[idx - 1] : null;
        let next = (idx < list.length - 1) ? list[idx + 1] : null;
        return { prev, next, index: idx, total: list.length };
    }

    showChapterCard(chapterOrCode, targetVerseRef = null, activeChapters = null) {
        if (!this.chapterCard || !chapterOrCode) return;
        let chapterCode = (typeof chapterOrCode === 'string') ? chapterOrCode : (chapterOrCode.id || chapterOrCode.ref);
        let cRecord = (typeof chapterOrCode === 'object' && chapterOrCode.b) ? chapterOrCode : (this.chaptermapLookup ? this.chaptermapLookup.get(chapterCode) : null);
        if (!cRecord) {
            let parts = chapterCode.split('.');
            let b = parts[0];
            let c = parseInt(parts[1], 10) || 1;
            cRecord = { id: chapterCode, b: b, c: c, r: [], rv: [], w: [] };
        }
        this.selectedChapter = cRecord;

        if (!this.verses && this.versesPromise) {
            this.versesPromise.then(vData => {
                if (vData && vData.verses) {
                    this.verses = vData.verses;
                    if (this.selectedChapter && this.selectedChapter.id === cRecord.id && this.chapterCard.classList.contains('visible')) {
                        this.showChapterCard(cRecord, targetVerseRef, activeChapters);
                    }
                }
            });
        }

        if ((!this.chaptermapLookup || this.chaptermapLookup.size === 0) && this.chaptersPromise) {
            this.chaptersPromise.then(data => {
                if (data) {
                    let chList = data.chapters || (Array.isArray(data) ? data : null);
                    if (chList) {
                        this.chaptersData = data.chapters ? data : { count: chList.length, chapters: chList };
                        this.chaptermapLookup = new Map(chList.map(c => [c.id, c]));
                        if (this.selectedChapter && this.selectedChapter.id === cRecord.id && this.chapterCard.classList.contains('visible')) {
                            this.showChapterCard(chapterCode, targetVerseRef, activeChapters);
                        }
                    }
                }
            });
        }

        if (window.innerWidth <= 768) {
            this.closeDrawer();
        }
        this.hideWordInspector();
        this.hideBookCard();
        this.hideVerseCard();
        this.hideRadialMenu();

        let genre = cRecord.genre || getChapterGenre(chapterCode);
        let testament = cRecord.testament || getChapterTestament(chapterCode);
        let genreColor = GENRE_COLORS[genre] || '#3b82f6';
        let formattedRef = formatChapterRef(chapterCode);

        let adjChap = this.getAdjacentChapters(chapterCode);
        let prevChap = adjChap.prev;
        let nextChap = adjChap.next;

        if (!activeChapters) {
            activeChapters = (this.searchedChapters && this.searchedChapters.length > 0)
                ? this.searchedChapters.map(cId => this.chaptermapLookup ? this.chaptermapLookup.get(cId) : null).filter(Boolean)
                : [cRecord];
        }

        let tabsHtml = '';
        if (activeChapters && activeChapters.length > 1) {
            tabsHtml = `
                <div class="bwm-window-tabs bwm-chapter-tabs">
                    ${activeChapters.map(c => {
                        let activeCls = c.id === chapterCode ? 'active' : '';
                        let cGenre = c.genre || getChapterGenre(c.id);
                        let tabColor = GENRE_COLORS[cGenre] || '#3b82f6';
                        let style = (c.id === chapterCode) ? `border-bottom-color: ${tabColor}; color: ${tabColor};` : '';
                        let fRef = formatChapterRef(c.id);
                        return `<button type="button" class="bwm-window-tab bwm-chapter-tab ${activeCls}" data-chapter-tab="${c.id}" style="${style}"><b>${fRef}</b></button>`;
                    }).join('')}
                </div>
            `;
        }

        let isAlreadyActive = Boolean(this.searchedChapters && this.searchedChapters.includes(chapterCode));
        let chapterActionHtml = this.renderPillToggle({
            isActive: isAlreadyActive,
            id: 'bwm-chapter-action-toggle',
            dataAttrs: {
                'toggle-chapter': chapterCode
            },
            title: isAlreadyActive ? 'Remove chapter from map' : 'Add chapter to map'
        });

        // Subtabs: Reader | Related | Refs | Words
        let activeChapSubpane = this.lastChapSubpane || 'reader';
        let subtabsHtml = `
            <div class="bwm-window-tabs bwm-chapter-subtabs" style="gap: 4px; padding: 4px 10px; margin-bottom: 0;">
                <button type="button" class="bwm-window-tab ${activeChapSubpane === 'reader' ? 'active' : ''}" data-chap-subpane="reader"><b>Reader</b></button>
                <button type="button" class="bwm-window-tab ${activeChapSubpane === 'related' ? 'active' : ''}" data-chap-subpane="related"><b>Related</b></button>
                <button type="button" class="bwm-window-tab ${activeChapSubpane === 'crossrefs' ? 'active' : ''}" data-chap-subpane="crossrefs"><b>Refs</b></button>
                <button type="button" class="bwm-window-tab ${activeChapSubpane === 'words' ? 'active' : ''}" data-chap-subpane="words"><b>Words</b></button>
            </div>
        `;

        // 1. Chapter Reader Content
        let chapterVerses = this.getChapterVerses(chapterCode);
        let hasParallelOrig = chapterVerses.some(v => Boolean(v.orig));
        let origColumnTitle = (this.foundation === 'vul') ? 'Latin Vulgate' : 'Greek Septuagint / NT';

        let readerVersesHtml = chapterVerses.map(v => {
            let isHighlighted = targetVerseRef && (v.ref === targetVerseRef);
            let rowCls = isHighlighted ? 'bwm-chapter-verse-row highlighted' : 'bwm-chapter-verse-row';
            let textColCls = hasParallelOrig ? 'bwm-chapter-verse-text-col has-parallel' : 'bwm-chapter-verse-text-col';
            return `
                <div class="${rowCls}" data-verse-ref="${v.ref}">
                    <div class="bwm-chapter-verse-num-col">
                        <button type="button" class="bwm-chapter-vnum-btn" data-jump-verse="${v.ref}" title="Inspect verse ${v.ref} and cross-references">${v.vNum}</button>
                    </div>
                    <div class="${textColCls}">
                        <div class="bwm-chapter-verse-eng">${escapeHtml(v.en)}</div>
                        ${hasParallelOrig ? `<div class="bwm-chapter-verse-orig">${escapeHtml(v.orig || '')}</div>` : ''}
                    </div>
                </div>
            `;
        }).join('');

        let readerPaneHtml = `
            <div class="bwm-chapter-pane ${activeChapSubpane === 'reader' ? 'active' : ''}" id="bwm-chap-pane-reader" style="display: ${activeChapSubpane === 'reader' ? 'flex' : 'none'};">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; flex-wrap: wrap; gap: 8px;">
                    <span style="font-size: 0.8em; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; opacity: 0.7;">
                        ${hasParallelOrig ? `Parallel Columns: English | ${origColumnTitle}` : 'English Translation'}
                    </span>
                    <button type="button" class="bwm-window-pill" id="bwm-btn-chap-explore-book" data-book-code="${cRecord.b}" title="Explore entire book of ${cRecord.b}">
                        Explore Book (${cRecord.b})
                    </button>
                </div>
                <div class="bwm-chapter-reader">
                    <div class="bwm-chapter-verses-table">
                        ${readerVersesHtml || '<div class="bwm-empty-state">No verse text loaded for this chapter.</div>'}
                    </div>
                </div>
            </div>
        `;

        // 2. Related Chapters Pane Content
        let relatedList = Array.isArray(cRecord.r) ? cRecord.r : [];
        let relatedHtml = relatedList.slice(0, 32).map(cr => {
            let crId = getNeighborId(cr);
            let crSim = getNeighborSim(cr);
            let crFormatted = formatChapterRef(crId);
            let crGenre = getChapterGenre(crId);
            let crGenreColor = GENRE_COLORS[crGenre] || '#3b82f6';
            let pct = Math.round((crSim || 0.8) * 100);
            let isCrActive = Boolean(this.searchedChapters && this.searchedChapters.includes(crId));
            let crActionHtml = this.renderPillToggle({
                isActive: isCrActive,
                dataAttrs: {
                    'toggle-chapter': crId
                },
                title: isCrActive ? 'Remove chapter from map' : 'Add chapter to map'
            });
            return `
                <div class="bwm-crossref-card" data-chap-ref="${crId}">
                    <div class="bwm-crossref-head">
                        <div class="bwm-crossref-title-wrap">
                            <span class="bwm-crossref-ref" data-focus-chapter="${crId}" title="Focus this chapter">${crFormatted}</span>
                            <span class="bwm-book-badge" style="background:${crGenreColor};">${crGenre}</span>
                        </div>
                        <div style="display:flex;align-items:center;gap:6px;">
                            <span class="bwm-crossref-badge" title="100D Vector Cosine Similarity">${pct}% match</span>
                            ${crActionHtml}
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        let relatedPaneHtml = `
            <div class="bwm-chapter-pane ${activeChapSubpane === 'related' ? 'active' : ''}" id="bwm-chap-pane-related" style="display: ${activeChapSubpane === 'related' ? 'flex' : 'none'};">
                <div style="font-size: 0.85em; font-weight: 600; opacity: 0.85; margin-bottom: 8px;">Top Semantically Related Chapters:</div>
                <div class="bwm-crossref-list">
                    ${relatedHtml || '<div class="bwm-empty-state">No related chapters found.</div>'}
                </div>
            </div>
        `;

        // 3. Canon-Wide Cross-Reference Verses Pane Content
        let crossrefList = Array.isArray(cRecord.rv) ? cRecord.rv : [];
        let crossrefsHtml = crossrefList.slice(0, 32).map(rv => {
            let vRef = getNeighborId(rv);
            let vSim = getNeighborSim(rv);
            let vFormatted = formatVerseRef(vRef);
            let vGenre = getVerseGenre(vRef);
            let vGenreColor = GENRE_COLORS[vGenre] || '#3b82f6';
            let vText = this.verseTextMap ? (this.verseTextMap.get(vRef) || '') : '';
            let vGreek = this.verseGreekMap ? (this.verseGreekMap.get(vRef) || '') : '';
            let isExpandable = vText.length > 110 || Boolean(vGreek);
            let snippet = vText.length > 110 ? vText.slice(0, 107) + '...' : vText;
            let pct = Math.round((vSim || 0.8) * 100);
            let isVActive = Boolean(this.searchedVerses && this.searchedVerses.includes(vRef));
            let vActionHtml = this.renderPillToggle({
                isActive: isVActive,
                dataAttrs: {
                    'toggle-verse': vRef
                },
                title: isVActive ? 'Remove verse from map' : 'Add verse to map'
            });
            return `
                <div class="bwm-crossref-card" data-cr-id="${vRef}">
                    <div class="bwm-crossref-head">
                        <div class="bwm-crossref-title-wrap">
                            <span class="bwm-crossref-ref" data-jump-verse="${vRef}" title="Inspect verse card">${vFormatted}</span>
                            <span class="bwm-book-badge" style="background:${vGenreColor};">${vGenre}</span>
                        </div>
                        <div style="display:flex;align-items:center;gap:6px;">
                            <span class="bwm-crossref-badge" title="100D Vector Cosine Similarity">${pct}% match</span>
                            ${vActionHtml}
                            ${isExpandable ? `
                            <button type="button" class="bwm-verse-expand-btn" data-action="expand-crossref" aria-expanded="false" title="Expand full verse">
                                <svg class="bwm-chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                            </button>` : ''}
                        </div>
                    </div>
                    ${snippet ? `
                    <div class="bwm-crossref-body">
                        <div class="bwm-crossref-snippet" data-snippet="${escapeHtml(snippet)}" data-full="${escapeHtml(vText)}">${snippet}</div>
                        ${vGreek ? `<div class="bwm-crossref-original" style="display:none;">${escapeHtml(vGreek)}</div>` : ''}
                    </div>` : ''}
                </div>
            `;
        }).join('');

        let crossrefsPaneHtml = `
            <div class="bwm-chapter-pane ${activeChapSubpane === 'crossrefs' ? 'active' : ''}" id="bwm-chap-pane-crossrefs" style="display: ${activeChapSubpane === 'crossrefs' ? 'flex' : 'none'};">
                <div style="font-size: 0.85em; font-weight: 600; opacity: 0.85; margin-bottom: 8px;">Canon-Wide Cross-Reference Verses:</div>
                <div class="bwm-crossref-list">
                    ${crossrefsHtml || '<div class="bwm-empty-state">No cross-reference verses computed.</div>'}
                </div>
            </div>
        `;

        // 4. Constituent Words Pane Content
        let wordList = Array.isArray(cRecord.w) ? cRecord.w : [];
        let wordsHtml = wordList.map(wId => {
            let { word: w, pos } = this.parseWordId(wId);
            let posColor = '#94a3b8';
            if (pos === 'PROPN') posColor = '#4ade80';
            else if (pos === 'NOUN') posColor = '#60a5fa';
            else if (pos === 'VERB') posColor = '#f472b6';
            else if (pos === 'ADJ' || pos === 'ADV') posColor = '#fbbf24';
            let displayW = this.formatWord(w, pos);
            return `<button type="button" class="bwm-book-chip" style="border-left: 3px solid ${posColor}; cursor: pointer;" data-explore-word="${escapeHtml(displayW)}" title="Explore on Word Map"><b>${displayW}</b> <span style="opacity:0.5;font-size:0.8em;">(${pos ? pos.toLowerCase() : ''})</span></button>`;
        }).join('');

        let wordsPaneHtml = `
            <div class="bwm-chapter-pane ${activeChapSubpane === 'words' ? 'active' : ''}" id="bwm-chap-pane-words" style="display: ${activeChapSubpane === 'words' ? 'flex' : 'none'};">
                <div style="font-size: 0.85em; font-weight: 600; opacity: 0.85; margin-bottom: 8px;">Distinctive Content Words:</div>
                <div class="bwm-book-chip-list">
                    ${wordsHtml || '<div class="bwm-empty-state">No distinctive words recorded.</div>'}
                </div>
            </div>
        `;

        this.chapterCard.innerHTML = `
            <div class="bwm-sheet-handle"></div>
            ${tabsHtml}
            <div class="bwm-window-header">
                <div class="bwm-window-header-top">
                    <div>
                        <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px; flex-wrap: wrap;">
                            <span class="bwm-window-badge" style="background: ${genreColor};">${genre}</span>
                            <span class="bwm-window-subtitle-inline">${testament === 'OT' ? 'Old Testament' : 'New Testament'}</span>
                            <span class="bwm-window-badge-muted">${cRecord.verses || chapterVerses.length} verses</span>
                        </div>
                        <div class="bwm-verse-nav-header">
                            <button type="button" class="bwm-verse-nav-chevron" id="bwm-chap-prev-btn" title="${prevChap ? `Previous: ${formatChapterRef(prevChap)}` : 'First chapter'}" ${!prevChap ? 'disabled' : ''} aria-label="Previous chapter">
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="15 18 9 12 15 6"></polyline>
                                </svg>
                            </button>
                            <h3 class="bwm-window-title" style="margin: 0; line-height: 1.2;">${formattedRef}</h3>
                            <button type="button" class="bwm-verse-nav-chevron" id="bwm-chap-next-btn" title="${nextChap ? `Next: ${formatChapterRef(nextChap)}` : 'Last chapter'}" ${!nextChap ? 'disabled' : ''} aria-label="Next chapter">
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        ${chapterActionHtml}
                        ${this.renderPinButton('study')}
                        <button type="button" class="bwm-window-close" id="bwm-chapter-card-close" title="Dismiss">&times;</button>
                    </div>
                </div>
            </div>
            ${subtabsHtml}
            <div class="bwm-window-body" style="padding: 10px 14px;">
                ${readerPaneHtml}
                ${relatedPaneHtml}
                ${crossrefsPaneHtml}
                ${wordsPaneHtml}
                <div class="bwm-book-card-actions" style="margin-top: 16px;">
                    <button type="button" class="bwm-window-pill" id="bwm-btn-reset-chapters" title="Return to landmark overview">
                        &larr; Landmark Overview
                    </button>
                    <button type="button" class="bwm-window-pill active" id="bwm-btn-dismiss-chapter-card" title="Explore constellation on map">
                        Explore Map
                    </button>
                </div>
            </div>
        `;

        if (this.chapterReopenBtn) {
            this.chapterReopenBtn.style.display = 'none';
        }
        this.chapterCard.style.transform = '';
        this.chapterCard.style.transition = '';
        this.chapterCard.style.opacity = '';
        this.chapterCard.classList.add('visible');
        if (this.isStudyPanelPinned) {
            this.chapterCard.classList.add('pinned');
        }
        this.onStudyPanelVisibilityChange(true);

        this.attachChapterCardEvents(activeChapters, cRecord, targetVerseRef);
    }

    attachChapterCardEvents(activeChapters, cRecord, targetVerseRef) {
        let closeBtn = this.chapterCard.querySelector('#bwm-chapter-card-close');
        if (closeBtn) closeBtn.addEventListener('click', (e) => { e.stopPropagation(); this.unpinStudyPanel(); this.hideChapterCard(); });

        let dismissBtn = this.chapterCard.querySelector('#bwm-btn-dismiss-chapter-card');
        if (dismissBtn) dismissBtn.addEventListener('click', (e) => { e.stopPropagation(); this.unpinStudyPanel(); this.hideChapterCard(); });

        let resetBtn = this.chapterCard.querySelector('#bwm-btn-reset-chapters');
        if (resetBtn) resetBtn.addEventListener('click', (e) => { e.stopPropagation(); this.resetChaptersView(); });

        // Chapter previous/next navigation chevrons and mobile swipe
        let adjChap = this.getAdjacentChapters(cRecord.id);
        let prevChap = adjChap.prev;
        let nextChap = adjChap.next;

        let prevBtn = this.chapterCard.querySelector('#bwm-chap-prev-btn');
        if (prevBtn && prevChap) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                let nextActive = (activeChapters && activeChapters.some(c => c.id === prevChap)) ? activeChapters : null;
                this.showChapterCard(prevChap, null, nextActive);
            });
        }

        let nextBtn = this.chapterCard.querySelector('#bwm-chap-next-btn');
        if (nextBtn && nextChap) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                let nextActive = (activeChapters && activeChapters.some(c => c.id === nextChap)) ? activeChapters : null;
                this.showChapterCard(nextChap, null, nextActive);
            });
        }

        this.chapterCard._swipePrev = () => {
            if (prevChap) {
                let nextActive = (activeChapters && activeChapters.some(c => c.id === prevChap)) ? activeChapters : null;
                this.showChapterCard(prevChap, null, nextActive);
            }
        };
        this.chapterCard._swipeNext = () => {
            if (nextChap) {
                let nextActive = (activeChapters && activeChapters.some(c => c.id === nextChap)) ? activeChapters : null;
                this.showChapterCard(nextChap, null, nextActive);
            }
        };

        // Explore Book button
        let exploreBookBtn = this.chapterCard.querySelector('#bwm-btn-chap-explore-book');
        if (exploreBookBtn) {
            exploreBookBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                let bCode = exploreBookBtn.getAttribute('data-book-code');
                this.setViewMode('books');
                if (this.searchInput) this.searchInput.value = bCode;
                this.searchBooks();
            });
        }

        // Subtabs switching
        let subtabBtns = this.chapterCard.querySelectorAll('button[data-chap-subpane]');
        subtabBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                let paneKey = btn.getAttribute('data-chap-subpane');
                this.lastChapSubpane = paneKey;
                subtabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.chapterCard.querySelectorAll('.bwm-chapter-pane').forEach(pane => {
                    pane.style.display = (pane.id === `bwm-chap-pane-${paneKey}`) ? 'flex' : 'none';
                });
            });
        });

        // Jump to verse card from chapter reader or cross-ref list
        let jumpBtns = this.chapterCard.querySelectorAll('[data-jump-verse]');
        jumpBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                let ref = btn.getAttribute('data-jump-verse');
                if (this.viewMode !== 'verses') this.setViewMode('verses');
                this.selectVerse(ref);
                let target = this.versemapLookup ? this.versemapLookup.get(ref) : { id: ref };
                this.showVerseCard(target, [target]);
            });
        });

        // Focus chapter from related list
        let focusBtns = this.chapterCard.querySelectorAll('[data-focus-chapter]');
        focusBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                let ref = btn.getAttribute('data-focus-chapter');
                this.selectChapter(ref);
            });
        });

        // Explore word from words list
        let wordChips = this.chapterCard.querySelectorAll('[data-explore-word]');
        wordChips.forEach(chip => {
            chip.addEventListener('click', (e) => {
                e.stopPropagation();
                let w = chip.getAttribute('data-explore-word');
                this.setViewMode('words');
                if (this.searchInput) this.searchInput.value = w;
                this.searchWord();
            });
        });

        // Multi-chapter tab switching
        let tabBtns = this.chapterCard.querySelectorAll('button[data-chapter-tab]');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                let ref = btn.getAttribute('data-chapter-tab');
                this.showChapterCard(ref);
            });
        });

        // Expand/collapse cross-reference verse text in place
        let crList = this.chapterCard.querySelector('.bwm-crossref-list');
        if (crList) {
            crList.addEventListener('click', (e) => {
                let expandBtn = e.target.closest('.bwm-verse-expand-btn[data-action="expand-crossref"]');
                if (!expandBtn) return;
                e.stopPropagation();
                e.preventDefault();
                let card = expandBtn.closest('.bwm-crossref-card');
                if (!card) return;
                let snippetEl = card.querySelector('.bwm-crossref-snippet');
                let origEl = card.querySelector('.bwm-crossref-original');
                let isExpanded = expandBtn.classList.contains('is-expanded');
                if (isExpanded) {
                    expandBtn.classList.remove('is-expanded');
                    expandBtn.setAttribute('aria-expanded', 'false');
                    expandBtn.setAttribute('title', 'Expand full verse');
                    if (snippetEl) snippetEl.textContent = snippetEl.getAttribute('data-snippet') || '';
                    if (origEl) origEl.style.display = 'none';
                } else {
                    expandBtn.classList.add('is-expanded');
                    expandBtn.setAttribute('aria-expanded', 'true');
                    expandBtn.setAttribute('title', 'Collapse verse');
                    if (snippetEl) snippetEl.textContent = snippetEl.getAttribute('data-full') || '';
                    if (origEl) origEl.style.display = 'block';
                }
            });
        }

        // Add/remove chapter toggle listener
        let toggleBtns = this.chapterCard.querySelectorAll('.bwm-pill-toggle[data-toggle-chapter]');
        toggleBtns.forEach(toggle => {
            this.setupPillToggleListener(toggle, (nextActive) => {
                let code = toggle.getAttribute('data-toggle-chapter');
                if (!code) return;
                if (nextActive) {
                    this.addChapter(code);
                } else {
                    this.removeChapter(code);
                }
                this.syncChapterToggles(code, nextActive);
            });
        });

        // Add/remove verse toggle listener
        let toggleVerseBtns = this.chapterCard.querySelectorAll('.bwm-pill-toggle[data-toggle-verse]');
        toggleVerseBtns.forEach(toggle => {
            this.setupPillToggleListener(toggle, (nextActive) => {
                let ref = toggle.getAttribute('data-toggle-verse');
                if (!ref) return;
                if (nextActive) {
                    this.addVerse(ref);
                } else {
                    this.removeVerse(ref);
                }
                this.syncVerseToggles(ref, nextActive);
            });
        });

        // Auto-scroll to target verse row if specified (scrolling only the reader pane, never parent containers)
        if (targetVerseRef) {
            setTimeout(() => {
                let row = this.chapterCard.querySelector(`.bwm-chapter-verse-row[data-verse-ref="${targetVerseRef}"]`);
                let pane = this.chapterCard.querySelector('#bwm-chap-pane-reader');
                if (row && pane) {
                    const paneRect = pane.getBoundingClientRect();
                    const rowRect = row.getBoundingClientRect();
                    const delta = (rowRect.top - paneRect.top) - (paneRect.height / 2) + (rowRect.height / 2);
                    pane.scrollTo({ top: pane.scrollTop + delta, behavior: 'smooth' });
                    row.classList.add('highlighted');
                }
                if (this.container) {
                    this.container.scrollTop = 0;
                }
            }, 60);
        }
    }

    hideChapterCard() {
        if (this.chapterCard) {
            this.chapterCard.classList.remove('visible', 'pinned');
            this.chapterCard.style.transform = '';
            this.chapterCard.style.transition = '';
            this.chapterCard.style.opacity = '';
        }
        if (this.chapterReopenBtn) {
            if (this.isSearchMode && this.searchedChapters && this.searchedChapters.length > 0) {
                let name = this.selectedChapter ? formatChapterRef(this.selectedChapter.id) : 'Chapter';
                if (this.searchedChapters.length > 1) {
                    name = `${this.searchedChapters.length} Chapters`;
                }
                let textEl = this.chapterReopenBtn.querySelector('.bwm-book-card-reopen-text');
                if (textEl) textEl.textContent = `${name} Info`;
                this.chapterReopenBtn.style.display = 'flex';
            } else {
                this.chapterReopenBtn.style.display = 'none';
            }
        }
        this.updateBackdrop();
        this.onStudyPanelVisibilityChange(false);
    }

    searchVerses(useExplicitCodes = false) {
        if (!this.versemapData || !this.versemapData.verses || !this.versemapLookup || this.versemapLookup.size === 0) {
            if (this.versemapPromise) {
                this.versemapPromise.then(data => {
                    if (data) {
                        let vList = data.verses || (Array.isArray(data) ? data : null);
                        if (vList) {
                            this.versemapData = data.verses ? data : { count: vList.length, verses: vList };
                            this.versemapLookup = new Map(vList.map(v => [v.id, v]));
                        }
                        this.searchVerses(useExplicitCodes);
                    }
                });
            }
            return;
        }
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
                this.updateClearBtnVisibility();
                this.showSearchRecovery(query, 'verses');
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

        let records = foundVerses.map(ref => this.versemapLookup ? this.versemapLookup.get(ref) : null).filter(Boolean);
        if (records.length === 0) {
            this.searchedVerses = [];
            this.drawerVerses = [];
            this.selectedVerse = null;
            this.isSearchMode = false;
            this.updateClearBtnVisibility();
            this.updateUrl({ view: 'verses', verses: undefined });
            this.renderActiveWords();
            this.showSearchRecovery(this.searchInput ? this.searchInput.value : '', 'verses');
            this.buildVersesGraph();
            return;
        }

        this.closeSearchRecovery();
        this.searchedVerses = records.map(r => r.id);
        this.drawerVerses = [...this.searchedVerses];

        if (!this.selectedVerse || !records.some(r => r.id === this.selectedVerse.id)) {
            this.selectedVerse = records[0];
        } else {
            this.selectedVerse = records.find(r => r.id === this.selectedVerse.id);
        }
        this.isSearchMode = true;
        this.userInteracted = false;
        this._nodesBounds = null;

        this.searchInput.value = foundVerses.map(r => formatVerseRef(r)).join(", ");
        this.updateClearBtnVisibility();

        if (this.searchedVerses && this.searchedVerses.length > 0) {
            this.updateUrl({ view: 'verses', verses: this.searchedVerses.join(',') });
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
            let meta = parseVerseMeta(v);
            let genre = getVerseGenre(id);
            let testament = getVerseTestament(id);
            return {
                id: v.id,
                ref: v.id,
                formattedRef: formatVerseRef(v.id),
                w: formatVerseRef(v.id),
                b: meta.b,
                c: meta.c,
                v: meta.v,
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
                let crId = getNeighborId(cr);
                let crSim = getNeighborSim(cr);
                if (landmarkSet.has(crId) && n.id < crId && nodeMap.has(crId)) {
                    this.links.push({
                        source: n,
                        target: nodeMap.get(crId),
                        type: 'verse-crossref',
                        sim: crSim
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
        let scale = 0.90 / Math.max(dx / cw, dy / ch);

        this.transform = d3.zoomIdentity.translate(cw / 2 - scale * cx, ch / 2 - scale * cy).scale(scale);
        d3.select(this.canvas).call(this.zoom.transform, this.transform);

        this._nodesBounds = { minX, maxX, minY, maxY };
        this.userInteracted = false;
        this.draw();
        this.updateZoomExtentsVisibility();
    }

    buildVersesConstellation(foundVerses) {
        if (this.simulation) this.simulation.stop();
        if (this.spawnInterval) {
            clearInterval(this.spawnInterval);
            this.spawnInterval = null;
        }
        if (!foundVerses || foundVerses.length === 0) return;

        let primaryNodes = foundVerses.map((v, idx) => {
            let meta = parseVerseMeta(v);
            let node = {
                id: v.id,
                ref: v.id,
                formattedRef: formatVerseRef(v.id),
                w: formatVerseRef(v.id),
                b: meta.b,
                c: meta.c,
                v: meta.v,
                genre: getVerseGenre(v.id),
                testament: getVerseTestament(v.id),
                t: getVerseTestament(v.id),
                x: 0,
                y: 0,
                isVerse: true,
                isFocusedVerse: true,
                isKw: true,
                sim: 1.0,
                normSim: 1.0,
                r: v.r,
                words: v.w
            };
            if (foundVerses.length === 1) {
                node.fx = 0;
                node.fy = 0;
            } else {
                const angle = (idx / foundVerses.length) * Math.PI * 2;
                const r = 80;
                node.x = Math.cos(angle) * r;
                node.y = Math.sin(angle) * r;
            }
            return node;
        });

        let primaryIds = new Set(primaryNodes.map(n => n.id));

        if (this.verseViewMode === 'refs') {
            let limit = this.verseRefsPerVerse || 16;
            let crossrefMap = new Map();
            let crossrefLinks = [];

            // Cross links among primary verses
            for (let i = 0; i < primaryNodes.length; i++) {
                for (let j = i + 1; j < primaryNodes.length; j++) {
                    let n1 = primaryNodes[i];
                    let n2 = primaryNodes[j];
                    let cr = (n1.r || []).find(r => getNeighborId(r) === n2.id);
                    let sim = cr ? getNeighborSim(cr) : 0.7;
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
                    let crId = getNeighborId(cr);
                    let crSim = getNeighborSim(cr);
                    if (!crId || primaryIds.has(crId)) return;
                    let crRecord = this.versemapLookup ? this.versemapLookup.get(crId) : null;
                    if (!crRecord) return;

                    if (!crossrefMap.has(crId)) {
                        crossrefMap.set(crId, {
                            record: crRecord,
                            maxSim: crSim,
                            sourceVerse: v.id,
                            linkedVerses: [v.id]
                        });
                    } else {
                        let item = crossrefMap.get(crId);
                        if (!item.linkedVerses.includes(v.id)) item.linkedVerses.push(v.id);
                        if (crSim > item.maxSim) {
                            item.maxSim = crSim;
                            item.sourceVerse = v.id;
                        }
                    }

                    crossrefLinks.push({
                        source: crId,
                        target: v.id,
                        type: 'verse-crossref',
                        sim: crSim
                    });
                });
            });

            let crossrefNodes = Array.from(crossrefMap.values()).map(item => {
                let v = item.record;
                let meta = parseVerseMeta(v);
                let genre = getVerseGenre(v.id);
                let testament = getVerseTestament(v.id);
                return {
                    id: v.id,
                    ref: v.id,
                    formattedRef: formatVerseRef(v.id),
                    w: formatVerseRef(v.id),
                    b: meta.b,
                    c: meta.c,
                    v: meta.v,
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
            this.transform = d3.zoomIdentity.translate(this.getInitialCameraCenterX(), ch / 2).scale(1);
            d3.select(this.canvas).call(this.zoom.transform, this.transform);

            const LCG = d3.randomLcg(42);
            this.simulation = d3.forceSimulation(this.nodes)
                .randomSource(LCG)
                .velocityDecay(0.45)
                .force("link", d3.forceLink(this.links).id(d => d.id).distance(d => {
                    return Math.max(65, (1 - (d.sim || 0.8)) * 320);
                }).strength(0.85))
                .force("charge", d3.forceManyBody().strength(d => d.isFocusedVerse ? -360 : -85))
                .force("collide", d3.forceCollide().radius(d => d.isFocusedVerse ? 30 : 18))
                .force("center", d3.forceCenter(0, 0).strength(0.04))
                .on("tick", () => {
                    this.updateDynamicZoom();
                    this.draw();
                });

            if (primaryNodes.length > 1) {
                for (let i = 0; i < 40; i++) {
                    this.simulation.tick();
                }
                primaryNodes.forEach(p => {
                    p.fx = p.x;
                    p.fy = p.y;
                });
            }
        } else {
            // Words constellation view
            let wordMap = new Map();
            let wordLinks = [];

            let wordLimit = this.verseWordsPerVerse || 6;
            foundVerses.forEach(v => {
                let topWords = (v.w || []).slice(0, wordLimit);
                topWords.forEach(wId => {
                    let { word: w, pos } = this.parseWordId(wId);
                    let fullPoint = this.data2d ? this.data2d.find(d => d.id === wId) : null;
                    if (fullPoint) { w = fullPoint.w; pos = fullPoint.pos; }
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

            let wordNodes = Array.from(wordMap.values()).map((w, idx) => {
                const angle = idx * 2.399963;
                const r = 55 + (Math.random() - 0.5) * 6;
                return {
                    ...w,
                    x: Math.cos(angle) * r,
                    y: Math.sin(angle) * r
                };
            });

            this.nodes = [...primaryNodes, ...wordNodes];
            this.links = wordLinks;
            this.allSearchNodes = this.nodes;
            this.allSearchLinks = this.links;

            this.renderActiveWords();

            let cw = this.logicalWidth || 800;
            let ch = this.logicalHeight || 600;
            this.transform = d3.zoomIdentity.translate(this.getInitialCameraCenterX(), ch / 2).scale(1);
            d3.select(this.canvas).call(this.zoom.transform, this.transform);

            const LCG = d3.randomLcg(42);
            this.simulation = d3.forceSimulation(this.nodes)
                .randomSource(LCG)
                .velocityDecay(0.45)
                .force("link", d3.forceLink(this.links).id(d => d.id).distance(55).strength(0.8))
                .force("charge", d3.forceManyBody().strength(d => d.isFocusedVerse ? -380 : -50))
                .force("collide", d3.forceCollide().radius(d => d.isFocusedVerse ? 30 : 14))
                .force("center", d3.forceCenter(0, 0).strength(0.04))
                .on("tick", () => {
                    this.updateDynamicZoom();
                    this.draw();
                });

            if (primaryNodes.length > 1) {
                for (let i = 0; i < 40; i++) {
                    this.simulation.tick();
                }
                primaryNodes.forEach(p => {
                    p.fx = p.x;
                    p.fy = p.y;
                });
            }
        }

        if (window.innerWidth <= 768) {
            this.selectedVerse = this.selectedVerse || foundVerses[0];
            this.hideVerseCard();
        } else {
            this.showVerseCard(this.selectedVerse || foundVerses[0], foundVerses);
        }
    }

    showVerseCard(verse, allActiveVerses = null) {
        if (!this.verseCard || !verse) return;
        if (this.versemapLookup && this.versemapLookup.has(verse.id)) {
            verse = this.versemapLookup.get(verse.id);
        }

        if (!this.verses && this.versesPromise) {
            this.versesPromise.then(vData => {
                if (vData && vData.verses) {
                    this.verses = vData.verses;
                    if (this.selectedVerse && this.selectedVerse.id === verse.id && this.verseCard.classList.contains('visible')) {
                        this.showVerseCard(verse, allActiveVerses);
                    }
                }
            });
        }

        if (window.innerWidth <= 768) {
            this.closeDrawer();
        }
        this.hideWordInspector();
        this.hideBookCard();
        this.hideChapterCard();
        this.hideRadialMenu();
        this.selectedVerse = verse;

        let genre = getVerseGenre(verse.id);
        let testament = getVerseTestament(verse.id);
        let genreColor = GENRE_COLORS[genre] || '#3b82f6';
        let formattedRef = formatVerseRef(verse.id);

        let adjVerse = this.getAdjacentVerses(verse.id);
        let prevVerse = adjVerse.prev;
        let nextVerse = adjVerse.next;

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
        let greekText = this.verseGreekMap ? (this.verseGreekMap.get(verse.id) || '') : '';
        if (!greekText && /[\u0370-\u03ff\u1f00-\u1fff]/.test(verseText) && !/[a-zA-Z]{3,}/.test(verseText)) {
            greekText = verseText;
            verseText = '';
        }

        let activeKws = [];
        let origLemmas = [];
        if (this.viewMode === 'words' && Array.isArray(this.searchedWords)) {
            for (const sId of this.searchedWords) {
                if (!sId) continue;
                const parsed = this.parseWordId(sId);
                if (parsed && parsed.word && !activeKws.includes(parsed.word)) {
                    activeKws.push(parsed.word);
                }
                let sNode = (this.allSearchNodes && this.allSearchNodes.find(n => n.id === sId))
                    || (this.data2d && this.data2d.find(d => d.id === sId));
                if (sNode && sNode.original && Array.isArray(sNode.original)) {
                    sNode.original.forEach(o => {
                        if (o.lemma && !origLemmas.includes(o.lemma)) origLemmas.push(o.lemma);
                    });
                }
            }
        }

        let crossrefsList = Array.isArray(verse.r) ? verse.r : [];
        let crossrefsHtml = crossrefsList.slice(0, 16).map(cr => {
            let crId = getNeighborId(cr);
            let crSim = getNeighborSim(cr);
            let crFormatted = formatVerseRef(crId);
            let crGenre = getVerseGenre(crId);
            let crGenreColor = GENRE_COLORS[crGenre] || '#3b82f6';
            let crText = this.verseTextMap ? (this.verseTextMap.get(crId) || '') : '';
            let crGreek = this.verseGreekMap ? (this.verseGreekMap.get(crId) || '') : '';
            let isExpandable = crText.length > 110 || Boolean(crGreek);
            let snippet = crText.length > 110 ? crText.slice(0, 107) + '...' : crText;
            let snippetHtml = (activeKws.length > 0 && snippet) ? this.highlightKeywordsInVerse(snippet, activeKws) : escapeHtml(snippet);
            let crGreekHtml = (origLemmas.length > 0 && crGreek) ? this.highlightOriginalKeywordsInVerse(crGreek, origLemmas) : escapeHtml(crGreek);
            let pct = Math.round((crSim || 0.8) * 100);
            let isAlreadyActive = Boolean(this.searchedVerses && this.searchedVerses.includes(crId));
            let crActionHtml = this.renderPillToggle({
                isActive: isAlreadyActive,
                dataAttrs: {
                    'toggle-verse': crId
                },
                title: isAlreadyActive ? 'Remove verse from map' : 'Add verse to map'
            });
            return `
                <div class="bwm-crossref-card" data-cr-id="${crId}">
                    <div class="bwm-crossref-head">
                        <div class="bwm-crossref-title-wrap">
                            <span class="bwm-crossref-ref" data-focus-verse="${crId}" title="Focus this verse">${crFormatted}</span>
                            <span class="bwm-book-badge" style="background:${crGenreColor};">${crGenre}</span>
                        </div>
                        <div style="display:flex;align-items:center;gap:6px;">
                            <span class="bwm-crossref-badge" title="100D Vector Cosine Similarity">${pct}% match</span>
                            ${crActionHtml}
                            ${isExpandable ? `
                            <button type="button" class="bwm-verse-expand-btn" data-action="expand-crossref" aria-expanded="false" title="Expand full verse">
                                <svg class="bwm-chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                            </button>` : ''}
                        </div>
                    </div>
                    ${snippet ? `
                    <div class="bwm-crossref-body">
                        <div class="bwm-crossref-snippet" data-snippet="${escapeHtml(snippet)}" data-full="${escapeHtml(crText)}">${snippetHtml}</div>
                        ${crGreek ? `<div class="bwm-crossref-original" style="display:none;">${crGreekHtml}</div>` : ''}
                    </div>` : ''}
                </div>
            `;
        }).join('');

        let wordList = Array.isArray(verse.words) ? verse.words : (Array.isArray(verse.w) ? verse.w : []);
        let wordsHtml = wordList.map(wId => {
            let { word: w, pos } = this.parseWordId(wId);
            let posColor = '#94a3b8';
            if (pos === 'PROPN') posColor = '#4ade80';
            else if (pos === 'NOUN') posColor = '#60a5fa';
            else if (pos === 'VERB') posColor = '#f472b6';
            else if (pos === 'ADJ' || pos === 'ADV') posColor = '#fbbf24';
            let displayW = this.formatWord(w, pos);
            return `<span class="bwm-book-chip" style="border-left: 3px solid ${posColor};" title="Constituent content word"><b>${displayW}</b> <span style="opacity:0.5;font-size:0.8em;">(${pos ? pos.toLowerCase() : ''})</span></span>`;
        }).join('');

        let verseTextDisplay = (activeKws.length > 0 && verseText) ? this.highlightKeywordsInVerse(verseText, activeKws) : escapeHtml(verseText);
        let greekTextDisplay = (origLemmas.length > 0 && greekText) ? this.highlightOriginalKeywordsInVerse(greekText, origLemmas) : escapeHtml(greekText);

        let isAlreadyActive = Boolean(this.searchedVerses && this.searchedVerses.includes(verse.id));
        let verseActionHtml = this.renderPillToggle({
            isActive: isAlreadyActive,
            id: 'bwm-verse-action-toggle',
            dataAttrs: {
                'toggle-verse': verse.id
            },
            title: isAlreadyActive ? 'Remove verse from map' : 'Add verse to map'
        });

        this.verseCard.innerHTML = `
            <div class="bwm-sheet-handle"></div>
            ${tabsHtml}
            <div class="bwm-window-header">
                <div class="bwm-window-header-top">
                    <div class="bwm-window-title-group">
                        <div style="display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap;">
                            <h3 class="bwm-window-title" style="margin: 0;">${formattedRef}</h3>
                            <span class="bwm-book-badge" style="background:${genreColor};">${genre}</span>
                            <span class="bwm-window-badge-muted">${testament === 'OT' ? 'Old Testament' : 'New Testament'}</span>
                        </div>
                        <div class="bwm-verse-nav-controls" style="display: flex; align-items: center; gap: 4px; margin-top: 4px;">
                            <button type="button" class="bwm-verse-nav-chevron" id="bwm-verse-prev-btn" title="${prevVerse ? `Previous: ${formatVerseRef(prevVerse)}` : 'First verse'}" ${!prevVerse ? 'disabled' : ''} aria-label="Previous verse">
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="15 18 9 12 15 6"></polyline>
                                </svg>
                            </button>
                            <span class="bwm-verse-nav-current">${formattedRef}</span>
                            <button type="button" class="bwm-verse-nav-chevron" id="bwm-verse-next-btn" title="${nextVerse ? `Next: ${formatVerseRef(nextVerse)}` : 'Last verse'}" ${!nextVerse ? 'disabled' : ''} aria-label="Next verse">
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 6px; flex-shrink: 0;">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            ${verseActionHtml}
                            ${this.renderPinButton('study')}
                            <button type="button" class="bwm-window-close" id="bwm-verse-card-close" title="Dismiss">&times;</button>
                        </div>
                        <button type="button" class="bwm-window-pill bwm-btn-read-chapter-top" id="bwm-btn-read-chapter-top" title="Read entire chapter verse-by-verse">
                            <span>Read Chapter</span>
                            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div class="bwm-window-body">
                ${(verseText || greekText) ? `
                <div class="bwm-verse-text-box">
                    <div class="bwm-verse-text-header">
                        <span style="font-size:0.7em; font-weight:600; text-transform:uppercase; letter-spacing:0.05em; opacity:0.65;">${verseText ? 'English Translation' : (this.foundation === 'vul' ? 'Latin Clementine Vulgate' : 'Septuagint / Greek NT')}</span>
                        ${(verseText && greekText) ? `<button type="button" class="bwm-window-pill ${this.showGreekOriginal ? 'active' : ''}" id="bwm-btn-toggle-greek" style="font-size:0.7em; padding:2px 8px; cursor:pointer;" title="Toggle ${this.foundation === 'vul' ? 'Latin Vulgate' : 'Greek original'} text">${this.foundation === 'vul' ? 'Latin Vulgate' : 'Greek Original'}</button>` : ''}
                    </div>
                    ${verseText ? `<div class="bwm-verse-english-text">${verseTextDisplay}</div>` : ''}
                    ${greekText ? `
                    <div class="bwm-verse-greek-box" id="bwm-verse-greek-box" style="display: ${(this.showGreekOriginal || !verseText) ? 'block' : 'none'};">
                        ${verseText ? `<div class="bwm-verse-greek-label">${this.foundation === 'vul' ? 'Clementine Latin Vulgate' : 'Septuagint / Greek NT'}</div>` : ''}
                        <div class="bwm-verse-greek-text">${greekTextDisplay}</div>
                    </div>` : ''}
                </div>` : ''}
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
                <div class="bwm-book-card-actions" style="margin-top: 16px; flex-wrap: wrap; gap: 8px;">
                    <button type="button" class="bwm-window-pill" id="bwm-btn-read-chapter" title="Read entire chapter verse-by-verse">
                        Read Chapter
                    </button>
                    <button type="button" class="bwm-window-pill" id="bwm-btn-explore-book" title="Explore entire book">
                        Explore Book
                    </button>
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
        if (this.isStudyPanelPinned) {
            this.verseCard.classList.add('pinned');
        }
        this.onStudyPanelVisibilityChange(true);

        let closeBtn = this.verseCard.querySelector('#bwm-verse-card-close');
        if (closeBtn) closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (this.isStudyPanelPinned) this.unpinStudyPanel();
            this.hideVerseCard();
        });

        // Previous / Next verse navigation chevrons and swipe
        let prevBtn = this.verseCard.querySelector('#bwm-verse-prev-btn');
        if (prevBtn && prevVerse) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                let target = this.versemapLookup ? this.versemapLookup.get(prevVerse) : { id: prevVerse };
                if (!target) target = { id: prevVerse };
                let nextActive = (allActiveVerses && allActiveVerses.some(v => v.id === prevVerse)) ? allActiveVerses : [target];
                this.showVerseCard(target, nextActive);
            });
        }

        let nextBtn = this.verseCard.querySelector('#bwm-verse-next-btn');
        if (nextBtn && nextVerse) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                let target = this.versemapLookup ? this.versemapLookup.get(nextVerse) : { id: nextVerse };
                if (!target) target = { id: nextVerse };
                let nextActive = (allActiveVerses && allActiveVerses.some(v => v.id === nextVerse)) ? allActiveVerses : [target];
                this.showVerseCard(target, nextActive);
            });
        }

        this.verseCard._swipePrev = () => {
            if (prevVerse) {
                let target = this.versemapLookup ? this.versemapLookup.get(prevVerse) : { id: prevVerse };
                if (!target) target = { id: prevVerse };
                let nextActive = (allActiveVerses && allActiveVerses.some(v => v.id === prevVerse)) ? allActiveVerses : [target];
                this.showVerseCard(target, nextActive);
            }
        };
        this.verseCard._swipeNext = () => {
            if (nextVerse) {
                let target = this.versemapLookup ? this.versemapLookup.get(nextVerse) : { id: nextVerse };
                if (!target) target = { id: nextVerse };
                let nextActive = (allActiveVerses && allActiveVerses.some(v => v.id === nextVerse)) ? allActiveVerses : [target];
                this.showVerseCard(target, nextActive);
            }
        };

        const handleReadChapter = (e) => {
            e.stopPropagation();
            let meta = parseVerseMeta(verse);
            let chapterCode = `${meta.b}.${meta.c}`;
            this.setViewMode('chapters');
            this.selectChapter(chapterCode, false);
            this.showChapterCard(chapterCode, verse.id);
        };

        let readChapterBtn = this.verseCard.querySelector('#bwm-btn-read-chapter');
        if (readChapterBtn) {
            readChapterBtn.addEventListener('click', handleReadChapter);
        }
        let readChapterTopBtn = this.verseCard.querySelector('#bwm-btn-read-chapter-top');
        if (readChapterTopBtn) {
            readChapterTopBtn.addEventListener('click', handleReadChapter);
        }

        let exploreBookBtn = this.verseCard.querySelector('#bwm-btn-explore-book');
        if (exploreBookBtn) {
            exploreBookBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                let meta = parseVerseMeta(verse);
                this.setViewMode('books');
                if (this.searchInput) this.searchInput.value = meta.b;
                this.searchBooks();
            });
        }

        let toggleGreekBtn = this.verseCard.querySelector('#bwm-btn-toggle-greek');
        let greekBox = this.verseCard.querySelector('#bwm-verse-greek-box');
        if (toggleGreekBtn && greekBox) {
            toggleGreekBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.showGreekOriginal = !this.showGreekOriginal;
                if (this.showGreekOriginal) {
                    toggleGreekBtn.classList.add('active');
                    greekBox.style.display = 'block';
                } else {
                    toggleGreekBtn.classList.remove('active');
                    greekBox.style.display = 'none';
                }
            });
        }

        let dismissBtn = this.verseCard.querySelector('#bwm-btn-dismiss-verse-card');
        if (dismissBtn) dismissBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (this.isStudyPanelPinned) this.unpinStudyPanel();
            this.hideVerseCard();
        });

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

        // Expand/collapse cross-reference verse text in place
        let crList = this.verseCard.querySelector('.bwm-crossref-list');
        if (crList) {
            crList.addEventListener('click', (e) => {
                let expandBtn = e.target.closest('.bwm-verse-expand-btn[data-action="expand-crossref"]');
                if (!expandBtn) return;
                e.stopPropagation();
                e.preventDefault();
                let card = expandBtn.closest('.bwm-crossref-card');
                if (!card) return;
                let snippetEl = card.querySelector('.bwm-crossref-snippet');
                let origEl = card.querySelector('.bwm-crossref-original');
                let isExpanded = expandBtn.classList.contains('is-expanded');
                if (isExpanded) {
                    expandBtn.classList.remove('is-expanded');
                    expandBtn.setAttribute('aria-expanded', 'false');
                    expandBtn.setAttribute('title', 'Expand full verse');
                    if (snippetEl) snippetEl.textContent = snippetEl.getAttribute('data-snippet') || '';
                    if (origEl) origEl.style.display = 'none';
                } else {
                    expandBtn.classList.add('is-expanded');
                    expandBtn.setAttribute('aria-expanded', 'true');
                    expandBtn.setAttribute('title', 'Collapse verse');
                    if (snippetEl) snippetEl.textContent = snippetEl.getAttribute('data-full') || '';
                    if (origEl) origEl.style.display = 'block';
                }
            });
        }

        // Add/remove verse toggle click listener -> adds/removes verse to/from map
        let toggleBtns = this.verseCard.querySelectorAll('.bwm-pill-toggle[data-toggle-verse]');
        toggleBtns.forEach(toggle => {
            this.setupPillToggleListener(toggle, (nextActive) => {
                let ref = toggle.getAttribute('data-toggle-verse');
                if (!ref) return;
                if (nextActive) {
                    this.addVerse(ref);
                } else {
                    this.removeVerse(ref);
                }
                this.syncVerseToggles(ref, nextActive);
            });
        });
    }

    hideVerseCard() {
        if (this.verseCard) {
            this.verseCard.classList.remove('visible', 'pinned');
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
        this.onStudyPanelVisibilityChange(false);
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
        this.syncVerseToggles(ref, true);
        this.searchVerses(true);
    }

    removeVerse(ref) {
        if (!this.searchedVerses) return;
        this.searchedVerses = this.searchedVerses.filter(r => r !== ref);
        this.drawerVerses = this.drawerVerses.filter(r => r !== ref);
        this.syncVerseToggles(ref, false);
        if (this.searchedVerses.length === 0) {
            this.clearAllKeywords();
        } else {
            if (this.selectedVerse && this.selectedVerse.id === ref) {
                let remaining = this.searchedVerses.map(id => this.versemapLookup ? this.versemapLookup.get(id) : null).filter(Boolean);
                this.selectedVerse = remaining.length > 0 ? remaining[0] : null;
            }
            this.searchVerses(true);
        }
    }

    resetVersesView() {
        this.closeSearchRecovery();
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
        this.querySelectorAll('.bwm-pill-toggle[data-toggle-verse], #bwm-verse-action-toggle').forEach(t => {
            t.classList.remove('is-active');
            t.setAttribute('aria-checked', 'false');
            t.title = 'Add verse to map';
        });
        this.updateClearBtnVisibility();
        this.renderActiveWords();
        this.hideRadialMenu();
        this.hideVersesPanel();
        this.hideCanonUsageModal();
        this.hideVerseCard();
        this.hideWordInspector();
        this.hideBookCard();
        this.hideChapterCard();
        if (this.isStudyPanelPinned) this.unpinStudyPanel();
        this.inspectorNode = null;
        this.hoveredNode = null;
        if (this.verseReopenBtn) this.verseReopenBtn.style.display = 'none';
        if (this.reopenBtn) this.reopenBtn.style.display = 'none';
        this.updateUrl({ view: 'verses' });
        this.buildVersesGraph();
    }

    matchesTestament(t) {
        if (!this.testamentFilter || this.testamentFilter === 'all') return true;
        if (this.testamentFilter === 'ot') return t === 'OT' || t === 'Both';
        if (this.testamentFilter === 'nt') return t === 'NT' || t === 'Both';
        if (this.testamentFilter === 'both') return t === 'Both';
        return true;
    }

    isKeyNode(node) {
        if (!node) return false;
        if (node.isKw) return true;
        if (this.viewMode === 'chapters') {
            return Boolean(node.isPrimary || (this.searchedChapters && (this.searchedChapters.includes(node.id) || this.searchedChapters.includes(node.ref))));
        }
        if (this.viewMode === 'verses') {
            return Boolean(node.isPrimary || (this.searchedVerses && this.searchedVerses.includes(node.id)));
        }
        if (this.viewMode === 'books') {
            return Boolean(node.isPrimary || (this.searchedBooks && (this.searchedBooks.includes(node.code) || this.searchedBooks.includes(node.id))));
        }
        return Boolean(this.isSearchMode && this.searchedWords && this.searchedWords.includes(node.id));
    }

    draw() {
        if (!this.ctx || (!this.data2d && !this.booksData && !this.versemapData && !this.chaptersData)) return;
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
            if (n.isChapter) {
                pixelR = n.isFocusedChapter ? 26 : 18;
            } else if (n.isChapterVerse) {
                pixelR = 12;
            } else if (n.isChapterWord) {
                pixelR = Math.max(4, Math.min(10, Math.sqrt(n.f || 1) * 0.8));
            } else if (n.isVerse) {
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
            
            if (l.type === 'chapter-crossref') {
                let sim = (l.sim !== undefined) ? l.sim : 0.8;
                this.ctx.strokeStyle = this.colors.nodeHover || '#2563eb';
                this.ctx.lineWidth = Math.max(1.2, sim * 2.8) / this.transform.k;
                this.ctx.globalAlpha = Math.max(0.35, sim * 0.85);
            } else if (l.type === 'chapter-verse') {
                let sim = (l.sim !== undefined) ? l.sim : 0.8;
                this.ctx.strokeStyle = this.colors.nodeHover || '#2563eb';
                this.ctx.lineWidth = Math.max(1.2, sim * 2.5) / this.transform.k;
                this.ctx.globalAlpha = Math.max(0.35, sim * 0.8);
            } else if (l.type === 'chapter-word') {
                this.ctx.strokeStyle = this.colors.linkDir;
                this.ctx.lineWidth = 1.3 / this.transform.k;
                this.ctx.globalAlpha = 0.55;
            } else if (l.type === 'verse-crossref') {
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
            
            if (l.spawnTime) {
                let linkAge = performance.now() - l.spawnTime;
                if (linkAge < 250) {
                    this.ctx.globalAlpha *= Math.min(1, Math.max(0.05, linkAge / 250));
                }
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
        
        // Draw percentage labels along connecting lines (rotated along line direction)
        if (this.links && this.links.length > 0 && this.similarityLabelsMode !== 'off') {
            let linksToLabel = new Set();

            if (this.similarityLabelsMode === 'all') {
                this.links.forEach(l => {
                    if (!l.source || !l.target || l.source.x === undefined || l.target.x === undefined) return;
                    if (l.type === 'verse-word' || l.type === 'chapter-word') return;
                    let matchSource = this.matchesTestament(l.source.t || l.source.testament);
                    let matchTarget = this.matchesTestament(l.target.t || l.target.testament);
                    if (!matchSource || !matchTarget) return;
                    linksToLabel.add(l);
                });
            } else if (this.similarityLabelsMode === 'hover' && this.hoveredNode) {
                let hoveredIsKey = this.isKeyNode(this.hoveredNode);
                this.links.forEach(l => {
                    if (!l.source || !l.target || l.source.x === undefined || l.target.x === undefined) return;
                    if (l.type === 'verse-word' || l.type === 'chapter-word') return;
                    let matchSource = this.matchesTestament(l.source.t || l.source.testament);
                    let matchTarget = this.matchesTestament(l.target.t || l.target.testament);
                    if (!matchSource || !matchTarget) return;
                    if (l.source === this.hoveredNode || l.target === this.hoveredNode) {
                        if (hoveredIsKey) {
                            let other = (l.source === this.hoveredNode) ? l.target : l.source;
                            if (this.isKeyNode(other) || l.type === 'kw-kw' || l.type === 'book-book' || l.type === 'verse-crossref' || l.type === 'chapter-crossref' || l.type === 'chapter-verse') {
                                linksToLabel.add(l);
                            }
                        } else {
                            linksToLabel.add(l);
                        }
                    }
                });
            }

            linksToLabel.forEach(l => {
                if (!l.source || !l.target || l.source.x === undefined || l.target.x === undefined) return;
                if (l.type === 'verse-word' || l.type === 'chapter-word') return;
                let sNode = (typeof l.source === 'object' && l.source !== null) ? l.source : (this.nodes ? this.nodes.find(n => n.id === l.source) : null);
                let tNode = (typeof l.target === 'object' && l.target !== null) ? l.target : (this.nodes ? this.nodes.find(n => n.id === l.target) : null);
                let sVec = (sNode && Array.isArray(sNode.v)) ? sNode.v : (this.data2d ? ((this.data2d.find(d => d.id === (sNode ? sNode.id : l.source)) || {}).v) : null);
                let tVec = (tNode && Array.isArray(tNode.v)) ? tNode.v : (this.data2d ? ((this.data2d.find(d => d.id === (tNode ? tNode.id : l.target)) || {}).v) : null);

                let sim = 0;
                if (Array.isArray(sVec) && Array.isArray(tVec)) {
                    sim = this.cosineSimilarity(sVec, tVec);
                } else if (typeof l.sim === 'number' && l.sim > 0) {
                    sim = l.sim;
                } else if (sNode && typeof sNode.sim === 'number' && sNode.sim > 0) {
                    sim = sNode.sim;
                } else if (tNode && typeof tNode.sim === 'number' && tNode.sim > 0) {
                    sim = tNode.sim;
                }
                if (!sim || isNaN(sim) || !isFinite(sim) || sim <= 0 || sim >= 0.9999) return;

                let dx = l.target.x - l.source.x;
                let dy = l.target.y - l.source.y;
                let dist = Math.sqrt(dx * dx + dy * dy);

                // Avoid rendering label if endpoints are too close or within node bubbles on screen
                let sourceR = l.source.canvasR || 6;
                let targetR = l.target.canvasR || 6;
                let textScale = this.mapTextScale || 1.0;
                let screenGap = (dist - sourceR - targetR) * this.transform.k;
                if (screenGap < (18 * Math.min(textScale, 1.25))) return;

                let isHovered = Boolean(this.hoveredNode && (l.source === this.hoveredNode || l.target === this.hoveredNode));
                let pctStr = (sim * 100).toFixed(2) + '%';
                let midX = (l.source.x + l.target.x) / 2;
                let midY = (l.source.y + l.target.y) / 2;

                // Rotate along line direction; keep upright (text reading left-to-right)
                let angle = Math.atan2(dy, dx);
                if (angle > Math.PI / 2) {
                    angle -= Math.PI;
                } else if (angle < -Math.PI / 2) {
                    angle += Math.PI;
                }

                this.ctx.save();
                this.ctx.translate(midX, midY);
                this.ctx.rotate(angle);
                this.ctx.scale(1 / this.transform.k, 1 / this.transform.k);

                let fontSize = 8.5 * textScale;
                this.ctx.font = `500 ${fontSize}px ${this.colors.font || 'sans-serif'}`;
                let tw = this.ctx.measureText(pctStr).width;
                let padX = 3.5 * textScale;
                let padY = 1.5 * textScale;
                let w = tw + padX * 2;
                let h = fontSize + padY * 2;
                let r = h / 2;

                this.ctx.beginPath();
                if (this.ctx.roundRect) {
                    this.ctx.roundRect(-w / 2, -h / 2, w, h, r);
                } else {
                    this.ctx.arc(-w / 2 + r, 0, r, Math.PI / 2, Math.PI * 1.5);
                    this.ctx.arc(w / 2 - r, 0, r, -Math.PI / 2, Math.PI / 2);
                    this.ctx.closePath();
                }

                this.ctx.fillStyle = this.colors.bg || '#ffffff';
                this.ctx.fill();

                this.ctx.lineWidth = 0.75;
                this.ctx.strokeStyle = isHovered ? (this.colors.nodeHover || '#2563eb') : (this.colors.border || 'rgba(148, 163, 184, 0.4)');
                this.ctx.stroke();

                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'middle';
                this.ctx.fillStyle = isHovered ? (this.colors.nodeHover || '#2563eb') : (this.colors.textMuted || '#64748b');
                this.ctx.fillText(pctStr, 0, 0.5);

                this.ctx.restore();
            });
        }
        
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
            let matchesT = this.matchesTestament(n.t || n.testament) || isHighlighted || n.isFocusedBook || n.isFocusedVerse || n.isFocusedChapter;
            
            this.ctx.beginPath();
            
            let posColor = '#94a3b8'; // default slate-400
            if (n.isChapter) {
                posColor = GENRE_COLORS[n.genre] || '#3b82f6';
            } else if (n.isChapterVerse) {
                posColor = GENRE_COLORS[n.genre] || '#3b82f6';
            } else if (n.isVerse) {
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
            
            if (n.isChapter) {
                this.ctx.globalAlpha = matchesT ? 1.0 : 0.1;
            } else if (n.isVerse) {
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
            
            if (n.spawnTime) {
                let nodeAge = performance.now() - n.spawnTime;
                if (nodeAge < 250) {
                    this.ctx.globalAlpha *= Math.min(1, Math.max(0.05, nodeAge / 250));
                }
            }
            
            let drawR = n.canvasR;
            if (isHighlighted) {
                drawR = n.canvasR * (n.isBook ? 1.2 : ((n.isVerse || n.isChapter) ? 1.25 : 1.4));
                this.ctx.shadowBlur = (n.isBook ? 16 : ((n.isVerse || n.isChapter) ? 18 : 12)) / this.transform.k;
                this.ctx.shadowColor = posColor;
            } else if (n.isVerse && n.isFocusedVerse) {
                this.ctx.shadowBlur = 16 / this.transform.k;
                this.ctx.shadowColor = posColor;
            } else if (n.isChapter && n.isFocusedChapter) {
                this.ctx.shadowBlur = 18 / this.transform.k;
                this.ctx.shadowColor = posColor;
            } else {
                this.ctx.shadowBlur = 0;
            }
            
            if (!matchesT) {
                drawR = drawR * 0.75;
            }
            
            this.ctx.arc(n.x, n.y, drawR, 0, 2 * Math.PI);
            this.ctx.fill();
            
            if (n.isChapter) {
                this.ctx.lineWidth = (n.isFocusedChapter ? 3.5 : 2) / this.transform.k;
                this.ctx.strokeStyle = n.isFocusedChapter ? '#ffffff' : (isHighlighted ? this.colors.text : 'rgba(255,255,255,0.7)');
                this.ctx.stroke();
            } else if (n.isChapterVerse) {
                this.ctx.lineWidth = 1.8 / this.transform.k;
                this.ctx.strokeStyle = isHighlighted ? this.colors.text : 'rgba(255,255,255,0.7)';
                this.ctx.stroke();
            } else if (n.isVerse) {
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
            
            let labelAlpha = 1.0;
            if (n.spawnTime) {
                let nodeAge = performance.now() - n.spawnTime;
                if (nodeAge < 250) {
                    labelAlpha = Math.min(1, Math.max(0.05, nodeAge / 250));
                }
            }
            this.ctx.globalAlpha = labelAlpha;
            
            let showLabel = n.isChapter || n.isChapterVerse || n.isVerse || n.isBook || (matchesT && (this.isSearchMode || n.isKw || autoShowLabels || n.isBookWord || n.isVerseWord || n.isChapterWord || isHighlighted));
            if (showLabel) {
                this.ctx.shadowBlur = 0;
                
                this.ctx.save();
                this.ctx.translate(n.x, n.y);
                this.ctx.scale(1 / this.transform.k, 1 / this.transform.k);
                
                let textScale = this.mapTextScale || 1.0;

                if (n.isChapter) {
                    let fontSize = (n.isFocusedChapter ? 14 : 11.5) * textScale;
                    this.ctx.font = `bold ${fontSize}px ${this.colors.font}`;
                    this.ctx.textAlign = "center";
                    this.ctx.textBaseline = "top";
                    let currentR = (isHighlighted) ? n.canvasR * 1.25 : n.canvasR;
                    let yOffset = (currentR * this.transform.k) + (3 * textScale);
                    let displayTitle = n.formattedRef || formatChapterRef(n.id);
                    
                    this.ctx.lineWidth = 3.5 * textScale;
                    this.ctx.strokeStyle = this.colors.bg;
                    this.ctx.strokeText(displayTitle, 0, yOffset);
                    
                    this.ctx.fillStyle = this.colors.text;
                    this.ctx.fillText(displayTitle, 0, yOffset);
                    
                    let subFontSize = 9 * textScale;
                    this.ctx.font = `${subFontSize}px ${this.colors.font}`;
                    let subOffset = yOffset + fontSize + (2 * textScale);
                    this.ctx.lineWidth = 2.5 * textScale;
                    this.ctx.strokeStyle = this.colors.bg;
                    this.ctx.strokeText(n.genre, 0, subOffset);
                    this.ctx.fillStyle = this.colors.textMuted || '#888888';
                    this.ctx.fillText(n.genre, 0, subOffset);
                } else if (n.isChapterVerse) {
                    let fontSize = 11 * textScale;
                    this.ctx.font = `bold ${fontSize}px ${this.colors.font}`;
                    this.ctx.textAlign = "center";
                    this.ctx.textBaseline = "top";
                    let currentR = (isHighlighted) ? n.canvasR * 1.25 : n.canvasR;
                    let yOffset = (currentR * this.transform.k) + (3 * textScale);
                    let displayTitle = n.formattedRef || formatVerseRef(n.id);
                    
                    this.ctx.lineWidth = 3.5 * textScale;
                    this.ctx.strokeStyle = this.colors.bg;
                    this.ctx.strokeText(displayTitle, 0, yOffset);
                    
                    this.ctx.fillStyle = this.colors.text;
                    this.ctx.fillText(displayTitle, 0, yOffset);
                } else if (n.isVerse) {
                    let fontSize = (n.isFocusedVerse ? 13 : 11) * textScale;
                    this.ctx.font = `bold ${fontSize}px ${this.colors.font}`;
                    this.ctx.textAlign = "center";
                    this.ctx.textBaseline = "top";
                    let currentR = (isHighlighted) ? n.canvasR * 1.25 : n.canvasR;
                    let yOffset = (currentR * this.transform.k) + (3 * textScale);
                    let displayTitle = n.formattedRef || formatVerseRef(n.id);
                    
                    this.ctx.lineWidth = 3.5 * textScale;
                    this.ctx.strokeStyle = this.colors.bg;
                    this.ctx.strokeText(displayTitle, 0, yOffset);
                    
                    this.ctx.fillStyle = this.colors.text;
                    this.ctx.fillText(displayTitle, 0, yOffset);
                    
                    let subFontSize = 9 * textScale;
                    this.ctx.font = `${subFontSize}px ${this.colors.font}`;
                    let subOffset = yOffset + fontSize + (2 * textScale);
                    this.ctx.lineWidth = 2.5 * textScale;
                    this.ctx.strokeStyle = this.colors.bg;
                    this.ctx.strokeText(n.genre, 0, subOffset);
                    this.ctx.fillStyle = this.colors.textMuted || '#888888';
                    this.ctx.fillText(n.genre, 0, subOffset);
                } else if (n.isBook) {
                    let fontSize = (n.isFocusedBook ? 15 : 12) * textScale;
                    this.ctx.font = `bold ${fontSize}px ${this.colors.font}`;
                    this.ctx.textAlign = "center";
                    this.ctx.textBaseline = "top";
                    let currentR = (isHighlighted) ? n.canvasR * 1.2 : n.canvasR;
                    let yOffset = (currentR * this.transform.k) + (3 * textScale);
                    
                    this.ctx.lineWidth = 3.5 * textScale;
                    this.ctx.strokeStyle = this.colors.bg;
                    this.ctx.strokeText(n.name, 0, yOffset);
                    
                    this.ctx.fillStyle = this.colors.text;
                    this.ctx.fillText(n.name, 0, yOffset);
                    
                    let subFontSize = 9 * textScale;
                    this.ctx.font = `${subFontSize}px ${this.colors.font}`;
                    let subOffset = yOffset + fontSize + (2 * textScale);
                    this.ctx.lineWidth = 2.5 * textScale;
                    this.ctx.strokeStyle = this.colors.bg;
                    this.ctx.strokeText(n.genre, 0, subOffset);
                    this.ctx.fillStyle = this.colors.textMuted || '#888888';
                    this.ctx.fillText(n.genre, 0, subOffset);
                } else {
                    let fontSize = (n.isKw ? 14 : 11) * textScale;
                    this.ctx.font = `${fontSize}px ${this.colors.font}`;
                    this.ctx.textAlign = "center";
                    this.ctx.textBaseline = "top";
                    let currentR = (isHighlighted) ? n.canvasR * 1.4 : n.canvasR;
                    let yOffset = (currentR * this.transform.k) + (2 * textScale);
                    
                    // Draw a solid halo background for the text to improve readability over layered lines/dots
                    this.ctx.lineWidth = 3 * textScale;
                    this.ctx.strokeStyle = this.colors.bg;
                    let displayW = this.formatWord(n.w, n.pos);
                    this.ctx.strokeText(displayW, 0, yOffset);
                    
                    this.ctx.fillStyle = this.colors.text;
                    this.ctx.fillText(displayW, 0, yOffset);
                    
                    // Show original language lemma in parentheses under English translation on LXX / VUL maps
                    let origLemma = (this.foundation === 'lxx' || this.foundation === 'vul') && n.original && n.original[0] && n.original[0].lemma ? n.original[0].lemma : '';
                    let hasDuplicate = (n.isKw && kwWordCounts[n.w.toLowerCase()] > 1) || (this.isSearchMode && nodeWordCounts[n.w.toLowerCase()] > 1);
                    
                    let subText = '';
                    if (origLemma && hasDuplicate && n.pos) {
                        subText = `(${origLemma} · ${n.pos.toLowerCase()})`;
                    } else if (origLemma) {
                        subText = `(${origLemma})`;
                    } else if (hasDuplicate && n.pos) {
                        subText = `(${n.pos.toLowerCase()})`;
                    }

                    if (subText) {
                        let posFontSize = (n.isKw ? 11 : 9) * textScale;
                        this.ctx.font = `${posFontSize}px ${this.colors.font}`;
                        let posOffset = yOffset + fontSize + (1 * textScale);
                        
                        this.ctx.lineWidth = 2.5 * textScale;
                        this.ctx.strokeStyle = this.colors.bg;
                        this.ctx.strokeText(subText, 0, posOffset);
                        
                        this.ctx.fillStyle = this.colors.nodeDef || '#888888';
                        this.ctx.fillText(subText, 0, posOffset);
                    }
                }
                
                this.ctx.restore();
            }
        });
        
        this.ctx.restore();
        if (this.radialMenuNode) {
            this.updateRadialMenuPosition();
        }
    }

    updateRadialMenuPosition() {
        if (!this.radialMenuNode || !this.radialMenu) return;
        let node = this.radialMenuNode;
        if (node.x === undefined || node.y === undefined) return;
        let [rawX, rawY] = this.transform.apply([node.x, node.y]);
        let canvasParent = this.canvas.parentElement;
        if (!canvasParent) return;
        let canvasRect = canvasParent.getBoundingClientRect();
        let container = this.querySelector('.bwm-container');
        if (!container) return;
        let containerRect = container.getBoundingClientRect();
        let offsetX = canvasRect.left - containerRect.left;
        let offsetY = canvasRect.top - containerRect.top;
        let screenX = rawX + offsetX;
        let screenY = rawY + offsetY;

        let items = this.radialMenu.querySelectorAll('.bwm-radial-item');
        if (items.length === 0) return;
        let nodeScreenR = (node.canvasR || 8) * this.transform.k;
        let baseRadius = items.length >= 5 ? 52 : (items.length >= 4 ? 48 : 45);
        let radius = Math.max(baseRadius, nodeScreenR + 26);
        let startAngle = -Math.PI / 2;
        let angleStep = (2 * Math.PI) / items.length;

        items.forEach((el, i) => {
            let angle = startAngle + i * angleStep;
            let ix = screenX + radius * Math.cos(angle) - 18;
            let iy = screenY + radius * Math.sin(angle) - 18;
            el.style.left = ix + 'px';
            el.style.top = iy + 'px';
            if (Math.sin(angle) > 0.2) {
                el.classList.add('pos-bottom');
            } else {
                el.classList.remove('pos-bottom');
            }
        });
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
            this.hoveredNode = null;
            this.draw();
            return;
        }

        let rect = this.canvas.getBoundingClientRect();
        let mouseX = e.clientX - rect.left;
        let mouseY = e.clientY - rect.top;

        if (this.isTouch && !this.touchTargetNode) {
            this.hoveredNode = null;
            this.hideRadialMenu();
            this.closeActiveInfoWindows();
            if (window.innerWidth <= 768) {
                this.closeDrawer();
            }
            this.draw();
            return;
        }

        let isDesktop = window.innerWidth > 768;
        if (isDesktop && this.radialMenuNode) {
            this.hideRadialMenu();
        }

        if (this.viewMode === 'verses') {
            if (this.hoveredNode) {
                if (this.hoveredNode.isVerse) {
                    if (e.shiftKey) {
                        this.addVerse(this.hoveredNode.id);
                    } else if (this.isSearchMode && this.searchedVerses && this.searchedVerses.length > 0) {
                        if (isDesktop) {
                            let targetVerse = this.versemapLookup ? (this.versemapLookup.get(this.hoveredNode.id) || this.hoveredNode) : this.hoveredNode;
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
                            if (!this.isStudyPanelPinned) {
                                this.hideWordInspector();
                            }
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
                this.closeActiveInfoWindows();
                if (window.innerWidth <= 768) {
                    this.closeDrawer();
                }
                this.hoveredNode = null;
                this.draw();
            }
            return;
        }

        if (this.viewMode === 'chapters') {
            if (this.hoveredNode) {
                if (this.hoveredNode.isChapter) {
                    if (e.shiftKey) {
                        this.addChapter(this.hoveredNode.id);
                    } else if (this.isSearchMode && this.searchedChapters && this.searchedChapters.length > 0) {
                        if (isDesktop) {
                            this.showChapterCard(this.hoveredNode.id);
                        } else {
                            if (this.radialMenuNode === this.hoveredNode) {
                                this.hideRadialMenu();
                            } else {
                                this.showRadialMenu(this.hoveredNode, mouseX, mouseY);
                            }
                        }
                    } else {
                        this.selectChapter(this.hoveredNode.id);
                    }
                } else if (this.hoveredNode.isChapterVerse) {
                    if (isDesktop) {
                        let targetVerse = this.versemapLookup ? (this.versemapLookup.get(this.hoveredNode.id) || this.hoveredNode) : this.hoveredNode;
                        this.showVerseCard(targetVerse, [targetVerse]);
                    } else {
                        if (this.radialMenuNode === this.hoveredNode) {
                            this.hideRadialMenu();
                        } else {
                            this.showRadialMenu(this.hoveredNode, mouseX, mouseY);
                        }
                    }
                } else if (this.hoveredNode.isChapterWord) {
                    if (isDesktop) {
                        if (this.wordCard && this.wordCard.classList.contains('visible') && this.inspectorNode === this.hoveredNode) {
                            if (!this.isStudyPanelPinned) {
                                this.hideWordInspector();
                            }
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
                this.closeActiveInfoWindows();
                if (window.innerWidth <= 768) {
                    this.closeDrawer();
                }
                this.hoveredNode = null;
                this.draw();
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
                            if (!this.isStudyPanelPinned) {
                                this.hideWordInspector();
                            }
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
                this.closeActiveInfoWindows();
                if (window.innerWidth <= 768) {
                    this.closeDrawer();
                }
                this.hoveredNode = null;
                this.draw();
            }
            return;
        }

        if (this.hoveredNode) {
            if (isDesktop) {
                if (this.wordCard && this.wordCard.classList.contains('visible') && this.inspectorNode === this.hoveredNode) {
                    if (!this.isStudyPanelPinned) {
                        this.hideWordInspector();
                    }
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
            this.closeActiveInfoWindows();
            if (window.innerWidth <= 768) {
                this.closeDrawer();
            }
            this.hoveredNode = null;
            this.draw();
        }
    }

    handleContextMenu(e) {
        e.preventDefault();
        e.stopPropagation();

        let rect = this.canvas.getBoundingClientRect();
        let mouseX = e.clientX - rect.left;
        let mouseY = e.clientY - rect.top;

        let [logicalX, logicalY] = this.transform.invert([mouseX, mouseY]);

        let targetNode = null;
        let minDist = Infinity;
        let searchRadius = 24 / this.transform.k;

        if (this.nodes) {
            for (let n of this.nodes) {
                let dx = n.x - logicalX;
                let dy = n.y - logicalY;
                let dist = Math.sqrt(dx * dx + dy * dy);
                let effectiveRadius = n.canvasR ? Math.max(searchRadius, n.canvasR * 1.4) : searchRadius;
                if (dist < effectiveRadius && dist < minDist) {
                    minDist = dist;
                    targetNode = n;
                }
            }
        }

        if (!targetNode && this.hoveredNode) {
            targetNode = this.hoveredNode;
        }

        if (targetNode) {
            if (this.radialMenuNode === targetNode) {
                this.hideRadialMenu();
            } else {
                this.showRadialMenu(targetNode, mouseX, mouseY);
            }
        } else {
            this.hideRadialMenu();
        }
    }

    showRadialMenu(node, mouseX, mouseY) {
        this.hideRadialMenu();
        if (window.innerWidth <= 768) {
            this.hideWordInspector();
            if (this.verseCard && this.verseCard.classList.contains('visible')) this.hideVerseCard();
            if (this.chapterCard && this.chapterCard.classList.contains('visible')) this.hideChapterCard();
            if (this.bookCard && this.bookCard.classList.contains('visible')) this.hideBookCard();
        }
        this.radialMenuNode = node;
        this.hoveredNode = node;
        this.draw();
        
        // Compute screen position of the node center, offset by canvas position within container
        let [rawX, rawY] = this.transform.apply([node.x, node.y]);
        let canvasParent = this.canvas.parentElement;
        let canvasRect = canvasParent ? canvasParent.getBoundingClientRect() : this.canvas.getBoundingClientRect();
        let container = this.querySelector('.bwm-container');
        let containerRect = container ? container.getBoundingClientRect() : canvasRect;
        let offsetX = canvasRect.left - containerRect.left;
        let offsetY = canvasRect.top - containerRect.top;
        let screenX = rawX + offsetX;
        let screenY = rawY + offsetY;
        
        let isAlreadyKw = Boolean(node.isKw || (this.isSearchMode && this.searchedWords && this.searchedWords.includes(node.id)));
        let menuItems = [];
        if (this.viewMode === 'verses') {
            if (node.isVerse) {
                let isAlreadyActive = Boolean(this.searchedVerses && this.searchedVerses.includes(node.id));
                if (isAlreadyActive) {
                    menuItems.push({
                        icon: '&minus;',
                        label: 'Remove verse from map',
                        action: () => {
                            this.hideRadialMenu();
                            this.removeVerse(node.id);
                        }
                    });
                } else {
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
                        let targetVerse = this.versemapLookup ? (this.versemapLookup.get(node.id) || node) : node;
                        this.showVerseCard(targetVerse, activeVerses);
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
                    label: 'Usage',
                    action: () => {
                        this.hideRadialMenu();
                        this.showWordInspector(node, 'canon');
                    }
                });
                menuItems.push({
                    icon: '&#128279;',
                    label: 'Neighbors',
                    action: () => {
                        this.hideRadialMenu();
                        this.showWordInspector(node, 'neighbors');
                    }
                });
                if (node.original && node.original.length > 0) {
                    let origIcon = (this.foundation === 'vul') ? '<span style="font-size:0.75em;font-weight:bold;">lat</span>' : '<span style="font-size:0.7em;font-weight:bold;">α/א</span>';
                    menuItems.push({ icon: origIcon, label: 'Language', action: () => { this.hideRadialMenu(); this.showWordInspector(node, 'original'); } });
                }
            }
        } else if (this.viewMode === 'chapters') {
            if (node.isChapter) {
                let isAlreadyActive = Boolean(this.searchedChapters && this.searchedChapters.includes(node.id));
                if (isAlreadyActive) {
                    menuItems.push({
                        icon: '&minus;',
                        label: 'Remove chapter from map',
                        action: () => {
                            this.hideRadialMenu();
                            this.removeChapter(node.id);
                        }
                    });
                } else {
                    menuItems.push({
                        icon: '+',
                        label: 'Add chapter to map',
                        action: () => {
                            this.hideRadialMenu();
                            this.addChapter(node.id);
                        }
                    });
                }
                menuItems.push({
                    icon: '📖',
                    label: 'Chapter Study Panel',
                    action: () => {
                        this.hideRadialMenu();
                        let activeChapters = (this.searchedChapters && this.searchedChapters.length > 0)
                            ? this.searchedChapters.map(cId => this.chaptermapLookup ? this.chaptermapLookup.get(cId) : null).filter(Boolean)
                            : [node];
                        let targetChapter = this.chaptermapLookup ? (this.chaptermapLookup.get(node.id) || node) : node;
                        this.showChapterCard(targetChapter, activeChapters);
                    }
                });
                menuItems.push({
                    icon: '&#128269;',
                    label: 'Focus this chapter only',
                    action: () => {
                        this.hideRadialMenu();
                        this.selectChapter(node.id);
                    }
                });
            } else if (node.isChapterVerse) {
                menuItems.push({
                    icon: '📖',
                    label: 'Verse Info & Cross-Refs',
                    action: () => {
                        this.hideRadialMenu();
                        let targetVerse = this.versemapLookup ? (this.versemapLookup.get(node.id) || node) : node;
                        this.showVerseCard(targetVerse, [targetVerse]);
                    }
                });
                menuItems.push({
                    icon: '&#128269;',
                    label: 'Explore on Verse Map',
                    action: () => {
                        this.hideRadialMenu();
                        const wordsBtn = document.getElementById('view-mode-words');
                        const booksBtn = document.getElementById('view-mode-books');
                        const versesBtn = document.getElementById('view-mode-verses');
                        const chaptersBtn = document.getElementById('view-mode-chapters');
                        if (wordsBtn && booksBtn && versesBtn && chaptersBtn) {
                            versesBtn.classList.add('active');
                            wordsBtn.classList.remove('active');
                            booksBtn.classList.remove('active');
                            chaptersBtn.classList.remove('active');
                        }
                        this.setViewMode('verses');
                        this.selectVerse(node.id);
                    }
                });
            } else if (node.isChapterWord) {
                menuItems.push({
                    icon: '&#128269;',
                    label: 'Explore on Word Map',
                    action: () => {
                        this.hideRadialMenu();
                        const wordsBtn = document.getElementById('view-mode-words');
                        const booksBtn = document.getElementById('view-mode-books');
                        const versesBtn = document.getElementById('view-mode-verses');
                        const chaptersBtn = document.getElementById('view-mode-chapters');
                        if (wordsBtn && booksBtn && versesBtn && chaptersBtn) {
                            wordsBtn.classList.add('active');
                            booksBtn.classList.remove('active');
                            versesBtn.classList.remove('active');
                            chaptersBtn.classList.remove('active');
                        }
                        this.setViewMode('words');
                        if (this.searchInput) this.searchInput.value = this.formatWord(node.w, node.pos);
                        this.searchWord();
                    }
                });
                menuItems.push({ icon: '\u{1F4D6}', label: 'Verses', action: () => { this.hideRadialMenu(); this.showWordInspector(node, 'verses'); } });
                menuItems.push({
                    icon: '&#128202;',
                    label: 'Usage',
                    action: () => {
                        this.hideRadialMenu();
                        this.showWordInspector(node, 'canon');
                    }
                });
                menuItems.push({
                    icon: '&#128279;',
                    label: 'Neighbors',
                    action: () => {
                        this.hideRadialMenu();
                        this.showWordInspector(node, 'neighbors');
                    }
                });
                if (node.original && node.original.length > 0) {
                    let origIcon = (this.foundation === 'vul') ? '<span style="font-size:0.75em;font-weight:bold;">lat</span>' : '<span style="font-size:0.7em;font-weight:bold;">α/א</span>';
                    menuItems.push({ icon: origIcon, label: 'Language', action: () => { this.hideRadialMenu(); this.showWordInspector(node, 'original'); } });
                }
            }
        } else if (this.viewMode === 'books') {
            if (node.isBook) {
                let isAlreadyActive = Boolean(this.searchedBooks && this.searchedBooks.includes(node.code));
                if (isAlreadyActive) {
                    menuItems.push({
                        icon: '&minus;',
                        label: 'Remove book from map',
                        action: () => {
                            this.hideRadialMenu();
                            this.removeBook(node.code);
                        }
                    });
                } else {
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
                    label: 'Usage',
                    action: () => {
                        this.hideRadialMenu();
                        this.showWordInspector(node, 'canon');
                    }
                });
                menuItems.push({
                    icon: '&#128279;',
                    label: 'Neighbors',
                    action: () => {
                        this.hideRadialMenu();
                        this.showWordInspector(node, 'neighbors');
                    }
                });
                if (node.original && node.original.length > 0) {
                    let origIcon = (this.foundation === 'vul') ? '<span style="font-size:0.75em;font-weight:bold;">lat</span>' : '<span style="font-size:0.7em;font-weight:bold;">α/א</span>';
                    menuItems.push({ icon: origIcon, label: 'Language', action: () => { this.hideRadialMenu(); this.showWordInspector(node, 'original'); } });
                }
            }
        } else {
            if (isAlreadyKw) {
                menuItems.push({ icon: '&minus;', label: 'Remove keyword', action: () => { this.hideRadialMenu(); this.removeKeyword(node.id); } });
            } else {
                menuItems.push({ icon: '+', label: 'Add keyword', action: () => { this.hideRadialMenu(); this.addKeyword(node.id); } });
            }
            menuItems.push({ icon: '\u{1F4D6}', label: 'Verses', action: () => { this.hideRadialMenu(); this.showWordInspector(node, 'verses'); } });
            menuItems.push({
                icon: '&#128202;',
                label: 'Usage',
                action: () => {
                    this.hideRadialMenu();
                    this.showWordInspector(node, 'canon');
                }
            });
            menuItems.push({
                icon: '&#128279;',
                label: 'Neighbors',
                action: () => {
                    this.hideRadialMenu();
                    this.showWordInspector(node, 'neighbors');
                }
            });
            if (node.original && node.original.length > 0) {
                let origIcon = (this.foundation === 'vul') ? '<span style="font-size:0.75em;font-weight:bold;">lat</span>' : '<span style="font-size:0.7em;font-weight:bold;">α/א</span>';
                menuItems.push({ icon: origIcon, label: 'Language', action: () => { this.hideRadialMenu(); this.showWordInspector(node, 'original'); } });
            }
        }
        
        this.radialMenu.innerHTML = '';
        let nodeScreenR = (node.canvasR || 8) * this.transform.k;
        let baseRadius = menuItems.length >= 5 ? 52 : (menuItems.length >= 4 ? 48 : 45);
        let radius = Math.max(baseRadius, nodeScreenR + 26);
        let startAngle = -Math.PI / 2; // start from top
        let angleStep = (2 * Math.PI) / menuItems.length;
        
        menuItems.forEach((item, i) => {
            let angle = startAngle + i * angleStep;
            let ix = screenX + radius * Math.cos(angle) - 18; // 18 = half of 36px item
            let iy = screenY + radius * Math.sin(angle) - 18;
            
            let el = document.createElement('div');
            el.className = 'bwm-radial-item';
            if (Math.sin(angle) > 0.2) {
                el.classList.add('pos-bottom');
            }
            el.style.left = ix + 'px';
            el.style.top = iy + 'px';
            el.innerHTML = `${item.icon}<span class="bwm-radial-label">${item.label}</span>`;
            
            el.addEventListener('click', (e) => {
                e.stopPropagation();
                item.action();
            });
            el.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                e.stopPropagation();
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
        let currentX = 0;
        let startTime = 0;
        let isDragging = false;
        let canDrag = false;
        let scrollEl = null;

        const onTouchMove = (e) => {
            if (!e.touches || e.touches.length === 0) return;
            const touch = e.touches[0];
            currentY = touch.clientY;
            currentX = touch.clientX;
            const dy = currentY - startY;
            const dx = currentX - startX;

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
                    card.style.transform = `translateY(${Math.max(-4, dy * 0.1)}px)`;
                }
            }
        };

        const onTouchEnd = (e) => {
            window.removeEventListener('touchmove', onTouchMove, { capture: true });
            window.removeEventListener('touchend', onTouchEnd, { capture: true });
            window.removeEventListener('touchcancel', onTouchEnd, { capture: true });

            if (e.changedTouches && e.changedTouches.length > 0) {
                currentX = e.changedTouches[0].clientX;
                currentY = e.changedTouches[0].clientY;
            }

            if (!isDragging) {
                const dx = currentX - startX;
                const dy = currentY - startY;
                const elapsed = Math.max(1, performance.now() - startTime);

                // Horizontal swipe: dx magnitude >= 40, predominantly horizontal, quick gesture
                if (Math.abs(dx) >= 40 && Math.abs(dx) > Math.abs(dy) * 1.25 && elapsed < 650) {
                    let isHorizScrollable = false;
                    if (e.target) {
                        let cur = e.target;
                        while (cur && cur !== card) {
                            if (cur.scrollWidth > cur.clientWidth + 4) {
                                let overflowX = window.getComputedStyle(cur).overflowX;
                                if (overflowX === 'auto' || overflowX === 'scroll') {
                                    isHorizScrollable = true;
                                    break;
                                }
                            }
                            cur = cur.parentElement;
                        }
                    }
                    if (!isHorizScrollable) {
                        if (dx < 0 && typeof card._swipeNext === 'function') {
                            card._swipeNext();
                        } else if (dx > 0 && typeof card._swipePrev === 'function') {
                            card._swipePrev();
                        }
                    }
                }
                return;
            }
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
            currentX = startX;
            startTime = performance.now();
            isDragging = false;

            scrollEl = touch.target.closest('.bwm-chapter-pane, .bwm-chapter-reader, .bwm-window-body, .bwm-verses-body, .bwm-canon-list, .bwm-book-chip-list, .bwm-drawer-content');
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
            const handleOrHeader = e.target.closest('.bwm-sheet-handle, .bwm-window-header, .bwm-drawer-header');
            if (!handleOrHeader) return;
            if (e.target.closest('button, input, a, .bwm-window-tab, .bwm-window-pill, .bwm-pill-btn, .bwm-drawer-close, .bwm-drawer-legend-btn')) return;

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
                    card.style.transform = `translateY(${Math.max(-4, dy * 0.1)}px)`;
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
            this.wordCard.classList.remove('visible', 'pinned');
            this.wordCard.style.transform = '';
            this.wordCard.style.transition = '';
            this.wordCard.style.opacity = '';
            this.wordCard.innerHTML = '';
        }
        if (this.wordReopenBtn) {
            if (this.viewMode === 'words' && this.isSearchMode && this.searchedWords && this.searchedWords.length > 0) {
                let name = 'Word';
                if (this.lastInspectedWordNode) {
                    name = this.formatWord(this.lastInspectedWordNode.w, this.lastInspectedWordNode.pos);
                } else if (this.searchedWords.length === 1) {
                    let parsed = this.parseWordId(this.searchedWords[0]);
                    name = this.formatWord(parsed.word, parsed.pos);
                } else if (this.searchedWords.length > 1) {
                    name = `${this.searchedWords.length} Words`;
                }
                let textEl = this.wordReopenBtn.querySelector('.bwm-book-card-reopen-text');
                if (textEl) textEl.textContent = `${name} Info`;
                this.wordReopenBtn.style.display = 'flex';
            } else {
                this.wordReopenBtn.style.display = 'none';
            }
        }
        this.inspectorNode = null;
        this.draw();
        this.onStudyPanelVisibilityChange(false);
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

    showNeighborsPanel(node) {
        this.showWordInspector(node, 'neighbors');
    }

    renderPillToggle({ isActive, id = '', dataAttrs = {}, title = '' } = {}) {
        let activeClass = isActive ? 'is-active' : '';
        let ariaChecked = isActive ? 'true' : 'false';
        let defaultTitle = isActive ? 'Remove from map' : 'Add to map';
        let titleAttr = `title="${title || defaultTitle}"`;
        let idAttr = id ? `id="${id}"` : '';
        let dataStr = Object.entries(dataAttrs).map(([k, v]) => `data-${k}="${v}"`).join(' ');
        return `
            <div class="bwm-pill-toggle ${activeClass}" ${idAttr} ${dataStr} ${titleAttr} role="switch" aria-checked="${ariaChecked}" tabindex="0">
                <span class="bwm-pill-toggle-opt bwm-pill-toggle-minus" title="Off map">&minus;</span>
                <span class="bwm-pill-toggle-opt bwm-pill-toggle-plus" title="Added to map">+</span>
            </div>
        `;
    }

    setupPillToggleListener(el, onToggle) {
        if (!el) return;
        const handleToggle = (e) => {
            e.stopPropagation();
            const isCurrentlyActive = el.classList.contains('is-active');
            const clickedMinus = Boolean(e.target.closest('.bwm-pill-toggle-minus'));
            const clickedPlus = Boolean(e.target.closest('.bwm-pill-toggle-plus'));
            
            if (clickedMinus && !isCurrentlyActive) return;
            if (clickedPlus && isCurrentlyActive) return;
            
            const nextActive = !isCurrentlyActive;
            el.classList.toggle('is-active', nextActive);
            el.setAttribute('aria-checked', nextActive ? 'true' : 'false');
            if (onToggle) onToggle(nextActive, el);
        };
        el.addEventListener('click', handleToggle);
        el.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleToggle(e);
            }
        });
    }

    syncKeywordToggles(wordId, isActive) {
        if (!wordId) return;
        const toggles = this.querySelectorAll(`.bwm-pill-toggle[data-kw-id="${wordId}"], .bwm-pill-toggle[data-neighbor-id="${wordId}"]`);
        toggles.forEach(t => {
            t.classList.toggle('is-active', isActive);
            t.setAttribute('aria-checked', isActive ? 'true' : 'false');
            t.title = isActive ? 'Remove keyword from map' : 'Add keyword to map';
        });
        if (this.inspectorNode && this.inspectorNode.id === wordId) {
            const headerToggle = this.querySelector('#bwm-word-action-kw');
            if (headerToggle) {
                headerToggle.classList.toggle('is-active', isActive);
                headerToggle.setAttribute('aria-checked', isActive ? 'true' : 'false');
                headerToggle.title = isActive ? 'Remove keyword from map' : 'Add keyword to map';
            }
        }
    }

    syncBookToggles(bookCode, isActive) {
        if (!bookCode) return;
        const toggles = this.querySelectorAll(`.bwm-pill-toggle[data-toggle-book-code="${bookCode}"]`);
        toggles.forEach(t => {
            t.classList.toggle('is-active', isActive);
            t.setAttribute('aria-checked', isActive ? 'true' : 'false');
            t.title = isActive ? 'Remove book from map' : 'Add book to map';
        });
        if (this.selectedBook && this.selectedBook.code === bookCode) {
            const headerToggle = this.querySelector('#bwm-book-action-toggle');
            if (headerToggle) {
                headerToggle.classList.toggle('is-active', isActive);
                headerToggle.setAttribute('aria-checked', isActive ? 'true' : 'false');
                headerToggle.title = isActive ? 'Remove book from map' : 'Add book to map';
            }
        }
    }

    syncVerseToggles(verseId, isActive) {
        if (!verseId) return;
        const toggles = this.querySelectorAll(`.bwm-pill-toggle[data-toggle-verse="${verseId}"]`);
        toggles.forEach(t => {
            t.classList.toggle('is-active', isActive);
            t.setAttribute('aria-checked', isActive ? 'true' : 'false');
            t.title = isActive ? 'Remove verse from map' : 'Add verse to map';
        });
        if (this.selectedVerse && this.selectedVerse.id === verseId) {
            const headerToggle = this.querySelector('#bwm-verse-action-toggle');
            if (headerToggle) {
                headerToggle.classList.toggle('is-active', isActive);
                headerToggle.setAttribute('aria-checked', isActive ? 'true' : 'false');
                headerToggle.title = isActive ? 'Remove verse from map' : 'Add verse to map';
            }
        }
    }

    async showWordInspector(node, defaultTab = 'verses') {
        if (!node) return;
        this.lastInspectedWordNode = node;
        if (this.wordReopenBtn) {
            this.wordReopenBtn.style.display = 'none';
        }
        if (window.innerWidth <= 768) {
            this.closeDrawer();
        }
        this.hideBookCard();
        this.hideVerseCard();
        this.hideChapterCard();
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
        let activeBooks = this.getActiveBibleBooks();
        let totalBooksWithOcc = 0;
        activeBooks.forEach(b => {
            if ((bookCounts[b.code] || 0) > 0) totalBooksWithOcc++;
        });

        let occBadgeText = isVersesLoaded ? `${totalOccurrences} occurrence${totalOccurrences === 1 ? '' : 's'}` : 'Loading stats...';
        let booksBadgeText = isVersesLoaded ? `in ${totalBooksWithOcc} of ${activeBooks.length} books` : '';

        let isAlreadyKw = this.isSearchMode && this.searchedWords && this.searchedWords.includes(node.id);
        let actionBtnHtml = '';
        if (this.viewMode === 'words') {
            actionBtnHtml = this.renderPillToggle({
                isActive: isAlreadyKw,
                id: 'bwm-word-action-kw',
                dataAttrs: {
                    'kw-id': node.id
                },
                title: isAlreadyKw ? 'Remove keyword from map' : 'Add keyword to map'
            });
        } else {
            actionBtnHtml = `
                <button type="button" class="bwm-window-pill bwm-word-action-btn" id="bwm-word-action-explore" title="Explore on Word Map" style="font-size:0.8em; padding:3px 8px; white-space:nowrap; height:24px; display:inline-flex; align-items:center;">
                    Explore
                </button>
            `;
        }

        let origHeaderLine = '';
        if (node.original && Array.isArray(node.original) && node.original.length > 0) {
            let prim = node.original[0];
            if (prim.lemma) {
                origHeaderLine = `
                    <div style="display: flex; align-items: center; gap: 8px; margin-top: 4px; font-size: 0.95em;">
                        <span style="font-family: serif; font-size: 1.25em; font-weight: 600; color: var(--bwm-node-hover, #60a5fa);">${prim.lemma}</span>
                        ${prim.translit ? `<span style="font-style: italic; opacity: 0.8; font-size: 0.9em;">${prim.translit}</span>` : ''}
                        ${prim.strongs ? `<span style="background: var(--bwm-badge-bg); border: 1px solid var(--bwm-border); padding: 1px 5px; border-radius: 4px; font-family: monospace; font-size: 0.8em; opacity: 0.85;">${prim.strongs}</span>` : ''}
                    </div>
                `;
            }
        }

        let activeKwIds = [];
        if (this.viewMode === 'words' && this.isSearchMode && Array.isArray(this.searchedWords)) {
            activeKwIds = this.searchedWords.filter(Boolean);
        }

        let isNodeKw = Boolean(node.isKw || (activeKwIds.length > 0 && activeKwIds.includes(node.id)));
        let nodeVec = node.v || (this.data2d ? (this.data2d.find(d => d.id === node.id) || {}).v : null);
        let isIndirectLink = false;
        if (this.isSearchMode && !isNodeKw && this.allSearchLinks) {
            let activeLink = this.allSearchLinks.find(l => {
                let src = (typeof l.source === 'object' && l.source !== null) ? l.source.id : l.source;
                let tgt = (typeof l.target === 'object' && l.target !== null) ? l.target.id : l.target;
                return (src === node.id || tgt === node.id);
            });
            if (activeLink && activeLink.type === 'indirect') {
                isIndirectLink = true;
            }
        }

        let indirectBadgeHtml = isIndirectLink 
            ? `<span class="bwm-window-badge bwm-window-badge-indirect" title="Connected by contextual semantic proximity rather than direct verse co-occurrence">Indirect link</span>`
            : '';

        let headerHtml = `
            <div class="bwm-sheet-handle"></div>
            <div class="bwm-window-header">
                <div class="bwm-window-header-top">
                    <div class="bwm-window-title-group">
                        <div style="display: flex; align-items: baseline; gap: 6px; flex-wrap: wrap;">
                            <h3 class="bwm-window-title" style="margin: 0;">${displayW}</h3>
                            ${node.pos ? `<span class="bwm-window-subtitle-inline">(${node.pos.toLowerCase()})</span>` : ''}
                            ${indirectBadgeHtml}
                            <span class="bwm-window-badge" id="bwm-word-occ-badge">${occBadgeText}</span>
                            ${booksBadgeText ? `<span class="bwm-window-badge-muted" id="bwm-word-books-badge">${booksBadgeText}</span>` : ''}
                        </div>
                        ${origHeaderLine}
                    </div>
                    <div style="display:flex; align-items:center; gap:8px;">
                        ${actionBtnHtml}
                        ${this.renderPinButton('study')}
                        <button type="button" class="bwm-window-close" id="bwm-word-close" title="Close inspector">&times;</button>
                    </div>
                </div>
            </div>
            <div class="bwm-window-tabs bwm-word-tabs">
                <button type="button" class="bwm-window-tab ${defaultTab === 'verses' ? 'active' : ''}" data-word-tab="verses">Verses</button>
                <button type="button" class="bwm-window-tab ${defaultTab === 'original' ? 'active' : ''}" data-word-tab="original">Language</button>
                <button type="button" class="bwm-window-tab ${defaultTab === 'canon' ? 'active' : ''}" data-word-tab="canon">Usage</button>
                <button type="button" class="bwm-window-tab ${defaultTab === 'neighbors' ? 'active' : ''}" data-word-tab="neighbors">Neighbors</button>
            </div>
        `;

        // Pane 1: Verses
        let versesPaneHtml = '';
        const BATCH_SIZE = 30;
        let tabsState = {};

        let highlightKws = [];
        if (node && node.w) highlightKws.push(node.w);
        if (this.viewMode === 'words' && Array.isArray(this.searchedWords)) {
            for (const sId of this.searchedWords) {
                if (!sId) continue;
                const parsed = this.parseWordId(sId);
                if (parsed && parsed.word && !highlightKws.includes(parsed.word)) {
                    highlightKws.push(parsed.word);
                }
            }
        }

        let origLemmas = [];
        if (node && node.original && Array.isArray(node.original)) {
            node.original.forEach(o => {
                if (o.lemma && !origLemmas.includes(o.lemma)) origLemmas.push(o.lemma);
            });
        }
        if (this.viewMode === 'words' && Array.isArray(this.searchedWords)) {
            for (const sId of this.searchedWords) {
                if (!sId) continue;
                let sNode = (this.allSearchNodes && this.allSearchNodes.find(n => n.id === sId))
                    || (this.data2d && this.data2d.find(d => d.id === sId));
                if (sNode && sNode.original && Array.isArray(sNode.original)) {
                    sNode.original.forEach(o => {
                        if (o.lemma && !origLemmas.includes(o.lemma)) origLemmas.push(o.lemma);
                    });
                }
            }
        }

        const buildVerseItemHtml = (id) => {
            let v = this.verses[id] || '';
            let parts = v.split('|');
            let ref = parts[0];
            let english = parts[1] || '';
            let origText = parts[2] || '';
            if (!origText && /[\u0370-\u03ff\u1f00-\u1fff]/.test(english) && !/[a-zA-Z]{3,}/.test(english)) {
                origText = english;
                english = '';
            }
            if (!english.trim() && origText.trim()) {
                english = origText;
                origText = '';
            }
            let formattedRef = formatVerseRef(ref);
            let vGenre = getVerseGenre(ref);
            let vGenreColor = GENRE_COLORS[vGenre] || '#3b82f6';
            let isExpandable = english.length > 110 || Boolean(origText);
            let snippet = this.getSmartSnippet(english, highlightKws, 110);
            let snippetHtml = this.highlightKeywordsInVerse(snippet, highlightKws);
            let fullHtml = this.highlightKeywordsInVerse(english, highlightKws);
            let origHtml = origText ? this.highlightOriginalKeywordsInVerse(origText, origLemmas) : '';
            let origLabel = (this.foundation === 'vul') ? 'Latin Clementine Vulgate' : 'Septuagint / Greek NT';
            return `
                <div class="bwm-crossref-card bwm-verse-item" data-verse-id="${id}" style="margin: 6px 0;">
                    <div class="bwm-crossref-head">
                        <div class="bwm-crossref-title-wrap">
                            <span class="bwm-crossref-ref" data-jump-verse="${ref}" title="Inspect verse in Verse Study Panel">${formattedRef}</span>
                            <span class="bwm-book-badge" style="background:${vGenreColor};">${vGenre}</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 6px;">
                            ${isExpandable ? `
                            <button type="button" class="bwm-verse-expand-btn" data-action="expand-verse-item" aria-expanded="false" title="Expand full verse">
                                <svg class="bwm-chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                            </button>` : ''}
                        </div>
                    </div>
                    ${snippet ? `
                    <div class="bwm-crossref-body">
                        <div class="bwm-verse-item-english bwm-crossref-snippet" data-snippet-html="${escapeHtml(snippetHtml)}" data-full-html="${escapeHtml(fullHtml)}" data-snippet="${escapeHtml(snippet)}" data-full="${escapeHtml(english)}">${snippetHtml}</div>
                        ${origText ? `<div class="bwm-verse-item-original bwm-crossref-original" style="display:none;"><span style="font-size:0.75em; opacity:0.6; text-transform:uppercase; letter-spacing:0.04em; display:block; margin-bottom:2px; font-family:var(--bwm-font);">${origLabel}</span>${origHtml}</div>` : ''}
                    </div>` : ''}
                </div>
            `;
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
                        
                        let { word: swWord, pos: swPos } = this.parseWordId(sw);
                        let formattedSw = swPos ? this.formatWord(swWord, swPos) : swWord;
                        if (swPos) formattedSw += ` (${swPos.toLowerCase()})`;
                        
                        tabsData.push({
                            id: sw,
                            title: formattedSw,
                            verses: intersection,
                            sim: sim
                        });
                    }
                });
                tabsData.sort((a, b) => b.sim - a.sim);

                if (tabsData.length > 0 && myVerses.length > 0) {
                    tabsData.push({
                        id: 'all_word_verses',
                        title: 'All Verses',
                        verses: myVerses,
                        isAllTab: true
                    });
                }

                if (tabsData.length === 0 && !node.isKw && this.searchedWords && this.searchedWords.length > 0) {
                    let kwNames = this.searchedWords.map(sw => {
                        let { word: swWord, pos: swPos } = this.parseWordId(sw);
                        return swPos ? this.formatWord(swWord, swPos) : swWord;
                    }).join(', ');
                    noteHtml = `<div style="padding: 10px 16px 8px 16px; font-size: 0.82em; color: var(--bwm-node-hover); font-style: italic; line-height: 1.45; border-bottom: 1px solid var(--bwm-border);">Does not co-occur directly with <strong>${escapeHtml(kwNames)}</strong> in a single verse (connected by semantic vector similarity -- no shared verses). Below are all occurrences of <strong>${escapeHtml(node.w)}</strong>:</div>`;
                }
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
                            ${orig.strongs ? `<span style="background: var(--bwm-badge-bg); border: 1px solid var(--bwm-border); padding: 2px 6px; border-radius: 4px; font-family: monospace;">${orig.strongs}</span>` : ''}
                            <span style="opacity: 0.7; margin-left: ${orig.strongs ? '10px' : '0px'};">Translated ${orig.count} time${orig.count === 1 ? '' : 's'} as "${node.w}"</span>
                        </div>
                    </div>
                `;
                if (orig.def) {
                    let defHeading = (this.foundation === 'vul') ? "Whitaker's Latin Definition:" : "Strong's Definition:";
                    origBodyHtml += `
                        <div style="border-top: 1px solid var(--bwm-border); padding-top: 12px; line-height: 1.5;">
                            <strong>${defHeading}</strong><br/>
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
                'Deuterocanon': 'Deuterocanon / Apocrypha',
                'Wisdom': 'Wisdom & Poetry',
                'Major Prophets': 'Major Prophets',
                'Minor Prophets': 'Minor Prophets',
                'Gospels': 'Gospels',
                'Pauline Epistles': 'Pauline Epistles',
                'General Epistles': 'General Epistles',
                'Apocalypse': 'Apocalypse'
            };
            const GENRE_ORDER = (this.foundation === 'lxx' || this.foundation === 'vul') ? [
                'Law', 'History', 'Deuterocanon', 'Wisdom', 'Major Prophets', 'Minor Prophets',
                'Gospels', 'Pauline Epistles', 'General Epistles', 'Apocalypse'
            ] : [
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

            this.getActiveBibleBooks().forEach(b => {
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
                let list = this.getActiveBibleBooks().map((b, idx) => {
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
                        <button type="button" class="bwm-window-pill active" data-canon-tab="book">By Book</button>
                        <button type="button" class="bwm-window-pill" data-canon-tab="genre">By Literature</button>
                        <button type="button" class="bwm-window-pill" data-canon-tab="testament">OT vs NT</button>
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

        // Pane 4: Top 10 Nearest Neighbors
        let neighborsPaneHtml = '';
        let top10Neighbors = [];

        if (!nodeVec && this.data2d) {
            let foundIn2d = this.data2d.find(d => d.id === node.id || (d.w.toLowerCase() === node.w.toLowerCase() && (!node.pos || d.pos === node.pos)));
            if (foundIn2d && foundIn2d.v) {
                nodeVec = foundIn2d.v;
            }
        }

        if (!nodeVec || !this.data2d) {
            neighborsPaneHtml = `
                <div class="bwm-word-pane" id="bwm-word-pane-neighbors" style="display: ${defaultTab === 'neighbors' ? 'flex' : 'none'};">
                    <div class="bwm-window-body" style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:40px 20px;">
                        <span class="bwm-loading-spinner" style="width:24px; height:24px; border-width:3px; margin-bottom:12px;"></span>
                        <div style="font-size:0.9em; color:var(--bwm-text-muted);">Calculating vector similarity neighbors...</div>
                    </div>
                </div>
            `;
        } else {
            let sims = [];
            for (let i = 0; i < this.data2d.length; i++) {
                let d = this.data2d[i];
                if (d.id === node.id) continue;
                if (!d.v) continue;
                let s = this.cosineSimilarity(nodeVec, d.v);
                if (s !== null && !isNaN(s) && s > 0 && s <= 1.00001) {
                    sims.push({ point: d, sim: s });
                }
            }
            sims.sort((a, b) => b.sim - a.sim);
            top10Neighbors = sims.slice(0, 10);

            const POS_COLORS = {
                'NOUN': '#3b82f6',
                'VERB': '#ef4444',
                'PROPN': '#10b981',
                'ADJ': '#8b5cf6',
                'ADV': '#ec4899',
                'PRON': '#14b8a6',
                'NUM': '#f59e0b'
            };

            let rowsHtml = top10Neighbors.map((item, idx) => {
                let pt = item.point;
                let rank = idx + 1;
                let simPct = (item.sim * 100).toFixed(2);
                let formattedName = this.formatWord(pt.w, pt.pos);
                let posColor = POS_COLORS[pt.pos] || '#94a3b8';
                let barColor = item.sim >= 0.70 ? '#10b981' : (item.sim >= 0.55 ? '#3b82f6' : '#8b5cf6');
                
                let origSnippet = '';
                if (pt.original && pt.original.length > 0) {
                    let prim = pt.original[0];
                    let lemmaPart = prim.lemma ? `<i>${prim.lemma}</i>` : '';
                    let defPart = prim.def ? prim.def.split(';')[0].split(',')[0].trim() : '';
                    if (lemmaPart && defPart) {
                        origSnippet = `${lemmaPart} &bull; ${defPart}`;
                    } else if (lemmaPart) {
                        origSnippet = lemmaPart;
                    } else if (defPart) {
                        origSnippet = defPart;
                    }
                }

                let isAlreadyKw = this.isSearchMode && this.searchedWords && this.searchedWords.includes(pt.id);
                let actionBtnHtml = '';
                if (this.viewMode === 'words') {
                    actionBtnHtml = this.renderPillToggle({
                        isActive: isAlreadyKw,
                        dataAttrs: {
                            'neighbor-action': 'kw',
                            'neighbor-id': pt.id
                        },
                        title: isAlreadyKw ? 'Remove keyword from map' : 'Add keyword to map'
                    });
                } else {
                    actionBtnHtml = `
                        <button type="button" class="bwm-window-pill bwm-neighbor-action-btn" data-neighbor-action="explore" data-neighbor-id="${pt.id}" title="Explore on Word Map">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                <circle cx="11" cy="11" r="7.5"></circle>
                                <line x1="21" y1="21" x2="16.5" y2="16.5"></line>
                            </svg>
                        </button>
                    `;
                }

                return `
                    <div class="bwm-neighbor-row" data-neighbor-id="${pt.id}" title="Inspect ${formattedName}">
                        <span class="bwm-neighbor-rank">#${rank}</span>
                        <div class="bwm-neighbor-info">
                            <div class="bwm-neighbor-word-line">
                                <span class="bwm-neighbor-name">${formattedName}</span>
                                ${pt.pos ? `<span class="bwm-neighbor-pos" style="color:${posColor};">(${pt.pos.toLowerCase()})</span>` : ''}
                            </div>
                            ${origSnippet ? `<div class="bwm-neighbor-orig" title="${origSnippet.replace(/<[^>]+>/g, '')}">${origSnippet}</div>` : ''}
                        </div>
                        <div class="bwm-neighbor-track">
                            <div class="bwm-neighbor-fill" style="width:${simPct}%; background:${barColor};"></div>
                        </div>
                        <span class="bwm-neighbor-stats">${simPct}%</span>
                        <div class="bwm-neighbor-action">
                            ${actionBtnHtml}
                        </div>
                    </div>
                `;
            }).join('');

            neighborsPaneHtml = `
                <div class="bwm-word-pane" id="bwm-word-pane-neighbors" style="display: ${defaultTab === 'neighbors' ? 'flex' : 'none'};">
                    <div class="bwm-window-body bwm-neighbors-body">
                        <div class="bwm-neighbors-summary">
                            <b>Top 10 Nearest Neighbors (Cosine Similarity):</b>
                            <div style="font-size:0.92em; color:var(--bwm-text-muted); margin-top:2px;">
                                Words positioned closest to <b>${displayW}</b> in 100-dimensional semantic space based on biblical usage and co-occurrence patterns.
                            </div>
                        </div>
                        <div class="bwm-neighbors-list">
                            ${rowsHtml}
                        </div>
                    </div>
                </div>
            `;
        }

        this.wordCard.style.transform = '';
        this.wordCard.style.transition = '';
        this.wordCard.style.opacity = '';
        this.wordCard.innerHTML = headerHtml + versesPaneHtml + origPaneHtml + canonPaneHtml + neighborsPaneHtml;
        this.wordCard.classList.add('visible');
        if (this.isStudyPanelPinned) {
            this.wordCard.classList.add('pinned');
        }
        this.onStudyPanelVisibilityChange(true);

        // Close button
        const closeBtn = this.wordCard.querySelector('#bwm-word-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (this.isStudyPanelPinned) this.unpinStudyPanel();
                this.hideWordInspector();
            });
        }

        // Action button / toggle (keyword add/remove or explore on word map)
        const toggleKw = this.wordCard.querySelector('#bwm-word-action-kw');
        if (toggleKw) {
            this.setupPillToggleListener(toggleKw, (nextActive) => {
                if (nextActive) {
                    this.addKeyword(node.id);
                    toggleKw.title = 'Remove keyword from map';
                } else {
                    this.removeKeyword(node.id);
                    toggleKw.title = 'Add keyword to map';
                }
                this.syncKeywordToggles(node.id, nextActive);
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
            canon: this.wordCard.querySelector('#bwm-word-pane-canon'),
            neighbors: this.wordCard.querySelector('#bwm-word-pane-neighbors')
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

        // Neighbors tab listeners
        const neighborRows = this.wordCard.querySelectorAll('.bwm-neighbor-row');
        neighborRows.forEach(row => {
            row.addEventListener('click', (e) => {
                if (e.target.closest('.bwm-pill-toggle') || e.target.closest('.bwm-neighbor-action-btn')) return;
                e.stopPropagation();
                const neighborId = row.getAttribute('data-neighbor-id');
                const targetPoint = this.data2d ? this.data2d.find(d => d.id === neighborId) : null;
                if (targetPoint) {
                    this.showWordInspector(targetPoint, 'neighbors');
                }
            });
        });

        const neighborKwToggles = this.wordCard.querySelectorAll('.bwm-pill-toggle[data-neighbor-action="kw"]');
        neighborKwToggles.forEach(toggle => {
            this.setupPillToggleListener(toggle, (nextActive) => {
                const neighborId = toggle.getAttribute('data-neighbor-id');
                if (!neighborId) return;
                if (nextActive) {
                    this.addKeyword(neighborId);
                    toggle.title = 'Remove keyword from map';
                } else {
                    this.removeKeyword(neighborId);
                    toggle.title = 'Add keyword to map';
                }
                this.syncKeywordToggles(neighborId, nextActive);
            });
        });

        const neighborExploreBtns = this.wordCard.querySelectorAll('.bwm-neighbor-action-btn[data-neighbor-action="explore"]');
        neighborExploreBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const neighborId = btn.getAttribute('data-neighbor-id');
                const targetPoint = this.data2d ? this.data2d.find(d => d.id === neighborId) : null;
                if (targetPoint) {
                    const wordsBtn = document.getElementById('view-mode-words');
                    const booksBtn = document.getElementById('view-mode-books');
                    if (wordsBtn && booksBtn) {
                        wordsBtn.classList.add('active');
                        booksBtn.classList.remove('active');
                    }
                    this.setViewMode('words');
                    if (this.searchInput) this.searchInput.value = this.formatWord(targetPoint.w, targetPoint.pos);
                    this.searchWord();
                }
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

        // Expand/collapse verse items in Verses tab in place, or jump to verse card
        const versesPane = this.wordCard.querySelector('#bwm-word-pane-verses');
        if (versesPane) {
            versesPane.addEventListener('click', (e) => {
                let jumpBtn = e.target.closest('[data-jump-verse]');
                if (jumpBtn) {
                    e.stopPropagation();
                    e.preventDefault();
                    let ref = jumpBtn.getAttribute('data-jump-verse');
                    if (this.viewMode !== 'verses') this.setViewMode('verses');
                    this.selectVerse(ref);
                    let target = this.versemapLookup ? this.versemapLookup.get(ref) : null;
                    if (!target) target = { id: ref };
                    this.showVerseCard(target, [target]);
                    return;
                }
                let expandBtn = e.target.closest('.bwm-verse-expand-btn[data-action="expand-verse-item"]');
                if (!expandBtn) return;
                e.stopPropagation();
                e.preventDefault();
                let item = expandBtn.closest('.bwm-verse-item');
                if (!item) return;
                let engEl = item.querySelector('.bwm-verse-item-english');
                let origEl = item.querySelector('.bwm-verse-item-original');
                let isExpanded = expandBtn.classList.contains('is-expanded');
                if (isExpanded) {
                    expandBtn.classList.remove('is-expanded');
                    expandBtn.setAttribute('aria-expanded', 'false');
                    expandBtn.setAttribute('title', 'Expand full verse');
                    if (engEl) engEl.innerHTML = engEl.getAttribute('data-snippet-html') || engEl.getAttribute('data-snippet') || '';
                    if (origEl) origEl.style.display = 'none';
                } else {
                    expandBtn.classList.add('is-expanded');
                    expandBtn.setAttribute('aria-expanded', 'true');
                    expandBtn.setAttribute('title', 'Collapse verse');
                    if (engEl) engEl.innerHTML = engEl.getAttribute('data-full-html') || engEl.getAttribute('data-full') || '';
                    if (origEl) origEl.style.display = 'block';
                }
            });
        }

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
        
        const getDims = () => {
            const container = canvas.parentElement || this.loading || this.canvasContainer;
            const rect = container ? container.getBoundingClientRect() : null;
            const w = Math.max(280, Math.floor((rect && rect.width) || canvas.clientWidth || 800));
            const h = Math.max(200, Math.floor((rect && rect.height) || canvas.clientHeight || 600));
            return { w, h };
        };

        let { w: width, h: height } = getDims();
        let cx = width / 2;
        let cy = height / 2;
        
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        
        const isVerses = (type === 'verses' || this.viewMode === 'verses');
        const isChapters = !isVerses && (type === 'chapters' || this.viewMode === 'chapters');
        const isBooks = !isVerses && !isChapters && (type === 'books' || this.viewMode === 'books');

        // Colors matching the Part-of-Speech or Book Genre palette
        const wordsColors = ['#4ade80', '#60a5fa', '#f472b6', '#fbbf24', '#a78bfa', '#38bdf8', '#94a3b8'];
        const booksColors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#ef4444', '#06b6d4', '#e11d48'];
        const colors = (isBooks || isVerses || isChapters) ? booksColors : wordsColors;
        
        const area = width * height;
        const numParticles = Math.min(42, Math.max(28, Math.floor(area / 24000)));
        const particles = [];
        
        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x: Math.random() * (width - 40) + 20,
                y: Math.random() * (height - 40) + 20,
                vx: (Math.random() - 0.5) * 1.0,
                vy: (Math.random() - 0.5) * 1.0,
                radius: Math.random() * 2.2 + 2.0,
                color: colors[i % colors.length]
            });
        }
        
        const wordsTips = [
            "Search any word in the Bible to view semantic neighbors",
            "Select a word bubble to inspect definitions and verse usage",
            "Explore original Greek & Hebrew definitions and morphology",
            "Observe connecting lines representing high cosine similarity",
            "Filter by Old or New Testament in the Options drawer"
        ];
        const booksTips = [
            "Explore biblical books mapped across multi-dimensional semantic space",
            "Click any book to view its distinctive vocabulary and theological themes",
            "Search multiple books to compare shared theological motifs",
            "Solid green links show direct lexical occurrences in that book",
            "Dashed gray links show broader theological concepts across the canon",
            "Filter books by genre or testament in the Options drawer"
        ];
        const versesTips = [
            "Explore biblical verses mapped by semantic centroids",
            "Discover unbiased cross-references based on 100D vector similarity",
            "Toggle between cross-reference networks and constituent word constellations",
            "Search multiple verses to find semantic bridges across the canon",
            "Compare Old and New Testament thematic parallels"
        ];
        const chaptersTips = [
            "Explore biblical chapters mapped by semantic centroids in 100D vector space",
            "Read full chapters verse-by-verse with parallel Greek or Latin original text",
            "Discover semantic chapter connections, verse cross-references, or key words",
            "Navigate seamlessly up and down: Word <-> Verse <-> Chapter <-> Book",
            "Compare Old and New Testament narrative and theological arcs"
        ];
        const vulTips = [
            "Explore Jerome's Latin Vulgate in 100-dimensional semantic space",
            "Pair Latin lemmas and inflections with Douay-Rheims English text",
            "Search theological terms across all 73 books of the historic Latin canon",
            "Discover semantic relationships formed by Jerome's classical translation"
        ];
        const lxxTips = [
            "Explore the original Greek Septuagint and Greek New Testament",
            "Original Greek lemmas paired with TBESG definitions and morphology",
            "Compare Greek Old and New Testament lexical networks across biblical eras",
            "Search Greek transliterations, Strong's numbers, or English glosses"
        ];
        
        let tips = isChapters ? chaptersTips : (isVerses ? versesTips : (isBooks ? booksTips : wordsTips));
        if (this.foundation === 'vul') {
            tips = [...vulTips, ...tips];
        } else if (this.foundation === 'lxx') {
            tips = [...lxxTips, ...tips];
        }
        
        let tipIdx = 0;
        
        const STATE_FLOAT = 0;
        const STATE_GRAVITATE = 1;
        const STATE_SHOW_TIP = 2;
        const STATE_EXPLODE = 3;
        
        let state = STATE_FLOAT;
        let stateStartTime = performance.now();

        let isCollapsing = false;
        let collapseStartTime = 0;
        let collapseDuration = 950;
        let collapseCallback = null;
        let collapseParticles = null;

        const getScreenPos = (node) => {
            if (!node || typeof node.x !== 'number' || typeof node.y !== 'number') return null;
            if (this.transform) {
                const k = this.transform.k || 1;
                const tx = this.transform.x || 0;
                const ty = this.transform.y || 0;
                const sx = (typeof this.transform.applyX === 'function') ? this.transform.applyX(node.x) : (node.x * k + tx);
                const sy = (typeof this.transform.applyY === 'function') ? this.transform.applyY(node.y) : (node.y * k + ty);
                if (Number.isFinite(sx) && Number.isFinite(sy)) return { x: sx, y: sy };
            }
            return { x: node.x, y: node.y };
        };

        this._triggerParticleCollapse = (duration = 950, onComplete) => {
            if (isCollapsing) return;
            isCollapsing = true;
            collapseStartTime = performance.now();
            collapseDuration = duration;
            collapseCallback = onComplete;
            collapseParticles = null;
            if (this.loadingTip) this.loadingTip.classList.remove('visible');
        };
        
        const updateTipText = () => {
            if (this.loadingTip) {
                this.loadingTip.textContent = tips[tipIdx % tips.length];
                tipIdx++;
            }
        };
        updateTipText();
        
        const animate = (now) => {
            const dims = getDims();
            if (dims.w !== width || dims.h !== height) {
                width = dims.w;
                height = dims.h;
                cx = width / 2;
                cy = height / 2;
                canvas.width = width * dpr;
                canvas.height = height * dpr;
                ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            }
            
            const elapsed = now - stateStartTime;
            ctx.clearRect(0, 0, width, height);

            if (isCollapsing) {
                if (!collapseParticles) {
                    // Identify keyword centers (word mode keywords, book centers, verse centers, or focused chapters)
                    const kwNodes = (this.nodes || []).filter(n => n && (n.isKw || n.isTargetBook || n.isTargetVerse || n.isVerseCenter || n.isFocusedChapter));
                    collapseParticles = particles.map((p, idx) => {
                        let targetNode = null;
                        if (kwNodes.length > 0) {
                            let bestDistSq = Infinity;
                            for (let kn of kwNodes) {
                                const pos = getScreenPos(kn);
                                if (pos) {
                                    const dx = p.x - pos.x;
                                    const dy = p.y - pos.y;
                                    const dSq = dx * dx + dy * dy;
                                    if (dSq < bestDistSq) {
                                        bestDistSq = dSq;
                                        targetNode = kn;
                                    }
                                }
                            }
                            if (!targetNode) targetNode = kwNodes[idx % kwNodes.length];
                        }
                        return {
                            p,
                            startX: p.x,
                            startY: p.y,
                            targetNode
                        };
                    });
                }

                const progress = Math.min(1, (now - collapseStartTime) / collapseDuration);
                // Smooth cubic ease-out deceleration towards keyword centers
                const ease = 1 - Math.pow(1 - progress, 3);
                // Simultaneously fade out particles as they converge
                const alpha = Math.max(0, 1 - progress);

                // Drop connecting lines: zero lines rendered during exit transition

                ctx.globalAlpha = alpha;
                for (let item of collapseParticles) {
                    let tx = cx;
                    let ty = cy;
                    if (item.targetNode) {
                        const pos = getScreenPos(item.targetNode);
                        if (pos) {
                            tx = pos.x;
                            ty = pos.y;
                        }
                    }
                    const curX = item.startX + (tx - item.startX) * ease;
                    const curY = item.startY + (ty - item.startY) * ease;
                    ctx.fillStyle = item.p.color;
                    ctx.beginPath();
                    ctx.arc(curX, curY, item.p.radius, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.globalAlpha = 1.0;

                if (progress >= 1) {
                    if (collapseCallback) {
                        const cb = collapseCallback;
                        collapseCallback = null;
                        cb();
                    }
                    return;
                }

                this.loadingAnimId = requestAnimationFrame(animate);
                return;
            }
            
            if (state === STATE_FLOAT) {
                if (this.loadingTip) this.loadingTip.classList.remove('visible');
                // Floating ambient motion across full canvas
                for (let p of particles) {
                    p.x += p.vx;
                    p.y += p.vy;
                    if (p.x < 15) { p.x = 15; p.vx = Math.abs(p.vx); }
                    if (p.x > width - 15) { p.x = width - 15; p.vx = -Math.abs(p.vx); }
                    if (p.y < 15) { p.y = 15; p.vy = Math.abs(p.vy); }
                    if (p.y > height - 15) { p.y = height - 15; p.vy = -Math.abs(p.vy); }
                }
                
                if (elapsed > 2800) {
                    state = STATE_GRAVITATE;
                    stateStartTime = now;
                }
            } else if (state === STATE_GRAVITATE) {
                // Accelerate towards center
                for (let p of particles) {
                    const dx = cx - p.x;
                    const dy = cy - p.y;
                    p.vx += dx * 0.04;
                    p.vy += dy * 0.04;
                    p.vx *= 0.88;
                    p.vy *= 0.88;
                    p.x += p.vx;
                    p.y += p.vy;
                }
                
                if (elapsed > 900) {
                    state = STATE_SHOW_TIP;
                    stateStartTime = now;
                    if (this.loadingTip) this.loadingTip.classList.add('visible');
                }
            } else if (state === STATE_SHOW_TIP) {
                // Gentle clustering & orbiting in an elliptical halo around the central tip card
                const t = (now - stateStartTime) * 0.0025;
                const tipRect = this.loadingTip ? this.loadingTip.getBoundingClientRect() : null;
                const baseRx = tipRect && tipRect.width ? Math.max(160, (tipRect.width / 2) + 30) : Math.min(width * 0.35, 240);
                const baseRy = tipRect && tipRect.height ? Math.max(75, (tipRect.height / 2) + 25) : Math.min(height * 0.26, 110);
                
                for (let i = 0; i < particles.length; i++) {
                    const p = particles[i];
                    const targetAngle = (i / particles.length) * Math.PI * 2 + t;
                    const orbitRx = baseRx + Math.sin(t * 2 + i * 0.7) * 20;
                    const orbitRy = baseRy + Math.cos(t * 2 + i * 0.7) * 16;
                    const targetX = cx + Math.cos(targetAngle) * orbitRx;
                    const targetY = cy + Math.sin(targetAngle) * orbitRy;
                    
                    p.x += (targetX - p.x) * 0.08;
                    p.y += (targetY - p.y) * 0.08;
                }
                
                if (elapsed > 3200) {
                    state = STATE_EXPLODE;
                    stateStartTime = now;
                    if (this.loadingTip) this.loadingTip.classList.remove('visible');
                    // Explode outwards across full map
                    for (let p of particles) {
                        const angle = Math.atan2(p.y - cy, p.x - cx) + (Math.random() - 0.5) * 0.5;
                        const speed = Math.random() * (Math.min(width, height) * 0.016) + 4.5;
                        p.vx = Math.cos(angle) * speed;
                        p.vy = Math.sin(angle) * speed;
                    }
                }
            } else if (state === STATE_EXPLODE) {
                // Bursting outwards with drag across full canvas
                for (let p of particles) {
                    p.vx *= 0.93;
                    p.vy *= 0.93;
                    p.x += p.vx;
                    p.y += p.vy;
                    if (p.x < 15) { p.x = 15; p.vx = Math.abs(p.vx); }
                    if (p.x > width - 15) { p.x = width - 15; p.vx = -Math.abs(p.vx); }
                    if (p.y < 15) { p.y = 15; p.vy = Math.abs(p.vy); }
                    if (p.y > height - 15) { p.y = height - 15; p.vy = -Math.abs(p.vy); }
                }
                
                if (elapsed > 750) {
                    state = STATE_FLOAT;
                    stateStartTime = now;
                    updateTipText();
                    for (let p of particles) {
                        p.vx = (Math.random() - 0.5) * 1.0;
                        p.vy = (Math.random() - 0.5) * 1.0;
                    }
                }
            }
            
            // Draw connecting lines between close particles in a single batched pass
            const baseDist = Math.min(100, Math.max(60, Math.min(width, height) * 0.12));
            const maxDist = (state === STATE_GRAVITATE || state === STATE_SHOW_TIP) ? baseDist * 0.75 : baseDist;
            const maxDistSq = maxDist * maxDist;
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'rgba(150, 150, 150, 0.22)';
            ctx.beginPath();
            let hasLines = false;
            for (let i = 0; i < particles.length; i++) {
                const p1 = particles[i];
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const distSq = dx * dx + dy * dy;
                    if (distSq < maxDistSq) {
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        hasLines = true;
                    }
                }
            }
            if (hasLines) {
                ctx.stroke();
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
        this._triggerParticleCollapse = null;
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
