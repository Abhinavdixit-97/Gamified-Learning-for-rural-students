import { authHeader, saveAuth } from "./auth";

const API_BASE =
  import.meta.env.VITE_API_BASE || "";

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || "Request failed.");
  }
  return response.json();
};

export const loginTeacher = async (email: string, password: string) => {
  const response = await fetch(`${API_BASE}/api/auth/login/teacher`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  const data = await handleResponse(response);
  saveAuth(data.token, data.user);
  return data.user;
};

export const loginStudent = async (username: string, pin: string) => {
  const response = await fetch(`${API_BASE}/api/auth/login/student`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, pin })
  });
  const data = await handleResponse(response);
  saveAuth(data.token, data.user);
  return data.user;
};

export const fetchTeacherStudents = async () => {
  const response = await fetch(`${API_BASE}/api/teacher/students`, {
    headers: { ...authHeader() }
  });
  const data = await handleResponse(response);
  return data.students || [];
};

export const createStudent = async (payload: {
  name: string;
  username: string;
  grade: string;
  pin: string;
}) => {
  const response = await fetch(`${API_BASE}/api/teacher/students`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(payload)
  });
  return handleResponse(response);
};

export const fetchTeacherChapters = async () => {
  const response = await fetch(`${API_BASE}/api/teacher/chapters`, {
    headers: { ...authHeader() }
  });
  const data = await handleResponse(response);
  return data.chapters || [];
};

export const createChapter = async (payload: {
  grade: string;
  subject: string;
  title: string;
  summary: string;
  questions: Array<{ prompt: string; options: string[]; correctIndex: number }>;
}) => {
  const response = await fetch(`${API_BASE}/api/teacher/chapters`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(payload)
  });
  return handleResponse(response);
};

export const fetchTeacherAssignments = async () => {
  const response = await fetch(`${API_BASE}/api/teacher/assignments`, {
    headers: { ...authHeader() }
  });
  const data = await handleResponse(response);
  return data.assignments || [];
};

export const createAssignment = async (payload: {
  studentId: number | string;
  chapterId: number | string;
}) => {
  const response = await fetch(`${API_BASE}/api/teacher/assignments`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(payload)
  });
  return handleResponse(response);
};

export const fetchTeacherAttempts = async (studentId: string | number) => {
  const response = await fetch(
    `${API_BASE}/api/teacher/attempts?studentId=${studentId}`,
    { headers: { ...authHeader() } }
  );
  const data = await handleResponse(response);
  return data.attempts || [];
};

export const fetchStudentAssignments = async () => {
  const response = await fetch(`${API_BASE}/api/student/assignments`, {
    headers: { ...authHeader() }
  });
  const data = await handleResponse(response);
  return data.assignments || [];
};

export const fetchStudentAttempts = async () => {
  const response = await fetch(`${API_BASE}/api/student/attempts`, {
    headers: { ...authHeader() }
  });
  const data = await handleResponse(response);
  return data.attempts || [];
};

export const submitStudentAttempt = async (payload: {
  chapterId: number | null;
  subject: string;
  correct: boolean;
  points: number;
  timeSpentSec: number;
  difficulty: string;
  question: string;
  source?: string;
}) => {
  const response = await fetch(`${API_BASE}/api/student/attempts`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(payload)
  });
  return handleResponse(response);
};
