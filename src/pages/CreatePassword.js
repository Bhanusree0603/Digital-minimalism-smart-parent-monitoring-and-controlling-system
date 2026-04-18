import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CreatePassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const savedPassword = localStorage.getItem("userPassword");
    if (savedPassword) {
      navigate("/login");
    }
  }, [navigate]);

  const createPassword = () => {

    if (password.length < 4) {
      alert("Password must be at least 4 characters");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    localStorage.setItem("userPassword", password);
    localStorage.setItem("resetPass", password);

    const trackerData = {
      child: { unlock: 0, warnings: 0, restricted: 0, usageTime: 0, appUsage: {} },
      teenager: { unlock: 0, warnings: 0, restricted: 0, usageTime: 0, appUsage: {} },
      adult: { unlock: 0, warnings: 0, restricted: 0, usageTime: 0, appUsage: {} }
    };

    localStorage.setItem("trackerData", JSON.stringify(trackerData));

    alert("✨ Setup Completed Successfully");

    navigate("/login");
  };

  const resetAllData = () => {

    const confirmReset = window.confirm(
      "⚠ Are you sure you want to delete all data?"
    );

    if (confirmReset) {
      localStorage.clear();
      alert("All Data Reset Successfully");
      window.location.reload();
    }

  };

  return (

    <div style={styles.container}>

      <div style={styles.card}>

        <h2 style={styles.title}>🔐 First Time Setup</h2>
        <div style={styles.stepBar}>
        <div style={styles.activeStep}>1</div>
        <div style={styles.line}></div>
        <div style={styles.step}>2</div>
        <div style={styles.line}></div>
        <div style={styles.step}>3</div>
        </div>

        <p style={styles.subtitle}>
          Create your secure parental password
        </p>

        <input
          type="password"
          placeholder="Create Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={styles.input}
        />

        <button
          onClick={createPassword}
          style={styles.createBtn}
          onMouseEnter={(e)=>e.target.style.transform="scale(1.05)"}
          onMouseLeave={(e)=>e.target.style.transform="scale(1)"}
        >
          Create Password
        </button>

        <button
          onClick={resetAllData}
          style={styles.resetBtn}
          onMouseEnter={(e)=>e.target.style.transform="scale(1.05)"}
          onMouseLeave={(e)=>e.target.style.transform="scale(1)"}
        >
          Reset All Data
        </button>

      </div>

    </div>

  );
}

const styles = {

  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg,#d8f1ff,#b6e0ff)",
    fontFamily: "Arial"
  },

  card: {
    background: "rgba(255,255,255,0.9)",
    padding: "50px",
    borderRadius: "25px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
    textAlign: "center",
    width: "340px",
    backdropFilter: "blur(8px)"
  },

  title: {
    marginBottom: "10px",
    color: "#333",
    fontSize: "26px"
  },

  subtitle: {
    fontSize: "14px",
    marginBottom: "25px",
    color: "#666"
  },

  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "12px",
    border: "1px solid #ddd",
    marginBottom: "15px",
    outline: "none",
    fontSize: "14px",
    transition: "0.3s"
  },

  createBtn: {
    width: "100%",
    padding: "12px",
    borderRadius: "25px",
    border: "none",
    background: "linear-gradient(135deg,#4facfe,#00f2fe)",
    color: "white",
    fontWeight: "bold",
    marginBottom: "12px",
    cursor: "pointer",
    transition: "0.3s"
  },

  resetBtn: {
    width: "100%",
    padding: "10px",
    borderRadius: "25px",
    border: "none",
    background: "#ff6b6b",
    color: "white",
    cursor: "pointer",
    transition: "0.3s"
  },
  stepBar:{
display:"flex",
alignItems:"center",
justifyContent:"center",
marginBottom:"20px"
},

step:{
width:"30px",
height:"30px",
borderRadius:"50%",
background:"#ddd",
display:"flex",
alignItems:"center",
justifyContent:"center",
fontWeight:"bold",
color:"#555"
},

activeStep:{
width:"30px",
height:"30px",
borderRadius:"50%",
background:"#4facfe",
display:"flex",
alignItems:"center",
justifyContent:"center",
fontWeight:"bold",
color:"white"
},

line:{
width:"40px",
height:"4px",
background:"#ddd"
}

};

export default CreatePassword;