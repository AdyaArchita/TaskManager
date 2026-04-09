import { NextResponse } from 'next/server';
import { getTasks, addTask } from '@/lib/store';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '@/types';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const tasks = getTasks();
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.title || typeof body.title !== 'string' || body.title.trim() === '') {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const newTask: Task = {
      id: uuidv4(),
      title: body.title.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };

    addTask(newTask);

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
  }
}
