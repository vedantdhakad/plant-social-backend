import React, { useEffect } from "react";

export default function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onClose, 2500);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;
  return (
    <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded shadow-lg text-white text-base font-semibold transition-all duration-300 animate-fade-in ${type === "error" ? "bg-red-500" : "bg-green-600"}`}
      style={{ minWidth: 200 }}>
      {message}
    </div>
  );
}

// Add this to your global CSS or Tailwind config:
// @keyframes fade-in { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: none; } }
// .animate-fade-in { animation: fade-in 0.3s ease; } 