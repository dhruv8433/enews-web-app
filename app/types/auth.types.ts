// types.ts

export interface User {
    _id: string;
    fullname: string;
    email: string;
    role: string;
    avatar_url: string;
    status: string;
    created_at: string;
    updated_at: string;
}

export interface ApiResponse<T> {
    statusCode: number;
    data: T;
    message: string;
    success: boolean;
}

export interface SignupData {
    user: User;
}

export interface LoginData {
    user: User;
}

export interface SignupResponse extends ApiResponse<SignupData> { }

export interface LoginResponse extends ApiResponse<LoginData> { }

export interface SignupFormData {
    fullname: string;
    email: string;
    password: string;
    phone_no?: string;
    role: string;
    avatar?: File; // Changed to File type
}

export interface LoginFormData {
    email: string;
    password: string;
}
