"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import {
  Home,
  Headphones,
  Laptop,
  Watch,
  Smartphone,
  Search,
  LogOut,
  LayoutDashboard,
  Settings,
  Package,
  ShoppingCart,
  Users,
  ChevronRight,
  User,
  RefreshCw,
  Gamepad2,
  Wifi,
  PanelLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { getCategorySlug } from "@/utils/categoryUtils";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { VoltMartLogo } from "@/components/VoltMartLogo";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/context/AuthContext";
import { useAdmin } from "@/hooks/useAdmin";
import { useCategories } from "@/hooks/queries";
import { usePathname, useRouter } from "next/navigation";
import { Motion } from "@/components/motion/motion";
import {
  staggerVariants,
  itemVariants,
  searchVariants,
} from "@/components/motion/animation-variants";

// Default icons for each category
const categoryIcons: Record<string, React.ElementType> = {
  All: Home,
  "Audio & Sound": Headphones,
  "Computing & Workspace": Laptop,
  "Smart Gear & Wearables": Watch,
  "Gaming & Controllers": Gamepad2,
  "Networking & Smart Home": Wifi,
  Clothing: Headphones,
  Accessories: Laptop,
  Electronics: Watch,
};

// Clean display names for categories
const getCategoryDisplayName = (name: string) => {
  switch (name.toLowerCase()) {
    case "clothing":
      return "Audio & Sound";
    case "accessories":
      return "Computing & Workspace";
    case "electronics":
      return "Smart Gear & Wearables";
    default:
      return name;
  }
};

export default function Sidebar() {
  const [mounted, setMounted] = useState(false);
  const { user, signOut } = useAuth();
  const { isAdmin } = useAdmin();
  const pathname = usePathname();
  const router = useRouter();
  const { state, toggleSidebar } = useSidebar();

  // Use the TanStack Query hook instead of manual state management
  const {
    data: categories,
    isLoading: loading,
    error: categoriesError,
    refetch: refetchCategories,
  } = useCategories();

  const isCollapsed = state === "collapsed";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // Mapping of categories from DB to display with icons and hrefs
  const categoryItems = [
    { name: "All Products", icon: Home, href: "/" },
    ...(categories || []).map((category) => {
      const slug = getCategorySlug(category.name);
      return {
        name: getCategoryDisplayName(category.name),
        icon: categoryIcons[category.name] || Smartphone,
        href: `/category/${slug}`,
      };
    }),
  ];

  // Provide full category navigation for smooth browsing
  const displayCategories = categoryItems;

  // Admin navigation items
  const adminNavItems = [
    { name: "Admin Dashboard", icon: Settings, href: "/admin" },
    { name: "Products", icon: Package, href: "/admin/products" },
    { name: "Orders", icon: ShoppingCart, href: "/admin/orders" },
    { name: "Users", icon: Users, href: "/admin/users" },
  ];

  const displayName =
    user?.user_metadata?.username ||
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    "User";
  const displayInitial = (displayName.charAt(0) || "U").toUpperCase();

  return (
    <ShadcnSidebar collapsible="icon" className="z-[70] border-r">
      {/* Header with clickable logo to toggle sidebar */}
      <SidebarHeader className="p-2.5">
        <button
          type="button"
          onClick={toggleSidebar}
          className={cn(
            "flex w-full items-center rounded-xl transition-all duration-150 cursor-pointer group select-none outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
            isCollapsed
              ? "justify-center p-1 hover:bg-muted/70"
              : "justify-between px-2 py-1.5 hover:bg-muted/50"
          )}
          title={isCollapsed ? "Click to expand sidebar" : "Click to collapse sidebar"}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <div className="flex items-center pointer-events-none">
            <VoltMartLogo size="sm" showText={!isCollapsed} />
          </div>

          {!isCollapsed && (
            <div className="p-1.5 rounded-lg text-muted-foreground/60 group-hover:text-foreground group-hover:bg-muted/80 transition-all shrink-0">
              <PanelLeft className="h-4 w-4" />
            </div>
          )}
        </button>
      </SidebarHeader>

      {/* Search Bar */}
      <div className="px-3">
        <AnimatePresence>
          {!isCollapsed && (
            <Motion
              variants={searchVariants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{ duration: 0.3 }}
              className="pb-2"
            >
              <div className="relative">
                <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  className="bg-muted/50 border-border/50 focus:bg-background w-full pl-9 text-sm transition-all duration-200"
                />
              </div>
            </Motion>
          )}
        </AnimatePresence>
      </div>

      <SidebarContent>
        <Motion
          variants={staggerVariants}
          initial="closed"
          animate={isCollapsed ? "closed" : "open"}
          className="space-y-4"
        >
          {/* Admin Navigation */}
          {user && isAdmin && (
            <SidebarGroup>
              {!isCollapsed && (
                <Motion variants={itemVariants} initial="closed" animate="open">
                  <SidebarGroupLabel className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                    Administration
                  </SidebarGroupLabel>
                </Motion>
              )}
              <SidebarGroupContent>
                <SidebarMenu>
                  <Motion
                    variants={staggerVariants}
                    initial="closed"
                    animate="open"
                  >
                    {adminNavItems.map((item) => {
                      const isActive = pathname === item.href;
                      const Icon = item.icon;

                      return (
                        <SidebarMenuItem key={item.name}>
                          <SidebarMenuButton
                            render={<Link href={item.href} />}
                            isActive={isActive}
                            className={cn(
                              "w-full rounded-xl transition-colors duration-150 cursor-pointer text-sm font-medium",
                              isCollapsed
                                ? "h-10 w-10 justify-center mx-auto"
                                : "h-10 px-3 gap-3",
                              isActive
                                ? "bg-primary/10 text-primary font-semibold shadow-xs"
                                : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                            )}
                            tooltip={item.name}
                          >
                            <Icon
                              className={cn(
                                "h-4 w-4 shrink-0 transition-colors",
                                isActive
                                  ? "text-primary"
                                  : "text-muted-foreground group-hover:text-foreground"
                              )}
                            />
                            {!isCollapsed && (
                              <span className="truncate">
                                {item.name}
                              </span>
                            )}
                            {isActive && !isCollapsed && (
                              <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                            )}
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </Motion>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )}

          {/* Categories Navigation */}
          <SidebarGroup>
            {!isCollapsed && (
              <Motion variants={itemVariants} initial="closed" animate="open">
                <SidebarGroupLabel className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                  Categories
                </SidebarGroupLabel>
              </Motion>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {loading ? (
                  <div className="animate-pulse space-y-2">
                    {[1, 2, 3].map((n) => (
                      <div
                        key={n}
                        className={cn(
                          "bg-muted rounded-lg",
                          isCollapsed ? "h-10 w-10" : "h-10",
                        )}
                      />
                    ))}
                  </div>
                ) : categoriesError ? (
                  <div
                    className={cn(
                      "bg-destructive/10 text-destructive border-destructive/20 space-y-2 rounded-lg border p-2 text-xs",
                      isCollapsed && "px-1",
                    )}
                  >
                    {!isCollapsed && (
                      <p className="leading-snug font-medium">
                        Couldn&apos;t load categories
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={() => void refetchCategories()}
                      className="bg-background/80 text-foreground hover:bg-background flex w-full cursor-pointer items-center justify-center gap-1 rounded-md border px-2 py-1.5 text-xs font-medium"
                      title="Retry loading categories"
                    >
                      <RefreshCw className="h-3 w-3 shrink-0" />
                      {!isCollapsed && <span>Retry</span>}
                    </button>
                  </div>
                ) : (
                  <Motion
                    variants={staggerVariants}
                    initial="closed"
                    animate="open"
                  >
                    {displayCategories.map((category) => {
                      const isActive = pathname === category.href;
                      const Icon = category.icon;

                      return (
                        <Motion
                          key={category.name}
                          variants={itemVariants}
                          initial="closed"
                          animate="open"
                        >
                          <SidebarMenuItem key={category.name}>
                            <SidebarMenuButton
                              render={<Link href={category.href} />}
                              isActive={isActive}
                              className={cn(
                                "w-full rounded-xl transition-colors duration-150 cursor-pointer text-sm font-medium",
                                isCollapsed
                                  ? "h-10 w-10 justify-center mx-auto"
                                  : "h-10 px-3 gap-3",
                                isActive
                                  ? "bg-primary/10 text-primary font-semibold shadow-xs"
                                  : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                              )}
                              tooltip={category.name}
                            >
                              <Icon
                                className={cn(
                                  "h-4 w-4 shrink-0 transition-colors",
                                  isActive
                                    ? "text-primary"
                                    : "text-muted-foreground group-hover:text-foreground"
                                )}
                              />
                              {!isCollapsed && (
                                <span className="truncate">
                                  {category.name}
                                </span>
                              )}
                              {isActive && !isCollapsed && (
                                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                              )}
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        </Motion>
                      );
                    })}
                  </Motion>
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </Motion>
      </SidebarContent>

      {/* User section */}
      {user && (
        <SidebarFooter className="p-2.5">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                !isCollapsed ? (
                  <button
                    type="button"
                    className="group w-full flex items-center gap-2.5 rounded-xl border border-border/50 bg-card/70 p-2 hover:bg-accent/60 transition-all cursor-pointer select-none text-left"
                  >
                    <div className="relative shrink-0">
                      <Avatar className="h-8 w-8 ring-1 ring-border">
                        <AvatarFallback className="from-primary to-primary/80 text-primary-foreground bg-gradient-to-br text-xs font-semibold">
                          {displayInitial}
                        </AvatarFallback>
                      </Avatar>
                      <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-background" />
                    </div>
                    <div className="min-w-0 flex-1 overflow-hidden">
                      <p className="text-foreground truncate text-xs font-medium leading-tight">
                        {displayName}
                      </p>
                      <p className="text-muted-foreground truncate text-[11px] leading-tight mt-0.5">
                        {user.email}
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/60 group-hover:text-foreground transition-transform duration-150" />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="group relative flex h-10 w-10 mx-auto items-center justify-center rounded-xl hover:bg-muted/70 transition-colors cursor-pointer"
                    title={displayName}
                  >
                    <Avatar className="h-8 w-8 ring-1 ring-border">
                      <AvatarFallback className="from-primary to-primary/80 text-primary-foreground bg-gradient-to-br text-xs font-semibold">
                        {displayInitial}
                      </AvatarFallback>
                    </Avatar>
                    <span className="absolute bottom-0.5 right-0.5 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-background" />
                  </button>
                )
              }
            />
            <DropdownMenuContent
              align="end"
              side="right"
              sideOffset={8}
              className="bg-background/95 border-border/50 z-[80] w-56 backdrop-blur-xl"
            >
              <div className="flex items-center space-x-2 p-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="from-primary to-primary/80 text-primary-foreground bg-gradient-to-br text-xs font-semibold">
                    {displayInitial}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-sm font-medium truncate">
                    {displayName}
                  </span>
                  <span className="text-muted-foreground truncate text-xs">
                    {user.email}
                  </span>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="focus:bg-muted/70 cursor-pointer"
                onClick={() => router.replace("/profile")}
              >
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="focus:bg-muted/70 cursor-pointer"
                onClick={() => router.replace("/cart")}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                <span>Cart</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="focus:bg-muted/70 cursor-pointer"
                onClick={() => router.replace("/dashboard")}
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </DropdownMenuItem>
              {isAdmin && (
                <DropdownMenuItem
                  className="focus:bg-muted/70 cursor-pointer"
                  onClick={() => router.replace("/admin")}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Admin Panel</span>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                onClick={signOut}
                className="focus:bg-muted/70 cursor-pointer transition-colors duration-200"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>
      )}

      <SidebarRail />
    </ShadcnSidebar>
  );
}
