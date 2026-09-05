import Link from "next/link";
import EmailSignup from "./EmailSignup";
import Logo from "./Logo";

const shopLinks = [
  { label: "Shop all pajamas", href: "/collections/all" },
  { label: "Explore the collection", href: "/#shop" },
  { label: "Our story", href: "/pages/our-story" },
];

const helpLinks = [
  { label: "Size guide", href: "/pages/size-guide" },
  { label: "Shipping", href: "/pages/shipping" },
  { label: "Returns", href: "/pages/returns" },
  { label: "Contact", href: "/pages/contact" },
];

const legalLinks = [
  { label: "Privacy policy", href: "/pages/privacy" },
  { label: "Terms of service", href: "/pages/terms" },
  { label: "Refund policy", href: "/pages/refunds" },
];

export default function Footer() {
  return (
    <footer className="dark-surface bg-sage text-eggshell">
      <div className="mx-auto max-w-[1280px] px-6 pt-16 pb-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link
              href="/"
              aria-label="Merrythread home"
              className="inline-flex items-center gap-3 font-display text-[36px] leading-tight font-normal"
            >
              <Logo />
              <span>Merrythread</span>
            </Link>

            <p className="mt-4 text-[16px] leading-[1.6]">
              Personalized satin Christmas pajamas. A name on every set.
              A little more merry in every morning.
            </p>
          </div>

          <nav aria-labelledby="footer-shop-heading">
            <h2
              id="footer-shop-heading"
              className="font-display text-[28px] leading-tight font-normal"
            >
              Shop
            </h2>

            <ul className="mt-4 flex flex-col gap-2">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-link inline-flex min-h-11 items-center"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-help-heading">
            <h2
              id="footer-help-heading"
              className="font-display text-[28px] leading-tight font-normal"
            >
              Help
            </h2>

            <ul className="mt-4 flex flex-col gap-2">
              {helpLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-link inline-flex min-h-11 items-center"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <section aria-labelledby="footer-signup-heading">
            <h2
              id="footer-signup-heading"
              className="font-display text-[28px] leading-tight font-normal"
            >
              15% off your first set.
            </h2>

            <p className="mt-4 text-[16px] leading-[1.6]">
              A little merry in your inbox.
            </p>

            <div className="mt-6">
              <EmailSignup />
            </div>
          </section>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-softsage/30 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-[14px]">
            &copy; 2026 Merrythread. All rights reserved.
          </p>

          <nav aria-label="Legal">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-link inline-flex min-h-11 items-center text-[14px]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
