import styles from "./page.module.css";

import LandingHeader from "@/сomponents/ui/headers/LandingHeader/LandingHeader";

export default function LandingPage() {
  return (
    <div className={styles.landing}>
      <LandingHeader />
    </div>
  );
}