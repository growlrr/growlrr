import { useState } from "react";

export default function ProductCard({ product }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="bg-white p-4 shadow rounded cursor-pointer"
      onClick={() => setFlipped(!flipped)}
    >
      {!flipped ? (
        <h2 className="font-bold">{product.name}</h2>
      ) : (
        <p>{product.ingredients}</p>
      )}
    </div>
  );
}
