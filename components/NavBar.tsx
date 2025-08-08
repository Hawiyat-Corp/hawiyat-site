'use client';

import Link from "next/link";
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    // Simulate loading
    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 1500); // 1.5s fake delay
        return () => clearTimeout(timeout);
    }, []);

    if (loading) {
        return (
            <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
                <p className="text-white text-lg font-semibold animate-pulse">Loading...</p>
            </div>
        );
    }

    return (
        <nav className="absolute top-0 left-0 w-full z-50">
            <div className="flex justify-between lg:justify-around items-center h-14 lg:h-16 
                bg-white/5 dark:bg-black/10 backdrop-blur-lg border-b border-white/10 
                px-4 sm:px-6 lg:px-8">

                {/* Logo */}
                <Link 
                    href="/" 
                    className="font-bold text-lg lg:text-xl flex items-center gap-2 font-poppins z-50 relative"
                    onClick={closeMenu}
                >
                    <Image
                        src="/logo.svg"
                        width={32}
                        height={32}
                        alt="Hawiyat Logo"
                        className="w-7 h-7 lg:w-8 lg:h-8"
                    />
                    <span className="text-black dark:text-white">Hawiyat</span>
                </Link>

                {/* Desktop menu */}
                <div className="hidden lg:flex items-center gap-x-6 xl:gap-x-8 text-black dark:text-white">
                    <Link href="/Products" className="hover:text-[#2BFFFF] transition-colors font-medium text-sm">Products</Link>
                    <Link href="/templates" className="hover:text-[#2BFFFF] transition-colors font-medium text-sm">Templates</Link>
                    <Link href="/#Features" className="hover:text-[#2BFFFF] transition-colors font-medium text-sm">Features</Link>
                    <Link href="/#feedback" className="hover:text-[#2BFFFF] transition-colors font-medium text-sm">Feedback</Link>
                </div>

                {/* Desktop CTA */}
                <div className="hidden lg:flex items-center gap-4">
                    <Link 
                        href="/waitlist" 
                        className="bg-[#2BFFFF] hover:bg-[#1CDDDD] 
                            py-2 px-4 rounded-2xl text-black font-semibold 
                            transition-all duration-200 hover:shadow-lg hover:shadow-[#2BFFFF]/25
                            active:scale-95 text-sm"
                    >
                        Get Started
                    </Link>
                </div>

                {/* Mobile menu button */}
                <button
                    onClick={toggleMenu}
                    className="lg:hidden z-50 relative p-2 text-black dark:text-white hover:text-[#2BFFFF] transition-colors"
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {/* Mobile overlay */}
            {isMenuOpen && (
                <div 
                    className="lg:hidden fixed inset-0 bg-black/50 z-30"
                    onClick={closeMenu}
                />
            )}

            {/* Mobile menu */}
            <div className={`
                lg:hidden fixed top-0 right-0 h-full w-72 max-w-[80vw]
                bg-white dark:bg-black backdrop-blur-xl border-l border-white/20
                transform transition-transform duration-300 ease-in-out z-40
                ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
            `}>
                <div className="flex flex-col pt-20 pb-6 px-6 text-black dark:text-white">
                    {/* Links */}
                    <div className="flex flex-col space-y-4 mb-6">
                        <Link href="/Products" onClick={closeMenu} className="hover:text-[#2BFFFF] transition-colors text-base py-2 border-b border-white/10">Products</Link>
                        <Link href="/templates" onClick={closeMenu} className="hover:text-[#2BFFFF] transition-colors text-base py-2 border-b border-white/10">Templates</Link>
                        <Link href="/#Features" onClick={closeMenu} className="hover:text-[#2BFFFF] transition-colors text-base py-2 border-b border-white/10">Features</Link>
                        <Link href="/#feedback" onClick={closeMenu} className="hover:text-[#2BFFFF] transition-colors text-base py-2 border-b border-white/10">Feedback</Link>
                    </div>

                    {/* CTA */}
                    <Link href="/waitlist" onClick={closeMenu}
                        className="bg-[#2BFFFF] hover:bg-[#1CDDDD] 
                            py-3 px-6 rounded-[50px] text-black font-semibold 
                            text-center transition-all duration-200 
                            hover:shadow-lg hover:shadow-[#2BFFFF]/25
                            active:scale-95">
                        Get Started
                    </Link>

                    {/* Footer */}
                    <div className="mt-6 pt-4 border-t border-white/10">
                        <p className="text-gray-500 dark:text-gray-400 text-xs text-center">
                            © 2025 Hawiyat. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </nav>
    );
}
