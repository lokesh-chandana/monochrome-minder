
import React from 'react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={cn("py-6 px-4 sm:px-6 border-b", className)}>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-medium tracking-tight">mono<span className="font-bold">task</span></h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'short', 
              day: 'numeric' 
            })}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
