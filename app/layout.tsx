import type {
   Metadata 
} from "next";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
// import { Toaster } from "@/components/ui/sonner"
import { Toaster } from "sonner";
import { Toaster as SonnerToaster } from "sonner"
import AuthProvider from "@/components/providers/AuthProvider";
import { Analytics } from "@vercel/analytics/next"
import GoogleAnalytics from "./components/GoogleAnalytics"
 


export const metadata: Metadata = {
  metadataBase: new URL('https://ccsa.cosmopolitan.edu.ng'),
  title: {
    default: 'CCSA - Cosmopolitan University Abuja',
    template: '%s | CCSA - Cosmopolitan University Abuja',
  },
  description: 'Centre for Climate-Smart Agriculture (CCSA) - Cosmopolitan University Abuja',
  keywords: [
    'Centre for Climate-Smart Agriculture', 'CCSA', 'Cosmopolitan University Abuja', 'Climate-Smart Agriculture', 'Agriculture', 'Climate', 'Smart', 'Centre', 'University', 'Abuja',
    'Agriculture in Abuja', 'Climate-Smart Agriculture in Abuja', 'Agriculture in Nigeria', 'Climate-Smart Agriculture in Nigeria', 'Agriculture in Africa', 'Climate-Smart Agriculture in Africa',
    'Agricultural Research', 'Climate-Smart Agricultural Research', 'Agricultural Research in Abuja', 'Climate-Smart Agricultural Research in Abuja', 'Agricultural Research in Nigeria',
    'Climate-Smart Agricultural Research in Nigeria', 'Agricultural Research in Africa', 'Climate-Smart Agricultural Research in Africa', 'Agricultural Education', 'Climate-Smart Agricultural Education',
    'Agricultural Education in Abuja', 'Climate-Smart Agricultural Education in Abuja', 'Agricultural Education in Nigeria', 'Climate-Smart Agricultural Education in Nigeria',
  ],
  authors: [{ name: 'Abdulrahman Dauda' }],
  creator: 'Cosmopolitan University Abuja',
  publisher: 'Cosmopolitan University Abuja',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ccsa.cosmopolitan.edu.ng',
    siteName: 'CCSA - Cosmopolitan University Abuja',
    title: 'CCSA - Cosmopolitan University Abuja',
    description: 'Centre for Climate-Smart Agriculture (CCSA) - Cosmopolitan University Abuja',
    images: [
      {
        url: 'https://ccsa.cosmopolitan.edu.ng/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Centre for Climate-Smart Agriculture (CCSA) - Cosmopolitan University Abuja',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@cosmouniversity',
    creator: '@cosmouniversity',
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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`antialiased font-main`}
      >
        <GoogleAnalytics />
        <AuthProvider>
          {children}
          <Analytics />
          <Toaster />
          <SonnerToaster />
        </AuthProvider>
      </body>
    </html>
  );
}
