import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticating: false,
    };

export const userReducer = createReducer(initialState, {
    LoadUserRequest: (state) => {
        state.loading = true;
    },
    LoadUserSuccess: (state, action) => {
        state.isAuthenticated=true;
        state.loading = false;
        state.user = action.payload;
    },
    LoadUserFail: (state,action) => {
        state.loading = false;
        state.error = action.payload;
    },
   clearErrors: (state) => {
        state.error = null;
    },
    LogoutUser: (state) => {
        state.isAuthenticated = false;
        state.user = null;
    },
    });
    

