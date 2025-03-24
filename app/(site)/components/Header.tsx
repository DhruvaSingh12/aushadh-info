import React from 'react';
import Link from 'next/link';
import Box from '@/components/ui/Box';
import { Button } from '@/components/ui/Button';
import UserButton from '@/components/UserButton';

const Header: React.FC = () => {
  return (
    <Box className="fixed flex items-center py-[10px] left-0 z-20 top-0 justify-between px-4">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-primary">AushadhInfo</h1>
      </div>
      <nav className="hidden md:flex items-center space-x-6">
        <Link href="/" className="text-muted-foreground hover:text-primary transition">Dashboard</Link>
        <Link href="/medicine" className="text-muted-foreground hover:text-primary transition">Medicines</Link>
        <Link href="#" className="text-muted-foreground hover:text-primary transition">Manufacturers</Link>
        <Link href="#" className="text-muted-foreground hover:text-primary transition">Therapeutic Classes</Link>
      </nav>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0h-6" />
          </svg>
        </Button>
        <UserButton />
      </div>
    </Box>
  );
};

export default Header;