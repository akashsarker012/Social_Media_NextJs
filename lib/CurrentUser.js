import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const CurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const backendApi = process.env.NEXT_PUBLIC_BACKEND_API;
        const token = Cookies.get("user_id");
        if (!token) {
          throw new Error("Token not found");
        }
        const response = await axios.get(`${backendApi}/api/v1/current-user`, {
          headers: {
            "x-access-token": token,
          },
        });
        setCurrentUser(response?.data?.currentUser);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching current user:", error.message);
      }
    };
    fetchCurrentUser();
  }, []);

  return { currentUser, loading, error };
};

export default CurrentUser;
