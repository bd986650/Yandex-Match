import styles from "./LoginCard.module.css";

import NumberInput from "@/сomponents/ui/inputs/PhoneInput/PhoneInput";
import LoginButton from "@/сomponents/ui/buttons/AuthButtons/LoginButton/LoginButton";
import YandexIDLogo from "@/сomponents/ui/icons/YandexIDIcon/YandexIDIcon";

export default function LoginCard({ onNext }: { onNext: () => void }) {
    return (
        <main>
            <YandexIDLogo />

            <h1 className={styles.title}>
                Enter your<br />phone number
            </h1>
            <h2 className={styles.subtitle}>To log in or register</h2>

            <NumberInput />
            <LoginButton onClick={onNext} /> {/* вызовет переключение */}
        </main>
    )
}
