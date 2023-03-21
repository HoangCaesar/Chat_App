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
        yield put(authActions.updateIsLoading({ isLoading: true, error: false }));
        const response: LoginResponse = yield call(authApi.login, payload);
        yield put(
            authActions.logIn({
                isLoggedIn: true,
                token: response.token,
                user_id: response.user_id,
            })
        );
        localStorage.setItem('token', response.token);
        localStorage.setItem('uid', response.user_id);

        yield put(authActions.updateIsLoading({ isLoading: false, error: false }));
    } catch (error) {}
}

function* watchLoginFlow() {
    while (true) {
        const isLoggedIn = Boolean(localStorage.getItem('token'));
        if (!isLoggedIn) {
            const action: PayloadAction<UserLogin> = yield take(authActions.LoginUser.type);
            yield fork(handleLogin, action.payload);
        }
    }
}

function* authSaga() {
    yield fork(watchLoginFlow);
}

export default authSaga;
