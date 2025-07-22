import React from "react";

export default function Badge({ badge }) {
  return (
    <div className="flex items-center gap-3 bg-green-50 border-l-4 border-green-400 p-2 rounded mb-2">
      <img src={badge.iconUrl} alt={badge.name} className="w-8 h-8" />
      <div>
        <div className="font-semibold text-green-700">{badge.name}</div>
        <div className="text-xs text-gray-600">{badge.description}</div>
      </div>
    </div>
  );
} 