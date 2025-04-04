/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { useSmoothScroll } from '../providers/lenis-provider';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const lenis = useSmoothScroll();

    // Run once on mount to indicate we're on the client
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Handle scroll events with Lenis
    useEffect(() => {
        if (!isClient || !lenis || !sectionRef.current) return;

        const handleScroll = (e: any) => {
            // Get section position
            const rect = sectionRef.current!.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Calculate overall scroll progress for heading animation
            if (rect.top < windowHeight && rect.bottom > 0) {
                setIsVisible(true);

                // This creates a value from 1 (when section first enters view) to 0 (when it's centered)
                const headingProgress = Math.max(0, Math.min(1,
                    (rect.top > 0)
                        ? rect.top / (windowHeight * 0.8)
                        : 0
                ));
                setScrollProgress(headingProgress);

                // Apply animations to content
                if (contentRef.current) {
                    const opacity = 1 - Math.min(1, Math.max(0, (rect.top) / (windowHeight * 0.3)));
                    const translateY = Math.max(0, rect.top * 0.15);
                    contentRef.current.style.opacity = `${opacity}`;
                    contentRef.current.style.transform = `translateY(${translateY}px)`;
                }
            } else {
                setIsVisible(false);
                setScrollProgress(rect.top < 0 ? 0 : 1);
            }
        };

        // Subscribe to Lenis scroll events
        lenis.on('scroll', handleScroll);

        // Initial check
        handleScroll({ scroll: window.scrollY });

        return () => {
            lenis.off('scroll', handleScroll);
        };
    }, [isClient, lenis]);

    // Apply animation effects based on scroll position
    useEffect(() => {
        if (!headingRef.current || !isClient) return;

        // Animate the heading based on scroll position - modified for left positioning
        const translateX = -scrollProgress * 20; // Move left instead of right
        const translateY = scrollProgress * 15;
        const opacity = 0.8 + (scrollProgress * 0.2);
        const scale = 0.95 + (scrollProgress * 0.05);

        headingRef.current.style.transform = `translate(${translateX}px, -${translateY}px) scale(${scale})`;
        headingRef.current.style.opacity = `${opacity}`;
    }, [scrollProgress, isClient]);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setSending(true);

        console.log('Form submitted:', formData.name, 'form data email : ', formData.email, 'form data subject : ', formData.subject, 'form data message : ', formData.message);
        // Simulate sending (replace with your actual form submission logic)
        await new Promise(resolve => setTimeout(resolve, 1500));

        setSending(false);
        setSent(true);

        // Reset form
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
        });

        // Reset success message after 5 seconds
        setTimeout(() => {
            setSent(false);
        }, 5000);
    };

    return (
        <section
            id="contact"
            ref={sectionRef}
            className="relative py-24 md:py-32 bg-[#11212D] min-h-screen flex items-center"
        >
            {/* Gradient background */}
            <div className="absolute inset-0 overflow-hidden">
                <div
                    className="absolute left-0 top-0 w-[600px] h-[600px] rounded-full bg-[#253745]/20 filter blur-[100px] -translate-x-1/2 -translate-y-1/4"
                ></div>
                <div
                    className="absolute right-0 bottom-0 w-[500px] h-[500px] rounded-full bg-[#064141B]/30 filter blur-[120px] translate-x-1/3 translate-y-1/4"
                ></div>
            </div>

            <div className="container mx-auto px-4 z-10 relative">
                <div
                    ref={contentRef}
                    className="max-w-3xl mx-auto relative transition-all duration-300"
                    style={{ opacity: 1, transform: 'translateY(0)' }}
                >
                    {/* Stylish overlapping heading - Now positioned in top left */}
                    <div className="relative">
                        <h2
                            ref={headingRef}
                            className="font-fraunces absolute -left-6 -top-24 sm:-left-10 sm:-top-28 md:-left-16 md:-top-32 text-6xl sm:text-7xl md:text-8xl font-bold transform-gpu z-20"
                            style={{
                                color: '#ccd0cf',
                                textShadow: `
                                    0 0 5px rgba(204, 208, 207, 0.3),
                                    0 0 10px rgba(204, 208, 207, 0.2),
                                    0 0 15px rgba(204, 208, 207, 0.1)
                                `,
                                transformOrigin: 'left top',
                                transition: 'all 0.3s ease-out',
                                willChange: 'transform, opacity'
                            }}
                        >
                            Contact Me
                        </h2>

                        {/* Decorative elements - Moved to left side */}
                        <div className="absolute -left-20 -top-50 w-52 h-52 md:w-65 md:h-65 rounded-full bg-[#00C2FF]/10 filter blur-xl z-10"></div>
                        <div className="absolute -left-20 -top-45 w-50 h-50 md:w-54 md:h-54 rounded-full border border-[#00C2FF]/30 z-10"></div>
                    </div>

                    {/* Main form card with glowing border */}
                    <div className="relative mt-16">
                        {/* Glow effect */}
                        <div className="absolute -inset-[2px] rounded-xl bg-gradient-to-r from-[#00C2FF30] via-[#064141B70] to-[#253745B50] opacity-75 blur-[3px] z-0"></div>


                    </div>

                    {/* Alternative contact methods */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="mt-9 text-center"
                    >
                        <p className="mb-4 text-[#9BA8AB]">Prefer to reach out directly?</p>
                        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
                            <a
                                href="mailto:nagarjunmallesh@gmail.com"
                                className="flex items-center text-[#00C2FF] hover:text-[#33D1FF] transition-colors hover:scale-105 transform"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                nagarjunmallesh@gmail.com
                            </a>
                            <a
                                href="https://linkedin.com/in/nagarjun-mallesh"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-[#00C2FF] hover:text-[#33D1FF] transition-colors hover:scale-105 transform"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                                LinkedIn
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;