"use client"
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const CurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(null);

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
        console.error("Error fetching current user:", error.message);
      }
    };
    fetchCurrentUser();
  }, []);

  return {currentUser};
};

export default CurrentUser;
