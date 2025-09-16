"use client";

import styles from "./OTPCard.module.css";
import YandexIDLogo from "../../icons/YandexIDIcon/YandexIDIcon";
import BackIcon from "../../icons/BackIcon/BackIcon";
import ConfirmOTPButton from "@/сomponents/ui/buttons/AuthButtons/OTPButtons/ConfirmOTPButton/ConfirmOTPButton";
import ResendOTPButton from "@/сomponents/ui/buttons/AuthButtons/OTPButtons/ResendOTPButton/ResendOTPButton";
import OTPInput from "@/сomponents/ui/inputs/OTPInput/OTPInput";
import { useOTP } from "@/hooks/useOTP";
import MaskedPhoneText from "@/сomponents/ui/texts/maskedPhone/MaskedPhoneText";

export default function OTPCard({ onBack }: { onBack: () => void }) {
  const {
    otp,
    timer,
    handleChange,
    handleKeyDown,
    handleSubmit,
    handleResend,
  } = useOTP(6);

  return (
    <main>
      <div className={styles.card__header}>
        <button
          onClick={onBack}
          className={styles.header__back}
          aria-label="Go back"
        >
          <BackIcon />
        </button>

        <YandexIDLogo />
      </div>

      <h1 className={styles.card__title}>Enter the code from the SMS</h1>
      <h2 className={styles.card__subtitle}>
        <MaskedPhoneText />
      </h2>

      <div className={styles.otpInputs}>
        {otp.map((digit, index) => (
          <OTPInput
            key={index}
            id={`otp-${index}`}
            value={digit}
            onChange={(val) => handleChange(val, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        ))}
      </div>

      <ConfirmOTPButton onConfirm={handleSubmit} />

      <ResendOTPButton timer={timer} onResend={handleResend} />
    </main>
  );
}
