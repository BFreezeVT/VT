import { LayoutGrid } from "lucide-react";
import { assessmentAreas } from "./businessTechAssessmentData";

export default function BTAAreasGrid() {
  return (
    <section data-testid="bta-areas" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-3 justify-center mb-8">
          <LayoutGrid className="w-5 h-5 text-[#0077B3]" />
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0f1d32]" style={{ fontFamily: "Outfit" }}>12 Areas We Assess</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {assessmentAreas.map((area, i) => (
            <div key={area} data-testid={`bta-area-${i}`} className="border border-[#0077B3]/15 bg-[#0077B3]/5 rounded-md p-4 text-center">
              <p className="text-[#0f1d32] text-sm font-semibold">{area}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
