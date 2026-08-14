# Changelog

## [4.1.3] - 2026-08-14
### Fixed
- Fixed critical race condition where D3 zoom was swallowing `touchend` events, causing the long-press tooltip to open 500ms after a short tap. Touch events now properly intercept during the browser's capture phase before D3 zoom logic runs.
- Fixed an issue where the second tap on empty space would erroneously re-add the previous keyword due to a stale hover state.

## [4.1.2] - 2026-08-14
### Fixed
- Fixed bug on mobile devices where a short tap was incorrectly triggering the hover tooltip due to the browser synthesizing rogue `mousemove` events milliseconds after the `touchend` event.
- Improved tap reliability by allowing slight fat-finger movements during a tap to no longer cancel the touch interaction.

## [4.1.1] - 2026-08-14
### Fixed
- Fixed tooltip overflowing the top of the screen on mobile devices making the close button inaccessible.
- Redesigned touch handling so a short tap adds a word to the active map, and a long press opens the verse tooltip without conflicting with the map interaction.

## [4.1.0] - 2026-08-13
### Added
- **True Physics Iterative Engine:** Rebuilt the visualization engine to compute graph topology dynamically. Node placement is now dictated directly by genuine 100D cosine similarities between words, creating a highly realistic mapping of semantic space.
- **Dynamic Organic Spawning:** Word clusters are now iterated and injected smoothly over time, allowing users to watch the semantic galaxy build itself as related words lock into their gravitational orbits.
- **Dynamic Camera Tracking:** The view automatically zooms and pans to keep growing clusters perfectly centered and scaled within the window.
- **Additive Interactive Search:** Clicking nodes in the active canvas now preserves the physics simulation and additively pulls in new sets of neighbors and links without resetting the state, allowing infinite map "walking".

## [4.0.26] - 2026-08-13
### Fixed
- Fixed text rendering issues at extreme zoom scales by temporarily reverting the canvas context transform to draw standard-sized fonts at screen coordinates.

## [4.0.24] - 2026-08-13
### Added
- Auto-show labels when zoomed deep into the global map (when < 150 words are visible on screen).

### Fixed
- Removed artificial zoom limit to allow zooming deep into the default global map.

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
