import { Task } from '@/types';

// Use a global variable to persist tasks across hot reloads in development
declare global {
  var _tasks: Task[] | undefined;
}

export const getTasks = (): Task[] => {
  if (!global._tasks) {
    global._tasks = [];
  }
  return global._tasks;
};

export const setTasks = (tasks: Task[]) => {
  global._tasks = tasks;
};

export const addTask = (task: Task) => {
  const tasks = getTasks();
  tasks.unshift(task); // Prepend to keep newest first
  setTasks(tasks);
};

export const updateTask = (id: string, updates: Partial<Task>): Task | null => {
  let updatedTask: Task | null = null;
  const tasks = getTasks();
  const index = tasks.findIndex((t) => t.id === id);
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...updates };
    updatedTask = tasks[index];
    setTasks(tasks);
  }
  return updatedTask;
};

export const deleteTask = (id: string): boolean => {
  const tasks = getTasks();
  const initialLength = tasks.length;
  const filtered = tasks.filter((t) => t.id !== id);
  setTasks(filtered);
  return filtered.length < initialLength;
};
