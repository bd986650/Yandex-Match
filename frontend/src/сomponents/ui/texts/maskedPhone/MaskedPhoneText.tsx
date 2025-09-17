"use client";

import React from "react";
import { usePhoneStore } from "@/store/phoneStore";
import { getMaskedPhoneForOTPCard } from "@/utils/getMaskedPhoneForOTPCard";

import { TMaskedPhoneTextProps } from "@/shared/types/ui/texts";

const MaskedPhoneText: React.FC<TMaskedPhoneTextProps> = ({
  prefix = "Sent to ",
  className,
  fallback = "Enter your phone number first",
}) => {
  const maskedPhone = usePhoneStore((s) => s.maskedPhone);
  const otpMasked = getMaskedPhoneForOTPCard(maskedPhone);

  return (
    <span className={className}>
      {otpMasked ? `${prefix}${otpMasked}` : fallback}
    </span>
  );
};

export default MaskedPhoneText;


