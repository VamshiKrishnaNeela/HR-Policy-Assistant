import { useState } from 'react';
import type { PageKey } from '@/types';
import { StatCard } from '@/components/StatCard';
import { DynamicIcon } from '@/components/DynamicIcon';
import { SearchInput } from '@/components/SearchInput';
import {
  FileText,
  Globe,
  MessageSquare,
  History,
  ArrowRight,
  Send,
  Clock,
} from 'lucide-react';
import {
  stats,
  popularQuestions,
  recentlyViewedPolicies,
} from '@/data/mockData';

interface OverviewPageProps {
  onNavigate: (page: PageKey) => void;
  onAskQuestion: (question: string) => void;
}

export function OverviewPage({ onNavigate, onAskQuestion }: OverviewPageProps) {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = () => {
    if (searchValue.trim()) {
      onAskQuestion(searchValue.trim());
      setSearchValue('');
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-6xl mx-auto">
      {/* Welcome */}
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold text-slate-800">Hello, Alex</h1>
        <p className="text-slate-500 mt-1">Find answers to your HR policy questions.</p>
      </div>

      {/* Search box */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-6 animate-fade-in">
        <label className="text-sm font-medium text-slate-700 mb-2 block">
          Ask a question
        </label>
        <div className="flex gap-3">
          <SearchInput
            value={searchValue}
            onChange={setSearchValue}
            placeholder="e.g. How many annual leave days do I get?"
            className="flex-1"
          />
          <button
            onClick={handleSearch}
            disabled={!searchValue.trim()}
            className="px-4 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 shrink-0"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Ask</span>
          </button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
        <StatCard
          label="Available Policies"
          value={stats.availablePolicies}
          icon={FileText}
          color="indigo"
        />
        <StatCard
          label="Supported Regions"
          value={stats.supportedRegions}
          icon={Globe}
          color="blue"
        />
        <StatCard
          label="Questions Asked"
          value={stats.questionsAsked}
          icon={MessageSquare}
          color="green"
        />
        <StatCard
          label="Recent Searches"
          value={stats.recentSearches}
          icon={History}
          color="amber"
        />
      </div>

      {/* Popular Questions */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-6 animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-slate-800">Popular HR Questions</h3>
          <button
            onClick={() => onNavigate('ask')}
            className="text-sm text-indigo-600 font-medium hover:text-indigo-700 flex items-center gap-1"
          >
            Ask now <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-2">
          {popularQuestions.map((q) => (
            <button
              key={q.id}
              onClick={() => onAskQuestion(q.question)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/50 transition-colors text-left group"
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 shrink-0" />
                <span className="text-sm text-slate-700">{q.question}</span>
              </div>
              <span className="text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded shrink-0 ml-3">
                {q.category}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Recently Viewed Policies */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-6 animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-slate-800">Recently Viewed Policies</h3>
          <button
            onClick={() => onNavigate('documents')}
            className="text-sm text-indigo-600 font-medium hover:text-indigo-700 flex items-center gap-1"
          >
            View all <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentlyViewedPolicies.map((doc) => (
            <button
              key={doc.id}
              onClick={() => onNavigate('documents')}
              className="text-left p-4 rounded-lg border border-slate-100 hover:border-indigo-200 hover:shadow-md transition-all group"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                  <DynamicIcon name={doc.icon} className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-slate-800 truncate">
                    {doc.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">
                    {doc.summary}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-slate-400">{doc.region}</span>
                    <span className="text-xs text-slate-300">·</span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {doc.lastUpdated}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
