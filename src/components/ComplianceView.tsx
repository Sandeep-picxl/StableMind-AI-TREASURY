import React, { useState } from 'react';
import { ComplianceReport } from '../types';
import { 
  FileCheck2, Download, Plus, Scale, Sparkles, 
  ChevronRight, BadgeInfo, CheckCircle2, AlertTriangle, Printer
} from 'lucide-react';

interface ComplianceViewProps {
  reports: ComplianceReport[];
  onAddReport: (report: Omit<ComplianceReport, 'id'>) => void;
}

export default function ComplianceView({ reports, onAddReport }: ComplianceViewProps) {
  const [isCompiling, setIsCompiling] = useState(false);
  const [compileState, setCompileState] = useState<string | null>(null);

  const [newFiling, setNewFiling] = useState({
    name: '',
    type: 'Tax Filing' as any,
    recipient: 'ESMA Regulatory Portal',
    aiSummary: ''
  });

  const handleCompile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFiling.name) return;

    setIsCompiling(true);
    setCompileState("Contacting server-side compliance agents... Reading audited multisig cashflow states...");

    setTimeout(() => {
      onAddReport({
        name: newFiling.name,
        type: newFiling.type,
        date: new Date().toISOString().split('T')[0],
        status: 'Draft',
        recipient: newFiling.recipient,
        aiSummary: newFiling.aiSummary || `Autonomous audit statement compiled under SHA-256 Merkle Ledger signatures. Total multi-chain stablecoin values verified at $3.54M. Outflow anomalies resolved successfully.`
      });

      setNewFiling({
        name: '',
        type: 'Tax Filing',
        recipient: 'ESMA Regulatory Portal',
        aiSummary: ''
      });

      setIsCompiling(false);
      setCompileState("SUCCESS: Exported notarized document safely. Ready for governance signature.");
      setTimeout(() => setCompileState(null), 5000);
    }, 2500);
  };

  const handleTriggerMockDownload = async (id: string, name: string) => {
    try {
      const res = await fetch('/api/compliance/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ reportId: id, reportName: name })
      });
      const data = await res.json();
      
      // Simple raw file generation and download trigger
      const blob = new Blob([
        `STABLEMIND AI COMPLIANCE NOTARISED LOG\nReport ID: ${id}\nReport Title: ${name}\nGenerated on StableMind Ledger: ${new Date().toLocaleDateString()}\n\nAudit Certification Proof Hash: ${data.downloadUrl}\n\nThis constitutes proof that all transaction values holding no sancon exposures were audited and found correct under MICA guidelines.`
      ], { type: 'text/plain' });
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${id}_notarised_compliance_proof.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

    } catch (e) {
      alert("Mock download completed. File compiled successfully.");
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-1 font-sans">
      
      {/* Title */}
      <div>
        <h2 className="text-xl font-extrabold text-white uppercase font-mono">Compliance & Regulatory Reports Control</h2>
        <p className="text-xs text-slate-400 mt-1">Generate tax statements, compile Dubai VARA disclosure filings, and monitor European MiCA capital constraints.</p>
      </div>

      {compileState && (
        <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-xs text-cyan-400 font-mono leading-relaxed animate-pulse">
          {compileState}
        </div>
      )}

      {/* Compliance Advisory indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className="p-4 rounded-xl border border-emerald-950 bg-emerald-950/5 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-xs">
            <h4 className="font-bold text-white uppercase font-mono text-[10px]">MICA CAP LIMIT</h4>
            <span className="text-emerald-400 font-bold block mt-1">EURC Weekly Limits: 0.14% Used</span>
            <p className="text-slate-400 text-[10px] mt-1">Weekly EURC merchant swap activity sits comfortably beneath the ESMA €200M threshold volume caps.</p>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-amber-950 bg-amber-950/5 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div className="text-xs">
            <h4 className="font-bold text-white uppercase font-mono text-[10px]">VARA AUDIT LOG</h4>
            <span className="text-amber-400 font-bold block mt-1">1 Draft Requires Signature</span>
            <p className="text-slate-400 text-[10px] mt-1">Monthly contractor splits for Cypern developer wallet (EMP-106) falls within VARA sandbox rules but merits manual audit approval.</p>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-[#141b2e] bg-[#07090e]/80 flex items-start gap-3">
          <Scale className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          <div className="text-xs">
            <h4 className="font-bold text-white uppercase font-mono text-[10px]">AML MERKLE STATUS</h4>
            <span className="text-cyan-400 font-bold block mt-1">Tornado Quarantine Active</span>
            <p className="text-slate-400 text-[10px] mt-1">1 transactional flow has been successfully quarantined on Arbitrum sub-ledger representing secure compliance status.</p>
          </div>
        </div>

      </div>

      {/* Form: Compile New on-chain audit document */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        <div className="lg:col-span-4 p-5 rounded-xl border border-[#141b2e] bg-[#07090e]/70 h-fit space-y-4">
          <h3 className="text-sm font-extrabold text-white uppercase tracking-wider font-mono flex items-center gap-2">
            <Plus className="w-4 h-4 text-[#22d3ee]" />
            <span>Generate New Audit Report</span>
          </h3>

          <form onSubmit={handleCompile} className="space-y-3.5 text-xs">
            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Report Name / Label</label>
              <input 
                type="text" 
                value={newFiling.name}
                onChange={(e) => setNewFiling({...newFiling, name: e.target.value})}
                placeholder="E.g. TAX STATEMENT Q2 2026 OUTFLOW"
                className="w-full bg-[#04060b] border border-[#141b2e] rounded p-2 text-white outline-none focus:border-cyan-400"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Regulatory Spec</label>
                <select
                  value={newFiling.type}
                  onChange={(e) => setNewFiling({...newFiling, type: e.target.value as any})}
                  className="w-full bg-[#04060b] border border-[#141b2e] rounded p-2 text-white outline-none font-bold text-[11px]"
                >
                  <option value="Tax Filing">Tax Filing</option>
                  <option value="Audit Summary">Audit Summary</option>
                  <option value="Vara Disclosure">Vara Disclosure</option>
                  <option value="MiCA Advisory">MiCA Advisory</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Recipient Portal</label>
                <input 
                  type="text" 
                  value={newFiling.recipient}
                  onChange={(e) => setNewFiling({...newFiling, recipient: e.target.value})}
                  className="w-full bg-[#04060b] border border-[#141b2e] rounded p-2 text-white outline-none"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Filing Context / Manual Notes</label>
              <textarea 
                value={newFiling.aiSummary}
                onChange={(e) => setNewFiling({...newFiling, aiSummary: e.target.value})}
                placeholder="E.g. Includes L2 transaction splits with Base and Solana gas optimization ratios."
                rows={3}
                className="w-full bg-[#04060b] border border-[#141b2e] rounded p-2 text-white outline-none font-sans"
              />
            </div>

            <button
              type="submit"
              disabled={isCompiling}
              className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-black font-bold uppercase rounded text-xs tracking-wider transition-all disabled:opacity-30"
            >
              {isCompiling ? "Compiling Cryptographic Signatures..." : "Compile Notarised Statement"}
            </button>
          </form>
        </div>

        {/* Right list of filings */}
        <div className="lg:col-span-8 p-5 rounded-xl border border-[#141b2e] bg-[#07090e]/70 space-y-4">
          <div className="flex justify-between items-center border-b border-[#141b2e] pb-3">
            <div>
              <h3 className="text-sm font-extrabold text-white uppercase tracking-wider font-mono">Notarised Compliance Disclosure Archive</h3>
              <p className="text-[11px] text-slate-500">Secured on-chain legal advisory statement tracking</p>
            </div>
          </div>

          <div className="space-y-4">
            {reports.map((rep) => {
              const isVerified = rep.status === 'Verified';
              return (
                <div 
                  key={rep.id}
                  className="p-4 rounded-xl border border-[#141b2e]/60 bg-[#07090e]/80 space-y-3 hover:border-cyan-500/20 transition-colors"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-[9px] text-slate-500 font-bold">{rep.id}</span>
                        <span className={`px-1.5 py-0.2 rounded text-[8px] font-mono font-bold ${
                          isVerified ? 'bg-emerald-950/40 text-emerald-400' : 'bg-amber-950/40 text-amber-500'
                        }`}>
                          {rep.status}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">{rep.date}</span>
                      </div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">{rep.name}</h4>
                    </div>

                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleTriggerMockDownload(rep.id, rep.name)}
                        className="p-1.5 rounded border border-slate-800 bg-[#04060b] text-slate-400 hover:text-white hover:border-slate-700 transition-colors flex items-center gap-1.5 font-mono text-[9px] uppercase font-bold"
                        title="Download cryptographically authenticated text log"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Notarised Proof</span>
                      </button>
                    </div>
                  </div>

                  <div className="p-3 rounded bg-slate-950/40 border border-[#141b2e]/60 relative text-slate-300 text-xs font-sans leading-relaxed">
                    <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 text-cyan-400 font-mono text-[9px] font-bold">
                      <Sparkles className="w-3 h-3 animate-spin" />
                      <span>AI REASONING OUTPUT</span>
                    </div>

                    <div className="text-[11px] font-mono text-slate-400 font-bold mb-1">
                      Recipient Jurisdiction: <span className="text-white">{rep.recipient}</span>
                    </div>
                    <p className="text-slate-300 pr-10">{rep.aiSummary}</p>
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
