'use client';

import { useAuth } from '@/app/hooks/useAuth';
import { User } from '@/app/types/auth.types';
import React, { useState } from 'react';

interface EditProfileModalProps {
    user: {
        fullname: string;
        email: string;
        avatar_url: string;
    };
    onClose: () => void;
    onSave: (updatedData: User) => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ user, onClose, onSave}) => {
    const [fullname, setFullname] = useState(user.fullname);
    const [email, setEmail] = useState(user.email);
    const [avatar, setAvatar] = useState<File | null>(null);

    const { handleUpdateProfile } = useAuth(); // ✅ use the hook

    const handleSubmit = async () => {
        const response = await handleUpdateProfile({ fullname, email, avatar }); // ✅ call update
        onSave(response.data.user); // optional local callback
        onClose(); // close modal
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="card rounded-lg p-6 w-full max-w-md bg-white">
                <h2 className="text-xl text-heading font-semibold mb-4">Edit Profile</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture</label>
                    <input type="file" accept="image/*" onChange={(e) => setAvatar(e.target.files?.[0] || null)} />
                    {avatar && (
                        <img
                            src={URL.createObjectURL(avatar)}
                            alt="Preview"
                            className="w-16 h-16 rounded-full mt-2"
                        />
                    )}

                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                        type="text"
                        className="w-full border px-3 py-2 rounded"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                        type="email"
                        className="w-full border px-3 py-2 rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="flex justify-end space-x-4">
                    <button onClick={onClose} className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100">
                        Cancel
                    </button>
                    <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditProfileModal;
