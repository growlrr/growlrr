export default function ProductCard({ product }) {
  // Defensive: always handle missing product gracefully (server + client safe)
  if (!product || typeof product !== "object") {
    return (
      <div className="p-4 border rounded shadow text-gray-500">
        <div className="font-semibold">No product</div>
        <div className="text-sm">Placeholder product — data not available.</div>
      </div>
    );
  }

  const { name = "Unnamed product", description = "No description available" } = product;

  return (
    <div className="p-4 border rounded shadow hover:shadow-lg transition">
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
}
