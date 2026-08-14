# Semantic Bible Word Map

This project generates a semantic word-proximity map of the Bible using natural language processing and visualizes it in a web browser.

## Architecture

The pipeline consists of three main components:
1. **Data Ingestion (Python)**: Parses Universal Scripture JSON (USJ) files, cleans out translator footnotes, and extracts pure Biblical text.
2. **Machine Learning Pipeline (Python)**: Uses SpaCy for advanced Natural Language Processing to tag Parts of Speech. It then uses Gensim (Word2Vec) for training word embeddings and UMAP for 2D dimensionality reduction.
3. **Web Visualization (Vanilla JS / Canvas)**: An HTML5 custom element (`<bible-word-map>`) that renders the map using D3.js for physics and interaction.

## Features

* **Info Button**: An interactive information panel is available next to the main title. This panel provides a quick guide on how to read the map and use the search controls.
* **Semantic Connections**: Words are physically pulled together on the map based on how similar their contextual usage is in the Bible.
* **Part of Speech Colors**: Words are color-coded to visually distinguish their grammatical roles.
  * **Green**: Proper Nouns (Names, Places)
  * **Blue**: Nouns (Objects, Concepts)
  * **Pink**: Verbs (Actions)
  * **Yellow**: Adjectives and Adverbs
  * **Slate**: Other words

## Directory Structure

* `data/`: Raw USJ files, processed tokens, and output coordinate/verse maps.
* `parser/`: Rust CLI application for processing USJ.
* `pipeline/`: Python scripts for ML.
* `web/`: Frontend components.

## Getting Started (Building from Source)

If you want to parse the Bible text, train your own Word2Vec embeddings, and generate the map projections yourself:

1. **Setup the Environment**: Installs Rust, Python, and required ML dependencies.
   ```bash
   make setup
   ```
2. **Parse Text**: Extracts text from the raw USJ files.
   ```bash
   make parse
   ```
3. **Train Model**: Trains the Word2Vec model on the corpus.
   ```bash
   make train
   ```
4. **Generate Map**: Uses UMAP to squash embeddings into 2D coordinate files and builds verse indices.
   ```bash
   make map
   ```
5. **Serve Locally**: Starts a local HTTP server to view the map.
   ```bash
   make serve
   ```
   Navigate to `http://localhost:8000` to view.

## Using the Web Component (No Build Required)

If you just want to embed the interactive semantic map into your own website without running the ML pipeline, you can use the pre-built web component.

### 1. Include the Scripts
Add the D3 library and our custom web component to your HTML file:
```html
<script src="https://d3js.org/d3.v7.min.js"></script>
<script src="path/to/bible-word-map.js" type="module"></script>
```

### 2. Host the Data
Host the two pre-calculated JSON files (`wordmap_2d.json` and `verse_index.json`) on your web server, CDN, or AWS S3 bucket.

### 3. Add the HTML Element
Drop the custom element anywhere in your HTML, pointing the `src` attributes to your hosted JSON files:
```html
<bible-word-map 
    src-2d="https://your-website.com/data/wordmap_2d.json" 
    src-verses="https://your-website.com/data/verse_index.json">
</bible-word-map>
```

### 4. Customizing Styles
The `<bible-word-map>` element styles itself but can be configured using CSS variables (like `--bwm-bg`, `--bwm-text`, and `--bwm-node-hover`) defined on the `:host` element or wrapping container.
