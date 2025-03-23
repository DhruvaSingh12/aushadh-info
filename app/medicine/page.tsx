"use client";

import { useState, useEffect } from "react";
import { getMedicinesBySearch } from "@/lib/getMedicinesBySearch";
import SearchBar from "./components/SearchBar";
import MedicineList from "./components/MedicineList";
import Pagination from "../../components/Pagination";
import { Medicine } from "@/types";
import Loading from "./components/Loading";
import UserButton from "../../components/UserButton";
import Box from "../../components/ui/Box";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { useRouter, useSearchParams } from "next/navigation";

const MedicineSearchPage: React.FC = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [totalMedicines, setTotalMedicines] = useState(0);
  const [itemsPerPage] = useState(24);
  const router = useRouter();
  const searchParams = useSearchParams();

  const fetchMedicines = async (query: string, page: number = 1) => {
    setLoading(true);

    try {
      const { medicines, total } = await getMedicinesBySearch(query, page);

      setMedicines(medicines);
      setTotalMedicines(total);
    } catch (error) {
      console.error("Error fetching medicines:", error);
      setMedicines([]);
      setTotalMedicines(0);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
    router.push(`/medicine?q=${encodeURIComponent(newQuery)}&page=1`);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    router.push(`/medicine?q=${encodeURIComponent(query)}&page=${newPage}`);
  };

  useEffect(() => {
    const queryParam = searchParams.get("q") || "";
    const pageParam = parseInt(searchParams.get("page") || "1", 10);

    setQuery(queryParam);
    setPage(pageParam);

    if (queryParam) {
      fetchMedicines(queryParam, pageParam);
    } else {
      router.push("/medicine");
    }
  }, [searchParams, router]);


  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [loading]);

  const totalPages = Math.ceil(totalMedicines / itemsPerPage);

  return (
    <div className="bg-background relative">
      <Box className="fixed top-0 w-full flex items-center justify-between">
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
        <SearchBar onSearch={handleSearch} />
        <UserButton className="flex-none" />
      </Box>
      {loading ? (
        <Box className="mt-[70px]">
          <Loading />
        </Box>
      ) : (
        <Box className="mt-[80px]">
          <MedicineList medicines={medicines} />
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </Box>
      )}
    </div>
  );
};

export default MedicineSearchPage;
