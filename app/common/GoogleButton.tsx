import React from 'react'
import { signInWithGoogle } from '../service/Auth.google';
import toast from 'react-hot-toast';
import { Google } from '@mui/icons-material';

const GoogleButton = () => {
    // Google login logic
    const handleLogin = async () => {
        try {
            await signInWithGoogle();
            toast.success("Login successful!");
        } catch (error) {
            toast.error("Login failed!");
        }
    };
    return (
        <div className="flex w-full p-3 mt-3 border rounded-lg transition font-semibold gap-2 justify-center group hover:cursor-pointer" onClick={handleLogin}>
            <Google className='group-hover:animate-bounce' />
            <button >
                Signup with Google
            </button>
        </div>
    )
}

export default GoogleButton