import React, { useState } from "react";
import axios from "axios";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", form);
      localStorage.setItem("token", res.data.token);
      setMessage("Login successful!");
      setForm({ email: "", password: "" });
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" className="border p-2 rounded" required />
        <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" className="border p-2 rounded" required />
        <button type="submit" className="bg-green-600 text-white py-2 rounded font-semibold" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
      </form>
      {message && <div className="mt-3 text-center text-sm text-red-600">{message}</div>}
    </div>
  );
} 