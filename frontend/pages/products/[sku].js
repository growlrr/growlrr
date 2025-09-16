import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";

const PRODUCT_INFO = {
  chicken_cuts: { name: "Chicken Cuts in Bone Broth", desc: "Whole chicken muscle cuts gently cooked in bone broth." },
  lamb_cuts: { name: "Lamb Cuts in Bone Broth", desc: "Lamb muscle cuts, rich and tender." },
  sardines: { name: "Sardines in Spring Water", desc: "Small oily fish, rich in Omega-3s." },
  hearts: { name: "Hearts in Bone Broth", desc: "Organ meat rich in taurine." },
  gizzards: { name: "Gizzards in Bone Broth", desc: "Muscle organ, chewy and nutrient-dense." },
  liver: { name: "Liver Pâté in Bone Broth with Egg & Pumpkin", desc: "Liver pate fortified with egg and pumpkin." },
  kidney: { name: "Kidney in Bone Broth with Egg & Pumpkin", desc: "Kidney organ with egg & pumpkin." }
};

export default function ProductDetail() {
  const router = useRouter();
  const { sku } = router.query;
  const p = PRODUCT_INFO[sku] || { name: sku, desc: "Details coming soon." };

  return (
    <div style={{ padding: 24 }}>
      <Navbar />
      <h1>{p.name}</h1>
      <p style={{ color:"#444" }}>{p.desc}</p>
      <p><strong>SKU:</strong> {sku}</p>
      <button style={{ padding: "10px 16px", borderRadius: 8, background:"#D62828", color:"#fff", border:"none" }}>Subscribe / Buy</button>
    </div>
  );
}

