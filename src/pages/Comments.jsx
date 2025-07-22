import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Comments() {
  const [comments, setComments] = useState([]);
  const [form, setForm] = useState({ content: "", postId: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchComments = async () => {
    const res = await axios.get("http://localhost:3000/api/comments");
    setComments(res.data);
  };

  useEffect(() => { fetchComments(); }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:3000/api/comments", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Comment created!");
      setForm({ content: "", postId: "" });
      fetchComments();
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to create comment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      {localStorage.getItem("token") && (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 flex flex-col gap-2">
          <textarea name="content" value={form.content} onChange={handleChange} placeholder="Comment" className="border p-2 rounded" required />
          <input name="postId" value={form.postId} onChange={handleChange} placeholder="Post ID" className="border p-2 rounded" required />
          <button type="submit" className="bg-green-600 text-white py-2 rounded font-semibold" disabled={loading}>{loading ? "Commenting..." : "Add Comment"}</button>
          {message && <div className="text-sm text-red-600">{message}</div>}
        </form>
      )}
      <div className="space-y-4">
        {comments.map(comment => (
          <div key={comment.id} className="bg-white p-4 rounded shadow">
            <p className="text-gray-700">{comment.content}</p>
            <div className="text-xs text-gray-500 mt-2">By {comment.author?.name || "Unknown"} on {new Date(comment.createdAt).toLocaleString()} (Post: {comment.postId})</div>
          </div>
        ))}
      </div>
    </div>
  );
} 