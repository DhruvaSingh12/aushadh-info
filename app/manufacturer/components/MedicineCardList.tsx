import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrescriptionBottle, faSyringe, faVial, faCapsules, faPills, faEyeDropper, faTablets, faBong, faHandHoldingDroplet } from "@fortawesome/free-solid-svg-icons";
import { Medicine } from "@/types";
import ManufacturerTooltip from "@/app/medicine/components/ManufacturerTooltip";
import MedicineTooltip from "./MedicineTooltip";
import Link from "next/link";
import TherapeuticTooltip from "@/components/TherapeuticTooltip";

interface MedicineCardProps {
  id: number;
  name: string | null;
  manufacturer: string | null;
  packSize: string | null;
  price: string | null;
  therapeuticClass: string | null;
  index: number;
  chemical_class: string | null;
  medicine: Medicine;
}

const iconMapping: { [key: string]: typeof faPrescriptionBottle } = {
  syringe: faSyringe,
  vial: faVial,
  capsules: faCapsules,
  capsule: faCapsules,
  syrup: faPrescriptionBottle,
  syrups: faPrescriptionBottle,
  drops: faEyeDropper,
  drop: faEyeDropper,
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

const MedicineCard: React.FC<MedicineCardProps> = ({ id, manufacturer, packSize, price, therapeuticClass, index, chemical_class, medicine }) => {
  const { icon, color } = getIconAndColor(packSize);

  return (
    <div className="border rounded-lg p-4 shadow-lg bg-card flex flex-col items-start justify-between space-y-2">
      <div className="flex items-center space-x-4">
        <div className="flex-none w-[60px] h-[60px] rounded-full bg-muted flex items-center justify-center">
          <FontAwesomeIcon icon={icon} className={`text-[30px] ${color}`} />
        </div>
        <div className="flex flex-col">
          <Link
            href={`/medicine/${encodeURIComponent(id)}`} 
            className="text-primary hover:underline mt-2 block"
          >
            <MedicineTooltip medicine={medicine} />
          </Link>
          <div className="text-sm text-muted-foreground"><TherapeuticTooltip therapeuticClass={therapeuticClass} /></div>
        </div>
      </div>

      <div className="flex justify-between w-full items-center">
        <p className="text-sm text-muted-foreground">{chemical_class || "Unknown Chemical Class"}</p>
        <p className="text-lg font-semibold text-primary">₹{price || "N/A"}</p>
      </div>

      <div className="w-full flex justify-between items-center mt-2">
        <p className="text-[12px] text-muted-foreground">#{index}</p>
        <ManufacturerTooltip manufacturer={manufacturer} />
      </div>
    </div>
  );
};

interface MedicineCardListProps {
  medicines: Medicine[];
  startIndex: number;
}

const MedicineCardList: React.FC<MedicineCardListProps> = ({ medicines, startIndex }) => {
  const sortedMedicines = [...medicines].sort((a, b) => {
    const nameA = a.name?.toLowerCase() || "";
    const nameB = b.name?.toLowerCase() || "";
    return nameA.localeCompare(nameB);
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {sortedMedicines.map((medicine, index) => (
        <MedicineCard
          id={medicine.id}
          key={medicine.id}
          medicine={medicine}
          name={medicine.name}
          chemical_class={medicine.chemical_class}
          manufacturer={medicine.manufacturer_name}
          packSize={medicine.pack_size_label}
          price={medicine.price}
          therapeuticClass={medicine.therapeutic_class}
          index={startIndex + index} 
        />
      ))}
    </div>
  );
};

export default MedicineCardList;
