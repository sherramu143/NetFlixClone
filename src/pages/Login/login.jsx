import React, { useState } from "react";
import "../Login/login.css";
import logo from "../../assets/logo.png";
import { logIn,signUp } from "../../firebase";
import netflix_spinner from "../../assets/netflix_spinner.gif"
const Login = () => {
    const [loading,setLoading]=useState(false);
    const[signState,setSignState]=useState("Sign In");
    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const user_auth=async(event)=>{
        event.preventDefault()
        setLoading(true);
if(signState==="Sign In"){
    await logIn(email,password);
}
else{
    await signUp(name,email,password);
}
    }
  return (
    loading?<div className="login-spinner">
        <img src={netflix_spinner} alt=""/>
    </div>:
    <div className="login">
      <img className="login-logo" src={logo} alt="logo" />

      <div className="login-form">
        <h1>{signState}</h1>

        <form>
            {signState==="Sign Up"?<input value={name} onChange={(event)=>setName(event.target.value)} type="text" placeholder="Your name" />:<></>}
          
          <input value={email} onChange={(event)=>setEmail(event.target.value)} type="email" placeholder="Email" />
          <input type="password" value={password} onChange={(event)=>setPassword(event.target.value)} placeholder="Password" />

          <button onClick={user_auth} type="submit">{signState}</button>

          <div className="form-help">
            <div className="remember">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember</label>
            </div>
            <p>Need help?</p>
          </div>
        </form>
        <div className="form-switch">
            {signState==="Sign In"?<p>New to Netflix?<span onClick={()=>setSignState("Sign Up")}>Sign up Now</span></p>:<p>Already have account?<span onClick={()=>setSignState("Sign In")}>Sign In Now</span></p>
    }
            
          </div>  
      </div>
    </div>
  );
};

export default Login;
