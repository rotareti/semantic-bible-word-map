#!/bin/bash
set -e

echo "Creating directory structure..."
mkdir -p data/raw data/raw_vul data/processed data/output pipeline/venv web

echo "Downloading Berean Standard Bible USJ format..."
cd data/raw
if [ ! -f "BSB_usj.zip" ] && [ ! -f "GEN.usj" ]; then
    wget -q https://github.com/BSB-publishing/bsb2usfm/releases/download/v5.6/BSB_usj.zip
    unzip -q BSB_usj.zip
    rm -f BSB_usj.zip
    echo "BSB USJ dataset downloaded and extracted."
else
    echo "BSB dataset already present."
fi
cd ../../

echo "Setting up Python environment..."
if [ ! -f "pipeline/venv/bin/python" ]; then
    python3 -m venv --without-pip pipeline/venv
    wget -q https://bootstrap.pypa.io/get-pip.py
    pipeline/venv/bin/python get-pip.py
    rm get-pip.py
fi

pipeline/venv/bin/pip install -r pipeline/requirements.txt
pipeline/venv/bin/python -m spacy download en_core_web_sm

echo "Fetching dataset resources for all canons (BSB, LXX, VUL)..."
pipeline/venv/bin/python pipeline/fetch_interlinear.py
pipeline/venv/bin/python pipeline/fetch_lxx.py
pipeline/venv/bin/python pipeline/fetch_vul.py

echo "Setup complete! Environment and all canon datasets are ready."
