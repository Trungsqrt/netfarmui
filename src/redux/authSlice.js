import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
   name: "auth",
   initialState: {
      login: {
         currentUser: null, //luu thong tin dang nhap tra ve
         isFetching: false, //de lam chuc nang loading luc dang nhap
         error: false, //luu loi
      },
      register: {
         isFetching: false,
         error: false,
         success: false,
      },
   },
   reducers: {
      loginStart: (state) => {
         state.login.isFetching = true; //dang dang nhap
      },
      loginSuccess: (state, action) => {
         state.login.isFetching = false;
         state.login.currentUser = action.payload;
         state.login.error = false;
      },
      loginFailed: (state) => {
         state.login.isFetching = false;
         state.login.error = true;
      },
      registerStart: (state) => {
         state.register.isFetching = true;
      },
      registerSuccess: (state, action) => {
         state.register.isFetching = false;
         state.register.success = true;
         state.register.error = false;
      },
      registerFailed: (state) => {
         state.register.isFetching = false;
         state.register.error = true;
         state.register.success = false;
      },
   },
});

export const {
   loginStart,
   loginSuccess,
   loginFailed,
   registerStart,
   registerSuccess,
   registerFailed,
} = authSlice.actions;

export default authSlice.reducer;
