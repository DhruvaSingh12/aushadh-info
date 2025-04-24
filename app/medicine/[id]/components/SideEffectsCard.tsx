"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SideEffectsCardProps {
  sideEffects: string[];
  onSideEffectClick: (sideEffect: string) => void;
  className?: string;
}

const SideEffectsCard: React.FC<SideEffectsCardProps> = ({ sideEffects, onSideEffectClick, className }) => {
  return (
    <div
      className={cn(
        "flex flex-col w-[300px] lg:w-[350px] h-[300px] overflow-y-auto scrollbar-hide bg-purple-400 relative items-start px-4 py-3 text-card rounded-lg gap-3",
        className
      )}
    >
      <p className="absolute top-3 text-4xl font-extrabold">Side Effects</p>
      <div className="absolute top-[58px] flex  flex-col gap-2">
        {sideEffects.map((sideEffect, index) => (
          <button
            key={index}
            onClick={() => onSideEffectClick(sideEffect)}
            className="group relative text-xl font-semibold text-muted text-start flex items-center gap-2"
          >
            <span className="relative z-10">{index + 1}. {sideEffect}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SideEffectsCard; 