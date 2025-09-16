"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOtpStore } from "@/store/otpStore";
import { usePhoneStore } from "@/store/phoneStore";

export function useOTP(length: number = 6) {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const [timer, setTimer] = useState(60);
  const router = useRouter();
  const setCode = useOtpStore((s) => s.setCode);
  const rawPhone = usePhoneStore((s) => s.rawPhoneDigits);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (value: string, index: number) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < otp.length - 1) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = () => {
    const code = otp.join("");
    setCode(code);
    router.push("/home");
  };

  const handleResend = () => {
    setTimer(60);
    alert("Код отправлен повторно 🚀");
  };

  return {
    otp,
    timer,
    handleChange,
    handleKeyDown,
    handleSubmit,
    handleResend,
  };
}
