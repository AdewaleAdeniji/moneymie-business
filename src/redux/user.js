import { createSlice } from '@reduxjs/toolkit'

const getToken = () => {
    return localStorage.getItem('user') ? localStorage.getItem('user').token : false;
}
const initialState = {
    email:'',
    loggedin: true,
    token:getToken(),
    password:''
}
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveEmail: (state, action) => {
      state.email = action.payload
    },
    savePassword: (state, action) => {
        state.password = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { saveUser } = userSlice.actions

export default userSlice.reducer