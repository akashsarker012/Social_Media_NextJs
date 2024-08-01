'use client';
import Modal from '@/lib/Modal';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const EmailVerification = () => {
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');
  console.log(email);

  const searchParams = useSearchParams();

  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleUpdateContactInfo = () => {
    // Handle updating contact info
  };

  return (
    <Modal background={true}>
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6">Enter the code from your email</h2>
          <p className="mb-4">Let us know that this email address belongs to you. Enter the code from the email sent to <strong>{email}</strong>.</p>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Code</label>
            <input
              type="text"
              value={code}
              onChange={handleCodeChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="FB-"
            />
          </div>
          <div className="flex justify-between items-center mb-6">
            <a href="#" className="text-sm text-blue-600 hover:underline">Send Email Again</a>
          </div>
          <div className="flex justify-between">
            <button
              onClick={handleUpdateContactInfo}
              className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700"
            >
              Update Contact Info
            </button>
            <button
              className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-md shadow-md hover:bg-gray-300"
              disabled
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EmailVerification;
