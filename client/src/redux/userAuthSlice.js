import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: !!localStorage.getItem('accessToken')
};

const userAuthSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { accessToken, refreshToken } = action.payload;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      state.isLoggedIn = true;
    },
    logout: (state) => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      state.isLoggedIn = false;
    },
  },
});

export const { loginSuccess, logout } = userAuthSlice.actions;
export default userAuthSlice.reducer;

