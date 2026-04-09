'use client';

import { useState, useEffect, useCallback } from 'react';
import { Task, FilterType } from '@/types';
import { TaskForm } from './task-form';
import { TaskList } from './task-list';
import { FilterTabs } from './filter-tabs';
import { toast } from 'sonner';

/**
 * Root orchestrator for the task manager.
 * All API calls live here so child components stay presentational.
 * We use optimistic updates for toggle and delete to keep the UI
 * feeling instant — if the server rejects, we roll back and notify.
 */
export function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>('all');

  // Fetch all tasks on mount
  const fetchTasks = useCallback(async () => {
    try {
      const res = await fetch('/api/tasks');
      if (!res.ok) throw new Error();
      setTasks(await res.json());
    } catch {
      toast.error('Could not load your tasks. Please refresh the page.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  //Add a task
  const addTask = async (title: string) => {
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });
      if (!res.ok) throw new Error();

      const created: Task = await res.json();
      setTasks((prev) => [created, ...prev]);
      toast.success(`"${created.title}" added to your list!`);
    } catch {
      toast.error('Failed to add the task. Please try again.');
    }
  };

  //Toggle completion
  const toggleTask = async (id: string, completed: boolean) => {
    // Immediately reflect the change in the UI
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed } : t)));

    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed }),
      });
      if (!res.ok) throw new Error();

      toast.success(completed ? 'Nice work! Task completed.' : 'Task moved back to pending.');
    } catch {
      // Roll back on failure
      setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !completed } : t)));
      toast.error('Could not update the task status.');
    }
  };

  //Delete a task (optimistic)
  const deleteTask = async (id: string) => {
    const snapshot = [...tasks]; // Keep a snapshot for rollback
    setTasks((prev) => prev.filter((t) => t.id !== id));

    try {
      const res = await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      toast.success('Task removed.');
    } catch {
      setTasks(snapshot);
      toast.error('Could not delete the task. It has been restored.');
    }
  };

  // ── Edit task title (optimistic) ──────────────────────────────────
  const editTask = async (id: string, newTitle: string) => {
    const snapshot = [...tasks];
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, title: newTitle } : t)));

    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle }),
      });
      if (!res.ok) throw new Error();
      toast.success('Task title updated.');
    } catch {
      setTasks(snapshot);
      toast.error('Could not update the title. Change has been reverted.');
    }
  };

  // Derived data
  const counts = {
    all: tasks.length,
    pending: tasks.filter((t) => !t.completed).length,
    completed: tasks.filter((t) => t.completed).length,
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'pending') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <section className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-slate-950/50 border border-slate-200/60 dark:border-slate-800/60 p-5 sm:p-8 transition-shadow duration-500">
      <TaskForm onAdd={addTask} />

      {/* Toolbar: section title + filter tabs */}
      <div className="mt-8 mb-5 flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight">
          Your tasks
          {!isLoading && (
            <span className="ml-2 text-sm font-normal text-slate-400">
              ({counts.all})
            </span>
          )}
        </h2>
        <FilterTabs
          currentFilter={filter}
          onFilterChange={setFilter}
          counts={counts}
        />
      </div>

      <TaskList
        tasks={filteredTasks}
        isLoading={isLoading}
        onToggle={toggleTask}
        onDelete={deleteTask}
        onEdit={editTask}
      />
    </section>
  );
}
