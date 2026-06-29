import { Calendar, Search, Rocket } from "lucide-react";
import { Button } from "../components/ui/button";

const steps = [
  {
    num: "1",
    icon: Calendar,
    title: "Schedule",
    desc: "Book a free discovery call to discuss your current IT setup, challenges, and goals. No pressure, no commitment.",
  },
  {
    num: "2",
    icon: Search,
    title: "Assess",
    desc: "We perform a comprehensive assessment of your systems, security, and operations - uncovering hidden risks and inefficiencies.",
  },
  {
    num: "3",
    icon: Rocket,
    title: "Implement",
    desc: "Receive a customized technology blueprint aligned to your business objectives. We handle the transition - you focus on growth.",
  },
];

export default function HowItWorks() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="how-it-works"
      data-testid="how-it-works-section"
      aria-label="Three-step process to get started with Veracity Technologies managed IT services"
      className="py-14 lg:py-20 bg-transparent relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#0077B3] mb-4">Getting Started</p>
          <h2
            data-testid="how-it-works-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4"
            style={{ fontFamily: "Outfit" }}
          >
            3 Steps to Better IT
          </h2>
          <p className="text-[#94a8be] text-base max-w-xl mx-auto">
            No long contracts. No surprises. Just a clear path from where you are to where you should be.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {steps.map((step, i) => (
            <div
              key={i}
              data-testid={`step-${i}`}
              className="text-center group"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-[#0077B3]/30 bg-[#0077B3]/5 flex items-center justify-center group-hover:border-[#0077B3] group-hover:bg-[#0077B3]/10 transition-all">
                <span className="stat-number text-2xl text-[#0077B3]">{step.num}</span>
              </div>
              <h3 className="text-white font-bold text-lg mb-2" style={{ fontFamily: "Outfit" }}>{step.title}</h3>
              <p className="text-[#94a8be] text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            data-testid="how-it-works-cta"
            onClick={() => scrollTo("audit")}
            className="bg-[#0077B3] hover:bg-[#005f8f] text-white rounded-md font-semibold px-8 h-12"
          >
            Book Your Free Discovery Call
          </Button>
          <p className="text-[#94a8be]/60 text-xs mt-3">Or call (952) 941-7333</p>
        </div>
      </div>
    </section>
  );
}
