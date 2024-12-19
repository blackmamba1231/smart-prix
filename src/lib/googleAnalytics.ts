export const trackEvent = (action: string, params: Record<string, Number>) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", action, params);
    }
  };
  