import { TaskManager } from '@/components/task-manager';
import { CheckCircle2 } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-8 md:px-12 md:py-16 relative overflow-hidden">
      // Ambient background blobs purely decorative
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/4 w-72 md:w-96 h-72 md:h-96 bg-violet-400/8 rounded-full mix-blend-multiply filter blur-3xl animate-blob pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute top-0 right-1/4 w-72 md:w-96 h-72 md:h-96 bg-sky-400/8 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000 pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-8 left-1/3 w-72 md:w-96 h-72 md:h-96 bg-indigo-400/8 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000 pointer-events-none"
      />

      <div className="max-w-2xl mx-auto relative z-10 space-y-8 animate-fade-in-up">
        <header className="text-center pt-4 md:pt-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl">
              <CheckCircle2 className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 tracking-wide uppercase">
              FocusFlow
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-3">
            What will you accomplish today?
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg max-w-md mx-auto">
            A simple space to capture, organize, and complete your tasks.
          </p>
        </header>

        <TaskManager />
      </div>
    </main>
  );
}
