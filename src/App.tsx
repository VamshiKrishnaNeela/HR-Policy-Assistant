import { useState } from 'react';
import type { PageKey, Region } from '@/types';
import { Sidebar } from '@/components/Sidebar';
import { Topbar } from '@/components/Topbar';
import { OverviewPage } from '@/pages/OverviewPage';
import { AskPage } from '@/pages/AskPage';
import { DocumentsPage } from '@/pages/DocumentsPage';
import { QuestionsPage } from '@/pages/QuestionsPage';
import { SettingsPage } from '@/pages/SettingsPage';

const pageTitles: Record<PageKey, string> = {
  overview: 'Overview',
  ask: 'Ask HR Assistant',
  documents: 'Policy Documents',
  questions: 'My Recent Questions',
  settings: 'Settings',
};

export default function App() {
  const [activePage, setActivePage] = useState<PageKey>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [region, setRegion] = useState<Region>('India');
  const [pendingQuestion, setPendingQuestion] = useState<string | null>(null);

  const handleNavigate = (page: PageKey) => {
    setActivePage(page);
    setSidebarOpen(false);
  };

  const handleAskQuestion = (question: string) => {
    setPendingQuestion(question);
    setActivePage('ask');
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">
      <Sidebar
        activePage={activePage}
        onNavigate={handleNavigate}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar
          title={pageTitles[activePage]}
          onMenuClick={() => setSidebarOpen(true)}
          page={activePage}
        />

        <main className="flex-1 overflow-y-auto custom-scrollbar">
          {activePage === 'overview' && (
            <OverviewPage
              onNavigate={handleNavigate}
              onAskQuestion={handleAskQuestion}
            />
          )}
          {activePage === 'ask' && (
            <AskPage
              key={pendingQuestion ?? 'default'}
              region={region}
              onRegionChange={setRegion}
              initialQuestion={pendingQuestion}
            />
          )}
          {activePage === 'documents' && <DocumentsPage />}
          {activePage === 'questions' && <QuestionsPage />}
          {activePage === 'settings' && <SettingsPage />}
        </main>
      </div>
    </div>
  );
}
