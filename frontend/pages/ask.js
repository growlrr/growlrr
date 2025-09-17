import { useState } from "react";

export default function AskPage() {
  const [q, setQ] = useState("");
  const [a, setA] = useState("");

  const ask = async () => {
    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: q }),
    });
    const data = await res.json();
    setA(data.answer || "No answer");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Ask Growlrr</h1>
      <input
        className="border p-2 mr-2"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Ask something..."
      />
      <button onClick={ask} className="bg-blue-500 text-white px-4 py-2 rounded">
        Ask
      </button>
      <div className="mt-4">{a}</div>
    </div>
  );
}
