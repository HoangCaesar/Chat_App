import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Project Import
import { RootState } from '../../index';
import { GetUserResponse } from '../../../model';

// State
export interface UserState {
    user: any;
    users: [any]
}

const initialState: UserState = {
    user: {},
    users: [{}],
};

const user_id = window.localStorage.getItem('uid');

// ==============================|| USER SLICE  ||============================== //

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loadUserInfo(state, action: PayloadAction<GetUserResponse>) {
            state.user = action.payload;
        },

        getUser(state) {
            // Do Nothing
        },
    },
});

// Actions
const userActions = userSlice.actions;

// Selectors
const userSelectUser = (state: RootState) => state.user.user;

// Reducer
const userReducer = userSlice.reducer;

export { userActions, userSelectUser };
export default userReducer;
