import React,{useState,useEffect} from "react";
import {useNavigate} from "react-router-dom";

function AppDashboard(){
    const sendData = async (user, app, time) => {
  await fetch("http://127.0.0.1:5000/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user,
      app,
      time
    })
  });
};

const navigate = useNavigate();
const userType = localStorage.getItem("currentUser") || "child";
const parentPassword = "heyy";

// ===========================
// 📅 AUTO DAILY RESET LOGIC
// ===========================
let today = new Date().toLocaleDateString();
let lastReset = localStorage.getItem("lastResetDate");

if(lastReset !== today){
let trackerData = JSON.parse(localStorage.getItem("trackerData")) || {
child:{appUsage:{},warnings:0},
teenager:{appUsage:{},warnings:0},
adult:{appUsage:{},warnings:0}
};

trackerData.child.appUsage = {};
trackerData.child.warnings = 0;
trackerData.teenager.appUsage = {};
trackerData.teenager.warnings = 0;
trackerData.adult.appUsage = {};
trackerData.adult.warnings = 0;

localStorage.setItem("trackerData",JSON.stringify(trackerData));
localStorage.setItem("lastResetDate",today);
}

const [time,setTime] = useState(new Date().toLocaleTimeString());
const [date,setDate] = useState(new Date().toLocaleDateString());
const [search,setSearch] = useState("");
const [videoId,setVideoId] = useState(null);

// TIME
useEffect(()=>{
const timer=setInterval(()=>{
setTime(new Date().toLocaleTimeString());
setDate(new Date().toLocaleDateString());
},1000);
return ()=>clearInterval(timer);
},[]);

// STORAGE
let trackerData=JSON.parse(localStorage.getItem("trackerData"))||{
child:{appUsage:{},warnings:0},
teenager:{appUsage:{},warnings:0},
adult:{appUsage:{},warnings:0}
};


// =====================
// APP TYPES (UPDATED)
// =====================
const games=[
"Candy Crush",
"PUBG",
"Free Fire",
"Temple Run",
"Subway Surfers"
];
const social=[
"Instagram",
"Twitter",
"Spotify",
"Netflix"
];
const shopping=[
"Amazon",
"Flipkart",
"Myntra",
"Ajio"
];
const payments=[
"Paytm",
"PhonePe",
"Google Pay"
];
const study=[
"Google Classroom",
"Byjus",
"Coursera",
"Udemy",
"Khan Academy"
];
const utility=[
"Chrome",
"Gmail",
"WhatsApp"
];
const youtube=[
"YouTube"
];

// =====================
// LINKS (UPDATED)
// =====================
const appLinks={
"YouTube":"https://www.youtube.com",
"Amazon":"https://www.amazon.in",
"Flipkart":"https://www.flipkart.com",
"Myntra":"https://www.myntra.com",
"Ajio":"https://www.ajio.com",
"Paytm":"https://paytm.com",
"PhonePe":"https://www.phonepe.com",
"Google Pay":"https://pay.google.com",
"Netflix":"https://www.netflix.com",
"Instagram":"https://www.instagram.com",
"Twitter":"https://twitter.com",
"WhatsApp":"https://web.whatsapp.com",
"Spotify":"https://open.spotify.com",
"PUBG":"https://www.battlegroundsmobileindia.com",
"Temple Run":"https://poki.com/en/g/temple-run-2",
"Candy Crush":"https://king.com/game/candycrush",
"Subway Surfers":"https://poki.com/en/g/subway-surfers",
"Free Fire":"https://ff.garena.com",
"Google Classroom":"https://classroom.google.com",
"Byjus":"https://byjus.com",
"Coursera":"https://www.coursera.org",
"Udemy":"https://www.udemy.com",
"Khan Academy":"https://www.khanacademy.org",
"Chrome":"https://www.google.com",
"Gmail":"https://mail.google.com"
};

// =====================
// TIME LIMIT
// =====================
const getLimit=(app)=>{
if(userType==="adult") return 9999;

if(userType==="child"){
if(games.includes(app)) return 60;
if(youtube.includes(app)) return 60;
if(study.includes(app)) return 60;
if(utility.includes(app)) return 60;
return 0;
}

if(userType==="teenager"){
if(games.includes(app)) return 60;
if(youtube.includes(app)) return 60;
if(shopping.includes(app)) return 60;
if(payments.includes(app)) return 60;
if(utility.includes(app)) return 60;
if(study.includes(app)) return 60;
}

return 0;
};

// =====================
// OPEN APP
// =====================
const openApp=(app)=>{

if(!trackerData[userType]){
trackerData[userType] = {appUsage:{},warnings:0};
}

if(!trackerData[userType].appUsage[app]){
trackerData[userType].appUsage[app]={daily:0};
}

let used=trackerData[userType].appUsage[app].daily;
let limit=getLimit(app);

// 🚫 RESTRICTED
if(limit===0){
trackerData[userType].warnings+=1;
localStorage.setItem("trackerData",JSON.stringify(trackerData));

if(trackerData[userType].warnings<=3){
alert("⚠ Warning "+trackerData[userType].warnings+": This app is restricted!");
}else{
alert("📢 Parent Notified!");
navigate("/parentdashboard");
}
return;
}

// ⛔ TIME EXCEEDED
if(used>=limit){
alert("⛔ Time Limit Exceeded for "+app);
return;
}

// CONFIRM
let confirmOpen=window.confirm(
"Limit: "+limit+" mins\nUsed: "+used+" mins\nContinue?"
);
if(!confirmOpen) return;

// 🎥 YOUTUBE
if(app==="YouTube"){

if(!trackerData[userType].appUsage[app]){
trackerData[userType].appUsage[app] = { daily: 0 };
}

// ✅ ADD THIS LOGGING PART
let attempts = JSON.parse(localStorage.getItem("youtubeAttempts")) || [];

attempts.push({
user:userType,
title:"youtube opened",
time:new Date().toLocaleString(),
type:"Access"
});

localStorage.setItem("youtubeAttempts", JSON.stringify(attempts));

// EXISTING LOGIC (unchanged)
trackerData[userType].appUsage[app].daily += 5;
localStorage.setItem("trackerData", JSON.stringify(trackerData));
sendData(userType, app, 5);
navigate("/youtube");
return;
}

// 💰 PAYMENT
if(payments.includes(app)){
let amount=prompt("Enter Payment Amount");
let purpose=prompt("Enter Purpose (fees / Others)");
amount=parseInt(amount);

if(userType!=="adult"){
if(purpose?.toLowerCase()!=="fees" && amount>200){
trackerData[userType].warnings+=1;
localStorage.setItem("trackerData",JSON.stringify(trackerData));

if(trackerData[userType].warnings<=3){
alert("⚠ Payment limited to ₹200 for non-educational use!");
}else{
alert("📢 Parent Notified!");
navigate("/parentdashboard");
}
return;
}
}

trackerData[userType].appUsage[app].daily+=5;
localStorage.setItem("trackerData",JSON.stringify(trackerData));
sendData(userType, app, 5);
window.open(appLinks[app],"_blank");
return;
}


// NORMAL APPS
trackerData[userType].appUsage[app].daily+=5;
localStorage.setItem("trackerData",JSON.stringify(trackerData));
sendData(userType, app, 5);
window.open(appLinks[app],"_blank");
};

// =====================
// GOOGLE SEARCH (same)
// =====================
const searchGoogle = () => {

if(!search){
alert("Enter something to search");
return;
}

const studyKeywords = [
"tutorial","lecture","course","class","lesson","education",
"python","java","dbms","machine learning","ai","data science",
"math","science","coding","programming","engineering"
];

const blockedKeywords = [
"movie","movies","song","songs","music","trailer","comedy","funny",
"film","series","episode","reaction","shortfilm","vlog","gaming",
"gameplay","prank","roast","meme","dance","lyrics","remix",
"cartoon","anime","webseries","netflix","hotstar","prime",
"cinema","romantic","horror","thriller","fight","kpop","concert"
];

const suspiciousKeywords = [
"top","best","viral","trending","news","review","live","update"
];

const text = search.toLowerCase();

// 📌 Get user
const user = localStorage.getItem("currentUser") || "child";
let attempts = JSON.parse(localStorage.getItem("youtubeAttempts")) || [];

// ❌ BLOCKED
if(blockedKeywords.some(word => text.includes(word))){

attempts.push({
user,
title: search,
time: new Date().toLocaleString(),
type: "Blocked Google Search"
});

localStorage.setItem("youtubeAttempts", JSON.stringify(attempts));

alert("❌ This search is not allowed!");
return;
}

// ⚠ SUSPICIOUS
if(suspiciousKeywords.some(word => text.includes(word))){

attempts.push({
user,
title: search,
time: new Date().toLocaleString(),
type: "Suspicious Google Search"
});

localStorage.setItem("youtubeAttempts", JSON.stringify(attempts));
}

// ✅ STUDY CHECK
const isStudy = studyKeywords.some(word => text.includes(word));

if(!isStudy){
alert("⚠ Only educational searches allowed!");
return;
}

// 🌐 Open filtered Google (educational bias)
window.open(
`https://www.google.com/search?q=${search}+tutorial+education+lecture`,
"_blank"
);
};

// =====================
// APPS 
// =====================
const apps=[

{name:"YouTube",icon:"📺",color:"#43aa8b"},
{name:"Candy Crush",icon:"🍬",color:"#4dabf7"},
{name:"Instagram",icon:"📸",color:"#f06595"},
{name:"Amazon",icon:"🛒",color:"#f59f00"},
{name:"PUBG",icon:"🎮",color:"#3b82f6"},

{name:"Google Classroom",icon:"🏫",color:"#2ecc71"},
{name:"Twitter",icon:"🐦",color:"#74c0fc"},
{name:"Flipkart",icon:"📦",color:"#ffa94d"},
{name:"Temple Run",icon:"🏃",color:"#4895ef"},
{name:"Netflix",icon:"🎬",color:"#d6336c"},

{name:"Byjus",icon:"📘",color:"#2f9e44"},
{name:"WhatsApp",icon:"💬",color:"#51cf66"},
{name:"Myntra",icon:"👗",color:"#ff922b"},
{name:"Free Fire",icon:"🔥",color:"#4361ee"},
{name:"Spotify",icon:"🎧",color:"#38d9a9"},

{name:"Coursera",icon:"🎓",color:"#40916c"},
{name:"Ajio",icon:"🛍️",color:"#e8590c"},
{name:"Subway Surfers",icon:"🚇",color:"#1d4ed8"},
{name:"Udemy",icon:"📖",color:"#2b9348"},
{name:"PhonePe",icon:"💳",color:"#0ca678"},

{name:"Khan Academy",icon:"📗",color:"#1b5e20"},
{name:"Paytm",icon:"💰",color:"#15aabf"},
{name:"Google Pay",icon:"💵",color:"#0c8599"},
{name:"Chrome",icon:"🌍",color:"#868e96"},
{name:"Gmail",icon:"📧",color:"#495057"}

];
// =====================
// UI
// =====================
return(
<div style={{
background:"linear-gradient(135deg,#d8f1ff,#b6e0ff)",
minHeight:"100vh",
padding:"30px"
}}>
<div style={{
maxWidth:"900px",
margin:"auto",
background:"#f4f6f9",
borderRadius:"20px",
padding:"30px",
boxShadow:"0 10px 25px rgba(0,0,0,0.1)"
}}>

<h1 style={{
textAlign:"center",
color:"#090909",
fontWeight:"bold"
}}>
Smart Parent Control
</h1>

<h3 style={{
textAlign:"center",
color:"#121212"
}}>
{time} | {date}
</h3>

<div style={{textAlign:"center",marginTop:"20px"}}>
<input
placeholder="🔍 Search Google"
value={search}
onChange={(e)=>setSearch(e.target.value)}
style={{
width:"60%",
padding:"12px",
borderRadius:"25px",
border:"1px solid #151515",
outline:"none"
}}
/>

<button 
onClick={searchGoogle} 
style={{
marginLeft:"10px",
padding:"10px 18px",
borderRadius:"25px",
border:"none",
background:"#3498db",
color:"white",
cursor:"pointer"
}}>
Search
</button>
</div>

<div style={{
display:"grid",
gridTemplateColumns:"repeat(5, 1fr)",
gap:"25px",
marginTop:"40px"
}}>
{apps.map((app)=>(
<div 
key={app.name}
onClick={()=>openApp(app.name)}
style={{
background:app.color,
padding:"18px",
borderRadius:"15px",
textAlign:"center",
cursor:"pointer",
color:"white",
fontWeight:"500",
boxShadow:"0 5px 10px rgba(0,0,0,0.15)",
transition:"0.2s"
}}
onMouseEnter={(e)=>e.currentTarget.style.transform="scale(1.05)"}
onMouseLeave={(e)=>e.currentTarget.style.transform="scale(1)"}
>
<div style={{fontSize:"34px"}}>{app.icon}</div>
<div>{app.name}</div>
</div>
))}
</div>

<div style={{textAlign:"center",marginTop:"20px"}}>

<button
onClick={()=>{
let pass = prompt("Enter Parent Password");

if(pass === parentPassword){
localStorage.removeItem("trackerData");
localStorage.removeItem("youtubeAttempts");
alert("✅ Data Reset Successful!");
window.location.reload();
}else{
alert("❌ Wrong Password!");
}
}}
style={{
padding:"12px 25px",
borderRadius:"25px",
background:"#e74c3c",
color:"white",
border:"none",
marginRight:"10px",
cursor:"pointer"
}}>
🔄 Reset Data
</button>

<button
onClick={()=>navigate("/parentdashboard")}
style={{
padding:"12px 25px",
borderRadius:"25px",
background:"#2ecc71",
color:"white",
border:"none",
cursor:"pointer"
}}>
📊 Parent Dashboard
</button>

</div>

</div>
</div>
);
}

export default AppDashboard;