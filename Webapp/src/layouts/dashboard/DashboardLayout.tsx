import { Stack } from '@mui/material';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

// Project Import
import { useResponsive } from '../../hooks';
import { connectSocket, socket } from '../../socket';
import { isAuthenticated } from '../../utils/authHandler';
import SideBar from './SideBar';

// ==============================|| LAYOUT: DASHBOARD ||============================== //

const DashboardLayout = () => {
    const navigate = useNavigate();

    const isDesktop = useResponsive('up', 'md');

    const user_id: any = localStorage.getItem('uid');

    useEffect(() => {
        const checkToken = (async () => {
            const res = await isAuthenticated();
            if (!res) return navigate('/auth/signin');
        })();
    }, []);

    // socket
    useEffect(() => {
        if (!socket) {
            connectSocket(user_id);
        }

        return () => {};
        connectSocket(user_id);
    }, []);

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
