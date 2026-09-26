# Architectural Specification & Guide: Christocentric Semantic Mapping

**Project:** SymBible Semantic Word Map (Berean Standard Bible, Septuagint, Clementine Vulgate)  
**Date:** September 26, 2026  
**Document ID:** `docs/15-christocentric-map-architecture.md`  
**Related Components:** [`pipeline/christ_anchor.py`](file:///home/josh/code/semantic-lxx-word-map/pipeline/christ_anchor.py), [`pipeline/corpus_manager.py`](file:///home/josh/code/semantic-lxx-word-map/pipeline/corpus_manager.py), [`web/bible-word-map.js`](file:///home/josh/code/semantic-lxx-word-map/web/bible-word-map.js)  

---

## 1. Executive Summary

Biblical narratives, typological motifs, prophetic oracles, and epistolary theology consistently point toward Jesus Christ as their interpretive teleology. Prior versions of the SymBible 2D projection placed vocabulary nodes and corpus centroids in an arbitrary coordinate frame determined by stochastic UMAP optimization (typically centered in the range [6, 15]).

This specification outlines what was done to transform SymBible into a unified **Christocentric** map topology across all canonical foundations (BSB, LXX, VUL) and provides an extensible pipeline driver for historical corpora such as the Early Church Fathers.

---

## 2. What We Did: Summary of Implementation

1. **Engineered Anchor Synthesis Engine:** Built [`pipeline/christ_anchor.py`](file:///home/josh/code/semantic-lxx-word-map/pipeline/christ_anchor.py) implementing a two-stage hybrid anchor (Option C) that combines canonical Messianic lexical synsets with landmark confession verses.
2. **Unified Corpus Management Framework:** Created [`pipeline/corpus_manager.py`](file:///home/josh/code/semantic-lxx-word-map/pipeline/corpus_manager.py) to manage end-to-end processing (parsing, training, map projection, centroid generation) across existing canons and custom future corpora like the Early Church Fathers.
3. **Centered 2D Word Maps at (0, 0):** Updated [`pipeline/generate_map.py`](file:///home/josh/code/semantic-lxx-word-map/pipeline/generate_map.py), `_lxx.py`, and `_vul.py` to calculate the 2D coordinate offset $\mathbf{p}_{\text{Christ}}$ and shift all words so that Christ is located at $(0.0, 0.0)$. Injected canonical anchor pseudo-nodes (`anchor__christ_{canon}`) at the origin.
4. **Centered Verse Centroids:** Updated [`pipeline/generate_verse_centroids.py`](file:///home/josh/code/semantic-lxx-word-map/pipeline/generate_verse_centroids.py), `_lxx.py`, and `_vul.py` to apply identical coordinate translation. Handled the edge case where verses lacking content words (such as genealogies) inherit their parent book coordinates rather than collapsing erroneously to $(0, 0)$.
5. **Centered Chapter Centroids:** Updated [`pipeline/generate_chapter_centroids.py`](file:///home/josh/code/semantic-lxx-word-map/pipeline/generate_chapter_centroids.py), `_lxx.py`, and `_vul.py` with coordinate shifting and polar radius metrics ($r = \sqrt{x^2 + y^2}$).
6. **Centered Book Centroids on the Gospels:** Updated [`pipeline/generate_book_centroids.py`](file:///home/josh/code/semantic-lxx-word-map/pipeline/generate_book_centroids.py), `_lxx.py`, and `_vul.py` so that the 2D MDS projection centers on the centroid of the four Gospels (`MAT`, `MRK`, `LUK`, `JHN`) at $(0, 0)$.
7. **Connected Frontend Engine:** Updated [`web/bible-word-map.js`](file:///home/josh/code/semantic-lxx-word-map/web/bible-word-map.js) to detect precomputed canonical anchor nodes in `computeChristAnchorVector()`.
8. **Preserved Clean UI Presentation:** Omitted intrusive alignment badges from study inspector cards, allowing the natural spatial geometry and concentric distribution of scripture to speak for itself.
9. **Regenerated Static Artifacts:** Recomputed all 2D coordinate files (`wordmap_2d*.json`, `versemap_2d*.json`, `chaptermap_2d*.json`, `bookmap_2d*.json`) across BSB, LXX, and VUL.

---

## 3. How We Made the Map "Christocentric"

Making the map Christocentric required resolving a fundamental tension between high-dimensional distributional semantics ($\mathbb{R}^{100}$) and 2D planar projection ($\mathbb{R}^2$):

### A. The Linear Algebra Constraint in 100D Space
In Word2Vec distributional semantics, semantic affinity is governed by cosine similarity:
$$\text{sim}(\mathbf{u}, \mathbf{v}) = \frac{\mathbf{u} \cdot \mathbf{v}}{\|\mathbf{u}\|_2 \|\mathbf{v}\|_2}$$

If the 100D embedding space were translated by subtracting $\mathbf{v}_{\text{Christ}}$ to force Christ to $\mathbf{0} = (0, 0, \dots, 0)$, then:
1. The magnitude of Christ's vector becomes zero ($\|\mathbf{0}\|_2 = 0$), rendering cosine similarity with Christ mathematically undefined ($\frac{0}{0}$).
2. Translation in vector space is not an inner-product isometry: subtracting $\mathbf{v}_{\text{Christ}}$ would distort the angular relationships between all unrelated vocabulary words.

### B. The Two-Space Solution
To maintain mathematical rigor while achieving an intuitive spatial experience:
- **In 100D Vector Space ($\mathbb{R}^{100}$):** The Christ anchor $\hat{\mathbf{v}}_{\text{Christ}}$ is treated as the invariant **Unit Reference Pole** on the hypersphere $S^{99}$. Angular relationships and cosine similarities between all words remain pristine.
- **In 2D Planar Display Space ($\mathbb{R}^2$):** A rigid Euclidean translation $\mathbf{p}' = \mathbf{p} - \mathbf{p}_{\text{Christ}}$ is applied. Because 2D translation preserves Euclidean distances ($d(\mathbf{p}'_i, \mathbf{p}'_j) = d(\mathbf{p}_i, \mathbf{p}_j)$), local cluster shapes, force simulation stability, and neighborhood topology are completely preserved while fixing $(x_{\text{Christ}}, y_{\text{Christ}}) = (0.0, 0.0)$.

### C. Disambiguating the Theological Vector (Option C: Hybrid Two-Stage Anchor)
To prevent conflation with incidental homographs (such as Joshua in Greek or Jesus Justus in Colossians 4:11) and unify Old and New Testament revelation, the anchor vector $\hat{\mathbf{v}}_{\text{Christ}}$ blends lexical synsets with landmark confession passages:

1. **Stage 1: Lexical Synset Tokens ($\mathbf{v}_{\text{tok}}$):**
   - **BSB (English):** `jesus_PROPN` (0.35), `christ_PROPN` (0.35), `messiah_PROPN` (0.15), `savior_NOUN` (0.10), `lord_NOUN` (0.05)
   - **LXX (Greek):** `jesus_G2424_PROPN` (0.35), `christ_G5547_PROPN` (0.35), `amessias_L700814_PROPN` (0.15), `savior_G4990_NOUN` (0.10), `lord_G2962_NOUN` (0.05)
   - **VUL (Latin):** `jesus_iesus_PROPN` (0.35), `christ_christus_PROPN` (0.35), `savior_salvator_NOUN` (0.15), `savior_saluator_NOUN` (0.05), `lord_dominus_NOUN` (0.05)

2. **Stage 2: Kerygmatic Landmark Verses ($\mathbf{v}_{\text{ver}}$):**
   Inverse Verse Frequency (IVF) weighted centroid of core Christological passages:
   - Matthew 16:16 ("You are the Christ, the Son of the living God.")
   - John 1:1, 1:14 ("The Word became flesh and dwelt among us.")
   - Philippians 2:6-11 (Christ Hymn / Kenosis & Exaltation)
   - Colossians 1:15-20 ("The image of the invisible God, the firstborn over all creation.")
   - Hebrews 1:1-3 ("The radiance of God's glory and the exact representation of His being.")
   - Isaiah 53:5 (Messianic Suffering Servant)

3. **Composite Hybrid Normalization:**
   $$\mathbf{v}_{\text{raw}} = 0.50 \cdot \frac{\mathbf{v}_{\text{tok}}}{\|\mathbf{v}_{\text{tok}}\|_2} + 0.50 \cdot \frac{\mathbf{v}_{\text{ver}}}{\|\mathbf{v}_{\text{ver}}\|_2}, \quad \hat{\mathbf{v}}_{\text{Christ}} = \frac{\mathbf{v}_{\text{raw}}}{\|\mathbf{v}_{\text{raw}}\|_2}$$

   Empirical cosine similarity between the lexical token vector and landmark confession verses demonstrates strong semantic convergence:
   - BSB: 0.7412
   - LXX: 0.6993
   - VUL: 0.7073

---

## 4. Layout Impacts Across Zoom Levels

### A. Book View: Concentric Scriptural Architecture
In the Book Landmark view, centering the MDS projection on the Gospel cluster establishes an intuitive concentric layout:
- **Epicenter ($r \le 0.25$):** All four Gospels reside at the core:
  - Mark: $r = 0.08$
  - Luke: $r = 0.09$
  - Matthew: $r = 0.15$
  - John: $r = 0.23$
- **Inner Ring ($0.5 < r \le 1.5$):** Apostolic narrative and apocalyptic prophecy:
  - Acts: $r = 0.99$
  - Revelation: $r = 1.37$
- **Mid Ring ($1.5 < r \le 2.5$):** Epistles and Pentateuchal narrative:
  - Romans: $r = 2.16$
  - Genesis: $r = 2.26$
- **Outer Ring ($r > 2.5$):** Historical chronicles, Wisdom, and Mosaic civil legislation:
  - Exodus: $r = 2.45$
  - Psalms: $r = 2.80$
  - Leviticus: $r = 3.65$

### B. Chapter & Verse Views
Every chapter and verse coordinate is shifted by $\mathbf{p}_{\text{Christ}}$. Narrative passages depicting Christ's ministry, passion, resurrection, and theological discourses gravitate toward $(0, 0)$. Genealogical, administrative, and ritual records radiate outward toward the periphery.

### C. Word View
The synthetic anchor node (`Jesus Christ (The Messiah, Son of God)`) anchors the origin $(0, 0)$, surrounded by primary Christological titles, grace, salvation, and divine attributes.

---

## 5. Pipeline Commands & Corpus Extensibility

To re-generate or re-center maps and centroids across all canons:
```bash
# Centering pipeline for all canons
make christocentric-map

# Or run individual stages via the corpus manager
pipeline/venv/bin/python pipeline/corpus_manager.py --action all --corpus bsb
pipeline/venv/bin/python pipeline/corpus_manager.py --action all --corpus lxx
pipeline/venv/bin/python pipeline/corpus_manager.py --action all --corpus vul
```

To ingest historical corpora (e.g. Early Church Fathers):
```bash
pipeline/venv/bin/python pipeline/corpus_manager.py --action parse --corpus patristics
pipeline/venv/bin/python pipeline/corpus_manager.py --action train --corpus patristics
pipeline/venv/bin/python pipeline/corpus_manager.py --action project --corpus patristics
pipeline/venv/bin/python pipeline/corpus_manager.py --action centroids --corpus patristics
```
