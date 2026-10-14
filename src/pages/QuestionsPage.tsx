import { useState, useMemo } from 'react';
import type { RecentQuestion } from '@/types';
import { recentQuestions as initialQuestions } from '@/data/mockData';
import { Modal } from '@/components/Modal';
import { SearchInput } from '@/components/SearchInput';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { EmptyState } from '@/components/EmptyState';
import {
  History,
  Trash2,
  Globe,
  Clock,
  FileText,
  MessageSquare,
  Eye,
} from 'lucide-react';

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function QuestionsPage() {
  const [questions, setQuestions] = useState<RecentQuestion[]>(initialQuestions);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<RecentQuestion | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const filtered = useMemo(() => {
    if (!search.trim()) return questions;
    return questions.filter((q) =>
      q.question.toLowerCase().includes(search.toLowerCase())
    );
  }, [questions, search]);

  const handleClearHistory = () => {
    setQuestions([]);
    setShowClearConfirm(false);
    setSelected(null);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-4xl mx-auto">
      {/* Header actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fade-in">
        <p className="text-sm text-slate-500">
          {questions.length} question{questions.length !== 1 ? 's' : ''} in your history
        </p>
        <div className="flex items-center gap-3">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search questions..."
            className="w-full sm:w-64"
          />
          {questions.length > 0 && (
            <button
              onClick={() => setShowClearConfirm(true)}
              className="flex items-center gap-2 px-3 py-2.5 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors shrink-0"
            >
              <Trash2 className="w-4 h-4" />
              <span className="hidden sm:inline">Clear History</span>
            </button>
          )}
        </div>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          {questions.length === 0 ? (
            <EmptyState
              icon={<History className="w-8 h-8 text-slate-300" />}
              title="No question history yet"
              message="Questions you ask the HR Assistant will appear here so you can review them later."
            />
          ) : (
            <EmptyState
              icon={<MessageSquare className="w-8 h-8 text-slate-300" />}
              title="No matching questions"
              message="Try a different search term to find what you're looking for."
              action={
                <button
                  onClick={() => setSearch('')}
                  className="px-4 py-2 text-sm font-medium text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors"
                >
                  Clear search
                </button>
              }
            />
          )}
        </div>
      ) : (
        <div className="space-y-3 animate-fade-in">
          {filtered.map((q) => (
            <button
              key={q.id}
              onClick={() => setSelected(q)}
              className="w-full text-left bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-5 hover:shadow-md hover:border-indigo-200 transition-all group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center shrink-0 group-hover:bg-indigo-50 transition-colors">
                    <MessageSquare className="w-4 h-4 text-slate-400 group-hover:text-indigo-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate">
                      {q.question}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Globe className="w-3 h-3" />
                        {q.region}
                      </span>
                      <span className="text-xs text-slate-400">{q.category}</span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatDate(q.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>
                <Eye className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 shrink-0 mt-1" />
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Detail modal */}
      <Modal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        title="Question Details"
        footer={
          <button
            onClick={() => setSelected(null)}
            className="px-4 py-2 text-sm font-medium text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            Close
          </button>
        }
      >
        {selected && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                Question
              </label>
              <p className="text-sm text-slate-800 mt-1">{selected.question}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-2.5 py-1 text-xs font-medium text-slate-600 bg-slate-100 rounded-full flex items-center gap-1">
                <Globe className="w-3 h-3" />
                {selected.region}
              </span>
              <span className="px-2.5 py-1 text-xs font-medium text-indigo-700 bg-indigo-50 rounded-full">
                {selected.category}
              </span>
              <span className="px-2.5 py-1 text-xs font-medium text-slate-600 bg-slate-100 rounded-full flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {formatDate(selected.timestamp)}
              </span>
            </div>
            <div className="pt-3 border-t border-slate-100">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                Answer
              </label>
              <p className="text-sm text-slate-600 leading-relaxed mt-1">
                {selected.answer}
              </p>
            </div>
            {selected.sourceDocument && (
              <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg">
                <FileText className="w-4 h-4 text-slate-400" />
                <span className="text-xs text-slate-500">
                  Source document: {selected.sourceDocument}
                </span>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Clear confirmation */}
      <ConfirmDialog
        isOpen={showClearConfirm}
        title="Clear question history?"
        message="This will permanently remove all questions from your history. This action cannot be undone."
        confirmLabel="Clear all"
        onConfirm={handleClearHistory}
        onCancel={() => setShowClearConfirm(false)}
      />
    </div>
  );
}
