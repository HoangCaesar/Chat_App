// third-party
import { combineReducers } from 'redux';

// project import
import auth from './auth/auth.slice';
import app from './app/app.slice';

// ==============================|| ROOT REDUCERS ||============================== //

const reducers = combineReducers({ auth, app });

export default reducers;
