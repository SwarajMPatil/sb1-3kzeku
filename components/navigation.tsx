"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Newspaper, TrendingUp, Wallet, BarChart3 } from "lucide-react";

export function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    {
      name: "Markets",
      href: "/markets",
      icon: <BarChart3 className="w-4 h-4" />,
      current: pathname === "/markets",
    },
    {
      name: "News",
      href: "/news",
      icon: <Newspaper className="w-4 h-4" />,
      current: pathname === "/news",
    },
    {
      name: "Trending",
      href: "/trending",
      icon: <TrendingUp className="w-4 h-4" />,
      current: pathname === "/trending",
    },
    {
      name: "Portfolio",
      href: "/portfolio",
      icon: <Wallet className="w-4 h-4" />,
      current: pathname === "/portfolio",
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center">
        <div className="flex items-center justify-between w-full">
          <Link href="/" className="flex items-center space-x-2">
            <BarChart3 className="h-6 w-6" />
            <span className="font-bold text-xl">Digital Assets</span>
          </Link>

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {navigation.map((item) => (
                <NavigationMenuItem key={item.name}>
                  <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                        item.current && "bg-accent"
                      )}
                    >
                      <span className="flex items-center space-x-2">
                        {item.icon}
                        <span>{item.name}</span>
                      </span>
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button>Sign In</Button>
          </div>
        </div>
      </nav>
    </header>
  );
}