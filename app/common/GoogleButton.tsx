import React from 'react'
import { signInWithGoogle } from '../service/Auth.google';
import toast from 'react-hot-toast';
import { Google } from '@mui/icons-material';
import notifications from '../constants/notifications';

const GoogleButton = ({ CloseModel }: { CloseModel: (close: boolean) => void }) => {
    // Google login logic
    const handleLogin = async () => {
        try {
            await signInWithGoogle();
            toast.success(notifications.success.loginSuccess.description);
            CloseModel(false);
        } catch (error) {
            toast.error(notifications.error.loginFailed.description);
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