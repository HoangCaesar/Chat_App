import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// MUI
import { Box, Divider, IconButton, styled, Switch, Tooltip, useTheme } from '@mui/material';
import { Stack } from '@mui/system';
import { Cloud } from 'phosphor-react';

// Project Import
import { Logo } from '../../components';
import { Nav_Buttons } from '../../data/chat_data';
import { useSettings } from '../../hooks';
import ProfileMenu from './ProfileMenu';
import { useAppDispatch, useAppSelector } from '../../hooks/sagaHooks';
import { appActions, appSelectServers } from '../../store/reducers/app/app.slice';
import setSideNavData from '../../utils/setSideNavData';

// Style
const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 40,
    height: 20,
    padding: 0,
    display: 'flex',
    '&:active': {
        '& .MuiSwitch-thumb': {
            width: 15,
        },
        '& .MuiSwitch-switchBase.Mui-checked': {
            transform: 'translateX(9px)',
        },
    },
    '& .MuiSwitch-switchBase': {
        padding: 2,
        '&.Mui-checked': {
            transform: 'translateX(20px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
        width: 16,
        height: 16,
        borderRadius: 8,
        transition: theme.transitions.create(['width'], {
            duration: 200,
        }),
    },
    '& .MuiSwitch-track': {
        borderRadius: 20 / 2,
        opacity: 1,
        backgroundColor:
            theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
        boxSizing: 'border-box',
    },
}));

// Data

// ==============================|| DASHBOARD LAYOUT: SIDE BAR ||============================== //
const SideBar = () => {
    const dispatch = useAppDispatch();
    const servers = useAppSelector(appSelectServers);

    const theme: any = useTheme();
    const navigate = useNavigate();

    const data = servers ? setSideNavData(servers) : [];

    const [activeItem, setActiveItem] = useState<number>(0);

    // state
    useEffect(() => {
        dispatch(appActions.getServerList());
    }, []);

    const { onToggleMode } = useSettings();
    return (
        <Box
            p={2}
            sx={{
                height: '100vh',
                width: 100,

                backgroundColor:
                    theme.palette.mode === 'light' ? '#F0F4FA' : theme.palette.background.paper,
                boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)',
            }}
        >
            <Stack
                direction="column"
                alignItems="center"
                justifyContent="space-between"
                spacing={3}
                sx={{ height: '100%', width: '100%' }}
            >
                {/* Btns */}
                <Stack alignItems="center" spacing={4}>
                    {/* Logo */}
                    <Box
                        p={1}
                        sx={{
                            height: 44,
                            width: 68,
                            backgroundColor: theme.palette.background.paper,
                            boxShadow: '0 0 2px rgba(0, 0, 0, 0.25)',
                            borderRadius: 1.5,
                        }}
                    >
                        <Logo />
                    </Box>

                    {/* Icon Btns */}
                    <Stack
                        direction="column"
                        alignItems="center"
                        spacing={3}
                        sx={{ width: 'max-content' }}
                    >
                        {/* Icon list */}
                        {data.map((item: any, index: number) => {
                            return index === activeItem ? (
                                <Box
                                    key={item.color}
                                    sx={{
                                        backgroundColor: theme.palette.primary.main,
                                        borderRadius: 1.5,
                                    }}
                                >
                                    <Tooltip placement="right" title={item.title}>
                                        <IconButton
                                            sx={{ width: 'max-content', color: '#fff' }}
                                            onClick={() => setActiveItem(index)}
                                        >
                                            {<Cloud color={item.color} />}
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            ) : (
                                <Tooltip key={item.color} placement="right" title={item.title}>
                                    <IconButton
                                        sx={{
                                            width: 'max-content',
                                            color:
                                                theme.palette.mode === 'light'
                                                    ? '#000'
                                                    : theme.palette.text.primary,
                                        }}
                                        onClick={() => setActiveItem(index)}
                                    >
                                        {<Cloud color={item.color} />}
                                    </IconButton>
                                </Tooltip>
                            );
                        })}

                        <Divider sx={{ width: '100%' }} />
                    </Stack>
                </Stack>

                {/* Switch */}
                <Stack spacing={4}>
                    <AntSwitch
                        defaultChecked
                        size="small"
                        onChange={() => {
                            onToggleMode();
                        }}
                    />
                    {/* <ProfileMenu /> */}
                </Stack>
            </Stack>
        </Box>
    );
};

export default SideBar;
