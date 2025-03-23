"use client";

import React, { useState } from "react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/Tooltip";
import { getTherapeuticClassInfo } from "@/lib/getTherapeuticClassInfo";

interface TherapeuticTooltipProps {
  therapeuticClass: string | null;
}

const TherapeuticTooltip: React.FC<TherapeuticTooltipProps> = ({
  therapeuticClass,
}) => {
  const [info, setInfo] = useState<{ description: string | null; frequency: number | null } | null>(null);

  const handleMouseEnter = async () => {
    if (!therapeuticClass || info) return; 
    try {
      const result = await getTherapeuticClassInfo(therapeuticClass);
      setInfo(result);
    } catch (error) {
      console.error("Error fetching therapeutic class info:", error);
      setInfo(null);
    }
  };

  if (!therapeuticClass) return <span>N/A</span>;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          className="text-left cursor-pointer"
          onMouseEnter={handleMouseEnter} 
        >
          {therapeuticClass}
        </TooltipTrigger>
        <TooltipContent>
          {info ? (
            <>
              <p className="font-medium">{info.frequency !== null ? info.frequency : "No data available."} supplies available under this class.</p>
            </>
          ) : (
            "Hover to load details"
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TherapeuticTooltip;
