"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, X, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  onGetStartedClick?: () => void;
  currentPath?: string;
}

export default function Navbar({ onGetStartedClick, currentPath = "/" }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/#try", label: "Demo", isScroll: true },
    { href: "/#features", label: "Features", isScroll: true },
    { href: "/#pricing", label: "Pricing", isScroll: true },
    { href: "/#testimonials", label: "Testimonials", isScroll: true },
    { href: "/blog", label: "Blog", isScroll: false },
    { href: "/team", label: "Our Team", isScroll: false },
    { href: "/contact", label: "Contact", isScroll: false },
  ];

  const handleNavClick = (href: string, isScroll: boolean) => {
    setIsMobileMenuOpen(false);
    
    // If it's a scroll link and we're on the home page
    if (isScroll && currentPath === "/") {
      const element = document.querySelector(href.substring(1)); // Remove the leading slash
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass-effect border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 group-hover:text-blue-600 transition-colors" />
            <span className="text-lg sm:text-xl font-bold gradient-text">
              PagePerfect AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              link.isScroll && currentPath === "/" ? (
                <a
                  key={link.href}
                  href={link.href}
                  className="transition-colors font-medium text-gray-600 hover:text-gray-900"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href, link.isScroll);
                  }}
                >
                  {link.label === "Demo" ? (
                    <span className="relative inline-flex items-center justify-center p-0 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-full shadow-md group">
                      <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
                        {/* arrow icon */}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                      </span>
                      <span className="absolute flex items-center justify-center w-full h-full text-purple-600 transition-all duration-300 transform group-hover:translate-x-full ease">Demo</span>
                      <span className="relative invisible px-3 py-1.5">Demo</span>
                    </span>
                  ) : (
                    link.label
                  )}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors font-medium ${
                    currentPath === link.href
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {link.label === "Demo" ? (
                    <span className="relative inline-flex items-center justify-center p-0 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-full shadow-md group">
                      <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                      </span>
                      <span className="absolute flex items-center justify-center w-full h-full text-purple-600 transition-all duration-300 transform group-hover:translate-x-full ease">Demo</span>
                      <span className="relative invisible px-3 py-1.5">Demo</span>
                    </span>
                  ) : (
                    link.label
                  )}
                </Link>
              )
            ))}
            
            {onGetStartedClick && (
              <button
                onClick={onGetStartedClick}
                className="px-4 sm:px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:opacity-90 transition text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl"
              >
                Get Started
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-gray-200 mt-4 overflow-hidden"
            >
              <div className="flex flex-col space-y-2 px-4 py-4">
                {navLinks.map((link) => (
                  link.isScroll && currentPath === "/" ? (
                    <a
                      key={link.href}
                      href={link.href}
                      className="text-gray-600 hover:text-gray-900 transition-colors py-2 px-3 rounded-lg hover:bg-gray-100 font-medium"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link.href, link.isScroll);
                      }}
                    >
                      {link.label === "Demo" ? (
                        <span className="relative inline-flex items-center justify-center p-0 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-full shadow-md group">
                          <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                          </span>
                          <span className="absolute flex items-center justify-center w-full h-full text-purple-600 transition-all duration-300 transform group-hover:translate-x-full ease">Demo</span>
                          <span className="relative invisible px-3 py-1.5">Demo</span>
                        </span>
                      ) : (
                        link.label
                      )}
                    </a>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`transition-colors py-2 px-3 rounded-lg hover:bg-gray-100 font-medium ${
                        currentPath === link.href
                          ? "text-blue-600 bg-blue-50"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label === "Demo" ? (
                        <span className="relative inline-flex items-center justify-center p-0 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-full shadow-md group">
                          <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                          </span>
                          <span className="absolute flex items-center justify-center w-full h-full text-purple-600 transition-all duration-300 transform group-hover:translate-x-full ease">Demo</span>
                          <span className="relative invisible px-3 py-1.5">Demo</span>
                        </span>
                      ) : (
                        link.label
                      )}
                    </Link>
                  )
                ))}
                
                {onGetStartedClick && (
                  <button
                    onClick={() => {
                      onGetStartedClick();
                      setIsMobileMenuOpen(false);
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:opacity-90 transition text-sm w-full text-center font-semibold shadow-lg mt-2"
                  >
                    Get Started
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
