import React, { useEffect, useState } from "react";
import axios from "axios";
import TipCard from "../components/TipCard";
import { useToast } from "../components/ToastProvider";

export default function Tips() {
  const [tips, setTips] = useState([]);
  const [search, setSearch] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState("recent");
  const toast = useToast();

  const fetchTips = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/tips", { params: { search, sort } });
      setTips(res.data);
    } catch (err) {
      setTips([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTips(); }, [search, sort]);

  const handlePost = async e => {
    e.preventDefault();
    if (!content.trim()) return;
    try {
      const token = localStorage.getItem("token");
      await axios.post("/api/tips", { content }, { headers: { Authorization: `Bearer ${token}` } });
      setContent("");
      fetchTips();
      toast("Tip posted!");
    } catch {
      toast("Failed to post tip", "error");
    }
  };

  const handleUpvote = async id => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(`/api/tips/${id}/upvote`, {}, { headers: { Authorization: `Bearer ${token}` } });
      fetchTips();
      toast("Upvoted!");
    } catch {
      toast("Failed to upvote", "error");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Plant Care Tips</h2>
      <form onSubmit={handlePost} className="flex gap-2 mb-4">
        <input
          className="border p-2 rounded flex-1"
          placeholder="Share a tip..."
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded font-semibold">Post</button>
      </form>
      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 rounded flex-1"
          placeholder="Search tips..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select className="border p-2 rounded" value={sort} onChange={e => setSort(e.target.value)}>
          <option value="recent">Most Recent</option>
          <option value="upvotes">Most Upvoted</option>
        </select>
      </div>
      <div>
        {loading && <div className="text-gray-400 text-center">Loading...</div>}
        {tips.length === 0 && !loading && <div className="text-gray-400 text-center">No tips found.</div>}
        {tips.map(tip => (
          <TipCard key={tip.id} tip={tip} onUpvote={() => handleUpvote(tip.id)} />
        ))}
      </div>
    </div>
  );
} 