"use client";

import React from "react";
import styles from "./NumberInput.module.css";

const NumberInput: React.FC = () => {
    return (
        <div className={styles.inputContainer}>
            <div className={styles.selectWrapper}>
                <span className={styles.select}>US</span>
            </div>
            <input
                type="number"
                placeholder="+1 (555) 000-000"
                className={styles.input}
            />
        </div>
    );
};

export default NumberInput;
