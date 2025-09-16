import Navbar from "../components/Navbar";

export default function About() {
  return (
    <div style={{ padding: 24 }}>
      <Navbar />
      <h1>About Growlrr</h1>
      <p style={{ maxWidth: 800, color: "#444" }}>
        Growlrr is a bistro-inspired pet food maker focused on transparency, nutrition and chef-quality ingredients.
        We craft rotational diets to keep pets excited and healthy.
      </p>
    </div>
  );
}

