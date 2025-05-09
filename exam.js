
const questions = [
  {
    question: "Quel mot-clé permet de déclarer une variable en JavaScript ?",
    options: ["let", "int", "var", "string"],
    answer: "let"
  },
  {
    question: "Quelle méthode convertit une chaîne en majuscules ?",
    options: ["toUpperCase()", "toLower()", "uppercase()", "makeUpper()"],
    answer: "toUpperCase()"
  },
  {
    question: "Quel symbole est utilisé pour un commentaire sur une ligne ?",
    options: ["//", "/* */", "#", "<!-- -->"],
    answer: "//"
  }
];

let currentIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const timerEl = document.getElementById("timer");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");
const examTitle = document.getElementById("examTitle");


const exams = JSON.parse(localStorage.getItem("examList")) || [];
const selectedExamIndex = localStorage.getItem("selectedExamIndex");
if (exams[selectedExamIndex]) {
  examTitle.textContent = exams[selectedExamIndex].title;
}


function showQuestion() {
  const currentQuestion = questions[currentIndex];
  questionEl.textContent = currentQuestion.question;
  optionsEl.innerHTML = "";

  currentQuestion.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => checkAnswer(option);
    optionsEl.appendChild(btn);
  });

  startTimer();
}


function checkAnswer(selected) {
  clearInterval(timer);
  if (selected === questions[currentIndex].answer) {
    score++;
  }
  nextQuestion();
}


function nextQuestion() {
  currentIndex++;
  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}


function showResult() {
  document.getElementById("questionBox").style.display = "none";
  resultEl.style.display = "block";
  const finalScore = Math.round((score / questions.length) * 100);
  scoreEl.textContent = finalScore;

  
  const previous = JSON.parse(localStorage.getItem("studentResults")) || [];
  const examName = exams[selectedExamIndex]?.title || "Examen";
  previous.push({ exam: examName, score: finalScore });
  localStorage.setItem("studentResults", JSON.stringify(previous));
}


function startTimer() {
  timeLeft = 30;
  updateTimerDisplay();
  timer = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}

function updateTimerDisplay() {
  timerEl.textContent = '00:${timeLeft < 10 ? "0" + timeLeft : timeLeft}';
}


showQuestion();