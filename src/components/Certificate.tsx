import { motion } from "framer-motion";
import { useRef } from "react";
import "../styles/certificate.css";

type CertificateProps = {
  studentName: string;
  chapterTitle: string;
  subject: string;
  grade: string;
  score: number;
  date: string;
  onClose: () => void;
};

const Certificate = ({ studentName, chapterTitle, subject, grade, score, date, onClose }: CertificateProps) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  const downloadCertificate = () => {
    if (!certificateRef.current) return;
    
    // Create a canvas to draw the certificate
    const certificate = certificateRef.current;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;

    // Set canvas size
    canvas.width = 1200;
    canvas.height = 850;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#F5E9D8');
    gradient.addColorStop(0.5, '#ffffff');
    gradient.addColorStop(1, '#e8f4f8');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Border
    ctx.strokeStyle = '#2FA4D7';
    ctx.lineWidth = 20;
    ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

    // Inner border
    ctx.strokeStyle = '#E76F2E';
    ctx.lineWidth = 5;
    ctx.strokeRect(60, 60, canvas.width - 120, canvas.height - 120);

    // Title
    ctx.fillStyle = '#3E2C23';
    ctx.font = 'bold 60px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Certificate of Achievement', canvas.width / 2, 150);

    // Subtitle
    ctx.font = '30px Arial';
    ctx.fillStyle = '#2FA4D7';
    ctx.fillText('Gamified Learning Platform for Rural Students', canvas.width / 2, 200);

    // "This is to certify that"
    ctx.font = '24px Arial';
    ctx.fillStyle = '#6b5d56';
    ctx.fillText('This is to certify that', canvas.width / 2, 280);

    // Student name
    ctx.font = 'bold 48px Arial';
    ctx.fillStyle = '#3E2C23';
    ctx.fillText(studentName, canvas.width / 2, 350);

    // Achievement text
    ctx.font = '24px Arial';
    ctx.fillStyle = '#6b5d56';
    ctx.fillText('has successfully completed', canvas.width / 2, 410);

    // Chapter title
    ctx.font = 'bold 36px Arial';
    ctx.fillStyle = '#E76F2E';
    ctx.fillText(chapterTitle, canvas.width / 2, 470);

    // Subject and grade
    ctx.font = '28px Arial';
    ctx.fillStyle = '#2FA4D7';
    ctx.fillText(`${subject} - Grade ${grade}`, canvas.width / 2, 520);

    // Score
    ctx.font = 'bold 32px Arial';
    ctx.fillStyle = '#3E2C23';
    ctx.fillText(`Score: ${score}%`, canvas.width / 2, 580);

    // Stars
    ctx.font = '40px Arial';
    ctx.fillText('⭐ ⭐ ⭐', canvas.width / 2, 640);

    // Date
    ctx.font = '20px Arial';
    ctx.fillStyle = '#6b5d56';
    ctx.fillText(`Date: ${date}`, canvas.width / 2, 720);

    // Signature line
    ctx.strokeStyle = '#3E2C23';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - 150, 780);
    ctx.lineTo(canvas.width / 2 + 150, 780);
    ctx.stroke();

    ctx.font = '18px Arial';
    ctx.fillStyle = '#6b5d56';
    ctx.fillText('Platform Administrator', canvas.width / 2, 810);

    // Download
    const link = document.createElement('a');
    link.download = `Certificate_${studentName.replace(/\s+/g, '_')}_${chapterTitle.replace(/\s+/g, '_')}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const shareCertificate = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Achievement Certificate',
        text: `I completed ${chapterTitle} with ${score}% score!`,
        url: window.location.href
      }).catch(() => {});
    } else {
      alert('Sharing not supported on this browser. Please download instead!');
    }
  };

  return (
    <motion.div className="certificate-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={onClose}>
      <motion.div className="certificate-modal" initial={{ scale: 0.8, y: 50 }} animate={{ scale: 1, y: 0 }} onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✕</button>
        
        <div className="certificate-container" ref={certificateRef}>
          <div className="certificate-border">
            <div className="certificate-inner">
              <div className="certificate-header">
                <h1>🏆 Certificate of Achievement 🏆</h1>
                <p className="platform-name">Gamified Learning Platform for Rural Students</p>
              </div>

              <div className="certificate-body">
                <p className="certify-text">This is to certify that</p>
                <h2 className="student-name">{studentName}</h2>
                <p className="achievement-text">has successfully completed</p>
                <h3 className="chapter-title">{chapterTitle}</h3>
                <p className="subject-grade">{subject} - Grade {grade}</p>
                
                <div className="score-section">
                  <div className="score-badge">
                    <span className="score-label">Score</span>
                    <span className="score-value">{score}%</span>
                  </div>
                </div>

                <div className="stars">⭐ ⭐ ⭐</div>

                <p className="date-text">Date: {date}</p>
              </div>

              <div className="certificate-footer">
                <div className="signature-line"></div>
                <p className="signature-text">Platform Administrator</p>
              </div>

              <div className="certificate-decoration">
                <div className="corner-decoration top-left"></div>
                <div className="corner-decoration top-right"></div>
                <div className="corner-decoration bottom-left"></div>
                <div className="corner-decoration bottom-right"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="certificate-actions">
          <motion.button className="btn btn-primary" onClick={downloadCertificate} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            📥 Download Certificate
          </motion.button>
          <motion.button className="btn btn-secondary" onClick={shareCertificate} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            📤 Share
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Certificate;
