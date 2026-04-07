import { useEffect, useRef, useState } from 'react';

// ─── Estilos inyectados como string ───────────────────────────────────────────
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap');

  .consultant-root {
    background-color: #0A0A0F;
    color: #00FF9C;
    font-family: 'JetBrains Mono', monospace;
    text-transform: uppercase;
    min-height: 100vh;
    position: relative;
    overflow-x: hidden;
  }

  .consultant-root .scanlines {
    position: fixed;
    top: 0; left: 0; width: 100vw; height: 100vh;
    background: linear-gradient(to bottom,
      rgba(255,255,255,0) 50%,
      rgba(0,0,0,0.2) 50%
    );
    background-size: 100% 4px;
    pointer-events: none;
    z-index: 9999;
  }

  .consultant-root .vignette {
    position: fixed;
    top: 0; left: 0; width: 100vw; height: 100vh;
    background: radial-gradient(circle, transparent 50%, rgba(10,10,15,0.9) 100%);
    pointer-events: none;
    z-index: 9998;
  }

  @keyframes flicker {
    0%   { opacity: 1; }
    3%   { opacity: 0.4; }
    6%   { opacity: 1; }
    7%   { opacity: 0.4; }
    8%   { opacity: 1; }
    10%  { opacity: 0.1; }
    11%  { opacity: 1; }
    100% { opacity: 1; }
  }

  .consultant-root .glitch-flicker { animation: flicker 4s infinite; }
  .consultant-root .glow-cyan    { text-shadow: 0 0 8px rgba(0,245,255,0.6); }
  .consultant-root .glow-magenta { text-shadow: 0 0 8px rgba(255,0,122,0.6); }
  .consultant-root .glow-emerald { text-shadow: 0 0 8px rgba(0,255,156,0.6); }

  .consultant-root .border-glow-cyan {
    box-shadow: 0 0 10px rgba(0,245,255,0.2), inset 0 0 10px rgba(0,245,255,0.1);
    border: 1px solid #00F5FF;
  }

  .consultant-root .chart-container {
    position: relative;
    width: 100%;
    max-width: 600px;
    margin: auto;
    height: 350px;
  }

  .consultant-root ::-webkit-scrollbar       { width: 8px; }
  .consultant-root ::-webkit-scrollbar-track { background: #0A0A0F; }
  .consultant-root ::-webkit-scrollbar-thumb { background: #1A1A24; border: 1px solid #00FF9C; }

  /* Boot */
  .consultant-root .boot-screen {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    background: #0A0A0F;
    z-index: 10000;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 2rem;
    color: #00FF9C;
  }

  @keyframes blinkCursor {
    from, to { border-color: transparent; }
    50%       { border-color: #00FF9C; }
  }

  .consultant-root .typewriter-text {
    border-right: 2px solid #00FF9C;
    animation: blinkCursor 0.75s step-end infinite;
    white-space: pre-wrap;
    overflow: hidden;
    font-size: 0.875rem;
  }

  .consultant-root .terminal-input {
    background: transparent;
    border: none;
    outline: none;
    color: #00F5FF;
    width: 100%;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.75rem;
    text-transform: uppercase;
  }

  /* Grid background */
  .consultant-root .grid-bg {
    background-image:
      linear-gradient(to right,  rgba(0,245,255,0.05) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(0,245,255,0.05) 1px, transparent 1px);
    background-size: 40px 40px;
  }

  /* Utilities rápidas (sustituyen algunas clases de Tailwind) */
  .consultant-root .metal-slate  { background-color: #1A1A24; }
  .consultant-root .deep-void    { background-color: #0A0A0F; }

  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(10,10,15,0.92);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10001;
    padding: 1rem;
    backdrop-filter: blur(4px);
  }
`;

// ─── Datos ────────────────────────────────────────────────────────────────────
const BOOT_LINES = [
  'INITIALIZING DARKROOT OS PRO_V2...',
  'RECALIBRATING CORE SKILLS [FRONTEND UPGRADE 95%]',
  'RECALIBRATING CORE SKILLS [AUDIO UPGRADE 90%]',
  'SECURING CLOUD CHANNELS... [OK]',
  'SYSTEM READY. WELCOME TO THE FUTURE OF INFRASTRUCTURE.',
];

const SERVICES = [
  {
    id: 'modal-sync',
    icon: '[ ⚲ ]',
    iconColor: '#00F5FF',
    hoverBorder: '#00F5FF',
    title: 'THE_SYNC (DIAGNOSTICS)',
    desc: 'Complete audit. We identify bottlenecks and security gaps.',
    meta1: 'SESSION: 90 MIN',
    meta2: '€150',
    meta2Color: '#00F5FF',
    modalTitle: 'THE_SYNC',
    modalDesc: 'Elite consulting. We analyze architecture, security, and scalability.',
    modalValue: 'VALUE: €150 (Deductible from the final project).',
  },
  {
    id: 'modal-cyber',
    icon: '[ ⚡ ]',
    iconColor: '#FF007A',
    hoverBorder: '#FF007A',
    title: 'CYBER-CORE (EXP)',
    desc: 'High-impact interface development with exclusive sound design.',
    meta1: 'MVP STARTING AT:',
    meta2: '€4,500',
    meta2Color: '#FF007A',
    modalTitle: 'CYBER-CORE',
    modalDesc: 'Premium frontend experience with original audio design and immersive aesthetics.',
    modalValue: 'VALUE: Starting at €4,500.',
  },
  {
    id: 'modal-sre',
    icon: '[ ⚙ ]',
    iconColor: '#00F5FF',
    hoverBorder: '#00F5FF',
    title: 'SRE_ULTRA_TECH',
    desc: 'Critical Infrastructure, GitOps, and total observability for demanding enterprises.',
    meta1: 'HOURLY RATE:',
    meta2: '€145',
    meta2Color: '#00F5FF',
    modalTitle: 'SRE_ULTRA_TECH',
    modalDesc: 'Full-stack reliability engineering: Kubernetes, Terraform, Datadog, PagerDuty.',
    modalValue: 'VALUE: €145/hr.',
  },
];

// ─── Radar Chart (Chart.js cargado via CDN en useEffect) ─────────────────────
function RadarChart() {
  const canvasRef = useRef(null);
  const chartRef  = useRef(null);

  useEffect(() => {
    // Carga Chart.js dinámicamente si no existe aún
    const loadChart = () => {
      if (window.Chart) {
        buildChart();
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
      script.onload = buildChart;
      document.head.appendChild(script);
    };

    const buildChart = () => {
      if (!canvasRef.current) return;
      if (chartRef.current) chartRef.current.destroy();
      chartRef.current = new window.Chart(canvasRef.current.getContext('2d'), {
        type: 'radar',
        data: {
          labels: ['CLOUD & SRE', 'BACKEND & DB', 'CI/CD GITOPS', 'FRONTEND EXP', 'AUDIO & ART'],
          datasets: [{
            label: 'CORE STRENGTH',
            data: [95, 92, 95, 95, 90],
            backgroundColor: 'rgba(255,0,122,0.15)',
            borderColor: '#FF007A',
            pointBackgroundColor: '#00F5FF',
            borderWidth: 3,
            pointRadius: 4,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            r: {
              angleLines: { color: 'rgba(0,255,156,0.2)' },
              grid:        { color: 'rgba(0,255,156,0.2)' },
              pointLabels: { color: '#00FF9C', font: { size: 10, family: "'JetBrains Mono'" } },
              ticks: { display: false, max: 100, min: 0 },
            },
          },
          plugins: { legend: { display: false } },
        },
      });
    };

    loadChart();
    return () => { if (chartRef.current) chartRef.current.destroy(); };
  }, []);

  return (
    <div
      style={{ backgroundColor: '#1A1A24', padding: '1rem', position: 'relative' }}
      className="border-glow-cyan"
    >
      <div className="chart-container">
        <canvas ref={canvasRef} />
      </div>
      <p style={{ textAlign: 'center', fontSize: '0.65rem', marginTop: '1rem', color: 'rgba(0,255,156,0.6)' }}>
        CORE STATUS: 100% OPERATIONAL
      </p>
    </div>
  );
}

// ─── Terminal interactivo ────────────────────────────────────────────────────
function Terminal() {
  const [history, setHistory] = useState([
    { type: 'system', text: "SYSTEM: Awaiting user commands..." },
    { type: 'system', text: "TIP: Type 'help' to see available parameters." },
  ]);
  const [input, setInput]     = useState('');
  const [step, setStep]       = useState(0);
  const [contactData, setContactData] = useState({ name: '', email: '', message: '' });
  const historyRef = useRef(null);

  useEffect(() => {
    if (historyRef.current)
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
  }, [history]);

  const addLine = (text, type = 'response') =>
    setHistory(h => [...h, { type, text }]);

  const handleKeyDown = (e) => {
    if (e.key !== 'Enter') return;
    const val = input.trim().toLowerCase();
    addLine(`visitor@darkroot_os:~$ ${val}`, 'cmd');
    processCommand(val);
    setInput('');
  };

  const processCommand = (val) => {
    if (step === 0) {
      if (val === 'help')  addLine("COMMANDS: 'start' to initiate contact, 'clear' to wipe terminal, 'about' for info.");
      else if (val === 'clear') { setHistory([{ type: 'system', text: 'SYSTEM: Terminal cleared.' }]); }
      else if (val === 'start') { addLine("SYSTEM: Initiating contact protocol. What is your NAME?"); setStep(1); }
      else addLine("SYSTEM: Command not recognized. Type 'start'.");
    } else if (step === 1) {
      setContactData(d => ({ ...d, name: val }));
      addLine(`SYSTEM: Received, ${val}. Now, please provide your EMAIL:`);
      setStep(2);
    } else if (step === 2) {
      setContactData(d => ({ ...d, email: val }));
      addLine("SYSTEM: Email stored. What is your MESSAGE or PROPOSAL?");
      setStep(3);
    } else if (step === 3) {
      setContactData(d => ({ ...d, message: val }));
      addLine("SYSTEM: ENCRYPTING AND TRANSMITTING DATA TO CENTRAL NODE... [UPLOAD SUCCESSFUL]", 'success');
      setStep(0);
    }
  };

  return (
    <div style={{ backgroundColor: '#0A0A0F', border: '1px solid rgba(0,255,156,0.5)', padding: '1.5rem', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', backgroundColor: 'rgba(0,255,156,0.2)' }} />
      <div
        ref={historyRef}
        style={{ fontSize: '0.75rem', marginBottom: '1rem', maxHeight: '200px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
      >
        {history.map((line, i) => (
          <div
            key={i}
            style={{
              color: line.type === 'cmd'     ? '#ffffff'
                   : line.type === 'success' ? '#FF007A'
                   : line.type === 'system'  ? 'rgba(255,255,255,0.4)'
                   : '#00F5FF',
            }}
          >
            {line.text}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', fontSize: '0.75rem' }}>
        <span style={{ color: '#00FF9C', marginRight: '0.5rem' }}>visitor@darkroot_os:~$</span>
        <input
          className="terminal-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="_"
          autoComplete="off"
        />
      </div>
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────
function ServiceModal({ service, onClose }) {
  if (!service) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        style={{ backgroundColor: '#1A1A24', border: '1px solid #00F5FF', padding: '1.5rem', maxWidth: '32rem', width: '100%', position: 'relative', boxShadow: '0 0 20px rgba(0,245,255,0.2)' }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '1rem', right: '1rem', color: '#00F5FF', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.875rem' }}
        >
          [X]
        </button>
        <h3 style={{ fontSize: '1.5rem', color: '#00F5FF', marginBottom: '0.5rem' }}>{service.modalTitle}</h3>
        <p style={{ fontSize: '0.875rem', textTransform: 'none', color: '#d1d5db', marginBottom: '1rem' }}>{service.modalDesc}</p>
        <p style={{ fontSize: '0.75rem', color: '#00FF9C' }}>{service.modalValue}</p>
      </div>
    </div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────
export default function ConsultantPage() {
  const [bootDone,     setBootDone]     = useState(false);
  const [bootText,     setBootText]     = useState('');
  const [activeModal,  setActiveModal]  = useState(null);

  // Animación de boot
  useEffect(() => {
    let lineIdx = 0;
    let accumulated = '';

    const tick = () => {
      if (lineIdx < BOOT_LINES.length) {
        accumulated += BOOT_LINES[lineIdx] + '\n';
        setBootText(accumulated);
        lineIdx++;
        setTimeout(tick, 400);
      } else {
        setTimeout(() => setBootDone(true), 800);
      }
    };

    const timer = setTimeout(tick, 500);
    return () => clearTimeout(timer);
  }, []);

  const activeServiceData = SERVICES.find(s => s.id === activeModal) || null;

  return (
    <>
      {/* Inyección de estilos */}
      <style>{STYLES}</style>

      <div className="consultant-root grid-bg">
        <div className="scanlines" />
        <div className="vignette"  />

        {/* ── Boot Screen ── */}
        {!bootDone && (
          <div className="boot-screen">
            <pre className="typewriter-text">{bootText}</pre>
          </div>
        )}

        {/* ── OS Interface ── */}
        {bootDone && (
          <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 10 }}>

            {/* Status Bar */}
            <header style={{
              backgroundColor: '#1A1A24',
              borderBottom: '1px solid rgba(0,255,156,0.3)',
              padding: '0.75rem 1.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '0.75rem',
              flexWrap: 'wrap',
              gap: '0.5rem',
            }}>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <span className="glow-cyan" style={{ color: '#00F5FF' }}>[ADMIN]: J.CARDOZO</span>
                <span>OS_LEVEL: <span className="glow-emerald" style={{ color: '#00FF9C' }}>PRO_V2</span></span>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <span>UPTIME: <span style={{ color: '#00F5FF' }}>99.999%</span></span>
                <span>LATENCY: <span className="glitch-flicker" style={{ color: '#FF007A' }}>7MS</span></span>
              </div>
            </header>

            <main style={{ flexGrow: 1, padding: '2rem 2rem 3rem', maxWidth: '72rem', margin: '0 auto', width: '100%' }}>

              {/* ─ Hero ─ */}
              <section style={{ marginBottom: '4rem' }}>
                <p style={{ fontSize: '0.75rem', color: '#00F5FF', marginBottom: '0.5rem' }}>
                  &gt;&nbsp;./ESTABLISHING_AUTHORITY.SH
                </p>
                <h1 className="glow-emerald" style={{ fontSize: 'clamp(2rem, 6vw, 3.75rem)', fontWeight: 700, marginBottom: '1rem' }}>
                  JOSE_CARDOZO<span className="glow-cyan" style={{ color: '#00F5FF' }}>©</span>
                </h1>
                <h2 className="glow-emerald" style={{ fontSize: 'clamp(2rem, 6vw, 3.75rem)', fontWeight: 700, marginBottom: '1rem' }}>
                  DARKROOT<span className="glow-cyan" style={{ color: '#00F5FF' }}>_STUDIO</span>
                </h2>
                <h2 style={{ fontSize: 'clamp(1rem, 3vw, 1.5rem)', color: 'rgba(0,255,156,0.8)', marginBottom: '1.5rem' }}>
                  [ HIGH-END INFRASTRUCTURE &amp; CREATIVE ENGINEERING ]
                </h2>

                <div style={{ backgroundColor: '#1A1A24', borderLeft: '4px solid #00F5FF', padding: '1.5rem', boxShadow: '0 4px 20px rgba(0,245,255,0.1)' }}>
                  <p style={{ fontSize: '0.875rem', lineHeight: '1.75', textTransform: 'none', color: '#e5e7eb' }}>
                    "Elevating the technical web standard." We merge the robustness of{' '}
                    <span className="glow-magenta" style={{ color: '#FF007A', fontWeight: 700 }}>SRE</span>{' '}
                    with <span className="glow-cyan" style={{ color: '#00F5FF', fontWeight: 700 }}>Premium Frontend</span>{' '}
                    design and immersive soundscapes.
                  </p>
                  <div style={{ marginTop: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                    <button
                      onClick={() => document.getElementById('consultant-projects')?.scrollIntoView({ behavior: 'smooth' })}
                      style={{ background: 'rgba(0,245,255,0.1)', border: '1px solid #00F5FF', color: '#00F5FF', padding: '0.5rem 1rem', cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.75rem', transition: 'all 0.3s', boxShadow: '0 0 10px rgba(0,245,255,0.3)' }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#00F5FF'; e.currentTarget.style.color = '#0A0A0F'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,245,255,0.1)'; e.currentTarget.style.color = '#00F5FF'; }}
                    >
                      [ VIEW_NODES (PROJECTS) ]
                    </button>
                    <button
                      onClick={() => document.getElementById('consultant-contact')?.scrollIntoView({ behavior: 'smooth' })}
                      style={{ background: 'transparent', border: '1px solid #FF007A', color: '#FF007A', padding: '0.5rem 1rem', cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.75rem', transition: 'all 0.3s' }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#FF007A'; e.currentTarget.style.color = '#fff'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#FF007A'; }}
                    >
                      [ OPEN_TERMINAL_CONTACT ]
                    </button>
                  </div>
                </div>
              </section>

              {/* ─ Sys Info + Radar ─ */}
              <section style={{ marginBottom: '4rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <span style={{ color: '#FF007A', marginRight: '0.5rem', fontSize: '1.25rem' }}>#</span>
                  <h3 className="glow-emerald" style={{ fontSize: '1.5rem', fontWeight: 700 }}>SYS_INFO: CORE_CAPABILITIES</h3>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <p style={{ fontSize: '0.7rem', textTransform: 'none', color: 'rgba(0,255,156,0.7)' }}>
                      Capabilities updated for 2026. Focus on the Power Pentagon.
                    </p>
                    <div style={{ border: '1px solid rgba(0,245,255,0.3)', padding: '1rem', backgroundColor: '#0A0A0F' }}>
                      <h4 style={{ color: '#00F5FF', marginBottom: '0.5rem' }}>&gt;&nbsp;FRONTEND_AUTHORITY</h4>
                      <p style={{ fontSize: '0.75rem', textTransform: 'none', color: '#d1d5db' }}>React, Tailwind, Three.js, and high-performance animations.</p>
                    </div>
                    <div style={{ border: '1px solid rgba(255,0,122,0.3)', padding: '1rem', backgroundColor: '#0A0A0F' }}>
                      <h4 style={{ color: '#FF007A', marginBottom: '0.5rem' }}>&gt;&nbsp;SENSORIAL_SOUND_DESIGN</h4>
                      <p style={{ fontSize: '0.75rem', textTransform: 'none', color: '#d1d5db' }}>Original sound design for interfaces, reactive music, and ambient soundscapes.</p>
                    </div>
                  <div style={{ border: '1px solid rgba(0,245,255,0.3)', padding: '1rem', backgroundColor: '#0A0A0F' }}>
                    <h4 style={{ color: '#00F5FF', marginBottom: '0.5rem' }}>&gt;&nbsp;BACKEND_AUTOMATOR</h4>
                    <p style={{ fontSize: '0.75rem', textTransform: 'none', color: '#d1d5db' }}>
                      Node.js, Python, CI/CD pipelines, automation scripts, cloud orchestration, and high-performance backend systems.
                    </p>
                  </div>
                  </div>
                  <RadarChart />
                </div>
              </section>

              {/* ─ Projects ─ */}
              <section id="consultant-projects" style={{ marginBottom: '4rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <span style={{ color: '#FF007A', marginRight: '0.5rem', fontSize: '1.25rem' }}>#</span>
                  <h3 className="glow-emerald" style={{ fontSize: '1.5rem', fontWeight: 700 }}>DEPLOYED_NODES: PROJECT_ARCHIVE</h3>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                  {[
                    { title: 'GCP_AUTOMATED_CLUSTER', desc: 'GKE cluster deployment with auto-scaling and advanced monitoring via Terraform.', link: '#' },
                    { title: 'NEURAL_UI_DASHBOARD',   desc: 'Interactive dashboard for IoT sensor control with visual aesthetics inspired by Blade Runner.', link: '#' },
                  ].map((project, i) => (
                    <div key={i} style={{ backgroundColor: '#1A1A24', border: '1px solid rgba(0,255,156,0.2)', overflow: 'hidden' }}>
                      <div style={{ height: '12rem', backgroundColor: '#0A0A0F', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid rgba(0,255,156,0.2)' }}>
                        <span style={{ fontSize: '0.75rem', color: 'rgba(0,255,156,0.2)' }}>[ PROJECT_IMG ]</span>
                      </div>
                      <div style={{ padding: '1.5rem' }}>
                        <h4 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#00F5FF' }}>{project.title}</h4>
                        <p style={{ fontSize: '0.75rem', textTransform: 'none', color: '#9ca3af', margin: '0.5rem 0 1rem' }}>{project.desc}</p>
                        <a href={project.link} style={{ fontSize: '0.75rem', color: '#FF007A', textDecoration: 'none' }}>[ EXPLORE_REPOSITORY ]</a>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* ─ Services ─ */}
              <section style={{ marginBottom: '4rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <span style={{ color: '#FF007A', marginRight: '0.5rem', fontSize: '1.25rem' }}>#</span>
                  <h3 className="glow-emerald" style={{ fontSize: '1.5rem', fontWeight: 700 }}>PREMIUM_MODULES: SERVICES</h3>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
                  {SERVICES.map(service => (
                    <div
                      key={service.id}
                      style={{ backgroundColor: '#1A1A24', border: `1px solid rgba(0,255,156,0.3)`, padding: '1.5rem', cursor: 'pointer', transition: 'border-color 0.3s', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                      onClick={() => setActiveModal(service.id)}
                      onMouseEnter={e => e.currentTarget.style.borderColor = service.hoverBorder}
                      onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(0,255,156,0.3)'}
                    >
                      <div>
                        <div style={{ fontSize: '1.5rem', marginBottom: '1rem', color: service.iconColor }}>{service.icon}</div>
                        <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>{service.title}</h4>
                        <p style={{ fontSize: '0.75rem', textTransform: 'none', color: '#9ca3af', marginBottom: '1rem' }}>{service.desc}</p>
                      </div>
                      <div style={{ fontSize: '0.75rem', borderTop: '1px solid rgba(0,255,156,0.2)', paddingTop: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                        <span>{service.meta1}</span>
                        <span style={{ color: service.meta2Color }}>{service.meta2}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* ─ Terminal Contact ─ */}
              <section id="consultant-contact" style={{ marginBottom: '4rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <span style={{ color: '#FF007A', marginRight: '0.5rem', fontSize: '1.25rem' }}>#</span>
                  <h3 className="glow-emerald" style={{ fontSize: '1.5rem', fontWeight: 700 }}>TERMINAL_COMM: ESTABLISH_LINK</h3>
                </div>
                <Terminal />
              </section>

            </main>

            <footer style={{ backgroundColor: '#1A1A24', borderTop: '1px solid rgba(0,255,156,0.3)', padding: '1rem', textAlign: 'center', fontSize: '0.75rem', color: 'rgba(0,255,156,0.6)', zIndex: 50 }}>
              DARKROOT STUDIO © 2026 | AUTHORIZED ACCESS ONLY
            </footer>
          </div>
        )}

        {/* Modal */}
        {activeModal && (
          <ServiceModal
            service={activeServiceData}
            onClose={() => setActiveModal(null)}
          />
        )}
      </div>
    </>
  );
}
