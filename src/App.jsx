import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Posts from "./pages/Posts";
import Comments from "./pages/Comments";
import MainLayout from "./layouts/MainLayout";
import PlantDatabase from "./pages/PlantDatabase";
import MyPlants from "./pages/MyPlants";
import ScanPlant from "./pages/ScanPlant";
import Tips from "./pages/Tips";
import { ToastProvider } from "./components/ToastProvider";

function AppRoutes({ user, setUser }) {
  const navigate = useNavigate();

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <MainLayout user={user} onLogout={handleLogout}>
      <Routes>
        <Route path="/" element={<Navigate to="/posts" />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/posts" element={<Posts user={user} />} />
        <Route path="/comments" element={<Comments user={user} />} />
        <Route path="/plants" element={<PlantDatabase />} />
        <Route path="/tips" element={<Tips />} />
        <Route path="/myplants" element={<MyPlants />} />
        <Route path="/scan" element={<ScanPlant />} />
      </Routes>
    </MainLayout>
  );
}

function App() {
  const [user, setUser] = useState(null);

  // On mount, check for token and fetch user info if needed
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Optionally decode token or fetch user info from backend
      // For now, just set a dummy user for UI purposes
      setUser({ name: "User" });
    }
  }, []);

  return (
    <ToastProvider>
      <Router>
        <AppRoutes user={user} setUser={setUser} />
      </Router>
    </ToastProvider>
  );
}

export default App; 