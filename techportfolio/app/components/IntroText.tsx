"use client"

import { animate, stagger } from "motion"
import { splitText } from "motion-plus"
import { useEffect, useRef, useState } from "react"

export default function SplitText() {
    const containerRef = useRef<HTMLDivElement>(null)
    const highlightRef = useRef<HTMLSpanElement>(null)
    const [isClient, setIsClient] = useState(false)

    // Run once on mount to indicate we're on the client
    useEffect(() => {
        setIsClient(true)
    }, [])

    // Run animation only after hydration
    useEffect(() => {
        if (!isClient || !containerRef.current) return

        document.fonts.ready.then(() => {
            // Hide the container until the fonts are loaded
            containerRef.current!.style.visibility = "visible"

            // Individual parts to animate separately
            const parts = containerRef.current!.querySelectorAll(".animate-part")

            parts.forEach((part, index) => {
                const { words } = splitText(part)

                // Base delay for this part
                const baseDelay = index * 0.2

                // Animate the words in each part
                animate(
                    words,
                    { opacity: [0, 1], y: [10, 0] },
                    {
                        type: "spring",
                        duration: 2,
                        bounce: 0,
                        delay: stagger(0.05), // Just use stagger without adding
                    }
                )

                // Apply the base delay to all the words
                words.forEach(word => {
                    word.style.animationDelay = `${baseDelay}s`;
                })
            })

            // Animate the wave emoji with a special effect
            const waveEmoji = containerRef.current!.querySelector(".wave-emoji")
            if (waveEmoji) {
                let angle = 0;
                let direction = 1;
                let count = 0;

                const waveInterval = setInterval(() => {
                    angle += 15 * direction;

                    if (angle >= 15 || angle <= -15) {
                        direction *= -1;
                    }

                    (waveEmoji as HTMLElement).style.transform = `rotate(${angle}deg)`;

                    count++;
                    if (count > 8) { // 4 movements back and forth
                        clearInterval(waveInterval);
                        (waveEmoji as HTMLElement).style.transform = 'rotate(0deg)';
                    }
                }, 150);
            }

            // Animate the highlight separately
            if (highlightRef.current) {
                animate(
                    highlightRef.current,
                    { opacity: [0, 1], y: [10, 0] },
                    {
                        type: "spring",
                        duration: 2,
                        bounce: 0,
                        delay: 0.5,
                    }
                )
            }
        })
    }, [isClient])

    return (
        <div className="container" ref={containerRef} style={{ visibility: isClient ? "hidden" : "visible" }}>
            <h1 className="text-2xl font-fraunces font-bold text-4xl md:text-4xl leading-tight">
                <div className="first-line">
                    <span className="animate-part">Hi there!</span>{" "}
                    <span className="wave-emoji inline-block origin-bottom-right">👋</span>
                    <br />
                    <span className="animate-part">Nagarjun</span>{" "}
                    <span className="animate-part">Mallesh,</span>
                </div>
                <br />
                <span
                    ref={highlightRef}
                    className="highlight-text"
                    style={{
                        color: "#00ADF4",
                        opacity: isClient ? 0 : 1
                    }}
                >
                    Fullstack engineer crafting scalable, innovative solutions.
                </span>
            </h1>
            <style jsx>{`
                .container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    max-width: 420px;
                    text-align: left;
                }

                .split-word {
                    will-change: transform, opacity;
                }
                
                h1 span {
                    display: inline-block;
                }
                
                .highlight-text {
                    will-change: transform, opacity;
                }
                
                .wave-emoji {
                    will-change: transform;
                    transform-origin: bottom right;
                }
                
                /* Add explicit whitespace using CSS */
                .animate-part + .animate-part {
                    margin-left: 0.25em;
                }
            `}</style>
        </div>
    )
}