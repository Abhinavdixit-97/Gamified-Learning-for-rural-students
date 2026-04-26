import { motion } from "framer-motion";
import { useState } from "react";
import "../styles/contentManager.css";

type Content = {
  id: number;
  title: string;
  grade: string;
  subject: string;
  views: number;
  engagement: number;
  type: "video" | "pdf";
};

type ContentManagerProps = {
  chapters: any[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onAnalytics: (id: number) => void;
};

const ContentManager = ({ chapters, onEdit, onDelete, onAnalytics }: ContentManagerProps) => {
  const [selectedGrade, setSelectedGrade] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");

  const grades = ["all", ...Array.from(new Set(chapters.map(c => c.grade)))];
  const subjects = ["all", ...Array.from(new Set(chapters.map(c => c.subject)))];

  const filteredContent = chapters.filter(c => 
    (selectedGrade === "all" || c.grade === selectedGrade) &&
    (selectedSubject === "all" || c.subject === selectedSubject)
  );

  return (
    <div className="content-manager">
      <div className="filter-bar">
        <motion.select 
          className="filter-select"
          value={selectedGrade}
          onChange={(e) => setSelectedGrade(e.target.value)}
          whileHover={{ scale: 1.02 }}
        >
          {grades.map(g => <option key={g} value={g}>Grade {g === "all" ? "All" : g}</option>)}
        </motion.select>

        <motion.select 
          className="filter-select"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          whileHover={{ scale: 1.02 }}
        >
          {subjects.map(s => <option key={s} value={s}>{s === "all" ? "All Subjects" : s}</option>)}
        </motion.select>
      </div>

      <motion.div 
        className="content-grid"
        layout
      >
        {filteredContent.map((content, i) => (
          <motion.div
            key={content.id}
            className="content-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -8, boxShadow: "0 16px 48px rgba(47, 164, 215, 0.2)" }}
            layout
          >
            <div className="content-thumbnail">
              <span className="content-icon">{content.type === "video" ? "🎥" : "📄"}</span>
            </div>
            
            <div className="content-info">
              <h4>{content.title}</h4>
              <div className="content-meta">
                <span className="badge-small">Grade {content.grade}</span>
                <span className="badge-small">{content.subject}</span>
              </div>
              <div className="content-stats">
                <span>👁️ {Math.floor(Math.random() * 100)} views</span>
                <span>📊 {Math.floor(Math.random() * 100)}%</span>
              </div>
            </div>

            <motion.div 
              className="content-actions"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            >
              <motion.button 
                className="action-btn edit"
                onClick={() => onEdit(content.id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                ✏️
              </motion.button>
              <motion.button 
                className="action-btn delete"
                onClick={() => onDelete(content.id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                🗑️
              </motion.button>
              <motion.button 
                className="action-btn analytics"
                onClick={() => onAnalytics(content.id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                📊
              </motion.button>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ContentManager;
