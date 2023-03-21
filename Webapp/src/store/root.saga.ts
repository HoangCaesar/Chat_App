import { all } from 'redux-saga/effects';

// Project import
import authSaga from './reducers/auth/auth.saga';

// ==============================|| ROOT SAGA - COMBINE ALL SAGAS  ||============================== //

function* rootSaga() {
    yield all([authSaga()]);
}

export default rootSaga;
