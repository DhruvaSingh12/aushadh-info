"use client";

import React, { useState, useEffect } from 'react';
import Box from '@/components/ui/Box';
import Link from 'next/link';
import { getCategoryStats, CategoryStats } from '@/lib/getCategoryStats';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { ChevronRight } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip";

const CategoryAnalytics: React.FC = () => {
  const [stats, setStats] = useState<CategoryStats>({
    overall: 0
  });
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<{name: string, count: number}[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getCategoryStats();
        setStats(data);
        const categoryEntries = Object.entries(data)
          .filter(([key]) => key !== 'overall')
          .map(([name, count]) => ({ 
            name, 
            count
          }))
          .sort((a, b) => b.count - a.count);
          
        setCategories(categoryEntries);
      } catch (error) {
        console.error("Error fetching category stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const CategoryCard = ({ category }: { category: { name: string, count: number } }) => (
    <Link 
      href={`/medicine?q=${encodeURIComponent(category.name)}&page=1`} 
      key={category.name}
    >
      <Box className="p-4 bg-card hover:opacity-80 transition-colors h-[100px] overflow-hidden">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <p className="font-medium text-primary truncate">
                {category.name}
              </p>
            </TooltipTrigger>
            <TooltipContent>
              <p>{category.name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="flex justify-between items-center mt-2">
          <p className="text-sm text-muted-foreground">{category.count.toLocaleString()} supplies</p>
          <p className="text-xs text-muted-foreground">
            {((category.count / stats.overall) * 100).toFixed(1)}%
          </p>
        </div>
        <div className="w-full bg-input h-1 rounded-full mt-2 overflow-hidden">
          <div 
            className="bg-primary h-full rounded-full"
            style={{ 
              width: `${Math.max(3, Math.min(100, (category.count / stats.overall) * 100))}%` 
            }}
          ></div>
        </div>
      </Box>
    </Link>
  );

  return (
    <Box className="p-6">      
      <div className="relative">
        <div className="bg-card rounded-lg p-6 mb-6 text-center relative">
          {loading ? (
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
            </div>
          ) : (
            <div>
              <h3 className="text-5xl font-extrabold text-primary mb-2">
                {stats.overall.toLocaleString()}
              </h3>
              <p className="text-muted-foreground text-lg">
                Total medical supplies in our database
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Across {categories.length} therapeutic classes
              </p>
            </div>
          )}
          
          {!loading && categories.length > 8 && (
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="absolute bottom-2 right-2 rounded-full w-8 h-8 shadow-sm hover:bg-muted/50 transition-colors p-0 flex items-center justify-center"
                  aria-label="Show all categories"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl bg-background max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="lg:text-4xl text-3xl text-center font-extrabold mb-4">
                    All Therapeutic Classes
                  </DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                  {categories.map((category) => (
                    <CategoryCard category={category} key={category.name} />
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {loading ? (
            Array(8).fill(0).map((_, index) => (
              <Box key={index} className="p-4 bg-card animate-pulse h-[120px]">
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
                <div className="h-1 bg-muted rounded w-full mt-3"></div>
              </Box>
            ))
          ) : (
            categories.slice(0, 8).map((category) => (
              <CategoryCard category={category} key={category.name} />
            ))
          )}
        </div>
      </div>
    </Box>
  );
};

export default CategoryAnalytics; 