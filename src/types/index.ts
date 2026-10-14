export type Region = 'India' | 'United States' | 'United Kingdom';

export type PageKey =
  | 'overview'
  | 'ask'
  | 'documents'
  | 'questions'
  | 'settings';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sourceDocument?: string;
  timestamp: string;
}

export interface PolicyDocument {
  id: string;
  title: string;
  category: string;
  region: Region | 'Global';
  lastUpdated: string;
  icon: string;
  summary: string;
  content: string;
}

export interface PopularQuestion {
  id: string;
  question: string;
  category: string;
}

export interface RecentQuestion {
  id: string;
  question: string;
  region: Region;
  category: string;
  timestamp: string;
  answer: string;
  sourceDocument?: string;
}

export interface AssistantResponse {
  answer: string;
  sourceDocument?: string;
}

export interface UserSettings {
  displayName: string;
  preferredRegion: Region;
  notifications: boolean;
}

export interface UserProfile {
  name: string;
  role: string;
  initials: string;
}
