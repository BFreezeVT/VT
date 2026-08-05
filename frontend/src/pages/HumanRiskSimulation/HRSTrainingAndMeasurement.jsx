import { XOctagon, BarChart3 } from "lucide-react";

export default function HRSTrainingAndMeasurement({ data }) {
  return (
    <section data-testid="hrs-training-measurement" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-4">
          <XOctagon className="w-5 h-5 text-[#0077B3]" />
          <p className="overline text-[#0077B3]">The Training Gap</p>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0f1d32] mb-6" style={{ fontFamily: "Outfit" }}>
          {data.whyTrainingFails.title}
        </h2>
        <p className="text-[#3a5068] text-base leading-relaxed mb-14">{data.whyTrainingFails.body}</p>

        <div className="flex items-center gap-3 mb-4">
          <BarChart3 className="w-5 h-5 text-[#0077B3]" />
          <p className="overline text-[#0077B3]">Measuring Risk</p>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0f1d32] mb-6" style={{ fontFamily: "Outfit" }}>
          {data.measurement.title}
        </h2>
        <p className="text-[#3a5068] text-base leading-relaxed">{data.measurement.body}</p>
      </div>
    </section>
  );
}
