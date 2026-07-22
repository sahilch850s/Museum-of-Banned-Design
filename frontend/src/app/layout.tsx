import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Museum of Banned Design",
  description: "An archive of censored artifacts, subversive interfaces, and controversial design history.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col bg-museum-black text-white antialiased">
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <footer className="border-t border-museum-border py-6 text-center text-xs text-museum-muted">
          &copy; {new Date().getFullYear()} Museum of Banned Design. For Educational & Historical Purposes.
        </footer>
      </body>
    </html>
  );
}