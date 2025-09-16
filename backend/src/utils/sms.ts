export const sendSMS = (phone: string, code: string) => {
  console.log(`Sending SMS to ${phone}: Your code is ${code}`);
  // Здесь можно интегрировать Twilio/Nexmo/Яндекс.Телематика
};
