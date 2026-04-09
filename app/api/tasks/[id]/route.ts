import { NextResponse } from 'next/server';
import { patchTask, removeTask } from '@/lib/store';

/**
 * PATCH /api/tasks/:id
 * Partially updates a task (title, completed status, or both).
 * Returns 404 if the task doesn't exist — the client needs to know
 * whether the resource was actually found before showing success.
 */
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    // Guard: if a title update is attempted, it must be valid
    if ('title' in body && (typeof body.title !== 'string' || body.title.trim().length === 0)) {
      return NextResponse.json(
        { error: 'Title must be a non-empty string.' },
        { status: 400 }
      );
    }

    const updated = patchTask(params.id, body);

    if (!updated) {
      return NextResponse.json({ error: 'Task not found.' }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json(
      { error: 'Failed to update task.' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/tasks/:id
 * Removes a task permanently. Returns 404 if the id doesn't match any task.
 */
export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const wasDeleted = removeTask(params.id);

    if (!wasDeleted) {
      return NextResponse.json({ error: 'Task not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Failed to delete task.' },
      { status: 500 }
    );
  }
}
