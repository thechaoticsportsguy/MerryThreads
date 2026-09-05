import localFont from "next/font/local";
import { Hanken_Grotesk } from "next/font/google";
import AnnouncementBar from "../components/AnnouncementBar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./globals.css";

const gambetta = localFont({
  src: [
    { path: "../public/fonts/Gambetta-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/Gambetta-Medium.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/Gambetta-Italic.woff2", weight: "400", style: "italic" },
  ],
  display: "swap",
  fallback: ["Georgia"],
  variable: "--font-gambetta",
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-hanken-grotesk",
});

export const metadata = {
  title: "Merrythread",
  icons: { icon: { url: "/logo.svg", type: "image/svg+xml", sizes: "any" } },
  description:
    "Personalized satin Christmas pajamas for the whole family. Find your favorite set and make it theirs with an embroidered name.",
};

export default function RootLayout({ children }) {
  const accountHref =
    process.env.NEXT_PUBLIC_CUSTOMER_ACCOUNT_URL || "/account";

  return (
    <html
      lang="en-US"
      className={`${gambetta.variable} ${hankenGrotesk.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        <a
          href="#main-content"
          className="sr-only focus:fixed focus:top-4 focus:left-6 focus:z-[60] focus:not-sr-only focus:rounded-btn focus:bg-eggshell focus:px-6 focus:py-4 focus:text-sage"
        >
          Skip to content
        </a>

        {/* Shared positioning keeps both sticky bars stacked without offsets. */}
        <div className="sticky top-0 z-50 shrink-0">
          <AnnouncementBar />
          <Header accountHref={accountHref} />
        </div>

        <main id="main-content" tabIndex={-1} className="flex-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
