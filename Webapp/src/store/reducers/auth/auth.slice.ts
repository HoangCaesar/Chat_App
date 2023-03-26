import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    UserLogin,
    UserRegister,
    LoginResponse,
    ResgiterResponse,
    ForgotPassword,
    ForgotPasswordResponse,
    ResetPassword,
    ResetPasswordResponse,
    VerifyOTP,
    VerifyOTPResponse,
} from '../../../model';
import { RootState } from '../../index';

export interface AuthState {
    isLoggedIn?: boolean;
    token?: string;
    isLoading?: boolean;
    user?: any;
    user_id?: string | null;
    email: string;
    error?: boolean;
}

const initialState: AuthState = {
    isLoggedIn: false,
    token: '',
    isLoading: false,
    user: null,
    user_id: null,
    email: '',
    error: false,
};

// ==============================|| AUTH SLICE  ||============================== //

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        LoginUser(state, action: PayloadAction<UserLogin>) {
            // Do nothing
        },
        RegisterUser(state, action: PayloadAction<UserRegister>) {
            // Do nothing
        },
        VerifyOTP(state, action: PayloadAction<VerifyOTP>) {
            // Do nothing
        },
        SignoutUser() {
            // Do nothing
        },
        ForgotPassword(state, action: PayloadAction<ForgotPassword>) {
            // Do nothing
        },
        ResetPassword(state, action: PayloadAction<ResetPassword>) {
            // Do nothing
        },

        // others
        updateIsLoading(state, action: PayloadAction<any>) {
            state.error = action.payload.error;
            state.isLoading = action.payload.isLoading;
        },
        logIn(state, action: PayloadAction<any>) {
            state.isLoggedIn = action.payload.isLoggedIn;
            state.token = action.payload.token;
            state.user_id = action.payload.user_id;
        },
        signOut(state) {
            state.isLoggedIn = false;
            state.token = '';
            state.user_id = null;
        },
        updateRegisterEmail(state, action: PayloadAction<any>) {
            state.email = action.payload.email;
        },
    },
});

// Actions
const authActions = authSlice.actions;

// Selectors
const authSelectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
const authSelectToken = (state: RootState) => state.auth.token;
const authSelectIsLoading = (state: RootState) => state.auth.isLoading;
const authSelectUser = (state: RootState) => state.auth.user;
const authSelectUserID = (state: RootState) => state.auth.user_id;
const authSelectEmail = (state: RootState) => state.auth.email;
const authSelectError = (state: RootState) => state.auth.error;

// Reducer
const authReducer = authSlice.reducer;

export {
    authActions,
    authSelectIsLoggedIn,
    authSelectToken,
    authSelectIsLoading,
    authSelectUser,
    authSelectUserID,
    authSelectEmail,
    authSelectError,
};
export default authReducer;
