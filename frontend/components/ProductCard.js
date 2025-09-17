export default function ProductCard({ product }) {
  if (!product || typeof product !== 'object') {
    return (
      <div className="card" style={{padding:16, border:'1px solid #eee', borderRadius:8, background:'#fff', minHeight:120}}>
        <div style={{fontWeight:700}}>No product</div>
        <div style={{color:'#666', marginTop:6}}>Placeholder - data not available</div>
      </div>
    );
  }
  const { name = "Unnamed product", description = "No description available", sku } = product;
  return (
    <div className="card" style={{padding:16, border:'1px solid #eee', borderRadius:8, background:'#fff'}}>
      <div style={{fontWeight:700, marginBottom:8}}>{name}</div>
      <div style={{color:'#777', fontSize:13, minHeight:40}}>{description}</div>
      <div style={{marginTop:10, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div style={{fontSize:12, color:'#999'}}>{sku || ''}</div>
        <button style={{background:'#0ea5e9', color:'#fff', border:'none', padding:'6px 10px', borderRadius:6}}>Add</button>
      </div>
    </div>
  );
}
