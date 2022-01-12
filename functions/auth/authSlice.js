import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: '',
  role: '',
  username: '',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    Login: (state, { payload }) => {
      return {
        ...state,
        token: payload.token,
        role: payload.role ?? '',
        username: payload.username ?? '',
      }
    },
    Logout: (state, { payload }) => {
      localstorage.clear()
      return {
        payload,
      }
    },
  },
})
export const { Login, Logout } = authSlice.actions
export default authSlice.reducer
