import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex gap-4 p-4 bg-gray-100 shadow">
      <Link href="/">Home</Link>
      <Link href="/diet">Diet Chart</Link>
      <Link href="/checkout">Checkout</Link>
      <Link href="/ask">Ask Growlrr</Link>
    </nav>
  );
}
