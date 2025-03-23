"use client";

import React, { useState, useEffect } from "react";
import { getTherapeuticClassInfo } from "@/lib/getTherapeuticClassInfo";
import { cn } from "@/lib/utils";
import TherapeuticTooltip from "@/components/TherapeuticTooltip";

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
          "relative p-4 border rounded-md text-muted-foreground bg-therapeutic bg-cover bg-center",
          className
        )}
      >
        <div className="bg-black/50 p-4 rounded-md">
          <p className="text-sm font-medium">
            Therapeutic class information not available
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative px-4 py-3 lg:w-[450px] w-[300px] lg:h-[300px] h-[400px] border rounded-lg bg-red-400 text-card",
        className
      )}
    >
      <p className="text-card font-normal font-mono text-[12px] absolute top-[2px] right-2">
        Therapeutic class
      </p>
      <div className="absolute inset-0 bg-black/15 rounded-lg" />

      <div className="relative z-10">
        <h3 className="lg:text-4xl text-3xl lg:mt-2 lg:mb-2 text-start text-card font-extrabold">
          <TherapeuticTooltip therapeuticClass={therapeuticClass} />
        </h3>
      </div>
      <div
        className="relative overflow-y-auto scrollbar-hide h-[calc(100%-55px)] scrollable"
      >
        <p className="text-[16px] text-justify mb-4">{info?.description}</p>
      </div>
    </div>
  );
};

export default TherapeuticCard;
