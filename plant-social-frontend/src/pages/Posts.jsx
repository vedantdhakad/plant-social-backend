import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api/posts`);
    setPosts(res.data);
  };

  useEffect(() => { fetchPosts(); }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api/posts`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Post created!");
      setForm({ title: "", content: "" });
      fetchPosts();
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Posts</h2>
      {localStorage.getItem("token") && (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 flex flex-col gap-2">
          <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="border p-2 rounded" required />
          <textarea name="content" value={form.content} onChange={handleChange} placeholder="Content" className="border p-2 rounded" required />
          <button type="submit" className="bg-green-600 text-white py-2 rounded font-semibold" disabled={loading}>{loading ? "Posting..." : "Create Post"}</button>
          {message && <div className="text-sm text-red-600">{message}</div>}
        </form>
      )}
      <div className="space-y-4">
        {posts.map(post => (
          <div key={post.id} className="bg-white p-4 rounded shadow">
            <h3 className="font-bold text-lg">{post.title}</h3>
            <p className="text-gray-700">{post.content}</p>
            <div className="text-xs text-gray-500 mt-2">By {post.author?.name || "Unknown"} on {new Date(post.createdAt).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
} 