import React, { useEffect, useState } from "react";
import axios from "axios";
import Badge from "../components/Badge";
import { useParams } from "react-router-dom";
import { useToast } from "../components/ToastProvider";

export default function UserProfile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isOwn, setIsOwn] = useState(false);
  const [following, setFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const fetchUser = async () => {
    setLoading(true);
    const res = await axios.get(`/api/users/${id}`);
    setUser(res.data);
    setBio(res.data.bio || "");
    setAvatarUrl(res.data.avatarUrl || "");
    setLoading(false);
    // Check if current user is viewing own profile
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setIsOwn(payload.userId === id);
      setFollowing(res.data.followers.some(f => f.followerId === payload.userId));
    }
  };
  useEffect(() => { fetchUser(); }, [id]);

  const handleUpdate = async e => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.put(`/api/users/${id}`, { bio, avatarUrl }, { headers: { Authorization: `Bearer ${token}` } });
      setEditing(false);
      fetchUser();
      toast("Profile updated!");
    } catch {
      toast("Failed to update profile", "error");
    }
  };
  const handleFollow = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(`/api/users/${id}/follow`, {}, { headers: { Authorization: `Bearer ${token}` } });
      fetchUser();
      toast("Followed user!");
    } catch {
      toast("Failed to follow user", "error");
    }
  };
  const handleUnfollow = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(`/api/users/${id}/unfollow`, {}, { headers: { Authorization: `Bearer ${token}` } });
      fetchUser();
      toast("Unfollowed user!");
    } catch {
      toast("Failed to unfollow user", "error");
    }
  };

  if (loading) return <div className="text-center text-gray-400">Loading...</div>;
  if (!user) return <div className="text-center text-gray-400">User not found.</div>;

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex items-center gap-4 mb-4">
        <img src={user.avatarUrl || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user.name)} alt={user.name} className="w-20 h-20 rounded-full object-cover border" />
        <div>
          <div className="text-2xl font-bold text-green-700">{user.name}</div>
          <div className="text-xs text-gray-500">{user.email}</div>
          <div className="text-xs text-gray-400">Joined {new Date(user.createdAt).toLocaleDateString()}</div>
        </div>
        {!isOwn && (
          following ?
            <button className="ml-auto bg-gray-200 text-gray-700 px-3 py-1 rounded" onClick={handleUnfollow}>Unfollow</button>
            : <button className="ml-auto bg-green-600 text-white px-3 py-1 rounded" onClick={handleFollow}>Follow</button>
        )}
      </div>
      {isOwn && !editing && (
        <button className="mb-2 bg-blue-600 text-white px-3 py-1 rounded" onClick={() => setEditing(true)}>Edit Profile</button>
      )}
      {editing ? (
        <form onSubmit={handleUpdate} className="mb-4 flex flex-col gap-2">
          <textarea className="border p-2 rounded" value={bio} onChange={e => setBio(e.target.value)} placeholder="Bio" />
          <input className="border p-2 rounded" value={avatarUrl} onChange={e => setAvatarUrl(e.target.value)} placeholder="Avatar URL" />
          <button className="bg-green-600 text-white px-3 py-1 rounded">Save</button>
        </form>
      ) : (
        <div className="mb-4 text-gray-700">{user.bio}</div>
      )}
      <div className="mb-4">
        <div className="font-semibold text-green-700 mb-1">Badges</div>
        <div className="flex flex-wrap gap-2">
          {user.userPlants.flatMap(up => up.badges).length === 0 && <span className="text-xs text-gray-400">No badges yet.</span>}
          {user.userPlants.flatMap(up => up.badges).map(ub => <Badge key={ub.id} badge={ub.badge} />)}
        </div>
      </div>
      <div className="mb-4">
        <div className="font-semibold text-green-700 mb-1">Plants</div>
        <ul className="list-disc pl-5 text-gray-700">
          {user.userPlants.map(up => (
            <li key={up.id}>{up.nickname || up.plant.commonName} <span className="text-xs text-gray-500">({up.plant.scientificName})</span></li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <div className="font-semibold text-green-700 mb-1">Tips</div>
        <ul className="list-disc pl-5 text-gray-700">
          {user.tips.map(tip => (
            <li key={tip.id}>{tip.content}</li>
          ))}
        </ul>
      </div>
      <div className="flex gap-6">
        <div>
          <div className="font-semibold text-green-700 mb-1">Followers</div>
          <div className="text-xs text-gray-700">{user.followers.length}</div>
        </div>
        <div>
          <div className="font-semibold text-green-700 mb-1">Following</div>
          <div className="text-xs text-gray-700">{user.following.length}</div>
        </div>
      </div>
    </div>
  );
} 