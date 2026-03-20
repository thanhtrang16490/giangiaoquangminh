import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import MarqueeBar from "@/components/MarqueeBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  title: "Quang Minh – Giàn Giáo Ringlock & Xà Gồ Xây Dựng",
  description: "Công ty Cổ phần Kỹ thuật Công nghệ Quang Minh – chuyên cung cấp giàn giáo ringlock và xà gồ xây dựng chất lượng cao từ năm 2008. Lô CN09, KCN Nguyên Khê, Đông Anh, Hà Nội.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <MarqueeBar />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
