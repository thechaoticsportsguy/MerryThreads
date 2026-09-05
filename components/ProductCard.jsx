import Link from "next/link";
import { colorways, formatPrice, priceFrom } from "../lib/products";
import ProductImage from "./ProductImage";

export default function ProductCard({ product, colorway = product.colorways[0] }) {
  return (
    <article className="flex h-full min-w-0 flex-col rounded-card bg-white p-2 md:p-4">
      <Link href={`/products/${product.handle}?colorway=${colorway}`} className="text-link block">
        <ProductImage image={product.images[colorway][0]} sizes="(max-width: 767px) 50vw, 25vw" />
        <h3 className="product-title mt-4">{product.name}</h3>
      </Link>
      <p className="price-small mt-4">From {formatPrice(priceFrom(product))}</p>
      <p className="mt-1 text-[14px] text-warmgrey">Preview sizes and colors</p>
      <ul aria-label="Preview colorways" className="mt-4 flex flex-wrap gap-2">
        {colorways.filter(({ id }) => product.colorways.includes(id)).map((color) => (
          <li key={color.id} title={color.name}>
            <span aria-hidden="true" className={`block h-4 w-4 rounded-full border border-softsage/30 ${color.swatchClass}`} />
            <span className="sr-only">{color.name}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
