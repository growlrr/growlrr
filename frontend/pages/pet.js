import Navbar from "../components/Navbar";
export default function Pet() {
  return (
    <div>
      <Navbar />
      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Pet</h1>
        <p>Pet profile, health tracker and diet templates will live here.</p>
      </main>
    </div>
  );
}
