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
        
        // Convert the stats object to an array of categories
        const categoryEntries = Object.entries(data)
          .filter(([key]) => key !== 'overall' && !key.includes('_'))
          .map(([name, count]) => ({ name, count }))
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

  // Function to generate a color based on a string
  const getColorForString = (str: string) => {
    const colors = [
      'bg-red-100 text-red-600',
      'bg-blue-100 text-blue-600',
      'bg-green-100 text-green-600',
      'bg-purple-100 text-purple-600',
      'bg-yellow-100 text-yellow-600',
      'bg-pink-100 text-pink-600',
      'bg-indigo-100 text-indigo-600',
      'bg-orange-100 text-orange-600',
      'bg-teal-100 text-teal-600'
    ];
    
    // Create a deterministic hash from the string
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }
    
    // Use the absolute value of the hash modulo the length of the colors array
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  };

  // Render a category card
  const CategoryCard = ({ category }: { category: { name: string, count: number } }) => (
    <Link 
      href={`/medicine?q=${encodeURIComponent(category.name)}&page=1`} 
      key={category.name}
    >
      <Box className="p-4 bg-card hover:bg-muted transition-colors h-full">
        <div className={`w-10 h-10 rounded-full ${getColorForString(category.name)} flex items-center justify-center mb-3`}>
          {category.name.charAt(0)}
        </div>
        <p className="font-medium text-primary">{category.name}</p>
        <div className="flex justify-between items-center mt-2">
          <p className="text-sm text-muted-foreground">{category.count.toLocaleString()} medicines</p>
          <p className="text-xs text-muted-foreground">
            {((category.count / stats.overall) * 100).toFixed(1)}%
          </p>
        </div>
        <div className="w-full bg-muted h-1 rounded-full mt-2 overflow-hidden">
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
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-primary">Therapeutic Categories</h2>
        <Link href="/medicine" className="text-accent-foreground hover:underline">
          View All →
        </Link>
      </div>
      
      <div className="relative">
        {/* Total count summary */}
        <div className="bg-card rounded-lg p-6 mb-6 text-center">
          {loading ? (
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-muted-foreground">Loading data...</p>
            </div>
          ) : (
            <div>
              <h3 className="text-5xl font-extrabold text-primary mb-2">
                {stats.overall.toLocaleString()}
              </h3>
              <p className="text-muted-foreground text-lg">
                Total medicines in our database
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Across {categories.length} therapeutic categories
              </p>
            </div>
          )}
        </div>
        
        {/* Categories grid - shows only top 8 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {loading ? (
            // Loading placeholders
            Array(8).fill(0).map((_, index) => (
              <Box key={index} className="p-4 bg-card animate-pulse h-[120px]">
                <div className="w-10 h-10 rounded-full bg-muted mb-3"></div>
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </Box>
            ))
          ) : (
            // Actual categories (top 8 only)
            categories.slice(0, 8).map((category) => (
              <CategoryCard category={category} key={category.name} />
            ))
          )}
        </div>

        {/* Show more button - only if we have more than 8 categories */}
        {!loading && categories.length > 8 && (
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full mt-4 flex items-center justify-center"
              >
                <span>Show All {categories.length} Categories</span>
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold mb-4">
                  All Therapeutic Categories
                </DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {categories.map((category) => (
                  <CategoryCard category={category} key={category.name} />
                ))}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </Box>
  );
};

export default CategoryAnalytics; 