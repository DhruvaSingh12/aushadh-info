"use client";

import React, { useState, useEffect } from 'react';
import Box from '@/components/ui/Box';
import Link from 'next/link';
import { getTopManufacturers, ManufacturerStat } from '@/lib/getTopManufacturers';
import { getDashboardStats } from '@/lib/getDashboardStats';

const TopManufacturers: React.FC = () => {
  const [manufacturers, setManufacturers] = useState<ManufacturerStat[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [mfgData, statsData] = await Promise.all([
          getTopManufacturers(3),
          getDashboardStats()
        ]);
        
        setManufacturers(mfgData);
        setTotalCount(statsData.manufacturerCount);
      } catch (error) {
        console.error("Error fetching manufacturers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Box className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-primary">Top Manufacturers</h2>
        <Link href="/medicine" className="text-accent-foreground hover:underline">
          →
        </Link>
      </div>
      <div className="bg-card p-6 rounded-lg">
        <div className="text-center mb-6">
          <p className="text-5xl font-extrabold text-primary">
            {loading ? '...' : totalCount.toLocaleString()}
            <span className="text-sm text-muted-foreground"> manufacturers</span>
          </p>
          <p className="text-lg font-medium text-primary mt-2">In Our Database</p>
          <p className="text-sm text-muted-foreground mt-1">
            Explore comprehensive information about pharmaceutical manufacturers
          </p>
        </div>
        
        <div className="flex flex-col space-y-4 mt-6">
          {loading ? (
            Array(3).fill(0).map((_, index) => (
              <div key={index} className="flex items-center p-3 rounded-lg animate-pulse">
                <div className="w-10 h-10 rounded-full bg-muted mr-3"></div>
                <div className="flex-grow">
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </div>
                <div className="w-8 h-4 bg-muted rounded"></div>
              </div>
            ))
          ) : (
            manufacturers.map((manufacturer, index) => (
              <Link 
                href={`/manufacturer/${encodeURIComponent(manufacturer.name)}`} 
                key={index}
              >
                <div className="flex items-center p-3 hover:bg-muted rounded-lg transition-colors">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-accent-foreground mr-3">
                    {manufacturer.name.charAt(0)}
                  </div>
                  <div className="flex-grow">
                    <p className="font-medium text-primary">{manufacturer.name}</p>
                    <p className="text-sm text-muted-foreground">{manufacturer.count.toLocaleString()} products</p>
                  </div>
                  <div className="text-sm text-green-500">
                    {Math.round((manufacturer.count / totalCount) * 100)}%
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </Box>
  );
};

export default TopManufacturers; 