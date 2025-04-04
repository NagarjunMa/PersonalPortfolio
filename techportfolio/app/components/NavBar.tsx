"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion"

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
            const sections = ['home', 'about', 'techstack', 'blog', 'contact']
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
        console.log(`Scrolling to section: ${sectionId}`);

        const element = document.getElementById(sectionId);

        if (element) {
            // Use native smooth scrolling
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        } else {
            console.warn(`Element with id "${sectionId}" not found`);
        }

        // Close mobile menu after clicking
        setIsMobileMenuOpen(false);
    }

    const navItems = [
        { id: 'home', label: 'Home' },
        { id: 'about', label: 'About' },
        { id: 'techstack', label: 'TechStack' },
        { id: 'blog', label: 'Blog' },
        { id: 'contact', label: 'Contact' }
    ]

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'py-2 bg-[#11212D]/90 backdrop-blur-md shadow-lg'
                : 'py-5 bg-transparent'
                }`}
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
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00C2FF] to-[#064141] mr-3 flex items-center justify-center shadow-lg">
                            <span className="font-bold text-[#ccd0cf] text-xs">NM</span>
                        </div>
                        <h1 className="text-xl font-medium text-[#ccd0cf]">
                            <span className="text-[#00C2FF] font-monoton">Nagarjun</span> Mallesh
                        </h1>
                    </motion.div>
                </div>

                {/* Desktop menu */}
                <nav className="hidden md:block">
                    <ul className="flex space-x-6 items-center">
                        {navItems.map(item => (
                            <li key={item.id}>
                                <button
                                    onClick={() => scrollToSection(item.id)}
                                    className={`relative text-sm font-montserrat transition-colors py-2 px-1 ${activeSection === item.id
                                        ? 'text-[#00C2FF]'
                                        : 'text-[#9BA8AB] hover:text-[#ccd0cf]'
                                        }`}
                                >
                                    {item.label}
                                    {activeSection === item.id && (
                                        <motion.div
                                            layoutId="navbar-underline"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00C2FF]"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    )}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Mobile menu button */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 rounded-md text-[#9BA8AB] hover:text-[#00C2FF]"
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
                                            className={`font-montserrat block w-full text-left py-2 px-3 rounded-md ${activeSection === item.id
                                                ? 'text-[#00C2FF] bg-[#253745]/60'
                                                : 'text-[#9BA8AB] hover:bg-[#253745]/30 hover:text-[#ccd0cf]'
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