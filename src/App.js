import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/login";
import Player from "./pages/Player/Player";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ToastContainer } from "react-toastify";

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoadingAuth(false);

      // Only redirect to login if user is not logged in
      if (!currentUser) {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loadingAuth) return <div>Checking authentication...</div>;

  return (
    <div>
      <ToastContainer theme="dark" />
      <Routes>
        {/* Only allow Home and Player if logged in */}
        {user ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/player/:id" element={<Player />} />
          </>
        ) : null}

        {/* Login accessible always */}
        <Route path="/login" element={<Login />} />

        {/* Optional: redirect unknown routes */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </div>
  );
}

export default App;
