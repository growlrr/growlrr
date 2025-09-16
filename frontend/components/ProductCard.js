import Link from "next/link";

export default function ProductCard({ sku, name, short, kcal }) {
  return (
    <Link href={`/products/${sku}`} style={{ textDecoration: "none", color: "inherit" }}>
      <div style={{
        width: 220,
        borderRadius: 12,
        boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
        padding: 16,
        margin: 12,
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        cursor: "pointer"
      }}>
        <div style={{ height: 120, borderRadius: 8, background: "#f6f4f1", display:"flex",alignItems:"center",justifyContent:"center", fontSize:24 }}>
          {name.split(" ")[0]}
        </div>
        <div style={{ fontWeight: 700 }}>{name}</div>
        <div style={{ fontSize: 13, color: "#555" }}>{short}</div>
        <div style={{ marginTop: "auto", fontSize: 13, color: "#333" }}>~{kcal} kcal / can</div>
      </div>
    </Link>
  );
}

