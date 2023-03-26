import { alpha, Avatar, Badge, Box, Stack, styled, Typography, useTheme } from '@mui/material';
import React from 'react';

// Project Import
import { useAppDispatch, useAppSelector } from '../../hooks/sagaHooks';
import { Chat } from '../../model';
import { appActions, appSelectRoomId } from '../../store/reducers/app/app.slice';
import { conversationActions } from '../../store/reducers/conversation/conversation.slice';
import { cutMessageString, cutTimeString } from '../../utils/cutString';

// Style
const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

// ==============================|| COMPONENT: CHAT ITEM ||============================== //

const ChatItem = ({ ...item }: Chat) => {
    const dispatch = useAppDispatch();
    const room_id = useAppSelector(appSelectRoomId);
    const selectedChatId: any = room_id?.toString();

    let isSelected = selectedChatId === item.id;

    if (!selectedChatId) {
        isSelected = false;
    }
    const theme = useTheme();
    return (
        <Box
            onClick={() => {
                dispatch(appActions.selectConversation({ room_id: item.id }));
                dispatch(conversationActions.updateDirectConversation({ conversation: item }));
            }}
            sx={{
                width: '100%',
                borderRadius: 1,
                backgroundColor: isSelected
                    ? theme.palette.mode === 'light'
                        ? alpha(theme.palette.primary.main, 0.5)
                        : theme.palette.primary.main
                    : theme.palette.mode === 'light'
                    ? '#fff'
                    : theme.palette.background.paper,
                '&:hover': {
                    cursor: 'pointer',
                },
            }}
            p={2}
        >
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                {/* Left */}
                <Stack direction="row" spacing={2}>
                    {/* Avatar */}
                    {item.online ? (
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                        >
                            <Avatar src={item.img} />
                        </StyledBadge>
                    ) : (
                        <Avatar src={item.img} />
                    )}
                    {/* Messages */}
                    <Stack>
                        <Typography variant="subtitle2" color={item.unread ? 'blue' : 'black'}>
                            {item.name}
                        </Typography>
                        <Typography variant="caption" color={item.unread ? 'blue' : 'gray'}>
                            {cutMessageString(item.msg)}
                        </Typography>
                    </Stack>
                </Stack>
                {/* Right -- Time */}
                <Stack alignItems="center" spacing={2}>
                    <Typography
                        sx={{ fontWeight: 600 }}
                        variant="caption"
                        color={item.unread ? 'black' : 'gray'}
                    >
                        {cutTimeString(item.time)}
                    </Typography>
                    <Badge color="primary" variant="dot" badgeContent={item.unread ? 1 : 0}>
                        <React.Fragment></React.Fragment>
                    </Badge>
                </Stack>
            </Stack>
        </Box>
    );
};

export default ChatItem;
