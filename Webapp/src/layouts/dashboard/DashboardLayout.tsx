import { Outlet } from 'react-router-dom';

// Project Import
import SideBar from './SideBar';

// ==============================|| LAYOUT: DASHBOARD ||============================== //

const DashboardLayout = () => {
    return (
        <>
            <SideBar />
            <Outlet />
        </>
    );
};

export default DashboardLayout;
