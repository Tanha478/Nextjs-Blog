import { Inter } from "next/font/google";
import "./globals.css";
import AuthLayout from "./auth-layout"; // 👈 Import client layout wrapper

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My App",
  description: "Protected app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthLayout>{children}</AuthLayout> {/* 👈 Wrap children */}
      </body>
    </html>
  );
}
