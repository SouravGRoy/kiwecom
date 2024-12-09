import { Barlow_Condensed } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import localFont from "next/font/local";

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-barlow",
});

const founders = localFont({
  src: [
    {
      path: "../../public/fonts/FoundersGroteskXCond-Lt.woff2",
      weight: "200",
    },
  ],
  variable: "--font-founders",
});

// RootLayout component that applies fonts and provides global styling
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "bg-background min-h-screen antialiased",
          barlow.className,
          founders.variable // Apply Founders font variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
