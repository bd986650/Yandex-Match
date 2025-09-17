"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

import LoginCard from "@/components/ui/cards/LoginCard/LoginCard";
import OTPCard from "@/components/ui/cards/OTPCard/OTPCard";
import AuthCardWrapper from "@/components/ui/wrappers/AuthCardWrapper/AuthCardWrapper";
import AuthPageFooter from "@/components/layout/footers/AuthPageFooter/AuthPageFooter";

export default function LoginPage() {
  const [isOTP, setIsOTP] = useState(false);
  const router = useRouter();

  return (
    <div className={styles.page}>
      <div className={styles.page__background} />

      <div className={styles.page__content}>
        <div className={styles.page__authCard}>
          <AuthCardWrapper isOTP={isOTP}>
            {isOTP ? (
              <OTPCard onBack={() => setIsOTP(false)} onSuccess={() => router.push('/home')} />
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
