import { lazy } from 'react';
import { Loadable } from '../components';

// Project import
import AuthLayout from '../layouts/auth/AuthLayout';

// render
const SignIn = Loadable(lazy(() => import('../pages/auth/SignIn')));
const Register = Loadable(lazy(() => import('../pages/auth/Register')));
const ResetPassword = Loadable(lazy(() => import('../pages/auth/ResetPassword')));
const NewPassword = Loadable(lazy(() => import('../pages/auth/NewPassword')));
const Verify = Loadable(lazy(() => import('../pages/auth/Verify')));

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
            element: <ResetPassword />,
        },
        {
            path: 'new-password',
            element: <NewPassword />,
        },
        {
            path: 'verify',
            element: <Verify />,
        },
    ],
};

export default AuthRoutes;
