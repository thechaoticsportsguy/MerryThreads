import { notFound } from "next/navigation";
import { getProduct, products } from "../../../lib/products";
import ProductDetails from "../../../components/ProductDetails";

export async function generateMetadata({ params }) {
  const product = getProduct((await params).handle);
  return { title: product ? `${product.name} | Merrythread` : "Set not found | Merrythread", robots: { index: false, follow: false } };
}

export default async function ProductPage({ params, searchParams }) {
  const product = getProduct((await params).handle);
  if (!product) notFound();
  const requestedColor = (await searchParams).colorway;
  const initialColorway = product.colorways.includes(requestedColor) ? requestedColor : product.colorways[0];
  const matchingProducts = products.filter(({ handle }) => handle !== product.handle);
  return <ProductDetails key={`${product.handle}-${initialColorway}`} product={product} matchingProducts={matchingProducts} initialColorway={initialColorway} />;
}
