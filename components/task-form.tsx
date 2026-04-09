'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle } from 'lucide-react';

export function TaskForm({ onAdd }: { onAdd: (title: string) => Promise<void> }) {
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    setIsSubmitting(true);
    await onAdd(title);
    setTitle('');
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Input
          id="task-title"
          name="task-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          className="w-full text-lg py-7 px-5 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus-visible:ring-indigo-500 rounded-2xl shadow-sm placeholder:text-slate-400 transition-all hover:border-indigo-300 dark:hover:border-indigo-700"
          disabled={isSubmitting}
        />
      </div>
      <Button 
        type="submit" 
        disabled={!title.trim() || isSubmitting}
        className="w-full sm:w-auto py-7 px-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl shadow-lg shadow-indigo-200 dark:shadow-indigo-900/20 transition-all active:scale-95 font-semibold text-md"
      >
        <PlusCircle className="mr-2 h-5 w-5" />
        Add Task
      </Button>
    </form>
  );
}
