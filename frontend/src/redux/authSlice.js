

import { createSlice } from '@reduxjs/toolkit';

//  Merr token nga localStorage (nese ekziston)
const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  isLoading: false,
  error: null
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    //  REGJISTRIM FILLESTAR
    registerStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    //  REGJISTRIM I SUKSESSHeM
    registerSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      // 💾 Ruaj token ne localStorage per persistim
      localStorage.setItem('token', action.payload.token);
    },
   
    registerFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

  
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
   
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
    },
    
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem('token');
    }
  }
});

export const {
  registerStart,
  registerSuccess,
  registerFailure,
  loginStart,
  loginSuccess,
  loginFailure,
  logout
} = authSlice.actions;

export default authSlice.reducer;
