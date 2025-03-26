"use client";

import React, { useState, useEffect } from 'react';
import Box from '@/components/ui/Box';
import Link from 'next/link';
import { getManufacturersAboveThreshold, ManufacturerStat } from '@/lib/getTopManufacturers';
import { getDashboardStats } from '@/lib/getDashboardStats';
import { Building, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';

const PRODUCT_THRESHOLD = 1000;

const TopManufacturers: React.FC = () => {
  const [manufacturers, setManufacturers] = useState<ManufacturerStat[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [mfgData, statsData] = await Promise.all([
          getManufacturersAboveThreshold(PRODUCT_THRESHOLD),
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

  // Calculate total products for percentage calculations
  const totalProducts = manufacturers.reduce((sum, m) => sum + m.count, 0);

  return (
    <Box className="p-6">
      <div className="bg-card p-6 rounded-lg">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center">
            <p className="text-5xl font-extrabold text-primary">
              {loading ? '...' : totalCount.toLocaleString()}
            </p>
          </div>
          <p className="text-lg font-medium text-primary mt-2">Pharmaceutical Manufacturers</p>
        </div>
        
        {loading ? (
          <div className="space-y-4 mt-6">
            {Array(5).fill(0).map((_, index) => (
              <div key={index} className="flex items-center p-3 rounded-lg animate-pulse">
                <div className="w-10 h-10 rounded-full bg-muted mr-3"></div>
                <div className="flex-grow">
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </div>
                <div className="w-12 h-6 bg-muted rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Show top 5 manufacturers in the main view */}
            <div className="space-y-4 mt-6">
              {manufacturers.slice(0, 5).map((manufacturer) => (
                <Link 
                  href={`/manufacturer/${encodeURIComponent(manufacturer.name)}`} 
                  key={manufacturer.name}
                >
                  <div className="flex items-center p-4 hover:bg-muted rounded-lg transition-colors border border-muted">
                    <div className="flex-grow">
                      <p className="font-medium text-primary">{manufacturer.name}</p>
                      <p className="text-sm text-muted-foreground">{manufacturer.count.toLocaleString()} products</p>
                    </div>
                    <div className="text-sm font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {((manufacturer.count / totalProducts) * 100).toFixed(1)}%
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            {/* "View All" button for seeing all manufacturers */}
            {manufacturers.length > 5 && (
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full mt-6 flex items-center justify-center"
                  >
                    <span>View More</span>
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold mb-4">
                      Major Manufacturers
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-3">
                    {manufacturers.map((manufacturer) => (
                      <Link 
                        href={`/manufacturer/${encodeURIComponent(manufacturer.name)}`} 
                        key={manufacturer.name}
                      >
                        <div className="flex items-center p-3 hover:bg-muted rounded-lg transition-colors border border-muted">
                          <div className="flex-grow">
                            <p className="font-medium text-primary">{manufacturer.name}</p>
                            <p className="text-sm text-muted-foreground">{manufacturer.count.toLocaleString()} products</p>
                          </div>
                          <div className="text-sm text-primary font-medium">
                            {((manufacturer.count / totalProducts) * 100).toFixed(1)}%
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </>
        )}
      </div>
    </Box>
  );
};

export default TopManufacturers; 