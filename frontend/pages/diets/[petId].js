import { useEffect, useState } from 'react';
import AskGrowlrrWidget from '../../components/AskGrowlrrWidget';
import DietCheckout from '../../components/DietCheckout';

export default function DietPage({ query }) {
  // Next.js pass-through: use router for petId
  // But for simplicity we use a client-side read from window.location
  const [petId, setPetId] = useState(null);
  const [diet, setDiet] = useState(null);

  useEffect(() => {
    const parts = window.location.pathname.split('/');
    const pid = parts[parts.length - 1] || '1';
    setPetId(pid);
    // fetch diet for pet (if API exists). fallback to placeholder
    (async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/v1/diets/${pid}`);
        if (res.ok) {
          const data = await res.json();
          setDiet(data);
        } else {
          setDiet({ items: [
            { sku: 'chicken_bonebroth', name: 'Chicken in Bone Broth', qty: 2 },
            { sku: 'sardine_spring', name: 'Sardines in Spring Water', qty: 1 }
          ]});
        }
      } catch (err) {
        setDiet({ items: [
          { sku: 'chicken_bonebroth', name: 'Chicken in Bone Broth', qty: 2 },
          { sku: 'sardine_spring', name: 'Sardines in Spring Water', qty: 1 }
        ]});
      }
    })();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Diet Chart for Pet {petId}</h1>
      <div style={{ border: '1px solid #eee', padding: 12, borderRadius: 8, maxWidth: 900 }}>
        <h3>Diet Chart (placeholder)</h3>
        <ul>
          {(diet?.items || []).map((it, i) => (
            <li key={i}>{it.name} — qty: {it.qty}</li>
          ))}
        </ul>
        <div style={{ marginTop: 12 }}>
          <DietCheckout diet={diet} petId={petId} />
        </div>
      </div>

      <div style={{ marginTop: 24 }}>
        <h3>Ask Growlrr — below the diet chart</h3>
        <AskGrowlrrWidget petId={petId} />
      </div>
    </div>
  );
}
