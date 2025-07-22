import React, { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "./ToastProvider";

function Comment({ comment, onReply, onEdit, onDelete, canEdit }) {
  const [replying, setReplying] = useState(false);
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState("");
  const [editContent, setEditContent] = useState(comment.content);

  const handleReply = async e => {
    e.preventDefault();
    await onReply(content, comment.id);
    setContent("");
    setReplying(false);
  };
  const handleEdit = async e => {
    e.preventDefault();
    await onEdit(editContent, comment.id);
    setEditing(false);
  };

  return (
    <div className="ml-4 mt-2">
      <div className="flex items-center gap-2">
        <span className="font-semibold text-green-700">{comment.user?.name || 'User'}</span>
        <span className="text-xs text-gray-400">{new Date(comment.createdAt).toLocaleDateString()}</span>
        {canEdit && (
          <>
            <button className="text-blue-600 hover:underline ml-2 text-xs" onClick={() => setEditing(!editing)}>Edit</button>
            <button className="text-red-600 hover:underline ml-2 text-xs" onClick={() => onDelete(comment.id)}>Delete</button>
          </>
        )}
        <button className="text-xs text-gray-500 ml-2" onClick={() => setReplying(!replying)}>Reply</button>
      </div>
      {editing ? (
        <form onSubmit={handleEdit} className="flex gap-2 mt-1">
          <input className="border p-1 rounded flex-1" value={editContent} onChange={e => setEditContent(e.target.value)} />
          <button className="bg-green-600 text-white px-2 py-1 rounded text-xs">Save</button>
        </form>
      ) : (
        <div className="text-gray-800 text-sm mb-1">{comment.content}</div>
      )}
      {replying && (
        <form onSubmit={handleReply} className="flex gap-2 mt-1">
          <input className="border p-1 rounded flex-1" value={content} onChange={e => setContent(e.target.value)} placeholder="Reply..." />
          <button className="bg-green-600 text-white px-2 py-1 rounded text-xs">Reply</button>
        </form>
      )}
      {comment.replies && comment.replies.map(reply => (
        <Comment key={reply.id} comment={reply} onReply={onReply} onEdit={onEdit} onDelete={onDelete} canEdit={canEdit} />
      ))}
    </div>
  );
}

export default function CommentThread({ tipId }) {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const fetchComments = async () => {
    setLoading(true);
    const res = await axios.get(`/api/commentsOnTips/${tipId}`);
    setComments(res.data);
    setLoading(false);
  };
  useEffect(() => { fetchComments(); }, [tipId]);

  const handlePost = async (text, parentId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(`/api/commentsOnTips/${tipId}`, { content: text, parentId }, { headers: { Authorization: `Bearer ${token}` } });
      fetchComments();
      toast("Comment posted!");
    } catch {
      toast("Failed to post comment", "error");
    }
  };
  const handleEdit = async (text, id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(`/api/commentsOnTips/edit/${id}`, { content: text }, { headers: { Authorization: `Bearer ${token}` } });
      fetchComments();
      toast("Comment updated!");
    } catch {
      toast("Failed to update comment", "error");
    }
  };
  const handleDelete = async id => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`/api/commentsOnTips/delete/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchComments();
      toast("Comment deleted!");
    } catch {
      toast("Failed to delete comment", "error");
    }
  };

  return (
    <div className="mt-4">
      <div className="font-semibold text-green-700 mb-2">Comments</div>
      <form onSubmit={e => { e.preventDefault(); handlePost(content); setContent(""); }} className="flex gap-2 mb-2">
        <input className="border p-2 rounded flex-1" value={content} onChange={e => setContent(e.target.value)} placeholder="Add a comment..." />
        <button className="bg-green-600 text-white px-3 py-1 rounded">Post</button>
      </form>
      {loading && <div className="text-gray-400 text-center">Loading...</div>}
      {comments.length === 0 && !loading && <div className="text-gray-400 text-center">No comments yet.</div>}
      {comments.map(comment => (
        <Comment key={comment.id} comment={comment} onReply={handlePost} onEdit={handleEdit} onDelete={handleDelete} canEdit={true} />
      ))}
    </div>
  );
} 