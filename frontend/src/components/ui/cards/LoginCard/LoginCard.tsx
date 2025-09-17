import styles from "./LoginCard.module.css";

import NumberInput from "@/components/ui/inputs/PhoneInput/PhoneInput";
import LoginButton from "@/components/ui/buttons/AuthButtons/LoginButton/LoginButton";
import YandexIDLogo from "@/components/ui/icons/YandexIDIcon/YandexIDIcon";

export default function LoginCard({ onNext }: { onNext: () => void }) {
    return (
        <main>
            <YandexIDLogo />

            <h1 className={styles.loginCard__title}>
                Enter your<br />phone number
            </h1>
            <h2 className={styles.loginCard__subtitle}>To log in or register</h2>

            <NumberInput />
            <LoginButton onClick={onNext} />
        </main>
    )
}
