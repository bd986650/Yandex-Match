import { formatPhoneNumber } from "./formatPhoneNumber";

jest.mock("@/constants/countries", () => ({
  countriesForPhoneInput: [
    { code: "+7", emoji: "🇷🇺" },
    { code: "+1", emoji: "🇺🇸" },
  ],
}));

describe("formatPhoneNumber", () => {
  it("должен форматировать российский номер", () => {
    const result = formatPhoneNumber("79991234567");
    expect(result.masked).toContain("+7");
    expect(result.emoji).toBe("🇷🇺");
  });

  it("должен форматировать американский номер", () => {
    const result = formatPhoneNumber("15551234567");
    expect(result.masked).toContain("+1");
    expect(result.emoji).toBe("🇺🇸");
  });

  it("должен вернуть 🌐 если код неизвестен", () => {
    const result = formatPhoneNumber("999999");
    expect(result.emoji).toBe("🌐");
    expect(result.masked.startsWith("+")).toBe(true);
  });

  it("должен корректно обрабатывать пустую строку", () => {
    const result = formatPhoneNumber("");
    expect(result.emoji).toBe("🌐");
    expect(result.masked).toBe("+");
  });
});
