"use client";

import type React from "react";
import Link from "next/link";
import { useState } from "react";
import {
  LayoutDashboard,
  Menu,
  X,
  Home,
  Building,
  PenToolIcon as Tool,
  MapPin,
  Info,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Profile } from "@/components/profile";
import AuthDialog from "@/components/auth-dialog";

type HeaderProps = {
  session?: {
    id: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    expiresAt: Date;
    token: string;
    ipAddress?: string | null | undefined;
    userAgent?: string | null | undefined;
  };
  user?: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    emailVerified: boolean;
    name: string;
    image?: string | null;
    role?: string;
  };
};

type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

export default function Header({ session, user }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { label: "Trang chủ", href: "/", icon: <Home className="h-4 w-4" /> },
    {
      label: "Quản lý căn hộ",
      href: "#",
      icon: <Building className="h-4 w-4" />,
    },
    { label: "Quản lý bảo trì", href: "#", icon: <Tool className="h-4 w-4" /> },
    { label: "Vị trí căn hộ", href: "#", icon: <MapPin className="h-4 w-4" /> },
    {
      label: "Thông tin căn hộ",
      href: "#",
      icon: <Info className="h-4 w-4" />,
    },
    {
      label: "Tài sản chung cư",
      href: "#",
      icon: <Building className="h-4 w-4" />,
    },
    {
      label: "Quản lý hợp đồng",
      href: "#",
      icon: <FileText className="h-4 w-4" />,
    },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex h-16 items-center justify-between container ">
        {/* Logo/Brand */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <Building className="h-8 w-8 text-primary" />
            <span className="text-lg font-bold text-foreground">
              Urbanvista
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-center flex-1">
          <div className="flex items-center gap-4 lg:gap-6">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="relative group flex items-center px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>
        </div>

        {/* Auth Section */}
        <div className="flex items-center gap-2">
          {session && user ? (
            <div className="flex items-center gap-2">
              <Profile user={user} />
            </div>
          ) : (
            <AuthDialog />
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-9 w-9"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "fixed inset-0 top-16 z-20 bg-background md:hidden",
          isMenuOpen ? "flex flex-col" : "hidden"
        )}
      >
        <div className="flex flex-col p-4 space-y-3">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-muted"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
          {session && user && user.role === "admin" && (
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-muted"
              onClick={() => setIsMenuOpen(false)}
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
