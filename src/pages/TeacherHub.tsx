import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import Section from "../components/Section";
import TeacherGrowthPanel from "../components/TeacherGrowthPanel";
import TeacherDashboard from "../components/TeacherDashboard";
import ContentManager from "../components/ContentManager";
import VideoUploadModal from "../components/VideoUploadModal";
import { ToastContainer } from "../components/Toast";
import { useToast } from "../hooks/useToast";
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
  const { toasts, removeToast, success, error } = useToast();
  const [authUser, setAuthUser] = useState(() => getUser());
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [students, setStudents] = useState<Student[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [attempts, setAttempts] = useState<any[]>([]);
  const [videos, setVideos] = useState<any[]>([]);

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
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showChapterModal, setShowChapterModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);

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
    const savedVideos = localStorage.getItem('teacherVideos');
    if (savedVideos) {
      setVideos(JSON.parse(savedVideos));
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
    try {
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
      success("Student added successfully!");
    } catch (err) {
      error("Failed to add student");
    }
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
    try {
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
      success("Chapter created successfully!");
    } catch (err) {
      error("Failed to create chapter");
    }
  };

  const handleAssign = async () => {
    if (!selectedStudent || !selectedChapter) return;
    try {
      await createAssignment({
        studentId: selectedStudent,
        chapterId: selectedChapter
      });
      const assignmentData = await fetchTeacherAssignments();
      setAssignments(assignmentData);
      success("Assignment created successfully!");
    } catch (err) {
      error("Failed to create assignment");
    }
  };

  const handleVideoUpload = (videoData: any) => {
    const newVideo = {
      id: Date.now(),
      ...videoData,
      uploadedAt: Date.now()
    };
    const updatedVideos = [...videos, newVideo];
    setVideos(updatedVideos);
    localStorage.setItem('teacherVideos', JSON.stringify(updatedVideos));
    success("Video uploaded successfully!");
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
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #F5E9D8, #2FA4D7)" }}>
        <motion.div 
          className="card" 
          style={{ maxWidth: "400px", padding: "3rem" }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <h2 style={{ marginBottom: "2rem", textAlign: "center" }}>🎓 Teacher Login</h2>
          <div className="form-grid">
            <input className="input" placeholder="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
            <input className="input" type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
            {loginError && <p className="muted">{loginError}</p>}
            <motion.button className="btn btn-primary" onClick={handleLogin} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              Login
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="teacher-hub-wrapper">
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <motion.nav className="glass-navbar" initial={{ y: -100 }} animate={{ y: 0 }} transition={{ type: "spring", stiffness: 100 }}>
        <div className="nav-content">
          <h2>🎓 Gamified Learning Platform for Rural Students</h2>
          <motion.button className="btn-logout" onClick={handleLogout} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Logout</motion.button>
        </div>
      </motion.nav>

      <div style={{ paddingTop: "80px" }}>
        <TeacherDashboard students={students} chapters={chapters} assignments={assignments} onUploadVideo={() => setShowVideoModal(true)} onUploadPDF={() => setShowChapterModal(true)} onCreateAssignment={() => setShowAssignModal(true)} />
      </div>

      <div style={{ padding: "2rem" }}>
        <h2 style={{ marginBottom: "1.5rem", color: "var(--dark)" }}>📚 Content Management</h2>
        <ContentManager chapters={chapters} onEdit={(id) => console.log("Edit", id)} onDelete={(id) => console.log("Delete", id)} onAnalytics={(id) => console.log("Analytics", id)} />
      </div>

      <AnimatePresence>
        {showVideoModal && (
          <VideoUploadModal onClose={() => setShowVideoModal(false)} onUpload={handleVideoUpload} />
        )}

        {showStudentModal && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowStudentModal(false)}>
            <motion.div className="modal-content" initial={{ scale: 0.8, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.8, y: 50 }} onClick={(e) => e.stopPropagation()}>
              <h3>👨🎓 Add New Student</h3>
              <div className="form-grid">
                <input className="input" placeholder="Student Name" value={studentName} onChange={(e) => setStudentName(e.target.value)} />
                <input className="input" placeholder="Username" value={studentUsername} onChange={(e) => setStudentUsername(e.target.value)} />
                <input className="input" type="password" placeholder="PIN" value={studentPin} onChange={(e) => setStudentPin(e.target.value)} />
                <select className="input" value={studentGrade} onChange={(e) => setStudentGrade(e.target.value)}>
                  {gradeOptions.map((g) => <option key={g} value={g}>Grade {g}</option>)}
                </select>
                <motion.button className="btn btn-primary" onClick={() => { handleAddStudent(); setShowStudentModal(false); }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Add Student</motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showChapterModal && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowChapterModal(false)}>
            <motion.div className="modal-content" initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} onClick={(e) => e.stopPropagation()}>
              <h3>📚 Create Chapter</h3>
              <div className="form-grid">
                <select className="input" value={chapterGrade} onChange={(e) => setChapterGrade(e.target.value)}>
                  {gradeOptions.map((g) => <option key={g} value={g}>Grade {g}</option>)}
                </select>
                <select className="input" value={chapterSubject} onChange={(e) => setChapterSubject(e.target.value)}>
                  {subjectOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <input className="input" placeholder="Chapter Title" value={chapterTitle} onChange={(e) => setChapterTitle(e.target.value)} />
                <textarea className="input" placeholder="Summary" value={chapterSummary} onChange={(e) => setChapterSummary(e.target.value)} />
                <div className="sub-card">
                  <h4>Add Question</h4>
                  <input className="input" placeholder="Question" value={questionPrompt} onChange={(e) => setQuestionPrompt(e.target.value)} />
                  {questionOptions.map((opt, i) => <input key={i} className="input" placeholder={`Option ${i + 1}`} value={opt} onChange={(e) => { const next = [...questionOptions]; next[i] = e.target.value; setQuestionOptions(next); }} />)}
                  <select className="input" value={correctIndex} onChange={(e) => setCorrectIndex(Number(e.target.value))}>
                    {[0, 1, 2, 3].map((v) => <option key={v} value={v}>Correct: {v + 1}</option>)}
                  </select>
                  <button className="btn btn-secondary" onClick={addQuestionToDraft}>Add Question</button>
                  {draftQuestions.length > 0 && <p>{draftQuestions.length} questions added</p>}
                </div>
                <motion.button className="btn btn-primary" onClick={() => { handleSaveChapter(); setShowChapterModal(false); }} whileHover={{ scale: 1.05 }}>Save Chapter</motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showAssignModal && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowAssignModal(false)}>
            <motion.div className="modal-content" initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} onClick={(e) => e.stopPropagation()}>
              <h3>📝 Create Assignment</h3>
              <div className="form-grid">
                <select className="input" value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)}>
                  <option value="">Select Student</option>
                  {students.map((s) => <option key={s.id} value={s.id}>{s.name} (G{s.grade})</option>)}
                </select>
                <select className="input" value={selectedChapter} onChange={(e) => setSelectedChapter(e.target.value)}>
                  <option value="">Select Chapter</option>
                  {chapters.map((c) => <option key={c.id} value={c.id}>{c.title} - G{c.grade}</option>)}
                </select>
                <motion.button className="btn btn-primary" onClick={() => { handleAssign(); setShowAssignModal(false); }} whileHover={{ scale: 1.05 }}>Assign</motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <details style={{ padding: "2rem" }}>
        <summary style={{ cursor: "pointer", fontSize: "1.2rem", fontWeight: "700", marginBottom: "1rem" }}>📊 Advanced Analytics</summary>
        <div className="card-grid">
          <div className="card">
            <h3>{t("teacher.analyticsTitle")}</h3>
            <select className="input" value={analyticsStudent} onChange={(e) => { const value = e.target.value; setAnalyticsStudent(value); handleAnalytics(value); }}>
              <option value="">{t("teacher.selectStudent")}</option>
              {students.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
            <p className="muted">{t("teacher.analyticsNote")}</p>
            <button className="btn btn-secondary" onClick={() => handleAnalytics(analyticsStudent)} disabled={!analyticsStudent}>{t("teacher.refresh")}</button>
          </div>
          <TeacherGrowthPanel attempts={attempts} />
        </div>
      </details>
    </div>
  );
};

export default TeacherHub;
