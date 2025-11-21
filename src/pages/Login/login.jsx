import React, { useState } from "react";
import "../Login/login.css";
import logo from "../../assets/logo.png";
import { logIn, signUp } from "../../firebase";
import netflix_spinner from "../../assets/netflix_spinner.gif";
import { useNavigate } from "react-router-dom"; // <-- import navigate

const Login = () => {
  const navigate = useNavigate(); // <-- hook for navigation
  const [loading, setLoading] = useState(false);
  const [signState, setSignState] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user_auth = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (signState === "Sign In") {
        await logIn(email, password);
      } else {
        await signUp(name, email, password);
      }

      // Navigate to home page after successful login/signup
      navigate("/"); 
    } catch (err) {
      console.error("Authentication failed:", err);
      alert("Login/Signup failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <div className="login-spinner">
      <img src={netflix_spinner} alt="Loading..." />
    </div>
  ) : (
    <div className="login">
      <img className="login-logo" src={logo} alt="logo" />

      <div className="login-form">
        <h1>{signState}</h1>

        <form>
          {signState === "Sign Up" && (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Your name"
            />
          )}

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />

          <button onClick={user_auth} type="submit">
            {signState}
          </button>

          <div className="form-help">
            <div className="remember">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember</label>
            </div>
            <p>Need help?</p>
          </div>
        </form>

        <div className="form-switch">
          {signState === "Sign In" ? (
            <p>
              New to Netflix?
              <span onClick={() => setSignState("Sign Up")}> Sign up Now</span>
            </p>
          ) : (
            <p>
              Already have account?
              <span onClick={() => setSignState("Sign In")}> Sign In Now</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
