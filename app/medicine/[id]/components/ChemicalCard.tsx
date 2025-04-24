"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/Tooltip";

interface ChemicalCardProps {
  chemicalClass: string | null;
  className?: string;
}

const ChemicalCard: React.FC<ChemicalCardProps> = ({ chemicalClass, className }) => {
  return (
    <div
      className={cn(
        "relative flex flex-col w-[300px] h-[300px] bg-green-400 px-4 py-4 text-card rounded-lg gap-3 overflow-hidden",
        className
      )}
    >
      <p className="text-card font-normal font-mono text-[12px] absolute top-[2px] right-2">
        Chemical Class
      </p>
      <div className="absolute -top-5 items-center justify-center pointer-events-none">
        <Image src="/four.webp" alt="Chemical Icon" width={500} height={500} className="w-[300px] h-[280px] opacity-90" />
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <p className="absolute bottom-3 hover:cursor-pointer left-3 right-3 text-[35px] break-words text-start text-wrap-clamp font-extrabold z-10 leading-tight">
              {chemicalClass ? chemicalClass : "Information on Chemical Class is not available."}
            </p>
          </TooltipTrigger>
          <TooltipContent>
            <p>{chemicalClass}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ChemicalCard; 