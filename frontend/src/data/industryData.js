const industryData = [
  {
    slug: "financial-it-support",
    name: "Financial Services",
    icon: "Landmark",
    headline: "Cybersecurity Built for the Speed and Stakes of Finance",
    subhead: "Banks, RIAs, fintech firms, and investment managers trust Veracity to keep their data compliant, their systems secure, and their clients confident.",
    heroStat: { value: "$4.9M", label: "Average cost of a financial services data breach" },
    description: "Financial services firms operate under some of the most stringent regulatory frameworks in any industry. From SEC/FINRA requirements to SOC 2 audits and PCI-DSS mandates, a single compliance gap can trigger enforcement actions, client attrition, and reputational damage that takes years to repair. At Veracity Technologies, we don't just understand financial IT — we live it. Our team manages infrastructure for RIAs, hedge funds, banks, and fintech startups across the Twin Cities, ensuring every system, every endpoint, and every data flow meets the standard your regulators — and your clients — expect.",
    challenges: [
      {
        title: "SEC/FINRA Compliance Pressure",
        desc: "Regulatory examinations are becoming more frequent and more technical. Examiners now request evidence of encryption policies, incident response plans, and vendor due diligence. We maintain audit-ready documentation 365 days a year.",
      },
      {
        title: "Business Email Compromise & Wire Fraud",
        desc: "Financial firms are the #1 target for BEC attacks. A single spoofed email directing a wire transfer to the wrong account can cost six or seven figures. We implement DMARC, DKIM, email encryption, and real-time phishing detection.",
      },
      {
        title: "Client Data at Scale",
        desc: "Managing PII for thousands of clients across multiple custodians creates a massive attack surface. We deploy data loss prevention, endpoint encryption, and role-based access controls that scale with your AUM.",
      },
      {
        title: "Shadow IT & Unapproved Tools",
        desc: "Advisors adopt portfolio tools, AI assistants, and communication apps without IT approval. Each one is an unmonitored data leak. We discover, assess, and govern every application touching your network.",
      },
    ],
    compliance: ["SOC 2 Type I & II", "PCI-DSS", "SEC/FINRA", "NIST CSF", "GLBA"],
    software: ["Bloomberg Terminal", "Salesforce Financial Cloud", "Orion", "Black Diamond", "Schwab Advisor Center", "Fidelity WealthCentral"],
    testimonialIndices: [12, 16, 13],
    ctaText: "Get Your Free Financial Services Security Audit",
    metaTitle: "Financial Services IT & Cybersecurity | Veracity Technologies",
    metaDescription: "SOC 2 compliant managed IT and cybersecurity for banks, RIAs, fintech, and investment firms in Minneapolis-St. Paul. SEC/FINRA aligned. 24/7 AI threat monitoring.",
  },
  {
    slug: "construction-it-support",
    name: "Construction",
    icon: "HardHat",
    headline: "Construction IT That Works as Hard as Your Crews",
    subhead: "Job sites don't wait for IT tickets. We keep your crews connected, your bids secure, and your project data protected — rain or shine.",
    heroStat: { value: "41%", label: "Year-over-year increase in construction ransomware attacks" },
    description: "Construction firms have become prime targets for cybercriminals. The industry's reliance on cloud-based project management, mobile devices on job sites, and complex vendor ecosystems creates vulnerabilities that traditional MSPs simply don't understand. At Veracity Technologies, we've built our construction practice around the tools and workflows your teams use every day. We know that a downed network on pour day costs more than most industries lose in a month. We know that subcontractor portals need security without friction. And we know that your project data — bids, blueprints, change orders — is your competitive advantage.",
    challenges: [
      {
        title: "Job Site Connectivity",
        desc: "Construction sites are dynamic, dusty, and distributed. Trailers move, crews rotate, and connectivity needs change weekly. We deploy ruggedized networking that adapts to your project phase — from foundation to finish.",
      },
      {
        title: "Ransomware Targeting GCs",
        desc: "General contractors are high-value targets because they connect to dozens of subcontractors, owners, and architects. One compromised sub can cascade ransomware across your entire vendor network. We implement zero-trust segmentation.",
      },
      {
        title: "Payment & Invoice Fraud",
        desc: "Construction wire fraud is epidemic. Attackers intercept payment change requests, redirect draws, and spoof subcontractor invoices. We deploy email authentication, payment verification workflows, and real-time alerts.",
      },
      {
        title: "Mobile Workforce Security",
        desc: "Superintendents, PMs, and field engineers access Procore, Bluebeam, and email from phones and tablets on open networks. We secure every device with MDM, VPN, and conditional access policies — without slowing them down.",
      },
    ],
    compliance: ["CMMC", "OSHA Digital", "NIST 800-171", "DOD Requirements", "Bonding Compliance"],
    software: ["Procore", "Sage 300 CRE", "Bluebeam Revu", "PlanGrid", "Autodesk BIM 360", "Viewpoint Vista"],
    testimonialIndices: [0, 1, 14],
    ctaText: "Get Your Free Construction IT Audit",
    metaTitle: "Construction IT & Cybersecurity | Veracity Technologies",
    metaDescription: "Construction-specialized managed IT and cybersecurity in Minneapolis-St. Paul. Job site connectivity, Procore integration, ransomware protection, CMMC compliance.",
  },
  {
    slug: "manufacturing-it-support",
    name: "Manufacturing",
    icon: "Factory",
    headline: "Secure the Factory Floor Without Slowing the Line",
    subhead: "When OT meets IT, vulnerabilities multiply. We bridge the gap with security that protects production without disrupting it.",
    heroStat: { value: "#1", label: "Most-attacked industry by ransomware for 3 consecutive years" },
    description: "Manufacturing is under siege. Connected machinery, SCADA systems, IoT sensors, and ERP integrations have turned the modern factory into a complex IT environment — often managed by teams with deep operational expertise but limited cybersecurity resources. At Veracity Technologies, we specialize in the OT/IT convergence that defines modern manufacturing. We understand that you can't just 'patch and pray' on a production line that runs 24/7. We understand that a PLC is not a laptop. And we understand that a ransomware attack on your MES system doesn't just cost data — it costs production runs, customer deliveries, and contracts.",
    challenges: [
      {
        title: "OT/IT Convergence Risk",
        desc: "Legacy PLCs, SCADA systems, and HMIs were never designed to be networked. When they connect to your IT environment, they become attack vectors. We architect air-gapped, segmented networks that let data flow safely without exposing control systems.",
      },
      {
        title: "Ransomware on the Production Line",
        desc: "Manufacturing ransomware doesn't just encrypt files — it halts production. A single incident can cost $1M+ in downtime and missed deliveries. We deploy 24/7 AI monitoring that catches lateral movement before it reaches the floor.",
      },
      {
        title: "Supply Chain Cybersecurity",
        desc: "Your customers and partners increasingly require cybersecurity attestations. Automotive OEMs demand TISAX, defense contractors require CMMC, and large retailers mandate vendor security audits. We get you compliant.",
      },
      {
        title: "Legacy System Management",
        desc: "Windows XP machines running critical equipment. Unsupported firmware on CNC controllers. We manage legacy environments with compensating controls, network isolation, and application whitelisting — keeping them secure without replacing them.",
      },
    ],
    compliance: ["NIST CSF", "IEC 62443", "CMMC", "TISAX", "ISO 27001", "FDA 21 CFR Part 11"],
    software: ["SAP ERP", "Siemens SCADA", "Rockwell/Allen-Bradley", "Epicor", "MES Systems", "Wonderware InTouch"],
    testimonialIndices: [4, 9, 17],
    ctaText: "Get Your Free Manufacturing Security Audit",
    metaTitle: "Manufacturing IT & OT Security | Veracity Technologies",
    metaDescription: "OT/IT cybersecurity for manufacturing plants in Minneapolis-St. Paul. SCADA protection, network segmentation, ransomware prevention, IEC 62443 compliance.",
  },
];

export default industryData;
