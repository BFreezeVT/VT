import { useEffect, useRef, useState } from "react";

const stats = [
  { id: "attacks", prefix: "", value: 2328, decimals: 0, suffix: "", label: "Cyberattacks Per Day (Globally)", source: "Forbes / Cybersecurity Ventures 2025" },
  { id: "cost", prefix: "$", value: 4.88, decimals: 2, suffix: "M", label: "Average Cost of a US Data Breach", source: "IBM Cost of a Data Breach Report 2024" },
  { id: "ransomware", prefix: "", value: 32, decimals: 0, suffix: "%", label: "Rise in Ransomware Attacks (2025 vs 2024)", source: "Kiteworks 2025" },
  { id: "detect", prefix: "", value: 194, decimals: 0, suffix: " Days", label: "Average Time to Detect a Breach", source: "IBM 2024" },
  { id: "shadow-ai", prefix: "", value: 68, decimals: 0, suffix: "%", label: "of Employees Using Unauthorized AI Tools", source: "State of Shadow AI Report" },
];

function AnimatedStat({ stat, index, active }) {
  const [display, setDisplay] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!active || startedRef.current) return;
    startedRef.current = true;
    const duration = 1600;
    const start = performance.now();
    let frame;
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(stat.value * eased);
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setDisplay(stat.value);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, stat.value]);

  const formatted =
    stat.decimals > 0
      ? display.toFixed(stat.decimals)
      : Math.round(display).toLocaleString("en-US");

  return (
    <div
      data-testid={`breach-ticker-stat-${index}`}
      className="text-center px-4 py-5 lg:py-2 animate-fade-in-up"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <p
        data-testid={`breach-ticker-value-${index}`}
        className="stat-number text-3xl sm:text-4xl font-extrabold text-[#ef4444] tabular-nums"
      >
        {stat.prefix}
        {formatted}
        {stat.suffix}
      </p>
      <p className="text-white/80 text-xs sm:text-[13px] font-semibold uppercase tracking-wide mt-2 leading-snug max-w-[170px] mx-auto">
        {stat.label}
      </p>
      <p
        data-testid={`breach-ticker-source-${index}`}
        className="text-white/30 text-[10px] mt-1.5 italic"
      >
        Source: {stat.source}
      </p>
    </div>
  );
}

export default function BreachTicker() {
  const [active, setActive] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="breach-ticker"
      ref={sectionRef}
      data-testid="breach-ticker-section"
      aria-label="Current cybersecurity threat statistics"
      className="py-10 lg:py-12 bg-[#0a1220] border-y border-[#ef4444]/20 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-center gap-2.5 mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ef4444] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ef4444]" />
          </span>
          <p
            data-testid="breach-ticker-heading"
            className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#ef4444]"
          >
            The Threat Landscape Right Now
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-y divide-white/5 lg:divide-y-0 lg:divide-x">
          {stats.map((stat, i) => (
            <AnimatedStat key={stat.id} stat={stat} index={i} active={active} />
          ))}
        </div>
      </div>
    </section>
  );
}
