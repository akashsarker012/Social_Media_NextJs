"use client"
import React from 'react';
import axios from 'axios';

const UserData = ({ user, setUser }) => {

    const handleLogout = async () => {
        try {
            await axios.post('/api/logout');
            setUser(null); 
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <div>
            <h2>Welcome, {user.name}</h2>
            <p>Email: {user.email}</p>
            <button onClick={handleLogout}>Logout</button>
            {/* Display other user data as needed */}
        </div>
    );
};

export default UserData;
