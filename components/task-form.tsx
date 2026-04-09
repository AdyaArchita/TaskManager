'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, CornerDownLeft } from 'lucide-react';

interface TaskFormProps {
  onAdd: (title: string) => Promise<void>;
}

/**
 * Task creation form.
 * Includes a keyboard-shortcut hint ("Enter ↵") so power users
 * immediately know they don't need to reach for the button.
 */
export function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;

    setIsSubmitting(true);
    await onAdd(trimmed);
    setTitle('');
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Input
            id="task-title"
            name="task-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            className="w-full text-base sm:text-lg py-6 sm:py-7 px-5 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus-visible:ring-indigo-500 rounded-2xl shadow-sm placeholder:text-slate-400 transition-all duration-200 hover:border-indigo-300 dark:hover:border-indigo-700"
            disabled={isSubmitting}
            autoComplete="off"
          />
        </div>
        <Button
          type="submit"
          disabled={!title.trim() || isSubmitting}
          className="w-full sm:w-auto py-6 sm:py-7 px-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl shadow-lg shadow-indigo-500/20 dark:shadow-indigo-900/30 transition-all duration-200 active:scale-[0.97] font-semibold text-sm sm:text-base"
        >
          <Plus className="mr-2 h-5 w-5" />
          Add Task
        </Button>
      </div>

      {/* Keyboard hint — a small delightful detail for UX */}
      <p className="text-xs text-slate-400 dark:text-slate-500 pl-1 flex items-center gap-1">
        <CornerDownLeft className="h-3 w-3" />
        Press <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[10px] font-mono font-medium">Enter</kbd> to add quickly
      </p>
    </form>
  );
}
