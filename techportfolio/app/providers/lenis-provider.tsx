/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import Lenis from "lenis"

// Create a more specific type for the Lenis instance
type LenisInstance = any;

// Create context with null as default value
const SmoothScrollContext = createContext<LenisInstance | null>(null)

// Custom hook to use the scroll context
export const useSmoothScroll = () => useContext(SmoothScrollContext)

// Props type for the provider
interface SmoothScrollProviderProps {
    children: ReactNode;
}

// Provider component
export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
    const [lenis, setLenis] = useState<LenisInstance | null>(null)

    useEffect(() => {
        const lenisInstance = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
        })

        function raf(time: number) {
            lenisInstance.raf(time)
            requestAnimationFrame(raf)
        }

        const animationFrame = requestAnimationFrame(raf)

        setLenis(lenisInstance)

        return () => {
            cancelAnimationFrame(animationFrame)
            lenisInstance.destroy()
        }
    }, [])

    return (
        <SmoothScrollContext.Provider value={lenis}>
            {children}
        </SmoothScrollContext.Provider>
    )
}