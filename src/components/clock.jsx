import { useEffect, useState } from "react";

function Clock(color){
    const [time,setTime]=useState(0);
    console.log(color);
    useEffect(()=>{
        setInterval(()=>{
            setTime(new Date().toLocaleTimeString())
        })
    },1000)
    return(
        <div>
            <h1>Clock</h1>
            <h1 style={{backgroundColor:'black',color:color.color,width:"130px"}}>{time}</h1>
        </div>
    )
}
export default Clock;