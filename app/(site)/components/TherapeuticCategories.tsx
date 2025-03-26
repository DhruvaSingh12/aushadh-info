"use client";

import React, { useState, useEffect } from 'react';
import Box from '@/components/ui/Box';
import Link from 'next/link';
import { getActionClasses, ActionClass } from '@/lib/getActionClasses';
import { ExternalLinkIcon } from 'lucide-react';

// Function to get a consistent color based on string input
const getColorForString = (str: string) => {
  const colorClasses = [
    'bg-blue-100 text-blue-800',
    'bg-green-100 text-green-800',
    'bg-yellow-100 text-yellow-800',
    'bg-red-100 text-red-800',
    'bg-purple-100 text-purple-800',
    'bg-pink-100 text-pink-800',
    'bg-indigo-100 text-indigo-800',
    'bg-gray-100 text-gray-800',
  ];
  
  // Simple hash function to get a consistent index
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
  }
  
  // Make sure it's positive and map to our color array
  const index = Math.abs(hash) % colorClasses.length;
  return colorClasses[index];
};

const ActionClasses: React.FC = () => {
  const [actionClasses, setActionClasses] = useState<ActionClass[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActionClasses = async () => {
      try {
        const data = await getActionClasses(12); // Get top 12 action classes
        setActionClasses(data);
      } catch (error) {
        console.error("Error fetching action classes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActionClasses();
  }, []);

  return (
    <Box className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-primary">Action Classes</h3>
        <Link href="/medicine" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center">
          <span>View all</span>
          <ExternalLinkIcon className="ml-1 h-3 w-3" />
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="animate-pulse p-3 rounded-lg h-24 bg-card">
              <div className="h-4 bg-muted/60 rounded w-3/4 mb-2"></div>
              <div className="flex justify-between mt-2">
                <div className="h-3 bg-muted/60 rounded w-1/3"></div>
                <div className="h-3 bg-muted/60 rounded w-1/4"></div>
              </div>
              <div className="mt-2 h-2 bg-muted/60 rounded w-full"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {actionClasses.map((actionClass) => (
            <Link 
              href={`/medicine?q=${encodeURIComponent(actionClass.name)}&page=1`} 
              key={actionClass.name}
              className="p-3 rounded-lg hover:bg-muted/50 transition-colors bg-card"
            >
              <div className="flex flex-col h-full">
                <p className="font-medium text-card-foreground line-clamp-1">{actionClass.name}</p>
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>{actionClass.count} medicines</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getColorForString(actionClass.name)}`}>
                    {actionClass.name.split(' ')[0]}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </Box>
  );
};

export default ActionClasses; 