import ChapterLinks from "@/components/chapter-links";
import Header from "@/components/header";
import Title from "@/components/title";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { auth } from "./auth";
import "./globals.css";
import NewComer from "./new-comer";
import { ThemeProvider } from "../components/theme-provider";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  verification: {
    other: {
      me: ["my-email", "my-link"],
    },
  },
  title: {
    template: "%s | MTN MoMo API playground - By Condrey James",
    absolute: "MTN MoMo API playground - By Condrey James",
  },
  description: "Play around with the MTN Mobile Money Open AI here.",
  generator: "Next.js",
  applicationName: "MoMo PlayGround",
  referrer: "origin-when-cross-origin",
  keywords: [
    "MTN Open API",
    "MTN",
    "MTN MOMO",
    "MTN OPEN API FOR COLLECTIONS",
    "MTN e-Marketing",
    "Mobile Money Integration",
  ],
  authors: [{ name: "Condrey James" }],
  creator: "Condrey James",
  publisher: "Condrey James",
  openGraph: {
    title: "MTN MoMo API playground - By Condrey James",
    description: "Play around with the MTN Mobile Money Open AI here.",
    siteName: "MoMo PlayGround",
    images: [
      {
        url: "https://lzowhnjutjzukacetzpc.supabase.co/storage/v1/object/public/momo-api-bucket/opengraphy-image.png", // Must be an absolute URL
        width: 800,
        height: 600,
      },
      {
        url: "https://lzowhnjutjzukacetzpc.supabase.co/storage/v1/object/public/momo-api-bucket/opengraphy-big.png", // Must be an absolute URL
        width: 1800,
        height: 1600,
        alt: "openGraph",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          enableSystem
          defaultTheme="system"
          disableTransitionOnChange
        >
          <main className="flex size-full  w-auto flex-col  gap-4  p-4 *:before:pr-2 *:before:text-2xl *:before:font-bold md:flex-row md:bg-zinc-500/5">
            <div className=" hidden size-full *:max-w-prose md:flex md:h-dvh md:w-1/4 lg:w-auto">
              <div className="flex flex-col items-center gap-6">
                <Image
                  src="/momo-logo.png"
                  alt="logo"
                  width={150}
                  height={150}
                  className=" rounded-none"
                />
                <hr className="w-full" />
                <div
                  className={cn(
                    "flex flex-col gap-2  *:flex *:gap-2 *:rounded-full *:px-4  *:py-2",
                  )}
                >
                  <Title title="Navigation" />
                  <span>Sand box Environment</span>
                  <ChapterLinks />
                </div>
              </div>
            </div>
            <div className=" flex size-full grow md:min-h-[95vh] md:overflow-y-auto md:rounded-3xl md:bg-white  md:p-4 md:shadow-xl md:ring-1 md:ring-black/5 dark:md:bg-background  ">
              {session !== null ? (
                <div className="flex w-full flex-col gap-4  *:before:pr-2 *:before:text-2xl *:before:font-bold  ">
                  <Header />
                  <>{children}</>
                </div>
              ) : (
                <div className="flex size-full h-dvh flex-col items-center justify-center gap-4 p-4 *:before:pr-2 *:before:text-2xl *:before:font-bold md:h-auto  ">
                  <NewComer />
                </div>
              )}
            </div>
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
