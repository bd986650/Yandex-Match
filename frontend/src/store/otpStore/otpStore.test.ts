import { useOtpStore } from "./otpStore";

describe("useOtpStore", () => {
  beforeEach(() => {
    useOtpStore.getState().clear(); // сброс состояния перед каждым тестом
  });

  it("должен иметь пустой код по умолчанию", () => {
    const state = useOtpStore.getState();
    expect(state.code).toBe("");
  });

  it("setCode должен устанавливать код", () => {
    useOtpStore.getState().setCode("123456");
    const state = useOtpStore.getState();
    expect(state.code).toBe("123456");
  });

  it("clear должен очищать код", () => {
    useOtpStore.getState().setCode("123456");
    useOtpStore.getState().clear();
    const state = useOtpStore.getState();
    expect(state.code).toBe("");
  });
});
