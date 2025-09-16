"use client";

import React from "react";
import { usePhoneStore, getMaskedForOtp } from "@/store/phoneStore";

import { TMaskedPhoneTextProps } from "@/shared/types/texts";

const MaskedPhoneText: React.FC<TMaskedPhoneTextProps> = ({
  prefix = "Sent to ",
  className,
  fallback = "Enter your phone number first",
}) => {
  const maskedPhone = usePhoneStore((s) => s.maskedPhone);
  const otpMasked = getMaskedForOtp(maskedPhone);

  return (
    <span className={className}>
      {otpMasked ? `${prefix}${otpMasked}` : fallback}
    </span>
  );
};

export default MaskedPhoneText;


