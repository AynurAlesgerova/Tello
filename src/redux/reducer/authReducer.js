import { createSlice } from "@reduxjs/toolkit";
import {authActions} from '../action/auth'
const {getCustomer, loginTokenForJWT, updateCustomer} = authActions

const initialState = { 
    islogin:  localStorage.getItem("islogin"),
    error: false,
    userData: {},
}

const authSlice =  createSlice({
    name: "auth",
    initialState,
    reducers:{
      setLoginStatus:(state, {payload})=> {
        state.islogin=payload
        if (payload===false) {
          state.userData={}
        }
        return state
      },
    },
    extraReducers: {
    // user info
    [getCustomer.rejected]: (state)=>{
    state.error= true
    return state 
    },
    [getCustomer.fulfilled]: (state, {payload})=>{
    state.userData= payload
    return state
    },
    [updateCustomer.fulfilled]: (state, {payload})=>{
      state.userData= payload
      return state 
    },
    [loginTokenForJWT.fulfilled]: (state)=>{
    state.islogin= true
    return state 
    }
  }
    
})

export const authReducer = authSlice.reducer
export const { setLoginStatus, logOut } = authSlice.actions