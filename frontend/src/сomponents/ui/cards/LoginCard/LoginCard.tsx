"use client";

import { useState } from "react";
import styles from "./LoginCard.module.css";

import NumberInput from "@/сomponents/ui/inputs/PhoneInput/PhoneInput";
import LoginButton from "@/сomponents/ui/buttons/AuthButtons/LoginButton/LoginButton";
import YandexIDLogo from "@/сomponents/ui/icons/YandexIDIcon/YandexIDIcon";
import { useAuth } from "@/hooks/useAuth";
import { usePhoneStore } from "@/store/phoneStore";

export default function LoginCard({ onNext }: { onNext: () => void }) {
    const [error, setError] = useState<string | null>(null);
    const { sendOTPCode, isLoading } = useAuth();
    const { rawPhoneDigits } = usePhoneStore();

    const handleLogin = async () => {
        if (!rawPhoneDigits) {
            setError("Введите номер телефона");
            return;
        }

        setError(null);
        const result = await sendOTPCode(rawPhoneDigits);

        if (result.success) {
            onNext();
        } else {
            setError(result.error || "Произошла ошибка");
        }
    };

    return (
        <main>
            <YandexIDLogo />

            <h1 className={styles.loginCard__title}>
                Enter your<br />phone number
            </h1>
            <h2 className={styles.loginCard__subtitle}>To log in or register</h2>

            <NumberInput />
            <div id="recaptcha-container"></div>
            <LoginButton onClick={() => sendOTPCode(rawPhoneDigits)} />

        </main>
    )
}
