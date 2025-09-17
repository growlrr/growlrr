import { useState } from "react";
import Link from "next/link";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [showScroll, setShowScroll] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 200) setShowScroll(true);
  };

  if (typeof window !== "undefined") {
    window.onscroll = handleScroll;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="p-4 shadow bg-white flex justify-between">
        <h1 className="text-xl font-bold">Growlrr</h1>
        <nav className="space-x-4">
          <Link href="/diet">Diet</Link>
          <Link href="/checkout">Checkout</Link>
          <Link href="/ask">Ask Growlrr</Link>
        </nav>
      </header>

      <main className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <ProductCard
          product={{ name: "Sample Can", ingredients: "Chicken, Rice, Carrots" }}
        />
      </main>

      {showScroll && (
        <footer className="p-6 text-center text-gray-500">
          <p>End of feed</p>
        </footer>
      )}
    </div>
  );
}
