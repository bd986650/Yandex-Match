
import Link from "next/link";
import styles from "./page.module.css";

import LogoButton from "../сomponents/LogoButton/LogoButton";
import HumanImage from "../assets/landing/humanLandingPage.png";

export default function LandingPage() {
  return (
    <div className={styles.landing}>
      <header className={styles.landing__header}>
        <LogoButton route="/" />

        <Link
          href={"/login"}
        >
          <div className={styles.auth__button}>
            <span className={styles.auth__label}>Log in</span>
          </div>
        </Link>
      </header>

      <main className={styles.landing__main}>
        <div className={styles.hero}>
          <div className={styles.hero__circle}></div>
          <div className={styles.hero__image}>
            <img src={HumanImage.src} alt="Human Landing" />
          </div>
        </div>

        <div className={styles.slogan}>
          <span className={styles.slogan__title}>Dating</span>
          <span className={styles.slogan__subtitle}>Website.</span>
        </div>
      </main>
    </div>
  );
}
