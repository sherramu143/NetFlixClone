import React, { useEffect, useState } from "react";
import "../Player/Player.css";
import backarrow from "../../assets/back_arrow_icon.png";
import { useNavigate, useParams } from "react-router-dom";

const Player = () => {
    const[apiData,setApiData]=useState({
        name:"",
        key:"",
        published_at:"",
        typeof:""
    });
const {id}=useParams();
const navigate=useNavigate()
const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOTU5ZTU5YWVmMDIxMmIyMTRkOWM2NDFiNjI0MDZlOCIsIm5iZiI6MTc2MzczNzcxNy43MjQsInN1YiI6IjY5MjA4MDc1OWQ3OWE1ZThkNzRhMmZkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Vs3yfQE9kCEWRa_8oxYcxapwGzAHv3CKYDknQeJG6aU'
  }
};

    useEffect(()=>{
fetch(url, options)
  .then(res => res.json())
  .then(response => setApiData(response.results[0]))
  .catch(err => console.error(err))
},[])

  return (
    <div className="player">
      <img src={backarrow} alt="back" className="back-btn"  onClick={()=>{navigate("/");
}}/>

      <iframe
        width="90%"
        height="90%"
        src={`https://www.youtube.com/embed/${apiData.key}`}
        title="trailer"
        frameBorder="0"
        allowFullScreen
      ></iframe>

      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.typeof}</p>
      </div>
    </div>
  );
};

export default Player;
