export default function ProductCard({ product }) {
  if (!product || typeof product !== "object") {
    return (
      <div className="p-4 border rounded shadow text-gray-500">
        <div className="font-semibold">No product</div>
        <div className="text-sm">Fallback — data not available</div>
      </div>
    );
  }
  const { name = "Unnamed", description = "No description" } = product;
  return (
    <div className="p-4 border rounded shadow hover:shadow-lg transition">
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
}
