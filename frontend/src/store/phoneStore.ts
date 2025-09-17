"use client";

import { create } from "zustand";

type PhoneState = {
  rawPhoneDigits: string;
  maskedPhone: string;
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
