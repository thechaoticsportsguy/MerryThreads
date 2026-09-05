import { Instrument_Serif, Hanken_Grotesk } from "next/font/google";
import AnnouncementBar from "../components/AnnouncementBar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-instrument-serif",
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-hanken-grotesk",
});

export const metadata = {
  title: "Merrythread",
  description:
    "Personalized satin Christmas pajamas for the whole family. Find your favorite set and make it theirs with an embroidered name.",
};

export default function RootLayout({ children }) {
  const accountHref =
    process.env.NEXT_PUBLIC_CUSTOMER_ACCOUNT_URL || "/account";

  return (
    <html
      lang="en-US"
      className={`${instrumentSerif.variable} ${hankenGrotesk.variable}`}
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
