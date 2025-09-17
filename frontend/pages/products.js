import ProductCard from "../components/ProductCard";

export default function ProductsPage({ products }) {
  const safe = Array.isArray(products) && products.length > 0
    ? products
    : [{ id: 1, name: "Sample Can (fallback)", description: "Fallback product for build" }];

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {safe.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
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
  } catch (e) {
    console.error("products getStaticProps failed:", e?.message || e);
  }

  if (!products || products.length === 0) {
    products = [{ id: 1, name: "Sample Can (fallback)", description: "Fallback product for build" }];
  }

  return { props: { products } };
}
