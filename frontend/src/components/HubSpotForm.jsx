import { useEffect } from "react";

const HUBSPOT_PORTAL_ID = "51886993";
const HUBSPOT_SCRIPT_SRC = "https://js.hsforms.net/forms/embed/51886993.js";

/**
 * Renders a HubSpot form using the exact embed code supplied by the Veracity
 * team (portal 51886993, region na1). Do not replace this with a hand-rolled
 * HubSpot API integration; the plan is to use these embeds to replace the old
 * Keap forms. The script is loaded once per page load; HubSpot renders the
 * form into the .hs-form-frame div.
 */
export default function HubSpotForm({ formId, testId }) {
  useEffect(() => {
    if (!document.querySelector(`script[src="${HUBSPOT_SCRIPT_SRC}"]`)) {
      const script = document.createElement("script");
      script.src = HUBSPOT_SCRIPT_SRC;
      script.defer = true;
      document.body.appendChild(script);
    }
    // When the script is already loaded (navigating between form pages),
    // HubSpot's embed observes DOM mutations and renders new frames.
  }, []);

  return (
    <div
      className="hs-form-frame"
      data-region="na1"
      data-form-id={formId}
      data-portal-id={HUBSPOT_PORTAL_ID}
      data-testid={testId}
    />
  );
}
