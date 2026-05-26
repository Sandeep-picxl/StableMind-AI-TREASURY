import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Shield, Brain, Cpu, Zap, Coins, ArrowRight, BarChart3, Lock, 
  ChevronRight, Compass, Layers, Sparkles, CheckCircle2, MessageSquareText, HelpCircle
} from 'lucide-react';

interface LandingPageProps {
  onEnterApp: () => void;
}

export default function LandingPage({ onEnterApp }: LandingPageProps) {
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [livePrice, setLivePrice] = useState(1.0001);

  // Dynamic live ticker simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setLivePrice(prev => {
        const delta = (Math.random() - 0.5) * 0.0002;
        return Number((prev + delta).toFixed(4));
      });
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const faqs = [
    {
      q: "How does the StableMind AI Treasury Agent optimize overhead costs?",
      a: "Our autonomous compliance bots monitor layer-1 and layer-2 gas parameters in real-time. By splitting payroll schedules and large treasury rebalances across chains like Base and Solana, the agent automatically identifies matching low-latency states to slash transaction fee budgets by up to 72%."
    },
    {
      q: "Can StableMind prevent Tornado Cash and other sanctioned address risks?",
      a: "Yes. Our Fraud Detection Center continuously monitors incoming and outgoing address trails. It computes deep transaction density scores, detecting whether funds have indirect exposure to blacklisted contracts or newly formed Sybil clusters, immediately quarantining flagged treasury lines."
    },
    {
      q: "Is it compliant with European MiCA regulations and Dubai's VARA?",
      a: "Absolutely. StableMind AI incorporates specialized generative compliance reporters configured for European MiCA thresholds (including non-fiat stablecoin volume caps) and Middle East VARA standards. It produces instant, audit-ready notarized disclosure drafts with just one click."
    },
    {
      q: "Do I need to connect a real custody wallet in sandbox mode?",
      a: "No, the platform comes embedded with full-fidelity multi-chain sandbox wallets (Base, Solana, Ethereum, Arbitrum) pre-populated with $3.54M in simulated stablecoin capital, letting your enterprise perform deep stress-testing risk-free."
    }
  ];

  const partners = [
    { name: "Circle Alliance", badge: "USDC / EURC Stablecoin Partner" },
    { name: "VARA Sandbox v2", badge: "Regulated Framework" },
    { name: "Base Mainnet", badge: "L2 Gas Optimizer" },
    { name: "Solana Labs Developer", badge: "Low Latency Routing" }
  ];

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 font-sans selection:bg-cyan-500 selection:text-black overflow-hidden relative">
      
      {/* Dynamic Grid Background Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35" />
      
      {/* Decorative Radial Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none animate-pulse" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Landing Top Header */}
      <header className="border-b border-[#141b2e] sticky top-0 bg-[#07090e]/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Brain className="w-5 h-5 text-black" />
            </div>
            <div>
              <span className="font-extrabold tracking-tight text-white text-lg">StableMind</span>
              <span className="text-cyan-400 ml-1 font-mono text-xs px-1.5 py-0.5 rounded border border-cyan-400/20 bg-cyan-950/40">AI</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-400 font-medium">
            <a href="#problem" className="hover:text-cyan-400 transition-colors">Risk Paradigm</a>
            <a href="#features" className="hover:text-cyan-400 transition-colors">Core Systems</a>
            <a href="#agents" className="hover:text-cyan-400 transition-colors">Agent Infrastructure</a>
            <a href="#compatibility" className="hover:text-cyan-400 transition-colors">L1/L2 Protocols</a>
            <a href="#faq" className="hover:text-cyan-400 transition-colors">Compliance FAQ</a>
          </nav>

          <button 
            onClick={onEnterApp}
            className="px-4 py-2 text-xs font-bold tracking-wider uppercase bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black rounded-md transition-all duration-300 shadow-md shadow-cyan-500/10 hover:shadow-cyan-500/25 flex items-center gap-1.5"
          >
            Enter Sandbox API
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Live Blockchain Activity Ribbon */}
      <div className="bg-[#090d18] border-b border-[#141b2e] py-2 whitespace-nowrap overflow-hidden">
        <div className="inline-block animate-[marquee_25s_linear_infinite] text-[11px] font-mono text-slate-400 flex items-center gap-8">
          <span className="flex items-center gap-2 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            LIVE SIMULATION NETWORK ACTIVE
          </span>
          <span>•</span>
          <span>USDC Peg: <strong className="text-white">${livePrice}</strong> (Circle Reserve Trust: Audit Verified)</span>
          <span>•</span>
          <span>USDT Pool Volume: <strong className="text-white">$8.15B</strong> (91% Backing Ratio Index)</span>
          <span>•</span>
          <span>Base L2 Gas Price: <strong className="text-cyan-400">0.0015 Gwei</strong> (Highly Optimized)</span>
          <span>•</span>
          <span className="text-amber-400 font-semibold text-xs animate-pulse">⚡ ALERT: MULTI-AGENT COMPLIANCE REPORTING AUTOMATED UNDER MICA 2026</span>
          <span>•</span>
          <span>Arbitrum Fee Save Rank: <strong className="text-white">#1 Saved $4,821 This Week</strong></span>
        </div>
      </div>

      {/* MAIN HERO SECTION */}
      <section className="relative pt-16 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/20 text-cyan-400 text-xs font-mono mb-8 animate-bounce">
          <Sparkles className="w-3.5 h-3.5" />
          <span>V2.4 RELEASE — STATED SEC COMPLIANT OUTFLOW ENG-NODE ACTIVATED</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-sans tracking-tight font-extrabold text-white max-w-5xl mx-auto leading-tight">
          AI Treasury Intelligence for
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent block mt-1.5">
            Stablecoin Businesses
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed">
          Automate sovereign stablecoin treasury, quarantine illicit address trails, slash cross-border payroll fees by 72%, and compile regulation-ready disclosures with localized multi-agents.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
          <button 
            onClick={onEnterApp}
            className="w-full sm:w-auto px-8 py-4 text-sm font-semibold tracking-wider rounded-lg bg-white text-slate-950 hover:bg-slate-100 transition-all shadow-xl shadow-cyan-500/5 duration-200 flex items-center justify-center gap-2 group"
          >
            Launch StableMind Interface
            <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={onEnterApp}
            className="w-full sm:w-auto px-8 py-4 text-sm font-semibold tracking-wider rounded-lg border border-[#1e294b] bg-slate-950/40 hover:bg-slate-950 text-slate-300 hover:text-white transition-all duration-200"
          >
            Watch Merkle Proof System
          </button>
        </div>

        {/* HERO FEATURE PANELS PREVIEW */}
        <div className="mt-20 relative rounded-2xl border border-[#141b2e] bg-[#0c1122]/60 overflow-hidden shadow-2xl p-6 md:p-10">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#07090e] to-transparent pointer-events-none" />

          {/* Simulated Premium Dashboard Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left relative z-10">
            {/* Sidebar Simulation */}
            <div className="lg:col-span-3 border border-[#141b2e] bg-[#090d18] p-4 rounded-xl flex flex-col gap-4 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2 border-b border-[#141b2e] pb-3 text-white">
                <Brain className="w-4 h-4 text-cyan-400" />
                <span className="font-bold">StableMind Core</span>
              </div>
              <div className="space-y-2">
                <div className="p-2.5 rounded bg-cyan-950/20 text-cyan-400 border border-cyan-800/30 flex items-center justify-between">
                  <span>● TREASURY AUTO</span>
                  <span className="px-1 py-0.2 uppercase bg-cyan-500 text-black text-[9px] rounded font-bold">ACTIVE</span>
                </div>
                <div className="p-2.5 rounded hover:bg-[#10172a] transition-colors flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-red-400" />
                  <span>FRAUD COMPLIANCE</span>
                </div>
                <div className="p-2.5 rounded hover:bg-[#10172a] transition-colors flex items-center gap-2">
                  <Coins className="w-3.5 h-3.5 text-blue-400" />
                  <span>PAYROLL OPTIMIZER</span>
                </div>
              </div>
              <div className="mt-auto border-t border-[#141b2e] pt-3 text-[10px] space-y-1">
                <div className="flex justify-between">
                  <span>SECURED CHANNELS:</span>
                  <span className="text-emerald-400 font-bold">25/25</span>
                </div>
                <div className="flex justify-between">
                  <span>MICA RECONCILER:</span>
                  <span className="text-cyan-400 font-semibold">ONLINE</span>
                </div>
              </div>
            </div>

            {/* Dashboard Hero Widgets */}
            <div className="lg:col-span-9 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border border-[#1e294b] bg-slate-950/80">
                  <span className="text-[11px] uppercase font-mono tracking-widest text-slate-500 block">Total Sovereign Cash</span>
                  <span className="text-2xl font-black mt-1 block tracking-tight text-white">$3,540,200 <span className="text-xs text-slate-500 font-mono">USD</span></span>
                  <span className="text-[10px] text-emerald-400 font-mono mt-1.5 flex items-center gap-1">
                    <span>↑ 14.2%</span><span>vs last month (inflow positive)</span>
                  </span>
                </div>
                <div className="p-4 rounded-xl border border-[#1e294b] bg-slate-950/80">
                  <span className="text-[11px] uppercase font-mono tracking-widest text-slate-500 block">AI Automated Gas Saves</span>
                  <span className="text-2xl font-black mt-1 block tracking-tight text-cyan-400">$1,240 <span className="text-xs text-slate-500 font-mono">/mo</span></span>
                  <span className="text-[10px] text-cyan-300 font-mono mt-1.5 flex items-center gap-1">
                    <span>⚡ Base Rollups active</span>
                  </span>
                </div>
                <div className="p-4 rounded-xl border border-red-950/50 bg-red-950/10">
                  <span className="text-[11px] uppercase font-mono tracking-widest text-red-400/80 block">Critical Fraud Anomaly</span>
                  <span className="text-2xl font-black mt-1 block tracking-tight text-red-500">1 Flagged</span>
                  <span className="text-[10px] text-slate-400 font-mono mt-1.5 flex items-center gap-1">
                    <span>97% Match on Tornado-L2 flow</span>
                  </span>
                </div>
              </div>

              {/* Bot recommendation alert snippet */}
              <div className="p-4 rounded-xl border border-[#152347] bg-[#0c142b] flex flex-col md:flex-row items-start md:items-center justify-between gap-3 font-mono text-xs">
                <div className="flex items-center gap-2.5 text-slate-300">
                  <div className="w-7 h-7 bg-cyan-500/10 rounded border border-cyan-500/20 flex items-center justify-center">
                    <Cpu className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <span className="text-cyan-400 font-bold">StableMind Bot Insights:</span>
                    <p className="text-slate-400 text-[11px] mt-0.5">"Tether (USDT) exposure sits at 22%. Swapping 100k USDT of Arbitrum reserves to Circle USDC secures an additional +0.03% reserve trust score index with negligible gas overhead."</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded bg-cyan-400 text-black font-bold whitespace-nowrap align-middle self-end md:self-center cursor-pointer hover:bg-cyan-300">
                  AUTO REBALANCE
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNERS / COMOVING ECOSYSTEM */}
      <section className="bg-slate-950/40 border-y border-[#141b2e] py-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[11px] uppercase font-mono tracking-widest text-slate-500 mb-6">Designed under global sandbox compliances</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {partners.map((p, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-[#07090e] border border-[#141b2e] text-center font-mono">
                <h4 className="text-white text-xs font-bold">{p.name}</h4>
                <p className="text-[9px] text-slate-500 font-medium mt-1">{p.badge}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM / THE COMPLIANCE CRISIS */}
      <section id="problem" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            The Stablecoin Operational Bottleneck
          </h2>
          <p className="text-slate-400 mt-4 text-sm font-light">
            Traditional tools like Gnosis Safe can hold funds, but they fail to address the complex layers of modern regulation, dynamic fees, and sophisticated threat vectors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-xl border border-[#141b2e] bg-slate-950/20 hover:border-cyan-500/40 transition-colors duration-300">
            <div className="w-10 h-10 bg-rose-500/10 rounded-lg flex items-center justify-center border border-rose-500/20 mb-5">
              <Shield className="w-5 h-5 text-rose-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Sanction Contamination</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              One incoming transaction from a compromised router can contaminate your entire treasury wallet pool, violating compliance guidelines and triggering immediate smart lockouts.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-[#141b2e] bg-slate-950/20 hover:border-cyan-500/40 transition-colors duration-300">
            <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center border border-amber-500/20 mb-5">
              <Zap className="w-5 h-5 text-amber-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Exorbitant Gas Leakage</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Processing global team compensations during Ethereum gas surges drains thousands of dollars monthly down the drain on easily avoidable fee bottlenecks.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-[#141b2e] bg-slate-950/20 hover:border-cyan-500/40 transition-colors duration-300">
            <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center border border-blue-500/20 mb-5">
              <Compass className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">MiCA & VARA Standards</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Adapting manual transaction recording to the changing regulations under European MiCA or Dubai regulatory limits consumes countless legal advisor hours.
            </p>
          </div>
        </div>
      </section>

      {/* DETAILED AGENTS DIAGRAM INFRASTRUCTURE */}
      <section id="agents" className="py-20 bg-[#07090e] border-y border-[#141b2e] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="px-2.5 py-1 text-xs font-mono bg-cyan-950/40 border border-cyan-800/30 text-cyan-400 inline-block rounded">
              AUTO-AGENTS WORKER CHAIN
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Sovereign AI Agents For Your Daily Workflows
            </h2>
            <p className="text-slate-400 text-xs leading-relaxed font-light">
              Unlike generic, passive wallets, StableMind launches highly configured AI subroutines that act as live financial advisors, reporting compilers, and threat intelligence agents on your behalf.
            </p>
            <div className="space-y-4 pt-4">
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">The Treasury Strategist Advisor</h4>
                  <p className="text-slate-400 text-[11px]">Auto balances the mix across safe yield environments, anticipating upcoming burn budgets.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">The Compliance Merkle Monitor</h4>
                  <p className="text-slate-400 text-[11px]">Scans on-chain block states to prevent AML breaches and draft localized ESMA regulatory disclosures.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1" />

          {/* Graphical Agent Interactive Sandbox Pipeline */}
          <div className="lg:col-span-6 border border-[#202e52]/40 rounded-2xl bg-[#0c1326] p-6 relative font-mono text-[11px]">
            <div className="absolute top-3 right-3 shrink-0 flex items-center gap-1.5 text-slate-500 font-mono text-[10px]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>LIVE COGNITIVE BRIDGE</span>
            </div>

            <div className="space-y-4">
              <div className="border border-[#182544] rounded bg-slate-950/60 p-3 relative hover:border-cyan-400/50 transition-all">
                <div className="flex items-center justify-between text-cyan-400 border-b border-[#141b2e] pb-2 mb-2 font-bold text-xs">
                  <span>1. CHAT USER REQUEST</span>
                  <span className="text-slate-400">INPUT DECODE</span>
                </div>
                <p className="text-slate-300 italic">"Generate a Q1 Tax Report audit draft for VARA and show our relative USDC reserve backing ratio."</p>
              </div>

              <div className="text-center text-slate-500 py-1 font-bold">↓ DIRECT COGNITIVE PIPELINE</div>

              <div className="border border-cyan-800/40 rounded bg-cyan-950/10 p-3 hover:border-cyan-400/50 transition-all">
                <div className="flex items-center justify-between text-cyan-400 border-b border-[#141b2e] pb-2 mb-2 font-bold text-xs">
                  <span>2. GEMINI 3.5 REASONING ENG</span>
                  <span className="text-slate-500">MAPPED SYSTEM CONTEXT</span>
                </div>
                <p className="text-slate-300">Extracting transaction balances, filtering tax archives, running prompt embedding through on-chain compliance rules.</p>
              </div>

              <div className="text-center text-slate-500 py-1 font-bold">↓ DELEGATED AUTONOMOUS ACTORS</div>

              <div className="grid grid-cols-2 gap-3">
                <div className="border border-[#182544] rounded bg-slate-950/40 p-2.5 text-center">
                  <span className="text-white font-bold block mb-1">CFO Agent Code</span>
                  <p className="text-[10px] text-slate-400">Compiles the USD balance and calculates runway.</p>
                </div>
                <div className="border border-[#182544] rounded bg-slate-950/40 p-2.5 text-center">
                  <span className="text-white font-bold block mb-1">Risk Assessor Bot</span>
                  <p className="text-[10px] text-slate-400">Checks the depeg hazard and reserve backers.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE FEATURES LIST SHOWCASE */}
      <section id="features" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-transparent">
        <div className="max-w-2xl mx-auto mb-16">
          <span className="text-cyan-400 font-mono text-xs uppercase tracking-widest block mb-2">PRODUCT MATRIX</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Comprehensive Suite To Overhaul Treasury Operations
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          <div className="p-6 rounded-xl border border-[#141b2e] bg-[#0c1122]/40">
            <BarChart3 className="w-8 h-8 text-cyan-400 mb-4" />
            <h4 className="text-lg font-bold text-white mb-2">Sovereign Treasury Dashboard</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Consolidate high-density multi-chain liquidity across Base, Solana, Ethereum, Arbitrum, and Polygon in one glassmorphic Bloomberg-style panel.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-[#141b2e] bg-[#0c1122]/40">
            <Cpu className="w-8 h-8 text-cyan-400 mb-4" />
            <h4 className="text-lg font-bold text-white mb-2">Automated Payroll Router</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Disburse worldwide salaries on low-cost pipelines using gas presets, support employee stablecoin splits, and auto-convert to EURC or USDC.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-[#141b2e] bg-[#0c1122]/40">
            <Shield className="w-8 h-8 text-cyan-400 mb-4" />
            <h4 className="text-lg font-bold text-white mb-2">AML Threat Shield</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Continuously audit incoming deposit streams for sanctioned mixers or blacklisted wallets, auto-isolating suspect funds on locked sub-custody.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-[#141b2e] bg-[#0c1122]/40">
            <MessageSquareText className="w-8 h-8 text-cyan-400 mb-4" />
            <h4 className="text-lg font-bold text-white mb-2">Natural Finance Copilot</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Ask complex financial forecasts, request smart rebalancings, or build tax audit papers in natural language using the real Gemini LLM model.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-[#141b2e] bg-[#0c1122]/40">
            <Coins className="w-8 h-8 text-cyan-400 mb-4" />
            <h4 className="text-lg font-bold text-white mb-2">Depeg Health Radar</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Monitor reserves backing, secondary liquidity, and regulatory sentiments of key stablecoins including USDC, USDT, DAI, PYUSD, and EURC.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-[#141b2e] bg-[#0c1122]/40">
            <Lock className="w-8 h-8 text-cyan-400 mb-4" />
            <h4 className="text-lg font-bold text-white mb-2">Notarized Legal Exporter</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Export VARA regulatory disclosures, tax filing certificates, and internal multisig audit reports with real generative LLM summaries.
            </p>
          </div>
        </div>
      </section>

      {/* COMPLIANCE FAQ ACCORDION */}
      <section id="faq" className="py-24 border-t border-[#141b2e] bg-[#080b15]">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <HelpCircle className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Regulatory & Compliance FAQ</h2>
            <p className="text-slate-400 mt-2 text-xs">Everything an enterprise compliance officer needs to verify about our agents.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((f, i) => (
              <div key={i} className="border border-[#141b2e] rounded-xl bg-slate-950/20 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setActiveFAQ(activeFAQ === i ? null : i)}
                  className="w-full text-left px-5 py-4 font-bold text-white text-[13px] flex items-center justify-between hover:bg-slate-950/50 transition-colors"
                >
                  <span>{f.q}</span>
                  <ChevronRight className={`w-4 h-4 text-cyan-400 transition-transform ${activeFAQ === i ? 'rotate-90' : ''}`} />
                </button>
                {activeFAQ === i && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-400 leading-relaxed border-t border-[#141b2e]/60 bg-[#090d18]/40">
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER CTA & TRIAL SUMMARY */}
      <footer className="border-t border-[#141b2e] bg-[#05070c] py-16 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-8">
          <div className="flex items-center justify-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded flex items-center justify-center">
              <Brain className="w-4 h-4 text-black" />
            </div>
            <span className="font-extrabold tracking-tight text-white text-base">StableMind AI</span>
          </div>

          <p className="max-w-md mx-auto leading-relaxed text-slate-400">
            The next-generation autonomous treasury platform powering global Web3 business compliant expansions.
          </p>

          <button
            onClick={onEnterApp}
            className="px-6 py-3.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold uppercase text-xs tracking-wider hover:from-cyan-400 hover:to-blue-500 transition-all flex items-center gap-2 mx-auto"
          >
            Launch Instant Platform Simulator
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="pt-8 border-t border-[#141b2e] flex flex-col sm:flex-row justify-between items-center text-[10px] text-slate-600">
            <span>© 2026 StableMind AI Labs Inc. All Rights Reserved.</span>
            <span className="mt-2 sm:mt-0 font-mono">MD-NODE SECURITY KEY CH-0X8D4D APPROVED</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
