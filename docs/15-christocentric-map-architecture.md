# Architecture & Specification: Christocentric Coordinate System & Anchor

**Project:** SymBible Semantic Word Map (Berean Standard Bible, Septuagint, Clementine Vulgate)  
**Date:** September 26, 2026  
**Document ID:** `docs/15-christocentric-map-architecture.md`  
**Related Components:** [`pipeline/christ_anchor.py`](file:///home/josh/code/semantic-lxx-word-map/pipeline/christ_anchor.py), [`pipeline/corpus_manager.py`](file:///home/josh/code/semantic-lxx-word-map/pipeline/corpus_manager.py), [`web/bible-word-map.js`](file:///home/josh/code/semantic-lxx-word-map/web/bible-word-map.js)  

---

## 1. Executive Summary

Biblical narratives, typological motifs, prophetic oracles, and epistolary theology consistently point toward Jesus Christ as their interpretive teleology. Prior versions of the SymBible 2D projection placed vocabulary nodes in an arbitrary coordinate frame determined by stochastic UMAP optimization (with coordinates typically falling in the range [6, 15]). 

This specification establishes a mathematically unified **Christocentric** map topology across all canonical foundations (BSB, LXX, VUL) and provides an extensible driver for historical corpora such as the Early Church Fathers:
1. **Theological Disambiguation:** Synthesizes a composite unit anchor vector $\hat{\mathbf{v}}_{\text{Christ}} \in \mathbb{R}^{100}$ uniting lexical Messianic titles with landmark kerygmatic confession passages (Option C: Hybrid Two-Stage Anchor).
2. **2D Projection Translation:** Translates planar display coordinates such that $(x_{\text{Christ}}, y_{\text{Christ}}) = (0.0, 0.0)$. The four Gospel accounts (Matthew, Mark, Luke, John) cluster at the epicenter ($r \le 0.25$), surrounded by apostolic epistles and prophetic literature.
3. **High-Dimensional Pole Preservation:** Preserves linear angles across 100D embedding space while utilizing $\hat{\mathbf{v}}_{\text{Christ}}$ as the unit reference pole on the hypersphere $S^{99}$.
4. **Motif & Analogy Native Synchronization:** Natively synchronizes the sequence motif trajectory engine (`>`) and analogy projection engine (`:`) with the coordinate origin.

---

## 2. Linear Algebra: 100D Hypersphere vs. 2D Planar Display

### A. The Invariance of Cosine Similarity
In Word2Vec distributional semantics, word affinity is evaluated using cosine similarity:
$$\text{sim}(\mathbf{u}, \mathbf{v}) = \frac{\mathbf{u} \cdot \mathbf{v}}{\|\mathbf{u}\|_2 \|\mathbf{v}\|_2}$$

Translating the 100D vector space by subtracting $\mathbf{v}_{\text{Christ}}$ would set the Christ vector to $\mathbf{0} = (0, 0, \dots, 0)$. Because $\|\mathbf{0}\|_2 = 0$, cosine similarity with Christ becomes undefined ($\frac{0}{0}$). Furthermore, spatial translation in $\mathbb{R}^{100}$ is not an inner-product isometry: subtracting $\mathbf{v}_{\text{Christ}}$ alters the cosine angles between all unrelated pairs of words in the vocabulary.

### B. Two-Space Solution
1. **100D Vector Space ($\mathbb{R}^{100}$):** $\hat{\mathbf{v}}_{\text{Christ}}$ serves as the **Unit Reference Pole**. Every word, verse, chapter, and book possesses an invariant Christological alignment metric:
   $$\text{sim}_{\text{Christ}}(\mathbf{x}) = \frac{\mathbf{x} \cdot \hat{\mathbf{v}}_{\text{Christ}}}{\|\mathbf{x}\|_2}$$
2. **2D Display Space ($\mathbb{R}^2$):** Coordinate translation $\mathbf{p}' = \mathbf{p} - \mathbf{p}_{\text{Christ}}$ is a rigid Euclidean isometry that preserves all pairwise relative distances, cluster geometries, and force-directed simulations while setting $\mathbf{p}_{\text{Christ}} = (0.0, 0.0)$.

---

## 3. Disambiguation: Hybrid Two-Stage Anchor Formulation

To prevent ambiguity between incidental homographs (such as Joshua in Greek/Acts or Jesus Justus in Colossians 4:11) and unify Old and New Testament Messianic designations, the anchor vector $\hat{\mathbf{v}}_{\text{Christ}}$ blends lexical synsets with landmark confession passages:

### A. Stage 1: Lexical Synset Tokens ($\mathbf{v}_{\text{tok}}$)
Weighted sum of core Messianic lemmas within each canon:
- **BSB (English):** `jesus_PROPN` (0.35), `christ_PROPN` (0.35), `messiah_PROPN` (0.15), `savior_NOUN` (0.10), `lord_NOUN` (0.05)
- **LXX (Greek):** `jesus_G2424_PROPN` (0.35), `christ_G5547_PROPN` (0.35), `amessias_L700814_PROPN` (0.15), `savior_G4990_NOUN` (0.10), `lord_G2962_NOUN` (0.05)
- **VUL (Latin):** `jesus_iesus_PROPN` (0.35), `christ_christus_PROPN` (0.35), `savior_salvator_NOUN` (0.15), `savior_saluator_NOUN` (0.05), `lord_dominus_NOUN` (0.05)

### B. Stage 2: Kerygmatic Landmark Verses ($\mathbf{v}_{\text{ver}}$)
Inverse Verse Frequency (IVF) weighted centroid across central Christological passages:
1. Matthew 16:16 (*"You are the Christ, the Son of the living God."*)
2. John 1:1, 1:14 (*"The Word became flesh and dwelt among us."*)
3. Philippians 2:6-11 (*Christ Hymn / Kenosis & Exaltation*)
4. Colossians 1:15-20 (*"The image of the invisible God, the firstborn over all creation."*)
5. Hebrews 1:1-3 (*"The radiance of God's glory and the exact representation of His being."*)
6. Isaiah 53:5 (*Messianic Suffering Servant*)

### C. Composite Hybrid Normalization
$$\mathbf{v}_{\text{raw}} = 0.50 \cdot \frac{\mathbf{v}_{\text{tok}}}{\|\mathbf{v}_{\text{tok}}\|_2} + 0.50 \cdot \frac{\mathbf{v}_{\text{ver}}}{\|\mathbf{v}_{\text{ver}}\|_2}$$
$$\hat{\mathbf{v}}_{\text{Christ}} = \frac{\mathbf{v}_{\text{raw}}}{\|\mathbf{v}_{\text{raw}}\|_2}$$

Empirical alignment between the lexical tokens and the landmark confession verses demonstrates high semantic coherence:
- **BSB:** Cosine similarity = 0.7412
- **LXX:** Cosine similarity = 0.6993
- **VUL:** Cosine similarity = 0.7073

---

## 4. Canonical Concentric Topology

Once centered, every node possesses a polar radius $r = \sqrt{x^2 + y^2}$:
- **Zone 0 ($r \le 0.5$):** Epicenter (Gospels: Matthew, Mark, Luke, John; landmark confession verses; Christ synthetic anchor).
- **Zone 1 ($0.5 < r \le 2.0$):** Apostolic Epistles (Pauline epistles, Hebrews, General epistles) and direct Messianic prophecies (Isaiah, Zechariah).
- **Zone 2 ($2.0 < r \le 4.5$):** Covenant Narrative & Wisdom (Genesis, Exodus, Samuel, Kings, Psalms, Proverbs).
- **Zone 3 ($r > 4.5$):** Civil/Levitical Administrative Codes and Genealogies.

---

## 5. Extensibility to Historical Corpora (Patristics)

The pipeline introduces [`pipeline/corpus_manager.py`](file:///home/josh/code/semantic-lxx-word-map/pipeline/corpus_manager.py), which standardizes corpus ingestion, POS tagging, Word2Vec training, Christocentric anchor calculation, and centroid generation. New corpora (such as the Ante-Nicene and Post-Nicene Church Fathers) register via a single configuration entry and inherit identical centered coordinate geometry.
