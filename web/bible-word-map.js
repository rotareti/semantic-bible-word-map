class BibleWordMap extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.data2d = null;
        this.data3d = null;
        this.is3D = false;
        
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                    height: 80vh;
                    position: relative;
                    font-family: system-ui, -apple-system, sans-serif;
                }
                .container {
                    width: 100%;
                    height: 100%;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    overflow: hidden;
                    background: #f8f9fa;
                }
                .controls {
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    z-index: 10;
                    background: rgba(255, 255, 255, 0.9);
                    padding: 8px;
                    border-radius: 6px;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                    display: flex;
                    gap: 5px;
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
            </style>
            <div class="controls">
                <button id="btn-2d" class="active">2D View</button>
                <button id="btn-3d">3D View (Beta)</button>
            </div>
            <div class="container">
                <div id="loading" class="loading">Loading Map Data...</div>
                <div id="plot"></div>
            </div>
        `;
    }

    async connectedCallback() {
        this.plotDiv = this.shadowRoot.getElementById('plot');
        this.loadingDiv = this.shadowRoot.getElementById('loading');
        this.btn2d = this.shadowRoot.getElementById('btn-2d');
        this.btn3d = this.shadowRoot.getElementById('btn-3d');

        this.btn2d.addEventListener('click', () => this.switchView(false));
        this.btn3d.addEventListener('click', () => this.switchView(true));

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
            this.loadingDiv.innerHTML = `<span style="color:red;">Error loading data. Make sure to serve via a local web server and run the pipeline.</span>`;
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
    }

    renderPlot() {
        if (!this.data2d || !this.data3d) return;

        const data = this.is3D ? this.data3d : this.data2d;
        
        const words = data.map(d => d.w);
        const freqs = data.map(d => d.f);
        // Scale sizes for better visibility based on frequency
        const sizes = freqs.map(f => Math.max(5, Math.min(25, Math.log(f) * 2)));
        
        const trace = {
            x: data.map(d => d.x),
            y: data.map(d => d.y),
            text: words,
            mode: 'markers',
            hoverinfo: 'text',
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
            trace.type = 'scattergl'; // webgl is much faster for many points
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

        // Plotly handles Custom Elements fine, but needs window context
        window.Plotly.newPlot(this.plotDiv, [trace], layout, {responsive: true, displayModeBar: true, displaylogo: false});
    }
}

customElements.define('bible-word-map', BibleWordMap);
