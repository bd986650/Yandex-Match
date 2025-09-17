import { sendSMS } from "../utils/sms.js";
// Заглушка базы данных
const users = [];
// Функция для генерации 6-значного кода
const generateCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};
// Функция для проверки лимита попыток
const checkAttempts = (phone) => {
    const user = users.find(u => u.phone === phone);
    return !user || user.attempts < 3;
};
// Функция для проверки времени между отправками (минимум 30 секунд)
const canResend = (phone) => {
    const user = users.find(u => u.phone === phone);
    if (!user)
        return true;
    const now = Date.now();
    return now - user.lastSent > 30000; // 30 секунд
};
export const sendCode = (req, res) => {
    const { phone } = req.body;
    if (!phone) {
        return res.status(400).json({ error: "Номер телефона обязателен" });
    }
    // Проверяем лимит попыток
    if (!checkAttempts(phone)) {
        return res.status(429).json({ error: "Превышен лимит попыток. Попробуйте позже." });
    }
    // Проверяем время между отправками
    if (!canResend(phone)) {
        return res.status(429).json({ error: "Повторная отправка доступна через 30 секунд" });
    }
    const code = generateCode();
    const now = Date.now();
    // Сохраняем или обновляем пользователя
    const user = users.find(u => u.phone === phone);
    if (user) {
        user.code = code;
        user.attempts = 0;
        user.lastSent = now;
    }
    else {
        users.push({ phone, code, attempts: 0, lastSent: now });
    }
    // Отправляем SMS
    sendSMS(phone, code);
    console.log(`OTP код отправлен на номер ${phone}: ${code}`);
    return res.json({
        success: true,
        message: "Код отправлен на ваш номер телефона",
        // code - убираем в продакшене
    });
};
export const verifyCode = (req, res) => {
    const { phone, code } = req.body;
    if (!phone || !code) {
        return res.status(400).json({ error: "Номер телефона и код обязательны" });
    }
    const user = users.find(u => u.phone === phone);
    if (!user) {
        return res.status(400).json({ error: "Неверный код" });
    }
    // Увеличиваем счетчик попыток
    user.attempts = (user.attempts || 0) + 1;
    if (user.code !== code) {
        if (user.attempts >= 3) {
            user.code = undefined; // Блокируем после 3 попыток
            return res.status(400).json({ error: "Превышен лимит попыток. Запросите новый код." });
        }
        return res.status(400).json({ error: "Неверный код" });
    }
    // Код верный - очищаем данные
    user.code = undefined;
    user.attempts = 0;
    return res.json({
        success: true,
        message: "Код подтвержден",
        user: { phone }
    });
};
export const resendCode = (req, res) => {
    const { phone } = req.body;
    if (!phone) {
        return res.status(400).json({ error: "Номер телефона обязателен" });
    }
    // Проверяем время между отправками
    if (!canResend(phone)) {
        return res.status(429).json({ error: "Повторная отправка доступна через 30 секунд" });
    }
    const code = generateCode();
    const now = Date.now();
    // Обновляем пользователя
    const user = users.find(u => u.phone === phone);
    if (user) {
        user.code = code;
        user.attempts = 0;
        user.lastSent = now;
    }
    else {
        users.push({ phone, code, attempts: 0, lastSent: now });
    }
    // Отправляем SMS
    sendSMS(phone, code);
    console.log(`OTP код повторно отправлен на номер ${phone}: ${code}`);
    return res.json({
        success: true,
        message: "Код отправлен повторно"
    });
};
//# sourceMappingURL=authController.js.map