import { getMaskedPhoneForOTPCard } from "./getMaskedPhoneForOTPCard";

describe("getMaskedPhoneForOTPCard", () => {
  it("возвращает пустую строку для пустого входа", () => {
    expect(getMaskedPhoneForOTPCard("")).toBe("");
  });

  it("возвращает оригинальный номер, если меньше 10 цифр", () => {
    expect(getMaskedPhoneForOTPCard("+12345")).toBe("+12345");
  });

  it("корректно маскирует российский номер начиная с +7", () => {
    const masked = getMaskedPhoneForOTPCard("+79261234567");
    expect(masked).toBe("+7 926 ***-**-67");
  });

  it("корректно маскирует российский номер начиная с 8", () => {
    const masked = getMaskedPhoneForOTPCard("89261234567");
    expect(masked).toBe("+7 926 ***-**-67");
  });

  it("маскирует номер другой страны", () => {
    const masked = getMaskedPhoneForOTPCard("+12345678901");
    expect(masked).toBe("+123 ***-**-01");
  });
});
