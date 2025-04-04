"use client"

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { FaTwitter, FaLinkedinIn, FaGithub } from 'react-icons/fa'
import { useSmoothScroll } from '../providers/lenis-provider'  // Importing your Lenis context

const Introduction = () => {
    const [isClient, setIsClient] = useState(false)
    const [scrollProgress, setScrollProgress] = useState(0)
    const headingRef = useRef<HTMLHeadingElement>(null)
    const subHeadingRef = useRef<HTMLHeadingElement>(null)
    const sectionRef = useRef<HTMLDivElement>(null)
    const lenis = useSmoothScroll()  // Get Lenis instance

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

        // Apply transformations
        headingRef.current.style.transform = `scale(${headingScale})`
        subHeadingRef.current.style.transform = `scale(${subHeadingScale})`

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
            className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Background laptop image with overlay */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[#064141B] opacity-80 z-10"></div>
                <Image
                    src="/images/profilepicture/intro-bg.jpg"
                    alt="Laptop with colorful screen"
                    fill
                    className="object-cover"
                    priority
                    quality={100}
                />
            </div>


            {/* Content overlay */}
            <div className="container mx-auto px-4 md:px-6 z-10 relative">
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                    {/* Main heading with 3D effect and glow */}
                    <h1
                        ref={headingRef}
                        className="font-monoton text-4xl md:text-5xl lg:text-6xl font-bold mb-4 name-3d glow-effect"
                        style={{
                            color: '#ccd0cf', // Primary text color
                            transformOrigin: 'center center',
                            transition: 'transform 0.15s ease-out'
                        }}
                    >
                        Hi, I&apos;m Nagarjun Mallesh
                    </h1>

                    <h2
                        ref={subHeadingRef}
                        className="font-montserrat text-xl md:text-2xl font-medium mb-10 subtitle-3d glow-effect-subtle"
                        style={{
                            color: '#9ba8ab', // Secondary text color
                            transformOrigin: 'center center',
                            transition: 'transform 0.15s ease-out'
                        }}
                    >
                        Fullstack engineer crafting scalable, innovative solutions.
                    </h2>

                    {/* Social media icons */}
                    <div className="flex space-x-6 mb-10">
                        <a href="https://twitter.com/yourhandle" target="_blank" rel="noopener noreferrer"
                            className="text-2xl hover:text-cyan-400 transition-colors icon-3d icon-glow"
                            style={{ color: '#9BA8AB' }}
                        >
                            <FaTwitter />
                        </a>
                        <a href="https://linkedin.com/in/nagarjun-mallesh" target="_blank" rel="noopener noreferrer"
                            className="text-2xl hover:text-cyan-400 transition-colors icon-3d icon-glow"
                            style={{ color: '#9BA8AB' }}
                        >
                            <FaLinkedinIn />
                        </a>
                        <a href="https://github.com/NagarjunMa" target="_blank" rel="noopener noreferrer"
                            className="text-2xl hover:text-cyan-400 transition-colors icon-3d icon-glow"
                            style={{ color: '#9BA8AB' }}
                        >
                            <FaGithub />
                        </a>
                    </div>


                </div>
            </div>

            {/* Add CSS for 3D and glow effects */}
            <style jsx>{`
                .name-3d {
                    text-shadow: 
                        0 1px 0 #ccc,
                        0 2px 0 #c9c9c9,
                        0 3px 0 #bbb,
                        0 4px 0 #b9b9b9,
                        0 5px 0 #aaa,
                        0 6px 1px rgba(0,0,0,.1),
                        0 0 5px rgba(0,0,0,.1),
                        0 1px 3px rgba(0,0,0,.3),
                        0 3px 5px rgba(0,0,0,.2),
                        0 5px 10px rgba(0,0,0,.25),
                        0 10px 10px rgba(0,0,0,.2),
                        0 20px 20px rgba(0,0,0,.15);
                    transition: all 0.3s ease;
                    will-change: transform, opacity;
                }
                
                .glow-effect {
                    text-shadow: 
            0 0 5px rgba(204, 208, 207, 0.5),
            0 0 10px rgba(204, 208, 207, 0.3),
            0 0 15px rgba(204, 208, 207, 0.2),
            0 0 20px rgba(204, 208, 207, 0.1);
                        0 1px 0 #ccc,
                        0 2px 0 #c9c9c9,
                        0 3px 0 #bbb,
                        0 4px 0 #b9b9b9,
                        0 5px 0 #aaa,
                        0 6px 1px rgba(0,0,0,.1),
                        0 0 5px rgba(0,0,0,.1),
                        0 1px 3px rgba(0,0,0,.3),
                        0 3px 5px rgba(0,0,0,.2),
                        0 5px 10px rgba(0,0,0,.25),
                        0 10px 10px rgba(0,0,0,.2),
                        0 20px 20px rgba(0,0,0,.15);
                }
                
                .subtitle-3d {
                    text-shadow: 
                        0 2px 4px rgba(0,0,0,0.5),
                        0 4px 8px rgba(0,0,0,0.3);
                    transition: all 0.3s ease;
                    will-change: transform, opacity;
                }
                
                .glow-effect-subtle {
                    text-shadow: 
            0 0 5px rgba(155, 168, 171, 0.5),
            0 0 10px rgba(155, 168, 171, 0.3);
                        0 2px 4px rgba(0,0,0,0.5),
                        0 4px 8px rgba(0,0,0,0.3);
                }
                
                .icon-3d {
                    text-shadow: 
                        0 1px 3px rgba(0,0,0,0.3),
                        0 3px 5px rgba(0,0,0,0.2);
                    transform: translateY(0);
                    transition: all 0.3s ease;
                }
                
                .icon-glow {
                    filter: drop-shadow(0 0 3px rgba(155, 168, 171, 0.4));
                }
                
                .icon-3d:hover {
                    transform: translateY(-5px);
                    text-shadow: 
                        0 5px 10px rgba(0,0,0,0.3),
                        0 10px 15px rgba(0,0,0,0.2);
                    filter: drop-shadow(0 0 8px rgba(155, 168, 171, 0.8));
                }
            `}</style>
        </div>
    );

    return initialRender;
}

export default Introduction