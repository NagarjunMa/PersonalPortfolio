/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useEffect, useRef, useState } from 'react'
import { useSmoothScroll } from '../providers/lenis-provider'
import Image from 'next/image'

const About = () => {
    const sectionRef = useRef<HTMLDivElement>(null)
    const headingRef = useRef<HTMLHeadingElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const [scrollProgress, setScrollProgress] = useState(0)
    const [sectionProgress, setSectionProgress] = useState(0)
    const [isVisible, setIsVisible] = useState(false)
    const [isClient, setIsClient] = useState(false)
    const lenis = useSmoothScroll()

    // Run once on mount to indicate we're on the client
    useEffect(() => {
        setIsClient(true)
    }, [])

    // Handle scroll events with Lenis - similar to Introduction component
    useEffect(() => {
        if (!isClient || !lenis || !sectionRef.current) return;

        const handleScroll = (e : any) => {
            // Get section position
            const rect = sectionRef.current!.getBoundingClientRect()
            const windowHeight = window.innerHeight

            // Calculate overall scroll progress for heading size
            if (rect.top < windowHeight && rect.bottom > 0) {
                setIsVisible(true)

                // This creates a value from 1 (when section first enters view) to 0 (when it's centered)
                const headingProgress = Math.max(0, Math.min(1,
                    (rect.top > 0)
                        ? rect.top / (windowHeight * 0.5)
                        : 0
                ))
                setScrollProgress(headingProgress)

                // Calculate how far through the section we are (0 = just entered, 1 = about to leave)
                const viewportCenter = windowHeight / 2
                const sectionCenter = rect.top + (rect.height / 2)

                // Create a progress value from 0 (section entering) to 1 (section centered) to 0 (section leaving)
                // This creates a bell curve effect where columns are fully visible at section center
                let progress

                if (sectionCenter > viewportCenter) {
                    // Section is entering (top half of screen)
                    progress = 1 - Math.min(1, Math.max(0,
                        (sectionCenter - viewportCenter) / (windowHeight * 0.75)
                    ))
                } else {
                    // Section is leaving (bottom half of screen)
                    progress = 1 - Math.min(1, Math.max(0,
                        (viewportCenter - sectionCenter) / (windowHeight * 0.75)
                    ))
                }

                setSectionProgress(progress)
            } else {
                setIsVisible(false)
                setSectionProgress(0)
                setScrollProgress(rect.top < 0 ? 0 : 1) // Ensure proper heading size
            }
        }

        // Subscribe to Lenis scroll events
        lenis.on('scroll', handleScroll)

        // Initial check
        handleScroll({ scroll: window.scrollY })

        return () => {
            lenis.off('scroll', handleScroll)
        }
    }, [isClient, lenis])

    // Apply scale effects based on scroll position - similar to Introduction component
    useEffect(() => {
        if (!headingRef.current || !isClient) return;

        // Base size is 4.5rem, max size is 8rem
        const fontSize = 4.5 + (scrollProgress * 3.5) // Scale from 8rem down to 4.5rem
        headingRef.current.style.fontSize = `${fontSize}rem`

        // Adjust line height to accommodate larger font
        headingRef.current.style.lineHeight = "1"

        // Keep opacity at full when in view
        headingRef.current.style.opacity = isVisible ? "1" : `${0.5 + scrollProgress * 0.5}`
    }, [scrollProgress, isVisible, isClient])

    // Apply animations based on section progress
    useEffect(() => {
        if (!contentRef.current || !isClient) return;

        // Transform from initial position to final position
        const x = -100 + (sectionProgress * 100)

        // Opacity: 0 when not in view, up to 1 when fully in view
        const opacity = sectionProgress

        // Apply transformations
        contentRef.current.style.transform = `translateX(${x}px)`
        contentRef.current.style.opacity = `${opacity}`
    }, [sectionProgress, isClient])

    return (
        <div
            id="about"
            ref={sectionRef}
            className="min-h-screen bg-[#11212D] py-14 md:py-16 lg:py-20 relative overflow-hidden flex items-center"
        >
            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-[#253745]/20 filter blur-[100px] -translate-x-1/2 -translate-y-1/4"></div>
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-[#064141B]/30 filter blur-[120px] translate-x-1/3 translate-y-1/4"></div>
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <h2
                    ref={headingRef}
                    className="font-fraunces font-bold text-center mb-6 md:mb-10 lg:mb-12 transition-all duration-300"
                    style={{
                        fontSize: '4.5rem', // Start with base size for SSR
                        color: '#ccd0cf',
                        textShadow: `
                            0 0 5px rgba(204, 208, 207, 0.3),
                            0 0 10px rgba(204, 208, 207, 0.2),
                            0 0 15px rgba(204, 208, 207, 0.1)
                        `,
                        transformOrigin: 'center center',
                        lineHeight: '1',
                        transition: 'all 0.3s ease',
                        willChange: 'transform, opacity, font-size'
                    }}
                >
                    About Me
                </h2>

                <div
                    className="max-w-5xl mx-auto backdrop-blur-sm bg-[#253745]/30 rounded-xl overflow-hidden shadow-xl"
                >
                    <div className="p-5 md:p-6 lg:p-8">
                        {/* Content with image and text */}
                        <div
                            ref={contentRef}
                            className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 lg:gap-10 max-w-3xl mx-auto"
                            style={{
                                opacity: isClient ? 0 : 1, // Set initial opacity based on client state
                                transform: 'translateX(0px)', // Start centered for SSR
                            }}
                        >
                            <div className="relative w-48 h-64 md:w-56 md:h-72 lg:w-64 lg:h-80 overflow-hidden rounded-lg shadow-xl flex-shrink-0">
                                <div className="absolute inset-0 bg-gradient-to-t from-[#064141B]/90 via-[#11212D]/30 to-transparent z-10"></div>
                                <Image
                                    src="/images/profilepicture/nagarjun.jpg"
                                    alt="Nagarjun Mallesh"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 12rem, 16rem"
                                    priority
                                />
                            </div>

                            {/* Description beside image on desktop, below on mobile */}
                            <div className="flex-1 max-w-md">
                                <p className="text-[#ccd0cf] font-geist-mono mb-4 leading-relaxed text-lg">
                                    I&apos;m a passionate Full Stack Developer with 3+ years of experience building scalable
                                    applications. My expertise spans React, Node.js, and cloud infrastructure with AWS.
                                </p>
                                <p className="text-[#9ba8ab] font-geist-mono leading-relaxed text-lg">
                                    I love solving complex problems and am always eager to learn and implement new technologies
                                    that push the boundaries of what&apos;s possible.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About