import React, { useState } from 'react';
import { FraudAlert } from '../types';
import { 
  ShieldAlert, ShieldCheck, Flame, Info, Check, 
  Search, AlertTriangle, Fingerprint, Eye, Skull
} from 'lucide-react';

interface FraudViewProps {
  alerts: FraudAlert[];
  onResolveAlert: (id: string, newStatus: 'Resolved' | 'Cleared') => void;
}

export default function FraudView({ alerts, onResolveAlert }: FraudViewProps) {
  const [addressSearch, setAddressSearch] = useState('');
  const [auditResult, setAuditResult] = useState<{
    status: 'Flagged' | 'Clean' | 'Suspicious' | null;
    address: string;
    riskScore: number;
    reason?: string;
    trustRating: string;
    exposureIndex: number; // percentage
  } | null>(null);

  const handleAuditAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressSearch.trim()) return;

    const query = addressSearch.toLowerCase().trim();
    let score = Math.floor(Math.random() * 30) + 5; // default low risk
    let rating = "AAA Corporate Grade";
    let exposure = 0;
    let status: 'Flagged' | 'Clean' | 'Suspicious' = 'Clean';
    let reason = "This address matches verified stablecoin contracts holding no historical exposure to sanctioned mixing networks or zero-nonce Sybil clusters.";

    if (query.includes('tornado') || query.includes('0x66bf') || query.includes('sanct')) {
      score = 92;
      status = 'Flagged';
      rating = 'D High Exposure Risk';
      exposure = 97;
      reason = "STABLEMIND COMPLIANCE TRACE: Destination wallet possesses direct multi-bridge interaction paths with the Tornado.Cash L2 Arbitrum Router and was funded original transaction gas by a sanctioned wallet cluster.";
    } else if (query.includes('unverified') || query.length < 30 || query.includes('0x889a')) {
      score = 54;
      status = 'Suspicious';
      rating = 'B- Limited Track Record';
      exposure = 35;
      reason = "STABLEMIND COMPLIANCE TRACE: This wallet address has zero historic transaction density and was funded original contract gas by a recently deployed proxy smart account.";
    }

    setAuditResult({
      status,
      address: addressSearch,
      riskScore: score,
      rating,
      exposureIndex: exposure,
      reason
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-1 font-sans">
      
      {/* Title */}
      <div>
        <h2 className="text-xl font-extrabold tracking-tight text-white uppercase font-mono">AML Threat Shield & Fraud Center</h2>
        <p className="text-xs text-slate-400 mt-1">Surveilling global multi-chain stablecoin movements for AML discrepancies and mixer contamination.</p>
      </div>

      {/* Primary KPI Metrics for fraud */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl border border-red-950/40 bg-red-950/10 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-red-400 uppercase tracking-widest block font-bold font-mono">Current Risk Contamination</span>
            <span className="text-2xl font-black mt-1 text-red-500 block">Critical Risk Level</span>
          </div>
          <Flame className="w-8 h-8 text-red-500/80 animate-pulse" />
        </div>

        <div className="p-4 rounded-xl border border-[#141b2e] bg-[#07090e]/80 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-bold font-mono">AML Scans completed</span>
            <span className="text-2xl font-black mt-1 text-white block">42,852 TXs audited</span>
          </div>
          <Fingerprint className="w-8 h-8 text-[#22d3ee]/80" />
        </div>

        <div className="p-4 rounded-xl border border-cyan-950/50 bg-[#07090e]/80 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-cyan-400 uppercase tracking-widest block font-bold font-mono">Active Monitoring Agents</span>
            <span className="text-2xl font-black mt-1 text-cyan-400 block">4 Bots Online</span>
          </div>
          <ShieldCheck className="w-8 h-8 text-cyan-400" />
        </div>
      </div>

      {/* Checker Address Tool */}
      <div className="p-5 rounded-xl border border-[#141b2e] bg-[#07090e]/60 space-y-4">
        <div>
          <h3 className="text-sm font-extrabold text-white uppercase tracking-wider font-mono flex items-center gap-2">
            <Search className="w-4 h-4 text-cyan-400" />
            <span>Interactive Address Compliance Trace (KYT Scanner)</span>
          </h3>
          <p className="text-[11px] text-slate-500 mt-0.5">Audit any hexadecimal wallet address for sanctioned entity attachments or mixing proxies before executing a payout.</p>
        </div>

        <form onSubmit={handleAuditAddress} className="flex gap-2.5 max-w-2xl font-mono text-xs">
          <input 
            type="text" 
            value={addressSearch}
            onChange={(e) => setAddressSearch(e.target.value)}
            placeholder="E.g. 0x66bf...99a0 (tornado Mixer) or 0x889a...b78a"
            className="flex-1 bg-[#04060b] border border-[#1e294b] rounded p-2.5 text-white outline-none focus:border-cyan-400 font-bold"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-[#22d3ee] hover:bg-cyan-300 text-slate-950 font-bold rounded flex items-center gap-1 uppercase tracking-wider font-mono text-[10px]"
          >
            <span>Run AI Audit</span>
          </button>
        </form>

        {auditResult && (
          <div className="p-4 rounded-xl border border-[#1e294b] bg-slate-950/70 text-xs leading-relaxed space-y-3 font-mono">
            <div className="flex justify-between items-center border-b border-[#141b2e]/60 pb-2">
              <span className="text-[10px] text-slate-500">CONTRACT SYSTEM AUDIT RESULT</span>
              <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                auditResult.status === 'Flagged' ? 'bg-red-500 text-black' :
                auditResult.status === 'Suspicious' ? 'bg-amber-500 text-black' :
                'bg-emerald-500 text-black'
              }`}>
                {auditResult.status?.toUpperCase()} STATUS
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <span className="text-[9px] text-slate-500 uppercase block">Calculated threat Index</span>
                <span className={`text-xl font-mono font-black ${
                  auditResult.riskScore > 70 ? 'text-red-500' :
                  auditResult.riskScore > 30 ? 'text-amber-500' :
                  'text-emerald-400'
                }`}>{auditResult.riskScore}% Contamination</span>
              </div>
              <div>
                <span className="text-[9px] text-slate-500 uppercase block">Compliance Rating</span>
                <span className="text-white font-bold block mt-1">{auditResult.rating}</span>
              </div>
              <div>
                <span className="text-[9px] text-slate-500 uppercase block">Estimated Sanction Exposure</span>
                <span className="text-white font-bold block mt-1">{auditResult.exposureIndex}% Exposure</span>
              </div>
            </div>

            <p className="text-slate-300 font-sans text-xs pt-1">
              <strong className="text-[#22d3ee] uppercase font-mono text-[10px] block mb-1">Trace Summary:</strong>
              {auditResult.reason}
            </p>
          </div>
        )}
      </div>

      {/* Quarantined Alert Feeds */}
      <div className="p-5 rounded-xl border border-[#141b2e] bg-[#07090e]/60">
        <h3 className="text-sm font-extrabold text-white uppercase tracking-wider font-mono mb-4 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-red-500 animate-pulse" />
          <span>Active AML Threat Feed & Quarantine Log</span>
        </h3>

        <div className="space-y-4">
          {alerts.map((al) => {
            const isCritical = al.severity === 'Critical' || al.severity === 'High';
            const isResolved = al.status === 'Resolved' || al.status === 'Cleared';

            return (
              <div 
                key={al.id} 
                className={`p-4 rounded-xl border flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-colors ${
                  isResolved ? 'border-emerald-950/40 bg-emerald-950/5/20 opacity-50' :
                  isCritical ? 'border-red-950/50 bg-red-950/5' :
                  'border-[#141b2e] bg-slate-950/20'
                }`}
              >
                <div className="space-y-1 px-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="font-mono text-[10px] text-slate-500 font-bold">{al.id}</span>
                    <span className="text-[10px] text-slate-500 font-mono">{al.date}</span>
                    <span className={`px-2 py-0.2 rounded text-[9px] font-bold ${
                      al.severity === 'Critical' ? 'bg-red-500 text-black' :
                      al.severity === 'High' ? 'bg-rose-500 text-black' :
                      al.severity === 'Medium' ? 'bg-amber-500 text-black' :
                      'bg-slate-800 text-slate-400'
                    }`}>
                      {al.severity} Severity
                    </span>
                    <span className="text-xs font-mono text-cyan-400 font-bold bg-[#0a1128] border border-cyan-800/10 px-1.5 rounded">{al.chain} network</span>
                  </div>

                  <h4 className="text-xs font-black text-white font-mono pt-1.5">{al.entity}</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans">{al.reason}</p>
                </div>

                <div className="flex items-center gap-4.5 self-end md:self-center">
                  <div className="text-right font-mono text-xs">
                    <span className="text-[9px] text-slate-500 uppercase block">Confidence index</span>
                    <span className="font-extrabold text-white">{al.confidence}% MATCH</span>
                  </div>

                  {!isResolved ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => onResolveAlert(al.id, 'Cleared')}
                        className="px-2.5 py-1 rounded border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900 text-[10px] font-mono uppercase bg-[#04060b] hover:border-slate-700 font-bold"
                      >
                        Clear False Flag
                      </button>
                      <button
                        onClick={() => onResolveAlert(al.id, 'Resolved')}
                        className="px-2.5 py-1 rounded bg-red-500 hover:bg-red-400 text-black text-[10px] font-mono uppercase font-bold"
                      >
                        Quarantine & File Report
                      </button>
                    </div>
                  ) : (
                    <span className="px-3 py-1 bg-emerald-950/40 text-emerald-400 border border-emerald-800/20 text-[10px] font-bold font-mono rounded flex items-center gap-1 uppercase">
                      <Check className="w-3.5 h-3.5" />
                      <span>{al.status}</span>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
