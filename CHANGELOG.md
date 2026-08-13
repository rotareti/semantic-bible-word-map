# Changelog

## [4.0.22] - 2026-08-13
### Added
- "Freely you have received; freely give." quote to the footer.
- Explicit close `(x)` button to the word tooltip for better touch interactions on mobile.

### Changed
- Replaced scrolling webpage layout with a true fullscreen web-app layout (`100dvh`), perfectly locking elements in place on all screen sizes.
- Redesigned the search input and button with curved borders, subtle shadows, and contrasting backgrounds for a premium feel.
- Moved the info panel to the top bar alongside the search tools.
- Refined tooltip behavior on mobile: tapping outside an open tooltip now reliably closes it without accidentally selecting a new word.

### Fixed
- Addressed typos in the Berean Standard Bible source (`vvv`) at Acts 4:36, Luke 9:33, and Genesis 35:18, completely recalculating the embeddings model to purge the typo.
- Added a transparent dummy favicon to prevent `404` errors in local server logs.


## [2.0.0] - 2026-08-12
### Added
- Dynamic 2D UMAP projection at search time for single and multi-word semantic searches.
- True 100-dimensional cosine similarity calculations in the browser to accurately find semantic neighbors.
- Versioning system implemented.

### Removed
- 3D View and WebGL scatter plot functionality, as dynamic 2D mapping provides superior localized semantic insights.
- Pre-computed 3D JSON outputs from the data pipeline.

## [1.0.0]
### Added
- Initial release of Semantic Bible Word Map.
- Global 2D and 3D UMAP projections of Word2Vec embeddings.
- Old Testament and New Testament filters.
