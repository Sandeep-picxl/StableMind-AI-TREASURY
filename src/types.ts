export interface Transaction {
  id: string;
  date: string;
  amount: number;
  token: 'USDC' | 'USDT' | 'DAI' | 'PYUSD' | 'EURC';
  chain: 'Base' | 'Ethereum' | 'Solana' | 'Polygon' | 'Arbitrum';
  type: 'Inflow' | 'Outflow' | 'Payroll' | 'Treasury Swap';
  description: string;
  sender: string;
  receiver: string;
  status: 'Completed' | 'Pending' | 'Flagged';
  riskScore: number; // 0 - 100
}

export interface PayrollRecord {
  id: string;
  name: string;
  role: string;
  country: string;
  salary: number;
  mainChain: 'Base' | 'Ethereum' | 'Solana' | 'Polygon' | 'Arbitrum';
  splitToken: 'USDC' | 'USDT' | 'DAI' | 'PYUSD' | 'EURC';
  status: 'Active' | 'Paused' | 'Processing';
  nextPayout: string;
}

export interface FraudAlert {
  id: string;
  date: string;
  transactionId?: string;
  entity: string;
  reason: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  riskScore: number;
  status: 'Unresolved' | 'Investigating' | 'Resolved' | 'Cleared';
  chain: 'Base' | 'Ethereum' | 'Solana' | 'Polygon' | 'Arbitrum';
  confidence: number; // Percentage
}

export interface StablecoinMetric {
  id: string;
  symbol: 'USDC' | 'USDT' | 'DAI' | 'PYUSD' | 'EURC';
  name: string;
  price: number;
  depegRisk: 'Safe' | 'Low' | 'Medium' | 'High';
  trustScore: number; // 0 - 100
  backingRatio: number; // percentage
  sentiment: 'Bullish' | 'Neutral' | 'Bearish';
  liquidity: number; // Millions USD
  volatility: number; // standard dev or range percentage
  chainStability: number; // Score out of 100
}

export interface ComplianceReport {
  id: string;
  name: string;
  type: 'Tax Filing' | 'Audit Summary' | 'Vara Disclosure' | 'MiCA Advisory';
  date: string;
  status: 'Verified' | 'Requires Review' | 'Draft';
  recipient: string;
  aiSummary: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
  isLoading?: boolean;
  chartData?: Array<{ name: string; value: number | string; [key: string]: any }>;
  chartType?: 'bar' | 'line' | 'pie';
  citations?: Array<{ title: string; uri: string }>;
  suggestions?: string[];
}
