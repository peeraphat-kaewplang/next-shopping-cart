import Link from "next/link";
import LinkMenu from "./Menu";
import CartButton from "./CartButton";

export default function Navbar() {
  return <nav>
    <div className="mx-auto max-w-6xl flex justify-between items-center text-sm text-slate-100 py-4">
      <Link href="/">
      </Link>

      <div className="flex gap-2">
        <LinkMenu href="/product" label="Product" isNew/>
      </div>

      <div className="flex gap-1 items-center">
        <CartButton/>
      </div>
    </div>
  </nav>
}