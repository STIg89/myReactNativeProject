import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  userName: null,
  userEmail: null,
  userAvatar: null,
  authorized: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      userName: payload.userName,
      userEmail: payload.userEmail,
      authorized: payload.authorized,
    }),
    authLogout: () => initialState,
  },
});
