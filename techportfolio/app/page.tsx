import About from "./components/About";
import BlogSection from "./components/BlogSection";
import Contact from "./components/Contact";
import Introduction from "./components/Introduction";

export default function Home() {
  return (
    <main>
      <section id="Introduction">
        <Introduction />
      </section>
      <section id="About">
        <About />
      </section>
      <section id="BlogSection">
        <BlogSection />
      </section>
      <section id="Contact">
        <Contact />
      </section>
    </main>
  );
}
