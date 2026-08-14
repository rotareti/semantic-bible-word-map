# Project: Semantic Bible Word Map (Web Component)

## Objective
Build a pre-computed, static word-proximity map of the Bible that renders in a browser via an embeddable HTML5 custom element. The pipeline will ingest public domain USJ (JSON) text from the Berean Standard Bible, generate Word2Vec embeddings, reduce dimensionality via UMAP, and export a lightweight static JSON coordinate map for the frontend.

## Tech Stack & Tooling
*   **Version Control & CI:** Git. Testing powered by `cargo nextest` and `cargo llvm-cov`.
*   **Data Ingestion & Parsing:** Rust (CLI tool to efficiently parse, clean, and tokenize USJ JSON files). 
*   **Machine Learning / Data Pipeline:** Python 3 (Gensim for Word2Vec, UMAP-learn for 2D coordinate reduction).
*   **Frontend:** Vanilla JS HTML5 Custom Element (`<bible-word-map>`) using HTML5 Canvas or D3.js.
*   **Environment:** Ubuntu, automated via Bash scripting and Make.

## Target Directory Structure
```text
bible-word-map/
├── .gitignore
├── Makefile                   # Orchestrates the pipeline (parse -> train -> export -> serve)
├── setup.sh                   # Environment bootstrapping
├── data/                      # Ignored in git
│   ├── raw/                   # Raw downloaded USJ files
│   ├── processed/             # Tokenized flat text files
│   └── output/                # Final wordmap.json
├── parser/                    # Rust CLI project
│   ├── Cargo.toml
│   └── src/
│       └── main.rs            # Parses BSB USJ and outputs space-separated tokens
├── pipeline/                  # Python machine learning scripts
│   ├── requirements.txt
│   ├── train_embeddings.py    # Gensim Word2Vec script
│   └── generate_map.py        # UMAP dimensionality reduction & JSON export
└── web/                       # Frontend component
    ├── index.html             # Demo page for local iteration
    ├── bible-word-map.js      # The Custom Element definition
    └── styles.css
