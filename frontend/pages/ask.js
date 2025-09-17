import { useState } from "react";

export default function AskPage() {
  const [q, setQ] = useState("");
  const [a, setA] = useState("");

  const handleAsk = async () => {
    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: q }),
    });
    const data = await res.json();
    setA(data.answer || "No reply");
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Ask Growlrr</h1>
      <textarea
        className="w-full border rounded p-2 mb-2"
        placeholder="Type your question..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <button
        onClick={handleAsk}
        className="px-4 py-2 bg-blue-600 text-white rounded-xl"
      >
        Ask
      </button>
      {a && <p className="mt-4 p-3 bg-gray-50 border rounded">{a}</p>}
    </div>
  );
}
