import { createSlice } from '@reduxjs/toolkit'

export const getUser = () => {
  return localStorage.getItem('user_meta') ? JSON.parse(localStorage.getItem('user_meta')) : null;
}
export const getToken = () => {
  return getUser()?.token || null;
}

// const getUser = () => {
//   const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
//   return user
// }
const getEmail = () => {
  return localStorage.getItem('email') ? localStorage.getItem('email') : ''
}

const initialState = {
  email: "",
  loggedin: getToken() !== null,
  token: getToken(),
  password: '',
  user: getUser(),
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
      state.user = action.payload
      localStorage.setItem('user_meta', action.payload)
    },
    loginUser: (state, action) => {
      state.user = action.payload
      state.loggedin = true;
      localStorage.setItem('user_meta', action.payload)
    },
    logoutUser: (state, action) => {
      state.token = '';
      state.loggedin = false;
      localStorage.removeItem('user_meta');
    }
  },
})

// Action creators are generated for each case reducer function
export const { loginUser, logoutUser, saveEmail, savePassword, saveUser } = userSlice.actions

export default userSlice.reducer