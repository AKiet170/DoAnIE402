import {
  Building,
  Facebook,
  FileText,
  Instagram,
  Shield,
  Users,
  Youtube,
} from "lucide-react";

import Link from "next/link";

export function Footer({
  className,
  ...rest
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={`bg-background border-t ${className ?? ""}`} {...rest}>
      <div className="container mx-auto py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          <div className="space-y-4 ">
            <div className="flex items-center">
              <Building className="h-8 w-8 text-primary" />
              <span className="text-lg font-bold text-foreground">
                Urbanvista
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your all-in-one platform for employee collaboration and workplace
              community.
            </p>
          </div>

          {/* Social Features */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Liên kết</h3>
            <ul className="space-y-2 text-sm flex flex-col items-start">
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground flex items-center gap-2"
                >
                  <Users className="h-4 w-4" />
                  <span>Trang chủ</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground flex items-center gap-2"
                >
                  <Users className="h-4 w-4" />
                  <span>Về chúng tôi</span>
                </Link>
              </li>
              <div className="flex space-x-4 self-start">
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </Link>

                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Youtube className="h-5 w-5" />
                  <span className="sr-only">Youtube</span>
                </Link>
              </div>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Liên hệ</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground flex items-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  <span>FAQs</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground flex items-center gap-2"
                >
                  <Shield className="h-4 w-4" />
                  <span>Điều khoản và bảo mật</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 flex flex-col sm:flex-row justify-between items-center ">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Urbanvista. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground mt-2 sm:mt-0">
            @ Design by IE402’s Team 2025
          </p>
        </div>
      </div>
    </footer>
  );
}
