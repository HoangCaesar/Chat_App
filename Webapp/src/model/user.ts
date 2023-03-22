// Request Models
export interface UserLogin {
    email: String;
    password: String;
    location?: string;
}

export interface UserRegister {
    firstName: String;
    lastName: String;
    email: String;
    password: String;
}

export interface VerifyOTP {
    email: String;
    otp: String;
}

export interface ForgotPassword {
    email: String;
}

export interface ResetPassword {
    token: String;
    passwordConfirm: String;
}

// Response Models
export interface LoginResponse {
    isLoggedIn?: boolean;
    status: string;
    message: string;
    token: string;
    user_id: string;
    location?: string;
}

export interface ResgiterResponse {
    status: string;
    message: string;
}

export interface VerifyOTPResponse {
    status: string;
    message: string;
    token: string;
    user_id: string;
}

export interface ForgotPasswordResponse {
    status: string;
    message: string;
}

export interface ResetPasswordResponse {
    status: string;
    message: string;
    token: String;
}
