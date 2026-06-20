export interface Pillar {
  id: number;
  title: string;
  subtitle: string;
  desc: string;
  longDesc?: string;
  icon: string;
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  gpa?: string;
  details?: string;
  thesis?: string;
  courses?: string[];
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  achievements: string[];
}

export interface Project_Item {
  name: string;
  type: string;
  tech: string[];
  desc: string;
  contract?: string;
  link?: string;
}

export const YANG_DATA = {
  name: "Fan Yang",
  title: "Seasoned Enterprise Lead & AI Innovator",
  description: "IT architect with 17 years of industry pedigree, blending high-availability enterprise backend operations with advanced machine learning research at the University of Auckland.",
  experience_years: 17,
  email: "yangfan6262008@gmail.com",
  phone: "+86 159 0408 2220",
  github: "https://github.com/LBJyang",
  location: "Auckland, New Zealand",
  avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400", // Representative high-quality avatar matching sleek style
  
  trustBadges: [
    { label: "PTE Academic 82 (IELTS 8.0/C2)", category: "eng" },
    { label: "PMP Certified PM", category: "management" },
    { label: "AWS Solutions Architect", category: "cloud" },
    { label: "AWS Machine Learning Specialist", category: "ai" }
  ],

  pillars: [
    {
      id: 1,
      title: "Local AI Research",
      subtitle: "UoA Master of AI",
      desc: "Currently undertaking high-caliber Master of Artificial Intelligence research at the University of Auckland. Fusing academic theories (deep learning, sequence models, embeddings) with industry production parameters.",
      icon: "graduation-cap"
    },
    {
      id: 2,
      title: "16-Year Enterprise Pedigree",
      subtitle: "5y Java Dev + 11y PM/BA",
      desc: "Delivered multiple province-scale mission-critical distributed structures serving over 30 Million customers at China Mobile. Specializes in sub-second latency, robust redundancy, and scale-up architectures.",
      icon: "network"
    },
    {
      id: 3,
      title: "Validated AI/ML Competitions",
      subtitle: "Kaggle Winner & Audio DSP",
      desc: "Featured in Kaggle's global Gemma 4 Good Hackathon with an end-to-end LLM fine-tuning weights adjustment writeup. Deployed advanced environmental audio monitoring with YAMNet transfer learning.",
      icon: "trophy"
    },
    {
      id: 4,
      title: "Web3 & Blockchain Engineering",
      subtitle: "Ethereum Sepolia Deployed",
      desc: "Independently compiled, tested and launched a completely on-chain pension reserve ledger. Core on-chain asset rescue specialist in the Cosmos space, and developer tutor at WTF Academy.",
      icon: "coins"
    },
    {
      id: 5,
      title: "Flawless Execution",
      subtitle: "AWS Specialties & PMP Lead",
      desc: "Mitigates delivery threats using certified PMBOK disciplines. Maximizes cloud-native throughput utilizing double AWS certifications and outstanding English communication (IELTS 8.0 level).",
      icon: "shield-check"
    }
  ] as Pillar[],

  experience: [
    {
      role: "Senior Business Manager ➔ Product Manager ➔ Project Manager",
      company: "China Mobile Communications Group Liaoning Co., Ltd.",
      period: "2010 - Feb 2027 (17 years)",
      achievements: [
        "Led the systems architectural blueprinting and release workflows of province-scale billing registries and core CRM pipelines serving over 30 Million users.",
        "Negotiated, scoped, and closed a massive 120 Million CNY (NZD $27 Million) strategic cloud infrastructure contract alongside Lenovo Group in 2021.",
        "Maintained hand-on microservice development, deploying high-volume Java Spring Web Service structures with containerized Docker cluster management.",
        "Assurance lead for latency-critical distributed components, establishing 99.999% high-availability uptimes for governmental mobile platform nodes."
      ]
    },
    {
      role: "Core Web3 Security Engineer & Educator",
      company: "CosmosRescue & WTF Academy (Open Source)",
      period: "2022 - Present",
      achievements: [
        "Wrote and executed customized on-chain asset recovery scripts, securing over dozens of compromised user cold-wallets against malicious mining bots and frontrunners.",
        "Authored advanced courses for WTF Academy, writing the widely-recognized 'Frontrunning & MEV' lesson downloaded thousands of times across the GitHub WTF-Ethers repository.",
        "A recognized expert in Ethereum Sepolia and mainnet transactions analysis, Solidity security, and cross-chain security."
      ]
    }
  ] as Experience[],

  education: [
    {
      degree: "Master of Artificial Intelligence",
      institution: "The University of Auckland (UoA), New Zealand",
      period: "Mar 2027 - Dec 2027",
      details: "Top Auckland AI program focusing on neural networks, advanced natural language parsing, and vector search systems.",
      thesis: "Targeted research in industrial LLM customization, contextual alignment, and local ecosystem AI integrations."
    },
    {
      degree: "Master of Engineering in Software Engineering",
      institution: "Beijing University of Posts and Telecommunications",
      period: "2008 - 2010",
      gpa: "GPA: 3.52 / 4.0",
      thesis: "Design and Implementation of Real-time Monitoring Platform for China Mobile Mobile Platform Network",
      courses: ["Java Systems", "SOA Architecture", "Advanced Calculus", "Algorithm Complexities", "Relational Database Design"]
    },
    {
      degree: "Bachelor of Science in Mathematics and Applied Mathematics",
      institution: "Beijing University of Posts and Telecommunications",
      period: "2004 - 2008",
      gpa: "GPA: 3.38 / 4.0",
      details: "Deep mathematical training covering optimization theories, algebraic abstractions, probability modeling, and cryptographic math foundations.",
      courses: ["Probability Theory", "Functional Analysis", "Advanced Algebra", "Cryptography Principles", "Linear Optimization"]
    }
  ] as Education[],

  projects: [
    {
      name: "Decentralized Pension Fund System",
      type: "DeFi / Smart Contract Architecture",
      tech: ["Solidity", "Foundry", "Ethers.js", "EIP-712"],
      desc: "A fully functional, time-locked, multi-signature on-chain custody ledger deployed directly on Sepolia. Eliminates third-party custody risks and enforces EIP-712 off-chain approvals.",
      contract: "0xcDA643aAd5ED482A4958B370a2Bf142a173Efe3d"
    },
    {
      name: "Gemma 4 Good Hackathon LLM Writeup",
      type: "GenAI Fine-Tuning & Application",
      tech: ["Gemma LLM", "LoRA", "Hugging Face", "Python"],
      desc: "Created highly targeted prompts and model fine-tunings targeting community impact. Recipient of featured recognition inside kaggle writeup directory.",
      link: "https://www.kaggle.com/competitions/gemma-4-good-hackathon/writeups/new-writeup-1776779281928"
    },
    {
      name: "YAMNet Audio Scene Classifier",
      type: "Deep Learning (Acoustic Scene)",
      tech: ["TensorFlow", "YAMNet", "Transfer Learning", "DSP"],
      desc: "Built a customized audio classification model. Performed audio digital signal processing (DSP) to isolate frequencies, then deployed transfer-trained YAMNet models for smart monitoring."
    }
  ] as Project_Item[]
};
