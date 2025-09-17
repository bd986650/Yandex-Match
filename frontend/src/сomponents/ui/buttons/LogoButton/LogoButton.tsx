"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./LogoButton.module.css";
import LogoImage from "../../../../../public/logo.svg";
import { ILogoButtonProps } from "../../../../shared/types/ui/button";

export default function LogoButton({ route, isActive = true, action }: ILogoButtonProps) {
    const Content = (
        <div className={styles.brand}>
            <span className={styles.brand__letter}>Y</span>
            <span className={styles.brand__text}>andex</span>
            <span className={styles.brand__logo}>
                <Image src={LogoImage} alt="Logo" width={24} height={24} priority />
            </span>
            <span className={styles.brand__text}>Match</span>
        </div>
    );

    if (route) {
        return (
            <Link
                href={isActive ? route : "#"}
                className={`${styles.logoButton} ${!isActive ? styles.disabled : ""}`}
                style={!isActive ? { pointerEvents: "none" } : {}}
            >
                {Content}
            </Link>
        );
    }

    return (
        <button
            className={`${styles.logoButton} ${!isActive ? styles.disabled : ""}`}
            onClick={isActive ? action : undefined}
            disabled={!isActive}
        >
            {Content}
        </button>
    );
}
