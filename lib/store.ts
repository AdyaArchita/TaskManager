import { Task } from '@/types';

/**
 * In-memory task store.
 *
 * Trade-off: We use a Node.js global to survive Next.js hot-reloads during
 * development. In production you'd swap this for a database, but for this
 * exercise in-memory storage keeps the focus on API design and frontend polish.
 */
declare global {
  // eslint-disable-next-line no-var
  var _taskStore: Task[] | undefined;
}

function getStore(): Task[] {
  if (!global._taskStore) {
    global._taskStore = [];
  }
  return global._taskStore;
}

/** Return all tasks, newest first (insertion order is maintained by unshift). */
export function getAllTasks(): Task[] {
  return getStore();
}

/** Insert a new task at the front so the list is always sorted newest-first. */
export function createTask(task: Task): void {
  getStore().unshift(task);
}

/**
 * Partially update a task by id.
 * Returns the updated task, or null if the id doesn't exist.
 */
export function patchTask(id: string, updates: Partial<Omit<Task, 'id'>>): Task | null {
  const tasks = getStore();
  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) return null;

  tasks[index] = { ...tasks[index], ...updates };
  return tasks[index];
}

/**
 * Remove a task by id.
 * Returns true if a task was actually removed, false if id wasn't found.
 */
export function removeTask(id: string): boolean {
  const tasks = getStore();
  const before = tasks.length;
  global._taskStore = tasks.filter((t) => t.id !== id);
  return global._taskStore.length < before;
}

/** Reset the store — useful for testing. */
export function resetStore(): void {
  global._taskStore = [];
}
