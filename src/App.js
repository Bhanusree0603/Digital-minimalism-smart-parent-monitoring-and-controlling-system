import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import CreatePassword from "./pages/CreatePassword";
import Login from "./pages/Login";
import UserType from "./pages/UserType";
import AppsPage from "./pages/AppsPage";
import ParentDashboard from "./pages/ParentDashboard";
import YoutubePlayer from "./YoutubePlayer";

function App() {

  const [passwordExists, setPasswordExists] = useState(false);

  useEffect(() => {
    const savedPassword = localStorage.getItem("userPassword");
    setPasswordExists(!!savedPassword);
  }, []);

  return (
    <Router>
      <Routes>

        <Route
          path="/"
          element={
            passwordExists ? <Navigate to="/login" /> : <Navigate to="/create" />
          }
        />

        <Route path="/create" element={<CreatePassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/usertype" element={<UserType />} />
        <Route path="/apps" element={<AppsPage />} />
        <Route path="/parentdashboard" element={<ParentDashboard />} />
        <Route path="/youtube" element={<YoutubePlayer/>}/>

      </Routes>
    </Router>
  );
}

export default App;