# Merrythread — project rules

## Current typography direction (owner update, September 5, 2026)

This update supersedes the older typography guidance below. Use Gambetta
from local WOFF2 files via next/font/local as the display family, with regular
and medium weights and restrained regular italic accents. Keep Hanken Grotesk
for body, navigation, buttons, form labels, prices, and other functional UI.
Never restore Instrument Serif or introduce the excluded modern font families.

Use the shared typography classes and variables in app/globals.css. Major
headings have slightly tight tracking and readable line height; small sans
eyebrows may use uppercase and subtle tracking. Large headings stay in
sentence case. Preserve the current structure, responsive behavior, and
32px logo with a 12px wordmark gap. Do not add textures or ornaments.

Font files and the original Fontshare license live in public/fonts.

Personalised satin Christmas pyjamas. Names embroidered on each set. Sold as
family bundles.

Read this file before writing any code. Follow it exactly. If something here
conflicts with a request, say so rather than silently deviating.

---

## Stack

- Next.js 15, App Router
- **JavaScript, not TypeScript** — the owner is a beginner. No `.ts` or `.tsx` files.
- Tailwind CSS v4 (CSS-first config — there is no `tailwind.config.js`)
- Deployed on Netlify (NOT Vercel — its free tier bans commercial use)
- Shopify Storefront API for catalogue, cart and checkout
- No database of our own. Shopify is the source of truth.

Do not add state libraries, component libraries, ORMs, or auth. If a feature
seems to need one, ask first.

---

## Design system

These values are fixed. Never introduce a colour, font, radius or shadow that
is not on this page.

### Colour

Tailwind v4 has no config file. Define every token in `app/globals.css`
inside an `@theme` block, directly after `@import "tailwindcss";`:

```css
@import "tailwindcss";

@theme {
  --color-eggshell: #FBF8F3;
  --color-sage: #2F4237;
  --color-oat: #EDE6DA;
  --color-cranberry: #A63D34;
  --color-softsage: #7C8F7B;
  --color-warmgrey: #6B665E;

  --font-display: var(--font-instrument-serif), serif;
  --font-sans: var(--font-hanken-grotesk), sans-serif;

  --radius-btn: 8px;
  --radius-card: 16px;
}
```

That generates `bg-eggshell`, `text-sage`, `border-softsage`, `font-display`,
`rounded-btn` and so on automatically. Never hardcode a hex value in a
component — always use the generated utility.

Load the two fonts with `next/font/google` in `app/layout.js`, assigning them
to the CSS variables `--font-instrument-serif` and `--font-hanken-grotesk`
via each font's `variable` option, and put both variable class names on the
`<html>` element.

| Token | Hex | Used for | Rough share of page |
|---|---|---|---|
| `eggshell` | `#FBF8F3` | Page background | 58% |
| `sage` | `#2F4237` | All text, nav, footer | 20% |
| `oat` | `#EDE6DA` | Cards, inputs, alternating sections | 11% |
| `cranberry` | `#A63D34` | Buttons, sale price, low-stock badge | 5% |
| `softsage` | `#7C8F7B` | Borders, quiet badges | 4% |
| `warmgrey` | `#6B665E` | Secondary and helper text | 2% |

Rules:

- Body text is `sage`, never black, never grey. This is what makes the site
  read as festive without any decoration.
- `cranberry` appears on buttons, the sale price, and the low-stock badge.
  Nowhere else. Never as a section background.
- `cranberry` and `sage` never touch. Always separate them with `eggshell`.
- Borders are `softsage` at 30% opacity, 1px.
- Saturated colour lives only inside photographs.

### Type

Load from Google Fonts via `next/font/google`.

- Headings — Instrument Serif, weight 400 only
- Body and UI — Hanken Grotesk, weights 400 and 500

Scale:

| Role | Size | Weight | Font |
|---|---|---|---|
| Hero headline | 56px desktop / 36px mobile | 400 | Instrument Serif |
| Section heading | 36px / 28px | 400 | Instrument Serif |
| Product title | 24px | 400 | Instrument Serif |
| Body | 16px, line-height 1.6 | 400 | Hanken Grotesk |
| Small / helper | 14px | 400 | Hanken Grotesk |
| Button and label | 15px | 500 | Hanken Grotesk |

Sentence case everywhere. No all-caps labels. No letter-spacing tricks.

### Spacing and shape

- Spacing scale: 4, 8, 16, 24, 40, 64, 96px. Nothing in between.
- Border radius: `8px` on buttons and inputs, `16px` on image cards. Two
  values only.
- **No box-shadows anywhere.** Separate sections with the `oat` background
  instead.
- Max content width 1280px, 24px gutters on mobile.

### Components

- Primary button — solid `cranberry`, `eggshell` text, 8px radius, 14px
  vertical padding.
- Secondary button — transparent, 1px `sage` border, `sage` text.
- Input — `oat` background, 1px `softsage` border, `sage` text, 8px radius,
  44px tall minimum for touch.
- Every interactive element needs a visible focus ring: 2px `sage` outline,
  2px offset.

### Motion

One page-load fade on the hero. Hover transitions of 150ms on buttons and
links only. Nothing else animates. Respect `prefers-reduced-motion`.

---

## Content and voice

- Sentence case. Contractions. Short sentences.
- No exclamation points. No "simply", "just", "easy", "unlock", "seamless".
- Buttons name the action: "Add to bag", "Build your set". Never "Submit".
- Errors say what happened and what to do: "That name is too long — 12
  characters max for embroidery."
- Empty states invite action rather than apologise.

---

## Images

Photography is not ready yet. Every image slot must be a placeholder `div`
with the **exact final aspect ratio**, `oat` background, and a `data-image`
attribute naming what goes there.

Fixed aspect ratios — do not deviate, the layout depends on them:

| Slot | Ratio |
|---|---|
| Hero | 3:2 desktop, 4:5 mobile |
| Product card | 4:5 |
| Product gallery | 4:5 |
| Lifestyle band | 16:9 |

Use `next/image` from the start with `fill` and a `sizes` prop, so swapping
real files in later is a one-line change per slot.

---

## Pages

```
/                       home
/collections/[handle]   collection listing
/products/[handle]      single product
/build                  family bundle builder  ← the core page
/pages/size-guide       measurements table
/pages/[slug]           privacy, terms, refunds, shipping
/cart                   cart
```

### Home

1. Hero — one full-bleed image, one headline, one button. No carousel.
2. Shipping cutoff bar — sticky, `oat` background, live countdown.
3. Three colourway tiles linking to collections.
4. "Build your family set" band pointing at `/build`.
5. Three-step how-it-works: pick a set, add names, we stitch and ship.
6. Reviews.
7. Email capture — 15% off first order.

### Product page

- Gallery left, details right on desktop; stacked on mobile.
- Colour swatches as visual squares that swap the gallery image. Never a
  dropdown.
- Name field with **live preview**: the typed name renders in the embroidery
  typeface over the product image, updating as they type. This is the most
  important interaction on the site — build it first, build it well.
- Size and fit, fabric and care, shipping — each an accordion.
- Sticky add-to-bag bar on mobile.

### Bundle builder (`/build`)

The page that differentiates us. Nobody else sells the family as one product.

1. Pick a colourway.
2. Add family members — adult, kid, baby, pet. Each row has a size select
   and a name input with live preview.
3. Running total showing the bundle saving against buying separately.
4. One "Add bundle to bag" button.

Each member becomes its own Shopify line item carrying its name as a line
item property, so the factory receives a clean per-garment list.

---

## Shopify integration

- Storefront API via GraphQL. Public token in `NEXT_PUBLIC_SHOPIFY_*` env
  vars.
- Personalisation travels as **line item properties** — `_name`, `_font`.
  Underscore-prefixed keys stay hidden from the customer but reach the order.
- Cart lives in Shopify's Cart API, cart ID in `localStorage`.
- Checkout is Shopify's hosted checkout. We do not build a checkout page.
- Never write secret admin tokens into client components.

---

## Constraints

- **Mobile first.** Most traffic arrives from Meta ads on phones. Build every
  component at 375px before styling desktop.
- Name field is capped at 12 characters — an embroidery limit, enforced in
  the UI with a live counter.
- Legal pages must exist before any ads run; Meta rejects stores without
  them.
- Meta Pixel plus Conversions API. Browser-only pixels lose a large share of
  events.
- Lighthouse performance above 90 on mobile.
- Keyboard navigable, visible focus states, alt text on every image.
