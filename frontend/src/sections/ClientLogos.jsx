import { Star } from "lucide-react";

const clients = [
  { name: "BLD Connection", logo: "https://transform.octanecdn.com/fitLogo/200x200/https://octanecdn.com/veracitytechcom/veracitytechcom_516099152.jpg" },
  { name: "Fraser Morris", logo: "https://transform.octanecdn.com/fitLogo/200x200/https://octanecdn.com/veracitytechcom/veracitytechcom_120011449.jpg" },
  { name: "Athena Actuarial", logo: "https://transform.octanecdn.com/fitLogo/200x200/https://octanecdn.com/veracitytechcom/veracitytechcom_562997764.jpg" },
  { name: "iSpace Environments", logo: "https://transform.octanecdn.com/fitLogo/200x200/https://octanecdn.com/veracitytechcom/veracitytechcom_323256330.jpg" },
  { name: "Prestige Global", logo: "https://transform.octanecdn.com/fitLogo/200x200/https://octanecdn.com/veracitytechcom/veracitytechcom_887369454.jpg" },
  { name: "VIA Actuarial", logo: "https://transform.octanecdn.com/fitLogo/200x200/https://octanecdn.com/veracitytechcom/veracitytechcom_401836330.jpg" },
  { name: "Juut SalonSpa", logo: "https://transform.octanecdn.com/fitLogo/200x200/https://octanecdn.com/veracitytechcom/veracitytechcom_516649850.jpg" },
  { name: "Kingdom Legacy Advisors", logo: "https://transform.octanecdn.com/fitLogo/200x200/https://octanecdn.com/veracitytechcom/veracitytechcom_777267656.jpg" },
  { name: "North Sky Capital", logo: "https://transform.octanecdn.com/fitLogo/200x200/https://octanecdn.com/veracitytechcom/veracitytechcom_215968298.jpg" },
  { name: "Hempel Companies", logo: "https://transform.octanecdn.com/fitLogo/200x200/https://octanecdn.com/veracitytechcom/veracitytechcom_680591936.jpg" },
];

export default function ClientLogos() {
  return (
    <section data-testid="client-logos-section" className="py-10 bg-[#0f1d32] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-[#94a8be] text-xs uppercase tracking-[0.2em] mb-6">Clients We Work With</p>
        <div className="flex flex-wrap items-center justify-center gap-8">
          {clients.map((c) => (
            <img
              key={c.name}
              src={c.logo}
              alt={c.name}
              className="h-10 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
