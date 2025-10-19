// Signup function
function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Create Firestore user document
      return db.collection("users").doc(user.uid).set({
        email: user.email,
        enrolledCourses: { trading101: true },
        completedChapters: [],
        quizScores: {},
        certificate: false
      });
    })
    .then(() => {
      alert("Signup successful!");
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
}

// Login function
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
}

// Dashboard logic
if (window.location.pathname.includes("dashboard.html")) {
  auth.onAuthStateChanged((user) => {
    if (user) {
      document.getElementById("user-email").textContent = `Logged in as: ${user.email}`;
    } else {
      window.location.href = "index.html";
    }
  });

  function completeChapter(chapterNumber) {
    const user = auth.currentUser;
    const userRef = db.collection("users").doc(user.uid);

    userRef.get().then((doc) => {
      if (doc.exists) {
        const completed = doc.data().completedChapters || [];
        if (!completed.includes(chapterNumber)) {
          completed.push(chapterNumber);
          userRef.update({ completedChapters: completed });
          alert(`Chapter ${chapterNumber} marked as complete!`);
        } else {
          alert(`Chapter ${chapterNumber} already completed.`);
        }
      }
    });
  }

  window.completeChapter = completeChapter;
}

document.querySelector(".dropdown-toggle").addEventListener("click", function(e) {
    e.preventDefault();
    const menu = this.nextElementSibling;
    menu.style.display = (menu.style.display === "block") ? "none" : "block";
});

window.addEventListener("click", function(e) {
    if (!e.target.matches('.dropdown-toggle')) {
        document.querySelectorAll(".dropdown-menu").forEach(menu => menu.style.display = "none");
    }
});

