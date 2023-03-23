import { useEffect } from 'react';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { Stack } from '@mui/system';
import { Compass } from 'phosphor-react';
import { Link } from 'react-router-dom';

// Project Import
import { SimpleBarStyle } from '../../components/ScrollBar';
import { useAppDispatch, useAppSelector } from '../../hooks/sagaHooks';
import { appActions, appSelectServers } from '../../store/reducers/app/app.slice';
import NoChat from '../../assets/NoChat';

// ==============================|| PAGE: MAIN APP  ||============================== //

const MainApp = () => {
    const dispatch = useAppDispatch();
    const servers = useAppSelector(appSelectServers);

    const theme = useTheme();

    // state
    useEffect(() => {
        dispatch(appActions.getServerList());
    }, []);

    const setActiveItem = (id: number) => {
        dispatch(appActions.setActiveItem(id));
    };

    return (
        <>
            <Stack direction="row" sx={{ width: '100%' }}>
                {/* Server Connection Board */}
                <Box
                    sx={{
                        position: 'relative',
                        height: '100%',
                        width: 320,
                        backgroundColor:
                            theme.palette.mode === 'light'
                                ? '#F8FAFA'
                                : theme.palette.background.paper,
                        boxShadow: '0 0 2px rgba(0, 0, 0, 0.25)',
                    }}
                >
                    <Stack p={3} spacing={2} sx={{ maxHeight: '100vh' }}>
                        {/* Top 1: text + btn */}
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Typography variant="h5">Servers</Typography>
                        </Stack>
                        {/* Chat */}
                        <Stack direction="column" sx={{ flexGrow: 1, height: '100%' }}>
                            <SimpleBarStyle clickOnTrack={false}>
                                {/* Pinned Messages */}
                                <Stack spacing={2}>
                                    <Stack spacing={2.4}>
                                        <Typography variant="subtitle2" sx={{ color: '#676767' }}>
                                            All Servers
                                        </Typography>
                                    </Stack>
                                    {servers?.map((server: any, index: number) => {
                                        return (
                                            <Box
                                                sx={{
                                                    width: '100%',
                                                    borderRadius: 1,
                                                    backgroundColor:
                                                        theme.palette.mode === 'light'
                                                            ? '#fff'
                                                            : theme.palette.background.default,
                                                }}
                                                key={server.name}
                                                p={2}
                                            >
                                                <Stack
                                                    direction="row"
                                                    alignItems="center"
                                                    justifyContent="space-between"
                                                >
                                                    {/* Left */}
                                                    <Stack
                                                        direction="column"
                                                        justifyContent="center"
                                                    >
                                                        <Typography variant="h6">
                                                            {server.name}
                                                        </Typography>
                                                        <Typography
                                                            variant="caption"
                                                            color={theme.palette.primary.dark}
                                                        >
                                                            {server.members.length} member
                                                        </Typography>
                                                    </Stack>
                                                    {/* Right -- Time */}
                                                    <Link
                                                        style={{
                                                            color: theme.palette.primary.main,
                                                            textDecoration: 'none',
                                                        }}
                                                        to={`/server/${server.name}`}
                                                        onClick={() => setActiveItem(index + 1)}
                                                    >
                                                        <IconButton
                                                            sx={{
                                                                width: 'max-content',
                                                                color:
                                                                    theme.palette.mode === 'light'
                                                                        ? '#000'
                                                                        : '#fff',
                                                            }}
                                                        >
                                                            <Typography variant="caption">
                                                                Connect
                                                            </Typography>
                                                            <Compass />
                                                        </IconButton>
                                                    </Link>
                                                </Stack>
                                            </Box>
                                        );
                                    })}
                                </Stack>
                            </SimpleBarStyle>
                        </Stack>
                    </Stack>
                </Box>

                {/* No Chat/Welcome */}
                <Stack
                    spacing={2}
                    sx={{ height: '100%', maxHeight: '100vh', flexGrow: 1, width: 'auto' }}
                    alignItems="center"
                    justifyContent={'center'}
                >
                    <NoChat />
                    <Typography variant="subtitle2">
                        Select a server or start a new one by connecting buttons
                    </Typography>
                </Stack>
            </Stack>
        </>
    );
};

export default MainApp;
