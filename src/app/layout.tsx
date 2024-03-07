import "@/styles/globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { Poppins } from "next/font/google";

import TanstackProvider from "@/providers/TanstackProvider";

const inter = Poppins({ weight: ["400", "700"], subsets: ["latin"] });

export const metadata = {
  title: "news - rlv",
  description: "News",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SpeedInsights />
        <TanstackProvider>{children}</TanstackProvider>
      </body>
    </html>
  );
}
