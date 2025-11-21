import React from "react";
import "../footer/footer.css";
import youtube_icon from "../../assets/youtube_icon.png";
import instagram_icon from "../../assets/instagram_icon.png";
import facebook_icon from "../../assets/facebook_icon.png";
import twitter_icon from "../../assets/twitter_icon.png";

const Footer = () => {
  return (
    <div className="footer">

      
      <div className="footer_icons">
        <img src={youtube_icon} alt="YouTube" />
        <img src={facebook_icon} alt="Facebook" />
        <img src={instagram_icon} alt="Instagram" />
        <img src={twitter_icon} alt="Twitter" />
      </div>

     
      <ul className="footer_links">
        <li>Audio Description</li>
        <li>Help Center</li>
        <li>Gift Cards</li>
        <li>Media Center</li>
        <li>Investor Relations</li>
        <li>Terms of Use</li>
        <li>Privacy</li>
        <li>Contact Us</li>
      </ul>

      <p className="footer_copy">Netflix India © 2025</p>
    </div>
  );
};

export default Footer;
