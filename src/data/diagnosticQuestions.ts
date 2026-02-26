export type DiagnosticQuestion = {
  id: string;
  subject: string;
  question: string;
  choices: string[];
  correctAnswer: string;
};

export const diagnosticBank: Record<string, DiagnosticQuestion[]> = {
  Math: [
    {
      id: "math-1",
      subject: "Math",
      question: "What is 15 - 7?",
      choices: ["6", "7", "8", "9"],
      correctAnswer: "8"
    },
    {
      id: "math-2",
      subject: "Math",
      question: "If x + 9 = 17, what is x?",
      choices: ["6", "7", "8", "9"],
      correctAnswer: "8"
    },
    {
      id: "math-3",
      subject: "Math",
      question: "What is 9 x 6?",
      choices: ["42", "48", "54", "60"],
      correctAnswer: "54"
    },
    {
      id: "math-4",
      subject: "Math",
      question: "Which is a prime number?",
      choices: ["21", "27", "29", "33"],
      correctAnswer: "29"
    },
    {
      id: "math-5",
      subject: "Math",
      question: "Solve: 2x + 4 = 14. What is x?",
      choices: ["4", "5", "6", "7"],
      correctAnswer: "5"
    }
  ],
  Science: [
    {
      id: "sci-1",
      subject: "Science",
      question: "What planet is known as the Blue Planet?",
      choices: ["Mars", "Earth", "Jupiter", "Venus"],
      correctAnswer: "Earth"
    },
    {
      id: "sci-2",
      subject: "Science",
      question: "Which vitamin do we get from sunlight?",
      choices: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"],
      correctAnswer: "Vitamin D"
    },
    {
      id: "sci-3",
      subject: "Science",
      question: "Which part of the plant absorbs water from soil?",
      choices: ["Leaves", "Stem", "Roots", "Flowers"],
      correctAnswer: "Roots"
    },
    {
      id: "sci-4",
      subject: "Science",
      question: "What gas is essential for human breathing?",
      choices: ["Carbon dioxide", "Oxygen", "Nitrogen", "Hydrogen"],
      correctAnswer: "Oxygen"
    },
    {
      id: "sci-5",
      subject: "Science",
      question: "Which force pulls objects toward Earth?",
      choices: ["Magnetism", "Gravity", "Friction", "Pressure"],
      correctAnswer: "Gravity"
    }
  ],
  English: [
    {
      id: "eng-1",
      subject: "English",
      question: "Choose the correct sentence.",
      choices: [
        "She don't like apples.",
        "She doesn't like apples.",
        "She doesn't likes apples.",
        "She don't likes apples."
      ],
      correctAnswer: "She doesn't like apples."
    },
    {
      id: "eng-2",
      subject: "English",
      question: "Pick the synonym of 'happy'.",
      choices: ["sad", "angry", "joyful", "tired"],
      correctAnswer: "joyful"
    },
    {
      id: "eng-3",
      subject: "English",
      question: "Which is a noun in: 'The dog runs fast'?",
      choices: ["dog", "runs", "fast", "the"],
      correctAnswer: "dog"
    },
    {
      id: "eng-4",
      subject: "English",
      question: "Identify the verb: 'Birds fly high.'",
      choices: ["Birds", "fly", "high", "the"],
      correctAnswer: "fly"
    },
    {
      id: "eng-5",
      subject: "English",
      question: "Choose the correct punctuation.",
      choices: [
        "Where are you.",
        "Where are you?",
        "Where are you!",
        "Where are you,"
      ],
      correctAnswer: "Where are you?"
    }
  ],
  "General Knowledge": [
    {
      id: "gk-1",
      subject: "General Knowledge",
      question: "Which is the national animal of India?",
      choices: ["Lion", "Tiger", "Elephant", "Peacock"],
      correctAnswer: "Tiger"
    },
    {
      id: "gk-2",
      subject: "General Knowledge",
      question: "How many continents are there?",
      choices: ["5", "6", "7", "8"],
      correctAnswer: "7"
    },
    {
      id: "gk-3",
      subject: "General Knowledge",
      question: "Which ocean is the largest?",
      choices: ["Atlantic", "Indian", "Arctic", "Pacific"],
      correctAnswer: "Pacific"
    },
    {
      id: "gk-4",
      subject: "General Knowledge",
      question: "Which day is celebrated as World Environment Day?",
      choices: ["June 5", "July 5", "May 5", "August 5"],
      correctAnswer: "June 5"
    },
    {
      id: "gk-5",
      subject: "General Knowledge",
      question: "Which city is called the Pink City of India?",
      choices: ["Jaipur", "Agra", "Lucknow", "Bhopal"],
      correctAnswer: "Jaipur"
    }
  ],
  "Moral Science": [
    {
      id: "moral-1",
      subject: "Moral Science",
      question: "Which action shows respect?",
      choices: ["Interrupting", "Listening patiently", "Shouting", "Ignoring"],
      correctAnswer: "Listening patiently"
    },
    {
      id: "moral-2",
      subject: "Moral Science",
      question: "What should you do if you make a mistake?",
      choices: ["Hide it", "Blame others", "Admit and fix it", "Run away"],
      correctAnswer: "Admit and fix it"
    },
    {
      id: "moral-3",
      subject: "Moral Science",
      question: "Which quality helps in teamwork?",
      choices: ["Selfishness", "Cooperation", "Laziness", "Anger"],
      correctAnswer: "Cooperation"
    },
    {
      id: "moral-4",
      subject: "Moral Science",
      question: "If someone is sad, you should:",
      choices: ["Laugh at them", "Ignore them", "Help and comfort them", "Walk away"],
      correctAnswer: "Help and comfort them"
    },
    {
      id: "moral-5",
      subject: "Moral Science",
      question: "Being fair means:",
      choices: [
        "Treating everyone the same",
        "Only helping friends",
        "Cheating to win",
        "Always saying yes"
      ],
      correctAnswer: "Treating everyone the same"
    }
  ]
};
