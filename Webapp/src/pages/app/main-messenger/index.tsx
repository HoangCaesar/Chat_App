import { useEffect, useRef } from 'react';
import { Box, Stack, useTheme } from '@mui/material';

// Project Import
import Body from './Body';
import Footer from './Footer';
import Header from './Header';
// hooks
import { useResponsive } from '../../../hooks';
import { useAppDispatch, useAppSelector } from '../../../hooks/sagaHooks';
import { conversationSelectDirectChat } from '../../../store/reducers/conversation/conversation.slice';

// ==============================|| MAIN APP: MAIN MESSENGER  ||============================== //

const Messenger = () => {
    const isMobile = useResponsive('between', 'md', 'xs', 'sm');
    const theme = useTheme();

    const messageListRef = useRef<any>(null);

    const { current_messages } = useAppSelector(conversationSelectDirectChat);

    useEffect(() => {
        // Scroll to the bottom of the message list when new messages are added
        messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }, [current_messages]);

    return (
        <Stack height={'100%'} maxHeight={'100vh'} width={isMobile ? '100vw' : '100%'}>
            {/* Header */}
            <Header />

            <Box
                ref={messageListRef}
                width={'100%'}
                sx={{
                    position: 'relative',
                    flexGrow: 1,
                    overflowY: 'scroll',

                    backgroundColor:
                        theme.palette.mode === 'light'
                            ? '#F0F4FA'
                            : theme.palette.background.default,

                    boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)',
                }}
            >
                {/* Body */}
                <Body isMobile={isMobile} menu={true} />
            </Box>

            {/* Footer */}
            {/* <Footer /> */}
        </Stack>
    );
};

export default Messenger;
