import spacy
nlp = spacy.load("en_core_web_sm", disable=["parser", "ner"])
doc = nlp("I'm sure he won't do it because they can't.")
for token in doc:
    print(f"{token.text} -> {token.lemma_} ({token.pos_})")
