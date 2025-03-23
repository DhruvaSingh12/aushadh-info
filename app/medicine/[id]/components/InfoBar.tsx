import React from "react";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/Tooltip";
import { FaStore, FaBoxOpen, FaLeaf, FaExclamationTriangle, FaStethoscope, FaMortarPestle } from "react-icons/fa";

interface InfoBarProps {
  price: string | null;
  isDiscontinued: string | null;
  habitForming: string | null;
  type: string | null;
}

const InfoBar: React.FC<InfoBarProps> = ({ price, isDiscontinued, habitForming, type }) => {
  return (
    <TooltipProvider>
      <div className="flex mt-4 flex-row lg:gap-8 gap-[18px]">
        <Tooltip>
          <TooltipTrigger>
            <p className="font-serif font-extrabold text-muted-foreground text-[20px] lg:text-5xl">₹{price}</p>
          </TooltipTrigger>
          <TooltipContent className="bg-secondary p-2 rounded-lg">
            <p className="text-sm text-accent-foreground">Price for complete pack.</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            {isDiscontinued === "False" ? (
              <FaStore className="text-green-500" size={29} />
            ) : (
              <FaBoxOpen className="text-red-500" size={29} />
            )}
          </TooltipTrigger>
          <TooltipContent className="bg-secondary p-2 rounded-lg">
            <p className="text-sm text-accent-foreground">
              {isDiscontinued === "False" ? "Supply is available in the market." : "Supply is not available in the market."}
            </p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            {habitForming === "No" || habitForming === "" ? (
              <FaLeaf className="text-green-500" size={29} />
            ) : (
              <FaExclamationTriangle className="text-red-500" size={29} />
            )}
          </TooltipTrigger>
          <TooltipContent className="bg-secondary p-2 rounded-lg">
            <p className="text-sm text-accent-foreground">
              {habitForming === "No" || habitForming === "" ? "Supply is not habit forming." : "Supply is habit forming."}
            </p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            {type === "allopathy" ? (
              <FaStethoscope className="text-orange-500" size={29} />
            ) : (
              <FaMortarPestle className="text-stone-500" size={29} />
            )}
          </TooltipTrigger>
          <TooltipContent className="bg-secondary p-2 rounded-lg">
            <p className="text-sm text-accent-foreground">
              {type === "allopathy" ? "Supply is allopathic." : "Supply is homeopathic."}
            </p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};

export default InfoBar;
