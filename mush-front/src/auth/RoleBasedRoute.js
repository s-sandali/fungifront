import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const RoleBasedRoute = ({ allowedRoles }) => {
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/auth/me', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (res.status === 401) {
          setUserRole(null);
          return;
        }

        if (res.ok) {
          const data = await res.json();
          setUserRole(data.role);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        setUserRole(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>;
  }

  // If not authenticated, redirect to login
  if (!userRole) {
    return <Navigate to="/Login" replace />;
  }

  // If authenticated but role not allowed, redirect to unauthorized
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // If authenticated and role is allowed, render the protected route
  return <Outlet />;
};

export default RoleBasedRoute; 