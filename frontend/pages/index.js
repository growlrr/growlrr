import ProductCard from "../components/ProductCard";

export default function Home({ sampleProducts = [] }) {
  // ensure there's at least one fallback product for prerender/build
  const products = (sampleProducts && sampleProducts.length > 0)
    ? sampleProducts
    : [{ id: 1, name: "Sample Can (fallback)", description: "Fallback product for build" }];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="p-4 shadow bg-white flex justify-between">
        <h1 className="text-xl font-bold">Growlrr</h1>
        <nav className="space-x-4">
          <a href="/diet">Diet</a>
          <a href="/products">Products</a>
          <a href="/checkout">Checkout</a>
          <a href="/ask">Ask Growlrr</a>
        </nav>
      </header>

      <main className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </main>

      <footer className="mt-8 text-center text-gray-500">End of feed</footer>
    </div>
  );
}

// optional SSG data fetch with fallback: safe for Vercel prerender
export async function getStaticProps() {
  let sampleProducts = [];
  try {
    const res = await fetch(process.env.BACKEND_URL?.concat("/v1/products") ?? "https://growlrr-backend.onrender.com/v1/products");
    if (res.ok) {
      const json = await res.json();
      // If API returns object with products field, normalize
      sampleProducts = Array.isArray(json) ? json : json?.products ?? [];
    }
  } catch (e) {
    // swallow: we'll use fallback below
    console.error("getStaticProps products fetch failed:", e?.message || e);
  }

  if (!sampleProducts || sampleProducts.length === 0) {
    sampleProducts = [{ id: 1, name: "Sample Can (fallback)", description: "Fallback product for build" }];
  }

  return { props: { sampleProducts } };
}
