const LOGO_CIRCLE = "https://customer-assets.emergentagent.com/job_jobsite-it-secure/artifacts/yo1g9lv0_2.png";

export function LogoDivider({ light = false }) {
  return (
    <div className="flex items-center justify-center py-6">
      <div className="flex-1 h-px bg-white/8" />
      <img
        src={LOGO_CIRCLE}
        alt=""
        aria-hidden="true"
        className={`w-10 h-10 mx-6 object-contain ${light ? "opacity-15 brightness-50" : "opacity-10 brightness-200"}`}
      />
      <div className="flex-1 h-px bg-white/8" />
    </div>
  );
}

export function LogoWatermark({ position = "center" }) {
  const posClass = position === "left" ? "left-8" : position === "right" ? "right-8" : "left-1/2 -translate-x-1/2";
  return (
    <img
      src={LOGO_CIRCLE}
      alt=""
      aria-hidden="true"
      className={`absolute ${posClass} opacity-[0.03] brightness-200 w-64 h-64 object-contain pointer-events-none`}
    />
  );
}
