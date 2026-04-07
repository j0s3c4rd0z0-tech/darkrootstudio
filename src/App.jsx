import React, { useState, useEffect, useRef, useMemo } from 'react';
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
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ConsultantPage from './features/consultant/ConsultantPage';

// --- Cyber-Electric Logo Component (Official Replica + Advanced VFX) ---
const DarkrootLogo = ({ className = "", isDark }) => {
  const [activeRay, setActiveRay] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveRay((prev) => (prev + 1) % 4);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.svg 
      viewBox="0 0 200 200" 
      className={className} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <defs>
        <linearGradient id="electricGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00F5FF" />
          <stop offset="100%" stopColor="#9D00FF" />
        </linearGradient>
        <filter id="hyperGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Background Orbitals */}
      <motion.circle 
        cx="100" cy="85" r="75" 
        stroke={isDark ? "#00F5FF" : "#9D00FF"} 
        strokeWidth="0.5" strokeDasharray="10 5" opacity="0.2"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      {/* Electric Bolts (Dinamismo extra) */}
      <AnimatePresence>
        {[...Array(4)].map((_, i) => i === activeRay && (
          <motion.path
            key={i}
            d={`M100 25 Q${100 + (Math.random() - 0.5) * 100} ${85 + (Math.random() - 0.5) * 100} ${100 + (Math.random() - 0.5) * 50} 165`}
            stroke="#00F5FF"
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 0.8, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        ))}
      </AnimatePresence>

      {/* External Hexagon with Nodes */}
      <g filter="url(#hyperGlow)">
        <path d="M100 25 L165 60 V130 L100 165 L35 130 V60 Z" stroke="url(#electricGradient)" strokeWidth="2" opacity="0.8" />
        {[
          {x: 100, y: 25}, {x: 165, y: 60}, {x: 165, y: 130}, 
          {x: 100, y: 165}, {x: 35, y: 130}, {x: 35, y: 60}
        ].map((p, i) => (
          <motion.circle 
            key={i} cx={p.x} cy={p.y} r="3.5" 
            fill={isDark ? "#050508" : "#FFFFFF"} stroke="#00F5FF" strokeWidth="1"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </g>

      {/* Isometric Cube Core */}
      <g filter="url(#hyperGlow)">
        <path d="M100 65 L130 80 L100 95 L70 80 Z" fill="url(#electricGradient)" fillOpacity="0.1" stroke="url(#electricGradient)" strokeWidth="1.5" />
        <path d="M70 80 L100 95 V125 L70 110 Z" fill="url(#electricGradient)" fillOpacity="0.05" stroke="url(#electricGradient)" strokeWidth="1.5" />
        <path d="M130 80 L100 95 V125 L130 110 Z" fill="url(#electricGradient)" fillOpacity="0.05" stroke="url(#electricGradient)" strokeWidth="1.5" />
      </g>
    </motion.svg>
  );
};

// --- Particles Background (Adaptive to Theme) ---
const NetworkBackground = ({ isDark }) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.size = Math.random() * 1.5;
      }
      update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
      }
      draw() {
        ctx.fillStyle = isDark ? '#00F5FF' : '#9D00FF';
        ctx.globalAlpha = isDark ? 0.1 : 0.05;
        ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
      }
    }
    const init = () => { resize(); particles = Array.from({ length: 60 }, () => new Particle()); };
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      requestAnimationFrame(animate);
    };
    window.addEventListener('resize', resize);
    init(); animate();
    return () => window.removeEventListener('resize', resize);
  }, [isDark]);
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
};

// --- Shared Dynamic Components ---
const GlassPanel = ({ children, className = "", isDark }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`relative group ${className}`}
  >
    <div className={`absolute -inset-[1px] bg-gradient-to-r from-[#00F5FF]/30 to-[#9D00FF]/30 opacity-0 group-hover:opacity-100 blur-sm transition-opacity rounded-lg`} />
    <div className={`p-8 rounded-lg border border-white/5 backdrop-blur-xl h-full relative overflow-hidden ${isDark ? 'bg-[#0A0A0F]/80 text-white' : 'bg-white/70 text-gray-900 shadow-xl'}`}>
      {children}
    </div>
  </motion.div>
);

const ChamferButton = ({ children, onClick, variant = "primary", className = "", isDark }) => (
  <button 
    onClick={onClick}
    className={`relative px-8 py-3 uppercase tracking-[0.2em] text-[10px] font-bold transition-all duration-300 border 
      ${variant === 'alert' ? 'border-[#FF007A] text-[#FF007A] hover:bg-[#FF007A]/10' : 
        isDark ? 'border-[#00F5FF] text-[#00F5FF] hover:bg-[#00F5FF]/10' : 'border-[#9D00FF] text-[#9D00FF] hover:bg-[#9D00FF]/5'} 
      hover:scale-105 active:scale-95 ${className}`}
    style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
  >
    {children}
  </button>
);

// --- App Principal ---
export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('hero');
  const [isDark, setIsDark] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  const copyToClipboard = (text) => {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center font-mono ${isDark ? 'bg-[#050508]' : 'bg-gray-50'}`}>
        <DarkrootLogo className="w-64 h-64 mb-4" isDark={isDark} />
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "200px" }}
          className={`h-[1px] ${isDark ? 'bg-[#00F5FF]' : 'bg-[#9D00FF]'} shadow-[0_0_15px_#00F5FF]`}
        />
        <span className={`mt-4 text-[9px] tracking-[0.5em] uppercase font-bold ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Loading_Systems...</span>
      </div>
    );
  }

  const navItems = [
    { id: 'consultant', label: '00_CONSULTANT', icon: TerminalIcon },
    { id: 'hero', label: '01_CORE', icon: Monitor },
    { id: 'services', label: '02_SYSTEMS', icon: Layers },
    { id: 'cases', label: '03_LOGS', icon: Briefcase },
    { id: 'stack', label: '04_STACK', icon: Cpu },
    { id: 'pricing', label: '05_PLAN', icon: Zap },
    { id: 'contact', label: '06_CONNECT', icon: Mail },
  ];

  return (
    <div className={`min-h-screen font-mono transition-colors duration-500 ${isDark ? 'bg-[#050508] text-gray-300' : 'bg-[#F8F9FA] text-gray-700'}`}>
      <NetworkBackground isDark={isDark} />
      
      {/* HUD Scanlines */}
      <div className={`fixed inset-0 pointer-events-none z-[100] opacity-[0.03] ${isDark ? 'bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))]' : ''} bg-[length:100%_4px,3px_100%]`} />

      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen">
        
        {/* Sidebar */}
        <aside className={`fixed lg:relative z-50 w-72 h-screen backdrop-blur-3xl border-r border-white/5 transition-transform duration-500 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} ${isDark ? 'bg-[#0A0A0F]/95' : 'bg-white/90 border-gray-200'}`}>
          <div className="p-8 flex flex-col items-center">
            <DarkrootLogo className="w-48 h-48 mb-2" isDark={isDark} />
            <div className="text-center">
              <h1 className={`text-2xl font-black italic tracking-tighter uppercase ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <span className="text-[#00F5FF]">Dark</span>Root
              </h1>
              <span className="text-[8px] tracking-[0.8em] font-bold text-gray-500 uppercase">Studio</span>
            </div>
            <div className="mt-4 px-3 py-1 bg-[#00FF9C]/5 border border-[#00FF9C]/20 rounded-full flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-[#00FF9C] animate-pulse" />
               <span className="text-[7px] text-[#00FF9C] font-black uppercase">System Operational</span>
            </div>
          </div>

          <nav className="px-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
                className={`w-full group relative flex items-center gap-4 px-6 py-4 text-[10px] tracking-[0.4em] font-bold transition-all
                  ${activeTab === item.id ? (isDark ? 'text-white' : 'text-gray-900') : 'text-gray-500 hover:text-[#00F5FF]'}`}
              >
                {activeTab === item.id && (
                  <motion.div layoutId="navMarker" className={`absolute inset-0 border rounded-sm ${isDark ? 'border-[#00F5FF] bg-[#00F5FF]/5' : 'border-[#9D00FF] bg-[#9D00FF]/5'}`} />
                )}
                <item.icon size={14} className="relative z-10" />
                <span className="relative z-10">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="absolute bottom-8 w-full px-8 space-y-4">
            <button 
              onClick={() => setIsDark(!isDark)}
              className={`w-full flex items-center justify-between px-4 py-2 border border-white/10 rounded-sm text-[8px] font-bold tracking-widest uppercase transition-colors hover:bg-white/5`}
            >
              <span>{isDark ? 'Dark Mode' : 'Light Mode'}</span>
              {isDark ? <Moon size={12}/> : <Sun size={12}/>}
            </button>
            <div className="flex justify-between items-center text-[7px] text-gray-500 font-bold uppercase tracking-[0.3em] pt-4 border-t border-white/5">
              <span>Rev_2024.9</span>
              <Globe size={10} />
            </div>
          </div>
        </aside>

        {/* Toggle Mobile */}
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className={`lg:hidden fixed top-6 right-6 z-[60] p-3 shadow-lg ${isDark ? 'bg-[#00F5FF] text-[#0A0A0F]' : 'bg-[#9D00FF] text-white'}`}>
          {sidebarOpen ? <X size={20}/> : <Menu size={20}/>}
        </button>

        {/* Main Content Area */}
        <main className="flex-grow overflow-y-auto custom-scrollbar">
          <div className="max-w-6xl mx-auto p-8 md:p-16 lg:p-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.02, y: -10 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {activeTab === 'hero' && (
                  <div className="space-y-16">
                    <section className="space-y-8">
                       <div className="flex items-center gap-4">
                          <div className={`h-[1px] w-12 ${isDark ? 'bg-[#00F5FF]' : 'bg-[#9D00FF]'}`} />
                          <span className={`text-[10px] tracking-[0.5em] font-black uppercase ${isDark ? 'text-[#00FF9C]' : 'text-[#9D00FF]'}`}>JOSE_CARDOZO_Accessing_Main_Core</span>
                       </div>
                       <h2 className={`text-6xl md:text-8xl font-black leading-[0.85] tracking-tighter uppercase italic ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          JOSE CARDOZO <br />
                       </h2>
                       <h3>
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F5FF] via-[#9D00FF] to-[#00F5FF]">Software Engineer & Technology Consultant</span>
                       </h3>
                       <h3>
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F5FF] via-[#9D00FF] to-[#00F5FF]">SRE | Cloud Engineer | DevOps | Software Integration | DarkRoot Studio</span>
                       </h3>
                       <p className={`max-w-2xl text-sm md:text-lg italic font-light leading-relaxed border-l-4 pl-8 py-2 ${isDark ? 'text-gray-400 border-[#00F5FF]' : 'text-gray-600 border-[#9D00FF]'}`}>
                          I deliver resilient, scalable, and automated cloud solutions that support mission-critical operations. Expertise in containerization, CI/CD, and high-availability infrastructure.
                      </p>

                      <p className={`max-w-2xl text-sm md:text-lg italic font-light leading-relaxed border-l-4 pl-8 py-2 ${isDark ? 'text-gray-400 border-[#00F5FF]' : 'text-gray-600 border-[#9D00FF]'}`}>
                         "At DarkRoot Consultant Studio, we design and operate resilient, secure, and scalable cloud architectures.
                            We optimize performance, strengthen security, and enable reliable growth for mission-critical systems.."
                      </p>

                       <p className={`max-w-2xl text-sm md:text-lg italic font-light leading-relaxed border-l-4 pl-8 py-2 ${isDark ? 'text-gray-400 border-[#00F5FF]' : 'text-gray-600 border-[#9D00FF]'}`}>
                           Our mission is to empower organizations with performance, reliability, and sustainable growth through automation and engineering excellence.
                        </p>

                      <p className={`max-w-2xl text-sm md:text-lg italic font-light leading-relaxed border-l-4 pl-8 py-2 ${isDark ? 'text-gray-400 border-[#00F5FF]' : 'text-gray-600 border-[#9D00FF]'}`}>
                           Our vision is to build a world where every mission-critical system is resilient, efficient, and scalable, enabling businesses to thrive with confidence.
                       </p>
                       <div className="flex flex-wrap gap-6 pt-4">
                          <ChamferButton isDark={isDark} className={isDark ? "bg-[#00F5FF] !text-[#0A0A0F]" : "bg-[#9D00FF] !text-white"}>Initialize Project</ChamferButton>
                          <ChamferButton isDark={isDark} variant="alert">View Systems</ChamferButton>
                       </div>
                    </section>

                    <div className="grid md:grid-cols-3 gap-6">
                       {[
                         { l: "Efficiency", v: "99.9%", c: "#00F5FF", i: Activity },
                         { l: "Cloud Saving", v: "45%", c: "#00FF9C", i: Zap },
                         { l: "Automation", v: "Full", c: "#9D00FF", i: Cpu },
                       ].map((stat, i) => (
                         <GlassPanel key={i} isDark={isDark} className="text-center">
                            <stat.i size={20} className="mx-auto mb-4 opacity-40" style={{ color: stat.c }} />
                            <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1">{stat.l}</div>
                            <div className="text-4xl font-black" style={{ color: stat.c }}>{stat.v}</div>
                         </GlassPanel>
                       ))}
                    </div>
                  </div>
                )}

                {activeTab === 'contact' && (
                  <div className="space-y-12">
                    <header className="space-y-4">
                       <h3 className={`text-5xl font-black uppercase italic tracking-tighter ${isDark ? 'text-white' : 'text-gray-900'}`}>Connect_Node</h3>
                       <p className="text-xs text-gray-500 font-mono tracking-widest uppercase">Establishing peer-to-peer encrypted link...</p>
                    </header>

                    <div className="grid md:grid-cols-2 gap-8">
                       <div className="space-y-6">
                          <GlassPanel isDark={isDark}>
                             <div className="flex items-start justify-between">
                                <div className="space-y-4">
                                   <div className="flex items-center gap-3 text-[#00F5FF]">
                                      <Mail size={18} />
                                      <span className="text-[10px] font-black tracking-widest uppercase">Email Endpoint</span>
                                   </div>
                                   <h4 className="text-xl font-bold font-mono">studiodarkroot@gmail.com</h4>
                                </div>
                                <button onClick={() => copyToClipboard('studiodarkroot@gmail.com')} className="p-2 hover:bg-white/10 rounded-md transition-colors">
                                   {copied ? <Check size={16} className="text-[#00FF9C]" /> : <Copy size={16} className="text-gray-500" />}
                                </button>
                             </div>
                          </GlassPanel>

                          <GlassPanel isDark={isDark}>
                             <div className="space-y-4">
                                <div className="flex items-center gap-3 text-[#00FF9C]">
                                   <Phone size={18} />
                                   <span className="text-[10px] font-black tracking-widest uppercase">Direct Secure Line</span>
                                </div>
                                <h4 className="text-3xl font-black tracking-widest">+34 742098040</h4>
                                <div className="flex items-center gap-2 text-[9px] text-gray-500 uppercase font-bold">
                                   <Globe size={10} />
                                   <span>Málaga, Spain (ES)</span>
                                </div>
                             </div>
                          </GlassPanel>
                       </div>

                       <div className="grid gap-6">
                          <a href="https://www.linkedin.com/in/jose-cardozo-calderon-597650b3/" target="_blank" rel="noreferrer" className="group">
                             <GlassPanel isDark={isDark} className="hover:border-[#00F5FF]/50 transition-colors">
                                <div className="flex items-center justify-between">
                                   <div className="flex items-center gap-6">
                                      <div className={`p-4 rounded-lg ${isDark ? 'bg-[#00F5FF]/10 text-[#00F5FF]' : 'bg-[#00F5FF]/5 text-[#00F5FF]'} group-hover:scale-110 transition-transform`}>
                                         <Linkedin size={28} />
                                      </div>
                                      <div>
                                         <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest block mb-1">Corporate Node</span>
                                         <span className="text-lg font-bold group-hover:text-[#00F5FF] transition-colors uppercase">LinkedIn Profile</span>
                                      </div>
                                   </div>
                                   <ExternalLink size={16} className="text-gray-700" />
                                </div>
                             </GlassPanel>
                          </a>

                          <a href="https://josecardozo-github-io.vercel.app/home" target="_blank" rel="noreferrer" className="group">
                             <GlassPanel isDark={isDark} className="hover:border-[#9D00FF]/50 transition-colors">
                                <div className="flex items-center justify-between">
                                   <div className="flex items-center gap-6">
                                      <div className={`p-4 rounded-lg ${isDark ? 'bg-[#9D00FF]/10 text-[#9D00FF]' : 'bg-[#9D00FF]/5 text-[#9D00FF]'} group-hover:scale-110 transition-transform`}>
                                         <Monitor size={28} />
                                      </div>
                                      <div>
                                         <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest block mb-1">Personal Host</span>
                                         <span className="text-lg font-bold group-hover:text-[#9D00FF] transition-colors uppercase">Personal Portfolio</span>
                                      </div>
                                   </div>
                                   <ExternalLink size={16} className="text-gray-700" />
                                </div>
                             </GlassPanel>
                          </a>
                       </div>
                    </div>

                    <div className={`p-10 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 rounded-lg relative overflow-hidden group ${isDark ? 'bg-[#00F5FF]/5' : 'bg-[#9D00FF]/5'}`}>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        <div className="flex items-center gap-6 relative z-10">
                           <Sparkles size={32} className={isDark ? 'text-[#00F5FF]' : 'text-[#9D00FF]'} />
                           <div className="space-y-1">
                              <span className="text-[12px] font-black uppercase tracking-widest block">Ready to Scale?</span>
                              <span className="text-[9px] text-gray-500 uppercase tracking-widest">Guaranteed response within 2 business hours.</span>
                           </div>
                        </div>
                        <ChamferButton isDark={isDark} onClick={() => window.location.href="mailto:studiodarkroot@gmail.com"} className="relative z-10">Initiate Handshake</ChamferButton>
                    </div>
                  </div>
                )}

                {/* Simplified versions for other modules to maintain responsiveness */}
                {activeTab === 'services' && (
                  <div className="grid md:grid-cols-3 gap-6">
                    {[
                        [
  { 
    t: "Cloud Architecture", 
    d: "Designing resilient, high-availability cloud infrastructures across AWS, Azure & GCP, optimized for scalability and performance.", 
    i: Layers 
  },
  { 
    t: "Backend & API Services", 
    d: "Building robust backend systems and APIs with automated infrastructure, monitoring, and fault-tolerance.", 
    i: TerminalIcon 
  },
  { 
    t: "DevSecOps", 
    d: "Integrating security into CI/CD pipelines, ensuring compliant, secure, and automated deployment workflows.", 
    i: ShieldCheck 
  },
  { 
    t: "IaC & Automation", 
    d: "Infrastructure as Code with Terraform & Ansible, enabling automated provisioning, scaling, and configuration management.", 
    i: TerminalIcon 
  },
  { 
    t: "Observability & Monitoring", 
    d: "Implementing logging, metrics, and alerting to ensure performance, reliability, and fast incident response.", 
    i: EyeIcon 
  },
  { 
    t: "Infrastructure Optimization", 
    d: "Improving cloud performance, cost-efficiency, and resilience through best practices in architecture and automation.", 
    i: CpuIcon 
  }
]
                    ].map((s, i) => (
                      <GlassPanel key={i} isDark={isDark}>
                        <s.i className="text-[#00F5FF] mb-6" size={32} />
                        <h4 className="font-black uppercase tracking-widest text-xs mb-4">{s.t}</h4>
                        <p className="text-[11px] text-gray-500 leading-relaxed font-mono italic">{s.d}</p>
                      </GlassPanel>
                    ))}
                  </div>
                )}

                {activeTab === 'cases' && (
                  <div className="space-y-8">
                    {[
                      { n: "Fintech Migration", r: "99.99% Uptime", t: "Kubernetes / AWS" },
                      { n: "Legacy Modernization", r: "-45% Server Costs", t: "Azure / Terraform" }
                    ].map((c, i) => (
                      <GlassPanel key={i} isDark={isDark}>
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="text-xl font-black">{c.n}</h4>
                            <span className="text-[9px] text-gray-500 tracking-[0.4em] uppercase">{c.t}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-[#00FF9C] text-[10px] font-bold block mb-1 uppercase tracking-widest">Result</span>
                            <span className="text-2xl font-black">{c.r}</span>
                          </div>
                        </div>
                      </GlassPanel>
                    ))}
                  </div>
                )}
                
                {activeTab === 'stack' && (
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {["AWS", "Azure", "GCP", "Kubernetes", "Docker", "Terraform", "Ansible", "Jenkins", "Python", "Go", "Datadog", "Prometheus"].map((t, i) => (
                        <div key={t} className={`p-6 border border-white/5 text-center transition-all ${isDark ? 'hover:bg-[#00F5FF]/10 hover:border-[#00F5FF]/30' : 'hover:bg-[#9D00FF]/5 hover:border-[#9D00FF]/30'}`}>
                           <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">{t}</span>
                        </div>
                      ))}
                   </div>
                )}

                {activeTab === 'pricing' && (
                   <div className="grid md:grid-cols-3 gap-8">
                      {[
                        { t: "Audit", p: "€120/h", d: "On-demand system evaluation." },
                        { t: "Project", p: "€2.5k+", d: "Complete automation overhaul." },
                        { t: "Retainer", p: "€5k+", d: "Continuous architectural partnership." }
                      ].map((p, i) => (
                        <GlassPanel key={i} isDark={isDark} className="text-center border-t-2 border-t-[#00F5FF]">
                           <span className="text-[9px] text-gray-500 font-bold uppercase mb-4 block tracking-widest">{p.t}</span>
                           <div className="text-3xl font-black mb-4">{p.p}</div>
                           <p className="text-[10px] text-gray-600 mb-8 font-mono italic">{p.d}</p>
                           <ChamferButton isDark={isDark} className="w-full">Select Plan</ChamferButton>
                        </GlassPanel>
                      ))}
                   </div>
                )}

                {activeTab === 'consultant' && (
                  <div className="space-y-8">
                    <div className="text-center">
                      <h3 className={`text-4xl font-black uppercase italic tracking-tighter ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Consultant Mode
                      </h3>
                      <p className="text-sm text-gray-500 mt-4">Advanced terminal interface loading...</p>
                      <ConsultantPage />
                    </div>
                  </div>
                )}

              </motion.div>
            </AnimatePresence>
          </div>

          <footer className={`mt-auto border-t border-white/5 p-6 flex flex-col md:flex-row justify-between items-center gap-6 text-[8px] tracking-[0.4em] font-bold uppercase ${isDark ? 'bg-[#0A0A0F]/90 text-gray-600' : 'bg-white/80 text-gray-400'}`}>
             <div className="flex items-center gap-4">
                <span className="w-2 h-2 rounded-full bg-[#00FF9C] animate-pulse" />
                <span>Secure_Terminal_Stable</span>
             </div>
             <div className="text-center">Infrastructure // Security // Automation</div>
             <span className={isDark ? 'text-[#00F5FF]' : 'text-[#9D00FF]'}>© 2026 DARKROOTSTUDIO.NET</span>
          </footer>
        </main>
      </div>
    </div>
  );
}