"use client";

import styles from "./OTPInput.module.css";

import { IOTPInputProps } from "@/shared/types/ui/inputs";

export default function OTPInput({ id, value, onChange, onKeyDown }: IOTPInputProps) {
  return (
    <input
      id={id}
      type="text"
      inputMode="numeric"
      maxLength={1}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      className={styles.otpInput}
    />
  );
}
