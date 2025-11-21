import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

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
getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);

// ------------------- SIGN UP -------------------
const signUp = async (name, email, password) => {
  try {
    const response = await createUserWithEmailAndPassword(auth, email, password);
    const user = response.user;

    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });

    toast.success("Signup successful! ✅");
    console.log("Signup success:", user);
  } catch (error) {
    console.log("Signup error:", error);
    toast.error(error.message || "Signup failed ❌");
  }
};

// ------------------- LOGIN -------------------
const logIn = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    toast.success("Login successful! ✅");
    console.log("Login success:", res.user);
  } catch (error) {
    console.log("Login error:", error);
    toast.error(error.message || "Login failed ❌");
  }
};

// ------------------- LOGOUT -------------------
const logOut = async () => {
  try {
    await signOut(auth);
    toast.success("Logged out successfully!");
  } catch (error) {
    console.log("Logout error:", error);
    toast.error(error.message || "Logout failed ❌");
  }
};

export { auth, db, signUp, logIn, logOut };
