import { usePhoneStore } from "./phoneStore";

describe("usePhoneStore", () => {
  beforeEach(() => {
    usePhoneStore.getState().clearPhone(); 
  });

  it("должен иметь пустые значения по умолчанию", () => {
    const state = usePhoneStore.getState();
    expect(state.rawPhoneDigits).toBe("");
    expect(state.maskedPhone).toBe("");
  });

  it("setPhone должен устанавливать телефонные данные", () => {
    usePhoneStore.getState().setPhone({ raw: "79991234567", masked: "+7 *** *** 56-7" });
    const state = usePhoneStore.getState();
    expect(state.rawPhoneDigits).toBe("79991234567");
    expect(state.maskedPhone).toBe("+7 *** *** 56-7");
  });

  it("clearPhone должен очищать телефонные данные", () => {
    usePhoneStore.getState().setPhone({ raw: "79991234567", masked: "+7 *** *** 56-7" });
    usePhoneStore.getState().clearPhone();
    const state = usePhoneStore.getState();
    expect(state.rawPhoneDigits).toBe("");
    expect(state.maskedPhone).toBe("");
  });
});
