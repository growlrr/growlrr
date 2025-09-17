import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

export default function ProductsPage({ products }) {
  const safe = Array.isArray(products) && products.length > 0
    ? products
    : [{ id: 1, name: "Sample Can", description: "Fallback product for build" }];

  return (
    <div>
      <Navbar />
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {safe.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  let products = [];
  try {
    const res = await fetch(process.env.BACKEND_URL?.concat("/v1/products") ?? "https://growlrr-backend.onrender.com/v1/products");
    if (res.ok) {
      const json = await res.json();
      products = Array.isArray(json) ? json : json?.products ?? [];
    }
  } catch (e) { /* ignore */ }

  if (!products || products.length === 0) {
    products = [{ id: 1, name: "Sample Can", description: "Fallback product for build" }];
  }

  return { props: { products } };
}
