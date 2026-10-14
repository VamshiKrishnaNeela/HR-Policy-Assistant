import { useState, useRef, useEffect } from 'react';
import type { ChatMessage, Region } from '@/types';
import { askAssistant } from '@/services/hrService';
import { suggestedQuestions, regions } from '@/data/mockData';
import {
  Send,
  Trash2,
  Bot,
  User,
  MapPin,
  FileText,
  Sparkles,
} from 'lucide-react';

interface AskPageProps {
  region: Region;
  onRegionChange: (region: Region) => void;
  initialQuestion?: string | null;
}

let messageIdCounter = 0;
function generateId(): string {
  messageIdCounter += 1;
  return `msg-${Date.now()}-${messageIdCounter}`;
}

function formatTime(): string {
  return new Date().toISOString();
}

const welcomeMessage: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content:
    "Hi! I'm your HR Policy Assistant. Ask me anything about leave policies, benefits, holidays, or any other HR-related topic. I'll do my best to find the answer for you.",
  timestamp: formatTime(),
};

export function AskPage({ region, onRegionChange, initialQuestion }: AskPageProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const initialQuestionSent = useRef(false);

  useEffect(() => {
    if (initialQuestion && !initialQuestionSent.current) {
      initialQuestionSent.current = true;
      handleSend(initialQuestion);
    }
  }, [initialQuestion]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (questionText?: string) => {
    const text = (questionText ?? input).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: generateId(),
      role: 'user',
      content: text,
      timestamp: formatTime(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await askAssistant(text, region);
      const assistantMsg: ChatMessage = {
        id: generateId(),
        role: 'assistant',
        content: response.answer,
        sourceDocument: response.sourceDocument,
        timestamp: formatTime(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      const errorMsg: ChatMessage = {
        id: generateId(),
        role: 'assistant',
        content:
          'Sorry, something went wrong while processing your question. Please try again later.',
        timestamp: formatTime(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([{ ...welcomeMessage, id: 'welcome', timestamp: formatTime() }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-73px)]">
      {/* Top controls */}
      <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3 border-b border-slate-200 bg-white">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-slate-400" />
          <select
            value={region}
            onChange={(e) => onRegionChange(e.target.value as Region)}
            className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-slate-700"
          >
            {regions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          <span className="text-xs text-slate-400 hidden sm:inline">
            Currently selected region
          </span>
        </div>
        <button
          onClick={handleClear}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          <span className="hidden sm:inline">Clear</span>
        </button>
      </div>

      {/* Conversation */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto custom-scrollbar px-4 sm:px-6 py-6 space-y-4"
      >
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}

          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                <div className="flex items-center gap-1.5">
                  <span className="typing-dot w-2 h-2 bg-slate-400 rounded-full" />
                  <span className="typing-dot w-2 h-2 bg-slate-400 rounded-full" />
                  <span className="typing-dot w-2 h-2 bg-slate-400 rounded-full" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Suggested questions */}
      {messages.length <= 1 && !isLoading && (
        <div className="px-4 sm:px-6 pb-2">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs text-slate-400 mb-2 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Suggested questions
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="px-3 py-1.5 text-xs font-medium text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-full hover:bg-indigo-100 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-slate-200 bg-white px-4 sm:px-6 py-4">
        <div className="max-w-3xl mx-auto flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your HR question here..."
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:opacity-60 transition-shadow"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className="px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 shrink-0"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user';

  if (isUser) {
    return (
      <div className="flex items-start gap-3 justify-end animate-fade-in">
        <div className="bg-indigo-600 text-white rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%] shadow-sm">
          <p className="text-sm leading-relaxed">{message.content}</p>
        </div>
        <div className="w-8 h-8 rounded-lg bg-slate-200 flex items-center justify-center shrink-0">
          <User className="w-5 h-5 text-slate-600" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 animate-fade-in">
      <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0">
        <Bot className="w-5 h-5 text-white" />
      </div>
      <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%] shadow-sm">
        <p className="text-sm leading-relaxed text-slate-700">{message.content}</p>
        {message.sourceDocument && (
          <div className="mt-2 pt-2 border-t border-slate-100 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs text-slate-500">
              Source: {message.sourceDocument}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
