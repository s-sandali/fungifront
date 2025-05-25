import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(null); 

  useEffect(() => {
    fetch('http://localhost:8080/api/auth/me', {
      method: 'GET',
      credentials: 'include'
    })
      .then(res => setIsAuthenticated(res.ok))
      .catch(() => setIsAuthenticated(false));
  }, []);

  if (isAuthenticated === null) return <div>Loading...</div>;

  return isAuthenticated ? <Outlet /> : <Navigate to="/Login" />;
}
