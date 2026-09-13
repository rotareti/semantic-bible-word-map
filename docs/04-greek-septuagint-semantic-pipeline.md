# Greek Septuagint (LXX) Semantic Pipeline

This document outlines the architecture, data sources, mathematical formulation, and integration strategy for establishing the ancient Greek Septuagint (LXX) and Greek New Testament as the underlying semantic foundation of the Semantic Bible word map.

## 1. Motivation: A Single Linguistic Vector Space

In the traditional English pipeline (BSB), the Old Testament is translated from ancient Hebrew (and Aramaic), while the New Testament is translated from Koine Greek. While English translations bridge these testaments linguistically, English words can obscure direct lexical continuity or introduce translation bias.

The Septuagint (LXX), translated into Koine Greek by Jewish scholars in Alexandria between the 3rd and 2nd centuries BC, was the Scripture of the early Christian church and the text most frequently quoted by the New Testament authors.

By training our embeddings on a unified Koine Greek corpus spanning both the Old Testament (Septuagint) and the New Testament (Greek NT):
- **Universal Vocabulary**: Theological concepts like *nomos* (law/Torah), *dikaiosyne* (righteousness), *agape* (love), *pneuma* (spirit), and *christos* (anointed/Messiah) exist in the exact same vector space across both testaments.
- **Organic Typology and Intertextuality**: Cross-testament verse connections and book centroids are calculated on the identical Greek lexical roots shared between the prophetic texts and apostolic writings.
- **Direct Quoting Coherence**: Prophetic quotations in the Gospels and Epistles share exact Greek word alignments with their Septuagint originals.

## 2. Canon and Data Sources Selection

### Old Testament: Alfred Rahlfs 1935 Septuagint (LXX)
- **Source**: The Alfred Rahlfs 1935 edition of the Septuagint, digitized by the Computer Assisted Tools for Septuagint Studies (CATSS / CCAT) project and curated with morphological tagging and Strong's numbers (as compiled in `eliranwong/LXX-Rahlfs-1935`).
- **Canon Scope**: The complete 54-book Septuagint Old Testament, including both the 39 Protocanonical books and the 15 Deuterocanonical / Apocryphal books (1 Esdras, Tobit, Judith, Esther with additions, 1--4 Maccabees, Wisdom of Solomon, Sirach, Baruch, Letter of Jeremiah, Susanna, Bel and the Dragon, Psalms of Solomon, Odes). Comprises 28,861 verses.
- **Versification Alignment**: Verses are aligned to Septuagint and standard chapter/verse references with English translations supplied primarily by Sir Lancelot Brenton (1844) and direct interlinear glosses.

### New Testament: Nestle-Aland / SBL Greek New Testament
- **Source**: The Nestle-Aland (NA27/28) / SBLGNT base Greek text, tagged with Strong's Greek numbers, exact verse references, and grammatical parsing (from `bsb_tables.tsv` and Tyndale House / STEPBible `TAGNT`).
- **Canon Scope**: The 27 canonical New Testament books (`MAT` through `REV`), comprising 7,957 verses.

### Lexical Mapping and Concise Glosses: STEPBible TBESG
- **Source**: Translators Brief Lexicon of Extended Strong's for Greek (`TBESG`), created by Tyndale House Cambridge and STEPBible.org (Licensed under CC BY 4.0).
- **Coverage**: 11,036 Greek lemmas with morphology, transliteration, Extended Strong's numbers (`G0001` through `G9979`), and concise English glosses.

## 3. Greek-to-English Display Mapping (1 to 3 Words)

The user requirement states: "the words on the map need to be in English even though the Greek would be in the relationship between the words. Figure out how to map every Greek word to 1 or max 3 English words."

### Strategy
1. **Primary Canvas Label**: Every Greek lemma is displayed on the map using a crisp 1 to 3 word English gloss extracted from the `TBESG` lexicon (e.g., `ἀγάπη` -> "love", `λόγος` -> "word", `σωτηρία` -> "salvation", `ποιέω` -> "do / make").
2. **Disambiguation with Grammatical Roles**: Like the English map, Greek lemmas retain part-of-speech tags to differentiate homonyms (e.g., `λόγος_NOUN` vs `λέγω_VERB`).
3. **Inspector & Card Details**: When a user inspects a node, the card displays:
   - Primary English label (e.g., "love")
   - Original Greek lemma (e.g., "ἀγάπη")
   - Academic transliteration (e.g., "agapē")
   - Strong's Greek identifier (e.g., "G26")
   - Full lexical definition and grammatical parsing
4. **Omni-Search Support**: The search engine allows searching interchangeably by English ("love"), Greek ("ἀγάπη"), transliteration ("agape"), or Strong's number ("G26").

## 4. Pipeline Workflow

```
[LXX Rahlfs 1935 CSV] + [GNT Base TSV]
                 │
                 ▼
       pipeline/build_lxx.py
   (Extract Greek lemmas, filter stopwords, 
    align verses, map Strong's codes)
                 │
      ┌──────────┴──────────┐
      ▼                     ▼
ot_text_lxx.txt      nt_text_lxx.txt
      │                     │
      └──────────┬──────────┘
                 ▼
  pipeline/train_embeddings_lxx.py
    (Word2Vec Skip-gram, 100D, window=5)
                 │
                 ▼
        word2vec_lxx.model
                 │
                 ▼
    pipeline/generate_map_lxx.py
    (UMAP 2D, TBESG 1-3 English gloss join)
                 │
                 ├───────────────────────────────┐
                 ▼                               ▼
       wordmap_2d_lxx.json              verse_index_lxx.json
                 │                               │
                 ├───────────────────────────────┤
                 ▼                               ▼
pipeline/generate_verse_centroids_lxx.py   pipeline/generate_book_centroids_lxx.py
                 │                               │
                 ▼                               ▼
       versemap_2d_lxx.json             bookmap_2d_lxx.json
```

## 5. Centroid Recalculation

### Verse Centroids in Greek Vector Space
For each verse $v$ containing Greek content lemmas $W_v$, the centroid is computed using Inverse Verse Frequency (IVF):

$$\text{IVF}(w) = \ln\left(\frac{N + 1.0}{\text{df}(w) + 1.0}\right) + 1.0$$

$$\mathbf{u}_v = \sum_{w \in W_v} \text{IVF}(w) \cdot \mathbf{v}_{\text{Greek}}(w)$$

$$\mathbf{c}_v = \frac{\mathbf{u}_v}{\|\mathbf{u}_v\|_2}$$

Top-32 cross-references are computed via matrix dot product between normalized 100-dimensional Greek verse centroids:

$$\text{sim}(v_i, v_j) = \mathbf{c}_{v_i} \cdot \mathbf{c}_{v_j}$$

### Book Centroids in Greek Vector Space
Composite 100-dimensional book vectors for all 81 canonical books (54 Old Testament books including 15 Deuterocanonical books + 27 New Testament books) are computed from the Greek vocabulary distributions using sublinear term frequency and smoothed inverse book frequency. Dimensionality reduction to 2D is performed using Classical Multidimensional Scaling (MDS) on the cosine distance matrix, maintaining global continuity across the Old and New Testaments without artificial clustering gaps. Nearest-neighbor links and top cross-testament semantic bridges connect the canonical corpus into an interconnected continuum.

## 6. Frontend Switching and Fallback Architecture

In the Options drawer on the left:
- **Semantic Foundation** selector:
  - `[ BSB (Berean English) ]` (Default on main branch)
  - `[ LXX (Septuagint Greek) ]` (81 books, unified Greek vector space)
- Switching the foundation reloads the dataset attributes while preserving the active view mode (`words`, `verses`, or `books`):
  - LXX: `wordmap_2d_lxx.json`, `verse_index_lxx.json`, `versemap_2d_lxx.json`, `bookmap_2d_lxx.json`
  - BSB: `wordmap_2d.json`, `verse_index.json`, `versemap_2d.json`, `bookmap_2d.json`
- Supports URL query parameter: `?canon=lxx` vs `?canon=bsb` (with backward compatibility for `?base=`).

### Cross-Canon Fallback & Graceful Degradation
To prevent broken URL states when navigating or sharing links across different canons:
1. **Book Selection Fallback**:
   - If a user switches from LXX to BSB while viewing a book exclusive to the LXX (such as `TOB`, `SIR`, or `1MA`), or visits a URL like `canon=bsb&book=tobit`, the application detects that no matched books exist in the target canon. It gracefully clears the URL query parameter and drops back to the full canonical book map.
   - For multi-book queries (e.g., `books=GEN,TOB`), the application filters out invalid books, keeps valid books (`GEN`), and updates the URL accordingly.
2. **Verse Selection Fallback**:
   - If a user switches canons while viewing a verse reference nonexistent in the target canon (e.g., `TOB 1:1` in BSB), the application clears the `verses` parameter and falls back to the full verse map.
3. **Word Selection Fallback**:
   - When switching canons, the application resolves active words across vocabularies by English gloss or lemma text. If a word or concept does not exist in the target canon, it notifies the user, clears the `keywords` URL parameter, and returns to the full landscape word map.
