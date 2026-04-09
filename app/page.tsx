import { TaskManager } from '@/components/task-manager';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-12 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob pointer-events-none"></div>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000 pointer-events-none"></div>
      <div className="absolute -bottom-8 left-1/3 w-96 h-96 bg-indigo-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000 pointer-events-none"></div>
      
      <div className="max-w-2xl mx-auto relative z-10 space-y-8">
        <header className="text-center pt-8">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-3">
            Task Manager
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-md mx-auto">
            Stay organized, focused, and get things done with our beautiful workspace.
          </p>
        </header>
        <TaskManager />
      </div>
    </main>
  );
}
