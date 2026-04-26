import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import Section from "../components/Section";
import OfficialLearningPath from "../components/OfficialLearningPath";
import VideoLectures from "../components/VideoLectures";
import ChapterReading from "../components/ChapterReading";
import EducationalGames from "../components/EducationalGames";
import Certificate from "../components/Certificate";
import { clearAuth, getUser } from "../data/auth";
import { requestDoubtSolve } from "../data/api";
import { languageOptions } from "../data/languages";
import {
  fetchStudentAssignments,
  fetchStudentAttempts,
  loginStudent,
  submitStudentAttempt
} from "../data/apiClient";

type Chapter = {
  id: number;
  grade: string;
  subject: string;
  title: string;
  summary: string;
  questions: Array<{
    id: number;
    prompt: string;
    options: string[];
    correctIndex: number;
  }>;
};

type Assignment = {
  assignmentId: number;
  assignedAt: number;
  chapter: Chapter;
};

type Attempt = {
  id: number;
  chapterId: number | null;
  subject: string;
  correct: boolean;
  points: number;
  timeSpentSec: number;
  difficulty: string;
  question: string;
  timestamp: number;
};

const SESSION_KEY = "rlq_session_seconds";
const SESSION_DATE_KEY = "rlq_session_date";
const WARNING_DATE_KEY = "rlq_warning_date";
const quickDoubts = [
  "Explain this chapter in easy Hinglish",
  "Give me 5 important questions",
  "Make quick revision notes",
  "Give one real-life example"
];

const StudentHub = () => {
  const { t, i18n } = useTranslation();
  const [authUser, setAuthUser] = useState(() => getUser());
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPin, setLoginPin] = useState("");
  const [loginError, setLoginError] = useState("");

  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [activeChapter, setActiveChapter] = useState<Chapter | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [questionStart, setQuestionStart] = useState<number | null>(null);
  const [explanation, setExplanation] = useState("");
  const [explainLoading, setExplainLoading] = useState(false);

  const [doubtInput, setDoubtInput] = useState("");
  const [chatLog, setChatLog] = useState<Array<{ role: "user" | "assistant"; text: string }>>([]);
  const [chatLoading, setChatLoading] = useState(false);
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [activeView, setActiveView] = useState<"overview" | "practice" | "ask" | "videos" | "reading" | "games">("overview");
  const [videos, setVideos] = useState<any[]>([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [dataError, setDataError] = useState("");
  const [showCertificate, setShowCertificate] = useState(false);
  const [certificateData, setCertificateData] = useState<any>(null);

  const loadStudentData = async () => {
    setDataLoading(true);
    setDataError("");
    try {
      const [assignmentData, attemptData] = await Promise.all([
        fetchStudentAssignments(),
        fetchStudentAttempts()
      ]);
      setAssignments(assignmentData);
      const normalizedAttempts = attemptData.map((item: any) => ({
        id: Number(item.id),
        chapterId: item.chapter_id ? Number(item.chapter_id) : null,
        subject: item.subject || "",
        correct: Boolean(item.correct),
        points: Number(item.points || 0),
        timeSpentSec: Number(item.time_spent_sec || 0),
        difficulty: item.difficulty || "",
        question: item.question || "",
        timestamp: Number(item.timestamp || 0)
      }));
      setAttempts(normalizedAttempts);
    } catch (error: any) {
      setDataError(error.message || "Could not load your learning data.");
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    if (authUser?.role === "student") {
      loadStudentData();
      const savedVideos = localStorage.getItem('teacherVideos');
      if (savedVideos) {
        setVideos(JSON.parse(savedVideos));
      }
      const today = new Date().toISOString().slice(0, 10);
      const storedDate = localStorage.getItem(`${SESSION_DATE_KEY}_${authUser.id}`);
      if (storedDate !== today) {
        localStorage.setItem(`${SESSION_DATE_KEY}_${authUser.id}`, today);
        localStorage.setItem(`${SESSION_KEY}_${authUser.id}`, "0");
        setSessionSeconds(0);
      } else {
        const saved = localStorage.getItem(`${SESSION_KEY}_${authUser.id}`);
        setSessionSeconds(saved ? Number(saved) : 0);
      }
    }
  }, [authUser]);

  useEffect(() => {
    if (!authUser?.id) return;
    let lastTick = Date.now();
    const interval = setInterval(() => {
      if (document.hidden) {
        lastTick = Date.now();
        return;
      }
      const now = Date.now();
      const diff = Math.round((now - lastTick) / 1000);
      if (diff > 0) {
        setSessionSeconds((prev) => {
          const next = prev + diff;
          localStorage.setItem(`${SESSION_KEY}_${authUser.id}`, String(next));
          return next;
        });
      }
      lastTick = now;
    }, 1000);

    return () => clearInterval(interval);
  }, [authUser?.id]);

  useEffect(() => {
    if (!authUser?.id) return;
    const today = new Date().toISOString().slice(0, 10);
    const shownDate = localStorage.getItem(`${WARNING_DATE_KEY}_${authUser.id}`);
    if (sessionSeconds >= 3600 && shownDate !== today) {
      setShowWarning(true);
      localStorage.setItem(`${WARNING_DATE_KEY}_${authUser.id}`, today);
    }
  }, [sessionSeconds, authUser?.id]);

  const assignedChapters = useMemo(() => assignments.map((item) => item.chapter), [assignments]);

  const accuracy = attempts.length === 0 ? 0 : Math.round((attempts.filter((attempt) => attempt.correct).length / attempts.length) * 100);

  const completedChapters = useMemo(() => {
    const counts = new Map<number, number>();
    attempts.forEach((attempt) => {
      if (attempt.chapterId) {
        counts.set(attempt.chapterId, (counts.get(attempt.chapterId) || 0) + 1);
      }
    });
    return assignedChapters.filter((chapter) => {
      const count = counts.get(chapter.id) || 0;
      return count >= chapter.questions.length;
    }).length;
  }, [attempts, assignedChapters]);

  const totalStars = attempts.reduce((sum, attempt) => sum + attempt.points, 0);
  const totalQuestions = assignedChapters.reduce((sum, chapter) => sum + chapter.questions.length, 0);
  const answeredAssigned = attempts.filter((attempt) => attempt.chapterId).length;
  const missionProgress = totalQuestions ? Math.min(100, Math.round((answeredAssigned / totalQuestions) * 100)) : 0;
  const todayKey = new Date().toISOString().slice(0, 10);
  const todayAttempts = attempts.filter((attempt) => {
    if (!attempt.timestamp) return false;
    return new Date(attempt.timestamp).toISOString().slice(0, 10) === todayKey;
  }).length;
  const recentAttempts = [...attempts].sort((a, b) => b.timestamp - a.timestamp).slice(0, 4);

  const getChapterStats = (chapter: Chapter) => {
    const chapterAttempts = attempts.filter((attempt) => attempt.chapterId === chapter.id);
    const answered = Math.min(chapter.questions.length, chapterAttempts.length);
    const correct = chapterAttempts.filter((attempt) => attempt.correct).length;
    const progress = chapter.questions.length ? Math.round((answered / chapter.questions.length) * 100) : 0;
    return { answered, correct, progress };
  };

  const startChapter = (chapter: Chapter) => {
    setActiveChapter(chapter);
    setActiveView("practice");
    setQuestionIndex(0);
    setSelectedOption(null);
    setFeedback("");
    setSubmitted(false);
    setQuestionStart(Date.now());
    setExplanation("");
  };

  const currentQuestion = activeChapter?.questions[questionIndex];
  const currentQuestionProgress = activeChapter && activeChapter.questions.length ? Math.round(((questionIndex + (submitted ? 1 : 0)) / activeChapter.questions.length) * 100) : 0;

  const submitAnswer = async () => {
    if (!activeChapter || selectedOption === null || !currentQuestion) return;
    const isCorrect = selectedOption === currentQuestion.correctIndex;
    const timeSpentSec = questionStart ? Math.max(1, Math.round((Date.now() - questionStart) / 1000)) : 0;
    await submitStudentAttempt({
      chapterId: activeChapter.id,
      subject: activeChapter.subject,
      correct: isCorrect,
      points: isCorrect ? 10 : 2,
      timeSpentSec,
      difficulty: activeChapter.grade,
      question: currentQuestion.prompt,
      source: "chapter"
    });
    const attemptData = await fetchStudentAttempts();
    const normalizedAttempts = attemptData.map((item: any) => ({
      id: Number(item.id),
      chapterId: item.chapter_id ? Number(item.chapter_id) : null,
      subject: item.subject || "",
      correct: Boolean(item.correct),
      points: Number(item.points || 0),
      timeSpentSec: Number(item.time_spent_sec || 0),
      difficulty: item.difficulty || "",
      question: item.question || "",
      timestamp: Number(item.timestamp || 0)
    }));
    setAttempts(normalizedAttempts);
    setFeedback(isCorrect ? t("student.correct") : t("student.incorrect"));
    setSubmitted(true);
  };

  const nextQuestion = () => {
    if (!activeChapter) return;
    const nextIndex = questionIndex + 1;
    if (nextIndex < activeChapter.questions.length) {
      setQuestionIndex(nextIndex);
      setSelectedOption(null);
      setFeedback("");
      setSubmitted(false);
      setQuestionStart(Date.now());
      setExplanation("");
    } else {
      const chapterAttempts = attempts.filter(a => a.chapterId === activeChapter.id);
      const correctAnswers = chapterAttempts.filter(a => a.correct).length;
      const totalQuestions = activeChapter.questions.length;
      const scorePercent = Math.round((correctAnswers / totalQuestions) * 100);
      
      if (scorePercent >= 70) {
        setCertificateData({
          studentName: authUser?.name || authUser?.username || "Student",
          chapterTitle: activeChapter.title,
          subject: activeChapter.subject,
          grade: activeChapter.grade,
          score: scorePercent,
          date: new Date().toLocaleDateString()
        });
        setShowCertificate(true);
      }
      setActiveChapter(null);
    }
  };

  const explainQuestion = async () => {
    if (!currentQuestion || !authUser) return;
    const subject = activeChapter?.subject || "Math";
    const languageLabel = languageOptions.find((option) => option.code === i18n.language)?.label || "English";
    setExplainLoading(true);
    setExplanation("");
    try {
      const prompt = [
        `Question: ${currentQuestion.prompt}`,
        `Options: ${currentQuestion.options.join(", ")}`,
        "Explain the concept in simple steps for a student.",
        "Do not reveal the answer directly."
      ].join("\n");
      const result = await requestDoubtSolve({
        language: languageLabel,
        grade: authUser.grade || "6",
        subject,
        chapter: activeChapter?.title || "",
        question: prompt,
        history: []
      });
      setExplanation(result.answer || t("student.aiFallback"));
    } catch (error) {
      setExplanation(t("student.aiFallback"));
    } finally {
      setExplainLoading(false);
    }
  };

  const sendDoubt = async () => {
    if (!doubtInput.trim() || !authUser) return;
    const subject = activeChapter?.subject || "Math";
    const languageLabel = languageOptions.find((option) => option.code === i18n.language)?.label || "English";
    setChatLog((prev) => [...prev, { role: "user", text: doubtInput }]);
    setChatLoading(true);
    try {
      const result = await requestDoubtSolve({
        language: languageLabel,
        grade: authUser.grade || "6",
        subject,
        chapter: activeChapter?.title || "",
        question: doubtInput,
        history: []
      });
      setChatLog((prev) => [...prev, { role: "assistant", text: result.answer || t("student.aiFallback") }]);
    } catch (error) {
      setChatLog((prev) => [...prev, { role: "assistant", text: t("student.aiFallback") }]);
    } finally {
      setChatLoading(false);
      setDoubtInput("");
    }
  };

  const handleGameComplete = (gameId: string, score: number) => {
    console.log(`Game ${gameId} completed with score: ${score}`);
  };

  const handleLogin = async () => {
    setLoginError("");
    try {
      const user = await loginStudent(loginUsername.trim(), loginPin.trim());
      setAuthUser(user);
    } catch (error: any) {
      setLoginError(error.message || "Login failed.");
    }
  };

  const handleLogout = () => {
    clearAuth();
    setAuthUser(null);
    setAssignments([]);
    setAttempts([]);
  };

  if (!authUser || authUser.role !== "student") {
    return (
      <Section title={t("student.loginTitle")}>
        <div className="student-login-shell">
          <div>
            <span className="badge">Student access</span>
            <h3>Continue your learning quest</h3>
            <p>Use the username and PIN created by your teacher. Username is not email.</p>
            <div className="login-hints">
              <span>Check spelling</span>
              <span>Use exact PIN</span>
              <span>Same backend</span>
            </div>
          </div>
          <div className="card form-grid">
            <input className="input" placeholder={t("student.username")} value={loginUsername} onChange={(event) => setLoginUsername(event.target.value)} />
            <input className="input" placeholder={t("student.pin")} value={loginPin} type="password" onChange={(event) => setLoginPin(event.target.value)} />
            {loginError && <p className="muted">{loginError}</p>}
            <button className="btn btn-primary" onClick={handleLogin}>{t("student.login")}</button>
          </div>
        </div>
      </Section>
    );
  }

  return (
    <Section title={t("student.title")}>
      <div className="student-hero">
        <div>
          <span className="badge">Welcome, {authUser.name || authUser.username}</span>
          <h2>Your learning mission</h2>
          <p>{t("student.subtitle")}</p>
          <div className="student-actions">
            <button className="btn btn-primary" onClick={() => setActiveView("practice")}>Start practice</button>
            <button className="btn btn-secondary" onClick={() => setActiveView("games")}>🎮 Play Games</button>
            <button className="ghost-btn" onClick={handleLogout}>{t("student.logout")}</button>
          </div>
        </div>
        <div className="mission-ring" style={{ "--progress": `${missionProgress}%` } as CSSProperties}>
          <strong>{missionProgress}%</strong>
          <span>Mission progress</span>
        </div>
      </div>

      <div className="student-tabs" role="tablist" aria-label="Student dashboard views">
        {[
          ["overview", "Overview"],
          ["videos", "📹 Videos"],
          ["reading", "📖 Reading"],
          ["games", "🎮 Games"],
          ["practice", "Practice"],
          ["ask", "AI Doubts"]
        ].map(([id, label]) => (
          <button key={id} className={`subject-tab${activeView === id ? " active" : ""}`} onClick={() => setActiveView(id as typeof activeView)}>
            {label}
          </button>
        ))}
      </div>

      {dataError && <div className="callout">{dataError}</div>}
      {dataLoading && <p className="muted">Loading your dashboard...</p>}

      {activeView === "overview" && (
        <>
          <div className="student-stat-grid">
            <div className="metric-card"><span>{t("student.accuracy")}</span><strong>{accuracy}%</strong></div>
            <div className="metric-card"><span>{t("student.completed")}</span><strong>{completedChapters}</strong></div>
            <div className="metric-card"><span>{t("student.stars")}</span><strong>{totalStars}</strong></div>
            <div className="metric-card"><span>Today</span><strong>{todayAttempts}</strong></div>
          </div>

          <div className="card-grid">
            <div className="card">
              <h3>{t("student.timerTitle")}</h3>
              <p className="muted">{t("student.timerNote")} {Math.floor(sessionSeconds / 60)} {t("student.minutes")}</p>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${Math.min(100, Math.round((sessionSeconds / 3600) * 100))}%` }} />
              </div>
            </div>
            <div className="card">
              <h3>Recent activity</h3>
              {recentAttempts.length === 0 ? (
                <p className="muted">Start a quiz to see your activity here.</p>
              ) : (
                <div className="activity-list">
                  {recentAttempts.map((attempt) => (
                    <div className="activity-item" key={attempt.id}>
                      <span className={attempt.correct ? "status-dot success" : "status-dot"} />
                      <p>{attempt.question}</p>
                      <strong>{attempt.points} stars</strong>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <OfficialLearningPath user={authUser} onActivitySaved={loadStudentData} />
        </>
      )}

      {activeView === "practice" && (
        <>
          <div className="section">
            <h3>Teacher Assigned Practice</h3>
            {assignedChapters.length === 0 ? (
              <p className="muted">{t("student.noAssignments")}</p>
            ) : (
              <div className="chapter-mission-grid">
                {assignedChapters.map((chapter) => {
                  const stats = getChapterStats(chapter);
                  return (
                    <button className={`chapter-mission${activeChapter?.id === chapter.id ? " active" : ""}`} key={chapter.id} onClick={() => startChapter(chapter)}>
                      <span>{chapter.subject} - Class {chapter.grade}</span>
                      <strong>{chapter.title}</strong>
                      <p>{chapter.summary || "Practice teacher-assigned questions."}</p>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${stats.progress}%` }} />
                      </div>
                      <small>{stats.answered}/{chapter.questions.length} done - {stats.correct} correct</small>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {activeChapter && currentQuestion && (
            <div className="quiz-stage">
              <div className="quiz-stage-header">
                <div>
                  <span className="badge">Question {questionIndex + 1} of {activeChapter.questions.length}</span>
                  <h3>{activeChapter.title}</h3>
                </div>
                <strong>{currentQuestionProgress}%</strong>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${currentQuestionProgress}%` }} />
              </div>
              <p className="quiz-prompt">{currentQuestion.prompt}</p>
              <div className="quiz-options interactive-options">
                {currentQuestion.options.map((option, index) => {
                  const isCorrect = submitted && index === currentQuestion.correctIndex;
                  const isWrong = submitted && selectedOption === index && index !== currentQuestion.correctIndex;
                  return (
                    <button key={`${currentQuestion.id}-${index}`} className={`option-btn${selectedOption === index ? " selected" : ""}${isCorrect ? " correct" : ""}${isWrong ? " wrong" : ""}`} onClick={() => !submitted && setSelectedOption(index)}>
                      <span>{String.fromCharCode(65 + index)}</span>
                      {option}
                    </button>
                  );
                })}
              </div>
              <div className="quiz-actions">
                <button className="btn btn-secondary" onClick={explainQuestion} disabled={explainLoading}>
                  {explainLoading ? t("student.thinking") : t("student.explain")}
                </button>
                <button className="btn btn-primary" onClick={submitAnswer} disabled={selectedOption === null || submitted}>
                  {t("student.submitAnswer")}
                </button>
                <button className="ghost-btn" onClick={nextQuestion} disabled={!submitted}>
                  {questionIndex + 1 === activeChapter.questions.length ? "Finish" : t("student.next")}
                </button>
              </div>
              {feedback && <div className={`quiz-feedback${feedback === t("student.correct") ? " success" : ""}`}>{feedback}</div>}
              {explanation && <div className="ai-explanation">{explanation}</div>}
            </div>
          )}
        </>
      )}

      {activeView === "videos" && <VideoLectures studentGrade={authUser.grade || "6"} videos={videos} />}

      {activeView === "reading" && <ChapterReading chapters={assignedChapters} studentGrade={authUser.grade || "6"} />}

      {activeView === "games" && <EducationalGames studentGrade={authUser.grade || "6"} onGameComplete={handleGameComplete} />}

      {activeView === "ask" && (
        <div className="ai-study-panel">
          <div>
            <h3>{t("student.aiTitle")}</h3>
            <p>{t("student.aiNote")}</p>
            <div className="quick-doubt-row">
              {quickDoubts.map((prompt) => (
                <button className="ghost-btn" key={prompt} onClick={() => setDoubtInput(prompt)}>{prompt}</button>
              ))}
            </div>
          </div>
          <div className="chat-box">
            {chatLog.length === 0 && <p className="muted">Ask a doubt or tap a quick prompt to begin.</p>}
            {chatLog.map((item, index) => (
              <div key={`${item.role}-${index}`} className={`chat-message ${item.role}`}>
                <div className="chat-bubble">{item.text}</div>
              </div>
            ))}
          </div>
          <div className="tutor-controls">
            <input className="input" value={doubtInput} placeholder={t("student.aiPlaceholder")} onChange={(event) => setDoubtInput(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") { sendDoubt(); } }} />
            <button className="btn btn-primary" onClick={sendDoubt} disabled={chatLoading}>
              {chatLoading ? t("student.thinking") : t("student.send")}
            </button>
          </div>
        </div>
      )}

      {showCertificate && certificateData && (
        <Certificate
          studentName={certificateData.studentName}
          chapterTitle={certificateData.chapterTitle}
          subject={certificateData.subject}
          grade={certificateData.grade}
          score={certificateData.score}
          date={certificateData.date}
          onClose={() => setShowCertificate(false)}
        />
      )}

      {showWarning && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{t("student.warningTitle")}</h3>
            <p>{t("student.warningText")}</p>
            <button className="btn btn-primary" onClick={() => setShowWarning(false)}>
              {t("student.warningButton")}
            </button>
          </div>
        </div>
      )}
    </Section>
  );
};

export default StudentHub;
