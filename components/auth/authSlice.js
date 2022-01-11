import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { config } from '../../config'
const initialState = {
  token: '',
  role: '',
  username: '',
  status: null,
}

// export const getLogin = createAsyncThunk(
//   'auth/login',
//   async (dispatch, getState) => {
//     return await axios
//       .post(`${config.backend}/auth/login`,data)
//       .then((res) => res.data)
//       .catch((e) => console.log(e))
//   }
// )

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
