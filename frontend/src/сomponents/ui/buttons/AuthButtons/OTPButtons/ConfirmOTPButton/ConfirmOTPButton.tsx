"use client";

import styles from "./ConfirmOTPButton.module.css";

interface ConfirmOTPButtonProps {
  onConfirm: () => void;
}

export default function ConfirmOTPButton({ onConfirm }: ConfirmOTPButtonProps) {
  return (
    <button onClick={onConfirm} className={styles.nextBtn}>
      Confirm
    </button>
  );
}
