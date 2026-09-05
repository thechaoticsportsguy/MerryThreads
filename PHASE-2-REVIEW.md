# Phase 2 review

Stopped after phase 2. Phase 3 has not started.

## Try the product page

Run `npm ci`, then `npm run dev`. Open
`/products/womens-short-set`.

- Type a name to see it immediately on the front and pocket-detail previews.
  On mobile, a pocket preview also appears beside the name field.
- Try an apostrophe, accented letters, a number, and more than 12 characters.
  Invalid input gets an inline explanation. The stored input is capped at 12.
- Select another size: the price changes. Select another color: the gallery
  and matching-product links change, while the entered name is retained.
- Choose thumbnails or swipe the gallery on a phone. The back view does not
  show chest embroidery.
- Scroll below the main add button on mobile, then jump back to the top.
  The bottom purchase bar appears and disappears accordingly.
- Add to bag validates the name and explains that purchasing is unavailable.
  It never pretends to add an item or persist a cart.

## Confirm before selling

The nine product names and price ranges come from BUILD-PROMPT.md. Regular
S–2XL, plus 1X–4X, burgundy, forest, ivory stripe, and interpolated per-size
prices are provisional. Prices interpolate evenly and round to the nearest
cent. None of these products is marked purchasable.

Fabric composition, care, measurements, shipping, and returns are null in
`lib/products.js`. The page explains the missing details; no measurements or
policies have been invented. Photography is labeled placeholder artwork at
4:5. Embroidery positions must be checked when actual photography arrives.

## Scope

The branch includes the existing local homepage, header, footer, and styles
as the starting scaffold, then connects them to the adult catalog. The old
preview catalog is replaced; sample home copy is separated into
`lib/home-content.js`. An unconfirmed delivery countdown is removed from
the shared header.

Collection, legal, cart, search, and account destinations linked by the
existing scaffold are not implemented in phases 1–2. The new product routes,
homepage product links, and matching-set links are available for this review.
No checkout, deployment, or Shopify integration has been added.

## Validation

- `npm run build` passed after phase 1 and after phase 2, without warnings.
- `npm run lint` passed.
- `node --test lib/products.test.mjs lib/personalization.test.mjs`: 4 passed.
- Headless Chrome checks passed at 375px and 1440px: live preview, invalid and
  long names, size prices, color switching, thumbnails, actual touch swipe,
  sticky-bar scroll behavior, unchanged localStorage, matching links,
  keyboard selection and focus outlines, accordions, all nine product URLs,
  invalid color fallback, and a 404 for an unknown handle. No page errors.
- Mobile and desktop screenshots were visually reviewed.

Lighthouse targets belong to phase 6 and have not been measured here.
