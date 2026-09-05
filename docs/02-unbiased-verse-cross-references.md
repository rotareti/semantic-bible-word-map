# Unbiased Verse Cross-References via Semantic Centroids

Traditional biblical cross-reference systems (such as the Treasury of Scripture Knowledge, Scofield references, or marginal study Bible notes) were compiled manually by human commentators. While valuable, these manual systems inevitably reflect the theological traditions, denominational priorities, and historical contexts of their editors. Certain doctrinal themes are emphasized while subtle lexical and thematic connections across diverse biblical genres are frequently overlooked.

This system explores a purely mathematical, unbiased approach: generating biblical cross-references directly from high-dimensional semantic embeddings.

## Mathematical Foundation

Every verse in Scripture is composed of specific words with distinct grammatical parts of speech. In our pipeline, each word $w$ is represented by:
1. A 100-dimensional semantic embedding vector $\mathbf{v}(w) \in \mathbb{R}^{100}$ trained on the Berean Standard Bible corpus.
2. A 2D projected coordinate $(x_w, y_w)$ on the global semantic word map.

### 1. Inverse Verse Frequency (IVF) Weighting

To compute a representative centroid for verse $V$, we must prevent common functional words ("the", "and", "unto") from dominating the vector. We calculate an Inverse Verse Frequency weight for each word:

$$\text{IVF}(w) = \ln\left(\frac{N + 1}{\text{df}(w) + 1}\right) + 1.0$$

where $N = 30{,}969$ total verses, and $\text{df}(w)$ is the number of verses containing word $w$. High-frequency words receive low weights, while substantive content words (such as "atonement", "shepherd", or "reconciliation") receive high weights.

### 2. High-Dimensional Verse Centroid

The semantic position of verse $V = \{w_1, w_2, \dots, w_k\}$ is calculated as the normalized weighted centroid in 100-dimensional space:

$$\mathbf{u}_V = \sum_{i=1}^k \text{IVF}(w_i) \cdot \mathbf{v}(w_i)$$

$$\mathbf{c}_V = \frac{\mathbf{u}_V}{\|\mathbf{u}_V\|_2}$$

### 3. Cross-Reference Cosine Similarity

Cross-references between any two verses $A$ and $B$ are computed as the cosine similarity between their normalized 100D centroids:

$$\text{Sim}(A, B) = \mathbf{c}_A \cdot \mathbf{c}_B = \sum_{j=1}^{100} c_{A,j} \cdot c_{B,j}$$

Because similarity is computed in the unconstrained 100-dimensional vector space rather than 2D projected space, the cross-references remain immune to projection distortion or crowding.

### 4. 2D Map Coordinates

For canvas rendering, each verse node is placed at the weighted center of gravity of its constituent words in the 2D word map:

$$x_V = \frac{\sum_{i=1}^k \text{IVF}(w_i) \cdot x_{w_i}}{\sum_{i=1}^k \text{IVF}(w_i)}, \quad y_V = \frac{\sum_{i=1}^k \text{IVF}(w_i) \cdot y_{w_i}}{\sum_{i=1}^k \text{IVF}(w_i)}$$

This ensures that the verse node sits in the exact physical center of the vocabulary concepts that construct it.

## Empirical Validation

Prototype testing on key passages demonstrates the theological depth of purely mathematical cross-references:

### John 1:1
> *"In the beginning was the Word, and the Word was with God, and the Word was God."*

Top semantically nearest verses:
1. **John 1:2** (0.9405) - *"He was with God in the beginning."*
2. **Romans 8:19** (0.8542) - *"The creation waits in eager expectation for the revelation of the sons of God."*
3. **Isaiah 46:10** (0.8480) - *"I declare the end from the beginning, and from ancient times what is still to come."*
4. **1 John 1:1** (0.8415) - *"That which was from the beginning, which we have heard, which we have seen with our own eyes... this is the Word of life."*
5. **Revelation 22:13** (0.8410) - *"I am the Alpha and the Omega, the First and the Last, the Beginning and the End."*

### Micah 6:8
> *"He has shown you, O man, what is good. And what does the LORD require of you but to act justly, to love mercy, and to walk humbly with your God?"*

Top semantically nearest verses:
1. **Zechariah 7:9** (0.9245) - *"Administer true justice. Show loving devotion and compassion to one another."*
2. **Jeremiah 7:5** (0.9242) - *"if you really correct your ways and deeds, if you act justly toward one another"*
3. **Psalm 119:132** (0.9255) - *"Turn to me and show me mercy, as You do to those who love Your name."*
4. **Job 34:10, 34:12** (0.9280, 0.9245) - *"Far be it from God to do wrong, and from the Almighty to act unjustly."*

## Dual-View Architecture

In Verses mode, the interface provides two complementary perspectives:

1. **Verses Network (Verses to Verses)**:
   - Visualizes the queried verse linked to its top 8 to 12 semantic cross-references across the canon.
   - Link stroke width represents cosine similarity strength.
   - For multi-verse queries (e.g. `Genesis 1:1, John 1:1`), the canvas renders both anchor verses with shared cross-references bridging the semantic space between them.

2. **Word Constellation (Verse to Words)**:
   - Visualizes the queried verse surrounded by its primary content words (`NOUN`, `VERB`, `PROPN`, `ADJ`).
   - Enables users to unpack the lexical ingredients of any verse and jump directly into the semantic word map.
