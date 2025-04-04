/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useEffect, useState, useRef } from 'react';
import BlogCard from './BlogCard';
import { motion, useInView } from 'framer-motion';
import { useSmoothScroll } from '../providers/lenis-provider';

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
            className="relative py-24 md:py-32 bg-[#11212D] min-h-screen flex items-center"
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

            <div className="container mx-auto px-4 relative z-10">
                {/* Section heading with fade-in only */}
                <motion.div
                    className="text-center mb-12 md:mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView || hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h2
                        ref={headingRef}
                        className="font-fraunces font-bold text-center mb-6 text-[4.5rem] text-[#ccd0cf] relative"
                        style={{
                            textShadow: `
                                0 0 5px rgba(204, 208, 207, 0.3),
                                0 0 10px rgba(204, 208, 207, 0.2),
                                0 0 15px rgba(204, 208, 207, 0.1)
                            `,
                            lineHeight: '1',
                        }}
                    >
                        Blog
                    </h2>
                    <p className="font-raleway text-[#9BA8AB] max-w-2xl mx-auto text-base md:text-lg">
                        Thoughts, insights, and tutorials from my journey in software engineering and cloud architecture.
                    </p>
                </motion.div>

                {/* Content area - No animations or scroll effects */}
                <div ref={contentRef} className="transition-all duration-300">
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
                                    className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-[#064141] to-[#00C2FF] text-white font-montserrat hover:from-[#00C2FF] hover:to-[#064141] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                                >
                                    View all articles
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </a>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}