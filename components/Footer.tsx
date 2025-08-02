"use client";
import React from "react";
import {
  Github,
  Twitter,
  Moon,
  Sun,
  Monitor,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
// Define types
type Theme = "dark" | "light" | "system";
type ExpandedSections = { [key: number]: boolean };

const Footer = () => {
  const [expandedSections, setExpandedSections] =
    React.useState<ExpandedSections>({});

  const { theme, toggleTheme } = useTheme();

  const toggleSection = (section: number) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const footerSections = [
    {
      title: "Product & Solutions",
      links: [
        { name: "DX Platform", href: "#" },
        { name: "Infrastructure", href: "#" },
        { name: "Storage", href: "#" },
        { name: "Analytics", href: "#" },
        { name: "Turbo", href: "#" },
        { name: "Enterprise", href: "#" },
        { name: "CLI & API", href: "#" },
      ],
    },
    {
      title: "Resources & Help",
      links: [
        { name: "Docs", href: "#" },
        { name: "Pricing", href: "#" },
        { name: "Customers", href: "#" },
        { name: "Integrations", href: "#" },
        { name: "Templates", href: "#" },
        { name: "Guides", href: "#" },
        { name: "Help", href: "#" },
      ],
    },
    {
      title: "Company & Support",
      links: [
        { name: "About", href: "#" },
        { name: "Careers", href: "#" },
        { name: "hawiyatconf ↗", href: "#" },
        { name: "Partners", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Contact Us", href: "#" },
        { name: "Open Source", href: "#" },
        { name: "Security", href: "#" },
        { name: "Privacy Policy", href: "#" },
      ],
    },
  ];

  return (
    <footer className="bg-white dark:bg-black mt-24 text-gray-700 dark:text-gray-300 py-8 px-6 w-full">
      <div className="w-full max-w-none mx-auto">
        {/* Mobile Layout */}
        <div className="block md:hidden">
          {/* Logo and Social */}
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.svg"
                alt="Hawiyat Logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                © 2025
              </span>
            </div>
            <div className="flex gap-3">
              <a
                href="#"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <Github size={18} />
              </a>
              <a
                href="#"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Theme Selector */}
          <div className="mb-6">
            <h3 className="text-gray-900 dark:text-white font-medium mb-3 text-sm">
              Theme
            </h3>
            <div className="flex items-center gap-1 rounded-md p-1 w-fit">
              <button
                onClick={() => toggleTheme()}
                className={`p-1.5 rounded transition-colors ${
                  theme === "dark"
                    ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                <Moon size={14} />
              </button>
              <button
                onClick={() => toggleTheme()}
                className={`p-1.5 rounded transition-colors ${
                  theme === "light"
                    ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                <Sun size={14} />
              </button>
              <button
                onClick={() => toggleTheme()}
                className={`p-1.5 rounded transition-colors ${
                  theme === "system"
                    ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                <Monitor size={14} />
              </button>
            </div>
          </div>

          {/* Expandable Sections */}
          {footerSections.map((section, index) => (
            <div
              key={section.title}
              className="border-b border-gray-200 dark:border-gray-800 last:border-b-0"
            >
              <button
                onClick={() => toggleSection(index)}
                className="flex items-center justify-between w-full py-4 text-left"
              >
                <h3 className="text-gray-900 dark:text-white font-medium text-sm">
                  {section.title}
                </h3>
                {expandedSections[index] ? (
                  <ChevronUp
                    size={16}
                    className="text-gray-500 dark:text-gray-400"
                  />
                ) : (
                  <ChevronDown
                    size={16}
                    className="text-gray-500 dark:text-gray-400"
                  />
                )}
              </button>

              {expandedSections[index] && (
                <div className="pb-4 grid grid-cols-2 gap-x-4 gap-y-2">
                  {section.links.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Command K and Copyright */}
          <div className="pt-4 flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
            <span>All rights reserved</span>
            <div className="flex items-center gap-1">
              <span>⌘</span>
              <span>K</span>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:grid grid-cols-8 gap-8">
          {/* Logo and Copyright */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/logo.svg"
                alt="Hawiyat Logo"
                width={32}
                height={32}
                className="w-10 h-10"
              />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                © 2025
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              All right reserved
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href="#"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href="#"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Product Column */}
          <div className="md:col-span-1">
            <h3 className="text-gray-900 dark:text-white font-medium mb-4">
              Product
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors"
                >
                  DX Platform
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors"
                >
                  Infrastructure
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors"
                >
                  Storage
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors"
                >
                  Analytics
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors"
                >
                  Changelog
                </a>
              </li>
            </ul>
          </div>

          {/* Solutions Column */}
          <div className="md:col-span-1">
            <h3 className="text-gray-900 dark:text-white font-medium mb-4">
              Solutions
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors"
                >
                  Turbo
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors"
                >
                  Enterprise
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors"
                >
                  CLI & API
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="md:col-span-1">
            <h3 className="text-gray-900 dark:text-white font-medium mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors"
                >
                  Docs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors"
                >
                  Customers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors"
                >
                  Integrations
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors"
                >
                  Templates
                </a>
              </li>
            </ul>
          </div>

          {/* Experts Column */}
          <div className="md:col-span-1">
            <h3 className="text-gray-900 dark:text-white font-medium mb-4">
              Experts
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors"
                >
                  Guides
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors"
                >
                  Help
                </a>
              </li>
              <li>
                <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm">
                  <span>⌘</span>
                  <span>K</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="md:col-span-1">
            <h3 className="text-gray-900 dark:text-white font-medium mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors flex items-center gap-1"
                >
                  hawiyatconf <span className="text-xs">↗</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors"
                >
                  Partners
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div className="md:col-span-1">
            <h3 className="text-gray-900 dark:text-white font-medium mb-4">
              Support
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors"
                >
                  Open Source
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors"
                >
                  Security
                </a>
              </li>
              <li>
                <button className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors flex items-center gap-1">
                  Legal <ChevronDown size={12} />
                </button>
              </li>
            </ul>
          </div>

          {/* Preferences Column */}
          <div className="md:col-span-1">
            <h3 className="text-gray-900 dark:text-white font-medium mb-4">
              Preferences
            </h3>
            <div className="flex items-center gap-1 rounded-md p-1">
              <button
                onClick={() => toggleTheme()}
                className={`p-1.5 rounded transition-colors ${
                  theme === "dark"
                    ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                <Moon size={16} />
              </button>
              <button
                onClick={() => toggleTheme()}
                className={`p-1.5 rounded transition-colors ${
                  theme === "light"
                    ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                <Sun size={16} />
              </button>
              <button
                onClick={() => toggleTheme()}
                className={`p-1.5 rounded transition-colors ${
                  theme === "system"
                    ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                <Monitor size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
