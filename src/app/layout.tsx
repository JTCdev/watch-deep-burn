import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DEEP 🔥 Tracker",
  description: "Watch-Deep-Burn is a real-time tracker monitoring the decreasing supply of the DEEP token on the SUI blockchain. As DEEP tokens are burned, this platform provides a live feed of the updated supply, giving users insights into its deflationary mechanics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
