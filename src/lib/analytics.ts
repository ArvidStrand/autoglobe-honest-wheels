declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

// Public GA4 measurement ID (same value as GOOGLE_ANALYTICS_MEASUREMENT_ID).
// Hardcoded so the tag is baked into the static HTML on every host (incl. Netlify).
export const GA_MEASUREMENT_ID = "G-PWRSZXMVF2";

let initialized = false;

export function initGoogleAnalytics(measurementId: string) {
  if (initialized || typeof window === "undefined") return;
  initialized = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  };
  window.gtag("js", new Date());
  // send_page_view: false — we send page_view manually so SPA
  // navigations are tracked exactly once per route change.
  window.gtag("config", measurementId, { send_page_view: false });
  trackPageView(window.location.pathname + window.location.search);
}

export function trackPageView(path: string) {
  if (!window.gtag) return;
  window.gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}
