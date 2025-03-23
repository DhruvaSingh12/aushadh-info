"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface UsesCardProps {
  formattedUse: string[];
  onUseClick: (use: string) => void;
  className?: string;
}

const UsesCard: React.FC<UsesCardProps> = ({ formattedUse, onUseClick, className }) => {
  return (
    <div
      className={cn(
        "flex flex-col w-[300px] lg:w-[350px] h-[300px] bg-indigo-500 relative items-start px-4 py-3 text-card rounded-lg gap-3",
        className
      )}
    >
      <p className="absolute top-3 text-4xl font-extrabold">Medicinal Uses</p>
      <div className="absolute top-[58px] flex flex-col gap-2">
        {formattedUse.map((use, index) => (
          <button
            key={index}
            onClick={() => onUseClick(use)}
            className="group relative text-xl font-semibold text-muted text-start flex items-center gap-2"
          >
            <span className="relative z-10">{index + 1}. {use}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default UsesCard;
