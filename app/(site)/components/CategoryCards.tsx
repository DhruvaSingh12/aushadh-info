"use client";

import React from "react";
import Image from "next/image";
import { ArrowRightIcon, Sparkles } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const categories = [
  {
    title: "Prescription medicine",
    description: "Over 300k+ prescription medicines at your fingertips",
    bgClass: "bg-primary/10",
    image: "/four.webp",
    icon: "💊",
    href: "/medicine?type=prescription"
  },
  {
    title: "Surgical product",
    description: "Trusted surgical tools for your hospital",
    bgClass: "bg-accent/10",
    image: "/surgical-tools.jpg",
    icon: "🔬",
    href: "/medicine?type=surgical"
  },
  {
    title: "Supplements & vitamins",
    description: "Essential nutrients for a healthier you",
    bgClass: "bg-secondary/10",
    image: "/three.webp",
    icon: "💪",
    href: "/medicine?type=supplements"
  }
];

export default function CategoryCards() {
  return (
    <div className="py-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold">Browse by Category</h2>
        <Link 
          href="/medicine" 
          className="text-sm text-muted-foreground hover:text-primary flex items-center group transition-colors"
        >
          View all categories 
          <ArrowRightIcon className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <Link 
            key={index} 
            href={category.href}
            className="group transition-all duration-300 hover:scale-[1.02]"
          >
            <div className={cn(
              "rounded-xl p-6 h-full flex flex-col relative overflow-hidden border border-border",
              category.bgClass
            )}>
              <div className="absolute bottom-0 right-0 opacity-30">
                <Image
                  src={category.image}
                  alt={category.title}
                  width={180}
                  height={180}
                  className="object-cover"
                />
              </div>
              <div className="mb-4 text-4xl">{category.icon}</div>
              <h3 className="text-xl font-bold mb-2">{category.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
              <div className="mt-auto flex items-center text-sm font-medium text-foreground">
                Explore <ArrowRightIcon className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Categories */}
      <div className="mt-10">
        <div className="flex items-center mb-4">
          <span className="h-px bg-border flex-grow"></span>
          <span className="px-4 text-sm font-medium text-muted-foreground">QUICK CATEGORIES</span>
          <span className="h-px bg-border flex-grow"></span>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          <CategoryPill icon="💉" label="Diabetes Care" bgClass="bg-primary/5" />
          <CategoryPill icon="🍎" label="Vitamins & Supplements" bgClass="bg-accent/5" />
          <CategoryPill icon="🤕" label="Pain Relief" bgClass="bg-secondary/5" />
          <CategoryPill icon="🤧" label="Allergy" bgClass="bg-primary/5" />
          <CategoryPill icon="🧴" label="Skin Care Treatments" bgClass="bg-accent/5" />
          <CategoryPill icon="🧠" label="Mental Wellness" bgClass="bg-secondary/5" />
          <CategoryPill icon="🦴" label="Bone & Joint Support" bgClass="bg-primary/5" />
        </div>
      </div>

      {/* Popular Vitamins */}
      <div className="mt-16 bg-background border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold flex items-center">
            <Sparkles className="mr-2 h-5 w-5 text-primary" />
            Popular Vitamins
          </h3>
          <Link 
            href="/medicine?category=vitamins" 
            className="text-sm text-muted-foreground hover:text-primary flex items-center group transition-colors"
          >
            See all vitamins 
            <ArrowRightIcon className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <VitaminCard name="Biotin Supplement" bgClass="bg-primary/10" />
          <VitaminCard name="Goji Berry" bgClass="bg-accent/10" />
          <VitaminCard name="Turmeric" bgClass="bg-secondary/10" />
          <VitaminCard name="Calcium Nutrition" bgClass="bg-background" />
        </div>
      </div>
    </div>
  );
}

function CategoryPill({ icon, label, bgClass }: { icon: string; label: string; bgClass: string }) {
  return (
    <div className={cn(
      "rounded-full px-4 py-2 flex items-center gap-2 hover:shadow transition cursor-pointer border border-border",
      bgClass
    )}>
      <span>{icon}</span>
      <span className="font-medium text-sm truncate">{label}</span>
    </div>
  );
}

function VitaminCard({ name, bgClass }: { name: string; bgClass: string }) {
  return (
    <div className={cn(
      "rounded-lg p-4 text-center hover:shadow-md transition cursor-pointer border border-border", 
      bgClass
    )}>
      <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-background/50 flex items-center justify-center p-2 border border-border">
        <Image 
          src="/two.webp"
          alt={name}
          width={80}
          height={80}
          className="object-contain"
        />
      </div>
      <h4 className="font-medium">{name}</h4>
    </div>
  );
}