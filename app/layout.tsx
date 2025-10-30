import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PagePerfect AI - Professional AI Book Auditing for Authors & Publishers",
  description: "Transform your manuscripts with AI-powered auditing. Custom knowledge bases and agentic workflows that 10x your content quality efficiency. By Zryth Solutions.",
  keywords: "AI book auditing, manuscript review, publisher tools, author tools, content quality, AI agent",
  openGraph: {
    title: "PagePerfect AI - Professional AI Book Auditing",
    description: "Transform your manuscripts with AI-powered auditing. 10x efficiency with unmatched accuracy.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
