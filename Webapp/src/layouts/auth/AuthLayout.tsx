import { Container, Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';

// Project Import
import { Logo } from '../../components';

// ==============================|| LAYOUT: AUTH ||============================== //

const AuthLayout = () => {
    return (
        <>
            <Container sx={{ mt: 5 }} maxWidth="sm">
                <Stack spacing={5}>
                    <Stack sx={{ width: '100%' }} direction="column" alignItems={'center'}>
                        <Logo />
                    </Stack>
                    <Outlet />
                </Stack>
            </Container>
        </>
    );
};

export default AuthLayout;
