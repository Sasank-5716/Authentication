import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constant";

function ProtectedRoute({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(null);

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    try {
      const res = await api.post('/auth/refresh', { token: refreshToken });
      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.accessToken);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      setIsAuthorized(false);
    }
  };

  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setIsAuthorized(false);
      return;
    }
    try {
      const decodedToken = jwtDecode(token);
      const tokenExpiration = decodedToken.exp * 1000; // exp is in seconds, convert to ms
      const now = Date.now();
      if (tokenExpiration < now) {
        await refreshToken();
      } else {
        setIsAuthorized(true);
      }
    } catch (error) {
      setIsAuthorized(false);
    }
  };

  useEffect(() => {
    auth();
    // eslint-disable-next-line
  }, []);

  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }
  return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
