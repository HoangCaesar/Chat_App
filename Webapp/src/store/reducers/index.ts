// third-party
import { combineReducers } from 'redux';

// project import
import auth from './auth/auth.slice'

// ==============================|| ROOT REDUCERS ||============================== //

const reducers = combineReducers({ auth });

export default reducers;
