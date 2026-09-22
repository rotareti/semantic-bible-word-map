# Changelog

## [12.1.0] - 2026-09-22
### Added
- **Multi-Word Search Autocomplete:** Enabled multi-term autocomplete in the search bar across spaces and commas:
  - **Sequential Autocomplete:** Typing an initial word (e.g. "Fat") suggests terms like "Father". Adding a delimiter (space or comma) preserves previous terms and transitions autocomplete to the subsequent word being typed (e.g. "Father, lov" suggests "love").
  - **Semantic Companion Suggestions:** When a delimiter is added without characters for the subsequent term (e.g. "Father "), autocomplete dynamically recommends high-affinity semantic companions (e.g. "son", "spirit", "faith", "love") based on cosine similarity and frequency.
  - **Multi-Token Prefix Preservation:** Selecting an autocomplete suggestion preserves all preceding keywords in the search bar and graphs all terms simultaneously in Word Mode or Verse Mode.
  - **Mixed Search Detection & Multi-View Navigation:** When a query contains a mix and match of different canonical entity types (such as words, verse references, chapters, or books; e.g. "Father, John 3:16"):
    - Categorized navigation suggestions are generated for each corresponding view (Words Mode, Verses View, Chapters Mode, Books Mode).
    - Requires the user to navigate to one of the suggested views rather than attempting an invalid mixed canvas graph.
    - Pressing Enter on mixed searches prompts the navigation popover with all available target views.
  - **Cross-View Multi-Category Suggestions:** Queries matching canonical books that also match vocabulary words or names (e.g. "Acts" or "1 John") generate suggestions across all relevant views (Word view, Book view, Chapter view, Verse view) with categorized section headers (`Words`, `Books`, `Chapters`, `Verses`), enabling seamless navigation regardless of current view mode.
  - **Numbered Book Prefix Tokenization:** Preserves biblical book titles with leading number prefixes (such as "1 John", "2 Peter", "1 Kings", "2 Samuel") as single search items instead of splitting into disjointed numeric tokens, while extracting the lexeme component (e.g. "John") to offer simultaneous Word view suggestions.
  - **Dynamic Multi-Keyword Exploration & Centroid Autocomplete:** When typing multiple words (e.g. "In the beginning God"), automatically computes the semantic centroid in the background across all views (words, verses, chapters, books), presenting "Explore N Keywords in Word view" alongside "Top Linked Verses (Semantic Map Centroid):" with direct verse jump navigation.

### Changed
- **Multi-Word Search Performance & UI Non-Blocking:**
  - Integrated loading spinner activation during background centroid calculations and multi-keyword Word Mode searches.
  - Introduced cooperative main thread yielding between keyword vector searches to keep the UI fluid and prevent browser freezes.
  - Optimized centroid verse calculation with precomputed Set indices, reducing candidate verse scoring time by over 90%.
  - Added cooperative yielding (`await new Promise(r => setTimeout(r, 0))`) every 128 candidate verses so the browser UI thread never lags or drops keystrokes during background scoring.
  - Implemented sequence-aware task cancellation (`abortCheck`) so subsequent keystrokes immediately abort in-flight centroid calculations.
  - Tuned dynamic centroid search debounce from 120ms to 280ms to prevent premature background calculations while actively typing subsequent words.
  - Added memoization for search item classification (`_classifyCache`) and semantic companions (`_companionCache`) across keystrokes.
  - Implemented adaptive neighbor limit scaling (`Math.floor(220 / numKeywords)`) for queries with 3+ words, preventing excessive node counts and D3 simulation stalls.
  - Precomputed keyword verse lookups as hash sets for O(1) link intersection performance.
- **Options Drawer & Suggestions Hierarchy:**
  - Opening the options drawer (hamburger toggle, `openDrawer()`, or interacting with drawer controls) immediately collapses and closes the autocomplete suggestions popover.
  - Elevated open drawer z-index (`10040`) above popovers to prevent overlay collisions.
- **Search Resolution & Recovery Fallback:** Hitting Enter or clicking the search icon executes searches directly. If all words in Word Mode are valid, graphs all words and opens the study panel; if any words cannot be resolved, falls back to the nearest matches window.
- **Search Suggestion Taxonomy & Category Badges:** Updated category badge labels to "Word view" and "Verse View" (replacing legacy "Words mode" and "Centroid Verse"), paired with categorized section delineators in the suggestions dropdown.
- **Clean Professional Typography:** Removed emoji icons from dynamic search suggestions and recovery cards to maintain consistent, professional styling.
- **Asset Cache Busting (`v=12.1.0`):** Bumped cache-buster query parameter to `?v=12.1.0` across stylesheet links, custom element scripts, and runtime data fetch requests.

### Fixed
- **Search Input Typing Latency:** Fixed main-thread lockup when typing 3 or more words by removing synchronous O(N) array scans (`list.includes(vIdx)`) across thousands of candidate verses and yielding to the browser event loop.
- **Options Drawer Layering & Suggestion Dismissal:** Fixed an issue where the options drawer opened beneath the autocomplete suggestions window by collapsing suggestions and blurring the search input upon drawer activation.
- **Direct Multi-Word Search Execution:** Fixed search execution when pressing Enter or clicking the search button with multiple space-delimited keywords (e.g. "Father Son Spirit"). Removed obsolete length heuristic that aborted queries with 3+ space-separated keywords without commas.
- **Book Classification and Multi-Word Suggestion Accuracy:** Fixed book matching in search item classification to require exact book names, codes, or recognized aliases instead of prefix matching, preventing common words (such as "Son" from "Song of Solomon") from being misclassified as books, triggering false mixed search modes, or being dropped from word search suggestions.
- **Non-Exclusive Suggestion Categorization:** Populated mixed search item suggestions non-exclusively so dual-potential terms (such as names that match both books and common lexemes) are preserved in word suggestions.

## [12.0.0] - 2026-09-21
### Added
- **Contextual Sense Disambiguation & Entity Unification Architecture:** Introduced a new semantic layer that resolves biblical polysemy and unifies cross-canonical theological entities without disrupting the global Word2Vec semantic manifold:
  - **Contextual Sense Nodes:** Deployed transformer-based contextual clustering (MiniLM contextual verse representations projected into the calibrated word manifold) to disentangle polysemous terms into distinct theological and literal senses (e.g. *temple* as Physical Sanctuary vs. Spiritual Body; *spirit* as Divine/Holy Spirit vs. Wind/Breath; *law* as Mosaic Legislation vs. Spiritual Principle).
  - **Cross-Lexeme Entity Unification:** Unified disparate biblical titles and names representing singular biblical persons or realities across testaments and translations (e.g. *Jesus Christ* unifying *Jesus*, *Christ*, *Lord*, *Messiah*; *Lord God* unifying *Yahweh*, *God*, *Lord*, *Almighty*).
  - **Canvas Visual Distinction:** Disambiguated sense nodes display their lemma on the top line with the contextual sense parenthesized beneath (e.g. `temple` with `(Physical Sanctuary)`), while the unified centroid word displays `(Unified Context)`. Unified entities display `(Unified Entity)`.
  - **Contextual Force Graph Dynamics:** Inter-sense sister nodes are linked with subtle purple dashed connection arcs (`sense-bridge`) matching the dashed purple style of parent centroid connectors (`sense-parent`), while entity member lemmas are connected with dashed emerald links (`entity-member`).
  - **Contextual Study Panel Header:** Added an interactive contextual selector situated in the header above the tabs, allowing readers to toggle seamlessly between the Unified Context and specific contextual senses or entities, instantly refreshing Verses, Language, Usage, and Neighbors.
  - **Options Drawer Disambiguation Toggle:** Added a dedicated pill slider toggle in the Options menu (`Enabled` / `Disabled`), defaulting to `Disabled` for backward compatibility with classic Word2Vec topology, with URL state persistence via `?d=on`.

### Changed
- **Study Panel Contextual Selector Simplification:** Streamlined the top study panel disambiguation selector with wrapping buttons (`flex-wrap: wrap`) and transparent background, removing redundant OT/NT split bars and verse count statistics that are already comprehensive in the Usage tab.
- **Search Autocomplete Precision:** Fixed search autocomplete to restrict polysemous sense matching to queries matching the underlying lemma or entity name, preventing sense subtitle words (such as "Spiritual Body") from hijacking queries for other terms (such as "spirit").
- **Asset Cache Busting (`v=12.0.0`):** Bumped cache-buster query parameter to `?v=12.0.0` across stylesheet links, custom element scripts, and runtime data fetch requests.

## [11.2.0] - 2026-09-20
### Added
- **Empirically Calibrated Word2Vec Model (Window 15):** Calibrated embedding training architecture across the Berean Standard Bible, Septuagint, and Clementine Vulgate based on the Biblical Semantic Evaluation Benchmark (BSEB):
  - Calibrated symmetric 15-word window spans ~30 words, directly matching the average biblical verse length (~24 words) without bleeding into whole-chapter administrative lists.
  - Achieves peak retrieval precision (MAP@10 = 0.1820, Recall = 0.2619), outperforming Window 50 (0.1040) by over 75%.
  - Standard subsampling (`sample=1e-3`) and negative sampling (`negative=5`) preserve essential syntagmatic and relational connective glue between verbs and noun phrases.
- **Adaptive Frequency-Stratified Neighbor Filtering:** The Study Panel now filters out rare idiosyncratic terms (corpus count < 10) from top-10 neighbor recommendations for primary keywords, ensuring big biblical themes are always flanked by high-value, substantive concepts while keeping rare terms fully searchable and projected on the map.
- **Evaluation Benchmark Suite (`pipeline/eval_benchmarks.py`):** Added automated evaluation harness calculating Mean Average Precision (MAP@10), Noise Intrusion Rate (NIR@10), and Word Intrusion Test Accuracy (WITA) across 100 probe terms in five biblical categories.
- **Model Evaluation Research Study (`docs/11-model-evaluation-and-contextual-embeddings-plan.md`):** Documented comprehensive grid sweep comparisons across window sizes and subsampling thresholds, detailing the mathematical mechanism behind low-value word intrusion and establishing Window 15 as the optimal empirical context span.

### Changed
- **About Documentation Update:** Updated `ABOUT.md` and the in-app About modal with empirical calibration findings across window sizes and neighbor frequency filtering.
- **Asset Cache Busting (`v=11.2.0`):** Bumped cache-buster query parameter to `?v=11.2.0` across stylesheet links, custom element scripts, and runtime data fetch requests.

## [11.1.0] - 2026-09-19
### Added
- **Word2Vec Hyperparameter Optimization (`sample=1e-4`, `negative=10`):** Tuned embedding hyperparameters across the Berean Standard Bible, Septuagint, and Clementine Vulgate:
  - Aggressive Subsampling (`sample=1e-4`): Down-samples high-frequency narrative glue words (such as *city*, *crowd*, *go*, *come*, *say*), breaking their gravitational pull in wide context windows and enabling rarer theological terms to cluster tightly.
  - Negative Sampling Expansion (`negative=10`): Increased negative samples from 5 to 10 to sharpen discrimination between broad narrative co-occurrence and true conceptual affinity, boosting average top-5 neighbor similarity from 0.657 to 0.700.
  - Retrained all three language models and regenerated the entire coordinate cascade (word maps, verse indices, verse centroids, chapter centroids, and book centroids).
- **Hyperparameter Tuning Empirical Study (`docs/10-word2vec-hyperparameter-tuning.md`):** Comprehensive research study documenting grid search evaluations across subsampling thresholds (`1e-3`, `1e-4`, `1e-5`) and negative sampling rates (`5`, `10`, `15`), detailing how `1e-5` triggers severe vector collapse and confirming `sample=1e-4, negative=10` as the optimal configuration.

### Changed
- **About Documentation Update:** Updated `ABOUT.md` and the in-app About modal with hyperparameter calibration findings and qualitative neighbor comparisons across soteriological, cultic, and covenantal vocabulary.
- **Asset Cache Busting (`v=11.1.0`):** Bumped cache-buster query parameter to `?v=11.1.0` across stylesheet links, custom element scripts, and runtime data fetch requests.

## [11.0.0] - 2026-09-19
### Added
- **Paradigmatic Semantics Word2Vec Model (Window 50):** Transitioned the embedding training architecture from a narrow 5-word syntagmatic window to an expanded 50-word context envelope (a 10x increase) across the Berean Standard Bible, Septuagint, and Clementine Vulgate:
  - Spans the entire verse envelope (covering 98% of biblical verses), allowing words to interact across the full thematic unit rather than immediate local phrases.
  - Decouples titular nouns from formulaic historical names (e.g. *priest* shifts away from specific names like *Zadok* or *Jehoiada* toward institutional and cultic vocabulary like *consecrated*, *priesthood*, *cleansing*, *Levites*, *office*, and *atonement*).
  - Uncovers deep covenantal and legal relationships (e.g. *covenant* connects directly with *commandments*, *ark*, *treaty*, *tablet*, *guarantee*, *mediator*, and *obsolete*).
  - Strengthens soteriological synthesis (e.g. *justify* surfaces *predestine* and *reconciliation*, mirroring Romans 8:30).
  - Shifts virtue spaces toward relational community attributes (e.g. *love* surfaces *brotherly*, *tenderhearted*, *harmony*, and *unity*).
- **Paradigmatic Semantics Empirical Study (`docs/09-paradigmatic-window50-study.md`):** Added a comprehensive research study documenting the theoretical framework, mathematical comparisons across six biblical categories, and verse length distribution analysis.

### Changed
- **About Documentation Update:** Updated `ABOUT.md` and the in-app About modal to explain the 50-word paradigmatic context envelope.
- **Asset Cache Busting (`v=11.0.0`):** Bumped cache-buster query parameter to `?v=11.0.0` across stylesheet links, custom element scripts, and runtime data fetch requests.

## [10.4.0] - 2026-09-19
### Added
- **Full Map Space About Overlay:** Introduced a comprehensive in-app About view accessible via the bottom footer:
  - Covers the entire canvas, search bar, Options drawer, Study Panel, and Legend with a sleek backdrop blur and responsive card layout.
  - Keeps the top header (with title, version, theme toggle, and share link) and footer visible and interactive above the overlay.
  - Provides intuitive dismissal via "Map View" back button, close button (`×`), `Escape` key, or clicking the home title.
- **Comprehensive Methodology & Limitations Documentation:** Added in-depth educational sections to both the in-app About view and repository `ABOUT.md`:
  - Distributional semantics (J. R. Firth), lemmatization, 100D Word2Vec Skip-gram embeddings, and calibrated UMAP 2D projections.
  - Multi-level semantic hierarchy across Word Mode, Verses View, Chapters Mode, Books Mode, and dynamic multi-word phrase centroids.
  - Empirical corpus findings on Zipf's law and *hapax legomena* (BSB: 30.66%, LXX: 41.27%, VUL: 37.09%), explanation for filtering threshold (`count >= 3`), and guidance for interpreting rare terms (3 to 5 occurrences).
  - Caveats regarding polysemy/homograph single-vector averaging, 2D projection crowding, and translation nuances.
  - Real discovery examples including the covenantal cluster, cross-canon alignments (*faith* / *pistis* / *fides*), and dynamic phrase centroid matching (Psalm 85:10).
  - Attribution for open source datasets (BSB, Septuaginta Rahlfs 1935 / CATSS, Brenton, STEPBible TBESG, SBLGNT, OpenScriptures Strong's, Clementine Vulgate & Douay-Rheims, William Whitaker's WORDS, PROIEL Latin Treebank, CLTK, D3.js) and GitHub repository link.
- **Optimal 100D Dimensionality Empirical Justification:** Added dedicated mathematical and empirical documentation justifying the 100-dimensional embedding choice across `ABOUT.md` and the in-app About modal:
  - Details TwoNN intrinsic manifold dimensionality measurements showing saturation at 8.4 to 9.6 dimensions across English, Greek, and Latin canons.
  - Highlights PPMI singular value decomposition confirming convergence of Effective Rank to ~215.5 and capture of 58% to 60.4% spectral energy.
  - Documents hubness skewness stabilization and peak 2D UMAP projection trustworthiness (0.8348 for LXX, 0.8270 for VUL) directly at 100D.

### Changed
- **Radial Menu Dark Mode Contrast:** Lightened the background of the quick actions radial menu buttons in dark mode from near-black to an elevated slate disc (`rgba(92, 107, 128, 0.94)`) with a translucent white border and depth shadow, ensuring circular button silhouettes and icons remain distinct against the dark map canvas without disappearing.
- **Explore Legend Brief Update:** Updated the brief description in the Legend overlay to clearly explain multi-level centroids and physical semantic proximity without external link dependencies, maintaining strict component encapsulation for embedding `<bible-word-map>` and search bar into external sites.
- **Footer Refinement:** Replaced the raw GitHub source link in the bottom footer with a styled "About" button and cleaned up the scripture quote to display cleanly as *"Freely you have received; freely give."*.
- **Desktop & Mobile Spacing Refinements:** Increased header padding on desktop viewports for a balanced, spacious top bar alongside the theme toggle and share controls; reduced excessive footer padding on desktop; and tightened vertical spacing above the footer text on mobile screens to eliminate awkward gaps under the map container.
- **Asset Cache Busting (`v=10.4.0`):** Bumped cache-buster query parameter to `?v=10.4.0` across stylesheet links, custom element scripts, and runtime data fetch requests.

## [10.3.0] - 2026-09-19
### Added
- **Theme Mode Toggle Button:** Added a theme mode button directly to the left of the Share button in the page header. Features include:
  - Defaults to the system theme (`prefers-color-scheme`) on initial visit, automatically adapting to the user's OS light or dark appearance.
  - Allows manual toggling between light and dark themes with persistent preference storage in local storage.
  - Displays a clean, professional vector icon that smoothly transitions between a Moon icon (in light theme, indicating switch to dark) and a Sun icon (in dark theme, indicating switch to light) with hover rotation.
  - Alt-clicking the theme button resets the preference back to following the system appearance.
  - Dynamically redraws the map canvas and updates all custom element variables, headers, and UI panels upon theme change with zero page reload or flash of unstyled content (FOUC).

### Changed
- **Asset Cache Busting (`v=10.3.0`):** Bumped cache-buster query parameter to `?v=10.3.0` across stylesheet links, custom element scripts, and runtime data fetch requests.

## [10.2.0] - 2026-09-19
### Added
- **Automatic Study Panel Opening on Desktop:** When searching for an entity or selecting a search suggestion on desktop viewports (>= 1024px), the Study Panel now automatically opens to reveal comprehensive details, definitions, and verses while keeping the visualization interactive. Mobile displays (< 1024px) keep the panel closed after search to preserve full-screen map touch interaction.
- **Dynamic Camera Viewport Centering:** Shifted the default and search camera focus on desktop viewports when the Study Panel is open so the target node or constellation is centered squarely in the visible canvas area rather than partially obscured behind the 480px panel. Closing or dismissing the Study Panel smoothly recenters the camera across the full viewport width.
- **Visible Map Zoom Extents Anchoring:** Dynamically shifts the Zoom Extents button leftward when the Study Panel is open on desktop (offsetting by panel width + margin) so the control remains accessible in the bottom-right corner of the visible map without overlapping the panel.
- **Multilingual Verse Keyword Highlighting:** Added subtle keyword highlighting in verses across the Study Panel in Word Mode:
  - Highlights English keyword occurrences in verse body text and smart snippets with custom tinted styling.
  - In Septuagint (LXX) and Clementine Vulgate (VUL) foundations, matching Greek and Latin words in the original language text beneath the English translation are automatically detected and highlighted using accent normalization and morphological stem matching.
  - Smart snippet generation centers the preview snippet around the first keyword match to guarantee immediate keyword visibility in cross-reference lists.

### Changed
- **Asset Cache Busting (`v=10.2.0`):** Bumped cache-buster query parameter to `?v=10.2.0` across stylesheet links, custom element scripts, and runtime data fetch requests.

## [10.1.1] - 2026-09-19
### Changed
- **Verse Study Panel Header Layout:** Repositioned the "Read Chapter >" navigation button to sit in the top-right header section horizontally across from the verse reference and navigation chevrons, directly below the panel control actions (`[ - | + ]`, pin toggle, and dismiss button), saving vertical space and keeping the verse title prominent.
- **Cross-Entity Map Mode Synchronization:** Synchronized map mode transitions when navigating between entities in the Study Panel:
  - Jumping from a word or chapter to a verse (e.g. from the Word Study Panel Verses tab or Chapter Study Panel reader and cross-references) switches the canvas to Verses View and focuses directly on that verse constellation.
  - Jumping from a verse to a full chapter (via "Read Chapter") switches the canvas to Chapters Mode and builds the focused chapter constellation rather than the generic landmark overview.
  - Navigating sequentially within the same entity type (via prev/next chevrons or mobile swipe gestures) continues to update the Study Panel in place without changing map mode or camera position.
- **Asset Cache Busting (`v=10.1.1`):** Bumped cache-buster query parameter to `?v=10.1.1` across stylesheet links, custom element scripts, and runtime data fetch requests.

### Fixed
- **Mobile Map Displacement and Search Bar Clipping:** Fixed a layout bug on mobile screens where clicking "Read Chapter" shifted the map canvas upward from the bottom and shoved the search bar off-screen under the header bar. Replaced ancestor-affecting `Element.scrollIntoView()` with container-scoped relative `pane.scrollTo()` and enforced top-level container scroll stability.
- **Mobile Chapter Reader Touch Scroll Lock:** Fixed an issue where downward touch scrolling inside the Chapter Study Panel reader was intercepted as a modal swipe-to-dismiss gesture. Added the chapter reader pane to swipe-to-dismiss scroll container detection and constrained chapter card body overflow.
- **Asynchronous Verses Search Resilience:** Added promise resolution fallbacks to `searchVerses` and `setViewMode('verses')` to ensure verse queries and jumps execute reliably if the verse index is still loading over the network.

## [10.1.0] - 2026-09-19
### Added
- **Top "Read Chapter >" Navigation Button:** Added a prominent "Read Chapter >" button with a rightward chevron directly in the Verse Study Panel header, enabling immediate one-tap chapter navigation and auto-scrolling to the active verse without scrolling past long lists of cross-references and constituent words.
- **Desktop Panel Pinning:** Introduced persistent pinning for the Options drawer and Study Panel on desktop viewports. Pin toggles (`📌`) allow users to dock either panel (viewports >= 1024px) or both panels simultaneously (viewports >= 1300px), with dynamic canvas camera recentering that automatically frames the semantic visualization in the remaining visible canvas space.
- **Cross-Canon Search Discovery Suggestions:** Added cross-canon search recovery suggestions across the Berean Standard Bible, Septuagint, and Clementine Vulgate. When a query has no direct matches in the active canon, the search dropdown suggests matching terms from sister canons, allowing one-click switching directly to the matching term and canon.
- **3-Word Dynamic Phrase Centroid Search:** Extended multi-word dynamic semantic centroid computation to support 3-word phrases in addition to 2-word queries, projecting 100D vector centroids in real time to locate the closest biblical verses across the canon.

### Changed
- **Study Panel Navigation Synchronization & Stacking:** Synchronized the Study Panel to follow user navigation seamlessly when pinned. Clicking "Read Chapter", searching another chapter (e.g. "Isa 53"), or searching another keyword (e.g. "faith") while pinned smoothly updates the Study Panel content to the active entity without closing. Fixed Study Panel stacking order so inactive cards are cleanly hidden off-screen, ensuring the active card always renders top-most.
- **High-Contrast Indirect Link Badges:** Redesigned the "Indirect link" badge styling across light and dark modes with high-contrast text, borders, and backgrounds for immediate visual distinction of bridged semantic connections.
- **Study Panel Header Similarity Decluttering:** Removed redundant `##.#% similarity to ...` badges from the top title line across Word Mode, Verses View, Chapters Mode, and Books Mode study panels, keeping header titles clean and legible while preserving detailed similarity scores in subtabs, cards, and list rows.
- **Calibrated Zoom Extents Margins:** Refined Zoom Extents bounding box calculations and margin padding across mobile and desktop displays to ensure all nodes and labels remain comfortably within the visible viewport bounds.
- **Asset Cache Busting (`v=10.1.0`):** Bumped cache-buster query parameter to `?v=10.1.0` across stylesheet links, custom element scripts, and runtime data fetch requests.

### Fixed
- **GitHub Pages Deployment Workflow for Chapters Mode Data:** Added `chaptermap_2d.json`, `chaptermap_2d_lxx.json`, and `chaptermap_2d_vul.json` to the GitHub Actions `pages.yml` site packaging step, resolving HTTP 404 errors when loading or searching chapters on the deployed production site.
- **Asynchronous Chapter Search Resilience:** Enhanced `searchChapters` and `showChapterCard` to gracefully wait for in-flight chapter data promises when users execute direct chapter queries or click chapter search suggestions.

## [10.0.0] - 2026-09-18
### Added
- **Chapters Mode Semantic Landscape:** Introduced Chapters Mode providing an interactive semantic landscape of all 1,189 biblical chapters across the Berean Standard Bible, Septuagint, and Clementine Vulgate. Computed 100D semantic chapter centroids with real-time dynamic projections, nearest neighbors, canon-wide cross-references, and full chapter reader integration.
- **Sequential Verse and Chapter Navigation Chevrons:** Added large, flat navigation chevrons (`<` and `>`) flanking verse and chapter references in both the Verse Study Panel and Chapter Study Panel headers. Enables rapid context exploration and peeking ahead or back without changing canvas zoom or camera framing, complete with canonical boundary clamping at Genesis 1:1 and Revelation 22:21.
- **Mobile Swipe Gestures:** Integrated native left and right touch swipe gestures on mobile devices (`<= 768px`) across the Verse Study Panel and Chapter Study Panel, advancing or rewinding verses and chapters fluidly while concealing desktop chevrons for an uncluttered mobile interface.
- **Unified Cross-Reference Verse Cards in Word Study Panel:** Upgraded the Verses tab of the Word Study Panel from plain text rows to modern interactive cross-reference cards featuring dedicated background and border contrast, clickable canonical verse citations that open the Verse Study Panel, book genre color badges, and inline passage expansion.
- **Dynamic Zoom Extents Recenter Button:** Added a glassy recentering button in the lower right corner of the canvas that smoothly returns the camera to ideal framing with a 600ms cubic-out transition whenever the user pans or zooms away from default bounds.

### Changed
- **Professional Study Panel Tab Styling:** Removed informal emoji icons and redundant hard-coded item counts from tab titles across Word, Verse, Chapter, and Book study panels (such as `Reader`, `Related`, `Refs`, `Words`, `Verses`, `Language`, `Usage`, `Neighbors`), achieving a clean, elegant, and scholarly aesthetic.
- **Subtab Selection Persistence:** Maintained active subtab selections across sequential chapter and verse navigation so readers stay focused on their preferred view (e.g. Reader, Cross-References, or Related Chapters).
- **Asset Cache Busting (`v=10.0.0`):** Bumped cache-buster query parameter to `?v=10.0.0` across stylesheet links, custom element scripts, and runtime data fetch requests.

## [9.2.2] - 2026-09-18
### Added
- **Compact URL Parameter Encoding & Share Button:** Added compact, human-readable URL query encoding (`m=` for mode, `c=` for canon, `b=` for book, `ch=` for chapter, `v=` for verse, `kw=` for keywords) with backward-compatible legacy parameter decoding and a dedicated top-header "Share" button with clipboard notification.
- **Top Header Home Navigation:** Added a modern minimalist home outline icon adjacent to "Semantic Bible" in the top header that resets the view to the default map without query parameters.
- **Zoom Extents Recenter Button:** Added a sleek, glassy "Zoom Extents" button in the bottom-right corner of the canvas with a 600ms cubic-out camera transition that re-frames the active constellation to ideal bounds without reloading data or re-triggering physics animations.
- **Chapter-Aware URL Query Architecture:** Extended URL query parsing infrastructure to seamlessly support upcoming chapter modes and future patristic text additions.

### Changed
- **Closer Dynamic Zoom Framing:** Increased dynamic zoom viewport utilization from 80% to 92%, utilizing the full canvas space while preserving comfortable breathing room for word labels.
- **Stabilized Keyword Anchors (`fx`, `fy`):** Pinned keyword centers in Word Mode, Books View, and Verses View, ensuring keywords remain rock-solid focal anchors that incoming neighbors never shove or displace. Multiple keywords run an initial 40-tick relaxation to settle to their mutual semantic distance before coordinate pinning.
- **Golden-Spiral Radial Neighbor Spawning:** Replaced internal collision-box node spawning with phyllotaxis golden-spiral radial placement outside the keyword collision boundary, eliminating explosive repulsion kicks.
- **Viscous Damping & Gentle Reheating:** Reduced wave reheating energy from `alpha(0.3)` to `alpha(0.09)` and increased simulation fluid drag (`velocityDecay(0.45)`), creating smooth, fluid motion as words glide into their semantic orbits.
- **Smooth Spawn Fade:** Newly spawned nodes, labels, and connecting links smoothly bloom into view over 250ms rather than popping in abruptly.
- **Simplified Loading Exit Transition:** Streamlined loading exit animation to direct, clean particle convergence toward keyword centers, dropping connecting lines immediately on exit and eliminating `backdrop-filter` GPU shader overhead.
- **Asset Cache Busting (`v=9.2.2`):** Bumped cache-buster query parameter to `?v=9.2.2` across stylesheet links, custom element scripts, and runtime data fetch requests.

## [9.2.1] - 2026-09-17
### Added
- **Complete English Translations for Septuagint (LXX) Verses:** Fully integrated Brenton Septuagint English translations for all Old Testament verses and Berean Standard Bible English translations for all New Testament verses across all 36,802 Septuagint verses, paired directly with original Septuagint Greek text.
- **English with Expandable Greek in LXX Study Panel:** All verse cards in the Study Panel Verses tab for the Septuagint now show English translations by default, with original Greek text expandable inline underneath (matching the Clementine Vulgate behavior).
- **Dual English Translation & Original Language Box in Verses View:** Verses View now displays the English translation at the top with a dedicated toggleable original language box underneath (Septuagint / Greek NT or Clementine Latin Vulgate), active by default.
- **Responsive Map Text Size Pill Toggle:** Added a 3-way segmented pill toggle (`Small`, `Medium`, `Large`) in the Options drawer allowing users to scale text labels and percentage bubbles on the map, with responsive defaults (`Medium` on desktop, `Small` on mobile).
- **Optimal Dimensionality & Linguistic Topology Studies:** Published comprehensive empirical research reports in `docs/` detailing the mathematical validation of 100D semantic vector spaces (`06-optimal-dimensionality-study.md`), 2nd-person pronoun topological clustering (`01-pronoun-topology-faith.md`), and hapax legomena distribution across canons (`02-hapax-legomena-analysis.md`).

### Fixed
- **Multi-Keyword Link Similarity Calculation:** Fixed a bug where neighbor nodes connected to multiple keywords copied identical maximum similarity percentages across all connecting lines. Lines now compute and display distinct, accurate pairwise cosine similarity to each connected keyword, perfectly matching the Study Panel badges.
- **Removed Irrelevant Similarity Percentages on Constituent Word Links in Verses Mode:** Excluded `verse-word` links in Verses View Word Mode from displaying similarity percentages, as constituent word connections represent lexical membership rather than vector similarity.
- **Eliminated `NaN%` Percentage Labels:** Hardened `cosineSimilarity` to validate array inputs and dimension matching, and safeguarded canvas link label rendering to prevent `NaN` or non-numeric values from ever rendering on the canvas.
- **Mobile Drawer Viewport Constraint:** Constrained the maximum height of all mobile bottom sheets (`min(72vh, calc(100% - var(--bwm-top-bar-height, 52px) - 14px))`) to ensure mobile drawers and cards never overflow upward into the top search bar.
- **Asset Cache Busting (`v=9.2.1`):** Bumped cache-buster query parameter to `?v=9.2.1` across all HTML links and runtime data fetch requests, ensuring browsers immediately invalidate stale cached data indices.

## [9.2.0] - 2026-09-16
### Added
- **Multi-Word Phrase Centroid Search:** Entering 2 or more words in the search bar dynamically computes the vector centroid across 100D semantic embeddings and suggests the closest 5 biblical verses in real time with cosine similarity percentages and full citations.
- **Universal English Centroid Projection:** Centroid calculation automatically projects against the Berean Standard Bible (BSB) semantic map regardless of whether the user is viewing BSB, LXX, or VUL, labeling suggestions with `(BSB)` and automatically switching to the English canon upon selection.
- **Search Bar Loading Spinner:** Added a responsive CSS loading spinner inside the search input wrapper providing visual feedback during asynchronous centroid computation.
- **Expandable Verse Snippets in Study Panels:** Added an interactive dropdown chevron button (`▼`/`▲`) on verse cards across Words and Verses study panels, allowing users to expand and read complete verse passages inline and collapse back without losing map position.
- **Unified Segmented Pill Toggles Across Verses & Books:** Extended the standardized segmented pill toggle design (`[ − | + ]`) to verse cards, cross-reference rows, Book Inspector headers, and sibling book chips.
- **Canon-Preserving Title Reset:** Clicking "Semantic Bible" in the header smoothly returns to the word view landscape with all keywords cleared, while preserving the user's active canon selection (BSB, LXX, or VUL).

### Changed
- **Relocated View Mode into Options Panel:** Moved the "Words, Verses, Books" view mode toggle from the top header into the Options panel, positioned under Active Words and above Semantic Foundation as a unified segmented pill toggle.
- **Streamlined Minimal Header:** Cleaned up the main page header to display a centered title and version tag without clutter or mobile viewport overflow.
- **Segmented Testament Filter (4 Options):** Converted the Testament Filter in the Options panel to a 4-option segmented pill toggle (`All`, `Old`, `New`, `Both`).
- **Compact Verse Connections Toggle:** Converted the Verse Connections Mode in the Options panel to a compact segmented pill toggle (`🔗 References`, `✦ Words`).
- **Search Suggestion Focus Management:** Automatically closes the search recovery/suggestions dropdown when the Options panel hamburger button is clicked.

## [9.1.0] - 2026-09-15
### Added
- **Fullscreen Particle Loading Animation:** Expanded the initial loading animation to fill the entire map container with a responsive dynamic constellation of floating semantic particles and connective pulses.
- **Top 10 Nearest Neighbors Study Tab:** Added a dedicated "Neighbors" tab to the study panel calculating real-time cosine similarity across 100D semantic vector embeddings with proportional color-coded progress bars, similarity percentages, and original language definition snippets.
- **Radial Menu Neighbors Shortcut:** Added a "Neighbors" option to the radial context menu across Words, Verses, and Books modes for 1-click access to nearest semantic neighbors.
- **Unified Segmented Pill Toggles (`[ − | + ]`):** Introduced a standardized fixed-width (48px) segmented pill toggle for adding and removing keywords and books across the study panel header, Neighbors tab rows, Book Inspector header, and sibling book chips.
- **Universal Toggle State Synchronization:** Automatically synchronizes keyword and book active states across all panels, rows, headers, search pills, and radial menus simultaneously.

### Changed
- **Streamlined Tab Labels:** Shortened study panel tab titles to single-word labels ("Verses", "Language", "Usage", "Neighbors") to ensure clean responsive layout across desktop side panels and mobile bottom sheets without truncation or horizontal scroll.
- **Row Stability & Layout:** Fixed action button width in neighbor rows and inspector headers, completely preventing row shifting or two-line button wrapping when toggling items on or off.

## [9.0.0] - 2026-09-14
### Added
- **Latin Clementine Vulgate Foundation:** Added full support for the Latin Vulgate (73 books, 35,807 verses) with Douay-Rheims English text, 100D word embeddings, 2D word map, verse centroids, and book centroids.
- **On-the-Fly Similarity Labels:** Added similarity percentage labels along connecting lines with a 3-option control (Off, On Hover, Show All).
- **Study Panel Similarity Badges:** Added cosine similarity percentage indicators in the study panel relative to active keywords.
- **Desktop Radial Context Menu:** Added right-click radial context menu on desktop for quick word, verse, and book actions.
- **Integrated Map Guide & Legend:** Added "Show Map Guide & Legend" option in Options drawer opening a full map overlay with back and close buttons.

### Changed
- **Segmented Capsule Controls:** Restyled Semantic Foundation and Similarity Labels options with clean segmented pill groups.
- **Mobile Bottom-Sheet Drawer:** Unified Options drawer on mobile (<= 768px) to use the swipe-down bottom-sheet design with handle and touch-drag dismissal.
- **Mutual Exclusivity on Mobile:** Enforced strict single-panel visibility on mobile (opening Options closes study panels and vice versa).

### Fixed
- **Cross-Canon POS Alignment:** Standardized Proper Noun classification across BSB, LXX, and VUL, preventing common theological nouns from misclassifying as PROPN.
- **Vulgate Lexical Disambiguation:** Corrected Latin gloss for `nazarenus` to "Nazarene" (was "Christ"), resolved Jesse (`iesse`) and Jeshua (`iesua`) prefix collisions, and ensured single-bubble search for Jesus.
- **BSB Pipeline Artifact Integrity:** Purged stale zero-occurrence tokens and added verse presence safeguards across all builds.
- **GitHub Pages Deployment:** Added Vulgate semantic map and index files (`*_vul.json`) to the GitHub Actions Pages deployment artifact packaging step.

## [8.0.0] - 2026-09-11
### Added
- **Greek Septuagint (LXX) & New Testament Semantic Foundation:**
  - Introduced complete dual-foundation support enabling exploration of Scripture in either Berean Standard Bible (BSB) English or original biblical Greek (Alfred Rahlfs 1935 Septuagint for the Old Testament and SBL Greek New Testament).
  - Trained 100-dimensional Skip-gram embeddings across 30,907 biblical verses in original Greek, paired with concise English glosses and morphological classifications from the STEPBible TBESG lexicon.
  - Generated full 2D semantic projections (`wordmap_2d_lxx.json`), verse centroids with unbiased cosine cross-references (`versemap_2d_lxx.json`), and book centroids (`bookmap_2d_lxx.json`).
  - Aligned Septuagint verses with Sir Lancelot Brenton's 1851 English translation for bilingual verse reading and lexical inspection.
- **Canon URL Synchronization:**
  - Added URL parameter synchronization (`canon=bsb` and `canon=lxx`), enabling direct deep-linking and bookmark sharing into either translation foundation across Words, Verses, and Books views.
- **GitHub Pages Deployment Workflow for Dual Canons:**
  - Updated the automated GitHub Pages deployment workflow to package both BSB and LXX datasets into distribution artifacts.

### Changed
- **Default Translation Foundation:**
  - Preserved Berean Standard Bible (BSB) English as the default foundation while enabling seamless 1-click toggling to the Septuagint (LXX) via the Options drawer.
- **Natural Phrase Spacing for Multi-Word Glosses:**
  - Preserved natural whitespace and hyphens for multi-word lexical definitions (e.g., "settle accounts", "burnt offering", "high priest", "tax collector"), replacing concatenated strings.
- **Title-Cased Proper Nouns:**
  - Enhanced name formatting to capitalize each constituent word of multi-word Proper Nouns.

### Fixed
- **Lexicon Entry Overwrites for Key Biblical Figures:**
  - Corrected the TBESG lexicon ingestion loop to ignore unnamed contextual sub-entries (such as `[mother-in-law of Peter]` or `[father of Lazarus]`), ensuring primary definitions for Peter, Lazarus, Barnabas, Zebedee, Herodias, and Caiaphas remain authentic and pristine.
- **Grammatical Stopword Filtering in Book & Verse Clusters:**
  - Reclassified Greek particles (`lxx.X` in CATSS and `PARTICLE`/`INTPRTCL` in NT parsing) to `PART` and excluded grammatical particles (e.g., "if", "not", "no", "then", "as") from book and verse top/closest content clusters.
- **Specific Term Alignment:**
  - Mapped verbose definition phrases such as "one who baptizes" directly to "baptist" for clear, idiomatic biblical terminology.

## [7.1.5] - 2026-09-05
### Added
- **Title Click Landscape Reset:** Clicking the title words "Semantic Bible" in the header resets the current view back to its full landscape overview, clearing any active searches, keywords, or open inspector cards without changing the active view mode (Words, Verses, or Books).

## [7.1.4] - 2026-09-05
### Fixed
- **Duplicate Identifier in Script:** Resolved a JavaScript syntax error caused by a duplicate declaration of `mapEl` in `index.html`. This fixes an issue where the error prevented script execution, restoring proper functionality to the Info button and the view mode selector.

## [7.1.3] - 2026-09-05
### Changed
- **Renamed Page to Semantic Bible:** Streamlined the page title and header branding from "Semantic Bible Map" to "Semantic Bible".
- **Single-Line Header Layout:** Consolidated the title, version badge, mode selector ("Words, Verses, Books"), and info button onto a single compact line to maximize vertical canvas real estate for the map across all viewports.

## [7.1.2] - 2026-09-05
### Fixed
- **Mobile Info Window Bottom Sheet & Swipe-to-Dismiss:** Redesigned the Map Guide and Legend info panel on mobile viewports into a responsive, scrollable bottom sheet matching the styling of other inspector windows. Equipped the sheet with an accessible drag handle, top-right close button, and intuitive swipe-down-to-dismiss touch gestures.

## [7.1.1] - 2026-09-05
### Changed
- **Shortened Page Title:** Simplified the application page title and header branding from "Semantic Bible Word Map" to "Semantic Bible Map" to reflect its comprehensive coverage across words, verses, and books.

## [7.1.0] - 2026-09-05
### Added
- **Expanded Top-32 Cross-Reference Dataset:** Regenerated `versemap_2d.json` using the centroid generation pipeline to calculate and store up to 32 high-confidence semantic cross-references per verse across all 30,969 verses of Scripture.
- **Extended Verse Connections Slider (up to 32):** Increased the maximum selectable cross-reference limit in the Options drawer slider from 16 to 32, with the default connection count increased from 8 to 16.
- **Enhanced Verse Inspector Cards:** Expanded the Verse Info panel to display up to 16 top semantic cross-references with cosine similarity percentages and preview snippets.

## [7.0.0] - 2026-09-04
### Changed
- **Options Drawer Verse Mode Toggle:** Relocated the Cross-References (`🔗`) and Words (`✦`) submode selector into the left Options drawer under "Verse Connections Mode". This removes canvas clutter, prevents floating controls from being covered by the Options panel on desktop, and completely eliminates layout conflicts with the top-right Verse Info button on mobile.
- **Top Navigation Pill Ordering:** Reordered the view mode pills in the top navigation bar to "Words, Verses, Books" (was "Words, Books, Verses") for a natural progression from individual vocabulary words to canonical verse centroids and overarching book themes.

### Fixed
- **GitHub Pages Static Asset Packaging:** Updated the GitHub Actions deployment workflow to strip the copied symlink in `_site/data` before creating the `_site/data/output/` directory, ensuring `wordmap_2d.json`, `verse_index.json`, `bookmap_2d.json`, and `versemap_2d.json` are packaged directly into the distribution artifact and served properly.

## [6.9.1] - 2026-09-04
### Added
- **Dynamic Connections Slider in Verses Mode:** The Options drawer slider now dynamically controls verse connectivity. In verse-verse (`refs`) mode, it scales cross-reference connections per verse from 1 to 16 (default 8). In verse-word (`words`) mode, it scales constituent content words from 1 to 12 (default 6).
- **Live Debounced Slider Feedback:** Moving the slider in verse mode updates the active constellation in real time without lag.
- **Top-16 Cross-Reference Dataset:** Expanded the verse centroid generation pipeline to calculate and store up to 16 semantic cross-references and up to 12 constituent content words per verse.
- **Selected Verse Add / Remove Action:** Added an interactive `[ + Add to Map ]` / `[ − Remove from Map ]` toggle in both the header and footer actions of the Verse Info panel, allowing users to directly add or remove any inspected cross-linked verse from the active constellation.

### Fixed
- **Cross-Reference Verse Node Click TypeError:** Fixed an issue where clicking a cross-reference verse node passed a canvas node with a label string `node.w` instead of the raw dataset record to `showVerseCard`, causing `(intermediate value).map is not a function`. Now automatically resolves pristine records from the dataset lookup and guards array properties.
- **Verse Info Button Layout Collision:** Repositioned the canvas submode toggle (`[ 🔗 Cross-References | ✦ Words ]`) to the top-left corner, completely resolving overlap with the top-right `[ 📖 Verse Info ]` reopen button on both desktop and mobile screens.
- **Title Bar Mode Pill Blue Color:** Harmonized the active blue styling of the `Words | Books | Verses` header toggle to `#2563eb`, matching the Options drawer and right inspector drawer.

## [6.9.0] - 2026-09-04
### Added
- **Biblical Verses Mode:** Introduced a third exploratory mode alongside Words and Books, mapping all 30,969 biblical verses into continuous semantic space via high-dimensional verse centroids.
- **Unbiased Vector Cross-References:** Generated purely mathematical biblical cross-references computed from 100-dimensional cosine similarities, surfacing organic lexical and theological links across the canon free from human editorial bias.
- **Dual-View Canvas Architecture:** Added interactive mode switching on the canvas between:
  - **Cross-References Network:** Visualizes target verses linked to their top cosine cross-reference sister verses across Scripture.
  - **Word Constellation:** Unpacks any verse into its constituent content words (`NOUN`, `VERB`, `PROPN`, `ADJ`), allowing immediate exploration of the underlying vocabulary.
- **Lightweight Native Verse Query Parser:** Implemented a zero-dependency parser in JavaScript supporting standard citations (`John 1:1`), shorthand aliases (`Jn 1:1`, `Jhn 1 1`, `1 jn 3 16`), verse ranges (`Gen 1:1-3`), chapter defaults (`John 1`), and multi-verse comparisons (`Genesis 1:1, John 1:1`).
- **Verse Inspector Card & Bottom Sheet:** Added a dedicated verse details window displaying full verse texts, top 10 semantic cross-references with similarity percentages and preview snippets, constituent vocabulary chips, quick focus actions, and additive comparison toggles.
- **Landmark Overview Map:** Configured 36 landmark biblical verses spanning all canonical genres to provide an instant interactive overview when entering Verses mode without an active search.
- **Architecture Documentation:** Authored comprehensive technical documentation under `docs/02-unbiased-verse-cross-references.md` and `docs/03-book-centroids-and-thematic-embeddings.md` detailing IVF weighting, centroid vector mathematics, TF-IDF scoring, and projection dynamics.
- **GitHub Pages Deployment Support:** Updated the automated deployment workflow to bundle and deploy `versemap_2d.json` alongside existing datasets.

## [6.8.0] - 2026-09-04
### Added
- **Canon Usage Density Metrics:** Added a density analysis option to the Canon Usage inspector tab, calculating word occurrences relative to book length (occurrences per 1,000 words).
- **Metric Toggle (Count vs Density):** Provided a dedicated `Metric: [Count] [Density]` control group in the By Book view, dynamically switching between raw occurrence frequencies and proportional text density.
- **Proportional Density Bar Scaling:** Bar charts scale dynamically to the highest-density book when Density mode is active, highlighting books like Jude or Titus where short text length produces high topical concentration despite low raw counts.
- **Dual Sorting Support:** Enabled Canonical and Highest (Ranked) sorting for both Count and Density metrics, letting users quickly identify the most concentrated books for any term.
- **Genre and Testament Density Analytics:** Extended density calculations to the By Literature panel (showing occurrences per 1,000 words across all 9 genres) and the OT vs NT panel (displaying volume-relative testament density comparisons).
- **Exact Book Word Count Database:** Embedded exact translation word counts directly into the 66-book canon registry, ensuring immediate density calculations without additional network requests.

## [6.7.0] - 2026-09-04
### Added
- **Desktop Right Drawer Inspector:** On desktop screens, clicking any word node directly slides out a consolidated right inspector drawer, replacing floating popups with an integrated tabbed interface featuring Verses, Original Language, and Canon Usage, along with quick keyword toggle and word explore actions.
- **Canon Usage Analysis Suite:** Integrated comprehensive usage metrics across all 66 Biblical books with three specialized views:
  - **By Book:** Horizontal occurrence bars per book, color-coded by literary genre, with filters for occurring versus all 66 books and canonical or frequency sorting.
  - **By Literature:** Aggregated statistics across the 9 Biblical literary genres (Law, History, Wisdom & Poetry, Major Prophets, Minor Prophets, Gospels, Pauline Epistles, General Epistles, Apocalypse) with book coverage and percentages.
  - **OT vs NT:** Dynamic SVG Donut chart displaying total verse occurrences and testament proportions, accompanied by detailed comparative breakdown cards.
- **Mobile Touch Radial Menu & Swipe-to-Dismiss Bottom Sheets:** Retained the touch-optimized radial menu on mobile viewports while displaying info cards as responsive bottom sheets with drag handles, velocity-sensitive downward swipe-to-dismiss gestures, and smooth slide transitions.
- **Crisp Map Clarity:** Removed background dimming and map blur completely across both mobile and desktop modes, ensuring the semantic map remains sharp, interactive, and pannable while inspecting terms.
- **Unified Visual Design System:** Harmonized styling across Book Info, Verses, Original Language, and Canon Usage panels into a shared design foundation with consistent headers, badges, tabs, and action pills.

### Fixed
- **Mobile Viewport Overflow:** Prevented info windows from overflowing mobile viewports, ensuring headers, drag handles, and close buttons remain fully accessible.

## [6.6.0] - 2026-09-04
### Added
- **Mobile Book Bottom Sheet:** Transformed the book info window into a responsive bottom sheet popup on mobile (capped at 56vh) with slide animations and drag handle, preserving map visibility.
- **Card Actions & Balanced Reopen Button:** Added "Explore Map" and "< Show All Books" actions to the book card, along with a floating `[ ℹ Book Info ]` button inside the map container with balanced padding for 1-click reopening.
- **Radial Menu Book Info Option:** Tapping any active book node on canvas offers a "Book Info & Themes" option (`ℹ`) in the radial menu to reopen book details.

### Fixed
- **Preserved Word Constellations on Dismiss:** Closing the book card or tapping canvas background now dismisses only the window (`hideBookCard`) without resetting the active book constellation.
- **View Switching Async Race Condition:** Resolved an issue where switching to Books while the words dataset was downloading left the loading overlay stuck and subsequently overwrote the Books map. Verified active `viewMode` in `loadData()` and guaranteed `hideLoading()` calls in `setViewMode()`.

## [6.5.2] - 2026-09-03
### Added
- **Books View Loading Screen & Book Tips:** Added a dedicated loading screen for the Books view with genre-colored floating particle physics and rotating book tips when fetching `bookmap_2d.json`.
- **Parallel Data Fetching:** Optimized dataset loading to fetch words, verses, and books data in parallel, allowing the Books view to render in milliseconds without waiting for the 34MB wordmap.
- **GitHub Pages Deployment Workflow:** Added `bookmap_2d.json` to the GitHub Actions workflow so it is automatically bundled and deployed to GitHub Pages.

## [6.5.1] - 2026-09-03
### Fixed
- **Drawer and URL Reset on Full Book View:** Fixed full canvas reset in Books mode so closing the inspector card, clicking the canvas background, or clearing searches properly empties the active drawer selection and updates the URL cleanly to `?view=books`.

## [6.5.0] - 2026-09-03
### Added
- **Biblical Books Mode & Multi-Book Search:** Added a Words / Books mode toggle in the header. Searching multiple books (e.g. `James Proverbs`, `1 John 2 Peter`) renders multi-book semantic constellations with inter-book theological links.
- **Distinctive Book Vocabulary Bubbles:** Characteristic words surrounding each book are now generated directly from each book's distinctive TF-IDF content vocabulary, matching the themes shown in the inspector card.
- **Book-Filtered Verses Panel:** In Books mode, opening the Verses panel on any word now groups and displays verses from the active book(s) by default (e.g. Jude verses open first), alongside an All Bible Verses tab.
- **Direct vs Indirect Book Links:** Words with direct occurrences in a book are rendered with solid direct links, while purely semantic context words use dashed indirect links.
- **Book Inspector Tabs & Sibling Add:** Multi-book constellations feature book tabs in the inspector card, and sibling chips include one-click `[+]` buttons to add theological neighbors to the active map.
- **Drawer Relationships per Book Slider:** Recomputed book constellations in real time based on the drawer's relationships slider.

## [6.4.0] - 2026-09-02
### Added
- **Testament Filter:** Added Old Testament, New Testament, and Both Only filter controls in the Options drawer to highlight vocabulary by biblical division while dimming out-of-filter nodes and links.
- **Infinite Scroll Verses Window:** Upgraded the verses popup with progressive infinite scrolling and tab count badges, removing the previous 10-verse cap so users can scroll through all verses for any word or keyword link.

### Fixed
- Fixed testament property propagation across search and graph construction so testament filtering works properly with active keywords.

## [6.3.0] - 2026-09-02
### Added
- **Left-Side Options Drawer:** Moved the options drawer to the left side directly underneath the hamburger toggle button. The toggle button stays visible and clickable to easily open and close the drawer, alongside click-outside dismissal.
- **Part of Speech Subtitles on Canvas:** Added dynamic `(pos)` subtitle tags (e.g. `(propn)`, `(verb)`, `(noun)`) underneath word bubbles on the canvas whenever multiple keywords share the same base name.
- **Connection Line Legend:** Added direct link (green line) and indirect semantic link (grey line) indicators to the information modal with adaptive light and dark mode colors.

## [6.2.0] - 2026-08-31
### Added
- **Configurable Relationship Density:** Added a slider control in the Options drawer to adjust the number of semantic relationships displayed per keyword (range: 10 to 250, default: 100). Changes update the active graph dynamically in real time.
- **Search Clear Button:** Added an `(x)` clear button inside the search input box that appears whenever text or active keywords are present.
- **Clear All Keywords Action:** Added a "Clear All" button to the active words section in the Options drawer to instantly clear keywords and return to the full map view.

## [6.1.0] - 2026-08-26
### Added
- **Original Language & Strong's Panel:** Integrated the Berean Standard Bible Interlinear mapping with the OpenScriptures Strong's Greek and Hebrew Lexicon. Clicking the new original language button (`α/א`) on the radial menu opens a tabbed panel displaying the original lemmas, transliterations, translation counts, and full Strong's definitions.
- **Particle Loading Animation:** Added an animated network of Part of Speech colored particles that float, connect, gravitate, and burst while the dataset loads, accompanied by helpful rotating tips.
- **Data Attribution:** Added open data attribution for the Berean Standard Bible and OpenScriptures Strong's Dictionary.

### Fixed
- Fixed Greek and Hebrew character encoding by pulling lemmas and transliterations directly from clean UTF-8 lexicon sources.
- Fixed tab switching in the lexicon panel by adding missing CSS rules for pane visibility.
- Fixed window positioning on mobile devices so panels stay clamped within the viewport rather than overflowing off-screen.
- Darkened search bar, search button, and panel badges in default dark mode while preserving light mode styling.

## [6.0.0] - 2026-08-23
### Added
- **Radial Menu Interaction:** Replaced the hover-based tooltip with a native click-activated radial menu. The radial menu provides explicit, distributed buttons to add/remove a keyword or open the verses panel, preventing accidental UI triggers while navigating the map.
- **Tabbed Verses Panel:** Completely redesigned the verses window into a tabbed interface. When clicking a word, the panel now elegantly separates the verses into tabs for every keyword it connects with, sorted intelligently by semantic similarity. The scrollable content ensures the fixed header and tabs are always accessible.
- **Dynamic Node Hover Design:** Nodes no longer uniformly turn blue on hover, which previously conflicted with the 'Noun' legend color. Instead, hovered nodes dynamically scale up 1.4x and cast a glowing shadow in their *native* Part of Speech color.

### Fixed
- Fixed USFM parsing flaw in the pipeline where section headers, book titles, and parallel references were inadvertently leaking into the verse strings. The verse text is now perfectly clean.
- Fixed a rendering bug where adding a word via the new radial menu did not correctly append it to the URL parameters.
- Fixed a graph linking bug where new words added to the map were not properly drawing all their direct relationship lines (green edges) to preexisting keywords.
## [5.0.0] - 2026-08-14
### Added
- Integrated a spaCy NLP pipeline to significantly improve data processing. The pipeline now lemmatizes source text and extracts native Part of Speech (POS) tagging (e.g. mapping "won't" to "will" and "not" without generating invalid string artifacts).
- Display capitalized proper nouns properly on the canvas map, in the drawer, in the search bar, and on the hover tooltips.

### Changed
- Complete overhaul of `generate_verse_index.py` to ingest the spaCy generated JSON data in order to preserve native POS mapping across the verse references, fixing missing graph edge generation.
- Re-added manual exclusion filters after lemmatization to aggressively scrub Berean Standard Bible typographic edge cases (like `s`, `nt`, `ii`) caused by right-single quotation marks.
- Redesigned the tooltip and side drawer UI to feature a sleek, dynamic, translucent glass-morphism aesthetic (`backdrop-filter: blur()`), abandoning the old hardcoded dark theme.
- The default canvas word map now retains the generated POS properties, allowing it to paint itself in full color on launch instead of waiting for a search interaction.

### Fixed
- Fixed bug where deselecting part-of-speech toggles during a physics simulation would crash the graph and orphan nodes.
- Fixed layout shifting where the hidden options drawer was generating a horizontal scrollbar that shifted the UI on load, obscuring the search bar.

## [4.1.6] - 2026-08-14
### Fixed
- Fixed bug where closing the long-press tooltip would occasionally block the very next touch tap from adding a keyword.

### Changed
- Updated wording in the info panel to emphasize "semantic relationships" rather than "mathematical lens" for approachability.

## [4.1.5] - 2026-08-14
### Fixed
- Fixed bug where a short tap on a word would leave the word highlighted in blue instead of transitioning to the active red color because the internal hover state remained artificially stuck on the tap coordinates until the user touched elsewhere.

## [4.1.4] - 2026-08-14
### Fixed
- Fixed bug where two-finger pinch-to-zoom gestures could accidentally trigger the long-press tooltip on mobile devices.

## [4.1.3] - 2026-08-14
### Fixed
- Fixed critical race condition where D3 zoom was swallowing `touchend` events, causing the long-press tooltip to open 500ms after a short tap. Touch events now properly intercept during the browser's capture phase before D3 zoom logic runs.
- Fixed an issue where the second tap on empty space would erroneously re-add the previous keyword due to a stale hover state.

## [4.1.2] - 2026-08-14
### Fixed
- Fixed bug on mobile devices where a short tap was incorrectly triggering the hover tooltip due to the browser synthesizing rogue `mousemove` events milliseconds after the `touchend` event.
- Improved tap reliability by allowing slight fat-finger movements during a tap to no longer cancel the touch interaction.

## [4.1.1] - 2026-08-14
### Fixed
- Fixed tooltip overflowing the top of the screen on mobile devices making the close button inaccessible.
- Redesigned touch handling so a short tap adds a word to the active map, and a long press opens the verse tooltip without conflicting with the map interaction.

## [4.1.0] - 2026-08-13
### Added
- **True Physics Iterative Engine:** Rebuilt the visualization engine to compute graph topology dynamically. Node placement is now dictated directly by genuine 100D cosine similarities between words, creating a highly realistic mapping of semantic space.
- **Dynamic Organic Spawning:** Word clusters are now iterated and injected smoothly over time, allowing users to watch the semantic galaxy build itself as related words lock into their gravitational orbits.
- **Dynamic Camera Tracking:** The view automatically zooms and pans to keep growing clusters perfectly centered and scaled within the window.
- **Additive Interactive Search:** Clicking nodes in the active canvas now preserves the physics simulation and additively pulls in new sets of neighbors and links without resetting the state, allowing infinite map "walking".

## [4.0.26] - 2026-08-13
### Fixed
- Fixed text rendering issues at extreme zoom scales by temporarily reverting the canvas context transform to draw standard-sized fonts at screen coordinates.

## [4.0.24] - 2026-08-13
### Added
- Auto-show labels when zoomed deep into the global map (when < 150 words are visible on screen).

### Fixed
- Removed artificial zoom limit to allow zooming deep into the default global map.

## [4.0.22] - 2026-08-13
### Added
- "Freely you have received; freely give." quote to the footer.
- Explicit close `(x)` button to the word tooltip for better touch interactions on mobile.

### Changed
- Replaced scrolling webpage layout with a true fullscreen web-app layout (`100dvh`), perfectly locking elements in place on all screen sizes.
- Redesigned the search input and button with curved borders, subtle shadows, and contrasting backgrounds for a premium feel.
- Moved the info panel to the top bar alongside the search tools.
- Refined tooltip behavior on mobile: tapping outside an open tooltip now reliably closes it without accidentally selecting a new word.

### Fixed
- Addressed typos in the Berean Standard Bible source (`vvv`) at Acts 4:36, Luke 9:33, and Genesis 35:18, completely recalculating the embeddings model to purge the typo.
- Added a transparent dummy favicon to prevent `404` errors in local server logs.


## [2.0.0] - 2026-08-12
### Added
- Dynamic 2D UMAP projection at search time for single and multi-word semantic searches.
- True 100-dimensional cosine similarity calculations in the browser to accurately find semantic neighbors.
- Versioning system implemented.

### Removed
- 3D View and WebGL scatter plot functionality, as dynamic 2D mapping provides superior localized semantic insights.
- Pre-computed 3D JSON outputs from the data pipeline.

## [1.0.0]
### Added
- Initial release of Semantic Bible Word Map.
- Global 2D and 3D UMAP projections of Word2Vec embeddings.
- Old Testament and New Testament filters.
