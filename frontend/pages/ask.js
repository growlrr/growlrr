import Navbar from "../components/Navbar";
import { useState } from "react";

export default function Ask() {
  const [q, setQ] = useState('');
  const [a, setA] = useState('');
  const ask = async () => {
    const res = await fetch('/api/ask', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({question:q})});
    const json = await res.json();
    setA(json.answer || 'Coming soon...');
  };
  return (
    <div>
      <Navbar />
      <main style={{maxWidth:1100, margin:'24px auto', padding:'0 16px'}}>
        <h1>Ask Growlrr</h1>
        <div style={{background:'#fff', padding:16, borderRadius:8}}>
          <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Ask about portions..." style={{width:'100%', padding:8}} />
          <div style={{marginTop:10}}>
            <button onClick={ask} style={{background:'#0ea5e9', color:'#fff', padding:'8px 12px', borderRadius:6}}>Ask</button>
          </div>
          <div style={{marginTop:12, color:'#333'}}>{a}</div>
        </div>
      </main>
    </div>
  );
}
