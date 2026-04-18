import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
Chart as ChartJS,
CategoryScale,
LinearScale,
BarElement,
Title,
Tooltip,
Legend
} from "chart.js";

ChartJS.register(
CategoryScale,
LinearScale,
BarElement,
Title,
Tooltip,
Legend
);

function ParentDashboard(){

const [selectedUser,setSelectedUser]=useState("child");
const [appData,setAppData]=useState({});
const [warnings,setWarnings]=useState(0);
const [restricted,setRestricted]=useState(0);
const [showAttempts,setShowAttempts]=useState(false);
const [youtubeAttempts,setYoutubeAttempts]=useState([]);

// 📚 Categories
const studyApps=["Byjus","Google Classroom","Udemy","Coursera","Khan Academy"];
const entertainmentApps=["YouTube","Candy Crush","Instagram","Temple Run"];

useEffect(()=>{

let trackerData=JSON.parse(localStorage.getItem("trackerData"))||{};
let userData=trackerData[selectedUser]||{};

setAppData(userData.appUsage||{});
setWarnings(userData.warnings||0);
setRestricted(userData.restricted||0);

// 🎥 Get YouTube attempts (filter by user)
let attempts = JSON.parse(localStorage.getItem("youtubeAttempts")) || [];
const filteredAttempts = attempts.filter(a => a.user === selectedUser);
setYoutubeAttempts(filteredAttempts);

},[selectedUser]);

let apps = Object.keys(appData || {});
if(apps.length===0){
apps=["No Data"];
}

// 📊 Calculations
let totalScreenTime=apps.reduce((sum,app)=>sum+(appData[app]?.daily||0),0);

let mostUsedApp=apps.reduce((a,b)=>
(appData[a]?.daily||0)>(appData[b]?.daily||0)?a:b
,"None");

let studyTime=0;
let entertainmentTime=0;

apps.forEach(app=>{
if(studyApps.includes(app))
studyTime+=appData[app]?.daily||0;
else if(entertainmentApps.includes(app))
entertainmentTime+=appData[app]?.daily||0;
});

let alertMsg=totalScreenTime>120?"⚠ Time Limit Exceeded":"Safe Usage";

// 📊 DAILY GRAPH ONLY
const dailyData={
labels:apps,
datasets:[{
label:"Daily Usage (mins)",
data:apps.map(app=>appData[app]?.daily||0),
backgroundColor:[
"#ff6b6b",
"#ffd93d",
"#6bcB77",
"#4d96ff",
"#a66cff",
"#ff9f1c",
"#00c2a8",
"#f15bb5"
],
borderRadius:8
}]
};

return(

<div style={{
background:"linear-gradient(135deg,#d8f1ff,#b6e0ff)",
minHeight:"100vh",
padding:"30px",
fontFamily:"Arial"
}}>

<div style={{
maxWidth:"1100px",
margin:"auto",
background:"rgba(255,255,255,0.85)",
borderRadius:"20px",
padding:"30px",
boxShadow:"0 10px 35px rgba(0,0,0,0.2)"
}}>

<h1 style={{
textAlign:"center",
color:"#1a1a1a",
letterSpacing:"1px"
}}>
🔐 Smart Parent Monitoring Dashboard
</h1>

{/* 👶 USER SELECT */}
<div style={{textAlign:"center",marginBottom:"25px"}}>

<select
value={selectedUser}
onChange={(e)=>setSelectedUser(e.target.value)}
style={{
padding:"10px",
borderRadius:"10px",
fontSize:"15px",
border:"1px solid #ccc"
}}
>
<option value="child">Child</option>
<option value="teenager">Teenager</option>
</select>

</div>

{/* INFO CARDS */}

<div style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",
gap:"18px",
marginBottom:"30px"
}}>

<div style={{...card,background:"#d0ebff"}}>📱 Total Screen Time<br/>{totalScreenTime} mins</div>
<div style={{...card,background:"#ffd6e0"}}>🔥 Most Used App<br/>{mostUsedApp}</div>
<div style={{...card,background:"#d3f9d8"}}>📚 Study Time<br/>{studyTime} mins</div>
<div style={{...card,background:"#fff3bf"}}>🎮 Entertainment<br/>{entertainmentTime} mins</div>
<div style={{...card,background:"#ffe3e3"}}>⚠ Warnings<br/>{warnings}</div>
<div style={{...card,background:"#e5dbff"}}>🚫 Restricted Apps<br/>{restricted}</div>
<div style={{...card,background:"#c3fae8"}}>{alertMsg}</div>

</div>

{/* 🎥 YOUTUBE ATTEMPTS */}

<div style={{textAlign:"center",marginBottom:"25px"}}>

<button
onClick={()=>setShowAttempts(true)}
style={{
padding:"12px 25px",
background:"linear-gradient(135deg,#4facfe,#00f2fe)",
border:"none",
borderRadius:"25px",
color:"white",
fontSize:"15px",
cursor:"pointer"
}}
>
🎥 View YouTube Activity
</button>

</div>

{/* 📊 GRAPH */}

<h3 style={{textAlign:"center"}}>Daily Usage</h3>
<Bar data={dailyData}/>

</div>

{/* POPUP */}

{showAttempts && (

<div style={{
position:"fixed",
top:0,
left:0,
width:"100%",
height:"100%",
background:"rgba(0,0,0,0.5)",
display:"flex",
alignItems:"center",
justifyContent:"center"
}}>

<div style={{
background:"white",
color:"black",
padding:"25px",
borderRadius:"15px",
width:"400px",
maxHeight:"400px",
overflow:"auto"
}}>

<h3>YouTube Activity</h3>

{youtubeAttempts.length===0 && <p>No activity found</p>}

{youtubeAttempts.map((item,i)=>(

<div key={i} style={{
borderBottom:"1px solid #ddd",
padding:"10px"
}}>

<b>User:</b> {item.user}<br/>
<b>Searched/Watched:</b> {item.title}<br/>
<b>Type:</b> {item.type}<br/>
<b>Time:</b> {item.time}

</div>

))}

<button
onClick={()=>setShowAttempts(false)}
style={{
marginTop:"15px",
padding:"10px 20px",
border:"none",
background:"#4facfe",
color:"white",
borderRadius:"10px",
cursor:"pointer"
}}
>
Close
</button>

</div>

</div>

)}

</div>

);
}

const card={
padding:"20px",
borderRadius:"15px",
textAlign:"center",
fontWeight:"bold",
fontSize:"15px",
boxShadow:"0 5px 15px rgba(0,0,0,0.15)"
};

export default ParentDashboard;