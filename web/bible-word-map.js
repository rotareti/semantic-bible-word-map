class BibleWordMap extends HTMLElement {
    constructor() {
        super();
        this.data2d = null;
        this.data3d = null;
        this.is3D = false;
        this.testamentFilter = 'All'; // 'All', 'OT', 'NT'
        
        this.innerHTML = `
            <style>
                bible-word-map {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    height: 80vh;
                    font-family: system-ui, -apple-system, sans-serif;
                }
                .container {
                    flex: 1;
                    width: 100%;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    overflow: hidden;
                    background: #f8f9fa;
                    position: relative;
                }
                .top-bar {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-bottom: 12px;
                }
                .search-box, .controls {
                    display: flex;
                    gap: 8px;
                }
                input[type="text"] {
                    padding: 8px 12px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    outline: none;
                    font-size: 1rem;
                    width: 200px;
                }
                input[type="text"]:focus {
                    border-color: #2563eb;
                }
                button {
                    cursor: pointer;
                    padding: 8px 16px;
                    border: 1px solid #ccc;
                    background: #fff;
                    border-radius: 4px;
                    font-weight: 600;
                    transition: all 0.2s;
                }
                button:hover { background: #f0f0f0; }
                button.active {
                    background: #2563eb;
                    color: white;
                    border-color: #1d4ed8;
                }
                #plot {
                    width: 100%;
                    height: 100%;
                }
                .loading {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    font-size: 1.2rem;
                    color: #666;
                }
                .error-msg {
                    color: #d32f2f;
                    font-size: 0.9rem;
                    display: none;
                    align-items: center;
                }
            </style>
            <div class="top-bar">
                <div class="search-box">
                    <input type="text" id="search-input" placeholder="Search for a word..." />
                    <button id="search-btn">Find</button>
                    <span id="search-error" class="error-msg">Word not found</span>
                </div>
                <div class="controls">
                    <button id="btn-all" class="active">All</button>
                    <button id="btn-ot">OT</button>
                    <button id="btn-nt">NT</button>
                    <span style="border-left: 1px solid #ccc; margin: 0 4px;"></span>
                    <button id="btn-2d" class="active">2D</button>
                    <button id="btn-3d">3D</button>
                </div>
            </div>
            <div class="container">
                <div id="loading" class="loading">Loading Map Data...</div>
                <div id="plot"></div>
            </div>
        `;
    }

    async connectedCallback() {
        this.plotDiv = this.querySelector('#plot');
        this.loadingDiv = this.querySelector('#loading');
        this.btn2d = this.querySelector('#btn-2d');
        this.btn3d = this.querySelector('#btn-3d');
        this.btnAll = this.querySelector('#btn-all');
        this.btnOt = this.querySelector('#btn-ot');
        this.btnNt = this.querySelector('#btn-nt');
        this.searchInput = this.querySelector('#search-input');
        this.searchBtn = this.querySelector('#search-btn');
        this.searchError = this.querySelector('#search-error');

        this.btn2d.addEventListener('click', () => this.switchView(false));
        this.btn3d.addEventListener('click', () => this.switchView(true));
        
        this.btnAll.addEventListener('click', () => this.setFilter('All'));
        this.btnOt.addEventListener('click', () => this.setFilter('OT'));
        this.btnNt.addEventListener('click', () => this.setFilter('NT'));

        this.searchBtn.addEventListener('click', () => this.searchWord());
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.searchWord();
        });

        await this.loadData();
        this.loadingDiv.style.display = 'none';
        this.renderPlot();
    }

    async loadData() {
        try {
            const src2d = this.getAttribute('src-2d');
            const src3d = this.getAttribute('src-3d');
            
            const [res2d, res3d] = await Promise.all([
                fetch(src2d).then(r => r.json()),
                fetch(src3d).then(r => r.json())
            ]);
            
            this.data2d = res2d;
            this.data3d = res3d;
        } catch (e) {
            console.error("Failed to load map data:", e);
            this.loadingDiv.innerHTML = `<span style="color:red;">Error loading data. Run 'make serve' from root to fix paths.</span>`;
        }
    }

    async switchView(is3D) {
        if (this.is3D === is3D) return;
        this.is3D = is3D;
        
        if (this.is3D) {
            this.btn3d.classList.add('active');
            this.btn2d.classList.remove('active');
        } else {
            this.btn2d.classList.add('active');
            this.btn3d.classList.remove('active');
        }
        await this.renderPlot();
        
        if (this.searchInput.value) {
            this.searchWord();
        }
    }

    async setFilter(filter) {
        if (this.testamentFilter === filter) return;
        this.testamentFilter = filter;
        
        [this.btnAll, this.btnOt, this.btnNt].forEach(btn => btn.classList.remove('active'));
        if (filter === 'All') this.btnAll.classList.add('active');
        if (filter === 'OT') this.btnOt.classList.add('active');
        if (filter === 'NT') this.btnNt.classList.add('active');
        
        await this.renderPlot();
        
        if (this.searchInput.value) {
            this.searchWord();
        }
    }

    searchWord() {
        const rawQueries = this.searchInput.value.toLowerCase().split(/[\s,]+/).filter(w => w);
        this.searchError.style.display = 'none';
        
        if (rawQueries.length === 0) {
            this.isSearchMode = false;
            this.renderPlot();
            return;
        }

        let data = this.is3D ? this.data3d : this.data2d;
        if (this.testamentFilter === 'OT') {
            data = data.filter(d => d.t === 'OT' || d.t === 'Both');
        } else if (this.testamentFilter === 'NT') {
            data = data.filter(d => d.t === 'NT' || d.t === 'Both');
        }
        
        let pointIndex = data.findIndex(d => d.w === rawQueries[0]);
        if (pointIndex === -1) {
            this.searchError.textContent = "Word not found";
            this.searchError.style.display = 'flex';
            return;
        }

        const primaryPoint = data[pointIndex];
        
        // Show loading state for local projection
        this.loadingDiv.textContent = "Generating semantic neighborhood...";
        this.loadingDiv.style.display = 'block';
        this.plotDiv.style.opacity = '0.5';

        // Use setTimeout to allow UI to update loading state before blocking CPU
        setTimeout(async () => {
            let similarities = data.map(d => ({
                point: d,
                sim: this.cosineSimilarity(primaryPoint.v, d.v)
            }));
            
            similarities.sort((a, b) => b.sim - a.sim);
            // Get top 150 closest words for a localized semantic map
            const topWords = similarities.slice(0, 150);
            const vectors = topWords.map(s => s.point.v);

            try {
                // Run UMAP directly in the browser for just these 150 words
                const umap = new window.UMAP({
                    nNeighbors: 15,
                    minDist: 0.1,
                    nComponents: this.is3D ? 3 : 2,
                    nEpochs: 200
                });

                const embedding = umap.fit(vectors);

                this.localSearchData = topWords.map((s, i) => {
                    let newPoint = {...s.point};
                    newPoint.x = embedding[i][0];
                    newPoint.y = embedding[i][1];
                    if (this.is3D) newPoint.z = embedding[i][2];
                    newPoint.sim = s.sim; // save similarity for visual scaling
                    return newPoint;
                });

                this.isSearchMode = true;
                this.searchedWord = primaryPoint.w;
                
            } catch (err) {
                console.error("UMAP error:", err);
                this.searchError.textContent = "Error generating neighborhood";
                this.searchError.style.display = 'flex';
            }

            this.loadingDiv.style.display = 'none';
            this.plotDiv.style.opacity = '1.0';
            await this.renderPlot();
        }, 50);
    }

    cosineSimilarity(vecA, vecB) {
        if (!vecA || !vecB) return 0;
        let dotProduct = 0, normA = 0, normB = 0;
        for (let i = 0; i < vecA.length; i++) {
            dotProduct += vecA[i] * vecB[i];
            normA += vecA[i] * vecA[i];
            normB += vecB[i] * vecB[i];
        }
        if (normA === 0 || normB === 0) return 0;
        return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
    }

    hasWebGL() {
        try {
            const canvas = document.createElement('canvas');
            return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
        } catch (e) {
            return false;
        }
    }

    async renderPlot() {
        if (!this.data2d || !this.data3d) return;

        if (this.is3D && !this.hasWebGL()) {
            this.showWebGLFallback();
            return;
        }

        // Clean up Plotly's internal state safely, then clear our DOM
        try { window.Plotly.purge(this.plotDiv); } catch(e) {}
        this.plotDiv.innerHTML = '';

        let data = [];
        if (this.isSearchMode && this.localSearchData) {
            data = this.localSearchData;
        } else {
            data = this.is3D ? this.data3d : this.data2d;
            if (this.testamentFilter === 'OT') {
                data = data.filter(d => d.t === 'OT' || d.t === 'Both');
            } else if (this.testamentFilter === 'NT') {
                data = data.filter(d => d.t === 'NT' || d.t === 'Both');
            }
        }
        
        const words = data.map(d => d.w);
        const freqs = data.map(d => d.f);
        
        let sizes, colors;
        let textFonts = { size: [], color: [] };

        if (this.isSearchMode) {
            sizes = data.map(d => d.w === this.searchedWord ? 25 : Math.max(8, d.sim * 18));
            colors = data.map(d => d.w === this.searchedWord ? '#d32f2f' : d.sim);
            
            data.forEach(d => {
                if (d.w === this.searchedWord) {
                    textFonts.size.push(16);
                    textFonts.color.push('#d32f2f');
                } else {
                    textFonts.size.push(Math.max(9, Math.floor(d.sim * 14)));
                    textFonts.color.push('#666');
                }
            });
        } else {
            sizes = freqs.map(f => Math.max(5, Math.min(25, Math.log(f) * 2)));
            colors = sizes;
        }
        
        const trace = {
            x: data.map(d => d.x),
            y: data.map(d => d.y),
            text: words,
            mode: (this.isSearchMode && !this.is3D) ? 'markers+text' : 'markers',
            textposition: 'top center',
            hovertemplate: '<b>%{text}</b><extra></extra>',
            hoverlabel: { font: { size: 16 } },
            marker: {
                size: sizes,
                color: colors,
                colorscale: 'Viridis',
                opacity: 0.7,
                line: {
                    color: 'rgba(255, 255, 255, 0.5)',
                    width: 0.5
                }
            }
        };

        if (this.isSearchMode && !this.is3D) {
            trace.textfont = textFonts;
        }

        if (this.is3D) {
            trace.type = 'scatter3d';
            trace.z = data.map(d => d.z);
        } else {
            trace.type = 'scatter';
        }

        const layout = {
            margin: { t: 0, r: 0, b: 0, l: 0 },
            hovermode: 'closest',
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            scene: {
                xaxis: { showticklabels: false, title: '' },
                yaxis: { showticklabels: false, title: '' },
                zaxis: { showticklabels: false, title: '' }
            },
            xaxis: { showgrid: false, zeroline: false, visible: false },
            yaxis: { showgrid: false, zeroline: false, visible: false }
        };

        return window.Plotly.newPlot(this.plotDiv, [trace], layout, {
            responsive: true, 
            displayModeBar: true, 
            displaylogo: false, 
            scrollZoom: true,
            modeBarButtonsToRemove: ['lasso2d', 'select2d']
        }).then(() => {
            if (this.is3D) {
                // Plotly might swallow WebGL errors and log warnings without throwing. 
                // We can check if it actually created the webgl canvas.
                const glCanvas = this.plotDiv.querySelector('.gl-canvas');
                if (!glCanvas) {
                    this.showWebGLFallback();
                }
            }
        }).catch(err => {
            console.error("Plotly rendering error:", err);
            if (this.is3D) {
                this.showWebGLFallback();
            }
        });
    }

    showWebGLFallback() {
        try { window.Plotly.purge(this.plotDiv); } catch(e) {}
        this.plotDiv.innerHTML = `
            <div style="display:flex; height:100%; align-items:center; justify-content:center; flex-direction:column; color:#666;">
                <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="margin-bottom: 16px;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                <h3 style="margin:0 0 8px 0; color:#333;">3D View Unavailable</h3>
                <p style="margin:0; text-align:center; max-width:400px;">Your browser's hardware acceleration (WebGL) is currently disabled or exhausted. Please use the 2D View, or restart your browser to restore graphics resources.</p>
            </div>
        `;
    }
}

customElements.define('bible-word-map', BibleWordMap);
