// Project import
import authApi from '../api/auth.api';

// ==============================|| AUTH HANDLER UTILS ||============================== //
export const isAuthenticated = async () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
        const res = await authApi.checkToken();
        if(res.status === 500) {
            return false
        }
        return true;
    } catch (err) {
        return false;
    }
};

export default isAuthenticated;
