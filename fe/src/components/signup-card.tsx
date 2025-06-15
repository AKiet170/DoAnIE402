"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import LoadingButton from "@/components/ui/loading-button";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { motion } from "framer-motion";

const formSchema = z.object({
  name: z.string().min(2, { message: "Tên phải có ít nhất 2 ký tự." }),
  email: z
    .string()
    .email({ message: "Vui lòng nhập một địa chỉ email hợp lệ." }),
  password: z.string().min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự." }),
  role: z.enum(["guest", "user", "admin"]),
});

export default function SignUpDialog({
  setSignInOpen,
  setSignUpOpen,
}: {
  setSignInOpen: () => void;
  setSignUpOpen: (open: boolean) => void;
}) {
  const data = authClient.useSession();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "guest"
    },
  });

  const handleSignup = async (value: z.infer<typeof formSchema>) => {
    await authClient.signUp.email(
      { ...value, callbackURL: "/" },
      {
        onError(ctx) {
          if (ctx.error.status === 403) {
            toast.error("Đăng ký thất bại, vui lòng xác nhận địa chỉ email", {
              action: {
                label: "Thử lại",
                onClick: () => setSignUpOpen(false),
              },
            });
            router.refresh();
          } else {
            toast.error("Đăng ký thất bại", {
              action: {
                label: "Thử lại",
                onClick: () => setSignUpOpen(false),
              },
            });
          }
        },
        onSuccess() {
          toast.success("Đăng ký thành công");
          setSignUpOpen(false);
          setSignInOpen();
          router.refresh();
        },
        onRequest() {
          setIsLoading(true);
        },
        onResponse() {
          setIsLoading(false);
        },
      }
    );
  };

  useEffect(() => {
    if (data.data?.session) {
      router.push("/");
      setSignUpOpen(false);
    }
  }, [data.data?.session, router, setSignUpOpen]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{
        duration: 0.6,
        type: "spring",
        stiffness: 100,
        damping: 20,
      }}
    >
      <div className="flex flex-col w-full md:flex-row md:items-stretch h-[600px]">
        <div className="flex-1 min-h-full flex flex-col items-center justify-center p-8 text-center bg-primary text-primary-foreground h-full">
          <h1 className="text-3xl mb-4 font-bold">Đã có tài khoản?</h1>
          <p className="mb-8 text-primary-foreground/90 leading-relaxed">
            Nếu bạn đã có tài khoản, hãy đăng nhập để tiếp tục!
          </p>
          <Button
            variant="outline"
            className="group flex items-center gap-2 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground transition-all"
            onClick={setSignInOpen}
          >
            Đăng nhập ngay
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
        <Card className="rounded-none w-full md:w-2/3 flex flex-col justify-between border-none h-full">
          <CardHeader className="space-y-1 pb-4 pt-8">
            <VisuallyHidden>
              <h2>Đăng ký</h2>
            </VisuallyHidden>
            <CardTitle className="text-center text-2xl font-bold tracking-tight md:text-3xl">
              Đăng ký
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-8 px-8 flex-1 flex flex-col justify-center w-[400px] mx-auto">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSignup)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <Label className="text-sm font-medium">Tên</Label>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            placeholder="Nhập tên của bạn"
                            {...field}
                            className="pl-10 h-11 focus-visible:ring-primary"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <Label className="text-sm font-medium">Email</Label>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            placeholder="m@example.com"
                            {...field}
                            className="pl-10 h-11 focus-visible:ring-primary"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <Label className="text-sm font-medium">Mật khẩu</Label>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            {...field}
                            type="password"
                            className="pl-10 h-11 focus-visible:ring-primary"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center justify-between mt-2">
                </div>
                <LoadingButton
                  className="w-full cursor-pointer h-11 mt-6 font-medium"
                  type="submit"
                  loading={isLoading}
                >
                  Đăng ký
                </LoadingButton>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
