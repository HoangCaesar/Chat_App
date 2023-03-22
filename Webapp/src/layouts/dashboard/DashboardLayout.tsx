import { Stack } from '@mui/material';
import { Navigate, Outlet } from 'react-router-dom';

// Project Import
import { useResponsive } from '../../hooks';
import { useAppSelector } from '../../hooks/sagaHooks';
import { authSelectIsLoggedIn } from '../../store/reducers/auth/auth.slice';
import SideBar from './SideBar';

// ==============================|| LAYOUT: DASHBOARD ||============================== //

const DashboardLayout = () => {
    const isLoggedIn = useAppSelector(authSelectIsLoggedIn);
    if (!isLoggedIn) {
        return <Navigate to={'/auth/signin'} />;
    }

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
