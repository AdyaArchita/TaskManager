import { getTasks, addTask, updateTask, deleteTask, setTasks } from '../lib/store';
import { Task } from '../types';

describe('Tasks Store', () => {
  beforeEach(() => {
    // Reset the store before each test
    setTasks([]);
  });

  it('should start with an empty tasks list', () => {
    const tasks = getTasks();
    expect(tasks.length).toBe(0);
  });

  it('should add a task correctly and keep it at the top', () => {
    const task1: Task = { id: '1', title: 'Task 1', completed: false, createdAt: new Date().toISOString() };
    const task2: Task = { id: '2', title: 'Task 2', completed: false, createdAt: new Date().toISOString() };
    
    addTask(task1);
    addTask(task2);

    const tasks = getTasks();
    expect(tasks.length).toBe(2);
    // Because store logic is unshift, task2 should be first
    expect(tasks[0].id).toBe('2');
  });

  it('should update a task', () => {
    const task1: Task = { id: '1', title: 'Task 1', completed: false, createdAt: new Date().toISOString() };
    addTask(task1);

    const updated = updateTask('1', { completed: true });
    expect(updated?.completed).toBe(true);

    const tasks = getTasks();
    expect(tasks[0].completed).toBe(true);
  });

  it('should delete a task', () => {
    const task1: Task = { id: '1', title: 'Task 1', completed: false, createdAt: new Date().toISOString() };
    addTask(task1);
    
    const success = deleteTask('1');
    expect(success).toBe(true);
    expect(getTasks().length).toBe(0);
  });
});
