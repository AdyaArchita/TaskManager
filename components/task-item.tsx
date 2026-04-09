'use client';

import { useState } from 'react';
import { Task } from '@/types';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Trash2, Pencil, Clock } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { formatDistanceToNow } from 'date-fns';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string) => void;
}

/**
 * A single task card.
 * UX decisions:
 * - Completed tasks fade visually so the eye is drawn to what's still pending.
 * - Action buttons are always visible on mobile (no hover), revealed on hover for desktop.
 * - Card gets a subtle scale + shadow lift on hover for tactile feedback.
 * - Edit opens a dialog rather than inline editing, to avoid accidental changes.
 */
export function TaskItem({ task, onToggle, onDelete, onEdit }: TaskItemProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const handleSaveEdit = () => {
    const trimmed = editTitle.trim();
    if (trimmed && trimmed !== task.title) {
      onEdit(task.id, trimmed);
    }
    setIsEditOpen(false);
  };

  const openEditDialog = () => {
    setEditTitle(task.title); // Reset to current title when opening
    setIsEditOpen(true);
  };

  // Relative timestamp for a human-friendly feel
  const timeAgo = task.createdAt
    ? formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })
    : 'just now';

  return (
    <>
      <div
        className={`
          group flex items-start sm:items-center gap-3 sm:gap-4 p-4 sm:p-5
          rounded-2xl border transition-all duration-200
          hover:shadow-md hover:scale-[1.01]
          ${task.completed
            ? 'bg-slate-50/80 border-slate-100 dark:bg-slate-900/40 dark:border-slate-800/30 opacity-60'
            : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-800'
          }
        `}
      >
        {/* Checkbox */}
        <div className="flex-shrink-0 pt-0.5">
          <Checkbox
            checked={task.completed}
            onCheckedChange={(checked) => onToggle(task.id, checked as boolean)}
            className="h-5 w-5 rounded-full border-2 data-[state=checked]:bg-indigo-500 data-[state=checked]:border-indigo-500 transition-all cursor-pointer"
            aria-label={`Mark "${task.title}" as ${task.completed ? 'pending' : 'completed'}`}
          />
        </div>

        {/* Title + timestamp */}
        <div className="flex-1 min-w-0">
          <p
            className={`text-base sm:text-[17px] font-medium leading-snug break-words transition-all duration-200 ${task.completed
                ? 'text-slate-400 dark:text-slate-600 line-through decoration-slate-300 dark:decoration-slate-700'
                : 'text-slate-800 dark:text-slate-100'
              }`}
          >
            {task.title}
          </p>
          <span className="inline-flex items-center gap-1 mt-1.5 text-xs text-slate-400 dark:text-slate-500">
            <Clock className="h-3 w-3" />
            {timeAgo}
          </span>
        </div>

        {/* Actions — always visible on touch devices, hover-reveal on desktop */}
        <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={openEditDialog}
            className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-full h-9 w-9 transition-colors"
            aria-label={`Edit "${task.title}"`}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(task.id)}
            className="text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-full h-9 w-9 transition-colors"
            aria-label={`Delete "${task.title}"`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Edit dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold tracking-tight">
              Edit task
            </DialogTitle>
            <DialogDescription>
              Update the title below and save your changes.
            </DialogDescription>
          </DialogHeader>
          <div className="py-3">
            <Input
              id={`edit-title-${task.id}`}
              name={`edit-title-${task.id}`}
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="text-base py-5 px-4 focus-visible:ring-indigo-500 rounded-xl"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSaveEdit();
              }}
            />
          </div>
          <DialogFooter className="sm:justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditOpen(false)}
              className="rounded-xl px-5"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSaveEdit}
              disabled={!editTitle.trim() || editTitle.trim() === task.title}
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-5"
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
