/**
 * Header Component
 * Top navigation bar with logo and main menu links
 */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export interface HeaderProps {
  onMenuClick?: () => void;
}

const navLinks = [
  { href: "/", label: "Dashboard" },
  { href: "/characters", label: "Characters" },
  { href: "/planets", label: "Planets" },
  { href: "/vehicles", label: "Vehicles" },
];

export function Header({ onMenuClick }: HeaderProps) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo and Brand */}
        <div className="flex items-center gap-2">
          {/* Mobile Menu Button */}
          {onMenuClick && (
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={onMenuClick}
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl hidden sm:inline-block">
              Star Wars Explorer
            </span>
            <span className="font-bold text-xl sm:hidden">SW Explorer</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <Button
                variant={pathname === link.href ? "secondary" : "ghost"}
                className={cn(
                  "transition-colors",
                  pathname === link.href && "font-semibold"
                )}
              >
                {link.label}
              </Button>
            </Link>
          ))}
        </nav>

        {/* Right Side - Could add theme toggle, user menu, etc. */}
        <div className="flex items-center gap-2">
          {/* Placeholder for future features */}
        </div>
      </div>
    </header>
  );
}

