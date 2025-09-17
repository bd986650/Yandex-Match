"use client";

import React, { useState, useRef } from "react";
import styles from "./PhoneInput.module.css";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber/formatPhoneNumber";
import { usePhoneStore } from "@/store/phoneStore/phoneStore";

const PhoneInput: React.FC = () => {
  const [value, setValue] = useState("");
  const [countryEmoji, setCountryEmoji] = useState("🌍️"); 
  const inputRef = useRef<HTMLInputElement>(null);
  const { setPhone, clearPhone } = usePhoneStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    if (!rawValue) {
      setValue("");
      setCountryEmoji("🌍️");
      clearPhone();
      return;
    }

    const { masked, emoji } = formatPhoneNumber(rawValue);
    setValue(masked);
    setCountryEmoji(emoji);
    setPhone({ raw: rawValue, masked });
  };

  return (
    <div className={styles.phoneInput}>
      <div className={styles.phoneInput__selector}>{countryEmoji}</div>
      <input
        ref={inputRef}
        type="tel"
        value={value}
        onChange={handleChange}
        placeholder="+7 (000) 000-00-00"
        className={styles.phoneInput__field}
        inputMode="tel"
        aria-label="Phone number"
      />
    </div>
  );
};

export default PhoneInput;
