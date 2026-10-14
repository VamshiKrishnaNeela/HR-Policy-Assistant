import type { PageKey } from '@/types';
import { userProfile } from '@/data/mockData';
import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  History,
  Settings,
  HelpCircle,
  X,
  GraduationCap,
} from 'lucide-react';

interface SidebarProps {
  activePage: PageKey;
  onNavigate: (page: PageKey) => void;
  isOpen: boolean;
  onClose: () => void;
}

const navItems: { key: PageKey; label: string; icon: typeof LayoutDashboard }[] = [
  { key: 'overview', label: 'Overview', icon: LayoutDashboard },
  { key: 'ask', label: 'Ask HR Assistant', icon: MessageSquare },
  { key: 'documents', label: 'Policy Documents', icon: FileText },
  { key: 'questions', label: 'My Recent Questions', icon: History },
  { key: 'settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ activePage, onNavigate, isOpen, onClose }: SidebarProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-72 bg-white border-r border-slate-200 flex flex-col transition-transform duration-200 lg:translate-x-0 ${
          isOpen ? 'translate-x-0 animate-slide-in' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shrink-0">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-slate-800 leading-tight">
                HR Policy
              </h1>
              <p className="text-xs text-slate-500 leading-tight">Assistant</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-md hover:bg-slate-100"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.key;
            return (
              <button
                key={item.key}
                onClick={() => onNavigate(item.key)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon
                  className={`w-5 h-5 shrink-0 ${
                    isActive ? 'text-indigo-600' : 'text-slate-400'
                  }`}
                />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Help link */}
        <div className="px-3 pb-2">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-slate-50 text-slate-500 text-xs">
            <HelpCircle className="w-4 h-4 shrink-0 text-slate-400" />
            <span>Need help? Contact IT support.</span>
          </div>
        </div>

        {/* User profile */}
        <div className="px-4 py-4 border-t border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
              <span className="text-sm font-semibold text-indigo-700">
                {userProfile.initials}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-800 truncate">
                {userProfile.name}
              </p>
              <p className="text-xs text-slate-500 truncate">{userProfile.role}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
