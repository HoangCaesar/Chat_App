import { faker } from '@faker-js/faker';
import {
    Avatar,
    Badge,
    Box,
    Divider,
    Fade,
    IconButton,
    Menu,
    MenuItem,
    Stack,
    styled,
    Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { CaretDown, MagnifyingGlass, Phone, VideoCamera } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../hooks/sagaHooks';
import { appSelectRoomId } from '../../../store/reducers/app/app.slice';
import { conversationSelectDirectChat } from '../../../store/reducers/conversation/conversation.slice';

// style
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

const Conversation_Menu = [
    {
        title: 'Contact info',
    },
    {
        title: 'Mute notifications',
    },
    {
        title: 'Clear messages',
    },
    {
        title: 'Delete chat',
    },
];

const Header = () => {
    const theme = useTheme();

    const room_id = useAppSelector(appSelectRoomId);
    const { conversations } = useAppSelector(conversationSelectDirectChat);

    const [conversationMenuAnchorEl, setConversationMenuAnchorEl] = useState(null);
    const [chatter, setChatter] = useState<any>();

    const openConversationMenu = Boolean(conversationMenuAnchorEl);
    const handleClickConversationMenu = (event: any) => {
        setConversationMenuAnchorEl(event.currentTarget);
    };
    const handleCloseConversationMenu = () => {
        setConversationMenuAnchorEl(null);
    };

    useEffect(() => {
        const conversation = conversations.find((conversation) => conversation.id === room_id);
        setChatter(conversation);
    }, [room_id]);

    return (
        <Box
            p={2}
            width={'100%'}
            sx={{
                backgroundColor:
                    theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background.default,
                boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)',
            }}
        >
            <Stack
                alignItems={'center'}
                direction={'row'}
                sx={{ width: '100%', height: '100%' }}
                justifyContent="space-between"
            >
                <Stack spacing={2} direction="row">
                    <Box>
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            variant={chatter?.online ? 'dot' : undefined}
                        >
                            <Avatar alt={chatter?.name} src={chatter?.img} />
                        </StyledBadge>
                    </Box>
                    <Stack spacing={0.2}>
                        <Typography variant="subtitle2">{chatter?.name}</Typography>
                        <Typography
                            variant="caption"
                            color={chatter?.online ? 'secondary' : 'grey'}
                        >
                            {chatter?.online ? 'online' : 'offline'}
                        </Typography>
                    </Stack>
                </Stack>
                <Stack direction={'row'} alignItems="center" spacing={3}>
                    <IconButton>
                        <VideoCamera />
                    </IconButton>
                    <IconButton>
                        <Phone />
                    </IconButton>

                    <IconButton>
                        <MagnifyingGlass />
                    </IconButton>

                    <Divider orientation="vertical" flexItem />
                    <IconButton
                        id="conversation-positioned-button"
                        aria-controls={
                            openConversationMenu ? 'conversation-positioned-menu' : undefined
                        }
                        aria-haspopup="true"
                        aria-expanded={openConversationMenu ? 'true' : undefined}
                        onClick={handleClickConversationMenu}
                    >
                        <CaretDown />
                    </IconButton>
                    <Menu
                        MenuListProps={{
                            'aria-labelledby': 'fade-button',
                        }}
                        TransitionComponent={Fade}
                        id="conversation-positioned-menu"
                        aria-labelledby="conversation-positioned-button"
                        anchorEl={conversationMenuAnchorEl}
                        open={openConversationMenu}
                        onClose={handleCloseConversationMenu}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <Box p={1}>
                            <Stack spacing={1}>
                                {Conversation_Menu.map((item, index) => (
                                    <MenuItem key={index} onClick={handleCloseConversationMenu}>
                                        <Stack
                                            sx={{ minWidth: 100 }}
                                            direction="row"
                                            alignItems={'center'}
                                            justifyContent="space-between"
                                        >
                                            <span>{item.title}</span>
                                        </Stack>{' '}
                                    </MenuItem>
                                ))}
                            </Stack>
                        </Box>
                    </Menu>
                </Stack>
            </Stack>
        </Box>
    );
};

export default Header;
