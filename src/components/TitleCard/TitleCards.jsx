import React, { useEffect, useState } from "react";
import "../TitleCard/TitleCards.css";
import { Link } from "react-router-dom";

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`;
    const options = {
      method: "GET",
      headers: {
        accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOTU5ZTU5YWVmMDIxMmIyMTRkOWM2NDFiNjI0MDZlOCIsIm5iZiI6MTc2MzczNzcxNy43MjQsInN1YiI6IjY5MjA4MDc1OWQ3OWE1ZThkNzRhMmZkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Vs3yfQE9kCEWRa_8oxYcxapwGzAHv3CKYDknQeJG6aU'
  
      },
    };

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url, options);
        const data = await res.json();
        setApiData(data.results || []);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch movies.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category]); // re-run if 'category' changes

  if (loading) return <div className="loading">Loading movies...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="titlecards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list">
        {apiData.length === 0 && <p>No movies found.</p>}
        {apiData.map((card) => (
          <Link to={`/player/${card.id}`} className="card" key={card.id}>
            <img
              src={card.backdrop_path ? `https://image.tmdb.org/t/p/w500/${card.backdrop_path}` : ""}
              alt={card.original_title}
            />
            <p>{card.original_title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
