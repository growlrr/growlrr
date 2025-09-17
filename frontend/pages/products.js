import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import CardGrid from "../components/CardGrid";

export default function ProductsPage({ products }) {
  const safe = Array.isArray(products) && products.length>0 ? products : [{ id:1, name:"Sample Can", description:"Fallback product", sku:"SAMPLE-01" }];
  return (
    <div>
      <Navbar />
      <main style={{maxWidth:1100, margin:'24px auto', padding:'0 16px'}}>
        <h1>Products</h1>
        <CardGrid>
          {safe.map(p => <ProductCard key={p.id} product={p} />)}
        </CardGrid>
      </main>
    </div>
  );
}

export async function getStaticProps(){
  let products=[];
  try {
    const res = await fetch(process.env.BACKEND_URL?.concat("/v1/products") ?? "https://growlrr-backend.onrender.com/v1/products");
    if (res.ok) {
      const json = await res.json();
      products = Array.isArray(json) ? json : json?.products ?? [];
    }
  } catch(e){}
  if(!products || products.length===0) products=[{id:1,name:"Sample Can",description:"Fallback product",sku:"SAMPLE-01"}];
  return { props:{ products } };
}
