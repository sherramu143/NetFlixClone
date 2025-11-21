import React, { useEffect, useRef } from "react";
import '../navbar/navbar.css'
import logo from '../../assets/logo.png';
import searcIcon from '../../assets/search_icon.svg'
import belIconIcon from '../../assets/bell_icon.svg';
import profileconIcon from '../../assets/profile_img.png';
import dropdownIconIcon from '../../assets/caret_icon.svg'
import { logOut } from "../../firebase";
const Navbar=()=>{
     const navRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 80) {
        navRef.current.classList.add("nav-dark");
      } else {
        navRef.current.classList.remove("nav-dark");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
    
    return(
        <div className="navbar" ref={navRef}>
            <div className="navbar-left">
                <img src={logo} alt=""/>
                <ui>
                    <li>Home</li>
                    <li>TV Shows</li>
                    <li>Movies</li>
                   <li>News & Popular</li>
                   <li>My list</li>
                   <li>Browse by Language</li>
                </ui>
            </div>
            <div className="navbar-right">
                <img src={searcIcon} alt="" className="icons"/>  
                <p>childresn</p>   
                <img src={belIconIcon} alt="" className="icons"/>
                <div className="navbar-profile">
                    <img src={profileconIcon} alt=""/>
                    <img src={dropdownIconIcon} alt=""/>
                    <div className="dropdown">
                       <p onClick={()=>{logOut()}}>Sign out of Netflix</p> 
                    </div>
                </div>
                       </div>

        </div>
    )
}
export default Navbar;