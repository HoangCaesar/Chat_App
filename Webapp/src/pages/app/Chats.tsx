import { Box, Button, Divider, IconButton, Stack, Typography, useTheme } from '@mui/material';
import { ArchiveBox, CircleDashed, MagnifyingGlass } from 'phosphor-react';

// Project Import
import { ChatItem, Search, SearchIconWrapper, SearchInputBase } from '../../components';
import { SimpleBarStyle } from '../../components/ScrollBar';
import { ChatList } from '../../data/chat_data';
// model
import { Chat } from '../../model';

// ==============================|| APP: CHATS  ||============================== //

const Chats = () => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                position: 'relative',
                height: '100%',
                width: 320,
                backgroundColor:
                    theme.palette.mode === 'light' ? '#F8FAFA' : theme.palette.background.paper,
                boxShadow: '0 0 2px rgba(0, 0, 0, 0.25)',
            }}
        >
            <Stack p={3} spacing={2} sx={{ maxHeight: '100vh' }}>
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
                <Stack direction="column" sx={{ flexGrow: 1, overflow: 'scroll', height: '100%' }}>
                    <SimpleBarStyle clickOnTrack={false}>
                        {/* Pinned Messages */}
                        <Stack spacing={2}>
                            <Typography variant="subtitle2" sx={{ color: '#676767' }}>
                                Pinned
                            </Typography>
                            {ChatList.filter((item: Chat) => item.pinned).map((item, idx) => {
                                return <ChatItem {...item} />;
                            })}
                            {/* All Messages */}
                            <Stack spacing={2.4}>
                                <Typography variant="subtitle2" sx={{ color: '#676767' }}>
                                    All Chats
                                </Typography>
                            </Stack>
                            {ChatList.filter((item: Chat) => !item.pinned).map((item, idx) => {
                                return <ChatItem {...item} />;
                            })}
                        </Stack>
                    </SimpleBarStyle>
                </Stack>
            </Stack>
        </Box>
    );
};

export default Chats;