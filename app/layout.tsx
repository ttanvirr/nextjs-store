import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar/Navbar"
import { ThemeProvider } from "@/components/theme-provider"
import Container from "@/components/global/Container"
import { ClerkProvider } from "@clerk/nextjs"

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
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}
