import { motion } from "framer-motion";
import { useState } from "react";
import "../styles/videoLectures.css";

type Video = {
  id: number;
  grade: string;
  subject: string;
  title: string;
  videoUrl: string;
  description: string;
  uploadedAt: number;
};

type VideoLecturesProps = {
  studentGrade: string;
  videos: Video[];
};

const VideoLectures = ({ studentGrade, videos }: VideoLecturesProps) => {
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const subjects = ["all", ...Array.from(new Set(videos.map(v => v.subject)))];
  const filteredVideos = videos.filter(v => 
    v.grade === studentGrade && 
    (selectedSubject === "all" || v.subject === selectedSubject)
  );

  const handleDownload = async (video: Video) => {
    try {
      const response = await fetch(video.videoUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${video.title}.mp4`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <div className="video-lectures">
      <div className="video-header">
        <h2>🎥 Video Lectures - Grade {studentGrade}</h2>
        <select className="subject-filter" value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
          {subjects.map(s => <option key={s} value={s}>{s === "all" ? "All Subjects" : s}</option>)}
        </select>
      </div>

      <div className="video-grid">
        {filteredVideos.map((video, i) => (
          <motion.div
            key={video.id}
            className="video-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -5 }}
          >
            <div className="video-thumbnail" onClick={() => setSelectedVideo(video)}>
              <video src={video.videoUrl} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div className="play-overlay">▶️</div>
            </div>
            <div className="video-info">
              <span className="video-subject">{video.subject}</span>
              <h4>{video.title}</h4>
              <p>{video.description}</p>
              <div className="video-actions">
                <motion.button className="btn-watch" onClick={() => setSelectedVideo(video)} whileHover={{ scale: 1.05 }}>
                  ▶️ Watch
                </motion.button>
                <motion.button className="btn-download" onClick={() => handleDownload(video)} whileHover={{ scale: 1.05 }}>
                  ⬇️ Download
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedVideo && (
        <motion.div className="video-player-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setSelectedVideo(null)}>
          <motion.div className="video-player-content" initial={{ scale: 0.8 }} animate={{ scale: 1 }} onClick={(e) => e.stopPropagation()}>
            <div className="player-header">
              <h3>{selectedVideo.title}</h3>
              <button className="close-btn" onClick={() => setSelectedVideo(null)}>✕</button>
            </div>
            <video src={selectedVideo.videoUrl} controls autoPlay style={{ width: "100%", borderRadius: "12px" }} />
            <div className="player-info">
              <p><strong>Subject:</strong> {selectedVideo.subject}</p>
              <p>{selectedVideo.description}</p>
              <motion.button className="btn btn-primary" onClick={() => handleDownload(selectedVideo)} whileHover={{ scale: 1.05 }}>
                ⬇️ Download Video
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default VideoLectures;
