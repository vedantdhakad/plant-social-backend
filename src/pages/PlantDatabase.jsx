import React, { useState } from "react";
import axios from "axios";
import PlantCard from "../components/PlantCard";

export default function PlantDatabase() {
  const [search, setSearch] = useState("");
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(null);

  const handleSearch = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.get("/api/plants", { params: { search } });
      setPlants(res.data);
    } catch (err) {
      setPlants([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Plant Database</h2>
      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          className="border p-2 rounded flex-1"
          placeholder="Search by common or scientific name..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded font-semibold" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>
      <div>
        {plants.length === 0 && !loading && <div className="text-gray-400 text-center">No plants found. Try searching!</div>}
        {plants.map(plant => (
          <PlantCard key={plant.id} plant={plant} onClick={() => setSelectedPlant(plant)} />
        ))}
      </div>
      {/* Detail modal placeholder */}
      {selectedPlant && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl"
              onClick={() => setSelectedPlant(null)}
            >
              &times;
            </button>
            <img src={selectedPlant.imageUrl} alt={selectedPlant.commonName} className="w-32 h-32 object-cover rounded mx-auto mb-4" />
            <h3 className="text-xl font-bold text-green-700 mb-1">{selectedPlant.commonName}</h3>
            <div className="text-xs text-gray-500 italic mb-2">{selectedPlant.scientificName}</div>
            <div className="mb-2 text-gray-700">{selectedPlant.description}</div>
            <div className="bg-green-50 border-l-4 border-green-400 p-3 text-green-900 text-sm rounded">
              <strong>Care Instructions:</strong> {selectedPlant.careInstructions}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 