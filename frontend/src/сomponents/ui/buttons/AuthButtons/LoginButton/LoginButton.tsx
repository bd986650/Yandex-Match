import React from "react";
import styles from "./LoginButton.module.css";

type LoginButtonProps = {
  onClick?: () => void; // теперь можно передавать свой коллбек
};

export default function LoginButton({ onClick }: LoginButtonProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      className={styles.loginButton}
      onClick={handleClick}
    >
      Log in
    </button>
  );
}
