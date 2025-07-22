import React from "react";
import { Link } from "react-router-dom";
import NotificationBell from "../components/NotificationBell";

export default function MainLayout({ children, user, onLogout }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex flex-col font-sans">
      <header className="bg-white shadow flex items-center justify-between px-6 py-4 sticky top-0 z-40">
        <Link to="/" className="text-2xl font-bold text-green-700 tracking-tight">🌱 Plant Social</Link>
        <nav className="flex gap-4 items-center text-base">
          <Link to="/posts" className="hover:text-green-700 font-medium transition">Posts</Link>
          <Link to="/comments" className="hover:text-green-700 font-medium transition">Comments</Link>
          <Link to="/plants" className="hover:text-green-700 font-medium transition">Plant Database</Link>
          <Link to="/myplants" className="hover:text-green-700 font-medium transition">My Plants</Link>
          <Link to="/tips" className="hover:text-green-700 font-medium transition">Tips</Link>
          <Link to="/scan" className="hover:text-green-700 font-medium transition">Scan Plant</Link>
          <NotificationBell />
          {user ? (
            <>
              <span className="text-green-800 font-semibold">Hi, {user.name}</span>
              <button onClick={onLogout} className="ml-2 px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700 transition">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-green-700">Login</Link>
              <Link to="/register" className="hover:text-green-700">Register</Link>
            </>
          )}
        </nav>
      </header>
      <main className="flex-1 flex flex-col items-center justify-start py-8 px-2">
        <div className="w-full max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto">{children}</div>
      </main>
      <footer className="bg-white text-center py-4 text-gray-400 text-xs border-t flex flex-col items-center gap-2">
        <div className="flex items-center gap-2 justify-center mb-1">
          <img src="/logo.svg" alt="Plant Social Logo" className="w-6 h-6 inline-block" />
          <span className="text-green-700 font-bold">Plant Social</span>
        </div>
        <div>
          <a href="/about" className="hover:underline text-green-700 mx-2">About</a>
          <a href="mailto:contact@plantsocial.com" className="hover:underline text-green-700 mx-2">Contact</a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="hover:underline text-green-700 mx-2">Twitter</a>
        </div>
        <div>&copy; {new Date().getFullYear()} Plant Social. All rights reserved.</div>
      </footer>
    </div>
  );
} 