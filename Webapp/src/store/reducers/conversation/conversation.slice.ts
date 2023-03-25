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
        addUserToServer(state, action: PayloadAction<any>) {
            // Do nothing
        },

        fetchDirectConversations(state, action: PayloadAction<any>) {
            const list = action.payload.conversations.map((el: any) => {
                const user = el.participants.find((elm: any) => elm._id.toString() !== user_id);
                return {
                    id: el._id,
                    user_id: user._id,
                    name: `${user.firstName} ${user.lastName}`,
                    online: user.status === 'Online',
                    img: user.avatar,
                    msg: el.messages[el.messages.length - 1].messages.text,
                    time: el.messages[el.messages.length - 1].messages.created_at,
                    unread: true,
                };
            });

            state.direct_chat.conversations = list;
        },

        fetchCurrentMessages(state, action) {
            const messages = action.payload.messages;
            const formatted_messages = messages.map((el: any) => ({
                id: el._id,
                type: 'msg',
                subtype: el.messages.type,
                message: el.messages.text,
                incoming: el.messages.to === user_id,
                outgoing: el.messages.from === user_id,
            }));
            state.direct_chat.current_messages = formatted_messages;
        },

        setCurrentConversation(state, action) {
            state.direct_chat.current_conversation = action.payload;
        },
    },
});

// Actions
const conversationActions = conversationSlice.actions;

// Selectors
const conversationSelectDirectChat = (state: RootState) => state.conversation.direct_chat;

// Reducer
const conversationReducer = conversationSlice.reducer;

export { conversationActions, conversationSelectDirectChat };
export default conversationReducer;
