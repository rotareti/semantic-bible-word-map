# About Semantic Bible

Explore the Holy Scriptures through a semantic lens across three historical textual foundations: the **Berean Standard Bible (BSB)** in English, the ancient Greek **Septuagint and Greek New Testament (LXX)**, and the Latin **Clementine Vulgate (VUL)**.

Every point on the map represents a word lemma, verse, chapter, or biblical book centroid. Physical distance across the canvas represents semantic proximity based entirely on contextual biblical usage.

---

## 1. General Theory and Methodology

### Distributional Semantics and Word Embeddings
The foundational premise of Semantic Bible rests on distributional linguistics, summarized by British linguist J. R. Firth: *"You shall know a word by the company it keeps."*

Rather than relying on modern theological commentary or human editorial categorization, the semantic relationships in this project were generated directly from the biblical texts:
1. **Corpus Extraction**: Text corpora were extracted from clean scripture sources across the Old Testament and New Testament, stripping modern apparatus, footnotes, and translator headings.
2. **Morphological Lemmatization**: Words in the original languages (Greek and Latin) were parsed into their dictionary base forms (lemmas) and tagged with parts of speech (e.g. nouns, verbs, adjectives, proper names) to unite inflected grammatical forms.
3. **Continuous Vector Training (Paradigmatic 50-Word Window & Calibrated Hyperparameters)**: Using Gensim's Word2Vec Skip-gram architecture with negative sampling, the system trains 100-dimensional dense semantic vectors using an expansive 50-word context envelope. While a small 5-word window captures immediate local syntax (*in praesentia*, e.g. titular collocations like *King Sennacherib* or *Eleazar the priest*), the expanded 50-word window covers the entire verse envelope (spanning 98% of all biblical verses), capturing rich **paradigmatic and thematic semantics** (*in absentia*). To counter the gravitational pull of high-frequency narrative glue words across wide windows, the training pipeline applies calibrated **subsampling** (`sample=1e-4`) and elevated **negative sampling** (`negative=10`). This down-samples generic narrative glue, sharpens conceptual boundaries, and elevates cultic, covenantal, and doctrinal relationships (e.g. *priest* connecting to *office*, *consecrated*, *atonement*, and *Levites*; *covenant* connecting to *commandments*, *transgress*, *treaty*, *tablet*, and *mediator*; *justify* connecting to *credit*, *demonstrate*, *guarantee*, *predestine*, and *reconciliation*).
4. **Contextual Centroids**: Words that repeatedly appear in similar literary and theological environments develop similar mathematical vectors. For instance, words relating to sacrifice, priesthood, and altar naturally converge because they share overlapping narrative and ritual contexts.

### Dimensionality Reduction (100D to 2D)
A 100-dimensional vector space captures rich semantic relationships, but human perception operates in two dimensions. To visualize this space:
- High-dimensional vectors were projected onto a 2D plane using UMAP (Uniform Manifold Approximation and Projection) combined with calibrated force-directed physics.
- The projection optimizes for local neighborhood fidelity (trustworthiness > 0.83 and continuity > 0.90), keeping words that are close in 100 dimensions close on the 2D canvas.
- Connecting lines visually indicate significant relationships: solid lines represent direct primary neighbors, while dashed lines represent secondary semantic bridges. Numerical badges display the exact high-dimensional cosine similarity (e.g. `84.5%`).

### Mathematical and Empirical Justification for 100D Vector Space
Rather than adopting 100 dimensions by convention, an empirical study systematically evaluated candidate dimensions ($d \in [25, 200]$) across the Berean Standard Bible, Septuagint, and Clementine Vulgate:
- **Intrinsic Manifold Dimensionality (TwoNN)**: Using the TwoNN estimator (Facco et al., 2017), the intrinsic dimensionality of biblical semantic space was measured at between 8.4 and 9.6 dimensions across all three traditions (BSB: 8.70, LXX: 8.47, VUL: 9.55 at $d=100$). Increasing nominal dimensions past 100 yields virtually zero increase in intrinsic dimensionality (e.g. rising from 8.70 at $d=100$ to only 8.78 at $d=150$ in BSB), confirming that additional dimensions capture statistical noise rather than genuine linguistic structure.
- **PPMI Spectral Energy & Effective Rank**: Singular Value Decomposition (SVD) of the Positive Pointwise Mutual Information (PPMI) matrices revealed that the Effective Rank (Roy & Vetterli, 2007) across all three corpora converges to ~215.5. The 100-dimensional subspace captures 58% to 60.4% of total semantic spectral energy (reaching 60.36% in BSB, 58.68% in LXX, and 58.77% in VUL). Expanding to $d=150$ requires 50% more vector memory while capturing only a marginal 17% in diminishing tail eigenvalues.
- **Hubness and Distance Concentration**: High-dimensional spaces suffer from distance concentration, causing spurious "hub" words to falsely dominate nearest-neighbor queries. Empirical measurements showed that while $d=97$ caused an acute hub spike in BSB (maximum hub count of 156 with skewness 2.848), $d=100$ stabilized the topology (maximum hub count dropped to 102 with skewness 2.451).
- **Peak 2D UMAP Projection Fidelity**: Because the vectors are visualized on an interactive 2D canvas, downstream UMAP Trustworthiness ($k=15$) was benchmarked across all candidate dimensions. In both Greek (LXX) and Latin (VUL), 2D Trustworthiness peaked directly at $d=100$ (0.8348 for LXX, 0.8270 for VUL), degrading at $d=150$ and $d=200$ due to high-dimensional distance concentration.

### Word2Vec Hyperparameter Optimization (Subsampling and Negative Sampling)
In broad 50-word context windows, high-frequency narrative glue words (such as *city*, *crowd*, *go*, *come*, *say*) can exert excessive gravitational pull over rarer theological terms. An empirical grid search systematically evaluated subsampling thresholds and negative sampling rates:
- **Aggressive Subsampling (`sample=1e-4`)**: In Gensim, the `sample` parameter controls down-sampling of high-frequency terms. Testing revealed that ultra-aggressive subsampling (`sample=1e-5`) prunes words with frequency > 0.0001 by 80% to 95%, starving the model of contextual continuity and causing catastrophic vector collapse (degenerate top-5 similarities of ~0.984 across unrelated words). In contrast, `sample=1e-4` is the optimal sweet spot: it penalizes narrative filler without damaging theological terms, doubling training throughput and tightening average top-5 neighbor similarity from 0.657 to 0.700.
- **Elevated Negative Sampling (`negative=10`)**: Raising negative samples from 5 to 10 forces the model to work harder to distinguish between words sharing broad narrative contexts. Under `sample=1e-4, negative=10`, theological terms achieve optimal clarity:
  - *justify* directly surfaces Pauline soteriological concepts (*credit*, *demonstrate*, *reward*, *guarantee*, *predestine*, *reconciliation*).
  - *priest* connects to institutional and cultic roles (*consecrated*, *oversight*, *cleansing*) alongside historical high priests (*Annas*, *Caiaphas*).
  - *covenant* connects directly to moral and legal covenantal fidelity (*commandments*, *transgress*, *overstep*, *ark*).

### Multi-Level Semantic Hierarchy
Semantic Bible provides four complementary viewing modes:
- **Word Mode**: The atomic vocabulary map (over 8,200 English terms, 9,200 Greek lemmas, and 10,400 Latin lemmas).
- **Verses View**: 31,000+ biblical verses projected as multi-word centroids computed by averaging constituent lemma vectors, revealing how entire biblical passages cluster thematically.
- **Chapters Mode**: 1,189 chapter centroids illustrating high-level narrative movements and thematic transitions across books.
- **Books Mode**: Macro-landmarks representing the comprehensive vocabulary and theological center of gravity for each book of the canon.
- **Dynamic Phrase Centroids**: When querying two or three words together (e.g. "faith righteousness", "grace truth peace"), the engine calculates the dynamic 100D vector average in real time and locates the nearest biblical verses.

---

## 2. Limitations of the Map

While the semantic map offers a fresh, data-driven window into scripture, it is a statistical model with specific methodological boundaries that users should keep in mind:

### Vocabulary Sparsity and Frequency Thresholds
In any natural language corpus, word frequencies follow Zipf's law: a tiny fraction of words account for the majority of text, while a large percentage appear very rarely. 

In our empirical corpus analysis:
- **BSB (English)**: 30.66% of all unique words (3,644 terms) are *hapax legomena* (words that occur only once in the entire Bible).
- **LXX (Greek)**: 41.27% of all unique words (6,488 terms) occur only once.
- **VUL (Latin)**: 37.09% of all unique words (6,168 terms) occur only once.

**Why words with frequency < 3 are filtered out:**
Word2Vec requires repeated, diverse context windows to triangulate a stable semantic vector. If a word only appears once or twice (such as an obscure Persian loanword, a rare gem in Aaron's breastplate, or a specific geographic landmark), its vector is dominated by the immediate verse in which it happens to sit, rather than reflecting a generalizable theological meaning. Including single-occurrence words would produce misleading clusters. Therefore, the map requires a minimum frequency threshold of `count >= 3` for inclusion on the 2D canvas.

**Interpreting words with low frequency (3 to 5 occurrences):**
Words that appear only 3, 4, or 5 times are included on the map, but their positions are heavily influenced by those few specific passages. For example, a rare word occurring three times in Leviticus will be positioned close to the ritual vocabulary of that specific section of the law. Users should inspect the Study Panel to review all occurrences and evaluate the context of low-frequency terms.

### Polysemy and Homographs
In this model, each distinct lemma corresponds to a single point in the 2D coordinate space. In reality, biblical words often carry multiple distinct meanings depending on context:
- The Greek word *pneuma* (*πνεῦμα*) can mean physical "breath", natural "wind", or the "Holy Spirit".
- The English word *temple* can refer to Solomon's physical stone sanctuary, a pagan shrine, or the metaphorical human body in Pauline theology.

Because each word has one composite vector, its position represents a weighted average of all its biblical usages. The point gravitates toward the dominant usage across the canon rather than splitting into multiple separate points.

### 2D Projection Distortion
Squashing 100 dimensions of semantic nuance onto a 2D flat plane inevitably causes some geometric compromise:
- Two dots that appear near each other on the 2D screen may occasionally have lower high-dimensional similarity than their visual distance suggests (a projection artifact known as "crowding").
- Conversely, two closely related words may be pushed slightly apart to resolve physics collisions.
- **Remedy**: Always rely on the connecting lines, the cosine similarity percentages (`##.#%`), and the Study Panel cross-references, which always calculate relationships directly from the uncompressed 100D vector space.

### Translation vs. Original Language Perspective
The English (BSB) map reflects the vocabulary of a modern English translation. While translations strive for accuracy, English words inevitably smooth over distinctions present in ancient Hebrew, Aramaic, and Greek. By switching between the Berean Standard Bible, the Septuagint, and the Clementine Vulgate in the Options drawer, users can compare how semantic structures manifest across different linguistic traditions.

---

## 3. Real Discovery Examples

Exploring the semantic map reveals both expected theological alignments and fascinating scriptural nuances:

1. **The Covenantal Cluster**:
   Searching for "covenant" reveals immediate high-similarity clustering with "promise", "oath", "sworn", "inheritance", and "statute". In both the Old Testament and New Testament, these legal and relational terms form a dense, cohesive semantic family.

2. **Cross-Canon Parallels**:
   Examining "faith" in English connects to "righteousness", "believe", and "grace". Switching to the Greek Septuagint and New Testament reveals *pistis* (*πίστις*) occupying a structurally identical position relative to *charis* (*χάρις*, grace) and *dikaiosyne* (*δικαιοσύνη*, righteousness), while the Latin Clementine Vulgate shows *fides* connected to *iustitia* and *gratia*.

3. **Multi-Word Dynamic Centroids**:
   Searching for the two-word phrase "mercy truth" immediately calculates the centroid between both concepts and highlights Psalm 85:10 (*"Mercy and truth are met together; righteousness and peace have kissed each other"*), demonstrating how the model surfaces poetic and theological synthesis.

---

## 4. Open Source Attribution and Data Sources

This project was built using the following open datasets and scholarship:

- **[Berean Standard Bible (BSB)](https://berean.bible/)**: Used for the English text, verse indexing, and interlinear mapping tables. The BSB text is dedicated to the public domain.
- **[Septuaginta (LXX, Rahlfs 1935)](https://github.com/eliranwong/LXX-Rahlfs-1935)**: Alfred Rahlfs' 1935 edition of the Greek Septuagint, incorporating CATSS / CCAT morphological tagging and lemmatization (IOSCS / University of Pennsylvania).
- **[Brenton Septuagint Translation](https://ebible.org/eng-Brenton/)**: Sir Lancelot C. L. Brenton's 1851 English translation of the Greek Septuagint (Public Domain), providing English verse text aligned with Septuagint versification.
- **[STEPBible TBESG Lexicon](https://github.com/STEPBible/STEPBible-Data)**: Translators Brief Lexicon of Extended Strong's for Greek, providing English glosses and morphological classifications (Tyndale House Cambridge, CC BY 4.0).
- **[SBL Greek New Testament (SBLGNT)](https://sblgnt.com/)**: Edited by Michael W. Holmes, published by the Society of Biblical Literature and Logos Bible Software (CC BY 4.0).
- **[OpenScriptures Strong's Dictionary](https://github.com/openscriptures/strongs)**: Used for Greek and Hebrew original language definitions and Strong's number concordances (CC BY 4.0).
- **[Clementina Vulgata & Douay-Rheims Translation](https://github.com/mborders/vulgata)**: Biblia Sacra Vulgata (Clementine edition) with parallel Douay-Rheims English translation covering all 73 canonical books of the Latin Vulgate.
- **[William Whitaker's WORDS Latin-English Dictionary](https://github.com/Salihbasic/whitaker-words-jsonisator)**: Comprehensive Latin morphological and lexical dictionary compiled by William Whitaker (Public Domain).
- **[PROIEL Latin Treebank of the Vulgate](https://github.com/UniversalDependencies/UD_Latin-PROIEL)**: Pragmatic Resources in Old Indo-European Languages treebank of Jerome's Vulgate text with gold-standard lemmatization and Universal Dependencies UPOS tagging (University of Oslo, CC BY-NC-SA 3.0 / CC BY 4.0).
- **[CLTK Latin Lemmatizer](https://github.com/cltk/latin_lemmatizer)**: Classical Language Toolkit lemmatizer tables for Classical and Medieval Latin texts.
- **[D3.js (Data-Driven Documents)](https://d3js.org/)**: JavaScript library by Mike Bostock used for interactive physics simulations and high-performance canvas rendering (BSD 3-Clause).

---

## 5. Source Code

The full source code, data extraction scripts, and machine learning pipelines are freely available on GitHub:
[https://github.com/rotareti/semantic-bible-word-map](https://github.com/rotareti/semantic-bible-word-map)
