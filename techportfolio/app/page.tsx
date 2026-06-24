import Image from "next/image";
import type { IconType } from "react-icons";
import {
  SiAmazonapigateway,
  SiAmazoncloudwatch,
  SiAmazondynamodb,
  SiAmazonec2,
  SiAmazonrds,
  SiAmazons3,
  SiAmazonwebservices,
  SiApachekafka,
  SiClaude,
  SiDocker,
  SiExpress,
  SiFastapi,
  SiGo,
  SiHuggingface,
  SiJavascript,
  SiMongodb,
  SiNodedotjs,
  SiOpenai,
  SiOpenjdk,
  SiPostgresql,
  SiPython,
  SiRedis,
  SiSpringboot,
  SiTerraform,
  SiTypescript,
} from "react-icons/si";
import { TbApi, TbBinaryTree, TbBrain, TbCloudCog, TbDatabase, TbRoute, TbTerminal2 } from "react-icons/tb";
import PortfolioStage from "./components/PortfolioStage";
import ProjectDeck from "./components/ProjectDeck";

type StackItem = {
  name: string;
  icon: IconType;
};

type StackGroup = {
  title: string;
  icon: IconType;
  items: StackItem[];
};

const projects = [
  {
    title: "Visual Learning",
    eyebrow: "Interactive systems education",
    problem:
      "System design topics are often explained with static diagrams that hide runtime behavior, failure modes, and the tradeoffs engineers actually debug.",
    built:
      "A client-side simulator with interactive modules across databases, Kafka, TCP, rate limiting, transformer inference, sharding, and scaling patterns.",
    depth:
      "Typed simulation engines, state-driven controls, SVG visualizations, live metrics, and module-level architecture for adding new system internals.",
    impact:
      "Turns abstract infrastructure concepts into inspectable systems for engineers who learn better by watching behavior unfold.",
    stack: ["React", "TypeScript", "Vite", "Tailwind", "Framer Motion", "SVG"],
    href: "https://visual-study.vercel.app",
  },
  {
    title: "Prism Pro",
    eyebrow: "Resume intelligence platform",
    problem:
      "Resume tools either give generic advice or fabricate improvements candidates cannot defend in interviews.",
    built:
      "A FastAPI and Next.js platform for resume parsing, recruiter-style evaluation, JD tailoring, versioning, preview, and country-aware PDF export.",
    depth:
      "Schema-constrained LLM responses, hallucination guards, ATS simulation, Supabase auth/storage, credit accounting, and Playwright PDF rendering.",
    impact:
      "Helps candidates improve documents with evidence they can explain, not model-generated polish that collapses under scrutiny.",
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
    impact:
      "Keeps personalization grounded in visible context while giving users faster drafts they can still review and own.",
    stack: ["Next.js", "TypeScript", "Chrome MV3", "Supabase", "Claude", "Zod"],
    href: "https://aletheia.live",
  },
];

const engineeringSpectrum = [
  {
    title: "Enterprise Provisioning & Automation",
    text:
      "Automated BIOS configuration, OS deployment, and HP hardware provisioning workflows, reducing manual setup from days to minutes and supporting enterprise device rollout at scale.",
    proof: ["PowerShell", "React", "Node.js", "BIOS config", "OS deployment", "100K+ machines"],
  },
  {
    title: "Cloud Backend Infrastructure",
    text:
      "Built hybrid AWS/GCP storage flows, event-driven processing, RDS-backed schemas, containerized Node.js services, and CloudWatch observability for production backend systems.",
    proof: ["AWS/GCP", "Lambda", "EventBridge", "RDS Multi-AZ", "Docker/ECR", "Terraform"],
  },
  {
    title: "Applied AI & RAG Systems",
    text:
      "Designed RAG and LLM workflows with AWS Bedrock, hybrid retrieval, RAGAS evaluation, prompt templates, and text normalization for client-facing business workflows.",
    proof: ["Bedrock", "Claude", "LangChain", "RAGAS", "FAISS", "Sentence Transformers"],
  },
];

const stackGroups: StackGroup[] = [
  {
    title: "Languages",
    icon: SiPython,
    items: [
      { name: "Python", icon: SiPython },
      { name: "TypeScript", icon: SiTypescript },
      { name: "JavaScript", icon: SiJavascript },
      { name: "Java", icon: SiOpenjdk },
      { name: "Go", icon: SiGo },
      { name: "Bash", icon: TbTerminal2 },
      { name: "PowerShell", icon: TbTerminal2 },
    ],
  },
  {
    title: "Backend",
    icon: TbApi,
    items: [
      { name: "FastAPI", icon: SiFastapi },
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Express", icon: SiExpress },
      { name: "Spring Boot", icon: SiSpringboot },
      { name: "REST APIs", icon: TbApi },
      { name: "microservices", icon: TbRoute },
    ],
  },
  {
    title: "Cloud infra",
    icon: TbCloudCog,
    items: [
      { name: "AWS Lambda", icon: SiAmazonwebservices },
      { name: "EC2", icon: SiAmazonec2 },
      { name: "S3", icon: SiAmazons3 },
      { name: "API Gateway", icon: SiAmazonapigateway },
      { name: "RDS", icon: SiAmazonrds },
      { name: "CloudWatch", icon: SiAmazoncloudwatch },
      { name: "EventBridge", icon: SiAmazonwebservices },
      { name: "Terraform", icon: SiTerraform },
      { name: "Docker", icon: SiDocker },
    ],
  },
  {
    title: "Data",
    icon: TbDatabase,
    items: [
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "MongoDB", icon: SiMongodb },
      { name: "Redis", icon: SiRedis },
      { name: "DynamoDB", icon: SiAmazondynamodb },
      { name: "Kafka", icon: SiApachekafka },
    ],
  },
  {
    title: "AI systems",
    icon: TbBrain,
    items: [
      { name: "RAG", icon: TbBinaryTree },
      { name: "AWS Bedrock", icon: SiAmazonwebservices },
      { name: "Claude", icon: SiClaude },
      { name: "Hugging Face", icon: SiHuggingface },
      { name: "FAISS", icon: TbDatabase },
      { name: "Sentence Transformers", icon: SiHuggingface },
      { name: "RAGAS", icon: SiOpenai },
    ],
  },
];

const timeline = [
  {
    year: "2025",
    title: "Applied AI and RAG systems",
    text: "Designed Bedrock RAG pipelines, hybrid retrieval, RAGAS evaluation, prompt templates, and LLM text normalization workflows at ML Technologies.",
  },
  {
    year: "2024",
    title: "Cloud backend and infrastructure",
    text: "Built AWS/GCP storage services, RDS Multi-AZ schemas, Lambda/EventBridge processing, Dockerized Node.js services, and CloudWatch observability.",
  },
  {
    year: "2019-2022",
    title: "Enterprise automation and services",
    text: "Automated BIOS configuration, OS deployment, provisioning dashboards, and Spring Boot/Kafka service migration work across enterprise environments.",
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
            <p className="kicker">Applied AI FDE / backend / cloud automation</p>
            <h1 className="hero-title">
              I build backend, cloud, automation, and applied AI systems from messy workflows to{" "}
              <span>production-grade software.</span>
            </h1>
            <p className="hero-lede">
              Across my work, the through line has been automation: improving
              efficiency, reducing manual error, and turning operational
              complexity into reliable software. I build across BIOS and OS
              provisioning, cloud-native backend infrastructure, and RAG/LLM
              workflows with the six AWS Well-Architected pillars in mind.
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
            <span>Enterprise automation</span>
            <span>Backend/cloud systems</span>
            <span>Applied AI/RAG</span>
            <span>Product engineering</span>
          </div>
        </div>
      </section>

      <section className="ticker-strip" aria-label="Portfolio focus">
        <span>Available for thoughtful engineering work</span>
        <span>Enterprise automation</span>
        <span>Applied AI</span>
        <span>Backend</span>
        <span>Cloud systems</span>
      </section>

      <section id="work" className="portfolio-section">
        <div className="shell">
          <div className="section-heading" data-reveal>
            <p className="kicker">Live systems</p>
            <h2>
              Systems I have <span>built.</span>
            </h2>
            <p className="section-intro">
              Three live systems that extend the same engineering pattern:
              clarify the workflow, define the system boundary, and make the
              result usable enough for people to trust.
            </p>
          </div>

          <ProjectDeck projects={projects} />
        </div>
      </section>

      <section id="stack" className="portfolio-section">
        <div className="shell">
          <div className="section-heading compact-heading" data-reveal>
            <p className="kicker">Technical stack</p>
            <h2>Tools and systems I work with.</h2>
          </div>

          <div className="stack-groups">
            {stackGroups.map((group) => {
              const GroupIcon = group.icon;

              return (
                <article key={group.title} className="bento-card stack-group" data-reveal>
                  <div className="stack-title-row">
                    <span className="stack-icon" aria-hidden="true">
                      <GroupIcon />
                    </span>
                    <h3>{group.title}</h3>
                  </div>
                  <ul className="pill-list stack-pill-list">
                    {group.items.map((item) => {
                      const ItemIcon = item.icon;

                      return (
                        <li key={item.name}>
                          <ItemIcon className="stack-pill-icon" aria-hidden="true" />
                          {item.name}
                        </li>
                      );
                    })}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="cases" className="portfolio-section">
        <div className="shell">
          <div className="section-heading compact-heading" data-reveal>
            <p className="kicker">Engineering spectrum</p>
            <h2>Enterprise systems to applied AI.</h2>
            <p className="section-intro">
              The throughline is not a single framework. It is building reliable
              software around messy operational workflows, infrastructure
              constraints, and emerging AI capabilities.
            </p>
          </div>

          <div className="case-grid">
            {engineeringSpectrum.map((study, index) => (
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
              Useful before impressive. Operable before <span>clever.</span>
            </h2>
          </div>

          <div className="about-stack">
            <article className="bento-card about-card" data-reveal>
              <p className="about-index">(02)</p>
              <p className="about-statement">
                My work has moved across enterprise automation, cloud backend
                systems, and applied AI products. I have worked on provisioning
                workflows, service migrations, infrastructure-backed APIs, and
                LLM-powered systems where correctness, usability, and
                operational clarity matter.
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

      <section id="blog" className="portfolio-section writing-section">
        <div className="shell writing-grid">
          <div className="bento-card writing-feature" data-reveal>
            <p className="kicker">Writing and learning</p>
            <h2>
              Writing to clarify what I am <span>learning.</span>
            </h2>
            <p>
              I write to clarify what I am learning and share practical notes
              with other engineers. My writing explores backend systems, AI
              workflows, automation, and the implementation tradeoffs I
              encounter while building.
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
              Available for applied AI FDE, full-stack systems, backend, and
              cloud automation roles.
            </h2>
          </div>

          <div className="bento-card contact-card" data-reveal>
            <p>
              Best fit: teams that need someone to translate ambiguous technical
              problems into reliable APIs, applied AI workflows, product
              surfaces, and infrastructure automation.
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
