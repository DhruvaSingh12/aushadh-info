import type { Metadata } from "next";
import "./globals.css";
import SupabaseProvider from "@/providers/SupabaseProvider";
import { Analytics } from "@vercel/analytics/react"
import { ThemeProvider } from "next-themes";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: {
    template: "%s | AushadhInfo",
    default: "AushadhInfo",
  },
  description: "The next big thing in healthcare.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={true}
            disableTransitionOnChange
          >
            <SupabaseProvider>
              {children}
              <Analytics />
            </SupabaseProvider>
          </ThemeProvider>
      </body>
    </html>
  );
}
