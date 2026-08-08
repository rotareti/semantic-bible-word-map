class BibleWordMap extends HTMLElement {
    constructor() {
        super();
        this.data2d = null;
        this.data3d = null;
        this.is3D = false;
        
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
                    <button id="btn-2d" class="active">2D View</button>
                    <button id="btn-3d">3D View</button>
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
        this.searchInput = this.querySelector('#search-input');
        this.searchBtn = this.querySelector('#search-btn');
        this.searchError = this.querySelector('#search-error');

        this.btn2d.addEventListener('click', () => this.switchView(false));
        this.btn3d.addEventListener('click', () => this.switchView(true));
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

    switchView(is3D) {
        if (this.is3D === is3D) return;
        this.is3D = is3D;
        
        if (this.is3D) {
            this.btn3d.classList.add('active');
            this.btn2d.classList.remove('active');
        } else {
            this.btn2d.classList.add('active');
            this.btn3d.classList.remove('active');
        }
        this.renderPlot();
        
        // Re-apply search zoom if a word is currently searched
        if (this.searchInput.value) {
            this.searchWord();
        }
    }

    searchWord() {
        const rawQueries = this.searchInput.value.toLowerCase().split(/[\s,]+/).filter(w => w);
        this.searchError.style.display = 'none';
        if (rawQueries.length === 0) return;

        const data = this.is3D ? this.data3d : this.data2d;
        
        let foundPoints = [];
        let notFound = [];

        rawQueries.forEach(q => {
            const pointIndex = data.findIndex(d => d.w === q);
            if (pointIndex !== -1) {
                foundPoints.push(data[pointIndex]);
            } else {
                notFound.push(q);
            }
        });

        if (foundPoints.length === 0) {
            this.searchError.textContent = "Word(s) not found";
            this.searchError.style.display = 'flex';
            return;
        }

        if (notFound.length > 0) {
            this.searchError.textContent = `Not found: ${notFound.join(', ')}`;
            this.searchError.style.display = 'flex';
        }

        const annotations = foundPoints.map(point => ({
            x: point.x,
            y: point.y,
            text: point.w.toUpperCase(),
            showarrow: true,
            arrowhead: 2,
            arrowcolor: '#d32f2f',
            font: { size: 16, color: '#d32f2f', weight: 'bold' },
            ax: 0,
            ay: -40
        }));

        if (this.is3D) {
            const cx = foundPoints.reduce((sum, p) => sum + p.x, 0) / foundPoints.length;
            const cy = foundPoints.reduce((sum, p) => sum + p.y, 0) / foundPoints.length;
            const cz = foundPoints.reduce((sum, p) => sum + p.z, 0) / foundPoints.length;
            
            let maxDist = 2.0;
            foundPoints.forEach(p => {
                const dist = Math.sqrt((p.x - cx)**2 + (p.y - cy)**2 + (p.z - cz)**2);
                if (dist > maxDist) maxDist = dist;
            });
            const offset = Math.max(1, maxDist * 1.5);

            const update = {
                'scene.camera': {
                    center: { x: cx, y: cy, z: cz },
                    eye: { x: cx + offset, y: cy + offset, z: cz + offset }
                }
            };
            window.Plotly.relayout(this.plotDiv, update);
        } else {
            const xs = foundPoints.map(p => p.x);
            const ys = foundPoints.map(p => p.y);
            const minX = Math.min(...xs);
            const maxX = Math.max(...xs);
            const minY = Math.min(...ys);
            const maxY = Math.max(...ys);

            const spanX = Math.max(2.0, (maxX - minX) * 0.6 + 1.0);
            const spanY = Math.max(2.0, (maxY - minY) * 0.6 + 1.0);
            
            const cx = (minX + maxX) / 2;
            const cy = (minY + maxY) / 2;

            const update = {
                'xaxis.range': [cx - spanX, cx + spanX],
                'yaxis.range': [cy - spanY, cy + spanY],
                'annotations': annotations
            };
            window.Plotly.relayout(this.plotDiv, update);
        }
    }

    renderPlot() {
        if (!this.data2d || !this.data3d) return;

        const data = this.is3D ? this.data3d : this.data2d;
        
        const words = data.map(d => d.w);
        const freqs = data.map(d => d.f);
        const sizes = freqs.map(f => Math.max(5, Math.min(25, Math.log(f) * 2)));
        
        const trace = {
            x: data.map(d => d.x),
            y: data.map(d => d.y),
            text: words,
            mode: 'markers',
            hovertemplate: '<b>%{text}</b><extra></extra>',
            hoverlabel: { font: { size: 16 } },
            marker: {
                size: sizes,
                color: sizes,
                colorscale: 'Viridis',
                opacity: 0.7,
                line: {
                    color: 'rgba(255, 255, 255, 0.5)',
                    width: 0.5
                }
            }
        };

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

        window.Plotly.newPlot(this.plotDiv, [trace], layout, {
            responsive: true, 
            displayModeBar: true, 
            displaylogo: false, 
            scrollZoom: true,
            modeBarButtonsToRemove: ['lasso2d', 'select2d'] // Keep it clean for panning/zooming
        });
    }
}

customElements.define('bible-word-map', BibleWordMap);
