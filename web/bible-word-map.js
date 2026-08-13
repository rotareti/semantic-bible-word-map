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
        
        this.innerHTML = `
            <style>
                :host {
                    --bwm-bg: #ffffff;
                    --bwm-text: #333333;
                    --bwm-border: #e5e7eb;
                    --bwm-node-default: #888888;
                    --bwm-node-kw: #d32f2f;
                    --bwm-node-hover: #2563eb;
                    --bwm-link-direct: rgba(40, 167, 69, 0.6);
                    --bwm-link-indirect: rgba(150, 150, 150, 0.2);
                    --bwm-tooltip-bg: rgba(255, 255, 255, 0.95);
                    --bwm-tooltip-text: #111111;
                    --bwm-font: system-ui, -apple-system, sans-serif;
                }
                @media (prefers-color-scheme: dark) {
                    :host {
                        --bwm-bg: #121212;
                        --bwm-text: #e0e0e0;
                        --bwm-border: #333333;
                        --bwm-node-default: #999999;
                        --bwm-tooltip-bg: rgba(30, 30, 30, 0.95);
                        --bwm-tooltip-text: #ffffff;
                    }
                }
                .bwm-container {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    height: 80vh;
                    font-family: var(--bwm-font);
                    color: var(--bwm-text);
                }
                .bwm-top-bar {
                    display: flex;
                    justify-content: space-between;
                    gap: 10px;
                    padding-bottom: 12px;
                    flex-wrap: wrap;
                }
                .bwm-search-controls, .bwm-filters {
                    display: flex;
                    gap: 8px;
                    flex-wrap: wrap;
                }
                .bwm-search-controls input {
                    flex: 1;
                    min-width: 200px;
                    padding: 8px 12px;
                    border: 1px solid var(--bwm-border);
                    border-radius: 4px;
                    background: var(--bwm-bg);
                    color: var(--bwm-text);
                    outline: none;
                    font-family: var(--bwm-font);
                }
                .bwm-search-controls input:focus {
                    border-color: var(--bwm-node-hover);
                }
                .bwm-btn {
                    padding: 8px 16px;
                    border: 1px solid var(--bwm-border);
                    border-radius: 4px;
                    background: var(--bwm-bg);
                    color: var(--bwm-text);
                    cursor: pointer;
                    font-weight: 600;
                    transition: all 0.2s;
                    font-family: var(--bwm-font);
                }
                .bwm-btn:hover {
                    background: var(--bwm-border);
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
                    background: var(--bwm-tooltip-bg);
                    color: var(--bwm-tooltip-text);
                    padding: 12px;
                    border-radius: 6px;
                    border: 1px solid var(--bwm-border);
                    pointer-events: none;
                    opacity: 0;
                    transition: opacity 0.2s;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                    font-size: 0.9em;
                    max-width: 300px;
                    z-index: 100;
                }
                .bwm-loading {
                    position: absolute;
                    top: 50%; left: 50%;
                    transform: translate(-50%, -50%);
                    background: var(--bwm-tooltip-bg);
                    color: var(--bwm-tooltip-text);
                    padding: 15px 25px;
                    border-radius: 8px;
                    border: 1px solid var(--bwm-border);
                    font-weight: bold;
                    display: none;
                }
            </style>
            <div class="bwm-container">
                <div class="bwm-top-bar">
                    <div class="bwm-search-controls">
                        <input type="text" id="bwm-search" placeholder="Search for words (e.g. Father Son Spirit)">
                        <button class="bwm-btn" id="bwm-btn-search">Search</button>
                        <span id="bwm-error" class="bwm-error">Word not found</span>
                    </div>
                    <div class="bwm-filters">
                        <button class="bwm-btn active" id="bwm-btn-all" data-filter="All">All</button>
                        <button class="bwm-btn" id="bwm-btn-ot" data-filter="OT">OT</button>
                        <button class="bwm-btn" id="bwm-btn-nt" data-filter="NT">NT</button>
                    </div>
                </div>
                <div class="bwm-canvas-container">
                    <canvas></canvas>
                    <div class="bwm-tooltip"></div>
                    <div class="bwm-loading">Loading Data...</div>
                </div>
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
        
        this.searchInput = this.querySelector('#bwm-search');
        this.searchBtn = this.querySelector('#bwm-btn-search');
        this.errorSpan = this.querySelector('#bwm-error');
        
        this.filterBtns = this.querySelectorAll('.bwm-filters .bwm-btn');
        
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

        // Filters
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.filterBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.testamentFilter = e.target.getAttribute('data-filter');
                if (!this.isSearchMode) this.buildAllWordsGraph();
            });
        });
        
        // Canvas interactivity
        new ResizeObserver(() => this.resize()).observe(this.canvas.parentElement);
        
        this.zoom = d3.zoom()
            .scaleExtent([0.1, 10])
            .on("zoom", (e) => {
                this.transform = e.transform;
                this.draw();
            });
            
        d3.select(this.canvas).call(this.zoom);
        
        // Tooltip handlers
        d3.select(this.canvas).on("mousemove", (e) => this.handleMouseMove(e));
        d3.select(this.canvas).on("click", (e) => this.handleClick(e));
        
        this.canvas.addEventListener('mouseleave', () => this.hideTooltip());
        this.tooltip.addEventListener('mouseenter', () => clearTimeout(this.tooltipTimeout));
        this.tooltip.addEventListener('mouseleave', () => {
            this.tooltip.style.opacity = '0';
            this.tooltip.style.pointerEvents = 'none';
            this.hoveredNode = null;
            this.draw();
        });
    }

    resize() {
        let rect = this.canvas.parentElement.getBoundingClientRect();
        let dpr = window.devicePixelRatio || 1;
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        this.ctx.scale(dpr, dpr);
        this.logicalWidth = rect.width;
        this.logicalHeight = rect.height;
        this.draw();
    }

    async loadData() {
        if (!this.src2d) return;
        this.loading.style.display = 'block';
        try {
            const res2d = await fetch(this.src2d);
            this.data2d = await res2d.json();
            
            if (this.srcVerses) {
                const resV = await fetch(this.srcVerses);
                const vData = await resV.json();
                this.verses = vData.verses;
                this.wordToVerses = vData.words;
            }
            
            this.buildAllWordsGraph();
        } catch (e) {
            console.error("Error loading Bible Word Map data", e);
        } finally {
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

    async searchWord() {
        let query = this.searchInput.value.trim();
        if (!query) {
            this.isSearchMode = false;
            this.buildAllWordsGraph();
            return;
        }

        let words = query.toLowerCase().split(/[\s,]+/).filter(w => w);
        let foundPoints = [];
        this.searchedWords = [];
        
        for (let w of words) {
            let p = this.data2d.find(d => d.w === w);
            if (p) {
                foundPoints.push(p);
                this.searchedWords.push(w);
            }
        }
        
        if (foundPoints.length === 0) {
            this.errorSpan.style.display = 'flex';
            this.errorSpan.textContent = 'None of the words were found.';
            setTimeout(() => this.errorSpan.style.display = 'none', 3000);
            return;
        }

        let topWordsSet = new Map();

        foundPoints.forEach((p) => {
            if (!topWordsSet.has(p.w)) {
                topWordsSet.set(p.w, { point: p, maxSim: 1, sourceKw: p.w });
            }
        });

        foundPoints.forEach(primaryPoint => {
            let similarities = this.data2d.map(d => ({
                point: d,
                sim: this.cosineSimilarity(primaryPoint.v, d.v)
            }));
            
            similarities.sort((a, b) => b.sim - a.sim);
            
            const topWords = similarities.slice(0, 100);
            topWords.forEach(s => {
                if (!topWordsSet.has(s.point.w)) {
                    topWordsSet.set(s.point.w, { point: s.point, maxSim: s.sim, sourceKw: primaryPoint.w });
                } else {
                    let existing = topWordsSet.get(s.point.w);
                    if (s.sim > existing.maxSim) {
                        existing.maxSim = s.sim;
                        existing.sourceKw = primaryPoint.w;
                    }
                }
            });
        });

        let finalTopWords = Array.from(topWordsSet.values());
        
        this.nodes = finalTopWords.map(s => ({
            id: s.point.w,
            w: s.point.w,
            f: s.point.f,
            sim: s.maxSim,
            sourceKw: s.sourceKw,
            isKw: this.searchedWords.includes(s.point.w),
            x: 0,
            y: 0
        }));

        this.links = [];
        this.nodes.forEach(n => {
            if (n.isKw || !n.sourceKw) return;
            
            let myVerses = this.wordToVerses ? (this.wordToVerses[n.w] || []) : [];
            let linkedToSourceKw = false;
            
            this.searchedWords.forEach(sw => {
                let swVerses = this.wordToVerses ? (this.wordToVerses[sw] || []) : [];
                let intersection = myVerses.filter(vId => swVerses.includes(vId));
                if (intersection.length > 0) {
                    this.links.push({
                        source: n.id,
                        target: sw,
                        type: 'direct',
                        intersection: intersection
                    });
                    if (sw === n.sourceKw) linkedToSourceKw = true;
                }
            });
            
            if (!linkedToSourceKw) {
                this.links.push({
                    source: n.id,
                    target: n.sourceKw,
                    type: 'indirect'
                });
            }
        });

        // Normalize similarity to [0, 1] to maximize color and size contrast like Plotly did
        let minSim = d3.min(this.nodes.filter(n => !n.isKw), n => n.sim) || 0;
        let maxSim = d3.max(this.nodes.filter(n => !n.isKw), n => n.sim) || 1;
        this.nodes.forEach(n => {
            if (n.isKw) n.normSim = 1;
            else n.normSim = (n.sim - minSim) / (maxSim - minSim || 1);
        });

        this.isSearchMode = true;
        this.runSimulation();
    }

    runSimulation() {
        if (this.simulation) this.simulation.stop();
        
        let kwNodes = this.nodes.filter(n => n.isKw);
        
        if (kwNodes.length === 1) {
            kwNodes[0].fx = 0;
            kwNodes[0].fy = 0;
        } else if (kwNodes.length === 2) {
            let sim = this.cosineSimilarity(
                this.data2d.find(d=>d.w===kwNodes[0].w).v,
                this.data2d.find(d=>d.w===kwNodes[1].w).v
            );
            let dist = (1 - sim) * 600;
            kwNodes[0].fx = -dist/2; kwNodes[0].fy = 0;
            kwNodes[1].fx = dist/2; kwNodes[1].fy = 0;
        } else if (kwNodes.length > 2) {
            let avgSim = 0, count = 0;
            for(let i=0; i<kwNodes.length; i++) {
                for(let j=i+1; j<kwNodes.length; j++) {
                    avgSim += this.cosineSimilarity(
                        this.data2d.find(d=>d.w===kwNodes[i].w).v,
                        this.data2d.find(d=>d.w===kwNodes[j].w).v
                    );
                    count++;
                }
            }
            let dist = (1 - (avgSim/count)) * 600;
            kwNodes.forEach((n, i) => {
                let angle = (i / kwNodes.length) * Math.PI * 2;
                n.fx = Math.cos(angle) * dist;
                n.fy = Math.sin(angle) * dist;
            });
        }
        
        let cw = this.logicalWidth || 800;
        let ch = this.logicalHeight || 600;
        this.transform = d3.zoomIdentity.translate(cw/2, ch/2).scale(0.8);
        d3.select(this.canvas).call(this.zoom.transform, this.transform);

        const LCG = d3.randomLcg(42); 
        
        this.simulation = d3.forceSimulation(this.nodes)
            .randomSource(LCG)
            .force("link", d3.forceLink(this.links).id(d => d.id).distance(d => d.type === 'direct' ? 40 : 120).strength(0.5))
            .force("charge", d3.forceManyBody().strength(-150))
            .force("collide", d3.forceCollide().radius(d => d.isKw ? 25 : 12))
            .on("tick", () => this.draw());
            
        this.draw();
    }

    buildAllWordsGraph() {
        if (this.simulation) this.simulation.stop();
        
        let filteredData = this.data2d;
        if (this.testamentFilter === 'OT') {
            filteredData = filteredData.filter(d => d.t === 'OT' || d.t === 'Both');
        } else if (this.testamentFilter === 'NT') {
            filteredData = filteredData.filter(d => d.t === 'NT' || d.t === 'Both');
        }
        
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
            id: d.w,
            w: d.w,
            f: d.f,
            x: d.x,
            y: d.y,
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
        
        this.ctx.save();
        this.ctx.translate(this.transform.x, this.transform.y);
        this.ctx.scale(this.transform.k, this.transform.k);
        
        this.links.forEach(l => {
            if (l.source.x === undefined || l.target.x === undefined) return;
            this.ctx.beginPath();
            this.ctx.moveTo(l.source.x, l.source.y);
            this.ctx.lineTo(l.target.x, l.target.y);
            this.ctx.strokeStyle = l.type === 'direct' ? this.colors.linkDir : this.colors.linkIndir;
            this.ctx.lineWidth = l.type === 'direct' ? 1.5 / this.transform.k : 1 / this.transform.k;
            this.ctx.stroke();
        });
        
        this.nodes.forEach(n => {
            this.ctx.beginPath();
            
            // Calculate a fixed screen pixel radius, then scale it into canvas coordinates
            let pixelR = 3;
            if (n.isKw) pixelR = 12;
            else if (this.isSearchMode) pixelR = 3 + (n.normSim * 7); // Rages from 3 to 10
            else pixelR = Math.max(1.5, Math.min(8, Math.log(n.f || 3) * 1.2));
            
            let canvasR = pixelR / this.transform.k;
            this.ctx.arc(n.x, n.y, canvasR, 0, 2 * Math.PI);
            
            let fill = this.colors.nodeDef;
            if (n.isKw) {
                fill = this.colors.nodeKw;
            } else if (this.isSearchMode) {
                fill = d3.interpolateViridis(n.normSim);
            } else {
                fill = d3.interpolateViridis(Math.min(1, Math.max(0, Math.log(n.f || 1) / 10)));
            }
            this.ctx.fillStyle = fill;
            
            if (this.hoveredNode === n) {
                this.ctx.fillStyle = this.colors.nodeHover;
                this.ctx.shadowBlur = 10 / this.transform.k;
                this.ctx.shadowColor = this.colors.nodeHover;
            } else {
                this.ctx.shadowBlur = 0;
            }
            this.ctx.fill();
            
            let showLabel = this.isSearchMode || this.hoveredNode === n;
            if (showLabel) {
                this.ctx.shadowBlur = 0;
                let fontSize = (n.isKw ? 14 : 11) / this.transform.k;
                this.ctx.font = `${fontSize}px ${this.colors.font}`;
                this.ctx.fillStyle = this.colors.text;
                this.ctx.textAlign = "center";
                this.ctx.textBaseline = "top";
                this.ctx.fillText(n.w, n.x, n.y + canvasR + (2 / this.transform.k));
            }
        });
        
        this.ctx.restore();
    }

    handleMouseMove(e) {
        if (!this.nodes || this.nodes.length === 0) return;
        
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
                this.showTooltip(closestNode, mouseX, mouseY);
                this.draw();
            } else {
                this.updateTooltipPos(mouseX, mouseY);
            }
        } else {
            this.hideTooltip();
        }
    }

    handleClick(e) {
        if (this.hoveredNode) {
            let currentSearch = this.searchInput.value.trim();
            if (currentSearch) {
                let words = currentSearch.split(/[\s,]+/).filter(w => w);
                if (!words.includes(this.hoveredNode.w)) {
                    this.searchInput.value = currentSearch + " " + this.hoveredNode.w;
                }
            } else {
                this.searchInput.value = this.hoveredNode.w;
            }
            this.searchWord();
        }
    }

    showTooltip(node, mouseX, mouseY) {
        clearTimeout(this.tooltipTimeout);
        this.tooltip.style.opacity = '1';
        this.tooltip.style.pointerEvents = 'auto';
        
        let content = `<b style="font-size:1.2em;">${node.w}</b><br>`;
        
        if (this.isSearchMode && this.wordToVerses && this.verses) {
            let hasLinks = false;
            let myVerses = this.wordToVerses[node.w] || [];
            
            this.searchedWords.forEach(sw => {
                let swVerses = this.wordToVerses[sw] || [];
                let intersection = myVerses.filter(v => swVerses.includes(v));
                if (intersection.length > 0) {
                    hasLinks = true;
                    content += `<div style="margin-top: 8px;"><b>Links to '${sw}':</b><br>`;
                    let refs = intersection.map(id => (this.verses[id] || "").split('|')[0]);
                    
                    if (refs.length > 3) {
                        content += refs.slice(0, 3).join("<br>") + `<br><i style="color:var(--bwm-text); opacity:0.7;">...and ${refs.length - 3} more</i>`;
                    } else {
                        content += refs.join("<br>");
                    }
                    content += `</div>`;
                }
            });
            
            if (!hasLinks && !node.isKw) {
                content += `<div style="margin-top: 8px; font-style: italic; opacity: 0.7;">No direct verse links</div>`;
            }
        }
        
        this.tooltip.innerHTML = content;
        this.updateTooltipPos(mouseX, mouseY);
    }
    
    updateTooltipPos(mouseX, mouseY) {
        let rect = this.canvas.getBoundingClientRect();
        let tw = this.tooltip.offsetWidth;
        let th = this.tooltip.offsetHeight;
        
        let x = mouseX + 15;
        let y = mouseY + 15;
        
        if (x + tw > rect.width) x = mouseX - tw - 15;
        if (y + th > rect.height) y = mouseY - th - 15;
        
        this.tooltip.style.left = x + 'px';
        this.tooltip.style.top = y + 'px';
    }

    hideTooltip() {
        if (this.tooltipTimeout) clearTimeout(this.tooltipTimeout);
        this.tooltipTimeout = setTimeout(() => {
            this.tooltip.style.opacity = '0';
            this.tooltip.style.pointerEvents = 'none';
            this.hoveredNode = null;
            this.canvas.style.cursor = "grab";
            this.draw();
        }, 150);
    }
}

customElements.define('bible-word-map', BibleWordMap);
