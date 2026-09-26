# SymBible Agent Guide

## Objective
SymBible precomputes semantic relationships between words, verses, chapters, and books across biblical canons (BSB, LXX, VUL). It enables:
- Exploration of scripture through a distributional semantic lens.
- Generation of unbiased cross-references and lexicon-like structural mappings.
- Investigation of biblical typology, symbology, and thematic parallels through multi-dimensional vector space.

## Tech Stack & Architecture
- **Data Acquisition & Pipeline**: Python 3 for text fetching, cleaning, morphological lemmatization, POS tagging, Word2Vec training, centroid computation, and 2D coordinate reduction.
- **Supported Environment**: Ubuntu Linux (supports both CPU and GPU execution).
- **Frontend**: Vanilla JavaScript HTML5 Web Component (`<bible-word-map>`). May migrate to TypeScript in the future to build a single static library. Designed as a standalone, embeddable component for third-party web applications.
- **Styling**: CSS is kept simple, modular, and customizable via CSS variables (`--bwm-*`) so external consumers can easily modify color palettes and minor styles.
- **Architecture & Design**: Reference the `docs/` directory for URL structure, research studies, and architectural decisions.

## Data Artifacts & Blob Specifications
The ML pipeline generates static data artifacts under `data/output/`:
- **2D Coordinates**: `wordmap_2d.json`, `verse_centroids_2d.json`, `chapter_centroids_2d.json`, `book_centroids_2d.json` (for BSB, LXX, VUL).
- **Verse & Word Index**: `verse_index.json` (mapping lemma tokens to verse references).
- **Sense & Autocomplete Indices**: `sense_nodes.json` and `autocomplete_index.json`.

For exact schema specifications, optimization targets, and future binary format considerations, refer to [docs/05-data-format-and-optimization-spec.md](file:///home/josh/code/semantic-lxx-word-map/docs/05-data-format-and-optimization-spec.md).

## Versioning & Branching Strategy
- **Semantic Versioning Rules**:
  - `Major` (X.0.0): Data schema breaking changes or major feature additions.
  - `Minor` (0.X.0): Feature improvements or non-breaking feature additions.
  - `Patch` (0.0.X): Bug fixes or internal changes invisible to user perception.
- **Revision Control**: Git. All development work should be executed on a feature branch and reviewed manually before merging into `main`.

## SymBible Query Language & Experimental Engines
The platform supports three distinct modes of high-dimensional semantic inquiry directly via the search bar:
- **Vector Arithmetic (`+`, `-`):** Evaluates dense 100D vector arithmetic and smoothed 2D coordinates to synthesize pseudo-nodes (`∑`). Surrounding neighbor words and nearest verse centroids are inspected via a dual-tab study card.
- **Motif Trajectory Matching (`>`):** Traces sequential narrative and typological trajectories of arbitrary length. Uses a chained K-Nearest Neighbors heuristic with directional step cosine scoring, internal curvature penalties, Christ-gravity alignment ($w_{\text{gravity}}$), and POS syntactic congruence ($w_{\text{pos}}$).
- **Analogy Projections (`:`):** Projects source motif sequences onto designated target seeds in 100D vector space (e.g. `Moses > Law : Joseph`). Displays a dual-lane parallel constellation layout with organic word cluster relaxation. Candidate ranking is synchronized with motif composite scoring weights and low-frequency noise filters ($f \ge 6$).

## Canvas Rendering & State Discipline
- **Strict `save()` and `restore()` Pairing:** Every call to `this.ctx.save()` MUST have a strictly matching `this.ctx.restore()` within its local scope or loop iteration. Unbalanced canvas saves cause context state leakage across D3 simulation ticks, compounding translations and scales infinitely into the bottom-right quadrant and breaking mouse hit testing.
- **Text & Glyph Scaling:** Vector icons (such as `∑` and `:`) and text inside nodes must scale with node radius (`canvasR`) and canvas zoom (`/ this.transform.k`) to avoid clipping or overflow across zoom levels.
- **Theme Adaptivity:** Colors on canvas must adapt cleanly between light and dark themes. Text and background masks should never use pure black or pure white fills without checking `isDarkMode()` or theme color variables.

## Keyboard Navigation & Desktop Accessibility
- **Slash (`/`):** Immediately clears and focuses the search input for rapid mouse-free navigation.
- **Tab Completion:** When an autocomplete item is highlighted, pressing `Tab` inserts the completion at the cursor without deleting preceding or following query tokens.
- **Panel Toggles:** `O` or `Alt+O` toggles the Options drawer; `S` or `Alt+S` toggles the Study panel.
- **Escape (`Esc`):** Dismisses open overlays, popovers, or unpinned inspectors.

## Development Conventions
- **Changelog**: Update `CHANGELOG.md` with user-facing and architectural changes.
- **Git Commit Rules**:
  - Subject line: 50 characters maximum, written in imperative mood (e.g. `Add verse search autocomplete`).
  - Body line length: 72 characters maximum, explaining the rationale for non-trivial changes.
  - Structure: Atomic commits (one logical change per commit).
- **Code Comments**: Add inline comments only when code behavior or implementation rationale is not obvious.
- **Strict Formatting Restrictions**:
  - Do NOT use em dashes in docs, commit messages, or code comments. Use standard hyphens, colons, or parentheses.
  - Do NOT add co-author attributions to commit messages or source files.
- **UI Testing & Verification**: All UI changes must be tested manually and verified before deployment (unless explicitly instructed otherwise).
