import os
import urllib.request
import tarfile

RAW_VUL_DIR = os.path.join(os.path.dirname(__file__), '..', 'data', 'raw_vul')
os.makedirs(RAW_VUL_DIR, exist_ok=True)

RESOURCES = [
    {
        "name": "Clementina Vulgata Dataset (old & new testament JSON)",
        "url": "https://raw.githubusercontent.com/mborders/vulgata/master/bible.tar.gz",
        "type": "tar.gz"
    },
    {
        "name": "Whitaker's Words Dictionary JSON (DICTLINE.json)",
        "url": "https://raw.githubusercontent.com/Salihbasic/whitaker-words-jsonisator/main/output/DICTLINE.json",
        "path": os.path.join(RAW_VUL_DIR, "DICTLINE.json"),
        "type": "file"
    },
    {
        "name": "PROIEL Latin Treebank - Train",
        "url": "https://raw.githubusercontent.com/UniversalDependencies/UD_Latin-PROIEL/master/la_proiel-ud-train.conllu",
        "path": os.path.join(RAW_VUL_DIR, "la_proiel-ud-train.conllu"),
        "type": "file"
    },
    {
        "name": "PROIEL Latin Treebank - Dev",
        "url": "https://raw.githubusercontent.com/UniversalDependencies/UD_Latin-PROIEL/master/la_proiel-ud-dev.conllu",
        "path": os.path.join(RAW_VUL_DIR, "la_proiel-ud-dev.conllu"),
        "type": "file"
    },
    {
        "name": "PROIEL Latin Treebank - Test",
        "url": "https://raw.githubusercontent.com/UniversalDependencies/UD_Latin-PROIEL/master/la_proiel-ud-test.conllu",
        "path": os.path.join(RAW_VUL_DIR, "la_proiel-ud-test.conllu"),
        "type": "file"
    }
]

def main():
    print("Checking and downloading Latin Vulgate resources...")
    for res in RESOURCES:
        if res["type"] == "tar.gz":
            ot_path = os.path.join(RAW_VUL_DIR, "old_testament.json")
            nt_path = os.path.join(RAW_VUL_DIR, "new_testament.json")
            if os.path.exists(ot_path) and os.path.exists(nt_path):
                print(f"[OK] {res['name']} already present.")
            else:
                tar_path = os.path.join(RAW_VUL_DIR, "bible.tar.gz")
                print(f"Downloading {res['name']} from {res['url']}...")
                urllib.request.urlretrieve(res["url"], tar_path)
                print("Extracting Vulgate JSON files...")
                with tarfile.open(tar_path, "r:gz") as tar:
                    tar.extractall(RAW_VUL_DIR)
                if os.path.exists(tar_path):
                    os.remove(tar_path)
                print("[DONE] Extracted Vulgate JSON files.")
        else:
            if os.path.exists(res["path"]):
                size_mb = os.path.getsize(res["path"]) / (1024 * 1024)
                print(f"[OK] {res['name']} already exists ({size_mb:.2f} MB).")
            else:
                print(f"Downloading {res['name']} from {res['url']}...")
                urllib.request.urlretrieve(res["url"], res["path"])
                size_mb = os.path.getsize(res["path"]) / (1024 * 1024)
                print(f"[DONE] Saved to {res['path']} ({size_mb:.2f} MB).")

if __name__ == '__main__':
    main()
