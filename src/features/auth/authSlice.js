import { createSlice } from "@reduxjs/toolkit";
import api from "../../app/api";

const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation({
      query: (credentials) => ({
        url: "/register",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    login: build.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});
export const { useRegisterMutation, useLoginMutation } = authApi;
/** Session storage key */
const TOKEN_KEY = "token";
/** Store the payload's token in state and session storage */
const storeToken = (state, { payload }) => {
  state.token = payload.token;
  sessionStorage.setItem(TOKEN_KEY, payload.token);
};
/** This slice keeps track of the JWT sent from the API */
const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: sessionStorage.getItem(TOKEN_KEY),
  },
  reducers: {
    /** Logging out simply means wiping the stored token */
    logout: (state) => {
      state.token = null;
      sessionStorage.removeItem(TOKEN_KEY);
    },
  },
  // extraReducers allows us to attach callback functions to
  // updates in _other_ slices of the store.
  // These `extraReducers` automatically update the token when
  // the RTK Query mutations are fulfilled.
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.login.matchFulfilled, storeToken);
    builder.addMatcher(api.endpoints.register.matchFulfilled, storeToken);
  },
});
export const { logout } = authSlice.actions;
export const selectToken = (state) => state.auth.token;
export default authSlice.reducer;
export const selectIsLoggedIn = (state) => !!state.auth.token;
