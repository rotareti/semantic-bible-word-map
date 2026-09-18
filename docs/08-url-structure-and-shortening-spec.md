# URL Structure and Shortening Specification

This specification documents the URL state architecture, parameter encoding scheme, compression evaluation, and backward-compatibility guidelines for the Semantic Bible Word Map.

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
3. **Repetitive Key Names:** Keys like `keywords=`, `verses=`, `books=`, and `foundation=` consume 7 to 9 characters each before values even begin.

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

## 3. Proposed Parameter Specification

### 3.1 Parameter Key Dictionary

| Category | Canonical Short Key | Legacy / Accepted Aliases (Input) | Values & Syntax | Default (Omitted if Default) |
| :--- | :--- | :--- | :--- | :--- |
| **Canon / Foundation** | `c` | `canon`, `base`, `foundation` | `bsb` (or `b`), `lxx` (or `l`), `vul` (or `v`) | `bsb` |
| **View Mode** | `m` | `view`, `mode`, `v` | `w` (`words`), `v` (`verses`), `b` (`books`) | `w` (`words`) |
| **Active Words / Keywords** | `w` | `keywords`, `keyword`, `words`, `word`, `k` | Comma-separated words or IDs (`faith`, `grace_NOUN`) | None (empty) |
| **Active Verses** | `v` | `verses`, `verse`, `vs` | Comma-separated verse IDs (`GEN.1.1`, `JHN.1.1`) | None (empty) |
| **Active Books** | `b` | `books`, `book` | Comma-separated 3-letter codes (`GEN`, `EXO`) | None (empty) |
| **Verse Connections Mode** | `vc` | `verse_mode`, `connections` | `r` (`crossref`), `w` (`words`) | `r` (`crossref`) |
| **Testament Filter** | `t` | `testament`, `filter` | `all`, `ot`, `nt`, `both` | `all` |
| **Similarity Labels** | `s` | `sim`, `similarity` | `off`, `h` (`hover`), `a` (`all`) | `h` (`hover`) |
| **Map Text Scale** | `ts` | `scale`, `font` | `s` (`small`), `m` (`medium`), `l` (`large`) | Responsive default |

> [!NOTE]
> Distinguishing View Mode from Active Verses:
> In the table above, `m` represents Mode (`w` for Words, `v` for Verses, `b` for Books) and `v` represents Active Verses (e.g., `v=GEN.1.1`). To ensure zero ambiguity, the parser also accepts `vs` for verses and `view` for mode.

---

## 4. Value Optimization Strategies

In addition to shortening parameter keys, significant compression can be achieved by optimizing the serialized values:

### 4.1 Omission of Defaults
If a parameter matches its application default, it is omitted entirely from the URL string:
- Default canon: `bsb` -> omit `c=`
- Default view mode: `words` -> omit `m=`
- Default testament filter: `all` -> omit `t=`
- Default similarity labels: `hover` -> omit `s=`

### 4.2 POS Tag Stripping
When users search for standard lexical terms, the internal node ID appends part-of-speech tags (e.g., `faith_NOUN`, `love_VERB`).
- If a word is unambiguous or represents the primary lexical entry, write `w=faith` rather than `w=faith_NOUN`.
- The parser resolves `faith` directly to the corresponding node in `data2d`. If a specific part of speech is required, write `w=faith_NOUN`.

### 4.3 Multi-Value Delimiters
Multiple entities are joined with standard commas (`,`), which require no URL percent-encoding in modern browser query strings:
- Multiple words: `w=faith,hope,love`
- Multiple books: `b=GEN,EXO,LEV`
- Multiple verses: `v=GEN.1.1,JHN.1.1`

---

## 5. Before and After Comparisons

| Scenario | Current Verbose URL (v9.2.1) | Proposed Compact URL | Character Reduction |
| :--- | :--- | :--- | :--- |
| **Base App Launch** | `?canon=bsb` (10 chars) | *(empty query)* (0 chars) | **-100%** |
| **LXX Canon Root** | `?canon=lxx` (10 chars) | `?c=lxx` (6 chars) | **-40.0%** |
| **Single Word (BSB)** | `?canon=bsb&keywords=faith_NOUN` (31 chars) | `?w=faith` (8 chars) | **-74.2%** |
| **Single Word (LXX)** | `?canon=lxx&keywords=faith_NOUN` (31 chars) | `?c=lxx&w=faith` (14 chars) | **-54.8%** |
| **Multi-Word Comparison (BSB)** | `?canon=bsb&keywords=faith_NOUN,love_NOUN,hope_NOUN` (52 chars) | `?w=faith,love,hope` (18 chars) | **-65.4%** |
| **Verse Mode (Genesis 1:1 in LXX)** | `?canon=lxx&view=verses&verses=GEN.1.1` (37 chars) | `?c=lxx&m=v&v=GEN.1.1` (20 chars) | **-45.9%** |
| **Book Mode (Genesis & Exodus in VUL)** | `?canon=vul&view=books&books=GEN,EXO` (35 chars) | `?c=vul&m=b&b=GEN,EXO` (20 chars) | **-42.9%** |

---

## 6. Backward Compatibility Guarantee

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
    : (modeParam === 'b' || modeParam === 'books')
        ? 'books'
        : 'words';

// Universal Entity Resolution
const words = params.get('w') || params.get('k') || params.get('keywords') || params.get('keyword') || params.get('words') || params.get('word');
const verses = params.get('v') || params.get('vs') || params.get('verses') || params.get('verse');
const books = params.get('b') || params.get('books') || params.get('book');
```

When serializing state back to the address bar (`updateUrl`), only the canonical short keys are written, and default values are pruned.

---

## 7. Implementation Roadmap

1. **Step 1: Universal Parameter Parser & Serializer:**
   - Refactor `updateUrl()` and parameter extraction in [`web/bible-word-map.js`](file:///home/josh/code/semantic-lxx-word-map/web/bible-word-map.js) to adopt the bidirectional dictionary.
   - Omit default values (`c=bsb`, `m=w`).
2. **Step 2: Add Native "Share View" / Copy Link Action:**
   - Provide a quick 1-click "Copy Link" button in the top bar or Options drawer that copies the clean, shortened URL to the system clipboard with visual toast confirmation.
3. **Step 3: Verification:**
   - Verify that all legacy URLs load with complete accuracy.
   - Verify that new compact URLs parse and restore state cleanly across all three canons (BSB, LXX, VUL) and all three view modes (Words, Verses, Books).
