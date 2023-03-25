// third-party
import { combineReducers } from 'redux';

// project import
import auth from './auth/auth.slice';
import app from './app/app.slice';
import conversation from './conversation/conversation.slice';
import user from './user/user.slice';

// ==============================|| ROOT REDUCERS ||============================== //

const reducers = combineReducers({ auth, app, conversation, user });

export default reducers;
