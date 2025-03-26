"use client";

import React, { useState } from 'react';
import Box from '@/components/ui/Box';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { SearchIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

const QuickSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/medicine?q=${encodeURIComponent(query.trim())}&page=1`);
    }
  };

  return (
    <Box className="p-6">
      <h3 className="text-xl font-bold text-primary mb-4">Quick Search</h3>
      <form onSubmit={handleSearch} className="relative">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for medicines, manufacturers..."
          className="pr-12 bg-card/50 focus:bg-card border-input"
        />
        <Button 
          type="submit" 
          size="icon" 
          variant="ghost" 
          className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:text-primary"
        >
          <SearchIcon className="h-4 w-4" />
        </Button>
      </form>
      <div className="mt-3 flex flex-wrap gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs rounded-full bg-card/80"
          onClick={() => {
            setQuery('Antibiotic');
            router.push('/medicine?q=Antibiotic&page=1');
          }}
        >
          Antibiotics
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs rounded-full bg-card/80"
          onClick={() => {
            setQuery('Painkiller');
            router.push('/medicine?q=Painkiller&page=1');
          }}
        >
          Painkillers
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs rounded-full bg-card/80"
          onClick={() => {
            setQuery('Cardiovascular');
            router.push('/medicine?q=Cardiovascular&page=1');
          }}
        >
          Cardiovascular
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs rounded-full bg-card/80"
          onClick={() => {
            setQuery('Diabetes');
            router.push('/medicine?q=Diabetes&page=1');
          }}
        >
          Diabetes
        </Button>
      </div>
    </Box>
  );
};

export default QuickSearch; 