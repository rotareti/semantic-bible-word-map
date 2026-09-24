# Architecture & Specification: N-Length Motif Matching & Trajectory Overlay

**Project:** SymBible Semantic Word Map (Berean Standard Bible, Septuagint, Clementine Vulgate)  
**Date:** September 23, 2026  
**Document ID:** `docs/13-motif-trajectory-matching-spec.md`  
**Related Components:** [`web/bible-word-map.js`](file:///home/josh/code/semantic-lxx-word-map/web/bible-word-map.js), [`docs/12-vector-arithmetic-and-pseudo-node-spec.md`](file:///home/josh/code/semantic-lxx-word-map/docs/12-vector-arithmetic-and-pseudo-node-spec.md)  

---

## 1. Executive Summary

Biblical narratives frequently exhibit profound structural, thematic, and typographic parallels across books, testaments, and eras. For example:
- **Joseph Typology:** `Joseph > Pit > Exalted` echoes `Jesus > Cross > Raised`.
- **Exodus Paradigm:** `Slavery > Wilderness > Promised Land` mirrors `Sin > Repentance > Salvation`.
- **Prophetic Patterns:** `Elijah > Chariot > Elisha` foreshadows `Jesus > Ascension > Apostles`.

In vector space, a sequential narrative motif corresponds to an oriented polyline or geometric trajectory through 100-dimensional semantic space. 

Searching for matching narrative shapes across a biblical vocabulary of 8,000 to 12,000 words poses severe computational challenges: an exhaustive search of an $N$-length sequence scales exponentially at $O(|V|^N)$. For a 3-step sequence, this requires over $5 \times 10^{11}$ operations, which would freeze client browsers.

This specification details SymBible's **Chained K-Nearest Neighbors (KNN)** search algorithm, reducing computational complexity to $O(|V| \cdot k^{N-1})$ (executing in milliseconds), alongside the D3.js trajectory overlay engine, curvature penalty scoring, dynamic phantom node rendering, and responsive bounding-box camera framing.

---

## 2. Sequence Query Syntax & Parsing

The motif query engine uses the right-arrow delimiter (`>`) to denote sequential progression through semantic space.

### Syntax Specification

```text
SequenceQuery ::= Stage ( '>' Stage )+
Stage         ::= ArithmeticExpression | Word
```

### Examples
- **Standard Sequences:** `Jesus > Cross > Raised`
- **4-Stage Sequences:** `Abraham > Isaac > Jacob > Joseph`
- **Sequences with Arithmetic Blocks:** `Jesus > (Cross + Blood) > Raised`
- **Multilingual Support:** `Iesous > Stauros > Anastasis` (in LXX Greek) or `Iesus > Crux > Resurrectio` (in Latin Vulgate)

### Parser Architecture
1. The lexer splits the query string on top-level `>` operators, preserving internal parentheses.
2. Each stage substring is handed to the arithmetic AST parser (see [docs/12-vector-arithmetic-and-pseudo-node-spec.md](file:///home/josh/code/semantic-lxx-word-map/docs/12-vector-arithmetic-and-pseudo-node-spec.md)).
3. If a stage consists of a single word, it evaluates to the word's 100D embedding vector. If a stage contains mathematical operators (`+`, `-`), it evaluates to a synthesized 100D pseudo-node vector.
4. The output is an ordered sequence of $N$ 100-dimensional vectors:
   $$S = [\mathbf{v}_1, \mathbf{v}_2, \dots, \mathbf{v}_N], \quad \mathbf{v}_i \in \mathbb{R}^{100}$$

---

## 3. Chained K-Nearest Neighbors (KNN) Search Algorithm

### A. Pseudo-Node Pre-Processing & Displacement Vectors
Before initiating the corpus scan, the directional transitions of the source query are isolated:

1. **Displacement Vectors:**
   $$\mathbf{d}_i = \mathbf{v}_{i+1} - \mathbf{v}_i, \quad i \in [1, N-1]$$

2. **Unit Normalization:**
   $$\hat{\mathbf{d}}_i = \frac{\mathbf{d}_i}{\|\mathbf{d}_i\|}$$
   Unit normalization isolates semantic direction from word frequency and vector magnitude.

### B. The Chained Search Heuristic
To find candidate narrative sequences $X_1 \to X_2 \to \dots \to X_N$ across the vocabulary:

1. **Candidate Start Pool:** Iterate through all valid starting words $X_1 \in V_{\text{filtered}}$ (filtering by part of speech: Nouns, Verbs, Proper Nouns, and frequency threshold $f \ge 10$ to prune obscure hapax legomena).
2. **Forward Projection:** For candidate word $X_1$, project the ideal next spatial coordinate:
   $$\mathbf{t}_2 = \mathbf{v}_{X_1} + \mathbf{d}_1$$
3. **Local KNN Query:** Search the spatial vector space for the top $k$ nearest vocabulary words to $\mathbf{t}_2$ (default: $k=5$). These words constitute the candidate pool for $X_2$.
4. **Chained Recursion:** For each candidate in $X_2$, project the next target point $\mathbf{t}_3 = \mathbf{v}_{X_2} + \mathbf{d}_2$, and retrieve the top $k$ nearest words for $X_3$. Continue iteratively until reaching stage $N$.
5. **Deduplication:** Filter out trivial identity paths (where $X_{i} = X_{j}$) and sequences containing words present in the original query.

### C. Complexity Reduction
| Algorithm | Complexity ($N=3, |V|=8,000, k=5$) | Operations | Client Runtime |
| :--- | :---: | :---: | :---: |
| **Exhaustive Brute Force** | $O(|V|^N)$ | $5.12 \times 10^{11}$ | Browser crash / minutes |
| **Chained KNN** | $O(|V| \cdot k^{N-1})$ | $2.0 \times 10^5$ | **18 - 42 ms** |

---

## 4. Path Scoring, Curvature Penalty & Christocentric Gravity Weight

Every completed sequence candidate $X = [X_1, X_2, \dots, X_N]$ is scored using a calibrated composite fitness function that balances geometric congruence with theological resolution.

### A. Directional Cosine Match ($\text{Sim}_{\text{dir}}$)
Measures how closely each displacement step in the candidate path mirrors the corresponding directional vector of the source sequence:

$$\mathbf{u}_i = X_{i+1} - X_i, \quad \hat{\mathbf{u}}_i = \frac{\mathbf{u}_i}{\|\mathbf{u}_i\|}$$

$$\text{Sim}_{\text{dir}} = \frac{1}{N-1} \sum_{i=1}^{N-1} (\hat{\mathbf{d}}_i \cdot \hat{\mathbf{u}}_i)$$

### B. Curvature Penalty ($\Delta \theta$)
When $N \ge 3$, sequences change direction. A narrative trajectory is characterized not only by individual step directions, but by its internal turning angles (narrative curvature).

For both the source sequence and candidate path, the internal turn angle at each intermediate stage $i \in [2, N-1]$ is computed:

$$\cos(\theta_{\text{source}, i}) = \hat{\mathbf{d}}_{i-1} \cdot \hat{\mathbf{d}}_i$$

$$\cos(\theta_{\text{target}, i}) = \hat{\mathbf{u}}_{i-1} \cdot \hat{\mathbf{u}}_i$$

Discrepancies in internal angles are normalized against $\pi$:

$$\Delta \theta = \begin{cases} \frac{1}{(N-2)\pi} \sum_{i=2}^{N-1} |\theta_{\text{source}, i} - \theta_{\text{target}, i}| & \text{for } N \ge 3 \\ 0 & \text{for } N < 3 \end{cases}$$

### C. Christocentric Gravity Alignment ($\text{Sim}_{\text{gravity}}$)
Biblical typology is teleological: narrative arcs systematically resolve toward redemption, covenant fulfillment, and Christ. Pure geometric congruence alone can produce structurally parallel but theologically trivial matches (e.g. `Moses > desert > freedom` matching `Aaron > owl > control`).

To ensure biblical narratives resolve toward New Testament fulfillment, a gravitational anchor is constructed on the fly from the 100D `wordmap_2d.json` vocabulary:

1. **Dynamic Anchor Vector Retrieval:**
   Construct raw composite vector $\mathbf{v}_{\text{raw}}$ by extracting and averaging the 100D vectors for the canon's core Messianic lemmas:
   - **BSB (English):** Average `jesus_PROPN`, `christ_PROPN`, and `messiah_PROPN`.
   - **LXX (Greek):** Average `jesus_G2424_PROPN` and `christ_G5547_PROPN`.
   - **VUL (Latin):** Average `jesus_iesus_PROPN` and `christ_christus_PROPN`.

2. **L2 Normalization:**
   $$\mathbf{v}_{\text{Christ}} = \frac{\mathbf{v}_{\text{raw}}}{\|\mathbf{v}_{\text{raw}}\|_2}$$

3. **Terminal Proximity Measure:**
   Semantic proximity between the sequence's terminal node $X_N$ (the narrative climax/resolution) and the Christ anchor:
   $$\text{Sim}_{\text{gravity}} = \hat{\mathbf{v}}_{X_N} \cdot \mathbf{v}_{\text{Christ}}$$

### D. Composite Scoring Function
The overall fitness score $S$ combines directional alignment, curvature penalty, and Christocentric gravity:

$$S = (w_{\text{dir}} \cdot \text{Sim}_{\text{dir}}) - (w_{\text{angle}} \cdot \Delta \theta) + (w_{\text{gravity}} \cdot \text{Sim}_{\text{gravity}})$$

**Calibrated Default Weight Configurations:**
- Directional Alignment ($w_{\text{dir}}$): `0.50` (range 0.0 to 1.0, step 0.05)
- Turning Angle Penalty ($w_{\text{angle}}$): `0.15` (range 0.0 to 1.0, step 0.05)
- Christocentric Gravity ($w_{\text{gravity}}$): `0.35` (range 0.0 to 1.0, step 0.05; set to `0.00` for pure unweighted geometry)

Three dedicated sliders in the Options panel under "Motif Trajectory Weights" expose real-time adjustment of these parameters with live numeric badge updates and debounced re-ranking. The weights serialize to compact URL query parameters (`wd`, `wa`, `wg`) and omit default values.

Results are ranked by composite score $S$ and presented in the Study Panel (top 14 matches) with calibrated match percentages. A 1-click "Share" button in the panel header copies the parameterized URL to the clipboard.

---

## 5. D3.js Visualization & Trajectory Overlay Engine

When a motif search completes, the canvas transforms into an isolated narrative trajectory stage.

### A. Trajectory Layout & Companion Lanes
1. **Reference Search Trajectory:**
   - Anchor the initial search node at $(0, 0)$.
   - Project subsequent stages along their respective direction vectors using a standard visual step length $L = 220\text{px}$.
   - Center the search motif around the coordinate origin $(0, 0)$.
2. **Companion Lanes:**
   - Matching motif paths are aligned parallel to the reference trajectory along perpendicular normal lanes.
   - The active selected match occupies the primary companion lane at distance $+48\text{px}$.
   - Other matches fan out as shadow envelopes ($+48\text{px} + \Delta$).

### B. Directed Bezier Arcs & Arrowheads
- Trajectory edges are drawn as smooth quadratic bezier curves to visually differentiate narrative sequences from the background semantic mesh.
- Curve control points are offset perpendicularly from edge midpoints:
  $$C_x = M_x + N_x \cdot \delta_{\text{curve}}, \quad C_y = M_y + N_y \cdot \delta_{\text{curve}}$$
- Arrowheads are drawn as filled triangles rotated to match the tangent angle at the curve endpoint:
  $$\alpha = \text{atan2}(P_{2, y} - C_y, P_{2, x} - C_x)$$

### C. Dynamic Phantom Nodes
If a stage in the source or target match represents an arithmetic pseudo-node (e.g. `(Cross + Blood)`):
- Rendered with a dashed golden orbit ring and glowing core (`#f59e0b`).
- Node label displays the mathematical equation enclosed in brackets: `[Cross + Blood]`.

### D. Canvas Dimming & Background Isolation
- All background corpus words are dimmed to `globalAlpha = 0.05` and pointer events are isolated.
- The active matching sequence is rendered at `globalAlpha = 1.0` in electric cyan (`#38bdf8`) with glowing drop shadow.
- Secondary matching paths are rendered at `globalAlpha = 0.22` as ambient narrative context.

### E. Responsive Bounding-Box Camera Pan
The camera automatically frames the active motif sequence with guaranteed margins:
1. **Bounding Box Calculation:**
   $$x_{\text{min}} = \min_{n \in S \cup M} n.x, \quad x_{\text{max}} = \max_{n \in S \cup M} n.x$$
   $$y_{\text{min}} = \min_{n \in S \cup M} n.y, \quad y_{\text{max}} = \max_{n \in S \cup M} n.y$$
2. **Viewport Margins:**
   - Left Margin: 300px if the Options Panel is pinned.
   - Right Margin: 440px if the Study Panel is open/pinned.
   - `effectiveCw = max(cw - leftMargin - rightMargin, 200)`.
3. **15% Viewport Padding:**
   $$W_{\text{avail}} = \text{effectiveCw} \cdot (1 - 2 \cdot 0.15) = 0.70 \cdot \text{effectiveCw}$$
   $$H_{\text{avail}} = ch \cdot (1 - 2 \cdot 0.15) = 0.70 \cdot ch$$
4. **Scale Clamping:**
   $$\text{scale} = \min\left(3.5, \max\left(0.20, \min\left(\frac{W_{\text{avail}}}{x_{\text{max}} - x_{\text{min}}}, \frac{H_{\text{avail}}}{y_{\text{max}} - y_{\text{min}}}\right)\right)\right)$$
5. **Smooth D3 Transition:**
   In-flight canvas transitions are interrupted via `d3.select(canvas).interrupt()`, followed by a smooth `d3.easeCubicOut` transition (600ms) to the target center.

---

## 6. Lifecycle, State Management & Home Reset

1. **Site Home Button Reset:** Clicking the home logo (`#header-home-link`) executes a complete purge:
   - Clears `motifResults`, `searchMotifNodes`, `activeMotifMatch`, `activeMotifIdx`, and `pseudoNode`.
   - Closes the Study Panel and hides the word reopen button.
   - Restores the all-words graph with full baseline opacity and cancels any active trajectory overlay.
2. **Search Clear Button:** Clicking `#bwm-search-clear` resets the map, clears active motif results, and returns to the unfiltered Word Mode view.
3. **Study Panel Switching:** Clicking any match card in the Study Panel triggers `activateMotifMatch(idx)`, re-centering companion lanes and smoothly transitioning the camera to the newly selected trajectory.
