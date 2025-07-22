import React, { useEffect, useState } from "react";
import axios from "axios";
import TipCard from "../components/TipCard";

export default function SocialFeed() {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFeed = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const res = await axios.get("/api/users/feed/main", { headers: { Authorization: `Bearer ${token}` } });
    setTips(res.data);
    setLoading(false);
  };
  useEffect(() => { fetchFeed(); }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Social Feed</h2>
      {loading && <div className="text-gray-400 text-center">Loading...</div>}
      {tips.length === 0 && !loading && <div className="text-gray-400 text-center">No tips from followed users yet.</div>}
      <div>
        {tips.map(tip => (
          <TipCard key={tip.id} tip={tip} />
        ))}
      </div>
    </div>
  );
} 