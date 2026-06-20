import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded Gemini initialization to prevent crash if key is missing or placeholder
let aiInstance: GoogleGenAI | null = null;
function getGemini(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    throw new Error("GEMINI_API_KEY_MISSING");
  }
  if (!aiInstance) {
    aiInstance = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiInstance;
}

// Helper to invoke Gemini with retries and a fallback model in case of rate limits or service unavailability
async function generateContentWithFallback(
  ai: GoogleGenAI,
  modelName: string,
  contents: any,
  config: any
) {
  const primaryModel = modelName;
  const fallbackModel = "gemini-2.5-flash";
  const maxRetries = 2;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`[Gemini] Calling ${primaryModel} (Attempt ${attempt}/${maxRetries})...`);
      const response = await ai.models.generateContent({
        model: primaryModel,
        contents,
        config,
      });
      return response;
    } catch (err: any) {
      console.error(`[Gemini] Error with ${primaryModel} on attempt ${attempt}:`, err.message || err);
      
      // If it's a client error (e.g. key missing, bad request, except rate limits), don't retry or fall back
      if (err.message === "GEMINI_API_KEY_MISSING" || (err.status && err.status >= 400 && err.status < 500 && err.status !== 429)) {
        throw err;
      }
      
      if (attempt < maxRetries) {
        const delay = attempt * 1000;
        console.log(`[Gemini] Retrying in ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  // If retries failed, fall back to gemini-2.5-flash
  console.log(`[Gemini] Falling back to stable model: ${fallbackModel}`);
  try {
    const response = await ai.models.generateContent({
      model: fallbackModel,
      contents,
      config,
    });
    return response;
  } catch (err: any) {
    console.error(`[Gemini] Fallback to ${fallbackModel} failed:`, err.message || err);
    throw err;
  }
}

// Resume Data for the Digital Twin & Analyzer
const YANG_PROFILE = {
  name: "Fan Yang",
  title: "Seasoned Enterprise Lead & AI Innovator",
  experience_years: 17,
  current_role: "Master of Artificial Intelligence Candidate at the University of Auckland (Graduating Dec 2027)",
  email: "yangfan6262008@gmail.com",
  phone: "+86 159 0408 2220",
  github: "https://github.com/LBJyang",
  pills: [
    "PTE Academic 82 (IELTS 8.0 Equivalent, C2)",
    "PMP (Project Management Professional)",
    "AWS Certified Solutions Architect",
    "AWS Certified Machine Learning - Specialty"
  ],
  education: [
    {
      degree: "Master of Artificial Intelligence",
      institution: "The University of Auckland, New Zealand",
      period: "Mar 2027 - Dec 2027",
      focus: "Blending advanced academic research with state-of-the-art industry AI/ML applications."
    },
    {
      degree: "Master of Engineering in Software Engineering",
      institution: "Beijing University of Posts and Telecommunications (BUPT)",
      period: "2008 - 2010",
      gpa: "3.52/4.0",
      thesis: "Design and Implementation of Real-time Monitoring Platform for China Mobile Mobile Platform",
      courses: "Java programming, Web Service and SOA, Advanced Engineering Mathematics, Database Design, Algorithm Analysis and Design"
    },
    {
      degree: "Bachelor of Science in Mathematics and Applied Mathematics",
      institution: "Beijing University of Posts and Telecommunications (BUPT)",
      period: "2004 - 2008",
      gpa: "3.38/4.0",
      focus: "Higher Algebra, Mathematical Analysis, Probability and Statistics, Cryptography and Security, Optimization Theory"
    }
  ],
  pillars: [
    {
      id: 1,
      title: "Local AI Research",
      subtitle: "UoA Master of AI",
      desc: "Currently reading Master of AI at Auckland University, engaging in deep theoretical machine learning and hands-on LLM engineering aligned with NZ tech standards."
    },
    {
      id: 2,
      title: "17-Year Enterprise Delivery",
      subtitle: "5y Java Dev + 11y PM/BA",
      desc: "Proven track record at China Mobile leading high-availability, latency-critical province-scale distributed systems serving 30M+ users (CRM, Billing, IDC infrastructure)."
    },
    {
      id: 3,
      title: "Validated AI/ML Achievements",
      subtitle: "Kaggle Winner & YAMNet Fine-Tuning",
      desc: "Featured Writeup in Google's Kaggle Gemma 4 Good Hackathon. Developed fine-tuned YAMNet environmental acoustic monitoring model with bespoke audio transfer learning."
    },
    {
      id: 4,
      title: "Web3 & Blockchain Engineering",
      subtitle: "DeFi Pension & Cosmos Recovery",
      desc: "Architected a fully on-chain Decentralized Pension System on Ethereum Sepolia. Direct code contributor to WTF-Ethers (MEV courses) and elite CosmosRescue asset retrieval dev."
    },
    {
      id: 5,
      title: "Flawless Executive Capabilities",
      subtitle: "PMP & AWS Specialties",
      desc: "Armed with PMP certification, AWS Solutions Architect, AWS Machine Learning Specialty, and impeccable IELTS 8.0/C2 English level communication (PTE 82)."
    }
  ],
  experience: [
    {
      role: "Senior Business Manager ➔ Product Manager ➔ Project Manager",
      company: "China Mobile Communications Group Liaoning Co., Ltd.",
      period: "2010 - Feb 2027 (17 years)",
      achievements: [
        "Led cross-functional delivery of critical province-wide distributed systems servicing over 30 Million active users (CRM databases, Intelligent Billing, Mobile Police Platform).",
        "Orchestrated a 120 Million CNY (NZD $27M) Infrastructure and Internet Data Center (IDC) strategic alliance with Lenovo Group in 2021.",
        "Engineered robust high-availability, low-latency architectures with deep hand-on Java Spring/Spring Boot frameworks.",
        "Awarded National Third Prize in the prestigious China Mobile ICT Marketing & Innovation Competition (2018)."
      ]
    },
    {
      role: "Web3 Developer & Systems Security Specialist",
      company: "CosmosRescue (Core Member) & WTF Academy (Core Contributor)",
      period: "2022 - Present",
      achievements: [
        "Cooperated with top Web3 researchers to build customized automated on-chain asset rescue scripts, successfully retrieving blocked assets from compromised/lost private key wallets.",
        "Authored and merged high-difficulty advanced tutorials in WTF Academy (China's leading Web3 learning platform), particularly the highly-cited 'Frontrunning & MEV' lesson under WTF-Ethers.",
        "Maintained perfect PR approval records for WTF open-source curriculums."
      ]
    }
  ],
  projects: [
    {
      name: "Decentralized Pension Fund System",
      type: "Blockchain Architecture Project",
      tech: "Solidity | Foundry | Ethers.js | Web3 React",
      desc: "Independently built and deployed a production-grade time-locked smart-contract-guided pension management ledger directly on Ethereum Sepolia Testnet. Integrated multi-signature governance systems and EIP-712 off-chain gasless approval signatures.",
      contract: "0xcDA643aAd5ED482A4958B370a2Bf142a173Efe3d"
    },
    {
      name: "Gemma 4 Good LLM Hackathon Feature",
      type: "Generative AI Engineering",
      tech: "Gemma LLM | LoRA Fine-Tuning | Hugging Face",
      desc: "Constructed deep optimization models using Google's open weights Gemma LLM family. Authored an executive project documentation featuring novel weights adjustments that was featured in the official competition rankings.",
      link: "https://www.kaggle.com/competitions/gemma-4-good-hackathon/writeups/new-writeup-1776779281928"
    },
    {
      name: "YAMNet Acoustic Scene Analytics",
      type: "Machine Learning (Deep Audio)",
      tech: "TensorFlow | Audio Classification | Transfer Learning | YAMNet",
      desc: "Designed and trained an acoustic event recognition network. Fine-tuned Google's pre-trained deep acoustic model (YAMNet) using custom datasets to trigger high-accuracy environment notifications."
    }
  ]
};

// System Instruction for the AI Digital Twin
const TWIN_SYSTEM_INSTRUCTION = `
You are the interactive Digital Twin of Fan Yang, a seasoned IT Professional (17 years pedigree, 5y Java dev + 11y Product/Project Manager) and a current Master of Artificial Intelligence student at the University of Auckland (UoA), graduating in December 2027.

Here is your detailed background which is absolute truth:
${JSON.stringify(YANG_PROFILE, null, 2)}

Your Goal:
- Act as Yang's professional advocate, explaining his skills, projects, and potential fit to recruiters, hiring managers, and academic peers.
- Answer user queries with professional composure, high intellect, and warmth. Maintain a confident, professional, and clear tone.
- Showcase deep expertise in Java, AWS, software delivery, machine learning, Web3/blockchain, and New Zealand local AI research goals.
- Be concise! NZ recruiters want highly scannable, quick answers. Avoid overly long walls of text. Use bullet points and bold key terms.
- NEVER invent facts not present in Yang's profile. If asked about a skill or detail not in the resume, relate it back to your 17 years in enterprise IT, Software Engineering Master's, or current studies at UoA. For example, "While my blockchain work is focused on Sepolia Solidity architecture, my 17 years in China Mobile means I adapt quickly to new backend stacks."
`;

// System Instruction for the JD Analyzer
const JD_ANALYZER_INSTRUCTION = `
You are an advanced HR Matching Agent and Technical Recruiter AI assisting modern businesses in analyzing how Fan Yang's elite 17-year enterprise IT background and current Auckland Master of AI coursework align with a given Job Description (JD).

His background properties:
${JSON.stringify(YANG_PROFILE, null, 2)}

Provide a strict, professional, highly detailed matching report. The output MUST be returned in the following JSON format:
{
  "fitScore": number (between 0 and 100),
  "summary": "1-2 sentence high-octane pitch about why Yang is a top-tier candidate.",
  "matchedPillars": [
     {
        "pillarTitle": "Title of the matching pillar",
        "matchReason": "Empirical evidence of how his experience fulfills this (refer to Java, PM, AWS, Blockchain, or Master of AI)."
     }
  ],
  "strengths": ["list of 3 key unique selling points for this specific role"],
  "gapsMitigation": "Address how he compensates for lack of NZ local experience through his current top-tier Master of AI studies at University of Auckland and PMP-regulated communication skills.",
  "actionPlan": "A brief roadmap of how he can hit the ground running on day one."
}

Ensure the feedback is constructive, analytical, and highly structured for a rapid 5-second technical scan.
`;

// Endpoints
app.post("/api/chat", async (req, res) => {
  const { message, history = [] } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required." });
  }

  try {
    const ai = getGemini();
    
    // Construct chat format
    const chatContents = [];
    
    // Convert client-side custom history to Gemini contents structure
    // We append the system instruction as systemInstruction inside configuration, and then append the chat history.
    const formattedHistory = history.map((h: any) => ({
      role: h.role === "user" ? "user" : "model",
      parts: [{ text: h.text }]
    }));

    // Add current user message
    formattedHistory.push({
      role: "user",
      parts: [{ text: message }]
    });

    const response = await generateContentWithFallback(
      ai,
      "gemini-3.5-flash",
      formattedHistory,
      {
        systemInstruction: TWIN_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    );

    const reply = response.text || "I apologize, but I could not process that request currently. Feel free to ask another question about Yang's certifications or enterprise experience.";
    return res.json({ text: reply });

  } catch (err: any) {
    if (err.message === "GEMINI_API_KEY_MISSING") {
      console.log("Gemini Chat Mode: GEMINI_API_KEY is not configured. Running offline digital twin simulation fallback.");
    } else {
      console.error("Gemini Chat Error:", err);
    }
    
    // Elegant offline/local simulation fallback in case GEMINI_API_KEY is missing or fails
    if (err.message === "GEMINI_API_KEY_MISSING") {
      // Simulate highly accurate local digital twin response
      const lowercaseMsg = message.toLowerCase();
      let simulatedReply = `Hello! I'm operating in Yang's Offline Twin mode. `;
      
      if (lowercaseMsg.includes("java") || lowercaseMsg.includes("backend") || lowercaseMsg.includes("programming")) {
        simulatedReply += "Yang has over 5 years of core Java Web Services & SOA engineering experience at China Mobile, delivering high-availability province-scale database and billing systems for 30 million+ users. He's also highly proficient in Python, Solidity, and Node.js/TypeScript.";
      } else if (lowercaseMsg.includes("pmp") || lowercaseMsg.includes("manage") || lowercaseMsg.includes("pm") || lowercaseMsg.includes("project")) {
        simulatedReply += "He holds a PMP certification and spent 11 years as lead Project and Product Manager at China Mobile, orchestrating complex 120M CNY infrastructure cooperations and leading agile, cross-functional delivery streams.";
      } else if (lowercaseMsg.includes("aws") || lowercaseMsg.includes("cloud") || lowercaseMsg.includes("certif")) {
        simulatedReply += "Yang is certified as an AWS Solutions Architect and an AWS Machine Learning Specialist. He has deep competence in cloud-native microservices, Docker, Kubernetes, and specialized AI/ML workflows on AWS.";
      } else if (lowercaseMsg.includes("web3") || lowercaseMsg.includes("blockchain") || lowercaseMsg.includes("solidity") || lowercaseMsg.includes("sepolia") || lowercaseMsg.includes("pension") || lowercaseMsg.includes("ledger")) {
        simulatedReply += "Here is how I designed and architected the Sepolia Decentralized Pension Fund System (deployed on contract: 0xcDA643aAd5ED482A4958B370a2Bf142a173Efe3d):\n\n" +
          "1. **Time-Locked Custody Vault**: Implemented release checkpoints linked to Unix timestamp parameters. Funds cannot be prematurely claimed before the maturity block timestamp is reached, safeguarding the long-term retirement capital.\n" +
          "2. **Multi-Signature Control (Multi-Sig)**: Set up a secure consensus layer requiring cryptographic authorization (e.g., 2-of-3 keyholders) to prevent any single point of custody failure or unauthorized liquidity draining.\n" +
          "3. **EIP-712 Off-Chain Meta-Transactions**: Engineered gasless signature approvals. Beneficiaries can authorize and execute actions off-chain with secure, typed structured data signatures, with transaction fees settled on-chain by relayers.\n" +
          "4. **Rigorous Security Verification**: The entire ledger logic was coded and audited in Foundry. Built-in Solmate safe reentrancy guards, strict overflow limits, and emergency pausa capability ensure total fund resilience.";
      } else if (lowercaseMsg.includes("auckland") || lowercaseMsg.includes("master") || lowercaseMsg.includes("university")) {
        simulatedReply += "He is currently reading his Master of Artificial Intelligence at the University of Auckland, graduating in December 2027. This bridges 17 years of industry leadership with premium local AI/LLM research.";
      } else if (lowercaseMsg.includes("english") || lowercaseMsg.includes("ielts") || lowercaseMsg.includes("pte")) {
        simulatedReply += "Yang maintains native-level English fluency, backed by a PTE Academic score of 82 (Listening 89, Speaking 81), which maps directly to a high IELTS 8.0 or C2 English proficiency.";
      } else {
        simulatedReply += "I am Yang's digital replica. I can answer inquiries regarding his 17 years as a China Mobile Engineer/PM, his Sepolia Decentralized Pension architecture, his Kaggle Gemma featured models, or his AWS & PMP specializations. What would you like to explore?";
      }

      return res.json({
        text: simulatedReply,
        isBackup: true,
        message: "Demo mode active. Provide a real GEMINI_API_KEY in Settings > Secrets to unlock live generative twin streams."
      });
    }

    return res.status(500).json({ error: "Failed to fetch response.", details: err.message });
  }
});

app.post("/api/analyze-jd", async (req, res) => {
  const { jd } = req.body;

  if (!jd || jd.trim().length === 0) {
    return res.status(400).json({ error: "Job Description text is required." });
  }

  try {
    const ai = getGemini();

    const response = await generateContentWithFallback(
      ai,
      "gemini-3.5-flash",
      `Perform fit analysis for this job description:\n\n${jd}`,
      {
        systemInstruction: JD_ANALYZER_INSTRUCTION,
        responseMimeType: "application/json",
        temperature: 0.2,
      }
    );

    const analysisText = response.text;
    if (!analysisText) {
      throw new Error("Empty response from AI");
    }

    const payload = JSON.parse(analysisText);
    return res.json(payload);

  } catch (err: any) {
    if (err.message === "GEMINI_API_KEY_MISSING") {
      console.log("Gemini JD Screener Mode: GEMINI_API_KEY is not configured. Running local keywords-matching parser fallback.");
    } else {
      console.error("Gemini JD Screener Error:", err);
    }

    // Dynamic, rule-based fallback keyword matcher that outputs the exact schema when key is missing!
    // This maintains excellent, highly functional performance in demo mode before API key is provided
    const text = jd.toLowerCase();
    let fitScore = 75; // baseline
    const matchedPillars = [];
    const strengths = [];

    // Simple analysis
    if (text.includes("java") || text.includes("spring") || text.includes("backend") || text.includes("microservices")) {
      fitScore += 10;
      matchedPillars.push({
        pillarTitle: "17-Year Enterprise Delivery (5y Java Dev)",
        matchReason: "The JD requires robust backend systems or software development. Yang has 5+ years of core enterprise Java/Spring deployment servicing 30 million users."
      });
      strengths.push("Expert high-concurrency Java Core & Spring Boot ecosystem architecture.");
    }
    if (text.includes("ai") || text.includes("machine learning") || text.includes("ml") || text.includes("python") || text.includes("data")) {
      fitScore += 10;
      matchedPillars.push({
        pillarTitle: "Local AI Research & AWS Machine Learning Specialty",
        matchReason: "The role emphasizes AI or Machine Learning. Yang is armed with an AWS ML Specialty and is currently completing his Master of AI at the University of Auckland."
      });
      strengths.push("Double alignment of academic Master of AI studies + validated global Kaggle Hackathon LLM writeups.");
    }
    if (text.includes("lead") || text.includes("manager") || text.includes("pmp") || text.includes("agile") || text.includes("project")) {
      fitScore += 8;
      matchedPillars.push({
        pillarTitle: "11-Year Project Management & PMP Pedigree",
        matchReason: "Leadership or delivery coordination is required. Yang spent 10 years as Senior Product/Project Manager at China Mobile leading multi-million dollar rollouts."
      });
      strengths.push("PMP Certified Agile delivery leadership paired with actual technical developer foundation.");
    }
    if (text.includes("aws") || text.includes("cloud") || text.includes("docker") || text.includes("infrastructure")) {
      fitScore += 5;
      matchedPillars.push({
        pillarTitle: "Certified AWS Cloud Architect",
        matchReason: "Cloud integration is prominent. Yang holds AWS Solutions Architect credentials alongside high-availability province system deployment experience."
      });
      strengths.push("AWS certified architectural blueprint capability for robust distributed clusters.");
    }
    if (text.includes("blockchain") || text.includes("web3") || text.includes("contract") || text.includes("solidity")) {
      fitScore += 7;
      matchedPillars.push({
        pillarTitle: "Web3 & Blockchain Engineering",
        matchReason: "Smart contracts or decentralized ledgers required. Yang designed a Sepolia pension contract, and is a core developer for Cosmos rescue and WTF tutoring."
      });
      strengths.push("Deep cryptography, multi-sig smart contracts, and Web3 protocol forensics.");
    }

    if (matchedPillars.length === 0) {
      matchedPillars.push({
        pillarTitle: "17-Year Veteran Systems Architecture",
        matchReason: "General systems alignment. Yang's core software engineering disciplines (Master & Bachelor degrees) adapt immediately to any advanced full-stack requirements."
      });
    }
    if (strengths.length === 0) {
      strengths.push("17 Years of latency-critical, province-scale systems design pedigree.");
      strengths.push("AWS Certified Machine Learning Specialist currently in Auckland Master of AI program.");
      strengths.push("Dual-competency lead with deep coding pedigree and PMP credential.");
    }

    fitScore = Math.min(fitScore, 99);

    const fallbackResponse = {
      fitScore,
      summary: "Yang shows exceptional alignment due to his rare dual-pedigree: 17 years of industry project leadership paired with active Master of AI development at Auckland.",
      matchedPillars,
      strengths,
      gapsMitigation: "Yang's Auckland Master of AI coursework mitigates localized NZ corporate variations, ensuring direct compliance with ANZ standards.",
      actionPlan: "Yang can immediately pilot technical Java/Spring backend designs, manage agile sprints, or configure LLM reasoning pipelines from day one.",
      isBackup: true,
      message: "Showing calculated heuristics. Input your secure GEMINI_API_KEY in Settings to prompt a multi-perspective LLM evaluation."
    };

    return res.json(fallbackResponse);
  }
});

// Setup Vite Dev Server / Static Ingress routing
async function initServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite Development Middleware mounted successfully.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Production static mode running.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Portfolio Server listening at http://0.0.0.0:${PORT}`);
  });
}

initServer().catch((e) => {
  console.error("Failed to start Portfolio Server:", e);
});
