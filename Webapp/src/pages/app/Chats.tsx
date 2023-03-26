import { Box, Button, Divider, IconButton, Stack, Typography, useTheme } from '@mui/material';
import { ArchiveBox, CircleDashed, MagnifyingGlass } from 'phosphor-react';
import { useEffect } from 'react';

// Project Import
import { ChatItem, Search, SearchIconWrapper, SearchInputBase } from '../../components';
import { SimpleBarStyle } from '../../components/ScrollBar';
import { useResponsive } from '../../hooks';
import { useAppDispatch, useAppSelector } from '../../hooks/sagaHooks';
import { socket } from '../../socket';
import {
    conversationActions,
    conversationSelectDirectChat,
} from '../../store/reducers/conversation/conversation.slice';

// model

// ==============================|| APP: CHATS  ||============================== //

const Chats = () => {
    const dispatch = useAppDispatch();

    const theme = useTheme();
    const isDesktop = useResponsive('up', 'md');

    const user_id = window.localStorage.getItem('uid');

    const { conversations } = useAppSelector(conversationSelectDirectChat);

    useEffect(() => {
        socket.emit('get_direct_conversations', { user_id }, (data: any) => {
            dispatch(conversationActions.fetchDirectConversations({ conversations: data }));
        });
    }, []);

    return (
        <Box
            sx={{
                position: 'relative',
                height: '100%',
                width: isDesktop ? 420 : '100vw',
                backgroundColor:
                    theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background.default,

                boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)',
            }}
        >
            <Stack p={3} spacing={2} sx={{ maxHeight: '100vh', height: '100%' }}>
                {/* Top 1: text + btn */}
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="h5">Chats</Typography>
                    <IconButton>
                        <CircleDashed size={32} />
                    </IconButton>
                </Stack>
                {/* Top 2: search input */}
                <Stack sx={{ width: '100%' }}>
                    <Search>
                        <SearchIconWrapper>
                            <MagnifyingGlass color="#709CE6" />
                        </SearchIconWrapper>
                        <SearchInputBase placeholder="Search Messenger" />
                    </Search>
                </Stack>
                {/* Archive */}
                <Stack spacing={1}>
                    <Stack direction={'row'} spacing={1.5} alignItems="center">
                        <ArchiveBox size={24} />
                        <Button variant="text">Archive</Button>
                    </Stack>
                    <Divider />
                </Stack>
                {/* Chat */}
                <Stack direction="column" sx={{ flexGrow: 1, height: '100%' }}>
                    <SimpleBarStyle clickOnTrack={false}>
                        {/* Pinned Messages */}
                        <Stack spacing={2}>
                            {/* All Messages */}
                            <Stack spacing={2.4}>
                                <Typography variant="subtitle2" sx={{ color: '#676767' }}>
                                    All Chats
                                </Typography>
                            </Stack>
                            {conversations.length ? (
                                conversations.map((item, idx) => {
                                    return <ChatItem key={idx} {...item} />;
                                })
                            ) : (
                                <Typography variant="caption">
                                    Please, reload the server if you don't see any chat.
                                </Typography>
                            )}
                        </Stack>
                    </SimpleBarStyle>
                </Stack>
            </Stack>
        </Box>
    );
};

export default Chats;
