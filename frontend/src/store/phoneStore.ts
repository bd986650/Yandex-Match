"use client";

import { create } from "zustand";

type PhoneState = {
  rawPhoneDigits: string; // только цифры, без маски
  maskedPhone: string; // отформатированная строка для отображения
  setPhone: (params: { raw: string; masked: string }) => void;
  clearPhone: () => void;
};

export const usePhoneStore = create<PhoneState>((set) => ({
  rawPhoneDigits: "",
  maskedPhone: "",
  setPhone: ({ raw, masked }) =>
    set({ rawPhoneDigits: raw, maskedPhone: masked }),
  clearPhone: () => set({ rawPhoneDigits: "", maskedPhone: "" }),
}));

export const getMaskedForOtp = (maskedPhone: string): string => {
  if (!maskedPhone) return "";
  // Попытка замаскировать среднюю часть номера, сохраняя код страны и последние 2 цифры
  // Пример входа: "+7 (913) 123-45-67"
  // Выход: "+7 913 ***-**-67"
  const digits = maskedPhone.replace(/\D/g, "");
  if (digits.length < 10) return maskedPhone; // недостаточно данных

  // Попытаемся выделить: код страны, код оператора и хвост
  // Для РФ ожидаем 11 цифр, первая — 7. Маскируем среднюю часть.
  if (digits.length >= 11 && (digits.startsWith("7") || digits.startsWith("8"))) {
    const country = "+7"; // нормализуем к +7 для показа
    const operator = digits.slice(-10, -7); // 3 цифры
    const last2 = digits.slice(-2);
    return `${country} ${operator} ***-**-${last2}`;
  }

  // Generic fallback: сохраняем первые 3 и последние 2 цифры
  const first3 = digits.slice(0, 3);
  const last2 = digits.slice(-2);
  return `+${first3} ***-**-${last2}`;
};


