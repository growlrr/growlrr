export default function CardGrid({ children }) {
  return (
    <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(240px, 1fr))', gap:16}}>
      {children}
    </div>
  );
}
