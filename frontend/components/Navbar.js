import Link from "next/link";

export default function Navbar() {
  return (
    <header className="p-4 shadow bg-white flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <div className="text-2xl font-bold">Growlrr</div>
        <div className="text-sm text-red-500">Growl with us ♥</div>
      </div>
      <nav className="space-x-4 text-sm">
        <Link href="/">Home</Link>
        <Link href="/pet">Pet</Link>
        <Link href="/diet">Diet</Link>
        <Link href="/crowdfund">Crowdfund</Link>
        <Link href="/checkout">Checkout</Link>
        <Link href="/about">About Us</Link>
        <Link href="/values">Values</Link>
        <Link href="/products">Products</Link>
      </nav>
    </header>
  );
}
