import React, { useEffect, useState } from "react";
import axios from "axios";

export default function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  const fetchNotifications = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const res = await axios.get("/api/notifications", { headers: { Authorization: `Bearer ${token}` } });
    setNotifications(res.data);
  };
  useEffect(() => { fetchNotifications(); }, []);

  const handleMarkRead = async id => {
    const token = localStorage.getItem("token");
    await axios.post(`/api/notifications/${id}/read`, {}, { headers: { Authorization: `Bearer ${token}` } });
    fetchNotifications();
  };

  const unread = notifications.filter(n => !n.read);

  return (
    <div className="relative">
      <button className="relative" onClick={() => setOpen(!open)}>
        <span className="text-2xl">🔔</span>
        {unread.length > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">{unread.length}</span>}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded p-2 z-50">
          <div className="font-semibold text-green-700 mb-2">Notifications</div>
          {notifications.length === 0 && <div className="text-gray-400 text-center">No notifications.</div>}
          {notifications.map(n => (
            <div key={n.id} className={`p-2 rounded mb-1 ${n.read ? 'bg-gray-50' : 'bg-green-50'}`}>
              <div className="text-sm text-gray-800">{n.message}</div>
              <div className="text-xs text-gray-400 mb-1">{new Date(n.createdAt).toLocaleString()}</div>
              {!n.read && <button className="text-xs text-blue-600 hover:underline" onClick={() => handleMarkRead(n.id)}>Mark as read</button>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 