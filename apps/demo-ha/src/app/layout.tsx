import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DigiTwin Demo",
  description: "DigiTwin High Availability Demo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-titanium-deep text-cream">
        {children}
      </body>
    </html>
  );
}
