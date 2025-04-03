// components/Header.tsx
import Link from 'next/link';

export default function Header() {
    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-transparent py-6">
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link href="/" className="text-white text-2xl font-bold">
                    Nagarjun Mallesh.
                </Link>

                <nav className="hidden md:flex space-x-8">
                    <Link href="#introduction" className="text-cyan-400 hover:text-white transition-colors">
                        Home
                    </Link>
                    <Link href="#about" className="text-white hover:text-cyan-400 transition-colors">
                        About
                    </Link>
                    <Link href="#blogs" className="text-white hover:text-cyan-400 transition-colors">
                        Blogs
                    </Link>
                    <Link href="#contact" className="text-white hover:text-cyan-400 transition-colors">
                        Contact
                    </Link>
                </nav>
            </div>
        </header>
    );
}