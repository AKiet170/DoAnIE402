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
import { Mail, Lock, ArrowRight } from "lucide-react";
import LoadingButton from "@/components/ui/loading-button";
import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { motion } from "framer-motion";

const signInSchema = z.object({
  email: z.string().email({
    message: "Vui lòng nhập một địa chỉ email hợp lệ.",
  }),
  password: z.string().nonempty({ message: "Mật khẩu không được để trống." }),
  rememberMe: z.boolean(),
});

export default function SignInDialog({
  setSignInOpen,
  setSignUpOpen,
  setForgotPasswordOpen,
}: {
  setSignInOpen: (open: boolean) => void;
  setSignUpOpen: () => void;
  setForgotPasswordOpen: (open: boolean) => void;
}) {
  const data = authClient.useSession();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  useEffect(() => {
    if (data.data?.session) {
      router.push("/");
      setSignInOpen(false);
    }
  }, [data.data?.session, router, setSignInOpen]);

  const handleSignIn = async (value: z.infer<typeof signInSchema>) => {
    await authClient.signIn.email(
      {
        email: value.email,
        password: value.password,
        rememberMe: value.rememberMe,
      },
      {
        onError(ctx) {
          toast.error(
            ctx.error.status === 403
              ? "Đăng nhập thất bại, vui lòng xác nhận địa chỉ email"
              : "Đăng nhập thất bại",
            {
              action: {
                label: "Thử lại",
                onClick: () => setSignInOpen(false),
              },
            }
          );
          router.refresh();
        },
        onSuccess() {
          toast.success("Đăng nhập thành công");
          setSignInOpen(false);
          router.push("/");
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
        <Card className="rounded-none w-full md:w-2/3 flex flex-col justify-between border-none h-full">
          <CardHeader className="space-y-1 pt-16">
            <VisuallyHidden>
              <h2>Đăng nhập</h2>
            </VisuallyHidden>
            <CardTitle className="text-center text-2xl font-bold  md:text-3xl">
              Đăng nhập
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-8 flex-1 flex flex-col justify-center w-[400px] mx-auto">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSignIn)}
                className="space-y-4"
              >
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
                  <FormField
                    control={form.control}
                    name="rememberMe"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="remember"
                            checked={field.value}
                            onCheckedChange={(checked) =>
                              field.onChange(checked === true)
                            }
                            className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                          />
                          <label
                            htmlFor="remember"
                            className="cursor-pointer text-sm text-muted-foreground"
                          >
                            Ghi nhớ đăng nhập
                          </label>
                        </div>
                      </FormItem>
                    )}
                  />

                  <button
                    type="button"
                    className="text-sm font-medium text-primary hover:underline cursor-pointer"
                    onClick={() => {
                      setSignInOpen(false);
                      setForgotPasswordOpen(true);
                    }}
                  >
                    Quên mật khẩu?
                  </button>
                </div>
                <LoadingButton
                  className="w-full cursor-pointer h-11 mt-6 font-medium"
                  type="submit"
                  loading={isLoading}
                >
                  Đăng nhập
                </LoadingButton>
              </form>
            </Form>
          </CardContent>
        </Card>
        <div className="flex-1 min-h-full flex flex-col items-center justify-center p-8 text-center bg-primary text-primary-foreground h-full">
          <h1 className="text-3xl mb-4 font-bold">Chào mừng bạn!</h1>
          <p className="mb-8 text-primary-foreground/90 leading-relaxed">
            Bạn chưa có tài khoản? Hãy đăng ký ngay để khám phá cùng chúng tôi
            nhé!
          </p>
          <Button
            variant="outline"
            className="group cursor-pointer flex items-center gap-2 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground transition-all"
            onClick={setSignUpOpen}
          >
            Đăng ký ngay
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
