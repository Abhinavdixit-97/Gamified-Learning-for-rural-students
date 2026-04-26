# 🎯 Quick Visual Guide

## 📺 VS Code Terminal Commands

```
┌─────────────────────────────────────────────────────────┐
│  VS Code Terminal (Ctrl + `)                            │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Step 1: Navigate to project                            │
│  > cd "c:\Users\USER\OneDrive\Desktop\scratch project 4th year"
│                                                          │
│  Step 2: Install dependencies (first time only)         │
│  > npm run setup                                         │
│                                                          │
│  Step 3: Start development server                       │
│  > npm run dev                                           │
│                                                          │
│  ✅ Frontend: http://localhost:5173                     │
│  ✅ Backend:  http://localhost:5050                     │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## 🎓 Teacher Dashboard Layout

```
┌──────────────────────────────────────────────────────────────┐
│  🎓 Gamified Learning Platform for Rural Students  [Logout]  │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  Good Evening, Teacher 👋                                    │
│                                                               │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐       │
│  │ 👨🎓     │  │ 📚      │  │ 🎥      │  │ 📊      │       │
│  │ Total   │  │ Active  │  │ Content │  │ Engage  │       │
│  │ Students│  │ Classes │  │ Uploads │  │ Rate    │       │
│  │   25    │  │   12    │  │   45    │  │   85%   │       │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘       │
│                                                               │
│  ┌──────────────────────┐  ┌──────────────────────┐        │
│  │ 📈 Student Engagement│  │ 📊 Content Performance│        │
│  │  [Line Chart]        │  │  [Bar Chart]          │        │
│  └──────────────────────┘  └──────────────────────┘        │
│                                                               │
│  ┌──────────────────────┐  ┌──────────────────────┐        │
│  │ ⏱️ Recent Activity   │  │ 🏆 Top Performers     │        │
│  │ • Rahul watched...   │  │ #1 Priya - 95%        │        │
│  │ • 5 students...      │  │ #2 Amit - 90%         │        │
│  └──────────────────────┘  └──────────────────────┘        │
│                                                               │
│  📚 Content Management                                       │
│  [Grade Filter ▼] [Subject Filter ▼]                        │
│                                                               │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐                     │
│  │ 🎥      │  │ 📄      │  │ 📚      │                     │
│  │ Video 1 │  │ PDF 1   │  │ Chapter │                     │
│  │ Grade 6 │  │ Grade 7 │  │ Grade 8 │                     │
│  │ [Edit]  │  │ [Edit]  │  │ [Edit]  │                     │
│  └─────────┘  └─────────┘  └─────────┘                     │
│                                                               │
│                                          ┌─────┐             │
│                                          │ 🎥  │ ← FAB Menu  │
│                                          │ 📄  │             │
│                                          │ 📝  │             │
│                                          │  +  │             │
│                                          └─────┘             │
│  🔔 ← Notifications                                          │
│  🤖 ← AI Chat                                                │
└──────────────────────────────────────────────────────────────┘
```

## 🎥 Video Upload Flow

```
Teacher clicks FAB (+) → Click 🎥 Upload Video
                              ↓
┌─────────────────────────────────────────────┐
│  🎥 Upload Video Lecture                    │
├─────────────────────────────────────────────┤
│  Grade:    [6 ▼]                            │
│  Subject:  [Math ▼]                         │
│  Title:    [Introduction to Algebra___]     │
│  Description: [Learn basic algebra___]      │
│                                              │
│  ┌─────────────────────────────────────┐   │
│  │  📁 Choose Video File               │   │
│  │  or                                  │   │
│  │  Paste URL: [https://___________]   │   │
│  └─────────────────────────────────────┘   │
│                                              │
│  [Preview Video]                             │
│                                              │
│  [Cancel]  [Upload Video]                   │
└─────────────────────────────────────────────┘
                    ↓
            Video Uploaded! ✅
                    ↓
        Stored in localStorage
                    ↓
        Available to students
```

## 👨‍🎓 Student Video Lectures

```
┌──────────────────────────────────────────────────────────────┐
│  🎥 Video Lectures - Grade 6                                 │
│  Subject: [All Subjects ▼]                                   │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │ [Video]     │  │ [Video]     │  │ [Video]     │         │
│  │ 📹          │  │ 📹          │  │ 📹          │         │
│  │             │  │             │  │             │         │
│  │ Math        │  │ Science     │  │ English     │         │
│  │ Algebra     │  │ Physics     │  │ Grammar     │         │
│  │ Intro...    │  │ Motion...   │  │ Tenses...   │         │
│  │             │  │             │  │             │         │
│  │ [▶️ Watch]  │  │ [▶️ Watch]  │  │ [▶️ Watch]  │         │
│  │ [⬇️ Download]│  │ [⬇️ Download]│  │ [⬇️ Download]│         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│                                                               │
└──────────────────────────────────────────────────────────────┘

Click Watch → Full screen video player
Click Download → Video saves to computer
```

## 📖 Chapter Reading

```
┌──────────────────────────────────────────────────────────────┐
│  📖 Chapter Reading - Grade 6                                │
│  Subject: [All Subjects ▼]                                   │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │ 📚          │  │ 📚          │  │ 📚          │         │
│  │ Math        │  │ Science     │  │ English     │         │
│  │ Chapter 1   │  │ Chapter 1   │  │ Chapter 1   │         │
│  │ Algebra     │  │ Motion      │  │ Grammar     │         │
│  │ Learn...    │  │ Study...    │  │ Master...   │         │
│  │             │  │             │  │             │         │
│  │ [Read →]    │  │ [Read →]    │  │ [Read →]    │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│                                                               │
└──────────────────────────────────────────────────────────────┘

Click Read → Opens reading modal with:
  • Summary (highlighted)
  • Full content
  • Learning objectives
  • Key concepts
```

## 🎯 Feature Checklist

```
Teacher Features:
  ✅ Interactive dashboard with animations
  ✅ Video upload (file or URL)
  ✅ Content management
  ✅ Student management
  ✅ Assignment creation
  ✅ Analytics & charts
  ✅ Toast notifications

Student Features:
  ✅ Video lectures viewer
  ✅ Video download
  ✅ Chapter reading
  ✅ Subject filtering
  ✅ Quiz system
  ✅ Progress tracking
  ✅ AI tutor

UI/UX:
  ✅ Smooth animations
  ✅ Responsive design
  ✅ Glassmorphism effects
  ✅ Hover interactions
  ✅ Loading states
  ✅ Error handling
```

## 🚀 Quick Commands Reference

```
┌────────────────────────────────────────────┐
│  Command              │  Purpose            │
├────────────────────────────────────────────┤
│  npm run setup        │  Install deps       │
│  npm run dev          │  Start both         │
│  npm run dev:frontend │  Frontend only      │
│  npm run dev:server   │  Backend only       │
│  npm run build        │  Production build   │
└────────────────────────────────────────────┘
```

---

**Everything is ready! Just run `npm run dev` and start exploring! 🎉**
