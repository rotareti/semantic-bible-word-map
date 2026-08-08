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

## Getting Started

*(Documentation will be populated as the components are built)*
