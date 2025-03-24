"use client";

import React, { useState, useEffect } from 'react';
import Box from '@/components/ui/Box';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { getPopularMedicines, PopularMedicine } from '@/lib/getPopularMedicines';

const PopularMedicines: React.FC = () => {
  const [medicines, setMedicines] = useState<PopularMedicine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const data = await getPopularMedicines(3);
        setMedicines(data);
      } catch (error) {
        console.error("Error fetching popular medicines:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, []);

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const statusLabels = ['Most searched today', 'Popular this week', 'Trending now'];

  return (
    <Box className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-primary">Popular Medicines</h2>
        <div className="flex items-center">
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <Link href="/medicine">View All</Link>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-2 mb-6">
        {days.map((day) => (
          <div key={day} className="bg-muted p-2 rounded-lg text-center text-muted-foreground text-sm">
            {day}
          </div>
        ))}
      </div>
      
      <div className="space-y-4">
        {loading ? (
          Array(3).fill(0).map((_, index) => (
            <Box key={index} className="p-4 bg-card animate-pulse">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mr-3"></div>
                <div className="w-full">
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-muted rounded w-1/2 mb-1"></div>
                  <div className="h-3 bg-muted rounded w-1/4"></div>
                </div>
              </div>
            </Box>
          ))
        ) : (
          medicines.map((medicine, index) => (
            <Link href={`/medicine/${medicine.id}`} key={medicine.id}>
              <Box className="p-4 bg-card hover:bg-muted transition-colors">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-accent-foreground mr-3">
                    {medicine.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary">{medicine.name}</h3>
                    <p className="text-sm text-muted-foreground">{medicine.type || "General"}</p>
                    <p className="text-xs text-muted-foreground">{statusLabels[index % statusLabels.length]}</p>
                  </div>
                </div>
              </Box>
            </Link>
          ))
        )}
      </div>
    </Box>
  );
};

export default PopularMedicines; 