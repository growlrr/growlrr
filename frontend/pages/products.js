import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

const SKUS = [
  { sku: "chicken_cuts", name: "Chicken Cuts in Bone Broth", short: "Lean muscle cuts, slow-broth.", kcal: 95 },
  { sku: "lamb_cuts", name: "Lamb Cuts in Bone Broth", short: "Rich and savory muscle cuts.", kcal: 110 },
  { sku: "sardines", name: "Sardines in Spring Water", short: "Omega-rich whole sardines.", kcal: 105 },
  { sku: "hearts", name: "Hearts in Bone Broth", short: "Taurine-dense organ meat.", kcal: 100 },
  { sku: "gizzards", name: "Gizzards in Bone Broth", short: "Dense, zinc-rich gizzards.", kcal: 98 },
  { sku: "liver", name: "Liver Pâté in Bone Broth with Egg & Pumpkin", short: "Vitamin-rich pate.", kcal: 120 },
  { sku: "kidney", name: "Kidney in Bone Broth with Egg & Pumpkin", short: "Iron & B12 organ mix.", kcal: 115 }
];

export default function Products() {
  return (
    <div style={{ padding: 24 }}>
      <Navbar />
      <h1 style={{ fontFamily: "serif" }}>Our Products</h1>
      <p style={{ color: "#555", maxWidth: 800 }}>Click a product to see details. Packaging and labels are subject to final design.</p>

      <div style={{ display: "flex", flexWrap: "wrap", marginTop: 16 }}>
        {SKUS.map(p => <ProductCard key={p.sku} {...p} />)}
      </div>
    </div>
  );
}

