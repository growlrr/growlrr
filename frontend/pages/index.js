import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import CardGrid from "../components/CardGrid";
import Link from "next/link";

export default function Home({ sampleProducts = [] }) {
  const products = (Array.isArray(sampleProducts) && sampleProducts.length>0)
    ? sampleProducts
    : [
      { id: 1, name: "Sample Can (fallback)", description: "Fallback product for build", sku: "SAMPLE-01" },
      { id: 2, name: "Sample Can 2", description: "Another fallback", sku: "SAMPLE-02" }
    ];

  return (
    <div style={{background:'#fafafa', minHeight:'100vh'}}>
      <Navbar />
      <main style={{maxWidth:1100, margin:'24px auto', padding:'0 16px'}}>
        <section style={{padding:20, background:'#fff', borderRadius:8, marginBottom:20}}>
          <h1 style={{fontSize:28, margin:0}}>Bistro-style pet food — rotational, vet-informed, and joyful.</h1>
          <p style={{color:'#555', marginTop:10}}>
            Explore: <Link href="/products"><a style={{color:'#0ea5e9'}}>Products</a></Link> • <Link href="/crowdfund"><a style={{color:'#0ea5e9'}}>Crowdfund</a></Link>
          </p>
        </section>

        <section style={{display:'grid', gap:18}}>
          <div style={{background:'#fff', padding:16, borderRadius:8}}>
            <h2 style={{margin:'0 0 8px 0'}}>About Growlrr</h2>
            <p style={{color:'#555', margin:0}}>
              Growlrr is a bistro-inspired pet food maker focused on transparency, nutrition and chef-quality ingredients. We craft rotational diets to keep pets excited and healthy.
            </p>
          </div>

          <div style={{background:'#fff', padding:16, borderRadius:8}}>
            <h2 style={{margin:'0 0 8px 0'}}>Our Values</h2>
            <p style={{color:'#555', margin:0}}>Transparency • Quality • Science-led. Full ingredient lists, vet-reviewed templates, and ethical sourcing.</p>
          </div>

          <div style={{background:'#fff', padding:16, borderRadius:8}}>
            <h2 style={{margin:'0 0 12px 0'}}>Join The Pack</h2>
            <p style={{color:'#555', margin:0}}>Share unboxing videos, follow our launch, and join a growing community of pet parents who care.</p>
          </div>
        </section>

        <section style={{marginTop:20}}>
          <h3 style={{marginBottom:12}}>Featured</h3>
          <CardGrid>
            {products.map(p => <ProductCard key={p.id} product={p} />)}
          </CardGrid>
        </section>
      </main>
    </div>
  );
}

export async function getStaticProps(){
  let sampleProducts = [];
  try {
    const res = await fetch(process.env.BACKEND_URL?.concat("/v1/products") ?? "https://growlrr-backend.onrender.com/v1/products");
    if (res.ok) {
      const json = await res.json();
      sampleProducts = Array.isArray(json) ? json : json?.products ?? [];
    }
  } catch (e) {
    // ignore - fallback used
  }
  if (!sampleProducts || sampleProducts.length===0) {
    sampleProducts = [{ id:1, name:"Sample Can (fallback)", description:"Fallback product for build", sku:"SAMPLE-01" }];
  }
  return { props: { sampleProducts } };
}
