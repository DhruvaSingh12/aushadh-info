"use client";

import React, { useState, useEffect } from "react";
import { getTherapeuticClassInfo } from "@/lib/getTherapeuticClassInfo";
import { cn } from "@/lib/utils";
import TherapeuticTooltip from "@/components/TherapeuticTooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

interface TherapeuticCardProps {
  therapeuticClass: string | null;
  className?: string;
}

const TherapeuticCard: React.FC<TherapeuticCardProps> = ({
  therapeuticClass,
  className,
}) => {
  const [info, setInfo] = useState<{ description: string | null; frequency: number | null } | null>(null);

  useEffect(() => {
    const fetchInfo = async () => {
      if (!therapeuticClass) return;

      try {
        const result = await getTherapeuticClassInfo(therapeuticClass);
        setInfo(result);
      } catch (error) {
        console.error("Error fetching therapeutic class info:", error);
        setInfo(null);
      }
    };

    fetchInfo();
  }, [therapeuticClass]);

  if (!therapeuticClass) {
    return (
      <div
        className={cn(
          "relative px-4 py-3 w-[300px] h-[300px] border rounded-lg bg-indigo-500 text-card",
          className
        )}
      >
        <p className="text-card font-normal font-mono text-[12px] absolute top-[2px] right-2">
        Therapeutic class
      </p>
          <p className="text-4xl break-words bottom-3 left-3 right-3 absolute text-start text-card font-extrabold">
            Information on Therapeutic class is not available.
          </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative px-4 py-3 w-[300px] h-[300px] border rounded-lg bg-indigo-500 text-card",
        className
      )}
    >
      <p className="text-card font-normal font-mono text-[12px] absolute top-[2px] right-2">
        Therapeutic class
      </p>

      <div className="absolute ml-4 items-center justify-center pointer-events-none">
        <Image 
          src="/one.webp" 
          alt="Therapeutic Icon" 
          width={1000}
          height={1000} 
          className="w-[220px] h-[200px] opacity-90" 
        />
      </div>

      <div className="absolute z-10 bottom-3 left-3 right-3 text-[35px] break-words text-start text-wrap-clamp font-extrabold leading-tight">
        <Dialog>
          <DialogTrigger asChild>
            <div className="flex items-center gap-2 cursor-pointer group">
              <h3>
                <TherapeuticTooltip therapeuticClass={therapeuticClass} />
              </h3>
              <ChevronRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </DialogTrigger>
          <DialogContent className="bg-background max-w-[650px]">
            <DialogHeader>
              <DialogTitle className="text-[35px] font-extrabold">
                {therapeuticClass}
              </DialogTitle>
            </DialogHeader>
            <div>
              <p className="text-muted-foreground text-lg text-justify leading-relaxed">
                {info?.description || "No description available for this therapeutic class."}
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default TherapeuticCard;
