"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { SearchIcon } from "lucide-react";
import ClearButton from "@/components/ClearButton";

interface SearchFieldProps {
  onSearch?: (query: string) => void;
  defaultValue?: string;
}

export default function SearchField({ onSearch, defaultValue }: SearchFieldProps) {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState(defaultValue || "");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const query = searchValue.trim();
    if (!query) return;

    if (onSearch) {
      onSearch(query);
    } else {
      router.push(`/medicine?q=${encodeURIComponent(query)}`);
    }
  }

  function handleClear() {
    setSearchValue("");
  }

  return (
    <form onSubmit={handleSubmit} className="lg:px-12 md:px-6 px-4 w-full">
      <div className="relative">
        <Input
          name="q"
          placeholder="Search"
          className="pe-16"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button
          type="submit"
          className="absolute top-1/2 right-10 lg:right-12 transform -translate-y-1/2 text-muted-foreground"
          aria-label="Search"
        >
          <SearchIcon />
        </button>
        <ClearButton
          onClick={handleClear}
          className="absolute top-1/2 right-2 lg:right-4 transform -translate-y-1/2 text-muted-foreground"
        />
      </div>
    </form>
  );
}
