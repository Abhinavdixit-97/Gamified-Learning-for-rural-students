# 🚀 How to Run the Project from VS Code Terminal

## ✅ Prerequisites
- Node.js 18+ installed
- VS Code installed
- Project folder opened in VS Code

## 📝 Step-by-Step Instructions

### 1. Open VS Code Terminal
- Press `` Ctrl + ` `` (backtick) OR
- Go to **View** → **Terminal** OR
- Press `Ctrl + Shift + P` and type "Terminal: Create New Terminal"

### 2. Navigate to Project Directory
```bash
cd "c:\Users\USER\OneDrive\Desktop\scratch project 4th year"
```

### 3. Install Dependencies (First Time Only)
```bash
npm run setup
```
This will install dependencies for both frontend and backend.

### 4. Start the Development Server
```bash
npm run dev
```

This command starts:
- **Frontend** (Vite): http://localhost:5173
- **Backend** (Node.js): http://localhost:5050

### 5. Open in Browser
- Open your browser
- Go to: **http://localhost:5173**

---

## 🎓 Login Credentials

### Teacher Login
```
Email: teacher@demo.local
Password: Teach@123
```

### Student Login
Teachers create student accounts. Students login with:
- Username (set by teacher)
- PIN (set by teacher)

---

## 🎨 New Features Added

### ✅ For Teachers

1. **Video Upload**
   - Click FAB button (bottom right) → 🎥 Upload Video
   - Choose video file or paste URL
   - Select grade and subject
   - Add title and description
   - Videos stored in localStorage

2. **Platform Name Updated**
   - Now shows: "Gamified Learning Platform for Rural Students"

3. **Fixed Navbar**
   - No longer floating
   - Stays at top with proper spacing

### ✅ For Students

1. **Video Lectures Tab**
   - View videos by grade and subject
   - Watch videos inline
   - Download videos locally
   - Filter by subject

2. **Chapter Reading**
   - Read chapter content
   - View summaries
   - Learning objectives
   - Key concepts

---

## 📁 Project Structure

```
scratch project 4th year/
├── src/
│   ├── components/
│   │   ├── TeacherDashboard.tsx       # Main dashboard
│   │   ├── VideoUploadModal.tsx       # Video upload
│   │   ├── VideoLectures.tsx          # Student video view
│   │   ├── ChapterReading.tsx         # Chapter content
│   │   ├── ContentManager.tsx         # Content cards
│   │   ├── Toast.tsx                  # Notifications
│   │   └── ...
│   ├── pages/
│   │   ├── TeacherHub.tsx             # Teacher dashboard
│   │   ├── StudentHub.tsx             # Student dashboard
│   │   └── ...
│   ├── styles/
│   │   ├── teacherDashboard.css
│   │   ├── videoUpload.css
│   │   ├── videoLectures.css
│   │   ├── chapterReading.css
│   │   └── ...
│   └── hooks/
│       └── useToast.ts                # Toast hook
├── server/
│   ├── index.js                       # Backend server
│   └── data.sqlite                    # Database
└── package.json
```

---

## 🛠️ Common Commands

### Start Development Server
```bash
npm run dev
```

### Start Frontend Only
```bash
npm run dev:frontend
```

### Start Backend Only
```bash
npm run dev:server
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

---

## 🐛 Troubleshooting

### Port Already in Use
If port 5173 or 5050 is busy:
```bash
# Kill the process
taskkill /F /IM node.exe
# Then restart
npm run dev
```

### Dependencies Not Installed
```bash
npm run setup
```

### Clear Cache
```bash
# Delete node_modules
rmdir /s /q node_modules
rmdir /s /q server\node_modules

# Reinstall
npm run setup
```

### Reset Database
```bash
# Delete database file
del server\data.sqlite

# Restart server (will recreate with default teacher)
npm run dev
```

---

## 📊 Features Overview

### Teacher Dashboard
- ✅ Dynamic stats with animations
- ✅ Live engagement charts
- ✅ Video upload functionality
- ✅ Content management
- ✅ Student management
- ✅ Assignment creation
- ✅ Analytics & growth tracking

### Student Dashboard
- ✅ Video lectures (watch & download)
- ✅ Chapter reading with content
- ✅ Quiz system
- ✅ Progress tracking
- ✅ AI tutor assistance
- ✅ Subject-wise filtering

---

## 🎯 Quick Test Flow

1. **Start Server**
   ```bash
   npm run dev
   ```

2. **Login as Teacher**
   - Go to http://localhost:5173
   - Click "Teacher Hub"
   - Login with teacher@demo.local / Teach@123

3. **Upload a Video**
   - Click FAB button (bottom right +)
   - Click 🎥 Upload Video
   - Fill in details
   - Upload

4. **Create a Student**
   - Use the dashboard or modals
   - Set username and PIN

5. **Login as Student**
   - Logout from teacher
   - Go to Student Hub
   - Login with student credentials
   - View videos and chapters

---

## 💡 Tips

- **Hot Reload**: Changes auto-refresh
- **Console**: Press F12 to see browser console
- **Network**: Check Network tab for API calls
- **LocalStorage**: Videos stored in browser localStorage
- **Database**: SQLite file in `server/data.sqlite`

---

## 📞 Need Help?

Check these files for documentation:
- `README.md` - Main project README
- `DASHBOARD_README.md` - Dashboard features
- `DASHBOARD_QUICKSTART.md` - Quick start guide
- `IMPLEMENTATION_SUMMARY.md` - Complete feature list

---

**Happy Coding! 🎉**
