setup:
	bash setup.sh

parse:
	pipeline/venv/bin/python pipeline/build.py
	pipeline/venv/bin/python pipeline/build_lxx.py
	pipeline/venv/bin/python pipeline/build_vul.py

train:
	pipeline/venv/bin/python pipeline/train_all_canons_senses_and_entities.py

map:
	pipeline/venv/bin/python pipeline/generate_map.py
	pipeline/venv/bin/python pipeline/generate_map_lxx.py
	pipeline/venv/bin/python pipeline/generate_map_vul.py

centroids:
	pipeline/venv/bin/python pipeline/generate_verse_centroids.py
	pipeline/venv/bin/python pipeline/generate_verse_centroids_lxx.py
	pipeline/venv/bin/python pipeline/generate_verse_centroids_vul.py
	pipeline/venv/bin/python pipeline/generate_chapter_centroids.py
	pipeline/venv/bin/python pipeline/generate_chapter_centroids_lxx.py
	pipeline/venv/bin/python pipeline/generate_chapter_centroids_vul.py
	pipeline/venv/bin/python pipeline/generate_book_centroids.py
	pipeline/venv/bin/python pipeline/generate_book_centroids_lxx.py
	pipeline/venv/bin/python pipeline/generate_book_centroids_vul.py

christocentric-map: map centroids

serve:
	ln -sfn ../data web/data
	cd web && python3 -m http.server 8000

all: setup parse train map centroids

