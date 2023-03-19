import { faker } from '@faker-js/faker';
import { Avatar, Badge, Box, Stack, styled, Typography, useTheme } from '@mui/material';

// Project Import
import { Chat } from '../../model';

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
    const theme = useTheme()

    return (
        <Box
            sx={{
                width: '100%',
                borderRadius: 1,
                backgroundColor: theme.palette.mode === 'light' ? '#fff' : theme.palette.background.default,
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
                            <Avatar src={faker.image.avatar()} />
                        </StyledBadge>
                    ) : (
                        <Avatar src={faker.image.avatar()} />
                    )}
                    {/* Messages */}
                    <Stack>
                        <Typography variant="subtitle2">{item.name}</Typography>
                        <Typography variant="caption">{item.msg}</Typography>
                    </Stack>
                </Stack>
                {/* Right -- Time */}
                <Stack alignItems="center" spacing={2}>
                    <Typography sx={{ fontWeight: 600 }} variant="caption">
                        {item.time}
                    </Typography>
                    <Badge color="primary" badgeContent={item.unread} />
                </Stack>
            </Stack>
        </Box>
    );
};

export default ChatItem;
