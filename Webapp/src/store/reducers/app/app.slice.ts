import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import axios from '../../utils/axios';

// ==============================|| APP SLICE  ||============================== //

export interface AppState {
    sideBar: {
        open: boolean;
        type: 'CONTACT' | 'STARRED' | 'SHARED';
    };
    isLoggedIn: boolean;
    tab: number;
    snackbar: {
        open: boolean | null;
        severity: boolean | null;
        message: boolean | null;
    };
    users: []; // all users of app who are not friends and not requested yet
    friends: []; // all friends
    friendRequests: []; // all friend requests
    chat_type: string | null;
    room_id: boolean | null;
}

const initialState: AppState = {
    sideBar: {
        open: false,
        type: 'CONTACT',
    },
    isLoggedIn: true,
    tab: 0, // [0, 1, 2, 3]
    snackbar: {
        open: null,
        severity: null,
        message: null,
    },
    users: [], // all users of app who are not friends and not requested yet
    friends: [], // all friends
    friendRequests: [], // all friend requests
    chat_type: null,
    room_id: null,
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        // Toggle Sidebar
        toggleSideBar(state) {
            state.sideBar.open = !state.sideBar.open;
        },
        updateSideBarType(state, action: PayloadAction<any>) {
            state.sideBar.type = action.payload.type;
        },
        updateTab(state, action: PayloadAction<any>) {
            state.tab = action.payload.tab;
        },

        openSnackBar(state, action: PayloadAction<any>) {
            state.snackbar.open = true;
            state.snackbar.severity = action.payload.severity;
            state.snackbar.message = action.payload.message;
        },
        closeSnackBar(state) {
            state.snackbar.open = false;
            state.snackbar.message = null;
        },
        updateUsers(state, action: PayloadAction<any>) {
            state.users = action.payload.users;
        },
        updateFriends(state, action: PayloadAction<any>) {
            state.friends = action.payload.friends;
        },
        updateFriendRequests(state, action: PayloadAction<any>) {
            state.friendRequests = action.payload.requests;
        },
        selectConversation(state, action: PayloadAction<any>) {
            state.chat_type = 'individual';
            state.room_id = action.payload.room_id;
        },
    },
});

// Actions
const appActions = appSlice.actions;

// Selectors

// Reducer
const appReducer = appSlice.reducer;

export {
    appActions,
};
export default appReducer;
