import { useState, useMemo } from 'react';
import type { PolicyDocument, Region } from '@/types';
import { policyDocuments, regions, categories } from '@/data/mockData';
import { Modal } from '@/components/Modal';
import { SearchInput } from '@/components/SearchInput';
import { DynamicIcon } from '@/components/DynamicIcon';
import { Filter, RotateCcw, Clock, FileText, Globe, X } from 'lucide-react';

const allRegions = [...regions, 'Global'] as const;

export function DocumentsPage() {
  const [search, setSearch] = useState('');
  const [regionFilter, setRegionFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [selectedDoc, setSelectedDoc] = useState<PolicyDocument | null>(null);

  const filteredDocs = useMemo(() => {
    return policyDocuments.filter((doc) => {
      const matchesSearch =
        doc.title.toLowerCase().includes(search.toLowerCase()) ||
        doc.summary.toLowerCase().includes(search.toLowerCase());
      const matchesRegion =
        regionFilter === 'all' || doc.region === regionFilter;
      const matchesCategory =
        categoryFilter === 'all' || doc.category === categoryFilter;
      return matchesSearch && matchesRegion && matchesCategory;
    });
  }, [search, regionFilter, categoryFilter]);

  const hasFilters = search || regionFilter !== 'all' || categoryFilter !== 'all';

  const handleReset = () => {
    setSearch('');
    setRegionFilter('all');
    setCategoryFilter('all');
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-6xl mx-auto">
      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-5 animate-fade-in">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-4 h-4 text-slate-400" />
          <h3 className="text-sm font-semibold text-slate-700">Filter Documents</h3>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search by title..."
            className="lg:col-span-2"
          />
          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-slate-700"
          >
            <option value="all">All Regions</option>
            {allRegions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-slate-700"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        {hasFilters && (
          <button
            onClick={handleReset}
            className="mt-3 flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset filters
          </button>
        )}
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">
          {filteredDocs.length} document{filteredDocs.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Document cards */}
      {filteredDocs.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-sm font-semibold text-slate-700 mb-1">
              No documents found
            </h3>
            <p className="text-sm text-slate-500 max-w-xs">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <button
              onClick={handleReset}
              className="mt-4 px-4 py-2 text-sm font-medium text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors"
            >
              Reset filters
            </button>
          </div>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
          {filteredDocs.map((doc) => (
            <button
              key={doc.id}
              onClick={() => setSelectedDoc(doc)}
              className="text-left bg-white rounded-xl border border-slate-200 shadow-sm p-5 hover:shadow-md hover:border-indigo-200 transition-all group"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-11 h-11 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0 group-hover:bg-indigo-100 transition-colors">
                  <DynamicIcon name={doc.icon} className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-semibold text-slate-800 leading-snug">
                    {doc.title}
                  </h4>
                  <span className="text-xs text-indigo-600 font-medium">
                    {doc.category}
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-500 line-clamp-2 mb-3">{doc.summary}</p>
              <div className="flex items-center gap-3 text-xs text-slate-400 pt-3 border-t border-slate-100">
                <span className="flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5" />
                  {doc.region}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {doc.lastUpdated}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Document preview modal */}
      <Modal
        isOpen={!!selectedDoc}
        onClose={() => setSelectedDoc(null)}
        title={selectedDoc?.title ?? ''}
        footer={
          <button
            onClick={() => setSelectedDoc(null)}
            className="px-4 py-2 text-sm font-medium text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            Close
          </button>
        }
      >
        {selectedDoc && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <span className="px-2.5 py-1 text-xs font-medium text-indigo-700 bg-indigo-50 rounded-full">
                {selectedDoc.category}
              </span>
              <span className="px-2.5 py-1 text-xs font-medium text-slate-600 bg-slate-100 rounded-full flex items-center gap-1">
                <Globe className="w-3 h-3" />
                {selectedDoc.region}
              </span>
              <span className="px-2.5 py-1 text-xs font-medium text-slate-600 bg-slate-100 rounded-full flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Updated {selectedDoc.lastUpdated}
              </span>
            </div>
            <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
              <DynamicIcon
                name={selectedDoc.icon}
                className="w-6 h-6 text-indigo-600 shrink-0 mt-0.5"
              />
              <p className="text-sm text-slate-600">{selectedDoc.summary}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-700 mb-2">
                Document Content
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                {selectedDoc.content}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
