import type { Metadata } from "next";
import { Raleway, Montserrat, Geist, Geist_Mono, Monoton } from "next/font/google";
import localFont from 'next/font/local';
import "./globals.css";
import { Fraunces } from "next/font/google";
import ScrollProvider from "./providers/lenis-provider";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";


const monoton = Monoton({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-monoton',
});

// Load the fonts
const raleway = Raleway({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-raleway',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Add HUMANE font from local files
const humane = localFont({
  src: [
    {
      path: '../public/fonts/Humane-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Humane-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Humane-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-humane',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Nagarjun Mallesh | Software Engineer & Cloud Architect",
  description: "Portfolio of Nagarjun Mallesh - Software Engineer specializing in cloud architecture, system design, and full-stack development. Explore my projects, blog posts, and technical insights.",
  keywords: ["Nagarjun Mallesh", "Software Engineer", "Cloud Architect", "Full Stack Developer", "AWS", "System Design", "Portfolio"],
  authors: [{ name: "Nagarjun Mallesh" }],
  creator: "Nagarjun Mallesh",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nagarjunmallesh.com",
    title: "Nagarjun Mallesh | Software Engineer & Cloud Architect",
    description: "Portfolio of Nagarjun Mallesh - Software Engineer specializing in cloud architecture, system design, and full-stack development.",
    siteName: "Nagarjun Mallesh Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nagarjun Mallesh | Software Engineer & Cloud Architect",
    description: "Portfolio of Nagarjun Mallesh - Software Engineer specializing in cloud architecture, system design, and full-stack development.",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} ${raleway.variable} ${montserrat.variable} ${monoton.variable} ${humane.variable} antialiased bg-black text-white`}
        suppressHydrationWarning={true}
      >
        <NavBar />
        <ScrollProvider>
          {children}
        </ScrollProvider>
        <Footer />

      </body>
    </html>
  );
}
