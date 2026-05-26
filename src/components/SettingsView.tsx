import React, { useState } from 'react';
import { 
  Settings2, Wallet, Landmark, Cpu, Database, 
  RefreshCcw, Check, HelpCircle, HardDrive, ShieldCheck
} from 'lucide-react';

interface SettingsViewProps {
  onResetDatabase: () => void;
}

export default function SettingsView({ onResetDatabase }: SettingsViewProps) {
  const [gasPreset, setGasPreset] = useState<'Standard' | 'Cheapest L2' | 'Fastest Multi-sig'>('Cheapest L2');
  const [isResetSuccess, setIsResetSuccess] = useState(false);

  const mockWallets = [
    { address: '0xSM_Treasury_Base', label: 'Primary Base L2 Custody Wallet', balance: '1,450,000 USDC' },
    { address: '0xSM_Treasury_Eth', label: 'Legacy Ethereum Mainnet Gnosis Safe', balance: '1,120,450 USDT' },
    { address: '0xSM_Treasury_Sol', label: 'Solana High Speed Payroll Splitting Account', balance: '780,500 USDC' },
    { address: '0xSM_Treasury_Arb', label: 'Arbitrum Rollup Vendor Liquid Escrow', balance: '189,250 DAI' }
  ];

  const handleReset = () => {
    onResetDatabase();
    setIsResetSuccess(true);
    setTimeout(() => setIsResetSuccess(false), 5000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-1 font-sans">
      
      {/* Title */}
      <div>
        <h2 className="text-xl font-extrabold text-white uppercase font-mono">Platform Settings & Custody Diagnostics</h2>
        <p className="text-xs text-slate-400 mt-1">Configure automated routing presets, verify environment diagnostics, and audit connected multi-sig addresses.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left column: Environment status indicators */}
        <div className="lg:col-span-7 p-5 rounded-xl border border-[#141b2e] bg-[#07090e]/70 space-y-5">
          <div className="border-b border-[#141b2e] pb-3 flex items-center justify-between">
            <h3 className="text-xs uppercase font-mono tracking-wider text-slate-400 font-bold flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>Sovereign Executive Diagnostics</span>
            </h3>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          <div className="space-y-4 text-xs font-mono leading-relaxed">
            
            {/* diagnostic 1 */}
            <div className="p-4 rounded bg-slate-950/40 border border-[#141b2e] space-y-2">
              <div className="flex justify-between font-bold">
                <span className="text-slate-500">Gemini Generative Engine Status:</span>
                <span className="text-emerald-400">ONLINE (Standard)</span>
              </div>
              <p className="text-[10px] text-slate-400 font-sans leading-relaxed">
                Platform is successfully configured with full-stack server-side text execution capabilities. General model target is fixed: <strong className="font-mono text-[10px] text-[#22d3ee]">gemini-3.5-flash</strong>.
              </p>
              <div className="text-[10px] text-slate-500 font-sans border-t border-[#141b2e]/60 pt-2 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>AI Studio automatically binds user secrets securely behind server requests.</span>
              </div>
            </div>

            {/* diagnostic 2 */}
            <div className="p-4 rounded bg-slate-950/40 border border-[#141b2e] space-y-2">
              <div className="flex justify-between font-bold">
                <span className="text-slate-500">Multichain Sandbox Oracles:</span>
                <span className="text-slate-300">ACTIVE & READY</span>
              </div>
              <p className="text-[10px] text-slate-400 font-sans leading-relaxed">
                Simulated Gnosis multi-sig parameters are loaded across 5 layer-1 & layer-2 networks. Gas pricing feeds monitored under active websockets.
              </p>
            </div>

            {/* Action Form: Gas speed presets */}
            <div className="p-4 rounded bg-slate-950/40 border border-[#141b2e] space-y-3 font-sans">
              <div className="flex justify-between font-bold font-mono text-[11px]">
                <span className="text-slate-400">AUTOMATED ROUTING PRESET</span>
                <span className="text-[#22d3ee]">{gasPreset.toUpperCase()}</span>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                {(['Standard', 'Cheapest L2', 'Fastest Multi-sig'] as const).map(p => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setGasPreset(p)}
                    className={`p-2 rounded text-[11px] font-bold border transition-colors ${
                      gasPreset === p 
                        ? 'bg-cyan-950 text-cyan-400 border-cyan-800' 
                        : 'bg-slate-900 border-slate-800 text-slate-450 hover:text-white'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-slate-500 font-sans leading-relaxed">
                * Cheapest L2 automatically redirects payout structures to Base/Solana when gas surges exceed 12 Gwei on Ethereum.
              </p>
            </div>

            {/* Database Re-initializer */}
            <div className="p-4 rounded border border-red-950/40 bg-red-950/5 space-y-3 font-sans">
              <div className="flex items-center gap-1.5 text-red-400 font-mono text-xs font-bold">
                <RefreshCcw className="w-4 h-4" />
                <span>Ecosystem State Re-initializer</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Resets the multichain ledger, contract workers, and compliance reports database back to corporate sandbox initials.
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="px-3.5 py-1.5 rounded bg-red-500 hover:bg-red-400 text-black font-mono font-bold uppercase text-[10px] tracking-wider transition-all"
              >
                Reset Ledger State
              </button>
              {isResetSuccess && (
                <span className="text-[10px] text-emerald-400 font-mono font-bold block mt-1.5 animate-pulse">
                  ✓ Ledger reset executed successfully. Initial balances restored.
                </span>
              )}
            </div>

          </div>
        </div>

        {/* Right column: wallet custody diagnostics */}
        <div className="lg:col-span-5 p-5 rounded-xl border border-[#141b2e] bg-[#07090e]/70 space-y-4">
          <div className="border-b border-[#141b2e] pb-3">
            <h3 className="text-xs uppercase font-mono tracking-wider text-slate-400 font-bold flex items-center gap-2">
              <Wallet className="w-4 h-4 text-purple-400" />
              <span>Multi-sig Wallet Status</span>
            </h3>
          </div>

          <div className="space-y-3">
            {mockWallets.map((w, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-slate-950/40 border border-slate-900 font-mono text-[10px] space-y-1 hover:border-cyan-500/20 transition-colors">
                <div className="flex justify-between items-center text-slate-300 font-bold">
                  <span>{w.label}</span>
                  <span className="text-[#22d3ee] text-xs font-black">{w.balance}</span>
                </div>
                <div className="text-slate-500 select-all border-t border-[#141b2e]/60 pt-1 flex justify-between">
                  <span>Address: {w.address}</span>
                  <span className="text-emerald-400 text-[8px] uppercase font-bold">CONNECTED</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-lg bg-[#04060b] border border-[#141b2e] text-xs text-slate-400 space-y-2">
            <div className="flex items-center gap-2 font-bold text-white uppercase text-[10px] font-mono">
              <Database className="w-3.5 h-3.5 text-cyan-400" />
              <span>Ledger Security Parameters</span>
            </div>
            <ul className="list-disc pl-5 space-y-1 text-[11px]">
              <li>ECC SECP256K1 on-chain multi-sig encryption</li>
              <li>Gas optimizer updates every 1.5 seconds</li>
              <li>Tornado Mixer warning database is offline backed up daily</li>
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
}
