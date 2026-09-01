class BibleWordMap extends HTMLElement {
    constructor() {
        super();
        this.data2d = null;
        this.verses = null;
        this.wordToVerses = null;
        this.testamentFilter = 'All';
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
                .bwm-drawer {
                    position: absolute;
                    top: 0;
                    right: -320px;
                    width: 300px;
                    height: 100%;
                    background-color: rgba(255, 255, 255, 0.85); /* fallback for older browsers */
                    background-color: color-mix(in srgb, var(--bwm-bg) 85%, transparent);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border-left: 1px solid var(--bwm-border);
                    box-shadow: -4px 0 15px rgba(0,0,0,0.1);
                    z-index: 1000;
                    transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    display: flex;
                    flex-direction: column;
                }
                .bwm-drawer.open {
                    right: 0;
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
                                <h4>Active Words</h4>
                                <button class="bwm-btn-clear-all" id="bwm-btn-clear-all" type="button" title="Clear all active keywords">Clear All</button>
                            </div>
                            <div id="bwm-active-words">
                                <div class="bwm-empty-state">No words selected.</div>
                            </div>
                        </div>
                        <div class="bwm-drawer-section">
                            <div class="bwm-drawer-section-header">
                                <h4>Relationships per Word</h4>
                            </div>
                            <div class="bwm-slider-container">
                                <input type="range" id="bwm-neighbor-slider" min="10" max="250" step="5" value="100">
                                <span class="bwm-slider-value" id="bwm-neighbor-value">100</span>
                            </div>
                            <div class="bwm-drawer-hint">Controls how many related words appear around each keyword.</div>
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
                            <span>Loading Bible Word Map...</span>
                        </div>
                    </div>
                </div>
                <div class="bwm-radial-menu" id="bwm-radial-menu"></div>
                <div class="bwm-verses-panel" id="bwm-verses-panel"></div>
            </div>
        `;
    }

    connectedCallback() {
        this.src2d = this.getAttribute('src-2d');
        this.srcVerses = this.getAttribute('src-verses');
        
        this.canvas = this.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.tooltip = this.querySelector('.bwm-tooltip');
        this.loading = this.querySelector('.bwm-loading');
        this.loadingCanvas = this.querySelector('.bwm-loading-canvas');
        this.loadingTip = this.querySelector('.bwm-loading-tip');
        
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
                if (this.isSearchMode && this.searchedWords && this.searchedWords.length > 0) {
                    this.searchWord(true);
                }
            });
        }

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
        
        this.drawerToggle.addEventListener('click', () => {
            this.drawer.classList.add('open');
        });
        
        this.drawerClose.addEventListener('click', () => {
            this.drawer.classList.remove('open');
        });
        
        // Close radial menu and verses panel when clicking outside
        document.addEventListener('click', (e) => {
            let isMenuVisible = this.radialMenuNode !== null;
            let isVersesVisible = this.versesPanel.classList.contains('visible');
            
            if (isMenuVisible || isVersesVisible) {
                if (!this.radialMenu.contains(e.target) && !this.versesPanel.contains(e.target) && !this.canvas.contains(e.target)) {
                    this.hideRadialMenu();
                    this.hideVersesPanel();
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
        if (!this.src2d) return;
        this.loading.style.display = 'flex';
        this.startLoadingAnimation();
        try {
            const res2d = await fetch(this.src2d);
            this.data2d = await res2d.json();
            
            if (this.srcVerses) {
                const resV = await fetch(this.srcVerses);
                const vData = await resV.json();
                this.verses = vData.verses;
                this.wordToVerses = vData.words;
            }
            
            let params = new URLSearchParams(window.location.search);
            let keywords = params.get('keywords');
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
        } catch (e) {
            console.error("Error loading Bible Word Map data", e);
        } finally {
            this.stopLoadingAnimation();
            this.loading.style.display = 'none';
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

    async searchWord(useExplicitIds = false) {
        this.hoveredNode = null;
        let foundPoints = [];
        
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
        const hasKeywords = this.searchedWords && this.searchedWords.length > 0;
        if (hasText || hasKeywords) {
            this.searchClearBtn.classList.add('visible');
        } else {
            this.searchClearBtn.classList.remove('visible');
        }
    }

    clearAllKeywords() {
        this.isSearchMode = false;
        this.searchedWords = [];
        this.drawerWords = [];
        if (this.searchInput) this.searchInput.value = '';
        this.updateClearBtnVisibility();
        this.renderActiveWords();
        window.history.replaceState(null, '', window.location.pathname);
        this.hideRadialMenu();
        this.hideVersesPanel();
        this.buildAllWordsGraph();
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
                n.x = this.transform.invertX(cw/2) + (Math.random() - 0.5) * 10;
                n.y = this.transform.invertY(ch/2) + (Math.random() - 0.5) * 10;
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
                v: p.v, normSim: 1, pos: p.pos
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
                    normSim: s.sim, pos: s.point.pos
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
            x: d.x,
            y: d.y,
            original: d.original,
            isKw: false
        }));
        this.links = [];
        this.draw();
    }

    draw() {
        if (!this.ctx) return;
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
                visibleNodesCount++;
            }
        });
        let autoShowLabels = visibleNodesCount < 250;
        
        
        this.ctx.save();
        this.ctx.translate(this.transform.x, this.transform.y);
        this.ctx.scale(this.transform.k, this.transform.k);
        
        // Pre-calculate radii for all nodes so we can clip lines to their edges
        this.nodes.forEach(n => {
            let pixelR = 3;
            if (n.isKw) pixelR = 12;
            else if (this.isSearchMode) {
                let alpha = (n.normSim !== undefined && !isNaN(n.normSim)) ? n.normSim : 0.2;
                pixelR = 3 + (alpha * 7);
            }
            else pixelR = Math.max(1.5, Math.min(8, Math.log(n.f || 3) * 1.2));
            
            n.canvasR = pixelR / this.transform.k;
        });
        
        this.links.forEach(l => {
            if (l.source.x === undefined || l.target.x === undefined) return;
            
            // Make links more visible but still subtly faded for less similar words
            if (this.isSearchMode && !l.source.isKw) {
                let alpha = (l.source.normSim !== undefined && !isNaN(l.source.normSim)) ? l.source.normSim : 0.2;
                this.ctx.globalAlpha = Math.max(0.25, alpha * 0.8 + 0.2); // Range from 0.25 to 1.0
            } else {
                this.ctx.globalAlpha = 1.0;
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
            
            this.ctx.strokeStyle = l.type === 'direct' ? this.colors.linkDir : this.colors.linkIndir;
            this.ctx.lineWidth = l.type === 'direct' ? 1.5 / this.transform.k : 1 / this.transform.k;
            this.ctx.stroke();
        });
        this.ctx.globalAlpha = 1.0;
        
        this.nodes.forEach(n => {
            this.ctx.beginPath();
            
            let posColor = '#94a3b8'; // default slate-400
            if (n.pos === 'NOUN') posColor = '#3b82f6'; // blue-500
            else if (n.pos === 'VERB') posColor = '#ef4444'; // red-500
            else if (n.pos === 'PROPN') posColor = '#10b981'; // emerald-500
            else if (n.pos === 'ADJ') posColor = '#8b5cf6'; // violet-500
            else if (n.pos === 'ADV') posColor = '#ec4899'; // pink-500
            else if (n.pos === 'PRON') posColor = '#14b8a6'; // teal-500
            else if (n.pos === 'NUM') posColor = '#f59e0b'; // amber-500

            this.ctx.fillStyle = posColor;
            
            // In search mode, lower similarity words get faded out
            if (this.isSearchMode && !n.isKw) {
                let alpha = (n.normSim !== undefined && !isNaN(n.normSim)) ? n.normSim : 0.2;
                this.ctx.globalAlpha = Math.max(0.4, alpha);
            } else {
                this.ctx.globalAlpha = 1.0;
            }
            
            let drawR = n.canvasR;
            if (this.hoveredNode === n) {
                drawR = n.canvasR * 1.4;
                this.ctx.shadowBlur = 12 / this.transform.k;
                this.ctx.shadowColor = posColor;
            } else {
                this.ctx.shadowBlur = 0;
            }
            
            this.ctx.arc(n.x, n.y, drawR, 0, 2 * Math.PI);
            this.ctx.fill();
            
            if (n.isKw) {
                this.ctx.lineWidth = 3 / this.transform.k;
                this.ctx.strokeStyle = this.colors.text;
                this.ctx.stroke();
            }
            
            this.ctx.globalAlpha = 1.0;
            
            let showLabel = (this.isSearchMode || n.isKw || autoShowLabels);
            if (showLabel) {
                this.ctx.shadowBlur = 0;
                
                this.ctx.save();
                this.ctx.translate(n.x, n.y);
                this.ctx.scale(1 / this.transform.k, 1 / this.transform.k);
                
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
            if (dist < searchRadius && dist < minDist) {
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
        
        if (isAlreadyKw) {
            menuItems.push({ icon: '-', label: 'Remove keyword', action: () => { this.hideRadialMenu(); this.removeKeyword(node.id); } });
        } else {
            menuItems.push({ icon: '+', label: 'Add keyword', action: () => { this.hideRadialMenu(); this.addKeyword(node.id); } });
        }
        menuItems.push({ icon: '\u{1F4D6}', label: 'Verses', action: () => { this.hideRadialMenu(); this.showVersesPanel(node, screenX, screenY); } });
        if (node.original && node.original.length > 0) {
            menuItems.push({ icon: '<span style="font-size:0.7em;font-weight:bold;">α/א</span>', label: 'Original Language', action: () => { this.hideRadialMenu(); this.showOriginalLangPanel(node, screenX, screenY); } });
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
        
        if (this.isSearchMode && this.wordToVerses && this.verses) {
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
                headerHtml += `<div class="bwm-verses-tab ${i === 0 ? 'active' : ''}" data-tab-id="${t.id}">${t.title}</div>`;
            });
            headerHtml += `</div>`;
        }
        headerHtml += `</div>`; // end header
        
        let contentHtml = `<div class="bwm-verses-content">`;
        
        // Helper to format verses list
        const buildVersesHtml = (vList) => {
            let limit = 10;
            let res = vList.slice(0, limit).map(id => {
                let v = this.verses[id] || '';
                let [ref, text] = v.split('|');
                return `<div style="margin: 4px 0; padding: 4px 0; border-bottom: 1px solid var(--bwm-border);"><span style="color:var(--bwm-tooltip-link); font-family: monospace; font-weight:600;">${ref}</span><br><span style="font-size:0.85em; opacity:0.85;">${text || ''}</span></div>`;
            }).join('');
            if (vList.length > limit) res += `<div style="font-style:italic; opacity:0.6; margin-top:4px;">...and ${vList.length - limit} more</div>`;
            return res;
        };
        
        if (tabsData.length > 0) {
            tabsData.forEach((t, i) => {
                contentHtml += `<div class="bwm-verses-tab-content" id="bwm-tab-content-${t.id}" style="display: ${i === 0 ? 'block' : 'none'};">`;
                contentHtml += buildVersesHtml(t.verses);
                contentHtml += `</div>`;
            });
        } else {
            if (myVerses.length > 0) {
                contentHtml += `<div style="margin-bottom: 8px;"><b style="font-size:0.95em;">Appears in:</b></div>`;
                contentHtml += buildVersesHtml(myVerses);
            } else {
                contentHtml += `<div style="font-style: italic; opacity: 0.6;">No verse data available</div>`;
            }
        }
        contentHtml += `</div>`; // end content
        
        this.versesPanel.innerHTML = headerHtml + contentHtml;
        
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
                let contentEl = this.versesPanel.querySelector(`#bwm-tab-content-${tid}`);
                if (contentEl) contentEl.style.display = 'block';
                
                // reset scroll
                this.versesPanel.querySelector('.bwm-verses-content').scrollTop = 0;
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

    startLoadingAnimation() {
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
        
        // Colors matching the Part-of-Speech palette
        const colors = ['#4ade80', '#60a5fa', '#f472b6', '#fbbf24', '#94a3b8'];
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
        
        const tips = [
            "Search any word in the Bible",
            "Select a word bubble to learn more",
            "Explore original Greek & Hebrew definitions",
            "View verse links and semantic proximity",
            "Filter by Old or New Testament"
        ];
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
