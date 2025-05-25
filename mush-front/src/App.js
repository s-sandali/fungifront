import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

// Import Navbars
import InventoryNavbar from './layout/Navbar';
import ReportsNavbar from './reports/Layout/Navbar';
import LabsNavbar from './labs/components/common/Navbar';
import SalesNavbar from './sales/components/Navbar';

// Import Auth components
import Login from './auth/Login';
import Signup from './auth/Signup';

// Import Inventory components
import Raw from './pages/Raw';
import InventoryManagement from './pages/InventoryManagement';
import Supplier from './pages/Supplier';
import Stock from './pages/Stock';
import Name from './layout/Name';
import Dashboard from './pages/Dashboard';

// Import Reports components
import AdminDashboard from './reports/AdminDashboard/Dashboard';
import EmployeeManagement from './reports/Employees/EmployeeManagement';
import SalesReport from './reports/Reports/SalesReport';
import LabReports from './reports/Reports/LabReports';
import MaterialManagement from './reports/Materials/MaterialManagement';

// Import Lab components
import LabDashboard from './labs/pages/Dashboard';
import MushroomManagement from './labs/pages/MushroomManagement';
import LabInventory from './labs/pages/LabInventory';
import AllocationManagement from './labs/pages/AllocationManagement';

// Import Sales components
import SalesManagement from './sales/components/SalesManagement';
import PreorderManagement from './sales/components/PreorderManagement';
import Inventory from './sales/components/Inventory';
import AllocationComponent from './sales/components/AllocationComponent';
import BranchComponent from './sales/components/BranchComponent';

const Layout = ({ children }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/Login' || location.pathname === '/Signup';
  const isLoadingPage = location.pathname === '/';
  const userRole = localStorage.getItem('userRole');

  let NavbarComponent = null;
  if (!isAuthPage && !isLoadingPage) {
    switch(userRole) {
      case 'LAB_STAFF':
        NavbarComponent = <LabsNavbar />;
        break;
      case 'REPORT_MANAGER':
        NavbarComponent = <ReportsNavbar />;
        break;
      case 'INVENTORY_MANAGER':
        NavbarComponent = <InventoryNavbar />;
        break;
      case 'SALES_MANAGER':
        NavbarComponent = <SalesNavbar />;
        break;
      default:
        NavbarComponent = null;
    }
  }

  // For auth pages and loading page, render children without sidebar layout
  if (isAuthPage || isLoadingPage) {
    return children;
  }

  // For authenticated pages, render with sidebar layout
  return (
    <div className="d-flex">
      {NavbarComponent}
      <main className="main-content flex-grow-1">
        <div className="container-fluid">
          {children}
        </div>
      </main>
    </div>
  );
};

// Protected Route component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const userRole = localStorage.getItem('userRole');
  const isAuthenticated = localStorage.getItem('userRole') !== null;

  if (!isAuthenticated) {
    return <Navigate to="/Login" replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

function App() {
  return (
    <div className="App">
      <Router>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/Login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/unauthorized" element={<div>Unauthorized Access</div>} />
            
            {/* Root route - Always show loading screen first */}
            <Route path="/" element={<Name />} />

            {/* Lab Staff Routes */}
            <Route
              path="/lab/*"
              element={
                <ProtectedRoute allowedRoles={['LAB_STAFF']}>
                  <Routes>
                    <Route path="/" element={<LabDashboard />} />
                    <Route path="/dashboard" element={<LabDashboard />} />
                    <Route path="/mushroom-management" element={<MushroomManagement />} />
                    <Route path="/lab-inventory" element={<LabInventory />} />
                    <Route path="/allocations" element={<AllocationManagement />} />
                  </Routes>
                </ProtectedRoute>
              }
            />

            {/* Report Manager Routes */}
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute allowedRoles={['REPORT_MANAGER']}>
                  <Routes>
                    <Route path="/" element={<AdminDashboard />} />
                    <Route path="/dashboard" element={<AdminDashboard />} />
                    <Route path="/materials" element={<MaterialManagement />} />
                    <Route path="/employees" element={<EmployeeManagement />} />
                    <Route path="/analytics/sales" element={<SalesReport />} />
                    <Route path="/analytics/labs" element={<LabReports />} />
                  </Routes>
                </ProtectedRoute>
              }
            />

            {/* Inventory Manager Routes */}
            <Route
              path="/inventory/*"
              element={
                <ProtectedRoute allowedRoles={['INVENTORY_MANAGER']}>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/raw" element={<Raw />} />
                    <Route path="/management/:usageType?" element={<InventoryManagement />} />
                    <Route path="/management/edit/:InvId" element={<InventoryManagement />} />
                    <Route path="/supplier" element={<Supplier />} />
                    <Route path="/stock" element={<Stock />} />
                    <Route path="/supplier/save" element={<Supplier />} />
                    <Route path="/supplier/edit/:SupplierId" element={<Supplier />} />
                  </Routes>
                </ProtectedRoute>
              }
            />

            {/* Sales Manager Routes */}
            <Route
              path="/sales/*"
              element={
                <ProtectedRoute allowedRoles={['SALES_MANAGER']}>
                  <Routes>
                    <Route path="/" element={<SalesManagement />} />
                    <Route path="/management" element={<SalesManagement />} />
                    <Route path="/management/new" element={<SalesManagement />} />
                    <Route path="/preorders" element={<PreorderManagement />} />
                    <Route path="/preorders/new" element={<PreorderManagement />} />
                    <Route path="/inventory" element={<Inventory />} />
                    <Route path="/allocations" element={<AllocationComponent />} />
                    <Route path="/branches" element={<BranchComponent />} />
                  </Routes>
                </ProtectedRoute>
              }
            />

            {/* Catch all route for unmatched paths */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
