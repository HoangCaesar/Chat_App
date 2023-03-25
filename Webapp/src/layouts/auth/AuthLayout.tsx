import { Container, Stack } from '@mui/material';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

// Project Import
import { Logo } from '../../components';
import isAuthenticated from '../../utils/authHandler';

// ==============================|| LAYOUT: AUTH ||============================== //

const AuthLayout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkToken = (async () => {
            const res = await isAuthenticated();
            if (res) return navigate('/app');
        })();
    }, []);

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
