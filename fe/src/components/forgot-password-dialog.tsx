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
import { Mail, ArrowRight } from "lucide-react";
import LoadingButton from "@/components/ui/loading-button";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  email: z.string().email({
    message: "Vui lòng nhập một địa chỉ email hợp lệ.",
  }),
});

type ForgotPasswordDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  setSignInOpen?: () => void;
};

export default function ForgotPasswordDialog({
  open,
  setOpen,
  setSignInOpen,
}: ForgotPasswordDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleResetPassword = async (value: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      await authClient.forgetPassword({
        email: value.email,
        redirectTo: "/reset-password",
      });
      toast.success("Vui lòng kiểm tra email của bạn để tiếp tục.");
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error(
        "Không thể gửi yêu cầu đặt lại mật khẩu. Vui lòng thử lại sau."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 w-[1000px] h-[500px] border-2 border-black rounded-lg overflow-hidden">
        <VisuallyHidden>
          <DialogTitle>Quên mật khẩu</DialogTitle>
        </VisuallyHidden>
        <AnimatePresence>
          {open && (
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
              <div className="flex flex-col w-full md:flex-row md:items-stretch h-[500px]">
                <Card className="rounded-none w-full md:w-2/3 flex flex-col justify-between border-none h-full">
                  <CardHeader className="space-y-1 pb-4 pt-8">
                    <CardTitle className="text-center text-2xl font-bold tracking-tight md:text-3xl">
                      Quên mật khẩu
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pb-8 px-8 flex-1 flex flex-col justify-center w-[400px] mx-auto">
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(handleResetPassword)}
                        className="space-y-4"
                      >
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <Label className="text-sm font-medium">
                                Email
                              </Label>
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
                        <LoadingButton
                          className="w-full cursor-pointer h-11 mt-6 font-medium"
                          type="submit"
                          loading={isLoading}
                        >
                          Gửi yêu cầu
                        </LoadingButton>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
                <div className="flex-1 min-h-full flex flex-col items-center justify-center p-8 text-center bg-primary text-primary-foreground h-full">
                  <h1 className="text-3xl mb-4 font-bold">Đăng nhập</h1>
                  <p className="mb-8 text-primary-foreground/90 leading-relaxed">
                    Bạn đã nhớ mật khẩu? Quay lại đăng nhập để tiếp tục!
                  </p>
                  <Button
                    variant="outline"
                    className="group flex items-center gap-2 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground transition-all"
                    onClick={() => {
                      setOpen(false);
                      if (setSignInOpen) {
                        setSignInOpen();
                      }
                    }}
                  >
                    Quay lại đăng nhập
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
