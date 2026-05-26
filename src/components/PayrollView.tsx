import React, { useState } from 'react';
import { PayrollRecord } from '../types';
import { 
  Users, Plus, Landmark, Coins, Zap, Activity, Info, 
  MapPin, CheckCircle2, CircleDollarSign, Trash2, ArrowRight
} from 'lucide-react';

interface PayrollViewProps {
  payrollRecords: PayrollRecord[];
  onAddEmployee: (record: Omit<PayrollRecord, 'id'>) => void;
  onRemoveEmployee: (id: string) => void;
}

export default function PayrollView({ 
  payrollRecords, 
  onAddEmployee, 
  onRemoveEmployee 
}: PayrollViewProps) {
  
  const [newStaff, setNewStaff] = useState({
    name: '',
    role: '',
    country: 'United States',
    salary: 5000,
    mainChain: 'Base' as any,
    splitToken: 'USDC' as any,
  });

  const [simulationState, setSimulationState] = useState<string | null>(null);

  const countries = ['United States', 'Japan', 'Estonia', 'Argentina', 'Ghana', 'Cyprus', 'Singapore', 'United Kingdom'];
  const chains = ['Base', 'Ethereum', 'Solana', 'Polygon', 'Arbitrum'];
  const tokens = ['USDC', 'USDT', 'DAI', 'PYUSD', 'EURC'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaff.name || !newStaff.role) return;

    onAddEmployee({
      name: newStaff.name,
      role: newStaff.role,
      country: newStaff.country,
      salary: Number(newStaff.salary),
      mainChain: newStaff.mainChain,
      splitToken: newStaff.splitToken,
      status: 'Active',
      nextPayout: '2026-06-01',
    });

    setNewStaff({
      name: '',
      role: '',
      country: 'United States',
      salary: 5000,
      mainChain: 'Base',
      splitToken: 'USDC',
    });

    setSimulationState("Contractor wallet registered successfully into multisig payroll splits ledger.");
    setTimeout(() => setSimulationState(null), 5000);
  };

  const handleExecutePayroll = () => {
    setSimulationState("EXECUTING BATCH TRANSACTION: Initiating multisig routing cluster across 5 blockchains. Estimated network gas fee: $4.80 (72% saved by priority L2 Base rollups). Processing standard transaction proofs...");
    setTimeout(() => {
      setSimulationState("SUCCESS: Disbursed monthly compensation index safely across all active employees. Notarized VARA and SEC compliance reports generated.");
    }, 4000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-1 font-sans">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white uppercase font-mono">Payroll Router & Allocations</h2>
          <p className="text-xs text-slate-400 mt-1">Automate cross-border payouts, design auto-split tokens, and prioritize cheapest gas parameters.</p>
        </div>
        <button
          onClick={handleExecutePayroll}
          className="px-4 py-2 bg-[#22d3ee] hover:bg-cyan-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded flex items-center gap-1.5 shadow-lg shadow-cyan-500/10 transition-all font-mono"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Execute Batch Payouts</span>
        </button>
      </div>

      {simulationState && (
        <div className="p-4 rounded-xl bg-[#09152b] border border-[#1d355c] text-xs text-cyan-400 font-mono leading-relaxed animate-pulse">
          {simulationState}
        </div>
      )}

      {/* Main Grid: Add Employee & Employee List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left: Add staff form */}
        <div className="lg:col-span-4 p-5 rounded-xl border border-[#141b2e] bg-[#07090e]/70 h-fit space-y-4">
          <h3 className="text-sm font-extrabold text-white uppercase tracking-wider font-mono flex items-center gap-2">
            <Plus className="w-4 h-4 text-cyan-400" />
            <span>Onboard Contractor</span>
          </h3>

          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">FullName Name</label>
              <input 
                type="text" 
                value={newStaff.name}
                onChange={(e) => setNewStaff({...newStaff, name: e.target.value})}
                placeholder="Sarah Connor"
                className="w-full bg-[#04060b] border border-[#141b2e] rounded p-2 text-white outline-none focus:border-cyan-400"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Role / Title</label>
              <input 
                type="text" 
                value={newStaff.role}
                onChange={(e) => setNewStaff({...newStaff, role: e.target.value})}
                placeholder="Solidity Engineer"
                className="w-full bg-[#04060b] border border-[#141b2e] rounded p-2 text-white outline-none focus:border-cyan-400"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Domicile Country</label>
                <select
                  value={newStaff.country}
                  onChange={(e) => setNewStaff({...newStaff, country: e.target.value})}
                  className="w-full bg-[#04060b] border border-[#141b2e] rounded p-2 text-white outline-none font-bold text-[11px]"
                >
                  {countries.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Monthly Compensation ($)</label>
                <input 
                  type="number" 
                  value={newStaff.salary}
                  onChange={(e) => setNewStaff({...newStaff, salary: Number(e.target.value)})}
                  className="w-full bg-[#04060b] border border-[#141b2e] rounded p-2 text-white outline-none text-xs font-mono"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Default Router Chain</label>
                <select
                  value={newStaff.mainChain}
                  onChange={(e) => setNewStaff({...newStaff, mainChain: e.target.value as any})}
                  className="w-full bg-[#04060b] border border-[#141b2e] text-[11px] rounded p-2 text-white outline-none font-bold"
                >
                  {chains.map(ch => <option key={ch} value={ch}>{ch}</option>)}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Pristine Settlement Asset</label>
                <select
                  value={newStaff.splitToken}
                  onChange={(e) => setNewStaff({...newStaff, splitToken: e.target.value as any})}
                  className="w-full bg-[#04060b] border border-[#141b2e] text-[11px] rounded p-2 text-white outline-none font-bold"
                >
                  {tokens.map(tk => <option key={tk} value={tk}>{tk}</option>)}
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold uppercase rounded text-xs tracking-wider transition-all shadow-md shadow-cyan-500/10"
            >
              Onboard Core Contractor
            </button>
          </form>
        </div>

        {/* Right: Employee list grid */}
        <div className="lg:col-span-8 p-5 rounded-xl border border-[#141b2e] bg-[#07090e]/70 space-y-4">
          <div className="flex justify-between items-center border-b border-[#141b2e] pb-3">
            <div>
              <h3 className="text-sm font-extrabold text-white uppercase tracking-wider font-mono">Autonomous Payroll Ledger</h3>
              <p className="text-[11px] text-slate-500">Managing global remote split pathways</p>
            </div>
            <div className="p-1 px-2 rounded-full border border-cyan-800/20 bg-cyan-950/20 text-xs font-mono text-cyan-400 font-bold">
              Total Burn: ${(payrollRecords.reduce((acc, current) => acc + current.salary, 0)).toLocaleString()}/mo
            </div>
          </div>

          <div className="space-y-2.5">
            {payrollRecords.map((emp) => {
              // Set mock gas depending on chosen chain
              const isEth = emp.mainChain === 'Ethereum';
              const isBase = emp.mainChain === 'Base';
              const isSol = emp.mainChain === 'Solana';
              const gasEstimate = isEth ? '$182' : isBase ? '$0.02' : isSol ? '$0.001' : '$0.15';

              return (
                <div 
                  key={emp.id}
                  className="p-4 rounded-xl border border-[#141b2e]/60 bg-[#07090e]/80 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-cyan-500/25 transition-colors"
                >
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded bg-[#10172d]/80 border border-slate-800 flex items-center justify-center shrink-0">
                      <Users className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">{emp.name}</h4>
                      <p className="text-[10px] text-slate-400">{emp.role} • <span className="font-bold text-slate-300 font-sans">{emp.country}</span></p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6 font-mono text-xs items-center pl-13 md:pl-0">
                    <div>
                      <span className="text-[9px] uppercase text-slate-500 block">Router Pathway</span>
                      <span className="text-white font-bold">{emp.mainChain}</span>
                    </div>

                    <div>
                      <span className="text-[9px] uppercase text-slate-500 block">Split Token</span>
                      <span className="text-[#22d3ee] font-extrabold">{emp.splitToken}</span>
                    </div>

                    <div>
                      <span className="text-[9px] uppercase text-slate-500 block">Est Gas Fee</span>
                      <span className={`${isEth ? 'text-amber-500 font-bold' : 'text-emerald-400'}`}>{gasEstimate}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 self-end md:self-center">
                    <div className="text-right">
                      <span className="text-[10px] text-slate-500 block tracking-widest uppercase font-mono">Net Monthly payout</span>
                      <span className="text-sm font-black text-white font-mono">${emp.salary.toLocaleString()} <span className="text-[10px] text-slate-500 font-normal">USD</span></span>
                    </div>

                    <button
                      onClick={() => onRemoveEmployee(emp.id)}
                      className="p-1.5 rounded hover:bg-red-950/20 text-slate-500 hover:text-red-400 transition-colors"
                      title="Decommission payroll pathway"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
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
