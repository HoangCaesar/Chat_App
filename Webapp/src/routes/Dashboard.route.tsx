import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { Loadable } from '../components';

// Project import
import { DEFAULT_PATH } from '../config/config';
import DashboardLayout from '../layouts/dashboard/DashboardLayout';

// render
const Dashboard = Loadable(lazy(() => import('../pages/app/MainApp')));
const GroupApp = Loadable(lazy(() => import('../pages/app/GroupApp')));
const Page404 = Loadable(lazy(() => import('../pages/404/Page404')));
const Settings = Loadable(lazy(() => import('../pages/settings/Settings')));

// ==============================|| DASHBOARD ROUTE  ||============================== //

const DashboardRoutes = {
    path: '/',
    element: <DashboardLayout />,
    children: [
        {
            element: <Navigate to={DEFAULT_PATH} replace />,
            index: true,
        },
        {
            path: '/app',
            element: <Dashboard />,
        },
        {
            path: '/server/:serverID',
            element: <GroupApp />,
        },
        {
            path: '/settings',
            element: <Settings />,
        },
        {
            path: '/404',
            element: <Page404 />,
        },
        {
            path: '*',
            element: <Navigate to="/404" replace />,
        },
    ],
};

export default DashboardRoutes;
