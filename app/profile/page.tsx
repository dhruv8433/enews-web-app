'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import UserFavorites from '../components/profile/UserFavorites';
import Modal from '../common/Modal';

const Page = () => {
  const { user, logout, deleteAccount } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-12 gap-4 my-8">
        {/* Sidebar */}
        <div className="col-span-12 lg:col-span-4 rounded-lg border p-6">
          <div className="flex flex-col items-center space-x-4 mb-6 w-full justify-center">
            <img
              src={user?.avatar_url || '/default-profile.png'}
              alt="Profile Picture"
              className="w-16 h-16 rounded-full border-2"
            />
            <h2 className="text-xl font-semibold text-heading">{user?.fullname}</h2>
            <h2 className="text-lg font-semibold text-heading">{user?.email}</h2>
          </div>

          <hr className="border-dashed" />

          <nav className="flex flex-col space-y-4 text-gray-700 my-2">
            <Link href="#" className="hover:text-blue-600 font-medium transition">
              Favorites
            </Link>
            <button
              onClick={() => setShowLogoutModal(true)}
              className="text-left hover:text-blue-600 font-medium transition"
            >
              Logout
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="text-left hover:text-red-600 font-medium transition"
            >
              Delete Account
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="col-span-12 lg:col-span-8 body rounded-lg border p-2">
          <UserFavorites />
        </div>
      </div>

      {/* Logout Modal */}
      {showLogoutModal && (
        <Modal
          title="Confirm Logout"
          message="Are you sure you want to logout?"
          onClose={() => setShowLogoutModal(false)}
          onConfirm={() => {
            logout();
            setShowLogoutModal(false);
          }}
        />
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <Modal
          title="Confirm Delete Account"
          message="This action is irreversible. Are you sure you want to delete your account?"
          onClose={() => setShowDeleteModal(false)}
          onConfirm={() => {
            deleteAccount();
            setShowDeleteModal(false);
          }}
        />
      )}
    </div>
  );
};

export default Page;
