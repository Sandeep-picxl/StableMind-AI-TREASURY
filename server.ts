import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Lazy initialize Gemini client inside endpoints to prevent crashing if the key is missing on start
let genAI: any = null;
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  if (!genAI) {
    genAI = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return genAI;
}

// 1. API: Multi-agent Treasury & Copilot Analyser
app.post('/api/chat', async (req: Request, res: Response) => {
  const { message, history, context } = req.body;

  const aiClient = getGeminiClient();

  if (!aiClient) {
    // Elegant fallback simulated response if no API key is provided
    setTimeout(() => {
      const lowerMsg = message.toLowerCase();
      let replyText = "";
      let chartData: any[] | undefined = undefined;
      let chartType: 'bar' | 'line' | 'pie' | undefined = undefined;
      let suggestions: string[] = [];

      if (lowerMsg.includes('runway') || lowerMsg.includes('predict') || lowerMsg.includes('forecast')) {
        replyText = `### StableMind AI Treasury Runway Forecast

Based on a current cash outflow of **$98,400/month** (payroll & vendor operations) and a balance of **$3,540,200**, your estimated treasury runway is **36 months** (assuming zero incoming revenue). 

Assuming a conservative **15% month-on-month invoice growth** based on historical trends:
* **Current Treasury**: $3.54M
* **Burn Rate**: $98K/month
* **Optimized gas transition savings (Base/Solana)**: Reduces monthly overhead by up to **$3,400**.

Here is the projected liquid runway chart for the next 6 months:`;
        chartData = [
          { name: 'Month 1', 'Liquid Treasury': 3540200, 'Conservative Projection': 3540200 },
          { name: 'Month 2', 'Liquid Treasury': 3445000, 'Conservative Projection': 3490000 },
          { name: 'Month 3', 'Liquid Treasury': 3350000, 'Conservative Projection': 3450000 },
          { name: 'Month 4', 'Liquid Treasury': 3254000, 'Conservative Projection': 3420000 },
          { name: 'Month 5', 'Liquid Treasury': 3160000, 'Conservative Projection': 3400000 },
          { name: 'Month 6', 'Liquid Treasury': 3065000, 'Conservative Projection': 3410000 },
        ];
        chartType = 'line';
        suggestions = ["How to optimize this runway?", "Show stablecoin distribution.", "Run scenario: Gas spikes on Ethereum"];
      } else if (lowerMsg.includes('risk') || lowerMsg.includes('safe') || lowerMsg.includes('depeg') || lowerMsg.includes('exposure')) {
        replyText = `### StableMind AI Exposure Safety Report

Our real-time stablecoin health monitor shows your treasury holds **64% USDC**, **22% USDT**, **9% DAI**, and **5% combined EURC/PYUSD**.

* **USDC (Safe)**: Collateral is fully backed by short-term cash & cash equivalents and bills. No action is required.
* **USDT (Safe)**: Holds minor regulatory premium, recommend rebalancing anything above 25% exposure to mitigate offshore smart custody risks.
* **DAI (Low Risk)**: Maker Protocol depeg risks are currently at **0.02%**, indicating strong volatility absorbency.

Let's look at your relative token allocation risk score index:`;
        chartData = [
          { name: 'USDC', 'Allocation %': 64, 'Risk Score': 4 },
          { name: 'USDT', 'Allocation %': 22, 'Risk Score': 18 },
          { name: 'DAI', 'Allocation %': 9, 'Risk Score': 25 },
          { name: 'PYUSD', 'Allocation %': 3, 'Risk Score': 8 },
          { name: 'EURC', 'Allocation %': 2, 'Risk Score': 6 },
        ];
        chartType = 'bar';
        suggestions = ["Optimize stablecoin distributions", "Show live risk alerts", "Generate compliance filing overview"];
      } else if (lowerMsg.includes('payroll') || lowerMsg.includes('salary') || lowerMsg.includes('save')) {
        replyText = `### AI Payroll Routing Analytics

Currently, your payroll disbursements stand at **$61,500/month** distributed across **6 international staff members** (US, Japan, Estonia, Argentina, Ghana, Cyprus).

**AI Agent Optimization Alerts**:
1. **Solana/Base Split Payouts**: 3 on-chain payroll pathways use Mainnet Ethereum, costing roughly **$182 per worker** in contract gas. Moving them to **Base** or **Solana** saves up to **$1,240/month** in gas fees alone.
2. **Auto-salary splitters**: Employees Sofia and Hiroshi currently split 20% of their compensation to USDC/USDT automatically.

Would you like to auto-configure these routing pathways? See the cost savings projection below:`;
        chartData = [
          { name: 'Ethereum-Mainnet', 'Monthly Gas Fees ($)': 1420 },
          { name: 'Solana Network', 'Monthly Gas Fees ($)': 4.2 },
          { name: 'Base L2 rollup', 'Monthly Gas Fees ($)': 12.8 },
          { name: 'Arbitrum', 'Monthly Gas Fees ($)': 35.5 },
        ];
        chartType = 'bar';
        suggestions = ["Configure gas router", "Add new employee wallet", "Generate compliance audit log"];
      } else if (lowerMsg.includes('fraud') || lowerMsg.includes('tornado') || lowerMsg.includes('alert')) {
        replyText = `### Live Fraud & AML Defenses

StableMind compliance bots flagged **1 Critical transaction anomaly**:
* **Source**: An anonymous deposit of **112,000 USDC** (TXN-FLAG-02) on **Arbitrum** has indirect exposure to Tornado Cash routing contract clusters.
* **Confidence level**: 97%.
* **Relevance Status**: Auto-quarantined on sub-custody multi-sig.

Recommendation is to hold these funds in quarantine until an external decentralized KYC/AML audit cert is supplied.`;
        suggestions = ["Mark alert as resolved", "Generate VARA disclosure draft", "Show risk heatmaps"];
      } else {
        replyText = `### Welcome to StableMind AI Assistant

I am your autonomous corporate finance partner. I am currently running in **Sandbox Mode**. You can connect your real **Gemini API Key** in **Settings > Secrets** for live generative deep research.

Currently, I am tracking:
* **Total Treasury Balance**: **$3,540,200**
* **Active multi-chain payroll pipeline**: **$61,500/month**
* **Flagged risk anomalies**: **1 Critical Alert**
* **Supported Stablecoins**: USDC, USDT, DAI, PYUSD, EURC.

Ask me about:
1. *"Predict our cash runway over 6 months"*
2. *"Show stablecoin exposure and depeg risk"*
3. *"How can we optimize international payroll fees?"*
4. *"Show the highest-risk activity"*`;
        suggestions = ["Predict cash runway", "What stablecoin is safest?", "How to optimize payroll?", "Show fraud risks"];
      }

      res.json({
        text: replyText,
        chartData,
        chartType,
        suggestions,
        info: "Running local high-fidelity intelligence model. Set GEMINI_API_KEY in Secrets for live custom LLM queries."
      });
    }, 600);
    return;
  }

  try {
    // Generate actual response using Gemini API
    const systemInstruction = `You are "StableMind AI Analyst", an elite autonomous CFO and on-chain intelligence manager for stablecoin treasuries.
Your tone is hyper-professional, deeply technical, precise (like a Bloomberg Terminal + Stripe's pristine analytics).
You are analyzing a business with:
- Total Treasury: $3,540,200 (64% USDC, 22% USDT, 9% DAI, 3% PYUSD, 2% EURC)
- Chains: Base, Ethereum, Solana, Arbitrum, Polygon
- Total Monthly Payroll burns: $61,500
- Open fraud alerts: 1 Critical (Tornado Cash bridge connection on Arbitrum for $112k)
- Supported coins: USDC, USDT, DAI, PYUSD, EURC.

Respond in clear Markdown. Always provide high-value, actionable alerts, stats, or structural summaries.
If the user asks for charts, forecasting, distribution, or comparisons, include a JSON snippet at the END of your markdown text enclosed in \`\`\`json { "chartData": [...], "chartType": "bar" | "line" | "pie", "suggestions": [...] } \`\`\` so the interface can render beautiful visual Recharts alongside. 
Only output valid JSON in that block. Keep keys simple, numbers as raw floats or integers. Do not write text() methods.`;

    // Construct simple history from user interaction arrays for conversational continuity
    const formattedHistory = Array.isArray(history) 
      ? history.slice(-6).map((h: any) => `${h.role === 'user' ? 'User' : 'Assistant'}: ${h.text}`).join('\n')
      : '';

    const prompt = `${formattedHistory}\nContext Status: ${JSON.stringify(context || {})}\nUser Prompt: ${message}`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.2,
      },
    });

    const fullText = response.text || '';
    
    // Parse the JSON block out if it exists
    let cleanText = fullText;
    let chartData: any[] | undefined = undefined;
    let chartType: 'bar' | 'line' | 'pie' | undefined = undefined;
    let suggestions: string[] = ["Show cash runway", "List highest risk wallets", "Optimize stablecoin fees"];

    const jsonMatch = RegExp(/```json\s*(\{[\s\S]*?\})\s*```/).exec(fullText);
    if (jsonMatch && jsonMatch[1]) {
      try {
        const parsedNode = JSON.parse(jsonMatch[1]);
        chartData = parsedNode.chartData;
        chartType = parsedNode.chartType;
        if (parsedNode.suggestions) {
          suggestions = parsedNode.suggestions;
        }
        cleanText = fullText.replace(/```json\s*\{[\s\S]*?\}\s*```/, '').trim();
      } catch (e) {
        // Failed to parse, ignore structure
      }
    }

    res.json({
      text: cleanText,
      chartData,
      chartType,
      suggestions,
      info: "Powered by Gemini 3.5 Flash server-side text models"
    });

  } catch (error: any) {
    console.error("Gemini server-side error: ", error);
    res.status(500).json({
      error: error?.message || "Internal server error connecting to on-chain Gemini engine."
    });
  }
});

// 2. Mock Compliance PDF Download Trigger (Enterprise status)
app.post('/api/compliance/download', (req: Request, res: Response) => {
  const { reportId, reportName } = req.body;
  res.json({
    success: true,
    downloadUrl: `https://ipfs.io/ipfs/QmStableMindComplianceMockInvoiceArchiveHash/${reportId}`,
    message: `Generated notarized compliance backup for "${reportName}" on SHA-256 on-chain merkle registry.`
  });
});

// Serve Vite dev asset pipeline and handle fallback in standard layout mode
async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`StableMind AI Platform running on http://localhost:${PORT}`);
  });
}

start();
