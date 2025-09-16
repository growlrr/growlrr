import Navbar from "../components/Navbar";

const VALUES = [
  { title: "Transparency", blurb: "Full ingredient lists, lab-tested nutrition values, and open sourcing of templates." },
  { title: "Quality", blurb: "Ethically sourced proteins, slow-broth process, no fillers." },
  { title: "Science-led", blurb: "Nutrition templates reviewed by vets and nutritionists." }
];

export default function Values() {
  return (
    <div style={{ padding: 24 }}>
      <Navbar />
      <h1>Our Core Values</h1>
      <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
        {VALUES.map(v => (
          <div key={v.title} style={{ padding: 12, borderRadius: 10, boxShadow: "0 6px 18px rgba(0,0,0,0.06)", minWidth: 220 }}>
            <h3>{v.title}</h3>
            <p style={{ color: "#444" }}>{v.blurb}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

