import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Posts from "./pages/Posts";
import Comments from "./pages/Comments";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow p-4 flex gap-4">
          <Link to="/" className="font-bold text-green-600">Plant Social</Link>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
          <Link to="/posts">Posts</Link>
          <Link to="/comments">Comments</Link>
        </nav>
        <div className="p-4 max-w-2xl mx-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/posts" />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/comments" element={<Comments />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
