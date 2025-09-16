import styles from "./AuthPageFooter.module.css"

export default function AuthPageFooter() {
    return (
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
    )
}