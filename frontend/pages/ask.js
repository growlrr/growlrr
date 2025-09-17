import Navbar from "../components/Navbar";
import { useState } from "react";

export default function Ask() {
  const [q, setQ] = useState("");
  const [a, setA] = useState("");

  const ask = async () => {
    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: q }),
    });
    const json = await res.json();
    setA(json.answer || "Coming soon...");
  };

  return (
    <div>
      <Navbar />
      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Ask Growlrr</h1>
        <input value={q} onChange={(e)=>setQ(e.target.value)} className="border p-2 w-full" placeholder="Ask about diet..." />
        <button onClick={ask} className="mt-3 bg-blue-600 text-white px-3 py-1 rounded">Ask</button>
        <div className="mt-4">{a}</div>
      </main>
    </div>
  );
}
