import { useState } from 'react';

export default function DietCheckout({ diet, petId }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const pricePerCan = 250; // cents — placeholder

  const totalCents = (diet?.items || []).reduce((s, it) => s + ((it.qty || 1) * pricePerCan), 0);

  async function createOrder() {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/v1/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pet_id: petId, items: diet.items || [], total_cents: totalCents })
      });
      const data = await res.json();
      alert('Order created: ' + (data.id || 'ok'));
      setOpen(false);
    } catch (err) {
      console.error('checkout error', err);
      alert('Checkout failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button onClick={() => setOpen(true)}>Checkout</button>
      {open && (
        <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'white', padding: 20, borderRadius: 8, width: 640, boxShadow: '0 6px 30px rgba(0,0,0,0.15)' }}>
            <h3>Checkout</h3>
            <div>
              {(diet?.items || []).map((it, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: 6 }}>
                  <div>{it.name} x {it.qty || 1}</div>
                  <div>${((pricePerCan * (it.qty || 1)) / 100).toFixed(2)}</div>
                </div>
              ))}
            </div>
            <hr />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
              <strong>Total</strong>
              <strong>${(totalCents/100).toFixed(2)}</strong>
            </div>
            <div style={{ marginTop: 12, display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button onClick={() => setOpen(false)} disabled={loading}>Cancel</button>
              <button onClick={createOrder} disabled={loading}>{loading ? 'Creating...' : 'Pay / Create Order'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
