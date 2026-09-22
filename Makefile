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

serve:
	ln -sfn ../data web/data
	cd web && python3 -m http.server 8000

all: setup parse train map
