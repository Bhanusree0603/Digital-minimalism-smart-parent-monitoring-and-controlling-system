import React from "react";
import {useNavigate} from "react-router-dom";

function UserType(){

const navigate = useNavigate();

const selectUser = (type)=>{

// Child → no password
if(type === "child"){
localStorage.setItem("currentUser",type);
navigate("/apps");
return;
}

// Ask password
let password = prompt("Enter Password");

// Teenager password
if(type === "teenager" && password === "teenager"){
localStorage.setItem("currentUser",type);
navigate("/apps");
return;
}

// Parent password
if(type === "adult" && password === "parent"){
localStorage.setItem("currentUser",type);
navigate("/apps");
return;
}

// Wrong password
alert("Incorrect Password");

};

const handleHover = (e,color)=>{
e.currentTarget.style.transform="translateY(-12px) scale(1.05)";
e.currentTarget.style.boxShadow=`0 20px 40px ${color}`;
};

const handleLeave = (e)=>{
e.currentTarget.style.transform="translateY(0px)";
e.currentTarget.style.boxShadow="0 8px 20px rgba(0,0,0,0.2)";
};

return(

<div style={{

background:"linear-gradient(135deg,#d8f1ff,#b6e0ff)",
height:"100vh",
display:"flex",
justifyContent:"center",
alignItems:"center",
fontFamily:"Arial"

}}>

<div style={{

background:"rgba(255,255,255,0.9)",
padding:"60px",
borderRadius:"25px",
textAlign:"center",
width:"750px",
boxShadow:"0 10px 30px rgba(0,0,0,0.2)"

}}>

<h2 style={{color:"#0e0e0e",fontSize:"40px"}}>
Select User
</h2>

<p style={{color:"#666",marginBottom:"40px"}}>
Choose who is using the device
</p>

<div style={{

display:"flex",
justifyContent:"space-around",
alignItems:"center"

}}>

<button
style={{...userButton,background:"#6bcB77"}}
onMouseEnter={(e)=>handleHover(e,"rgba(107,203,119,0.7)")}
onMouseLeave={handleLeave}
onClick={()=>selectUser("child")}
>
<div style={{fontSize:"50px"}}>👶</div>
Child
</button>

<button
style={{...userButton,background:"#4d96ff"}}
onMouseEnter={(e)=>handleHover(e,"rgba(77,150,255,0.7)")}
onMouseLeave={handleLeave}
onClick={()=>selectUser("teenager")}
>
<div style={{fontSize:"50px"}}>🧑</div>
Teenager
</button>

<button
style={{...userButton,background:"#ff6b6b"}}
onMouseEnter={(e)=>handleHover(e,"rgba(255,107,107,0.7)")}
onMouseLeave={handleLeave}
onClick={()=>selectUser("adult")}
>
<div style={{fontSize:"50px"}}>👨</div>
Parent
</button>

</div>

</div>

</div>

);

}

const userButton={

width:"170px",
height:"170px",
borderRadius:"50%",
border:"none",
fontSize:"20px",
color:"white",
cursor:"pointer",
display:"flex",
flexDirection:"column",
alignItems:"center",
justifyContent:"center",
gap:"10px",
boxShadow:"0 8px 20px rgba(0,0,0,0.2)",
transition:"all 0.3s ease"

};

export default UserType;