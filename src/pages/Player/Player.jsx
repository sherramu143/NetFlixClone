import React, { useEffect, useState } from "react";
import "../Player/Player.css";
import backarrow from "../../assets/back_arrow_icon.png";
import { useNavigate, useParams } from "react-router-dom";

const Player = () => {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideo = async () => {
      const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
      const options = {
        method: "GET",
        headers: {
          accept: 'application/json',
    Authorization: `Bearer ${process.env.REACT_APP_TMDB_BEARER_KEY}`,
  // <-- replace with your real TMDB API key
        },
      };

      try {
        const res = await fetch(url, options);
        const data = await res.json();
        setVideo(data.results?.[0] || null);
      } catch (err) {
        console.error("Error fetching video:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id]);

  if (loading) return <div>Loading video...</div>;
  if (!video) return <div>No video found.</div>;

  return (
    <div className="player">
      <img
        src={backarrow}
        alt="back"
        className="back-btn"
        onClick={() => navigate("/")}
      />

      <iframe
        width="90%"
        height="90%"
        src={video.key ? `https://www.youtube.com/embed/${video.key}` : ""}
        title="trailer"
        frameBorder="0"
        allowFullScreen
      />

      <div className="player-info">
        <p>{video.published_at ? video.published_at.slice(0, 10) : "N/A"}</p>
        <p>{video.name || video.title || "N/A"}</p>
        <p>{video.type || "N/A"}</p>
      </div>
    </div>
  );
};

export default Player;
