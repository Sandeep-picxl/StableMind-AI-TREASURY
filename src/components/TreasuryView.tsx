import React, { useState } from 'react';
import { 
  TrendingUp, CircleDot, HelpCircle, ArrowRightLeft, Coins, 
  Cpu, Compass, Calendar, Calculator, Sparkles, Plus, AlertCircle
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function TreasuryView() {
  const [headcount, setHeadcount] = useState(6);
  const [targetApy, setTargetApy] = useState(4.8);
  const [selectedScenario, setSelectedScenario] = useState('standard');
  const [swapSimul, setSwapSimul] = useState({ amount: '50000', from: 'USDT', to: 'USDC' });
  const [swapReceipt, setSwapReceipt] = useState<string | null>(null);

  // Run dynamic modeling calculations
  // Fixed monthly burn per employee is ~$10,250 based on current payroll ratios
  const employeeBurn = headcount * 10250;
  const softwareAndGasBurn = 16400; // static costs
  const totalMonthlyBurn = employeeBurn + softwareAndGasBurn;
  const initialCapital = 3540200;
  const calculatedRunway = Number((initialCapital / totalMonthlyBurn).toFixed(1));

  // APY Yield simulator calculations
  const idleCapital = 1450000; // idle reserves ready for yield deployment
  const projectedApyYield = Number((idleCapital * (targetApy / 100)).toFixed(0));

  // Recharts simulation data based on gas price scenario selection
  const getScenarioData = () => {
    switch(selectedScenario) {
      case 'gasspike':
        return [
          { name: 'Month 1', 'Estimated Runway ($M)': 3.54, 'Ethereum Gas Cost ($)': 1420 },
          { name: 'Month 2', 'Estimated Runway ($M)': 3.38, 'Ethereum Gas Cost ($)': 4800 },
          { name: 'Month 3', 'Estimated Runway ($M)': 3.20, 'Ethereum Gas Cost ($)': 6200 },
          { name: 'Month 4', 'Estimated Runway ($M)': 3.01, 'Ethereum Gas Cost ($)': 5500 },
          { name: 'Month 5', 'Estimated Runway ($M)': 2.82, 'Ethereum Gas Cost ($)': 8900 },
          { name: 'Month 6', 'Estimated Runway ($M)': 2.60, 'Ethereum Gas Cost ($)': 11400 },
        ];
      case 'rapidexpansion':
        return [
          { name: 'Month 1', 'Estimated Runway ($M)': 3.54, 'Ethereum Gas Cost ($)': 1420 },
          { name: 'Month 2', 'Estimated Runway ($M)': 3.28, 'Ethereum Gas Cost ($)': 1420 },
          { name: 'Month 3', 'Estimated Runway ($M)': 3.02, 'Ethereum Gas Cost ($)': 1450 },
          { name: 'Month 4', 'Estimated Runway ($M)': 2.76, 'Ethereum Gas Cost ($)': 1420 },
          { name: 'Month 5', 'Estimated Runway ($M)': 2.50, 'Ethereum Gas Cost ($)': 1430 },
          { name: 'Month 6', 'Estimated Runway ($M)': 2.22, 'Ethereum Gas Cost ($)': 1460 },
        ];
      default:
        return [
          { name: 'Month 1', 'Estimated Runway ($M)': 3.54, 'Ethereum Gas Cost ($)': 1420 },
          { name: 'Month 2', 'Estimated Runway ($M)': 3.44, 'Ethereum Gas Cost ($)': 1420 },
          { name: 'Month 3', 'Estimated Runway ($M)': 3.34, 'Ethereum Gas Cost ($)': 1450 },
          { name: 'Month 4', 'Estimated Runway ($M)': 3.24, 'Ethereum Gas Cost ($)': 1420 },
          { name: 'Month 5', 'Estimated Runway ($M)': 3.14, 'Ethereum Gas Cost ($)': 1430 },
          { name: 'Month 6', 'Estimated Runway ($M)': 3.04, 'Ethereum Gas Cost ($)': 1460 },
        ];
    }
  };

  const currentChartScenario = getScenarioData();

  const handleSimulateSwap = (e: React.FormEvent) => {
    e.preventDefault();
    setSwapReceipt(`SECURED MULTISIG ROUTE SUCCESS: Swapped ${Number(swapSimul.amount).toLocaleString()} ${swapSimul.from} to ${swapSimul.to} on Base L2 network ledger. Merkle signature proof logged at SHA-256 offset SM-REB-2026-X8.`);
    setTimeout(() => {
      setSwapReceipt(null);
    }, 7000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-1 font-sans">
      
      {/* Title Header */}
      <div>
        <h2 className="text-xl font-extrabold tracking-tight text-white uppercase font-mono">Treasury Intelligence Analyst</h2>
        <p className="text-xs text-slate-400 mt-1">Autonomous scenario forecasting, APY optimizations, and multisig liquidity rebalancing simulation.</p>
      </div>

      {/* Autonomous AI Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        <div className="p-4 rounded-xl border border-cyan-900/30 bg-cyan-950/10 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] uppercase tracking-wider font-mono font-bold text-cyan-400">Gas Optimizations</span>
              <span className="px-1.5 py-0.2 bg-emerald-500 text-black text-[9px] uppercase font-mono font-bold rounded">HIGH SPEED</span>
            </div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Move Payroll to Base Layer-2 Rollups</h4>
            <p className="text-[11px] text-slate-300 mt-1">
              "Ethereum Gwei has escalated today to 42 Gwei. Moving core compensations to Base network reduces transactions fees by <strong>72%</strong>, saving up to $1,240 monthly with identical settlement speeds."
            </p>
          </div>
          <span className="text-[10px] text-cyan-400 font-mono mt-3 uppercase tracking-wide">Status: Active recommendation</span>
        </div>

        <div className="p-4 rounded-xl border border-purple-900/30 bg-purple-950/10 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] uppercase tracking-wider font-mono font-bold text-purple-400">Stablecoin Safety</span>
              <span className="px-1.5 py-0.2 bg-purple-500 text-black text-[9px] uppercase font-mono font-bold rounded">REBALANCE FLAG</span>
            </div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">High USDT Concentration on Mainnet</h4>
            <p className="text-[11px] text-slate-300 mt-1">
              "Your multi-sig USDT balance stands at $778,844. Circle's USDC reserve offers slightly higher backing clarity and secondary liquidity index. Swap 100k USDT to USDC on Arbitrum to distribute custody risk index."
            </p>
          </div>
          <span className="text-[10px] text-purple-400 font-mono mt-3 uppercase tracking-wide">Status: Swap simulation below</span>
        </div>

        <div className="p-4 rounded-xl border border-amber-900/40 bg-amber-950/10 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] uppercase tracking-wider font-mono font-bold text-amber-400">Idle Capital Yield</span>
              <span className="px-1.5 py-0.2 bg-amber-500 text-black text-[9px] uppercase font-mono font-bold rounded">APY TARGET</span>
            </div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Idle Treasury v2 Optimization</h4>
            <p className="text-[11px] text-slate-300 mt-1">
              "Currently hold $1.45M in non-deployed corporate wallets. Placing these reserves inside Circle Yield v2 vaults securely matches corporate rules and produces up to <strong>{targetApy}% APY</strong>."
            </p>
          </div>
          <span className="text-[10px] text-amber-400 font-mono mt-3 uppercase tracking-wide">Status: Calculator active below</span>
        </div>

      </div>

      {/* Runway Predictive Graph Control and Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Scenario Controls & Interactive Chart */}
        <div className="lg:col-span-8 p-5 rounded-xl border border-[#141b2e] bg-[#07090e]/70 space-y-5">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                <TrendingUp className="text-[#22d3ee] w-4.5 h-4.5" />
                <span>Stress-Test Modeling & Runway Projection</span>
              </h3>
              <p className="text-[11px] text-slate-500">Projected reserves over 6-month cycles under chosen operational constraints</p>
            </div>

            {/* Scenario Dropdown */}
            <div className="flex gap-2 text-xs">
              <button
                onClick={() => setSelectedScenario('standard')}
                className={`px-3 py-1.5 rounded font-mono border ${
                  selectedScenario === 'standard' 
                    ? 'bg-cyan-950 text-cyan-400 border-cyan-800' 
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                Standard Flow
              </button>
              <button
                onClick={() => setSelectedScenario('gasspike')}
                className={`px-3 py-1.5 rounded font-mono border ${
                  selectedScenario === 'gasspike' 
                    ? 'bg-amber-950/40 text-amber-400 border-amber-800/40' 
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                Ethereum Gas Spike
              </button>
              <button
                onClick={() => setSelectedScenario('rapidexpansion')}
                className={`px-3 py-1.5 rounded font-mono border ${
                  selectedScenario === 'rapidexpansion' 
                    ? 'bg-indigo-950/40 text-indigo-400 border-subtle border-indigo-800/40' 
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                Team Expansion (+6 devs)
              </button>
            </div>
          </div>

          <div className="h-64 min-h-60">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={currentChartScenario}>
                <CartesianGrid strokeDasharray="3 3" stroke="#161e35" />
                <XAxis dataKey="name" stroke="#68759f" fontSize={11} tickLine={false} />
                <YAxis yAxisId="left" stroke="#68759f" fontSize={11} tickLine={false} label={{ value: 'Reserves ($M)', angle: -90, position: 'insideLeft', textAnchor: 'middle', style: { fill: '#68759f', fontSize: 10 } }} />
                <YAxis yAxisId="right" orientation="right" stroke="#f59e0b" fontSize={11} tickLine={false} label={{ value: 'Gas Costs ($)', angle: 90, position: 'insideRight', textAnchor: 'middle', style: { fill: '#f59e0b', fontSize: 10 } }} />
                <Tooltip contentStyle={{ backgroundColor: '#07090e', border: '1px solid #1e294b', fontSize: 11 }} />
                <Legend iconSize={12} wrapperStyle={{ fontSize: 11 }} />
                <Line yAxisId="left" type="monotone" dataKey="Estimated Runway ($M)" stroke="#22d3ee" strokeWidth={2.5} activeDot={{ r: 6 }} />
                <Line yAxisId="right" type="monotone" dataKey="Ethereum Gas Cost ($)" stroke="#f59e0b" strokeWidth={2} strokeDasharray="4 4" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Warning state info */}
          {selectedScenario === 'gasspike' && (
            <div className="p-3.5 rounded bg-amber-950/15 border border-amber-800/30 text-amber-400 text-xs font-mono flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold">Scenario Risk Alert</strong>: High Ethereum mainnet gas surges reduce corporate runway to <strong>31 months</strong> if stablecoin rebalances remain un-routed on L2 protocols. Recommend immediate Base migration.
              </div>
            </div>
          )}
          {selectedScenario === 'rapidexpansion' && (
            <div className="p-3.5 rounded bg-indigo-950/20 border border-indigo-800/30 text-indigo-400 text-xs font-mono flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold">Operational Shift Note</strong>: Adding +6 engineers doubles payroll footprint to <strong>$123,000/month</strong>, bringing treasury runway index to <strong>28.7 months</strong> under zero revenue forecasts.
              </div>
            </div>
          )}
        </div>

        {/* Dynamic Parameter Tuning & Runway Calculator */}
        <div className="lg:col-span-4 space-y-5">
          
          <div className="p-5 rounded-xl border border-[#141b2e] bg-[#07090e]/70 space-y-4">
            <h3 className="text-xs uppercase font-mono tracking-wider text-slate-400 font-bold flex items-center gap-2">
              <Calculator className="w-4 h-4 text-cyan-400" />
              <span>Interactive Risk Calculator</span>
            </h3>

            {/* Param 1: Headcount */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Team Headcount</span>
                <span className="font-bold text-white font-mono">{headcount} Engineers</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="20" 
                value={headcount} 
                onChange={(e) => setHeadcount(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
              />
            </div>

            {/* Param 2: Target APY */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Yield Placement rate</span>
                <span className="font-bold text-emerald-400 font-mono">{targetApy}% APY</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="8" 
                step="0.1"
                value={targetApy} 
                onChange={(e) => setTargetApy(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
              />
            </div>

            {/* Outputs display panel */}
            <div className="p-3 rounded-lg bg-[#04060b] border border-[#141b2e] text-xs font-mono space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Calculated Burn Rate:</span>
                <span className="text-white font-bold">${totalMonthlyBurn.toLocaleString()}/mo</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Sovereign Treasury APY Yield:</span>
                <span className="text-emerald-400 font-bold">+${projectedApyYield.toLocaleString()}/year</span>
              </div>
              <div className="border-t border-[#141b2e]/60 pt-2 flex justify-between text-sm">
                <span className="text-slate-400 font-sans">Simulated Cash Runway:</span>
                <span className="text-cyan-400 font-bold">{calculatedRunway} mos</span>
              </div>
            </div>
          </div>

          {/* Quick Swap simulation widget inside Treasury view */}
          <div className="p-5 rounded-xl border border-[#141b2e] bg-[#07090e]/70">
            <h3 className="text-xs uppercase font-mono tracking-wider text-slate-400 font-bold mb-3 flex items-center gap-2">
              <ArrowRightLeft className="w-4 h-4 text-purple-400" />
              <span>Multi-sig Swap Simulation</span>
            </h3>

            <form onSubmit={handleSimulateSwap} className="space-y-3 font-mono text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-500 block mb-1">Swap Amount</label>
                  <input 
                    type="number" 
                    value={swapSimul.amount}
                    onChange={(e) => setSwapSimul({...swapSimul, amount: e.target.value})}
                    placeholder="E.g. 50000"
                    className="w-full bg-[#04060b] border border-[#1e294b] rounded p-2 text-white font-bold tracking-tight outline-none focus:border-cyan-400"
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 block mb-1">Swap Asset Route</label>
                  <div className="flex items-center gap-1">
                    <select 
                      value={swapSimul.from} 
                      onChange={(e) => setSwapSimul({...swapSimul, from: e.target.value})}
                      className="bg-[#04060b] border border-[#1e294b] rounded p-2 text-white text-[11px] outline-none flex-1 font-bold"
                    >
                      <option value="USDT">USDT</option>
                      <option value="DAI">DAI</option>
                      <option value="PYUSD">PYUSD</option>
                    </select>
                    <span className="text-slate-500">→</span>
                    <select 
                      value={swapSimul.to} 
                      onChange={(e) => setSwapSimul({...swapSimul, to: e.target.value})}
                      className="bg-[#04060b] border border-[#1e294b] rounded p-2 text-white text-[11px] outline-none flex-1 font-bold"
                    >
                      <option value="USDC">USDC</option>
                      <option value="EURC">EURC</option>
                    </select>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded flex items-center justify-center gap-1.5 transition-all text-[11px] uppercase tracking-wider"
              >
                Assemble Multisig Swap
              </button>
            </form>

            {swapReceipt && (
              <div className="mt-3 p-2.5 rounded bg-purple-950/25 border border-purple-900/40 text-[10px] text-purple-300 font-mono leading-relaxed">
                {swapReceipt}
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
