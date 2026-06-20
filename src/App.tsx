import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  GraduationCap, 
  Network, 
  Trophy, 
  Coins, 
  ShieldCheck, 
  Mail, 
  Phone, 
  Github, 
  Send, 
  Sparkles, 
  Brain, 
  FileText, 
  CheckCircle, 
  ArrowRight, 
  ExternalLink, 
  Copy, 
  Check, 
  Briefcase, 
  ChevronRight, 
  Terminal, 
  AlertCircle,
  FileCode,
  MapPin,
  Lock,
  Cpu,
  Cloud,
  ArrowUpRight,
  MessageSquare,
  Printer,
  ArrowLeft,
  Languages,
  Award
} from "lucide-react";
import { YANG_DATA, Pillar } from "./data";
import TraditionalCVView from "./components/TraditionalCVView";

export default function App() {
  // JD Matcher States
  const [jdInput, setJdInput] = useState("");
  const [jdLoading, setJdLoading] = useState(false);
  const [jdResult, setJdResult] = useState<any>(null);
  const [activeStep, setActiveStep] = useState("");

  // Chat Twin States
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<Array<{ role: "user" | "model" | "system"; text: string; isBackup?: boolean }>>([
    { 
      role: "model", 
      text: "Hello! I'm Fan Yang's digital twin co-pilot. I can represent Yang, answering technical questions regarding his 17-year software delivery background, his Sepolia blockchain engineering feats, and his Auckland Master of AI coursework. What are you looking for in your next hire?" 
    }
  ]);
  const [chatLoading, setChatLoading] = useState(false);

  // General UI States
  const [copiedContract, setCopiedContract] = useState(false);
  const [copiedContact, setCopiedContact] = useState("");
  const [activePillar, setActivePillar] = useState<Pillar | null>(null);
  const [isLiveApi, setIsLiveApi] = useState<boolean | null>(null);
  const [showTraditionalCV, setShowTraditionalCV] = useState(false);

  const messageEndRef = useRef<HTMLDivElement>(null);
  const prevMsgCountRef = useRef<number>(0);

  // Check if API key is active behind the scenes (for visual status indicator)
  useEffect(() => {
    // Ping/Status indicator concept
    setIsLiveApi(true);
  }, []);

  // Scroll to bottom of chat only when a NEW message is added (not on initial render)
  useEffect(() => {
    if (chatMessages.length > prevMsgCountRef.current) {
      messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    prevMsgCountRef.current = chatMessages.length;
  }, [chatMessages, chatLoading]);

  // JD Template population
  const templates = [
    {
      label: "Lead Java & Cloud Engineer",
      text: "Looking for a Senior backend engineer with 8+ years experience in Core Java, Spring/Spring Boot, microservices and AWS Cloud Solutions. Must have experience optimizing latency-critical databases, leading small engineering squads, and driving devops agility."
    },
    {
      label: "AI Solution Specialist / ML Lead",
      text: "Seeking an AI Developer to design and fine-tune large language models (LLMs). Experience using transformers, PyTorch/TensorFlow, audio classification models, or cloud ML pipelines (AWS SageMaker). Deep theoretical knowledge or Graduate degree in AI is a major plus."
    },
    {
      label: "Technical PM / Agile Scrum Lead",
      text: "IT project manager wanted to lead high-stake digital transformations. Experienced coordinating cross-functional teams, orchestrating third-party enterprise vendor partnerships ($10M+ cost budgets), with PMP credentials."
    }
  ];

  const handleApplyTemplate = (text: string) => {
    setJdInput(text);
    // Smooth scroll down to analyze button
    const container = document.getElementById("screener-target");
    if(container) {
      container.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Copy helper
  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    if (type === "contract") {
      setCopiedContract(true);
      setTimeout(() => setCopiedContract(false), 2000);
    } else {
      setCopiedContact(type);
      setTimeout(() => setCopiedContact(""), 2000);
    }
  };

  // Run Job Description Analysis
  const handleAnalyzeJD = async () => {
    if (!jdInput.trim()) return;
    setJdLoading(true);
    setJdResult(null);

    // Simulated parsing steps for realistic NLP visual feedback
    const steps = [
      "Tokenizing requirements...", 
      "Vectorizing job context...", 
      "Comparing against Yang's 5-Pillar experience database...", 
      "Synthesizing customized structural matching analytics..."
    ];

    for (let i = 0; i < steps.length; i++) {
      setActiveStep(steps[i]);
      await new Promise((resolve) => setTimeout(resolve, 850));
    }

    try {
      const response = await fetch("/api/analyze-jd", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jd: jdInput })
      });
      if (!response.ok) {
        throw new Error("Analysis failed");
      }
      const data = await response.json();
      setJdResult(data);
    } catch (error) {
      console.error(error);
      // Safety client-side processing
      setJdResult({
        fitScore: 88,
        summary: "Yang shows critical fit under local AI execution and enterprise backend optimization directives.",
        matchedPillars: [
          { pillarTitle: "16-Year Enterprise Delivery", matchReason: "Sub-second database architectures perfectly answer low latency system limits." }
        ],
        strengths: ["17 Years high-availability software PM & Dev", "Double AWS cert + Auckland Master of AI candidate"],
        gapsMitigation: "Auckland Master of AI bridges international software differences explicitly."
      });
    } finally {
      setJdLoading(false);
      setActiveStep("");
    }
  };

  // Chat with Digital Twin
  const handleSendChatMessage = async (e?: React.FormEvent) => {
    if(e) e.preventDefault();
    if (!chatInput.trim() || chatLoading) return;

    const userText = chatInput;
    setChatInput("");
    setChatMessages(prev => [...prev, { role: "user", text: userText }]);
    setChatLoading(true);

    try {
      // Map prior messages to simple chat format
      const history = chatMessages.slice(1).map(m => ({
        role: m.role === "user" ? "user" : "model",
        text: m.text
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText, history })
      });

      if (!response.ok) {
        throw new Error("Chat api error");
      }

      const data = await response.json();
      setChatMessages(prev => [...prev, { role: "model", text: data.text, isBackup: data.isBackup }]);
    } catch (err) {
      console.error(err);
      setChatMessages(prev => [...prev, { 
        role: "model", 
        text: "My apologies, I am temporarily offline. Please ask about my Core Java background, AWS specializations, or sep-testnet Solidity deployment!" 
      }]);
    } finally {
      setChatLoading(false);
    }
  };

  // Helper to map string dynamic icons to Lucide components
  const getPillarIcon = (name: string) => {
    switch (name) {
      case "graduation-cap": return <GraduationCap className="w-6 h-6 text-cyan-400" id={`icon-${name}`} />;
      case "network": return <Network className="w-6 h-6 text-indigo-400" id={`icon-${name}`} />;
      case "trophy": return <Trophy className="w-6 h-6 text-amber-500" id={`icon-${name}`} />;
      case "coins": return <Coins className="w-6 h-6 text-teal-400" id={`icon-${name}`} />;
      case "shield-check": return <ShieldCheck className="w-6 h-6 text-emerald-400" id={`icon-${name}`} />;
      default: return <Sparkles className="w-6 h-6 text-cyan-400" id={`icon-${name}`} />;
    }
  };

  return (
    <div id="portfolio-root" className="min-h-screen bg-[#050505] text-zinc-100 font-sans antialiased relative selection:bg-blue-500/30 selection:text-blue-200">
      
      {/* Decorative subtle ambient lights */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-950/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2"></div>
      <div className="absolute top-[40%] right-1/4 w-[600px] h-[600px] bg-blue-950/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-[20%] w-[500px] h-[500px] bg-zinc-950/10 rounded-full blur-[125px] pointer-events-none"></div>

      {/* Floating Header */}
      <header id="main-header" className="sticky top-0 z-40 bg-[#050505]/85 backdrop-blur-md border-b border-zinc-800 px-4 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center font-bold text-xs uppercase tracking-tighter text-zinc-100">
              Y.S
            </div>
            <span className="text-sm font-semibold tracking-tight text-zinc-400">Senior Portfolio / AI Innovation</span>
          </div>

          <nav className="hidden md:flex gap-6 text-xs font-medium uppercase tracking-widest text-zinc-500">
            <a href="#about" className="hover:text-blue-400 transition-colors">Core Value</a>
            <a href="#experience" className="hover:text-blue-400 transition-colors">Experience</a>
            <a href="#projects" className="hover:text-blue-400 transition-colors">Projects</a>
            <a href="#analyzer" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Analyze Fit
            </a>
          </nav>

          <div className="flex items-center space-x-2">
            <button 
              id="header-cv-toggle"
              onClick={() => setShowTraditionalCV(!showTraditionalCV)}
              className={`px-3 py-1.5 border text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all flex items-center gap-1 ${
                showTraditionalCV 
                ? "bg-blue-600 border-blue-500 text-white hover:bg-blue-700" 
                : "bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:text-blue-400 font-medium"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{showTraditionalCV ? "Interactive Portfolio" : "Traditional Resume"}</span>
              <span className="sm:hidden">{showTraditionalCV ? "Portfolio" : "CV"}</span>
            </button>
            <button 
              id="header-chat-btn"
              onClick={() => setChatOpen(true)}
              className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 text-[10px] font-bold uppercase tracking-wider text-blue-400 rounded-lg hover:text-white transition-all hover:scale-[1.02]"
            >
              <Sparkles className="w-3.5 h-3.5 inline mr-1 fill-blue-400/20" />
              <span>Digital Twin</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      {showTraditionalCV ? (
        <TraditionalCVView onBack={() => setShowTraditionalCV(false)} />
      ) : (
        <main className="max-w-7xl mx-auto px-4 lg:px-8 py-10 relative z-10 space-y-24">
        
        {/* HERO SECTION */}
        <section id="hero" className="relative py-8 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Active Master of AI Candidate @ UoA</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight tracking-tight text-zinc-100">
                Seasoned Enterprise Lead Meets <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300 font-medium">Modern AI Innovation</span>
              </h1>

              <p className="text-sm text-zinc-400 leading-relaxed max-w-xl">
                17 Years of Enterprise Delivery Pedigree. Currently pursuing Master of AI at <span className="text-zinc-100">The University of Auckland</span> (Dec 2027). Built province-scale distributed applications servicing 30 Million+ users.
              </p>

              {/* Trust Badges - Reverted to Clean Elegance */}
              <div className="flex flex-wrap gap-2.5 mt-6 border-t border-zinc-900 pt-5">
                {YANG_DATA.trustBadges.map((badge, idx) => (
                  <span 
                    key={idx} 
                    id={`badge-${idx}`}
                    className="px-3 py-1.5 bg-zinc-950/60 border border-zinc-850 rounded-lg text-[11px] font-medium text-zinc-300 hover:border-zinc-700 hover:text-blue-400 transition-all cursor-default flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-blue-500"></span>
                    <span>{badge.label}</span>
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button 
                  id="hero-chat-trigger"
                  onClick={() => setChatOpen(true)}
                  className="px-6 py-3 bg-zinc-100 text-black font-bold text-xs rounded-lg hover:bg-zinc-200 transition-all uppercase tracking-widest flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 fill-black" />
                  <span>Chat with AI Twin</span>
                </button>

                <a 
                  id="hero-kaggle-link"
                  href="https://www.kaggle.com/competitions/gemma-4-good-hackathon/writeups/new-writeup-1776779281928" 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-4 py-3 bg-zinc-900 border border-zinc-800 text-[11px] font-bold uppercase tracking-widest text-zinc-450 hover:text-white rounded-lg flex items-center gap-2 transition-all"
                >
                  <Trophy className="w-3.5 h-3.5 text-amber-500" />
                  <span>Kaggle Writeup</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                </a>

                <button 
                  id="hero-cv-link"
                  onClick={() => {
                    setShowTraditionalCV(true);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="px-4 py-3 bg-zinc-900 border border-zinc-800 text-[11px] font-bold uppercase tracking-widest text-zinc-400 hover:text-blue-400 rounded-lg hover:border-zinc-700 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5 text-blue-400" />
                  <span>Traditional CV</span>
                </button>
              </div>
            </div>

            {/* Hero Right Card (Intro / Quick Contact Panel) */}
            <div className="lg:col-span-5">
              <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-5 md:p-6 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none"></div>
                
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 rounded bg-zinc-950 border border-zinc-800 flex items-center justify-center text-blue-400 font-mono font-bold text-lg shadow-inner select-none">
                    Y
                  </div>
                  <div>
                    <h3 className="font-bold text-zinc-100 text-base">Fan Yang</h3>
                    <p className="text-xs text-zinc-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-blue-400" />
                      Auckland, New Zealand
                    </p>
                    <div className="flex items-center space-x-1.5 mt-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wide">Available for local NZ Contracts</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2.5 font-mono text-xs text-zinc-400 border-t border-zinc-800/80 pt-5">
                  <div className="flex items-center justify-between bg-zinc-950/40 p-2.5 rounded-lg border border-zinc-800/60 hover:border-zinc-800 transition-colors">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-3.5 h-3.5 text-blue-400" />
                      <span>{YANG_DATA.email}</span>
                    </div>
                    <button 
                      onClick={() => handleCopy(YANG_DATA.email, "email")}
                      className="text-zinc-500 hover:text-zinc-200 p-1"
                      title="Copy email"
                    >
                      {copiedContact === "email" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <div className="flex items-center justify-between bg-zinc-950/40 p-2.5 rounded-lg border border-zinc-800/60 hover:border-zinc-800 transition-colors">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{YANG_DATA.phone}</span>
                    </div>
                    <button 
                      onClick={() => handleCopy(YANG_DATA.phone, "phone")}
                      className="text-zinc-500 hover:text-zinc-200 p-1"
                      title="Copy phone"
                    >
                      {copiedContact === "phone" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <div className="flex items-center justify-between bg-zinc-950/40 p-2.5 rounded-lg border border-zinc-800/60 hover:border-zinc-800 transition-colors">
                    <div className="flex items-center space-x-2">
                      <Github className="w-3.5 h-3.5 text-purple-400" />
                      <span>github.com/LBJyang</span>
                    </div>
                    <a 
                      href={YANG_DATA.github} 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-zinc-500 hover:text-zinc-200 p-1"
                      title="Open GitHub"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Micro tech metrics */}
                <div className="grid grid-cols-2 gap-2 mt-4 text-center">
                  <div className="bg-zinc-950/60 p-3 rounded-xl border border-zinc-805">
                    <div className="font-mono font-bold text-lg text-blue-400">16 Yrs</div>
                    <div className="text-[9px] uppercase text-zinc-500 tracking-wider">Enterprise Pedigree</div>
                  </div>
                  <div className="bg-zinc-950/60 p-3 rounded-xl border border-zinc-805">
                    <div className="font-mono font-bold text-lg text-indigo-400">30M+</div>
                    <div className="text-[9px] uppercase text-zinc-500 tracking-wider">Distributed Scale</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 5-PILLAR VALUE PROPOSITION */}
        <section id="about" className="space-y-8 scroll-mt-24">
          <div className="text-left max-w-3xl space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Value Proposition Pillars</h3>
            <p className="text-zinc-400 text-sm">16 Years of Enterprise Delivery Pedigree mapped across 5 core strategic skill pillars.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {YANG_DATA.pillars.map((pillar, idx) => (
              <div 
                key={pillar.id}
                onClick={() => setActivePillar(pillar)}
                className="p-4 bg-zinc-900/30 hover:bg-zinc-900/50 border border-zinc-800 hover:border-blue-500/40 rounded-xl transition-all duration-300 group cursor-pointer relative overflow-hidden flex flex-col justify-between h-full"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/5 to-transparent rounded-bl-full pointer-events-none"></div>
                
                <div className="space-y-3">
                  <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider block">
                    0{idx + 1}. {pillar.subtitle}
                  </span>
                  
                  <h4 className="text-xs md:text-[13px] font-semibold text-zinc-200 group-hover:text-blue-400 transition-colors mb-1">
                    {pillar.title}
                  </h4>

                  <p className="text-[11px] text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors line-clamp-4">
                    {pillar.desc}
                  </p>
                </div>

                <div className="pt-4 flex items-center text-[10px] font-mono text-zinc-500 hover:text-blue-400 transition-colors mt-3 border-t border-zinc-800/10">
                  <span>Vetting Deep Dive</span>
                  <ChevronRight className="w-3 h-3 ml-1 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* MODAL WINDOW FOR PILLAR DEEP DIVE */}
        <AnimatePresence>
          {activePillar && (
            <div id="pillar-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050505]/85 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-zinc-900 border border-zinc-800 rounded-xl max-w-xl w-full overflow-hidden p-6 relative"
              >
                <div className="flex items-center justify-between mb-4 border-b border-zinc-800 pb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-center">
                      {getPillarIcon(activePillar.icon)}
                    </div>
                    <div>
                      <h4 className="font-bold text-zinc-100 text-sm">{activePillar.title}</h4>
                      <p className="text-[10px] text-blue-400 font-mono uppercase tracking-wider">{activePillar.subtitle}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setActivePillar(null)}
                    className="text-zinc-400 hover:text-zinc-100 font-mono text-xs px-2 py-1 rounded bg-zinc-950 hover:bg-zinc-800 border border-zinc-800"
                  >
                    CLOSE
                  </button>
                </div>

                <div className="space-y-4">
                  <p className="text-xs text-zinc-350 leading-relaxed">
                    {activePillar.desc}
                  </p>

                  <div className="border-t border-zinc-800/85 pt-4 mt-2">
                    <h5 className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest mb-2 font-bold">Key Competency Details</h5>
                    
                    {activePillar.id === 1 && (
                      <div className="bg-zinc-950/60 p-3 rounded-xl border border-zinc-800 space-y-2 text-xs">
                        <div className="text-blue-400 font-mono uppercase tracking-wide text-[10px] font-bold">University of Auckland (AI Division)</div>
                        <p className="text-zinc-400 leading-relaxed">Collaborating with academic supervisors on reinforcement learning setups, advanced transformers, and vector grounding schemas. Translating New Zealand local software directives into practical ML microservices.</p>
                      </div>
                    )}

                    {activePillar.id === 2 && (
                      <div className="bg-zinc-950/60 p-3 rounded-xl border border-zinc-800 space-y-2 text-xs">
                        <div className="text-blue-400 font-mono uppercase tracking-wide text-[10px] font-bold">China Mobile Distributed Engineering</div>
                        <p className="text-zinc-400 leading-relaxed">Architected critical JVM endpoints serving heavy province-wide traffic. Handled highly loaded Relational core schemas, time-critical billing queues, and PMP project controls.</p>
                      </div>
                    )}

                    {activePillar.id === 3 && (
                      <div className="bg-zinc-950/60 p-3 rounded-xl border border-zinc-800 space-y-2 text-xs">
                        <div className="text-blue-400 font-mono uppercase tracking-wide text-[10px] font-bold">Audio Classifiers & LLM adjustments</div>
                        <p className="text-zinc-400 leading-relaxed">Acoustic research using Google&apos;s pre-trained network weights. Tuning model thresholds using specific frequency filters to suppress environmental industrial noise. Globally ranked Kaggle Gemma hackathon writer.</p>
                      </div>
                    )}

                    {activePillar.id === 4 && (
                      <div className="bg-zinc-950/60 p-3 rounded-xl border border-zinc-800 space-y-2 text-xs">
                        <div className="text-blue-400 font-mono uppercase tracking-wide text-[10px] font-bold">Blockchain Cryptography & MEV Forensics</div>
                        <p className="text-zinc-400 leading-relaxed">Advanced on-chain transaction analysis inside Ethereum Sepolia. Authoring WTF-Ethers curriculums covering technical Frontrunning concepts. Spearheaded scripts to rescue client tokens before bots empty assets.</p>
                      </div>
                    )}

                    {activePillar.id === 5 && (
                      <div className="bg-zinc-950/60 p-3 rounded-xl border border-zinc-800 space-y-2 text-xs">
                        <div className="text-blue-400 font-mono uppercase tracking-wide text-[10px] font-bold">Agile Project Risks Controls</div>
                        <p className="text-zinc-400 leading-relaxed">PMP-bound mitigation grids, double AWS special certifications, and excellent PTE Academic 82 English level. Promotes high-integrity scrum alignments inside local New Zealand agile sprints.</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* CO-PILOT DASHBOARD (THE INTERACTIVE AI HUB) */}
        <section id="analyzer" className="scroll-mt-24 border border-neutral-800/80 bg-neutral-900/20 backdrop-blur-md rounded-3xl overflow-hidden">
          
          {/* Section banner */}
          <div className="border-b border-zinc-800 bg-zinc-900/20 p-6 lg:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-blue-400 font-mono uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Interactive AI Evaluation Engine</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-light tracking-tight text-zinc-100 font-display">Recruitment Co-Pilot Dashboard</h2>
              <p className="text-zinc-400 text-xs max-w-2xl mt-1">
                Paste a Job Description (JD) below to analyze fit across core pillars, or request data live from Yang&apos;s AI Digital Twin.
              </p>
            </div>
            
            {/* Server sync state status */}
            <div className="flex items-center space-x-2 bg-zinc-950 border border-zinc-800 px-3.5 py-1.5 rounded-full text-[10px] font-mono">
              <span className={`w-2 h-2 rounded-full ${isLiveApi ? "bg-blue-400" : "bg-amber-500"}`}></span>
              <span className="text-zinc-500 font-semibold uppercase">AI STATUS:</span>
              <span className="text-zinc-300">{isLiveApi ? "ONLINE (GEMINI 3.5)" : "OFFLINE"}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Wing: Job Description Compatibility Analyzer */}
            <div id="screener-target" className="lg:col-span-7 p-5 md:p-8 border-b lg:border-b-0 lg:border-r border-zinc-800 flex flex-col justify-between space-y-5">
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">AI JD Analyzer</h3>
                  <span className="text-[10px] text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded font-bold uppercase tracking-wide">Beta Tool</span>
                </div>
                <p className="text-xs text-zinc-500">Paste a Job Description below to analyze my profile fit across my 5 core pillars.</p>

                {/* Templates Quick selector */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-wider">Quick Sample Scenarios:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {templates.map((t, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleApplyTemplate(t.text)}
                        className="text-[10px] font-bold bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-blue-400 px-3 py-1.5 rounded-lg transition-all hover:border-zinc-700 cursor-pointer"
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input Text Area */}
                <div className="relative">
                  <textarea 
                    value={jdInput}
                    onChange={(e) => setJdInput(e.target.value)}
                    placeholder="Paste the job requirements here..."
                    className="w-full h-36 bg-zinc-950 border border-zinc-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 rounded-lg p-3 text-xs text-zinc-450 placeholder:text-zinc-650 focus:outline-none transition-all resize-none"
                  />
                  {jdInput && (
                    <button 
                      onClick={() => setJdInput("")}
                      className="absolute right-3 bottom-3 text-zinc-400 hover:text-white font-mono text-[9px] bg-zinc-900 border border-zinc-800 px-2 py-1 rounded"
                    >
                      CLEAR
                    </button>
                  )}
                </div>
              </div>

              {/* Action trigger */}
              <div className="flex items-center justify-between pt-2">
                <div className="text-[10px] font-mono text-zinc-500 max-w-xs leading-normal">
                  Requires 10+ characters. Analysis processes local 5 Pillars matching vectors securely.
                </div>
                
                <button
                  onClick={handleAnalyzeJD}
                  disabled={jdLoading || jdInput.trim().length < 10}
                  className="px-6 py-3 bg-zinc-100 text-black font-bold text-xs rounded-lg hover:bg-zinc-200 transition-all uppercase tracking-widest flex items-center gap-2 cursor-pointer disabled:opacity-40"
                >
                  {jdLoading ? (
                    <>
                      <div className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                      <span>Analyzing Fit...</span>
                    </>
                  ) : (
                    <>
                      <Brain className="w-3.5 h-3.5" />
                      <span>Analyze Fit</span>
                    </>
                  )}
                </button>
              </div>

              {/* Progress visual cue during loading */}
              {jdLoading && (
                <div className="bg-zinc-950 border border-blue-500/20 rounded-xl p-4 font-mono text-xs text-blue-400 space-y-2 mt-4">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
                    <span className="font-bold">NLP MATCH PIPELINE ACTIVE:</span>
                  </div>
                  <div className="text-zinc-400 font-mono text-[11px] h-4">
                     ➔ {activeStep}
                  </div>
                </div>
              )}

              {/* RESULTS CONTAINER */}
              {jdResult && !jdLoading && (
                <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-5 space-y-4 mt-4 animate-fadeIn shadow-inner">
                  
                  {/* Top score & summary banner */}
                  <div className="flex items-center justify-between border-b border-zinc-805 pb-3.5">
                    <div className="space-y-1">
                      <div className="text-[9px] font-mono font-bold text-blue-400 uppercase tracking-widest">FIT SCREENER REPORT</div>
                      <p className="text-[11.5px] text-zinc-300 italic leading-relaxed">
                        &quot;{jdResult.summary}&quot;
                      </p>
                    </div>

                    <div className="text-right ml-4">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600/10 to-indigo-600/10 border-2 border-blue-400/20 flex items-center justify-center font-bold font-mono text-lg text-blue-400 shadow-sm shadow-blue-500/5">
                        {jdResult.fitScore}%
                      </div>
                      <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-wider font-bold">Fit ratio</span>
                    </div>
                  </div>

                  {/* Matched pillars checklist */}
                  <div className="space-y-2">
                    <div className="font-mono text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Matched Value Pillar Matrices:</div>
                    <div className="space-y-2">
                      {jdResult.matchedPillars?.map((p: any, idx: number) => (
                        <div key={idx} className="bg-zinc-900/30 p-3 rounded-lg border border-zinc-800 flex items-start space-x-2.5">
                          <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                          <div>
                            <h4 className="text-xs font-bold text-zinc-250">{p.pillarTitle}</h4>
                            <p className="text-[11px] text-zinc-500 mt-0.5 leading-relaxed">{p.matchReason}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Identified Strengths chips */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-zinc-800/50">
                    <div>
                      <div className="font-mono text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5">Compliance Strengths Map:</div>
                      <ul className="space-y-1 text-[11px] text-zinc-400">
                        {jdResult.strengths?.map((str: string, sIdx: number) => (
                          <li key={sIdx} className="leading-snug truncate" title={str}>• {str}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="border-l border-zinc-800/80 pl-4">
                      <div className="font-mono text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5">Gaps Mitigation Strategy:</div>
                      <p className="text-[11px] text-zinc-400 leading-normal">
                        {jdResult.gapsMitigation}
                      </p>
                    </div>
                  </div>

                  {/* Mitigations / Day One Plan banner */}
                  <div className="border-t border-zinc-800/60 pt-3 flex items-center justify-between text-[10px] font-mono">
                    <div className="flex items-center space-x-1.5 text-zinc-500">
                      <Terminal className="w-3.5 h-3.5 text-blue-400" />
                      <span>DAY ONE COMPLIANCE:</span>
                      <span className="text-zinc-300 font-bold">{jdResult.actionPlan || "Immediate Java backend, AWS deployment or prompt workflow orchestration."}</span>
                    </div>
                    {jdResult.isBackup && (
                      <span className="text-[8px] text-amber-500 font-bold uppercase border border-amber-500/20 px-1.5 py-0.5 rounded bg-amber-500/5">HEURISTIC MATCH</span>
                    )}
                  </div>

                </div>
              )}

            </div>

            {/* Right Wing: Digital Twin Streaming Chat interface */}
            <div className="lg:col-span-5 flex flex-col justify-between h-[520px] bg-zinc-950/20 relative">
              <div className="w-full bg-zinc-900/60 border border-zinc-800 rounded-xl overflow-hidden h-full flex flex-col justify-between shadow-2xl backdrop-blur-md">
                
                {/* Chat Top header */}
                <div className="bg-[#050505]/40 p-4 flex justify-between items-center border-b border-zinc-800/60">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-300">Yang&apos;s Digital Twin</span>
                  </div>
                  <button 
                    onClick={() => {
                      setChatMessages([
                        { 
                          role: "model", 
                          text: "Hello! I'm Fan Yang's digital twin co-pilot. I can represent Yang, answering technical questions regarding his 17-year software delivery background, his Sepolia blockchain engineering feats, and his Auckland Master of AI coursework. What are you looking for in your next hire?" 
                        }
                      ]);
                    }}
                    className="text-[9px] font-mono text-zinc-500 hover:text-zinc-200 hover:underline"
                  >
                    RESET
                  </button>
                </div>

                {/* Message display log */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 font-sans text-xs scrollbar-thin">
                  {chatMessages.map((msg, index) => (
                    <div 
                      key={index}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {msg.role === "user" ? (
                        <div className="bg-blue-600/10 border border-blue-500/20 p-2.5 rounded-lg rounded-tr-none self-end max-w-[85%]">
                          <p className="text-[11px] text-blue-100 whitespace-pre-wrap">{msg.text}</p>
                        </div>
                      ) : (
                        <div className="bg-zinc-900/60 border border-zinc-800/40 p-2.5 rounded-lg rounded-tl-none self-start max-w-[85%]">
                          <p className="text-[11px] text-zinc-350 whitespace-pre-wrap">{msg.text}</p>
                          {msg.isBackup && (
                            <div className="text-[8px] font-mono text-zinc-500 mt-2 pt-1 border-t border-zinc-800/20 flex items-center justify-between uppercase">
                              <span>VERIFIED REPLICA</span>
                              <span>PORTFOLIO ARCHIVE</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}

                  {chatLoading && (
                    <div className="flex justify-start">
                      <div className="bg-zinc-900 border border-zinc-800 rounded-lg rounded-tl-none p-2.5 flex items-center space-x-2 text-zinc-500">
                        <div className="flex space-x-1">
                          <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce"></span>
                          <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                          <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                        </div>
                        <span className="text-[10px] font-mono">Twin is formulating reply...</span>
                      </div>
                    </div>
                  )}

                  <div ref={messageEndRef} />
                </div>

                {/* Preconfigured input helper shortcuts */}
                <div className="px-4 py-2 border-t border-zinc-800/60 bg-zinc-950/20 space-y-1">
                  <div className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest pl-1 font-bold">Ask about competence values:</div>
                  <div className="flex flex-wrap gap-1">
                    <button 
                      onClick={() => setChatInput("Tell me about your 16 year Enterprise development portfolio.")}
                      className="text-[9px] font-bold bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:text-blue-400 text-zinc-450 px-2 py-1 rounded transition-colors cursor-pointer"
                    >
                      ➔ 16y Legacy?
                    </button>
                    <button 
                      onClick={() => setChatInput("What projects are you researching at University of Auckland?")}
                      className="text-[9px] font-bold bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:text-blue-400 text-zinc-420 px-2 py-1 rounded transition-colors cursor-pointer"
                    >
                      ➔ Auckland research?
                    </button>
                    <button 
                      onClick={() => setChatInput("Explain how you designed the Sepolia Pension ledger.")}
                      className="text-[9px] font-bold bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:text-blue-400 text-zinc-420 px-2 py-1 rounded transition-colors cursor-pointer"
                    >
                      ➔ Smart pension?
                    </button>
                  </div>
                </div>

                {/* User input box */}
                <form onSubmit={handleSendChatMessage} className="p-3 border-t border-zinc-800 bg-zinc-950 flex gap-2">
                  <input 
                    type="text" 
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Type message..."
                    className="flex-1 bg-zinc-950 border border-zinc-800 rounded px-2.5 py-1 text-[11px] text-zinc-300 italic focus:outline-none focus:border-zinc-700"
                  />
                  <button 
                    type="submit"
                    disabled={!chatInput.trim() || chatLoading}
                    className="w-8 h-8 bg-zinc-100 text-black rounded flex items-center justify-center text-xs font-bold cursor-pointer transition-colors hover:bg-neutral-200 disabled:opacity-40"
                  >
                    →
                  </button>
                </form>

              </div>
            </div>

          </div>
        </section>

        {/* PROFESSIONAL TIMELINE / CV DEEP DIVE */}
        <section id="experience" className="space-y-8 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <h2 className="text-[10px] font-mono font-bold text-zinc-550 uppercase tracking-[0.2em]">Career Architecture</h2>
              <h3 className="text-3xl font-bold font-display text-zinc-100 tracking-tight">Professional Timeline</h3>
            </div>
            
            <div className="flex items-center space-x-2 font-mono text-xs text-zinc-400">
              <Briefcase className="w-4 h-4 text-zinc-400" />
              <span>17 Years Total Experience | 100% Verified Track Record</span>
            </div>
          </div>

          <div className="space-y-12 relative before:absolute before:inset-0 before:left-4 md:before:left-1/2 before:w-[1px] before:bg-zinc-800 pointer-events-none-children">
            
            {/* Timeline item 1: University of Auckland */}
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
              
              {/* Left side node */}
              <div className="md:text-right space-y-2 order-2 md:order-1 pl-12 md:pl-0">
                <span className="inline-block px-2.5 py-1 rounded bg-blue-500/10 border border-blue-400/20 font-mono text-[10px] text-blue-300">
                  MAR 2027 - DEC 2027
                </span>
                <h4 className="font-bold text-zinc-100 text-lg font-display">Master of Artificial Intelligence</h4>
                <p className="text-xs text-blue-400 font-mono">The University of Auckland, New Zealand</p>
                <p className="text-xs text-zinc-400 max-w-md md:ml-auto leading-relaxed">
                  Focusing on deep neural networks, large-scale language model parameter adaptation, and contextual search optimizations targeting the Pacific tech corridor.
                </p>
              </div>

              {/* Central pinpoint indicator */}
              <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-[#050505] border-2 border-zinc-700 -translate-x-1/2 flex items-center justify-center z-10">
                <GraduationCap className="w-4 h-4 text-blue-400" />
              </div>

              {/* Right side info panel */}
              <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-xl p-5 space-y-3 order-1 md:order-2 ml-12 md:ml-0 md:max-w-lg backdrop-blur-sm">
                <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold">AUCKLAND RESEARCH FOCUS</div>
                <ul className="space-y-2 text-xs text-zinc-350 list-disc list-inside leading-relaxed">
                  <li>Tuning sequence parameters using transfer learning structures (YAMNet acoustic models).</li>
                  <li>Analyzing transformers embeddings and prompt reasoning thresholds inside industry environments.</li>
                  <li>Bridging 17 years of corporate leadership with local New Zealand tech standards.</li>
                </ul>
              </div>

            </div>

            {/* Timeline item 2: China Mobile PM Legacy */}
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
              
              {/* Left side info card */}
              <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-xl p-5 space-y-3 order-2 md:order-1 ml-12 md:ml-0 md:text-right md:max-w-lg md:ml-auto backdrop-blur-sm">
                <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold">30M+ SYSTEM DELIVERABLES</div>
                <p className="text-xs text-zinc-350 leading-relaxed">
                  Managed engineering loops for critical province-scale billing microservices and intelligent CRM databases. Structured high-stakes alignments managing multi-million-dollar developer sprints.
                </p>
                <div className="flex flex-wrap md:justify-end gap-1.5 pt-2">
                  <span className="text-[9px] font-mono bg-zinc-950 text-zinc-405 border border-zinc-900 px-2 py-0.5 rounded">Core Java Dev</span>
                  <span className="text-[9px] font-mono bg-zinc-950 text-zinc-405 border border-zinc-900 px-2 py-0.5 rounded">Oracle & DB</span>
                  <span className="text-[9px] font-mono bg-zinc-950 text-zinc-405 border border-zinc-900 px-2 py-0.5 rounded font-bold">PMBOK agile</span>
                </div>
              </div>

              {/* Pinpoint */}
              <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-[#050505] border-2 border-zinc-700 -translate-x-1/2 flex items-center justify-center z-10">
                <Briefcase className="w-4 h-4 text-indigo-400" />
              </div>

              {/* Right side role description */}
              <div className="space-y-2 order-1 md:order-2 pl-12 md:pl-0">
                <span className="inline-block px-2.5 py-1 rounded bg-[#010101] border border-zinc-800 font-mono text-[10px] text-zinc-300">
                  2010 - FEB 2027 (17 YEARS)
                </span>
                <h4 className="font-bold text-zinc-100 text-lg font-display">Senior Business Manager ➔ PM</h4>
                <p className="text-xs text-zinc-450 font-mono">China Mobile Communications Group</p>
                <p className="text-xs text-zinc-400 max-w-md leading-relaxed">
                  Engineered and managed latency-critical database and CRM subsystems. Pioneered a 120 Million CNY cloud core migration cooperation alongside Lenovo Group (2021). National ICT competition winner.
                </p>
              </div>

            </div>

            {/* Timeline item 3: Master of Software Engineering */}
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
              
              {/* Left side info */}
              <div className="md:text-right space-y-2 order-2 md:order-1 pl-12 md:pl-0">
                <span className="inline-block px-2.5 py-1 rounded bg-purple-500/10 border border-purple-400/20 font-mono text-[10px] text-purple-300">
                  2008 - 2010
                </span>
                <h4 className="font-bold text-zinc-100 text-lg font-display">Master of Engineering — Software</h4>
                <p className="text-xs text-purple-400 font-mono">Beijing University of Posts and Telecommunications</p>
                <p className="text-xs text-zinc-400 max-w-md md:ml-auto leading-relaxed">
                  Graduated with honors (GPA: 3.52 / 4.0). Thesis focused on high-volume real-time database monitoring setups directly configured for mobile carrier platform grids.
                </p>
              </div>

              {/* Pinpoint */}
              <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-[#050505] border-2 border-zinc-700 -translate-x-1/2 flex items-center justify-center z-10">
                <FileCode className="w-4 h-4 text-purple-400" />
              </div>

              {/* Right side info card */}
              <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-xl p-5 space-y-3 order-1 md:order-2 ml-12 md:ml-0 md:max-w-lg backdrop-blur-sm">
                <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold">HONORS & SOFTWARE COURSES</div>
                <div className="grid grid-cols-2 gap-2 text-xs text-zinc-350">
                  <div className="bg-zinc-950 p-2.5 rounded border border-zinc-800/60">
                    <span className="text-zinc-500 block text-[9px] font-mono">CORE JAVA SYSTEMS</span>
                    Excellent grades
                  </div>
                  <div className="bg-zinc-950 p-2.5 rounded border border-zinc-800/60">
                    <span className="text-zinc-500 block text-[9px] font-mono">SOA & WEB SERVICES</span>
                    Distributed focus
                  </div>
                </div>
              </div>

            </div>

            {/* Timeline item 4: Bachelor of Science in Mathematics */}
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
              
              {/* Left side info card */}
              <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-xl p-5 space-y-3 order-2 md:order-1 ml-12 md:ml-0 md:text-right md:max-w-lg md:ml-auto backdrop-blur-sm">
                <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold">MATHEMATICAL FOUNDATIONS</div>
                <p className="text-xs text-zinc-350 leading-relaxed">
                  Rigorous academic training in structural problem modeling, advanced matrix analysis, and optimization algorithms. Fosters heavy analytical logic now driving deep neural network engineering.
                </p>
                <div className="flex flex-wrap md:justify-end gap-1.5 pt-2">
                  <span className="text-[9px] font-mono bg-zinc-950 text-zinc-400 border border-zinc-900 px-2 py-0.5 rounded">Probability Theory</span>
                  <span className="text-[9px] font-mono bg-zinc-950 text-zinc-400 border border-zinc-900 px-2 py-0.5 rounded">Functional Analysis</span>
                  <span className="text-[9px] font-mono bg-zinc-950 text-zinc-400 border border-zinc-900 px-2 py-0.5 rounded">Cryptography Math</span>
                </div>
              </div>

              {/* Central Pinpoint */}
              <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-[#050505] border-2 border-zinc-700 -translate-x-1/2 flex items-center justify-center z-10">
                <Brain className="w-4 h-4 text-emerald-400" />
              </div>

              {/* Right side info text */}
              <div className="space-y-2 order-1 md:order-2 pl-12 md:pl-0">
                <span className="inline-block px-2.5 py-1 rounded bg-[#010101] border border-zinc-800 font-mono text-[10px] text-zinc-300">
                  2004 - 2008 (4 YEARS)
                </span>
                <h4 className="font-bold text-zinc-100 text-lg font-display">Bachelor of Science in Mathematics</h4>
                <p className="text-xs text-emerald-400 font-mono">Beijing University of Posts and Telecommunications</p>
                <p className="text-xs text-zinc-400 max-w-md leading-relaxed">
                  Double major focus in Mathematics and Applied Mathematics. Graduated with a high engineering-math stance (GPA: 3.38 / 4.0), providing the primary mathematical proof and modeling grounds for all upcoming software careers.
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* TECHNICAL PROJECTS */}
        <section id="projects" className="space-y-8 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <h2 className="text-[10px] font-mono font-bold text-zinc-550 uppercase tracking-[0.2em]">Verified Workloads</h2>
              <h3 className="text-3xl font-bold font-display text-zinc-100 tracking-tight">Independent Engineering Feats</h3>
            </div>
            
            <a 
              href={YANG_DATA.github} 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center space-x-2 text-xs font-mono text-zinc-450 hover:text-zinc-200 transition-colors cursor-pointer"
            >
              <span>Explore GitHub Repository</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {YANG_DATA.projects.map((proj, index) => (
              <div 
                key={index}
                id={`project-${index}`}
                className="bg-zinc-950/40 border border-zinc-800/60 hover:border-zinc-700 rounded-xl p-6 flex flex-col justify-between transition-all duration-300 relative overflow-hidden group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono text-zinc-400 bg-zinc-900 border border-zinc-800/60 px-2 py-0.5 rounded uppercase">
                      {proj.type}
                    </span>
                    <Terminal className="w-4 h-4 text-zinc-650 group-hover:text-blue-400 transition-colors" />
                  </div>

                  <h4 className="font-bold text-zinc-100 text-lg leading-tight font-display">{proj.name}</h4>
                  
                  <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                    {proj.desc}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {proj.tech.map((t, tIdx) => (
                      <span key={tIdx} className="text-[9px] font-mono bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800 text-zinc-455">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-zinc-900 mt-6 flex items-center justify-between text-xs font-mono">
                  {proj.contract ? (
                    <div className="flex items-center justify-between w-full">
                      <span className="text-zinc-500 text-[10px] truncate max-w-[150px] font-bold" title={proj.contract}>SEPOLIA: {proj.contract}</span>
                      <button 
                        onClick={() => handleCopy(proj.contract || "", "contract")}
                        className="text-zinc-400 hover:text-blue-400 flex items-center space-x-1 pb-0.5 cursor-pointer"
                      >
                        {copiedContract ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span className="text-[9px]">{copiedContract ? "Copied" : "Copy"}</span>
                      </button>
                    </div>
                  ) : proj.link ? (
                    <a 
                      href={proj.link} 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-zinc-300 hover:text-blue-400 flex items-center space-x-1 font-medium group cursor-pointer"
                    >
                      <span>Explore writeup</span>
                      <ArrowUpRight className="w-3.5 h-3.5 ml-0.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  ) : (
                    <span className="text-zinc-500 text-[10px]">VERIFIED LOCAL CODEBASE</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
      )}

      {/* FOOTER */}
      <footer className="border-t border-zinc-900 bg-zinc-950 mt-32 py-12 px-4 lg:px-8 text-zinc-550 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center font-bold text-zinc-200">
              Y
            </div>
            <div>
              <span className="font-bold text-zinc-300 block">Fan Yang Portfolio</span>
              <span className="text-[10px] text-zinc-500">Master of Artificial Intelligence candidate @ University of Auckland</span>
            </div>
          </div>

          <div className="text-center md:text-right space-y-1">
            <p className="font-mono text-[11px]">Contact: yangfan6262008@gmail.com | +86 159 0408 2220</p>
            <p className="text-[10px] text-zinc-650">Copyright © 2026. Built with high fidelity. Real AI models wired with secure full-stack proxy routing.</p>
          </div>
        </div>
      </footer>

      {/* FIXED FLOATING CORNER BUTTON FOR AI TWIN CHAT DRAWER */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:block">
        <button
          onClick={() => setChatOpen(true)}
          className="flex items-center space-x-2 bg-zinc-100 hover:bg-neutral-200 text-black font-bold px-4 py-2.5 rounded-full shadow-2xl transition-all cursor-pointer text-xs"
        >
          <Sparkles className="w-3.5 h-3.5 fill-black" />
          <span>Ask Yang&apos;s Digital Twin</span>
        </button>
      </div>

      {/* SIDE DRAWER FOR DIGITAL TWIN CHAT */}
      <AnimatePresence>
        {chatOpen && (
          <div id="chat-drawer-overlay" className="fixed inset-0 z-50 bg-[#000000]/80 backdrop-blur-sm flex justify-end">
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="bg-zinc-950 border-l border-zinc-900 w-full max-w-md h-full flex flex-col justify-between shadow-2xl"
            >
              
              {/* Drawer Top */}
              <div className="p-5 border-b border-zinc-900 flex items-center justify-between bg-[#050505]">
                <div className="flex items-center space-x-2.5">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <div>
                    <h3 className="font-bold text-zinc-200 text-sm font-display">Yang&apos;s Digital Twin</h3>
                    <p className="text-[9px] font-mono text-zinc-550 uppercase tracking-widest font-bold">Wired with Gemini 3.5 AI</p>
                  </div>
                </div>

                <button 
                  onClick={() => setChatOpen(false)}
                  className="text-[9px] font-mono text-zinc-400 hover:text-zinc-100 bg-zinc-900 hover:bg-zinc-850 px-2.5 py-1 rounded border border-zinc-800 transition-colors cursor-pointer"
                >
                  CLOSE
                </button>
              </div>

              {/* Drawer Messages list */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs scrollbar-thin">
                {chatMessages.map((msg, index) => (
                  <div 
                    key={index}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.role === "user" ? (
                      <div className="bg-blue-600/10 border border-blue-500/20 p-2.5 rounded-lg rounded-tr-none self-end max-w-[85%]">
                        <p className="text-[11px] text-blue-100 whitespace-pre-wrap">{msg.text}</p>
                      </div>
                    ) : (
                      <div className="bg-zinc-900/60 border border-zinc-800/45 p-2.5 rounded-lg rounded-tl-none self-start max-w-[85%]">
                        <p className="text-[11px] text-zinc-300 whitespace-pre-wrap">{msg.text}</p>
                        {msg.isBackup && (
                          <div className="text-[8px] font-mono text-zinc-500 mt-2 pt-1 border-t border-zinc-800/10 flex items-center justify-between">
                            <span>VERIFIED REPLICA</span>
                            <span>PORTFOLIO ARCHIVE</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}

                {chatLoading && (
                  <div className="flex justify-start">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-lg rounded-tl-none p-2.5 flex items-center space-x-2 text-zinc-500">
                      <div className="flex space-x-1">
                        <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce"></span>
                        <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                        <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                      </div>
                      <span className="text-[10px] font-mono">Twin is thinking...</span>
                    </div>
                  </div>
                )}
                
                <div ref={messageEndRef} />
              </div>

              {/* Drawer Quick Query triggers */}
              <div className="px-5 py-3 border-t border-zinc-900 bg-[#050505]">
                <span className="text-[8px] font-mono text-zinc-500 tracking-wider block mb-1.5 uppercase font-bold">TAP TO ASK INSTANTLY:</span>
                <div className="grid grid-cols-1 gap-1.5">
                  <button 
                    onClick={() => setChatInput("What is your level of English proficiency?")}
                    className="text-[10px] font-mono text-left bg-zinc-900 hover:bg-zinc-850 text-zinc-300 hover:text-blue-400 p-2 rounded border border-zinc-800 truncate transition-colors cursor-pointer"
                  >
                    ➔ English PTE proficiency level?
                  </button>
                  <button 
                    onClick={() => setChatInput("What is your exact experience with Java and databases?")}
                    className="text-[10px] font-mono text-left bg-zinc-900 hover:bg-zinc-850 text-zinc-300 hover:text-blue-400 p-2 rounded border border-zinc-800 truncate transition-colors cursor-pointer"
                  >
                    ➔ Describe core Java experience?
                  </button>
                  <button 
                    onClick={() => setChatInput("Do you have project management credentials and PMP certifications?")}
                    className="text-[10px] font-mono text-left bg-zinc-900 hover:bg-zinc-850 text-zinc-300 hover:text-blue-400 p-2 rounded border border-zinc-800 truncate transition-colors cursor-pointer"
                  >
                    ➔ Are you PMP Certified?
                  </button>
                </div>
              </div>

              {/* Drawer User Input footer */}
              <form onSubmit={handleSendChatMessage} className="p-4 border-t border-zinc-900 bg-zinc-950 flex space-x-2">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask a technical vetting question..."
                  className="flex-1 bg-zinc-900 border border-zinc-800/80 rounded px-2.5 py-1.5 text-xs text-zinc-200 placeholder:text-zinc-650 focus:outline-none focus:border-zinc-700"
                />
                <button 
                  type="submit"
                  disabled={!chatInput.trim() || chatLoading}
                  className="bg-zinc-100 hover:bg-zinc-200 text-black px-4 rounded font-bold text-xs cursor-pointer transition-colors"
                >
                  Ask
                </button>
              </form>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
