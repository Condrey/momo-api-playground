import Header from "@/components/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { verifySession } from "@/lib/verify-session";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "../components/theme-provider";
import { AppSidebar } from "./app-side-bar";
import "./globals.css";

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
  const session = await verifySession();

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
          {/* <SessionProvider value={session}> */}
          <div className="[--header-height:calc(--spacing(30))] sm:[--header-height:calc(--spacing(18))] md:bg-zinc-500/5">
            <SidebarProvider className="flex flex-col">
              <header className="bg-mtn-blue text-mtn-blue-foreground sticky top-0 z-50 flex h-(--header-height) w-full items-center dark:border-b">
                <Header />
              </header>
              <div className="flex size-full flex-1">
                <AppSidebar />
                <SidebarInset className="flex size-full flex-col space-y-4 bg-transparent py-12">
                  <main className="bg-card max-w-9xl mx-auto flex size-full flex-1 flex-col gap-4 overflow-y-auto scroll-auto rounded-3xl md:shadow-xl">
                    {/* CONTENT */}
                    <div className="flex size-full grow min-h-[75vh] md:overflow-y-auto md:p-4 md:ring-1 md:ring-black/5">
                      <div className="flex w-full flex-col gap-2 *:before:pr-2 *:before:text-2xl *:before:font-bold">
                        <>{children}</>
                      </div>
                    </div>
                  </main>
                  <footer className="w-full">
                    <p className="text-center">
                      <q className="italic">Be simple. Be legit.</q> - Coundrey
                      James Ogwang
                    </p>
                  </footer>
                </SidebarInset>
              </div>
            </SidebarProvider>
          </div>
          {/* </SessionProvider> */}

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
