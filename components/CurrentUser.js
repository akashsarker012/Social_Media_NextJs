
"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { NextRequest, NextResponse } from 'next/server';
import Link from 'next/link';

const CurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  // console.log(currentUser, 'current user');

  useEffect(() => {
    const backendApi = process.env.NEXT_PUBLIC_BACKEND_API;
    const fetchCurrentUser = async () => {
      try {
        const token = Cookies.get('user_id');
        if (!token) {
          throw new Error('Token not found');
        }
        const response = await axios.get(`${backendApi}/api/v1/current-user`, {
          headers: {
            'x-access-token': token
          }
        });

        // console.log('Current user:', response);

        setCurrentUser(response.data.currentUser);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching current user:', error.message);
        setError('Error fetching current user. Please try again later.');
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!currentUser) {
    return <p>No user information available.</p>;
  }
  

  return (
    <div>
      <h2>Welcome, {currentUser.name}!</h2>
      <Link href={"/"+currentUser.id}>View Profile</Link>
      <h2>Welcome, {currentUser.id}</h2>
      <p>Email: {currentUser.email}</p>
      {/* Display other user information as needed */}
    </div>
  );
};

export default CurrentUser;
