"use client"

import React, { useEffect, useRef, useState } from 'react'
import SplitText from './IntroText'
import Image from 'next/image'
import { animate } from "motion"

const Introduction = () => {
    const imageRef = useRef<HTMLDivElement>(null)
    const [isClient, setIsClient] = useState(false)

    // Run once on mount to indicate we're on the client
    useEffect(() => {
        setIsClient(true)
    }, [])

    // Run animation only after hydration
    useEffect(() => {
        if (!isClient || !imageRef.current) return

        document.fonts.ready.then(() => {
            // Animate the image with a slight delay after text
            if (imageRef.current) {
                animate(
                    imageRef.current,
                    {
                        opacity: [0, 1],
                        scale: [0.9, 1],
                        y: [20, 0]
                    },
                    {
                        type: "spring",
                        duration: 2,
                        bounce: 0.2,
                        delay: 0.7,
                    }
                )
            }
        })
    }, [isClient])

    return (
        <div className='flex flex-col md:flex-row items-center justify-between min-h-screen w-full px-4 md:px-12 bg-dark-navy'>
            <div className="z-10 md:w-1/2 flex flex-col items-start ml-5 p-10">
                <SplitText />

                <div className="mt-10 flex space-x-4">
                    <a
                        href="#contact"
                        className="bg-cyan-400 hover:bg-cyan-500 text-dark-navy px-8 py-3 rounded-md font-medium transition-all"
                    >
                        Hire Me
                    </a>
                    <a
                        href="#about"
                        className="bg-transparent hover:bg-cyan-400/10 text-cyan-400 border border-cyan-400 px-8 py-3 rounded-md font-medium transition-all"
                    >
                        About Me
                    </a>
                </div>
            </div>

            {/* Image container with gradient fade to background */}
            <div
                ref={imageRef}
                className="relative md:w-2/5 mt-8 md:mt-0 flex justify-center"
                style={{ opacity: isClient ? 0 : 1 }} // Hide initially on client
            >
                {/* Oval/circular container */}
                <div className="relative w-[320px] h-[320px] md:w-[400px] md:h-[400px]">
                    {/* Main content with gradient mask */}
                    <div className="absolute inset-0 overflow-hidden" style={{
                        borderRadius: "50%",
                    }}>
                        {/* Image */}
                        <div className="relative w-full h-full">
                            <Image
                                src="/images/profilepicture/nagarjun.jpg"
                                alt="Nagarjun Mallesh"
                                fill
                                className="object-cover"
                                priority
                            />

                            {/* Gradient overlay that fades the image into the background */}
                            <div
                                className="absolute inset-0"
                                style={{
                                    background: 'radial-gradient(circle at center, transparent 70%, #0F1923 100%)',
                                    mixBlendMode: 'normal',
                                }}
                            ></div>
                        </div>
                    </div>

                    {/* Optional - subtle glow effect */}
                    <div
                        className="absolute -inset-4 opacity-30 -z-10"
                        style={{
                            background: 'radial-gradient(circle at center, rgba(34, 211, 238, 0.1) 0%, transparent 70%)',
                            borderRadius: "50%",
                        }}
                    ></div>
                </div>
            </div>
        </div>
    )
}

export default Introduction