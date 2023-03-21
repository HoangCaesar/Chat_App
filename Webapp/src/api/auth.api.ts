import {
    UserLogin,
    UserRegister,
    LoginResponse,
    ResgiterResponse,
    ForgotPassword,
    ForgotPasswordResponse,
    ResetPassword,
    ResetPasswordResponse,
    VerifyOTP,
    VerifyOTPResponse,
} from '../model';
import axiosClient from './config.axios';

// ==============================|| AUTH AXIOS ||============================== //

const authApi = {
    login(data: UserLogin): Promise<LoginResponse> {
        const url = '/auth/signin';
        return axiosClient.post(url, data);
    },
    register(data: UserRegister): Promise<ResgiterResponse> {
        const url = `/auth/register`;
        return axiosClient.post(url, data);
    },
    verifyOTP(data: VerifyOTP): Promise<VerifyOTPResponse> {
        const url = `/auth/verify-otp`;
        return axiosClient.post(url, data);
    },
    forgotPassword(data: ForgotPassword): Promise<ForgotPasswordResponse> {
        const url = `/auth/forgot-password`;
        return axiosClient.post(url, data);
    },
    resetPassword(data: ResetPassword): Promise<ResetPasswordResponse> {
        const url = `/auth/reset-password`;
        return axiosClient.post(url, data);
    },
};

export default authApi;
