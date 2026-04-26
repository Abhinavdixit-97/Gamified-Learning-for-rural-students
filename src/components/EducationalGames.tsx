import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import "../styles/educationalGames.css";

type Game = {
  id: string;
  title: string;
  description: string;
  icon: string;
  subject: string;
  difficulty: string;
};

const games: Game[] = [
  { id: "math-quiz", title: "Math Speed Challenge", description: "Solve math problems quickly!", icon: "🔢", subject: "Math", difficulty: "Easy" },
  { id: "word-match", title: "Word Matching", description: "Match words with meanings", icon: "📝", subject: "English", difficulty: "Easy" },
  { id: "memory-cards", title: "Memory Cards", description: "Match pairs of cards", icon: "🎴", subject: "General", difficulty: "Easy" },
  { id: "science-quiz", title: "Science Explorer", description: "Discover science facts", icon: "🔬", subject: "Science", difficulty: "Medium" },
  { id: "pattern-game", title: "Pattern Master", description: "Complete the patterns", icon: "🎨", subject: "Math", difficulty: "Medium" },
  { id: "spelling-bee", title: "Spelling Champion", description: "Spell words correctly", icon: "🐝", subject: "English", difficulty: "Hard" }
];

type EducationalGamesProps = {
  studentGrade: string;
  onGameComplete: (gameId: string, score: number) => void;
};

const EducationalGames = ({ studentGrade, onGameComplete }: EducationalGamesProps) => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [filterSubject, setFilterSubject] = useState("all");

  const subjects = ["all", ...Array.from(new Set(games.map(g => g.subject)))];
  const filteredGames = games.filter(g => filterSubject === "all" || g.subject === filterSubject);

  const renderGame = () => {
    switch (selectedGame) {
      case "math-quiz":
        return <MathSpeedChallenge onComplete={(score) => { onGameComplete("math-quiz", score); setSelectedGame(null); }} />;
      case "word-match":
        return <WordMatching onComplete={(score) => { onGameComplete("word-match", score); setSelectedGame(null); }} />;
      case "memory-cards":
        return <MemoryCards onComplete={(score) => { onGameComplete("memory-cards", score); setSelectedGame(null); }} />;
      case "science-quiz":
        return <ScienceExplorer onComplete={(score) => { onGameComplete("science-quiz", score); setSelectedGame(null); }} />;
      case "pattern-game":
        return <PatternMaster onComplete={(score) => { onGameComplete("pattern-game", score); setSelectedGame(null); }} />;
      case "spelling-bee":
        return <SpellingChampion onComplete={(score) => { onGameComplete("spelling-bee", score); setSelectedGame(null); }} />;
      default:
        return null;
    }
  };

  return (
    <div className="educational-games">
      <div className="games-header">
        <div>
          <h2>🎮 Educational Games</h2>
          <p>Learn while having fun! Play games to earn bonus stars ⭐</p>
        </div>
        <select className="subject-filter" value={filterSubject} onChange={(e) => setFilterSubject(e.target.value)}>
          {subjects.map(s => <option key={s} value={s}>{s === "all" ? "All Subjects" : s}</option>)}
        </select>
      </div>

      {!selectedGame ? (
        <div className="games-grid">
          {filteredGames.map((game, i) => (
            <motion.div
              key={game.id}
              className="game-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -8, boxShadow: "0 16px 48px rgba(47, 164, 215, 0.25)" }}
              onClick={() => setSelectedGame(game.id)}
            >
              <div className="game-icon">{game.icon}</div>
              <h3>{game.title}</h3>
              <p>{game.description}</p>
              <div className="game-meta">
                <span className="game-subject">{game.subject}</span>
                <span className={`game-difficulty ${game.difficulty.toLowerCase()}`}>{game.difficulty}</span>
              </div>
              <motion.button className="btn-play" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                Play Now →
              </motion.button>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="game-container">
          <button className="btn-back" onClick={() => setSelectedGame(null)}>← Back to Games</button>
          {renderGame()}
        </div>
      )}
    </div>
  );
};

// Math Speed Challenge Game
const MathSpeedChallenge = ({ onComplete }: { onComplete: (score: number) => void }) => {
  const [question, setQuestion] = useState({ num1: 0, num2: 0, operator: "+" });
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    generateQuestion();
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
      onComplete(score);
    }
  }, [timeLeft, gameOver]);

  const generateQuestion = () => {
    const operators = ["+", "-", "×"];
    const op = operators[Math.floor(Math.random() * operators.length)];
    const num1 = Math.floor(Math.random() * 20) + 1;
    const num2 = Math.floor(Math.random() * 20) + 1;
    setQuestion({ num1, num2, operator: op });
    setAnswer("");
  };

  const checkAnswer = () => {
    let correct = 0;
    if (question.operator === "+") correct = question.num1 + question.num2;
    else if (question.operator === "-") correct = question.num1 - question.num2;
    else if (question.operator === "×") correct = question.num1 * question.num2;

    if (parseInt(answer) === correct) {
      setScore(score + 10);
      generateQuestion();
    } else {
      setScore(Math.max(0, score - 2));
      setAnswer("");
    }
  };

  return (
    <div className="game-play-area">
      <div className="game-header-bar">
        <div className="game-stat">⏱️ Time: {timeLeft}s</div>
        <div className="game-stat">⭐ Score: {score}</div>
      </div>
      {!gameOver ? (
        <motion.div className="math-question" initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
          <h2>{question.num1} {question.operator} {question.num2} = ?</h2>
          <input
            type="number"
            className="math-input"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && checkAnswer()}
            autoFocus
          />
          <motion.button className="btn btn-primary" onClick={checkAnswer} whileHover={{ scale: 1.05 }}>
            Submit Answer
          </motion.button>
        </motion.div>
      ) : (
        <motion.div className="game-over" initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
          <h2>🎉 Game Over!</h2>
          <p>Your Score: {score} points</p>
          <p>You earned {score} bonus stars! ⭐</p>
        </motion.div>
      )}
    </div>
  );
};

// Word Matching Game
const WordMatching = ({ onComplete }: { onComplete: (score: number) => void }) => {
  const wordPairs = [
    { word: "Happy", meaning: "Feeling joy" },
    { word: "Brave", meaning: "Showing courage" },
    { word: "Quick", meaning: "Moving fast" },
    { word: "Smart", meaning: "Intelligent" },
    { word: "Kind", meaning: "Friendly and caring" }
  ];

  const [shuffledMeanings, setShuffledMeanings] = useState<string[]>([]);
  const [selected, setSelected] = useState<{ word?: string; meaning?: string }>({});
  const [matched, setMatched] = useState<string[]>([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    setShuffledMeanings([...wordPairs.map(p => p.meaning)].sort(() => Math.random() - 0.5));
  }, []);

  const handleWordClick = (word: string) => {
    if (matched.includes(word)) return;
    setSelected({ ...selected, word });
    if (selected.meaning) {
      checkMatch(word, selected.meaning);
    }
  };

  const handleMeaningClick = (meaning: string) => {
    if (matched.some(w => wordPairs.find(p => p.word === w)?.meaning === meaning)) return;
    setSelected({ ...selected, meaning });
    if (selected.word) {
      checkMatch(selected.word, meaning);
    }
  };

  const checkMatch = (word: string, meaning: string) => {
    const pair = wordPairs.find(p => p.word === word && p.meaning === meaning);
    if (pair) {
      setMatched([...matched, word]);
      setScore(score + 20);
    }
    setSelected({});
    if (matched.length + 1 === wordPairs.length) {
      setTimeout(() => onComplete(score + 20), 1000);
    }
  };

  return (
    <div className="game-play-area">
      <div className="game-header-bar">
        <div className="game-stat">⭐ Score: {score}</div>
        <div className="game-stat">Matched: {matched.length}/{wordPairs.length}</div>
      </div>
      <div className="word-match-grid">
        <div className="word-column">
          {wordPairs.map(pair => (
            <motion.button
              key={pair.word}
              className={`word-btn ${selected.word === pair.word ? "selected" : ""} ${matched.includes(pair.word) ? "matched" : ""}`}
              onClick={() => handleWordClick(pair.word)}
              whileHover={{ scale: 1.05 }}
              disabled={matched.includes(pair.word)}
            >
              {pair.word}
            </motion.button>
          ))}
        </div>
        <div className="word-column">
          {shuffledMeanings.map(meaning => {
            const isMatched = matched.some(w => wordPairs.find(p => p.word === w)?.meaning === meaning);
            return (
              <motion.button
                key={meaning}
                className={`word-btn ${selected.meaning === meaning ? "selected" : ""} ${isMatched ? "matched" : ""}`}
                onClick={() => handleMeaningClick(meaning)}
                whileHover={{ scale: 1.05 }}
                disabled={isMatched}
              >
                {meaning}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Memory Cards Game
const MemoryCards = ({ onComplete }: { onComplete: (score: number) => void }) => {
  const emojis = ["🍎", "🍌", "🍇", "🍊", "🍓", "🍉", "🥝", "🍒"];
  const [cards, setCards] = useState<string[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    const doubled = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
    setCards(doubled);
  }, []);

  const handleCardClick = (index: number) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;
    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      if (cards[newFlipped[0]] === cards[newFlipped[1]]) {
        setMatched([...matched, ...newFlipped]);
        setFlipped([]);
        if (matched.length + 2 === cards.length) {
          setTimeout(() => onComplete(Math.max(100 - moves * 5, 20)), 500);
        }
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  return (
    <div className="game-play-area">
      <div className="game-header-bar">
        <div className="game-stat">Moves: {moves}</div>
        <div className="game-stat">Matched: {matched.length / 2}/{emojis.length}</div>
      </div>
      <div className="memory-grid">
        {cards.map((emoji, index) => (
          <motion.div
            key={index}
            className={`memory-card ${flipped.includes(index) || matched.includes(index) ? "flipped" : ""}`}
            onClick={() => handleCardClick(index)}
            whileHover={{ scale: 1.05 }}
          >
            {flipped.includes(index) || matched.includes(index) ? emoji : "❓"}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Science Explorer (Simple Quiz)
const ScienceExplorer = ({ onComplete }: { onComplete: (score: number) => void }) => {
  const questions = [
    { q: "What is the largest planet?", options: ["Earth", "Jupiter", "Mars", "Venus"], correct: 1 },
    { q: "What do plants need for photosynthesis?", options: ["Water", "Sunlight", "CO2", "All of these"], correct: 3 },
    { q: "How many bones in human body?", options: ["206", "205", "207", "200"], correct: 0 }
  ];

  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (index: number) => {
    setSelected(index);
    if (index === questions[currentQ].correct) {
      setScore(score + 30);
    }
    setTimeout(() => {
      if (currentQ + 1 < questions.length) {
        setCurrentQ(currentQ + 1);
        setSelected(null);
      } else {
        setShowResult(true);
        onComplete(score + (index === questions[currentQ].correct ? 30 : 0));
      }
    }, 1500);
  };

  if (showResult) {
    return (
      <div className="game-play-area">
        <motion.div className="game-over" initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
          <h2>🔬 Science Explorer Complete!</h2>
          <p>Your Score: {score} points</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="game-play-area">
      <div className="game-header-bar">
        <div className="game-stat">Question {currentQ + 1}/{questions.length}</div>
        <div className="game-stat">⭐ Score: {score}</div>
      </div>
      <div className="quiz-area">
        <h3>{questions[currentQ].q}</h3>
        <div className="quiz-options">
          {questions[currentQ].options.map((opt, i) => (
            <motion.button
              key={i}
              className={`option-btn ${selected === i ? (i === questions[currentQ].correct ? "correct" : "wrong") : ""}`}
              onClick={() => selected === null && handleAnswer(i)}
              whileHover={{ scale: 1.02 }}
              disabled={selected !== null}
            >
              {opt}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Pattern Master
const PatternMaster = ({ onComplete }: { onComplete: (score: number) => void }) => {
  const patterns = [
    { sequence: [2, 4, 6, 8], answer: 10 },
    { sequence: [1, 3, 5, 7], answer: 9 },
    { sequence: [5, 10, 15, 20], answer: 25 }
  ];

  const [currentP, setCurrentP] = useState(0);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");

  const checkAnswer = () => {
    if (parseInt(answer) === patterns[currentP].answer) {
      setScore(score + 25);
      setFeedback("✅ Correct!");
    } else {
      setFeedback("❌ Try again!");
    }
    setTimeout(() => {
      if (currentP + 1 < patterns.length) {
        setCurrentP(currentP + 1);
        setAnswer("");
        setFeedback("");
      } else {
        onComplete(score + (parseInt(answer) === patterns[currentP].answer ? 25 : 0));
      }
    }, 1500);
  };

  return (
    <div className="game-play-area">
      <div className="game-header-bar">
        <div className="game-stat">Pattern {currentP + 1}/{patterns.length}</div>
        <div className="game-stat">⭐ Score: {score}</div>
      </div>
      <div className="pattern-area">
        <h3>Complete the Pattern:</h3>
        <div className="pattern-sequence">
          {patterns[currentP].sequence.map((num, i) => (
            <div key={i} className="pattern-box">{num}</div>
          ))}
          <div className="pattern-box question">?</div>
        </div>
        <input
          type="number"
          className="math-input"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && checkAnswer()}
          placeholder="Your answer"
        />
        <motion.button className="btn btn-primary" onClick={checkAnswer} whileHover={{ scale: 1.05 }}>
          Check Answer
        </motion.button>
        {feedback && <p className="feedback-text">{feedback}</p>}
      </div>
    </div>
  );
};

// Spelling Champion
const SpellingChampion = ({ onComplete }: { onComplete: (score: number) => void }) => {
  const words = [
    { word: "beautiful", hint: "Very pretty" },
    { word: "necessary", hint: "Required or needed" },
    { word: "separate", hint: "To divide or keep apart" }
  ];

  const [currentW, setCurrentW] = useState(0);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");

  const checkSpelling = () => {
    if (answer.toLowerCase() === words[currentW].word) {
      setScore(score + 35);
      setFeedback("✅ Perfect spelling!");
    } else {
      setFeedback(`❌ Correct: ${words[currentW].word}`);
    }
    setTimeout(() => {
      if (currentW + 1 < words.length) {
        setCurrentW(currentW + 1);
        setAnswer("");
        setFeedback("");
      } else {
        onComplete(score + (answer.toLowerCase() === words[currentW].word ? 35 : 0));
      }
    }, 2000);
  };

  return (
    <div className="game-play-area">
      <div className="game-header-bar">
        <div className="game-stat">Word {currentW + 1}/{words.length}</div>
        <div className="game-stat">⭐ Score: {score}</div>
      </div>
      <div className="spelling-area">
        <h3>Spell this word:</h3>
        <p className="hint">Hint: {words[currentW].hint}</p>
        <input
          type="text"
          className="math-input"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && checkSpelling()}
          placeholder="Type the word"
          autoFocus
        />
        <motion.button className="btn btn-primary" onClick={checkSpelling} whileHover={{ scale: 1.05 }}>
          Check Spelling
        </motion.button>
        {feedback && <p className="feedback-text">{feedback}</p>}
      </div>
    </div>
  );
};

export default EducationalGames;
