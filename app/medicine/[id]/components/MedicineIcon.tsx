import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrescriptionBottle, faSyringe, faVial, faCapsules, faPills, faEyeDropper, faTablets, faBong, faHandHoldingDroplet } from "@fortawesome/free-solid-svg-icons";

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

interface MedicineIconProps {
  packSize: string | null;
  size?: number; 
}

const MedicineIcon: React.FC<MedicineIconProps> = ({ packSize, size = 50 }) => {
  const { icon, color } = getIconAndColor(packSize);

  return (
    <FontAwesomeIcon
      icon={icon}
      className={`${color}`}
      style={{ fontSize: `${size}px` }}
    />
  );
};

export default MedicineIcon;
