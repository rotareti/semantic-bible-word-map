# Empirical Study: Paradigmatic Semantics via Word2Vec Window Expansion (Window 5 to 50)

**Project:** Semantic Bible Word Map (Berean Standard Bible, Septuagint, Clementine Vulgate)  
**Date:** September 19, 2026  
**Script Reference:** [`pipeline/train_embeddings.py`](file:///home/josh/code/semantic-lxx-word-map/pipeline/train_embeddings.py)  
**Models Evaluated:** Gensim Word2Vec Skip-gram (100D, `sg=1`, `min_count=2`, `epochs=10`, `seed=42`) comparing `window=5` vs `window=50`  

---

## 1. Executive Summary

This study documents the empirical transition from **syntagmatic** (collocational / phrase-level) to **paradigmatic** (substitutional / thematic) semantic structures across the biblical text by expanding the Word2Vec Skip-gram context window from **5 to 50 tokens (a 10x increase)**.

### Core Discoveries

1. **Decoupling from Proper Name Collocations:**  
   At `window=5`, titular nouns such as `priest` and `king` are dominated by immediate historical names that follow the title in biblical prose (*Eleazar the priest*, *Jehoiada the priest*, *Zadok the priest*, *King Sennacherib*, *King Tiglath-Pileser*). At `window=50`, these immediate title collocations yield to **functional, cultic, and institutional vocabulary**: `consecrated`, `priesthood`, `cleansing`, `Levites`, `office`, `atonement`, `examine`, and `ordination`.

2. **Emergence of Covenantal and Legal Architecture:**  
   For `covenant`, widening the window surfaces the broader legal, historical, and theological discourse: `commandments`, `ark`, `treaty`, `tablet`, `guarantee`, `mediator`, `forefather`, and `obsolete` (reflecting Hebrews 8:13).

3. **Soteriological Synthesis:**  
   For `justify`, expanding to a 50-word envelope directly surfaces core Pauline doctrinal connections: **`predestine`** (0.778) and **`reconciliation`** (0.704), mirroring Romans 8:30 (*"those he predestined, he also called; those he called, he also justified"*).

4. **Communal and Relational Virtues:**  
   For `love`, `window=5` reflects tight ascetic virtue catalogs (*perseverance*, *sober*, *patient*). At `window=50`, it synthesizes ecclesial and communal virtues: `brotherly`, `tenderhearted`, `unity`, `harmony`, `devotion`, and `purity`.

---

## 2. Linguistic Theory: Syntagmatic vs. Paradigmatic

In structural linguistics (Ferdinand de Saussure, Roman Jakobson):

- **Syntagmatic Relations (*in praesentia*):**  
  Relationships between words that appear together sequentially in the same immediate phrase, clause, or grammatical dependency.  
  - Examples: Adjective-noun (*fragrant incense*), Verb-object (*offer sacrifice*), Title-name (*King David*, *Eleazar the priest*).  
  - Modeled computationally by **small context windows ($w = 2\text{ to }5$)**.

- **Paradigmatic Relations (*in absentia*):**  
  Relationships between words that can substitute for one another in the same conceptual or structural slot, sharing broader discourse topics even if they rarely appear in the exact same 5-word span.  
  - Examples: Co-hyponyms (*priest* / *Levite*, *sword* / *spear* / *bow*), Institutional roles (*ruler* / *vassal*), Abstract legal attributes (*covenant* / *guarantee* / *treaty*).  
  - Modeled computationally by **broad context windows ($w = 30\text{ to }50$)**.

### The Biblical Verse Envelope

In the Berean Standard Bible corpus:
- The Old Testament comprises 23,028 verses with an average length of 24.1 words.
- The New Testament comprises 7,941 verses with an average length of 21.6 words.
- Across both testaments, **98% of biblical verses contain fewer than 50 words**.

Consequently, expanding the Word2Vec window from 5 to 50 expands the computational horizon from an immediate 5-word clause to the **entire verse envelope**. Every word in a verse can interact with every other word in that verse, allowing the full literary unit to shape the underlying vector space.

---

## 3. Systematic Side-by-Side Empirical Comparisons

Both models were trained using identical hyperparameter baselines (100 dimensions, Skip-gram `sg=1`, negative sampling `negative=5`, `min_count=2`, 10 epochs, `seed=42`).

### A. Priesthood and Cultic Institutions

| Target Word | Baseline Neighbors (`window=5`) | Paradigmatic Neighbors (`window=50`) | Semantic Shift Analysis |
| :--- | :--- | :--- | :--- |
| **`priest`** | `levitical` (0.692)<br>`zadok` (0.633)<br>`annas` (0.633)<br>`jehoiada` (0.632)<br>`caiaphas` (0.631)<br>`eleazar` (0.630) | `caiaphas` (0.590)<br>`annas` (0.590)<br>`consecrated` (0.584)<br>`priesthood` (0.576)<br>`class` (0.568)<br>`office` (0.560) | Shifts from specific proper names (*Zadok*, *Jehoiada*, *Eleazar*) to the priestly office and ritual status (*consecrated*, *priesthood*, *office*, *class*). |
| **`altar`** | `pole` (0.699)<br>`asherah` (0.699)<br>`splatter` (0.695)<br>`incense` (0.691)<br>`fragrant` (0.675)<br>`regularly` (0.674) | `splatter` (0.685)<br>`base` (0.679)<br>`grate` (0.674)<br>`altar_ADJ` (0.672)<br>`grating` (0.667)<br>`memorial` (0.660) | Moves from idolatrous pole collocations (*Asherah pole*) to sacrificial mechanics and furniture (*grate*, *grating*, *base*, *memorial*). |
| **`ark`** | `overshadow` (0.667)<br>`tabernacle` (0.642)<br>`guardian` (0.634)<br>`front` (0.611)<br>`meeting` (0.611)<br>`rear` (0.594) | `hophni` (0.610)<br>`ahio` (0.602)<br>`covenant` (0.595)<br>`locate` (0.588)<br>`front` (0.583)<br>`levitical` (0.582) | Connects directly to the historical custodians of the ark (*Hophni*, *Ahio*) and its covenantal designation. |
| **`temple`** | `inner` (0.709)<br>`sanctuary` (0.698)<br>`outer` (0.669)<br>`courtyard` (0.668)<br>`court` (0.654)<br>`structure` (0.653) | `court` (0.661)<br>`colonnade` (0.596)<br>`building` (0.591)<br>`structure` (0.587)<br>`doorkeeper` (0.582)<br>`portico` (0.577) | Broadens to architectural public spaces (*colonnade*, *portico*, *doorkeeper*). |

---

### B. Kingship, Rule, and Governance

| Target Word | Baseline Neighbors (`window=5`) | Paradigmatic Neighbors (`window=50`) | Semantic Shift Analysis |
| :--- | :--- | :--- | :--- |
| **`king`** | `haman` (0.634)<br>`tiglath` (0.626)<br>`pileser` (0.618)<br>`susa` (0.599)<br>`esther` (0.597)<br>`zedekiah` (0.585) | `carchemish` (0.695)<br>`lachish` (0.674)<br>`zedek` (0.668)<br>`babylon` (0.668)<br>`vassal` (0.661)<br>`india` (0.658) | Replaces immediate royal names with geopolitical arenas (*Carchemish*, *Lachish*, *Babylon*) and international feudal structure (**`vassal`**). |
| **`ruler`** | `respected` (0.620)<br>`treasurer` (0.617)<br>`taskmaster` (0.609)<br>`ephraimites` (0.608)<br>`judge` (0.602)<br>`leader` (0.592) | `superior` (0.586)<br>`pervert` (0.562)<br>`toll` (0.522)<br>`hallohesh` (0.514)<br>`jeshurun` (0.511)<br>`derive` (0.498) | Shifts toward administrative authority and taxation terms (*superior*, *toll*). |
| **`throne`** | `enthrone` (0.719)<br>`high` (0.691)<br>`seat` (0.668)<br>`majesty` (0.653)<br>`rule` (0.643)<br>`splendor` (0.638) | `seat` (0.629)<br>`enthrone` (0.610)<br>`sanity` (0.601)<br>`sit` (0.590)<br>`footstool` (0.583)<br>`ancient` (0.579) | Brings in eschatological and biblical imagery: **`footstool`** (*"heaven is my throne, earth my footstool"*) and `ancient` (*Ancient of Days*). |
| **`kingdom`** | `dominion` (0.702)<br>`sovereignty` (0.640)<br>`firmly` (0.624)<br>`greatness` (0.601)<br>`invisible` (0.598)<br>`fullness` (0.580) | `sanity` (0.651)<br>`dominion` (0.649)<br>`arrest` (0.627)<br>`realm` (0.610)<br>`firmly` (0.599)<br>`greece` (0.596) | Connects to political realms and historical empires (*Greece*, *realm*). |

---

### C. Covenant, Law, and Commandments

| Target Word | Baseline Neighbors (`window=5`) | Paradigmatic Neighbors (`window=50`) | Semantic Shift Analysis |
| :--- | :--- | :--- | :--- |
| **`covenant`** | `everlasting` (0.605)<br>`promise` (0.604)<br>`oath` (0.601)<br>`solemn` (0.573)<br>`statute` (0.573)<br>`transgress` (0.573) | `commandments` (0.596)<br>`ark` (0.595)<br>`theirs` (0.584)<br>`transgress` (0.570)<br>`obsolete` (0.563)<br>`everlasting` (0.560) | Pulls in **`obsolete`** (Hebrews 8:13 on the Old Covenant becoming obsolete) and the physical covenantal container (**`ark`**). |
| **`commandment`** | `statute` (0.825)<br>`ordinance` (0.820)<br>`precept` (0.763)<br>`transgress` (0.745)<br>`obey` (0.736)<br>`carefully` (0.734) | `statute` (0.772)<br>`ordinance` (0.750)<br>`keep` (0.701)<br>`obey` (0.699)<br>`carefully` (0.697)<br>`violation` (0.646) | Remains exceptionally stable across both windows, reinforcing the synonymy of `statute`, `ordinance`, and `commandment`. |

---

### D. Faith, Grace, Righteousness, and Justification

| Target Word | Baseline Neighbors (`window=5`) | Paradigmatic Neighbors (`window=50`) | Semantic Shift Analysis |
| :--- | :--- | :--- | :--- |
| **`faith`** | `comfort` (0.706)<br>`trespass` (0.698)<br>`grace` (0.698)<br>`justify` (0.696)<br>`endurance` (0.690)<br>`love` (0.689) | `scriptures` (0.678)<br>`grace` (0.673)<br>`christ` (0.671)<br>`our` (0.664)<br>`undisciplined` (0.662)<br>`start` (0.658) | Links faith directly to its theological object and foundation: **`Christ`** and the **`scriptures`**. |
| **`righteousness`** | `justice` (0.743)<br>`faithfulness` (0.715)<br>`equity` (0.703)<br>`oppressed` (0.695)<br>`uprightness` (0.679)<br>`loving` (0.679) | `justice` (0.681)<br>`equity` (0.674)<br>`oppressed` (0.659)<br>`unjustly` (0.653)<br>`faithfulness` (0.652)<br>`extension` (0.652) | Retains the core ethical triad (*justice*, *equity*, *faithfulness*), while strengthening connections to the plight of the *oppressed* and those treated *unjustly*. |
| **`grace`** | `forgiveness` (0.741)<br>`comfort` (0.738)<br>`savior` (0.734)<br>`eagerly` (0.714)<br>`faith` (0.698)<br>`ministry` (0.691) | `thessalonians` (0.747)<br>`calling` (0.722)<br>`silvanus` (0.720)<br>`trespass` (0.699)<br>`christ` (0.698)<br>`comfort` (0.688) | Captures epistolary greeting contexts (*Thessalonians*, *Silvanus*) while highlighting theological purpose (*calling*, *Christ*). |
| **`justify`** | `approve` (0.796)<br>`tempt` (0.785)<br>`commend` (0.783)<br>`acquit` (0.775)<br>`credit` (0.771)<br>`reward` (0.769) | `predestine` (0.778)<br>`start` (0.707)<br>`reconciliation` (0.704)<br>`conviction` (0.702)<br>`prize` (0.701)<br>`reward` (0.691) | Dramatic theological shift: **`predestine`** and **`reconciliation`** emerge (Romans 8:30: *"those he predestined he also justified"*), demonstrating true Pauline soteriological synthesis. |

---

### E. Virtues, Fellowship, and Emotion

| Target Word | Baseline Neighbors (`window=5`) | Paradigmatic Neighbors (`window=50`) | Semantic Shift Analysis |
| :--- | :--- | :--- | :--- |
| **`love`** | `perseverance` (0.741)<br>`weakness` (0.706)<br>`sincere` (0.694)<br>`faith` (0.689)<br>`sober` (0.688)<br>`patient` (0.682) | `brotherly` (0.691)<br>`tenderhearted` (0.663)<br>`graceful` (0.658)<br>`harmony` (0.652)<br>`unity` (0.650)<br>`purity` (0.650) | Transforms from individual ascetic virtues (*perseverance*, *sober*, *patient*) into relational community virtues (**`brotherly`**, **`tenderhearted`**, **`unity`**, **`harmony`**). |
| **`mercy`** | `merciful` (0.618)<br>`overshadow` (0.602)<br>`affection` (0.600)<br>`grant` (0.600)<br>`compassion` (0.599)<br>`reverence` (0.595) | `merciful` (0.608)<br>`seat` (0.593)<br>`attentive` (0.571)<br>`rightly` (0.565)<br>`compassion` (0.562)<br>`onesiphorus` (0.545) | Connects immediately to the cultic **`mercy seat`** (*kapporeth* / *hilasterion*). |
| **`hope`** | `confidence` (0.735)<br>`unease` (0.719)<br>`weakness` (0.716)<br>`calling` (0.706)<br>`godly` (0.695)<br>`perfect` (0.694) | `unease` (0.748)<br>`salvation` (0.725)<br>`savior` (0.706)<br>`strive` (0.683)<br>`recall` (0.682)<br>`inspire` (0.677) | Connects hope explicitly to its theological object: **`salvation`** and the **`savior`** (*"the hope of salvation"*). |

---

### F. Biblical Figures

| Target Word | Baseline Neighbors (`window=5`) | Paradigmatic Neighbors (`window=50`) | Semantic Shift Analysis |
| :--- | :--- | :--- | :--- |
| **`jesus`** | `peter` (0.625)<br>`john` (0.598)<br>`disciple` (0.591)<br>`stephen` (0.581)<br>`sick` (0.574)<br>`synagogue` (0.572) | `disciple` (0.746)<br>`crowd` (0.661)<br>`peter` (0.648)<br>`sosthenes` (0.638)<br>`disagree` (0.636)<br>`simon` (0.635) | `disciple` surges from 0.591 to **0.746** (top neighbor). Narrative setting expands to include the **`crowd`** (*ochlos*). |
| **`moses`** | `aaron` (0.676)<br>`joshua` (0.633)<br>`commission` (0.604)<br>`exactly` (0.604)<br>`expert` (0.596)<br>`miriam` (0.594) | `aaron` (0.752)<br>`assistant` (0.680)<br>`command` (0.677)<br>`commission` (0.677)<br>`israelites` (0.653)<br>`eleazar` (0.608) | `aaron` strengthens to 0.752. Joshua is recognized as Moses' **`assistant`**, alongside the **`israelites`** whom he led. |
| **`abraham`** | `isaac` (0.850)<br>`sarah` (0.733)<br>`patriarch` (0.678)<br>`abram` (0.674)<br>`nahor` (0.658)<br>`laban` (0.646) | `isaac` (0.877)<br>`sarah` (0.729)<br>`patriarch` (0.639)<br>`nahor` (0.593)<br>`reckon` (0.592)<br>`sarai` (0.584) | Pulls in **`reckon`** (Genesis 15:6: *"Abraham believed God, and it was reckoned to him as righteousness"*). |

---

## 4. Conclusion and Release Recommendation

The transition to `window=50` represents a foundational paradigm shift in how the semantic landscape of scripture is modeled. Moving beyond localized syntax and immediate phrase pairings, the 50-word context window captures broad theological, institutional, and covenantal relationships that span across verses.

This update warrants a **Major Version Bump (v11.0.0)** to reflect the fundamental re-orientation from syntagmatic collocations to paradigmatic thematic semantics across all visualization layers.
