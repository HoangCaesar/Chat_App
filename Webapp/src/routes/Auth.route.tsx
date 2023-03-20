import { lazy } from 'react';
import { Loadable } from '../components';

// Project import
import AuthLayout from '../layouts/auth/AuthLayout';

// render
const SignIn = Loadable(lazy(() => import('../pages/auth/SignIn')));
const Register = Loadable(lazy(() => import('../pages/auth/Register')));

// ==============================|| AUTH ROUTE  ||============================== //

const AuthRoutes = {
    path: '/auth',
    element: <AuthLayout />,
    children: [
        {
            path: 'signin',
            element: <SignIn />,
        },
        {
            path: 'register',
            element: <Register />,
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
