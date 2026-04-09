import { NextResponse } from 'next/server';
import { getAllTasks, createTask } from '@/lib/store';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '@/types';

// Prevent Next.js from caching API responses during static generation
export const dynamic = 'force-dynamic';

/**
 * GET /api/tasks
 * Returns all tasks sorted by newest first (maintained by the store).
 */
export async function GET() {
  try {
    const tasks = getAllTasks();
    return NextResponse.json(tasks);
  } catch {
    return NextResponse.json(
      { error: 'Something went wrong while fetching tasks.' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/tasks
 * Creates a new task. Requires a non-empty `title` in the request body.
 * Validation: We intentionally keep this simple — check that title exists,
 * is a string, and isn't blank after trimming. No library needed for one field.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const title = body?.title;

    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return NextResponse.json(
        { error: 'Title is required and must be a non-empty string.' },
        { status: 400 }
      );
    }

    const newTask: Task = {
      id: uuidv4(),
      title: title.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };

    createTask(newTask);

    return NextResponse.json(newTask, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Failed to create task.' },
      { status: 500 }
    );
  }
}
