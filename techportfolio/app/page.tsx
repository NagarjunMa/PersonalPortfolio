import Image from "next/image";
import PortfolioStage from "./components/PortfolioStage";

const projects = [
  {
    title: "Visual Learning",
    eyebrow: "Live system design simulator",
    summary:
      "Interactive simulations that make system design, database internals, AI, networking, Kafka, rate limiting, and sharding visible instead of theoretical.",
    stack: ["React", "TypeScript", "Vite", "SVG simulations"],
    metric: "15",
    metricLabel: "interactive learning modules",
    href: "https://visual-study.vercel.app",
  },
  {
    title: "Prism Pro",
    eyebrow: "Live resume intelligence platform",
    summary:
      "Recruiter-grade resume polish and JD tailoring for experienced SWE, Data Science, and PM candidates across US and India markets.",
    stack: ["Next.js", "FastAPI", "Supabase", "OpenAI"],
    metric: "6",
    metricLabel: "country-aware PDF templates",
    href: "https://prismpro.live",
  },
  {
    title: "Aletheia",
    eyebrow: "Live AI outreach system",
    summary:
      "A web app and Chrome extension that reads profile context, resume intent, and guardrails to generate authentic outreach without sounding synthetic.",
    stack: ["Next.js", "Supabase", "Claude", "Chrome MV3"],
    metric: "3",
    metricLabel: "outreach surfaces",
    href: "https://aletheia.live",
  },
];

const skills = [
  "Python",
  "TypeScript",
  "FastAPI",
  "Node.js",
  "Spring Boot",
  "AWS Lambda",
  "AWS Bedrock",
  "Terraform",
  "Docker",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "DynamoDB",
  "Kafka",
  "RAG",
  "LLMs",
  "FAISS",
  "CloudWatch",
];

const timeline = [
  {
    year: "2025",
    title: "Systems Analyst",
    text: "Software engineering for RAG, LLM text-normalization, FastAPI, Bedrock, and infrastructure automation at ML Technologies.",
  },
  {
    year: "2024",
    title: "Backend Engineer",
    text: "Built AWS/GCP storage, Node.js services, RDS, Terraform, Docker, and CloudWatch monitoring for Keelworks.",
  },
  {
    year: "2019-2022",
    title: "Software Engineer",
    text: "Automated HP provisioning workflows and earlier migrated banking services to Spring Boot microservices with Kafka.",
  },
];

const writing = [
  {
    title: "The Quiet Revolution in Document Extraction",
    source: "Substack",
    date: "Feb 18, 2026",
    href: "https://nagarjunm.substack.com/p/the-quiet-revolution-in-document",
  },
  {
    title: "From Token Tears to Triumphant Code",
    source: "Medium",
    date: "Nov 17, 2025",
    href: "https://medium.com/@nagarjunmallesh/from-token-tears-to-triumphant-code-my-journey-to-mastering-claudes-codebase-521eca1fb5a0",
  },
  {
    title: "Is My Spotify Web Player Broken?",
    source: "Substack",
    date: "Jan 16, 2026",
    href: "https://nagarjunm.substack.com/p/is-my-spotify-web-player-broken",
  },
];

const sideQuests = [
  "Obsidian - knowledge graph",
  "Corpus-grounded RAG triage agent",
  "RunPod serverless GPU benchmark",
];

export default function Home() {
  return (
    <PortfolioStage>
      <section id="home" className="portfolio-section hero-section">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="kicker">Software engineer / cloud systems / GenAI</p>
            <h1 className="hero-title">
              Nagarjun <span>Mallesh.</span>
            </h1>
            <p className="hero-lede">
              I build backend, cloud, automation, and AI-enabled systems with a
              bias for reliable workflows, clear architecture, and measurable
              operational impact.
            </p>
            <div className="hero-actions" aria-label="Primary links">
              <a href="#work" className="button button-primary">
                View work
              </a>
              <a
                href="/documents/NagarjunMallesh.pdf"
                className="button button-secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Resume
              </a>
            </div>
          </div>

          <div className="portrait-card bento-card">
            <Image
              src="/images/profilepicture/nagarjun.jpg"
              alt="Nagarjun Mallesh"
              width={520}
              height={680}
              priority
              className="portrait-image"
            />
            <div>
              <p className="card-label">Based in the US</p>
              <p className="card-title">New York, NY. Open to relocation.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="ticker-strip" aria-label="Portfolio focus">
        <span>Available for thoughtful engineering work</span>
        <span>Backend</span>
        <span>Cloud</span>
        <span>AI integration</span>
        <span>Product-minded systems</span>
      </section>

      <section id="work" className="portfolio-section">
        <div className="shell">
          <div className="section-heading" data-reveal>
            <p className="kicker">Selected work</p>
            <h2>
              Work that proves the <span>range.</span>
            </h2>
          </div>

          <div className="bento-grid work-grid">
            {projects.map((project, index) => (
              <article
                key={project.title}
                data-reveal
                className={`bento-card project-card project-card-${index + 1}`}
              >
                <div>
                  <p className="card-label">{project.eyebrow}</p>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                </div>
                <div className="project-footer">
                  <div className="metric">
                    <strong>{project.metric}</strong>
                    <span>{project.metricLabel}</span>
                  </div>
                  <ul className="pill-list" aria-label={`${project.title} stack`}>
                    {project.stack.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    Visit live project
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="portfolio-section">
        <div className="shell about-grid">
          <div className="section-heading sticky-heading" data-reveal>
            <p className="kicker">The arc</p>
            <h2>
              Builder first, designer of systems <span>second.</span>
            </h2>
          </div>

          <div className="about-stack">
            <article className="bento-card about-card" data-reveal>
              <p className="about-index">(02)</p>
              <p className="about-statement">
                I build useful systems across AI, cloud, and full-stack product
                engineering.
                <br />
                I turn complex architecture into tools people can understand,
                operate, and <span>trust.</span>
                <br />
                Curiosity starts the work; production discipline finishes it.
              </p>
            </article>

            <div className="timeline-grid">
              {timeline.map((item) => (
                <article key={item.year} className="bento-card timeline-card" data-reveal>
                  <p className="timeline-year">{item.year}</p>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="portfolio-section">
        <div className="shell">
          <div className="section-heading compact-heading" data-reveal>
            <p className="kicker">The toolkit</p>
            <h2>
              Technical range, kept <span>legible.</span>
            </h2>
          </div>

          <div className="toolkit-grid">
            {skills.map((skill) => (
              <span key={skill} data-reveal>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="blog" className="portfolio-section writing-section">
        <div className="shell writing-grid">
          <div className="bento-card writing-feature" data-reveal>
            <p className="kicker">Writing</p>
            <h2>
              Notes from the workbench, not a content <span>machine.</span>
            </h2>
            <p>
              I write and build around visual learning: simulations, architecture
              notes, and small explanations that make complex systems easier to
              see, test, and reason about.
            </p>
            <div className="writing-actions">
              <a
                href="https://medium.com/@nagarjunmallesh"
                target="_blank"
                rel="noopener noreferrer"
                className="button button-secondary"
              >
                Medium
              </a>
              <a
                href="https://nagarjunm.substack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="button button-secondary"
              >
                Substack
              </a>
            </div>
          </div>

          <div className="writing-list">
            {writing.map((post) => (
              <a
                key={post.title}
                href={post.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bento-card writing-card"
                data-reveal
              >
                <span>
                  <small>
                    {post.source} / {post.date}
                  </small>
                  {post.title}
                </span>
                <span aria-hidden="true">Read</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="portfolio-section">
        <div className="shell">
          <div className="section-heading compact-heading" data-reveal>
            <p className="kicker">Side quests</p>
            <h2>
              Small explorations keep the craft <span>warm.</span>
            </h2>
          </div>

          <div className="side-grid">
            {sideQuests.map((quest, index) => (
              <article
                key={quest}
                className={`bento-card side-card side-${index + 1}`}
                data-reveal
              >
                <span className="side-index">0{index + 1}</span>
                <h3>{quest}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="portfolio-section contact-section">
        <div className="shell contact-grid">
          <div data-reveal>
            <p className="kicker">Contact</p>
            <h2 className="contact-title">
              Let&apos;s build <span>quietly excellent</span> systems.
            </h2>
          </div>

          <div className="bento-card contact-card" data-reveal>
            <p>
              Best for backend, cloud, AI integration, full-stack product, and
              infrastructure automation work that needs both taste and
              production discipline.
            </p>
            <div className="contact-links">
              <a href="mailto:nagarjunmallesh@gmail.com">Email</a>
              <a
                href="https://linkedin.com/in/nagarjun-mallesh"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/NagarjunMa"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>
    </PortfolioStage>
  );
}
