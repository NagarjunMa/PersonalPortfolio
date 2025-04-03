"use client"

import React, { useEffect, useRef, useState } from 'react'
import { useSmoothScroll } from '../providers/lenis-provider'
import Image from 'next/image'
import { FaFileDownload } from 'react-icons/fa'

const About = () => {
    const sectionRef = useRef<HTMLDivElement>(null)
    const headingRef = useRef<HTMLHeadingElement>(null)
    const leftColumnRef = useRef<HTMLDivElement>(null)
    const rightColumnRef = useRef<HTMLDivElement>(null)
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

        const handleScroll = (e: any) => {
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
        if (!headingRef.current) return;

        // Base size is 4.5rem, max size is 8rem
        const fontSize = 4.5 + (scrollProgress * 3.5) // Scale from 8rem down to 4.5rem
        headingRef.current.style.fontSize = `${fontSize}rem`

        // Adjust line height to accommodate larger font
        headingRef.current.style.lineHeight = "1"

        // Keep opacity at full when in view
        headingRef.current.style.opacity = isVisible ? "1" : `${0.5 + scrollProgress * 0.5}`
    }, [scrollProgress, isVisible])

    // Apply column animations based on section progress
    useEffect(() => {
        if (!leftColumnRef.current || !rightColumnRef.current) return;

        // Transform columns based on section progress
        // Max movement: 100px from each side
        const leftX = -100 + (sectionProgress * 100)
        const rightX = 100 - (sectionProgress * 100)

        // Opacity: 0 when not in view, up to 1 when fully in view
        const opacity = sectionProgress

        // Apply transformations
        leftColumnRef.current.style.transform = `translateX(${leftX}px)`
        leftColumnRef.current.style.opacity = `${opacity}`

        rightColumnRef.current.style.transform = `translateX(${rightX}px)`
        rightColumnRef.current.style.opacity = `${opacity}`
    }, [sectionProgress])

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
                    className="font-bold text-center mb-6 md:mb-10 lg:mb-12 transition-all duration-300"
                    style={{
                        fontSize: '8rem', // Start large (will be overridden by JS)
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                        {/* Left Column - Image - Direct style control */}
                        <div
                            ref={leftColumnRef}
                            className="flex justify-center items-center bg-[#064141B]/40 p-5 md:p-6 lg:p-8"
                            style={{
                                transform: 'translateX(-100px)', // Initial position, will be updated by JS
                                opacity: 0, // Initial opacity, will be updated by JS
                                transition: 'transform 0.3s ease-out, opacity 0.3s ease-out',
                                willChange: 'transform, opacity'
                            }}
                        >
                            <div className="relative w-full max-w-sm aspect-[3/4] overflow-hidden rounded-lg shadow-xl">
                                <div className="absolute inset-0 bg-gradient-to-t from-[#064141B]/90 via-[#11212D]/30 to-transparent z-10"></div>
                                <Image
                                    src="/images/profilepicture/nagarjun.jpg"
                                    alt="Nagarjun Mallesh"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 90vw, 35vw"
                                    priority
                                />
                            </div>
                        </div>

                        {/* Right Column - Text - Direct style control */}
                        <div
                            ref={rightColumnRef}
                            className="flex flex-col justify-center p-5 md:p-6 lg:p-8"
                            style={{
                                transform: 'translateX(100px)', // Initial position, will be updated by JS
                                opacity: 0, // Initial opacity, will be updated by JS
                                transition: 'transform 0.3s ease-out, opacity 0.3s ease-out',
                                willChange: 'transform, opacity'
                            }}
                        >
                            <div className="h-full">
                                <p
                                    className="text-[#ccd0cf] mb-5 leading-relaxed text-lg"
                                >
                                    I&apos;m a fullstack engineer with a passion for building scalable web applications
                                    and solving complex problems. With expertise in modern JavaScript frameworks,
                                    cloud architecture, and database design, I create robust solutions that deliver
                                    exceptional user experiences.
                                </p>

                                <p
                                    className="text-[#9ba8ab] mb-6 leading-relaxed text-lg"
                                >
                                    My experience spans from frontend development with React and Next.js to
                                    backend systems using Node.js, Python, and cloud services. I&apos;m committed
                                    to writing clean, maintainable code and continuously learning new technologies.
                                </p>

                                {/* CV Download Button - Centered */}
                                <div
                                    className="flex justify-center mt-6"
                                >
                                    <a
                                        href="/resume/nagarjun_mallesh_resume.pdf"
                                        download
                                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#064141B] hover:bg-[#064141B]/80 text-[#ccd0cf] rounded-lg transition-colors shadow-lg"
                                    >
                                        <FaFileDownload className="text-lg" />
                                        <span>Download Resume</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About