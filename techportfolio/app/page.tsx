"use client";

import About from "./components/About";
import Contact from "./components/Contact";
import Introduction from "./components/Introduction";
import BlogSection from "./components/BlogSection";

export default function Home() {
  return (
    <main>
      <section id="home" className="relative">
        <Introduction />
      </section>
      <About />
      <BlogSection />
      <Contact />
    </main>
  );
}
