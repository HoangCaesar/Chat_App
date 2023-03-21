import createSagaMiddleware from '@redux-saga/core';
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import rootSaga from './root.saga';

// project import
import rootReducer from './reducers'

// ==============================|| APP STORE - COMBINE ALL REDUCERS  ||============================== //

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
