import { countriesForPhoneInput } from "@/constants/countries";

export const formatPhoneNumber = (val: string) => {
  let matrix = '###############';
  let selectedEmoji = "🌐";

  countriesForPhoneInput.forEach(item => {
    const codeDigits = item.code.replace(/\D/g, '');
    if (val.startsWith(codeDigits)) {
      matrix = item.code.replace(/^\+/, '');
      selectedEmoji = item.emoji || "🌐";
    }
  });

  let i = 0;
  const masked = matrix.replace(/./g, (a) => {
    return /[#\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
  });

  return { masked: "+" + masked, emoji: selectedEmoji };
};