import { createSlice } from '@reduxjs/toolkit'

export const getToken = () => {
  return localStorage.getItem('user') ? localStorage.getItem('user').token : null;
}

const getUser = () => {
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
  return user
}

const initialState = {
  email: "",
  loggedin: getToken() !== null,
  token: getToken(),
  password: '',
  user: getUser()
}
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveEmail: (state, action) => {
      state.email = action.payload
      // localStorage.setItem('email', action.payload)
    },
    savePassword: (state, action) => {
      state.password = action.payload
    },
    saveUser: (state, action) => {
      console.log(action.payload)
      state.user = action.payload
      localStorage.setItem('user', JSON.stringify(action.payload))
    }
  },
})

// Action creators are generated for each case reducer function
export const { saveUser, saveEmail, savePassword } = userSlice.actions

export default userSlice.reducer