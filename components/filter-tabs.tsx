'use client';

import { FilterType } from './task-manager';
import { Button } from '@/components/ui/button';

interface FilterTabsProps {
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
}

export function FilterTabs({ filter, setFilter }: FilterTabsProps) {
  const filters: FilterType[] = ['All', 'Pending', 'Completed'];

  return (
    <div className="flex flex-wrap sm:flex-nowrap justify-center gap-1 bg-slate-200/50 dark:bg-slate-950/50 p-1 rounded-xl w-full sm:w-auto">
      {filters.map((f) => (
        <Button
          key={f}
          variant={filter === f ? 'secondary' : 'ghost'}
          onClick={() => setFilter(f)}
          className={`flex-1 sm:flex-none px-2 sm:px-5 py-2 h-auto text-sm font-semibold rounded-lg transition-all duration-300 ${
            filter === f 
              ? 'bg-white dark:bg-slate-800 shadow-sm text-indigo-600 dark:text-indigo-400 scale-100' 
              : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-800/30'
          }`}
        >
          {f}
        </Button>
      ))}
    </div>
  );
}
