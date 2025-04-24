"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative py-16 md:py-28 overflow-hidden rounded-xl mt-8">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/20 opacity-80"></div>
      
      {/* Decorative dots */}
      <div className="absolute top-12 left-0 w-24 h-80">
        <div className="absolute top-0 left-0 w-2 h-2 rounded-full bg-primary/30"></div>
        <div className="absolute top-8 left-8 w-3 h-3 rounded-full bg-primary/40"></div>
        <div className="absolute top-16 left-16 w-2 h-2 rounded-full bg-primary/30"></div>
        <div className="absolute top-32 left-2 w-4 h-4 rounded-full bg-primary/20"></div>
      </div>
      
      {/* Floating medicine illustration */}
      <div className="absolute right-0 top-0 w-full h-full overflow-hidden">
        <div className="relative w-full h-full">
          <Image 
            src="/medicine-bottles.png" 
            alt="Medicine Bottles" 
            width={600} 
            height={400} 
            className="absolute -right-10 top-0 opacity-60 transform rotate-12 drop-shadow-xl"
          />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <div className="inline-flex items-center px-3 py-1 mb-6 rounded-full bg-background/80 backdrop-blur-sm border border-border text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>
            Trusted by 10,000+ healthcare professionals
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-foreground">
            <span className="relative">
              BRINGING <span className="relative inline-block">
                HEALTH
                <span className="absolute -bottom-2 left-0 right-0 h-3 bg-primary/20"></span>
              </span>
            </span>
            <br />TO YOUR DOORSTEP
          </h1>
          
          <p className="text-lg md:text-xl mb-8 text-muted-foreground leading-relaxed">
            Find detailed information about medicines, their uses, alternatives 
            and side effects. Make informed decisions about your health.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="px-8 group">
              EXPLORE
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" size="lg" className="border-border">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}