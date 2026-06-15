import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function YoutubePlayer(){

const navigate = useNavigate();

const API_KEY = "AIzaSyDtD3G5ebe1ok67IR6sPSto-bxJwndYrZI"; // 🔐 replace with your key

const [search,setSearch] = useState("");
const [videos,setVideos] = useState([]);
const [videoId,setVideoId] = useState(null);

const searchVideos = async () => {

if(!search){
alert("Please enter a study topic");
return;
}

// 🚫 Block entertainment searches
const blockedWords = [
"movie","movies","song","songs","music","trailer","comedy","funny",
"film","series","episode","reaction","shortfilm","vlog","gaming",
"gameplay","prank","roast","meme","dance","lyrics","remix",
"cartoon","anime","webseries","netflix","hotstar","prime",
"cinema","romantic","horror","thriller","fight scene","shows","show"
];

if(blockedWords.some(word => search.toLowerCase().includes(word))){
alert("❌ Entertainment content not allowed");
return;
}

try{

const query = search + " tutorial";

const response = await fetch(
`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=25&q=${query}&key=${API_KEY}`
);
const data = await response.json();

console.log("YouTube Response:", data);

if(data.error){
  alert("API Error: " + data.error.message);
  return;
}

setVideos(data.items || []);
}catch(error){

console.error(error);
alert("Failed to load videos");

}

};

return(

<div style={{
padding:"40px",
textAlign:"center",
background:"#d8f1ff",
minHeight:"100vh"
}}>

<h1>Educational Video Hub</h1>

<p>Search educational topics only</p>

{/* Search Box */}

<input
placeholder="Search study topic"
value={search}
onChange={(e)=>setSearch(e.target.value)}
style={{
padding:"12px",
width:"320px",
borderRadius:"12px",
border:"1px solid #ccc"
}}
/>

<button
onClick={searchVideos}
style={{
marginLeft:"10px",
padding:"12px 20px",
borderRadius:"12px",
border:"none",
background:"#4d96ff",
color:"white",
cursor:"pointer"
}}
>
Search
</button>

{/* Back Button */}

<button
onClick={()=>navigate("/apps")}
style={{
marginLeft:"10px",
padding:"12px 20px",
borderRadius:"12px",
border:"none",
background:"#ff6b6b",
color:"white",
cursor:"pointer"
}}
>
⬅ Back to Apps
</button>

<br/><br/>

{/* Video Player */}

{videoId && (

<div style={{marginBottom:"30px"}}>

<iframe
width="750"
height="420"
src={`https://www.youtube.com/embed/${videoId}`}
title="Educational Video"
frameBorder="0"
allowFullScreen
></iframe>

<br/><br/>

<button
onClick={()=>setVideoId(null)}
style={{
padding:"10px 20px",
borderRadius:"20px",
border:"none",
background:"#ff6b6b",
color:"white",
cursor:"pointer"
}}
>
Back to Video List
</button>

</div>

)}

{/* Video Grid */}

<div style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))",
gap:"20px",
maxWidth:"1200px",
margin:"auto"
}}>

{/* ✅ SAFE MAP */}

{Array.isArray(videos) && videos.length > 0 ? (

videos.map((video)=>{

const title = video.snippet.title.toLowerCase();
const isShort = title.includes("short");

return(

<div
key={video.id.videoId}
onClick={()=>setVideoId(video.id.videoId)}
style={{
cursor:"pointer",
background:"white",
padding:"10px",
borderRadius:"12px",
boxShadow:"0 4px 15px rgba(0,0,0,0.1)"
}}
>
<img
  src={video.snippet.thumbnails.medium.url}
  alt="YouTube thumbnail"
  width="100%"
  style={{ borderRadius: "10px" }}
/>

<h4 style={{fontSize:"14px"}}>
{video.snippet.title}
</h4>

<p style={{fontSize:"12px",color:"#555"}}>
{video.snippet.channelTitle}
</p>

{isShort && (
<p style={{
color:"red",
fontSize:"12px",
fontWeight:"bold"
}}>
Short Video
</p>
)}

</div>

);

})

) : (

<p style={{gridColumn:"1/-1"}}>No videos found</p>

)}

</div>

</div>

);

}

export default YoutubePlayer; 