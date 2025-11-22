import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBNop95VQL-B_tM7DYZ5YRJDx0WrHRK1YM",
  authDomain: "netflixclone-dc058.firebaseapp.com",
  projectId: "netflixclone-dc058",
  storageBucket: "netflixclone-dc058.firebasestorage.app",
  messagingSenderId: "621452203852",
  appId: "1:621452203852:web:5386acba2e779e5af861e9",
  measurementId: "G-7B8SR1YMHB"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// ---------------------------
// SIGN UP
// ---------------------------
const signUp = async (name, email, password) => {
  try {
    const response = await createUserWithEmailAndPassword(auth, email, password);
    const user = response.user;

    // Save user in Firestore
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });

  } catch (error) {
    console.log(error);

    // Friendly error messages
    if (error.code === "auth/email-already-in-use") {
      alert("Email already exists. Please log in instead.");
    } else {
      alert(error.message);
    }
  }
};

// ---------------------------
// LOGIN
// ---------------------------
const logIn = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    console.log(res.user);
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
};

// ---------------------------
// LOGOUT
// ---------------------------
const logOut = () => {
  signOut(auth);
};

export { auth, db, logIn, logOut, signUp };
