"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextThemesProvider
      attribute="class" // Uses the `class` attribute to apply dark mode
      defaultTheme="system" // Defaults to system theme (respects OS preference)
      enableSystem // Enables system-based theming
    >
      {children}
    </NextThemesProvider>
  );
}
