import { Linkedin } from "lucide-react";
import { TEAM_MEMBERS } from "./aboutUsData";

export default function AboutUsTeam() {
  return (
    <section data-testid="about-us-team" className="py-20 bg-[#0f1d32]">
      <div className="max-w-6xl mx-auto px-6">
        <p className="overline text-[#0077B3] mb-4 text-center">Meet the Team</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-center" style={{ fontFamily: "Outfit" }}>
          The People Behind Veracity
        </h2>
        <p className="text-base text-[#94a8be] leading-relaxed mb-12 max-w-2xl mx-auto text-center">
          A local team in Minnetonka, Minnesota. Real people who know your systems, answer your calls, and take responsibility for your technology.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {TEAM_MEMBERS.map((member) => (
            <div key={member.name} data-testid="about-us-team-member" className="bg-[#0a1628] border border-white/10 rounded-sm p-6 text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#003B71] flex items-center justify-center" aria-label={`Photo placeholder for ${member.name}`}>
                <span className="text-2xl font-bold text-white" style={{ fontFamily: "Outfit" }}>{member.initials}</span>
              </div>
              <h3 className="text-base font-bold text-white mb-1" style={{ fontFamily: "Outfit" }}>{member.name}</h3>
              {member.role && (
                <p className="text-sm text-[#94a8be] mb-3">{member.role}</p>
              )}
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name} on LinkedIn`}
                className="inline-flex items-center gap-1 text-[#0077B3] hover:text-[#00a0e4] text-sm font-semibold transition-colors"
              >
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
