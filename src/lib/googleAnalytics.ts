export const trackEvent = (action: string, params: Record<string, number>) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", action, params);
    }
  };
  