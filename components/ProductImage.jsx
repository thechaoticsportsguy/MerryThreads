import Image from "next/image";

export default function ProductImage({ image, children, sizes = "(max-width: 767px) 100vw, 50vw", priority = false }) {
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-card bg-oat">
      {image.src ? (
        <Image src={image.src} alt={image.alt} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        <div role="img" aria-label={`Photo placeholder: ${image.alt}`} data-image={image.id} className="absolute inset-0 flex items-end justify-center p-4 text-center">
          <span className="text-[14px] text-warmgrey">{image.alt}<br />Photography coming soon</span>
        </div>
      )}
      {children}
    </div>
  );
}
