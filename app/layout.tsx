import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { 
  generateOrganizationSchema, 
  generateWebSiteSchema, 
  generateSoftwareApplicationSchema 
} from "@/components/SEOHead";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://wrytflow.com'),
  title: {
    default: "Wrytflow AI - Professional AI Book Auditing for Authors & Publishers",
    template: "%s | Wrytflow AI"
  },
  description: "Transform your manuscripts with AI-powered auditing. 99.9% accuracy with custom knowledge bases and agentic workflows that 10x your content quality efficiency. Professional book proofreading, multilingual publishing, and AI writing tools by Zryth Solutions.",
  keywords: [
    "AI book auditing",
    "manuscript review",
    "AI proofreading",
    "book editing software",
    "publisher tools",
    "author tools",
    "content quality",
    "AI writing assistant",
    "book proofreader",
    "manuscript editing",
    "publishing automation",
    "AI agent",
    "Wrytflow AI",
    "Zryth Solutions"
  ],
  authors: [{ name: "Wrytflow AI Team" }, { name: "Zryth Solutions" }],
  creator: "Zryth Solutions",
  publisher: "Zryth Solutions",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://wrytflow.com",
    siteName: "Wrytflow AI",
    title: "Wrytflow AI - Professional AI Book Auditing for Authors & Publishers",
    description: "Transform your manuscripts with AI-powered auditing. 99.9% accuracy, custom knowledge bases, and agentic workflows that 10x your efficiency.",
    images: [
      {
        url: "https://i.postimg.cc/MTSkJFFH/page-perfect-dashboard.png",
        width: 1200,
        height: 630,
        alt: "Wrytflow AI Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wrytflow AI - Professional AI Book Auditing",
    description: "Transform your manuscripts with AI-powered auditing. 99.9% accuracy with 10x efficiency boost.",
    images: ["https://i.postimg.cc/MTSkJFFH/page-perfect-dashboard.png"],
    creator: "@ZrythSolutions",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
  alternates: {
    canonical: "https://wrytflow.com",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebSiteSchema();
  const softwareSchema = generateSoftwareApplicationSchema();

  return (
    <html lang="en">
      <head>
        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {/* Structured Data - Website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {/* Structured Data - Software Application */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
