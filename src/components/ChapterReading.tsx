import { motion } from "framer-motion";
import { useState } from "react";
import "../styles/chapterReading.css";

type Chapter = {
  id: number;
  grade: string;
  subject: string;
  title: string;
  summary: string;
  content?: string;
};

type ChapterReadingProps = {
  chapters: Chapter[];
  studentGrade: string;
};

const ChapterReading = ({ chapters, studentGrade }: ChapterReadingProps) => {
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);

  const subjects = ["all", ...Array.from(new Set(chapters.map(c => c.subject)))];
  const filteredChapters = chapters.filter(c => 
    c.grade === studentGrade && 
    (selectedSubject === "all" || c.subject === selectedSubject)
  );

  return (
    <div className="chapter-reading">
      <div className="reading-header">
        <h2>📖 Chapter Reading - Grade {studentGrade}</h2>
        <select className="subject-filter" value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
          {subjects.map(s => <option key={s} value={s}>{s === "all" ? "All Subjects" : s}</option>)}
        </select>
      </div>

      <div className="chapter-grid">
        {filteredChapters.map((chapter, i) => (
          <motion.div
            key={chapter.id}
            className="chapter-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -5, boxShadow: "0 12px 32px rgba(47, 164, 215, 0.2)" }}
            onClick={() => setSelectedChapter(chapter)}
          >
            <div className="chapter-icon">📚</div>
            <span className="chapter-subject">{chapter.subject}</span>
            <h4>{chapter.title}</h4>
            <p>{chapter.summary}</p>
            <motion.button className="btn-read" whileHover={{ scale: 1.05 }}>
              Read Chapter →
            </motion.button>
          </motion.div>
        ))}
      </div>

      {selectedChapter && (
        <motion.div className="reading-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setSelectedChapter(null)}>
          <motion.div className="reading-content" initial={{ scale: 0.9 }} animate={{ scale: 1 }} onClick={(e) => e.stopPropagation()}>
            <div className="reading-header-modal">
              <div>
                <span className="chapter-badge">{selectedChapter.subject}</span>
                <h2>{selectedChapter.title}</h2>
              </div>
              <button className="close-btn" onClick={() => setSelectedChapter(null)}>✕</button>
            </div>
            
            <div className="reading-body">
              <div className="chapter-summary">
                <h3>📝 Summary</h3>
                <p>{selectedChapter.summary}</p>
              </div>

              <div className="chapter-content">
                <h3>📖 Chapter Content</h3>
                {selectedChapter.content ? (
                  <div className="content-text" dangerouslySetInnerHTML={{ __html: selectedChapter.content }} />
                ) : (
                  <div className="content-text">
                    <p><strong>Introduction:</strong></p>
                    <p>{selectedChapter.summary}</p>
                    
                    <p><strong>Key Concepts:</strong></p>
                    <ul>
                      <li>Understanding the fundamental principles</li>
                      <li>Practical applications and examples</li>
                      <li>Problem-solving techniques</li>
                      <li>Real-world connections</li>
                    </ul>

                    <p><strong>Learning Objectives:</strong></p>
                    <p>By the end of this chapter, you will be able to:</p>
                    <ul>
                      <li>Explain the core concepts clearly</li>
                      <li>Apply knowledge to solve problems</li>
                      <li>Connect ideas to real-life situations</li>
                      <li>Demonstrate understanding through practice</li>
                    </ul>

                    <p><strong>Practice Questions:</strong></p>
                    <p>Test your understanding with the quiz section!</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ChapterReading;
