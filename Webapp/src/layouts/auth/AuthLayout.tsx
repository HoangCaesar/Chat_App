import { Container, Stack } from '@mui/material';
import { Navigate, Outlet } from 'react-router-dom';

// Project Import
import { Logo } from '../../components';
import { useAppSelector } from '../../hooks/sagaHooks';
import { authSelectIsLoggedIn } from '../../store/reducers/auth/auth.slice';

// ==============================|| LAYOUT: AUTH ||============================== //

const AuthLayout = () => {
    const isLoggedIn = useAppSelector(authSelectIsLoggedIn);
    // if (isLoggedIn) {
    //     return <Navigate to={"/app"} />;
    // }
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
