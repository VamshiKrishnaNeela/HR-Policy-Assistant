import { Menu } from 'lucide-react';
import type { PageKey } from '@/types';

interface TopbarProps {
  title: string;
  onMenuClick: () => void;
  page: PageKey;
}

export function Topbar({ title, onMenuClick }: TopbarProps) {
  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-sm border-b border-slate-200 px-4 sm:px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-slate-100"
        >
          <Menu className="w-5 h-5 text-slate-600" />
        </button>
        <h2 className="text-lg font-bold text-slate-800">{title}</h2>
      </div>
    </header>
  );
}
