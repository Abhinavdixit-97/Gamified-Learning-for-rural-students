# Gamified Learning Platform (Child-Friendly + AI Tutor)

This project is a multi-page React website showcasing a gamified learning platform for rural education. It includes a local AI tutor (via Ollama), multilingual UI, and results charts based on the paper's reported metrics.

## Frontend Setup

Node 18+ is recommended for the frontend and backend.

1. Install dependencies (single command):

```bash
npm run setup
```

2. Start the app (single port, frontend + backend together):

```bash
npm run dev
```

If you need the Vite frontend only:

```bash
npm run dev:frontend
```

The site will run at `http://localhost:5173`.

## Backend (AI Tutor) Setup

1. Install server dependencies:

```bash
cd server
npm install
```

2. Create your `.env`:

```bash
copy .env.example .env
```

3. Start the server:

```bash
npm run dev
```

The server will run at `http://localhost:5050`.
You must run the server for Teacher/Student logins and assignments.

### Default Teacher Login

On first run, a default teacher account is created:

- Email: `teacher@demo.local`
- Password: `Teach@123`

You can change these in `server/.env`.

### SQLite Database

The backend stores data in `server/data.sqlite`. Delete this file to reset all accounts, chapters, assignments, and attempts.

### Student Login

Teachers create student accounts in the Teacher Hub. Students log in with:

- Username
- PIN

### Auto Curriculum

On first run, the system seeds grade-wise chapters for all core subjects (Math, Science, English, General Knowledge, Moral Science). When a student is created, all chapters for their grade are assigned automatically.

## Ollama (Free Local AI)

1. Install Ollama from the official site.
2. Pull a multilingual model (default):

```bash
ollama pull qwen2.5:7b
```

3. Ensure Ollama is running locally (default URL `http://localhost:11434`).

## Notes

- The AI tutor endpoints are defined in `server/index.js`.
- Frontend API base URL is `VITE_API_BASE` (defaults to `http://localhost:5050` if not set).
- Languages included: English, Hindi, Bengali, Telugu, Marathi.
- To add more languages, update `src/i18n/*.json` and `src/data/languages.ts`.
- Teacher Hub lets you create chapters by grade, add questions, assign to students, and view growth analytics (stored locally).
- Student Hub lets students open assigned chapters, answer questions, view progress, and get a break warning after 60 minutes.
