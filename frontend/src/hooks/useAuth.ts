"use client";

import { useState } from "react";
import { usePhoneStore } from "@/store/phoneStore";
import { apiClient } from "@/utils/api";

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { rawPhoneDigits } = usePhoneStore();

  // Отправка OTP
  const sendOTPCode = async (phone: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.sendCode(phone);

      if (response.success) {
        return { success: true, message: response.message };
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Произошла ошибка";
      setError(errorMessage);
      console.error("Send OTP error:", err);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }

    return { success: false, error: "Неизвестная ошибка" };
  };

  // Проверка OTP
  const verifyOTPCode = async (phone: string, code: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.verifyCode(phone, code);

      if (response.success) {
        return { success: true, user: response.user };
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Произошла ошибка";
      setError(errorMessage);
      console.error("Verify OTP error:", err);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }

    return { success: false, error: "Неизвестная ошибка" };
  };

  // Повторная отправка OTP
  const resendOTPCode = async (phone: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.resendCode(phone);

      if (response.success) {
        return { success: true, message: response.message };
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Произошла ошибка";
      setError(errorMessage);
      console.error("Resend OTP error:", err);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }

    return { success: false, error: "Неизвестная ошибка" };
  };

  return {
    isLoading,
    error,
    rawPhoneDigits,
    sendOTPCode,
    verifyOTPCode,
    resendOTPCode,
  };
}
