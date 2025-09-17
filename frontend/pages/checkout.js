import { useState } from "react";

export default function CheckoutPage() {
  const [items, setItems] = useState([
    { id: 1, name: "Can 1", qty: 1 },
    { id: 2, name: "Can 2", qty: 1 },
  ]);

  const updateQty = (id, delta) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item
      )
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id} className="flex items-center justify-between mb-2">
            <span>
              {item.name} (x{item.qty})
            </span>
            <div className="space-x-2">
              <button
                onClick={() => updateQty(item.id, -1)}
                className="px-2 py-1 bg-gray-200 rounded"
              >
                -
              </button>
              <button
                onClick={() => updateQty(item.id, 1)}
                className="px-2 py-1 bg-gray-200 rounded"
              >
                +
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button className="mt-6 bg-green-500 text-white px-4 py-2 rounded">
        Place Order
      </button>
    </div>
  );
}
