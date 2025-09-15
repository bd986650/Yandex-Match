import styles from "./page.module.css";

import NumberInput from "@/сomponents/NumberInput/NumberInput";
import LoginButton from "@/сomponents/LoginButton/LoginButton";
import YandexLogo from "@/сomponents/YandexLogo/YandexLogo";

export default function LoginPage() {
    return (
        <div className={styles.page}>
            <div className={styles.background} />

            <main className={styles.card}>
                <a href="https://ya.ru" aria-label="Go to Yandex homepage">
                    <YandexLogo />
                </a>

                <h1 className={styles.title}>Enter your<br />phone number</h1>
                <h2 className={styles.subtitle}>To log in or register</h2>

                <NumberInput />
                <LoginButton />
            </main>

            <section className={styles.yandexInfo}>
                <h3 className={styles.yandexInfo__title}>
                    Yandex ID. The key to all your services
                </h3>
                <a href="https://yandex.ru/id/about" className={styles.yandexInfo__link}>
                    Learn more
                </a>
            </section>

            <footer className={styles.footer}>
                <nav className={styles.footerNav}>
                    <a
                        href="https://yandex.ru/support/common/ru/browsers-settings/incognito.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.footerNav__link}
                    >
                        Use Incognito mode on a shared computer
                    </a>

                    <div className={styles.footerNav__right}>
                        <a
                            href="https://yandex.ru/support/id/ru/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.footerNav__link}
                        >
                            Help and support
                        </a>

                        <span className={styles.footerNav__copyright}>
                            2001–2025,{" "}
                            <a
                                href="https://ya.ru/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.footerNav__link}
                            >
                                Yandex
                            </a>
                        </span>
                    </div>
                </nav>
            </footer>
        </div>
    );
}
