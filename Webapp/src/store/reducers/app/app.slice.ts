import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../index';

// import axios from '../../utils/axios';

// ==============================|| APP SLICE  ||============================== //

export interface AppState {
    sideBar: {
        open: boolean;
        type: 'CONTACT' | 'STARRED' | 'SHARED';
    };
    activeItem: number;
    isLoggedIn: boolean;
    tab: number;
    snackbar: {
        open: boolean | null;
        severity: string | null;
        message: string | null;
    };
    users: []; // all users of app who are not friends and not requested yet
    servers: []; // all friends
    chat_type: string | null;
    room_id: boolean | null;
}

const initialState: AppState = {
    sideBar: {
        open: false,
        type: 'CONTACT',
    },
    activeItem: 0,
    isLoggedIn: true,
    tab: 0, // [0, 1, 2, 3]
    snackbar: {
        open: null,
        severity: null,
        message: null,
    },
    users: [],
    servers: [], // all servers
    chat_type: null,
    room_id: null,
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        // http requests
        getServerList(state) {
            // Do Nothing
        },
        setServerList(state, action: PayloadAction<any>) {
            state.servers = action.payload.servers;
        },

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

        setActiveItem(state, action: PayloadAction<number>) {
            state.activeItem = action.payload;
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
        selectConversation(state, action: PayloadAction<any>) {
            state.chat_type = 'individual';
            state.room_id = action.payload.room_id;
        },
    },
});

// Actions
const appActions = appSlice.actions;

// Selectors
const appSelectSnackbar = (state: RootState) => state.app.snackbar;
const appSelectServers = (state: RootState) => state.app.servers;
const appSelectActiveItem = (state: RootState) => state.app.activeItem;
const appSelectRoomId = (state: RootState) => state.app.room_id;
const appSelectChatType = (state: RootState) => state.app.chat_type;

// Reducer
const appReducer = appSlice.reducer;

export {
    appActions,
    appSelectSnackbar,
    appSelectServers,
    appSelectActiveItem,
    appSelectRoomId,
    appSelectChatType,
};
export default appReducer;
