'use client';

import { useState } from 'react';
import { Task } from '@/types';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Trash2, Pencil, Calendar } from 'lucide-react';
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

export function TaskItem({ task, onToggle, onDelete, onEdit }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const handleEditSubmit = () => {
    if (editTitle.trim() && editTitle !== task.title) {
      onEdit(task.id, editTitle);
    }
    setIsEditing(false);
  };

  return (
    <>
      <div 
        className={`group flex items-start sm:items-center gap-3 sm:gap-5 p-4 sm:p-5 rounded-2xl border transition-all duration-300 hover:shadow-lg ${
          task.completed 
            ? 'bg-slate-50 border-slate-100 dark:bg-slate-900/50 dark:border-slate-800/30' 
            : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-800'
        }`}
      >
        <div className="flex-shrink-0 pt-0.5">
          <Checkbox 
            checked={task.completed}
            onCheckedChange={(checked) => onToggle(task.id, checked as boolean)}
            className="h-6 w-6 rounded-full border-2 data-[state=checked]:bg-indigo-500 data-[state=checked]:border-indigo-500 transition-all cursor-pointer"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <p 
            className={`text-base sm:text-lg font-medium leading-tight break-words transition-all duration-300 ${
              task.completed 
                ? 'text-slate-400 dark:text-slate-600 line-through' 
                : 'text-slate-800 dark:text-slate-200'
            }`}
          >
            {task.title}
          </p>
          <div className="flex items-center mt-2 gap-3 text-xs text-slate-400 dark:text-slate-500 font-medium">
            <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded-md">
              <Calendar className="w-3.5 h-3.5" />
              {task.createdAt ? formatDistanceToNow(new Date(task.createdAt), { addSuffix: true }) : 'Just now'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-1.5 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity focus-within:opacity-100 mt-2 sm:mt-0">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => {
              setEditTitle(task.title);
              setIsEditing(true);
            }}
            className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/50 rounded-full h-10 w-10 transition-colors"
          >
            <Pencil className="h-4.5 w-4.5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => onDelete(task.id)}
            className="text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/50 rounded-full h-10 w-10 transition-colors"
          >
            <Trash2 className="h-4.5 w-4.5" />
          </Button>
        </div>
      </div>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="sm:max-w-md rounded-3xl p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold tracking-tight mb-2">Edit Task</DialogTitle>
            <DialogDescription className="sr-only">Update your task title.</DialogDescription>
          </DialogHeader>
          <div className="py-2">
            <Input
              id={`edit-title-${task.id}`}
              name={`edit-title-${task.id}`}
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="text-lg py-6 px-4 focus-visible:ring-indigo-500 rounded-xl"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleEditSubmit();
              }}
            />
          </div>
          <DialogFooter className="sm:justify-end gap-2 mt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsEditing(false)}
              className="rounded-xl px-6"
            >
              Cancel
            </Button>
            <Button 
              type="button" 
              onClick={handleEditSubmit}
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-6"
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
