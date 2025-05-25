import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Lottie from "lottie-react";
import mushroomGrowth from "../PlantAnimation.json";
import { FaUser, FaLock, FaSeedling, FaFlask, FaChartLine, FaBoxOpen } from 'react-icons/fa';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const roles = [
    { value: 'LAB_STAFF', label: 'Lab Staff' },
    { value: 'REPORT_MANAGER', label: 'Report Manager' },
    { value: 'INVENTORY_MANAGER', label: 'Inventory Manager' },
    { value: 'SALES_MANAGER', label: 'Sales Manager' }
  ];

  const login = async () => {
    setError('');

    if (!username || !password || !role) {
      setError('Username, password and role are required');
      return;
    }

    try {
      const res = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, role }),
        credentials: 'include',
      });

      if (res.ok) {
        // Store the role in localStorage
        localStorage.setItem('userRole', role);
        
        // Redirect based on role
        switch(role) {
          case 'LAB_STAFF':
            navigate('/');
            break;
          case 'REPORT_MANAGER':
            navigate('/');
            break;
          case 'INVENTORY_MANAGER':
            navigate('/');
            break;
          default:
            navigate('/');
        }
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('Network error occurred');
    }
  };

  const quickActions = [
    { 
      icon: <FaSeedling className="text-success" size="2em" />,
      title: "Lab Cultures",
      description: "Monitor active mushroom cultures"
    },
    { 
      icon: <FaFlask className="text-info" size="2em" />,
      title: "Production",
      description: "View cultivation progress"
    },
    { 
      icon: <FaChartLine className="text-warning" size="2em" />,
      title: "Sales Analytics",
      description: "Branch performance & trends"
    },
    { 
      icon: <FaBoxOpen className="text-danger" size="2em" />,
      title: "Inventory",
      description: "Manage raw materials"
    }
  ];

  return (
    <div className="min-vh-100 bg-light">
      <div className="container-fluid p-0">
        {/* Hero Section */}
        <div className="header-section p-4 bg-white border-start border-4 border-success">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-5 fw-bold text-success mb-3">
                Welcome to FungiFlow
                <div className="sub-brand fs-4 mt-2">MTDC Production Management</div>
              </h1>
              <p className="lead text-muted">
                Managing 85% of Sri Lanka's mushroom cultivation - Tracking 5 varieties across 4 facilities
              </p>
            </div>
            <div className="col-lg-6">
              <Lottie 
                animationData={mushroomGrowth} 
                style={{ height: 200 }} 
              />
            </div>
          </div>
        </div>

        <div className="container-fluid p-4">
          <div className="row g-4">
            {/* Login Form */}
            <div className="col-lg-4">
              <div className="card border-0 shadow-sm rounded-3 h-100">
                <div className="card-body p-4">
                  <h2 className="text-center text-success mb-4">Login</h2>
                  {error && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}
                  <div className="mb-3">
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <FaUser className="text-success" />
                      </span>
                      <input
                        type="text"
                        className="form-control border-start-0"
                        placeholder="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <FaLock className="text-success" />
                      </span>
                      <input
                        type="password"
                        className="form-control border-start-0"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <select
                      className="form-select"
                      value={role}
                      onChange={e => setRole(e.target.value)}
                    >
                      <option value="">Select Role</option>
                      {roles.map(role => (
                        <option key={role.value} value={role.value}>
                          {role.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    className="btn btn-success w-100 py-2 mb-3"
                    onClick={login}
                  >
                    Login
                  </button>
                  <div className="text-center">
                    <span className="text-muted">Don't have an account? </span>
                    <Link to="/Signup" className="text-success text-decoration-none fw-bold">
                      Sign up
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="col-lg-8">
              <h3 className="mb-4 fw-bold text-success">Core Operations</h3>
              <div className="row g-4">
                {quickActions.map((action, index) => (
                  <div key={index} className="col-md-6">
                    <div className="card border-0 shadow-sm h-100 hover-scale">
                      <div className="card-body">
                        <div className="d-flex align-items-center mb-3">
                          <div className="bg-success bg-opacity-10 p-3 rounded-circle me-3">
                            {action.icon}
                          </div>
                          <h5 className="mb-0 fw-bold">{action.title}</h5>
                        </div>
                        <p className="text-muted mb-0">{action.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Production Overview */}
              <div className="card border-0 shadow-sm mt-4">
                <div className="card-header bg-success text-white">
                  <h5 className="mb-0">Cultivation Varieties</h5>
                </div>
                <div className="card-body">
                  <div className="row g-4 text-center">
                    {['American Oyster', 'Abalone', 'Bhutan Oyster', 'Pink Oyster', 'Milky'].map((variety, idx) => (
                      <div key={idx} className="col">
                        <div className="bg-success bg-opacity-10 p-3 rounded-circle d-inline-block">
                          <FaSeedling className="text-success" size="1.5em" />
                        </div>
                        <div className="mt-2 small fw-bold">{variety}</div>
                        <div className="text-muted small">1-2 weeks cycle</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;