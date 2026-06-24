"use client";

import { ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type PortfolioStageProps = {
  children: ReactNode;
};

export default function PortfolioStage({ children }: PortfolioStageProps) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const cleanups: Array<() => void> = [];
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root);
      const nav = document.querySelector(".site-nav-inner");
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        gsap.set([...q("[data-reveal], .hero-copy > *, .portrait-card, .ticker-strip span"), nav], {
          autoAlpha: 1,
          clearProps: "transform,opacity,visibility",
        });
        return;
      }

      const revealTargets = q("[data-reveal]");

      gsap.set(revealTargets, {
        autoAlpha: 0,
        y: 34,
        scale: 0.985,
        willChange: "transform, opacity",
      });

      const intro = gsap.timeline({
        defaults: { duration: 0.9, ease: "power3.out" },
      });

      intro
        .fromTo(q(".hero-identity"), { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.5 })
        .fromTo(q(".hero-copy .kicker"), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.55 }, "-=0.32")
        .fromTo(q(".hero-title"), { autoAlpha: 0, y: 34, scale: 0.985 }, { autoAlpha: 1, y: 0, scale: 1 }, "-=0.2")
        .fromTo(q(".hero-title span"), { autoAlpha: 0, x: 18 }, { autoAlpha: 1, x: 0, duration: 0.75 }, "-=0.65")
        .fromTo(q(".hero-lede"), { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.7 }, "-=0.45")
        .fromTo(q(".hero-actions .button"), { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, stagger: 0.08, duration: 0.55 }, "-=0.35")
        .fromTo(q(".portrait-card"), { autoAlpha: 0, y: 38, scale: 0.965 }, { autoAlpha: 1, y: 0, scale: 1, duration: 1.05 }, "-=0.85");

      if (nav) {
        intro.fromTo(nav, { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 0.65, ease: "power2.out" }, "-=0.6");
      }

      const introFallback = window.setTimeout(() => {
        intro.progress(1);
      }, 1800);

      gsap.fromTo(
        q(".ticker-strip span"),
        { autoAlpha: 0, y: 16 },
        {
          autoAlpha: 1,
          y: 0,
          stagger: 0.055,
          duration: 0.58,
          ease: "power2.out",
          scrollTrigger: {
            trigger: q(".ticker-strip")[0],
            start: "top 86%",
            once: true,
          },
        },
      );

      ScrollTrigger.batch(revealTargets, {
        start: "top 86%",
        once: true,
        interval: 0.08,
        batchMax: 4,
        onEnter: (batch) => {
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.09,
            clearProps: "willChange",
            overwrite: "auto",
          });
        },
      });

      gsap.to(q(".portrait-image"), {
        yPercent: -4,
        scale: 1.035,
        ease: "none",
        scrollTrigger: {
          trigger: q(".hero-section")[0],
          start: "top top",
          end: "bottom top",
          scrub: 1.1,
        },
      });

      gsap.to(q(".about-card"), {
        y: -14,
        ease: "none",
        scrollTrigger: {
          trigger: q("#about")[0],
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      const hoverCards = q(".timeline-card, .writing-card, .side-card, .contact-card");
      hoverCards.forEach((card) => {
        const enter = () => {
          gsap.to(card, {
            y: -4,
            duration: 0.28,
            ease: "power2.out",
            overwrite: "auto",
          });
        };
        const leave = () => {
          gsap.to(card, {
            y: 0,
            duration: 0.36,
            ease: "power2.out",
            overwrite: "auto",
          });
        };

        card.addEventListener("mouseenter", enter);
        card.addEventListener("mouseleave", leave);
        cleanups.push(() => {
          card.removeEventListener("mouseenter", enter);
          card.removeEventListener("mouseleave", leave);
        });
      });

      return () => {
        window.clearTimeout(introFallback);
        cleanups.forEach((cleanup) => cleanup());
      };
    }, root);

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      ctx.revert();
    };
  }, []);

  return (
    <main ref={rootRef} className="portfolio-stage">
      {children}
    </main>
  );
}
