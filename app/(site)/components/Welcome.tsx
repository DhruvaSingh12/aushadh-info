"use client";

import React, { useState, useEffect } from 'react';
import Box from '@/components/ui/Box';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { getDashboardStats, DashboardStats } from '@/lib/getDashboardStats';
import { clearCache } from '@/lib/cacheUtils';
import { RefreshCw } from 'lucide-react';

const WelcomeSection: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    medicineCount: 0,
    manufacturerCount: 0,
    therapeuticClassCount: 0
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    // Clear all cache to refresh all components
    clearCache();
    fetchStats();
  };

  return (
    <Box className="p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-extrabold text-primary mb-2">Welcome to AushadhInfo</h2>
        </div>
        <div className="flex mt-4 md:mt-0 gap-2">
          <Button 
            onClick={handleRefresh} 
            disabled={refreshing}
            className="bg-card rounded-3xl px-4 py-2 hover:opacity-80 hover:bg-card text-md font-extrabold border-secondary border-2 text-card-foreground"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Refreshing...' : 'Refresh Data'}
          </Button>
          <Link href="/medicine">
            <div className="bg-card rounded-3xl px-4 py-2 hover:opacity-80 text-md font-extrabold border-secondary border-2 text-card-foreground">Browse Medicines</div>
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <Box className="p-6 bg-card">
          <h3 className="text-xl font-bold text-primary mb-2">Comprehensive Database</h3>
          {loading ? (
            <div className="animate-pulse h-10 bg-muted/60 rounded w-3/4 mb-2"></div>
          ) : (
            <p className="text-4xl font-extrabold text-accent-foreground">
              {stats.medicineCount.toLocaleString()}+
            </p>
          )}
          <p className="text-sm text-muted-foreground">Medical supplies in our database</p>
        </Box>
        <Box className="p-6 bg-card">
          <h3 className="text-xl font-bold text-primary mb-2">Therapeutic Classes</h3>
          {loading ? (
            <div className="animate-pulse h-10 bg-muted/60 rounded w-3/4 mb-2"></div>
          ) : (
            <p className="text-4xl font-extrabold text-accent-foreground">
              {stats.therapeuticClassCount.toLocaleString()}+
            </p>
          )}
          <p className="text-sm text-muted-foreground">Different therapeutic classes</p>
        </Box>
        <Box className="p-6 bg-card">
          <h3 className="text-xl font-bold text-primary mb-2">Manufacturers</h3>
          {loading ? (
            <div className="animate-pulse h-10 bg-muted/60 rounded w-3/4 mb-2"></div>
          ) : (
            <p className="text-4xl font-extrabold text-accent-foreground">
              {stats.manufacturerCount.toLocaleString()}+
            </p>
          )}
          <p className="text-sm text-muted-foreground">Pharmaceutical manufacturers</p>
        </Box>
      </div>
    </Box>
  );
};

export default WelcomeSection;