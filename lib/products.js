// Owner-supplied products and price ranges. Sizes, availability, colorways and
// interpolated prices are PROVISIONAL until confirmed against supplier data.
export const colorways = [
  { id: "burgundy", name: "Burgundy", swatchClass: "bg-burgundy" },
  { id: "forest", name: "Forest", swatchClass: "bg-forest" },
  { id: "ivory-stripe", name: "Ivory stripe", swatchClass: "bg-ivory-stripe" },
].map((colorway) => ({
  ...colorway,
  confirmed: false,
  href: `/products/womens-short-set?colorway=${colorway.id}`,
  image: `colorway-${colorway.id}-satin-pajamas`,
}));

const catalog = [
  ["womens-short-set", "Women's short set", "womens", 26, 36],
  ["womens-short-long-set", "Women's short + long set", "womens", 28, 38],
  ["womens-long-set", "Women's long set", "womens", 30, 40],
  ["mens-short-set", "Men's short set", "mens", 26, 36],
  ["mens-short-long-set", "Men's short + long set", "mens", 28, 38],
  ["mens-long-set", "Men's long set", "mens", 30, 40],
  ["womens-plus-short-set", "Women's plus short set", "womens-plus", 28, 38],
  ["womens-plus-short-long-set", "Women's plus short + long set", "womens-plus", 30, 40],
  ["womens-plus-long-set", "Women's plus long set", "womens-plus", 32, 42],
];

export const products = catalog.map(([handle, name, category, minimum, maximum]) => {
  const labels = category === "womens-plus" ? ["1X", "2X", "3X", "4X"] : ["S", "M", "L", "XL", "2XL"];
  return {
    handle,
    name,
    category,
    currency: "USD",
    priceRange: { minimum, maximum },
    sizes: labels.map((label, index) => ({
      label,
      price: Math.round((minimum + (maximum - minimum) * index / (labels.length - 1)) * 100) / 100,
      measurements: { chest: null, waist: null, hip: null },
    })),
    colorways: colorways.map(({ id }) => id),
    images: Object.fromEntries(colorways.map(({ id, name: colorName }) => [id,
      ["front", "back", "pocket detail"].map((view) => ({
        id: `${handle}-${id}-${view.replaceAll(" ", "-")}`,
        src: null,
        view,
        alt: `${name} in ${colorName.toLowerCase()}, ${view}`,
        namePosition: view === "front" ? { left: "61%", top: "32%" } : view === "pocket detail" ? { left: "50%", top: "48%" } : null,
      })),
    ])),
    description: "Personalized satin Christmas pajamas with a first name embroidered on the chest pocket. A matching look, with a detail of their own.",
    fabric: null,
    care: null,
    shipping: null,
    returns: null,
    confirmed: false,
    purchasable: false,
  };
});

export function priceFrom(product) {
  return Math.min(...product.sizes.map(({ price }) => price));
}

export function formatPrice(price) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: Number.isInteger(price) ? 0 : 2 }).format(price);
}

export function getProduct(handle) {
  return products.find((product) => product.handle === handle);
}
