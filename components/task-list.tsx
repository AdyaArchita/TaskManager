'use client';

import { Task } from '@/types';
import { TaskItem } from './task-item';
import { Skeleton } from '@/components/ui/skeleton';
import { Inbox } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  isLoading: boolean;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string) => void;
}

/**
 * Renders loading skeletons, the empty state, or the actual task list.
 * Design note: We use 3 skeletons as a visual placeholder — enough to
 * suggest "content is coming" without over-promising list length.
 */
export function TaskList({ tasks, isLoading, onToggle, onDelete, onEdit }: TaskListProps) {
  if (isLoading) {
    return (
      <div className="space-y-3" role="status" aria-label="Loading tasks">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton
            key={i}
            className="h-[88px] w-full rounded-2xl bg-slate-100 dark:bg-slate-800/50"
          />
        ))}
        <span className="sr-only">Loading tasks…</span>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/10">
        <div className="relative mb-5">
          <div className="absolute inset-0 bg-indigo-500 blur-2xl opacity-10 rounded-full" />
          <Inbox className="h-12 w-12 text-indigo-400 relative z-10" />
        </div>
        <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-1">
          No tasks here yet
        </h3>
        <p className="text-slate-400 dark:text-slate-500 max-w-xs text-sm leading-relaxed">
          Type something in the field above and hit Enter — your first
          task will appear right here.
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-3" role="list">
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskItem
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        </li>
      ))}
    </ul>
  );
}
