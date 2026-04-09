'use client';

import { useState, useEffect } from 'react';
import { Task } from '@/types';
import { TaskForm } from './task-form';
import { TaskList } from './task-list';
import { FilterTabs } from './filter-tabs';
import { toast } from 'sonner';

export type FilterType = 'All' | 'Pending' | 'Completed';

export function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>('All');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/tasks');
      if (!response.ok) throw new Error('Failed to fetch tasks');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      toast.error('Failed to load tasks');
    } finally {
      setIsLoading(false);
    }
  };

  const addTask = async (title: string) => {
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });
      if (!response.ok) throw new Error('Failed to add task');
      const newTask = await response.json();
      setTasks([newTask, ...tasks]);
      toast.success('Task added successfully');
    } catch (error) {
      toast.error('Failed to add task');
    }
  };

  const toggleTask = async (id: string, completed: boolean) => {
    // Optimistic update
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed } : t)));
    
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed }),
      });
      if (!response.ok) throw new Error('Failed to update task');
    } catch (error) {
      // Revert on error
      setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !completed } : t)));
      toast.error('Failed to update task');
    }
  };

  const deleteTask = async (id: string) => {
    const prevTasks = [...tasks];
    // Optimistic update
    setTasks(tasks.filter((t) => t.id !== id));
    
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete task');
      toast.success('Task deleted');
    } catch (error) {
      setTasks(prevTasks);
      toast.error('Failed to delete task');
    }
  };

  const editTask = async (id: string, title: string) => {
    const prevTasks = [...tasks];
    setTasks(tasks.map((t) => t.id === id ? { ...t, title } : t));
    
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });
      if (!response.ok) throw new Error('Failed to edit task');
      toast.success('Task updated');
    } catch (error) {
      setTasks(prevTasks);
      toast.error('Failed to update task');
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'All') return true;
    if (filter === 'Pending') return !task.completed;
    if (filter === 'Completed') return task.completed;
    return true;
  });

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200/50 dark:border-slate-800/50 p-5 sm:p-8 overflow-hidden transition-all duration-500 hover:shadow-cyan-500/5">
      <TaskForm onAdd={addTask} />
      <div className="mt-10 mb-6 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50 dark:bg-slate-800/50 p-2 rounded-2xl">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 pl-4 tracking-tight">Your Tasks</h2>
        <FilterTabs filter={filter} setFilter={setFilter} />
      </div>
      <TaskList 
        tasks={filteredTasks} 
        isLoading={isLoading} 
        onToggle={toggleTask}
        onDelete={deleteTask}
        onEdit={editTask}
      />
    </div>
  );
}
