// src/services/authService.ts
import { LoginFormData, RegisterFormData } from '@/utils/schemas';
import { endpoints } from '../utils/endpoints';

const token = localStorage.getItem('token');
export const loginUser = async (data: LoginFormData): Promise<any> => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}${endpoints.login}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Login failed');
    }

    return res.json();
};

export const registerUser = async (data: RegisterFormData): Promise<any> => {
    const url: string = `${import.meta.env.VITE_BACKEND_URL}${endpoints.register}`;
    // console.log('URL', url);
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Login failed');
    }

    return res.json();
};
