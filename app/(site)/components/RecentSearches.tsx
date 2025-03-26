"use client";

import React, { useState, useEffect } from 'react';
import Box from '@/components/ui/Box';
import Link from 'next/link';
import { getRecentSearches, RecentSearch } from '@/lib/getRecentSearches';
import { SearchIcon, ExternalLinkIcon } from 'lucide-react';

const RecentSearches: React.FC = () => {
  const [searches, setSearches] = useState<RecentSearch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearches = async () => {
      try {
        const data = await getRecentSearches(5);
        setSearches(data);
      } catch (error) {
        console.error("Error fetching recent searches:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearches();
  }, []);

  return (
    <Box className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-primary">Recent Searches</h3>
        <Link href="/medicine" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center">
          <span>All medicines</span>
          <ExternalLinkIcon className="ml-1 h-3 w-3" />
        </Link>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse flex items-center p-3 rounded-lg bg-card">
              <div className="h-8 w-8 rounded-full bg-muted/60 flex items-center justify-center mr-3"></div>
              <div className="flex-1">
                <div className="h-4 bg-muted/60 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-muted/60 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {searches.map((search) => (
            <Link 
              href={`/medicine/${search.id}`} 
              key={search.id}
              className="flex items-center p-3 rounded-lg bg-card hover:bg-muted/50 transition-colors"
            >
              <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3">
                <SearchIcon className="h-4 w-4" />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="font-medium text-card-foreground truncate">{search.name}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {search.type || "General"} • {search.manufacturer_name || "Unknown"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </Box>
  );
};

export default RecentSearches; 