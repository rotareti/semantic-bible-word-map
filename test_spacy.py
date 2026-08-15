import spacy
nlp = spacy.load("en_core_web_sm", disable=["parser", "ner"])
doc = nlp("I don't know")
for token in doc:
    print(f"{token.text} -> {token.lemma_} ({token.pos_})")
