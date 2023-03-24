import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { faker } from '@faker-js/faker';

// Project Import
import { RootState } from '../../index';

// State
export interface ConversationState {
    direct_chat: {
        conversations: [any];
        current_conversation: any;
        current_messages: [any];
    };
    group_chat: {};
}

const initialState: ConversationState = {
    direct_chat: {
        conversations: [''],
        current_conversation: null,
        current_messages: [''],
    },
    group_chat: {},
};

const user_id = window.localStorage.getItem('uid');

// ==============================|| CONVERSATION SLICE  ||============================== //

const conversationSlice = createSlice({
    name: 'conversation',
    initialState,
    reducers: {
        fetchDirectConversations(state, action: PayloadAction<any>) {
            const list = action.payload.conversations.map((el: any) => {
                const user = el.participants.find((elm: any) => elm._id.toString() !== user_id);
                return {
                    id: el._id,
                    user_id: user._id,
                    name: `${user.firstName} ${user.lastName}`,
                    online: user.status === 'Online',
                    img: faker.image.avatar(),
                    msg: faker.music.songName(),
                    time: '9:36',
                    unread: 0,
                    pinned: false,
                };
            });

            console.log(list);
            // state.direct_chat.conversations = list;
        },
    },
});

// Actions
const conversationActions = conversationSlice.actions;

// Selectors

// Reducer
const conversationReducer = conversationSlice.reducer;

export { conversationActions };
export default conversationReducer;
