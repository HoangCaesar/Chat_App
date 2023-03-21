import { PayloadAction } from '@reduxjs/toolkit';
import { call, delay, fork, put, take, takeLatest } from 'redux-saga/effects';

// Project Import
import { authActions } from './auth.slice';
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
import authApi from '../../../api/auth.api';

// ==============================|| AUTH SAGA  ||============================== //

function* register(action: PayloadAction<UserRegister>) {
    try {
    } catch (error) {}
}

function* handleLogin(payload: UserLogin) {
    try {
       
    } catch (error) {
    }
}

function* watchLoginFlow() {
    while (true) {
        
    }
}

function* authSaga() {
    yield fork(watchLoginFlow);
}

export default authSaga;
