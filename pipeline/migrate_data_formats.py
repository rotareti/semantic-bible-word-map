"""
Migrate JSON data files to compact optimized format:
1. data/output/wordmap_2d.json: Cap original Strong's roots to top 5.
2. data/output/versemap_2d*.json: Convert 'r' crossrefs from dict to [id, sim] tuples, cap to 16, and drop redundant 'b', 'c', 'v'.
3. data/output/bookmap_2d*.json: Empty 'closest_words' arrays (computed on client dynamically).
"""
import os
import json
import gzip
import time

def get_sizes(path):
    raw = os.path.getsize(path)
    with open(path, 'rb') as f:
        gz = len(gzip.compress(f.read(), compresslevel=6))
    return raw, gz

def migrate_wordmap(path):
    print(f"Migrating {path}...")
    before_raw, before_gz = get_sizes(path)
    with open(path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    for item in data:
        if 'original' in item and isinstance(item['original'], list):
            item['original'] = item['original'][:5]

    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, separators=(',', ':'), ensure_ascii=False)

    after_raw, after_gz = get_sizes(path)
    print(f"  Wordmap: {before_raw/(1024*1024):.2f}MB -> {after_raw/(1024*1024):.2f}MB (gz: {before_gz/(1024*1024):.2f}MB -> {after_gz/(1024*1024):.2f}MB)")

def migrate_versemap(path):
    print(f"Migrating {path}...")
    before_raw, before_gz = get_sizes(path)
    with open(path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    verses = data['verses'] if isinstance(data, dict) and 'verses' in data else data
    new_verses = []
    for v in verses:
        rec = {
            "id": v["id"],
            "x": v["x"],
            "y": v["y"],
            "w": v.get("w", [])
        }
        raw_r = v.get("r", [])
        new_r = []
        for cr in raw_r[:16]:
            if isinstance(cr, dict):
                new_r.append([cr.get("id"), cr.get("sim")])
            elif isinstance(cr, list):
                new_r.append(cr[:2])
        rec["r"] = new_r
        new_verses.append(rec)

    out_data = {"count": len(new_verses), "verses": new_verses} if isinstance(data, dict) and 'verses' in data else new_verses

    with open(path, 'w', encoding='utf-8') as f:
        json.dump(out_data, f, separators=(',', ':'), ensure_ascii=False)

    after_raw, after_gz = get_sizes(path)
    print(f"  Versemap: {before_raw/(1024*1024):.2f}MB -> {after_raw/(1024*1024):.2f}MB (gz: {before_gz/(1024*1024):.2f}MB -> {after_gz/(1024*1024):.2f}MB)")

def migrate_bookmap(path):
    print(f"Migrating {path}...")
    before_raw, before_gz = get_sizes(path)
    with open(path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    books = data['books'] if isinstance(data, dict) and 'books' in data else data
    for b in books:
        b['closest_words'] = []

    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, separators=(',', ':'), ensure_ascii=False)

    after_raw, after_gz = get_sizes(path)
    print(f"  Bookmap: {before_raw/(1024*1024):.2f}MB -> {after_raw/(1024*1024):.2f}MB (gz: {before_gz/(1024*1024):.2f}MB -> {after_gz/(1024*1024):.2f}MB)")

def main():
    t0 = time.time()
    migrate_wordmap('data/output/wordmap_2d.json')
    migrate_versemap('data/output/versemap_2d.json')
    migrate_versemap('data/output/versemap_2d_lxx.json')
    migrate_versemap('data/output/versemap_2d_vul.json')
    migrate_bookmap('data/output/bookmap_2d.json')
    migrate_bookmap('data/output/bookmap_2d_lxx.json')
    print(f"Migration completed in {time.time() - t0:.2f}s")

if __name__ == '__main__':
    main()
