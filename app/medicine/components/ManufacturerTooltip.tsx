"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/Tooltip";
import { getMedicinesCountByManufacturer } from "@/lib/getMedicinesCountByManufacturer";

interface ManufacturerTooltipProps {
  manufacturer: string | null;
}

const ManufacturerTooltip: React.FC<ManufacturerTooltipProps> = ({ manufacturer }) => {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (!manufacturer || loading || count !== null) return;
    setLoading(true);

    try {
      const result = await getMedicinesCountByManufacturer(manufacturer);
      setCount(result);
    } catch (error) {
      console.error("Error fetching medicine count:", error);
      setCount(null);
    } finally {
      setLoading(false);
    }
  };

  if (!manufacturer) return <span>N/A</span>;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          className="hover:underline text-left text-muted-foreground cursor-pointer"
          onClick={handleClick}
        >
          {manufacturer}
        </TooltipTrigger>
        <TooltipContent>
          {loading ? (
            "Loading..."
          ) : count !== null ? (
            <>
              <p>
                {count} medical suppl{count === 1 ? "y" : "ies"} available by {manufacturer}.
              </p>
              <Link
                href={`/manufacturer/${encodeURIComponent(manufacturer)}`}
                className="text-primary hover:underline mt-2 block"
              >
                View all supplies by {manufacturer}.
              </Link>
            </>
          ) : (
            "Click to load count"
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ManufacturerTooltip;
