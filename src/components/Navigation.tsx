import React from 'react';
import { 
  LayoutDashboard, Coins, BrainCircuit, Users, ShieldAlert, 
  FileCheck2, Activity, Settings2, LogOut, Wallet, Compass, HelpCircle
} from 'lucide-react';

interface NavigationProps {
  currentTab: string;
  onChangeTab: (tab: string) => void;
  onLogout: () => void;
  totalBalance: number;
  fraudAlertCount: number;
  complianceWarningCount: number;
}

export default function Navigation({ 
  currentTab, 
  onChangeTab, 
  onLogout, 
  totalBalance, 
  fraudAlertCount,
  complianceWarningCount
}: NavigationProps) {

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'treasury', label: 'Treasury Analyst', icon: BrainCircuit },
    { id: 'chat', label: 'AI Copilot Chat', icon: Compass, badge: 'Real AI' },
    { id: 'payroll', label: 'Payroll Router', icon: Users },
    { id: 'fraud', label: 'AML Threat Shield', icon: ShieldAlert, badge: fraudAlertCount > 0 ? `${fraudAlertCount}` : undefined, badgeStyle: 'bg-red-500 text-white' },
    { id: 'health', label: 'Stablecoin Health', icon: Activity },
    { id: 'compliance', label: 'Compliance Reports', icon: FileCheck2, badge: complianceWarningCount > 0 ? 'Review' : undefined, badgeStyle: 'bg-amber-500 text-black' },
    { id: 'settings', label: 'Settings & Secrets', icon: Settings2 },
  ];

  return (
    <aside className="w-68 border-r border-[#141b2e] bg-[#07090e]/95 flex flex-col h-screen overflow-y-auto font-sans shrink-0">
      
      {/* Brand Logo & System State */}
      <div className="p-5 border-b border-[#141b2e] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-indigo-600 rounded flex items-center justify-center shadow-md shadow-cyan-500/10">
            <Activity className="w-4.5 h-4.5 text-black" />
          </div>
          <div>
            <h1 className="font-extrabold text-white text-sm tracking-tight leading-none">StableMind</h1>
            <span className="text-[10px] text-cyan-400 font-mono tracking-widest uppercase">AI TREASURY</span>
          </div>
        </div>

        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse outline outline-2 outline-emerald-950/40" title="Core systems online" />
      </div>

      {/* Embedded Live Multi-chain Status Bar */}
      <div className="px-5 py-3 border-b border-[#141b2e] bg-[#090d18]/60 font-mono text-[9px] text-slate-400 space-y-2">
        <div className="flex justify-between items-center text-[10px] text-slate-300">
          <span className="flex items-center gap-1.5 font-bold">
            <Wallet className="w-3 h-3 text-cyan-400" />
            <span>SANDBOX VAULT</span>
          </span>
          <span className="text-emerald-400 bg-emerald-950/40 px-1 rounded uppercase font-bold text-[8px]">SAFE</span>
        </div>
        <div className="grid grid-cols-2 gap-1.5 text-left text-slate-500">
          <div>
            <span className="block text-[8px] uppercase">Base Gas</span>
            <span className="text-cyan-400 font-medium">0.001 Gwei</span>
          </div>
          <div>
            <span className="block text-[8px] uppercase">Eth Gas</span>
            <span className="text-amber-400 font-medium font-mono">42 Gwei</span>
          </div>
        </div>
        <div className="text-[8px] text-slate-400/80 pt-1 border-t border-[#141b2e]">
          <span>Block Height: <strong className="text-white">#194285</strong></span>
        </div>
      </div>

      {/* Navigation Menu Tabs */}
      <nav className="p-4 flex-1 space-y-1">
        <span className="px-2 text-[10px] uppercase tracking-widest font-mono text-slate-500 font-bold block mb-2">OPERATIONAL SUITE</span>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChangeTab(item.id)}
              className={`w-full text-left px-3.5 py-2.5 rounded-md text-xs font-semibold flex items-center justify-between transition-all group ${
                isActive 
                  ? 'bg-gradient-to-r from-cyan-950/50 to-indigo-950/30 border border-cyan-800/30 text-white' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/40'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-cyan-400 animate-pulse' : 'text-slate-500 group-hover:text-cyan-400'}`} />
                <span>{item.label}</span>
              </div>
              
              {item.badge && (
                <span className={`px-1.5 py-0.5 rounded text-[8px] font-mono tracking-wider font-bold ${
                  item.badgeStyle || 'bg-cyan-950 text-cyan-400 border border-cyan-400/20'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User Session Profile & Quit Outflow Trigger */}
      <div className="p-4 border-t border-[#141b2e] mt-auto bg-[#04060b]">
        <div className="flex items-center gap-2.5 p-1">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-black flex items-center justify-center font-bold text-xs ring-2 ring-[#0f172a]">
            SM
          </div>
          <div className="flex-1 min-w-0">
            <span className="block text-xs font-bold text-white truncate leading-none">Delaware Corp Safety</span>
            <span className="text-[9px] font-mono text-slate-500 truncate mt-0.5 block">0xSM_Treasury</span>
          </div>
        </div>

        <button 
          onClick={onLogout}
          className="w-full mt-4 py-2 px-3 text-left rounded text-slate-500 hover:text-red-400 hover:bg-rose-950/10 text-xs font-medium transition-colors flex items-center gap-2.5"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Exit App Terminal</span>
        </button>
      </div>

    </aside>
  );
}
