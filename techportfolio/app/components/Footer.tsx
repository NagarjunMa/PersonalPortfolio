// components/Footer.jsx
import React from 'react';
import Link from 'next/link';
import { FaGithub, FaLinkedinIn, FaTwitter, FaMediumM } from 'react-icons/fa';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-black py-12 border-t border-[#1e2a36]">
            <div className="container mx-auto px-4">
                {/* Top section with logo and navigation */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                    {/* Logo/Name */}
                    <div className="mb-6 md:mb-0">
                        <Link href="/" className="text-2xl font-bold tracking-wide" style={{ color: '#FFFFFF' }}>
                            NAGARJUN.
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="flex flex-wrap justify-center gap-8">
                        <Link href="#intro" className="text-white hover:text-[#00C2FF] transition-colors">
                            Home
                        </Link>
                        <Link href="#about" className="text-white hover:text-[#00C2FF] transition-colors">
                            About
                        </Link>
                        <Link href="#techstack" className="text-white hover:text-[#00C2FF] transition-colors">
                            Skills
                        </Link>
                        <Link href="#blog" className="text-white hover:text-[#00C2FF] transition-colors">
                            Blog
                        </Link>
                        <Link href="#contact" className="text-white hover:text-[#00C2FF] transition-colors">
                            Contact
                        </Link>
                    </nav>
                </div>

                {/* Middle section with social links */}
                <div className="flex justify-center space-x-6 mb-10">
                    <a
                        href="https://github.com/NagarjunMa"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-[#00C2FF] transition-colors text-xl"
                        aria-label="GitHub"
                    >
                        <FaGithub />
                    </a>
                    <a
                        href="https://linkedin.com/in/nagarjun-mallesh"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-[#00C2FF] transition-colors text-xl"
                        aria-label="LinkedIn"
                    >
                        <FaLinkedinIn />
                    </a>

                    <a href="https://twitter.com/yourusername"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-[#00C2FF] transition-colors text-xl"
                        aria-label="Twitter"
                    >
                        <FaTwitter />
                    </a>

                    <a href="https://medium.com/@nagarjunmallesh"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-[#00C2FF] transition-colors text-xl"
                        aria-label="Medium"
                    >
                        <FaMediumM />
                    </a>
                </div>

                {/* Bottom section with copyright */}
                <div className="text-center">
                    <p className="text-sm text-white">
                        © {currentYear} Nagarjun Mallesh. All rights reserved.
                    </p>
                    <p className="text-xs mt-2 text-white">
                        Designed & built with ❤️ using Next.js
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;