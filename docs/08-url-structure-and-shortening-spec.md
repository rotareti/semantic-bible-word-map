# URL Structure and Shortening Specification

This specification documents the URL state architecture, parameter encoding scheme, compression evaluation, backward-compatibility guidelines, and future expansion roadmap (Chapter Mode and Patristic corpora) for the Semantic Bible Word Map.

---

## 1. Motivation and Problem Statement

The Semantic Bible Word Map relies on dynamic URL synchronization via `window.history.replaceState` to allow users to bookmark, share, and cite specific semantic landscapes. As the application expanded from single-word searches to multi-keyword comparisons, verse cross-references, book centroids, multi-canon foundations (Berean Standard Bible, Septuagint, Latin Vulgate), and customizable visual options, the generated URLs have become unnecessarily verbose.

### Current URL Structure (v9.2.1)
Currently, state is serialized with full-length descriptive query keys and unpruned defaults:
- **Default State (BSB Words):**  
  `https://rotareti.github.io/semantic-bible-word-map/?canon=bsb` (64 characters)
- **Single Keyword (LXX Faith):**  
  `https://rotareti.github.io/semantic-bible-word-map/?canon=lxx&keywords=faith_NOUN` (83 characters)
- **Verse Mode (Genesis 1:1 in LXX):**  
  `https://rotareti.github.io/semantic-bible-word-map/?canon=lxx&view=verses&verses=GEN.1.1` (87 characters)
- **Book Comparison (Genesis and Exodus in Vulgate):**  
  `https://rotareti.github.io/semantic-bible-word-map/?canon=vul&view=books&books=GEN,EXO` (86 characters)

### Problems with Verbose URLs
1. **Visual Clutter in Sharing:** Long URLs look cumbersome when pasted into chat applications, emails, forum posts, or academic citations.
2. **Redundant Default Parameters:** The application redundantly writes `canon=bsb` even though Berean Standard Bible is the default foundation.
3. **Repetitive Key Names:** Keys like `keywords=`, `verses=`, `books=`, and `foundation=` consume 6 to 9 characters each before values even begin.

---

## 2. Evaluation of Approaches: Compression vs. Compact Encoding

When designing URL shortening for client-side web applications, two primary conventions exist in industry practice:

### Approach A: State Compression into Hash / Opaque Token (The Mermaid / PlantUML Pattern)
- **How It Works:** The entire state object is JSON-serialized, deflated using zlib/pako or `CompressionStream('deflate-raw')`, and base64url-encoded into the URL hash:  
  `https://rotareti.github.io/semantic-bible-word-map/#s=eJxLTE5NTczLTy0GAGP2BIk`
- **When It Is Appropriate:** Applications with massive, arbitrary multiline code or custom diagrams (e.g., Mermaid Live Editor, PlantUML, JSFiddle, CodePen) where uncompressed text would span thousands of characters.
- **Why It Is Inadvisable as Primary Strategy for the Bible Word Map:**
  1. **The Compression Length Paradox for Small Payloads:** Compression algorithms require header bytes, frequency tables, and base64 padding (33% inflation). For small inputs (1 to 3 words or a verse reference), a compressed string is often *longer* than uncompressed text. For example, `?w=faith` is 8 characters, whereas compressed base64 is ~35 to 45 characters.
  2. **Total Loss of Transparency:** A user, scholar, or pastor looking at `?w=faith` immediately knows what the link opens. A compressed hash like `#s=eJzT0...` is completely opaque.
  3. **Social & Search Preview Degradation:** Unfurl crawlers (Slack, Discord, iMessage, Twitter/X cards) and search indexers cannot parse keywords or citations from an opaque hash string.
  4. **Fragility and Inability to Hand-Edit:** Users often manually tweak parameters in the address bar (e.g., changing `GEN.1.1` to `GEN.1.2` or switching `c=bsb` to `c=lxx`). Compressed hashes make hand-editing impossible.

### Approach B: Compact Semantic Query Parameters (The Google Maps / YouTube Pattern)
- **How It Works:** Single-letter or two-letter parameter keys with concise delimiters and omission of default values:
  - Google Maps: `?q=...&ll=37.77,-122.41&z=15`
  - YouTube: `?v=dQw4w9WgXcQ&t=42s`
  - OpenStreetMap: `#map=15/51.50/-0.12`
- **Why This Fits the Bible Word Map Best:**
  1. **Maximum Compactness for 95% of Use Cases:** Cuts query string length by **50% to 75%** immediately without external dependencies or base64 overhead.
  2. **Fully Readable and Citation-Friendly:** Clear, clean links that can be published in articles, slide decks, or printed texts.
  3. **Instant Hand-Editing:** Users can alter words or verse numbers directly in the browser URL bar.
  4. **Zero Computational Overhead:** Native `URLSearchParams` parsing without decompression latency or error-prone binary decoding.

### Approach C: The Recommended Hybrid Architecture
Adopt **Approach B (Compact Semantic Query Parameters)** as the standard, canonical URL representation in the browser address bar. If future enhancements ever allow exporting massive custom multi-node workspaces or high-density semantic subgraph selections (> 250 characters), provide an optional compressed share link format (`#z=...`) while retaining compact parameters as the primary interface.

---

## 3. Four-Tier Text Hierarchy & Proposed Parameter Specification

The Semantic Bible Word Map is structured around a natural 4-tier biblical and literary hierarchy:
1. **Books / Works (`b`):** Macro thematic clusters and book centroids (e.g., `GEN`, `MAT`, `ROM`).
2. **Chapters (`ch`):** Meso narrative units and pericopes (e.g., `GEN.1`, `MAT.5`, `ROM.8`).
3. **Verses / Sections (`v` or `vs`):** Micro semantic cross-references (e.g., `GEN.1.1`, `JHN.1.1`).
4. **Words (`w` or `k`):** Lexical lemma embeddings and semantic neighbors (e.g., `faith`, `grace`).

### 3.1 Parameter Key Dictionary

| Category | Canonical Short Key | Legacy / Accepted Aliases (Input) | Values & Syntax | Default (Omitted if Default) |
| :--- | :--- | :--- | :--- | :--- |
| **Canon / Foundation** | `c` | `canon`, `base`, `foundation` | `bsb` (or `b`), `lxx` (or `l`), `vul` (or `v`), `af`, `pat` | `bsb` |
| **View Mode** | `m` | `view`, `mode` | `w` (`words`), `v` (`verses`), `ch` (`chapters`), `b` (`books`) | `w` (`words`) |
| **Active Words / Keywords** | `w` | `keywords`, `keyword`, `words`, `word`, `k` | Comma-separated words or IDs (`faith`, `grace_NOUN`) | None (empty) |
| **Active Verses** | `v` | `verses`, `verse`, `vs` | Comma-separated verse IDs (`GEN.1.1`, `JHN.1.1`) | None (empty) |
| **Active Chapters** | `ch` | `chapters`, `chapter`, `chap` | Comma-separated chapter IDs (`GEN.1`, `MAT.5`) | None (empty) |
| **Active Books** | `b` | `books`, `book` | Comma-separated 3-letter codes (`GEN`, `EXO`) | None (empty) |
| **Verse Connections Mode** | `vc` | `verse_mode`, `connections` | `r` (`crossref`), `w` (`words`) | `r` (`crossref`) |
| **Testament Filter** | `t` | `testament`, `filter` | `all`, `ot`, `nt`, `both` | `all` |
| **Similarity Labels** | `s` | `sim`, `similarity` | `off`, `h` (`hover`), `a` (`all`) | `h` (`hover`) |
| **Map Text Scale** | `ts` | `scale`, `font` | `s` (`small`), `m` (`medium`), `l` (`large`) | Responsive default |
| **SymBible Query** | `q` | `query` | Math/motif expression (`covenant%2Bblood`, `Jesus%3ECross%3ERaised`) | None (empty) |
| **Directional Weight** | `wd` | None | Float in [0.0, 1.0] (e.g. `wd=0.7`) | `0.50` |
| **Curvature Penalty Weight** | `wa` | None | Float in [0.0, 1.0] (e.g. `wa=0.2`) | `0.15` |
| **Christocentric Gravity Weight** | `wg` | `cg`, `gravity`, `christ` | Float in [0.0, 1.0] (e.g. `wg=0.0` for pure geometry) | `0.35` |
| **Motif Match Index** | `mi` | `motif_index` | 0-indexed integer (e.g. `mi=2`) | `0` |

> [!NOTE]
> Distinguishing Mode from Entities:
> - `m` is the parameter key for View Mode (`w`, `v`, `ch`, `b`).
> - `v` (or `vs`) is the parameter key for Active Verses (e.g., `v=GEN.1.1`).
> - `ch` is the parameter key for Active Chapters (e.g., `ch=GEN.1`).
> - `b` is the parameter key for Active Books (e.g., `b=GEN`).
> - `w` is the parameter key for Active Words (e.g., `w=faith`).
> Because the keys are distinct, there is zero ambiguity between `m=v` (Verses Mode) and `v=GEN.1.1` (Active Verse).

---

## 4. Architectural Extensibility: Patristic / Early Church Corpora

A future goal is the potential integration of universal early church father writings (the Apostolic Fathers: Clement of Rome, Ignatius of Antioch, Polycarp of Smyrna, the Didache, the Shepherd of Hermas, Epistle of Barnabas, etc.).

### 4.1 Avoiding Client and Server Bloat
The application is purely static (hosted on GitHub Pages with client-side D3 / Canvas rendering). Zero server-side processing is required.
- Current biblical foundations (`bsb`, `lxx`, `vul`) do not load concurrently; each dataset is fetched asynchronously **only when the user selects that foundation**.
- Patristic corpora (`c=af` for Apostolic Fathers or `c=pat` for Patristic texts) will follow the exact same modular architecture:
  - When viewing biblical canons, zero patristic data is transferred.
  - When switching to Patristic mode, only `wordmap_2d_af.json`, `verse_index_af.json`, and `bookmap_2d_af.json` are fetched.
  - Client memory footprint remains constant.

### 4.2 Isomorphic 4-Tier Hierarchy in Patristic Literature
Patristic texts follow the exact same structural hierarchy as biblical texts:
- **Works / Books (`b`):** `1CLE` (1 Clement), `2CLE` (2 Clement), `DID` (Didache), `IGN.EPH` (Ignatius to the Ephesians), `POL.PHP` (Polycarp to the Philippians), `HER.VIS` (Shepherd of Hermas: Visions).
- **Chapters (`ch`):** `1CLE.1`, `DID.7`, `IGN.EPH.4`.
- **Verses / Sections (`v`):** `1CLE.1.1`, `DID.7.1`, `IGN.EPH.4.1`.
- **Words (`w`):** Greek and English lexical lemmas (`agape`, `episkopos`, `martyria`).

Because the URL parameter schema (`c`, `m`, `b`, `ch`, `v`, `w`) represents this universal hierarchy, no structural changes to the URL architecture will be necessary when patristic texts are introduced.

---

## 5. Value Optimization Strategies

In addition to shortening parameter keys, significant compression is achieved by optimizing serialized values:

### 5.1 Omission of Defaults
If a parameter matches its application default, it is omitted entirely from the URL string:
- Default canon: `bsb` -> omit `c=`
- Default view mode: `words` -> omit `m=`
- Default testament filter: `all` -> omit `t=`
- Default similarity labels: `hover` -> omit `s=`

### 5.2 Multi-Value Delimiters
Multiple entities are joined with standard commas (`,`), which require no URL percent-encoding in modern browser query strings:
- Multiple words: `w=faith,hope,love`
- Multiple books: `b=GEN,EXO,LEV`
- Multiple chapters: `ch=GEN.1,MAT.5,ROM.8`
- Multiple verses: `v=GEN.1.1,JHN.1.1`

---

## 6. Before and After Comparisons

| Scenario | Current Verbose URL (v9.2.1) | Proposed Compact URL | Character Reduction |
| :--- | :--- | :--- | :--- |
| **Base App Launch** | `?canon=bsb` (10 chars) | *(empty query)* (0 chars) | **-100%** |
| **LXX Canon Root** | `?canon=lxx` (10 chars) | `?c=lxx` (6 chars) | **-40.0%** |
| **Single Word (BSB)** | `?canon=bsb&keywords=faith_NOUN` (31 chars) | `?w=faith_NOUN` (14 chars) | **-54.8%** |
| **Single Word (LXX)** | `?canon=lxx&keywords=faith_NOUN` (31 chars) | `?c=lxx&w=faith_NOUN` (20 chars) | **-35.5%** |
| **Multi-Word (BSB)** | `?canon=bsb&keywords=faith_NOUN,love_NOUN` (42 chars) | `?w=faith_NOUN,love_NOUN` (23 chars) | **-45.2%** |
| **Verse Mode (Genesis 1:1 in LXX)** | `?canon=lxx&view=verses&verses=GEN.1.1` (37 chars) | `?c=lxx&m=v&v=GEN.1.1` (20 chars) | **-45.9%** |
| **Chapter Mode (Future: Genesis 1 in BSB)** | `?view=chapters&chapters=GEN.1` (30 chars) | `?m=ch&ch=GEN.1` (14 chars) | **-53.3%** |
| **Book Mode (Genesis & Exodus in VUL)** | `?canon=vul&view=books&books=GEN,EXO` (35 chars) | `?c=vul&m=b&b=GEN,EXO` (20 chars) | **-42.9%** |
| **Patristic Work (Future: Didache in AF)** | `?canon=af&view=books&books=DID` (29 chars) | `?c=af&m=b&b=DID` (15 chars) | **-48.3%** |
| **Vector Arithmetic (BSB: covenant + blood)** | *(new feature)* | `?q=covenant%2Bblood` (20 chars) | **Canonical** |
| **Motif Trajectory (BSB: Jesus > Cross > Raised)** | *(new feature)* | `?q=Jesus%3ECross%3ERaised` (26 chars) | **Canonical** |
| **Motif Trajectory (Non-default weights & match 2)** | *(new feature)* | `?q=Jesus%3ECross%3ERaised&wg=0&mi=2` (37 chars) | **Canonical** |

---

## 7. Backward Compatibility Guarantee

All legacy URLs and bookmarks will continue to function indefinitely. The deserialization logic follows a strict fallback cascade:

```javascript
// Universal Canon Resolution
const canon = (
    params.get('c') ||
    params.get('canon') ||
    params.get('base') ||
    params.get('foundation') ||
    'bsb'
).toLowerCase();

// Universal View Mode Resolution
const modeParam = (params.get('m') || params.get('view') || params.get('mode') || '').toLowerCase();
const mode = (modeParam === 'v' || modeParam === 'verses')
    ? 'verses'
    : (modeParam === 'ch' || modeParam === 'chapters' || modeParam === 'chapter')
        ? 'chapters'
        : (modeParam === 'b' || modeParam === 'books')
            ? 'books'
            : 'words';

// Universal Entity Resolution
const words = params.get('w') || params.get('k') || params.get('keywords') || params.get('keyword') || params.get('words') || params.get('word');
const verses = params.get('v') || params.get('vs') || params.get('verses') || params.get('verse');
const chapters = params.get('ch') || params.get('chapters') || params.get('chapter') || params.get('chap');
const books = params.get('b') || params.get('books') || params.get('book');
```

When serializing state back to the address bar (`updateUrl`), only the canonical short keys are written, and default values are pruned.

---

## 8. Implementation Steps

1. **Refactor `updateUrl()` and Startup Parameter Resolution in [`web/bible-word-map.js`](file:///home/josh/code/semantic-lxx-word-map/web/bible-word-map.js):**
   - Implement the bidirectional dictionary.
   - Accept all legacy parameter names (`view`, `canon`, `keywords`, `verses`, `books`).
   - Support `chapters` / `ch` mode and active chapters.
   - Support future canon identifiers (`af`, `pat`).
   - Omit default values (`c=bsb`, `m=w`).
2. **Add "Copy Share Link" Button:**
   - Add a quick 1-click "Copy Link" action in the UI (e.g., in the Options drawer and/or header) that copies the current shortened URL to the clipboard with an interactive toast notification.
3. **Automated Verification:**
   - Verify that legacy URLs (`?canon=lxx&view=verses&verses=GEN.1.1`) continue to load with 100% accuracy.
   - Verify that compact URLs (`?c=lxx&m=v&v=GEN.1.1`, `?w=faith_NOUN`, `?c=vul&m=b&b=GEN`) load and display correctly.
   - Verify that navigating between canons, modes, and words updates the address bar cleanly.
