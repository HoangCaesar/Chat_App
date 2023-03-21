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
import { rootNavigate } from '../../../hooks';

// ==============================|| AUTH SAGA  ||============================== //

function* register(action: PayloadAction<UserRegister>) {
    try {
        yield put(authActions.updateIsLoading({ isLoading: true, error: false }));
        const response: ResgiterResponse = yield call(authApi.register, action.payload);
        if (response.status === 'success') {
            yield put(authActions.updateRegisterEmail({ email: action.payload.email }));
            yield put(authActions.updateIsLoading({ isLoading: false, error: false }));
            rootNavigate('/auth/verify');
        }
    } catch (error) {
        console.log(error);
        yield put(authActions.updateIsLoading({ isLoading: false, error: true }));
    }
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
    } catch (error) {
        console.log(error);
        yield put(authActions.updateIsLoading({ isLoading: false, error: true }));
    }
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
    yield takeLatest(authActions.RegisterUser, register);
}

export default authSaga;
