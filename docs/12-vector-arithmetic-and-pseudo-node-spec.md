# Architecture & Specification: Vector Arithmetic & Pseudo-Node Evaluation

**Project:** SymBible Semantic Word Map (Berean Standard Bible, Septuagint, Clementine Vulgate)  
**Date:** September 23, 2026  
**Document ID:** `docs/12-vector-arithmetic-and-pseudo-node-spec.md`  
**Related Components:** [`web/bible-word-map.js`](file:///home/josh/code/semantic-lxx-word-map/web/bible-word-map.js), [`pipeline/train_embeddings.py`](file:///home/josh/code/semantic-lxx-word-map/pipeline/train_embeddings.py)  

---

## 1. Executive Summary

Vector arithmetic in distributional semantics leverages linear algebraic properties of word embeddings where semantic relationships correspond to spatial displacement vectors (for example, the classic relation $\mathbf{v}_{\text{King}} - \mathbf{v}_{\text{Man}} + \mathbf{v}_{\text{Woman}} \approx \mathbf{v}_{\text{Queen}}$). Within biblical literature, vector arithmetic unlocks deep typographic and theological synthesis:
- `Isaac - Abraham + God`: Isolates the divine covenantal promise and filial typology.
- `covenant + blood`: Computes the sacrificial ratification vector linking Old and New Testament theology.
- `temple - stone + spirit`: Projects the ecclesiological transition from the physical sanctuary to the spiritual body.

Because the resulting coordinate from an arithmetic expression almost never maps identically to an existing vocabulary word, SymBible synthesizes a **Pseudo-Node** (or Phantom Node). This node represents the calculated semantic coordinate in 100-dimensional vector space and projects its semantic neighborhood onto the interactive 2D canvas.

This document specifies the Abstract Syntax Tree (AST) query grammar, 100D vector evaluation, phyllotaxis and force-directed bubble layout, verse centroid alignment, and user interface inspector integration.

---

## 2. Query Language Syntax & Grammar

The search input dynamically detects mathematical operators and routes queries to the SymBible Query Language engine.

### Grammar Specification

```ebnf
Expression   ::= Term ( ('+' | '-') Term )*
Term         ::= Factor
Factor       ::= ('+' | '-')? Primary
Primary      ::= Identifier | '(' Expression ')'
Identifier   ::= [A-Za-z0-9_'\u0370-\u03FF\u1F00-\u1FFF]+
```

### Operational Rules
1. **Case-Insensitive Identifier Resolution:** Word tokens (e.g. `God`, `god`, `GOD`) resolve against the active canon vocabulary lemma table.
2. **Order of Operations:** Parentheses `(...)` take precedence, followed by unary negation (`-`), followed by left-to-right addition and subtraction.
3. **AST Node Types:**
   - `Word`: Leaf node encapsulating an individual lemma string.
   - `Add`: Binary operation summing left and right child subtrees.
   - `Sub`: Binary operation subtracting the right child subtree from the left child subtree.
   - `Neg`: Unary operation inverting the sign of the child subtree.

---

## 3. 100-Dimensional Vector Evaluation

### A. Vector Extraction & Representation
Every vocabulary token in the loaded corpus possesses a dense 100-dimensional vector $\mathbf{v} \in \mathbb{R}^{100}$ precomputed by the Skip-gram Word2Vec pipeline (`window=50`, `negative=10`, `sample=1e-4`).

### B. Recursive AST Evaluation
The evaluation function recursively traverses the AST to produce a composite vector:

$$\mathbf{v}_{\text{calc}} = \text{Evaluate}(AST)$$

- For a leaf `Word` node $w$:
  $$\mathbf{v} = \mathbf{v}_w$$
- For an `Add` node with children $L$ and $R$:
  $$\mathbf{v} = \mathbf{v}_L + \mathbf{v}_R$$
- For a `Sub` node with children $L$ and $R$:
  $$\mathbf{v} = \mathbf{v}_L - \mathbf{v}_R$$
- For a `Neg` node with child $C$:
  $$\mathbf{v} = -\mathbf{v}_C$$

### C. Normalization
Once computed, the resultant vector is normalized to unit length to isolate semantic direction from magnitude:

$$\hat{\mathbf{v}}_{\text{calc}} = \frac{\mathbf{v}_{\text{calc}}}{\|\mathbf{v}_{\text{calc}}\|}$$

### D. Planar 2D Coordinate Derivation
To anchor the pseudo-node on the 2D canvas, a smoothed 2D planar coordinate $(x_{\text{calc}}, y_{\text{calc}})$ is evaluated. The position is calculated by applying the same arithmetic operations to the normalized 2D coordinates of the constituent words, weighted by inverse distance to preserve topological stability relative to the corpus embedding plane.

---

## 4. Nearest Neighbor Projection & Force Layout

Once $\hat{\mathbf{v}}_{\text{calc}}$ is established, the client engine scans the corpus vocabulary to identify words that reside in close semantic proximity to the calculated point.

### A. Cosine Similarity Scan
For all vocabulary tokens $i \in V$:

$$\text{sim}(i) = \frac{\hat{\mathbf{v}}_{\text{calc}} \cdot \mathbf{v}_i}{\|\hat{\mathbf{v}}_{\text{calc}}\| \|\mathbf{v}_i\|}$$

The terms are sorted in descending order of $\text{sim}(i)$. Terms explicitly included in the query arithmetic expression are flagged to distinguish computed affinities from constituent inputs.

### B. Neighbor Bubble Allocation
The number of projected neighbors is governed dynamically by the Options drawer slider (default: 100 words). The top $K$ neighbors are extracted and assigned dynamic radii based on normalized similarity:

$$r_i = r_{\text{min}} + (r_{\text{max}} - r_{\text{min}}) \cdot \left(\frac{\text{sim}(i) - \text{sim}_{\text{min}}}{\text{sim}_{\text{max}} - \text{sim}_{\text{min}}}\right)$$

### C. Phyllotaxis Spiral Initialization & D3 Force Simulation
To prevent overlapping nodes and ensure smooth convergence:
1. **Initial Seed Positions:** Nodes are placed around $(x_{\text{calc}}, y_{\text{calc}})$ using a Fermat spiral (phyllotaxis layout) with golden angle step $\theta \approx 137.5^\circ$:
   $$r = c \sqrt{i}, \quad \theta = i \cdot 137.507764^\circ$$
2. **Force Simulation Configuration:**
   - `charge`: Repulsive many-body force (`strength = -180`).
   - `collide`: Collision prevention radius (`radius = r_i + 2`).
   - `link`: Distance constraints linking neighbor bubbles to the central pseudo-node, where edge length is proportional to $(1 - \text{sim}(i)) \cdot 250$.
   - `center`: Gentle pull toward the pseudo-node coordinate.

---

## 5. Study Panel Pseudo-Node Inspector

When a vector arithmetic query executes, the Study Panel slides open to reveal comprehensive data on the calculated coordinate.

### A. Dynamic Phantom Node Visuals
On the canvas, the pseudo-node is styled distinctively:
- **Glowing Core:** Radial gradient with amber hue (`#f59e0b`).
- **Orbit Ring:** Concentric dashed border signifying a synthesized coordinate.
- **Badge:** Mathematical summation symbol (`∑`) or arithmetic operator icon.
- **Label:** Expression wrapped in parentheses: `(Isaac - Abraham + God)`.

### B. Dual Tab Study Panel Layout
The Study Panel provides two analysis modes:

#### 1. Top 10 Neighbors Tab
- Displays the 10 closest vocabulary words ranked by cosine similarity percentage.
- Shows part-of-speech badges and frequency counts.
- Clicking any neighbor navigates to that word's inspector while preserving the pseudo-node on the canvas.

#### 2. Verses Tab (Centroid Proximity)
- Measures cosine similarity between $\hat{\mathbf{v}}_{\text{calc}}$ and all precomputed verse centroids from `verse_index.json`:
  $$\text{sim}(V_j) = \frac{\hat{\mathbf{v}}_{\text{calc}} \cdot \mathbf{v}_{\text{verse}, j}}{\|\hat{\mathbf{v}}_{\text{calc}}\| \|\mathbf{v}_{\text{verse}, j}\|}$$
- Surfaces the most thematically aligned passages across scripture.
- Displays verse references, similarity badges, highlighted keyword matches, and direct verse jump controls.

---

## 6. State Lifecycle, Edge Cases & Cleanup

1. **Missing Vocabulary Handlers:** If an entered token does not exist in the vocabulary table, parsing immediately halts and presents an error toast: `Term '[word]' not found in the current corpus.`
2. **Zero Magnitude Handling:** If an expression evaluates to zero (e.g. `God - God`), the system alerts the user and avoids division-by-zero during normalization.
3. **Comprehensive Cleanup:**
   - Navigating via the Site Home button (`#header-home-link`) resets all pseudo-node variables (`pseudoNode = null`, `lastPseudoNeighbors = null`, `lastPseudoAst = null`), unpins the study panel, and restores the all-words graph with full opacity.
   - Clicking the search clear button (`#bwm-search-clear`) removes the pseudo-node and returns to the standard baseline view.
4. **Client-Side Execution Speed:** The 100D vector evaluation, vocabulary scan across 8,000+ words, and verse centroid ranking execute entirely client-side in under 45 milliseconds on standard browser hardware.
