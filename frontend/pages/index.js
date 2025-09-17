import ProductCard from "../components/ProductCard";

export default function HomePage() {
  const items = [
    { id: 1, title: "Sample Plan", desc: "Balanced diet plan" },
    { id: 2, title: "Vet Notes", desc: "Example health tracker" },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Growlrr</h1>
      <div className="space-y-4">
        {items.map((it) => (
          <div key={it.id} className="rounded-2xl shadow p-4 bg-white border">
            <h2 className="font-semibold">{it.title}</h2>
            <p className="text-gray-600">{it.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="font-semibold mb-2">Sample Product</h2>
        <ProductCard />
      </div>
    </div>
  );
}
