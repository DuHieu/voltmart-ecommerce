"use client";
import { ShoppingCart, Moon, Sun, LogIn } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

import { VoltMartLogo } from "@/components/VoltMartLogo";

export function Navbar() {
  const { totalItems } = useCart();
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { user } = useAuth();
  const router = useRouter();

  // Handle mounting state
  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by not rendering theme-dependent content until mounted
  if (!mounted) {
    return null; // Return null on first render to avoid hydration mismatch
  }

  return (
    <nav className="border-border bg-background/95 supports-[backdrop-filter]:bg-background/60 z-60 w-full border-b backdrop-blur">
      <div className="mx-4 flex h-16 items-center">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="hover:bg-muted/50 transition-colors duration-200" />
          <Link href="/" className="cursor-pointer">
            <VoltMartLogo size="md" />
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 cursor-pointer"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="h-[1.2rem] w-[1.2rem]" />
            ) : (
              <Moon className="h-[1.2rem] w-[1.2rem]" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>

          {user ? (
            <Button
              variant="ghost"
              size="icon"
              className="relative h-9 w-9 rounded-full cursor-pointer p-0 overflow-hidden ring-1 ring-border/80 hover:ring-primary transition-all"
              onClick={() => router.push("/profile")}
              title={user.email || "Tài khoản của tôi"}
            >
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-amber-500 via-orange-500 to-indigo-600 text-white font-bold text-xs uppercase shadow-inner">
                {user.email?.charAt(0) || "U"}
              </div>
              <span className="sr-only">Tài khoản</span>
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 cursor-pointer"
              onClick={() => router.push("/signup")}
            >
              <LogIn className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">Sign in</span>
            </Button>
          )}
          <Link href="/cart">
            <Button
              variant="ghost"
              size="icon"
              className="relative h-9 w-9 cursor-pointer"
            >
              <ShoppingCart className="h-[1.2rem] w-[1.2rem]" />
              {totalItems > 0 && (
                <span className="bg-primary text-primary-foreground absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[11px] font-medium">
                  {totalItems}
                </span>
              )}
              <span className="sr-only">Shopping cart</span>
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
