import { PayloadAction } from '@reduxjs/toolkit';
import { put, takeLatest } from 'redux-saga/effects';

// Project Import
import serverApi from '../../../api/server.api';
import { rootNavigate } from '../../../hooks';
import { AddUserToServer, AccessServerResponse } from '../../../model';
import { conversationActions } from './conversation.slice';

// ==============================|| CONVERSATION SAGA  ||============================== //

function* addUserToServer(action: PayloadAction<AddUserToServer>) {
    try {
        const response: AccessServerResponse = yield serverApi.addUserToServer(action.payload);
        if (response.status === 'success') {
            window.location.reload();
        }
    } catch (error) {
        console.log(error);
    }
}

function* conversationSaga() {
    yield takeLatest(conversationActions.addUserToServer, addUserToServer);
}

export default conversationSaga;
