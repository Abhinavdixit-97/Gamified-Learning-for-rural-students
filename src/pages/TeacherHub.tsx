import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Section from "../components/Section";
import TeacherGrowthPanel from "../components/TeacherGrowthPanel";
import { clearAuth, getUser } from "../data/auth";
import {
  createAssignment,
  createChapter,
  createStudent,
  fetchTeacherAssignments,
  fetchTeacherAttempts,
  fetchTeacherChapters,
  fetchTeacherStudents,
  loginTeacher
} from "../data/apiClient";

type Student = {
  id: number;
  name: string;
  username: string;
  grade: string;
};

type Chapter = {
  id: number;
  grade: string;
  subject: string;
  title: string;
  summary: string;
};

type Assignment = {
  id: number;
  assignedAt: number;
  studentId: number;
  studentName: string;
  studentGrade: string;
  chapterId: number;
  chapterTitle: string;
  chapterGrade: string;
  chapterSubject: string;
};

type DraftQuestion = {
  prompt: string;
  options: string[];
  correctIndex: number;
};

const gradeOptions = ["6", "7", "8", "9", "10", "11", "12"];
const subjectOptions = [
  "Math",
  "Science",
  "English",
  "General Knowledge",
  "Moral Science"
];

const TeacherHub = () => {
  const { t } = useTranslation();
  const [authUser, setAuthUser] = useState(() => getUser());
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [students, setStudents] = useState<Student[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [attempts, setAttempts] = useState<any[]>([]);

  const [studentName, setStudentName] = useState("");
  const [studentUsername, setStudentUsername] = useState("");
  const [studentPin, setStudentPin] = useState("");
  const [studentGrade, setStudentGrade] = useState("6");

  const [chapterGrade, setChapterGrade] = useState("6");
  const [chapterSubject, setChapterSubject] = useState("Math");
  const [chapterTitle, setChapterTitle] = useState("");
  const [chapterSummary, setChapterSummary] = useState("");
  const [questionPrompt, setQuestionPrompt] = useState("");
  const [questionOptions, setQuestionOptions] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(0);
  const [draftQuestions, setDraftQuestions] = useState<DraftQuestion[]>([]);

  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");
  const [analyticsStudent, setAnalyticsStudent] = useState("");

  const loadData = async () => {
    const [studentData, chapterData, assignmentData] = await Promise.all([
      fetchTeacherStudents(),
      fetchTeacherChapters(),
      fetchTeacherAssignments()
    ]);
    setStudents(studentData);
    setChapters(chapterData);
    setAssignments(assignmentData);
  };

  useEffect(() => {
    if (authUser?.role === "teacher") {
      loadData();
    }
  }, [authUser]);

  const handleLogin = async () => {
    setLoginError("");
    try {
      const user = await loginTeacher(loginEmail, loginPassword);
      setAuthUser(user);
    } catch (error: any) {
      setLoginError(error.message || "Login failed.");
    }
  };

  const handleLogout = () => {
    clearAuth();
    setAuthUser(null);
    setStudents([]);
    setChapters([]);
    setAssignments([]);
    setAttempts([]);
  };

  const handleAddStudent = async () => {
    if (!studentName.trim() || !studentUsername.trim() || !studentPin.trim()) return;
    await createStudent({
      name: studentName.trim(),
      username: studentUsername.trim(),
      grade: studentGrade,
      pin: studentPin.trim()
    });
    setStudentName("");
    setStudentUsername("");
    setStudentPin("");
    const studentData = await fetchTeacherStudents();
    setStudents(studentData);
  };

  const addQuestionToDraft = () => {
    if (!questionPrompt.trim()) return;
    const options = questionOptions.map((opt) => opt.trim()).filter(Boolean);
    if (options.length < 4) return;
    const question: DraftQuestion = {
      prompt: questionPrompt.trim(),
      options,
      correctIndex
    };
    setDraftQuestions((prev) => [...prev, question]);
    setQuestionPrompt("");
    setQuestionOptions(["", "", "", ""]);
    setCorrectIndex(0);
  };

  const handleSaveChapter = async () => {
    if (!chapterTitle.trim() || draftQuestions.length === 0) return;
    await createChapter({
      grade: chapterGrade,
      subject: chapterSubject,
      title: chapterTitle.trim(),
      summary: chapterSummary.trim(),
      questions: draftQuestions
    });
    setChapterTitle("");
    setChapterSummary("");
    setDraftQuestions([]);
    const chapterData = await fetchTeacherChapters();
    setChapters(chapterData);
  };

  const handleAssign = async () => {
    if (!selectedStudent || !selectedChapter) return;
    await createAssignment({
      studentId: selectedStudent,
      chapterId: selectedChapter
    });
    const assignmentData = await fetchTeacherAssignments();
    setAssignments(assignmentData);
  };

  const handleAnalytics = async (studentId: string) => {
    if (!studentId) {
      setAttempts([]);
      return;
    }
    const data = await fetchTeacherAttempts(studentId);
    const normalized = data.map((item: any) => ({
      id: String(item.id),
      subject: item.subject || "",
      correct: Boolean(item.correct),
      points: Number(item.points || 0),
      timestamp: Number(item.timestamp || 0),
      timeSpentSec: Number(item.time_spent_sec || 0),
      difficulty: item.difficulty || "",
      question: item.question || "",
      studentId: String(item.student_id || ""),
      chapterId: item.chapter_id ? String(item.chapter_id) : undefined,
      source: item.source || "chapter"
    }));
    setAttempts(normalized);
  };

  if (!authUser || authUser.role !== "teacher") {
    return (
      <Section title={t("teacher.loginTitle")}>
        <div className="card form-grid">
          <input
            className="input"
            placeholder={t("teacher.email")}
            value={loginEmail}
            onChange={(event) => setLoginEmail(event.target.value)}
          />
          <input
            className="input"
            type="password"
            placeholder={t("teacher.password")}
            value={loginPassword}
            onChange={(event) => setLoginPassword(event.target.value)}
          />
          {loginError && <p className="muted">{loginError}</p>}
          <button className="btn btn-primary" onClick={handleLogin}>
            {t("teacher.login")}
          </button>
        </div>
      </Section>
    );
  }

  return (
    <Section title={t("teacher.title")}>
      <p>{t("teacher.subtitle")}</p>
      <button className="btn btn-secondary" onClick={handleLogout}>
        {t("teacher.logout")}
      </button>

      <div className="card-grid">
        <div className="card">
          <h3>{t("teacher.addStudentTitle")}</h3>
          <div className="form-grid">
            <input
              className="input"
              placeholder={t("teacher.studentName")}
              value={studentName}
              onChange={(event) => setStudentName(event.target.value)}
            />
            <input
              className="input"
              placeholder={t("teacher.studentUsername")}
              value={studentUsername}
              onChange={(event) => setStudentUsername(event.target.value)}
            />
            <input
              className="input"
              placeholder={t("teacher.studentPin")}
              value={studentPin}
              type="password"
              onChange={(event) => setStudentPin(event.target.value)}
            />
            <select
              className="input"
              value={studentGrade}
              onChange={(event) => setStudentGrade(event.target.value)}
            >
              {gradeOptions.map((grade) => (
                <option key={grade} value={grade}>
                  {grade}
                </option>
              ))}
            </select>
            <button className="btn btn-primary" onClick={handleAddStudent}>
              {t("teacher.addStudent")}
            </button>
          </div>
          {students.length === 0 ? (
            <p className="muted">{t("teacher.noStudents")}</p>
          ) : (
            <ul>
              {students.map((student) => (
                <li key={student.id}>
                  {student.name} - {t("teacher.grade")} {student.grade} (
                  {student.username})
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="card">
          <h3>{t("teacher.addChapterTitle")}</h3>
          <div className="form-grid">
            <select
              className="input"
              value={chapterGrade}
              onChange={(event) => setChapterGrade(event.target.value)}
            >
              {gradeOptions.map((grade) => (
                <option key={grade} value={grade}>
                  {grade}
                </option>
              ))}
            </select>
            <select
              className="input"
              value={chapterSubject}
              onChange={(event) => setChapterSubject(event.target.value)}
            >
              {subjectOptions.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
            <input
              className="input"
              placeholder={t("teacher.chapterTitle")}
              value={chapterTitle}
              onChange={(event) => setChapterTitle(event.target.value)}
            />
            <textarea
              className="input"
              placeholder={t("teacher.chapterSummary")}
              value={chapterSummary}
              onChange={(event) => setChapterSummary(event.target.value)}
            />
          </div>

          <div className="sub-card">
            <h4>{t("teacher.addQuestionTitle")}</h4>
            <input
              className="input"
              placeholder={t("teacher.questionText")}
              value={questionPrompt}
              onChange={(event) => setQuestionPrompt(event.target.value)}
            />
            {questionOptions.map((option, index) => (
              <input
                key={`opt-${index}`}
                className="input"
                placeholder={`${t("teacher.option")} ${index + 1}`}
                value={option}
                onChange={(event) => {
                  const next = [...questionOptions];
                  next[index] = event.target.value;
                  setQuestionOptions(next);
                }}
              />
            ))}
            <label className="input-label">
              {t("teacher.correctOption")}
              <select
                className="input"
                value={correctIndex}
                onChange={(event) => setCorrectIndex(Number(event.target.value))}
              >
                {[0, 1, 2, 3].map((value) => (
                  <option key={value} value={value}>
                    {value + 1}
                  </option>
                ))}
              </select>
            </label>
            <button className="btn btn-secondary" onClick={addQuestionToDraft}>
              {t("teacher.addQuestion")}
            </button>
            {draftQuestions.length > 0 && (
              <ul>
                {draftQuestions.map((question, index) => (
                  <li key={`${question.prompt}-${index}`}>{question.prompt}</li>
                ))}
              </ul>
            )}
          </div>

          <button className="btn btn-primary" onClick={handleSaveChapter}>
            {t("teacher.saveChapter")}
          </button>
        </div>

        <div className="card">
          <h3>{t("teacher.assignTitle")}</h3>
          <div className="form-grid">
            <select
              className="input"
              value={selectedStudent}
              onChange={(event) => setSelectedStudent(event.target.value)}
            >
              <option value="">{t("teacher.selectStudent")}</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name} (G{student.grade})
                </option>
              ))}
            </select>
            <select
              className="input"
              value={selectedChapter}
              onChange={(event) => setSelectedChapter(event.target.value)}
            >
              <option value="">{t("teacher.selectChapter")}</option>
              {chapters.map((chapter) => (
                <option key={chapter.id} value={chapter.id}>
                  {chapter.title} - G{chapter.grade} {chapter.subject}
                </option>
              ))}
            </select>
            <button className="btn btn-primary" onClick={handleAssign}>
              {t("teacher.assign")}
            </button>
          </div>
          {assignments.length === 0 ? (
            <p className="muted">{t("teacher.noAssignments")}</p>
          ) : (
            <ul>
              {assignments.map((assignment) => (
                <li key={assignment.id}>
                  {assignment.studentName || "Student"} → {assignment.chapterTitle || "Chapter"}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="section">
        <div className="card-grid">
          <div className="card">
            <h3>{t("teacher.analyticsTitle")}</h3>
            <select
              className="input"
              value={analyticsStudent}
              onChange={(event) => {
                const value = event.target.value;
                setAnalyticsStudent(value);
                handleAnalytics(value);
              }}
            >
              <option value="">{t("teacher.selectStudent")}</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name}
                </option>
              ))}
            </select>
            <p className="muted">{t("teacher.analyticsNote")}</p>
            <button
              className="btn btn-secondary"
              onClick={() => handleAnalytics(analyticsStudent)}
              disabled={!analyticsStudent}
            >
              {t("teacher.refresh")}
            </button>
          </div>
          <TeacherGrowthPanel attempts={attempts} />
        </div>
      </div>
    </Section>
  );
};

export default TeacherHub;
