"use client";

import { useState, useEffect } from "react";
import { useOtpStore } from "@/store/otpStore";
import { usePhoneStore } from "@/store/phoneStore";
import { apiClient } from "@/utils/api";

export function useOTP(length: number = 6, onSuccess?: (code: string) => void) {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const [timer, setTimer] = useState(60);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
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
      setError(null); // Очищаем ошибку при вводе

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

  const handleSubmit = async () => {
    const code = otp.join("");
    
    if (code.length !== length) {
      setError("Введите полный код");
      return;
    }

    if (!rawPhone) {
      setError("Номер телефона не найден");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.verifyCode(rawPhone, code);
      
      if (response.success) {
        setCode(code);
        if (onSuccess) onSuccess(code);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Произошла ошибка";
      setError(errorMessage);
      console.error("OTP verification error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!rawPhone) {
      setError("Номер телефона не найден");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.resendCode(rawPhone);
      
      if (response.success) {
        setTimer(60);
        setOtp(Array(length).fill("")); // Очищаем поля ввода
        alert("Код отправлен повторно 🚀");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Произошла ошибка";
      setError(errorMessage);
      console.error("Resend OTP error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    otp,
    timer,
    isLoading,
    error,
    handleChange,
    handleKeyDown,
    handleSubmit,
    handleResend,
  };
}
