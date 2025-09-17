import Link from "next/link";

export default function DietPage() {
  const dietPlan = [
    { id: 1, name: "Can 1" },
    { id: 2, name: "Can 2" },
    { id: 3, name: "Can 3" },
    { id: 4, name: "Can 4" },
    { id: 5, name: "Can 5" },
    { id: 6, name: "Can 6" },
    { id: 7, name: "Can 7" },
    { id: 8, name: "Can 8" },
    { id: 9, name: "Can 9" },
    { id: 10, name: "Can 10" },
    { id: 11, name: "Can 11" },
    { id: 12, name: "Can 12" },
    { id: 13, name: "Can 13" },
    { id: 14, name: "Can 14" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Diet Chart</h1>
      <ul className="list-disc ml-6">
        {dietPlan.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <div className="mt-6">
        <Link href="/checkout">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Checkout All (14 cans)
          </button>
        </Link>
      </div>
    </div>
  );
}
