# 🎓 Gamified Learning Platform for Rural Students

A comprehensive, interactive educational platform designed specifically for rural students, featuring AI-powered tutoring, gamification, video lectures, and progress tracking.

![Platform Banner](https://img.shields.io/badge/Education-Platform-blue)
![React](https://img.shields.io/badge/React-18.2.0-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)

## 🌟 Features

### 👨‍🏫 For Teachers
- **Interactive Dashboard** - Real-time analytics with charts and graphs
- **Video Upload** - Upload educational videos (file or URL)
- **Content Management** - Create chapters with quizzes
- **Student Management** - Add and track students
- **Assignment System** - Assign chapters to students
- **Growth Analytics** - Track student progress and performance

### 👨‍🎓 For Students
- **Video Lectures** - Watch and download videos by subject
- **Chapter Reading** - Read full chapter content with summaries
- **Educational Games** - 6 interactive learning games
- **Quiz Practice** - Solve teacher-assigned quizzes
- **AI Tutor** - Ask questions in multiple languages
- **Certificate System** - Earn certificates on chapter completion
- **Progress Tracking** - Monitor learning journey

### 🎮 Educational Games
1. **Math Speed Challenge** - Solve math problems quickly
2. **Word Matching** - Match words with meanings
3. **Memory Cards** - Classic memory game
4. **Science Explorer** - Science quiz game
5. **Pattern Master** - Complete number patterns
6. **Spelling Champion** - Spell words correctly

### 🏆 Certificate System
- Auto-generated after chapter completion (70%+ score)
- Download as PNG
- Share functionality
- Professional design with platform branding

## 🚀 Quick Start

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/gamified-learning-platform.git
cd gamified-learning-platform
```

2. **Install dependencies**
```bash
npm run setup
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
```
Frontend: http://localhost:5173
Backend: http://localhost:5050
```

## 📁 Project Structure

```
gamified-learning-platform/
├── src/
│   ├── components/          # React components
│   │   ├── TeacherDashboard.tsx
│   │   ├── VideoLectures.tsx
│   │   ├── EducationalGames.tsx
│   │   ├── Certificate.tsx
│   │   └── ...
│   ├── pages/              # Page components
│   │   ├── TeacherHub.tsx
│   │   ├── StudentHub.tsx
│   │   └── ...
│   ├── styles/             # CSS files
│   ├── data/               # API and data management
│   └── i18n/               # Internationalization
├── server/                 # Backend server
│   ├── index.js           # Express server
│   └── data.sqlite        # SQLite database
├── public/                # Static assets
└── package.json
```

## 🎨 Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Framer Motion** - Animations
- **Chart.js** - Data visualization
- **React Router** - Navigation
- **i18next** - Internationalization

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **SQLite** - Database
- **Better-sqlite3** - Database driver

### AI Integration
- **Ollama** - Local AI model (optional)
- Supports multilingual tutoring

## 🌍 Supported Languages
- English
- Hindi (हिंदी)
- Bengali (বাংলা)
- Telugu (తెలుగు)
- Marathi (मराठी)

## 🔐 Default Credentials

### Teacher Login
```
Email: teacher@demo.local
Password: Teach@123
```

### Student Login
Students are created by teachers with:
- Username (set by teacher)
- PIN (set by teacher)

## 📊 Features in Detail

### Teacher Dashboard
- Dynamic greeting based on time of day
- 4 animated stat cards (Students, Classes, Content, Engagement)
- Live engagement line chart
- Content performance bar chart
- Recent activity timeline
- Top performers leaderboard
- FAB menu for quick actions
- Notification system
- AI assistant chat

### Student Dashboard
- Mission progress ring
- Accuracy and completion stats
- Session timer with break warnings
- Video lectures with download
- Chapter reading with full content
- 6 educational games
- Quiz practice with AI explanations
- Certificate generation

### Video System
- Upload videos (file or URL)
- Grade and subject categorization
- Watch inline or download
- Filter by subject
- Only shows relevant grade content

### Certificate System
- Auto-generated on 70%+ score
- Beautiful professional design
- Download as high-quality PNG
- Share via native share API
- Includes student name, chapter, score, date

## 🎯 Usage Guide

### For Teachers

1. **Login** with default credentials
2. **Add Students** - Create student accounts
3. **Upload Videos** - Click FAB (+) → Upload Video
4. **Create Chapters** - Add chapters with questions
5. **Assign Content** - Assign chapters to students
6. **Track Progress** - View analytics and growth

### For Students

1. **Login** with credentials from teacher
2. **Watch Videos** - Go to Videos tab
3. **Read Chapters** - Go to Reading tab
4. **Play Games** - Go to Games tab for fun learning
5. **Practice Quizzes** - Complete assigned chapters
6. **Earn Certificates** - Score 70%+ to get certificate
7. **Ask AI** - Get help from AI tutor

## 🔧 Configuration

### Environment Variables

Create `.env` file in root:
```env
VITE_API_BASE=http://localhost:5050
```

Create `server/.env` file:
```env
PORT=5050
DEFAULT_TEACHER_EMAIL=teacher@demo.local
DEFAULT_TEACHER_PASSWORD=Teach@123
OLLAMA_BASE_URL=http://localhost:11434
```

## 📱 Responsive Design
- Mobile-first approach
- Breakpoint at 768px
- Touch-friendly buttons
- Adaptive layouts

## 🎨 Color System
```css
Primary: #2FA4D7 (Blue)
Accent: #E76F2E (Orange)
Dark: #3E2C23 (Brown)
Background: #F5E9D8 (Cream)
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Inspired by the need for accessible education in rural areas
- Built with modern web technologies
- Designed for offline-first capability

## 📞 Support

For support, email support@example.com or open an issue in the repository.

## 🗺️ Roadmap

- [ ] Offline mode support
- [ ] Mobile app (React Native)
- [ ] More educational games
- [ ] Parent dashboard
- [ ] Advanced analytics
- [ ] Peer-to-peer learning
- [ ] Gamification leaderboards

## 📸 Screenshots

### Teacher Dashboard
![Teacher Dashboard](screenshots/teacher-dashboard.png)

### Student Dashboard
![Student Dashboard](screenshots/student-dashboard.png)

### Educational Games
![Games](screenshots/games.png)

### Certificate
![Certificate](screenshots/certificate.png)

---

**Made with ❤️ for rural education**
