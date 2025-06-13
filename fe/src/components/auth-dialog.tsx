"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import SignInDialog from "@/components/signin-card";
import SignUpDialog from "@/components/signup-card";
import ForgotPasswordDialog from "./forgot-password-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export default function AuthDialog() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [open, setOpen] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);

  // Scroll locking
  useEffect(() => {
    const lockScroll = () => {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      const originalStyle = {
        overflow: document.body.style.overflow,
        paddingRight: document.body.style.paddingRight,
        position: document.body.style.position,
        width: document.body.style.width,
      };

      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;

      const header = document.querySelector("header");
      if (header) header.style.paddingRight = `${scrollbarWidth}px`;

      return originalStyle;
    };

    const unlockScroll = (originalStyle: {
      overflow: string;
      paddingRight: string;
      position: string;
      width: string;
    }) => {
      document.body.style.overflow = originalStyle.overflow;
      document.body.style.paddingRight = originalStyle.paddingRight;
      document.body.style.position = originalStyle.position;
      document.body.style.width = originalStyle.width;

      const header = document.querySelector("header");
      if (header) header.style.paddingRight = "";
    };

    let originalStyle: {
      overflow: string;
      paddingRight: string;
      position: string;
      width: string;
    } | null = null;

    if (open || forgotPasswordOpen) {
      originalStyle = lockScroll();
    } else if (originalStyle) {
      unlockScroll(originalStyle);
      originalStyle = null;
    }

    return () => {
      if (originalStyle) unlockScroll(originalStyle);
    };
  }, [open, forgotPasswordOpen]);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="default" className="h-9">
            Đăng nhập
          </Button>
        </DialogTrigger>
        <AnimatePresence>
          {open && (
            <motion.div
              key={isSignIn ? "signin" : "signup"}
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
              <DialogContent className="p-0 max-w-none w-[1200px] h-[600px] border-2 border-black rounded-lg overflow-hidden">
                <VisuallyHidden>
                  <DialogTitle>Đăng nhập hoặc đăng ký</DialogTitle>
                </VisuallyHidden>
                {isSignIn ? (
                  <SignInDialog
                    setSignInOpen={setOpen}
                    setSignUpOpen={() => {
                      setIsSignIn(false);
                      setOpen(true);
                    }}
                    setForgotPasswordOpen={setForgotPasswordOpen}
                  />
                ) : (
                  <SignUpDialog
                    setSignInOpen={() => {
                      setIsSignIn(true);
                      setOpen(true);
                    }}
                    setSignUpOpen={setOpen}
                  />
                )}
              </DialogContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Dialog>
      <ForgotPasswordDialog
        open={forgotPasswordOpen}
        setOpen={setForgotPasswordOpen}
        setSignInOpen={() => {
          setIsSignIn(true);
          setOpen(true);
        }}
      />
    </>
  );
}
