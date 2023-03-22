import { PayloadAction } from '@reduxjs/toolkit';
import { call, delay, fork, put, take, takeLatest } from 'redux-saga/effects';

// Project Import
import authApi from '../../../api/auth.api';
import { rootNavigate } from '../../../hooks';
import {
    LoginResponse,
    ResgiterResponse,
    UserLogin,
    UserRegister,
    VerifyOTP,
    VerifyOTPResponse,
    ForgotPassword,
    ForgotPasswordResponse,
    ResetPassword,
    ResetPasswordResponse,
} from '../../../model';
import { appActions } from '../app/app.slice';
import { authActions } from './auth.slice';

// ==============================|| AUTH SAGA  ||============================== //

function* resetPassword(action: PayloadAction<ResetPassword>) {
    try {
        yield put(authActions.updateIsLoading({ isLoading: true, error: false }));
        const response: ResetPasswordResponse = yield call(authApi.resetPassword, action.payload);
        if (response.status === 'success') {
            yield put(
                authActions.logIn({
                    isLoggedIn: true,
                    token: response.token,
                })
            );
            yield put(appActions.openSnackBar({ severity: 'success', message: response.message }));
            yield put(authActions.updateIsLoading({ isLoading: false, error: false }));
            rootNavigate('/app');
        } else {
            yield put(appActions.openSnackBar({ severity: 'error', message: response.message }));
            yield put(authActions.updateIsLoading({ isLoading: false, error: true }));
        }
    } catch (error: any) {
        console.log(error);
        yield put(appActions.openSnackBar({ severity: 'success', message: error.message }));
        yield put(authActions.updateIsLoading({ isLoading: false, error: true }));
    }
}

function* forgotPassword(action: PayloadAction<ForgotPassword>) {
    try {
        yield put(authActions.updateIsLoading({ isLoading: true, error: false }));
        const response: ForgotPasswordResponse = yield call(authApi.forgotPassword, action.payload);
        if (response.status === 'success') {
            yield put(appActions.openSnackBar({ severity: 'success', message: response.message }));
            yield put(authActions.updateIsLoading({ isLoading: false, error: false }));
        } else {
            yield put(appActions.openSnackBar({ severity: 'error', message: response.message }));
            yield put(authActions.updateIsLoading({ isLoading: false, error: true }));
        }
    } catch (error: any) {
        console.log(error);
        yield put(appActions.openSnackBar({ severity: 'success', message: error.message }));
        yield put(authActions.updateIsLoading({ isLoading: false, error: true }));
    }
}

function* signout() {
    try {
        localStorage.removeItem('token');
        localStorage.removeItem('uid');
        yield put(authActions.signOut());
    } catch (error: any) {
        console.log(error);
        yield put(authActions.updateIsLoading({ isLoading: false, error: true }));
    }
}

function* verifyOtp(action: PayloadAction<VerifyOTP>) {
    try {
        yield put(authActions.updateIsLoading({ isLoading: true, error: false }));
        const response: VerifyOTPResponse = yield call(authApi.verifyOTP, action.payload);
        if (response.status === 'success') {
            yield put(authActions.updateRegisterEmail({ email: '' }));
            localStorage.setItem('token', response.token);
            localStorage.setItem('user_id', response.user_id);
            yield put(
                authActions.logIn({
                    isLoggedIn: true,
                    token: response.token,
                    user_id: response.user_id,
                })
            );
            yield put(appActions.openSnackBar({ severity: 'success', message: response.message }));
            yield put(authActions.updateIsLoading({ isLoading: false, error: false }));
            rootNavigate('/app');
            yield delay(1000);
        } else {
            yield put(appActions.openSnackBar({ severity: 'error', message: response.message }));
            yield put(authActions.updateIsLoading({ isLoading: false, error: true }));
        }
    } catch (error: any) {
        console.log(error);
        yield put(appActions.openSnackBar({ severity: 'error', message: error.message }));
        yield put(authActions.updateIsLoading({ isLoading: false, error: true }));
    }
}

function* register(action: PayloadAction<UserRegister>) {
    try {
        yield put(authActions.updateIsLoading({ isLoading: true, error: false }));
        const response: ResgiterResponse = yield call(authApi.register, action.payload);
        if (response.status === 'success') {
            yield put(authActions.updateRegisterEmail({ email: action.payload.email }));
            yield put(appActions.openSnackBar({ severity: 'success', message: response.message }));
            yield put(authActions.updateIsLoading({ isLoading: false, error: false }));
            rootNavigate('/auth/verify');
        } else {
            yield put(appActions.openSnackBar({ severity: 'error', message: response.message }));
            yield put(authActions.updateIsLoading({ isLoading: false, error: true }));
        }
    } catch (error: any) {
        console.log(error);
        yield put(appActions.openSnackBar({ severity: 'error', message: error.message }));
        yield put(authActions.updateIsLoading({ isLoading: false, error: true }));
    }
}

function* handleLogin(payload: UserLogin) {
    try {
        yield put(authActions.updateIsLoading({ isLoading: true, error: false }));
        const response: LoginResponse = yield call(authApi.login, payload);
        if (response.status === 'success') {
            yield put(
                authActions.logIn({
                    isLoggedIn: true,
                    token: response.token,
                    user_id: response.user_id,
                })
            );
            localStorage.setItem('token', response.token);
            localStorage.setItem('uid', response.user_id);
            yield put(appActions.openSnackBar({ severity: 'success', message: response.message }));
            yield put(authActions.updateIsLoading({ isLoading: false, error: false }));
            rootNavigate('/app');
        } else {
            console.log(response);
            yield put(appActions.openSnackBar({ severity: 'error', message: response.message }));
            yield put(authActions.updateIsLoading({ isLoading: false, error: true }));
        }
    } catch (error: any) {
        console.log(error);
        yield put(appActions.openSnackBar({ severity: 'error', message: error.message }));
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
    yield takeLatest(authActions.VerifyOTP, verifyOtp);
    yield takeLatest(authActions.SignOut, signout);
    yield takeLatest(authActions.ForgotPassword, forgotPassword);
    yield takeLatest(authActions.ResetPassword, resetPassword);
}

export default authSaga;
