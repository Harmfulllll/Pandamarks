import { createSlice } from "@reduxjs/toolkit";

const initialUser= localStorage.getItem('User')? JSON.parse(localStorage.getItem('User')): null;

const initialState={
    user: initialUser,
}

const authSlice= createSlice({
    initialState,
    name: 'auth',
    reducers:{
        login: (state,action)=>{
            state.user= action.payload;
        },
        logout:(state, action)=>{
            state.user= null;
        },
        signup: (state,action)=>{
            state.user= action.payload;
        }
    }
})
export default authSlice.reducer;
export const {login, logout, signup}= authSlice.actions;