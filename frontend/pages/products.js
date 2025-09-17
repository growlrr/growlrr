import ProductCard from "../components/ProductCard";

export default function ProductsPage({ products }) {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  let products = [];

  try {
    const res = await fetch(
      process.env.BACKEND_URL
        ? `${process.env.BACKEND_URL}/v1/products`
        : "https://growlrr-backend.onrender.com/v1/products"
    );
    if (res.ok) {
      products = await res.json();
    }
  } catch (err) {
    console.error("Failed to fetch products:", err);
  }

  // fallback sample if API is empty or errors
  if (!products || products.length === 0) {
    products = [
      {
        id: 1,
        name: "Sample Can",
        description: "Placeholder product for build"
      }
    ];
  }

  return { props: { products } };
}
