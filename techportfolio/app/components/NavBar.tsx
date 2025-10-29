/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { SparklesIcon, CubeIcon, ShieldCheckIcon, DocumentTextIcon, EnvelopeIcon } from "@heroicons/react/24/solid"

const NavBar = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [activeSection, setActiveSection] = useState("home")
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    // Track scroll position for navbar styling
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }

        // Initialize on mount
        handleScroll()

        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    // Track active section
    useEffect(() => {
        const handleScroll = () => {
            const sections = ['home', 'about', 'blog', 'contact']
            const scrollPosition = window.scrollY + 100 // Offset for better UX

            // Find the active section
            for (const section of sections) {
                const element = document.getElementById(section)
                if (element) {
                    const { top, bottom } = element.getBoundingClientRect()
                    const visible = top < window.innerHeight / 2 && bottom > 0

                    if (visible) {
                        setActiveSection(section)
                        break
                    }
                }
            }
        }

        // Initial check
        handleScroll();

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])

    // Smooth scroll to section with standard browser APIs
    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);

        if (element) {
            // Use native smooth scrolling
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }

        // Close mobile menu after clicking
        setIsMobileMenuOpen(false);
    }

    const navItems = [
        { id: 'home', label: 'Home', icon: <SparklesIcon className="h-5 w-5 text-white" /> },
        { id: 'about', label: 'About', icon: <ShieldCheckIcon className="h-5 w-5 text-white" /> },
        { id: 'blog', label: 'Blog', icon: <DocumentTextIcon className="h-5 w-5 text-white" /> },
        { id: 'contact', label: 'Contact', icon: <EnvelopeIcon className="h-5 w-5 text-white" /> }
    ]

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-3' : 'py-5'} bg-transparent`}
        >
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                {/* Logo & Name */}
                <div
                    className="flex items-center cursor-pointer"
                    onClick={() => scrollToSection('home')}
                >
                    <motion.div
                        className="flex items-center"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                        <img src="/Logo/1.png" alt="Logo" className="w-8 h-8 object-contain mr-3 rounded-lg" />
                        <h1 className="text-xl font-stardom text-white">
                            Nagarjun Mallesh
                        </h1>
                    </motion.div>
                </div>

                {/* Desktop menu - glass pill */}
                <nav className="hidden md:block flex-1">
                    <div className="w-full flex justify-center relative">
                        {/* Glow under pill - layered for soft spread */}
                        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 pointer-events-none">
                            <div className="mx-auto h-10 w-[70vw] max-w-[720px] bg-white/25 blur-3xl rounded-full" />
                            <div className="mx-auto -mt-6 h-8 w-[60vw] max-w-[620px] bg-white/15 blur-2xl rounded-full" />
                        </div>
                        <div className="rounded-full border border-white/10 bg-gradient-to-b from-white/15 to-white/[0.06] backdrop-blur-md px-5 py-2 shadow-[0_10px_35px_rgba(0,0,0,0.45)]">
                            <ul className="flex items-center divide-x divide-white/10">
                                {navItems.map((item, idx) => (
                                    <li key={item.id} className="px-4">
                                        <button
                                            onClick={() => scrollToSection(item.id)}
                                            className={`flex items-center gap-2 text-sm font-montserrat transition-colors cursor-pointer ${activeSection === item.id ? 'text-white' : 'text-white/85 hover:text-white'}`}
                                        >
                                            <span className="opacity-100 text-white">
                                                {item.icon}
                                            </span>
                                            {item.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </nav>

                {/* Mobile menu button */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 rounded-md text-white hover:text-white/70 cursor-pointer"
                        aria-label="Open menu"
                    >
                        <div className="w-6 flex flex-col items-end space-y-1.5">
                            <motion.span
                                className={`block h-0.5 bg-current transition-all duration-300 ease-out ${isMobileMenuOpen ? 'w-6 -rotate-45 translate-y-2' : 'w-6'}`}
                            ></motion.span>
                            <motion.span
                                className={`block h-0.5 bg-current transition-all duration-300 ease-out ${isMobileMenuOpen ? 'opacity-0 w-6' : 'w-4 opacity-100'}`}
                            ></motion.span>
                            <motion.span
                                className={`block h-0.5 bg-current transition-all duration-300 ease-out ${isMobileMenuOpen ? 'w-6 rotate-45 -translate-y-2' : 'w-5'}`}
                            ></motion.span>
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile menu dropdown */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.nav
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden bg-[#11212D]/95 backdrop-blur-md border-t border-[#253745]/50"
                    >
                        <div className="container mx-auto px-4 py-4">
                            <ul className="space-y-3">
                                {navItems.map(item => (
                                    <motion.li
                                        key={item.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <button
                                            onClick={() => scrollToSection(item.id)}
                                            className={`font-montserrat block w-full text-left py-2 px-3 rounded-md cursor-pointer ${activeSection === item.id
                                                ? 'text-white bg-white/10'
                                                : 'text-white/80 hover:bg-white/5 hover:text-white'
                                                }`}
                                        >
                                            {item.label}
                                        </button>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </header>
    )
}

export default NavBar