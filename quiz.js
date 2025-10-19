import { getFirestore, doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const db = getFirestore();
const auth = getAuth();

const questions = [
  {
    q: "What does ROI stand for?",
    options: ["Return on Interest", "Rate of Investment", "Return on Investment", "Range of Income"],
    answer: "Return on Investment"
  },
  {
    q: "Which of these is a stock exchange?",
    options: ["Paytm", "Zerodha", "NSE", "UPI"],
    answer: "NSE"
  }
];

let currentQuestion = 0;
let score = 0;

const questionElem = document.getElementById("question");
const optionsElem = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");
const resultElem = document.getElementById("result");

let currentUserUID = null;

// Show a question
function showQuestion(index) {
  const q = questions[index];
  questionElem.innerText = q.q;
  optionsElem.innerHTML = "";

  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.classList.add("option-btn");
    btn.onclick = () => {
      if (opt === q.answer) {
        score++;
        btn.style.backgroundColor = "green";
      } else {
        btn.style.backgroundColor = "red";
      }
      // disable all buttons after selection
      document.querySelectorAll(".option-btn").forEach(b => b.disabled = true);
    };
    optionsElem.appendChild(btn);
  });

  if (index === questions.length - 1) {
    nextBtn.style.display = "none";
    submitBtn.style.display = "inline";
  }
}

// Save result to Firestore
async function saveResult() {
  if (!currentUserUID) return;
  const userRef = doc(db, "users", currentUserUID);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    await updateDoc(userRef, {
      [`quizScores.trading101`]: score
    });
  }
  resultElem.innerText = `You scored ${score}/${questions.length}`;
}

// Firebase Auth state check
onAuthStateChanged(auth, user => {
  if (user) {
    currentUserUID = user.uid;
    showQuestion(currentQuestion);
  } else {
    window.location.href = "index.html";
  }
});

// Button events
nextBtn.onclick = () => {
  currentQuestion++;
  showQuestion(currentQuestion);
};

submitBtn.onclick = () => {
  saveResult();
};
