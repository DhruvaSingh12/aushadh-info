"use client";

import React from "react";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/Tooltip";
import { Medicine } from "@/types";

interface MedicineTooltipProps {
  medicine: Medicine;
}

const MedicineTooltip: React.FC<MedicineTooltipProps> = ({ medicine }) => {
  if (!medicine) return <span>N/A</span>;

  const { name, action_class, use, pack_size_label } = medicine;

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
        <TooltipTrigger className="hover:underline text-primary text-left font-semibold text-[17px] cursor-pointer">
          {name || "Unknown Medicine"}
        </TooltipTrigger>
        <TooltipContent>
          <div className="space-y-2 w-[250px]">
            <p className="text-lg font-bold text-primary break-words hyphens-auto">{name || "N/A"}</p>
            <p><strong className="text-muted-foreground">Action Class:</strong> {action_class || "N/A"}</p>
            <p><strong className="text-muted-foreground">Pack Type:</strong> {pack_size_label || "N/A"}</p>
            <p>
              <strong className="text-muted-foreground">Uses:</strong> {formattedUse}
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default MedicineTooltip;
