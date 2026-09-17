# Pronoun Topology, Faith-Clustered Neighbors, and Biblical Hapax Legomena

**Project:** Semantic Bible Word Map (BSB, LXX, VUL)  
**Date:** September 16, 2026  
**Document Series:** Technical Reference #07  
**Scope:** Berean Standard Bible (BSB), Septuagint & Greek NT (LXX), Latin Clementine Vulgate (VUL)  
**Related Pipeline Scripts:**  
- [`pipeline/build.py`](file:///home/josh/code/semantic-lxx-word-map/pipeline/build.py)  
- [`pipeline/build_lxx.py`](file:///home/josh/code/semantic-lxx-word-map/pipeline/build_lxx.py)  
- [`pipeline/biblical_entities.py`](file:///home/josh/code/semantic-lxx-word-map/pipeline/biblical_entities.py)  
- [`pipeline/generate_map.py`](file:///home/josh/code/semantic-lxx-word-map/pipeline/generate_map.py)  
**Data References:**  
- Complete BSB Hapax List: [`data/analysis/hapax_legomena_bsb.json`](file:///home/josh/code/semantic-lxx-word-map/data/analysis/hapax_legomena_bsb.json)  
- Complete LXX Hapax List: [`data/analysis/hapax_legomena_lxx.json`](file:///home/josh/code/semantic-lxx-word-map/data/analysis/hapax_legomena_lxx.json)  
- Complete VUL Hapax List: [`data/analysis/hapax_legomena_vul.json`](file:///home/josh/code/semantic-lxx-word-map/data/analysis/hapax_legomena_vul.json)  
- Comparative Summary: [`data/analysis/hapax_legomena_summary.json`](file:///home/josh/code/semantic-lxx-word-map/data/analysis/hapax_legomena_summary.json)  

---

## 1. Executive Summary

This study addresses two interrelated linguistic and topological phenomena across our biblical corpora:
1. **Pronoun-Theological Clustering:** Why possessive pronouns like "your" and "our" surface as top cosine neighbors to theological terms like "faith" in certain canons (LXX and BSB), but not in others (VUL).
2. **Vocabulary Inclusion Thresholds & Hapax Legomena:** The mathematical and statistical necessity of frequency cutoffs ($f \ge 2$ for Word2Vec Skip-gram training, $f \ge 3$ for 2D UMAP projection), alongside a complete census of the 16,300 single-occurrence words (*hapax legomena*) across all three canons.

---

## 2. The Pronoun-Faith Clustering Investigation

When querying "faith" across the three translation foundations:
- **LXX:** "your" is the **#1 closest cosine neighbor** (66.17%).
- **BSB:** "Our" appears as a direct connection (63.08%, rank 24), while "your" is absent from the top 100.
- **VUL:** Neither "your" nor "our" appears anywhere near "faith" (both rank > 3,500).

### A. The LXX Canon: The Emphatic Adjective *Humeteros*

In Ancient Greek, the standard, high-frequency personal pronouns for "your / of you" are:
- **σοῦ** (*sou*, Strong's G4675, singular genitive: 6,090 occurrences) -- mapped to English gloss **"you"**.
- **ὑμῶν** (*hymon*, Strong's G5216, plural genitive: 1,635 occurrences) -- mapped to English gloss **"of you"**.

The entry displaying as **`your_G5212_PRON`** on the LXX map is **not** the common pronoun, but the rare, emphatic possessive adjective **ὑμέτερος** (*humeteros*, Strong's G5212):
- Total frequency across 81 books: **only 10 occurrences**.
- All 10 occurrences reside in the New Testament, predominantly in Pauline and Johannine theological discourse:
  - **Luke 6:20:** *"Blessed are the poor, for **yours** is the kingdom of God."*
  - **Romans 11:31:** *"so they too have now been disobedient in order that by the mercy shown to **you** they also may now receive mercy."*
  - **2 Corinthians 8:8:** *"testing the genuineness of **your** love."*
  - **1 Corinthians 15:31:** *"by **your** boasting which I have in Christ Jesus."*
  - **Galatians 6:13:** *"that they may boast in **your** flesh."*
  - **John 7:6, 8:17, 15:20, Acts 27:34, 1 Corinthians 16:17.**

Because 100% of its co-occurrence contexts are dense with epistolary theology (*grace*, *mercy*, *kingdom*, *love*, *salvation*, *Christ Jesus*), Skip-gram Word2Vec situated `your_G5212_PRON` directly beside **πίστις** (*faith*, 66.17% similarity).

If "your" had included the 7,725 common occurrences of *sou* and *hymon*, its vector would have been diffused across narrative, historical, and legal genres and would not sit near "faith".

### B. The BSB Canon: Part-of-Speech Fragmentation (`our_PROPN`)

In the Berean Standard Bible, the ordinary pronoun **"our"** (`our_PRON`) occurs **1,205 times** and has a normal distributed similarity of **35.68% (rank 2,240)**.

However, the pipeline contains an anomalous secondary entry: **`our_PROPN`** (frequency = **7**):
- When SpaCy parsed the BSB USJ text, the absolute possessive form **"ours"** was lemmatized to "our" and tagged as `PROPN` (Proper Noun) in 7 New Testament verses.
- In two of those seven verses, it directly shares a sentence with **"faith"**:
  - **2 Peter 1:1:** *"To those who through the righteousness of our God and Savior Jesus Christ have received a **faith** as precious as **ours**"*
  - **Philemon 1:6:** *"I pray that your partnership in the **faith** may become effective as you fully acknowledge every good thing that is **ours** in Christ"*
  - **1 John 1:3:** *"and this fellowship of **ours** is with the Father"*
  - **1 Corinthians 1:2:** *"their Lord and **ours**"*
- Because `our_PROPN` occurs only 7 times and nearly half of its occurrences co-occur directly with "faith" in theological epistles, its vector was drawn straight to `faith_NOUN` (63.08%).
- Meanwhile, `your_PRON` appears **4,297 times** across narrative, legal, and poetic genres, so its vector is distributed evenly across the global embedding space (similarity: 33.35%).

### C. The Vulgate Canon: Consistent Lemmatization

In the Latin Vulgate, all forms of possessive pronouns are grouped into unified lemmas:
- **`your_tuus_PRON`** ($f = 5,954$): similarity to faith = **22.08%** (rank 5,049)
- **`your_uester_PROPN`** ($f = 1,628$): similarity to faith = **16.69%** (rank 6,253)
- **`our_noster_PRON`** ($f = 1,132$): similarity to faith = **28.93%** (rank 3,594)

Because Latin lemmatization consolidated all singular and plural occurrences into their high-frequency headwords, their vectors correctly represent general functional grammar across all 73 books rather than clustering around theological concepts.

---

## 3. The Mathematics of Frequency Thresholds & Island Distortion

### A. Why $f = 1$ Words Cannot Be Trained Reliably
In Skip-gram Word2Vec with negative sampling, the objective maximizes the log probability of context words $w_c$ within window size $W=5$ while minimizing the probability of $k=5$ negative sampled words $w_n$:

$$\mathcal{L} = \sum_{t=1}^T \sum_{-W \le j \le W, j \ne 0} \left[ \log \sigma(v_{w_{t+j}}^\top u_{w_t}) + \sum_{i=1}^k \mathbb{E}_{w_{n,i} \sim P_n(w)} \left[ \log \sigma(-v_{w_{n,i}}^\top u_{w_t}) \right] \right]$$

For a word occurring only once ($f = 1$):
1. **Insufficient Positive Signal:** The word appears in at most 10 sliding context windows in a single verse. It receives negligible positive gradient updates.
2. **Noise Dominance from Negative Sampling:** Random negative sampling updates pull the vector in arbitrary directions with higher total magnitude than the true co-occurrence signal.
3. **Arbitrary Vector Drift:** The final vector reflects its random Gaussian initialization and negative sampling noise rather than semantic meaning.

### B. Why Low Frequency Distorts UMAP Topology (The "Island" Effect)
When words with $f = 1$ or $f = 2$ are projected into 2D via UMAP:
- UMAP builds a fuzzy simplicial set based on the $k$-nearest neighbor graph ($k=15$).
- A word occurring once or twice has artificial, unrepresentative distances to its neighbors.
- If two rare words happen to co-occur in the same verse, they form an isolated mutual-nearest-neighbor pair with very weak affinities to the rest of the corpus.
- UMAP pulls them together while pushing them into isolated peripheral "islands" or tearing holes in the manifold.
- Setting `min_count = 2` during training and `count >= 3` for 2D layout acts as an essential topological filter, guaranteeing that every node on the map has sufficient mutual connectivity to anchor stably in the global semantic structure.

---

## 4. Cross-Canon Census of Excluded Hapax Legomena ($f = 1$)

Across the three canons, between **30.7% and 41.3%** of all unique vocabulary entries occur exactly once, adhering to Zipfian distribution:

| Metric | Berean Standard Bible (BSB) | Septuagint & Greek NT (LXX) | Latin Clementine Vulgate (VUL) |
| :--- | :---: | :---: | :---: |
| **Total Corpus Tokens ($N$)** | 726,693 | 725,123 | 611,868 |
| **Total Unique Vocabulary (Types)** | 11,887 | 15,722 | 16,628 |
| **Words with $f = 1$ (Hapax Legomena)** | **3,644 (30.7%)** | **6,488 (41.3%)** | **6,168 (37.1%)** |
| **Words with $f = 2$** | 1,631 (13.7%) | 2,027 (12.9%) | 2,211 (13.3%) |
| **Words with $f \ge 3$ (Active on 2D Map)** | 6,612 (55.6%) | 7,207 (45.8%) | 8,249 (49.6%) |

---

## 5. Part-of-Speech Breakdown of $f = 1$ Excluded Words

### A. Berean Standard Bible (BSB English -- 3,644 Words)
- **Proper Nouns (`PROPN`): 1,196 (32.8%)** -- Minor genealogical figures and obscure settlements from Chronicles, Ezra, and Nehemiah (e.g., *Sabta*, *Homam*, *Dara*, *Achar*, *Raddai*, *Jerioth*, *Jesher*, *Ardon*, *Bunah*, *Oren*, *Atarah*, *Maaz*, *Eker*, *Ahban*, *Molid*, *Zaza*, *Raham*, *Jorkeam*).
- **Common Nouns (`NOUN`): 1,189 (32.6%)** -- Specialized flora, fauna, construction tools, specific ritual vessels (*ban*, *aloeswood*).
- **Verbs (`VERB`): 548 (15.0%)** -- Rare compound actions and poetic verbs.
- **Adjectives (`ADJ`): 514 (14.1%)** -- Descriptive modifiers used once in specific poetic or descriptive passages.
- **Adverbs (`ADV`): 172 (4.7%)**
- **Grammar / Closed-Class:** Determiners (5), Prepositions (5), Pronouns (2), Conjunctions (2).

### B. Septuagint & Greek New Testament (LXX Greek -- 6,488 Words)
- **Proper Nouns (`PROPN`): 2,515 (38.8%)** -- Greek transliterations of Hebrew personal and geographical names across 81 books (*Phisn*, *Naid*, *Ibel*, *Ioubal*, *Noema*, *Kitios*, *Rhodian*, *Sabakatha*, *Dadan*, *Archad*, *Dasem*).
- **Common Nouns (`NOUN`): 1,552 (23.9%)** -- Rare Hellenistic architectural and ritual nouns.
- **Verbs (`VERB`): 1,297 (20.0%)** -- Ancient Greek compound verbs with prepositional prefixes:
  - `cover_with_asphalt_L702044_VERB` (ἀσφαλτόω -- Genesis 6:14 "pitch inside and out")
  - `cloud_over_L712484_VERB` (συννεφέω -- Genesis 9:14)
- **Adjectives (`ADJ`): 814 (12.5%)** -- Compound descriptive adjectives in Wisdom literature:
  - `unequipped_L700529_ADJ` (ἀκατασκεύαστος -- Genesis 1:2 "without form / unequipped")
  - `one_who_hammers_L712594_ADJ` (σφυροκόπος -- Genesis 4:22 Tubal-Cain)
  - `two_storied_L703769_ADJ` (διώροφος -- Genesis 6:16 ark construction)
- **Adverbs (`ADV`): 238 (3.7%)**
- **Other:** Numerals (32), Prepositions (14), Particles (7), Conjunctions (7), Pronouns (5).

### C. Latin Clementine Vulgate (VUL Latin -- 6,168 Words)
- **Common Nouns (`NOUN`): 5,025 (81.5%)** -- Latin nominal vocabulary, including rare case forms and transliterated terms:
  - `warlike_virago_NOUN` (*virago* -- Genesis 2:23 "she shall be called Woman")
  - `girdle_perizoma_NOUN` (*perizomata* -- Genesis 3:7 fig leaf aprons)
  - `little_mansiuncula_NOUN` (Genesis 6:14 ark rooms/mansions)
  - `smear_linies_NOUN` (Genesis 6:14 *linies bitumine*)
- **Proper Nouns (`PROPN`): 623 (10.1%)** -- Biblical personages and locations (*Heuilath*, *Iabel*, *Iubal*, *Noema*, *Cetthim*, *Phuth*, *Sabatacha*).
- **Verbs (`VERB`): 326 (5.3%)** -- Rare Latin verbs and compound participles.
- **Adjectives (`ADJ`): 137 (2.2%)**
- **Adverbs (`ADV`): 53 (0.9%)
- **Other:** Pronouns (2), Numerals (1), Determiners (1).

---

## 6. Complete Data Exports

The complete, unabridged lists of all excluded $f = 1$ words categorized by Part of Speech, with original lemmas and definitions, are available in the repository:
- **BSB Complete Hapax List (3,644 words):** [`data/analysis/hapax_legomena_bsb.json`](file:///home/josh/code/semantic-lxx-word-map/data/analysis/hapax_legomena_bsb.json)
- **LXX Complete Hapax List (6,488 words):** [`data/analysis/hapax_legomena_lxx.json`](file:///home/josh/code/semantic-lxx-word-map/data/analysis/hapax_legomena_lxx.json)
- **VUL Complete Hapax List (6,168 words):** [`data/analysis/hapax_legomena_vul.json`](file:///home/josh/code/semantic-lxx-word-map/data/analysis/hapax_legomena_vul.json)
- **Comparative Summary Metrics:** [`data/analysis/hapax_legomena_summary.json`](file:///home/josh/code/semantic-lxx-word-map/data/analysis/hapax_legomena_summary.json)
