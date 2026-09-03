const GENRE_COLORS = {
    'Law': '#3b82f6',
    'History': '#10b981',
    'Wisdom': '#f59e0b',
    'Major Prophets': '#8b5cf6',
    'Minor Prophets': '#ec4899',
    'Gospels': '#ef4444',
    'Pauline Epistles': '#06b6d4',
    'General Epistles': '#14b8a6',
    'Apocalypse': '#e11d48'
};

class BibleWordMap extends HTMLElement {
    constructor() {
        super();
        this.data2d = null;
        this.verses = null;
        this.wordToVerses = null;
        this.booksData = null;
        this.selectedBook = null;
        this.searchedBooks = [];
        this.drawerBooks = [];
        this.viewMode = 'words';
        this.testamentFilter = 'all';
        this.isSearchMode = false;
        this.searchedWords = [];
        this.nodes = [];
        this.links = [];
        this.transform = d3.zoomIdentity;
        this.hoveredNode = null;
        this.tooltipTimeout = null;
        this.simulation = null;
        this.neighborsPerKeyword = 100;
        
        this.innerHTML = `
            <style>
                bible-word-map {
                    display: block;
                    width: 100%;
                    height: 100%;
                    --bwm-bg: #ffffff;
                    --bwm-input-bg: #f9fafb;
                    --bwm-input-focus-bg: #ffffff;
                    --bwm-btn-bg: #f9fafb;
                    --bwm-btn-hover: #e5e7eb;
                    --bwm-text: #333333;
                    --bwm-text-muted: #666666;
                    --bwm-border: #e5e7eb;
                    --bwm-badge-bg: rgba(0, 0, 0, 0.05);
                    --bwm-node-default: #888888;
                    --bwm-node-kw: #d32f2f;
                    --bwm-node-hover: #2563eb;
                    --bwm-link-direct: rgba(40, 167, 69, 0.6);
                    --bwm-link-indirect: rgba(150, 150, 150, 0.2);
                    --bwm-tooltip-link: #2563eb;
                    --bwm-font: system-ui, -apple-system, sans-serif;
                }
                @media (prefers-color-scheme: dark) {
                    bible-word-map {
                        --bwm-bg: #121212;
                        --bwm-input-bg: #1e1e1e;
                        --bwm-input-focus-bg: #161b22;
                        --bwm-btn-bg: #21262d;
                        --bwm-btn-hover: #30363d;
                        --bwm-text: #e0e0e0;
                        --bwm-text-muted: #8b949e;
                        --bwm-border: #333333;
                        --bwm-badge-bg: rgba(255, 255, 255, 0.08);
                        --bwm-node-default: #999999;
                        --bwm-tooltip-link: #60a5fa;
                    }
                }
                .bwm-container {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    height: 100%;
                    position: relative;
                    overflow: hidden;
                    flex: 1;
                    min-height: 0;
                    min-width: 0;
                    font-family: var(--bwm-font);
                    color: var(--bwm-text);
                }
                .bwm-top-bar {
                    display: flex;
                    justify-content: space-between;
                    gap: 10px;
                    padding-bottom: 12px;
                    flex-wrap: nowrap;
                }
                .bwm-search-controls {
                    display: flex;
                    gap: 8px;
                    flex-wrap: nowrap;
                    flex: 1;
                }
                .bwm-search-input-wrapper {
                    position: relative;
                    display: flex;
                    flex: 1;
                    align-items: center;
                }
                .bwm-search-controls input {
                    width: 100%;
                    box-sizing: border-box;
                    padding: 8px 36px 8px 16px;
                    border: 1px solid var(--bwm-border);
                    border-radius: 20px;
                    background: var(--bwm-input-bg);
                    color: var(--bwm-text);
                    outline: none;
                    font-family: var(--bwm-font);
                    font-size: 16px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.02) inset;
                }
                .bwm-search-clear {
                    position: absolute;
                    right: 10px;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    border: none;
                    background: var(--bwm-border);
                    color: var(--bwm-text-muted);
                    font-size: 14px;
                    line-height: 1;
                    display: none;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    padding: 0;
                    transition: background 0.15s, color 0.15s;
                    user-select: none;
                }
                .bwm-search-clear:hover {
                    background: var(--bwm-node-kw);
                    color: #ffffff;
                }
                .bwm-search-clear.visible {
                    display: flex;
                }
                .bwm-search-controls input::placeholder {
                    color: var(--bwm-text-muted);
                    opacity: 0.8;
                }
                .bwm-search-controls input:focus {
                    border-color: var(--bwm-node-hover);
                    background: var(--bwm-input-focus-bg);
                    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
                }
                .bwm-btn {
                    padding: 8px 20px;
                    border: 1px solid var(--bwm-border);
                    border-radius: 20px;
                    background: var(--bwm-btn-bg);
                    color: var(--bwm-text);
                    cursor: pointer;
                    font-weight: 600;
                    transition: all 0.2s;
                    font-family: var(--bwm-font);
                    box-shadow: 0 2px 5px rgba(0,0,0,0.04);
                }
                .bwm-btn:hover {
                    background: var(--bwm-btn-hover);
                }
                .bwm-btn.active {
                    background: var(--bwm-node-hover);
                    color: white;
                    border-color: var(--bwm-node-hover);
                }
                .bwm-error {
                    color: #d32f2f;
                    font-size: 0.9rem;
                    display: none;
                    align-items: center;
                }
                .bwm-canvas-container {
                    flex: 1;
                    position: relative;
                    border: 1px solid var(--bwm-border);
                    border-radius: 8px;
                    overflow: hidden;
                    background: var(--bwm-bg);
                    min-height: 0;
                    min-width: 0;
                }
                canvas {
                    width: 100%;
                    height: 100%;
                    display: block;
                    cursor: grab;
                }
                canvas:active {
                    cursor: grabbing;
                }
                .bwm-tooltip {
                    position: absolute;
                    background-color: rgba(255, 255, 255, 0.85); /* fallback */
                    background-color: color-mix(in srgb, var(--bwm-bg) 85%, transparent);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    color: var(--bwm-text);
                    padding: 10px 14px;
                    border-radius: 8px;
                    border: 1px solid var(--bwm-border);
                    pointer-events: none;
                    opacity: 0;
                    transition: opacity 0.1s;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    font-size: 0.9em;
                    line-height: 1.4;
                    max-width: 300px;
                    z-index: 9999;
                }
                .bwm-radial-menu {
                    position: absolute;
                    pointer-events: none;
                    z-index: 10000;
                }
                .bwm-radial-item {
                    position: absolute;
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    background: rgba(26, 26, 26, 0.85);
                    color: #ffffff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    pointer-events: auto;
                    font-size: 18px;
                    font-weight: bold;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                    transition: transform 0.15s ease-out, opacity 0.15s ease-out;
                    transform: scale(0);
                    opacity: 0;
                    user-select: none;
                    -webkit-user-select: none;
                }
                .bwm-radial-item.visible {
                    transform: scale(1);
                    opacity: 1;
                }
                .bwm-radial-item:hover {
                    background: rgba(51, 51, 51, 0.9);
                    transform: scale(1.15);
                }
                .bwm-radial-item:active {
                    transform: scale(0.95);
                }
                .bwm-radial-label {
                    position: absolute;
                    top: -22px;
                    left: 50%;
                    transform: translateX(-50%);
                    white-space: nowrap;
                    font-size: 11px;
                    font-weight: 600;
                    color: #ffffff;
                    background: rgba(0, 0, 0, 0.75);
                    padding: 2px 6px;
                    border-radius: 4px;
                    pointer-events: none;
                    opacity: 0;
                    transition: opacity 0.15s;
                }
                .bwm-radial-item:hover .bwm-radial-label {
                    opacity: 1;
                }
                .bwm-verses-panel {
                    position: absolute;
                    background-color: rgba(255, 255, 255, 0.92);
                    background-color: color-mix(in srgb, var(--bwm-bg) 92%, transparent);
                    backdrop-filter: blur(14px);
                    -webkit-backdrop-filter: blur(14px);
                    color: var(--bwm-text);
                    border-radius: 10px;
                    border: 1px solid var(--bwm-border);
                    box-shadow: 0 6px 20px rgba(0,0,0,0.15);
                    font-size: 0.9em;
                    line-height: 1.5;
                    width: 340px;
                    max-width: calc(100% - 20px);
                    max-height: 320px;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    z-index: 10001;
                    pointer-events: auto;
                    opacity: 0;
                    transition: opacity 0.15s;
                }
                .bwm-verses-header {
                    padding: 12px 14px 0 14px;
                    border-bottom: 1px solid var(--bwm-border);
                    flex-shrink: 0;
                    background: color-mix(in srgb, var(--bwm-bg) 95%, transparent);
                }
                .bwm-verses-title {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 8px;
                }
                .bwm-verses-tabs {
                    display: flex;
                    gap: 16px;
                    overflow-x: auto;
                    scrollbar-width: none;
                }
                .bwm-verses-tabs::-webkit-scrollbar {
                    display: none;
                }
                .bwm-verses-tab {
                    padding: 4px 0px;
                    cursor: pointer;
                    opacity: 0.6;
                    border-bottom: 2px solid transparent;
                    white-space: nowrap;
                    font-weight: 600;
                    font-size: 0.9em;
                    transition: opacity 0.15s;
                }
                .bwm-verses-tab:hover {
                    opacity: 0.9;
                }
                .bwm-verses-tab.active {
                    opacity: 1;
                    border-bottom-color: var(--bwm-node-hover);
                    color: var(--bwm-node-hover);
                }
                .bwm-verses-pane {
                    display: none;
                }
                .bwm-verses-pane.active {
                    display: block;
                }
                .bwm-verses-content {
                    padding: 12px 14px;
                    overflow-y: auto;
                    flex-grow: 1;
                }
                .bwm-verses-panel.visible {
                    opacity: 1;
                }
                .bwm-verses-close {
                    float: right;
                    cursor: pointer;
                    font-size: 1.3em;
                    line-height: 1;
                    opacity: 0.5;
                    margin-left: 8px;
                }
                .bwm-verses-close:hover {
                    opacity: 1;
                }
                .bwm-drawer-toggle {
                    width: 36px;
                    height: 36px;
                    border-radius: 8px;
                    background: var(--bwm-btn-bg);
                    color: var(--bwm-text);
                    border: 1px solid var(--bwm-border);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
                    flex-shrink: 0;
                    margin-right: 2px;
                }
                .bwm-drawer-toggle:hover {
                    background: var(--bwm-btn-hover);
                }
                .bwm-drawer-toggle.active {
                    background: var(--bwm-node-hover);
                    color: #ffffff;
                    border-color: var(--bwm-node-hover);
                }
                .bwm-drawer {
                    position: absolute;
                    top: 48px;
                    bottom: 0;
                    left: -320px;
                    width: 300px;
                    height: auto;
                    background-color: rgba(255, 255, 255, 0.85); /* fallback for older browsers */
                    background-color: color-mix(in srgb, var(--bwm-bg) 85%, transparent);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border: 1px solid var(--bwm-border);
                    border-left: none;
                    border-radius: 0 10px 10px 0;
                    box-shadow: 4px 4px 15px rgba(0,0,0,0.1);
                    z-index: 1000;
                    transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    display: flex;
                    flex-direction: column;
                }
                .bwm-drawer.open {
                    left: 0;
                }
                .bwm-drawer-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 15px 20px;
                    border-bottom: 1px solid var(--bwm-border);
                }
                .bwm-drawer-header h3 {
                    margin: 0;
                    font-size: 1.1em;
                }
                .bwm-drawer-close {
                    cursor: pointer;
                    font-size: 1.5em;
                    line-height: 1;
                    opacity: 0.6;
                }
                .bwm-drawer-close:hover {
                    opacity: 1;
                }
                .bwm-drawer-content {
                    padding: 20px;
                    overflow-y: auto;
                    flex: 1;
                }
                .bwm-drawer-section {
                    margin-bottom: 24px;
                }
                .bwm-drawer-section-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 10px;
                }
                .bwm-drawer-section-header h4, .bwm-drawer-section h4 {
                    margin: 0;
                    font-size: 0.85em;
                    text-transform: uppercase;
                    color: var(--bwm-text-muted);
                    letter-spacing: 0.5px;
                }
                .bwm-btn-clear-all {
                    background: transparent;
                    border: 1px solid var(--bwm-border);
                    color: var(--bwm-text-muted);
                    border-radius: 12px;
                    font-size: 0.75em;
                    font-weight: 600;
                    padding: 3px 8px;
                    cursor: pointer;
                    transition: all 0.15s;
                    font-family: var(--bwm-font);
                    display: none;
                }
                .bwm-btn-clear-all:hover {
                    background: var(--bwm-node-kw);
                    border-color: var(--bwm-node-kw);
                    color: #ffffff;
                }
                .bwm-btn-clear-all.visible {
                    display: block;
                }
                .bwm-slider-container {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-top: 10px;
                }
                .bwm-slider-container input[type="range"] {
                    flex: 1;
                    cursor: pointer;
                    accent-color: var(--bwm-node-hover);
                }
                .bwm-slider-value {
                    min-width: 32px;
                    text-align: center;
                    font-weight: 600;
                    font-size: 0.9em;
                    padding: 2px 6px;
                    background: var(--bwm-btn-bg);
                    border: 1px solid var(--bwm-border);
                    border-radius: 6px;
                    color: var(--bwm-text);
                }
                .bwm-drawer-hint {
                    font-size: 0.8em;
                    color: var(--bwm-text-muted);
                    margin-top: 6px;
                    line-height: 1.35;
                }
                .bwm-pill-group {
                    display: flex;
                    gap: 6px;
                    margin-top: 10px;
                    flex-wrap: wrap;
                }
                .bwm-pill-btn {
                    flex: 1 1 calc(50% - 6px);
                    padding: 7px 8px;
                    font-size: 0.8em;
                    font-weight: 500;
                    border-radius: 8px;
                    border: 1px solid var(--bwm-border);
                    background: var(--bwm-btn-bg);
                    color: var(--bwm-text);
                    cursor: pointer;
                    transition: all 0.15s ease;
                    font-family: var(--bwm-font);
                    text-align: center;
                }
                .bwm-pill-btn:hover {
                    background: var(--bwm-btn-hover);
                }
                .bwm-pill-btn.active {
                    background: var(--bwm-node-hover);
                    color: #ffffff;
                    border-color: var(--bwm-node-hover);
                    font-weight: 600;
                }
                .bwm-active-word-item {
                    display: flex;
                    align-items: center;
                    margin-bottom: 8px;
                    font-size: 0.95em;
                }
                .bwm-active-word-item input {
                    margin-right: 8px;
                    cursor: pointer;
                    accent-color: var(--bwm-node-hover);
                }
                .bwm-empty-state {
                    color: var(--bwm-text-muted);
                    font-size: 0.9em;
                    font-style: italic;
                }
                .bwm-loading {
                    position: absolute;
                    top: 50%; left: 50%;
                    transform: translate(-50%, -50%);
                    background-color: rgba(255, 255, 255, 0.92);
                    background-color: color-mix(in srgb, var(--bwm-bg) 92%, transparent);
                    backdrop-filter: blur(16px);
                    -webkit-backdrop-filter: blur(16px);
                    color: var(--bwm-text);
                    border: 1px solid var(--bwm-border);
                    padding: 14px 18px 12px 18px;
                    border-radius: 16px;
                    box-shadow: 0 12px 36px rgba(0,0,0,0.18);
                    z-index: 100;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    width: 320px;
                    max-width: calc(100% - 30px);
                    box-sizing: border-box;
                    user-select: none;
                    pointer-events: none;
                }
                .bwm-loading-visual {
                    position: relative;
                    width: 280px;
                    height: 160px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .bwm-loading-canvas {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 280px;
                    height: 160px;
                    border-radius: 10px;
                }
                .bwm-loading-tip-container {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    pointer-events: none;
                    padding: 0 15px;
                    box-sizing: border-box;
                    z-index: 2;
                }
                .bwm-loading-tip {
                    font-size: 0.92em;
                    font-weight: 600;
                    text-align: center;
                    line-height: 1.35;
                    color: var(--bwm-text);
                    background-color: rgba(255, 255, 255, 0.9);
                    background-color: color-mix(in srgb, var(--bwm-bg) 90%, transparent);
                    padding: 8px 14px;
                    border-radius: 12px;
                    border: 1px solid var(--bwm-border);
                    box-shadow: 0 4px 16px rgba(0,0,0,0.12);
                    opacity: 0;
                    transform: scale(0.85);
                    transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                .bwm-loading-tip.visible {
                    opacity: 1;
                    transform: scale(1);
                }
                .bwm-loading-status {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    margin-top: 8px;
                    font-size: 0.85em;
                    color: var(--bwm-text-muted);
                    font-weight: 500;
                }
                .bwm-loading-spinner {
                    width: 13px;
                    height: 13px;
                    border: 2px solid var(--bwm-border);
                    border-top-color: var(--bwm-node-hover);
                    border-radius: 50%;
                    animation: bwm-spin 0.8s linear infinite;
                }
                @keyframes bwm-spin {
                    to { transform: rotate(360deg); }
                }
                .bwm-book-card {
                    position: absolute;
                    top: 54px;
                    right: 12px;
                    width: 320px;
                    max-width: calc(100% - 24px);
                    max-height: calc(100% - 70px);
                    background-color: rgba(255, 255, 255, 0.94);
                    background-color: color-mix(in srgb, var(--bwm-bg) 94%, transparent);
                    backdrop-filter: blur(14px);
                    -webkit-backdrop-filter: blur(14px);
                    border: 1px solid var(--bwm-border);
                    border-radius: 12px;
                    box-shadow: 0 8px 24px rgba(0,0,0,0.15);
                    color: var(--bwm-text);
                    z-index: 1000;
                    display: none;
                    flex-direction: column;
                    overflow: hidden;
                    font-size: 0.9em;
                }
                .bwm-book-card.visible {
                    display: flex;
                }
                .bwm-book-card-header {
                    padding: 12px 14px;
                    border-bottom: 1px solid var(--bwm-border);
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    background: color-mix(in srgb, var(--bwm-bg) 97%, transparent);
                }
                .bwm-book-card-close {
                    background: transparent;
                    border: none;
                    font-size: 1.3em;
                    line-height: 1;
                    cursor: pointer;
                    opacity: 0.5;
                    color: var(--bwm-text);
                    padding: 2px 4px;
                }
                .bwm-book-card-close:hover {
                    opacity: 1;
                }
                .bwm-book-badge {
                    display: inline-block;
                    font-size: 0.7em;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    padding: 2px 7px;
                    border-radius: 10px;
                    color: #ffffff;
                    margin-bottom: 4px;
                }
                .bwm-book-card-body {
                    padding: 12px 14px;
                    overflow-y: auto;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }
                .bwm-book-card-title {
                    margin: 0;
                    font-size: 1.2em;
                    font-weight: 700;
                    color: var(--bwm-text);
                }
                .bwm-book-chip-list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 6px;
                    margin-top: 6px;
                }
                .bwm-book-chip {
                    display: inline-flex;
                    align-items: center;
                    gap: 4px;
                    background: color-mix(in srgb, var(--bwm-btn-bg) 90%, var(--bwm-text) 10%);
                    border: 1px solid var(--bwm-border);
                    border-radius: 6px;
                    padding: 3px 8px;
                    font-size: 0.82em;
                    cursor: pointer;
                    color: var(--bwm-text);
                    transition: background 0.15s, border-color 0.15s;
                }
                .bwm-book-chip:hover {
                    border-color: var(--bwm-node-hover);
                    background: color-mix(in srgb, var(--bwm-node-hover) 15%, var(--bwm-bg) 85%);
                }
                .bwm-book-tabs {
                    display: flex;
                    gap: 6px;
                    padding: 8px 14px;
                    border-bottom: 1px solid var(--bwm-border);
                    background: color-mix(in srgb, var(--bwm-bg) 95%, transparent);
                    overflow-x: auto;
                    scrollbar-width: thin;
                }
                .bwm-book-tab {
                    display: inline-flex;
                    align-items: center;
                    gap: 5px;
                    padding: 4px 9px;
                    border-radius: 6px;
                    border: 1px solid var(--bwm-border);
                    background: transparent;
                    color: var(--bwm-text);
                    font-size: 0.82em;
                    font-weight: 600;
                    cursor: pointer;
                    white-space: nowrap;
                    transition: background 0.15s, border-color 0.15s, color 0.15s;
                }
                .bwm-book-tab.active {
                    color: #ffffff;
                    border-color: transparent;
                }
                .bwm-book-chip-group {
                    display: inline-flex;
                    align-items: stretch;
                    border: 1px solid var(--bwm-border);
                    border-radius: 6px;
                    overflow: hidden;
                    background: color-mix(in srgb, var(--bwm-btn-bg) 90%, var(--bwm-text) 10%);
                }
                .bwm-book-chip-group:hover {
                    border-color: var(--bwm-node-hover);
                }
                .bwm-chip-add {
                    background: color-mix(in srgb, var(--bwm-btn-bg) 75%, var(--bwm-text) 25%);
                    border: none;
                    border-left: 1px solid var(--bwm-border);
                    padding: 0 7px;
                    cursor: pointer;
                    color: var(--bwm-text);
                    font-size: 0.9em;
                    display: flex;
                    align-items: center;
                    transition: background 0.15s;
                }
                .bwm-chip-add:hover {
                    background: var(--bwm-node-hover);
                    color: #ffffff;
                }
            </style>
            <div class="bwm-container">
                <div class="bwm-top-bar">
                    <div class="bwm-drawer-toggle" id="bwm-drawer-toggle">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                    </div>
                    <div class="bwm-search-controls">
                        <div class="bwm-search-input-wrapper">
                            <input type="text" id="bwm-search" placeholder="Search for words (e.g. Father Son Spirit)">
                            <button class="bwm-search-clear" id="bwm-search-clear" title="Clear all keywords" type="button">&times;</button>
                        </div>
                        <button class="bwm-btn" id="bwm-btn-search">Search</button>
                    </div>
                </div>
                <div style="position: relative; height: 0;"><span id="bwm-error" class="bwm-error" style="position: absolute; top: -10px; left: 50px;">Word not found</span></div>
                <div class="bwm-drawer" id="bwm-drawer">
                    <div class="bwm-drawer-header">
                        <h3>Options</h3>
                        <div class="bwm-drawer-close" id="bwm-drawer-close">&times;</div>
                    </div>
                    <div class="bwm-drawer-content">
                        <div class="bwm-drawer-section">
                            <div class="bwm-drawer-section-header">
                                <h4 id="bwm-active-heading">Active Words</h4>
                                <button class="bwm-btn-clear-all" id="bwm-btn-clear-all" type="button" title="Clear all active keywords">Clear All</button>
                            </div>
                            <div id="bwm-active-words">
                                <div class="bwm-empty-state">No words selected.</div>
                            </div>
                        </div>
                        <div class="bwm-drawer-section">
                            <div class="bwm-drawer-section-header">
                                <h4 id="bwm-neighbor-heading">Relationships per Word</h4>
                                <span id="bwm-neighbor-value">100</span>
                            </div>
                            <div class="bwm-slider-container">
                                <input type="range" id="bwm-neighbor-slider" min="10" max="250" step="5" value="100">
                            </div>
                            <div class="bwm-drawer-hint" id="bwm-neighbor-hint">Controls how many related words appear around each keyword.</div>
                        </div>
                        <div class="bwm-drawer-section">
                            <div class="bwm-drawer-section-header">
                                <h4>Testament Filter</h4>
                            </div>
                            <div class="bwm-pill-group" id="bwm-testament-filter">
                                <button type="button" class="bwm-pill-btn active" data-testament="all">All</button>
                                <button type="button" class="bwm-pill-btn" data-testament="ot">Old Testament</button>
                                <button type="button" class="bwm-pill-btn" data-testament="nt">New Testament</button>
                                <button type="button" class="bwm-pill-btn" data-testament="both">Both Only</button>
                            </div>
                            <div class="bwm-drawer-hint">Highlight words by presence in Old or New Testament.</div>
                        </div>
                    </div>
                </div>
                <div class="bwm-canvas-container">
                    <canvas></canvas>
                    <div class="bwm-tooltip"></div>
                    <div class="bwm-loading">
                        <div class="bwm-loading-visual">
                            <canvas class="bwm-loading-canvas"></canvas>
                            <div class="bwm-loading-tip-container">
                                <div class="bwm-loading-tip"></div>
                            </div>
                        </div>
                        <div class="bwm-loading-status">
                            <span class="bwm-loading-spinner"></span>
                            <span id="bwm-loading-text">Loading Bible Word Map...</span>
                        </div>
                    </div>
                </div>
                <div class="bwm-radial-menu" id="bwm-radial-menu"></div>
                <div class="bwm-verses-panel" id="bwm-verses-panel"></div>
                <div class="bwm-book-card" id="bwm-book-card"></div>
            </div>
        `;
    }

    connectedCallback() {
        this.src2d = this.getAttribute('src-2d');
        this.srcVerses = this.getAttribute('src-verses');
        this.srcBooks = this.getAttribute('src-books') || 'data/output/bookmap_2d.json';
        
        this.canvas = this.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.tooltip = this.querySelector('.bwm-tooltip');
        this.loading = this.querySelector('.bwm-loading');
        this.loadingText = this.querySelector('#bwm-loading-text');
        this.loadingCanvas = this.querySelector('.bwm-loading-canvas');
        this.loadingTip = this.querySelector('.bwm-loading-tip');
        this.bookCard = this.querySelector('#bwm-book-card');
        
        this.searchInput = this.querySelector('#bwm-search');
        this.searchClearBtn = this.querySelector('#bwm-search-clear');
        this.searchBtn = this.querySelector('#bwm-btn-search');
        this.errorSpan = this.querySelector('#bwm-error');
        
        this.drawerClearAllBtn = this.querySelector('#bwm-btn-clear-all');
        this.neighborSlider = this.querySelector('#bwm-neighbor-slider');
        this.neighborValue = this.querySelector('#bwm-neighbor-value');
        
        this.setupEvents();
        this.loadData();
    }
    
    updateColors() {
        const styles = getComputedStyle(this);
        this.colors = {
            bg: styles.getPropertyValue('--bwm-bg').trim() || '#ffffff',
            text: styles.getPropertyValue('--bwm-text').trim() || '#333333',
            nodeDef: styles.getPropertyValue('--bwm-node-default').trim() || '#888888',
            nodeKw: styles.getPropertyValue('--bwm-node-kw').trim() || '#d32f2f',
            nodeHover: styles.getPropertyValue('--bwm-node-hover').trim() || '#2563eb',
            linkDir: styles.getPropertyValue('--bwm-link-direct').trim() || 'rgba(40, 167, 69, 0.6)',
            linkIndir: styles.getPropertyValue('--bwm-link-indirect').trim() || 'rgba(150, 150, 150, 0.2)',
            font: styles.getPropertyValue('--bwm-font').trim() || 'sans-serif'
        };
    }

    setupEvents() {
        // Search
        this.searchBtn.addEventListener('click', () => this.searchWord());
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.searchWord();
        });
        this.searchInput.addEventListener('input', () => {
            this.updateClearBtnVisibility();
        });
        
        if (this.searchClearBtn) {
            this.searchClearBtn.addEventListener('click', () => {
                this.clearAllKeywords();
            });
        }
        
        if (this.drawerClearAllBtn) {
            this.drawerClearAllBtn.addEventListener('click', () => {
                this.clearAllKeywords();
            });
        }
        
        if (this.neighborSlider) {
            this.neighborSlider.addEventListener('input', (e) => {
                const val = parseInt(e.target.value, 10);
                this.neighborsPerKeyword = val;
                if (this.neighborValue) this.neighborValue.textContent = val;
            });
            this.neighborSlider.addEventListener('change', () => {
                // Dynamically re-compute and update if search mode is active
                if (this.viewMode === 'books') {
                    if (this.isSearchMode && this.searchedBooks && this.searchedBooks.length > 0) {
                        this.searchBooks(true);
                    }
                } else {
                    if (this.isSearchMode && this.searchedWords && this.searchedWords.length > 0) {
                        this.searchWord(true);
                    }
                }
            });
        }

        const testamentPills = this.querySelectorAll('#bwm-testament-filter .bwm-pill-btn');
        testamentPills.forEach(btn => {
            btn.addEventListener('click', () => {
                testamentPills.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.testamentFilter = btn.getAttribute('data-testament') || 'all';
                this.draw();
            });
        });

        // Canvas interactivity
        new ResizeObserver(() => this.resize()).observe(this.canvas.parentElement);
        
        this.zoom = d3.zoom()
            .scaleExtent([0.05, 100000])
            .on("zoom", (e) => {
                if (e.sourceEvent) {
                    this.userInteracted = true;
                    if (this.radialMenuNode) this.hideRadialMenu();
                    if (this.versesPanel && this.versesPanel.classList.contains('visible')) this.hideVersesPanel();
                }
                this.transform = e.transform;
                this.draw();
            });
            
        // Radial menu handlers
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e), {capture: true});
        this.canvas.addEventListener('click', (e) => this.handleClick(e), {capture: true});
        this.canvas.addEventListener('mouseleave', () => {
            if (!this.radialMenuNode) {
                this.hoveredNode = null;
                this.canvas.style.cursor = 'grab';
                this.draw();
            }
        }, {capture: true});
        
        this.radialMenu = this.querySelector('#bwm-radial-menu');
        this.versesPanel = this.querySelector('#bwm-verses-panel');
        this.radialMenuNode = null;
        this.canvas.addEventListener('touchstart', (e) => {
            this.isTouch = true;
            this.ignoreNextClick = false;
            this.lastTouchStartTime = Date.now();
            let menuWasVisible = this.radialMenuNode !== null;
            let versesWasVisible = this.versesPanel && this.versesPanel.classList.contains('visible');
            if (menuWasVisible) {
                this.touchCloseTooltip = true;
                this.hideRadialMenu();
            }
            if (versesWasVisible) {
                this.touchCloseTooltip = true;
                this.hideVersesPanel();
            }
            
            if (e.touches && e.touches.length > 1) {
                if (this.touchTimer) {
                    clearTimeout(this.touchTimer);
                    this.touchTimer = null;
                    this.touchTargetNode = null;
                }
                return;
            }
            
            if (e.touches && e.touches.length > 0) {
                let touch = e.touches[0];
                let rect = this.canvas.getBoundingClientRect();
                let mouseX = touch.clientX - rect.left;
                let mouseY = touch.clientY - rect.top;
                
                this.lastTouchX = touch.clientX;
                this.lastTouchY = touch.clientY;
                
                let [logicalX, logicalY] = this.transform.invert([mouseX, mouseY]);
                let searchRadius = 30 / this.transform.k; // slightly larger radius for fat fingers
                let minDist = Infinity;
                let closestNode = null;
                
                if (this.nodes) {
                    for (let n of this.nodes) {
                        let dx = n.x - logicalX;
                        let dy = n.y - logicalY;
                        let dist = Math.sqrt(dx*dx + dy*dy);
                        if (dist < searchRadius && dist < minDist) {
                            minDist = dist;
                            closestNode = n;
                        }
                    }
                }
                
                this.touchTargetNode = closestNode;
                
                if (closestNode) {
                    this.touchTimer = setTimeout(() => {
                        this.touchTimer = null;
                        this.hoveredNode = closestNode;
                        this.showRadialMenu(closestNode, mouseX, mouseY);
                        this.draw();
                        this.ignoreNextClick = true;
                    }, 500);
                }
            }
        }, {passive: true, capture: true});
        
        this.canvas.addEventListener('touchmove', (e) => {
            if (this.touchTimer && e.touches && e.touches.length > 0) {
                let dx = e.touches[0].clientX - this.lastTouchX;
                let dy = e.touches[0].clientY - this.lastTouchY;
                // Allow a small fat-finger wobble without cancelling the tap
                if (Math.abs(dx) > 10 || Math.abs(dy) > 10 || e.touches.length > 1) {
                    clearTimeout(this.touchTimer);
                    this.touchTimer = null;
                    this.touchTargetNode = null;
                }
            }
        }, {passive: true, capture: true});
        
        this.canvas.addEventListener('touchend', () => {
            this.lastTouchEndTime = Date.now();
            if (this.touchTimer) {
                clearTimeout(this.touchTimer);
                this.touchTimer = null;
                // If it was a short tap, the simulated click event will fire.
                // We set the hoveredNode so handleClick can process the additive search!
                if (this.touchTargetNode) {
                    this.hoveredNode = this.touchTargetNode;
                } else {
                    this.hoveredNode = null;
                }
            }
        }, {passive: true, capture: true});
        
        // Bind D3 zoom LAST so our capture events fire first
        d3.select(this.canvas).call(this.zoom);
        
        this.drawerToggle = this.querySelector('#bwm-drawer-toggle');
        this.drawer = this.querySelector('#bwm-drawer');
        this.drawerClose = this.querySelector('#bwm-drawer-close');
        
        this.drawerToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = this.drawer.classList.toggle('open');
            this.drawerToggle.classList.toggle('active', isOpen);
        });
        
        this.drawerClose.addEventListener('click', () => {
            this.drawer.classList.remove('open');
            this.drawerToggle.classList.remove('active');
        });
        
        // Close radial menu, verses panel, and drawer when clicking outside
        document.addEventListener('click', (e) => {
            let isMenuVisible = this.radialMenuNode !== null;
            let isVersesVisible = this.versesPanel.classList.contains('visible');
            
            if (isMenuVisible || isVersesVisible) {
                if (!this.radialMenu.contains(e.target) && !this.versesPanel.contains(e.target) && !this.canvas.contains(e.target)) {
                    this.hideRadialMenu();
                    this.hideVersesPanel();
                }
            }
            
            if (this.drawer && this.drawer.classList.contains('open')) {
                if (!this.drawer.contains(e.target) && !this.drawerToggle.contains(e.target)) {
                    this.drawer.classList.remove('open');
                    this.drawerToggle.classList.remove('active');
                }
            }
        });
    }

    resize() {
        let rect = this.canvas.parentElement.getBoundingClientRect();
        let dpr = window.devicePixelRatio || 1;
        
        let oldW = this.logicalWidth || rect.width;
        let oldH = this.logicalHeight || rect.height;
        
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        this.ctx.scale(dpr, dpr);
        
        this.logicalWidth = rect.width;
        this.logicalHeight = rect.height;
        
        // Re-center the transform by the delta change in the canvas size
        if (this.transform && (oldW !== rect.width || oldH !== rect.height)) {
            let dx = (rect.width - oldW) / 2;
            let dy = (rect.height - oldH) / 2;
            
            // translate() operates in scaled coordinates, so we divide by k
            this.transform = this.transform.translate(dx / this.transform.k, dy / this.transform.k);
            d3.select(this.canvas).call(this.zoom.transform, this.transform);
        }
        
        this.draw();
    }

    async loadData() {
        let params = new URLSearchParams(window.location.search);
        let view = params.get('view');
        let books = params.get('books');
        let keywords = params.get('keywords');
        let isBooksInit = (view === 'books' || Boolean(books));

        if (isBooksInit) {
            const wordsBtn = document.getElementById('view-mode-words');
            const booksBtn = document.getElementById('view-mode-books');
            if (wordsBtn && booksBtn) {
                wordsBtn.classList.remove('active');
                booksBtn.classList.add('active');
            }
            this.viewMode = 'books';
            this.showLoading('Loading Biblical Books & Themes...', 'books');
        } else {
            this.showLoading('Loading Bible Word Map...', 'words');
        }

        // Fetch datasets concurrently
        this.booksPromise = this.srcBooks ? fetch(this.srcBooks).then(r => {
            if (!r.ok) throw new Error(`HTTP ${r.status}`);
            return r.json();
        }).catch(err => {
            console.warn("Could not load bookmap data", err);
            return null;
        }) : Promise.resolve(null);

        this.versesPromise = this.srcVerses ? fetch(this.srcVerses).then(r => {
            if (!r.ok) throw new Error(`HTTP ${r.status}`);
            return r.json();
        }).catch(err => {
            console.warn("Could not load verses data", err);
            return null;
        }) : Promise.resolve(null);

        this.data2dPromise = this.src2d ? fetch(this.src2d).then(r => {
            if (!r.ok) throw new Error(`HTTP ${r.status}`);
            return r.json();
        }).catch(err => {
            console.error("Could not load wordmap data", err);
            return null;
        }) : Promise.resolve(null);

        this.booksPromise.then(data => {
            if (data) this.booksData = data;
        });

        this.versesPromise.then(vData => {
            if (vData) {
                this.verses = vData.verses;
                this.wordToVerses = vData.words;
            }
        });

        this.data2dPromise.then(d2d => {
            if (d2d) this.data2d = d2d;
        });

        try {
            if (isBooksInit) {
                this.booksData = await this.booksPromise;
                this.hideLoading();

                this.setViewMode('books', true);
                if (books) {
                    this.searchedBooks = books.split(',').map(b => b.trim().toUpperCase()).filter(b => b);
                    this.drawerBooks = [...this.searchedBooks];
                    this.searchBooks(true);
                }
            } else {
                this.data2d = await this.data2dPromise;
                const vData = await this.versesPromise;
                if (vData) {
                    this.verses = vData.verses;
                    this.wordToVerses = vData.words;
                }
                this.hideLoading();

                if (keywords) {
                    this.searchedWords = keywords.split(',').map(k => k.trim()).filter(k => k);
                    this.drawerWords = [...this.searchedWords];
                    if (this.searchedWords.length > 0) {
                        let baseWords = [...new Set(this.searchedWords.map(id => {
                            let parts = id.split('_');
                            return this.formatWord(parts[0], parts[1]);
                        }))];
                        this.searchInput.value = baseWords.join(" ");
                        this.searchWord(true);
                    } else {
                        this.buildAllWordsGraph();
                    }
                } else {
                    this.buildAllWordsGraph();
                }
            }
        } catch (e) {
            console.error("Error loading Bible Word Map data", e);
            this.hideLoading();
        }
    }

    cosineSimilarity(a, b) {
        let dot = 0, normA = 0, normB = 0;
        for (let i = 0; i < a.length; i++) {
            dot += a[i] * b[i];
            normA += a[i] * a[i];
            normB += b[i] * b[i];
        }
        if (normA === 0 || normB === 0) return 0;
        return dot / (Math.sqrt(normA) * Math.sqrt(normB));
    }

    getBookVerses(wordId, bookCode) {
        if (!this.wordToVerses || !this.verses || !wordId || !bookCode) return [];
        let vIds = this.wordToVerses[wordId] || [];
        let prefix = bookCode.toUpperCase() + ' ';
        return vIds.filter(vid => (this.verses[vid] || '').startsWith(prefix));
    }

    wordAppearsInBook(wordId, bookCode) {
        return this.getBookVerses(wordId, bookCode).length > 0;
    }

    async searchWord(useExplicitIds = false) {
        this.hoveredNode = null;
        let foundPoints = [];
        
        if (this.viewMode === 'books') {
            this.searchBooks(useExplicitIds);
            return;
        }
        
        if (!useExplicitIds) {
            let originalQuery = this.searchInput.value.trim();
            let query = originalQuery.toLowerCase();
            if (!query) {
                this.clearAllKeywords();
                return;
            }

            let words = query.toLowerCase().split(/[\s,]+/).filter(w => w);
            this.searchedWords = [];
            
            for (let w of words) {
                let exactMatch = this.data2d.filter(d => d.id.toLowerCase() === w);
                if (exactMatch.length > 0) {
                    foundPoints.push(...exactMatch);
                    this.searchedWords.push(...exactMatch.map(p => p.id));
                    continue;
                }
                
                let matchingPoints = this.data2d.filter(d => d.w.toLowerCase() === w);
                if (matchingPoints.length > 0) {
                    foundPoints.push(...matchingPoints);
                    this.searchedWords.push(...matchingPoints.map(p => p.id));
                }
            }
            this.drawerWords = [...this.searchedWords];
        } else {
            // Use explicit IDs already set in this.searchedWords
            if (this.searchedWords.length === 0) {
                this.clearAllKeywords();
                return;
            }
            this.searchedWords.forEach(id => {
                let p = this.data2d.find(d => d.id === id);
                if (p) foundPoints.push(p);
            });
        }
        
        this.updateClearBtnVisibility();
        
        if (foundPoints.length === 0) {
            this.errorSpan.style.display = 'flex';
            this.errorSpan.textContent = 'None of the words were found.';
            setTimeout(() => this.errorSpan.style.display = 'none', 3000);
            return;
        }

        let topWordsSet = new Map();

        foundPoints.forEach((p) => {
            if (!topWordsSet.has(p.id)) {
                topWordsSet.set(p.id, { point: p, maxSim: 1, sourceKw: p.id });
            }
        });

        const limit = this.neighborsPerKeyword || 100;
        foundPoints.forEach(primaryPoint => {
            let similarities = this.data2d.map(d => ({
                point: d,
                sim: this.cosineSimilarity(primaryPoint.v, d.v)
            }));
            
            similarities.sort((a, b) => b.sim - a.sim);
            
            const topWords = similarities.slice(0, limit);
            topWords.forEach(s => {
                if (!topWordsSet.has(s.point.id)) {
                    topWordsSet.set(s.point.id, { point: s.point, maxSim: s.sim, sourceKw: primaryPoint.id });
                } else {
                    let existing = topWordsSet.get(s.point.id);
                    if (s.sim > existing.maxSim) {
                        existing.maxSim = s.sim;
                        existing.sourceKw = primaryPoint.id;
                    }
                }
            });
        });

        let finalTopWords = Array.from(topWordsSet.values());
        
        this.allSearchNodes = finalTopWords.map(s => ({
            id: s.point.id,
            w: s.point.w,
            pos: s.point.pos,
            t: s.point.t,
            f: s.point.f,
            sim: s.maxSim,
            sourceKw: s.sourceKw,
            isKw: this.searchedWords.includes(s.point.id),
            x: 0,
            y: 0,
            original: s.point.original,
            v: s.point.v
        }));

        this.allSearchLinks = [];
        this.allSearchNodes.forEach(n => {
            if (n.isKw || !n.sourceKw) return;
            
            let myVerses = this.wordToVerses ? (this.wordToVerses[n.id] || []) : [];
            let linkedToSourceKw = false;
            
            this.searchedWords.forEach(sw => {
                let swVerses = this.wordToVerses ? (this.wordToVerses[sw] || []) : [];
                let intersection = myVerses.filter(vId => swVerses.includes(vId));
                if (intersection.length > 0) {
                    this.allSearchLinks.push({
                        source: n.id,
                        target: sw,
                        type: 'direct',
                        intersection: intersection,
                        sim: n.sim
                    });
                    if (sw === n.sourceKw) linkedToSourceKw = true;
                }
            });
            
            if (!linkedToSourceKw) {
                this.allSearchLinks.push({
                    source: n.id,
                    target: n.sourceKw,
                    type: 'indirect',
                    sim: n.sim
                });
            }
        });

        // Normalize similarity to [0, 1] to maximize color and size contrast like Plotly did
        let minSim = d3.min(this.allSearchNodes.filter(n => !n.isKw), n => n.sim) || 0;
        let maxSim = d3.max(this.allSearchNodes.filter(n => !n.isKw), n => n.sim) || 1;
        this.allSearchNodes.forEach(n => {
            if (n.isKw) n.normSim = 1;
            else n.normSim = (n.sim - minSim) / (maxSim - minSim || 1);
        });

        this.isSearchMode = true;
        this.userInteracted = false;
        
        let baseWords = [...new Set(this.searchedWords.map(id => {
            let parts = id.split('_');
            return this.formatWord(parts[0], parts[1]);
        }))];
        this.searchInput.value = baseWords.join(" ");
        
        if (this.searchedWords && this.searchedWords.length > 0) {
            window.history.replaceState(null, '', '?keywords=' + this.searchedWords.join(','));
        }
        
        this.renderActiveWords();
        this.runSimulation();
    }
    updateClearBtnVisibility() {
        if (!this.searchClearBtn) return;
        const hasText = this.searchInput && this.searchInput.value.trim().length > 0;
        const hasKeywords = (this.viewMode === 'books')
            ? (this.searchedBooks && this.searchedBooks.length > 0)
            : (this.searchedWords && this.searchedWords.length > 0);
        if (hasText || hasKeywords) {
            this.searchClearBtn.classList.add('visible');
        } else {
            this.searchClearBtn.classList.remove('visible');
        }
    }

    clearAllKeywords() {
        if (this.viewMode === 'books') {
            this.resetBooksView();
            return;
        }
        this.isSearchMode = false;
        this.searchedWords = [];
        this.drawerWords = [];
        this.searchedBooks = [];
        this.drawerBooks = [];
        if (this.searchInput) this.searchInput.value = '';
        this.updateClearBtnVisibility();
        this.renderActiveWords();
        window.history.replaceState(null, '', window.location.pathname);
        this.hideRadialMenu();
        this.hideVersesPanel();
        this.buildAllWordsGraph();
    }

    showLoading(text = 'Loading Bible Word Map...', type = 'words') {
        if (!this.loading) return;
        if (this.loadingText) {
            this.loadingText.textContent = text;
        } else {
            let el = this.querySelector('#bwm-loading-text') || this.querySelector('.bwm-loading-status span:last-child');
            if (el) el.textContent = text;
        }
        this.loading.style.display = 'flex';
        this.startLoadingAnimation(type);
    }

    hideLoading() {
        if (!this.loading) return;
        this.stopLoadingAnimation();
        this.loading.style.display = 'none';
    }

    formatWord(word, pos) {
        if (pos === 'PROPN' && word.length > 0) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }
        return word;
    }
    
    renderActiveWords() {
        const container = this.querySelector('#bwm-active-words');
        if (!container) return;
        
        if (this.viewMode === 'books') {
            if (this.drawerClearAllBtn) {
                if (this.drawerBooks && this.drawerBooks.length > 0) {
                    this.drawerClearAllBtn.classList.add('visible');
                } else {
                    this.drawerClearAllBtn.classList.remove('visible');
                }
            }
            this.updateClearBtnVisibility();

            if (!this.drawerBooks || this.drawerBooks.length === 0) {
                container.innerHTML = '<div class="bwm-empty-state">No books selected.</div>';
                return;
            }

            container.innerHTML = '';
            this.drawerBooks.forEach(code => {
                let book = this.booksData ? this.booksData.books.find(b => b.code === code) : null;
                if (!book) return;

                let item = document.createElement('div');
                item.className = 'bwm-active-word-item';

                let cb = document.createElement('input');
                cb.type = 'checkbox';
                cb.checked = this.searchedBooks.includes(code);
                cb.addEventListener('change', () => {
                    if (cb.checked) {
                        if (!this.searchedBooks.includes(code)) this.searchedBooks.push(code);
                    } else {
                        this.searchedBooks = this.searchedBooks.filter(x => x !== code);
                    }
                    if (this.searchedBooks.length === 0) {
                        this.clearAllKeywords();
                    } else {
                        this.searchBooks(true);
                    }
                });

                let genreColor = GENRE_COLORS[book.genre] || '#3b82f6';
                let label = document.createElement('label');
                label.style.cursor = 'pointer';
                label.innerHTML = `<strong>${book.name}</strong> <span class="bwm-book-badge" style="background:${genreColor};font-size:0.65em;padding:1px 5px;margin-left:4px;">${book.genre}</span>`;

                label.addEventListener('click', () => { cb.click(); });

                item.appendChild(cb);
                item.appendChild(label);
                container.appendChild(item);
            });
            return;
        }

        if (this.drawerClearAllBtn) {
            if (this.drawerWords && this.drawerWords.length > 0) {
                this.drawerClearAllBtn.classList.add('visible');
            } else {
                this.drawerClearAllBtn.classList.remove('visible');
            }
        }
        
        this.updateClearBtnVisibility();
        
        if (!this.drawerWords || this.drawerWords.length === 0) {
            container.innerHTML = '<div class="bwm-empty-state">No words selected.</div>';
            return;
        }
        
        container.innerHTML = '';
        this.drawerWords.forEach(id => {
            let [w, pos] = id.split('_');
            let item = document.createElement('div');
            item.className = 'bwm-active-word-item';
            
            let cb = document.createElement('input');
            cb.type = 'checkbox';
            cb.checked = this.searchedWords.includes(id);
            cb.addEventListener('change', () => {
                if (cb.checked) {
                    if (!this.searchedWords.includes(id)) this.searchedWords.push(id);
                } else {
                    this.searchedWords = this.searchedWords.filter(x => x !== id);
                }
                // Trigger a re-search with the remaining explicit IDs
                let baseWords = [...new Set(this.searchedWords.map(id => {
                    let parts = id.split('_');
                    return this.formatWord(parts[0], parts[1]);
                }))];
                this.searchInput.value = baseWords.join(" ");
                this.searchWord(true); // pass flag to indicate explicit IDs
            });
            
            let label = document.createElement('label');
            label.style.cursor = 'pointer';
            let displayW = this.formatWord(w, pos);
            label.innerHTML = `<strong>${displayW}</strong> <span style="color:#888;font-size:0.85em;">(${pos})</span>`;
            
            // Allow clicking label to toggle checkbox
            label.addEventListener('click', () => { cb.click(); });
            
            item.appendChild(cb);
            item.appendChild(label);
            container.appendChild(item);
        });
    }

    runSimulation() {
        if (this.simulation) this.simulation.stop();
        if (this.spawnInterval) {
            clearInterval(this.spawnInterval);
            this.spawnInterval = null;
        }
        
        let kwNodes = this.allSearchNodes.filter(n => n.isKw);
        let otherNodes = this.allSearchNodes.filter(n => !n.isKw);
        
        // Sort other nodes by similarity descending
        otherNodes.sort((a, b) => b.sim - a.sim);
        
        // Let keywords freely float but gently pull them together and center them
        kwNodes.forEach(n => {
            n.x = (Math.random() - 0.5) * 20;
            n.y = (Math.random() - 0.5) * 20;
            delete n.fx;
            delete n.fy;
        });
        
        // Add kw-kw links based on true similarity
        for (let i = 0; i < kwNodes.length; i++) {
            for (let j = i + 1; j < kwNodes.length; j++) {
                let sim = this.cosineSimilarity(kwNodes[i].v, kwNodes[j].v);
                this.allSearchLinks.push({
                    source: kwNodes[i].id,
                    target: kwNodes[j].id,
                    type: 'kw-kw',
                    sim: sim
                });
            }
        }
        
        // We start simulation with ONLY keywords
        this.nodes = [...kwNodes];
        this.links = this.allSearchLinks.filter(l => l.type === 'kw-kw');
        
        let cw = this.logicalWidth || 800;
        let ch = this.logicalHeight || 600;
        
        this.transform = d3.zoomIdentity.translate(cw/2, ch/2).scale(1);
        d3.select(this.canvas).call(this.zoom.transform, this.transform);

        const LCG = d3.randomLcg(42); 
        
        this.simulation = d3.forceSimulation(this.nodes)
            .randomSource(LCG)
            .force("link", d3.forceLink(this.links).id(d => d.id).distance(d => {
                if (d.type === 'kw-kw') return Math.max(80, (1 - d.sim) * 400);
                return d.type === 'direct' ? Math.max(30, (1 - d.sim) * 150) : Math.max(60, (1 - d.sim) * 250);
            }).strength(d => d.type === 'kw-kw' ? 1.5 : 0.6))
            .force("charge", d3.forceManyBody().strength(-200))
            .force("collide", d3.forceCollide().radius(d => d.isKw ? 25 : 12))
            .force("center", d3.forceCenter(0, 0).strength(0.05))
            .on("tick", () => {
                this.updateDynamicZoom();
                this.draw();
            });
            
        this.pendingNodes = [];
        this.enqueueNodes(otherNodes);
    }
    
    enqueueNodes(nodesToSpawn) {
        if (!this.pendingNodes) this.pendingNodes = [];
        this.pendingNodes.push(...nodesToSpawn);
        this.pendingNodes.sort((a, b) => b.sim - a.sim);
        
        if (this.spawnInterval) return; // already running
        
        let batchSize = 3;
        this.spawnInterval = setInterval(() => {
            if (this.pendingNodes.length === 0) {
                clearInterval(this.spawnInterval);
                this.spawnInterval = null;
                return;
            }
            
            let batch = this.pendingNodes.splice(0, batchSize);
            
            batch.forEach(n => {
                let cw = this.logicalWidth || 800;
                let ch = this.logicalHeight || 600;
                let sourceNode = this.nodes.find(node => node.id === n.sourceKw);
                let startX = sourceNode ? sourceNode.x : this.transform.invertX(cw/2);
                let startY = sourceNode ? sourceNode.y : this.transform.invertY(ch/2);
                n.x = startX + (Math.random() - 0.5) * 12;
                n.y = startY + (Math.random() - 0.5) * 12;
                this.nodes.push(n);
                
                let nodeLinks = this.allSearchLinks.filter(l => l.source === n.id);
                this.links.push(...nodeLinks);
            });
            
            this.simulation.nodes(this.nodes);
            this.simulation.force("link").links(this.links);
            this.simulation.alpha(0.3).restart();
            
        }, 50); 
    }

    removeKeyword(oldWord) {
        if (!this.isSearchMode || !this.searchedWords.includes(oldWord)) return;
        
        this.searchedWords = this.searchedWords.filter(x => x !== oldWord);
        let baseWords = [...new Set(this.searchedWords.map(id => {
            let parts = id.split('_');
            return this.formatWord(parts[0], parts[1]);
        }))];
        this.searchInput.value = baseWords.join(" ");
        this.searchWord(true);
    }

    async addKeyword(newWord) {
        if (!this.isSearchMode) {
            let parts = newWord.split('_');
            this.searchInput.value = this.formatWord(parts[0], parts[1]);
            this.searchWord();
            return;
        }
        
        if (this.searchedWords.includes(newWord)) return; // already added
        
        let p = this.data2d.find(d => d.id === newWord);
        if (!p) return;
        
        this.searchedWords.push(newWord);
        if (!this.drawerWords) this.drawerWords = [];
        if (!this.drawerWords.includes(newWord)) this.drawerWords.push(newWord);
        
        let baseWords = [...new Set(this.searchedWords.map(id => {
            let parts = id.split('_');
            return this.formatWord(parts[0], parts[1]);
        }))];
        this.searchInput.value = baseWords.join(" ");
        
        if (this.searchedWords && this.searchedWords.length > 0) {
            window.history.replaceState(null, '', '?keywords=' + this.searchedWords.join(','));
        }
        
        this.renderActiveWords();
        
        // Find similarities for this new keyword
        let similarities = this.data2d.map(d => ({
            point: d,
            sim: this.cosineSimilarity(p.v, d.v)
        }));
        similarities.sort((a, b) => b.sim - a.sim);
        const limit = this.neighborsPerKeyword || 100;
        const topWords = similarities.slice(0, limit);
        
        let queuedNeighbors = [];
        
        // 1. Convert new keyword to a node and add directly to this.nodes
        let kwNode = this.nodes.find(n => n.id === newWord);
        if (!kwNode) {
            let cw = this.logicalWidth || 800;
            let ch = this.logicalHeight || 600;
            kwNode = {
                id: p.id, w: p.w, f: p.f, sim: 1, sourceKw: p.id, isKw: true,
                x: (Math.random()-0.5)*10, 
                y: (Math.random()-0.5)*10,
                v: p.v, normSim: 1, pos: p.pos, t: p.t
            };
            this.nodes.push(kwNode);
            this.allSearchNodes.push(kwNode);
        } else {
            kwNode.isKw = true;
            kwNode.sim = 1;
            kwNode.normSim = 1;
            
            // If it was in pendingNodes, remove it so it's not spawned twice
            this.pendingNodes = this.pendingNodes.filter(n => n.id !== newWord);
        }
        
        // 2. Link this new KW to all existing KWs
        let existingKws = this.nodes.filter(n => n.isKw && n.id !== newWord);
        existingKws.forEach(ek => {
            let sim = this.cosineSimilarity(kwNode.v, ek.v);
            let link = { source: kwNode.id, target: ek.id, type: 'kw-kw', sim: sim };
            this.allSearchLinks.push(link);
            this.links.push(link);
        });
        
        // 3. Process new neighbors
        topWords.forEach(s => {
            let existingAllNode = this.allSearchNodes.find(n => n.id === s.point.id);
            if (!existingAllNode) {
                let neighborNode = {
                    id: s.point.id, w: s.point.w, f: s.point.f, sim: s.sim, 
                    sourceKw: p.id, isKw: false, x: 0, y: 0, v: s.point.v,
                    normSim: s.sim, pos: s.point.pos, t: s.point.t
                };
                this.allSearchNodes.push(neighborNode);
                queuedNeighbors.push(neighborNode);
            } else {
                if (s.sim > existingAllNode.sim) {
                    existingAllNode.sim = s.sim;
                    existingAllNode.sourceKw = p.id;
                }
            }
            
            let myVerses = this.wordToVerses ? (this.wordToVerses[s.point.id] || []) : [];
            let linkedToSourceKw = false;
            
            this.searchedWords.forEach(sw => {
                let swVerses = this.wordToVerses ? (this.wordToVerses[sw] || []) : [];
                let intersection = myVerses.filter(vId => swVerses.includes(vId));
                if (intersection.length > 0) {
                    let link = {
                        source: s.point.id, target: sw, type: 'direct', intersection: intersection, sim: s.sim
                    };
                    this.allSearchLinks.push(link);
                    if (sw === p.id) linkedToSourceKw = true;
                    
                    let activeNode = this.nodes.find(n => n.id === s.point.id);
                    if (activeNode) this.links.push(link);
                }
            });
            
            if (!linkedToSourceKw) {
                let link = {
                    source: s.point.id, target: p.id, type: 'indirect', sim: s.sim
                };
                this.allSearchLinks.push(link);
                
                let activeNode = this.nodes.find(n => n.id === s.point.id);
                if (activeNode) this.links.push(link);
            }
        });
        
        // 3.5 Ensure any already-spawned nodes that intersect with the new keyword get a direct link
        let newKwVerses = this.wordToVerses ? (this.wordToVerses[p.id] || []) : [];
        this.nodes.forEach(n => {
            if (n.isKw) return;
            
            let hasLinkToNewKw = this.allSearchLinks.some(l => l.source === n.id && (l.target === p.id || l.target.id === p.id));
            if (hasLinkToNewKw) return;
            
            let myVerses = this.wordToVerses ? (this.wordToVerses[n.id] || []) : [];
            let intersection = myVerses.filter(vId => newKwVerses.includes(vId));
            
            if (intersection.length > 0) {
                let link = {
                    source: n.id, target: p.id, type: 'direct', intersection: intersection, sim: n.sim || 0
                };
                this.allSearchLinks.push(link);
                this.links.push(link);
            }
        });
        
        // Re-normalize all similarities
        let minSim = d3.min(this.allSearchNodes.filter(n => !n.isKw), n => n.sim) || 0;
        let maxSim = d3.max(this.allSearchNodes.filter(n => !n.isKw), n => n.sim) || 1;
        this.allSearchNodes.forEach(n => {
            if (!n.isKw) n.normSim = (n.sim - minSim) / (maxSim - minSim || 1);
        });
        
        // 4. Restart simulation to accept the new links and KW node
        this.simulation.nodes(this.nodes);
        this.simulation.force("link").links(this.links);
        this.simulation.alpha(0.5).restart();
        
        this.enqueueNodes(queuedNeighbors);
    }

    updateDynamicZoom() {
        if (!this.isSearchMode || this.nodes.length === 0 || this.userInteracted) return;
        
        let minX = d3.min(this.nodes, d => d.x);
        let maxX = d3.max(this.nodes, d => d.x);
        let minY = d3.min(this.nodes, d => d.y);
        let maxY = d3.max(this.nodes, d => d.y);
        
        let dx = maxX - minX || 1;
        let dy = maxY - minY || 1;
        let cx = (minX + maxX) / 2;
        let cy = (minY + maxY) / 2;
        
        let cw = this.logicalWidth || 800;
        let ch = this.logicalHeight || 600;
        
        // Target scale to fit the bounds with some padding
        let targetScale = 0.8 / Math.max(dx / cw, dy / ch);
        targetScale = Math.min(targetScale, 3); // don't zoom in too crazy close
        
        // Smoothly interpolate current transform towards target transform
        let k = this.transform.k + (targetScale - this.transform.k) * 0.05;
        
        let targetX = cw / 2 - k * cx;
        let targetY = ch / 2 - k * cy;
        
        let tx = this.transform.x + (targetX - this.transform.x) * 0.05;
        let ty = this.transform.y + (targetY - this.transform.y) * 0.05;
        
        let newTransform = d3.zoomIdentity.translate(tx, ty).scale(k);
        this.transform = newTransform;
        
        // Silently update d3 zoom state to match our programmatic panning
        this.canvas.__zoom = newTransform;
    }

    buildAllWordsGraph() {
        if (this.simulation) this.simulation.stop();
        
        let filteredData = this.data2d;
        
        let minX = d3.min(filteredData, d => d.x);
        let maxX = d3.max(filteredData, d => d.x);
        let minY = d3.min(filteredData, d => d.y);
        let maxY = d3.max(filteredData, d => d.y);
        
        let cw = this.logicalWidth || 800;
        let ch = this.logicalHeight || 600;
        
        let dx = maxX - minX || 1;
        let dy = maxY - minY || 1;
        let x = (minX + maxX) / 2;
        let y = (minY + maxY) / 2;
        let scale = 0.85 / Math.max(dx / cw, dy / ch);
        
        this.transform = d3.zoomIdentity.translate(cw / 2 - scale * x, ch / 2 - scale * y).scale(scale);
        d3.select(this.canvas).call(this.zoom.transform, this.transform);
        
        this.nodes = filteredData.map(d => ({
            id: d.id,
            w: d.w,
            f: d.f,
            pos: d.pos,
            t: d.t,
            x: d.x,
            y: d.y,
            original: d.original,
            isKw: false
        }));
        this.links = [];
        this.draw();
    }

    setViewMode(mode, forceReset = false) {
        if (this.viewMode === mode && !forceReset) {
            if (mode === 'books') {
                if (this.isSearchMode || (this.searchedBooks && this.searchedBooks.length > 0) || this.selectedBook) {
                    this.resetBooksView();
                }
            } else {
                if (this.isSearchMode || (this.searchedWords && this.searchedWords.length > 0)) {
                    this.clearAllKeywords();
                }
            }
            return;
        }

        this.viewMode = mode;
        this.hideRadialMenu();
        this.hideVersesPanel();
        this.hoveredNode = null;
        this.selectedBook = null;
        this.hideBookCard();
        
        let activeHeading = this.querySelector('#bwm-active-heading');
        let neighborHeading = this.querySelector('#bwm-neighbor-heading');
        let neighborHint = this.querySelector('#bwm-neighbor-hint');
        
        if (activeHeading) activeHeading.textContent = (mode === 'books') ? 'Active Books' : 'Active Words';
        if (neighborHeading) neighborHeading.textContent = (mode === 'books') ? 'Relationships per Book' : 'Relationships per Word';
        if (neighborHint) neighborHint.textContent = (mode === 'books') 
            ? 'Controls how many related words appear around each book.' 
            : 'Controls how many related words appear around each keyword.';

        if (this.searchInput) {
            this.searchInput.value = '';
            this.searchInput.placeholder = (mode === 'books') 
                ? 'Search for books (e.g. James Proverbs, Genesis Exodus)...' 
                : 'Search for words (e.g. Father Son Spirit)';
        }
        this.updateClearBtnVisibility();

        if (mode === 'books') {
            this.searchedWords = [];
            this.drawerWords = [];
            this.searchedBooks = [];
            this.drawerBooks = [];
            this.isSearchMode = false;
            window.history.replaceState(null, '', '?view=books');
            this.renderActiveWords();

            if (!this.booksData) {
                this.showLoading('Loading Biblical Books & Themes...', 'books');
                if (this.booksPromise) {
                    this.booksPromise.then(data => {
                        if (data) this.booksData = data;
                        this.hideLoading();
                        if (this.viewMode === 'books') {
                            this.buildBooksGraph();
                        }
                    }).catch(() => {
                        this.hideLoading();
                    });
                }
            } else {
                this.buildBooksGraph();
            }
        } else {
            this.searchedWords = [];
            this.drawerWords = [];
            this.searchedBooks = [];
            this.drawerBooks = [];
            this.isSearchMode = false;
            window.history.replaceState(null, '', window.location.pathname);
            this.renderActiveWords();

            if (!this.data2d) {
                this.showLoading('Loading Bible Word Map...', 'words');
                if (this.data2dPromise) {
                    this.data2dPromise.then(data => {
                        if (data) this.data2d = data;
                        this.hideLoading();
                        if (this.viewMode === 'words') {
                            this.buildAllWordsGraph();
                        }
                    }).catch(() => {
                        this.hideLoading();
                    });
                }
            } else {
                this.buildAllWordsGraph();
            }
        }
    }

    buildBooksGraph() {
        if (this.simulation) this.simulation.stop();
        if (this.spawnInterval) {
            clearInterval(this.spawnInterval);
            this.spawnInterval = null;
        }
        if (!this.booksData || !this.booksData.books) return;
        
        this.isSearchMode = false;
        this.selectedBook = null;
        this.hideBookCard();

        let cw = this.logicalWidth || 800;
        let ch = this.logicalHeight || 600;

        this.nodes = this.booksData.books.map(b => ({
            id: b.code,
            code: b.code,
            name: b.name,
            w: b.name,
            testament: b.testament,
            t: b.testament,
            genre: b.genre,
            order: b.order,
            verses: b.verses,
            total_words: b.total_words,
            x: b.x * 120,
            y: b.y * 120,
            v: b.v,
            top_words: b.top_words,
            closest_words: b.closest_words,
            nearest_books: b.nearest_books,
            isBook: true,
            isFocusedBook: false,
            isPrimaryBook: false
        }));

        let nodeMap = new Map(this.nodes.map(n => [n.id, n]));
        this.links = (this.booksData.links || [])
            .filter(l => nodeMap.has(l.source) && nodeMap.has(l.target))
            .map(l => ({
                source: nodeMap.get(l.source),
                target: nodeMap.get(l.target),
                sim: l.sim,
                type: 'book-book'
            }));

        let minX = d3.min(this.nodes, d => d.x);
        let maxX = d3.max(this.nodes, d => d.x);
        let minY = d3.min(this.nodes, d => d.y);
        let maxY = d3.max(this.nodes, d => d.y);

        let dx = maxX - minX || 1;
        let dy = maxY - minY || 1;
        let cx = (minX + maxX) / 2;
        let cy = (minY + maxY) / 2;
        let scale = 0.82 / Math.max(dx / cw, dy / ch);

        this.transform = d3.zoomIdentity.translate(cw / 2 - scale * cx, ch / 2 - scale * cy).scale(scale);
        d3.select(this.canvas).call(this.zoom.transform, this.transform);

        this.draw();
    }

    parseBookQuery(query) {
        if (!this.booksData || !this.booksData.books) return [];
        let originalLower = query.trim().toLowerCase();
        let remaining = originalLower;
        remaining = remaining.replace(/[,;+&]+/g, ' ');
        remaining = remaining.replace(/\b1st\b/g, '1').replace(/\bfirst\b/g, '1');
        remaining = remaining.replace(/\b2nd\b/g, '2').replace(/\bsecond\b/g, '2');
        remaining = remaining.replace(/\b3rd\b/g, '3').replace(/\bthird\b/g, '3');
        remaining = remaining.replace(/\bsong of songs\b/g, 'song of solomon');

        let found = [];
        let booksByLength = [...this.booksData.books].sort((a, b) => b.name.length - a.name.length);

        for (let b of booksByLength) {
            let escaped = b.name.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            let namePattern = new RegExp('\\b' + escaped + '\\b', 'g');
            if (namePattern.test(remaining)) {
                if (!found.some(fb => fb.code === b.code)) {
                    found.push(b);
                }
                remaining = remaining.replace(namePattern, ' ');
            }
        }

        let tokens = remaining.split(/\s+/).filter(t => t.length >= 2);
        for (let token of tokens) {
            let matched = this.booksData.books.find(b => 
                b.code.toLowerCase() === token ||
                (token.length >= 3 && b.name.toLowerCase().startsWith(token))
            );
            if (matched && !found.some(fb => fb.code === matched.code)) {
                found.push(matched);
            }
        }

        found.sort((a, b) => {
            let posA = originalLower.indexOf(a.name.toLowerCase());
            if (posA === -1) posA = originalLower.indexOf(a.code.toLowerCase());
            let posB = originalLower.indexOf(b.name.toLowerCase());
            if (posB === -1) posB = originalLower.indexOf(b.code.toLowerCase());
            return (posA !== -1 && posB !== -1) ? (posA - posB) : 0;
        });

        return found;
    }

    searchBooks(useExplicitCodes = false) {
        this.hoveredNode = null;
        let foundBooks = [];

        if (!useExplicitCodes) {
            let query = this.searchInput.value.trim();
            if (!query) {
                this.clearAllKeywords();
                return;
            }
            foundBooks = this.parseBookQuery(query);
            if (foundBooks.length === 0) {
                if (this.errorSpan) {
                    this.errorSpan.textContent = 'Book not found';
                    this.errorSpan.style.display = 'inline';
                    setTimeout(() => { if (this.errorSpan) this.errorSpan.style.display = 'none'; }, 2500);
                }
                return;
            }
            this.searchedBooks = foundBooks.map(b => b.code);
            this.drawerBooks = [...this.searchedBooks];
        } else {
            if (!this.searchedBooks || this.searchedBooks.length === 0) {
                this.clearAllKeywords();
                return;
            }
            foundBooks = this.searchedBooks.map(c => this.booksData.books.find(b => b.code === c)).filter(Boolean);
        }

        if (this.errorSpan) this.errorSpan.style.display = 'none';
        this.selectedBook = foundBooks[0];
        this.isSearchMode = true;
        this.userInteracted = false;

        this.searchInput.value = foundBooks.map(b => b.name).join(", ");
        this.updateClearBtnVisibility();

        if (this.searchedBooks && this.searchedBooks.length > 0) {
            window.history.replaceState(null, '', '?view=books&books=' + this.searchedBooks.join(','));
        }

        this.buildMultiBookConstellation(foundBooks);
    }

    buildMultiBookConstellation(foundBooks) {
        if (this.simulation) this.simulation.stop();
        if (this.spawnInterval) {
            clearInterval(this.spawnInterval);
            this.spawnInterval = null;
        }

        let bookNodes = foundBooks.map(b => ({
            id: b.code,
            code: b.code,
            name: b.name,
            w: b.name,
            testament: b.testament,
            t: b.testament,
            genre: b.genre,
            order: b.order,
            verses: b.verses,
            total_words: b.total_words,
            v: b.v,
            isBook: true,
            isPrimaryBook: true,
            isKw: true,
            top_words: b.top_words,
            closest_words: b.closest_words,
            nearest_books: b.nearest_books,
            x: (Math.random() - 0.5) * 40,
            y: (Math.random() - 0.5) * 40
        }));

        let bookLinks = [];
        for (let i = 0; i < bookNodes.length; i++) {
            for (let j = i + 1; j < bookNodes.length; j++) {
                let sim = this.cosineSimilarity(bookNodes[i].v, bookNodes[j].v);
                bookLinks.push({
                    source: bookNodes[i].id,
                    target: bookNodes[j].id,
                    type: 'book-book',
                    sim: sim
                });
            }
        }

        let limit = this.neighborsPerKeyword || 100;
        let topWordsMap = new Map();

        foundBooks.forEach(b => {
            let topWords = [];
            if (b.closest_words && b.closest_words.length > 0) {
                topWords = b.closest_words.slice(0, limit);
            } else if (this.data2d && this.data2d.length > 0) {
                let similarities = this.data2d.map(d => ({
                    ...d,
                    sim: this.cosineSimilarity(b.v, d.v),
                    in_book: this.wordAppearsInBook(d.id, b.code)
                }));
                similarities.sort((a, b) => {
                    if (a.in_book !== b.in_book) return a.in_book ? -1 : 1;
                    return b.sim - a.sim;
                });
                topWords = similarities.slice(0, limit);
            }

            topWords.forEach(w => {
                let pid = w.id;
                let sim = (w.sim !== undefined) ? w.sim : 0.8;
                let inBook = (w.in_book !== undefined) ? Boolean(w.in_book) : this.wordAppearsInBook(pid, b.code);
                if (!topWordsMap.has(pid)) {
                    topWordsMap.set(pid, {
                        point: w,
                        maxSim: sim,
                        sourceKw: b.code,
                        linkedBooks: [{ code: b.code, inBook: inBook }]
                    });
                } else {
                    let existing = topWordsMap.get(pid);
                    if (!existing.linkedBooks.some(lb => lb.code === b.code)) {
                        existing.linkedBooks.push({ code: b.code, inBook: inBook });
                    }
                    if (sim > existing.maxSim) {
                        existing.maxSim = sim;
                        existing.sourceKw = b.code;
                    }
                }
            });
        });

        let wordNodes = Array.from(topWordsMap.values()).map(s => {
            let fullPoint = this.data2d ? (this.data2d.find(d => d.id === s.point.id) || s.point) : s.point;
            let isDirectInAny = s.linkedBooks.some(lb => lb.inBook);
            return {
                id: s.point.id,
                w: s.point.w,
                pos: s.point.pos,
                f: s.point.f,
                t: fullPoint.t || s.point.t,
                sim: s.maxSim,
                sourceKw: s.sourceKw,
                linkedBooks: s.linkedBooks,
                isBookWord: true,
                isDirect: isDirectInAny,
                isKw: false,
                v: fullPoint.v,
                original: fullPoint.original
            };
        });

        let minSim = d3.min(wordNodes, n => n.sim) || 0;
        let maxSim = d3.max(wordNodes, n => n.sim) || 1;
        wordNodes.forEach(n => {
            n.normSim = (n.sim - minSim) / (maxSim - minSim || 1);
        });

        let wordLinks = [];
        wordNodes.forEach(n => {
            n.linkedBooks.forEach(lb => {
                wordLinks.push({
                    source: n.id,
                    target: lb.code,
                    type: lb.inBook ? 'direct' : 'indirect',
                    isDirect: lb.inBook,
                    sim: n.sim
                });
            });
        });

        this.allSearchNodes = [...bookNodes, ...wordNodes];
        this.allSearchLinks = [...bookLinks, ...wordLinks];

        this.renderActiveWords();

        // Start simulation with ONLY books, then spawn words in waves
        this.nodes = [...bookNodes];
        this.links = [...bookLinks];

        let cw = this.logicalWidth || 800;
        let ch = this.logicalHeight || 600;

        this.transform = d3.zoomIdentity.translate(cw / 2, ch / 2).scale(1);
        d3.select(this.canvas).call(this.zoom.transform, this.transform);

        const LCG = d3.randomLcg(42);
        this.simulation = d3.forceSimulation(this.nodes)
            .randomSource(LCG)
            .force("link", d3.forceLink(this.links).id(d => d.id).distance(d => {
                if (d.type === 'book-book') return Math.max(120, (1 - d.sim) * 500);
                if (d.isDirect === false || d.type === 'indirect') return 80 + (1 - (d.sim || 0.8)) * 200;
                return Math.max(35, (1 - (d.sim || 0.8)) * 180);
            }).strength(d => d.type === 'book-book' ? 1.5 : (d.isDirect ? 0.8 : 0.4)))
            .force("charge", d3.forceManyBody().strength(d => d.isBook ? -400 : -65))
            .force("collide", d3.forceCollide().radius(d => d.isBook ? 36 : 14))
            .force("center", d3.forceCenter(0, 0).strength(0.05))
            .on("tick", () => {
                this.updateDynamicZoom();
                this.draw();
            });

        this.pendingNodes = [];
        this.enqueueNodes(wordNodes);

        this.showBookCard(this.selectedBook || foundBooks[0], foundBooks);
    }

    selectBook(bookNode) {
        if (!bookNode) return;
        this.searchedBooks = [bookNode.code];
        this.drawerBooks = [bookNode.code];
        this.searchBooks(true);
    }

    addBook(bookCode) {
        if (!this.searchedBooks) this.searchedBooks = [];
        if (!this.drawerBooks) this.drawerBooks = [];
        if (!this.searchedBooks.includes(bookCode)) {
            this.searchedBooks.push(bookCode);
        }
        if (!this.drawerBooks.includes(bookCode)) {
            this.drawerBooks.push(bookCode);
        }
        this.searchBooks(true);
    }

    removeBook(bookCode) {
        if (!this.searchedBooks) return;
        this.searchedBooks = this.searchedBooks.filter(c => c !== bookCode);
        if (this.searchedBooks.length === 0) {
            this.clearAllKeywords();
        } else {
            this.searchBooks(true);
        }
    }

    resetBooksView() {
        if (this.simulation) this.simulation.stop();
        if (this.spawnInterval) {
            clearInterval(this.spawnInterval);
            this.spawnInterval = null;
        }
        this.searchedBooks = [];
        this.drawerBooks = [];
        this.searchedWords = [];
        this.drawerWords = [];
        this.selectedBook = null;
        this.isSearchMode = false;
        if (this.searchInput) this.searchInput.value = '';
        this.updateClearBtnVisibility();
        this.renderActiveWords();
        this.hideRadialMenu();
        this.hideVersesPanel();
        this.hideBookCard();
        window.history.replaceState(null, '', '?view=books');
        this.buildBooksGraph();
    }

    showBookCard(book, allActiveBooks = null) {
        if (!this.bookCard || !book) return;
        this.selectedBook = book;
        let genreColor = GENRE_COLORS[book.genre] || '#3b82f6';

        if (!allActiveBooks && this.searchedBooks && this.searchedBooks.length > 0) {
            allActiveBooks = this.searchedBooks.map(c => this.booksData ? this.booksData.books.find(b => b.code === c) : null).filter(Boolean);
        }

        let tabsHtml = '';
        if (allActiveBooks && allActiveBooks.length > 1) {
            tabsHtml = `
                <div class="bwm-book-tabs">
                    ${allActiveBooks.map(b => {
                        let activeCls = b.code === book.code ? 'active' : '';
                        let tabColor = GENRE_COLORS[b.genre] || '#3b82f6';
                        let style = (b.code === book.code) ? `background: ${tabColor}; border-color: ${tabColor};` : '';
                        return `<button type="button" class="bwm-book-tab ${activeCls}" data-tab-code="${b.code}" style="${style}"><b>${b.name}</b></button>`;
                    }).join('')}
                </div>
            `;
        }

        let siblingsHtml = (book.nearest_books || []).map(nb => {
            let isAlreadyActive = this.searchedBooks && this.searchedBooks.includes(nb.code);
            return `
                <div class="bwm-book-chip-group">
                    <button type="button" class="bwm-book-chip" data-book-code="${nb.code}" title="View ${nb.name} details">
                        <b>${nb.name}</b> <span style="opacity:0.65;font-size:0.85em;">${Math.round(nb.sim * 100)}%</span>
                    </button>
                    <button type="button" class="bwm-chip-add" data-toggle-book-code="${nb.code}" title="${isAlreadyActive ? 'Remove from map' : 'Add to map'}">
                        ${isAlreadyActive ? '&minus;' : '+'}
                    </button>
                </div>
            `;
        }).join('');

        let topWordsHtml = (book.top_words || []).slice(0, 12).map(tw => {
            let posColor = '#94a3b8';
            if (tw.pos === 'PROPN') posColor = '#4ade80';
            else if (tw.pos === 'NOUN') posColor = '#60a5fa';
            else if (tw.pos === 'VERB') posColor = '#f472b6';
            else if (tw.pos === 'ADJ' || tw.pos === 'ADV') posColor = '#fbbf24';
            return `<span class="bwm-book-chip" style="border-left: 3px solid ${posColor};" title="TF-IDF Score: ${tw.score}"><b>${this.formatWord(tw.w, tw.pos)}</b> <span style="opacity:0.5;font-size:0.8em;">(${tw.pos.toLowerCase()})</span></span>`;
        }).join('');

        this.bookCard.innerHTML = `
            ${tabsHtml}
            <div class="bwm-book-card-header">
                <div>
                    <span class="bwm-book-badge" style="background: ${genreColor};">${book.genre}</span>
                    <span style="font-size: 0.8em; opacity: 0.65; margin-left: 6px;">${book.testament === 'OT' ? 'Old Testament' : 'New Testament'}</span>
                    <h3 class="bwm-book-card-title">${book.name}</h3>
                    <div style="font-size: 0.82em; opacity: 0.7; margin-top: 2px;">${book.verses.toLocaleString()} verses &bull; ${book.total_words.toLocaleString()} words</div>
                </div>
                <button type="button" class="bwm-book-card-close" id="bwm-book-card-close" title="Show All Books">&times;</button>
            </div>
            <div class="bwm-book-card-body">
                <div>
                    <div style="font-size: 0.85em; font-weight: 600; opacity: 0.85; margin-bottom: 4px;">Closest Theological Siblings:</div>
                    <div class="bwm-book-chip-list">
                        ${siblingsHtml}
                    </div>
                </div>
                <div>
                    <div style="font-size: 0.85em; font-weight: 600; opacity: 0.85; margin-bottom: 4px;">Top Distinctive Themes:</div>
                    <div class="bwm-book-chip-list">
                        ${topWordsHtml}
                    </div>
                </div>
                <div style="font-size: 0.75em; opacity: 0.55; text-align: center; margin-top: 4px; font-style: italic;">
                    Click canvas background or &times; to show all books
                </div>
            </div>
        `;

        this.bookCard.classList.add('visible');

        let closeBtn = this.bookCard.querySelector('#bwm-book-card-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.resetBooksView();
            });
        }

        // Tab click listeners
        let tabBtns = this.bookCard.querySelectorAll('button[data-tab-code]');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                let code = btn.getAttribute('data-tab-code');
                let target = this.booksData.books.find(b => b.code === code);
                if (target) {
                    this.showBookCard(target, allActiveBooks);
                }
            });
        });

        // Sibling name click listener -> switch / focus that book
        let chipBtns = this.bookCard.querySelectorAll('button[data-book-code]');
        chipBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                let targetCode = btn.getAttribute('data-book-code');
                let targetBook = this.booksData.books.find(b => b.code === targetCode);
                if (targetBook) {
                    this.selectBook(targetBook);
                }
            });
        });

        // Add/remove sibling toggle click listener -> adds/removes book to/from map
        let toggleBtns = this.bookCard.querySelectorAll('button[data-toggle-book-code]');
        toggleBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                let code = btn.getAttribute('data-toggle-book-code');
                if (this.searchedBooks && this.searchedBooks.includes(code)) {
                    this.removeBook(code);
                } else {
                    this.addBook(code);
                }
            });
        });
    }

    hideBookCard() {
        if (this.bookCard) {
            this.bookCard.classList.remove('visible');
            this.bookCard.innerHTML = '';
        }
    }

    matchesTestament(t) {
        if (!this.testamentFilter || this.testamentFilter === 'all') return true;
        if (this.testamentFilter === 'ot') return t === 'OT' || t === 'Both';
        if (this.testamentFilter === 'nt') return t === 'NT' || t === 'Both';
        if (this.testamentFilter === 'both') return t === 'Both';
        return true;
    }

    draw() {
        if (!this.ctx || (!this.data2d && !this.booksData)) return;
        this.updateColors();
        
        let cw = this.logicalWidth;
        let ch = this.logicalHeight;
        
        this.ctx.clearRect(0, 0, cw, ch);
        this.ctx.fillStyle = this.colors.bg;
        this.ctx.fillRect(0, 0, cw, ch);
        
        let minX = this.transform.invertX(0);
        let maxX = this.transform.invertX(cw);
        let minY = this.transform.invertY(0);
        let maxY = this.transform.invertY(ch);
        
        let visibleNodesCount = 0;
        this.nodes.forEach(n => {
            if (n.x >= minX && n.x <= maxX && n.y >= minY && n.y <= maxY) {
                if (this.matchesTestament(n.t || n.testament)) {
                    visibleNodesCount++;
                }
            }
        });
        let autoShowLabels = visibleNodesCount < 250;
        
        this.ctx.save();
        this.ctx.translate(this.transform.x, this.transform.y);
        this.ctx.scale(this.transform.k, this.transform.k);
        
        // Pre-calculate radii for all nodes so we can clip lines to their edges
        this.nodes.forEach(n => {
            let pixelR = 3;
            if (n.isBook) {
                pixelR = n.isFocusedBook ? 32 : Math.max(14, Math.min(26, Math.sqrt(n.verses) * 0.75));
            } else if (n.isKw) {
                pixelR = 12;
            } else if (n.isBookWord) {
                pixelR = Math.max(4, Math.min(10, Math.sqrt(n.f || 1) * 0.8));
            } else if (this.isSearchMode) {
                let alpha = (n.normSim !== undefined && !isNaN(n.normSim)) ? n.normSim : 0.2;
                pixelR = 3 + (alpha * 7);
            } else {
                pixelR = Math.max(1.5, Math.min(8, Math.log(n.f || 3) * 1.2));
            }
            
            n.canvasR = pixelR / this.transform.k;
        });
        
        this.links.forEach(l => {
            if (l.source.x === undefined || l.target.x === undefined) return;
            
            let matchSource = this.matchesTestament(l.source.t || l.source.testament);
            let matchTarget = this.matchesTestament(l.target.t || l.target.testament);
            
            let isDirect = l.type === 'direct' || l.isDirect === true;
            let isDashed = false;
            
            if (l.type === 'book-book') {
                this.ctx.strokeStyle = this.colors.linkIndir;
                this.ctx.lineWidth = 1.2 / this.transform.k;
                this.ctx.globalAlpha = 0.25;
            } else if (this.viewMode === 'books') {
                if (isDirect) {
                    this.ctx.strokeStyle = this.colors.linkDir;
                    this.ctx.lineWidth = 1.4 / this.transform.k;
                    this.ctx.globalAlpha = 0.55;
                } else {
                    this.ctx.strokeStyle = this.colors.linkIndir;
                    this.ctx.lineWidth = 1.0 / this.transform.k;
                    this.ctx.globalAlpha = 0.28;
                    isDashed = true;
                }
            } else if (this.isSearchMode && !l.source.isKw) {
                let alpha = (l.source.normSim !== undefined && !isNaN(l.source.normSim)) ? l.source.normSim : 0.2;
                this.ctx.globalAlpha = Math.max(0.25, alpha * 0.8 + 0.2); // Range from 0.25 to 1.0
                this.ctx.strokeStyle = l.type === 'direct' ? this.colors.linkDir : this.colors.linkIndir;
                this.ctx.lineWidth = l.type === 'direct' ? 1.5 / this.transform.k : 1 / this.transform.k;
            } else {
                this.ctx.globalAlpha = 1.0;
                this.ctx.strokeStyle = l.type === 'direct' ? this.colors.linkDir : this.colors.linkIndir;
                this.ctx.lineWidth = l.type === 'direct' ? 1.5 / this.transform.k : 1 / this.transform.k;
            }
            
            if (!matchSource || !matchTarget) {
                this.ctx.globalAlpha = Math.min(this.ctx.globalAlpha, 0.05);
            }
            
            let dx = l.target.x - l.source.x;
            let dy = l.target.y - l.source.y;
            let dist = Math.sqrt(dx*dx + dy*dy);
            
            this.ctx.beginPath();
            
            if (dist > (l.source.canvasR + l.target.canvasR)) {
                let startX = l.source.x + (dx / dist) * l.source.canvasR;
                let startY = l.source.y + (dy / dist) * l.source.canvasR;
                let endX = l.target.x - (dx / dist) * l.target.canvasR;
                let endY = l.target.y - (dy / dist) * l.target.canvasR;
                this.ctx.moveTo(startX, startY);
                this.ctx.lineTo(endX, endY);
            } else {
                this.ctx.moveTo(l.source.x, l.source.y);
                this.ctx.lineTo(l.target.x, l.target.y);
            }
            
            if (isDashed) {
                this.ctx.setLineDash([4 / this.transform.k, 4 / this.transform.k]);
            } else {
                this.ctx.setLineDash([]);
            }
            this.ctx.stroke();
            this.ctx.setLineDash([]);
        });
        this.ctx.globalAlpha = 1.0;
        
        let kwWordCounts = {};
        let nodeWordCounts = {};
        this.nodes.forEach(n => {
            let baseW = (n.w || '').toLowerCase();
            if (n.isKw) {
                kwWordCounts[baseW] = (kwWordCounts[baseW] || 0) + 1;
            }
            nodeWordCounts[baseW] = (nodeWordCounts[baseW] || 0) + 1;
        });

        this.nodes.forEach(n => {
            let matchesT = this.matchesTestament(n.t || n.testament) || this.hoveredNode === n || n.isFocusedBook;
            
            this.ctx.beginPath();
            
            let posColor = '#94a3b8'; // default slate-400
            if (n.isBook) {
                posColor = GENRE_COLORS[n.genre] || '#3b82f6';
            } else if (n.pos === 'NOUN') posColor = '#3b82f6'; // blue-500
            else if (n.pos === 'VERB') posColor = '#ef4444'; // red-500
            else if (n.pos === 'PROPN') posColor = '#10b981'; // emerald-500
            else if (n.pos === 'ADJ') posColor = '#8b5cf6'; // violet-500
            else if (n.pos === 'ADV') posColor = '#ec4899'; // pink-500
            else if (n.pos === 'PRON') posColor = '#14b8a6'; // teal-500
            else if (n.pos === 'NUM') posColor = '#f59e0b'; // amber-500

            this.ctx.fillStyle = posColor;
            
            if (n.isBook) {
                this.ctx.globalAlpha = matchesT ? 1.0 : 0.08;
            } else if (this.isSearchMode && !n.isKw) {
                let alpha = (n.normSim !== undefined && !isNaN(n.normSim)) ? n.normSim : 0.2;
                this.ctx.globalAlpha = Math.max(0.4, alpha);
            } else {
                this.ctx.globalAlpha = 1.0;
            }
            
            if (!matchesT) {
                this.ctx.globalAlpha = Math.min(this.ctx.globalAlpha, 0.06);
            }
            
            let drawR = n.canvasR;
            if (this.hoveredNode === n) {
                drawR = n.canvasR * (n.isBook ? 1.2 : 1.4);
                this.ctx.shadowBlur = (n.isBook ? 16 : 12) / this.transform.k;
                this.ctx.shadowColor = posColor;
            } else {
                this.ctx.shadowBlur = 0;
            }
            
            if (!matchesT) {
                drawR = drawR * 0.75;
            }
            
            this.ctx.arc(n.x, n.y, drawR, 0, 2 * Math.PI);
            this.ctx.fill();
            
            if (n.isBook) {
                this.ctx.lineWidth = (n.isFocusedBook ? 3.5 : 2) / this.transform.k;
                this.ctx.strokeStyle = n.isFocusedBook ? '#ffffff' : (this.hoveredNode === n ? this.colors.text : 'rgba(255,255,255,0.6)');
                this.ctx.stroke();
            } else if (n.isKw) {
                this.ctx.lineWidth = 3 / this.transform.k;
                this.ctx.strokeStyle = this.colors.text;
                this.ctx.stroke();
            }
            
            this.ctx.globalAlpha = 1.0;
            
            let showLabel = n.isBook || (matchesT && (this.isSearchMode || n.isKw || autoShowLabels || n.isBookWord));
            if (showLabel) {
                this.ctx.shadowBlur = 0;
                
                this.ctx.save();
                this.ctx.translate(n.x, n.y);
                this.ctx.scale(1 / this.transform.k, 1 / this.transform.k);
                
                if (n.isBook) {
                    let fontSize = n.isFocusedBook ? 15 : 12;
                    this.ctx.font = `bold ${fontSize}px ${this.colors.font}`;
                    this.ctx.textAlign = "center";
                    this.ctx.textBaseline = "top";
                    let currentR = (this.hoveredNode === n) ? n.canvasR * 1.2 : n.canvasR;
                    let yOffset = (currentR * this.transform.k) + 3;
                    
                    this.ctx.lineWidth = 3.5;
                    this.ctx.strokeStyle = this.colors.bg;
                    this.ctx.strokeText(n.name, 0, yOffset);
                    
                    this.ctx.fillStyle = this.colors.text;
                    this.ctx.fillText(n.name, 0, yOffset);
                    
                    let subFontSize = 9;
                    this.ctx.font = `${subFontSize}px ${this.colors.font}`;
                    let subOffset = yOffset + fontSize + 2;
                    this.ctx.lineWidth = 2.5;
                    this.ctx.strokeStyle = this.colors.bg;
                    this.ctx.strokeText(n.genre, 0, subOffset);
                    this.ctx.fillStyle = this.colors.textMuted || '#888888';
                    this.ctx.fillText(n.genre, 0, subOffset);
                } else {
                    let fontSize = n.isKw ? 14 : 11;
                    this.ctx.font = `${fontSize}px ${this.colors.font}`;
                    this.ctx.textAlign = "center";
                    this.ctx.textBaseline = "top";
                    let currentR = (this.hoveredNode === n) ? n.canvasR * 1.4 : n.canvasR;
                    let yOffset = (currentR * this.transform.k) + 2;
                    
                    // Draw a solid halo background for the text to improve readability over layered lines/dots
                    this.ctx.lineWidth = 3;
                    this.ctx.strokeStyle = this.colors.bg;
                    let displayW = this.formatWord(n.w, n.pos);
                    this.ctx.strokeText(displayW, 0, yOffset);
                    
                    this.ctx.fillStyle = this.colors.text;
                    this.ctx.fillText(displayW, 0, yOffset);
                    
                    // If there are multiple keywords or active nodes with the same word, show POS underneath
                    let hasDuplicate = (n.isKw && kwWordCounts[n.w.toLowerCase()] > 1) || (this.isSearchMode && nodeWordCounts[n.w.toLowerCase()] > 1);
                    if (hasDuplicate && n.pos) {
                        let posText = `(${n.pos.toLowerCase()})`;
                        let posFontSize = n.isKw ? 11 : 9;
                        this.ctx.font = `${posFontSize}px ${this.colors.font}`;
                        let posOffset = yOffset + fontSize + 1;
                        
                        this.ctx.lineWidth = 2.5;
                        this.ctx.strokeStyle = this.colors.bg;
                        this.ctx.strokeText(posText, 0, posOffset);
                        
                        this.ctx.fillStyle = this.colors.nodeDef || '#888888';
                        this.ctx.fillText(posText, 0, posOffset);
                    }
                }
                
                this.ctx.restore();
            }
        });
        
        this.ctx.restore();
    }

    handleMouseMove(e) {
        if (!this.nodes || this.nodes.length === 0) return;
        
        // Ignore synthesized mouse events within 1000ms of a touch interaction
        if (this.lastTouchEndTime && Date.now() - this.lastTouchEndTime < 1000) return;
        if (this.lastTouchStartTime && Date.now() - this.lastTouchStartTime < 1000) return;
        
        if (this.isTouch) {
            // Ignore synthesized mouse moves. If it's a real mouse (moved >20px from last touch), revert to mouse mode.
            if (this.lastTouchX !== undefined) {
                let dx = e.clientX - this.lastTouchX;
                let dy = e.clientY - this.lastTouchY;
                if (Math.abs(dx) > 20 || Math.abs(dy) > 20) {
                    this.isTouch = false;
                } else {
                    return;
                }
            } else {
                return;
            }
        }
        
        let rect = this.canvas.getBoundingClientRect();
        let mouseX = e.clientX - rect.left;
        let mouseY = e.clientY - rect.top;
        
        let [logicalX, logicalY] = this.transform.invert([mouseX, mouseY]);
        
        let closestNode = null;
        let minDist = Infinity;
        let searchRadius = 20 / this.transform.k;
        
        for (let n of this.nodes) {
            let dx = n.x - logicalX;
            let dy = n.y - logicalY;
            let dist = Math.sqrt(dx*dx + dy*dy);
            let effectiveRadius = n.canvasR ? Math.max(searchRadius, n.canvasR * 1.3) : searchRadius;
            if (dist < effectiveRadius && dist < minDist) {
                minDist = dist;
                closestNode = n;
            }
        }
        
        if (closestNode) {
            if (this.hoveredNode !== closestNode) {
                this.hoveredNode = closestNode;
                this.canvas.style.cursor = "pointer";
                this.draw();
            }
        } else if (!this.radialMenuNode) {
            if (this.hoveredNode) {
                this.hoveredNode = null;
                this.canvas.style.cursor = "grab";
                this.draw();
            }
        }
    }

    handleClick(e) {
        if (this.ignoreNextClick) {
            this.ignoreNextClick = false;
            return;
        }
        if (this.isTouch && this.touchCloseTooltip) {
            this.touchCloseTooltip = false;
            return;
        }

        let rect = this.canvas.getBoundingClientRect();
        let mouseX = e.clientX - rect.left;
        let mouseY = e.clientY - rect.top;

        if (this.viewMode === 'books') {
            if (this.hoveredNode) {
                if (this.hoveredNode.isBook) {
                    if (e.shiftKey) {
                        this.addBook(this.hoveredNode.code);
                    } else if (this.isSearchMode && this.searchedBooks && this.searchedBooks.length > 0) {
                        if (this.radialMenuNode === this.hoveredNode) {
                            this.hideRadialMenu();
                        } else {
                            this.showRadialMenu(this.hoveredNode, mouseX, mouseY);
                        }
                    } else {
                        this.selectBook(this.hoveredNode);
                    }
                } else if (this.hoveredNode.isBookWord) {
                    if (this.radialMenuNode === this.hoveredNode) {
                        this.hideRadialMenu();
                    } else {
                        this.showRadialMenu(this.hoveredNode, mouseX, mouseY);
                    }
                }
            } else {
                this.hideRadialMenu();
                this.hideVersesPanel();
                if (this.isSearchMode || this.selectedBook || (this.searchedBooks && this.searchedBooks.length > 0)) {
                    this.resetBooksView();
                }
            }
            return;
        }

        if (this.hoveredNode) {
            if (this.radialMenuNode === this.hoveredNode) {
                this.hideRadialMenu();
            } else {
                this.showRadialMenu(this.hoveredNode, mouseX, mouseY);
            }
        } else {
            this.hideRadialMenu();
            this.hideVersesPanel();
        }
    }

    showRadialMenu(node, mouseX, mouseY) {
        this.hideRadialMenu();
        this.hideVersesPanel();
        this.radialMenuNode = node;
        this.hoveredNode = node;
        this.draw();
        
        // Compute screen position of the node center, offset by canvas position within container
        let [rawX, rawY] = this.transform.apply([node.x, node.y]);
        let canvasRect = this.canvas.parentElement.getBoundingClientRect();
        let containerRect = this.querySelector('.bwm-container').getBoundingClientRect();
        let offsetX = canvasRect.left - containerRect.left;
        let offsetY = canvasRect.top - containerRect.top;
        let screenX = rawX + offsetX;
        let screenY = rawY + offsetY;
        
        let isAlreadyKw = this.isSearchMode && this.searchedWords && this.searchedWords.includes(node.id);
        let menuItems = [];
        
        if (this.viewMode === 'books') {
            if (node.isBook) {
                let isAlreadyActive = this.searchedBooks && this.searchedBooks.includes(node.code);
                if (isAlreadyActive && this.searchedBooks.length > 1) {
                    menuItems.push({
                        icon: '&minus;',
                        label: 'Remove book from map',
                        action: () => {
                            this.hideRadialMenu();
                            this.removeBook(node.code);
                        }
                    });
                } else if (!isAlreadyActive) {
                    menuItems.push({
                        icon: '+',
                        label: 'Add book to map',
                        action: () => {
                            this.hideRadialMenu();
                            this.addBook(node.code);
                        }
                    });
                }
                menuItems.push({
                    icon: '&#128196;',
                    label: 'Show Info',
                    action: () => {
                        this.hideRadialMenu();
                        let activeBooks = (this.searchedBooks && this.searchedBooks.length > 0)
                            ? this.searchedBooks.map(c => this.booksData ? this.booksData.books.find(b => b.code === c) : null).filter(Boolean)
                            : [node];
                        this.showBookCard(node, activeBooks);
                    }
                });
                menuItems.push({
                    icon: '&#128269;',
                    label: 'Focus this book only',
                    action: () => {
                        this.hideRadialMenu();
                        this.selectBook(node);
                    }
                });
            } else {
                menuItems.push({
                    icon: '&#128269;',
                    label: 'Explore on Word Map',
                    action: () => {
                        this.hideRadialMenu();
                        const wordsBtn = document.getElementById('view-mode-words');
                        const booksBtn = document.getElementById('view-mode-books');
                        if (wordsBtn && booksBtn) {
                            wordsBtn.classList.add('active');
                            booksBtn.classList.remove('active');
                        }
                        this.setViewMode('words');
                        if (this.searchInput) this.searchInput.value = this.formatWord(node.w, node.pos);
                        this.searchWord();
                    }
                });
                menuItems.push({ icon: '\u{1F4D6}', label: 'Verses', action: () => { this.hideRadialMenu(); this.showVersesPanel(node, screenX, screenY); } });
                if (node.original && node.original.length > 0) {
                    menuItems.push({ icon: '<span style="font-size:0.7em;font-weight:bold;">α/א</span>', label: 'Original Language', action: () => { this.hideRadialMenu(); this.showOriginalLangPanel(node, screenX, screenY); } });
                }
            }
        } else {
            if (isAlreadyKw) {
                menuItems.push({ icon: '-', label: 'Remove keyword', action: () => { this.hideRadialMenu(); this.removeKeyword(node.id); } });
            } else {
                menuItems.push({ icon: '+', label: 'Add keyword', action: () => { this.hideRadialMenu(); this.addKeyword(node.id); } });
            }
            menuItems.push({ icon: '\u{1F4D6}', label: 'Verses', action: () => { this.hideRadialMenu(); this.showVersesPanel(node, screenX, screenY); } });
            if (node.original && node.original.length > 0) {
                menuItems.push({ icon: '<span style="font-size:0.7em;font-weight:bold;">α/א</span>', label: 'Original Language', action: () => { this.hideRadialMenu(); this.showOriginalLangPanel(node, screenX, screenY); } });
            }
        }
        
        this.radialMenu.innerHTML = '';
        let radius = 45;
        let startAngle = -Math.PI / 2; // start from top
        let angleStep = (2 * Math.PI) / menuItems.length;
        
        menuItems.forEach((item, i) => {
            let angle = startAngle + i * angleStep;
            let ix = screenX + radius * Math.cos(angle) - 18; // 18 = half of 36px item
            let iy = screenY + radius * Math.sin(angle) - 18;
            
            let el = document.createElement('div');
            el.className = 'bwm-radial-item';
            el.style.left = ix + 'px';
            el.style.top = iy + 'px';
            el.innerHTML = `${item.icon}<span class="bwm-radial-label">${item.label}</span>`;
            
            el.addEventListener('click', (e) => {
                e.stopPropagation();
                item.action();
            });
            el.addEventListener('touchstart', (e) => {
                e.stopPropagation();
            }, {passive: true});
            
            this.radialMenu.appendChild(el);
            
            // Trigger the scale-in animation
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    el.classList.add('visible');
                });
            });
        });
    }
    
    hideRadialMenu() {
        this.radialMenuNode = null;
        this.radialMenu.innerHTML = '';
        this.tooltip.style.opacity = '0';
        this.tooltip.style.pointerEvents = 'none';
        this.draw();
    }

    hideVersesPanel() {
        this.versesPanel.classList.remove('visible');
        this.versesPanel.innerHTML = '';
    }

    showVersesPanel(node, anchorX, anchorY) {
        let displayW = this.formatWord(node.w, node.pos);
        
        let headerHtml = `<div class="bwm-verses-header">`;
        headerHtml += `<div class="bwm-verses-title">`;
        headerHtml += `<div><b style="font-size:1.05em;">${displayW}</b>`;
        if (node.pos) headerHtml += ` <span style="font-size:0.8em; opacity:0.6;">(${node.pos.toLowerCase()})</span>`;
        headerHtml += `</div><span class="bwm-verses-close" id="bwm-verses-close">&times;</span>`;
        headerHtml += `</div>`;
        
        let tabsData = [];
        let myVerses = this.wordToVerses ? (this.wordToVerses[node.id] || []) : [];
        
        if (this.viewMode === 'books') {
            let activeBooks = (this.searchedBooks && this.searchedBooks.length > 0)
                ? this.searchedBooks.map(c => this.booksData ? this.booksData.books.find(b => b.code === c) : null).filter(Boolean)
                : (this.selectedBook ? [this.selectedBook] : []);

            let anyBookHasDirectVerses = false;
            activeBooks.forEach(book => {
                let bookVerses = this.getBookVerses(node.id, book.code);
                if (bookVerses.length > 0) {
                    anyBookHasDirectVerses = true;
                    tabsData.push({
                        id: 'book_' + book.code,
                        title: book.name,
                        verses: bookVerses,
                        isBookTab: true
                    });
                }
            });

            if (myVerses.length > 0) {
                tabsData.push({
                    id: 'all_bible_verses',
                    title: 'All Bible Verses',
                    verses: myVerses,
                    isAllTab: true
                });
            }

            if (!anyBookHasDirectVerses && activeBooks.length > 0) {
                let bookNames = activeBooks.map(b => b.name).join(', ');
                headerHtml += `<div style="padding: 4px 14px; font-size: 0.82em; color: var(--bwm-node-hover); font-style: italic;">Does not appear directly in ${bookNames} (semantic relationship)</div>`;
            }
        } else if (this.isSearchMode && this.wordToVerses && this.verses) {
            this.searchedWords.forEach(sw => {
                if (sw === node.id) return;
                let swVerses = this.wordToVerses[sw] || [];
                let intersection = myVerses.filter(v => swVerses.includes(v));
                if (intersection.length > 0) {
                    let kwNode = this.nodes.find(n => n.id === sw);
                    let sim = kwNode ? this.cosineSimilarity(node.v, kwNode.v) : 0;
                    
                    let parts = sw.split('_');
                    let formattedSw = parts.length > 1 ? this.formatWord(parts[0], parts[1]) : parts[0];
                    if (parts.length > 1) formattedSw += ` (${parts[1].toLowerCase()})`;
                    
                    tabsData.push({
                        id: sw,
                        title: formattedSw,
                        verses: intersection,
                        sim: sim
                    });
                }
            });
            // Sort by semantic similarity (highest first)
            tabsData.sort((a, b) => b.sim - a.sim);
        }
        
        if (tabsData.length > 0) {
            headerHtml += `<div class="bwm-verses-tabs">`;
            tabsData.forEach((t, i) => {
                headerHtml += `<div class="bwm-verses-tab ${i === 0 ? 'active' : ''}" data-tab-id="${t.id}">${t.title} <span style="font-size:0.8em; opacity:0.65;">(${t.verses.length})</span></div>`;
            });
            headerHtml += `</div>`;
        }
        headerHtml += `</div>`; // end header
        
        let contentHtml = `<div class="bwm-verses-content">`;
        
        const BATCH_SIZE = 30;
        let tabsState = {};

        const buildVerseItemHtml = (id) => {
            let v = this.verses[id] || '';
            let [ref, text] = v.split('|');
            return `<div style="margin: 4px 0; padding: 4px 0; border-bottom: 1px solid var(--bwm-border);"><span style="color:var(--bwm-tooltip-link); font-family: monospace; font-weight:600;">${ref}</span><br><span style="font-size:0.85em; opacity:0.85;">${text || ''}</span></div>`;
        };

        const renderInitialBatch = (tabId, vList) => {
            tabsState[tabId] = {
                verses: vList,
                loaded: Math.min(BATCH_SIZE, vList.length)
            };
            let initialVerses = vList.slice(0, BATCH_SIZE);
            let html = initialVerses.map(buildVerseItemHtml).join('');
            if (vList.length > BATCH_SIZE) {
                html += `<div class="bwm-verses-status" style="text-align:center; font-size:0.8em; opacity:0.6; padding:8px 0; font-style:italic;">Showing ${BATCH_SIZE} of ${vList.length} verses (scroll for more)</div>`;
            }
            return html;
        };
        
        if (tabsData.length > 0) {
            tabsData.forEach((t, i) => {
                contentHtml += `<div class="bwm-verses-tab-content" id="bwm-tab-content-${t.id}" style="display: ${i === 0 ? 'block' : 'none'};">`;
                contentHtml += renderInitialBatch(t.id, t.verses);
                contentHtml += `</div>`;
            });
        } else {
            if (myVerses.length > 0) {
                contentHtml += `<div style="margin-bottom: 8px;"><b style="font-size:0.95em;">Appears in (${myVerses.length} verses):</b></div>`;
                contentHtml += `<div class="bwm-verses-tab-content" id="bwm-tab-content-main">`;
                contentHtml += renderInitialBatch('main', myVerses);
                contentHtml += `</div>`;
            } else {
                contentHtml += `<div style="font-style: italic; opacity: 0.6;">No verse data available</div>`;
            }
        }
        contentHtml += `</div>`; // end content
        
        this.versesPanel.innerHTML = headerHtml + contentHtml;
        
        const loadMoreVerses = (tabId) => {
            const state = tabsState[tabId];
            if (!state || state.loaded >= state.verses.length) return;
            const container = this.versesPanel.querySelector(`#bwm-tab-content-${tabId}`);
            if (!container) return;

            const nextBatch = state.verses.slice(state.loaded, state.loaded + BATCH_SIZE);
            state.loaded += nextBatch.length;

            const itemsHtml = nextBatch.map(buildVerseItemHtml).join('');
            const statusEl = container.querySelector('.bwm-verses-status');
            if (statusEl) {
                statusEl.insertAdjacentHTML('beforebegin', itemsHtml);
                if (state.loaded >= state.verses.length) {
                    statusEl.remove();
                } else {
                    statusEl.textContent = `Showing ${state.loaded} of ${state.verses.length} verses (scroll for more)`;
                }
            } else {
                container.insertAdjacentHTML('beforeend', itemsHtml);
            }
        };

        const contentEl = this.versesPanel.querySelector('.bwm-verses-content');
        if (contentEl) {
            contentEl.addEventListener('scroll', () => {
                if (contentEl.scrollTop + contentEl.clientHeight >= contentEl.scrollHeight - 60) {
                    let activeTab = this.versesPanel.querySelector('.bwm-verses-tab.active');
                    let currentTabId = activeTab ? activeTab.getAttribute('data-tab-id') : 'main';
                    loadMoreVerses(currentTabId);
                }
            });
        }

        // Setup tabs
        let tabEls = this.versesPanel.querySelectorAll('.bwm-verses-tab');
        tabEls.forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.stopPropagation();
                // Deactivate all
                this.versesPanel.querySelectorAll('.bwm-verses-tab').forEach(t => t.classList.remove('active'));
                this.versesPanel.querySelectorAll('.bwm-verses-tab-content').forEach(c => c.style.display = 'none');
                // Activate clicked
                tab.classList.add('active');
                let tid = tab.getAttribute('data-tab-id');
                let targetEl = this.versesPanel.querySelector(`#bwm-tab-content-${tid}`);
                if (targetEl) targetEl.style.display = 'block';
                
                // reset scroll
                if (contentEl) contentEl.scrollTop = 0;
            });
        });
        
        // Position near anchor
        let containerRect = this.canvas.parentElement.getBoundingClientRect();
        let px = anchorX + 50;
        let py = anchorY - 50;
        if (px + 340 > containerRect.width) px = anchorX - 360;
        if (px < 5) px = 5;
        if (py < 5) py = 5;
        if (py + 300 > containerRect.height) py = containerRect.height - 310;
        
        this.versesPanel.style.left = px + 'px';
        this.versesPanel.style.top = py + 'px';
        this.versesPanel.classList.add('visible');
        
        let closeBtn = this.versesPanel.querySelector('#bwm-verses-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.versesPanel.classList.remove('visible');
                this.versesPanel.innerHTML = '';
            });
        }
    }
    showOriginalLangPanel(node, anchorX, anchorY) {
        let displayW = this.formatWord(node.w, node.pos);
        
        let headerHtml = `<div class="bwm-verses-header">`;
        headerHtml += `<div class="bwm-verses-title">`;
        headerHtml += `<div><b style="font-size:1.05em;">${displayW}</b>`;
        if (node.pos) headerHtml += ` <span style="font-size:0.8em; opacity:0.6;">(${node.pos.toLowerCase()})</span>`;
        headerHtml += `</div><span class="bwm-verses-close" id="bwm-verses-close">&times;</span>`;
        headerHtml += `</div>`;
        
        let tabsData = [];
        if (node.original && node.original.length > 0) {
            node.original.forEach((orig, i) => {
                tabsData.push({
                    id: `orig-${i}`,
                    label: orig.lemma || orig.strongs,
                    isActive: i === 0,
                    data: orig
                });
            });
        }
        
        if (tabsData.length > 1) {
            headerHtml += `<div class="bwm-verses-tabs">`;
            tabsData.forEach(t => {
                let activeCls = t.isActive ? ' active' : '';
                headerHtml += `<div class="bwm-verses-tab${activeCls}" data-target="${t.id}">${t.label}</div>`;
            });
            headerHtml += `</div>`;
        }
        headerHtml += `</div>`; // end header
        
        let contentHtml = `<div class="bwm-verses-content">`;
        if (tabsData.length === 0) {
            contentHtml += `<div style="font-style: italic; opacity: 0.6; padding: 15px;">No original language data available.</div>`;
        } else {
            tabsData.forEach(t => {
                let activeCls = t.isActive ? ' active' : '';
                let orig = t.data;
                contentHtml += `<div class="bwm-verses-pane${activeCls}" id="${t.id}">`;
                
                contentHtml += `<div style="margin-bottom: 15px;">`;
                contentHtml += `<div style="font-size: 1.4em; font-weight: bold; margin-bottom: 5px;">${orig.lemma || orig.strongs}</div>`;
                if (orig.translit) {
                    contentHtml += `<div style="font-size: 1.1em; color: var(--bwm-text-muted); margin-bottom: 5px;">${orig.translit}</div>`;
                }
                contentHtml += `<div style="font-size: 0.9em; margin-bottom: 15px;">
                    <span style="background: var(--bwm-badge-bg); border: 1px solid var(--bwm-border); padding: 2px 6px; border-radius: 4px; font-family: monospace;">${orig.strongs}</span>
                    <span style="opacity: 0.7; margin-left: 10px;">Translated ${orig.count} time${orig.count === 1 ? '' : 's'} as "${node.w}"</span>
                </div>`;
                contentHtml += `</div>`;
                
                if (orig.def) {
                    contentHtml += `<div style="border-top: 1px solid var(--bwm-border); padding-top: 12px; line-height: 1.5;">`;
                    contentHtml += `<strong>Strong's Definition:</strong><br/>`;
                    contentHtml += `<span>${orig.def}</span>`;
                    contentHtml += `</div>`;
                }
                
                contentHtml += `</div>`;
            });
        }
        contentHtml += `</div>`; // end content
        
        this.versesPanel.innerHTML = headerHtml + contentHtml;
        
        let tabEls = this.versesPanel.querySelectorAll('.bwm-verses-tab');
        tabEls.forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.stopPropagation();
                tabEls.forEach(t => t.classList.remove('active'));
                this.versesPanel.querySelectorAll('.bwm-verses-pane').forEach(p => p.classList.remove('active'));
                
                tab.classList.add('active');
                let targetId = tab.getAttribute('data-target');
                let targetPane = this.versesPanel.querySelector(`#${targetId}`);
                if (targetPane) targetPane.classList.add('active');
            });
        });
        
        // Position near anchor
        let containerRect = this.canvas.parentElement.getBoundingClientRect();
        let px = anchorX + 50;
        let py = anchorY - 50;
        if (px + 340 > containerRect.width) px = anchorX - 360;
        if (px < 5) px = 5;
        if (py < 5) py = 5;
        if (py + 300 > containerRect.height) py = containerRect.height - 310;
        if (py < 5) py = 5;
        
        this.versesPanel.style.left = px + 'px';
        this.versesPanel.style.top = py + 'px';
        this.versesPanel.classList.add('visible');
        
        let closeBtn = this.versesPanel.querySelector('#bwm-verses-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.hideVersesPanel();
            });
        }
    }

    startLoadingAnimation(type = 'words') {
        if (!this.loadingCanvas) return;
        this.stopLoadingAnimation();
        
        const canvas = this.loadingCanvas;
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        const width = 280;
        const height = 160;
        
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
        
        const cx = width / 2;
        const cy = height / 2;
        
        const isBooks = (type === 'books' || this.viewMode === 'books');

        // Colors matching the Part-of-Speech or Book Genre palette
        const wordsColors = ['#4ade80', '#60a5fa', '#f472b6', '#fbbf24', '#94a3b8'];
        const booksColors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#ef4444', '#06b6d4', '#e11d48'];
        const colors = isBooks ? booksColors : wordsColors;
        const numParticles = 36;
        const particles = [];
        
        for (let i = 0; i < numParticles; i++) {
            const angle = Math.random() * Math.PI * 2;
            const dist = Math.random() * 60 + 15;
            particles.push({
                x: cx + Math.cos(angle) * dist,
                y: cy + Math.sin(angle) * dist,
                vx: (Math.random() - 0.5) * 1.1,
                vy: (Math.random() - 0.5) * 1.1,
                radius: Math.random() * 2 + 2.2,
                color: colors[i % colors.length]
            });
        }
        
        const wordsTips = [
            "Search any word in the Bible",
            "Select a word bubble to learn more",
            "Explore original Greek & Hebrew definitions",
            "View verse links and semantic proximity",
            "Filter by Old or New Testament in Options drawer"
        ];
        const booksTips = [
            "Explore the 66 biblical books in semantic space",
            "Click any book to view its distinctive themes and vocabulary",
            "Search multiple books to compare theology (e.g. James Proverbs)",
            "Solid green links show direct occurrences in that book",
            "Dashed gray links show broader theological concepts",
            "Filter books by genre or testament in the Options drawer"
        ];
        const tips = isBooks ? booksTips : wordsTips;
        let tipIdx = 0;
        
        const STATE_FLOAT = 0;
        const STATE_GRAVITATE = 1;
        const STATE_SHOW_TIP = 2;
        const STATE_EXPLODE = 3;
        
        let state = STATE_FLOAT;
        let stateStartTime = performance.now();
        
        const updateTipText = () => {
            if (this.loadingTip) {
                this.loadingTip.textContent = tips[tipIdx % tips.length];
                tipIdx++;
            }
        };
        updateTipText();
        
        const animate = (now) => {
            const elapsed = now - stateStartTime;
            ctx.clearRect(0, 0, width, height);
            
            if (state === STATE_FLOAT) {
                if (this.loadingTip) this.loadingTip.classList.remove('visible');
                // Floating ambient motion
                for (let p of particles) {
                    p.x += p.vx;
                    p.y += p.vy;
                    if (p.x < 10) { p.x = 10; p.vx *= -1; }
                    if (p.x > width - 10) { p.x = width - 10; p.vx *= -1; }
                    if (p.y < 10) { p.y = 10; p.vy *= -1; }
                    if (p.y > height - 10) { p.y = height - 10; p.vy *= -1; }
                }
                
                if (elapsed > 3000) {
                    state = STATE_GRAVITATE;
                    stateStartTime = now;
                }
            } else if (state === STATE_GRAVITATE) {
                // Accelerate towards center
                for (let p of particles) {
                    const dx = cx - p.x;
                    const dy = cy - p.y;
                    p.vx += dx * 0.045;
                    p.vy += dy * 0.045;
                    p.vx *= 0.86;
                    p.vy *= 0.86;
                    p.x += p.vx;
                    p.y += p.vy;
                }
                
                if (elapsed > 900) {
                    state = STATE_SHOW_TIP;
                    stateStartTime = now;
                    if (this.loadingTip) this.loadingTip.classList.add('visible');
                }
            } else if (state === STATE_SHOW_TIP) {
                // Gentle clustering & orbiting around center
                const t = (now - stateStartTime) * 0.003;
                for (let i = 0; i < particles.length; i++) {
                    const p = particles[i];
                    const targetAngle = (i / particles.length) * Math.PI * 2 + t;
                    const targetDist = 18 + Math.sin(t * 2 + i) * 10;
                    const targetX = cx + Math.cos(targetAngle) * targetDist;
                    const targetY = cy + Math.sin(targetAngle) * targetDist;
                    
                    p.x += (targetX - p.x) * 0.08;
                    p.y += (targetY - p.y) * 0.08;
                }
                
                if (elapsed > 3000) {
                    state = STATE_EXPLODE;
                    stateStartTime = now;
                    if (this.loadingTip) this.loadingTip.classList.remove('visible');
                    // Explode outwards
                    for (let p of particles) {
                        const angle = Math.atan2(p.y - cy, p.x - cx) + (Math.random() - 0.5) * 0.6;
                        const speed = Math.random() * 3.5 + 3;
                        p.vx = Math.cos(angle) * speed;
                        p.vy = Math.sin(angle) * speed;
                    }
                }
            } else if (state === STATE_EXPLODE) {
                // Bursting outwards with drag
                for (let p of particles) {
                    p.vx *= 0.93;
                    p.vy *= 0.93;
                    p.x += p.vx;
                    p.y += p.vy;
                    if (p.x < 10) { p.x = 10; p.vx *= -1; }
                    if (p.x > width - 10) { p.x = width - 10; p.vx *= -1; }
                    if (p.y < 10) { p.y = 10; p.vy *= -1; }
                    if (p.y > height - 10) { p.y = height - 10; p.vy *= -1; }
                }
                
                if (elapsed > 700) {
                    state = STATE_FLOAT;
                    stateStartTime = now;
                    updateTipText();
                    for (let p of particles) {
                        p.vx = (Math.random() - 0.5) * 1.1;
                        p.vy = (Math.random() - 0.5) * 1.1;
                    }
                }
            }
            
            // Draw connecting lines between close particles
            const maxDist = state === STATE_GRAVITATE || state === STATE_SHOW_TIP ? 40 : 55;
            ctx.lineWidth = 1;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const p1 = particles[i];
                    const p2 = particles[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < maxDist) {
                        const alpha = (1 - dist / maxDist) * 0.35;
                        ctx.strokeStyle = `rgba(150, 150, 150, ${alpha})`;
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }
            
            // Draw particles
            for (let p of particles) {
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fill();
            }
            
            this.loadingAnimId = requestAnimationFrame(animate);
        };
        
        this.loadingAnimId = requestAnimationFrame(animate);
    }

    stopLoadingAnimation() {
        if (this.loadingAnimId) {
            cancelAnimationFrame(this.loadingAnimId);
            this.loadingAnimId = null;
        }
        if (this.loadingCanvas) {
            const ctx = this.loadingCanvas.getContext('2d');
            ctx.clearRect(0, 0, this.loadingCanvas.width, this.loadingCanvas.height);
        }
        if (this.loadingTip) {
            this.loadingTip.classList.remove('visible');
        }
    }
}

customElements.define('bible-word-map', BibleWordMap);
