import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar/Navbar"
import { ThemeProvider } from "@/components/theme-provider"
import Container from "@/components/global/Container"
import { ClerkProvider } from "@clerk/nextjs"
import { Toaster } from "sonner"

const inter = Inter({
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Next.js Store",
  description: "A simple store built with Next.js and TypeScript",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ClerkProvider
          appearance={{
            cssLayerName: "clerk",
          }}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <Container className="py-20">{children}</Container>
            <Toaster
              position="top-center"
              closeButton={true}
              duration={5000}
              toastOptions={{
                classNames: {
                  toast: "!bg-white dark:!bg-zinc-900  !border !shadow-lg",
                  title: "text-sm! font-semibold! ",
                  error: "border-red-200! dark:border-red-800! text-red-600!",
                  success:
                    "border-green-200! dark:border-green-800! text-green-600! bg-green-50!",
                },
              }}
            />
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}
