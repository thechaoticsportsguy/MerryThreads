"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { colorways, formatPrice } from "../lib/products";
import { MAX_NAME_LENGTH, validateName } from "../lib/personalization";
import NamePreview from "./NamePreview";
import ProductGallery from "./ProductGallery";
import ProductCard from "./ProductCard";

export default function ProductDetails({ product, matchingProducts, initialColorway }) {
  const [colorway, setColorway] = useState(initialColorway);
  const [size, setSize] = useState(product.sizes[0]);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [message, setMessage] = useState("");
  const [showSticky, setShowSticky] = useState(false);
  const addButtonRef = useRef(null);
  const nameRef = useRef(null);
  const color = colorways.find(({ id }) => id === colorway);

  useEffect(() => {
    let frame;
    function update() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setShowSticky(addButtonRef.current.getBoundingClientRect().bottom < 0);
      });
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  function changeName(value) {
    setName(value.slice(0, MAX_NAME_LENGTH));
    setNameError(validateName(value));
    setMessage("");
  }

  function previewBag(event) {
    event.preventDefault();
    const error = validateName(name, true);
    setNameError(error);
    if (error) {
      nameRef.current.focus();
      return;
    }
    setMessage("This set is ready to preview. Purchasing is unavailable while product details are being confirmed. Nothing has been added to a bag.");
  }

  return (
    <div className="mx-auto max-w-[1280px] px-6 py-8 pb-24 md:py-16">
      <nav aria-label="Breadcrumb" className="mb-8 text-[14px]"><Link className="text-link" href="/#shop">Pajamas</Link><span aria-hidden="true"> / </span><span>{product.name}</span></nav>
      <div className="grid min-w-0 gap-10 md:grid-cols-2 md:gap-16">
        <ProductGallery key={colorway} images={product.images[colorway]} name={name} />
        <div className="min-w-0">
          <p className="text-[14px] text-warmgrey">A name on every set</p>
          <h1 className="mt-2 font-display text-[36px] leading-tight">{product.name}</h1>
          <p aria-live="polite" aria-atomic="true" className="mt-4 font-display text-[36px]" data-testid="product-price">{formatPrice(size.price)}<span className="sr-only"> for size {size.label}</span></p>
          <p className="mt-4">{product.description}</p>
          <aside className="mt-6 rounded-btn border border-softsage/30 p-4 text-[14px]" aria-label="Catalog preview notice">
            Preview only. Sizes, colors, and size-based prices are provisional. Fabric, care, and measurements await confirmation. Purchasing is unavailable.
          </aside>
          <form onSubmit={previewBag} className="mt-10" noValidate>
            <fieldset>
              <legend className="text-[15px] font-medium">Color: {color.name}</legend>
              <div className="mt-4 flex flex-wrap gap-4">
                {colorways.filter(({ id }) => product.colorways.includes(id)).map((option) => (
                  <button key={option.id} type="button" aria-pressed={colorway === option.id} aria-label={`Color: ${option.name}`}
                    onClick={() => { setColorway(option.id); setMessage(""); }} className="group flex min-h-11 min-w-16 flex-col items-center gap-2 rounded-btn p-2">
                    <span aria-hidden="true" className={`block h-10 w-10 rounded-full border border-softsage/30 ${option.swatchClass} ${colorway === option.id ? "outline-2 outline-offset-4 outline-sage" : ""}`} />
                    <span className={`text-[14px] ${colorway === option.id ? "underline underline-offset-4" : "group-hover:underline group-focus-visible:underline"}`}>{option.name}</span>
                  </button>
                ))}
              </div>
            </fieldset>
            <fieldset className="mt-8">
              <legend className="text-[15px] font-medium">Size: {size.label}</legend>
              <div className="mt-4 flex flex-wrap gap-2">
                {product.sizes.map((option) => (
                  <button key={option.label} type="button" aria-pressed={size.label === option.label} aria-label={`Size ${option.label}`} onClick={() => { setSize(option); setMessage(""); }}
                    className={`min-h-11 min-w-16 rounded-btn border border-softsage/30 px-4 py-2 text-[15px] ${size.label === option.label ? "bg-sage text-eggshell" : "bg-eggshell text-sage"}`}>{option.label}</button>
                ))}
              </div>
            </fieldset>
            <NamePreview value={name} onChange={changeName} error={nameError} inputRef={nameRef} previewImage={product.images[colorway][2]} />
            <button ref={addButtonRef} type="submit" className="button-primary mt-8 w-full" aria-describedby="purchase-note">Add to bag</button>
            <p id="purchase-note" className="mt-2 text-[14px] text-warmgrey">Preview only — purchases aren’t open yet.</p>
            <p role="status" className="mt-4 text-[14px]">{message}</p>
          </form>
          <div className="mt-10 divide-y divide-softsage/30 border-y border-softsage/30">
            <details open className="py-4">
              <summary className="min-h-11 cursor-pointer py-2 text-[15px] font-medium">Size and fit</summary>
              <p className="my-4 text-[14px] text-warmgrey">Provisional size labels. Measurements in inches will be added once confirmed by the supplier.</p>
              <table className="w-full text-left text-[14px]">
                <caption className="sr-only">Unconfirmed {product.name} measurements in inches</caption>
                <thead><tr>{["Size", "Chest", "Waist", "Hip"].map((label) => <th key={label} scope="col" className="border-b border-softsage/30 py-2 font-medium">{label}</th>)}</tr></thead>
                <tbody>{product.sizes.map((option) => <tr key={option.label}><th scope="row" className="py-2 font-medium">{option.label}</th>{Object.entries(option.measurements).map(([key, value]) => <td key={key} className="py-2">{value ?? <span aria-label="Awaiting confirmation">—</span>}</td>)}</tr>)}</tbody>
              </table>
              <p className="mt-2 text-[14px] text-warmgrey">— Awaiting confirmation. Don’t use this preview to choose a fit.</p>
            </details>
            <details className="py-4"><summary className="min-h-11 cursor-pointer py-2 text-[15px] font-medium">Fabric and care</summary><p className="mt-4 text-[14px]">{product.fabric ?? "Fabric composition: awaiting confirmation."}</p><p className="mt-2 text-[14px]">{product.care ?? "Care instructions: awaiting confirmation."}</p></details>
            <details className="py-4"><summary className="min-h-11 cursor-pointer py-2 text-[15px] font-medium">Shipping and returns</summary><p className="mt-4 text-[14px]">{product.shipping ?? "Shipping times and rates: awaiting confirmation."}</p><p className="mt-2 text-[14px]">{product.returns ?? "Returns policy for personalized items: awaiting confirmation."}</p></details>
          </div>
        </div>
      </div>
      <section aria-labelledby="matching-heading" className="mt-16 border-t border-softsage/30 pt-16">
        <h2 id="matching-heading" className="section-heading">Matching sets</h2>
        <p className="mt-4">More ways to match in {color.name.toLowerCase()}. Preview colorway.</p>
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">{matchingProducts.filter((item) => item.colorways.includes(colorway)).map((item) => <ProductCard key={item.handle} product={item} colorway={colorway} />)}</div>
      </section>
      {showSticky && <div className="fixed inset-x-0 bottom-0 z-40 border-t border-softsage/30 bg-eggshell p-4 pb-[max(16px,env(safe-area-inset-bottom))] md:hidden" data-testid="sticky-purchase">
        <div className="flex items-center justify-between gap-4"><div><p className="font-display text-[24px]">{formatPrice(size.price)}</p><p className="text-[14px]">Size {size.label} · Preview only</p></div><button type="button" onClick={previewBag} className="button-primary">Add to bag</button></div>
        {message && <p role="status" className="mt-2 text-[14px]">{message}</p>}
      </div>}
    </div>
  );
}
