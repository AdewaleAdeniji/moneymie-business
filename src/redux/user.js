import { createSlice } from '@reduxjs/toolkit'

export const getToken = () => {
  return localStorage.getItem('user') ? localStorage.getItem('user').token : null;
}

const getEmail = () => {
  return localStorage.getItem('email') ? localStorage.getItem('email') : ''
}

const initialState = {
  email: getEmail(),
  loggedin: getToken() !== null,
  token: getToken(),
  password: ''
}
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveEmail: (state, action) => {
      state.email = action.payload
      localStorage.setItem('email', action.payload)
    },
    savePassword: (state, action) => {
      state.password = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { saveUser, saveEmail, savePassword } = userSlice.actions

export default userSlice.reducer