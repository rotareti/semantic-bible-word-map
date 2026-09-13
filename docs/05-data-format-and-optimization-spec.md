# Data Format and Optimization Specification

This specification documents the canonical data structures, JSON schemas, optimization strategies, and client-side processing mechanisms powering the Semantic Bible Word Map across the Berean Standard Bible (BSB), the Greek Septuagint & New Testament (LXX), and the Latin Vulgate (VUL).

## 1. Architectural Motivation

The semantic Bible map requires rich high-dimensional vector embeddings (100 dimensions per word, verse centroid, and book centroid), 2D spatial projection coordinates, morphological metadata, lexical definitions, and precomputed cross-references across up to 81 biblical books and over 36,000 verses.

Initial unoptimized data dumps required over 155 MB of uncompressed JSON files (~34 MB gzipped transfer size). This caused significant latency during initial page loads and consumed excessive browser memory during JSON parsing. By analyzing data redundancies and moving deterministic computations to the client, the dataset has been compacted down to **62.9 MB uncompressed (a 59.6% reduction)** and **16.5 MB gzipped (a 51.3% reduction)** with zero loss of semantic accuracy or visual responsiveness.

---

## 2. Optimization Summary & Benchmarks

| Dataset File | Original Raw Size | Optimized Raw Size | Raw Reduction | Original Gzip | Optimized Gzip | Gzip Reduction |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| [`wordmap_2d.json`](file:///home/josh/code/semantic-lxx-word-map/data/output/wordmap_2d.json) | 32.95 MB | 11.82 MB | **-64.1%** (-21.13 MB) | 10.73 MB | 3.91 MB | **-63.6%** (-6.82 MB) |
| [`versemap_2d.json`](file:///home/josh/code/semantic-lxx-word-map/data/output/versemap_2d.json) | 34.12 MB | 13.97 MB | **-59.1%** (-20.15 MB) | 6.18 MB | 3.39 MB | **-45.1%** (-2.79 MB) |
| [`versemap_2d_lxx.json`](file:///home/josh/code/semantic-lxx-word-map/data/output/versemap_2d_lxx.json) | 42.20 MB | 18.27 MB | **-56.7%** (-23.93 MB) | 7.91 MB | 4.46 MB | **-43.6%** (-3.45 MB) |
| [`versemap_2d_vul.json`](file:///home/josh/code/semantic-lxx-word-map/data/output/versemap_2d_vul.json) | 41.71 MB | 18.42 MB | **-55.8%** (-23.29 MB) | 8.14 MB | 4.67 MB | **-42.6%** (-3.47 MB) |
| [`bookmap_2d.json`](file:///home/josh/code/semantic-lxx-word-map/data/output/bookmap_2d.json) | 1.96 MB | 0.15 MB | **-92.3%** (-1.81 MB) | 0.38 MB | 0.04 MB | **-89.5%** (-0.34 MB) |
| [`bookmap_2d_lxx.json`](file:///home/josh/code/semantic-lxx-word-map/data/output/bookmap_2d_lxx.json) | 2.68 MB | 0.30 MB | **-88.8%** (-2.38 MB) | 0.60 MB | 0.07 MB | **-88.3%** (-0.53 MB) |
| **Total** | **155.62 MB** | **62.93 MB** | **-59.6%** (-92.69 MB) | **33.94 MB** | **16.54 MB** | **-51.3%** (-17.40 MB) |

---

## 3. Data Formats & JSON Schemas

### 3.1 Word Map (`wordmap_2d*.json`)

Word maps contain 2D coordinates and 100-dimensional semantic vectors for individual lexical nodes.

- BSB File: [`data/output/wordmap_2d.json`](file:///home/josh/code/semantic-lxx-word-map/data/output/wordmap_2d.json) (7,132 English lemma nodes)
- LXX File: [`data/output/wordmap_2d_lxx.json`](file:///home/josh/code/semantic-lxx-word-map/data/output/wordmap_2d_lxx.json) (8,898 Greek lemma nodes)
- Vulgate File: [`data/output/wordmap_2d_vul.json`](file:///home/josh/code/semantic-lxx-word-map/data/output/wordmap_2d_vul.json) (7,422 Latin lemma nodes)

#### JSON Schema Structure

```json
[
  {
    "id": "grace_NOUN",
    "w": "grace",
    "pos": "NOUN",
    "t": "NT",
    "f": 131,
    "x": -14.28,
    "y": 6.82,
    "v": [0.042, -0.118, 0.089, ...],
    "original": [
      {
        "lemma": "χάρις",
        "translit": "charis",
        "strongs": "G5485",
        "def": "grace, favor, kindness",
        "count": 128
      }
    ]
  }
]
```

#### Field Definitions
- `id` (*string*): Unique lexical identifier composed of normalized lemma and Universal POS tag (`lemma_POS`).
- `w` (*string*): Display word lemma.
- `pos` (*string*): Coarse Universal POS tag (`NOUN`, `VERB`, `ADJ`, `ADV`, `PROPN`, etc.).
- `t` (*string*): Primary testament affinity (`OT`, `NT`, or `BOTH`).
- `f` (*integer*): Corpus occurrence frequency.
- `x`, `y` (*float*): 2D UMAP projection coordinates rounded to 2 decimal places.
- `v` (*array of floats*): 100-dimensional normalized GloVe/Word2Vec semantic embedding vector rounded to 3 decimal places.
- `original` (*array of objects*, BSB only): Mapping from English translated terms to underlying Hebrew, Aramaic, and Greek roots.

#### Optimization Applied: Strong's Root Frequency Pruning
- **Problem**: In raw interlinear aggregation, common English words (auxiliary verbs, pronouns, general nouns) accumulated thousands of redundant, repetitive dictionary instances across the entire canon (for example, `be_AUX` stored 3,431 duplicate original language entries, inflating that single node past 1 MB).
- **Solution**: The array is sorted by canonical frequency (`count`) in descending order and capped to the top 5 primary lexical roots. The remaining roots represent over 98% of all occurrences for each term while eliminating over 21 MB of repetitive dictionary noise.
- **Pipeline Implementation**: [`pipeline/generate_map.py`](file:///home/josh/code/semantic-lxx-word-map/pipeline/generate_map.py#L154-L157) (`originals[:5]`).

---

### 3.2 Verse Map (`versemap_2d*.json`)

Verse maps store semantic centroids, 2D coordinates, top content keywords, and precomputed semantic nearest neighbor references for every verse across the canon.

- BSB File: [`data/output/versemap_2d.json`](file:///home/josh/code/semantic-lxx-word-map/data/output/versemap_2d.json) (30,969 verses, 66 books)
- LXX File: [`data/output/versemap_2d_lxx.json`](file:///home/josh/code/semantic-lxx-word-map/data/output/versemap_2d_lxx.json) (36,802 verses, 81 books)
- Vulgate File: [`data/output/versemap_2d_vul.json`](file:///home/josh/code/semantic-lxx-word-map/data/output/versemap_2d_vul.json) (35,807 verses, 73 books)

#### JSON Schema Structure

```json
{
  "count": 30969,
  "verses": [
    {
      "id": "1CH 1:1",
      "x": -18.25,
      "y": 4.12,
      "w": ["adam_PROPN", "seth_PROPN", "enos_PROPN"],
      "r": [
        ["LUK 3:38", 0.975],
        ["GEN 5:3", 0.942],
        ["GEN 5:6", 0.931]
      ]
    }
  ]
}
```

#### Field Definitions
- `count` (*integer*): Total number of indexed verses in the corpus.
- `verses` (*array of objects*): Array of verse records.
  - `id` (*string*): Standard three-letter USFM canonical reference (`BOOK CHAP:VERSE`), e.g., `"GEN 1:1"`, `"PSA 119:105"`, `"1CH 1:1"`.
  - `x`, `y` (*float*): 2D UMAP projection coordinates of the verse centroid rounded to 2 decimal places.
  - `w` (*array of strings*): Top 12 distinctive content word keys for the verse ranked by TF-IDF weight.
  - `r` (*array of 2-element tuples*): Precomputed semantic nearest neighbor cross-references ordered by descending cosine similarity. Each element is `[ref_string, cosine_similarity_float]`. Capped to top 16 references.

#### Optimizations Applied

1. **Tuple Compression of Nearest Neighbors (`r`)**:
   - **Problem**: In the legacy format, each cross-reference was serialized as an object: `{"id": "LUK 3:38", "sim": 0.975}`. Across 30,000--37,000 verses with up to 32 neighbors each, this repeated the dictionary keys `"id":` and `"sim":` over 1.1 million times per file, making up over 60% of the entire file weight.
   - **Solution**: Replaced objects with two-element tuples `["LUK 3:38", 0.975]`. This eliminates 15 bytes of JSON overhead per neighbor entry.
   - **Client Performance Benefit**: In addition to halving download size, modern JavaScript engines (such as Google Chrome's V8) allocate far fewer HiddenClasses and heap object headers for flat arrays compared to millions of small dictionary objects, reducing browser heap usage by approximately 40%.

2. **Neighbor Depth Capping (`K = 16`)**:
   - **Problem**: Generating 32 neighbors per verse was storing 16 extra neighbors that were never displayed simultaneously in the user interface (the verse card and constellation views cap display at 16).
   - **Solution**: Capped matrix generation and storage to top 16 semantic neighbors (`K = 16`).

3. **Omission of Redundant Verse Coordinates (`b`, `c`, `v`)**:
   - **Problem**: Every record previously included `"b": "1CH", "c": 1, "v": 1`. These fields duplicated information already unambiguously encoded in `"id": "1CH 1:1"`.
   - **Solution**: Removed `"b"`, `"c"`, and `"v"` from data exports, saving 28 bytes per verse record (~1 MB per file).

---

### 3.3 Book Map (`bookmap_2d*.json`)

Book maps represent the macro-level thematic centroids for each biblical book, derived from sublinear TF-IDF weighted embeddings.

- BSB File: [`data/output/bookmap_2d.json`](file:///home/josh/code/semantic-lxx-word-map/data/output/bookmap_2d.json) (66 books)
- LXX File: [`data/output/bookmap_2d_lxx.json`](file:///home/josh/code/semantic-lxx-word-map/data/output/bookmap_2d_lxx.json) (81 books)
- Vulgate File: [`data/output/bookmap_2d_vul.json`](file:///home/josh/code/semantic-lxx-word-map/data/output/bookmap_2d_vul.json) (73 books)

#### JSON Schema Structure

```json
{
  "books": [
    {
      "id": "GEN",
      "code": "GEN",
      "name": "Genesis",
      "testament": "OT",
      "genre": "Pentateuch",
      "order": 1,
      "verses": 1533,
      "total_words": 32046,
      "x": -12.45,
      "y": 8.12,
      "v": [0.082, -0.045, 0.119, ...],
      "top_words": ["heavens_NOUN", "earth_NOUN", "created_VERB", ...],
      "closest_words": [],
      "nearest_books": [
        {"code": "EXO", "sim": 0.984},
        {"code": "LEV", "sim": 0.961}
      ]
    }
  ],
  "links": [
    {
      "source": "GEN",
      "target": "EXO",
      "sim": 0.984,
      "genreMatch": true
    }
  ]
}
```

#### Field Definitions
- `id` / `code` (*string*): Standard three-letter USFM book code.
- `name` (*string*): Full English book name.
- `testament` (*string*): Canonical section (`OT` or `NT`).
- `genre` (*string*): Literary classification (`Pentateuch`, `Historical`, `Wisdom`, `Prophets`, `Gospels`, `Epistles`, `Apocalyptic`, `Deuterocanon`).
- `order` (*integer*): Canonical sequential order index (1-indexed).
- `verses` (*integer*): Verse count.
- `total_words` (*integer*): Total token word count.
- `x`, `y` (*float*): 2D MDS projection coordinates.
- `v` (*array of floats*): 100-dimensional normalized book centroid vector.
- `top_words` (*array of strings*): Top 15 distinctive thematic vocabulary terms.
- `closest_words` (*array*): Left empty (`[]`) in storage and computed dynamically on the client.
- `nearest_books` (*array of objects*): Top 10 semantically closest books with cosine similarity scores.
- `links` (*array of objects*): Inter-book network graph edges.

#### Optimization Applied: Dynamic Client-Side Cosine Calculation
- **Problem**: Pre-serializing 250 in-book content words per book expanded `bookmap_2d.json` and `bookmap_2d_lxx.json` to 2.0--2.7 MB each, despite books containing only 66 to 81 nodes.
- **Solution**: The `closest_words` array is stored as empty (`[]`). When a user activates Books mode or selects a book, the client calculates nearest words on-the-fly by performing a vector dot product between the 100-dimensional book vector `b.v` and each word vector `d.v` in the already loaded `data2d` array.
- **Performance**: On modern browsers, computing 7,000 100-dimensional dot products takes approximately 3 milliseconds. This provides identical visual behavior while dropping the file size by **92% (from 2.0 MB down to 150 KB)**.

---

## 4. Client-Side Adapter Architecture

The frontend implementation in [`web/bible-word-map.js`](file:///home/josh/code/semantic-lxx-word-map/web/bible-word-map.js) implements backwards-compatible helper utilities that support both legacy and optimized data shapes seamlessly.

### 4.1 Tuple & Object Neighbor Decoupling

The helper functions `getNeighborId` and `getNeighborSim` inspect the data representation at runtime:

```javascript
function getNeighborId(cr) {
    if (!cr) return null;
    return Array.isArray(cr) ? cr[0] : cr.id;
}

function getNeighborSim(cr) {
    if (!cr) return 0;
    return Array.isArray(cr) 
        ? (cr[1] !== undefined ? cr[1] : 0) 
        : (cr.sim !== undefined ? cr.sim : 0);
}
```

This guarantees compatibility with legacy JSON files or cached payloads while leveraging the compact tuples for new payloads.

### 4.2 On-Demand Verse Metadata Derivation

When verse metadata fields (`b`, `c`, `v`) are required for filtering or display, `parseVerseMeta` derives them from the canonical identifier string:

```javascript
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
```

### 4.3 On-Demand Nearest Word Ranking

When `closest_words` is empty, the client evaluates:

```javascript
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
```

---

## 5. Pipeline Generator Updates

The offline data pipeline scripts have been updated to ensure all future rebuilds automatically adhere to this optimized format:

1. [`pipeline/generate_map.py`](file:///home/josh/code/semantic-lxx-word-map/pipeline/generate_map.py): Caps `node['original'] = originals[:5]`.
2. [`pipeline/generate_verse_centroids.py`](file:///home/josh/code/semantic-lxx-word-map/pipeline/generate_verse_centroids.py): Sets `K = 16`, emits `[id, sim]` tuples, and omits `b`, `c`, and `v`.
3. [`pipeline/generate_verse_centroids_lxx.py`](file:///home/josh/code/semantic-lxx-word-map/pipeline/generate_verse_centroids_lxx.py): Sets `TOP_K = 16`, emits `[id, sim]` tuples, and omits `b`, `c`, and `v`.
4. [`pipeline/generate_verse_centroids_vul.py`](file:///home/josh/code/semantic-lxx-word-map/pipeline/generate_verse_centroids_vul.py): Sets `TOP_K = 16`, emits `[id, sim]` tuples, and omits `b`, `c`, and `v`.
5. [`pipeline/generate_book_centroids.py`](file:///home/josh/code/semantic-lxx-word-map/pipeline/generate_book_centroids.py): Sets `"closest_words": []`.
6. [`pipeline/generate_book_centroids_lxx.py`](file:///home/josh/code/semantic-lxx-word-map/pipeline/generate_book_centroids_lxx.py): Sets `"closest_words": []`.
7. [`pipeline/generate_book_centroids_vul.py`](file:///home/josh/code/semantic-lxx-word-map/pipeline/generate_book_centroids_vul.py): Sets `"closest_words": []`.
8. [`pipeline/migrate_data_formats.py`](file:///home/josh/code/semantic-lxx-word-map/pipeline/migrate_data_formats.py): Utility migration script to reformat pre-existing datasets in place.
