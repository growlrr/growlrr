import Navbar from "../components/Navbar";
import Link from "next/link";
import { useState } from "react";

export default function Diet() {
  const [cart, setCart] = useState([
    { id:1, name:"Chicken Cuts (Bone Broth)", qty:1 },
    { id:2, name:"Lamb Cuts (Bone Broth)", qty:1 }
  ]);

  const changeQty = (id, delta) => {
    setCart(prev => prev.map(it => it.id===id ? {...it, qty: Math.max(0, it.qty+delta)} : it));
  };

  return (
    <div>
      <Navbar />
      <main style={{maxWidth:1100, margin:'24px auto', padding:'0 16px'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12}}>
          <h1 style={{margin:0}}>Diet Chart</h1>
          <Link href="/checkout"><a style={{background:'#0ea5e9', color:'#fff', padding:'8px 12px', borderRadius:8}}>Checkout All</a></Link>
        </div>

        <section style={{display:'grid', gap:12, marginBottom:18}}>
          <div style={{background:'#fff', padding:16, borderRadius:8}}>
            <h3 style={{marginTop:0}}>Rotational Diet (sample)</h3>
            <ol style={{paddingLeft:18}}>
              <li>Mon AM — Chicken cuts in bone broth</li>
              <li>Mon PM — Sardines in spring water</li>
              <li>Tue AM — Lamb cuts in bone broth</li>
              <li>Tue PM — Heart in bone broth</li>
              <li>... (14 cans weekly rotation)</li>
            </ol>
          </div>

          <div style={{background:'#fff', padding:16, borderRadius:8}}>
            <h4 style={{marginTop:0}}>Quick Cart</h4>
            <div>
              {cart.map(it=>(
                <div key={it.id} style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'8px 0', borderBottom:'1px solid #f0f0f0'}}>
                  <div>{it.name}</div>
                  <div style={{display:'flex', gap:8, alignItems:'center'}}>
                    <button onClick={()=>changeQty(it.id,-1)} style={{padding:'4px 8px'}}>−</button>
                    <div>{it.qty}</div>
                    <button onClick={()=>changeQty(it.id,1)} style={{padding:'4px 8px'}}>+</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{background:'#fff', padding:16, borderRadius:8}}>
          <h3>Ask Growlrr (AI help)</h3>
          <p style={{color:'#666'}}>Ask quick questions about portions or meals. (Coming soon)</p>
          <div style={{display:'flex', gap:8, marginTop:8}}>
            <input placeholder="Ask about grams, portions, or ingredients..." style={{flex:1, padding:8}} />
            <button style={{background:'#0ea5e9', color:'#fff', border:'none', padding:'8px 10px', borderRadius:6}}>Ask</button>
          </div>
        </section>
      </main>
    </div>
  );
}
