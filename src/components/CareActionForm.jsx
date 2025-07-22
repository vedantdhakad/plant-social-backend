import React, { useState } from "react";

const actions = [
  { value: "watered", label: "Watered" },
  { value: "fertilized", label: "Fertilized" },
  { value: "repotted", label: "Repotted" },
  { value: "pruned", label: "Pruned" },
  { value: "treated", label: "Treated for Pests" },
];

export default function CareActionForm({ onLog }) {
  const [action, setAction] = useState(actions[0].value);
  const [date, setDate] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    onLog(action, date || new Date().toISOString());
    setDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center mb-2">
      <select className="border p-2 rounded" value={action} onChange={e => setAction(e.target.value)}>
        {actions.map(a => (
          <option key={a.value} value={a.value}>{a.label}</option>
        ))}
      </select>
      <input
        type="date"
        className="border p-2 rounded"
        value={date}
        onChange={e => setDate(e.target.value)}
      />
      <button className="bg-green-600 text-white px-3 py-2 rounded font-semibold">Log</button>
    </form>
  );
} 