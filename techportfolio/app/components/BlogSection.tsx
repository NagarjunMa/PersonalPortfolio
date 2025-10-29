/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useEffect, useState, useRef } from 'react';
import BlogCard from './BlogCard';
import { motion, useInView } from 'framer-motion';
import { useSmoothScroll } from '../providers/lenis-provider';
import TickerHoverEffect from './TickerHoverEffect';

export default function BlogSection() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [hasAnimated, setHasAnimated] = useState(false);

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

    // Simplified refs and state
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [isClient, setIsClient] = useState(false);
    const lenis = useSmoothScroll();

    // Use inView for animations with once:true to ensure animation only happens once
    const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });

    // Run once on mount to indicate we're on the client
    useEffect(() => {
        setIsClient(true);

        // Add/remove ID for better navigation targeting
        const section = sectionRef.current;
        if (section) {
            // Ensure the section has a proper ID for navigation
            section.id = "blog";

            // Fix for navigation glitch: ensure section is navigable
            if (typeof window !== 'undefined') {
                // Check if there's a hash in the URL that matches this section
                if (window.location.hash === '#blog') {
                    // Use setTimeout to ensure this runs after other initialization
                    setTimeout(() => {
                        section.scrollIntoView({ behavior: 'smooth' });
                    }, 200);
                }
            }
        }
    }, []);

    // SIMPLIFIED: Track when content becomes visible
    useEffect(() => {
        if (isInView && !hasAnimated) {
            setHasAnimated(true);
        }
    }, [isInView, hasAnimated]);

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
                const processedArticles = data.map((article: { title: any; description: string; thumbnail: any; pubDate: string | number | Date; link: any; categories: any; }) => ({
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

            } catch (err: unknown) {
                console.error("Error fetching blog posts:", err);
                if (isMounted) {
                    // Safely handle the unknown error type to get a proper message
                    const errorMessage = err instanceof Error
                        ? err.message
                        : 'Unknown error occurred while fetching blog posts';

                    setError(errorMessage);
                    setLoading(false);
                }
            }
        }

        fetchBlogs();

        return () => {
            isMounted = false;
        };
    }, []);

    // Listen for navigation events to help fix glitches
    useEffect(() => {
        if (!lenis || !sectionRef.current) return;

        // Function to scroll to this section if clicking the blog nav link
        const handleHashChange = () => {
            if (window.location.hash === '#blog' && sectionRef.current) {
                // Reset lenis scroll position to ensure reliable navigation
                lenis.scrollTo(sectionRef.current, {
                    offset: 0,
                    immediate: false,
                    duration: 1.2,
                    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                });
            }
        };

        // Listen for hash changes in URL
        window.addEventListener('hashchange', handleHashChange);

        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, [lenis]);

    return (
        <section
            id="blog"
            ref={sectionRef}
            className="relative py-24 md:py-32 bg-black min-h-screen overflow-x-hidden"
            data-scroll-section
        >
            {/* Background gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div
                    className="absolute -left-64 top-1/4 w-[500px] h-[500px] rounded-full bg-[#00C2FF]/5 filter blur-[120px]"
                ></div>
                <div
                    className="absolute -right-64 bottom-1/4 w-[400px] h-[400px] rounded-full bg-[#064141]/5 filter blur-[100px]"
                ></div>
            </div>

            {/* Ticker - Full Width */}
            <div className="relative z-20 mb-6">
                <TickerHoverEffect items={['Blog']} />
            </div>

            <div className="relative z-10">
                <div className="container mx-auto px-4">
                    {/* Section heading */}
                    <motion.div
                        className="text-center mb-12 md:mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView || hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <p className="font-raleway text-white max-w-2xl mx-auto text-base md:text-lg">
                            Thoughts, insights, and tutorials from my journey in software engineering and cloud architecture.
                        </p>
                    </motion.div>

                    {/* Content area - No animations or scroll effects */}
                    <div ref={contentRef} className="transition-all duration-300">
                        {/* Loading state */}
                        {loading && (
                            <div className="flex flex-col items-center justify-center py-16">
                                <div className="h-12 w-12 rounded-full border-t-2 border-b-2 border-[#00C2FF] animate-spin mb-4"></div>
                                <p className="text-white font-raleway">Loading articles...</p>
                            </div>
                        )}

                        {/* Error state */}
                        {!loading && error && (
                            <div className="bg-[#0f1923] p-8 rounded-xl border border-[#1e2a36] max-w-2xl mx-auto text-center shadow-lg">
                                <p className="text-white font-raleway mb-4">Error loading articles: {error}</p>
                                <p className="text-white font-raleway">
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
                                <p className="text-white font-raleway">No articles found at this time.</p>
                            </div>
                        )}

                        {/* Articles grid - NO SMOOTH SCROLLING EFFECTS */}
                        {!loading && !error && articles && articles.length > 0 && (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                                    {articles.slice(0, 6).map((article, index) => (
                                        <div key={index} className="h-full">
                                            <BlogCard article={article} />
                                        </div>
                                    ))}
                                </div>

                                {/* View all link */}
                                <div className="mt-10 md:mt-12 text-center">
                                    <a
                                        href="https://medium.com/@nagarjunmallesh"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative inline-flex items-center rounded-[32px] px-10 py-4 text-white font-montserrat font-medium text-lg transition-all duration-500 overflow-hidden cursor-pointer"
                                    >
                                        {/* Outer glow - white */}
                                        <span className="absolute inset-0 rounded-[32px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.3),transparent_70%)] opacity-40 blur-2xl transition-all duration-500 group-hover:opacity-80 group-hover:blur-3xl"></span>

                                        {/* Base gradient background - dark with subtle white tint */}
                                        <span className="absolute inset-0 rounded-[32px] bg-gradient-to-r from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] border border-white/20"></span>

                                        {/* White gradient overlay - becomes visible on hover */}
                                        <span className="absolute inset-0 rounded-[32px] bg-gradient-to-r from-white/10 via-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>

                                        {/* Shimmer effect on hover */}
                                        <span className="absolute inset-0 rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[linear-gradient(110deg,transparent_0%,transparent_40%,rgba(255,255,255,0.4)_50%,transparent_60%,transparent_100%)] animate-shimmer"></span>

                                        {/* Inner highlight for depth */}
                                        <span className="absolute inset-0 rounded-[32px] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] group-hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4)] transition-shadow duration-500"></span>

                                        <span className="relative z-10 flex items-center">
                                            View all articles
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </span>
                                    </a>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}