export default function ProductCard({ product }) {
  if (!product) {
    return (
      <div className="p-4 border rounded shadow text-gray-500">
        No product data
      </div>
    );
  }

  return (
    <div className="p-4 border rounded shadow hover:shadow-lg transition">
      <h3 className="text-lg font-semibold">
        {product.name || "Unnamed"}
      </h3>
      <p className="text-sm text-gray-500">
        {product.description || "No description available"}
      </p>
    </div>
  );
}
