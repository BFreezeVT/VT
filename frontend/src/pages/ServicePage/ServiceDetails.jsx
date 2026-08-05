export default function ServiceDetails({ svc }) {
  return (
    <section data-testid="service-page-details" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <p className="overline text-[#0077B3] mb-4">What's Included</p>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0f1d32] mb-10" style={{ fontFamily: "Outfit" }}>
          {svc.name} - service details
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {svc.details.map((d, i) => (
            <li key={d} data-testid={`service-detail-${i}`} className="flex items-start gap-2 text-[#3a5068] text-sm leading-relaxed">
              <span className="text-[#0077B3] mt-0.5 flex-shrink-0">&#10003;</span>
              {d}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
