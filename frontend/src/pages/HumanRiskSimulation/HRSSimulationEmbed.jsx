import CyberGame from "../../sections/CyberGame";

export default function HRSSimulationEmbed() {
  return (
    <section id="hrs-simulation" data-testid="hrs-simulation-embed" className="py-4 bg-white">
      <div className="max-w-3xl mx-auto px-6 text-center pt-12">
        <p className="overline text-[#0077B3] mb-3">Launch the Simulation</p>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0f1d32]" style={{ fontFamily: "Outfit" }}>
          See your organization's Human Risk Score right now
        </h2>
      </div>
      <CyberGame />
    </section>
  );
}
