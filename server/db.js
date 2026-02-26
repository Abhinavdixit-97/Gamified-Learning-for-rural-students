const path = require("path");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

const dbPromise = open({
  filename: path.join(__dirname, "data.sqlite"),
  driver: sqlite3.Database
});

const initDb = async () => {
  const db = await dbPromise;
  await db.exec("PRAGMA foreign_keys = ON;");
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      role TEXT NOT NULL,
      name TEXT,
      email TEXT UNIQUE,
      username TEXT UNIQUE,
      grade TEXT,
      password_hash TEXT,
      pin_hash TEXT,
      created_at INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS chapters (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      teacher_id INTEGER NOT NULL,
      grade TEXT NOT NULL,
      subject TEXT NOT NULL,
      title TEXT NOT NULL,
      summary TEXT,
      created_at INTEGER NOT NULL,
      FOREIGN KEY (teacher_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS questions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      chapter_id INTEGER NOT NULL,
      prompt TEXT NOT NULL,
      options TEXT NOT NULL,
      correct_index INTEGER NOT NULL,
      FOREIGN KEY (chapter_id) REFERENCES chapters(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS assignments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      chapter_id INTEGER NOT NULL,
      student_id INTEGER NOT NULL,
      assigned_at INTEGER NOT NULL,
      FOREIGN KEY (chapter_id) REFERENCES chapters(id) ON DELETE CASCADE,
      FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS attempts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_id INTEGER NOT NULL,
      chapter_id INTEGER,
      subject TEXT,
      correct INTEGER,
      points INTEGER,
      time_spent_sec INTEGER,
      difficulty TEXT,
      question TEXT,
      source TEXT,
      timestamp INTEGER,
      FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (chapter_id) REFERENCES chapters(id) ON DELETE SET NULL
    );
  `);
};

module.exports = {
  dbPromise,
  initDb
};
