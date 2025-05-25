import React from 'react';
import SalesChart from './SalesChart';
import LowStockAlerts from './LowStockAlerts';
import LabChart from './LabChart';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Dashboard() {
  return (
    <div className="p-4">
      {/* Header Section with Bootstrap Icon */}
      <div className="header-section p-4 mb-4 bg-light rounded-3 shadow-sm border-start border-4 border-success">
        <div className="d-flex align-items-center">
          <i className="bi bi-speedometer2 text-success me-3" style={{ fontSize: '2rem' }}></i>
          <h1 className="fw-bold text-success mb-0">Dashboard</h1>
        </div>
      </div>

      {/* Dashboard Cards/Charts */}
      <div className="row g-4">
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm rounded-3 mb-4">
            <div className="card-header bg-white p-3 border-bottom border-light">
              <h5 className="mb-0 fw-bold text-success">
                <i className="bi bi-bar-chart-line me-2"></i> Sales Overview
              </h5>
            </div>
            <div className="card-body">
              <SalesChart />
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm rounded-3 mb-4">
            <div className="card-header bg-white p-3 border-bottom border-light">
              <h5 className="mb-0 fw-bold text-success">
                <i className="bi bi-flask me-2"></i> Lab Performance
              </h5>
            </div>
            <div className="card-body">
              <LabChart />
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-12">
          <div className="card border-0 shadow-sm rounded-3">
            <div className="card-header bg-white p-3 border-bottom border-light">
              <h5 className="mb-0 fw-bold text-success">
                <i className="bi bi-exclamation-triangle me-2"></i> Low Stock Alerts
              </h5>
            </div>
            <div className="card-body">
              <LowStockAlerts />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
