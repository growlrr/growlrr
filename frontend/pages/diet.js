export default function DietPage() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Diet Chart</h1>

      <div className="rounded-2xl shadow p-6 bg-white mb-6">
        <p>Your diet plan here (14 cans)</p>
        <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700">
          Checkout All
        </button>
      </div>
    </div>
  );
}
