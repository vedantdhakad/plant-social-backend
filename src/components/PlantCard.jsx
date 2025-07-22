import React from "react";

export default function PlantCard({ plant, onClick }) {
  return (
    <div
      className="bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer flex gap-4 p-4 mb-4"
      onClick={onClick}
    >
      <img
        src={plant.imageUrl}
        alt={plant.commonName}
        className="w-20 h-20 object-cover rounded"
      />
      <div className="flex-1">
        <h3 className="font-bold text-lg text-green-700">{plant.commonName}</h3>
        <div className="text-xs text-gray-500 italic mb-1">{plant.scientificName}</div>
        <div className="text-gray-700 text-sm line-clamp-2">{plant.description}</div>
      </div>
    </div>
  );
} 