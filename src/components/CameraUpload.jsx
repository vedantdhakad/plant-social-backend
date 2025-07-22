import React, { useRef, useState } from "react";

export default function CameraUpload({ onUpload, loading }) {
  const fileInput = useRef();
  const [preview, setPreview] = useState(null);

  const handleFile = e => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      onUpload(file);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <input
        type="file"
        accept="image/*"
        capture="environment"
        ref={fileInput}
        style={{ display: "none" }}
        onChange={handleFile}
      />
      <button
        className="bg-green-600 text-white px-4 py-2 rounded font-semibold"
        onClick={() => fileInput.current.click()}
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload or Take Photo"}
      </button>
      {preview && <img src={preview} alt="Preview" className="w-40 h-40 object-cover rounded shadow" />}
    </div>
  );
} 