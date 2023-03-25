import { all } from 'redux-saga/effects';

// Project import
import authSaga from './reducers/auth/auth.saga';
import appSaga from './reducers/app/app.saga';
import conversationSaga from './reducers/conversation/conversation.saga';
import userSaga from './reducers/user/user.saga';

// ==============================|| ROOT SAGA - COMBINE ALL SAGAS  ||============================== //

function* rootSaga() {
    yield all([authSaga(), appSaga(), conversationSaga(), userSaga()]);
}

export default rootSaga;
