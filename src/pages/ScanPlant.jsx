import React, { useState } from "react";
import axios from "axios";
import CameraUpload from "../components/CameraUpload";

export default function ScanPlant() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async file => {
    setLoading(true);
    setResult(null);
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await axios.post("/api/scan", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(res.data);
    } catch (err) {
      setResult({ healthStatus: "Error", advice: "Failed to analyze image." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Plant Health Scanner</h2>
      <CameraUpload onUpload={handleUpload} loading={loading} />
      {result && (
        <div className="mt-6 bg-white rounded-lg shadow p-4 text-center">
          <div className="text-lg font-bold text-green-700 mb-2">{result.healthStatus}</div>
          <div className="text-gray-700 mb-2">{result.advice}</div>
          {result.image && <div className="text-xs text-gray-400">Image uploaded: {result.image}</div>}
        </div>
      )}
    </div>
  );
} 