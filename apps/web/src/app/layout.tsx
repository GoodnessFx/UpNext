import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Syne } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-mono',
});

const syne = Syne({
  subsets: ["latin"],
  variable: '--font-syne',
  weight: ['400', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: "UpNext | Invest in Human Potential",
  description: "The world's first talent stock market. Buy shares in rising artists, athletes, and creators.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${syne.variable} font-body bg-background text-text-primary antialiased`}>
        {children}
      </body>
    </html>
  );
}
