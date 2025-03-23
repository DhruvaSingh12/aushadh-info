"use client";

import React from "react";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/Tooltip";

interface MedicineTooltipProps {
  name: string | null;
  action_class: string | null;
  use: string;  
  pack_size_label: string | null;
}

const MedicineTooltip: React.FC<MedicineTooltipProps> = ({ name, action_class, use, pack_size_label }) => {
  const formattedUse =
  use && typeof use === "string"
    ? use
        .replace(/[{}"]/g, "") 
        .split(",")
        .map((item) => item.trim()) 
        .join(", ") 
    : "N/A";

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="hover:underline text-primary break-words hyphens-auto text-left font-semibold text-[17px] cursor-pointer">
          {name || "Unknown Medicine"}
        </TooltipTrigger>
        <TooltipContent>
          <div className="space-y-2 w-[250px]">
            <p className="text-lg font-bold break-words hyphens-auto text-primary">{name || "N/A"}</p>
            <p><strong className="text-muted-foreground">Action Class:</strong> {action_class || "N/A"}</p>
            <p><strong className="text-muted-foreground">Pack Type:</strong> {pack_size_label || "N/A"}</p>
            <p>
              <strong className="text-muted-foreground">Uses:</strong>{" "}
              {formattedUse || "N/A"}
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default MedicineTooltip;
