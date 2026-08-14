## Goal Description
We want to extract Natural Language Processing (NLP) metadata (POS, Lemma, Entity Type) and inject it into the map. Crucially, we want to solve the homophone problem (e.g., "mark" as a Name vs "mark" as a Verb) by tagging words *before* training the Word2Vec model. This ensures that `mark_PROPN` and `mark_VERB` receive two distinct vectors and appear as separate bubbles on the map.

## User Review Required
> [!WARNING]
> Because we are splitting homophones into separate words, the **entire data pipeline** must be unified in Python using SpaCy. We can no longer use the Rust parser because the Verse Index generator also needs to know which verses contain the "Verb" version vs the "Name" version! 

## Proposed Changes

### `pipeline/build.py` (NEW)
- Create a new unified build script in Python.
- It will read the raw `.usj` files directly.
- It will pass every verse through `spacy.load("en_core_web_sm")`.
- It will tokenize the text into `word_POS` (e.g., `mark_PROPN`).
- It will generate the `word_to_verse` index using these tagged tokens!
- It will write the tagged text to `ot_text.txt` and `nt_text.txt`.

### `pipeline/train_embeddings.py`
- Modify to train on the newly tagged `ot_text.txt` and `nt_text.txt`. Word2Vec will naturally learn `mark_PROPN` and `mark_VERB` as separate concepts.

### `pipeline/generate_map.py`
- When exporting `wordmap_2d.json`, it will parse the `_POS` tag off the token and format the output:
  ```json
  {
      "w": "mark",
      "pos": "PROPN",
      "f": 150,
      "t": "NT",
      ...
  }
  ```
  *(Note: By stripping the tag here, the UI will still just display "mark", but since there are two entries, the UI will naturally draw two bubbles!)*

### `web/bible-word-map.js`
- **[MODIFY]** Update the search and hover logic. Since `w` is no longer unique (there are two bubbles with `"w": "mark"`), we will use a new `id` field (e.g. `mark_PROPN`) to uniquely identify nodes in the D3 simulation and search.
- Update the tooltip to display the POS tag to the user: **"mark (Name)"** vs **"mark (Verb)"**.

## Verification Plan
1. Run the new unified `pipeline/build.py`. (This will take ~2-3 minutes to run SpaCy over the entire Bible).
2. Run `pipeline/train_embeddings.py` and `pipeline/generate_map.py`.
3. Open the UI and search "mark". Verify that two bubbles appear, one tagged as a Noun/Name, and one as a Verb, and clicking them reveals their distinct verse contexts.
