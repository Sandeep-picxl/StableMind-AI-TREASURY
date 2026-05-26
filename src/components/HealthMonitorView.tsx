import React, { useState } from 'react';
import { StablecoinMetric } from '../types';
import { 
  Activity, AlertTriangle, ShieldCheck, HelpCircle, 
  Info, Sparkles, TrendingUp, Compass, Sliders, ChevronRight
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

interface HealthMonitorViewProps {
  stablecoins: StablecoinMetric[];
}

export default function HealthMonitorView({ stablecoins }: HealthMonitorViewProps) {
  const [globalSentimentShift, setGlobalSentimentShift] = useState(0); // sliding modifier
  const [panicLevel, setPanicLevel] = useState(0); // 0 to 100

  // Supported backing ratios
  const getSimulatedHealth = (coin: StablecoinMetric) => {
    let trustScore = coin.trustScore;
    let depegRisk = coin.depegRisk;
    let statusLabel = "Optimal Backing";
    
    // Apply panic sliding modifier
    if (panicLevel > 0) {
      if (coin.symbol === 'USDT') {
        trustScore = Math.max(50, coin.trustScore - Math.floor(panicLevel * 0.45));
        depegRisk = panicLevel > 50 ? 'High' : 'Medium';
        statusLabel = panicLevel > 50 ? "USDT Regulatory Pressure" : "Collateral Stress Test";
      } else if (coin.symbol === 'DAI') {
        trustScore = Math.max(60, coin.trustScore - Math.floor(panicLevel * 0.25));
        depegRisk = panicLevel > 70 ? 'Medium' : 'Low';
        statusLabel = "Smart Contract Risk Adjustment";
      } else {
        trustScore = Math.max(86, coin.trustScore - Math.floor(panicLevel * 0.08));
        depegRisk = 'Safe';
        statusLabel = "Highly Liquid Reserve Resiliency";
      }
    }

    return {
      ...coin,
      trustScore,
      depegRisk,
      statusLabel
    };
  };

  const simulatedStables = stablecoins.map(coin => getSimulatedHealth(coin));

  // Radar chart showing backing indices
  const radarData = simulatedStables.map(c => ({
    subject: c.symbol,
    'Trust Index': c.trustScore,
    'Backing %': c.backingRatio - 50, // offset for visual readability
    'Chain Stability': c.chainStability,
  }));

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-1 font-sans">
      
      {/* Header */}
      <div>
        <h2 className="text-xl font-extrabold text-white uppercase font-mono">Stablecoin Reserves Health Monitor</h2>
        <p className="text-xs text-slate-400 mt-1">Surveilling secondary on-chain market spreads, peg deviations, and dollar-backing collateral audits.</p>
      </div>

      {/* Simulator Control Drawer */}
      <div className="p-5 rounded-xl border border-red-950/40 bg-red-950/10/20 space-y-4">
        <div className="flex justify-between items-start md:items-center flex-col md:flex-row gap-2">
          <div>
            <span className="text-red-400 font-mono text-[10px] tracking-widest uppercase block font-bold flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 animate-pulse" />
              <span>Interactive Depeg Panic Simulator (Stress-Tester)</span>
            </span>
            <p className="text-[11px] text-slate-400 mt-0.5">Scale panic level parameters (e.g. offshore custodian audits fail, heavy capital flight) to stresstest rehalancing triggers.</p>
          </div>
          
          <div className="p-1 px-2.5 rounded bg-[#090b14] border border-slate-800 text-xs font-mono text-slate-300">
            Current Risk Scenario: <strong className="text-red-400 uppercase font-bold">{panicLevel === 0 ? "Normal operations" : panicLevel > 60 ? "CRITICAL DEPEG DEBATE" : "MINOR COLLATERAL OUTFLOW"}</strong>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1 text-xs">
            <div className="flex justify-between font-mono">
              <span className="text-slate-400">Stablecoin Market Panic Parameter</span>
              <span className="text-red-400 font-bold">{panicLevel}% Stress</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={panicLevel} 
              onChange={(e) => setPanicLevel(Number(e.target.value))}
              className="w-full accent-red-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
            />
          </div>

          <div className="p-3.5 rounded bg-slate-950/40 border border-slate-900 font-mono text-[10px] text-slate-400 flex items-center gap-2">
            <Info className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>USDC remains highly defensive against panic levels due to fully audited US Treasuries. USDT trust adjustments match historical liquidity limits from secondary offshore custody risk indices.</span>
          </div>
        </div>
      </div>

      {/* Grid: Charts & Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Radar backing chart */}
        <div className="lg:col-span-4 p-5 rounded-xl border border-[#141b2e] bg-[#07090e]/70 flex flex-col justify-between">
          <div>
            <h3 className="text-xs uppercase font-mono tracking-wider text-slate-400 font-bold">Multivariate Backing Radar</h3>
            <p className="text-[11px] text-slate-500">Mapping structural coefficients across indices</p>
          </div>

          <div className="h-56 flex items-center justify-center pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="#1e294b" />
                <PolarAngleAxis dataKey="subject" stroke="#68759f" fontSize={10} />
                <PolarRadiusAxis stroke="#1e294b" angle={30} domain={[0, 100]} fontSize={8} />
                <Tooltip contentStyle={{ backgroundColor: '#07070e', border: '1px solid #1e294b', fontSize: 10 }} />
                <Radar name="Trust Score Ratio" dataKey="Trust Index" stroke="#22d3ee" fill="#22d3ee" fillOpacity={0.15} />
                <Radar name="Chain Stability Index" dataKey="Chain Stability" stroke="#818cf8" fill="#818cf8" fillOpacity={0.15} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="text-[10px] text-slate-500 font-mono pt-2 border-t border-[#141b2e] text-center">
            USDC (Circle) consistently scores 99/99 in backing transparency.
          </div>
        </div>

        {/* Dynamic Stablecoin Status list */}
        <div className="lg:col-span-8 p-5 rounded-xl border border-[#141b2e] bg-[#07090e]/70 space-y-4">
          <div className="flex justify-between items-center border-b border-[#141b2e] pb-3">
            <div>
              <h3 className="text-xs uppercase font-mono tracking-wider text-slate-400 font-bold">Reserves Assessment Matrix</h3>
              <p className="text-[11px] text-slate-500">Continuous risk checking under global audit specifications</p>
            </div>
          </div>

          <div className="space-y-2.5">
            {simulatedStables.map((coin) => {
              const isDepegDangerous = coin.depegRisk === 'High' || coin.depegRisk === 'Medium';
              return (
                <div 
                  key={coin.id}
                  className={`p-4 rounded-xl border flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all duration-300 ${
                    isDepegDangerous 
                      ? 'border-red-950/60 bg-red-950/5' 
                      : 'border-[#141b2e]/60 bg-slate-950/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-[#10172d]/80 border border-slate-850 flex items-center justify-center shrink-0">
                      <span className="font-mono font-black text-[#22d3ee] text-xs">{coin.symbol}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">{coin.name}</h4>
                      <div className="flex items-center gap-2 mt-0.5 font-mono text-[9px] text-slate-400">
                        <span>Price Peg: <strong className="text-white">${coin.price}</strong></span>
                        <span>•</span>
                        <span>Backing: <strong className="text-emerald-400">{coin.backingRatio}%</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 font-mono text-xs pl-13 md:pl-0">
                    <div>
                      <span className="text-[9px] uppercase text-slate-500 block">Trust score</span>
                      <span className={`font-black text-xs ${coin.trustScore > 80 ? 'text-[#22d3ee]' : 'text-amber-500'}`}>
                        {coin.trustScore}/100
                      </span>
                    </div>

                    <div>
                      <span className="text-[9px] uppercase text-slate-500 block">Vol Spreads</span>
                      <span className="text-slate-300 font-bold">{coin.volatility}% Index</span>
                    </div>

                    <div>
                      <span className="text-[9px] uppercase text-slate-500 block">Liquidity</span>
                      <span className="text-slate-300 font-bold">${coin.liquidity.toFixed(0)}M</span>
                    </div>

                    <div>
                      <span className="text-[9px] uppercase text-slate-500 block">Risk Status</span>
                      <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                        coin.depegRisk === 'Safe' ? 'bg-emerald-950/40 text-emerald-400' :
                        coin.depegRisk === 'Low' ? 'bg-cyan-950/45 text-cyan-400' :
                        'bg-red-500 text-black'
                      }`}>
                        {coin.depegRisk}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[9px] text-slate-500 block uppercase font-mono">Simulated Audit Alert</span>
                    <span className={`text-[11px] font-bold ${isDepegDangerous ? 'text-red-400' : 'text-slate-400'}`}>{coin.statusLabel}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
