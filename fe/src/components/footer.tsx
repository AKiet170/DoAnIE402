"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Building,
  Facebook,
  FileText,
  Instagram,
  Shield,
  Users,
  Youtube,
  Mail,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import LoadingButton from "./ui/loading-button";

export function Footer({
  className,
  ...rest
}: React.HTMLAttributes<HTMLElement>) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      console.log("Submitted email:", email);
      setMessage("Đăng ký thành công! Bạn sẽ nhận được thông tin cập nhật.");
      setEmail("");
    } catch (error) {
      setMessage("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer
      className={`bg-background border-t shadow-sm ${className ?? ""}`}
      {...rest}
    >
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Building className="h-10 w-10 text-primary" />
              <span className="text-2xl font-extrabold text-foreground">
                Urbanvista
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Đăng ký nhận bảng tin để không bỏ lỡ các thông tin mới nhất về bất
              động sản và ưu đãi đặc biệt!
            </p>
            {/* Email Subscription Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex items-center gap-2 border border-input rounded-md p-1 bg-background">
                <Mail className="h-5 w-5 text-muted-foreground ml-2" />
                <input
                  type="email"
                  placeholder="Nhập email của bạn"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <LoadingButton
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                loading={false}
              >
                {isSubmitting ? "Đang gửi..." : "Đăng ký"}
              </LoadingButton>
              {message && (
                <p
                  className={`text-sm ${
                    message.includes("thành công")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {message}
                </p>
              )}
            </form>
          </div>

          {/* Navigation Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-foreground">Liên kết</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-primary flex items-center gap-2 transition-colors"
                >
                  <Users className="h-5 w-5" />
                  <span>Trang chủ</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-primary flex items-center gap-2 transition-colors"
                >
                  <Users className="h-5 w-5" />
                  <span>Về chúng tôi</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-foreground">
              Kết nối với chúng tôi
            </h3>
            <div className="flex space-x-6">
              <Link
                href="https://facebook.com"
                target="_blank"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="https://youtube.com"
                target="_blank"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Youtube className="h-6 w-6" />
                <span className="sr-only">Youtube</span>
              </Link>
            </div>
          </div>

          {/* Contact Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-foreground">Liên hệ</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/faq"
                  className="text-muted-foreground hover:text-primary flex items-center gap-2 transition-colors"
                >
                  <FileText className="h-5 w-5" />
                  <span>FAQs</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-primary flex items-center gap-2 transition-colors"
                >
                  <Shield className="h-5 w-5" />
                  <span>Điều khoản và bảo mật</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t pt-8 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Urbanvista. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground mt-4 sm:mt-0">
            @ Design by IE402’s Team 2025
          </p>
        </div>
      </div>
    </footer>
  );
}
