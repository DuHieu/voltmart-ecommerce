import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/Navbar";
import Sidebar  from "@/components/Sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { TanStackQueryProvider } from "@/lib/providers/query-provider";
import { Toaster } from "sonner";
import { MainLayout } from "@/components/MainLayout";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { DemoBanner } from "@/components/DemoBanner";
import { Footer } from "@/components/Footer";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: {
    default: "VoltMart – Modern Full-Stack Electronics Ecommerce",
    template: "%s | VoltMart",
  },
  description:
    "VoltMart – A modern full-stack electronics ecommerce platform built with Next.js, React, TypeScript, Supabase, PostgreSQL, and Tailwind CSS.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body className="bg-background min-h-screen flex flex-col">
        <ErrorBoundary>
          <TanStackQueryProvider>
            <AuthProvider>
              <CartProvider>
                <ThemeProvider
                  attribute="class"
                  defaultTheme="system"
                  enableSystem
                  disableTransitionOnChange
                >
                  <SidebarProvider>
                    <Sidebar />
                    <SidebarInset className="flex flex-col min-h-screen">
                      <DemoBanner />
                      <Navbar />
                      <MainLayout>{children}</MainLayout>
                      <Footer />
                    </SidebarInset>
                  </SidebarProvider>
                </ThemeProvider>
              </CartProvider>
            </AuthProvider>
          </TanStackQueryProvider>
        </ErrorBoundary>
        <Toaster
          theme="light" // or "dark" or "system"
          toastOptions={{
            unstyled: false,
            classNames: {
              error: "bg-red-500 text-white border-red-600",
              success: "bg-green-500 text-white border-green-600",
              warning: "bg-yellow-500 text-black border-yellow-600",
              info: "bg-blue-500 text-white border-blue-600",
            },
          }}
        />
        
      </body>
    </html>
  );
}
