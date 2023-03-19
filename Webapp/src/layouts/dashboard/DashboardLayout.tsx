import { Box, useTheme } from '@mui/material';
import { Stack } from '@mui/system';
import { Outlet } from 'react-router-dom';

// Project Import
import { Logo } from '../../components';

// ==============================|| LAYOUT: DASHBOARD ||============================== //

const DashboardLayout = () => {
    const theme: any = useTheme();
    console.log(theme);

    return (
        <>
            <Box
                p={2}
                sx={{
                    height: '100vh',
                    width: '100px',
                    backgroundColor: theme.palette.background.paper,
                    boxShadow: '0 0 2px rgba(0, 0, 0, 0.25)',
                }}
            >
                <Stack direction="column" alignItems="center" sx={{ width: '100%' }}>
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
                </Stack>
            </Box>
            <Outlet />
        </>
    );
};

export default DashboardLayout;
