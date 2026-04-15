import { Geist, Geist_Mono } from "next/font/google";
import { Poppins } from "next/font/google";
import "./globals.css";
import ConditionalHeader from "@/components/layout/ConditionalHeader";
import ConditionalFooter from "@/components/layout/ConditionalFooter";
import { AuthProvider, CartProvider, WishlistProvider, AlertProvider } from "@/context";
import 'react-phone-number-input/style.css';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Inkspire",
  description: "Inkspire - Your Vibe Curators",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <AlertProvider>
            <CartProvider>
              <WishlistProvider>
                <ConditionalHeader />
                {children}
                <ConditionalFooter />
              </WishlistProvider>
            </CartProvider>
          </AlertProvider>
        </AuthProvider>
      </body>
    </html>
  );
}