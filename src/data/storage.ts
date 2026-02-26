export type Student = {
  id: string;
  name: string;
  grade: string;
};

export type Question = {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
};

export type Chapter = {
  id: string;
  grade: string;
  subject: string;
  title: string;
  summary: string;
  questions: Question[];
};

export type Assignment = {
  id: string;
  studentId: string;
  chapterId: string;
  assignedAt: number;
};

const STUDENTS_KEY = "rlq_students";
const CHAPTERS_KEY = "rlq_chapters";
const ASSIGNMENTS_KEY = "rlq_assignments";

const load = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch (error) {
    return fallback;
  }
};

const save = <T,>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const loadStudents = (): Student[] => load<Student[]>(STUDENTS_KEY, []);
export const saveStudents = (students: Student[]) => save(STUDENTS_KEY, students);

export const addStudent = (student: Student) => {
  const existing = loadStudents();
  saveStudents([...existing, student]);
};

export const loadChapters = (): Chapter[] => load<Chapter[]>(CHAPTERS_KEY, []);
export const saveChapters = (chapters: Chapter[]) => save(CHAPTERS_KEY, chapters);

export const addChapter = (chapter: Chapter) => {
  const existing = loadChapters();
  saveChapters([...existing, chapter]);
};

export const loadAssignments = (): Assignment[] =>
  load<Assignment[]>(ASSIGNMENTS_KEY, []);
export const saveAssignments = (assignments: Assignment[]) =>
  save(ASSIGNMENTS_KEY, assignments);

export const addAssignment = (assignment: Assignment) => {
  const existing = loadAssignments();
  saveAssignments([...existing, assignment]);
};

export const getStudentById = (students: Student[], id: string) =>
  students.find((student) => student.id === id);

export const getChapterById = (chapters: Chapter[], id: string) =>
  chapters.find((chapter) => chapter.id === id);
