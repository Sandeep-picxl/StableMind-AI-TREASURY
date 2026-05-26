import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { 
  Send, BrainCircuit, Sparkles, HelpCircle, ArrowUpRight, 
  Trash2, ShieldAlert, BadgeInfo, Cpu, BarChart3, LineChart as LIcon, Pizza
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface CopilotViewProps {
  initialPrompt?: string;
  onClearInitialPrompt?: () => void;
}

export default function CopilotView({ initialPrompt, onClearInitialPrompt }: CopilotViewProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-01',
      role: 'assistant',
      text: `### StableMind AI Copilot Activated

Greetings. I am your autonomous Web3 corporate finance partner. I have scanned your on-chain multisigs and sandbox nodes.

**Current Parameters Under Monitoring**:
* Corporate balance: **$3,540,200** in multi-chain stables.
* Monthly overhead footprint: **$98,400**.
* Risk states: **1 Anomalous Contract Deposit** logged under Arbitrum pool.

Ask me to predict cash runways, show stablecoin safety, explain European MiCA limits, or optimize international payroll routers.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions: [
        "Predict cash runway over 6 months",
        "Show stablecoin exposure and depeg risk",
        "How to optimize payroll?",
        "Show suspicious wallet alerts"
      ]
    }
  ]);

  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isSending]);

  // Handle passed initial prompts from quick clicks inside Dashboard
  useEffect(() => {
    if (initialPrompt) {
      handleSendMessage(initialPrompt);
      if (onClearInitialPrompt) {
        onClearInitialPrompt();
      }
    }
  }, [initialPrompt]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isSending) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      role: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsSending(true);

    try {
      // Stream or fetch response from the Express full-stack API endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: textToSend,
          history: messages.map(m => ({ role: m.role, text: m.text })),
          context: {
            corporateBalance: 3540200,
            activeAlerts: 1,
            totalBurn: 98400
          }
        })
      });

      if (!response.ok) {
        throw new Error('On-chain Gemini copilot interface returned an unexpected socket error.');
      }

      const data = await response.json();

      const assistantMsg: ChatMessage = {
        id: `msg-${Date.now()}-assistant`,
        role: 'assistant',
        text: data.text || "I was unable to retrieve a response from the AI services layer.",
        chartData: data.chartData,
        chartType: data.chartType,
        suggestions: data.suggestions || [],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMsg]);

    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `msg-${Date.now()}-err`,
        role: 'assistant',
        text: `### Copilot Request Timeout

An error occurred connecting to the server-side Gemini system layer:
\`\`\`text
${err?.message || "Internal Node Connection Timed Out"}
\`\`\`
Ensure your network is active or review **Settings & Secrets** to verify if your server key is mounted correctly. Fallback mock responses remain secure.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsSending(false);
    }
  };

  const handleClearChat = () => {
    if (window.confirm('Do you want to reset this AI intelligence stream?')) {
      setMessages([
        {
          id: 'init-01',
          role: 'assistant',
          text: `### StableMind Copilot Interface Reset

CFO neural streams cleared. Ready for new stablecoin treasury queries.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestions: [
            "Predict runway over 6 months",
            "What stablecoin is safest?",
            "Show suspicious wallet alerts"
          ]
        }
      ]);
    }
  };

  // Safe and clean custom light-weight markdown preview compiler helper
  const renderFormattedMarkdown = (rawText: string) => {
    const lines = rawText.split('\n');
    return lines.map((line, lineIdx) => {
      // Headers
      if (line.slice(0, 4) === '####') {
        return <h5 key={lineIdx} className="text-xs font-mono uppercase tracking-wider text-cyan-400 mt-2 font-black">{line.replace('####', '').trim()}</h5>;
      }
      if (line.slice(0, 3) === '###') {
        return <h4 key={lineIdx} className="text-sm font-bold text-white mt-3 font-sans border-b border-[#1e294b]/40 pb-1">{line.replace('###', '').trim()}</h4>;
      }
      if (line.slice(0, 2) === '##') {
        return <h3 key={lineIdx} className="text-base font-extrabold text-white mt-4 font-sans">{line.replace('##', '').trim()}</h3>;
      }
      
      // Bulletlists
      if (line.trim().slice(0, 2) === '* ' || line.trim().slice(0, 2) === '- ') {
        const cleanContent = line.trim().substring(2);
        return (
          <li key={lineIdx} className="list-disc ml-5 text-slate-300 text-xs my-1 font-sans">
            {parseInlineStyles(cleanContent)}
          </li>
        );
      }

      // Preprocessed blocks
      if (line.slice(0, 3) === '```') {
        return null; // hide raw json blocks
      }

      // Standard text line
      if (line.trim() === '') {
        return <div key={lineIdx} className="h-2" />;
      }

      return (
        <p key={lineIdx} className="text-xs text-slate-300 font-sans leading-relaxed my-1">
          {parseInlineStyles(line)}
        </p>
      );
    });
  };

  // Converts standard **bold** tags inline
  const parseInlineStyles = (txt: string) => {
    const parts = txt.split('**');
    return parts.map((part, idx) => {
      if (idx % 2 === 1) {
        return <strong key={idx} className="font-bold text-white font-mono text-[11px] bg-slate-900 border border-slate-800 px-1 rounded">{part}</strong>;
      }
      return part;
    });
  };

  // Recharts renderer for dynamic responses from the Gemini engine
  const renderCopilotInlineChart = (data: any[], type: 'bar' | 'line' | 'pie') => {
    if (!data || data.length === 0) return null;

    return (
      <div className="my-5 p-4 rounded-xl border border-[#1e294b] bg-slate-950/80 space-y-2">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>AI Automated Graph Output</span>
          </span>
          <span className="text-[9px] text-slate-500 font-mono">Real-time parameters loaded</span>
        </div>

        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            {type === 'line' ? (
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1c253d" />
                <XAxis dataKey="name" stroke="#68759f" fontSize={10} tickLine={false} />
                <YAxis stroke="#68759f" fontSize={10} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#07090e', border: '1px solid #1e294b', fontSize: 10, color: '#fff' }} />
                <Legend iconSize={10} wrapperStyle={{ fontSize: 10 }} />
                <Line type="monotone" dataKey={Object.keys(data[0])[1]} stroke="#22d3ee" strokeWidth={2} />
                {Object.keys(data[0])[2] && (
                  <Line type="monotone" dataKey={Object.keys(data[0])[2]} stroke="#818cf8" strokeWidth={1.5} strokeDasharray="3 3" />
                )}
              </LineChart>
            ) : type === 'pie' ? (
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={35}
                  outerRadius={50}
                  paddingAngle={2}
                  dataKey={Object.keys(data[0])[1]}
                  nameKey="name"
                >
                  {data.map((_, idx) => (
                    <Cell key={idx} fill={idx === 0 ? '#22d3ee' : idx === 1 ? '#3b82f6' : idx === 2 ? '#f59e0b' : '#a855f7'} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#07090e', border: '1px solid #1e294b', fontSize: 10 }} />
                <Legend iconSize={8} wrapperStyle={{ fontSize: 9 }} />
              </PieChart>
            ) : (
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1c253d" />
                <XAxis dataKey="name" stroke="#68759f" fontSize={10} tickLine={false} />
                <YAxis stroke="#68759f" fontSize={10} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#07090e', border: '1px solid #1e294b', fontSize: 10 }} />
                <Legend iconSize={10} wrapperStyle={{ fontSize: 10 }} />
                <Bar dataKey={Object.keys(data[0])[1]} fill="#22d3ee" radius={[3, 3, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] max-w-7xl mx-auto border border-[#141b2e] rounded-xl bg-[#07090e]/90 overflow-hidden font-sans">
      
      {/* Top chat status headers */}
      <div className="px-5 py-4 border-b border-[#141b2e] bg-slate-950/40 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-cyan-400 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <BrainCircuit className="w-5 h-5 text-black" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-[#22d3ee] text-xs uppercase tracking-widest font-mono">STABLEMIND COGNITIVE BRIDGE</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <p className="text-[10px] text-slate-500 mt-0.5">Autonomous compliance queries backed by Gemini Flash model.</p>
          </div>
        </div>

        <button
          onClick={handleClearChat}
          className="p-2 rounded text-slate-500 hover:text-red-400 hover:bg-slate-900 transition-colors"
          title="Reset conversation stream"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Feed panel */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-950/10 via-transparent to-transparent">
        {messages.map((m) => (
          <div 
            key={m.id}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} items-start gap-3.5`}
          >
            {m.role === 'assistant' && (
              <div className="w-7 h-7 rounded bg-cyan-950/40 border border-cyan-800/30 flex items-center justify-center text-cyan-400 shrink-0 mt-1">
                <Cpu className="w-3.5 h-3.5" />
              </div>
            )}

            <div className="max-w-[85%] space-y-1">
              <div className={`p-4 rounded-xl border relative ${
                m.role === 'user'
                  ? 'bg-gradient-to-l from-cyan-950/30 to-blue-950/20 border-cyan-800/30 text-white'
                  : 'bg-slate-950/40 border-[#141b2e] text-slate-200'
              }`}>
                {m.role === 'user' ? (
                  <p className="text-xs font-mono select-all text-[#22d3ee]">{m.text}</p>
                ) : (
                  <div className="space-y-2">
                    {renderFormattedMarkdown(m.text)}
                  </div>
                )}

                {/* Inline chart rendering if returned by model */}
                {m.role === 'assistant' && m.chartData && m.chartType && (
                  renderCopilotInlineChart(m.chartData, m.chartType)
                )}
              </div>

              {/* Time stamp */}
              <span className="block text-[9px] text-slate-600 font-mono mt-1 text-right">
                {m.timestamp}
              </span>

              {/* Instant suggested chip triggers */}
              {m.role === 'assistant' && m.suggestions && m.suggestions.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {m.suggestions.map((s, sIdx) => (
                    <button
                      key={sIdx}
                      onClick={() => handleSendMessage(s)}
                      className="px-2.5 py-1 text-[10px] rounded-full border border-slate-800 bg-[#07090e]/40 hover:bg-cyan-950/20 hover:border-cyan-500/30 text-slate-400 hover:text-cyan-400 transition-all font-mono"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Streaming Loading Thinking feedback bubbles */}
        {isSending && (
          <div className="flex justify-start items-center gap-3.5">
            <div className="w-7 h-7 rounded bg-cyan-950/30 border border-cyan-800/20 flex items-center justify-center text-cyan-400 shrink-0">
              <BrainCircuit className="w-3.5 h-3.5 animate-spin" />
            </div>
            <div className="p-4 rounded-xl border border-dashed border-[#1e294b] bg-slate-950/10 text-[10px] text-slate-500 font-mono uppercase tracking-widest animate-pulse">
              StableMind Bot Analysing On-Chain Gas Parameters...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input keyboard controls panel */}
      <div className="p-4 border-t border-[#141b2e] bg-slate-950/30 space-y-3">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(input);
          }}
          className="flex gap-2.5 items-center bg-[#04060b] border border-[#1e294b] rounded-lg p-1 px-3"
        >
          <div className="text-slate-500 hover:text-cyan-450 cursor-help" title="Input finance question details">
            <HelpCircle className="w-4.5 h-4.5" />
          </div>
          
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask AI: 'Will our liquid runway survive an expansion?' or 'Show compliance risk'"
            className="flex-1 bg-transparent border-none text-xs text-white outline-none py-2.5 font-sans font-medium placeholder:text-slate-600"
            disabled={isSending}
            required
          />

          <button
            type="submit"
            className="px-3.5 py-2 rounded bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs flex items-center justify-center transition-all disabled:opacity-25"
            disabled={isSending || !input.trim()}
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="flex justify-between items-center text-[10px] text-slate-600 font-mono">
          <span>SECURED COGNITIVE CHANNELS: TLS 1.3 SYMMETRIC MATCH</span>
          <span className="flex items-center gap-1">
            <BadgeInfo className="w-3.5 h-3.5 text-cyan-500" />
            <span>Real Gemini responses supported</span>
          </span>
        </div>
      </div>

    </div>
  );
}
