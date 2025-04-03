"use client"

import { useEffect, useState, createContext, useContext } from "react";
import Lenis from "@studio-freight/lenis";

// Use proper typing for the context
const SmoothScrollContext = createContext<Lenis | null>(null);
export const useSmoothScroll = () => useContext(SmoothScrollContext);

export default function ScrollProvider({ children }: { children: React.ReactNode }) {
    const [lenis, setLenis] = useState<Lenis | null>(null);

    useEffect(() => {
        // Initialize Lenis with correct type options
        const lenisInstance = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            // Remove 'direction' property if not in the type
            // direction: 'vertical', - removed
            gestureOrientation: 'vertical',
            smoothWheel: true, // Use this instead of 'gestureDirection'
            touchMultiplier: 2,
        });

        // Setup the animation frame
        function raf(time: number) {
            lenisInstance.raf(time);
            requestAnimationFrame(raf);
        }

        const animationFrame = requestAnimationFrame(raf);

        // Store the Lenis instance
        setLenis(lenisInstance);

        // Cleanup function
        return () => {
            cancelAnimationFrame(animationFrame);
            lenisInstance.destroy();
        };
    }, []);

    // Fix JSX syntax error - remove spaces around braces
    return (
        <SmoothScrollContext.Provider value={lenis}>
            {children}
        </SmoothScrollContext.Provider>
    );
}