import { Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';

// Project Import
import SideBar from './SideBar';

// ==============================|| LAYOUT: DASHBOARD ||============================== //

const DashboardLayout = () => {
    return (
        <>
            <Stack direction="row">
                <SideBar />
                <Outlet />
            </Stack>
        </>
    );
};

export default DashboardLayout;
