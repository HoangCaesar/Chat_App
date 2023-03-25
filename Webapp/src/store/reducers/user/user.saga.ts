import { PayloadAction } from '@reduxjs/toolkit';
import { put, takeLatest } from 'redux-saga/effects';

// Project Import
import userApi from '../../../api/user.api';
import { GetUserResponse } from '../../../model';
import { userActions } from './user.slice';

// ==============================|| CONVERSATION SAGA  ||============================== //

function* getUser() {
    try {
        const response: GetUserResponse = yield userApi.getUser();
        yield put(userActions.loadUserInfo(response.user));
    } catch (error) {
        console.log(error);
    }
}

function* userSaga() {
    yield takeLatest(userActions.getUser, getUser);
}

export default userSaga;
