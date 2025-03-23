"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { getMedicinesByManufacturer } from "@/lib/getMedicinesByManufacturer";
import Box from "@/components/ui/Box";
import Loading from "../components/Loading";
import { Medicine } from "@/types";
import MedicineCardList from "../components/MedicineCardList";
import UserButton from "@/components/UserButton";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { Input } from "@/components/ui/Input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { SearchIcon } from "lucide-react";
import Pagination from "@/components/Pagination";

const ManufacturerPage: React.FC = () => {
  const { manufacturerName } = useParams();
  const router = useRouter();
  const normalizedManufacturerName =
    typeof manufacturerName === "string"
      ? decodeURIComponent(manufacturerName)
      : manufacturerName?.[0]
        ? decodeURIComponent(manufacturerName[0])
        : "";

  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [filteredMedicines, setFilteredMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [classBreakdown, setClassBreakdown] = useState<{ [key: string]: number }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(24);

  useEffect(() => {
    if (!normalizedManufacturerName) return;

    const fetchMedicines = async () => {
      setLoading(true);
      try {
        const result = await getMedicinesByManufacturer(normalizedManufacturerName);
        setMedicines(result);
        setFilteredMedicines(result);

        const breakdown: { [key: string]: number } = {};
        result.forEach((medicine) => {
          const therapeuticClass = medicine.therapeutic_class || "UNKNOWN";
          breakdown[therapeuticClass] = (breakdown[therapeuticClass] || 0) + 1;
        });

        const sortedBreakdown = Object.keys(breakdown).sort().reduce((acc: { [key: string]: number }, key) => {
          acc[key] = breakdown[key];
          return acc;
        }, {});

        setClassBreakdown(sortedBreakdown);
      } catch (error) {
        console.error("Error fetching medicines by manufacturer:", error);
        setMedicines([]);
        setFilteredMedicines([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMedicines();
  }, [normalizedManufacturerName]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = medicines.filter((medicine) =>
        medicine.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMedicines(filtered);
      setCurrentPage(1); 
    } else {
      setFilteredMedicines(medicines);
    }
  }, [searchTerm, medicines]);

  const handleTabChange = (therapeuticClass: string) => {
    if (therapeuticClass === "All") {
      setFilteredMedicines(medicines);
    } else if (therapeuticClass === "UNKNOWN") {
      const filtered = medicines.filter(
        (medicine) => !medicine.therapeutic_class 
      );
      setFilteredMedicines(filtered);
    } else {
      const filtered = medicines.filter(
        (medicine) => medicine.therapeutic_class === therapeuticClass
      );
      setFilteredMedicines(filtered);
    }
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMedicines.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredMedicines.length / itemsPerPage);

  return (
    <div className="bg-background p-4">
      <Box className="fixed flex items-center py-[10px] left-0 z-20 top-0 justify-between">
        <div className="hidden ml-4 md:flex gap-x-2 items-center">
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
        <h1 className="text-3xl ml-4 sm:ml-0 font-bold text-center text-primary">
          {normalizedManufacturerName}
        </h1>
        <UserButton className="ml-8 flex-none" />
      </Box>
      <div className="mt-[80px]">
        <div className="mb-3 relative">
          <Input
            type="text"
            placeholder={`Search medical supplies by ${normalizedManufacturerName}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="absolute top-1/2 right-2 transform -translate-y-1/2 text-muted-foreground"
            aria-label="Search"
          >
            <SearchIcon />
          </button>
        </div>

        {loading ? (
          <Box>
            <Loading />
          </Box>
        ) : (
          <Tabs defaultValue="All" onValueChange={handleTabChange}>
            <TabsList>
              <TabsTrigger value="All">All</TabsTrigger>
              {Object.keys(classBreakdown).map((therapeuticClass) => (
                <TabsTrigger key={therapeuticClass} value={therapeuticClass}>
                  {therapeuticClass} ({classBreakdown[therapeuticClass]})
                </TabsTrigger>
              ))}
            </TabsList>

            {filteredMedicines.length > 0 ? (
              <>
                <div className="md:hidden mt-4">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
                <div className="mt-6">
                  <MedicineCardList 
                    medicines={currentItems} 
                    startIndex={indexOfFirstItem + 1} 
                  />
                  <div className="mt-8">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </div>
                </div>
              </>
            ) : (
              <p className="text-muted-foreground mt-6">Try searching some other medical supply.</p>
            )}
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default ManufacturerPage;
