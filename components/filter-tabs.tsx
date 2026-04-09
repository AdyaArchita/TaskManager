'use client';

import { FilterType } from '@/types';
import { Button } from '@/components/ui/button';
import { ListFilter, Circle, CheckCircle } from 'lucide-react';

interface FilterTabsProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  /** Task counts let us show context without extra API calls */
  counts: { all: number; pending: number; completed: number };
}

/** Small label config so the JSX stays clean */
const FILTERS: { value: FilterType; label: string; icon: React.ElementType }[] = [
  { value: 'all', label: 'All', icon: ListFilter },
  { value: 'pending', label: 'Pending', icon: Circle },
  { value: 'completed', label: 'Done', icon: CheckCircle },
];

/**
 * Segmented filter control.
 * Displays counts inline so users know at a glance how many tasks
 * are in each bucket without having to click through.
 */
export function FilterTabs({ currentFilter, onFilterChange, counts }: FilterTabsProps) {
  const countMap: Record<FilterType, number> = {
    all: counts.all,
    pending: counts.pending,
    completed: counts.completed,
  };

  return (
    <div className="flex flex-wrap sm:flex-nowrap justify-center gap-1 bg-slate-100/80 dark:bg-slate-900/60 p-1 rounded-xl w-full sm:w-auto">
      {FILTERS.map(({ value, label, icon: Icon }) => {
        const isActive = currentFilter === value;

        return (
          <Button
            key={value}
            variant={isActive ? 'secondary' : 'ghost'}
            onClick={() => onFilterChange(value)}
            className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 h-auto text-sm font-medium rounded-lg transition-all duration-200 gap-1.5 ${
              isActive
                ? 'bg-white dark:bg-slate-800 shadow-sm text-indigo-600 dark:text-indigo-400'
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
            <span
              className={`ml-0.5 text-xs tabular-nums ${
                isActive
                  ? 'text-indigo-500/70 dark:text-indigo-400/70'
                  : 'text-slate-400 dark:text-slate-600'
              }`}
            >
              {countMap[value]}
            </span>
          </Button>
        );
      })}
    </div>
  );
}
