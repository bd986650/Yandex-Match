import React from "react";
import styles from "./LoginButton.module.css";

type LoginButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
};

export default function LoginButton({ onClick, disabled = false }: LoginButtonProps) {
  const handleClick = () => {
    if (onClick && !disabled) {
      onClick();
    }
  };

  return (
    <button
      className={`${styles.loginButton} ${disabled ? styles.disabled : ''}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {disabled ? "Отправка..." : "Log in"}
    </button>
  );
}
