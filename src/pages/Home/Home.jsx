import React from "react";
import "../Home/Home.css";
import Navbar from "../../components/navbar/navbar";
import hero_banner from "../../assets/hero_banner.jpg";
import hero_title from "../../assets/hero_title.png";
import play_icon from "../../assets/play_icon.png";
import info_icon from "../../assets/info_icon.png";
import TitleCards from "../../components/TitleCard/TitleCards";
import Footer from "../../components/footer/footer";

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      
      {/* HERO SECTION */}
      <div className="hero">
        <img src={hero_banner} alt="" className="banner-img" />

        <div className="hero-caption">
          <img src={hero_title} alt="" className="caption-img" />

          <p>
            Discover his ties to a secret ancient order, a young man living in
            modern Istanbul embarks on a quest to save the city from an immortal enemy.
          </p>

          <div className="hero-btns">
            <button className="btn">
              <img src={play_icon} alt="" /> Play
            </button>

            <button className="btn dark-btn">
              <img src={info_icon} alt="" /> More Info
            </button>
          </div>

          {/* FIRST CARD ON HERO IMAGE */}
          <TitleCards title="Popular on Netflix" category={'popular'}/>
        </div>
      </div>

      {/* MORE CARDS BELOW HERO IMAGE */}
      <div className="more-cards">
        <TitleCards title="Trending Now"  category={'popular'}/>
        <TitleCards title="Top Picks For You" category={'top_rated'} />
        <TitleCards title="Upcoming" category={'upcoming'} />
      </div>
<Footer/>
    </div>
  );
};

export default Home;
