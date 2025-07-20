import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./about/components/AddressBar";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "TrekTrails",
  description: "Travelling",
};

export default function RootLayout({ children }) {
  return (
    <>
    <html>
      <body>
        {children}
      </body>
    </html>
    </>
  );
}
