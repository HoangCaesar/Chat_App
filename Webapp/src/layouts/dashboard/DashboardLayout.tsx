import { Outlet } from 'react-router-dom';

// ==============================|| LAYOUT: DASHBOARD ||============================== //

const DashboardLayout = () => {
    return (
        <>
            <div>Dashboard Layout</div>
            <Outlet />
        </>
    );
};

export default DashboardLayout;
