'use client';

import { useState } from 'react';

interface TickerHoverEffectProps {
    items: string[];
}

export default function TickerHoverEffect({ items }: TickerHoverEffectProps) {
    const [isHovered, setIsHovered] = useState<boolean>(false);

    // Use the first item as the text, or combine all items
    const text = items.length === 1 ? items[0] : items.join(' • ');

    // Repeat the text many times for continuous scrolling
    const tickerItems: string[] = Array(20).fill(text);

    return (
        <div className="w-screen">
            <div
                className={`relative overflow-hidden transition-all duration-500 font-boska ${isHovered ? 'bg-white' : 'bg-transparent'
                    }`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Top border line */}
                <div className="w-full h-[1px] bg-white"></div>

                <div className="overflow-hidden">
                    <div
                        className={`flex whitespace-nowrap py-8 transition-colors duration-500 ${isHovered ? 'text-black' : 'text-white'
                            }`}
                        style={{
                            animation: isHovered ? 'ticker 30s linear infinite' : 'none',
                            transform: isHovered ? 'translateX(0)' : 'none'
                        }}
                    >
                        {!isHovered ? (
                            // Static centered text when not hovering
                            <div className="w-full flex justify-center">
                                <span className="text-6xl font-bold uppercase tracking-wider italic">
                                    {text}
                                </span>
                            </div>
                        ) : (
                            // Scrolling text when hovering
                            tickerItems.map((item, index) => (
                                <div
                                    key={index}
                                    className="inline-flex items-center px-6"
                                >
                                    <span className="text-6xl font-bold uppercase tracking-wider italic">
                                        {item}
                                    </span>
                                    <span className="text-4xl mx-6">*</span>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Bottom border line */}
                <div className="w-full h-[1px] bg-white"></div>
            </div>

            <style jsx>{`
                @keyframes ticker {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
            `}</style>
        </div>
    );
}
