import React from "react";
import Box from "@/components/ui/Box";
import Link from "next/link";
import { Medicine } from "@/types";

interface SubstituteCardProps {
  substitutes: Medicine[];
}

const SubstituteCard: React.FC<SubstituteCardProps> = ({ substitutes }) => {
  return (
    <Box className="lg:w-[400px] w-[300px] min-h-[300px] text-card rounded-2xl bg-[#00e676] flex flex-col gap-4 px-4 py-2">
      <div>
        <h3 className="text-[38px] font-extrabold">Substitutes</h3>
      </div>
      <div className="flex flex-col gap-2 flex-grow">
        {substitutes.length > 0 ? (
          substitutes.map((substitute) => (
            <Link
              key={substitute.id}
              href={`/medicine/${substitute.id}`}
              className="p-2 rounded-lg hover:bg-accent transition-colors"
            >
              <div className="flex flex-col gap-1">
                <p className="font-medium text-primary">{substitute.name}</p>
                <p className="text-sm">
                  {substitute.manufacturer_name}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center">No substitutes available</p>
        )}
      </div>
    </Box>
  );
};

export default SubstituteCard; 