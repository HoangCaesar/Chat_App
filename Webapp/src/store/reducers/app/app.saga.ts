import { PayloadAction } from '@reduxjs/toolkit';
import { fork, takeLatest, call, put } from 'redux-saga/effects';

// Project Import
import { appActions } from './app.slice';
import serverApi from '../../../api/server.api';
import { ServerListResponse } from '../../../model';

// ==============================|| APP SAGA  ||============================== //

function* getServerList() {
    try {
        const response: ServerListResponse = yield call(serverApi.getAllServer);
        if (response.status === 'success') {
            yield put(
                appActions.setServerList({
                    servers: [...response.servers],
                })
            );
            //  rootNavigate('/app');
        }
    } catch (error) {
        console.log(error);
    }
}

function* appSaga() {
    yield takeLatest(appActions.getServerList, getServerList);
}

export default appSaga;
