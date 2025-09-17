import Navbar from "../components/Navbar";
import { useState } from "react";

export default function Checkout() {
  const [items, setItems] = useState([
    { id:1, name:"Chicken Cuts (Bone Broth)", qty:2 },
    { id:2, name:"Sardines (Spring Water)", qty:1 },
  ]);
  const change = (id, d) => setItems(prev => prev.map(it => it.id===id ? {...it, qty: Math.max(0, it.qty+d)} : it));

  return (
    <div>
      <Navbar />
      <main style={{maxWidth:1100, margin:'24px auto', padding:'0 16px'}}>
        <h1>Checkout</h1>
        <div style={{background:'#fff', padding:16, borderRadius:8}}>
          {items.map(it => (
            <div key={it.id} style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'8px 0', borderBottom:'1px solid #f5f5f5'}}>
              <div>{it.name}</div>
              <div style={{display:'flex', gap:8}}>
                <button onClick={()=>change(it.id,-1)}>-</button>
                <div>{it.qty}</div>
                <button onClick={()=>change(it.id,1)}>+</button>
              </div>
            </div>
          ))}
          <div style={{marginTop:12, textAlign:'right'}}>
            <button style={{background:'#10b981', color:'#fff', padding:'8px 12px', borderRadius:6}}>Place Order</button>
          </div>
        </div>
      </main>
    </div>
  );
}
