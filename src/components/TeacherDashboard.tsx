import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";
import "../styles/teacherDashboard.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler);

type DashboardProps = {
  students: any[];
  chapters: any[];
  assignments: any[];
  onUploadVideo: () => void;
  onUploadPDF: () => void;
  onCreateAssignment: () => void;
};

const CountUp = ({ end, duration = 2000 }: { end: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration]);
  return <span>{count}</span>;
};

const TeacherDashboard = ({ students, chapters, assignments, onUploadVideo, onUploadPDF, onCreateAssignment }: DashboardProps) => {
  const [fabOpen, setFabOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  const activeClasses = [...new Set(chapters.map(c => `${c.grade}-${c.subject}`))].length;
  const engagementRate = students.length > 0 ? Math.round((assignments.length / students.length) * 100) : 0;

  const engagementData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [{
      label: "Engagement",
      data: [65, 72, 68, 80, 85, 78, 90],
      borderColor: "#2FA4D7",
      backgroundColor: "rgba(47, 164, 215, 0.1)",
      tension: 0.4,
      fill: true
    }]
  };

  const contentData = {
    labels: ["Math", "Science", "English", "GK", "Moral"],
    datasets: [{
      label: "Views",
      data: [45, 38, 52, 28, 35],
      backgroundColor: ["#2FA4D7", "#E76F2E", "#3E2C23", "#F5E9D8", "#2FA4D7"]
    }]
  };

  const recentActivities = [
    { text: "Rahul watched your Math video", time: "2m ago" },
    { text: "5 students completed Chapter 2", time: "15m ago" },
    { text: "New assignment submitted", time: "1h ago" }
  ];

  const topStudents = students.slice(0, 3).map((s, i) => ({ ...s, score: 95 - i * 5 }));

  return (
    <div className="teacher-dashboard">
      {/* Hero Section */}
      <motion.div className="hero-section" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="hero-greeting">{greeting}, Teacher 👋</h1>
        <div className="stats-grid">
          {[
            { icon: "👨‍🎓", label: "Total Students", value: students.length, color: "#2FA4D7" },
            { icon: "📚", label: "Active Classes", value: activeClasses, color: "#E76F2E" },
            { icon: "🎥", label: "Uploaded Content", value: chapters.length, color: "#3E2C23" },
            { icon: "📊", label: "Engagement Rate", value: engagementRate, suffix: "%", color: "#2FA4D7" }
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="stat-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8, boxShadow: "0 12px 40px rgba(47, 164, 215, 0.25)" }}
            >
              <motion.div className="stat-icon" animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}>
                {stat.icon}
              </motion.div>
              <div className="stat-value" style={{ color: stat.color }}>
                <CountUp end={stat.value} />{stat.suffix || ""}
              </div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Analytics Section */}
      <div className="analytics-section">
        <motion.div className="chart-card" whileHover={{ scale: 1.02 }}>
          <h3>📈 Student Engagement</h3>
          <Line data={engagementData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </motion.div>
        <motion.div className="chart-card" whileHover={{ scale: 1.02 }}>
          <h3>📊 Content Performance</h3>
          <Bar data={contentData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </motion.div>
      </div>

      {/* Quick Actions & Top Students */}
      <div className="dashboard-grid">
        <motion.div className="activity-timeline" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h3>⏱️ Recent Activity</h3>
          {recentActivities.map((activity, i) => (
            <motion.div key={i} className="activity-item" initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}>
              <div className="activity-dot" />
              <div>
                <p>{activity.text}</p>
                <span>{activity.time}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="top-students" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h3>🏆 Top Performers</h3>
          {topStudents.map((student, i) => (
            <motion.div key={i} className="student-rank" whileHover={{ x: 5 }}>
              <span className="rank">#{i + 1}</span>
              <span className="name">{student.name}</span>
              <span className="score">{student.score}%</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* FAB Menu */}
      <div className="fab-container">
        <AnimatePresence>
          {fabOpen && (
            <>
              <motion.button className="fab-item" initial={{ scale: 0, y: 20 }} animate={{ scale: 1, y: -140 }} exit={{ scale: 0 }} onClick={onUploadVideo}>
                🎥
              </motion.button>
              <motion.button className="fab-item" initial={{ scale: 0, y: 20 }} animate={{ scale: 1, y: -90 }} exit={{ scale: 0 }} onClick={onUploadPDF}>
                📄
              </motion.button>
              <motion.button className="fab-item" initial={{ scale: 0, y: 20 }} animate={{ scale: 1, y: -40 }} exit={{ scale: 0 }} onClick={onCreateAssignment}>
                📝
              </motion.button>
            </>
          )}
        </AnimatePresence>
        <motion.button className="fab-main" onClick={() => setFabOpen(!fabOpen)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} animate={{ rotate: fabOpen ? 45 : 0 }}>
          +
        </motion.button>
      </div>

      {/* Notification Bell */}
      <div className="notif-container">
        <motion.button className="notif-bell" onClick={() => setNotifOpen(!notifOpen)} whileHover={{ scale: 1.1 }} animate={{ rotate: notifOpen ? [0, -15, 15, 0] : 0 }}>
          🔔
        </motion.button>
        <AnimatePresence>
          {notifOpen && (
            <motion.div className="notif-dropdown" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              {recentActivities.map((a, i) => (
                <div key={i} className="notif-item">{a.text}</div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* AI Chat */}
      <div className="chat-container">
        <motion.button className="chat-fab" onClick={() => setChatOpen(!chatOpen)} whileHover={{ scale: 1.1 }} animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
          🤖
        </motion.button>
        <AnimatePresence>
          {chatOpen && (
            <motion.div className="chat-window" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
              <div className="chat-header">AI Assistant</div>
              <div className="chat-body">
                <p>Hello! How can I help you today?</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TeacherDashboard;
