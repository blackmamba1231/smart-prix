// global.d.ts

declare global {
  interface Window {
    gtag: (command: string, action: string, params: Record<string, any>) => void;
  }
}

export {};