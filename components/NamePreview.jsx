"use client";

import { MAX_NAME_LENGTH } from "../lib/personalization";
import ProductImage from "./ProductImage";

export function NameEmbroidery({ name, position }) {
  if (!position) return null;
  return (
    <div aria-hidden="true" style={position} className="name-embroidery pointer-events-none absolute w-[54%] -translate-x-1/2 -translate-y-1/2 text-center">
      {name.trim() ? <span className="stitched-name block break-words font-display">{name}</span> : (
        <span className="inline-block rounded-btn border border-dashed border-softsage bg-eggshell/80 p-2 text-[14px]">Their name goes here</span>
      )}
    </div>
  );
}

export default function NamePreview({ value, error, onChange, inputRef, previewImage }) {
  return (
    <div className="mt-10">
      <label htmlFor="embroidered-name" className="block font-display text-[28px]">Make it theirs</label>
      <p id="name-hint" className="mt-2 text-[14px] text-warmgrey">One name, stitched on the chest pocket. Up to 12 characters.</p>
      <input ref={inputRef} id="embroidered-name" name="embroidered-name" type="text" autoComplete="off" spellCheck={false}
        value={value} onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)} aria-describedby={`name-hint name-count${error ? " name-error" : ""}`}
        placeholder="e.g. Jamie" className="mt-4 min-h-11 w-full rounded-btn border border-softsage/30 bg-oat px-4 py-2 text-[16px]" />
      <p id="name-count" className="mt-2 text-[14px] text-warmgrey" aria-live="polite">{value.length} / {MAX_NAME_LENGTH} characters</p>
      <p className="sr-only" role="status">{value.trim() ? `Embroidery preview: ${value}` : "Their name goes here"}</p>
      {error && <p id="name-error" role="alert" className="mt-2 bg-eggshell text-[14px] text-cranberry">{error}</p>}
      <div className="mt-4 w-64 max-w-full md:hidden" aria-label="Live pocket preview">
        <ProductImage image={previewImage} sizes="256px" caption="Pocket detail">
          <NameEmbroidery name={value} position={previewImage.namePosition} />
        </ProductImage>
      </div>
    </div>
  );
}
