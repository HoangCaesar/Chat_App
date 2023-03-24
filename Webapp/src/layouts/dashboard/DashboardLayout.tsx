import { Stack } from '@mui/material';
import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Project Import
import { useResponsive } from '../../hooks';
import { useAppSelector, useAppDispatch } from '../../hooks/sagaHooks';
import { connectSocket, socket } from '../../socket';
import { authSelectIsLoggedIn } from '../../store/reducers/auth/auth.slice';
import SideBar from './SideBar';

// ==============================|| LAYOUT: DASHBOARD ||============================== //

const DashboardLayout = () => {
    const isLoggedIn = useAppSelector(authSelectIsLoggedIn);

    const isDesktop = useResponsive('up', 'md');

    // if (!isLoggedIn) {
    //     return <Navigate to={'/auth/signin'} />;
    // }

    const user_id: any = localStorage.getItem('uid');

    // socket
    useEffect(() => {
        if (isLoggedIn) {
            window.onload = () => {
                if (!window.location.hash) {
                    window.location = (window.location ) as any;
                    window.location.reload();
                }
            };

            // To avoid error cause calling onload function without argument
            const ev: any = {};

            window.onload(ev);

            if (!socket) {
                connectSocket(user_id);
            }
        }
        connectSocket(user_id);
    }, [isLoggedIn]);

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
