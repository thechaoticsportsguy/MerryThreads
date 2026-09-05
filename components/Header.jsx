"use client";

import Link from "next/link";
import Logo from "./Logo";
import { useEffect, useRef, useState } from "react";
import { colorways } from "../lib/products";

function Icon({ name }) {
  const shapes = {
    search: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m16 16 4.5 4.5" />
      </>
    ),
    account: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    ),
    cart: (
      <>
        <path d="M6 7h12l1 14H5L6 7Z" />
        <path d="M9 8V6a3 3 0 0 1 6 0v2" />
      </>
    ),
    menu: <path d="M4 6h16M4 12h16M4 18h16" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
  };

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {shapes[name]}
    </svg>
  );
}

export default function Header({ accountHref = "/account" }) {
  const [shopOpen, setShopOpen] = useState(false);
  const headerRef = useRef(null);
  const shopButtonRef = useRef(null);
  const drawerRef = useRef(null);

  useEffect(() => {
    if (!shopOpen) return;

    function handleEscape(event) {
      if (event.key === "Escape") {
        setShopOpen(false);
        shopButtonRef.current?.focus();
      }
    }

    function handleOutsideInteraction(event) {
      if (!headerRef.current?.contains(event.target)) {
        setShopOpen(false);
      }
    }

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("pointerdown", handleOutsideInteraction);
    document.addEventListener("focusin", handleOutsideInteraction);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener(
        "pointerdown",
        handleOutsideInteraction
      );
      document.removeEventListener(
        "focusin",
        handleOutsideInteraction
      );
    };
  }, [shopOpen]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");

    function handleBreakpoint(event) {
      setShopOpen(false);

      if (event.matches) {
        drawerRef.current?.close();
      }
    }

    desktop.addEventListener("change", handleBreakpoint);

    return () => {
      desktop.removeEventListener("change", handleBreakpoint);
    };
  }, []);

  function closeShop() {
    setShopOpen(false);
  }

  function openDrawer() {
    closeShop();
    drawerRef.current?.showModal();
  }

  function closeDrawer() {
    drawerRef.current?.close();
  }

  function handleBackdropClick(event) {
    if (event.target !== event.currentTarget) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const outside =
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom;

    if (outside) {
      closeDrawer();
    }
  }

  return (
    <header
      ref={headerRef}
      className="relative border-b border-softsage/30 bg-eggshell"
    >
      <div className="mx-auto grid min-h-16 max-w-[1280px] grid-cols-[1fr_auto] items-center gap-2 px-6 py-4 max-[359px]:px-2 md:grid-cols-[1fr_auto_1fr] md:gap-4">
        <Link
          href="/"
          onClick={closeShop}
          aria-label="Merrythread home"
          className="brand-wordmark inline-flex items-center gap-3 justify-self-start"
        >
          <Logo />
          <span>Merrythread</span>
        </Link>

        <nav aria-label="Main navigation" className="hidden md:block">
          <ul className="flex items-center gap-6">
            <li>
              <button
                ref={shopButtonRef}
                type="button"
                aria-expanded={shopOpen}
                aria-controls="shop-mega-menu"
                onClick={() => setShopOpen((open) => !open)}
                className="text-link inline-flex min-h-11 items-center gap-2 text-[15px] font-medium"
              >
                Shop
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d={shopOpen ? "m4 10 4-4 4 4" : "m4 6 4 4 4-4"} />
                </svg>
              </button>
            </li>

            <li>
              <Link
                href="/pages/our-story"
                onClick={closeShop}
                className="text-link inline-flex min-h-11 items-center text-[15px] font-medium"
              >
                Our story
              </Link>
            </li>

            <li>
              <Link
                href="/#how-it-works"
                onClick={closeShop}
                className="text-link inline-flex min-h-11 items-center text-[15px] font-medium"
              >
                How it works
              </Link>
            </li>
            <li>
              <Link
                href="/designs"
                onClick={closeShop}
                className="text-link inline-flex min-h-11 items-center text-[15px] font-medium"
              >
                Designs
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center justify-self-end">
          <Link
            href="/search"
            onClick={closeShop}
            aria-label="Search products"
            className="icon-button"
          >
            <Icon name="search" />
          </Link>

          <Link
            href={accountHref}
            onClick={closeShop}
            aria-label="Your account"
            className="icon-button hidden md:inline-flex"
          >
            <Icon name="account" />
          </Link>

          <Link
            href="/cart"
            onClick={closeShop}
            aria-label="View cart"
            className="icon-button"
          >
            <Icon name="cart" />
          </Link>

          <button
            type="button"
            onClick={openDrawer}
            aria-label="Open navigation"
            aria-haspopup="dialog"
            aria-controls="mobile-navigation"
            className="icon-button md:hidden"
          >
            <Icon name="menu" />
          </button>
        </div>
      </div>

      <div
        id="shop-mega-menu"
        hidden={!shopOpen}
        className="absolute inset-x-0 top-full max-h-[70dvh] overflow-y-auto border-b border-softsage/30 bg-eggshell"
      >
        <nav
          aria-label="Shop colorways"
          className="mx-auto grid max-w-[1280px] grid-cols-4 gap-6 px-6 py-10"
        >
          <div>
            <h2 className="font-display text-[28px] leading-tight font-normal">
              Find your color
            </h2>

            <p className="mt-4 text-[16px]">
              A matching look. A name that makes it theirs.
            </p>

            <Link
              href="/collections/all"
              onClick={closeShop}
              className="text-link mt-6 inline-flex min-h-11 items-center text-[15px] font-medium"
            >
              Shop all pajamas
              <span aria-hidden="true">&nbsp;&rarr;</span>
            </Link>

            <p className="mt-4 text-[14px] text-warmgrey">
              Preview colorways.
            </p>
          </div>

          {colorways.map((colorway) => (
            <Link
              key={colorway.id}
              href={colorway.href}
              onClick={closeShop}
              className="text-link block"
            >
              <div
                aria-hidden="true"
                data-image={`mega-menu-${colorway.image}`}
                className="aspect-[4/5] w-full rounded-card bg-oat"
              />

              <span className="mt-4 block font-display text-[24px] font-normal">
                {colorway.name}
              </span>
            </Link>
          ))}
        </nav>
      </div>

      <dialog
        ref={drawerRef}
        id="mobile-navigation"
        aria-labelledby="mobile-navigation-heading"
        onClick={handleBackdropClick}
        className="mobile-drawer"
      >
        <div className="flex items-center justify-between gap-4">
          <h2
            id="mobile-navigation-heading"
            className="brand-wordmark inline-flex items-center gap-3"
          >
            <Logo />
            <span>Merrythread</span>
          </h2>

          <button
            type="button"
            onClick={closeDrawer}
            aria-label="Close navigation"
            className="icon-button"
          >
            <Icon name="close" />
          </button>
        </div>

        <nav aria-label="Mobile shop navigation" className="mt-10">
          <Link
            href="/collections/all"
            onClick={closeDrawer}
            className="text-link inline-flex min-h-11 items-center font-display text-[28px]"
          >
            Shop all pajamas
          </Link>

          <p className="mt-2 text-[14px] text-warmgrey">
            Preview colorways.
          </p>

          <ul className="mt-6 flex flex-col gap-6">
            {colorways.map((colorway) => (
              <li key={colorway.id}>
                <Link
                  href={colorway.href}
                  onClick={closeDrawer}
                  className="text-link flex items-center gap-4"
                >
                  <div
                    aria-hidden="true"
                    data-image={`mobile-menu-${colorway.image}`}
                    className="aspect-[4/5] w-16 shrink-0 rounded-card bg-oat"
                  />

                  <span className="font-display text-[24px]">
                    {colorway.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <ul className="mt-10 flex flex-col gap-2 border-t border-softsage/30 pt-6">
            {[
              { href: "/pages/our-story", label: "Our story" },
              { href: "/#how-it-works", label: "How it works" },
              { href: "/designs", label: "Designs" },
              { href: "/pages/size-guide", label: "Size guide" },
              { href: accountHref, label: "Your account" },
            ].map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={closeDrawer}
                  className="text-link inline-flex min-h-11 items-center text-[15px] font-medium"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </dialog>
    </header>
  );
}

