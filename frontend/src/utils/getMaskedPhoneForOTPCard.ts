export const getMaskedPhoneForOTPCard = (maskedPhone: string): string => {
  if (!maskedPhone) return "";

  const digits = maskedPhone.replace(/\D/g, "");
  if (digits.length < 10) return maskedPhone;

  if (digits.length >= 11 && (digits.startsWith("7") || digits.startsWith("8"))) {
    const country = "+7";
    const operator = digits.slice(-10, -7);
    const last2 = digits.slice(-2);
    return `${country} ${operator} ***-**-${last2}`;
  }

  const first3 = digits.slice(0, 3);
  const last2 = digits.slice(-2);
  return `+${first3} ***-**-${last2}`;
};