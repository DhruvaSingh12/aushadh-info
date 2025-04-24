"use client";

import React from "react";
import Hero from "./components/Hero";
import FeatureSection from "./components/FeatureSection";
import CategoryCards from "./components/CategoryCards";
import StatsSection from "./components/StatsSection";
import UserButton from "@/components/UserButton";
import Link from "next/link";
import { Search, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme } = useTheme();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Modern Navigation Bar */}
      <nav 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-transparent"
        )}
      >
        <div className="container mx-auto">
          <div className="flex items-center justify-between h-16 lg:h-20 px-4">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative flex items-center">
                <span className={cn(
                  "font-extrabold tracking-tighter text-2xl lg:text-3xl cursor-pointer",
                  theme === "dark" ? "text-white" : "text-black",
                  "font-serif"
                )}>
                  <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Aushadh</span>
                  <span className={cn(theme === "dark" ? "text-white" : "text-black")}>Info</span>
                </span>
                <div className="absolute -top-1 -right-2 w-2 h-2 bg-blue-500 rounded-full"></div>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              <NavLink href="/medicine">Medicines</NavLink>
              <NavLink href="/therapeutics">Therapeutics</NavLink>
              <NavLink href="/manufacturer">Manufacturers</NavLink>
              <NavLink href="/about">About</NavLink>
              <NavLink href="/contact">Contact</NavLink>
            </div>

            {/* Desktop Action Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <button className="p-2 rounded-full bg-background hover:bg-muted transition-colors duration-200">
                <Search className="w-5 h-5" />
              </button>
              <UserButton className="ml-2" />
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-3 lg:hidden">
              <button 
                className="p-2 rounded-full bg-background hover:bg-muted transition-colors duration-200"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden bg-background/95 backdrop-blur-md border-t border-border">
              <div className="py-4 px-4 space-y-3">
                <MobileNavLink href="/medicine" onClick={() => setIsMenuOpen(false)}>Medicines</MobileNavLink>
                <MobileNavLink href="/therapeutics" onClick={() => setIsMenuOpen(false)}>Therapeutics</MobileNavLink>
                <MobileNavLink href="/manufacturer" onClick={() => setIsMenuOpen(false)}>Manufacturers</MobileNavLink>
                <MobileNavLink href="/about" onClick={() => setIsMenuOpen(false)}>About</MobileNavLink>
                <MobileNavLink href="/contact" onClick={() => setIsMenuOpen(false)}>Contact</MobileNavLink>
                
                <div className="pt-3 flex items-center justify-between border-t border-border mt-3">
                  <button className="p-2 rounded-full bg-background hover:bg-muted transition-colors duration-200">
                    <Search className="w-5 h-5" />
                  </button>
                  <UserButton />
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      <main className="container mx-auto pt-20">
        {/* Hero Section */}
        <Hero />

        {/* Category Cards */}
        <CategoryCards />

        {/* Feature Section */}
        <FeatureSection />

        {/* Stats Section */}
        <StatsSection />
      </main>

      {/* Footer */}
      <footer className="bg-background border-t border-border mt-20 py-10">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Aushadh Info</h3>
            <p className="text-muted-foreground">Providing comprehensive information about medicines, their uses, and side effects to help you make informed decisions.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/medicine" className="text-muted-foreground hover:text-primary transition-colors">Browse Medicines</Link></li>
              <li><a href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</a></li>
              <li><a href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <address className="not-italic text-muted-foreground">
              <p>Email: info@aushadh.info</p>
              <p>Phone: +91 123-456-7890</p>
            </address>
          </div>
        </div>
        <div className="container mx-auto mt-8 pt-8 border-t border-border text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Aushadh Info. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      className="relative text-muted-foreground hover:text-foreground text-sm font-medium transition-colors after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className="block py-2 text-muted-foreground hover:text-foreground font-medium transition-colors"
    >
      {children}
    </Link>
  );
}