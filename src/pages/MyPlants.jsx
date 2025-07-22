import React, { useEffect, useState } from "react";
import axios from "axios";
import CareActionForm from "../components/CareActionForm";
import Badge from "../components/Badge";
import { useToast } from "../components/ToastProvider";

export default function MyPlants() {
  const [myPlants, setMyPlants] = useState([]);
  const [plantId, setPlantId] = useState("");
  const [nickname, setNickname] = useState("");
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const fetchMyPlants = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const res = await axios.get("/api/myplants", { headers: { Authorization: `Bearer ${token}` } });
    setMyPlants(res.data);
    setLoading(false);
  };
  const fetchPlants = async () => {
    const res = await axios.get("/api/plants");
    setPlants(res.data);
  };
  useEffect(() => { fetchMyPlants(); fetchPlants(); }, []);

  const handleAdd = async e => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await axios.post(
      "/api/myplants",
      { plantId, nickname },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setPlantId(""); setNickname("");
    fetchMyPlants();
    toast("Plant added!");
  };

  const handleLog = async (id, action, date) => {
    const token = localStorage.getItem("token");
    await axios.post(
      `/api/myplants/${id}/action`,
      { action, date },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchMyPlants();
    toast("Care action logged!");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Plants</h2>
      <form onSubmit={handleAdd} className="flex gap-2 mb-6">
        <select className="border p-2 rounded flex-1" value={plantId} onChange={e => setPlantId(e.target.value)} required>
          <option value="">Select a plant...</option>
          {plants.map(p => (
            <option key={p.id} value={p.id}>{p.commonName}</option>
          ))}
        </select>
        <input
          className="border p-2 rounded flex-1"
          placeholder="Nickname (optional)"
          value={nickname}
          onChange={e => setNickname(e.target.value)}
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded font-semibold">Add</button>
      </form>
      {loading && <div className="text-gray-400 text-center">Loading...</div>}
      {myPlants.length === 0 && !loading && <div className="text-gray-400 text-center">No plants added yet.</div>}
      <div className="space-y-6">
        {myPlants.map(up => (
          <div key={up.id} className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center gap-4 mb-2">
              <img src={up.plant.imageUrl} alt={up.plant.commonName} className="w-16 h-16 object-cover rounded" />
              <div>
                <div className="font-bold text-green-700 text-lg">{up.nickname || up.plant.commonName}</div>
                <div className="text-xs text-gray-500 italic">{up.plant.scientificName}</div>
              </div>
            </div>
            <CareActionForm onLog={(action, date) => handleLog(up.id, action, date)} />
            <div className="text-sm text-gray-700 mb-2">Care Journey:</div>
            <ul className="text-xs text-gray-600 mb-2">
              {Object.entries(up.milestones || {}).map(([action, dates]) => (
                <li key={action}><span className="font-semibold capitalize">{action}:</span> {dates.length} times</li>
              ))}
            </ul>
            <div className="text-sm text-gray-700 mb-1">Badges:</div>
            <div className="flex flex-wrap gap-2">
              {up.badges.length === 0 && <span className="text-xs text-gray-400">No badges yet.</span>}
              {up.badges.map(ub => <Badge key={ub.id} badge={ub.badge} />)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 