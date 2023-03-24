import { PayloadAction } from '@reduxjs/toolkit';
import { takeLatest } from 'redux-saga/effects';

// Project Import
import serverApi from '../../../api/server.api';
import { AddUserToServer } from '../../../model';
import { conversationActions } from './conversation.slice';

// ==============================|| CONVERSATION SAGA  ||============================== //

function* addUserToServer(action: PayloadAction<AddUserToServer>) {
    try {
        const response: Promise<any> = yield serverApi.addUserToServer(action.payload);
    } catch (error) {
        console.log(error);
    }
}

function* conversationSaga() {
    yield takeLatest(conversationActions.addUserToServer, addUserToServer);
}

export default conversationSaga;
