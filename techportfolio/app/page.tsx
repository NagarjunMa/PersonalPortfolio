"use client";

import About from "./components/About";
import Contact from "./components/Contact";
import Introduction from "./components/Introduction";
import BlogSection from "./components/BlogSection";
import { useEffect } from "react";

export default function Home() {
  // Add key to force remount
  const mountKey = "main-content";

  // Debug IDs on mount
  useEffect(() => {
    // Check if all section IDs exist
    const sections = ['home', 'about', 'blog', 'contact'];
    sections.forEach(id => {
      const element = document.getElementById(id);
      console.log(`Section "${id}" exists: ${!!element}`);
    });
  }, []);

  return (
    <main key={mountKey}>
      {/* Remove id from wrapper sections if components have their own ids */}
      <section id="home" className="relative">
        <Introduction />
      </section>
      <About />
      <BlogSection />
      <Contact />
    </main>
  );
}
