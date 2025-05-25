import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
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
  const userRole = localStorage.getItem('userRole');

  let NavbarComponent = null;
  if (!isAuthPage) {
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

  return (
    <>
      {NavbarComponent}
      <div className="sidebar-spacer"></div>
      <main className="main-content">
        {children}
      </main>
      <div className="footer"></div>
    </>
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

            {/* Lab Staff Routes */}
            <Route
              path="/*"
              element={
                <ProtectedRoute allowedRoles={['LAB_STAFF']}>
                  <Routes>
                    <Route path="/" element={<LabDashboard />} />
                    <Route path="/mushroom-management" element={<MushroomManagement />} />
                    <Route path="/lab-inventory" element={<LabInventory />} />
                    <Route path="/allocations" element={<AllocationManagement />} />
                  </Routes>
                </ProtectedRoute>
              }
            />

            {/* Report Manager Routes */}
            <Route
              path="/*"
              element={
                <ProtectedRoute allowedRoles={['REPORT_MANAGER']}>
                  <Routes>
                    <Route path="/" element={<AdminDashboard />} />
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
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
              path="/*"
              element={
                <ProtectedRoute allowedRoles={['INVENTORY_MANAGER']}>
                  <Routes>
                    <Route path="/" element={<Name />} />
                    <Route path="/Dashboard" element={<Dashboard />} />
                    <Route path="/Raw" element={<Raw />} />
                    <Route path="/inventory/:usageType?" element={<InventoryManagement />} />
                    <Route path="/inventory/edit/:InvId" element={<InventoryManagement />} />
                    <Route path="/Supplier" element={<Supplier />} />
                    <Route path="/Stock" element={<Stock />} />
                    <Route path="/SaveSupplier" element={<Supplier />} />
                    <Route path="/EditSupplier/:SupplierId" element={<Supplier />} />
                  </Routes>
                </ProtectedRoute>
              }
            />

            {/* Sales Manager Routes */}
            <Route
              path="/*"
              element={
                <ProtectedRoute allowedRoles={['SALES_MANAGER']}>
                  <Routes>
                    <Route path="/" element={<SalesManagement />} />
                    <Route path="/sales" element={<SalesManagement />} />
                    <Route path="/sales/new" element={<SalesManagement />} />
                    <Route path="/preorders" element={<PreorderManagement />} />
                    <Route path="/preorders/new" element={<PreorderManagement />} />
                    <Route path="/inventory" element={<Inventory />} />
                    <Route path="/allocations" element={<AllocationComponent />} />
                    <Route path="/branches" element={<BranchComponent />} />
                  </Routes>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
