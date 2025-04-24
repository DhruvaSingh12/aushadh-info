"use client";

import React from "react";
import { 
  Search, 
  Database, 
  RefreshCw, 
  Shield, 
  CalendarClock, 
  FileText 
} from "lucide-react";

const features = [
  {
    icon: <Search className="h-6 w-6" />,
    title: "Comprehensive Search",
    description: "Search across our extensive database of medicines using names, compositions, or therapeutic class."
  },
  {
    icon: <Database className="h-6 w-6" />,
    title: "Detailed Information",
    description: "Access comprehensive details about medicines including side effects, substitutes, and usage guidelines."
  },
  {
    icon: <RefreshCw className="h-6 w-6" />,
    title: "Alternative Medicines",
    description: "Discover substitute medicines with similar therapeutic effects for cost-effective healthcare."
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Safety Information",
    description: "Learn about potential side effects, drug interactions, and safety precautions for informed decisions."
  },
  {
    icon: <CalendarClock className="h-6 w-6" />,
    title: "Medication Tracking",
    description: "Keep track of your medications, dosage schedules, and refill reminders in one place."
  },
  {
    icon: <FileText className="h-6 w-6" />,
    title: "Health Records",
    description: "Maintain your medical history and share important information with healthcare providers."
  }
];

export default function FeatureSection() {
  return (
    <div className="py-16">
      <div className="relative mb-16">
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-40 h-px bg-primary/20"></div>
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full bg-primary/5 border border-primary/10 text-xs font-medium text-primary">
            Features
          </div>
          <h2 className="text-3xl font-bold mb-4">Comprehensive Medicine Information</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Our platform provides detailed information about medications, helping you understand your 
            treatment options and make informed healthcare decisions.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div 
            key={index}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg transform transition-transform group-hover:scale-105 duration-300"></div>
            <div className="relative border border-border bg-background rounded-lg p-6 transition-all">
              <div className="bg-gradient-to-r from-primary/10 to-primary/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-primary">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}