import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AIMaker - Join the Waitlist",
  description: "让 AI 成为你的创造力引擎。加入等待列表，第一时间体验下一代 AI 创作平台。",
  keywords: ["AI", "创作", "人工智能", "创造力", "waitlist"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
