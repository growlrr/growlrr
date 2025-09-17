import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import Link from "next/link";

export default function Home({ sampleProducts = [] }) {
  const products = (sampleProducts && sampleProducts.length > 0)
    ? sampleProducts
    : [{ id: 1, name: "Sample Can (fallback)", description: "Fallback product for build" }];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto p-6">
        <section className="mb-8">
          <h1 className="text-3xl font-extrabold mb-2">Bistro-style pet food — rotational, vet-informed, and joyful.</h1>
          <p className="text-gray-700 mb-4">
            Explore: <Link href="/products"><a className="text-blue-600">Products</a></Link> • <Link href="/crowdfund"><a className="text-blue-600">Crowdfund</a></Link>
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-2">About Growlrr</h2>
          <p className="text-gray-700 mb-2">
            Growlrr is a bistro-inspired pet food maker focused on transparency, nutrition and chef-quality ingredients. We craft rotational diets to keep pets excited and healthy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Our Values</h2>
          <p className="text-gray-700 mb-2">Transparency • Quality • Science-led. Full ingredient lists, vet-reviewed templates, and ethical sourcing.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Join The Pack</h2>
          <p className="text-gray-700 mb-4">Share unboxing videos, follow our launch, and join a growing community of pet parents who care.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {products.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>

        <footer className="mt-12 text-center text-gray-500">
          <p>End of feed</p>
        </footer>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  let sampleProducts = [];
  try {
    const res = await fetch(process.env.BACKEND_URL?.concat("/v1/products") ?? "https://growlrr-backend.onrender.com/v1/products");
    if (res.ok) {
      const json = await res.json();
      sampleProducts = Array.isArray(json) ? json : json?.products ?? [];
    }
  } catch (e) {
    // fallback below
  }

  if (!sampleProducts || sampleProducts.length === 0) {
    sampleProducts = [{ id: 1, name: "Sample Can (fallback)", description: "Fallback product for build" }];
  }

  return { props: { sampleProducts } };
}
