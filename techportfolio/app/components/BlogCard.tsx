"use client"

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Define TypeScript interface for article prop
interface ArticleProps {
    title: string;
    description?: string;
    image?: string;
    date?: string;
    link: string;
    categories?: string[];
}

const BlogCard = ({ article }: { article: ArticleProps }) => {
    // Add defensive check
    if (!article) {
        return (
            <div className="w-full max-w-sm mx-auto">
                <div className="overflow-hidden rounded-xl bg-[#0f1923] border border-[#1e2a36] shadow-lg p-6 text-center">
                    <p className="text-[#9BA8AB]">Error: Missing article data</p>
                </div>
            </div>
        );
    }

    // Create safe article object with fallbacks
    const safeArticle = {
        title: article.title || "Untitled Article",
        description: article.description || "No description available",
        // FIXED: Changed image fallback logic - was using default first which would always override
        image: article.image || "/images/profilepicture/blog.jpg",
        date: article.date || "No date",
        link: article.link || "#",
        categories: article.categories || []
    };

    return (
        <motion.div
            className="w-full max-w-sm mx-auto"
            whileHover={{
                scale: 1.05,
                rotateY: 10,
                rotateX: -10,
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)"
            }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 20
            }}
            // UPDATED: Added data-scroll attributes for smooth scrolling
            data-scroll
            data-scroll-offset="30%"
        >
            <div className="overflow-hidden rounded-xl bg-[#0f1923] border border-[#1e2a36] shadow-lg h-[400px] flex flex-col">
                {/* Card Image */}
                <div className="h-48 overflow-hidden relative">
                    {safeArticle.image ? (
                        <div className="relative w-full h-full">
                            <Image
                                src={safeArticle.image}
                                alt={safeArticle.title}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover transition-transform duration-500 hover:scale-110"
                                onError={(e) => {
                                    // Fallback if image fails to load
                                    const target = e.target as HTMLImageElement;
                                    target.src = "/images/profilepicture/blog.jpg";
                                }}
                            />
                        </div>
                    ) : (
                        <div className="w-full h-full bg-[#1e2a36] flex items-center justify-center">
                            <span className="text-[#00C2FF] text-4xl">📝</span>
                        </div>
                    )}
                </div>

                {/* Card Content */}
                <div className="p-6 flex flex-col flex-grow">
                    {/* UPDATED: Applied Montserrat font to title */}
                    <h3 className="font-montserrat text-xl font-semibold mb-2 line-clamp-2 text-[#CCDCCF] hover:text-[#00C2FF] transition-colors">
                        {safeArticle.title}
                    </h3>

                    {/* UPDATED: Applied Raleway font to date */}
                    <p className="font-raleway text-xs text-[#9BA8AB] mb-2">
                        {safeArticle.date}
                    </p>

                    {/* UPDATED: Applied Raleway font to description */}
                    <p className="font-raleway text-sm mb-4 flex-grow line-clamp-3 text-[#9BA8AB]">
                        {safeArticle.description}
                    </p>

                    <div className="flex items-end justify-between mt-auto">
                        {safeArticle.categories && safeArticle.categories.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                                {safeArticle.categories.slice(0, 2).map((category, idx) => (
                                    <span
                                        key={idx}
                                        className="font-raleway text-xs px-2 py-0.5 rounded-full bg-[#00C2FF]/15 text-[#00C2FF]"
                                    >
                                        {category}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* UPDATED: Applied Montserrat font to button */}
                        <Link
                            href={safeArticle.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-montserrat px-2 py-2 rounded-md text-sm font-medium transition-all transform hover:translate-y-[-2px] bg-[#00C2FF] text-[#061418]"
                        >
                            Read More
                        </Link>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default BlogCard;