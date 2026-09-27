"""
Fetch Apostolic Fathers Datasets
Downloads Lightfoot English translation (CCEL ThML/XML) and
Tauber/Lake Greek critical texts from GitHub into data/raw_af/
"""

import os
import urllib.request
import time

RAW_AF_DIR = os.path.join(os.path.dirname(__file__), '..', 'data', 'raw_af')
os.makedirs(RAW_AF_DIR, exist_ok=True)

CCEL_XML_URL = "https://www.ccel.org/ccel/lightfoot/fathers.xml"
CCEL_TARGET = os.path.join(RAW_AF_DIR, "lightfoot_fathers.xml")

GREEK_BASE_URL = "https://raw.githubusercontent.com/jtauber/apostolic-fathers/master/texts/"
GREEK_FILES = [
    "001-i_clement.txt",
    "002-ii_clement.txt",
    "003-ignatius-ephesians.txt",
    "004-ignatius-magnesians.txt",
    "005-ignatius-trallians.txt",
    "006-ignatius-romans.txt",
    "007-ignatius-philadelphians.txt",
    "008-ignatius-smyrnaeans.txt",
    "009-ignatius-polycarp.txt",
    "010-polycarp-philippians.txt",
    "011-didache.txt",
    "012-barnabas.txt",
    "013-shepherd.txt",
    "014-martyrdom.txt",
    "015-diognetus.txt"
]

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (SymBible Research Pipeline; contact@symbible.com)'
}


def download_url(url, target_path, label):
    if os.path.exists(target_path) and os.path.getsize(target_path) > 0:
        mb = os.path.getsize(target_path) / (1024 * 1024)
        print(f"[OK] {label} already exists ({mb:.2f} MB)")
        return
    print(f"Downloading {label} from {url}...")
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req) as resp, open(target_path, 'wb') as out_f:
        data = resp.read()
        out_f.write(data)
    mb = os.path.getsize(target_path) / (1024 * 1024)
    print(f"[DONE] Saved {label} ({mb:.2f} MB)")


def main():
    print("Checking and downloading Apostolic Fathers resources...")
    # 1. Download Lightfoot English XML
    download_url(CCEL_XML_URL, CCEL_TARGET, "Lightfoot English XML")

    # 2. Download Greek texts
    greek_dir = os.path.join(RAW_AF_DIR, "greek")
    os.makedirs(greek_dir, exist_ok=True)
    for fname in GREEK_FILES:
        target = os.path.join(greek_dir, fname)
        url = GREEK_BASE_URL + fname
        download_url(url, target, f"Greek {fname}")
        time.sleep(0.1)

    print("\nAll Apostolic Fathers resources are downloaded and ready.")


if __name__ == '__main__':
    main()
