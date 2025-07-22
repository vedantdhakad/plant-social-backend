import React, { useState } from "react";
import CommentThread from "./CommentThread";

export default function TipCard({ tip, onUpvote, onEdit, onDelete, canEdit }) {
  const [showComments, setShowComments] = useState(false);
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6 mb-6 flex flex-col gap-3 border border-green-50">
      <div className="flex items-center gap-2 mb-1">
        <span className="font-semibold text-green-700">{tip.user?.name || 'User'}</span>
        {tip.plant && <span className="text-xs text-gray-500">on <span className="italic">{tip.plant.commonName}</span></span>}
        <span className="ml-auto text-xs text-gray-400">{new Date(tip.createdAt).toLocaleDateString()}</span>
      </div>
      <div className="text-gray-800 text-base leading-relaxed mb-1">{tip.content}</div>
      <div className="flex items-center gap-3 mt-2">
        <button onClick={onUpvote} className="text-green-600 hover:text-green-800 font-bold flex items-center gap-1 transition">
          <span>👍</span> <span>{tip.upvotes}</span>
        </button>
        <button className="text-xs text-blue-600 hover:underline ml-2" onClick={() => setShowComments(v => !v)}>
          {showComments ? "Hide Comments" : "Show Comments"}
        </button>
        {canEdit && (
          <>
            <button onClick={onEdit} className="text-blue-600 hover:underline ml-2">Edit</button>
            <button onClick={onDelete} className="text-red-600 hover:underline ml-2">Delete</button>
          </>
        )}
      </div>
      {showComments && <CommentThread tipId={tip.id} />}
    </div>
  );
} 