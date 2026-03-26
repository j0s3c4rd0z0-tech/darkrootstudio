<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DarkRoot Studio | System Interface</title>
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Chart.js -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    
    <!-- Google Fonts: JetBrains Mono -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap" rel="stylesheet">

    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        'deep-void': '#0A0A0F',
                        'electric-cyan': '#00F5FF',
                        'neon-magenta': '#FF007A',
                        'terminal-emerald': '#00FF9C',
                        'metal-slate': '#1A1A24',
                    },
                    fontFamily: {
                        mono: ['"JetBrains Mono"', 'monospace'],
                    },
                    backgroundImage: {
                        'grid-pattern': 'linear-gradient(to right, rgba(0, 245, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 245, 255, 0.05) 1px, transparent 1px)',
                    }
                }
            }
        }
    </script>

    <style>
        body {
            background-color: #0A0A0F;
            color: #00FF9C;
            font-family: 'JetBrains Mono', monospace;
            text-transform: uppercase;
            overflow-x: hidden;
            margin: 0;
        }

        .scanlines {
            position: fixed;
            top: 0; left: 0; width: 100vw; height: 100vh;
            background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.2));
            background-size: 100% 4px;
            pointer-events: none;
            z-index: 9999;
        }

        .vignette {
            position: fixed;
            top: 0; left: 0; width: 100vw; height: 100vh;
            background: radial-gradient(circle, transparent 50%, rgba(10, 10, 15, 0.9) 100%);
            pointer-events: none;
            z-index: 9998;
        }

        @keyframes flicker {
            0% { opacity: 1; }
            3% { opacity: 0.4; }
            6% { opacity: 1; }
            7% { opacity: 0.4; }
            8% { opacity: 1; }
            10% { opacity: 0.1; }
            11% { opacity: 1; }
            100% { opacity: 1; }
        }

        .glitch-flicker { animation: flicker 4s infinite; }
        .glow-cyan { text-shadow: 0 0 8px rgba(0, 245, 255, 0.6); }
        .glow-magenta { text-shadow: 0 0 8px rgba(255, 0, 122, 0.6); }
        .glow-emerald { text-shadow: 0 0 8px rgba(0, 255, 156, 0.6); }

        .border-glow-cyan {
            box-shadow: 0 0 10px rgba(0, 245, 255, 0.2), inset 0 0 10px rgba(0, 245, 255, 0.1);
            border: 1px solid #00F5FF;
        }

        .chart-container {
            position: relative;
            width: 100%;
            max-width: 600px;
            margin: auto;
            height: 350px;
        }

        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #0A0A0F; }
        ::-webkit-scrollbar-thumb { background: #1A1A24; border: 1px solid #00FF9C; }

        #boot-screen {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: #0A0A0F;
            z-index: 10000;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 2rem;
            color: #00FF9C;
        }

        .typewriter-text {
            border-right: 2px solid #00FF9C;
            animation: blinkCursor 0.75s step-end infinite;
            white-space: nowrap;
            overflow: hidden;
        }

        @keyframes blinkCursor {
            from, to { border-color: transparent }
            50% { border-color: #00FF9C; }
        }

        .terminal-input {
            background: transparent;
            border: none;
            outline: none;
            color: #00F5FF;
            width: 100%;
        }
    </style>
</head>
<body class="bg-deep-void text-terminal-emerald bg-grid-pattern bg-[length:40px_40px] relative">

    <div class="scanlines"></div>
    <div class="vignette"></div>

    <!-- Boot Sequence -->
    <div id="boot-screen">
        <div id="boot-text" class="text-sm md:text-base typewriter-text"></div>
    </div>

    <!-- Main Interface -->
    <div id="os-interface" class="hidden min-h-screen flex flex-col relative z-10">
        
        <!-- Top Status Bar -->
        <header class="w-full bg-metal-slate border-b border-terminal-emerald/30 p-2 md:p-4 flex flex-col md:flex-row justify-between items-center text-xs md:text-sm fixed top-0 z-50">
            <div class="flex space-x-4 mb-2 md:mb-0">
                <span class="text-electric-cyan glow-cyan">[ADMIN]: J.CARDOZO</span>
                <span class="hidden md:inline">|</span>
                <span>OS_LEVEL: <span class="text-terminal-emerald glow-emerald">PRO_V2</span></span>
            </div>
            <div class="flex space-x-4">
                <span>UPTIME: <span id="uptime-counter" class="text-electric-cyan">99.999%</span></span>
                <span class="hidden md:inline">|</span>
                <span>LATENCY: <span class="glitch-flicker text-neon-magenta">7MS</span></span>
            </div>
        </header>

        <main class="flex-grow pt-24 pb-12 px-4 md:px-8 max-w-7xl mx-auto w-full">
            
            <!-- Hero Section -->
            <section id="hero" class="mb-16">
                <p class="text-xs text-electric-cyan mb-2">>&nbsp;./ESTABLISHING_AUTHORITY.SH</p>
                <h1 class="text-4xl md:text-6xl font-bold mb-4 glow-emerald">DARKROOT<span class="text-electric-cyan glow-cyan">_STUDIO</span></h1>
                <h2 class="text-xl md:text-2xl text-terminal-emerald/80 mb-6">[ HIGH-END INFRASTRUCTURE & CREATIVE ENGINEERING ]</h2>
                
                <div class="bg-metal-slate border-l-4 border-electric-cyan p-6 shadow-lg shadow-electric-cyan/10">
                    <p class="text-sm md:text-base leading-relaxed normal-case">
                        "Elevating the technical web standard." We merge the robustness of <span class="text-neon-magenta font-bold uppercase glow-magenta">SRE</span> with <span class="text-electric-cyan font-bold uppercase">Premium Frontend</span> design and immersive soundscapes. We don't just manage clouds; we engineer experiences that breathe technical authority.
                    </p>
                    <div class="mt-6 flex flex-wrap gap-4">
                        <button onclick="scrollToSection('projects')" class="bg-electric-cyan/10 border border-electric-cyan text-electric-cyan px-4 py-2 hover:bg-electric-cyan hover:text-deep-void transition-all duration-300 shadow-[0_0_10px_rgba(0,245,255,0.3)]">
                            [ VIEW_NODES (PROJECTS) ]
                        </button>
                        <button onclick="scrollToSection('contact')" class="bg-transparent border border-neon-magenta text-neon-magenta px-4 py-2 hover:bg-neon-magenta hover:text-white transition-all duration-300">
                            [ OPEN_TERMINAL_CONTACT ]
                        </button>
                    </div>
                </div>
            </section>

            <!-- Technical Profile & Radar Chart -->
            <section id="sys-info" class="mb-16">
                <div class="flex items-center mb-6">
                    <span class="text-neon-magenta mr-2 text-xl">#</span>
                    <h3 class="text-2xl font-bold glow-emerald">SYS_INFO: CORE_CAPABILITIES</h3>
                </div>
                
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div class="space-y-6">
                        <p class="text-xs normal-case text-terminal-emerald/70">Capabilities updated for 2026. Focus on the Power Pentagon (Total balance between infrastructure and user experience).</p>
                        <div class="border border-terminal-emerald/30 p-4 bg-deep-void relative overflow-hidden">
                            <h4 class="text-electric-cyan mb-2">>&nbsp;FRONTEND_AUTHORITY</h4>
                            <p class="text-xs normal-case text-gray-300">React, Tailwind, Three.js, and high-performance animations. Interfaces that feel like operating systems.</p>
                        </div>
                        <div class="border border-neon-magenta/30 p-4 bg-deep-void relative overflow-hidden">
                            <h4 class="text-neon-magenta mb-2">>&nbsp;SENSORIAL_SOUND_DESIGN</h4>
                            <p class="text-xs normal-case text-gray-300">Original sound design for interfaces, reactive music, and ambient soundscapes for branding.</p>
                        </div>
                    </div>

                    <!-- Radar Chart: Adjusted for a strong pentagon -->
                    <div class="bg-metal-slate border-glow-cyan p-4 relative">
                        <div class="chart-container">
                            <canvas id="skillsRadarChart"></canvas>
                        </div>
                        <p class="text-center text-xs mt-4 text-terminal-emerald/60">CORE STATUS: 100% OPERATIONAL</p>
                    </div>
                </div>
            </section>

            <!-- Featured Projects Section -->
            <section id="projects" class="mb-16">
                <div class="flex items-center mb-6">
                    <span class="text-neon-magenta mr-2 text-xl">#</span>
                    <h3 class="text-2xl font-bold glow-emerald">DEPLOYED_NODES: PROJECT_ARCHIVE</h3>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <!-- Project 1 -->
                    <div class="group relative bg-metal-slate border border-terminal-emerald/20 overflow-hidden">
                        <div class="h-48 bg-deep-void flex items-center justify-center border-b border-terminal-emerald/20 overflow-hidden">
                            <span class="text-xs text-terminal-emerald/20 group-hover:scale-110 transition-transform duration-700">[ GCP_INFRASTRUCTURE_IMG ]</span>
                        </div>
                        <div class="p-6">
                            <h4 class="text-lg font-bold text-electric-cyan">GCP_AUTOMATED_CLUSTER</h4>
                            <p class="text-xs normal-case text-gray-400 mt-2 mb-4">GKE cluster deployment with auto-scaling and advanced monitoring via Terraform.</p>
                            <a href="#" class="text-xs text-neon-magenta hover:glow-magenta transition-all">[ EXPLORE_REPOSITORY ]</a>
                        </div>
                    </div>
                    <!-- Project 2 -->
                    <div class="group relative bg-metal-slate border border-terminal-emerald/20 overflow-hidden">
                        <div class="h-48 bg-deep-void flex items-center justify-center border-b border-terminal-emerald/20 overflow-hidden">
                            <span class="text-xs text-terminal-emerald/20 group-hover:scale-110 transition-transform duration-700">[ CYBERPUNK_FRONTEND_IMG ]</span>
                        </div>
                        <div class="p-6">
                            <h4 class="text-lg font-bold text-electric-cyan">NEURAL_UI_DASHBOARD</h4>
                            <p class="text-xs normal-case text-gray-400 mt-2 mb-4">Interactive dashboard for IoT sensor control with visual aesthetics inspired by Blade Runner.</p>
                            <a href="#" class="text-xs text-neon-magenta hover:glow-magenta transition-all">[ VIEW_LIVE_DEMO ]</a>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Service Matrix: Differential Pricing -->
            <section id="services" class="mb-16">
                <div class="flex items-center mb-6">
                    <span class="text-neon-magenta mr-2 text-xl">#</span>
                    <h3 class="text-2xl font-bold glow-emerald">PREMIUM_MODULES: SERVICES</h3>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div class="bg-metal-slate border border-terminal-emerald/30 hover:border-electric-cyan cursor-pointer transition-all duration-300 p-6 flex flex-col justify-between" onclick="openModal('modal-sync')">
                        <div>
                            <div class="text-2xl mb-4 text-electric-cyan">[ ⚲ ]</div>
                            <h4 class="text-lg font-bold mb-2">THE_SYNC (DIAGNOSTICS)</h4>
                            <p class="text-xs normal-case text-gray-400 mb-4">Complete audit. We identify bottlenecks and security gaps.</p>
                        </div>
                        <div class="text-xs text-terminal-emerald border-t border-terminal-emerald/20 pt-2 flex justify-between">
                            <span>SESSION: 90 MIN</span>
                            <span class="text-electric-cyan">€150</span>
                        </div>
                    </div>

                    <div class="bg-metal-slate border border-terminal-emerald/30 hover:border-neon-magenta cursor-pointer transition-all duration-300 p-6 flex flex-col justify-between" onclick="openModal('modal-cyber')">
                        <div>
                            <div class="text-2xl mb-4 text-neon-magenta">[ ⚡ ]</div>
                            <h4 class="text-lg font-bold mb-2">CYBER-CORE (EXP)</h4>
                            <p class="text-xs normal-case text-gray-400 mb-4">High-impact interface development with exclusive sound design.</p>
                        </div>
                        <div class="text-xs text-terminal-emerald border-t border-terminal-emerald/20 pt-2 flex justify-between">
                            <span>MVP STARTING AT:</span>
                            <span class="text-neon-magenta">€4,500</span>
                        </div>
                    </div>

                    <div class="bg-metal-slate border border-terminal-emerald/30 hover:border-electric-cyan cursor-pointer transition-all duration-300 p-6 flex flex-col justify-between" onclick="openModal('modal-sre')">
                        <div>
                            <div class="text-2xl mb-4 text-electric-cyan">[ ⚙ ]</div>
                            <h4 class="text-lg font-bold mb-2">SRE_ULTRA_TECH</h4>
                            <p class="text-xs normal-case text-gray-400 mb-4">Critical Infrastructure, GitOps, and total observability for demanding enterprises.</p>
                        </div>
                        <div class="text-xs text-terminal-emerald border-t border-terminal-emerald/20 pt-2 flex justify-between">
                            <span>HOURLY RATE:</span>
                            <span class="text-electric-cyan">€145</span>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Terminal Contact Form -->
            <section id="contact" class="mb-16">
                <div class="flex items-center mb-6">
                    <span class="text-neon-magenta mr-2 text-xl">#</span>
                    <h3 class="text-2xl font-bold glow-emerald">TERMINAL_COMM: ESTABLISH_LINK</h3>
                </div>
                
                <div class="bg-deep-void border border-terminal-emerald/50 p-6 font-mono relative overflow-hidden">
                    <div class="absolute top-0 left-0 w-full h-1 bg-terminal-emerald/20"></div>
                    <div id="terminal-history" class="text-xs space-y-2 mb-4">
                        <div class="text-gray-500">SYSTEM: Awaiting user commands...</div>
                        <div class="text-gray-500">TIP: Type 'help' to see available parameters.</div>
                    </div>
                    <div class="flex items-center text-xs">
                        <span class="text-terminal-emerald mr-2">visitor@darkroot_os:~$</span>
                        <input type="text" id="terminal-input" class="terminal-input" placeholder="_" autocomplete="off">
                    </div>
                </div>
            </section>

        </main>
        
        <footer class="bg-metal-slate border-t border-terminal-emerald/30 p-4 text-center text-xs text-terminal-emerald/60 z-50">
            <p>DARKROOT STUDIO © 2026 | AUTHORIZED ACCESS ONLY</p>
        </footer>
    </div>

    <!-- Modals -->
    <div id="modal-sync" class="fixed inset-0 bg-deep-void/90 hidden items-center justify-center z-[10000] p-4 backdrop-blur-sm">
        <div class="bg-metal-slate border border-electric-cyan p-6 max-w-lg w-full relative shadow-[0_0_20px_rgba(0,245,255,0.2)]">
            <button onclick="closeModal('modal-sync')" class="absolute top-4 right-4 text-electric-cyan hover:text-white">[X]</button>
            <h3 class="text-2xl text-electric-cyan mb-2">THE_SYNC</h3>
            <p class="text-sm normal-case mb-4 text-gray-300">Elite consulting. We analyze architecture, security, and scalability.</p>
            <p class="text-xs text-terminal-emerald">VALUE: €150 (Deductible from the final project).</p>
        </div>
    </div>

    <script>
        // --- Boot Logic ---
        const bootTextElement = document.getElementById('boot-text');
        const bootLines = [
            "INITIALIZING DARKROOT OS PRO_V2...",
            "RECALIBRATING CORE SKILLS [FRONTEND UPGRADE 95%]",
            "RECALIBRATING CORE SKILLS [AUDIO UPGRADE 90%]",
            "SECURING CLOUD CHANNELS... [OK]",
            "SYSTEM READY. WELCOME TO THE FUTURE OF INFRASTRUCTURE."
        ];
        let lineIndex = 0;
        function typeWriter() {
            if (lineIndex < bootLines.length) {
                bootTextElement.innerHTML += bootLines[lineIndex] + "<br>";
                lineIndex++;
                setTimeout(typeWriter, 400);
            } else {
                setTimeout(() => {
                    document.getElementById('boot-screen').style.display = 'none';
                    document.getElementById('os-interface').classList.remove('hidden');
                    initChart();
                }, 800);
            }
        }
        window.onload = () => setTimeout(typeWriter, 500);

        // --- Terminal Interaction Logic ---
        const termInput = document.getElementById('terminal-input');
        const termHistory = document.getElementById('terminal-history');
        let contactData = { name: '', email: '', message: '' };
        let step = 0;

        termInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const val = termInput.value.trim().toLowerCase();
                const cmdLine = document.createElement('div');
                cmdLine.innerHTML = `<span class="text-terminal-emerald">visitor@darkroot_os:~$</span> <span class="text-white">${val}</span>`;
                termHistory.appendChild(cmdLine);
                
                processCommand(val);
                termInput.value = '';
                termHistory.scrollTop = termHistory.scrollHeight;
            }
        });

        function processCommand(val) {
            const response = document.createElement('div');
            response.className = "text-electric-cyan mt-1 mb-2";

            if (step === 0) {
                if (val === 'help') {
                    response.innerText = "COMMANDS: 'start' to initiate contact, 'clear' to wipe terminal, 'about' for info.";
                } else if (val === 'start') {
                    response.innerText = "SYSTEM: Initiating contact protocol. What is your NAME?";
                    step = 1;
                } else if (val === 'clear') {
                    termHistory.innerHTML = '<div class="text-gray-500">SYSTEM: Terminal cleared.</div>';
                } else {
                    response.innerText = "SYSTEM: Command not recognized. Type 'start'.";
                }
            } else if (step === 1) {
                contactData.name = val;
                response.innerText = `SYSTEM: Received, ${val}. Now, please provide your EMAIL:`;
                step = 2;
            } else if (step === 2) {
                contactData.email = val;
                response.innerText = "SYSTEM: Email stored. What is your MESSAGE or PROPOSAL?";
                step = 3;
            } else if (step === 3) {
                contactData.message = val;
                response.className = "text-neon-magenta mt-1 mb-2 glow-magenta";
                response.innerText = "SYSTEM: ENCRYPTING AND TRANSMITTING DATA TO CENTRAL NODE... [UPLOAD SUCCESSFUL]";
                step = 0; // Reset
            }
            termHistory.appendChild(response);
        }

        // --- Navigation ---
        function scrollToSection(id) {
            const el = document.getElementById(id);
            if(el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
        }

        // --- Modals ---
        function openModal(id) { document.getElementById(id).classList.replace('hidden', 'flex'); }
        function closeModal(id) { document.getElementById(id).classList.replace('flex', 'hidden'); }

        // --- Chart.js: Power Pentagon ---
        function initChart() {
            const ctx = document.getElementById('skillsRadarChart').getContext('2d');
            new Chart(ctx, {
                type: 'radar',
                data: {
                    labels: ['CLOUD & SRE', 'BACKEND & DB', 'CI/CD GITOPS', 'FRONTEND EXP', 'AUDIO & ART'],
                    datasets: [{
                        label: 'CORE STRENGTH',
                        data: [95, 92, 95, 95, 90], 
                        backgroundColor: 'rgba(255, 0, 122, 0.15)',
                        borderColor: '#FF007A',
                        pointBackgroundColor: '#00F5FF',
                        borderWidth: 3,
                        pointRadius: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        r: {
                            angleLines: { color: 'rgba(0, 255, 156, 0.2)' },
                            grid: { color: 'rgba(0, 255, 156, 0.2)' },
                            pointLabels: { color: '#00FF9C', font: { size: 10 } },
                            ticks: { display: false, max: 100, min: 0 }
                        }
                    },
                    plugins: { legend: { display: false } }
                }
            });
        }
    </script>
</body>
</html>