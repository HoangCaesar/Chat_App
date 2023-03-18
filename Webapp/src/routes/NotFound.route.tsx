import { lazy } from 'react';
import { Loadable } from '../components';
import { Navigate } from 'react-router-dom';

// Project import

// render

// ==============================|| NOTFOUND ROUTE  ||============================== //

const NotFoundRoutes = { path: '*', element: <Navigate to="/404" replace /> };

export default NotFoundRoutes;
