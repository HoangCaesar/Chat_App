import { Outlet } from 'react-router-dom';

// ==============================|| LAYOUT: AUTH ||============================== //

const AuthLayout = () => {
    return (
        <>
            <div>Auth Layout</div>
            <Outlet />
        </>
    );
};

export default AuthLayout;
