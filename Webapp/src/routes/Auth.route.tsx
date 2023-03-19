import { lazy } from 'react';
import { Loadable } from '../components';

// Project import
import AuthLayout from '../layouts/auth/AuthLayout';

// render

// ==============================|| AUTH ROUTE  ||============================== //

const AuthRoutes = {
    path: '/auth',
    element: <AuthLayout />,
    children: [
        {
            path: 'login',
            element: <div>LoginPage</div>,
        },
        {
            path: 'register',
            element: <div>Register Page</div>,
        },
        {
            path: 'reset-password',
            element: <div>Reset Password Page</div>,
        },
        {
            path: 'new-password',
            element: <div>New Password Page</div>,
        },
        {
            path: 'verify',
            element: <div>Verify Page</div>,
        },
    ],
};

export default AuthRoutes;
