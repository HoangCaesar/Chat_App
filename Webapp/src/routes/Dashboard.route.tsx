import { lazy } from 'react';
import { Loadable } from '../components';
import { Navigate } from 'react-router-dom';

// Project import
import { DEFAULT_PATH } from '../config/config';
import DashboardLayout from '../layouts/dashboard/DashboardLayout';

// render
const Dashboard = Loadable(lazy(() => import('../pages/app/App')));
const Page404 = Loadable(lazy(() => import('../pages/404/Page404')));

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
