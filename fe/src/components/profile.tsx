"use client";
import { authClient } from "@/lib/auth-client";
import { ChevronDown, LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type User = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  emailVerified: boolean;
  name: string;
  image?: string | null; // Cho phép null hoặc undefined
  role?: string;
};
export function Profile({ user }: { user: User }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <DropdownMenu modal={false} open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          aria-label="User menu"
          className="cursor-pointer text-foreground hover:bg-accent hover:text-accent-foreground p-2 rounded-lg transition-colors duration-200 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <Avatar className="h-9 w-9 border-2 border-primary/30">
            <AvatarImage
              src={user.image || "/placeholder.svg"}
              alt={user.name || "User"}
            />
            <AvatarFallback className="text-foreground">
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <ChevronDown
            className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        className="w-72 bg-background border border-border shadow-lg rounded-lg p-2 animate-fade-in"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-primary/20">
              <AvatarImage
                src={user.image || "/placeholder.svg"}
                alt={user.name}
              />
              <AvatarFallback className="text-foreground">
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-1">
              <p className="font-semibold text-foreground text-sm">
                {user.name}
              </p>
            </div>
          </div>
        </div>
        <DropdownMenuGroup className="p-1">
          <DropdownMenuItem
            asChild
            className="cursor-pointer rounded-md text-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground transition-colors duration-150"
          >
            <Link
              href={`/profile/${user.id}`}
              className="flex items-center w-full py-2 px-3"
            >
              <User className="mr-2 h-4 w-4 text-primary" />
              <span>Trang cá nhân</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-border" />
        <div className="p-1">
          <DropdownMenuItem
            className="cursor-pointer rounded-md text-destructive hover:bg-destructive/10 hover:text-destructive-foreground focus:bg-destructive/10 focus:text-destructive-foreground transition-colors duration-150 py-2 px-3"
            onClick={async () => {
              await authClient.signOut({
                fetchOptions: {
                  onSuccess: () => {
                    toast.success("Đăng xuất thành công");
                    router.push("/"); // redirect to login page
                    router.refresh();
                  },
                },
              });
            }}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Đăng xuất</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
