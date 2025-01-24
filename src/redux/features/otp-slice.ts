// import { clearStorage, getStorage, saveStorage } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface OTPState {
  email: string;
  verification_key: string;
}

const initialState: OTPState = {
  email: sessionStorage.getItem("otp_email") || "",
  verification_key: sessionStorage.getItem("verification_key") || "",
};

export const otpSlice = createSlice({
  name: "otp",
  initialState,
  reducers: {
    saveEmail: (
      state,
      action: PayloadAction<{ email: string; verification_key: string }>
    ) => {
      state.email = action.payload.email;
      state.verification_key = action.payload.verification_key;
      // saveStorage("otp_email", action.payload.email)
      sessionStorage.setItem("otp_email", action.payload.email);
      sessionStorage.setItem(
        "verification_key",
        action.payload.verification_key
      );
    },
    clearOtp: (state) => {
      state.email = "";
      state.verification_key = "";
      sessionStorage.removeItem("otp_email");
      sessionStorage.removeItem("verification_key");
    },
  },
});

export const { saveEmail, clearOtp } = otpSlice.actions;
export default otpSlice.reducer;
