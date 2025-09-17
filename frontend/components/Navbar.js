import Link from "next/link";
import { useState } from "react";

/**
 * Simple top nav with clickable brand and inline Ask AI field.
 * The ask posts to /api/ask (placeholder) and shows a short non-blocking message.
 */
export default function Navbar() {
  const [q, setQ] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(""); // short result toast

  async function doAsk(e) {
    e?.preventDefault?.();
    if (!q || busy) return;
    setBusy(true);
    setMsg(""); // clear old
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q, source: "navbar-inline" }),
      });
      const json = await res.json();
      setMsg(json.answer || "No answer");
    } catch (err) {
      setMsg("Error — try again");
    } finally {
      setBusy(false);
      setTimeout(()=>setMsg(""), 5000); // auto-hide after 5s
    }
  }

  return (
    <header style={{borderBottom:'1px solid #eee'}} className="p-4 bg-white">
      <div style={{maxWidth:1100, margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', gap:12}}>
        {/* Clickable brand on far left */}
        <div style={{display:'flex', alignItems:'center', gap:12}}>
          <Link href="/"><a style={{textDecoration:'none', color:'inherit', display:'flex', alignItems:'center', gap:8}}>
            <div style={{fontWeight:800, fontSize:20}}>Growlrr</div>
            <div style={{color:'#e11d48', fontSize:14}}>♥</div>
          </a></Link>
        </div>

        {/* Navigation links (center/right) */}
        <nav style={{display:'flex', gap:18, alignItems:'center', fontSize:14}}>
          <Link href="/pet"><a>Pet</a></Link>
          <Link href="/diet"><a>Diet</a></Link>
          <Link href="/crowdfund"><a>Crowdfund</a></Link>
          <Link href="/checkout"><a>Checkout</a></Link>
          <Link href="/about"><a>About</a></Link>
          <Link href="/values"><a>Values</a></Link>
          <Link href="/products"><a>Products</a></Link>

          {/* compact inline Ask AI form */}
          <form onSubmit={doAsk} style={{display:'flex', alignItems:'center', gap:8, marginLeft:12}}>
            <input
              aria-label="Ask Growlrr"
              value={q}
              onChange={(e)=>setQ(e.target.value)}
              placeholder="Ask AI..."
              style={{padding:'6px 8px', border:'1px solid #ddd', borderRadius:6, minWidth:160}}
            />
            <button
              type="submit"
              disabled={busy}
              style={{background:'#0ea5e9', color:'#fff', border:'none', padding:'6px 10px', borderRadius:6}}
            >
              {busy ? "..." : "Ask"}
            </button>
          </form>
        </nav>
      </div>

      {/* transient message area (toast-like) */}
      <div style={{position:'fixed', right:16, top:72, zIndex:60}}>
        {msg ? (
          <div style={{background:'#111827', color:'#fff', padding:'10px 14px', borderRadius:8, boxShadow:'0 6px 18px rgba(0,0,0,0.12)'}}>
            {msg}
          </div>
        ) : null}
      </div>
    </header>
  );
}
