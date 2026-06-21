import Image from "next/image";
import type { CSSProperties } from "react";
import PortfolioStage from "./components/PortfolioStage";

const projects = [
  {
    title: "Visual Learning",
    eyebrow: "Interactive systems education",
    problem:
      "System design is often taught through static diagrams that hide runtime behavior.",
    built:
      "A client-side simulator with 15 interactive modules across databases, Kafka, TCP, rate limiting, transformer inference, sharding, and scaling patterns.",
    depth:
      "Typed simulation engines, SVG visualizations, live metrics, state-driven controls, and module-level architecture for adding new system internals.",
    stack: ["React", "TypeScript", "Vite", "Tailwind", "Framer Motion", "SVG"],
    href: "https://visual-study.vercel.app",
  },
  {
    title: "Prism Pro",
    eyebrow: "Resume intelligence platform",
    problem:
      "Resume tools either give generic advice or fabricate improvements candidates cannot defend.",
    built:
      "A FastAPI and Next.js platform for resume parsing, recruiter-style evaluation, JD tailoring, versioning, preview, and country-aware PDF export.",
    depth:
      "Schema-constrained LLM responses, hallucination guards, ATS simulation, Supabase auth/storage, credit accounting, and Playwright PDF rendering.",
    stack: ["FastAPI", "SQLAlchemy", "Pydantic", "OpenAI", "Next.js", "Supabase"],
    href: "https://prismpro.live",
  },
  {
    title: "Aletheia",
    eyebrow: "AI outreach assistant + Chrome extension",
    problem:
      "AI outreach often sounds generic, unsafe, or disconnected from real profile context.",
    built:
      "A Chrome MV3 extension and Next.js app that generate grounded LinkedIn notes, cold emails, and InMails from profile context, resume data, and user intent.",
    depth:
      "Prompt guardrails, sanitization, AI-fingerprint stripping, feedback loops, style learning, rate limits, Supabase auth, and Anthropic Claude integration.",
    stack: ["Next.js", "TypeScript", "Chrome MV3", "Supabase", "Claude", "Zod"],
    href: "https://aletheia.live",
  },
];

const caseStudies = [
  {
    title: "Reliable LLM workflows",
    text:
      "Built generation systems where the hard part is not calling a model, but constraining the workflow: typed schemas, prompt versions, safety filters, hallucination guards, credit reservations, rate limits, and feedback metadata.",
    proof: ["Prism Pro", "Aletheia", "OpenAI", "Claude", "Zod", "Pydantic"],
  },
  {
    title: "Making invisible systems visible",
    text:
      "Modeled system-design and infrastructure behavior as interactive state machines: broker failure, leader election, rate-limit algorithms, LSM writes, B+ tree splits, transformer inference, and sharding tradeoffs.",
    proof: ["Visual Learning", "simulation engines", "SVG", "typed state"],
  },
  {
    title: "Productizing ambiguous workflows",
    text:
      "Turned open-ended user problems into complete product flows: upload, parse, evaluate, rewrite, accept changes, export PDFs, browser-extension auth, profile context extraction, and production feedback loops.",
    proof: ["FastAPI", "Next.js", "Supabase", "Playwright", "Chrome extension"],
  },
];

const stackGroups = [
  {
    title: "Languages & runtimes",
    items: ["Python", "TypeScript", "JavaScript", "Java", "Node.js"],
  },
  {
    title: "Backend & APIs",
    items: ["FastAPI", "Spring Boot", "SQLAlchemy", "Pydantic", "REST APIs", "auth", "rate limits"],
  },
  {
    title: "AI systems",
    items: ["OpenAI", "Anthropic Claude", "RAG", "prompt guardrails", "eval metadata", "hallucination controls"],
  },
  {
    title: "Cloud & data",
    items: ["AWS", "Supabase", "PostgreSQL", "Redis", "MongoDB", "DynamoDB", "Docker", "Terraform"],
  },
  {
    title: "Frontend & product",
    items: ["Next.js", "React", "Vite", "Chrome extensions", "Tailwind", "Playwright", "Framer Motion"],
  },
];

const timeline = [
  {
    year: "2025",
    title: "AI, RAG, and automation systems",
    text: "Shipping RAG, LLM text-normalization, FastAPI, AWS Bedrock, and infrastructure automation workflows at ML Technologies.",
  },
  {
    year: "2024",
    title: "Cloud backend and infrastructure",
    text: "Built AWS/GCP storage services, Node.js APIs, RDS integrations, Terraform, Docker, and CloudWatch monitoring for Keelworks.",
  },
  {
    year: "2019-2022",
    title: "Enterprise software engineering",
    text: "Automated HP provisioning workflows and migrated banking services toward Spring Boot microservices with Kafka.",
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

export default function Home() {
  return (
    <PortfolioStage>
      <section id="home" className="portfolio-section hero-section">
        <div className="shell hero-grid">
          <div className="hero-copy bento-card hero-main-card">
            <p className="kicker">Full-stack engineer / applied AI / cloud systems</p>
            <h1 className="hero-title">
              I build applied AI, backend, and cloud systems from ambiguity to{" "}
              <span>production.</span>
            </h1>
            <p className="hero-lede">
              My work sits across Python, TypeScript, FastAPI, Next.js, Supabase,
              AWS, Docker, Terraform, RAG, LLM workflows, and browser automation.
              I focus on grounded systems: reliable APIs, clear architecture,
              safe AI pipelines, and interfaces that make complex workflows
              understandable.
            </p>
            <div className="hero-actions" aria-label="Primary links">
              <a href="#work" className="button button-primary">
                View systems
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
            <div className="portrait-location">
              <p className="card-label">Based in the US</p>
              <p className="card-title">New York, NY. Open to relocation.</p>
            </div>
          </div>

          <div className="hero-proof-grid" aria-label="Engineering focus">
            <span>AI workflow systems</span>
            <span>Backend/API design</span>
            <span>Full-stack product engineering</span>
            <span>Cloud automation</span>
          </div>
        </div>
      </section>

      <section className="ticker-strip" aria-label="Portfolio focus">
        <span>Available for thoughtful engineering work</span>
        <span>Applied AI</span>
        <span>Backend</span>
        <span>Cloud systems</span>
        <span>FDE / product engineering</span>
      </section>

      <section id="work" className="portfolio-section">
        <div className="shell">
          <div className="section-heading" data-reveal>
            <p className="kicker">Live systems</p>
            <h2>
              Systems I have <span>built.</span>
            </h2>
            <p className="section-intro">
              Three shipped products that show the range: simulation engines,
              resume intelligence, and AI outreach automation. The common thread
              is turning complex workflows into usable, defensible systems.
            </p>
          </div>

          <div className="project-deck">
            {projects.map((project, index) => (
              <article
                key={project.title}
                data-reveal
                className={`bento-card project-card cinematic-project-card project-card-${index + 1}`}
                style={{ "--deck-index": index } as CSSProperties}
              >
                <div className="project-card-lead">
                  <p className="project-count">0{index + 1}</p>
                  <p className="card-label">{project.eyebrow}</p>
                  <h3>{project.title}</h3>
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    Visit live project
                  </a>
                </div>

                <div className="project-card-body">
                  <div className="project-meta">
                    <div>
                      <span>Problem</span>
                      <p>{project.problem}</p>
                    </div>
                    <div>
                      <span>Built</span>
                      <p>{project.built}</p>
                    </div>
                    <div>
                      <span>Technical depth</span>
                      <p>{project.depth}</p>
                    </div>
                  </div>

                  <ul className="pill-list project-stack" aria-label={`${project.title} stack`}>
                    {project.stack.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="cases" className="portfolio-section">
        <div className="shell">
          <div className="section-heading compact-heading" data-reveal>
            <p className="kicker">Case studies</p>
            <h2>
              Engineering judgment, not just <span>demos.</span>
            </h2>
          </div>

          <div className="case-grid">
            {caseStudies.map((study, index) => (
              <article key={study.title} className="bento-card case-card" data-reveal>
                <p className="case-index">0{index + 1}</p>
                <h3>{study.title}</h3>
                <p>{study.text}</p>
                <ul className="pill-list" aria-label={`${study.title} proof`}>
                  {study.proof.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="portfolio-section">
        <div className="shell about-grid">
          <div className="section-heading sticky-heading" data-reveal>
            <p className="kicker">Engineering arc</p>
            <h2>
              Useful before impressive. Reliable before <span>clever.</span>
            </h2>
          </div>

          <div className="about-stack">
            <article className="bento-card about-card" data-reveal>
              <p className="about-index">(02)</p>
              <p className="about-statement">
                I like the work between possibility and production: clarifying
                messy requirements, choosing the right technical boundary, and
                building systems that teams can operate without guesswork.
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

      <section id="stack" className="portfolio-section">
        <div className="shell">
          <div className="section-heading compact-heading" data-reveal>
            <p className="kicker">Stack</p>
            <h2>
              Tools I use to <span>ship.</span>
            </h2>
          </div>

          <div className="stack-groups">
            {stackGroups.map((group) => (
              <article key={group.title} className="bento-card stack-group" data-reveal>
                <h3>{group.title}</h3>
                <ul className="pill-list">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="blog" className="portfolio-section writing-section">
        <div className="shell writing-grid">
          <div className="bento-card writing-feature" data-reveal>
            <p className="kicker">Technical writing</p>
            <h2>
              Writing to make systems easier to <span>understand.</span>
            </h2>
            <p>
              I write and build visual explanations around document extraction,
              LLM workflows, system design, developer tools, and the engineering
              choices that make emerging technology approachable.
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

      <section id="contact" className="portfolio-section contact-section">
        <div className="shell contact-grid">
          <div data-reveal>
            <p className="kicker">Contact</p>
            <h2 className="contact-title">
              Available for full-stack, backend, AI product, FDE, and cloud
              systems roles.
            </h2>
          </div>

          <div className="bento-card contact-card" data-reveal>
            <p>
              Best fit: teams that need someone to translate ambiguous technical
              problems into reliable APIs, AI workflows, product surfaces, and
              infrastructure automation.
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
