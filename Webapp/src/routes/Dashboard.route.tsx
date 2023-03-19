import { lazy } from 'react';
import { Loadable } from '../components';
import { Navigate } from 'react-router-dom';

// Project import
import { DEFAULT_PATH } from '../config/config';
import DashboardLayout from '../layouts/dashboard/DashboardLayout';

// render

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
            element: <div>Gen App</div>,
        },
        {
            path: '/404',
            element: <div>Page 404</div>,
        },
        {
            path: '*',
            element: <Navigate to="/404" replace />,
        },
    ],
};

export default DashboardRoutes;
