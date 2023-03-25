import { Box, Stack, useTheme } from '@mui/material';
import { useEffect } from 'react';

// Project Import
import { Chat_History } from '../../../data/chat_data';
import { Timeline, DocMsg, LinkMsg, MediaMsg, ReplyMsg, TextMsg } from '../../../sections';
import { useAppDispatch, useAppSelector } from '../../../hooks/sagaHooks';
import { conversationSelectDirectChat } from '../../../store/reducers/conversation/conversation.slice';
import { appSelectRoomId } from '../../../store/reducers/app/app.slice';
import { conversationActions } from '../../../store/reducers/conversation/conversation.slice';
import { socket } from '../../../socket';

// ==============================|| MESSENGER: BODY ||============================== //

const Body = ({ isMobile, menu }: any) => {
    const dispatch = useAppDispatch();

    const { conversations, current_messages, current_conversation } = useAppSelector(conversationSelectDirectChat);
    const room_id = useAppSelector(appSelectRoomId);

    useEffect(() => {
        const current = conversations.find((el) => el.id === room_id);

        socket.emit('get_messages', { conversation_id: current.id }, (data: any) => {
            // data => array/list of messages
            dispatch(conversationActions.fetchCurrentMessages({ messages: data }));
        });
        dispatch(conversationActions.setCurrentConversation(current));
    }, []);
    return (
        <Box p={isMobile ? 1 : 3}>
            <Stack spacing={1}>
                {current_messages.map((item) => {
                    switch (item.type) {
                        case 'divider':
                            return (
                                // Timeline
                                <Timeline key={item.id} el={item} />
                            );

                        case 'msg':
                            switch (item.subtype) {
                                case 'img':
                                    return (
                                        // Media Message
                                        <MediaMsg key={item.id} el={item} menu={menu} />
                                    );

                                case 'doc':
                                    return (
                                        // Doc Message
                                        <DocMsg key={item.id} el={item} menu={menu} />
                                    );
                                case 'Link':
                                    return (
                                        //  Link Message
                                        <LinkMsg key={item.id} el={item} menu={menu} />
                                    );

                                case 'reply':
                                    return (
                                        //  ReplyMessage
                                        <ReplyMsg key={item.id} el={item} menu={menu} />
                                    );

                                default:
                                    return (
                                        // Text Message
                                        <TextMsg key={item.id} el={item} menu={menu} />
                                    );
                            }
                    }
                })}
            </Stack>
        </Box>
    );
};

export default Body;
