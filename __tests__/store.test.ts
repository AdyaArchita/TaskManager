import {
  getAllTasks,
  createTask,
  patchTask,
  removeTask,
  resetStore,
} from '../lib/store';
import { Task } from '../types';

/** Helper to build a task with sensible defaults */
function buildTask(overrides: Partial<Task> = {}): Task {
  return {
    id: Math.random().toString(36).slice(2),
    title: 'Test task',
    completed: false,
    createdAt: new Date().toISOString(),
    ...overrides,
  };
}

describe('In-memory task store', () => {
  beforeEach(() => {
    resetStore(); // Ensure a clean slate between tests
  });

  it('starts with an empty list', () => {
    expect(getAllTasks()).toEqual([]);
  });

  it('adds tasks in newest-first order', () => {
    const first = buildTask({ id: '1', title: 'First' });
    const second = buildTask({ id: '2', title: 'Second' });

    createTask(first);
    createTask(second);

    const tasks = getAllTasks();
    expect(tasks).toHaveLength(2);
    expect(tasks[0].title).toBe('Second'); // Most recent is first
    expect(tasks[1].title).toBe('First');
  });

  it('patches a task and returns the updated version', () => {
    const task = buildTask({ id: 'abc' });
    createTask(task);

    const updated = patchTask('abc', { completed: true });
    expect(updated?.completed).toBe(true);
    expect(getAllTasks()[0].completed).toBe(true);
  });

  it('returns null when patching a non-existent task', () => {
    expect(patchTask('does-not-exist', { title: 'nope' })).toBeNull();
  });

  it('removes a task and returns true', () => {
    createTask(buildTask({ id: 'to-delete' }));
    expect(removeTask('to-delete')).toBe(true);
    expect(getAllTasks()).toHaveLength(0);
  });

  it('returns false when removing a non-existent task', () => {
    expect(removeTask('ghost')).toBe(false);
  });
});
