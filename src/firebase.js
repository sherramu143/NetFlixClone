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
console.log("API Key:", process.env.REACT_APP_FIREBASE_API_KEY);
console.log("Project ID:", process.env.REACT_APP_FIREBASE_PROJECT_ID);

console.log("Project ID:", process.env.REACT_APP_FIREBASE_PROJECT_ID);

// ------------------- USE ENV VARIABLES -------------------
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// ------------------- INITIALIZE APP -------------------
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
      email
    });

    toast.success("Signup successful! ✅");
    console.log("Signup success:", user);
  } catch (error) {
    console.error("Signup error:", error);
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
    console.error("Login error:", error);
    toast.error(error.message || "Login failed ❌");
  }
};

// ------------------- LOGOUT -------------------
const logOut = async () => {
  try {
    await signOut(auth);
    toast.success("Logged out successfully!");
  } catch (error) {
    console.error("Logout error:", error);
    toast.error(error.message || "Logout failed ❌");
  }
};

export { auth, db, signUp, logIn, logOut };
