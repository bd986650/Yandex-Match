"use client";

import styles from "./ConfirmOTPButton.module.css";

interface ConfirmOTPButtonProps {
  onConfirm: () => void;
  disabled?: boolean;
}

export default function ConfirmOTPButton({ onConfirm, disabled = false }: ConfirmOTPButtonProps) {
  return (
    <button 
      onClick={onConfirm} 
      className={`${styles.nextBtn} ${disabled ? styles.disabled : ''}`}
      disabled={disabled}
    >
      {disabled ? "Проверка..." : "Confirm"}
    </button>
  );
}
