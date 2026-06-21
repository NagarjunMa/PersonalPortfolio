"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { MotionValue } from "motion/react";

type Project = {
  title: string;
  eyebrow: string;
  problem: string;
  built: string;
  depth: string;
  stack: string[];
  href: string;
};

type ProjectDeckProps = {
  projects: Project[];
};

function useCompactDeck() {
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 900px)");
    const update = () => setIsCompact(media.matches);

    update();
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  return isCompact;
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <>
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
    </>
  );
}

function AnimatedProjectCard({
  project,
  index,
  count,
  progress,
}: {
  project: Project;
  index: number;
  count: number;
  progress: MotionValue<number>;
}) {
  const step = count > 1 ? 1 / (count - 1) : 1;
  const point = index * step;
  const enter = Math.max(0, point - step * 0.66);
  const loaded = Math.max(0, point - step * 0.22);
  const hold = Math.min(1, point + step * 0.22);
  const exit = Math.min(1, point + step * 0.66);
  const isFirst = index === 0;
  const isLast = index === count - 1;

  const y = useTransform(progress, [enter, loaded, hold, exit], [isFirst ? 0 : 96, 0, 0, isLast ? 0 : -96]);
  const scale = useTransform(progress, [enter, loaded, hold, exit], [isFirst ? 1 : 0.92, 1, 1, isLast ? 1 : 0.94]);
  const opacity = useTransform(progress, [enter, loaded, hold, exit], [isFirst ? 1 : 0, 1, 1, isLast ? 1 : 0]);
  const rotateX = useTransform(progress, [enter, loaded, hold, exit], [isFirst ? 0 : 6, 0, 0, isLast ? 0 : -6]);
  const blur = useTransform(progress, [enter, loaded, hold, exit], [isFirst ? 0 : 4, 0, 0, isLast ? 0 : 3]);
  const filter = useTransform(blur, (value) => `blur(${value}px)`);

  return (
    <motion.article
      className={`bento-card project-card cinematic-project-card project-card-${index + 1}`}
      style={{
        y,
        scale,
        opacity,
        rotateX,
        filter,
        zIndex: count - index,
      }}
      aria-label={`${project.title} project card`}
    >
      <ProjectCard project={project} index={index} />
    </motion.article>
  );
}

export default function ProjectDeck({ projects }: ProjectDeckProps) {
  const deckRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isCompact = useCompactDeck();
  const { scrollYProgress } = useScroll({
    target: deckRef,
    offset: ["start start", "end end"],
  });

  if (prefersReducedMotion || isCompact) {
    return (
      <div className="project-deck project-deck-static">
        {projects.map((project, index) => (
          <article
            key={project.title}
            className={`bento-card project-card cinematic-project-card project-card-${index + 1}`}
          >
            <ProjectCard project={project} index={index} />
          </article>
        ))}
      </div>
    );
  }

  return (
    <div className="project-deck-scroll" ref={deckRef} style={{ position: "relative" }}>
      <div className="project-deck-sticky">
        <div className="project-deck-progress" aria-hidden="true">
          <span>Scroll</span>
          <span>0{projects.length}</span>
        </div>
        <div className="project-deck" aria-label="Scroll through live systems">
          {projects.map((project, index) => (
            <AnimatedProjectCard
              key={project.title}
              project={project}
              index={index}
              count={projects.length}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
