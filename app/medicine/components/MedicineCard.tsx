import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrescriptionBottle, faSyringe, faVial, faCapsules, faPills, faEyeDropper, faTablets, faBong, faHandHoldingDroplet } from "@fortawesome/free-solid-svg-icons";
import ManufacturerTooltip from "./ManufacturerTooltip";
import MedicineTooltip from "./MedicineTooltip";
import Link from "next/link";
import TherapeuticTooltip from "@/components/TherapeuticTooltip";

interface MedicineCardProps {
  name: string | null;
  id: number;
  manufacturer: string | null;
  packSize: string | null;
  price: string | null;
  therapeuticClass: string | null;
  use: string;
}

const iconMapping: { [key: string]: typeof faPrescriptionBottle } = {
  syringe: faSyringe,
  vial: faVial,
  capsules: faCapsules,
  capsule: faCapsules,
  syrup: faPrescriptionBottle,
  syrups: faPrescriptionBottle,
  drops: faEyeDropper,
  tablet: faTablets,
  tablets: faTablets,
  suspension: faBong,
  cream: faHandHoldingDroplet,
  creams: faHandHoldingDroplet,
  lotion: faHandHoldingDroplet,
  tube: faHandHoldingDroplet,
};

const colorOptions = [
  "text-red-500",
  "text-sky-500",
  "text-green-500",
  "text-yellow-500",
  "text-fuchsia-500",
  "text-pink-500",
  "text-amber-600",
  "text-teal-500",
  "text-orange-500",
];

const getIconAndColor = (packSize: string | null) => {
  if (!packSize) {
    return { icon: faPills, color: "text-blue-500" }; 
  }

  const matchedKeyword = Object.keys(iconMapping).find((keyword) =>
    packSize.toLowerCase().includes(keyword)
  );

  const icon = matchedKeyword ? iconMapping[matchedKeyword] : faPills;

  const colorIndex = matchedKeyword
    ? Array.from(matchedKeyword).reduce((sum, char) => sum + char.charCodeAt(0), 0) % colorOptions.length
    : 0;
  const color = colorOptions[colorIndex];

  return { icon, color };
};

const MedicineCard: React.FC<MedicineCardProps> = ({ id, name, manufacturer, packSize, price, therapeuticClass, use }) => {
  const { icon, color } = getIconAndColor(packSize);

  return (
    <div className="border rounded-lg p-4 shadow-sm bg-card flex flex-row items-center justify-between">
      <div className="w-[25%] items-center justify-center flex pr-2 border-r border-muted-foreground">
        <FontAwesomeIcon icon={icon} className={`lg:text-[50px] text-[35px] ${color}`} />
      </div>

      <div className="flex flex-col w-[75%] ml-4">
        <div className="text-sm text-muted-foreground hover:cursor-pointer hover:underline">
          <TherapeuticTooltip therapeuticClass={therapeuticClass} />
        </div>

        <Link
          href={`/medicine/${encodeURIComponent(id)}`} 
          className="text-primary hover:underline mt-2 block"
        >
          <h2 className="text-primary text-wrap-clamp text-left text-[17px] font-semibold">
            <MedicineTooltip
              name={name}
              action_class={therapeuticClass}
              use={use}
              pack_size_label={packSize}
            />
          </h2>
        </Link>

        <div className="text-sm text-muted-foreground">
          <ManufacturerTooltip manufacturer={manufacturer} />
        </div>
        <p className="text-lg font-semibold text-primary">₹ {price || "N/A"}</p>
      </div>
    </div>
  );
};

export default MedicineCard;
