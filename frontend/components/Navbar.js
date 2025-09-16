import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <Link href="/">Home</Link> |{" "}
      <Link href="/pet">Pet</Link> |{" "}
      <Link href="/diet">Diet</Link> |{" "}
      <Link href="/crowdfund">Crowdfund</Link> |{" "}
      <Link href="/checkout">Checkout</Link> |{" "}
      <Link href="/about">About Us</Link> |{" "}
      <Link href="/values">Values</Link> |{" "}
      <Link href="/products">Products</Link>
    </nav>
  );
}

