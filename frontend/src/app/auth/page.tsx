"use client";

import { useState } from "react";
import styles from "./page.module.css";

import LoginCard from "@/сomponents/ui/cards/LoginCard/LoginCard";
import OTPCard from "@/сomponents/ui/cards/OTPCard/OTPCard";
import AuthCardWrapper from "@/сomponents/ui/wrappers/AuthCardWrapper/AuthCardWrapper";
import AuthPageFooter from "@/сomponents/ui/footers/AuthPageFooter/AuthPageFooter";

export default function LoginPage() {
  const [isOTP, setIsOTP] = useState(false);

  return (
    <div className={styles.page}>
      <div className={styles.page__background} />

      <div className={styles.page__content}>
        <div className={styles.page__authCard}>
          <AuthCardWrapper isOTP={isOTP}>
            {isOTP ? (
              <OTPCard onBack={() => setIsOTP(false)} />
            ) : (
              <LoginCard onNext={() => setIsOTP(true)} />
            )}
          </AuthCardWrapper>
        </div>

        <section className={styles.page__yandexInfo}>
          <h3 className={styles.page__yandexInfoTitle}>
            Yandex ID. The key to all your services
          </h3>
          <a href="https://yandex.ru/id/about" className={styles.page__yandexInfoLink}>
            Learn more
          </a>
        </section>

      </div>

      <AuthPageFooter />
    </div>
  );
}
