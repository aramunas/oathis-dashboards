import type { Metadata } from "next";
import "./globals.css";
import { AdminLayout } from "@oathis/ui";

export const metadata: Metadata = {
  title: "DigiTwin ATLAS | Admin",
  description: "DigiTwin ATLAS Command Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-titanium-deep text-cream">
        <AdminLayout>
          {children}
        </AdminLayout>
      </body>
    </html>
  );
}
