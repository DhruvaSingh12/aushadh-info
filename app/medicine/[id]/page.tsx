"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { getMedicineById } from "@/lib/getMedicineById";
import Box from "@/components/ui/Box";
import Loading from "@/app/medicine/components/Loading";
import { Medicine } from "@/types";
import UserButton from "@/components/UserButton";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import ManufacturerCard from "./components/ManufacturerCard";
import MedicineIcon from "./components/MedicineIcon";
import Link from "next/link";
import SearchBar from "@/app/medicine/components/SearchBar";
import TherapeuticTooltip from "@/components/TherapeuticTooltip";
import TherapeuticCard from "./components/TherapeuticCard";
import UsesCard from "./components/UsesCard";
import ActionCard from "./components/ActionCard";
import InfoBar from "./components/InfoBar";
import { getMedicinesBySearch } from "@/lib/getMedicinesBySearch";
import SubstituteCard from "./components/SubstituteCard";

const MedicinePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [medicine, setMedicine] = useState<Medicine | null>(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [substitutes, setSubstitutes] = useState<Medicine[]>([]);

  const formattedUse =
  medicine?.use && typeof medicine?.use === "string"
    ? medicine?.use
        .replace(/[{}"]/g, "")
        .split(",")
        .map((item) => item.trim()) 
    : ["N/A"];


  useEffect(() => {
    if (!id && !query) return;

    const fetchMedicine = async () => {
      setLoading(true);
      try {
        if (query) {
          const { medicines } = await getMedicinesBySearch(query, 1);
          setMedicine(medicines[0] || null);
        } else {
          const result = await getMedicineById(id as string);
          setMedicine(result);
          // Fetch substitutes based on therapeutic class
          if (result?.therapeutic_class) {
            const { medicines } = await getMedicinesBySearch(result.therapeutic_class, 1, 5);
            // Filter out the current medicine from substitutes
            const filteredSubstitutes = medicines.filter(m => m.id !== result.id);
            setSubstitutes(filteredSubstitutes);
          }
        }
      } catch (error) {
        console.error("Error fetching medicine:", error);
        setMedicine(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicine();
  }, [id, query]);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    router.push(`/medicine?q=${encodeURIComponent(newQuery)}`);
  };

  if (loading) {
    return (
      <Box className="mt-10">
        <Loading />
      </Box>
    );
  }

  if (!medicine) {
    return (
      <Box className="mt-10">
        <p className="text-muted-foreground">Medicine not found.</p>
      </Box>
    );
  }

  return (
    <div className="bg-background p-4">
      <Box className="fixed flex items-center py-[10px] left-0 z-20 top-0 justify-between bg-background w-full px-4">
        <div className="hidden md:flex gap-x-2 items-center">
          <button
            onClick={() => router.back()}
            className="rounded-full bg-none flex items-center justify-center hover:bg-neutral-500/35 transition"
          >
            <RxCaretLeft className="text-primary" size={35} />
          </button>
          <button
            onClick={() => router.forward()}
            className="rounded-full bg-none flex items-center justify-center hover:bg-neutral-500/35 transition"
          >
            <RxCaretRight className="text-primary" size={35} />
          </button>
        </div>
        <SearchBar onSearch={handleSearch} />
        <UserButton className="flex-none" />
      </Box>

      <Box className="mt-[80px] gap-6 mb-6">
        <div className="flex flex-row items-center rounded-lg gap-6 p-2 justify-center">
          <div className="lg:w-[15%] flex flex-col gap-2 h-[200px] items-center justify-center">
            <MedicineIcon packSize={medicine.pack_size_label} size={100} />
            <p className="text-xl lg:text-2xl text-center font-extrabold text-muted-foreground">
              {medicine.pack_size_label}
            </p>
          </div>
          <div className="flex flex-col w-[65%] lg:w-[85%]">
            <div className="text-[15px] font-semibold text-muted-foreground hover:cursor-pointer hover:underline">
              <TherapeuticTooltip therapeuticClass={medicine.therapeutic_class} />
            </div>
            <p className="lg:text-5xl text-3xl font-extrabold text-primary mb-2 break-words hyphen-auto">
              {medicine.name}
            </p>
            <Link
              href={`/manufacturer/${encodeURIComponent(medicine.manufacturer_name || "")}`}
              className="block break-words hyphens-auto"
            >
              <p className="lg:text-2xl text-lg text-muted-foreground">
                {medicine.manufacturer_name}
              </p>
            </Link>
            <InfoBar
              price={medicine.price}
              isDiscontinued={medicine.is_discontinued}
              habitForming={medicine.habit_forming}
              type={medicine.type}
            />
          </div>
        </div>
      </Box>
      <Box className="flex lg:flex-row flex-col items-center justify-center gap-4">
        <TherapeuticCard therapeuticClass={medicine.therapeutic_class} />
        <UsesCard
          formattedUse={formattedUse}
          onUseClick={(use) => {
            router.push(`/medicine?q=${encodeURIComponent(use)}&page=1`);
          }}
        />
        <ManufacturerCard manufacturer={medicine.manufacturer_name} />
        <ActionCard actionClass={medicine.action_class} imageSrc="/two.webp" />
      </Box>
      <Box className="mt-6 flex justify-center">
        <SubstituteCard substitutes={substitutes} />
      </Box>
    </div>
  );
};

export default MedicinePage;
