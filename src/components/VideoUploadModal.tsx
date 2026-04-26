import { motion } from "framer-motion";
import { useState } from "react";
import "../styles/videoUpload.css";

type VideoUploadProps = {
  onClose: () => void;
  onUpload: (data: { grade: string; subject: string; title: string; videoUrl: string; description: string }) => void;
};

const gradeOptions = ["6", "7", "8", "9", "10", "11", "12"];
const subjectOptions = ["Math", "Science", "English", "General Knowledge", "Moral Science"];

const VideoUploadModal = ({ onClose, onUpload }: VideoUploadProps) => {
  const [grade, setGrade] = useState("6");
  const [subject, setSubject] = useState("Math");
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
      setVideoUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = () => {
    if (!title.trim() || !videoUrl) return;
    onUpload({ grade, subject, title: title.trim(), videoUrl, description: description.trim() });
    onClose();
  };

  return (
    <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div className="modal-content video-upload-modal" initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} onClick={(e) => e.stopPropagation()}>
        <h3>🎥 Upload Video Lecture</h3>
        <div className="form-grid">
          <select className="input" value={grade} onChange={(e) => setGrade(e.target.value)}>
            {gradeOptions.map((g) => <option key={g} value={g}>Grade {g}</option>)}
          </select>
          <select className="input" value={subject} onChange={(e) => setSubject(e.target.value)}>
            {subjectOptions.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <input className="input" placeholder="Video Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea className="input" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
          
          <div className="file-upload-area">
            <input type="file" id="video-file" accept="video/*" onChange={handleFileChange} style={{ display: "none" }} />
            <label htmlFor="video-file" className="file-upload-label">
              {videoFile ? `📹 ${videoFile.name}` : "📁 Choose Video File"}
            </label>
          </div>

          <input className="input" placeholder="Or paste video URL" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />

          {videoUrl && (
            <div className="video-preview">
              <video src={videoUrl} controls style={{ width: "100%", borderRadius: "12px" }} />
            </div>
          )}

          <div style={{ display: "flex", gap: "1rem" }}>
            <motion.button className="btn btn-secondary" onClick={onClose} whileHover={{ scale: 1.05 }}>Cancel</motion.button>
            <motion.button className="btn btn-primary" onClick={handleSubmit} whileHover={{ scale: 1.05 }}>Upload Video</motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default VideoUploadModal;
