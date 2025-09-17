"use client";

import styles from "./ResendOTPButton.module.css";

interface ResendOTPButtonProps {
  timer: number;
  onResend: () => void;
  disabled?: boolean;
}

export default function ResendOTPButton({ timer, onResend, disabled = false }: ResendOTPButtonProps) {
  return (
    <div className={styles.resendWrapper}>
      {timer > 0 ? (
        <p className={styles.resendText}>Resend code in {timer}s</p>
      ) : (
        <button 
          onClick={onResend} 
          className={`${styles.resendBtn} ${disabled ? styles.disabled : ''}`}
          disabled={disabled}
        >
          {disabled ? "Отправка..." : "Send code again"}
        </button>
      )}
    </div>
  );
}
