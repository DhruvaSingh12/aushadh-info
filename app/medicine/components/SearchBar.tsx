"use client";

import SearchField from "./SearchField";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  return (
    <div className="w-full max-w-screen-lg mx-auto p-4">
      <SearchField
        onSearch={(query) => onSearch(query)}
        defaultValue=""
      />
    </div>
  );
};

export default SearchBar;
