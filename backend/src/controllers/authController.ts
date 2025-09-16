import type { Request, Response } from "express";
import { sendSMS } from "../utils/sms.js";

// Заглушка базы данных
const users: { phone: string; code: string | undefined }[] = [];

export const sendCode = (req: Request, res: Response) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ error: "Phone is required" });

  const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6 цифр

  // Сохраняем или обновляем пользователя
  const user = users.find(u => u.phone === phone);
  if (user) {
    user.code = code;
  } else {
    users.push({ phone, code });
  }

  sendSMS(phone, code);

  return res.json({ success: true, code }); // code можно убрать на проде
};

export const verifyCode = (req: Request, res: Response) => {
  const { phone, code } = req.body;
  if (!phone || !code) return res.status(400).json({ error: "Phone and code required" });

  const user = users.find(u => u.phone === phone && u.code === code);
  if (!user) return res.status(400).json({ error: "Invalid code" });

  user.code = undefined; // очистка кода после проверки

  return res.json({ success: true, user: { phone } });
};
