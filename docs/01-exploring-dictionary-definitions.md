# Exploring Dictionary Definitions

We explored generating dictionary style definitions for words purely from our 100D semantic vectors. The idea was to define a word using its nearest vector neighbors. For example: "A concept closely associated with X, Y, and Z."

## The Experiment

We calculated the top 5 nearest neighbors for a clicked word and injected them into a dynamic definition sentence. The results were highly revealing of the dataset's nature.

**Example 1: Mark**
Hovering the name "Mark" generated this definition:
> "A concept closely associated with Matthew, Luke, and often used in the context of prediction and patches."

A dictionary would define Mark as "a student of Paul and Barnabas". The map instead clustered Mark with other gospel authors (Matthew, Luke) and highly specific localized narrative elements (Mark 2 talks about patches, Mark 13 talks about prediction).

**Example 2: Heal**
Hovering the word "heal" generated:
> "A concept closely associated with accuse, upheld, and admonished, often used in the context of relieved and pleas."

A dictionary would define heal as "to cure". The map clustered it with the surrounding narrative. In the Gospels, healings almost always happen in the context of people making pleas to be relieved, followed by the Pharisees accusing Jesus of breaking the Sabbath.

## Conclusion

This approach proved that generating a general English definition out of localized narrative vectors does not work.

Models like ChatGPT or GloVe are trained on billions of words across diverse topics to learn general dictionary definitions. Our map is trained exclusively on the Berean Standard Bible which is roughly 800,000 words. Because of this small and highly specific corpus, the vectors encode the narrative structure of the Bible rather than general English semantics.

The semantic map is a powerful tool for exploring how a word is used within the biblical narrative, but it cannot answer what a word means in general English. We abandoned this feature branch but kept this learning documented.
