export type Attempt = {
  id: string;
  subject: string;
  correct: boolean;
  points: number;
  timestamp: number;
  timeSpentSec: number;
  difficulty: string;
  question: string;
  studentId?: string;
  chapterId?: string;
  source?: "ai" | "chapter";
};

const STORAGE_KEY = "rlq_attempts";

export const loadAttempts = (): Attempt[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item) => item && typeof item === "object");
  } catch (error) {
    return [];
  }
};

export const saveAttempt = (attempt: Attempt) => {
  const existing = loadAttempts();
  const updated = [...existing, attempt];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const clearAttempts = () => {
  localStorage.removeItem(STORAGE_KEY);
};
