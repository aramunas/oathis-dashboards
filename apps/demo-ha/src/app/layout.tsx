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
      <body className="antialiased bg-titanium-deep text-cream min-h-screen relative overflow-x-hidden">
        {/* Background Topology Grid */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_0%,#000_60%,transparent_100%)] opacity-30"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#1f2937_0%,transparent_70%)] opacity-20"></div>
        </div>
        
        <div className="relative z-10 w-full min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
