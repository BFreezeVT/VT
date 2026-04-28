from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# ─── Models ───────────────────────────────────────────────────

class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class AuditLeadCreate(BaseModel):
    company: str
    name: Optional[str] = None
    role: Optional[str] = None
    phone: str
    email: str
    source_page: Optional[str] = "homepage"
    source_city: Optional[str] = None
    source_industry: Optional[str] = None

class AuditLead(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    company: str
    name: Optional[str] = None
    role: Optional[str] = None
    phone: str
    email: str
    source_page: str = "homepage"
    source_city: Optional[str] = None
    source_industry: Optional[str] = None
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    status: str = "new"

class BlogPostOut(BaseModel):
    model_config = ConfigDict(extra="ignore")
    slug: str
    title: str
    excerpt: str
    category: str
    author: str
    published_date: str
    read_time: str
    content: str


# ─── Email notification ──────────────────────────────────────

def send_lead_notification(lead: AuditLead):
    """Send email notification for new lead. Requires SMTP_* env vars."""
    smtp_host = os.environ.get("SMTP_HOST")
    smtp_port = int(os.environ.get("SMTP_PORT", "587"))
    smtp_user = os.environ.get("SMTP_USER")
    smtp_pass = os.environ.get("SMTP_PASS")
    notify_email = os.environ.get("NOTIFY_EMAIL", "info@veracitytech.com")

    if not all([smtp_host, smtp_user, smtp_pass]):
        logger.info(f"SMTP not configured — skipping email notification for lead {lead.id}")
        return False

    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = f"New Audit Lead: {lead.company}"
        msg["From"] = smtp_user
        msg["To"] = notify_email

        source = lead.source_page
        if lead.source_city:
            source = f"City: {lead.source_city}"
        elif lead.source_industry:
            source = f"Industry: {lead.source_industry}"

        text = f"""New lead from Veracity Technologies website:

Company: {lead.company}
Name: {lead.name or lead.role or 'N/A'}
Phone: {lead.phone}
Email: {lead.email}
Source: {source}
Submitted: {lead.created_at}
"""
        html = f"""
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#020812;color:#fff;padding:32px;border:1px solid #003B71;">
  <h2 style="color:#0077B3;margin:0 0 16px;">New Audit Lead</h2>
  <table style="width:100%;border-collapse:collapse;">
    <tr><td style="padding:8px 0;color:#A0B6CD;width:120px;">Company</td><td style="color:#fff;">{lead.company}</td></tr>
    <tr><td style="padding:8px 0;color:#A0B6CD;">Name</td><td style="color:#fff;">{lead.name or lead.role or 'N/A'}</td></tr>
    <tr><td style="padding:8px 0;color:#A0B6CD;">Phone</td><td style="color:#fff;">{lead.phone}</td></tr>
    <tr><td style="padding:8px 0;color:#A0B6CD;">Email</td><td style="color:#fff;"><a href="mailto:{lead.email}" style="color:#0077B3;">{lead.email}</a></td></tr>
    <tr><td style="padding:8px 0;color:#A0B6CD;">Source</td><td style="color:#fff;">{source}</td></tr>
    <tr><td style="padding:8px 0;color:#A0B6CD;">Submitted</td><td style="color:#fff;">{lead.created_at}</td></tr>
  </table>
</div>
"""
        msg.attach(MIMEText(text, "plain"))
        msg.attach(MIMEText(html, "html"))

        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.starttls()
            server.login(smtp_user, smtp_pass)
            server.sendmail(smtp_user, notify_email, msg.as_string())

        logger.info(f"Lead notification email sent for {lead.company}")
        return True
    except Exception as e:
        logger.error(f"Failed to send lead notification: {e}")
        return False


# ─── Routes ──────────────────────────────────────────────────

@api_router.get("/")
async def root():
    return {"message": "Veracity Technologies API"}

@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "service": "Veracity Technologies API", "version": "1.0.0"}

# Lead capture
@api_router.post("/leads")
async def create_lead(input_data: AuditLeadCreate):
    lead = AuditLead(**input_data.model_dump())
    doc = lead.model_dump()
    await db.leads.insert_one(doc)
    # Remove _id before response
    doc.pop("_id", None)
    logger.info(f"New lead captured: {lead.company} ({lead.email}) from {lead.source_page}")

    # Send email notification (non-blocking best-effort)
    try:
        send_lead_notification(lead)
    except Exception as e:
        logger.error(f"Email notification failed: {e}")

    return {"success": True, "id": lead.id, "message": "Your audit request has been received."}

@api_router.get("/leads")
async def get_leads():
    leads = await db.leads.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return leads

@api_router.get("/leads/count")
async def get_lead_count():
    count = await db.leads.count_documents({})
    return {"count": count}

# Blog posts
BLOG_POSTS = [
    {
        "slug": "ai-cybersecurity-threats-2025",
        "title": "How AI Is Changing the Cybersecurity Threat Landscape in 2025",
        "excerpt": "AI-powered attacks are outpacing traditional defenses. Here's what businesses in construction, finance, and manufacturing need to know — and do — right now.",
        "category": "AI & Cybersecurity",
        "author": "Veracity Technologies",
        "published_date": "2025-12-01",
        "read_time": "7 min read",
        "content": """Artificial intelligence has fundamentally changed the cybersecurity landscape. While defenders have long used AI for threat detection and anomaly monitoring, attackers are now weaponizing the same technology at scale.

## The New Threat Vectors

**AI-Generated Phishing**: Large language models can now craft phishing emails that are virtually indistinguishable from legitimate correspondence. These emails reference real projects, use correct industry terminology, and mimic the writing style of known contacts. For construction firms exchanging payment instructions, or financial advisors communicating portfolio changes, this is a critical vulnerability.

**Deepfake Voice and Video**: Attackers are using AI-generated voice clones to impersonate executives on phone calls, authorizing wire transfers or credential resets. A CFO's voice can be cloned from a single earnings call recording.

**Automated Vulnerability Scanning**: AI-powered tools can scan thousands of systems simultaneously, identifying and exploiting vulnerabilities faster than human security teams can patch them.

## What Your Business Should Do Now

1. **Implement AI-powered email security** that analyzes behavioral patterns, not just content signatures
2. **Establish verbal verification protocols** for any financial transaction over a defined threshold
3. **Deploy AI-augmented SOC monitoring** that detects lateral movement and anomalous access patterns in real time
4. **Train employees on AI-specific threats** — traditional phishing training is no longer sufficient
5. **Audit your AI tool usage** — shadow AI tools may be leaking sensitive data to third-party models

## Industry-Specific Risks

**Construction**: AI-generated fake RFIs, change orders, and payment applications are emerging as targeted attack vectors against general contractors.

**Financial Services**: AI can generate convincing fake financial reports and compliance documents, potentially manipulating investment decisions or audit outcomes.

**Manufacturing**: AI-powered attacks can target SCADA and ICS systems with customized payloads designed to disrupt specific industrial processes.

## The Bottom Line

The organizations that will be most resilient in 2025 and beyond are those that adopt AI defensively before they become victims of AI offensively. At Veracity Technologies, our SOC uses machine learning models trained on industry-specific threat data to detect and respond to attacks in real time — 24/7.

*If your business hasn't conducted an AI security assessment, now is the time. Contact us for a free evaluation.*"""
    },
    {
        "slug": "soc-2-compliance-guide-small-business",
        "title": "SOC 2 Compliance for Small and Mid-Size Businesses: A Practical Guide",
        "excerpt": "SOC 2 isn't just for enterprises anymore. Here's how smaller firms in the Twin Cities can achieve compliance without breaking the bank — or their operations.",
        "category": "Compliance",
        "author": "Veracity Technologies",
        "published_date": "2025-11-15",
        "read_time": "9 min read",
        "content": """SOC 2 compliance was once considered the domain of large enterprises and SaaS companies. Today, it's increasingly required by clients, partners, and regulators across industries — including financial services, professional services, and even construction firms bidding on government-adjacent projects.

## What Is SOC 2?

SOC 2 (System and Organization Controls 2) is a framework developed by the AICPA that evaluates an organization's controls related to security, availability, processing integrity, confidentiality, and privacy. There are two types:

- **Type I**: Evaluates the design of controls at a specific point in time
- **Type II**: Evaluates the operating effectiveness of controls over a period (typically 6-12 months)

## Why Small Businesses Need SOC 2

**Client requirements are escalating.** Enterprise clients increasingly require SOC 2 reports from their vendors before signing contracts. If you're a financial advisory firm, an IT consultancy, or a managed service provider, not having SOC 2 can cost you deals.

**Insurance premiums are tied to compliance.** Cyber insurance carriers are offering significantly lower premiums to organizations that can demonstrate SOC 2 compliance.

**It forces good hygiene.** The SOC 2 process identifies gaps you didn't know existed — from access control weaknesses to missing backup verification procedures.

## The Practical Path to SOC 2

### Phase 1: Gap Assessment (Weeks 1-3)
We evaluate your current environment against SOC 2 Trust Service Criteria. This identifies what you already have in place and what needs to change.

### Phase 2: Remediation (Weeks 4-10)
We implement the missing controls — access management, encryption, monitoring, incident response procedures, vendor management, and more. For most small businesses, this involves configuring existing tools properly rather than buying new ones.

### Phase 3: Evidence Collection (Weeks 11-16)
For Type II, we help you collect and organize the evidence auditors need — logs, access reviews, change management records, and policy acknowledgments.

### Phase 4: Audit (Weeks 17-20)
We coordinate with your auditor, provide all documentation, and handle questions on your behalf.

## Common Misconceptions

**"SOC 2 is too expensive for us."** A typical small business SOC 2 engagement costs $15,000-$40,000 — far less than losing a single enterprise client or paying higher insurance premiums for years.

**"We need to overhaul everything."** Most organizations are 60-70% compliant before they start. The gap is usually in documentation and monitoring, not in fundamental infrastructure changes.

**"It will disrupt our operations."** With proper planning, SOC 2 preparation runs in the background while your team works normally.

## Veracity's Approach

We've guided dozens of Twin Cities businesses through SOC 2 — from 10-person financial advisory firms to 200-employee manufacturing companies. Our approach minimizes disruption while ensuring you pass your audit on the first attempt.

*Ready to start? Schedule a free compliance gap assessment with our team.*"""
    },
    {
        "slug": "ransomware-protection-construction-firms",
        "title": "Ransomware Protection for Construction Firms: 5 Steps You Can Take This Week",
        "excerpt": "Construction ransomware attacks are up 41%. Here are five concrete steps any construction firm can implement immediately to reduce their risk.",
        "category": "Construction",
        "author": "Veracity Technologies",
        "published_date": "2025-11-01",
        "read_time": "6 min read",
        "content": """Construction firms have seen a 41% year-over-year increase in ransomware attacks. The industry's unique characteristics — distributed job sites, heavy subcontractor reliance, large wire transfers, and time-sensitive project schedules — make it an ideal target for cybercriminals.

Here are five steps you can implement this week to significantly reduce your risk.

## 1. Enable Multi-Factor Authentication (MFA) Everywhere

This is the single most impactful step you can take. Require MFA on:
- Email (Office 365 / Google Workspace)
- Project management tools (Procore, PlanGrid)
- VPN access
- Financial systems (Sage, QuickBooks)
- Remote desktop connections

**Time to implement: 1-2 hours.** Most platforms support MFA natively — you just need to turn it on and enforce it.

## 2. Segment Your Network

Don't let your accounting department's network communicate directly with your job site trailers. If ransomware infects one segment, segmentation prevents it from spreading to the rest.

**Basic segmentation:**
- Corporate office on one VLAN
- Job site connectivity on another
- Guest/vendor access isolated
- Financial systems on a restricted segment

## 3. Implement Email Authentication (DMARC/DKIM/SPF)

Payment fraud via spoofed emails is the #1 financial cybercrime in construction. Configure:
- **SPF**: Specifies which servers can send email on your behalf
- **DKIM**: Adds a digital signature to outgoing emails
- **DMARC**: Tells receiving servers what to do with emails that fail authentication

This prevents attackers from sending emails that appear to come from your domain.

## 4. Test Your Backups — Today

Having backups isn't enough. You need to verify:
- Backups are completing successfully (check logs)
- You can actually restore from them (run a test restore)
- They're stored offline or immutable (ransomware targets backups first)
- Your recovery time meets your business needs (can you afford 3 days of downtime?)

## 5. Establish a Wire Transfer Verification Protocol

Create a mandatory policy: any change to banking information for wire transfers must be verified via phone call to a known number (not the number in the email). This alone can prevent six-figure losses.

## Beyond the Basics

These five steps will significantly reduce your risk, but they're just the beginning. A comprehensive cybersecurity program for construction firms should also include:
- 24/7 endpoint detection and response (EDR)
- Security awareness training for all employees
- Vendor security assessments
- Incident response planning
- Regular penetration testing

*Veracity Technologies specializes in construction cybersecurity. Schedule a free audit to see where your firm stands.*"""
    },
    {
        "slug": "manufacturing-ot-it-security-guide",
        "title": "Bridging the OT/IT Gap: A Security Guide for Manufacturing Plants",
        "excerpt": "When operational technology meets information technology, vulnerabilities multiply. Here's how manufacturing firms can secure the convergence without halting production.",
        "category": "Manufacturing",
        "author": "Veracity Technologies",
        "published_date": "2025-10-15",
        "read_time": "8 min read",
        "content": """Manufacturing is the #1 most-targeted industry for ransomware attacks — and has been for three consecutive years. The reason is simple: manufacturers can't afford downtime, so they're more likely to pay ransoms. And the convergence of operational technology (OT) with information technology (IT) has created attack surfaces that didn't exist a decade ago.

## Understanding the OT/IT Convergence

**Operational Technology (OT)** includes the hardware and software that monitors and controls physical processes — PLCs, SCADA systems, HMIs, DCS controllers, and industrial IoT sensors.

**Information Technology (IT)** includes traditional computing — servers, workstations, email, ERP systems, and cloud applications.

Historically, these were air-gapped. Today, they're increasingly connected for efficiency: real-time production dashboards, predictive maintenance, quality tracking, and supply chain integration all require OT data to flow into IT systems.

## The Security Gap

The problem is that OT systems were never designed for networked environments:
- **No patching**: Many PLCs and HMIs run outdated operating systems that can't be updated
- **No authentication**: Legacy industrial protocols (Modbus, DNP3) have no built-in security
- **No monitoring**: Traditional IT security tools don't understand industrial protocols
- **No segmentation**: Many plants have flat networks where a compromised office PC can reach production controllers

## A Practical Security Framework

### Layer 1: Network Segmentation (Purdue Model)
Implement the ISA/IEC 62443 zones and conduits model:
- **Level 0-1**: Physical process and basic control (PLCs, sensors)
- **Level 2**: Area supervisory control (HMIs, engineering workstations)
- **Level 3**: Site operations (historians, MES, batch management)
- **Level 3.5**: Demilitarized zone (DMZ between OT and IT)
- **Level 4-5**: Enterprise IT (ERP, email, internet)

Each level should only communicate with adjacent levels through controlled interfaces.

### Layer 2: OT-Specific Monitoring
Deploy industrial-aware monitoring tools that understand protocols like Modbus, EtherNet/IP, and PROFINET. These tools can detect anomalous commands to PLCs that traditional IT security tools would miss entirely.

### Layer 3: Compensating Controls for Legacy Systems
For systems that can't be patched:
- Application whitelisting (only approved executables can run)
- USB port control (prevent unauthorized media)
- Network access control (only authorized devices connect)
- Virtual patching via industrial firewalls

### Layer 4: Incident Response Planning
Create OT-specific incident response procedures that account for:
- Safe shutdown procedures for physical processes
- Communication protocols with plant operations
- Regulatory notification requirements
- Production recovery timelines

## Getting Started

The first step is always visibility: you can't secure what you can't see. A comprehensive OT asset inventory and network assessment reveals the true scope of your attack surface.

*Veracity Technologies conducts non-invasive OT/IT security assessments for manufacturing plants across the Twin Cities. Contact us to schedule yours.*"""
    },
    {
        "slug": "shadow-ai-risks-business",
        "title": "Shadow AI: The Hidden Risk in Your Organization",
        "excerpt": "Your employees are using AI tools you don't know about. Here's why that's dangerous and what to do about it before it causes a breach.",
        "category": "AI & Cybersecurity",
        "author": "Veracity Technologies",
        "published_date": "2025-10-01",
        "read_time": "5 min read",
        "content": """78% of organizations have no AI security policy in place. Meanwhile, employees across every industry are adopting AI tools daily — ChatGPT, Claude, Copilot, Gemini, and dozens of specialized AI assistants for coding, writing, data analysis, and customer communication.

This is shadow AI, and it's the fastest-growing security blind spot in business today.

## What Is Shadow AI?

Shadow AI refers to the use of artificial intelligence tools and services by employees without the knowledge, approval, or governance of the IT or security team. It's the AI equivalent of shadow IT — but with significantly higher stakes.

## Why It's Dangerous

**Data leakage is the primary risk.** When an employee pastes a client's financial data into ChatGPT to generate a summary, that data is now in a third-party system with unclear retention and training policies.

**Compliance violations are immediate.** If a healthcare employee inputs PHI into a public AI tool, that's a HIPAA violation. If a financial advisor shares client PII, that's a SEC/FINRA issue.

**Accuracy isn't guaranteed.** AI tools can generate convincing but incorrect information. If employees use AI-generated analysis for business decisions without verification, the consequences can be severe.

## Real-World Examples

- A construction PM pasted an entire bid document into an AI tool to check for errors — exposing proprietary pricing to a third party
- A financial analyst uploaded client portfolio data to an AI assistant for formatting — violating data handling agreements
- A manufacturing engineer shared SCADA configurations with an AI chatbot for troubleshooting — revealing network architecture to an unknown entity

## What to Do About It

### 1. Discover What's Being Used
Deploy network monitoring and endpoint tools that can identify AI service usage. You'll likely be surprised by what you find.

### 2. Create an AI Acceptable Use Policy
Define what's allowed and what isn't. Be specific about data classification — what types of data can and cannot be shared with AI tools.

### 3. Provide Approved Alternatives
If employees are using AI because it makes them more productive, provide sanctioned tools with proper security controls rather than just banning everything.

### 4. Implement Data Loss Prevention
DLP tools can detect and block sensitive data from being transmitted to unauthorized AI services.

### 5. Train Your Team
Employees need to understand the risks — not just the rules. When people understand why data shouldn't be shared with AI tools, compliance improves dramatically.

*Veracity Technologies offers Shadow AI assessments that discover, evaluate, and govern AI tool usage across your organization. Contact us to learn more.*"""
    },
    {
        "slug": "financial-services-wire-fraud-prevention",
        "title": "Wire Fraud Prevention for Financial Services Firms",
        "excerpt": "Business email compromise costs financial firms billions annually. Here's a practical framework for preventing wire fraud at your organization.",
        "category": "Financial Services",
        "author": "Veracity Technologies",
        "published_date": "2025-09-15",
        "read_time": "6 min read",
        "content": """Business email compromise (BEC) is the most financially devastating cybercrime affecting financial services firms today. The FBI reports over $2.7 billion in losses annually — and those are just the reported cases.

For financial advisors, banks, and investment firms that routinely process wire transfers, the risk is existential. A single compromised email thread can redirect hundreds of thousands of dollars to an attacker's account.

## How Wire Fraud Attacks Work

### The Setup
Attackers gain access to an email account — either through phishing, credential stuffing, or purchasing stolen credentials. They then monitor email conversations silently, sometimes for weeks, learning communication patterns, identifying pending transactions, and mapping relationships.

### The Strike
When a wire transfer is imminent, the attacker either:
- **Inserts themselves** into the conversation with a spoofed reply, providing "updated" bank details
- **Impersonates an executive** requesting an urgent, confidential transfer
- **Compromises a vendor** and sends a legitimate-looking invoice with fraudulent routing numbers

### The Extraction
Once funds are wired to the attacker's account, they're typically moved through multiple accounts within hours and are unrecoverable.

## Prevention Framework

### Email Security
- **DMARC, DKIM, SPF**: Prevent domain spoofing
- **Advanced threat protection**: AI-based email analysis that detects impersonation attempts
- **External email banners**: Visual warnings on emails originating outside your organization

### Process Controls
- **Dual authorization**: Require two people to approve wire transfers above a threshold
- **Verbal verification**: Mandatory phone call to a known number for any banking change
- **Cooling period**: 24-hour delay on first-time wires to new accounts

### Technical Controls
- **Conditional access**: Restrict email access to managed devices
- **Impossible travel detection**: Alert when the same account is accessed from different locations
- **Session monitoring**: Detect mailbox rule changes that forward or hide emails

### Training
- **Quarterly simulations**: Test employees with realistic BEC scenarios
- **Role-specific training**: Focus on the employees who handle financial transactions

## The Cost of Inaction

The average BEC loss for financial services firms is $130,000 per incident. For smaller firms, a single successful attack can be business-ending.

*Veracity Technologies helps financial services firms implement comprehensive wire fraud prevention programs. Schedule your free security assessment today.*"""
    },
    {
        "slug": "cmmc-compliance-guide-defense-contractors",
        "title": "CMMC 2.0 Compliance: What Defense Contractors Need to Know in 2026",
        "excerpt": "The DoD is enforcing CMMC across its entire supply chain. Here's what Level 2 certification requires and how to get there without derailing your operations.",
        "category": "Compliance",
        "author": "Veracity Technologies",
        "published_date": "2025-12-01",
        "read_time": "8 min read",
        "content": """CMMC 2.0 (Cybersecurity Maturity Model Certification) is no longer optional for defense contractors. The Department of Defense has begun enforcing certification requirements across its supply chain, and organizations that handle Controlled Unclassified Information (CUI) must achieve Level 2 certification to bid on or maintain DoD contracts.

## What Is CMMC 2.0?

CMMC 2.0 is a streamlined version of the original CMMC framework, reducing the five levels to three:

- **Level 1 (Foundational)**: 17 practices based on FAR 52.204-21. Self-assessment. For organizations handling Federal Contract Information (FCI) only.
- **Level 2 (Advanced)**: 110 practices aligned with NIST SP 800-171. Third-party assessment required. For organizations handling CUI.
- **Level 3 (Expert)**: 110+ practices based on NIST SP 800-172. Government-led assessment. For the most sensitive programs.

## Who Needs CMMC?

If your organization is part of the defense industrial base and handles CUI — which includes technical drawings, specifications, contract data, and export-controlled information — you need Level 2 certification. This applies to:

- Prime contractors
- Subcontractors at any tier
- Manufacturers producing defense components
- IT service providers supporting DoD programs
- Engineering and consulting firms

## The Path to Level 2 Certification

### Phase 1: Gap Assessment
Evaluate your current environment against all 110 NIST 800-171 controls. Identify what's in place, what's partially implemented, and what's missing entirely.

### Phase 2: System Security Plan (SSP)
Document your entire security environment — network architecture, access controls, incident response procedures, and continuous monitoring capabilities.

### Phase 3: Plan of Action & Milestones (POA&M)
For controls not yet fully implemented, create a remediation plan with specific timelines. Note: POA&Ms are now allowed under CMMC 2.0 but must be closed within 180 days.

### Phase 4: Implementation
Deploy the missing controls — enclave architecture, FIPS 140-2 encryption, multi-factor authentication, continuous monitoring, and audit logging.

### Phase 5: Third-Party Assessment
A C3PAO (Certified Third-Party Assessment Organization) conducts your official assessment. They review your SSP, test controls, and issue your certification.

## Common Pitfalls

**Underestimating scope.** CUI flows through more systems than you think — email, file shares, collaboration tools, and even personal devices.

**Treating it as a one-time project.** CMMC requires continuous compliance, not just point-in-time certification.

**Ignoring subcontractor flow-down.** If your subs handle CUI, they need CMMC too. Your certification depends on your entire supply chain.

*Veracity Technologies is a CMMC Registered Provider. We build compliant environments from the ground up — contact us for a free gap assessment.*"""
    },
    {
        "slug": "mfa-implementation-guide-business",
        "title": "MFA Implementation Guide: The Single Most Impactful Security Step for Any Business",
        "excerpt": "Multi-factor authentication blocks 99.9% of credential-based attacks. Here's how to implement it across your organization without disrupting productivity.",
        "category": "AI & Cybersecurity",
        "author": "Veracity Technologies",
        "published_date": "2025-11-20",
        "read_time": "5 min read",
        "content": """59% of confirmed security incidents in 2025 were identity-driven attacks — stolen credentials, password spraying, and session hijacking. Multi-factor authentication (MFA) blocks 99.9% of these attacks, making it the single highest-impact security control any organization can implement.

## What Is MFA?

Multi-factor authentication requires users to provide two or more verification factors to access a resource:

- **Something you know**: Password or PIN
- **Something you have**: Phone, hardware token, or authenticator app
- **Something you are**: Fingerprint, face recognition

## Where to Implement MFA (Priority Order)

1. **Email** (Office 365, Google Workspace) — The #1 target for credential theft
2. **VPN and remote access** — Every remote connection must be verified
3. **Financial systems** (banking, accounting, payroll) — Wire fraud prevention
4. **Cloud applications** (Salesforce, Procore, SAP) — SaaS is the new perimeter
5. **Administrative accounts** — Domain admins, firewall admins, cloud admins
6. **Help desk and IT tools** — Prevent attackers from impersonating IT

## Implementation Best Practices

**Use authenticator apps, not SMS.** SMS codes can be intercepted via SIM swapping. Microsoft Authenticator, Google Authenticator, or hardware keys (YubiKey) are significantly more secure.

**Enforce conditional access policies.** Require MFA based on risk — new device, unusual location, sensitive application, or elevated privileges.

**Don't make exceptions.** Every exception is an attack vector. Executives, contractors, and temporary staff all need MFA.

**Plan for MFA fatigue attacks.** Attackers now bombard users with MFA prompts hoping they'll approve one accidentally. Use number-matching MFA that requires entering a displayed code.

## The Business Case

The average cost of a credential-based breach is $4.67 million (IBM 2025). MFA implementation costs a fraction of that and can be rolled out in days, not months.

*Veracity Technologies deploys and manages MFA across all major platforms. Contact us for a free security assessment.*"""
    },
    {
        "slug": "hipaa-compliance-small-healthcare-practices",
        "title": "HIPAA Compliance for Small Healthcare Practices: A No-Nonsense Guide",
        "excerpt": "Small clinics face the same HIPAA requirements as large hospital systems but with a fraction of the resources. Here's how to stay compliant without a dedicated compliance team.",
        "category": "Compliance",
        "author": "Veracity Technologies",
        "published_date": "2025-10-20",
        "read_time": "7 min read",
        "content": """HIPAA enforcement has intensified dramatically. The HHS Office for Civil Rights is conducting more audits, imposing larger fines, and paying particular attention to small and mid-size healthcare practices that assume they're too small to be targeted.

They're not. Small practices are targeted precisely because they typically have weaker security controls.

## The Three HIPAA Safeguard Categories

### Technical Safeguards
- **Encryption**: All PHI must be encrypted at rest (on hard drives, servers) and in transit (email, file transfers)
- **Access controls**: Role-based access so staff only see the records they need
- **Audit logging**: Every access to PHI must be logged and reviewable
- **Automatic logoff**: Workstations must lock after inactivity
- **Authentication**: Unique user IDs for every person who accesses PHI

### Physical Safeguards
- **Facility access**: Locked server rooms, secured workstations
- **Device controls**: Policies for laptops, phones, and removable media
- **Workstation security**: Screen positioning, privacy filters

### Administrative Safeguards
- **Risk assessment**: Annual documented assessment of threats to PHI
- **Security officer**: A designated person responsible for HIPAA compliance
- **Training**: All staff trained on PHI handling and security awareness
- **Business Associate Agreements (BAAs)**: Written agreements with every vendor that touches PHI
- **Incident response plan**: Documented procedures for breach notification

## Common Violations in Small Practices

- Sending PHI via unencrypted email
- Staff sharing login credentials
- No BAA with cloud storage or IT providers
- Unpatched systems with known vulnerabilities
- No documented risk assessment (the #1 finding in audits)

## The Cost of Non-Compliance

HIPAA fines range from $100 to $50,000 per violation, with annual maximums of $1.5 million per violation category. Beyond fines, a breach requires notification of every affected patient, HHS, and potentially the media.

*Veracity Technologies makes small healthcare practices HIPAA-compliant without disrupting patient care. Schedule your free compliance assessment.*"""
    },
    {
        "slug": "zero-trust-architecture-explained",
        "title": "Zero Trust Architecture Explained: Why 'Trust But Verify' Is Dead",
        "excerpt": "The traditional network perimeter is gone. Zero trust assumes every user, device, and connection is a potential threat until continuously proven otherwise.",
        "category": "AI & Cybersecurity",
        "author": "Veracity Technologies",
        "published_date": "2025-09-01",
        "read_time": "6 min read",
        "content": """The traditional security model — a fortified perimeter protecting a trusted internal network — is dead. Cloud computing, remote work, mobile devices, and SaaS applications have dissolved the perimeter. Attackers who breach the edge now move laterally through flat networks with impunity.

Zero Trust Architecture (ZTA) eliminates implicit trust entirely. Every user, device, application, and data flow is verified continuously — regardless of location.

## Core Principles of Zero Trust

### 1. Never Trust, Always Verify
Every access request is authenticated, authorized, and encrypted — even if it comes from inside the network. An employee at their desk gets the same scrutiny as a contractor on public Wi-Fi.

### 2. Least Privilege Access
Users get the minimum access needed for their role — nothing more. A project manager doesn't need access to financial systems. An accountant doesn't need access to engineering files.

### 3. Assume Breach
Design your architecture as if attackers are already inside. Segment networks, monitor lateral movement, and contain incidents before they spread.

### 4. Continuous Verification
Authentication isn't a one-time event at login. User behavior, device health, location, and risk signals are evaluated continuously throughout the session.

## Zero Trust in Practice

**Identity**: MFA everywhere, conditional access policies, privileged access management
**Devices**: Endpoint health checks, managed device requirements, mobile device management
**Network**: Micro-segmentation, encrypted communications, software-defined perimeters
**Applications**: Application-level access controls, API security, SaaS governance
**Data**: Classification, encryption, data loss prevention, rights management

## Why It Matters Now

- 59% of incidents are identity-driven (eSentire 2026)
- Average lateral movement time after breach: 62 minutes
- Organizations with zero trust report 50% lower breach costs (IBM 2025)

## Getting Started

Zero trust isn't a product you buy — it's an architecture you build incrementally. Start with:
1. MFA on all accounts
2. Conditional access for sensitive applications
3. Network segmentation between departments
4. Endpoint detection and response on all devices
5. Regular access reviews and privilege audits

*Veracity Technologies designs and implements zero trust architectures for regulated industries. Contact us for a free assessment of your current security posture.*"""
    },
]

@api_router.get("/blog")
async def get_blog_posts():
    return [
        {k: v for k, v in post.items() if k != "content"}
        for post in BLOG_POSTS
    ]

@api_router.get("/blog/{slug}")
async def get_blog_post(slug: str):
    for post in BLOG_POSTS:
        if post["slug"] == slug:
            return post
    raise HTTPException(status_code=404, detail="Post not found")


# Legacy routes
@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
