# Merrythread — full build prompt

You have full read/write access to the project at `C:\dev\merrythread`.
Read `CLAUDE.md` first and follow it for every design decision. American
spelling throughout. Next.js 16, App Router, JavaScript only, Tailwind v4.

Work through the phases in order. After each phase, run `npm run build` and
fix any errors before continuing. Do not skip ahead.

---

## The business

Merrythread sells personalized satin Christmas pajama sets. Every set has a
first name embroidered on the chest pocket. Adults only — womens, mens, and
womens plus. No children's sizes.

The product is not complicated. The site's job is to make a $30 pajama set
feel like a $60 gift. Aesthetics and the personalization moment are the
entire value proposition.

---

## Phase 1 — Real product data

Replace `lib/storefront-preview.js` with `lib/products.js` containing the
real catalog. Price varies by size, so each product needs a price map, not a
single price.

Nine products:

| Handle | Name | Price range |
|---|---|---|
| `womens-short-set` | Women's short set | $26–36 |
| `womens-short-long-set` | Women's short + long set | $28–38 |
| `womens-long-set` | Women's long set | $30–40 |
| `mens-short-set` | Men's short set | $26–36 |
| `mens-short-long-set` | Men's short + long set | $28–38 |
| `mens-long-set` | Men's long set | $30–40 |
| `womens-plus-short-set` | Women's plus short set | $28–38 |
| `womens-plus-short-long-set` | Women's plus short + long set | $30–40 |
| `womens-plus-long-set` | Women's plus long set | $32–42 |

Structure each product as:

```js
{
  handle: "womens-short-set",
  name: "Women's short set",
  category: "womens",          // womens | mens | womens-plus
  sizes: [
    { label: "S", price: 26 },
    { label: "M", price: 28 },
    { label: "L", price: 31 },
    { label: "XL", price: 34 },
    { label: "2XL", price: 36 },
  ],
  colorways: ["burgundy", "forest", "ivory-stripe"],
  images: { ... },
  description: "...",
  fabric: "...",
  care: "...",
}
```

Interpolate the intermediate size prices evenly across each range. Plus
sizes use 1X–4X labels.

Define colorways separately with real hex swatch values: burgundy `#7A2E35`,
forest `#2F4237`, ivory stripe `#EDE6DA`.

Derive a `priceFrom` helper so cards can show "From $26".

## Phase 2 — Product page

`app/products/[handle]/page.js` — this is where money is made. Build it well.

**Gallery.** One large 4:5 image, three thumbnails below on desktop, swipe
carousel on mobile. Clicking a thumbnail swaps the main image. Selecting a
colorway also swaps the gallery.

**Personalization — the centerpiece.** Build `components/NamePreview.jsx`:

- A text input capped at 12 characters with a live counter reading
  "7 / 12 characters"
- As the user types, the name renders **on the product image**, positioned
  over the chest pocket, in a script/serif embroidery typeface
- Add a subtle stitched look: text with a slight letterpress or stroke
  treatment so it reads as thread rather than a font overlay
- Empty state shows a dashed outline where the name will go with the hint
  "Their name goes here"
- Validate: letters, spaces, hyphens and apostrophes only. Show an inline
  error in cranberry for anything else. Never block typing silently.
- The preview must feel instant. No debounce delay on the render.

This interaction is the reason someone buys from us instead of Amazon. It
should feel delightful, not like a form field.

**Size selector.** A row of buttons, not a dropdown. Selected state is a
solid sage fill with eggshell text. **The price updates live** as size
changes — this is why prices are ranges. Show the price prominently in the
display font, not small body text.

**Colorway swatches.** Circular swatches using the real hex values, 2px sage
ring on the selected one, name shown below on hover and focus.

**Accordions.** Size and fit with a real measurement table in inches, fabric
and care, shipping and returns. Closed by default except size and fit.

**Sticky bar on mobile** with price and add-to-bag, appearing after the user
scrolls past the main add button.

**Below the fold:** a "matching sets" row showing the other products in the
same colorway, so a woman buying for herself sees the mens set.

## Phase 3 — Collection and other pages

- `app/collections/[handle]/page.js` — filter by category. Handles: `all`,
  `womens`, `mens`, `womens-plus`. Sidebar filters on desktop, a filter sheet
  on mobile. Sort by price.
- `app/pages/size-guide/page.js` — real measurement tables for all three
  categories, in inches.
- `app/pages/[slug]/page.js` — privacy, terms, refunds, shipping, contact,
  our story. Use plain readable prose in a single narrow column. These must
  exist before ads run.
- `app/cart/page.js` — line items showing the embroidered name for each,
  quantity controls, subtotal, checkout button.

## Phase 4 — Cart state

`lib/cart.js` with React context. Cart persists in `localStorage`. Each line
item carries handle, size, colorway, name, quantity, and unit price. The
header cart icon shows a live count badge. Adding to bag opens a slide-out
drawer confirming what was added rather than navigating away.

No backend yet — Shopify comes later. Structure the cart so swapping in the
Shopify Cart API touches only `lib/cart.js`.

## Phase 5 — Polish

This phase is what separates it from a template.

- **Hero.** Full-bleed image, headline and button overlaid, dark scrim.
  Should feel like an editorial magazine cover, not a banner.
- **Contrast discipline.** At least two full sage sections per page. White
  cards on eggshell. Never oat on eggshell — the values are too close.
- **Typography.** Let Instrument Serif get genuinely large in headlines. Its
  personality only shows above 40px. Body copy stays quiet and small.
- **Motion.** One page-load fade on the hero. 150ms hover on links and
  buttons. Gallery image swaps cross-fade. Nothing else moves. Respect
  `prefers-reduced-motion`.
- **Empty and loading states.** Every one written as a sentence, not a
  spinner.
- **Mobile first.** Build and check every component at 375px before desktop.
  Most traffic will be phones from Meta ads.

## Phase 6 — Quality gate

- `npm run build` passes with no errors and no warnings
- Lighthouse mobile performance above 90, accessibility 100
- Every interactive element reachable by keyboard with a visible focus ring
- Every image placeholder has a `data-image` attribute naming its subject and
  an accurate `aria-label`
- No hardcoded hex values in components — only the tokens from `globals.css`
- No `console.log` left behind

---

## Rules

- Never use TypeScript.
- Never create `tailwind.config.js` — Tailwind v4 configures in CSS.
- Never invent customer reviews, ratings, or press mentions. If placeholder
  social proof is needed, label it clearly as a sample.
- Images are placeholder divs at exact aspect ratios until real files exist.
- Commit after each phase with a clear message.
- If something in `CLAUDE.md` conflicts with this prompt, say so rather than
  silently choosing one.
## Review scope and unconfirmed details

Stop after phase 2 for owner review. Do not start phase 3 until requested.

For this build, the newer requirements above take precedence over conflicting
CLAUDE.md guidance: Next.js 16, American spelling, adult products only,
circular colorway swatches, and cranberry validation messages. Keep the
remaining design tokens and use the existing serif for embroidery. Define
swatch colors in globals.css, never as hex literals in components.

Regular S–2XL sizes, plus 1X–4X sizes, all three colorways, and interpolated
size prices are provisional examples, not confirmed inventory. Label them
clearly in the catalog and product UI. The supplied price ranges are the
owner's build inputs; per-size prices remain estimates pending confirmation.

Do not invent fiber composition, care instructions, measurements, delivery
promises, or returns policies. Use null for unconfirmed facts and show
“Awaiting confirmation” where appropriate. Measurement tables may show size
labels with missing measurements explicitly marked; never fabricate inches.

During phase 2, add-to-bag may validate selections and explain that purchasing
is not available in this preview. Do not claim an item was added or implement
phase 4 cart persistence early. Unconfirmed products must not be purchasable.
