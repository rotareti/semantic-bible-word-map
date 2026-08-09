# Semantic Bible Word Map

This project generates a semantic word-proximity map of the Bible using natural language processing and visualizes it in a web browser. It features both 2D and 3D projections of the semantic space.

## Architecture

The pipeline consists of three main components:
1. **Data Ingestion (Rust)**: Parses Universal Scripture JSON (USJ) files and extracts raw text tokens.
2. **Machine Learning Pipeline (Python)**: Uses Gensim (Word2Vec) for training word embeddings and UMAP for 2D/3D dimensionality reduction.
3. **Web Visualization (Vanilla JS / WebGL)**: An HTML5 custom element (`<bible-word-map>`) that renders the semantic map and allows for interactive exploration.

## Directory Structure

* `data/` - Contains raw USJ files, processed tokens, and the output coordinate maps. (Ignored in Git, except structure).
* `parser/` - Rust CLI application for processing USJ.
* `pipeline/` - Python scripts for ML.
* `web/` - Frontend components.

## Getting Started (Building from Source)

If you want to parse the Bible text, train your own Word2Vec embeddings, and generate the 2D/3D map projections yourself:

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
4. **Generate Map**: Uses UMAP to squash embeddings into 2D and 3D coordinate files.
   ```bash
   make map
   ```
5. **Serve Locally**: Starts a local HTTP server to view the map.
   ```bash
   make serve
   ```
   *Navigate to `http://localhost:8000` to view.*

## Using the Web Component (No Build Required)

If you just want to embed the interactive semantic map into your own website (React, Vue, or Vanilla HTML) without running the ML pipeline, you can use the pre-built web component!

### 1. Include the Scripts
Add the Plotly library and our custom web component to your HTML file:
```html
<script src="https://cdn.plot.ly/plotly-2.32.0.min.js"></script>
<script src="path/to/bible-word-map.js" type="module"></script>
```

### 2. Host the Data
Host the two pre-calculated coordinate files (`wordmap_2d.json` and `wordmap_3d.json`) on your own web server, CDN, or AWS S3 bucket.

### 3. Add the HTML Element
Drop the custom element anywhere in your HTML, pointing the `src` attributes to your hosted JSON files:
```html
<bible-word-map 
    src-2d="https://your-website.com/data/wordmap_2d.json" 
    src-3d="https://your-website.com/data/wordmap_3d.json">
</bible-word-map>
```

### 4. Customizing Styles
The `<bible-word-map>` element injects itself directly into the standard DOM. You can easily override the layout, colors, and fonts using standard CSS targeting its internal classes like `.search-box` or `.top-bar`.
