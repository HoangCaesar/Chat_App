import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { Box, Fab, IconButton, Stack, TextField, Tooltip } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import {
    Camera,
    File,
    Image,
    LinkSimple,
    PaperPlaneTilt,
    Smiley,
    Sticker,
    User
} from 'phosphor-react';
import { useRef, useState } from 'react';

// Project Import
import { useResponsive } from '../../../hooks';
import { useAppSelector } from '../../../hooks/sagaHooks';
import { socket } from '../../../socket';
import { appSelectRoomId } from '../../../store/reducers/app/app.slice';
import { conversationSelectDirectChat } from '../../../store/reducers/conversation/conversation.slice';

// Style
const StyledInput = styled(TextField)(({ theme }) => ({
    '& .MuiInputBase-input': {
        paddingTop: '12px !important',
        paddingBottom: '12px !important',
    },
}));

// ==============================|| MESSENGER: FOOTER ||============================== //

const Actions = [
    {
        color: '#4da5fe',
        icon: <Image size={24} />,
        y: 102,
        title: 'Photo/Video',
    },
    {
        color: '#1b8cfe',
        icon: <Sticker size={24} />,
        y: 172,
        title: 'Stickers',
    },
    {
        color: '#0172e4',
        icon: <Camera size={24} />,
        y: 242,
        title: 'Image',
    },
    {
        color: '#0159b2',
        icon: <File size={24} />,
        y: 312,
        title: 'Document',
    },
    {
        color: '#013f7f',
        icon: <User size={24} />,
        y: 382,
        title: 'Contact',
    },
];

const ChatInput = ({ openPicker, setOpenPicker, setValue, value, inputRef }: any) => {
    const [openActions, setOpenActions] = useState(false);

    return (
        <StyledInput
            inputRef={inputRef}
            value={value}
            onChange={(event) => {
                setValue(event.target.value);
            }}
            fullWidth
            placeholder="Write a message..."
            variant="filled"
            InputProps={{
                disableUnderline: true,
                startAdornment: (
                    <Stack sx={{ width: 'max-content' }}>
                        <Stack
                            sx={{
                                position: 'relative',
                                display: openActions ? 'inline-block' : 'none',
                            }}
                        >
                            {Actions.map((el) => (
                                <Tooltip key={el.title} placement="right" title={el.title}>
                                    <Fab
                                        onClick={() => {
                                            setOpenActions(!openActions);
                                        }}
                                        sx={{
                                            position: 'absolute',
                                            top: -el.y,
                                            backgroundColor: el.color,
                                        }}
                                        aria-label="add"
                                    >
                                        {el.icon}
                                    </Fab>
                                </Tooltip>
                            ))}
                        </Stack>

                        <IconButton
                            onClick={() => {
                                setOpenActions(!openActions);
                            }}
                        >
                            <LinkSimple />
                        </IconButton>
                    </Stack>
                ),
                endAdornment: (
                    <Stack sx={{ position: 'relative' }}>
                        <IconButton
                            onClick={() => {
                                setOpenPicker(!openPicker);
                            }}
                        >
                            <Smiley />
                        </IconButton>
                    </Stack>
                ),
            }}
        />
    );
};

function linkify(text: string) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, (url) => `<a href="${url}" target="_blank">${url}</a>`);
}

function containsUrl(text: string) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return urlRegex.test(text);
}

const Footer = () => {
    const theme = useTheme();

    const { current_conversation } = useAppSelector(conversationSelectDirectChat);

    const user_id = localStorage.getItem('uid');

    const isMobile = useResponsive('between', 'md', 'xs', 'sm');

    const room_id = useAppSelector(appSelectRoomId);

    const [openPicker, setOpenPicker] = useState(false);

    const [value, setValue] = useState('');
    const inputRef = useRef<any>(null);

    function handleEmojiClick(emoji: any) {
        const input = inputRef.current;

        if (input) {
            const selectionStart = input.selectionStart;
            const selectionEnd = input.selectionEnd;

            setValue(value.substring(0, selectionStart) + emoji + value.substring(selectionEnd));

            // Move the cursor to the end of the inserted emoji
            input.selectionStart = input.selectionEnd = selectionStart + 1;
        }
    }

    return (
        <Box
            sx={{
                position: 'relative',
                backgroundColor: 'transparent !important',
            }}
        >
            <Box
                p={2}
                width={'100%'}
                sx={{
                    backgroundColor:
                        theme.palette.mode === 'light'
                            ? '#F8FAFF'
                            : theme.palette.background.default,
                    boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)',
                }}
            >
                <Stack direction="row" alignItems={'center'} spacing={isMobile ? 1 : 3}>
                    <Stack sx={{ width: '100%' }}>
                        <Box
                            style={{
                                zIndex: 10,
                                position: 'fixed',
                                display: openPicker ? 'inline' : 'none',
                                bottom: 81,
                                right: 420,
                            }}
                        >
                            <Picker
                                theme={theme.palette.mode}
                                data={data}
                                onEmojiSelect={(emoji: any) => {
                                    handleEmojiClick(emoji.native);
                                }}
                            />
                        </Box>
                        {/* Chat Input */}
                        <ChatInput
                            inputRef={inputRef}
                            value={value}
                            setValue={setValue}
                            openPicker={openPicker}
                            setOpenPicker={setOpenPicker}
                        />
                    </Stack>
                    <Box
                        sx={{
                            height: 48,
                            width: 48,
                            backgroundColor: theme.palette.primary.main,
                            borderRadius: 1.5,
                        }}
                    >
                        <Stack
                            sx={{ height: '100%' }}
                            alignItems={'center'}
                            justifyContent="center"
                        >
                            <IconButton
                                onClick={() => {
                                    socket.emit('text_message', {
                                        message: linkify(value),
                                        conversation_id: room_id,
                                        from: user_id,
                                        to: current_conversation.user_id,
                                        type: 'msg',
                                        subType: containsUrl(value) ? 'link' : 'text',
                                    });
                                    setValue('');
                                }}
                            >
                                <PaperPlaneTilt color="#ffffff" />
                            </IconButton>
                        </Stack>
                    </Box>
                </Stack>
            </Box>
        </Box>
    );
};

export default Footer;
