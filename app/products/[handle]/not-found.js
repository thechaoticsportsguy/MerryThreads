import Link from "next/link";

export default function ProductNotFound() {
  return <div className="mx-auto max-w-[1280px] px-6 py-16"><h1 className="section-heading">That set isn’t in our preview</h1><p className="mt-4">Choose a set from the current collection to add a name.</p><Link href="/#shop" className="button-primary mt-6">Explore the sets</Link></div>;
}
