"use client";

import 'react-toastify/dist/ReactToastify.css';
import { Header1 } from "@/components/blocks/header1";
import { Hero3 } from "@/components/blocks/hero3";
import { Testimonials1 } from "@/components/blocks/testimonials1";
import { Feature7 } from "@/components/blocks/feature7";
import { Blog1 } from "@/components/blocks/blog1";
import { FAQ1 } from "@/components/blocks/faq1";
import Help from "@/components/blocks/help";
import { Footer1 } from "@/components/blocks/footer1";
import { ThemeProvider } from "@/components/theme-provider";

export default function Home() {
  return (
    <ThemeProvider>
      <div className="bg-white text-black dark:bg-gray-900 dark:text-white">
        <Header1 />
        <Hero3 />
        <Blog1 />
        <Feature7 />
        <Testimonials1 />
        <Help />
        <FAQ1 />
        <Footer1 />
      </div>
    </ThemeProvider>
  );
}
