import { all } from 'redux-saga/effects';

// Project import
import authSaga from './reducers/auth/auth.saga';
import appSaga from './reducers/app/app.saga';
import conversationSaga from './reducers/conversation/conversation.saga';

// ==============================|| ROOT SAGA - COMBINE ALL SAGAS  ||============================== //

function* rootSaga() {
    yield all([authSaga(), appSaga(), conversationSaga()]);
}

export default rootSaga;
