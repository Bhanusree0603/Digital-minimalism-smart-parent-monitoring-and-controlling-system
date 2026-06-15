import React,{useState,useEffect} from "react";
import {useNavigate} from "react-router-dom";
// Daily Quotes
const quotes=[
"Small steps every day lead to big success.",
"Focus on learning, not just scrolling.",
"Technology should help you grow.",
"Use your time wisely, it never comes back.",
"Discipline today creates freedom tomorrow.",
"Knowledge is the best investment you can make.",
"Control your screen, don't let it control you.",
"Great achievements start with small habits."
];
function Login(){

const navigate = useNavigate();
const [pin,setPin] = useState("");
const [time,setTime] = useState(new Date().toLocaleTimeString());
const [date,setDate] = useState(new Date().toLocaleDateString());
const [quote,setQuote] = useState("");

// Clock
useEffect(() => {
  const timer = setInterval(() => {
    setTime(new Date().toLocaleTimeString());
    setDate(new Date().toLocaleDateString());
  }, 1000);

  return () => clearInterval(timer);
}, []);

// Random quote
useEffect(() => {
  const randomQuote =
    quotes[Math.floor(Math.random() * quotes.length)];

  setQuote(randomQuote);
}, []);
const pressNumber = (num)=>{
if(pin.length < 4){
setPin(pin+num);
}
};

const clearPin = ()=>{
setPin("");
};

const unlock = () => {
const savedPassword = localStorage.getItem("userPassword");

if (pin === savedPassword) {
navigate("/usertype");
} else {
alert("Wrong PIN");
setPin("");
}
};

return(

<div style={{

height:"100vh",
background:"linear-gradient(135deg,#d8f1ff,#b6e0ff)",
display:"flex",
alignItems:"center",
justifyContent:"center",
fontFamily:"Arial"

}}>

<div style={{

background:"rgba(255,255,255,0.85)",
padding:"40px",
borderRadius:"20px",
boxShadow:"0 10px 30px rgba(0,0,0,0.2)",
textAlign:"center",
width:"320px"

}}>

<h1 style={{color:"#333"}}>{time}</h1>
<h4 style={{color:"#555"}}>{date}</h4>

{/* Quote Section */}

<div style={{
marginTop:"10px",
marginBottom:"20px",
fontStyle:"italic",
color:"#444",
fontSize:"14px"
}}>
" {quote} "
</div>

{/* PIN DOTS */}

<div style={{
display:"flex",
justifyContent:"center"
}}>

{
[0,1,2,3].map((i)=>(
<div key={i} style={{
width:"20px",
height:"20px",
margin:"10px",
borderRadius:"50%",
background:i<pin.length?"#4facfe":"transparent",
border:"2px solid #4facfe"
}}>
</div>
))
}

</div>

<br/>

{/* NUMBER PAD */}

<div style={{
display:"grid",
gridTemplateColumns:"repeat(3,80px)",
gap:"15px",
justifyContent:"center"
}}>

{
[1,2,3,4,5,6,7,8,9].map((num)=>(
<button
key={num}
onClick={()=>pressNumber(num)}
style={{
padding:"20px",
borderRadius:"50%",
fontSize:"20px",
background:"#a3c7e6",
color:"black",
border:"none",
cursor:"pointer",
boxShadow:"0 5px 10px rgba(0,0,0,0.2)"
}}
>
{num}
</button>
))
}

<button
onClick={clearPin}
style={{
padding:"20px",
borderRadius:"50%",
background:"#e5969615",
border:"none",
color:"black",
cursor:"pointer"
}}
>
❌
</button>

<button
onClick={()=>pressNumber(0)}
style={{
padding:"20px",
borderRadius:"50%",
background:"#acceeb",
border:"none",
color:"black",
cursor:"pointer"
}}
>
0
</button>

<button
onClick={unlock}
style={{
padding:"20px",
borderRadius:"50%",
background:"#e8c5ac3e",
border:"none",
color:"white",
cursor:"pointer"
}}
>
🔓
</button>

</div>

</div>

</div>

);

}

export default Login;