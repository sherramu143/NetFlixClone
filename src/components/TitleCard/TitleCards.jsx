import React, { useEffect, useState } from "react";
import "../TitleCard/TitleCards.css";

import { Link } from "react-router-dom";
 const TtileCards=({title,category})=>{
    const[apiData,SetapiData]=useState([]);
    const url = `https://api.themoviedb.org/3/movie/${category?category:'popular'}?language=en-US&page=1`;
    useEffect(()=>{
        
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOTU5ZTU5YWVmMDIxMmIyMTRkOWM2NDFiNjI0MDZlOCIsIm5iZiI6MTc2MzczNzcxNy43MjQsInN1YiI6IjY5MjA4MDc1OWQ3OWE1ZThkNzRhMmZkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Vs3yfQE9kCEWRa_8oxYcxapwGzAHv3CKYDknQeJG6aU'
  }
};

fetch(url, options)
  .then(res => res.json())
  .then(response => SetapiData(response.results))
  .catch(err => console.error(err));
    },[])
    return(
        <div className="titlecards">
           <h2>{title?title:"Popular on Netflix"}</h2> 
           <div className="card-list" >
{
    apiData.map((card,index)=>{
        return<Link to={`/player/${card.id}`}
        className="card" key={index} >
<img src={`https://image.tmdb.org/t/p/w500/`+card.backdrop_path} alt=""/>
<p>{card.original_title}</p>
        </Link>
    })

}
           </div>
        </div>
    )
 }
 export default TtileCards;