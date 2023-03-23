import { Stack } from '@mui/material';
import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Project Import
import { useResponsive } from '../../hooks';
import { useAppSelector } from '../../hooks/sagaHooks';
import { connectSocket, socket } from '../../socket';
import { authSelectIsLoggedIn } from '../../store/reducers/auth/auth.slice';
import SideBar from './SideBar';

// ==============================|| LAYOUT: DASHBOARD ||============================== //

const DashboardLayout = () => {
    const isLoggedIn = useAppSelector(authSelectIsLoggedIn);
    if (!isLoggedIn) {
        return <Navigate to={'/auth/signin'} />;
    }

    const user_id: any = localStorage.getItem('uid');

    useEffect(() => {
        connectSocket(user_id);
    }, []);

    const isDesktop = useResponsive('up', 'md');
    return (
        <>
            <Stack direction="row">
                {isDesktop && <SideBar />}
                <Outlet />
            </Stack>
        </>
    );
};

export default DashboardLayout;
