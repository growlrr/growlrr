import Navbar from "../components/Navbar";
export default function About() {
  return (
    <div>
      <Navbar />
      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">About Growlrr</h1>
        <p>Growlrr is a bistro-inspired pet food maker focused on transparency, nutrition and chef-quality ingredients. We craft rotational diets to keep pets excited and healthy.</p>
      </main>
    </div>
  );
}
