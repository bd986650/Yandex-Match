import styles from "./page.module.css";

import LandingHeader from "@/components/layout/headers/LandingHeader/LandingHeader";

export default function LandingPage() {
  return (
    <div className={styles.landing}>
      <LandingHeader />
    </div>
  );
}