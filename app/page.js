import { products } from "../lib/products";
import Link from "next/link";
import ProductCard from "../components/ProductCard";
import {
  reviews,
  steps,
  trustPoints,
} from "../lib/home-content";

export default function Home() {
  return (
    <>
      <section
        aria-labelledby="hero-heading"
        className="hero-enter dark-surface relative isolate grid bg-sage text-eggshell"
      >
        <div
          role="img"
          aria-label="Photo placeholder: a family wearing personalized satin Christmas pajamas"
          data-image="hero-family-personalized-christmas-pajamas"
          className="aspect-[4/5] w-full self-start bg-oat [grid-area:1/1] md:aspect-[3/2]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-sage/80"
        />

        <div className="relative z-10 mx-auto w-full max-w-[1280px] self-end px-6 py-10 [grid-area:1/1] md:py-16">
          <div className="max-w-[640px]">
            <p className="eyebrow mb-4">The Christmas collection</p>
            <h1
              id="hero-heading"
              className="hero-heading"
            >
              <em className="editorial-emphasis">A little more merry.</em>
              <br />
              A name on every set.
            </h1>

            <p className="mt-6 max-w-[38ch] text-[16px] leading-[1.6]">
              Personalized satin pajamas for Christmas mornings together.
            </p>

            <div className="button-frame mt-6">
              <Link href="/collections/all" className="button-primary">
                Shop Christmas pajamas
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-label="The Merrythread details"
        className="border-y border-softsage/30 bg-white"
      >
        <ul className="mx-auto grid max-w-[1280px] grid-cols-2 px-6 md:grid-cols-4">
          {trustPoints.map((point, index) => (
            <li
              key={point}
              className={`flex items-center justify-center border-softsage/30 px-4 py-4 text-center text-[14px] font-medium ${
                index % 2 === 1 ? "border-l" : ""
              } ${
                index >= 2 ? "border-t md:border-t-0" : ""
              } ${
                index === 2 ? "md:border-l" : ""
              }`}
            >
              {point}
            </li>
          ))}
        </ul>
      </section>

      <section
        id="shop"
        aria-labelledby="shop-heading"
        className="mx-auto max-w-[1280px] scroll-mt-40 px-6 py-16 md:py-24"
      >
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 id="shop-heading" className="section-heading">
              Find their Christmas set
            </h2>

            <p className="mt-4 text-[16px] leading-[1.6]">
              A matching look for the family. A personal detail for each one.
            </p>
          </div>

          <Link
            href="/collections/all"
            className="text-link inline-flex min-h-11 shrink-0 items-center text-[15px] font-medium"
          >
            Shop all pajamas
            <span aria-hidden="true">&nbsp;&rarr;</span>
          </Link>
        </div>

        <p className="mt-4 text-[14px] text-warmgrey">
          Sizes, colorways, and size-based prices are provisional. Details await confirmation.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {products.map((product) => (
            <ProductCard key={product.handle} product={product} />
          ))}
        </div>
      </section>

      <section
        aria-labelledby="story-heading"
        className="dark-surface bg-sage text-eggshell"
      >
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 px-6 py-16 md:grid-cols-2 md:gap-16 md:py-24">
          <div
            role="img"
            aria-label="Photo placeholder: a close-up of a name embroidered on satin pajamas"
            data-image="editorial-embroidered-name-on-satin"
            className="aspect-[4/5] w-full rounded-card bg-oat"
          />

          <div>
            <h2 id="story-heading" className="section-heading">
              A name makes it <em className="editorial-emphasis">theirs</em>
            </h2>

            <p className="mt-6 text-[16px] leading-[1.6]">
              The pajamas match. The names make each pair their own.
              Every Merrythread set carries a little detail that belongs
              to the person wearing it.
            </p>

            <p className="mt-4 text-[16px] leading-[1.6]">
              For the early risers, the present shakers, and the ones
              reaching for one more family photo.
            </p>

            <Link
              href="/pages/our-story"
              className="text-link mt-6 inline-flex min-h-11 items-center text-[15px] font-medium"
            >
              Read our story
              <span aria-hidden="true">&nbsp;&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        aria-labelledby="how-it-works-heading"
        className="mx-auto max-w-[1280px] scroll-mt-40 px-6 py-16 md:py-24"
      >
        <h2 id="how-it-works-heading" className="section-heading">
          From your pick to their pajamas
        </h2>

        <ol className="mt-10 grid grid-cols-1 md:grid-cols-3">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className={`border-t border-softsage/30 py-6 ${
                index === 0 ? "md:pr-6" : "md:border-l md:px-6"
              }`}
            >
              <span
                aria-hidden="true"
                className="font-display text-[36px] leading-tight font-normal"
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3 className="mt-6 font-display text-[24px] leading-tight font-normal">
                {step.title}
              </h3>

              <p className="mt-4 text-[16px] leading-[1.6]">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section
        aria-labelledby="reviews-heading"
        className="mx-auto max-w-[1280px] px-6 pb-16 md:pb-24"
      >
        <div className="border-t border-softsage/30 pt-16">
          <h2 id="reviews-heading" className="section-heading">
            Little details, lasting memories
          </h2>

          <p className="mt-4 text-[14px] text-warmgrey">
            Sample reviews for layout preview. These are not customer testimonials.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {reviews.map((review) => (
              <figure
                key={review.id}
                className="flex flex-col bg-white p-6"
              >
                <blockquote className="text-[16px] leading-[1.6]">
                  <p>&ldquo;{review.quote}&rdquo;</p>
                </blockquote>

                <figcaption className="mt-auto pt-6 text-[15px] font-medium">
                  {review.name}
                  <span className="mt-1 block text-[14px] font-normal text-warmgrey">
                    Sample review
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

