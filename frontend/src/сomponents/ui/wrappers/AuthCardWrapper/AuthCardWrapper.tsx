"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";

type AuthCardWrapperProps = {
  isOTP: boolean;
  children: ReactNode;
};

export default function AuthCardWrapper({ isOTP, children }: AuthCardWrapperProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={isOTP ? "otp" : "login"}
        initial={{ x: isOTP ? 300 : -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: isOTP ? -300 : 300, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
