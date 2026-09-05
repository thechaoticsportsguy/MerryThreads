"use client";

import { useEffect, useRef, useState } from "react";
import ProductImage from "./ProductImage";
import { NameEmbroidery } from "./NamePreview";

export default function ProductGallery({ images, name }) {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    const resize = new ResizeObserver(() => {
      track.scrollLeft = track.clientWidth * activeRef.current;
    });
    resize.observe(track);
    return () => resize.disconnect();
  }, []);

  function select(index) {
    activeRef.current = index;
    setActive(index);
    trackRef.current.scrollTo({ left: trackRef.current.clientWidth * index, behavior: "instant" });
  }

  return (
    <section aria-label="Product gallery" className="min-w-0">
      <div ref={trackRef} className="gallery-track flex snap-x snap-mandatory overflow-x-auto md:overflow-x-hidden"
        onScroll={(event) => {
          const index = Math.round(event.currentTarget.scrollLeft / event.currentTarget.clientWidth);
          activeRef.current = index;
          setActive(index);
        }}>
        {images.map((image, index) => (
          <div key={image.id} className="w-full shrink-0 snap-center" aria-hidden={index !== active}>
            <ProductImage image={image} priority={index === 0}>
              <NameEmbroidery name={name} position={image.namePosition} />
            </ProductImage>
          </div>
        ))}
      </div>
      <p className="mt-2 text-[14px] text-warmgrey" aria-live="polite">{active + 1} of {images.length} · {images[active].view}</p>
      <p className="mt-2 text-[14px] text-warmgrey md:hidden">Swipe to see the set, or choose a view below.</p>
      <div className="mt-4 grid grid-cols-3 gap-4" aria-label="Choose product view">
        {images.map((image, index) => (
          <button key={image.id} type="button" onClick={() => select(index)} aria-label={`Show ${image.view}`} aria-pressed={active === index}
            className={`rounded-card border p-1 ${active === index ? "border-sage" : "border-softsage/30"}`}>
            <div role="img" aria-label={`Photo placeholder: ${image.alt}`} data-image={`${image.id}-thumbnail`} className="aspect-[4/5] rounded-card bg-oat p-2 text-[14px]">
              <span className="flex h-full items-center justify-center">{image.view}</span>
            </div>
          </button>
        ))}
      </div>
      <p className="mt-4 text-[14px] text-warmgrey">Name placement is a preview. Final photography and embroidery placement await confirmation.</p>
    </section>
  );
}
