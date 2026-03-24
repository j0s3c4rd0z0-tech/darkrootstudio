import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Activity,
  Cpu,
  Layers,
  ShieldCheck,
  Zap,
  Menu,
  X,
  Monitor,
  Briefcase,
  Terminal as TerminalIcon,
  Search,
  Globe,
  Sun,
  Moon,
  Linkedin,
  Mail,
  Phone,
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  ChevronDown,
  ChevronRight,
  BarChart3,
  PieChart
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// --- Canvas Components ---
const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initParticles = () => {
      particlesRef.current = Array.from({ length: 50 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2
      }));
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#00F5FF';
      ctx.globalAlpha = 0.5;

      particlesRef.current.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initParticles();
    animate();

    const handleResize = () => {
      resizeCanvas();
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-20"
    />
  );
};

const DarkRootLogo = ({ className = "w-40 h-40" }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let angle = 0;

    const drawLogo = () => {
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const r = 60;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Rotating Outer Rings
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      ctx.strokeStyle = '#9D00FF';
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 10]);
      ctx.beginPath();
      ctx.arc(0, 0, r + 15, 0, Math.PI * 2);
      ctx.stroke();

      ctx.rotate(-angle * 2);
      ctx.strokeStyle = '#00F5FF';
      ctx.setLineDash([15, 15]);
      ctx.beginPath();
      ctx.arc(0, 0, r + 5, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      angle += 0.005;

      // Base Hexagon styling
      ctx.strokeStyle = '#00F5FF';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#00F5FF';
      ctx.shadowBlur = 10;
      ctx.setLineDash([]);

      // Calculate Hexagon Points
      const hexPoints = [];
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        hexPoints.push({
          x: cx + r * Math.cos(angle),
          y: cy + r * Math.sin(angle)
        });
      }

      // Draw Hexagon
      ctx.beginPath();
      hexPoints.forEach((p, i) => {
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.closePath();
      ctx.stroke();

      // Draw Nodes
      ctx.fillStyle = '#050508';
      hexPoints.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      });

      // Isometric Cube (Inner)
      const cubeR = r * 0.5;

      // Top face
      ctx.fillStyle = 'rgba(0, 245, 255, 0.2)';
      ctx.beginPath();
      ctx.moveTo(cx, cy - cubeR); // top
      ctx.lineTo(cx + cubeR * 0.866, cy - cubeR * 0.5); // right
      ctx.lineTo(cx, cy); // center
      ctx.lineTo(cx - cubeR * 0.866, cy - cubeR * 0.5); // left
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Left face
      ctx.fillStyle = 'rgba(157, 0, 255, 0.2)';
      ctx.strokeStyle = '#9D00FF';
      ctx.shadowColor = '#9D00FF';
      ctx.beginPath();
      ctx.moveTo(cx - cubeR * 0.866, cy - cubeR * 0.5);
      ctx.lineTo(cx, cy);
      ctx.lineTo(cx, cy + cubeR);
      ctx.lineTo(cx - cubeR * 0.866, cy + cubeR * 0.5);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Right face
      ctx.fillStyle = 'rgba(0, 245, 255, 0.1)';
      ctx.strokeStyle = '#00F5FF';
      ctx.shadowColor = '#00F5FF';
      ctx.beginPath();
      ctx.moveTo(cx + cubeR * 0.866, cy - cubeR * 0.5);
      ctx.lineTo(cx, cy);
      ctx.lineTo(cx, cy + cubeR);
      ctx.lineTo(cx + cubeR * 0.866, cy + cubeR * 0.5);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      animationId = requestAnimationFrame(drawLogo);
    };

    drawLogo();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width="160"
      height="160"
      className={className}
    />
  );
};

// --- Chart Components ---
const CostChart = () => {
  const data = {
    labels: ['Mes 1 (Legacy)', 'Mes 2 (Migración)', 'Mes 3 (Optimizado)'],
    datasets: [{
      label: 'Gasto Mensual Cloud ($)',
      data: [12500, 11000, 7500],
      backgroundColor: ['#FF007A', '#9D00FF', '#00FF9C'],
      borderWidth: 0,
      borderRadius: 4
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#050508',
        borderColor: '#00F5FF',
        borderWidth: 1,
        titleColor: '#00F5FF',
        bodyColor: '#d1d5db'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(255,255,255,0.05)' },
        ticks: { color: '#9ca3af' }
      },
      x: {
        grid: { display: false },
        ticks: { color: '#9ca3af' }
      }
    }
  };

  return (
    <div className="h-64">
      <Bar data={data} options={options} />
    </div>
  );
};

const StackChart = () => {
  const data = {
    labels: ['AWS / Cloud', 'Terraform / IaC', 'Kubernetes', 'CI/CD Pipelines'],
    datasets: [{
      data: [40, 25, 20, 15],
      backgroundColor: ['#00F5FF', '#9D00FF', '#00FF9C', '#1f2937'],
      borderColor: '#050508',
      borderWidth: 2,
      hoverOffset: 4
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '75%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 12,
          color: '#9ca3af',
          font: { family: "'JetBrains Mono', monospace" }
        }
      },
      tooltip: {
        backgroundColor: '#050508',
        borderColor: '#9D00FF',
        borderWidth: 1,
        titleColor: '#9D00FF',
        bodyColor: '#d1d5db'
      }
    }
  };

  return (
    <div className="h-64">
      <Doughnut data={data} options={options} />
    </div>
  );
};

// --- Setup Accordion Component ---
const SetupAccordion = () => {
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = useCallback((index) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  }, []);

  const setupSteps = [
    {
      title: "Instalación de Entorno",
      content: (
        <div>
          <p>Si no lo tienes, descarga e instala Node.js desde el sitio oficial:</p>
          <a
            href="https://nodejs.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#9D00FF] hover:underline mt-2 inline-block"
          >
            https://nodejs.org/
          </a>
        </div>
      )
    },
    {
      title: "Crear el Proyecto",
      content: (
        <div>
          <p>Abre una terminal en VS Code y ejecuta los siguientes comandos para crear la base Vite/React:</p>
          <div className="bg-[#050508] p-4 rounded mt-3 border border-white/10 font-mono text-[#00FF9C] text-xs">
            {`> npm create vite@latest darkroot-main -- --template react
> cd darkroot-main
> npm install`}
          </div>
        </div>
      )
    },
    {
      title: "Dependencias y Tailwind",
      content: (
        <div>
          <p>Instala los paquetes necesarios de diseño y animación, e inicializa Tailwind:</p>
          <div className="bg-[#050508] p-4 rounded mt-3 border border-white/10 font-mono text-[#00FF9C] text-xs">
            {`> npm install lucide-react framer-motion tailwindcss postcss autoprefixer
> npx tailwindcss init -p`}
          </div>
          <p className="mt-4">Configura <code className="text-[#FF007A]">tailwind.config.js</code>:</p>
          <div className="bg-[#050508] p-4 rounded mt-3 border border-white/10 font-mono text-gray-300 text-xs whitespace-pre">
            {`export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
}`}
          </div>
        </div>
      )
    },
    {
      title: "Importar Código y Ejecutar",
      content: (
        <div>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>Borra el contenido de <code className="text-white">src/App.jsx</code> y pega el código premium.</li>
            <li>Borra <code className="text-white">src/index.css</code> y añade las directivas base de Tailwind (@tailwind base; etc).</li>
          </ul>
          <div className="bg-[#050508] p-4 rounded mt-3 border border-white/10 font-mono text-[#00FF9C] text-xs">
            {`> npm run dev`}
          </div>
          <p className="mt-4">Para GitHub:</p>
          <div className="bg-[#050508] p-4 rounded mt-3 border border-white/10 font-mono text-gray-500 text-xs">
            {`> git init
> git add .
> git commit -m "Initial commit DarkRoot"`}
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-4">
      {setupSteps.map((step, index) => (
        <motion.div
          key={index}
          className="glass-panel overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <button
            className="setup-step w-full p-5 flex justify-between items-center text-left hover:bg-white/5 transition-colors"
            onClick={() => toggleItem(index)}
          >
            <h4 className="text-sm font-bold uppercase text-[#00F5FF]">
              {String.fromCharCode(10112 + index)} {step.title}
            </h4>
            <motion.span
              className="text-[#00F5FF] text-xl"
              animate={{ rotate: openItems.has(index) ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              +
            </motion.span>
          </button>
          <AnimatePresence>
            {openItems.has(index) && (
              <motion.div
                className="setup-content p-5 pt-0 ml-5 text-sm text-gray-400 bg-black/20"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {step.content}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

// --- Main ConsultantPage Component ---
export default function ConsultantPage() {
  const [activeView, setActiveView] = useState('hero');
  const [copied, setCopied] = useState(false);

  const copyToClipboard = useCallback((text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  const navItems = [
    { id: 'hero', label: '01_Núcleo', icon: Monitor },
    { id: 'setup', label: '02_Setup_OS', icon: TerminalIcon },
    { id: 'analytics', label: '03_Impacto', icon: BarChart3 },
    { id: 'contact', label: '04_Conexión', icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-[#050508] text-gray-300 font-mono relative overflow-hidden">
      <ParticleBackground />

      {/* HUD Scanlines */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-50 scanlines" />

      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen">
        {/* Sidebar */}
        <aside className="w-full lg:w-80 glass-panel border-r border-white/5 flex flex-col lg:h-screen lg:sticky lg:top-0 z-40">
          <div className="p-8 flex flex-col items-center border-b border-white/5 relative">
            <DarkRootLogo />
            <div className="text-center mt-4">
              <h1 className="text-2xl font-black italic tracking-tighter uppercase text-white">
                <span className="text-[#00F5FF]">Dark</span>Root
              </h1>
              <span className="text-[10px] tracking-[0.8em] font-bold text-gray-500 uppercase">Studio</span>
            </div>
          </div>

          <nav className="p-6 flex-grow flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`nav-btn w-full flex items-center gap-4 px-6 py-4 text-[10px] tracking-[0.4em] font-bold uppercase transition-all ${
                  activeView === item.id
                    ? 'text-[#00F5FF] bg-[#00F5FF]/10 border border-[#00F5FF]/50'
                    : 'text-gray-500 hover:text-[#00F5FF] border-transparent'
                } relative`}
              >
                <item.icon size={16} />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="p-8 border-t border-white/5 text-[9px] text-gray-600 tracking-widest uppercase text-center font-bold">
            darkrootstudio.net
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-grow p-6 md:p-12 lg:p-20 relative">
          <AnimatePresence mode="wait">
            {/* Hero View */}
            {activeView === 'hero' && (
              <motion.div
                key="hero"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-16"
              >
                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="h-[2px] w-12 bg-[#00F5FF]"></div>
                    <span className="text-[10px] tracking-[0.5em] font-black uppercase text-[#00FF9C]">Root_Access_Granted</span>
                  </div>
                  <h2 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter uppercase italic text-white mb-6">
                    Elevando <br />
                    <span className="bg-gradient-to-r from-[#00F5FF] to-[#9D00FF] bg-clip-text text-transparent">Infraestructura</span>
                  </h2>
                  <p className="max-w-2xl text-sm md:text-base italic font-light leading-relaxed border-l-4 pl-6 py-2 border-[#00F5FF] text-gray-400">
                    "Diseñamos arquitecturas invisibles y resilientes. Optimizamos el rendimiento cloud y aseguramos que tus raíces soporten una escala infinita mediante DevOps avanzado."
                  </p>

                  <div className="flex flex-wrap gap-4 pt-8">
                    <button
                      onClick={() => setActiveView('contact')}
                      className="chamfer-btn px-8 py-3 text-[10px] font-bold tracking-widest uppercase bg-[#00F5FF] text-[#050508] border border-[#00F5FF] hover:scale-105 transition-transform"
                    >
                      Iniciar Proyecto
                    </button>
                    <button
                      onClick={() => setActiveView('setup')}
                      className="chamfer-btn px-8 py-3 text-[10px] font-bold tracking-widest uppercase text-[#9D00FF] border border-[#9D00FF] hover:bg-[#9D00FF]/10 hover:scale-105 transition-all"
                    >
                      Ver Manual Setup
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { icon: ShieldCheck, label: "Disponibilidad SLA", value: "99.9%", color: "#00F5FF" },
                    { icon: Zap, label: "Ahorro Cloud Medio", value: "40%", color: "#00FF9C" },
                    { icon: Activity, label: "Automatización", value: "100%", color: "#9D00FF" }
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      className="glass-panel p-6 text-center border-t-2"
                      style={{ borderTopColor: stat.color }}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <stat.icon className="text-2xl mb-2 mx-auto" style={{ color: stat.color }} />
                      <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-2">{stat.label}</div>
                      <div className="text-4xl font-black text-white">{stat.value}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Setup View */}
            {activeView === 'setup' && (
              <motion.div
                key="setup"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                <div className="border-b border-white/10 pb-8">
                  <h3 className="text-4xl font-black text-white uppercase italic tracking-tighter">Manual de Setup OS</h3>
                  <p className="text-xs text-gray-500 font-mono tracking-widest uppercase mt-2">Instrucciones extraídas de: setup_darkroot.txt</p>
                  <p className="text-sm mt-4 text-gray-400">Despliega cada módulo para revisar los comandos necesarios para arrancar el entorno DarkRoot en Visual Studio Code.</p>
                </div>
                <SetupAccordion />
              </motion.div>
            )}

            {/* Analytics View */}
            {activeView === 'analytics' && (
              <motion.div
                key="analytics"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-12"
              >
                <div className="border-b border-white/10 pb-8">
                  <h3 className="text-4xl font-black text-white uppercase italic tracking-tighter">Impacto y Rendimiento</h3>
                  <p className="text-xs text-gray-500 font-mono tracking-widest uppercase mt-2">Visualización de métricas de optimización de infraestructura</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="glass-panel p-6">
                    <h4 className="text-[#00F5FF] text-sm uppercase tracking-widest font-bold mb-6 text-center">Costes AWS: Antes vs Después</h4>
                    <CostChart />
                    <p className="text-[10px] text-gray-500 text-center mt-4">Rediseño arquitectónico, autoscaling e instancias reservadas.</p>
                  </div>

                  <div className="glass-panel p-6">
                    <h4 className="text-[#9D00FF] text-sm uppercase tracking-widest font-bold mb-6 text-center">Uso del Tech Stack</h4>
                    <StackChart />
                    <p className="text-[10px] text-gray-500 text-center mt-4">Distribución tecnológica en despliegues automatizados.</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Contact View */}
            {activeView === 'contact' && (
              <motion.div
                key="contact"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-12"
              >
                <div className="border-b border-white/10 pb-8">
                  <h3 className="text-4xl font-black text-white uppercase italic tracking-tighter">Conexión de Nodo</h3>
                  <p className="text-xs text-gray-500 font-mono tracking-widest uppercase mt-2">Estableciendo enlace encriptado punto a punto...</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="glass-panel p-8">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 text-[#00F5FF] mb-2">
                            <Mail size={18} />
                            <span className="text-[10px] font-black tracking-widest uppercase">Punto de Email</span>
                          </div>
                          <h4 className="text-lg md:text-xl font-bold text-white">studiodarkroot@gmail.com</h4>
                        </div>
                        <button
                          onClick={() => copyToClipboard('studiodarkroot@gmail.com')}
                          className="p-2 hover:bg-white/10 rounded-md transition-colors"
                        >
                          {copied ? <Check size={16} className="text-[#00FF9C]" /> : <Copy size={16} className="text-gray-500" />}
                        </button>
                      </div>
                    </div>

                    <div className="glass-panel p-8">
                      <div>
                        <div className="flex items-center gap-2 text-[#00FF9C] mb-2">
                          <Phone size={18} />
                          <span className="text-[10px] font-black tracking-widest uppercase">Línea Segura</span>
                        </div>
                        <h4 className="text-3xl font-black tracking-widest text-white">+34 742098040</h4>
                        <p className="text-[9px] text-gray-500 uppercase font-bold mt-2">Málaga, España (ES)</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-6">
                    <a
                      href="https://www.linkedin.com/in/jose-cardozo-calderon-597650b3/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-panel p-8 hover:border-[#00F5FF]/50 transition-colors group block"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="text-3xl text-[#00F5FF] group-hover:scale-110 transition-transform">
                            <Linkedin />
                          </div>
                          <div>
                            <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest block mb-1">Nodo Corporativo</span>
                            <span className="text-lg font-bold uppercase text-white group-hover:text-[#00F5FF] transition-colors">LinkedIn Profile</span>
                          </div>
                        </div>
                        <ExternalLink size={20} className="text-gray-600 group-hover:text-[#00F5FF]" />
                      </div>
                    </a>

                    <a
                      href="https://josecardozo-github-io.vercel.app/home"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-panel p-8 hover:border-[#9D00FF]/50 transition-colors group block"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="text-3xl text-[#9D00FF] group-hover:scale-110 transition-transform">
                            <Monitor />
                          </div>
                          <div>
                            <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest block mb-1">Host Personal</span>
                            <span className="text-lg font-bold uppercase text-white group-hover:text-[#9D00FF] transition-colors">Portfolio Web</span>
                          </div>
                        </div>
                        <ExternalLink size={20} className="text-gray-600 group-hover:text-[#9D00FF]" />
                      </div>
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}