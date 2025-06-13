import Link from "next/link";
import { Building, Home, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 py-16 md:py-24">
      {/* Building illustration */}
      <div className="relative mb-8 flex items-center justify-center">
        <div className="absolute animate-ping rounded-full bg-primary/20 p-16" />
        <Building className="relative h-24 w-24 text-primary" />
      </div>

      {/* Error message */}
      <h1 className="mb-2 text-center text-4xl font-bold tracking-tight md:text-5xl">
        Không tìm thấy trang
      </h1>
      <p className="mb-8 max-w-md text-center text-muted-foreground">
        Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển. Vui lòng
        kiểm tra lại URL hoặc quay lại trang chủ.
      </p>

      {/* Action buttons */}
      <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
        <Button asChild size="lg" className="gap-2">
          <Link href="/">
            <Home className="h-4 w-4" />
            Về trang chủ
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="gap-2">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            Quay lại
          </Link>
        </Button>
      </div>

      {/* Suggested links */}
      <div className="mt-12 w-full max-w-md">
        <h2 className="mb-4 text-center text-lg font-medium">
          Có thể bạn đang tìm kiếm:
        </h2>
        <ul className="space-y-2 rounded-lg border bg-card p-4 shadow-sm">
          <li>
            <Link
              href="#"
              className="flex items-center gap-2 rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Building className="h-4 w-4" />
              <span>Quản lý căn hộ</span>
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex items-center gap-2 rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Search className="h-4 w-4" />
              <span>Tìm kiếm căn hộ</span>
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex items-center gap-2 rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Home className="h-4 w-4" />
              <span>Thông tin chung cư</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
