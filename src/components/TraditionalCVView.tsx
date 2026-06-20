import React, { useState } from "react";
import { 
  Printer, 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Briefcase, 
  GraduationCap, 
  Check, 
  Copy,
  Brain,
  Award
} from "lucide-react";
import { YANG_DATA } from "../data";

interface TraditionalCVViewProps {
  onBack: () => void;
}

export default function TraditionalCVView({ onBack }: TraditionalCVViewProps) {
  const [copiedText, setCopiedText] = useState("");

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(""), 2000);
  };

  const triggerPrint = () => {
    window.print();
  };

  return (
    <div id="traditional-cv-root" className="max-w-4xl mx-auto px-4 py-8 relative space-y-6 print:py-0 print:px-0">
      
      {/* 1. Unprinted Recruiter Action Bar */}
      <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 print:hidden">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <button 
              onClick={onBack}
              className="text-xs font-bold text-blue-400 hover:text-white flex items-center gap-1 bg-zinc-950/60 border border-zinc-800 px-3 py-1.5 rounded-lg transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Interactive Portfolio</span>
            </button>
            <span className="text-[10px] font-mono bg-zinc-950 text-emerald-400 border border-zinc-800 px-2 py-1 rounded font-semibold">
              NZ standard (A4 Print-Ready PDF)
            </span>
          </div>
          <p className="text-[11px] text-zinc-400">
            This workspace generates a clean, conventional, corporate CV formatted to popular New Zealand hiring norms.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-center">
          <button 
            onClick={triggerPrint}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg flex items-center gap-2 transition-all shadow-lg shadow-blue-900/20 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print to PDF / Paper</span>
          </button>
        </div>
      </div>

      <div className="bg-zinc-900/45 border border-zinc-800/60 rounded-xl p-3 text-center text-[10px] text-zinc-400 flex items-center justify-center gap-1.5 print:hidden">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
        </span>
        <span>
          <strong>Recruiter Tip:</strong> You can download this custom CV as a standard PDF document by clicking <strong>&quot;Print to PDF&quot;</strong> and choosing <strong>Save as PDF</strong> as your target printer.
        </span>
      </div>

      {/* 2. Traditional CV Paper Sheet */}
      <div 
        id="cv-paper-container"
        className="bg-white text-zinc-900 p-8 md:p-12 rounded-xl shadow-2xl border border-zinc-200/80 max-w-[850px] mx-auto space-y-7 font-sans print:shadow-none print:border-none print:p-0 print:max-w-none print:bg-white print:text-black"
      >
        {/* CV Header: Name, Contact Grid */}
        <div className="border-b-[3px] border-zinc-900 pb-5 text-center space-y-3.5">
          <div className="space-y-1">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-950 uppercase print:text-black print:text-3.5xl">
              {YANG_DATA.name}
            </h1>
            <p className="text-xs md:text-[13px] font-bold text-zinc-650 tracking-wider uppercase print:text-zinc-800">
              Senior Solutions Architect &amp; AI Engineer | 16-Year Enterprise Delivery Pedigree
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-zinc-600 font-mono print:text-zinc-700">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-zinc-500 print:text-black" />
              <span>{YANG_DATA.location}</span>
            </span>

            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-zinc-500 print:text-black" />
              <span className="underline select-all">{YANG_DATA.email}</span>
              <button 
                onClick={() => handleCopy(YANG_DATA.email, "email")}
                className="p-0.5 text-zinc-400 hover:text-zinc-850 print:hidden transition-colors cursor-pointer"
                title="Copy email"
              >
                {copiedText === "email" ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
              </button>
            </span>

            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-zinc-500 print:text-black" />
              <span className="select-all">{YANG_DATA.phone}</span>
              <button 
                onClick={() => handleCopy(YANG_DATA.phone, "phone")}
                className="p-0.5 text-zinc-400 hover:text-zinc-850 print:hidden transition-colors cursor-pointer"
                title="Copy phone"
              >
                {copiedText === "phone" ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
              </button>
            </span>

            <span className="flex items-center gap-1.5">
              <Github className="w-3.5 h-3.5 text-zinc-500 print:text-black" />
              <a href={YANG_DATA.github} target="_blank" rel="noreferrer" className="hover:underline">
                github.com/LBJyang
              </a>
            </span>
          </div>
        </div>

        {/* 1. PROFESSIONAL EXECUTIVE SUMMARY */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 border-b-2 border-zinc-200 pb-1 flex items-center justify-between">
            <span>Professional Profile</span>
            <span className="text-[10px] text-zinc-500 font-mono tracking-normal capitalize font-normal print:hidden">Enterprise Delivery Lead</span>
          </h2>
          <p className="text-xs text-zinc-700 leading-relaxed text-justify print:text-zinc-900">
            A highly disciplined and results-driven <strong>Senior Solutions Architect</strong> and <strong>AI Engineer</strong> combining a foundational 5-year hands-on Java engineering background with 11 subsequent years of Senior Project &amp; Product Management. Expert at conceptualising, framing, and scaling high-availability distributed business systems, demonstrated through the delivery of province-scale cellular CRM registries and financial networks servicing over <strong>30 Million subscribers</strong> at China Mobile. Currently pursuing a Master of Artificial Intelligence at <strong>The University of Auckland</strong> (MAI, March 2027 – December 2027), aiming to deliver reliable ML/LLM pipelines, containerised microservices, and hybrid cloud structures. Recognized for aligning technological capabilities with strategic business constraints to drive enterprise value.
          </p>
        </div>

        {/* 2. CHRONOLOGICAL WORK EXPERIENCE */}
        <div className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 border-b-2 border-zinc-200 pb-1 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-zinc-800 print:text-black" />
            <span>Professional Career History</span>
          </h2>

          <div className="space-y-5">
            {/* China Mobile Job */}
            <div className="space-y-1.5">
              <div className="flex flex-col md:flex-row md:items-center justify-between text-xs font-bold text-zinc-900">
                <span className="text-sm font-extrabold text-zinc-950">
                  China Mobile Communications Group Liaoning Co., Ltd.
                </span>
                <span className="text-zinc-650 font-mono text-[11px] uppercase tracking-wider mt-0.5 md:mt-0 print:text-zinc-800">
                  2010 - Feb 2027 (17 years)
                </span>
              </div>
              <div className="flex justify-between items-center text-xs text-zinc-600">
                <span className="italic font-medium text-zinc-700">Senior Business Manager ➔ Product Manager ➔ Project Manager</span>
                <span className="text-[10px] bg-zinc-100 border border-zinc-250 px-2 py-0.5 rounded text-zinc-700 font-semibold print:border-zinc-300 print:bg-white">Liaoning, China</span>
              </div>
              <p className="text-[11px] text-zinc-700 leading-relaxed text-justify">
                Promoted through progressive product, analysis, and architecture roles to manage multi-million CNY system upgrades, supervising agile cross-functional delivery streams and backend system integrations.
              </p>
              <ul className="list-disc list-outside pl-4 space-y-1.5 text-[11px] text-zinc-650 leading-relaxed print:text-zinc-800">
                <li>
                  <strong>Province-Scale System Scaling</strong>: Directed business requirement blueprints and end-to-end integration architecture for Cellular CRM, core billing registries, and subscription portals serving <strong>30M+ active subscribers</strong>.
                </li>
                <li>
                  <strong>Lenovo Strategic Alliance (CNY 120M)</strong>: Successfully orchestrated and closed a high-impact strategic contract with Lenovo Group in 2021 valuable at <strong>CNY 120 Million (approx. NZD $27 Million)</strong> for core Intelligent Data Center (IDC) infrastructure scaling.
                </li>
                <li>
                  <strong>Java Technical Foundation</strong>: Managed software quality assurance and initial development guidelines relying on 5 years of early hands-on Java engineering, defining database schema rules (Oracle/MySQL) and RESTful Web Service APIs.
                </li>
                <li>
                  <strong>Risk Control &amp; Disaster Recovery</strong>: Designed and deployed contingency rules and high-availability server redundancy structures, achieving continuous system uptime during high-concurrency peak telecom events.
                </li>
                <li>
                  <strong>Cross-Functional Agile Leadership</strong>: Applied certified Scrum and PMP frameworks to guide cross-functional teams (20+ engineers, product owners, and stakeholders), ensuring timely sprint outcomes.
                </li>
              </ul>
            </div>

            {/* Smart Contract Independent developer */}
            <div className="space-y-1.5 pt-1.5 border-t border-dashed border-zinc-200">
              <div className="flex flex-col md:flex-row md:items-center justify-between text-xs font-bold text-zinc-900">
                <span className="text-sm font-extrabold text-zinc-950">
                  Web3 Smart Contract Architect (Independent consultant)
                </span>
                <span className="text-zinc-600 font-mono text-[11px] uppercase tracking-wider mt-0.5 md:mt-0 print:text-zinc-800">
                  2024 - Present
                </span>
              </div>
              <div className="flex justify-between items-center text-xs text-zinc-600">
                <span className="italic font-medium text-zinc-700">Contract Blockchain Developer &amp; Security Researcher</span>
                <span className="text-[10px] bg-zinc-100 border border-zinc-250 px-2 py-0.5 rounded text-zinc-700 font-semibold print:border-zinc-300 print:bg-white">Remote / Global</span>
              </div>
              <ul className="list-disc list-outside pl-4 space-y-1 text-[11px] text-zinc-650 leading-relaxed print:text-zinc-800">
                <li>
                  <strong>Ethereum Pension Fund Ledger</strong>: Engineered and deployed an autonomous time-locked pension custody smart contract on the Sepolia testnet (0xcDA643...Efe3d) using Solidity, integrated with multisig guard policies.
                </li>
                <li>
                  <strong>Advanced Signature Integrations</strong>: Deployed secure off-chain transaction authorization mechanics utilizing EIP-712 typed structured data to facilitate fluid gasless meta-transactions.
                </li>
                <li>
                  <strong>Security Auditing &amp; Writing</strong>: Authored intermediate MEV/Frontrunning and smart-contract lesson guidelines for WTF Academy. Conducted white-hat blockchain rescue operations to recover trapped client testnet balances.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 3. CERTIFICATIONS & CREDENTIALS SECTION */}
        <div className="space-y-2 pt-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 border-b-2 border-zinc-200 pb-1 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-zinc-800 print:text-black" />
            <span>Professional Certifications &amp; Credentials</span>
          </h2>
          
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1.5 text-[11px] text-zinc-700 pl-4 list-disc leading-relaxed print:text-zinc-900">
            <li>
              <strong>PTE Academic English Language</strong>: Overall Score of <strong>82 / 90</strong> (Listening: <strong>89</strong>, Speaking: <strong>81</strong>). Directly equivalent to <strong>IELTS Academic 8.0 overall / C2 Mastery level</strong>.
            </li>
            <li>
              <strong>AWS Certified Solutions Architect – Associate</strong>: Validates architectural expertise in deploying scalable, secure and fault-tolerant business systems on AWS.
            </li>
            <li>
              <strong>PMP® Project Management Professional</strong> (Credential ID: 3014529): Certified by the Project Management Institute (PMI) in standard, risk-governed scrum and delivery frameworks.
            </li>
            <li>
              <strong>AWS Certified Machine Learning – Specialty</strong>: Validates technical competence in building, training, tuning, and deploying complex Deep Learning models on AWS SageMaker.
            </li>
          </ul>
        </div>

        {/* 4. TECHNICAL SKILLS GRID */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 border-b-2 border-zinc-200 pb-1 flex items-center gap-2">
            <Brain className="w-4 h-4 text-zinc-800 print:text-black" />
            <span>Core Competencies &amp; Technical Skills</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-[11px] text-zinc-700 leading-relaxed print:text-zinc-900">
            <div>
              <span className="font-bold text-zinc-900 block border-b border-zinc-200 pb-0.5 mb-1 text-[10px] uppercase tracking-wider">
                Software Development
              </span>
              <p className="text-zinc-600 font-mono text-[10px]">
                Java (Core/EE), Spring Boot, Spring Cloud, Hibernate, Node.js, TypeScript, Solidity, Python, HTML5, Tailwind CSS, API Integration, Git, SVN.
              </p>
            </div>
            <div>
              <span className="font-bold text-zinc-900 block border-b border-zinc-200 pb-0.5 mb-1 text-[10px] uppercase tracking-wider">
                Cloud &amp; Data Platforms
              </span>
              <p className="text-zinc-600 font-mono text-[10px]">
                AWS Cloud (EC2, ECS, SageMaker, S3, RDS, Lambda, IAM), Docker Containers, Oracle Database, PostgreSQL, MySQL, Redis Caching.
              </p>
            </div>
            <div>
              <span className="font-bold text-zinc-900 block border-b border-zinc-200 pb-0.5 mb-1 text-[10px] uppercase tracking-wider">
                Methodologies &amp; Tools
              </span>
              <p className="text-zinc-600 font-mono text-[10px]">
                Agile/Scrum Orchestration, PMP Frameworks, Requirements Capture, Business Analysis, System Architecture, Jira, Confluence, Foundry.
              </p>
            </div>
          </div>
        </div>

        {/* 5. ACADEMIC HIGHLIGHTS */}
        <div className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 border-b-2 border-zinc-200 pb-1 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-zinc-800 print:text-black" />
            <span>Academic Qualifications</span>
          </h2>

          <div className="space-y-3">
            <div className="space-y-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between text-xs font-bold text-zinc-900">
                <span className="text-sm font-extrabold text-zinc-950">
                  Master of Artificial Intelligence (MAI)
                </span>
                <span className="text-zinc-600 font-mono text-[11px] tracking-wider mt-0.5 md:mt-0 print:text-zinc-800">
                  March 2027 – December 2027
                </span>
              </div>
              <div className="flex justify-between items-center text-xs text-zinc-650">
                <span className="italic font-medium">The University of Auckland</span>
                <span className="text-[10px] bg-zinc-100 border border-zinc-250 px-2 py-0.5 rounded text-zinc-700 font-semibold print:border-zinc-300 print:bg-white">Auckland, New Zealand</span>
              </div>
              <p className="text-[11px] text-zinc-650 leading-relaxed text-justify">
                Coursework focus: Machine Learning frameworks, Neural Networks, Deep Learning architectures (including Audio DSP feature extraction, RNNs/Transformers, Sequence Modeling).
              </p>
            </div>

            <div className="space-y-1 border-t border-dashed border-zinc-200 pt-1.5">
              <div className="flex flex-col md:flex-row md:items-center justify-between text-xs font-bold text-zinc-900">
                <span className="text-sm font-extrabold text-zinc-950">
                  Bachelor of Science in Mathematics and Applied Mathematics
                </span>
                <span className="text-zinc-600 font-mono text-[11px] tracking-wider mt-0.5 md:mt-0 print:text-zinc-800">
                  2004 - 2008
                </span>
              </div>
              <div className="flex justify-between items-center text-xs text-zinc-650">
                <span className="italic font-medium">Beijing University of Posts and Telecommunications</span>
                <span className="text-[10px] bg-zinc-100 border border-zinc-250 px-2 py-0.5 rounded text-zinc-700 font-semibold print:border-zinc-300 print:bg-white">Beijing, China</span>
              </div>
              <p className="text-[11px] text-zinc-650 leading-relaxed text-justify">
                Graduated with <strong>GPA: 3.38 / 4.0</strong>. Advanced studies under cryptographical theory, logical computation architectures, linear optimization models, and advanced statistical probability vectors.
              </p>
            </div>
          </div>
        </div>

        {/* 6. REFEREES SECTION (NEW ZEALAND MUST-HAVE) */}
        <div className="space-y-2 pt-1 border-t-2 border-zinc-900">
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 pb-0.5 flex items-center gap-1.5">
            <span>Referees</span>
          </h2>
          <p className="text-[11px] text-zinc-650 italic leading-relaxed">
            Excellent professional references from senior executives, state-level project sponsors, and academic advisors are available upon request.
          </p>
        </div>

      </div>

      {/* 3. Return button footer block for print hidden */}
      <div className="flex justify-center pt-4 print:hidden">
        <button 
          onClick={onBack}
          className="px-6 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-zinc-300 rounded-lg shadow-xl cursor-pointer flex items-center gap-1.5 transition-all hover:text-white"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit Resumé &amp; Return to Digital Twin Interface</span>
        </button>
      </div>

    </div>
  );
}
