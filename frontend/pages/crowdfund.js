import Navbar from "../components/Navbar";
export default function Crowdfund() {
  return (
    <div>
      <Navbar />
      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Crowdfund</h1>
        <p>Support our launch — rewards and packs will appear here during the campaign.</p>
      </main>
    </div>
  );
}
