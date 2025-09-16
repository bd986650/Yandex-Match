"use client";

import { useOtpStore } from "@/store/otpStore";
import { usePhoneStore } from "@/store/phoneStore";

export default function HomePage() {
    const code = useOtpStore((s) => s.code);
    const maskedPhone = usePhoneStore((s) => s.maskedPhone);
    const rawPhone = usePhoneStore((s) => s.rawPhoneDigits);

    return (
        <main style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center", justifyContent: "center", height: "100dvh" }}>
            <h1>Home</h1>
            <p>Phone (masked): {maskedPhone || "—"}</p>
            <p>Phone (raw): {rawPhone || "—"}</p>
            <p>OTP code: {code || "—"}</p>
        </main>
    );
}


