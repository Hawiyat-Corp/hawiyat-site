"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="absolute top-0 left-0 w-full z-50">
      <div
        className="
    flex justify-between lg:justify-around items-center 
    h-14 lg:h-16 
    bg-white/5 dark:bg-black/5
    backdrop-blur-lg 
    border-b border-black/10 dark:border-white/10
    px-4 sm:px-6 lg:px-8
    transition-all duration-300
  "
      >
        {/* Logo block */}
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
        <div className="hidden lg:flex justify-around items-center gap-x-6 xl:gap-x-8 text-black dark:text-white">
          <Link
            href="/Products"
            className="hover:text-[#2BFFFF] transition-colors duration-200 font-medium text-sm"
          >
            Products
          </Link>
          <Link
            href="/templates"
            className="hover:text-[#2BFFFF] transition-colors duration-200 font-medium text-sm"
          >
            Templates
          </Link>
          <Link
            href="/#Features"
            className="hover:text-[#2BFFFF] transition-colors duration-200 font-medium text-sm"
          >
            Features
          </Link>
          <Link
            href="/#feedback"
            className="hover:text-[#2BFFFF] transition-colors duration-200 font-medium text-sm"
          >
            Feedback
          </Link>
        </div>

        {/* Desktop CTA Button */}
        <Link
          href="/waitlist"
          className="hidden lg:block bg-[#2BFFFF] hover:bg-[#1CDDDD] 
        py-2 px-4 rounded-2xl text-black font-semibold 
        transition-all duration-200 hover:shadow-lg hover:shadow-[#2BFFFF]/25
        active:scale-95 text-sm "
        >
          Get Started
        </Link>

        {/* Mobile hamburger */}
        <button
          onClick={toggleMenu}
          className="lg:hidden z-50 relative p-2 text-white dark:text-black hover:text-[#2BFFFF] transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Mobile overlay */}
      {isMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 dark:bg-white/40 z-30"
          onClick={closeMenu}
        />
      )}

      {/* Mobile menu */}
      <div
        className={`
      lg:hidden fixed top-0 right-0 h-full w-72 max-w-[80vw]
      bg-black/20 dark:bg-white/20 backdrop-blur-xl 
      border-l border-white/20 dark:border-black/20
      transform transition-transform duration-300 ease-in-out z-40
      ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
    `}
      >
        <div className="flex flex-col pt-20 pb-6 px-6">
          {/* Mobile nav links */}
          <div className="flex flex-col space-y-4 mb-6">
            <Link
              href="/Products"
              className="text-white dark:text-black hover:text-[#2BFFFF] transition-colors duration-200 
            font-medium text-base py-2 border-b border-white/10 dark:border-black/10"
              onClick={closeMenu}
            >
              Products
            </Link>
            <Link
              href="/templates"
              className="text-white dark:text-black hover:text-[#2BFFFF] transition-colors duration-200 
            font-medium text-base py-2 border-b border-white/10 dark:border-black/10"
              onClick={closeMenu}
            >
              Templates
            </Link>
            <Link
              href="/#Features"
              className="text-white dark:text-black hover:text-[#2BFFFF] transition-colors duration-200 
            font-medium text-base py-2 border-b border-white/10 dark:border-black/10"
              onClick={closeMenu}
            >
              Features
            </Link>
            <Link
              href="/#feedback"
              className="text-white dark:text-black hover:text-[#2BFFFF] transition-colors duration-200 
            font-medium text-base py-2 border-b border-white/10 dark:border-black/10"
              onClick={closeMenu}
            >
              Feedback
            </Link>
          </div>

          {/* Mobile CTA button */}
          <Link
            href="/waitlist"
            className="bg-[#2BFFFF] hover:bg-[#1CDDDD] 
          py-3 px-6 rounded-[50px] text-black dark:text-white font-semibold 
          text-center transition-all duration-200 
          hover:shadow-lg hover:shadow-[#2BFFFF]/25
          active:scale-95"
            onClick={closeMenu}
          >
            Get Started
          </Link>

          {/* Mobile footer */}
          <div className="mt-6 pt-4 border-t border-white/10 dark:border-black/10">
            <p className="text-gray-400 dark:text-gray-600 text-xs text-center">
              © 2025 Hawiyat. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
}
