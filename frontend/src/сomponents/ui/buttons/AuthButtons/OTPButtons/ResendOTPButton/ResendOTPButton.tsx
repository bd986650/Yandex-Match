"use client";

import styles from "./ResendOTPButton.module.css";

interface ResendOTPButtonProps {
  timer: number;
  onResend: () => void;
}

export default function ResendOTPButton({ timer, onResend }: ResendOTPButtonProps) {
  return (
    <div className={styles.resendWrapper}>
      {timer > 0 ? (
        <p className={styles.resendText}>Resend code in {timer}s</p>
      ) : (
        <button onClick={onResend} className={styles.resendBtn}>
          Send code again
        </button>
      )}
    </div>
  );
}
