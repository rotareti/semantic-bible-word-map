class BibleWordMap extends HTMLElement {
    constructor() {
        super();
        this.data2d = null;
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
                    border: 1px solid var(--border-color);
                    border-radius: 8px;
                    overflow: hidden;
                    background: var(--bg-color);
                    position: relative;
                }
                .top-bar {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-bottom: 12px;
                    flex-wrap: wrap;
                    gap: 10px;
                }
                .search-box, .controls {
                    display: flex;
                    gap: 8px;
                    flex-wrap: wrap;
                }
                .search-box {
                    flex: 1;
                    min-width: 250px;
                }
                input[type="text"] {
                    flex: 1;
                    padding: 8px 12px;
                    border: 1px solid var(--border-color);
                    border-radius: 4px;
                    outline: none;
                    font-size: 1rem;
                    background: var(--input-bg);
                    color: var(--text-color);
                }
                input[type="text"]:focus {
                    border-color: #2563eb;
                }
                button {
                    cursor: pointer;
                    padding: 8px 16px;
                    border: 1px solid var(--border-color);
                    background: var(--btn-bg);
                    color: var(--text-color);
                    border-radius: 4px;
                    font-weight: 600;
                    transition: all 0.2s;
                }
                button:hover { background: var(--btn-hover); }
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
                    color: var(--text-muted);
                    background: var(--card-bg);
                    padding: 20px;
                    border-radius: 8px;
                    border: 1px solid var(--border-color);
                    z-index: 10;
                    box-shadow: var(--shadow);
                }
                .error-msg {
                    color: #d32f2f;
                    font-size: 0.9rem;
                    display: none;
                    align-items: center;
                    width: 100%;
                }
                @media (max-width: 600px) {
                    .top-bar { flex-direction: column; align-items: stretch; }
                    .controls { justify-content: center; }
                }
            </style>
            <div class="top-bar">
                <div class="search-box">
                    <input type="text" id="search-input" placeholder="Search for words (e.g. Father Son Spirit)..." />
                    <button id="search-btn">Search</button>
                    <span id="search-error" class="error-msg">Word not found</span>
                </div>
                <div class="controls">
                    <button id="btn-all" class="active">All</button>
                    <button id="btn-ot">OT</button>
                    <button id="btn-nt">NT</button>
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
        this.btnAll = this.querySelector('#btn-all');
        this.btnOt = this.querySelector('#btn-ot');
        this.btnNt = this.querySelector('#btn-nt');
        this.searchInput = this.querySelector('#search-input');
        this.searchBtn = this.querySelector('#search-btn');
        this.searchError = this.querySelector('#search-error');

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
            const srcVerses = this.getAttribute('src-verses');
            
            const [res2d, resVerses] = await Promise.all([
                fetch(src2d).then(r => r.json()),
                srcVerses ? fetch(srcVerses).then(r => r.json()) : Promise.resolve(null)
            ]);
            
            this.data2d = res2d;
            if (resVerses) {
                this.verses = resVerses.verses;
                this.wordToVerses = resVerses.words;
            }
        } catch (e) {
            console.error("Failed to load map data:", e);
            this.loadingDiv.innerHTML = `<span style="color:red;">Error loading data. Run 'make serve' from root to fix paths.</span>`;
        }
    }

    async setFilter(filter) {
        if (this.testamentFilter === filter) return;
        this.testamentFilter = filter;
        
        [this.btnAll, this.btnOt, this.btnNt].forEach(btn => btn.classList.remove('active'));
        if (filter === 'All') this.btnAll.classList.add('active');
        if (filter === 'OT') this.btnOt.classList.add('active');
        if (filter === 'NT') this.btnNt.classList.add('active');
        
        if (this.isSearchMode) {
            this.searchWord();
        } else {
            await this.renderPlot();
        }
    }

    searchWord() {
        const rawQueries = this.searchInput.value.toLowerCase().split(/[\s,]+/).filter(w => w);
        this.searchError.style.display = 'none';
        
        if (rawQueries.length === 0) {
            this.isSearchMode = false;
            this.searchedWords = [];
            this.renderPlot();
            return;
        }

        let data = this.data2d;
        if (this.testamentFilter === 'OT') {
            data = data.filter(d => d.t === 'OT' || d.t === 'Both');
        } else if (this.testamentFilter === 'NT') {
            data = data.filter(d => d.t === 'NT' || d.t === 'Both');
        }
        
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

        this.searchedWords = foundPoints.map(p => p.w);
        
        this.loadingDiv.textContent = "Generating semantic neighborhood...";
        this.loadingDiv.style.display = 'block';
        this.plotDiv.style.opacity = '0.5';

        setTimeout(async () => {
            let topWordsSet = new Map();

            foundPoints.forEach(primaryPoint => {
                let similarities = data.map(d => ({
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

            const finalTopWords = Array.from(topWordsSet.values());
            const vectors = finalTopWords.map(s => s.point.v);

            try {
                const umap = new window.UMAP({
                    nNeighbors: 15,
                    minDist: 0.1,
                    nComponents: 2,
                    nEpochs: 200
                });

                const embedding = umap.fit(vectors);

                this.localSearchData = finalTopWords.map((s, i) => {
                    let newPoint = {...s.point};
                    newPoint.x = embedding[i][0];
                    newPoint.y = embedding[i][1];
                    newPoint.sim = s.maxSim;
                    newPoint.sourceKw = s.sourceKw;
                    return newPoint;
                });

                this.isSearchMode = true;
                
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

    async renderPlot() {
        if (!this.data2d) return;

        try { window.Plotly.purge(this.plotDiv); } catch(e) {}
        this.plotDiv.innerHTML = '';

        let data = [];
        if (this.isSearchMode && this.localSearchData) {
            data = this.localSearchData;
        } else {
            data = this.data2d;
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
        let customdata = [];

        if (this.isSearchMode) {
            sizes = data.map(d => this.searchedWords.includes(d.w) ? 25 : Math.max(8, d.sim * 18));
            colors = data.map(d => this.searchedWords.includes(d.w) ? '#d32f2f' : d.sim);
            
            data.forEach(d => {
                if (this.searchedWords.includes(d.w)) {
                    textFonts.size.push(16);
                    textFonts.color.push('#d32f2f');
                    customdata.push("Key Search Word");
                } else {
                    textFonts.size.push(Math.max(9, Math.floor(d.sim * 14)));
                    textFonts.color.push('#666666');
                    
                    if (this.wordToVerses && this.verses) {
                        let myVerses = this.wordToVerses[d.w] || [];
                        let tooltipContent = "";
                        let hasAnyLinks = false;
                        
                        this.searchedWords.forEach(sw => {
                            let swVerses = this.wordToVerses[sw] || [];
                            let intersection = myVerses.filter(vId => swVerses.includes(vId));
                            if (intersection.length > 0) {
                                hasAnyLinks = true;
                                let linkedVerses = intersection.map(id => {
                                    let verseData = this.verses[id];
                                    if (!verseData) return "";
                                    return verseData.split('|')[0];
                                });
                                
                                tooltipContent += `<b style="font-size: 1.1em;">Links to '${sw}':</b><br>`;
                                if (linkedVerses.length > 3) {
                                    tooltipContent += linkedVerses.slice(0, 3).join("<br>") + `<br><i style="color: #666;">...and ${linkedVerses.length - 3} more</i><br><br>`;
                                } else {
                                    tooltipContent += linkedVerses.join("<br>") + "<br><br>";
                                }
                            }
                        });
                        
                        if (!hasAnyLinks) {
                            customdata.push("<i>No direct verse links</i>");
                        } else {
                            customdata.push(tooltipContent.trim());
                        }
                    } else {
                        customdata.push("");
                    }
                }
            });
        } else {
            sizes = freqs.map(f => Math.max(5, Math.min(25, Math.log(f) * 2)));
            colors = sizes;
            customdata = words.map(() => "");
        }
        
        const trace = {
            x: data.map(d => d.x),
            y: data.map(d => d.y),
            text: words,
            customdata: customdata,
            mode: this.isSearchMode ? 'markers+text' : 'markers',
            textposition: 'top center',
            hovertemplate: this.isSearchMode 
                ? '<b>%{text}</b><br><br>%{customdata}<extra></extra>' 
                : '<b>%{text}</b><extra></extra>',
            hoverlabel: { font: { size: 14 }, bgcolor: '#ffffff' },
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

        if (this.isSearchMode) {
            trace.textfont = textFonts;
        }

        let lineXLinked = [];
        let lineYLinked = [];
        let lineXUnlinked = [];
        let lineYUnlinked = [];
        
        if (this.isSearchMode && this.localSearchData) {
            data.forEach(d => {
                if (this.searchedWords.includes(d.w) || !d.sourceKw) return;
                
                let myVerses = this.wordToVerses ? (this.wordToVerses[d.w] || []) : [];
                let linkedToSourceKw = false;
                
                // Draw green lines to all searched words that share verses
                this.searchedWords.forEach(sw => {
                    let swData = data.find(p => p.w === sw);
                    if (!swData) return;
                    
                    let swVerses = this.wordToVerses ? (this.wordToVerses[sw] || []) : [];
                    let hasIntersection = myVerses.some(vId => swVerses.includes(vId));
                    
                    if (hasIntersection) {
                        lineXLinked.push(d.x, swData.x, null);
                        lineYLinked.push(d.y, swData.y, null);
                        if (sw === d.sourceKw) {
                            linkedToSourceKw = true;
                        }
                    }
                });
                
                // If it doesn't share verses with its semantic parent, draw a grey line to the parent
                if (!linkedToSourceKw) {
                    let sourceKwData = data.find(p => p.w === d.sourceKw);
                    if (sourceKwData) {
                        lineXUnlinked.push(d.x, sourceKwData.x, null);
                        lineYUnlinked.push(d.y, sourceKwData.y, null);
                    }
                }
            });
        }
        
        const lineTraceLinked = {
            x: lineXLinked,
            y: lineYLinked,
            mode: 'lines',
            line: {
                color: 'rgba(40, 167, 69, 0.2)', // Lightened green
                width: 1
            },
            hoverinfo: 'none',
            showlegend: false
        };
        
        const lineTraceUnlinked = {
            x: lineXUnlinked,
            y: lineYUnlinked,
            mode: 'lines',
            line: {
                color: 'rgba(150, 150, 150, 0.15)', // Faint grey for semantic-only links
                width: 1
            },
            hoverinfo: 'none',
            showlegend: false
        };

        const layout = {
            margin: { t: 0, r: 0, b: 0, l: 0 },
            hovermode: 'closest',
            dragmode: 'pan', // Better for mobile touch
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            font: { color: '#333333' },
            xaxis: { showgrid: false, zeroline: false, visible: false },
            yaxis: { showgrid: false, zeroline: false, visible: false },
            showlegend: false
        };

        return window.Plotly.newPlot(this.plotDiv, [lineTraceUnlinked, lineTraceLinked, trace], layout, {
            responsive: true, 
            displayModeBar: true, 
            displaylogo: false, 
            scrollZoom: true,
            modeBarButtonsToRemove: ['lasso2d', 'select2d']
        }).then((plot) => {
            plot.on('plotly_click', (clickData) => {
                if (clickData.points && clickData.points.length > 0) {
                    const clickedWord = clickData.points[0].text;
                    let currentVal = this.searchInput.value.trim();
                    let words = currentVal.toLowerCase().split(/[\s,]+/).filter(w => w);
                    
                    if (!words.includes(clickedWord.toLowerCase())) {
                        this.searchInput.value = (currentVal ? currentVal + ' ' : '') + clickedWord;
                        this.searchWord();
                    }
                }
            });
        }).catch(err => {
            console.error("Plotly rendering error:", err);
        });
    }
}

customElements.define('bible-word-map', BibleWordMap);
