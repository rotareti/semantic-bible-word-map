import os
import urllib.request

RAW_DIR = os.path.join(os.path.dirname(__file__), '..', 'data', 'raw')
os.makedirs(RAW_DIR, exist_ok=True)

RESOURCES = [
    {
        "name": "STEPBible TBESG Lexicon (CC BY 4.0)",
        "url": "https://raw.githubusercontent.com/STEPBible/STEPBible-Data/master/Lexicons/TBESG%20-%20Translators%20Brief%20lexicon%20of%20Extended%20Strongs%20for%20Greek%20-%20STEPBible.org%20CC%20BY.txt",
        "path": os.path.join(RAW_DIR, "tbesg.txt")
    },
    {
        "name": "Septuaginta Rahlfs 1935 Morphological Dataset (CATSS/CCAT)",
        "url": "https://raw.githubusercontent.com/eliranwong/LXX-Rahlfs-1935/master/11_end-users_files/MyBible/Bibles/LXX_final_main.csv",
        "path": os.path.join(RAW_DIR, "lxx_final_main.csv")
    },
    {
        "name": "LXX Lexicon and English Glosses",
        "url": "https://raw.githubusercontent.com/eliranwong/LXX-Rahlfs-1935/master/11_end-users_files/LXX_lexicon_formatted_for_UniqueBibleAppPlus.csv",
        "path": os.path.join(RAW_DIR, "lxx_lexicon.csv")
    }
]

def main():
    print("Checking and downloading Greek Septuagint and lexicon resources...")
    for res in RESOURCES:
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
