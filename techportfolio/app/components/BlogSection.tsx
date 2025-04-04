"use client"

import React, { useEffect, useState, useRef } from 'react';
import BlogCard from './BlogCard';
import { motion, useInView } from 'framer-motion';
import { useSmoothScroll } from '../providers/lenis-provider';

export default function BlogSection() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Animation variants
    const fadeInVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    // Smooth scroll references and state
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [sectionProgress, setSectionProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const lenis = useSmoothScroll();

    // Use inView for animations on elements that don't need custom scroll effects
    const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });

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

            // Calculate overall scroll progress for heading size
            if (rect.top < windowHeight && rect.bottom > 0) {
                setIsVisible(true);

                // This creates a value from 1 (when section first enters view) to 0 (when it's centered)
                const headingProgress = Math.max(0, Math.min(1,
                    (rect.top > 0)
                        ? rect.top / (windowHeight * 0.5)
                        : 0
                ));
                setScrollProgress(headingProgress);

                // Calculate how far through the section we are
                const viewportCenter = windowHeight / 2;
                const sectionCenter = rect.top + (rect.height / 2);

                // Create a progress value from 0 (section entering) to 1 (section centered) to 0 (section leaving)
                let progress;

                if (sectionCenter > viewportCenter) {
                    // Section is entering (top half of screen)
                    progress = 1 - Math.min(1, Math.max(0,
                        (sectionCenter - viewportCenter) / (windowHeight * 0.75)
                    ));
                } else {
                    // Section is leaving (bottom half of screen)
                    progress = 1 - Math.min(1, Math.max(0,
                        (viewportCenter - sectionCenter) / (windowHeight * 0.75)
                    ));
                }

                setSectionProgress(progress);
            } else {
                setIsVisible(false);
                setSectionProgress(0);
                setScrollProgress(rect.top < 0 ? 0 : 1); // Ensure proper heading size
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

    // Apply scale effects based on scroll position
    useEffect(() => {
        if (!headingRef.current || !isClient) return;

        // Base size is 4.5rem, max size is 8rem
        const fontSize = 4.5 + (scrollProgress * 3.5); // Scale from 8rem down to 4.5rem
        headingRef.current.style.fontSize = `${fontSize}rem`;

        // Adjust line height to accommodate larger font
        headingRef.current.style.lineHeight = "1";

        // Keep opacity at full when in view
        headingRef.current.style.opacity = isVisible ? "1" : `${0.5 + scrollProgress * 0.5}`;
    }, [scrollProgress, isVisible, isClient]);

    // Apply animations based on section progress
    useEffect(() => {
        if (!contentRef.current || !isClient) return;

        // Transform from initial position to final position
        const x = -50 + (sectionProgress * 50); // Reduced movement for subtlety

        // Opacity: 0 when not in view, up to 1 when fully in view
        const opacity = sectionProgress;

        // Apply transformations
        contentRef.current.style.transform = `translateX(${x}px)`;
        contentRef.current.style.opacity = `${opacity}`;
    }, [sectionProgress, isClient]);

    // Fetch blog articles
    useEffect(() => {
        let isMounted = true;

        async function fetchBlogs() {
            try {
                const response = await fetch('/api/blogs');

                if (!response.ok) {
                    throw new Error(`API returned ${response.status}`);
                }

                const data = await response.json();

                // Process the data to ensure it has the right format
                const processedArticles = data.map(article => ({
                    title: article.title,
                    description: article.description
                        ? article.description.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...'
                        : 'No description available',
                    image: article.thumbnail || "/images/profilepicture/blog.jpg",
                    date: article.pubDate ? new Date(article.pubDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    }) : "No date",
                    link: article.link,
                    categories: article.categories || []
                }));

                if (isMounted) {
                    setArticles(processedArticles);
                    setLoading(false);
                }

            } catch (err) {
                console.error("Error fetching blog posts:", err);
                if (isMounted) {
                    setError(err.message);
                    setLoading(false);
                }
            }
        }

        fetchBlogs();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <section
            id="blog"
            ref={sectionRef}
            className="relative py-24 md:py-32 bg-[#11212D] min-h-screen flex items-center"
            data-scroll-section
        >
            {/* Background gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div
                    className="absolute -left-64 top-1/4 w-[500px] h-[500px] rounded-full bg-[#00C2FF]/5 filter blur-[120px]"
                    data-scroll
                    data-scroll-speed="0.3"
                ></div>
                <div
                    className="absolute -right-64 bottom-1/4 w-[400px] h-[400px] rounded-full bg-[#064141]/5 filter blur-[100px]"
                    data-scroll
                    data-scroll-speed="0.5"
                ></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section heading with dynamic scaling */}
                <div className="text-center mb-8">
                    <h2
                        ref={headingRef}
                        className="font-fraunces font-bold text-center mb-6 md:mb-10 lg:mb-12 mx-auto transition-all duration-300"
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
                        data-scroll
                        data-scroll-speed="0.1"
                    >
                        Blog
                    </h2>
                </div>

                {/* Content area with scroll-based animation */}
                <div
                    ref={contentRef}
                    className="transition-all duration-300"
                    style={{
                        opacity: isClient ? 0 : 1, // Start invisible on client, visible on server
                        transform: 'translateX(-50px)', // Initial offset position
                        willChange: 'transform, opacity'
                    }}
                >
                    {/* Loading state */}
                    {loading && (
                        <div className="flex flex-col items-center justify-center py-16">
                            <div className="h-12 w-12 rounded-full border-t-2 border-b-2 border-[#00C2FF] animate-spin mb-4"></div>
                            <p className="text-[#9BA8AB] font-raleway">Loading articles...</p>
                        </div>
                    )}

                    {/* Error state */}
                    {!loading && error && (
                        <div className="bg-[#0f1923] p-8 rounded-xl border border-[#1e2a36] max-w-2xl mx-auto text-center shadow-lg">
                            <p className="text-[#9BA8AB] font-raleway mb-4">Error loading articles: {error}</p>
                            <p className="text-[#9BA8AB] font-raleway">
                                You can visit my{' '}
                                <a
                                    href="https://medium.com/@nagarjunmallesh"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#00C2FF] hover:underline font-medium"
                                >
                                    Medium profile
                                </a>{' '}
                                directly.
                            </p>
                        </div>
                    )}

                    {/* Empty state */}
                    {!loading && !error && (!articles || articles.length === 0) && (
                        <div className="bg-[#0f1923] p-6 rounded-xl border border-[#1e2a36] max-w-2xl mx-auto text-center shadow-lg">
                            <p className="text-[#9BA8AB] font-raleway">No articles found at this time.</p>
                        </div>
                    )}

                    {/* Articles grid */}
                    {!loading && !error && articles && articles.length > 0 && (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                                {articles.slice(0, 6).map((article, index) => (
                                    <motion.div
                                        key={index}
                                        initial="hidden"
                                        animate={isInView ? "visible" : "hidden"}
                                        variants={fadeInVariants}
                                        transition={{ delay: index * 0.1 }}
                                        className="h-full"
                                        data-scroll
                                        data-scroll-speed={0.05 * (index % 3 + 1)}
                                    >
                                        <BlogCard article={article} />
                                    </motion.div>
                                ))}
                            </div>

                            {/* View all link */}
                            <motion.div
                                className="mt-7 md:mt-10 text-center"
                                initial={{ opacity: 0, y: 10 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                                transition={{ delay: 0.8, duration: 0.5 }}
                                data-scroll
                                data-scroll-speed="0.2"
                            >
                                <a
                                    href="https://medium.com/@nagarjunmallesh"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-[#064141] to-[#00C2FF] text-white font-montserrat hover:from-[#00C2FF] hover:to-[#064141] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                                >
                                    View all articles
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </a>
                            </motion.div>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}