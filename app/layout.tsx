import { Inter } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SiAtmin",
  icons: {
    icon: "/img/favicon.ico", // Path ke favicon baru
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#191919]">
      <body className={`${inter.className} py-10 px-10`}>
        {children}
      </body>   
    </html>
  );
}
