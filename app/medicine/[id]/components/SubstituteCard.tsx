import React from "react";
import Box from "@/components/ui/Box";
import Link from "next/link";
import { Medicine } from "@/types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/Tooltip";

interface SubstituteCardProps {
  substitutes: Medicine[];
}

const SubstituteCard: React.FC<SubstituteCardProps> = ({ substitutes }) => {
  return (
    <Box className="lg:w-[450px] w-[300px] lg:h-[300px] text-card rounded-2xl bg-orange-400 flex flex-col gap-1 px-4 py-2">
      <div>
        <h3 className="text-[38px] font-extrabold">Substitutes</h3>
      </div>
      <div className="flex flex-col gap-[6px] mb-2 lg:mb-0 flex-grow scrollbar-hide overflow-y-auto">
        {substitutes.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {substitutes.map((substitute) => (
              <div
                key={substitute.id}
                className="rounded-lg px-3 py-2 hover:opacity-80 bg-orange-500"
              >
                <Link href={`/medicine/${substitute.id}`} className="block">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <p className="font-extrabold font-mono hover:underline text-background text-lg truncate cursor-pointer">
                          {substitute.name}
                        </p>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{substitute.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>

                <Link href={`/manufacturer/${encodeURIComponent(substitute.manufacturer_name || "")}`} className="block">
                  <p className="text-sm truncate hover:underline cursor-pointer">
                    {substitute.manufacturer_name}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">No substitutes available</p>
        )}
      </div>
    </Box>
  );
};

export default SubstituteCard; 