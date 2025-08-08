import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import NavBar from "@/components/NavBar";
import "./globals.css";
import { Providers } from "./providers";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hawiyat.org"),
  title: {
    default: "Hawiyat Deploy & Scale Your Apps",
    template: "%s | Hawiyat",
  },
  description:
    "Hawiyat is an all-in-one platform for developers to deploy, manage, and scale applications globally with serverless functions, managed databases, CI/CD, and edge networking.",
  applicationName: "Hawiyat Platform",
  keywords: [
    "Hawiyat",
    "cloud deployment",
    "serverless",
    "CI/CD",
    "edge network",
    "managed databases",
    "DevOps",
    "web applications",
    "global deployment",
    "developer tools",
  ],
  authors: [{ name: "Hawiyat Team", url: "https://hawiyat.org" }],
  creator: "Hawiyat Team",
  publisher: "Hawiyat",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Hawiyat Deploy & Scale Your Apps",
    description:
      "All-in-one platform for deploying, managing, and scaling web applications with global edge infrastructure.",
    url: "https://hawiyat.org",
    siteName: "Hawiyat",
    images: [
      {
        url: "https://hawiyat.org/hawiyat.png",
        width: 2000,
        height: 2000,
        alt: "Hawiyat Platform",
      },
    ],
    locale: "en_DZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hawiyat Deploy & Scale Your Apps",
    description:
      "Your central hub for cloud deployments, serverless functions, and edge scaling.",
    images: ["https://hawiyat.org/hawiyat.png"],
    creator: "@hawiyat",
  },
  alternates: {
    canonical: "https://hawiyat.org",
    languages: {
      "en-US": "https://hawiyat.org",
      "fr-DZ": "https://hawiyat.org/fr",
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/logo.ico",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
  manifest: "/site.webmanifest",
  other: {
    // JSON-LD Organization Schema
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Hawiyat",
      url: "https://hawiyat.org",
      logo: "https://hawiyat.org/logo.svg",
      sameAs: [
        "https://twitter.com/hawiyat",
        "https://github.com/Hawiyat-Corp",
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+213-XX-XXX-XXXX",
          contactType: "Customer Support",
          areaServed: "DZ",
        },
      ],
    }),
  },
  viewport: "width=device-width, initial-scale=1.0",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${spaceGrotesk.className} overflow-auto`}>
        <Providers>
          <NavBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
