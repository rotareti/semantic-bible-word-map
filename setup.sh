#!/bin/bash
set -e

echo "Creating directory structure..."
mkdir -p data/raw data/processed data/output pipeline/venv web

echo "Downloading Berean Standard Bible USJ format..."
cd data/raw
if [ ! -f "BSB_usj.zip" ]; then
    wget -q https://github.com/BSB-publishing/bsb2usfm/releases/download/v5.6/BSB_usj.zip
    unzip -q BSB_usj.zip
    # Clean up empty/unneeded files if any
    rm BSB_usj.zip
    echo "BSB USJ dataset downloaded and extracted."
else
    echo "Dataset already present."
fi
cd ../../

echo "Setting up Python environment..."
python3 -m venv --without-pip pipeline/venv
wget -q https://bootstrap.pypa.io/get-pip.py
pipeline/venv/bin/python get-pip.py
rm get-pip.py
pipeline/venv/bin/pip install -r pipeline/requirements.txt

echo "Setup complete!"
