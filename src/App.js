import React, { useEffect, useState, useRef } from "react";
import "../TitleCard/TitleCards.css";
import { Link } from "react-router-dom";

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardListRef = useRef(null);

  const url = `https://api.themoviedb.org/3/movie/${category || "popular"}?language=en-US&page=1`;

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer YOUR_TMDB_API_KEY", // Replace with your TMDB API key
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((response) => setApiData(response.results || []))
      .catch((err) => console.error(err));
  }, [category]);

  const handleScroll = (direction) => {
    if (!cardListRef.current) return;
    const scrollAmount = 300;
    if (direction === "left") cardListRef.current.scrollLeft -= scrollAmount;
    else cardListRef.current.scrollLeft += scrollAmount;
  };

  return (
    <div className="titlecards">
      <h2>{title || "Popular on Netflix"}</h2>
      <div className="scroll-buttons">
        <button onClick={() => handleScroll("left")}>◀</button>
        <button onClick={() => handleScroll("right")}>▶</button>
      </div>
      <div className="card-list" ref={cardListRef}>
        {apiData.map((card) => (
          <Link to={`/player/${card.id}`} className="card" key={card.id}>
            {card.backdrop_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500/${card.backdrop_path}`}
                alt={card.original_title}
              />
            ) : (
              <div className="card-placeholder">No Image</div>
            )}
            <p>{card.original_title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
