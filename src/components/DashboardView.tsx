import React from 'react';
import { Transaction, StablecoinMetric } from '../types';
import { 
  TrendingUp, TrendingDown, HelpCircle, ShieldCheck, 
  Layers, ArrowUpRight, Zap, Coins, Clock, ChevronRight, Cpu
} from 'lucide-react';
import { 
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend 
} from 'recharts';

interface DashboardViewProps {
  transactions: Transaction[];
  stablecoins: StablecoinMetric[];
  onQuickAsk: (prompt: string) => void;
  onNavigateToTab: (tab: string) => void;
}

export default function DashboardView({ 
  transactions, 
  stablecoins, 
  onQuickAsk, 
  onNavigateToTab 
}: DashboardViewProps) {

  // Standard totals
  const totalBalance = 3540200;
  const gasSavings = 1240;
  const activeStaff = 6;
  const activeAlerts = 1;

  // Recharts: Stablecoin exposure allocations
  const pieData = stablecoins.map(coin => ({
    name: coin.symbol,
    value: coin.symbol === 'USDC' ? 64 : coin.symbol === 'USDT' ? 22 : coin.symbol === 'DAI' ? 9 : coin.symbol === 'PYUSD' ? 3 : 2,
    color: coin.symbol === 'USDC' ? '#22d3ee' : coin.symbol === 'USDT' ? '#3b82f6' : coin.symbol === 'DAI' ? '#f59e0b' : coin.symbol === 'PYUSD' ? '#a855f7' : '#14b8a6'
  }));

  // Recharts: monthly cache flow mock representation
  const flowData = [
    { name: 'Jan 26', Inflow: 210000, Outflow: 85000 },
    { name: 'Feb 26', Inflow: 285000, Outflow: 92000 },
    { name: 'Mar 26', Inflow: 320000, Outflow: 96000 },
    { name: 'Apr 26', Inflow: 410000, Outflow: 110000 },
    { name: 'May 26', Inflow: 434000, Outflow: 98400 },
  ];

  const quickPrompts = [
    { title: "Predict runway", text: "Predict our corporate cash runway based on current outflow", icon: Clock },
    { title: "Optimize gas", text: "How can we optimize international payroll router fees?", icon: Zap },
    { title: "Review risks", text: "Identify high-risk transactions inside current Arbitrum assets", icon: ShieldCheck },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-1 leading-normal">
      
      {/* Dynamic Upper Banner with greeting & on-chain stats */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-slate-950/60 to-slate-900/40 p-5 rounded-xl border border-[#141b2e]">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white font-sans">Stablecoin Treasury Terminal</h2>
          <p className="text-xs text-slate-400 mt-1">Real-time surveillance, compliance checkovers, and multi-chain stablecoin payroll router.</p>
        </div>
        
        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="px-2.5 py-1 rounded bg-[#0b1429] border border-[#1e2e56] text-slate-300">
            MICA STATUS: <strong className="text-emerald-400">PASSED</strong>
          </span>
          <span className="px-2.5 py-1 rounded bg-[#0b1429] border border-[#1e2e56] text-slate-300">
            NETWORK: <strong className="text-cyan-400">MULTICHAIN</strong>
          </span>
        </div>
      </div>

      {/* Primary KPI Metrics Block */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-xl border border-[#141b2e] bg-[#07090e]/80 relative overflow-hidden group hover:border-[#22d3ee]/30 transition-all duration-300">
          <div className="absolute top-0 right-0 p-3 text-cyan-400/20 group-hover:text-cyan-400/60 transition-colors">
            <Coins className="w-8 h-8" />
          </div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 block font-bold">Consolidated Vault Capital</span>
          <span className="text-3xl font-extrabold text-white tracking-tight mt-1.5 block">
            $3,540,200 <span className="text-xs text-slate-500 font-normal font-mono">USD</span>
          </span>
          <div className="flex gap-2 text-[10px] text-emerald-400 font-mono items-center mt-2.5">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+14.2% Month-on-Month Outflow Balance</span>
          </div>
        </div>

        <div className="p-5 rounded-xl border border-[#141b2e] bg-[#07090e]/80 relative overflow-hidden group hover:border-[#22d3ee]/30 transition-all duration-300">
          <div className="absolute top-0 right-0 p-3 text-cyan-400/20 group-hover:text-cyan-400/60 transition-colors">
            <Zap className="w-8 h-8" />
          </div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 block font-bold">AI Monthly Gas Optimized</span>
          <span className="text-3xl font-extrabold text-cyan-400 tracking-tight mt-1.5 block">
            $1,240 <span className="text-xs text-slate-500 font-normal font-mono">Saved</span>
          </span>
          <div className="flex gap-1.5 text-[10px] text-cyan-300 font-mono items-center mt-2.5">
            <span>⚡ routing split routes active</span>
          </div>
        </div>

        <div className="p-5 rounded-xl border border-[#141b2e] bg-[#07090e]/80 relative overflow-hidden group hover:border-[#22d3ee]/30 transition-all duration-300">
          <div className="absolute top-0 right-0 p-3 text-cyan-400/20 group-hover:text-cyan-400/60 transition-colors">
            <Clock className="w-8 h-8" />
          </div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 block font-bold">Current Liquidation Runway</span>
          <span className="text-3xl font-extrabold text-white tracking-tight mt-1.5 block">
            36 <span className="text-xs text-slate-400 font-normal font-sans">Months</span>
          </span>
          <div className="flex gap-1.5 text-[10px] text-slate-400 font-mono items-center mt-2.5">
            <span>Assuming $98,400 monthly burn</span>
          </div>
        </div>

        <div className="p-5 rounded-xl border border-red-950/40 bg-red-950/10 relative overflow-hidden group hover:border-red-500/30 transition-all duration-300">
          <div className="absolute top-0 right-0 p-3 text-red-500/20 group-hover:text-red-500/60 transition-colors">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-red-400 block font-bold">Active AML Suspicion Flags</span>
          <span className="text-3xl font-extrabold text-red-500 tracking-tight mt-1.5 block">
            {activeAlerts} <span className="text-xs text-red-400/80 font-normal font-sans">Critical</span>
          </span>
          <div className="text-[10px] text-slate-400 font-mono mt-2.5 block cursor-pointer hover:underline" onClick={() => onNavigateToTab('fraud')}>
            View quarantined Tornado asset →
          </div>
        </div>

      </div>

      {// Interactive Charts layout grid
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left chart: cash inflows/outflows */}
        <div className="lg:col-span-8 p-5 rounded-xl border border-[#141b2e] bg-[#07090e]/70 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Consolidated Treasury Cashflows</h3>
              <p className="text-[11px] text-slate-500">Historical corporate inflow vs. outflow (in USD equivalents)</p>
            </div>
            <span className="text-[10px] text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/30 border border-emerald-800/30 font-mono font-bold">
              NET INFLOW POSITIVE
            </span>
          </div>
          
          <div className="h-68 min-h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={flowData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#161e35" />
                <XAxis dataKey="name" stroke="#68759f" fontSize={11} tickLine={false} />
                <YAxis stroke="#68759f" fontSize={11} tickLine={false} width={45} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#07090e', border: '1px solid #1e294b', borderRadius: '6px' }} 
                  labelClassName="text-white font-bold"
                />
                <Legend iconSize={10} wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="Inflow" fill="#22d3ee" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Outflow" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right chart: Stablecoin allocations */}
        <div className="lg:col-span-4 p-5 rounded-xl border border-[#141b2e] bg-[#07090e]/70 flex flex-col justify-between">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Reserve Diversification</h3>
            <p className="text-[11px] text-slate-500">Current stablecoin treasury exposure ratio</p>
          </div>

          <div className="h-44 flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#07090e', border: '1px solid #1e294b', fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Legend Center Text overlay */}
            <div className="absolute text-center">
              <span className="text-[10px] text-slate-500 block uppercase font-mono">Main Reserve</span>
              <span className="text-lg font-extrabold text-[#22d3ee]">USDC</span>
            </div>
          </div>

          {/* Asset legend items details */}
          <div className="space-y-1.5 pt-2 text-[11px] font-mono">
            {pieData.map((d, index) => (
              <div key={index} className="flex justify-between items-center text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: d.color }} />
                  <span className="font-bold">{d.name}</span>
                </div>
                <span>{d.value}%</span>
              </div>
            ))}
          </div>
        </div>

      </div>}

      {/* Autonomous AI Agent Smart Alerts Container */}
      <div className="p-4 rounded-xl border border-cyan-950/50 bg-gradient-to-r from-cyan-950/10 to-indigo-950/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex gap-3">
          <div className="w-9 h-9 bg-cyan-500/10 rounded-lg flex items-center justify-center border border-cyan-500/20 shrink-0">
            <Cpu className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <span className="text-xs font-bold text-white block">Sovereign Treasury Bot Suggestion:</span>
            <p className="text-[11px] text-slate-400 mt-0.5">
              "Your global payroll router has detected 3 employees currently marked for Ethereum Mainnet routing. Moving them to the Base speed cluster saves an estimated <strong className="text-cyan-400 font-mono font-bold">$1,240/month</strong> in on-chain gas costs."
            </p>
          </div>
        </div>
        <div className="flex gap-2 self-end md:self-center">
          <button 
            onClick={() => onNavigateToTab('payroll')}
            className="px-3.5 py-1.5 rounded bg-cyan-400 text-slate-950 font-bold text-[10px] uppercase hover:bg-cyan-300 tracking-wider transition-all whitespace-nowrap"
          >
            Apply Optimization Router
          </button>
        </div>
      </div>

      {/* Quick Launchpad prompts for copilot chat */}
      <div className="space-y-3">
        <h4 className="text-xs uppercase font-mono tracking-wider text-slate-400 font-bold block">Autonomous Copilot Action Chips</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {quickPrompts.map((q, idx) => {
            const Icon = q.icon;
            return (
              <button
                key={idx}
                onClick={() => onQuickAsk(q.text)}
                className="p-3 text-left rounded-xl border border-[#141b2e] bg-[#07090e]/40 hover:bg-[#0c142b] hover:border-cyan-500/30 transition-all flex items-start gap-3 group text-xs text-slate-300"
              >
                <div className="w-7 h-7 bg-slate-900 rounded flex items-center justify-center shrink-0 border border-slate-800">
                  <Icon className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h5 className="font-bold text-white leading-none mb-1 group-hover:text-cyan-400 transition-colors">{q.title}</h5>
                  <p className="text-[10px] text-slate-500">{q.text}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Live Transaction Ledger Section */}
      <div className="p-5 rounded-xl border border-[#141b2e] bg-[#07090e]/60">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Recent Treasury Activity</h3>
            <p className="text-[11px] text-slate-500">Global multi-chain on-chain ledger entries</p>
          </div>
          <button 
            onClick={() => onNavigateToTab('compliance')}
            className="text-[10px] text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 font-mono uppercase"
          >
            <span>Compliance Exports</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#141b2e] text-slate-500 text-[10px] uppercase font-mono">
                <th className="pb-3 pt-1 pl-2">TXID</th>
                <th className="pb-3 pt-1">Date</th>
                <th className="pb-3 pt-1">Type</th>
                <th className="pb-3 pt-1">Protocol / Address</th>
                <th className="pb-3 pt-1">Chain / Asset</th>
                <th className="pb-3 pt-1 text-right pr-2">Total Amount</th>
                <th className="pb-3 pt-1 text-center font-bold">Risk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#141b2e]/60 text-slate-300 font-mono text-[11px]">
              {transactions.slice(0, 5).map((tx) => (
                <tr key={tx.id} className="hover:bg-[#10172c]/20 transition-colors duration-200">
                  <td className="py-3 pl-2 text-slate-400 text-[10px] font-bold">{tx.id}</td>
                  <td className="py-3 text-[10px]">{tx.date}</td>
                  <td className="py-3 font-sans">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                      tx.type === 'Inflow' ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-800/20' :
                      tx.type === 'Payroll' ? 'bg-cyan-950/40 text-cyan-400 border border-cyan-800/20' :
                      'bg-slate-900 text-slate-400'
                    }`}>
                      {tx.type}
                    </span>
                  </td>
                  <td className="py-3 font-mono text-[10px] text-slate-400">{tx.description}</td>
                  <td className="py-3 font-sans">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span>{tx.chain} / <strong className="text-white text-[11px] font-mono">{tx.token}</strong></span>
                    </div>
                  </td>
                  <td className="py-3 text-right pr-2 font-bold text-white text-xs">
                    {tx.type === 'Inflow' ? '+' : '-'}${tx.amount.toLocaleString()}
                  </td>
                  <td className="py-3 text-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      tx.riskScore > 70 ? 'bg-red-500 text-black' :
                      tx.riskScore > 30 ? 'bg-amber-500 text-black' :
                      'bg-slate-900 border border-slate-800 text-slate-500'
                    }`}>
                      {tx.riskScore}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
