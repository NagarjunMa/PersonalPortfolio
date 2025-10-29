/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { useSmoothScroll } from '../providers/lenis-provider';
import TickerHoverEffect from './TickerHoverEffect';

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
            className="relative py-24 md:py-32 bg-black min-h-screen overflow-x-hidden"
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

            {/* Ticker - Full Width */}
            <div className="relative z-20 mb-8">
                <TickerHoverEffect items={['Contact Me']} />
            </div>

            <div className="relative z-10 flex items-center min-h-[60vh] justify-start">
                <div className="w-full pl-8 md:pl-12 lg:pl-16 xl:pl-24 pr-4">
                    <div
                        ref={contentRef}
                        className="max-w-3xl relative transition-all duration-300"
                        style={{ opacity: 1, transform: 'translateY(0)' }}
                    >
                        {/* Centered contact block */}
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="flex flex-col items-start text-left gap-3"
                        >
                            <h3 className="font-rosaline text-[8rem] md:text-[12rem] leading-none text-white mb-4">Hello.</h3>
                            <p className="text-white/90 max-w-xl">
                                Need a beautiful, well‑structured website that you can own and maintain yourself? Get in touch.
                            </p>
                            <p className="text-white">
                                Email: <a href="mailto:nagarjunmallesh@gmail.com" className="underline hover:text-[#00C2FF] transition-colors">nagarjunmallesh@gmail.com</a>
                            </p>
                            <p className="text-white">
                                On the Internet:
                                <a href="https://linkedin.com/in/nagarjun-mallesh" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#00C2FF] transition-colors ml-1">LinkedIn</a>
                                <span className="mx-2 text-white/60">/</span>
                                <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#00C2FF] transition-colors">Instagram</a>
                                <span className="mx-2 text-white/60">/</span>
                                <a href="https://github.com/NagarjunMa" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#00C2FF] transition-colors">GitHub</a>
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;