/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useEffect, useRef, useState } from 'react'
import { FaTwitter, FaLinkedinIn, FaGithub } from 'react-icons/fa'
import { useSmoothScroll } from '../providers/lenis-provider'  // Importing your Lenis context
// Typewriter effect - no fade animations

const specialties = ['FullStack', 'Backend', 'GenAI', 'Infrastructure', 'DevOps'];

const Introduction = () => {
    const [isClient, setIsClient] = useState(false)
    const [scrollProgress, setScrollProgress] = useState(0)
    const [currentSpecialty, setCurrentSpecialty] = useState(0)
    const [displayedText, setDisplayedText] = useState('')
    const [isDeleting, setIsDeleting] = useState(false)
    const headingRef = useRef<HTMLHeadingElement>(null)
    const subHeadingRef = useRef<HTMLHeadingElement>(null)
    const sectionRef = useRef<HTMLDivElement>(null)
    const lenis = useSmoothScroll()  // Get Lenis instance

    // Typewriter effect
    useEffect(() => {
        if (!isClient) return;

        const current = specialties[currentSpecialty];
        const fullText = current + ' Developer';

        let delay: number;

        if (isDeleting) {
            delay = displayedText.length > 0 ? 50 : 500;
        } else {
            delay = displayedText !== fullText ? 100 : 2000;
        }

        const timeout = setTimeout(() => {
            if (isDeleting) {
                // Delete one character at a time
                if (displayedText.length > 0) {
                    setDisplayedText(prev => prev.substring(0, prev.length - 1));
                } else {
                    // Finished deleting, move to next specialty
                    setIsDeleting(false);
                    setCurrentSpecialty(prev => (prev + 1) % specialties.length);
                }
            } else {
                // Add one character at a time
                if (displayedText !== fullText) {
                    setDisplayedText(prev => fullText.substring(0, prev.length + 1));
                } else {
                    // Finished typing, wait then start deleting
                    setIsDeleting(true);
                }
            }
        }, delay);

        return () => clearTimeout(timeout);
    }, [isClient, displayedText, currentSpecialty, isDeleting])

    // Run once on mount to indicate we're on the client
    useEffect(() => {
        setIsClient(true)
    }, [])

    // Handle scroll events with Lenis
    useEffect(() => {
        // Only run on client and when lenis is available
        if (!isClient || !lenis) return;

        const handleScroll = (e: any) => {
            // Calculate scroll progress (0 to 1) based on how far we've scrolled
            const scrollTop = e.scroll || 0
            const windowHeight = window.innerHeight

            // This will give us a value from 0 (top) to 1 (when we've scrolled 100vh)
            const progress = Math.min(1, scrollTop / (windowHeight * 0.5))
            setScrollProgress(progress)
        }

        // Subscribe to Lenis scroll events
        lenis.on('scroll', handleScroll)

        return () => {
            lenis.off('scroll', handleScroll)
        }
    }, [isClient, lenis])

    // Apply scale effects based on scroll position
    useEffect(() => {
        if (!headingRef.current || !subHeadingRef.current) return;

        // Calculate scale values:
        // Start at scale 1.0 (original size) when scrollProgress is 0
        // End at scale 1.3 (30% larger) when scrollProgress is 1
        const headingScale = 1 + (scrollProgress * 0.3)
        const subHeadingScale = 1 + (scrollProgress * 0.25)

        // Apply transformations with right alignment
        headingRef.current.style.transform = `scale(${headingScale})`
        headingRef.current.style.transformOrigin = `right center`
        subHeadingRef.current.style.transform = `scale(${subHeadingScale})`
        subHeadingRef.current.style.transformOrigin = `right center`

        // Optional: adjust opacity to fade out slightly as we scroll
        const opacity = 1 - (scrollProgress * 0.3)
        headingRef.current.style.opacity = `${opacity}`
        subHeadingRef.current.style.opacity = `${opacity}`
    }, [scrollProgress])

    // Initial render state for SSR
    // Prevent hydration mismatch by showing identical initial state server and client
    const initialRender = (
        <div
            ref={sectionRef}
            className="relative w-full min-h-screen flex items-center justify-start overflow-hidden bg-black"
        >
            {/* Black background - no image */}
            <div className="absolute inset-0 bg-black z-0"></div>

            {/* Content overlay - Left Aligned */}
            <div className="absolute inset-0 flex items-center justify-start pl-8 md:pl-12 lg:pl-16 xl:pl-24 z-10">
                <div className="flex flex-col items-start">
                    {/* Main heading with HUMANE font */}
                    <h1
                        ref={headingRef}
                        className="font-humane text-8xl md:text-9xl lg:text-[11rem] xl:text-[12rem] font-bold"
                        style={{
                            color: '#ffffff',
                            transformOrigin: 'left center',
                            transition: 'transform 0.15s ease-out',
                            lineHeight: '0.65',
                            textAlign: 'left',
                            wordSpacing: '0.2rem',
                        }}
                    >
                        NAGARJUN MALLESH
                    </h1>

                    {isClient ? (
                        <div
                            ref={subHeadingRef}
                            className="font-montserrat text-xl md:text-2xl font-medium"
                            style={{
                                color: '#ffffff',
                                transformOrigin: 'left center',
                                transition: 'transform 0.15s ease-out',
                                marginBottom: '2.5rem',
                                textAlign: 'left',
                                minHeight: '2rem'
                            }}
                        >
                            <span style={{ display: 'inline-block' }}>
                                {displayedText}
                                <span className="animate-pulse">|</span>
                            </span>
                        </div>
                    ) : (
                        <div
                            ref={subHeadingRef}
                            className="font-montserrat text-xl md:text-2xl font-medium"
                            style={{
                                color: '#ffffff',
                                transformOrigin: 'left center',
                                transition: 'transform 0.15s ease-out',
                                marginBottom: '2.5rem',
                                textAlign: 'left',
                                minHeight: '2rem'
                            }}
                        >
                            {specialties[0]} Developer|
                        </div>
                    )}

                    {/* Social media icons */}
                    <div className="flex space-x-6 mb-10 justify-start">
                        <a href="https://twitter.com/yourhandle" target="_blank" rel="noopener noreferrer"
                            className="text-2xl hover:text-cyan-400 transition-colors"
                            style={{ color: '#ffffff' }}
                        >
                            <FaTwitter />
                        </a>
                        <a href="https://linkedin.com/in/nagarjun-mallesh" target="_blank" rel="noopener noreferrer"
                            className="text-2xl hover:text-cyan-400 transition-colors"
                            style={{ color: '#ffffff' }}
                        >
                            <FaLinkedinIn />
                        </a>
                        <a href="https://github.com/NagarjunMa" target="_blank" rel="noopener noreferrer"
                            className="text-2xl hover:text-cyan-400 transition-colors"
                            style={{ color: '#ffffff' }}
                        >
                            <FaGithub />
                        </a>
                    </div>

                </div>
            </div>
        </div>
    );

    return initialRender;
}

export default Introduction