import os
import requests
import json

RAW_DIR = 'data/raw'
os.makedirs(RAW_DIR, exist_ok=True)

# 1. Download BSB Interlinear TSV
bsb_url = "https://bereanbible.com/bsb_tables.tsv"
bsb_path = os.path.join(RAW_DIR, "bsb_tables.tsv")

print(f"Downloading BSB Interlinear TSV from {bsb_url}...")
try:
    response = requests.get(bsb_url, headers={'User-Agent': 'Mozilla/5.0'})
    response.raise_for_status()
    with open(bsb_path, 'w', encoding='utf-8') as f:
        f.write(response.text)
    print("Successfully downloaded bsb_tables.tsv")
except Exception as e:
    print(f"Error downloading BSB Interlinear: {e}")

# 2. Download Strong's Dictionary JSON
strongs_url = "https://raw.githubusercontent.com/mormon-documentation-project/strongs/master/strongs.json"
strongs_path = os.path.join(RAW_DIR, "strongs.json")

print(f"Downloading Strong's Dictionary JSON from {strongs_url}...")
try:
    response = requests.get(strongs_url, headers={'User-Agent': 'Mozilla/5.0'})
    response.raise_for_status()
    data = response.json()
    with open(strongs_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False)
    print("Successfully downloaded strongs.json")
except Exception as e:
    print(f"Error downloading Strong's Dictionary: {e}")
