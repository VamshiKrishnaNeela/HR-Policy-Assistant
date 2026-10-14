import type { AssistantResponse, Region } from '@/types';
import { mockAnswers, fallbackResponse } from '@/data/mockData';

/**
 * This module is the single integration point between the frontend and the
 * backend. Currently it returns mock data. When the backend is ready, replace
 * the body of `askAssistant` with a real API call (e.g. fetch to the backend
 * endpoint) and keep the same return shape so the UI does not change.
 *
 * Expected backend contract (to be confirmed):
 *   POST /api/hr-assistant/ask
 *   Body: { question: string, region: Region }
 *   Response: { answer: string, sourceDocument?: string }
 */

export async function askAssistant(
  question: string,
  _region: Region
): Promise<AssistantResponse> {
  // Simulate network latency for a realistic loading state
  await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 600));

  const normalized = question.toLowerCase();

  for (const entry of mockAnswers) {
    if (entry.keywords.some((kw) => normalized.includes(kw))) {
      return {
        answer: entry.answer,
        sourceDocument: entry.sourceDocument,
      };
    }
  }

  return { answer: fallbackResponse };
}
