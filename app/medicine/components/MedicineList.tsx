import React from "react";
import MedicineCard from "./MedicineCard";

interface Medicine {
  id: number;
  name: string | null;
  manufacturer_name: string | null;
  pack_size_label: string | null;
  price: string | null;
  therapeutic_class: string | null;
  use: string | null;
}

interface MedicineListProps {
  medicines: Medicine[];
}

const MedicineList: React.FC<MedicineListProps> = ({ medicines }) => {
  if (!medicines.length) {
    return <p className="text-center text-muted-foreground">No medicines found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {medicines.map((medicine) => (
        <MedicineCard
          key={medicine.id} 
          id={medicine.id} 
          name={medicine.name}
          manufacturer={medicine.manufacturer_name}
          packSize={medicine.pack_size_label}
          price={medicine.price}
          therapeuticClass={medicine.therapeutic_class}
          use={medicine.use || ""}
        />
      ))}
    </div>
  );
};

export default MedicineList;
