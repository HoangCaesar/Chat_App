// third-party
import { combineReducers } from 'redux';

// project import
import auth from './auth/auth.slice';
import app from './app/app.slice';
import conversation from './conversation/conversation.slice';

// ==============================|| ROOT REDUCERS ||============================== //

const reducers = combineReducers({ auth, app, conversation });

export default reducers;
