# Book Centroids and Thematic Embeddings

Beyond individual word meanings, each of the 66 books of the Bible possesses a distinctive theological vocabulary, literary character, and thematic emphasis. The Books mode establishes a macroscopic layer above the word map by calculating semantic centroids for entire books.

## Mathematical Formulation

Books vary dramatically in length, from 245 words in 2 John to 33,049 words in Psalms. To prevent book length from skewing the thematic representation, we use sublinear term frequency combined with smoothed inverse document frequency across the 66-book canon.

### 1. Canon Document Frequency & Smoothed IDF

Let $B = 66$ be the total number of biblical books. For each word $w$, document frequency $\text{df}(w)$ is the number of books in which $w$ appears at least once:

$$\text{IDF}(w) = \ln\left(\frac{1.0 + B}{1.0 + \text{df}(w)}\right) + 1.0$$

Words that appear across nearly all books (such as common verbs or pronouns) receive minimal weights, while words concentrated in specific books receive elevated weights.

### 2. Sublinear Term Frequency

Within book $b$, term frequency is scaled logarithmically to prevent words repeated hundreds of times from overwhelming the vector:

$$\text{TF}(w, b) = \begin{cases} 
1.0 + \ln(\text{count}(w, b)) & \text{if } \text{count}(w, b) > 0 \\ 
0 & \text{otherwise} 
\end{cases}$$

### 3. High-Dimensional Book Centroid

The composite 100-dimensional semantic vector for book $b$ is calculated as the normalized sum:

$$\mathbf{u}_b = \sum_{w \in b} \text{TF}(w, b) \cdot \text{IDF}(w) \cdot \mathbf{v}(w)$$

$$\mathbf{c}_b = \frac{\mathbf{u}_b}{\|\mathbf{u}_b\|_2}$$

### 4. Distinctive Thematic Vocabulary Extraction

To discover the characteristic vocabulary defining each book, words are scored by their composite TF-IDF score:

$$\text{Score}(w, b) = \text{TF}(w, b) \cdot \text{IDF}(w)$$

Restricting to content parts of speech (`NOUN`, `VERB`, `PROPN`, `ADJ`, `ADV`) extracts the theological hallmarks of each book:
- **Hebrews**: high scores for *priest*, *covenant*, *sacrifice*, *tabernacle*, *blood*.
- **Ecclesiastes**: high scores for *vanity*, *labor*, *sun*, *toil*, *portion*.
- **Revelation**: high scores for *throne*, *beast*, *lamb*, *dragon*, *plague*.

## 2D Global Book Projection

The 100-dimensional book centroids are projected to 2D using UMAP (Uniform Manifold Approximation and Projection) with cosine distance metrics. The resulting 2D coordinates preserve natural canonical and literary groupings:
- **The Pentateuch / Law** forms a cohesive cluster on one sector of the map.
- **Historical Narratives** (Samuel, Kings, Chronicles) align along a historical axis.
- **Wisdom Literature** (Proverbs, Ecclesiastes, Job) converges near philosophical terminology.
- **The Four Gospels** form an intimate cluster with high mutual cosine similarities (> 0.98).
- **Pauline Epistles** assemble into an epistolary cluster centered around early church ecclesiology.

## Multi-Book Constellations and Direct vs Indirect Links

When exploring books on the canvas:
1. **Direct Links (Solid Lines)**: Words that physically appear within the text of the book are connected with solid genre-colored lines.
2. **Indirect Links (Dashed Lines)**: Semantically relevant contextual words that do not physically appear in the book are connected with dashed lines.
3. **Theological Sibling Links**: Inter-book connections show theological bridges across the canon, such as James connecting Wisdom literature to the New Testament, or Hebrews bridging Levitical Law to the Gospels.
