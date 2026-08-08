setup:
	mkdir -p data/raw data/processed data/output pipeline/venv
	python3 -m venv pipeline/venv
	pipeline/venv/bin/pip install -r pipeline/requirements.txt

parse:
	cd parser && ~/.cargo/bin/cargo run --release -- ../data/raw ../data/processed

train:
	pipeline/venv/bin/python pipeline/train_embeddings.py

map:
	pipeline/venv/bin/python pipeline/generate_map.py

all: parse train map
