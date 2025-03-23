"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ActionCardProps {
  actionClass: string | null;
  className?: string;
  imageSrc: string;
}

const ActionCard: React.FC<ActionCardProps> = ({ actionClass, className, imageSrc }) => {
  return (
    <div
      className={cn(
        "relative flex flex-col w-[300px] h-[300px] bg-amber-400 items-start px-4 py-3 text-card rounded-lg gap-3 overflow-hidden",
        className
      )}
    >
      <p className="text-card font-normal font-mono text-[12px] absolute top-[2px] right-2">
        Action Class
      </p>
      <div className="absolute top-1 flex items-center justify-center pointer-events-none">
        <Image src={imageSrc} alt="Action Icon" width={500} height={500} className="w-60 h-60 opacity-90" />
      </div>
      <p className="absolute bottom-4 text-4xl font-extrabold z-10">
        {actionClass ? actionClass : "Information on Action Class is not available."}
      </p>
    </div>
  );
};

export default ActionCard;
