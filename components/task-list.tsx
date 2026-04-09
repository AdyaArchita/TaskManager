'use client';

import { Task } from '@/types';
import { TaskItem } from './task-item';
import { Skeleton } from '@/components/ui/skeleton';
import { ClipboardList, Sparkles } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  isLoading: boolean;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string) => void;
}

export function TaskList({ tasks, isLoading, onToggle, onDelete, onEdit }: TaskListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-24 w-full rounded-2xl bg-slate-100 dark:bg-slate-800/50" />
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center bg-slate-50/50 dark:bg-slate-800/20 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
        <div className="relative mb-6 text-indigo-500">
          <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-20 rounded-full"></div>
          <ClipboardList className="h-12 w-12 relative z-10" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-2">
          All caught up! <Sparkles className="h-5 w-5 text-amber-400" />
        </h3>
        <p className="text-slate-500 dark:text-slate-400 max-w-sm text-sm">
          You don't have any tasks matching this filter. Add a new task above or change your filter.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
