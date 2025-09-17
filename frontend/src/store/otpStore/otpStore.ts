"use client";

import { create } from "zustand";

type OtpState = {
  code: string;
  setCode: (code: string) => void;
  clear: () => void;
};

export const useOtpStore = create<OtpState>((set) => ({
  code: "",
  setCode: (code) => set({ code }),
  clear: () => set({ code: "" }),
}));


