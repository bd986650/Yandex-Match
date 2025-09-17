import Link from "next/link";
import styles from "./LandingHeader.module.css";

import LogoButton from "@/components/ui/buttons/LogoButton/LogoButton";

export default function LandingHeader() {
    return (
        <header className={styles.header}>
            <LogoButton route="/" />

            <Link href={"/auth"}>
                <div className={styles.header__authButton}>
                    <span className={styles.header__authLabel}>Log in</span>
                </div>
            </Link>
        </header>
    )
}