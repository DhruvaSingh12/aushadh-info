"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/Tooltip";
import { getMedicinesCountByManufacturer } from "@/lib/getMedicinesCountByManufacturer";
import { cn } from "@/lib/utils";

interface ManufacturerCardProps {
    manufacturer: string | null;
    className?: string;
}

const ManufacturerCard: React.FC<ManufacturerCardProps> = ({
    manufacturer,
    className,
}) => {
    const [count, setCount] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCount = async () => {
            if (!manufacturer) return;

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

        fetchCount();
    }, [manufacturer]);

    if (!manufacturer) {
        return (
            <div
                className={cn(
                    "relative p-4 border rounded-md text-muted-foreground bg-manufacturer bg-cover bg-center",
                    className
                )}
            >
                <div className="bg-black/50 p-4 rounded-md">
                    <p className="text-sm font-medium">
                        Manufacturer information not available
                    </p>
                </div>
            </div>
        );
    }

    return (
        <TooltipProvider>
            <div
                className={cn(
                    "relative px-4 py-3 w-[300px] h-[300px] border rounded-lg bg-manufacturer bg-cover bg-right text-card",
                    className
                )}
            >
                <p className="text-card font-normal font-mono text-[12px] absolute top-[2px] right-2">Manufacturer</p>

                <div className="relative">
                    <Tooltip>
                        <TooltipTrigger>
                            <h3
                                className="text-4xl absolute top-1 break-words text-start text-wrap-clamp font-extrabold overflow-hidden"
                            >
                                {manufacturer}
                            </h3>
                        </TooltipTrigger>
                        <TooltipContent>
                            {loading ? (
                                "Loading..."
                            ) : count !== null ? (
                                <p className="text-center">
                                    Total Supply Count: {count}
                                </p>
                            ) : (
                                <p>Unable to fetch medicine count.</p>
                            )}
                        </TooltipContent>
                    </Tooltip>
                </div>
                <div className="text-left text-muted absolute left-3 right-3 bottom-2 text-[12px]">
                    <Link
                        href={`/manufacturer/${encodeURIComponent(manufacturer)}`}
                        className="hover:underline font-mono font-medium block break-words hyphens-auto"
                    >
                        View all supplies by {manufacturer}
                    </Link>
                </div>
            </div>
        </TooltipProvider>
    );
};

export default ManufacturerCard;
