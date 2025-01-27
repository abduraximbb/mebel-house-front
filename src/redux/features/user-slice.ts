import { clearStorage, getStorage, saveStorage } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  value: {
    id: number | null;
    email: string;
  };
}

const initialState: UserState = {
  value: JSON.parse(getStorage("user") || 'null') || {
    id: null,
    email: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser: (state, action: PayloadAction<{ email: string; id: number }>) => {
      state.value = action.payload;
      saveStorage("user", action.payload);
    },
    clearUser: (state) => {
      state.value = { id: null, email: "" };
      clearStorage("user");
    },
  },
});

export const { saveUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
