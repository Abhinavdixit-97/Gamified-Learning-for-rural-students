const API_BASE =
  import.meta.env.VITE_API_BASE || "";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export const requestDoubtSolve = async (payload: {
  language: string;
  grade: string;
  subject: string;
  question: string;
  history: ChatMessage[];
}) => {
  const response = await fetch(`${API_BASE}/api/ai/doubt`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error("Failed to fetch doubt answer.");
  }
  return response.json();
};

export const requestLevelAnalysis = async (payload: {
  language: string;
  grade: string;
  subject: string;
  diagnosticAnswers: Array<{
    question: string;
    correctAnswer: string;
    studentAnswer: string;
  }>;
}) => {
  const response = await fetch(`${API_BASE}/api/ai/level`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error("Failed to analyze level.");
  }
  return response.json();
};

export const requestNextQuestion = async (payload: {
  language: string;
  grade: string;
  subject: string;
  level: string;
  history: string[];
}) => {
  const response = await fetch(`${API_BASE}/api/ai/next-question`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error("Failed to fetch next question.");
  }
  return response.json();
};
