import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import LandingPage from './components/LandingPage';
import Navigation from './components/Navigation';
import DashboardView from './components/DashboardView';
import TreasuryView from './components/TreasuryView';
import CopilotView from './components/CopilotView';
import PayrollView from './components/PayrollView';
import FraudView from './components/FraudView';
import HealthMonitorView from './components/HealthMonitorView';
import ComplianceView from './components/ComplianceView';
import SettingsView from './components/SettingsView';

import { Transaction, PayrollRecord, FraudAlert, StablecoinMetric, ComplianceReport } from './types';
import { 
  INITIAL_TRANSACTIONS, INITIAL_PAYROLL, INITIAL_FRAUD_ALERTS, 
  INITIAL_STABLECOINS, INITIAL_REPORTS 
} from './data';

import { 
  BellRing, HelpCircle, Activity, Settings2, ShieldCheck, Cpu 
} from 'lucide-react';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // starts at landing for maximum conversion wow-factor!
  const [currentTab, setCurrentTab] = useState('dashboard');
  
  // Dynamic state hooks for mock data persistence
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [payrollRecords, setPayrollRecords] = useState<PayrollRecord[]>(INITIAL_PAYROLL);
  const [fraudAlerts, setFraudAlerts] = useState<FraudAlert[]>(INITIAL_FRAUD_ALERTS);
  const [complianceReports, setComplianceReports] = useState<ComplianceReport[]>(INITIAL_REPORTS);
  const [stablecoins, setStablecoins] = useState<StablecoinMetric[]>(INITIAL_STABLECOINS);

  // Copilot bridge
  const [initialCopilotPrompt, setInitialCopilotPrompt] = useState<string | undefined>(undefined);

  // Core callback: Add Employee
  const handleAddEmployee = (newEmp: Omit<PayrollRecord, 'id'>) => {
    const id = `EMP-${Date.now().toString().slice(-3)}`;
    const record: PayrollRecord = { id, ...newEmp };
    setPayrollRecords(prev => [record, ...prev]);

    // Append standard transaction outflow record corresponding to compensation
    const txId = `TXN-PAY-${Date.now().toString().slice(-3)}`;
    const tx: Transaction = {
      id: txId,
      date: new Date().toISOString().split('T')[0],
      amount: newEmp.salary,
      token: newEmp.splitToken,
      chain: newEmp.mainChain,
      type: 'Payroll',
      description: `Disbursed comp splitter setup for remote contractor ${newEmp.name}`,
      sender: '0xSM_Treasury_Multi',
      receiver: '0xEmployee_Receiver_Node',
      status: 'Completed',
      riskScore: 2
    };
    setTransactions(prev => [tx, ...prev]);
  };

  // Core callback: Remove Employee
  const handleRemoveEmployee = (id: string) => {
    setPayrollRecords(prev => prev.filter(e => e.id !== id));
  };

  // Core callback: Resolve Fraud flag
  const handleResolveAlert = (id: string, newStatus: 'Resolved' | 'Cleared') => {
    setFraudAlerts(prev => prev.map(al => {
      if (al.id === id) {
        return { ...al, status: newStatus };
      }
      return al;
    }));

    // If actual transaction was flagged, update transaction list to complete/clean state
    const alertItem = fraudAlerts.find(a => a.id === id);
    if (alertItem && alertItem.transactionId) {
      setTransactions(prev => prev.map(t => {
        if (t.id === alertItem.transactionId) {
          return { ...t, status: 'Completed', riskScore: 12 }; // restored score
        }
        return t;
      }));
    }
  };

  // Core callback: Add report
  const handleAddReport = (newRep: Omit<ComplianceReport, 'id'>) => {
    const id = `REP-VAR-${Date.now().toString().slice(-3)}`;
    const report: ComplianceReport = { id, ...newRep };
    setComplianceReports(prev => [report, ...prev]);
  };

  // Core callback: Reset everything to initials
  const handleResetDatabase = () => {
    setTransactions(INITIAL_TRANSACTIONS);
    setPayrollRecords(INITIAL_PAYROLL);
    setFraudAlerts(INITIAL_FRAUD_ALERTS);
    setComplianceReports(INITIAL_REPORTS);
    setStablecoins(INITIAL_STABLECOINS);
  };

  // Bridge: trigger copilot quick ask
  const handleQuickAsk = (promptText: string) => {
    setInitialCopilotPrompt(promptText);
    setCurrentTab('chat');
  };

  // Statistics calculation for badge displays
  const activeFraudCount = fraudAlerts.filter(al => al.status === 'Unresolved' || al.status === 'Investigating').length;
  const complianceReviewCount = complianceReports.filter(rep => rep.status === 'Requires Review').length;
  const totalBalance = 3540200;

  // View router
  const renderTabContent = () => {
    switch (currentTab) {
      case 'dashboard':
        return (
          <DashboardView 
            transactions={transactions} 
            stablecoins={stablecoins}
            onQuickAsk={handleQuickAsk}
            onNavigateToTab={setCurrentTab}
          />
        );
      case 'treasury':
        return <TreasuryView />;
      case 'chat':
        return (
          <CopilotView 
            initialPrompt={initialCopilotPrompt} 
            onClearInitialPrompt={() => setInitialCopilotPrompt(undefined)}
          />
        );
      case 'payroll':
        return (
          <PayrollView 
            payrollRecords={payrollRecords}
            onAddEmployee={handleAddEmployee}
            onRemoveEmployee={handleRemoveEmployee}
          />
        );
      case 'fraud':
        return (
          <FraudView 
            alerts={fraudAlerts} 
            onResolveAlert={handleResolveAlert}
          />
        );
      case 'health':
        return <HealthMonitorView stablecoins={stablecoins} />;
      case 'compliance':
        return (
          <ComplianceView 
            reports={complianceReports}
            onAddReport={handleAddReport}
          />
        );
      case 'settings':
        return <SettingsView onResetDatabase={handleResetDatabase} />;
      default:
        return <DashboardView transactions={transactions} stablecoins={stablecoins} onQuickAsk={handleQuickAsk} onNavigateToTab={setCurrentTab} />;
    }
  };

  // Split-screen Layout: Landing Page vs Platform Shell
  if (!isLoggedIn) {
    return <LandingPage onEnterApp={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex overflow-hidden font-sans relative selection:bg-cyan-400 selection:text-slate-950">
      
      {/* Platform Dashboard Layout Sidebar */}
      <Navigation 
        currentTab={currentTab} 
        onChangeTab={setCurrentTab} 
        onLogout={() => setIsLoggedIn(false)}
        totalBalance={totalBalance}
        fraudAlertCount={activeFraudCount}
        complianceWarningCount={complianceReviewCount}
      />

      {/* Main Content Workspace viewport */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Upper Workspace Navigation Panel */}
        <header className="h-16 border-b border-[#141b2e] bg-[#07090e]/80 backdrop-blur flex items-center justify-between px-6 shrink-0 relative z-30">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono tracking-widest text-[#22d3ee] font-black uppercase">SYSTEM TERMINAL INDEX</span>
            <span className="text-slate-500 font-mono text-[10px]">/</span>
            <span className="text-white font-mono text-xs capitalize text-slate-300 font-bold">{currentTab.replace('-', ' ')} view</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
            <div className="hidden sm:flex items-center gap-1.5 text-[10px] bg-slate-950 px-2.5 py-1 rounded border border-slate-900 leading-none">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Block Node Sync: <strong className="text-white">Active</strong></span>
            </div>

            {/* Quick alert indicator badge on workspace top header */}
            <div className="relative group cursor-pointer" onClick={() => setCurrentTab('fraud')}>
              <BellRing className={`w-4 h-4 ${activeFraudCount > 0 ? 'text-red-400 animate-bounce' : 'text-slate-500 hover:text-white'}`} />
              {activeFraudCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-red-500 text-black font-black text-[9px] flex items-center justify-center font-mono">
                  {activeFraudCount}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 border-l border-[#141b2e] pl-4">
              <span className="text-white font-bold text-[11px] leading-none">Delaware Multisig Ledger</span>
              <span className="px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-400 text-[8px] uppercase border border-cyan-400/20 font-bold">V2.4</span>
            </div>
          </div>
        </header>

        {/* Tab content panel wrapped inside a beautifully transitions viewport with Framer Motion */}
        <div className="flex-1 overflow-y-auto p-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-950/40 via-transparent to-transparent">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTab}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="h-full"
            >
              {renderTabContent()}
            </motion.div>
          </AnimatePresence>
        </div>

      </main>

    </div>
  );
}
