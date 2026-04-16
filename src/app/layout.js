import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { ui } from "@clerk/themes";
import { Toaster } from "sonner";
import Footer from "@/components/Footer";

const poppins = Poppins({
  weight: ["400", "700"], // Specify the weights you need
  subsets: ["latin"],
  display: "swap", // Ensures the font is displayed as soon as it is available
  variable: "--font-poppins", // Define a CSS variable name
});

export const metadata = {
  title: {
    default: "Medimeet | Book Online Doctor Consultation & Telemedicine Services",
    template: "%s | Medimeet Healthcare",
  },
  description:
    "Medimeet is a trusted telemedicine platform to book online doctor consultations, get medical advice, prescriptions, and healthcare support from certified doctors anytime, anywhere.",

  keywords: [
    "online doctor consultation",
    "telemedicine India",
    "book doctor online",
    "healthcare app",
    "virtual doctor appointment",
    "medical consultation online",
    "doctor video call India",
    "online prescription service",
    "Medimeet",
  ],

  authors: [{ name: "Medimeet Team" }],
  creator: "Medimeet",
  publisher: "Medimeet",

  metadataBase: new URL("https://medimeet.com"),

  openGraph: {
    title: "Medimeet | Online Doctor Consultation Platform",
    description:
      "Consult certified doctors online via chat or video call. Get prescriptions and healthcare advice instantly with Medimeet.",
    url: "https://medimeet.com",
    siteName: "Medimeet",
    images: [
      {
        url: "/og-image.jpg", // replace with actual hosted image
        width: 1200,
        height: 630,
        alt: "Medimeet - Online Doctor Consultation",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Medimeet | Talk to Doctors Online Anytime",
    description:
      "Skip the queues. Connect with verified doctors online and get medical help from home.",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  category: "healthcare",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head />
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkProvider ui={ui}>
            <Header />

            {children}
            <Toaster richColors />
            <Footer />
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
