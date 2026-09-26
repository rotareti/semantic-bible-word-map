# Architectural Decision Record: Analogy Projection Engine

## Status
Accepted (v13.0.1 Experimental)

## Context
Biblical narrative and typology frequently operate by analogical projection: mapping a structural motif observed in one historical archetype onto a new theological subject (e.g., mapping Moses leading Israel through the law and wilderness onto Jesus or Joseph). While pure sequential motif matching scans the entire corpus for unanchored structural echoes ($X_1 \to X_2 \to \dots \to X_N$), theological exegesis often requires anchoring the trajectory to a designated target seed ($Y_1$) and computing the projected counterparts ($Y_2, Y_3, \dots, Y_N$).

To support this inquiry, the SymBible Query Language introduces the analogy projection operator (`:`).

---

## 1. Syntax & Query Grammar

The analogy operator separates a source motif sequence from a target seed concept:

```
[Source Motif Sequence] : [Target Seed]
```

### Examples
- `Moses > Law : Joseph`
  (Projects the step from Moses to Law onto Joseph, discovering the corresponding role/attribute in Joseph's narrative).
- `Moses > desert > freedom : Jesus`
  (Projects the exodus journey of Moses onto Jesus, surfacing corresponding New Testament counterparts).
- `David > king : Abraham`
  (Projects kingship from David onto Abraham).
- `Jesus > (Cross + Blood) > Raised : Paul`
  (Supports composite vector arithmetic inside stages).

Target seeds can be single word lemmas or parenthesized vector arithmetic expressions (e.g. `grace + truth`).

---

## 2. Mathematical Formulation & 100D Offset Propagation

### A. Source Displacements
Given a source motif of $N$ stages $\{S_1, S_2, \dots, S_N\}$ with 100-dimensional vector embeddings $\mathbf{v}_{S_k} \in \mathbb{R}^{100}$:
$$\mathbf{d}_i = \mathbf{v}_{S_{i+1}} - \mathbf{v}_{S_i}, \quad i \in \{1, 2, \dots, N - 1\}$$
Normalized source step unit vector:
$$\hat{\mathbf{d}}_S = \frac{\mathbf{d}_i}{\|\mathbf{d}_i\|}$$

### B. Target Trajectory Propagation
Given a target seed concept $Y_1$ with vector embedding $\mathbf{v}_{Y_1} \in \mathbb{R}^{100}$:
$$\mathbf{t}_1 = \mathbf{v}_{Y_1}$$
$$\mathbf{t}_{i+1} = \mathbf{t}_i + \mathbf{d}_i, \quad i \in \{1, 2, \dots, N - 1\}$$
Where $\mathbf{t}_{i+1}$ represents the ideal unconstrained target point in 100D semantic space for step $i+1$.

---

## 3. Candidate Scoring & Motif Synchronization

To prevent divergences where motif matching ranks a candidate as an optimal structural echo but the projection surfaces low-frequency noise (e.g. rare vocabulary with frequency $f < 6$), the projection engine synchronizes its candidate pool evaluation with the motif composite scoring weights.

### A. Candidate Pool Filtering
1. **Vocabulary Frequency Filter:** Candidates must satisfy $f \ge 6$ (unless classified as `PROPN`), eliminating rare words and hapax legomena from corrupting narrative analogies.
2. **Grammatical Class Filter:** Candidates must match noun, verb, or proper noun classes unless matching the source stage part of speech.
3. **Exclusion Set:** Used words from the query expression are excluded from candidate pools.

### B. Composite Scoring Function
For each candidate $C$ with embedding $\mathbf{v}_C$ and norm $\|\mathbf{v}_C\|$:
1. **Target Directional Congruence:**
   $$\mathbf{d}_T = \mathbf{v}_C - \mathbf{t}_i, \quad \hat{\mathbf{d}}_T = \frac{\mathbf{d}_T}{\|\mathbf{d}_T\|}$$
   $$\text{simDir} = \hat{\mathbf{d}}_S \cdot \hat{\mathbf{d}}_T$$
2. **Christocentric Gravitational Alignment:**
   For the terminal projection step ($i = N - 1$), alignment against the canonical 100D Christ anchor vector $\mathbf{v}_{\text{Christ}}$:
   $$\text{simGravity} = \frac{\mathbf{v}_C \cdot \mathbf{v}_{\text{Christ}}}{\|\mathbf{v}_C\|}$$
3. **Syntactic POS Match Score:**
   Calculated using `computePosMatchScore(cand.pos, sourcePos)` with syntactic weight $w_{\text{pos}}$:
   $$\text{posBonus} = r_{\text{pos}} \cdot w_{\text{pos}}$$
4. **Motif Structural Fitness:**
   $$\text{motifScore} = (w_{\text{dir}} \cdot \text{simDir}) + (w_{\text{gravity}} \cdot \text{simGravity}) + \text{posBonus}$$
5. **Effective Similarity:**
   Weighted blend between directional motif fitness and raw vector dot product with the projected point:
   $$\text{effectiveSim} = (\text{motifScore} \cdot 0.70) + (\text{vecDot} \cdot 0.30)$$

Top candidates are ranked by $\text{effectiveSim}$ to determine the leading projection node (`topNeighbor`) and surrounding cluster candidates.

---

## 4. Dual-Lane Constellation Visualization

### A. Geometric Layout
1. **Top Lane (Source Motif):** Positioned at $y = -D/2$ ($D = 220\text{px}$), showing source nodes connected by solid amber directed arrows (`#f59e0b`).
2. **Bottom Lane (Target Projection):** Positioned at $y = +D/2$, showing the target seed connected to projected pseudo-nodes by dashed sky-blue directed arrows (`#38bdf8`).
3. **Horizontal Spacing:** Step distance $L = 260\text{px}$ centers both lanes around $x = 0$.
4. **Vertical Guidelines:** Dashed vertical connecting guidelines link each source stage with its corresponding projection step, labeled with adaptive background badges ("Anchor", ": Projection").

### B. Organic Word Cluster Relaxation
Around each projected pseudo-node, real vocabulary candidate words from the scored pool are placed in an organic orbit. A dedicated D3 force simulation relaxes surrounding candidate words while pinning trajectory anchor nodes (`fx`, `fy`), ensuring structural stability while allowing organic exploration of neighboring concepts.

### C. Canvas State Discipline
All trajectory edges, arrowheads, and pill badges must strictly preserve canvas context state balance. Each `ctx.save()` must pair with an immediate matching `ctx.restore()` within its local rendering scope to avoid state leakage across simulation ticks.

---

## 5. User Interaction & Study Panel

1. **Word Study Navigation:** Clicking any projected real word on the canvas opens its complete Word Study panel without wiping the active projection. A `< Projection` header button returns to the projection panel at any time.
2. **Pseudo-Node Reopen:** Clicking a projected pseudo-node or the top-right reopen button immediately re-opens the Analogy Projection inspector panel.
3. **Keyboard Navigation:** Pressing `/` drops into a clean search bar. `O` / `Alt+O` toggles the Options drawer, `S` / `Alt+S` toggles the Study panel, and `Tab` inserts autocomplete suggestions without overwriting surrounding tokens.
