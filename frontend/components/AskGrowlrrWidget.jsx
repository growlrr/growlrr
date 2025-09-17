import { useState } from 'react';

export default function AskGrowlrrWidget({ petId }) {
  const [question, setQuestion] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  async function sendQuestion(e) {
    e && e.preventDefault();
    if (!question.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/v1/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pet_id: petId, question, difficulty })
      });
      const data = await res.json();
      setHistory(h => [{ question, difficulty, answer: data.answer, ts: data.created_at }, ...h]);
      setQuestion('');
    } catch (err) {
      console.error('ask error', err);
      alert('Error contacting Ask Growlrr');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ border: '1px solid #e6e6e6', padding: 12, borderRadius: 8, maxWidth: 720 }}>
      <h3>Ask Growlrr</h3>
      <form onSubmit={sendQuestion} style={{ display: 'flex', gap: 8, flexDirection: 'column' }}>
        <textarea value={question} onChange={e => setQuestion(e.target.value)} placeholder="Ask about diet, feeding, swaps, allergies..." rows={3} />
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <label>
            Difficulty:
            <select value={difficulty} onChange={e => setDifficulty(e.target.value)} style={{ marginLeft: 8 }}>
              <option value="easy">easy</option>
              <option value="medium">medium</option>
              <option value="hard">hard</option>
            </select>
          </label>
          <button type="submit" disabled={loading} style={{ marginLeft: 'auto' }}>{loading ? 'Thinking...' : 'Ask'}</button>
        </div>
      </form>

      <div style={{ marginTop: 12 }}>
        {history.length === 0 && <div style={{ color: '#666' }}>No questions yet — try asking "How much liver for Bella?"</div>}
        {history.map((h, i) => (
          <div key={i} style={{ marginTop: 10, padding: 10, background: '#fafafa', borderRadius: 6 }}>
            <div style={{ fontSize: 13, color: '#333' }}><strong>Q:</strong> {h.question} <small style={{ marginLeft: 8, color: '#999' }}>({h.difficulty})</small></div>
            <div style={{ marginTop: 6, color: '#222' }}><strong>A:</strong> {h.answer}</div>
            <div style={{ marginTop: 6, fontSize: 11, color: '#888' }}>{h.ts}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
