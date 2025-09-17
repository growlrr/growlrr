import { useState } from "react";

export default function ProductCard() {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="w-48 h-64 relative cursor-pointer [perspective:1000px]"
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={`absolute w-full h-full transition-transform duration-500 transform ${
          flipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        <div className="absolute w-full h-full [backface-visibility:hidden] bg-white shadow rounded-xl flex items-center justify-center">
          <p className="font-bold">Sample Can</p>
        </div>
        <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gray-50 shadow rounded-xl p-4">
          <h2 className="font-semibold">Ingredients</h2>
          <ul className="text-sm mt-2 list-disc list-inside">
            <li>Chicken</li>
            <li>Rice</li>
            <li>Vitamins</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
