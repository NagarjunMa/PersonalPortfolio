/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useEffect, useRef, useState } from 'react'
import { useSmoothScroll } from '../providers/lenis-provider'
import Image from 'next/image'
import TickerHoverEffect from './TickerHoverEffect'

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
            className="min-h-screen bg-black py-14 md:py-16 lg:py-20 relative overflow-x-hidden"
        >
            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-[#253745]/20 filter blur-[100px] -translate-x-1/2 -translate-y-1/4"></div>
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-[#064141B]/30 filter blur-[120px] translate-x-1/3 translate-y-1/4"></div>
            </div>

            {/* Ticker - Full Width */}
            <div className="relative z-20 mb-6 md:mb-10 lg:mb-12">
                <TickerHoverEffect items={['About Me']} />
            </div>

            {/* Content - Simple and Clean */}
            <div className="relative z-10">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-7xl mx-auto py-12 md:py-16">
                        <div className="flex flex-col lg:flex-row-reverse items-start gap-10 lg:gap-16">
                            {/* Description - Left Side */}
                            <div className="flex-1">
                                <p className="font-telma text-white text-5xl md:text-7xl font-bold mb-4 leading-snug">
                                    I&apos;m Nagarjun Mallesh
                                </p>
                                <p className="text-white text-2xl md:text-3xl font-bold mb-6 leading-snug">
                                    A software engineer, builder, and problem solver.
                                </p>
                                <p className="text-white/90 leading-relaxed text-base md:text-lg mb-5">
                                    The intersection of cutting-edge technology and real-world impact has always driven me, and I&apos;ve never shied away from diving deep into new challenges - whether it&apos;s learning Golang with minimal documentation, mastering AWS Bedrock for AI integration, or building mission-critical systems where lives depend on reliability. I&apos;ve been building with code since my first internship at Digital API Craft in 2019.
                                </p>
                                <p className="text-white/90 leading-relaxed text-base md:text-lg mb-5">
                                    Fast forward to 2025 and I&apos;ve worked across the full spectrum - from banking microservices and emergency response platforms to AI-powered automation and cloud infrastructure. From automating BIOS configurations at Hewlett Packard to architecting serverless platforms with AWS Bedrock to building React frontends with real-time data visualization. Everything I&apos;ve built, small or big, has been a vital stepping stone for where I am today.
                                </p>
                                <p className="text-white/90 leading-relaxed text-base md:text-lg mb-5">
                                    What excites me most about being a Software Engineer is building things that solve genuine problems and create measurable impact. It goes beyond writing elegant code and involves having a passion for understanding user needs, identifying the right problems to solve, and delivering solutions that actually improve people&apos;s lives - whether it&apos;s coordinating emergency responses 70% faster, helping volunteers onboard efficiently, or enabling banks to process transactions reliably. Starting with deep customer understanding, finding critical problems, shipping solutions quickly, learning from real usage, and then iterating to improve that value over time is the key to exceptional engineering.
                                </p>
                                <p className="text-white/90 leading-relaxed text-base md:text-lg mb-5">
                                    This is one of my favorite principles (from first-principles thinking): <span className="font-starform font-bold italic">&quot;Question everything. Build what matters. Skip what doesn&apos;t.&quot;</span> This resonates deeply with me because I have no desire to build features just because they&apos;re technically impressive. Some engineers love that! But it&apos;s not for me. I only want to build systems and products that solve real problems, that matter to actual users, and have measurable impact in the world.
                                </p>

                                {/* Skills Section */}
                                <div className="mt-8">
                                    <h3 className="text-white font-bold text-lg mb-4 uppercase tracking-wide">Skills</h3>
                                    <p className="text-white/90 text-sm md:text-base">
                                        Full-Stack Development / Cloud Architecture / AI/ML Integration / System Design / Microservices / Serverless Architecture / RESTful APIs / Database Design (SQL/NoSQL) / Real-time Data Processing / Performance Optimization / CI/CD Automation / DevOps / Infrastructure as Code / Security &amp; Authentication / Agile Development
                                    </p>
                                </div>
                            </div>

                            {/* Image - Right Side with Experience */}
                            <div className="w-full lg:w-96 flex-shrink-0">
                                <div className="relative w-full aspect-[3/4] overflow-hidden rounded-lg mb-6">
                                    <Image
                                        src="/images/profilepicture/nagarjun.jpg"
                                        alt="Nagarjun Mallesh"
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 1024px) 100vw, 384px"
                                        priority
                                    />
                                </div>

                                {/* Experience Section below Image */}
                                <div>
                                    <h3 className="text-white font-bold text-lg mb-4 uppercase tracking-wide">Experience</h3>
                                    <ul className="text-white/90 text-sm md:text-base space-y-2 mb-6">
                                        <li>• Bachelor&apos;s in Information Science &amp; Engineering (2015-2019)</li>
                                        <li>• Master&apos;s in Information Systems (2022-2024)</li>
                                        <li>• 4+ years experience in Full-Stack Development, Cloud Architecture, and AI/ML Integration</li>
                                    </ul>

                                    <p className="text-white/90 text-sm md:text-base mb-3">Within those 4+ years, I have:</p>
                                    <ul className="text-white/90 text-sm md:text-base space-y-2">
                                        <li>• 4+ years experience in Backend Development (Python, Java, Node.js, Go)</li>
                                        <li>• 3+ years experience in Frontend Development (React, TypeScript)</li>
                                        <li>• 3+ years experience in AWS Cloud Architecture</li>
                                        <li>• 2+ years experience in AI/ML Integration (AWS Bedrock, RAG Pipelines)</li>
                                        <li>• 2+ years experience in DevOps &amp; Infrastructure (Docker, CI/CD, Terraform/Pulumi)</li>
                                        <li>• 2+ years experience in Microservices Architecture</li>
                                        <li>• 1+ year experience in Mobile Development (Swift, SwiftUI)</li>
                                    </ul>
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