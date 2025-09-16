"use client";

import React, { useState, useRef } from "react";
import styles from "./PhoneInput.module.css";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";

const PhoneInput: React.FC = () => {
  const [value, setValue] = useState("");
  const [countryEmoji, setCountryEmoji] = useState("🌐"); 
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    if (!rawValue) {
      setValue("");
      setCountryEmoji("🌐");
      return;
    }

    const { masked, emoji } = formatPhoneNumber(rawValue);
    setValue(masked);
    setCountryEmoji(emoji);
  };

  return (
    <div className={styles.inputContainer}>
      <div className={styles.selectWrapper}>{countryEmoji}</div>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="+7 (000) 000-00-00"
        className={styles.input}
      />
    </div>
  );
};

export default PhoneInput;
