/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useEffect, useRef, useState } from 'react'
import { useSmoothScroll } from '../providers/lenis-provider'
import { AnimatePresence } from "motion/react"
import * as motion from "motion/react-client"
import {
    FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaDocker, FaPython, FaGithub, FaGoogle, FaAws,
    FaJava
} from "react-icons/fa"
import { SiTypescript, SiNextdotjs, SiMongodb, SiPostgresql, SiMysql, SiFirebase, SiTerraform, SiGo } from "react-icons/si"
import { TbBrandSwift } from "react-icons/tb"

export default function TechStack() {
    const [selectedTab, setSelectedTab] = useState(categories[0])
    const sectionRef = useRef<HTMLElement>(null)
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

    // Handle scroll events with Lenis
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

    // Apply scale effects based on scroll position
    useEffect(() => {
        if (!headingRef.current || !isClient) return;

        // Base size is 2.5rem, max size is 4.5rem
        const fontSize = 2.5 + (scrollProgress * 2) // Scale from 4.5rem down to 2.5rem
        headingRef.current.style.fontSize = `${fontSize}rem`

        // Adjust line height to accommodate larger font
        headingRef.current.style.lineHeight = "1.1"

        // Keep opacity at full when in view
        headingRef.current.style.opacity = isVisible ? "1" : `${0.5 + scrollProgress * 0.5}`
    }, [scrollProgress, isVisible, isClient])

    // Apply animations based on section progress
    useEffect(() => {
        if (!contentRef.current || !isClient) return;

        // Transform from initial position to final position
        const y = 50 - (sectionProgress * 50)

        // Opacity: 0 when not in view, up to 1 when fully in view
        const opacity = sectionProgress * 1.5 // Fade in faster

        // Apply transformations
        contentRef.current.style.transform = `translateY(${y}px)`
        contentRef.current.style.opacity = `${Math.min(opacity, 1)}`
    }, [sectionProgress, isClient])

    // Calculate columns based on number of skills
    const getGridCols = (skillsLength: number) => {
        // For categories with exactly 4 items
        if (skillsLength === 4) {
            return "grid-cols-2 sm:grid-cols-2 md:grid-cols-4";
        }
        // Default grid system
        return "grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5";
    };

    // Calculate column gap based on number of skills
    const getGridGap = (skillsLength: number) => {
        // For categories with exactly 4 items
        if (skillsLength === 4) {
            return "gap-8 md:gap-12"; // Larger gaps for 4 items
        }
        // Default gap
        return "gap-6 md:gap-8";
    };

    return (
        <section
            id="techstack"
            ref={sectionRef}
            className="min-h-screen py-16 md:py-20 lg:py-24 bg-[#11212D] relative overflow-hidden flex flex-col justify-center"
        >
            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#253745]/20 filter blur-[100px] translate-x-1/2 -translate-y-1/4"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-[#064141B]/30 filter blur-[120px] -translate-x-1/3 translate-y-1/4"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <h2
                    ref={headingRef}
                    className="font-fraunces font-bold text-center mb-8 md:mb-12 lg:mb-16 transition-all duration-300"
                    style={{
                        fontSize: '2.5rem', // Start with base size for SSR
                        color: '#ccd0cf',
                        textShadow: `
                            0 0 5px rgba(204, 208, 207, 0.3),
                            0 0 10px rgba(204, 208, 207, 0.2),
                            0 0 15px rgba(204, 208, 207, 0.1)
                        `,
                        transformOrigin: 'center center',
                        lineHeight: '1.1',
                        transition: 'all 0.3s ease',
                        willChange: 'transform, opacity, font-size'
                    }}
                >
                    TechStack
                </h2>

                <div
                    ref={contentRef}
                    className="max-w-6xl mx-auto transition-all duration-300"
                    style={{
                        opacity: isClient ? 0 : 1, // Set initial opacity based on client state
                        transform: 'translateY(50px)', // Start lower for SSR
                        willChange: 'transform, opacity'
                    }}
                >
                    {/* 3D Glow effect around the container */}
                    <div className="relative">
                        {/* Animated glow border effect */}
                        <div className="absolute -inset-[3px] rounded-xl bg-gradient-to-r from-[#00C2FF30] via-[#064141B70] to-[#253745B50] opacity-75 blur-[5px]"></div>
                        <div className="absolute -inset-[2px] rounded-xl bg-gradient-to-r from-[#064141B40] via-[#00C2FF20] to-[#064141B40] opacity-50 blur-[3px] animate-pulse"></div>

                        {/* Main container */}
                        <div className="backdrop-blur-sm bg-[#253745]/30 rounded-xl overflow-hidden shadow-xl relative z-10">
                            <nav className="bg-[#0f1923] p-1 md:p-2 border-b border-[#1e2a36]">
                                <ul className="flex w-full">
                                    {categories.map((item) => (
                                        <motion.li
                                            key={item.label}
                                            initial={false}
                                            animate={{
                                                backgroundColor:
                                                    item === selectedTab ? "#1e2a36" : "transparent",
                                            }}
                                            className="flex-1 min-w-0 relative flex justify-center items-center h-11 rounded-t-md cursor-pointer transition-colors px-2 text-xs md:text-sm uppercase font-semibold select-none"
                                            style={{ color: item === selectedTab ? '#00C2FF' : '#9BA8AB' }}
                                            onClick={() => setSelectedTab(item)}
                                        >
                                            {item.label}
                                            {item === selectedTab ? (
                                                <motion.div
                                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00C2FF] shadow-[0_0_8px_#00C2FF]"
                                                    layoutId="underline"
                                                />
                                            ) : null}
                                        </motion.li>
                                    ))}
                                </ul>
                            </nav>

                            <div className="bg-[#0f1923]/80 py-8 px-6 md:px-10 lg:px-12">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={selectedTab ? selectedTab.label : "empty"}
                                        initial={{ y: 10, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -10, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="w-full"
                                    >
                                        <div className={`grid ${getGridCols(selectedTab?.skills.length)} ${getGridGap(selectedTab?.skills.length)} justify-items-center`}>
                                            {selectedTab?.skills.map((skill) => (
                                                <motion.div
                                                    key={skill.name}
                                                    className="flex flex-col items-center w-full"
                                                    whileHover={{
                                                        scale: 1.05,
                                                        translateY: -5
                                                    }}
                                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                                >
                                                    <div className="w-16 h-16 md:w-20 md:h-20 bg-[#1e2a36] rounded-lg flex items-center justify-center p-3 mb-3 hover:bg-[#2a3947] transition-colors shadow-lg relative">
                                                        {/* Subtle glow effect */}
                                                        <div className="absolute inset-0 rounded-lg opacity-0 hover:opacity-60 transition-opacity duration-300"
                                                            style={{
                                                                boxShadow: `0 0 15px ${skill.color}40, inset 0 0 5px ${skill.color}30`,
                                                                background: `radial-gradient(circle at center, ${skill.color}10, transparent 70%)`
                                                            }}
                                                        />

                                                        <span className="text-3xl md:text-4xl relative z-10" style={{ color: skill.color }}>
                                                            {skill.icon}
                                                        </span>
                                                    </div>
                                                    <span className="text-center text-sm font-medium text-[#9BA8AB]">{skill.name}</span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

/**
 * ==============   Data   ================
 */

const categories = [
    {
        label: "Web Development",
        skills: [
            { name: "HTML", icon: <FaHtml5 />, color: "#E44D26" },
            { name: "CSS", icon: <FaCss3Alt />, color: "#1572B6" },
            { name: "JavaScript", icon: <FaJs />, color: "#F7DF1E" },
            { name: "TypeScript", icon: <SiTypescript />, color: "#3178C6" },
            { name: "React", icon: <FaReact />, color: "#61DAFB" },
            { name: "Next.js", icon: <SiNextdotjs />, color: "#FFFFFF" },
            { name: "Swift", icon: <TbBrandSwift />, color: "#F05138" },
        ]
    },
    {
        label: "Backend",
        skills: [
            { name: "Node.js", icon: <FaNodeJs />, color: "#339933" },
            { name: "Golang", icon: <SiGo />, color: "#00ADD8" },
            { name: "Java", icon: <FaJava />, color: "#ED8B00" },
            { name: "Python", icon: <FaPython />, color: "#3776AB" },
        ]
    },
    {
        label: "Database",
        skills: [
            { name: "PostgreSQL", icon: <SiPostgresql />, color: "#336791" },
            { name: "MySQL", icon: <SiMysql />, color: "#4479A1" },
            { name: "MongoDB", icon: <SiMongodb />, color: "#47A248" },
            { name: "Firebase", icon: <SiFirebase />, color: "#FFCA28" },
        ]
    },
    {
        label: "Services",
        skills: [
            { name: "AWS", icon: <FaAws />, color: "#FF9900" },
            { name: "GCP", icon: <FaGoogle />, color: "#4285F4" },
            { name: "GitHub", icon: <FaGithub />, color: "#FFFFFF" },
            { name: "Docker", icon: <FaDocker />, color: "#2496ED" },
            { name: "Pulumi/Terraform", icon: <SiTerraform />, color: "#7B42BC" },
        ]
    },
]