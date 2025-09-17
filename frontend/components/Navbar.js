import Link from "next/link";

export default function Navbar() {
  return (
    <header style={{borderBottom:'1px solid #eee'}} className="p-4 bg-white">
      <div style={{maxWidth:1100, margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <div style={{display:'flex', alignItems:'center', gap:12}}>
          <div style={{fontWeight:800, fontSize:20}}>Growlrr</div>
          <div style={{color:'#e11d48', fontSize:14}}>Growl with us ♥</div>
        </div>
        <nav style={{display:'flex', gap:18, fontSize:14}}>
          <Link href="/"><a>Home</a></Link>
          <Link href="/pet"><a>Pet</a></Link>
          <Link href="/diet"><a>Diet</a></Link>
          <Link href="/crowdfund"><a>Crowdfund</a></Link>
          <Link href="/checkout"><a>Checkout</a></Link>
          <Link href="/about"><a>About Us</a></Link>
          <Link href="/values"><a>Values</a></Link>
          <Link href="/products"><a>Products</a></Link>
        </nav>
      </div>
    </header>
  );
}
