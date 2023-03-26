import { Box, Typography, useTheme } from '@mui/material';
import { Stack } from '@mui/system';
import { useSearchParams } from 'react-router-dom';

// Project Import
import NoChat from '../../assets/NoChat';
import { useAppSelector } from '../../hooks/sagaHooks';
import { appSelectChatType, appSelectRoomId } from '../../store/reducers/app/app.slice';
import Chats from './Chats';
import Messenger from './main-messenger';

// ==============================|| PAGE: GROUP APP  ||============================== //

const GroupApp = () => {
    const [searchParams] = useSearchParams();

    const theme = useTheme();

    const room_id = useAppSelector(appSelectRoomId);
    const chat_type = useAppSelector(appSelectChatType);

    return (
        <>
            <Stack direction="row" sx={{ width: '100%' }}>
                {/* Chat Bar */}
                <Chats />
                {/* Body */}
                <Box
                    sx={{
                        height: '100%',
                        width: '100%',
                        backgroundColor:
                            theme.palette.mode === 'light'
                                ? '#FFF'
                                : theme.palette.background.paper,
                        borderBottom:
                            searchParams.get('type') === 'individual-chat' && searchParams.get('id')
                                ? '0px'
                                : '6px solid #0162C4',
                    }}
                >
                    {chat_type === 'individual' && room_id !== null ? (
                        <Messenger />
                    ) : (
                        <Stack
                            spacing={2}
                            sx={{ height: '100%', width: '100%' }}
                            alignItems="center"
                            justifyContent="center"
                        >
                            <NoChat />
                            <Typography variant="subtitle2">
                                Select a conversation or start a call to group members.
                            </Typography>
                        </Stack>
                    )}
                </Box>
            </Stack>
        </>
    );
};

export default GroupApp;
