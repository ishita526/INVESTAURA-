// firebase-config.js

const firebaseConfig = {
  apiKey: "AIzaSyDrAeWMpTdQUREp9inNQBvHUsdUPk-W2Ok",
  authDomain: "tradingcoursesite.firebaseapp.com",
  projectId: "tradingcoursesite",
  storageBucket: "tradingcoursesite.firebasestorage.app",
  messagingSenderId: "1007205977164",
  appId: "1:1007205977164:web:3fc21e91378b7cb2a4b8e9",
  measurementId: "G-MC1MC1EXFB"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
